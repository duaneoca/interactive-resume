"""
Interactive Resume — AI Chat Backend
FastAPI service that proxies questions about Duane Pinkerton to Claude Haiku,
grounded in all .md files found in the knowledge/ directory.
Add a new .md file to knowledge/ and it's automatically included — no code changes needed.
"""

import json
import os
import re
import threading
from datetime import date
from pathlib import Path

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

load_dotenv()

# ── Rate limiter ─────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)

# ── Daily cap ─────────────────────────────────────────────────
# Simple in-memory counter. Resets automatically each calendar day.
# Values are intentionally generous — this is a resume site, not a product.
DAILY_LIMITS = {"chat": 300, "evaluate": 75}

_cap_lock = threading.Lock()
_cap_counts: dict[str, int] = {"chat": 0, "evaluate": 0}
_cap_date: date = date.today()


def _check_daily_cap(endpoint: str) -> None:
    """Increment the daily counter for *endpoint* and raise 429 if over limit."""
    global _cap_date, _cap_counts
    with _cap_lock:
        today = date.today()
        if today != _cap_date:          # new day — reset counters
            _cap_date = today
            _cap_counts = {k: 0 for k in _cap_counts}
        _cap_counts[endpoint] += 1
        if _cap_counts[endpoint] > DAILY_LIMITS[endpoint]:
            raise HTTPException(
                status_code=429,
                detail=(
                    f"Daily request limit reached for this service "
                    f"({DAILY_LIMITS[endpoint]}/day). Please try again tomorrow, "
                    f"or contact Duane directly at duane@hire-duane.org."
                ),
            )

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

EVALUATE_PROMPT = f"""You are evaluating how well Duane Pinkerton matches a job description.
Analyze the job description against his background and return a JSON object.

Return this exact structure — raw JSON only, no markdown fences, no explanation:
{{
  "summary": "1-2 sentences: honest overall assessment of fit quality and the key reason",
  "strong": [{{"area": "skill or experience area", "rationale": "one sentence"}}],
  "transferable": [{{"area": "skill or experience area", "rationale": "one sentence"}}],
  "gaps": [{{"area": "skill or experience area", "rationale": "one sentence"}}]
}}

Definitions:
- strong: Direct, explicit alignment between the role's requirements and Duane's background
- transferable: Adjacent experience that applies with context — not a perfect match, but relevant
- gaps: Areas where the role requires something Duane lacks or has limited experience with

Rules:
- Be accurate and honest. Do not oversell. Genuine gaps should be listed as gaps.
- Aim for 3–6 items per category. Empty arrays are fine if there are truly no items.
- The [expertise] file is authoritative on skill depth — defer to it over resume bullet points.
- Return ONLY valid JSON.

DUANE'S BACKGROUND:
{RESUME_KNOWLEDGE}
"""

# ── Anthropic client ──────────────────────────────────────────
_api_key = os.getenv("ANTHROPIC_API_KEY")
client = anthropic.Anthropic(api_key=_api_key) if _api_key else None


# ── Schemas ───────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    context: str | None = Field(default=None, max_length=500)


class ChatResponse(BaseModel):
    response: str


class EvaluateRequest(BaseModel):
    job_description: str = Field(..., min_length=1, max_length=10000)


class FitItem(BaseModel):
    area: str
    rationale: str


class EvaluateResponse(BaseModel):
    summary: str
    strong: list[FitItem]
    transferable: list[FitItem]
    gaps: list[FitItem]


# ── Routes ────────────────────────────────────────────────────
@app.get("/health")
def health():
    return {"status": "ok", "knowledge_loaded": bool(RESUME_KNOWLEDGE)}


@app.post("/api/chat", response_model=ChatResponse)
@limiter.limit("20/minute")
def chat(request: Request, req: ChatRequest):
    _check_daily_cap("chat")
    if not client:
        raise HTTPException(status_code=503, detail="API key not configured")

    user_message = req.message.strip()

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


@app.post("/api/evaluate", response_model=EvaluateResponse)
@limiter.limit("10/minute")
def evaluate(request: Request, req: EvaluateRequest):
    _check_daily_cap("evaluate")
    if not client:
        raise HTTPException(status_code=503, detail="API key not configured")

    job_description = req.job_description.strip()

    prompt = f"{EVALUATE_PROMPT}\n\nJOB DESCRIPTION TO EVALUATE:\n{job_description}"

    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        raw = response.content[0].text.strip()

        # Strip markdown code fences if the model added them anyway
        raw = re.sub(r"^```(?:json)?\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)

        data = json.loads(raw)
        return EvaluateResponse(**data)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=502, detail=f"Failed to parse evaluation: {e}")
    except anthropic.APIError as e:
        raise HTTPException(status_code=502, detail=f"Upstream API error: {e}")
