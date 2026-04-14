"""
Interactive Resume — AI Chat Backend
FastAPI service that proxies questions about Duane Pinkerton to Claude Haiku,
grounded in all .md files found in the knowledge/ directory.
Add a new .md file to knowledge/ and it's automatically included — no code changes needed.
"""

import os
from pathlib import Path

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

load_dotenv()

# ── Rate limiter ─────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── App setup ────────────────────────────────────────────────
app = FastAPI(title="Interactive Resume API", version="1.0.0")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "*").split(","),
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# ── Knowledge base ────────────────────────────────────────────
# Loads all .md files from the knowledge/ directory, sorted alphabetically.
# Add a new file and it's automatically included on next deploy.
_knowledge_dir = Path(__file__).parent / "knowledge"
_knowledge_files = sorted(_knowledge_dir.glob("*.md"))

if _knowledge_files:
    RESUME_KNOWLEDGE = "\n\n---\n\n".join(
        f"# [{f.stem}]\n\n{f.read_text(encoding='utf-8')}"
        for f in _knowledge_files
    )
else:
    RESUME_KNOWLEDGE = "(Knowledge base is empty — add .md files to knowledge/)"

SYSTEM_PROMPT = f"""You are a factual assistant representing Duane Pinkerton. \
Your job is to answer questions about his professional background accurately and honestly.

Guidelines:
- Accuracy over promotion. Do not oversell or flatter. If a skill is described as \
limited, developing, or user-level, say so — do not upgrade it based on resume bullet \
points that mention the technology in passing.
- The [expertise] file is the authoritative source on skill depth. When it qualifies or \
contradicts how a skill appears in the [resume] file, always defer to [expertise].
- Answer only from the information provided. Do not speculate or invent details.
- Write in third person ("Duane has...", "His experience with...").
- If something isn't covered in the knowledge base, say so honestly and suggest the \
visitor contact Duane directly at duane@hire-duane.org.
- Do not answer questions unrelated to Duane's professional background.
- Keep responses to 2–4 sentences unless a longer answer is clearly needed. \
Avoid padding and filler phrases.

DUANE'S BACKGROUND:
{RESUME_KNOWLEDGE}
"""

# ── Anthropic client ──────────────────────────────────────────
_api_key = os.getenv("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=_api_key) if _api_key else None


# ── Schemas ───────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    context: str | None = None  # pre-seeded context from clicked resume item


class ChatResponse(BaseModel):
    response: str


# ── Routes ────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "knowledge_loaded": bool(RESUME_KNOWLEDGE)}


@app.post("/api/chat", response_model=ChatResponse)
@limiter.limit("20/minute")
def chat(request: Request, req: ChatRequest):
    if not client:
        raise HTTPException(status_code=503, detail="API key not configured")

    user_message = req.message.strip()
    if not user_message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Prepend clicked-item context if provided
    if req.context:
        user_message = f"[The visitor clicked on: {req.context}]\n\n{user_message}"

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=512,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_message}],
        )
        return ChatResponse(response=response.content[0].text)
    except anthropic.APIError as e:
        raise HTTPException(status_code=502, detail=f"Upstream API error: {e}")
