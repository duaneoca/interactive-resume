# Duane Pinkerton: Project Deep-Dive

*Richer detail on the independent AI projects Duane is currently building, for when a visitor wants more than the resume one-liner.*

---

## Job Radar Email Agent

**Stage: active design and early build.** This is a standalone public portfolio project, written up from a full design and execution plan with a completed threat model. The architecture below is what Duane is building toward; it is deliberately scoped as a real, multi-user system for a small set of authorized accounts, not a throwaway demo. Where something is still in progress, this file says so.

### One-line

An agentic email-processing pipeline that reads job-related emails, classifies and extracts structured data with an LLM, self-validates through a Classifier-to-Critic loop, escalates ambiguous cases to a human via interactive Slack, and writes results into a job-tracking platform, fully observable and threat-modeled.

### Context: turning an app into a platform

Job Radar (job-radar.net) is Duane's existing personal job-search product, described elsewhere in this knowledge base. The Email Agent extends it from an app into a platform: it adds an MCP interface so an authorized agent can write into Job Radar programmatically. The goal of the project is to demonstrate enterprise-grade agentic workflow patterns end-to-end, with real users rather than a toy example.

### What it does

- Reads unread job-related email from a configured mailbox (Proton Bridge over IMAP when self-hosted locally, or the Gmail API in the cloud).
- Classifies each email into one of four categories (recruiter outreach, application confirmation, job alert, social/network noise) and extracts structured fields: company, role, links, and multiple postings per email.
- Validates every classification with a second LLM acting as a Critic, which also checks job-matching. Failures retry with feedback, then escalate if they still cannot be resolved.
- Files each processed email into mailbox folders (Interaction, Postings, Social, Unprocessed) as a built-in audit trail. The agent only ever reads, marks-read, and moves email; it never deletes.
- Surfaces new opportunities in a new "Inbox" page in Job Radar and updates application status on existing tracked jobs (applied, interviewing, offer, rejected) with timeline events.
- Notifies the user through a pluggable notifier (Slack, Telegram, or Discord) and pauses for human input when a match is genuinely ambiguous.

### Architecture and engineering highlights

- **Agent orchestration:** A LangGraph state machine with conditional routing, retry loops, and a durable checkpointer that enables pause and resume.
- **Human-in-the-loop:** Ambiguous cases post interactive Slack buttons. The run checkpoints and exits, and a pull-based resolution model (Slack posts to one public callback, and the agent's poller resumes the checkpoint) means the local deployment needs zero inbound connectivity or tunneling. The design backstop for uncertainty is a human, not a confidence threshold alone.
- **End-to-end MCP:** The system both consumes a custom MCP server (an Email Reader over stdio) and publishes one (a Job Radar Writer over HTTPS with a per-user API key). That publishing side is what turns the host app into a platform any authorized agent can write to.
- **Observability:** Langfuse with hand-instrumented spans capturing prompt version, model, latency, cost, retry count, classification, and final action per email. A separate business-level operations dashboard tracks emails processed, category breakdown, retry and escalation rates, jobs imported, and agent health, kept distinct from the raw LLM-trace view.
- **Prompt management:** Prompts are versioned and served from Langfuse rather than hardcoded, so they can be changed and rolled back without redeploying.
- **Two deployment paths from one codebase:** Local self-hosted via Docker Compose, scheduled by an in-container loop; and multi-user cloud on AWS EC2 with k3s, scheduled by a Kubernetes CronJob from a GHCR image.
- **Multi-tenant, bring-your-own-key:** Each user supplies their own LLM provider/model and email connection. Per-user credentials and BYOK LLM keys are stored encrypted and fetched at runtime; secrets are encrypted at rest.

### Security engineering (a deliberate showcase)

Duane produced a written threat model before any code, and the security mitigations are encoded as per-phase acceptance criteria rather than bolted on afterward. A dedicated credential-hardening phase runs before feature work. The threat model covers:

- **Prompt-injection containment:** Email is treated as untrusted data, the agent's tool and status surface is constrained, and human-in-the-loop is the final backstop. The position is that injection can be contained but not fully eliminated, so the system is designed to limit blast radius.
- **Stored-XSS prevention:** URL-scheme allowlisting and output sanitization on anything derived from email content before it reaches the Job Radar UI.
- **Cross-tenant IDOR prevention:** User identity is derived from the API key, never trusted from the request body.
- **Slack callback signature verification** on the public human-in-the-loop endpoint.
- **Encryption-key segregation and rotation** using MultiFernet, with the credential-encryption key separated from other secrets.
- **Least-privilege OAuth scopes** and **cost/DoS rate-limiting** on user-supplied LLM keys.

### Tech stack

Python, LangGraph, Langfuse, the Model Context Protocol (MCP) SDK, FastAPI, the existing Job Radar backend (Django/SQLAlchemy with PostgreSQL), Docker and Docker Compose, AWS EC2 with k3s/Kubernetes, GitHub Actions with GHCR, Cloudflare, the Slack/Telegram/Discord APIs, the Gmail API and IMAP, and React.

### Why it matters: skills it demonstrates

Agentic AI workflow design, LLM orchestration with validation loops, human-in-the-loop systems, MCP as both a consumer and a publisher, LLM observability and cost monitoring, multi-tenant SaaS architecture, secure credential management, threat modeling, Kubernetes deployment, and platform/API design.

**Honest framing for the assistant:** This project is the main vehicle through which Duane is building hands-on depth in LangGraph, MCP publishing, LLM observability, and agentic security patterns. It is a current, in-progress build with a complete design and threat model, not a years-old production system. Represent it as ambitious, well-architected, and actively underway.
