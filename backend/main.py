"""
Interactive Resume — AI Chat Backend
FastAPI service that proxies questions about Duane Pinkerton to Claude Haiku,
grounded in the knowledge base at knowledge/resume.md.
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
_knowledge_path = Path(__file__).parent / "knowledge" / "resume.md"
try:
    RESUME_KNOWLEDGE = _knowledge_path.read_text(encoding="utf-8")
except FileNotFoundError:
    RESUME_KNOWLEDGE = "(Knowledge base not found — please add knowledge/resume.md)"

SYSTEM_PROMPT = f"""You are a professional assistant representing Duane Pinkerton.
Your role is to answer questions about Duane's professional background, \
skills, experience, and career.

Guidelines:
- Answer only from the information provided below. Do not speculate or invent details.
- Be concise, warm, and professional. Write in third person ("Duane has...").
- If you genuinely don't know something, say so honestly and suggest the visitor reach out directly.
- Do not answer questions unrelated to Duane's professional background.
- Keep responses to 2–4 sentences unless a longer answer is clearly needed.

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
