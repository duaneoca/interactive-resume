# Duane Pinkerton: Professional Background

## Contact
- Email: duane@hire-duane.org
- Location: Oakland, CA
- GitHub: github.com/duaneoca
- LinkedIn: linkedin.com/in/duane-pinkerton

---

## Summary

Duane has spent 20+ years in technical professional services, at the point where deep implementation work meets direct customer engagement. His loop has always been the same: sit with a customer, understand what they actually need, find where the product falls short, then go write the missing piece. He has built data pipelines and integration systems from scratch, owned them through production at enterprise scale, and made the architectural decisions about how they grow. He is drawn to understanding how systems work, and to making them work better.

---

## Skills

**Customer Engagement:** Requirements discovery · Gap analysis · Translating technical constraints into business terms · Knowing when to build vs. configure

**Languages & Scripting:** Python · Java · SQL · JavaScript · Unix/Shell · REST APIs

**Infrastructure:** Docker · Kubernetes · AWS (EC2) · Oracle Cloud Infrastructure (OCI) · Linode · Git · Jenkins · CI/CD

**Technical Strengths:** SQL performance tuning · Data pipeline architecture · Distributed systems operations · System integration

**AI & Emerging:**
- LLM integration: Claude (Anthropic), OpenAI, multi-provider routing
- Agentic frameworks: LangGraph (orchestration, checkpointing, human-in-the-loop), MCP (Model Context Protocol, both consuming and publishing servers)
- RAG (Retrieval-Augmented Generation): architecture, chunking, knowledge bases, chat interfaces
- Vector search: pgvector, semantic embeddings, Supabase
- Prompt engineering: system prompt design, context engineering, Classifier+Critic validation loops, evaluation
- Observability: Langfuse (traces, prompt versioning, LLM evaluation)
- Workflow automation: n8n, LLM-powered decision nodes, API orchestration
- Production AI: tracing, deployment, real-world system integration, security threat modeling for AI systems
- Edge / on-device AI: wake-word detection, speech-to-text, and text-to-speech running locally on Raspberry Pi (openWakeWord, Moonshine, Piper)

---

## Current Projects (2024–present)

- **Built and deployed an agentic email pipeline:** a LangGraph agent that classifies job emails, pulls structured data out of them through a Classifier+Critic validation loop, and hands genuinely ambiguous cases to a human over Slack. Langfuse for observability, MCP servers on both ends. Wrote the threat model before any code, then built against it: prompt injection, stored XSS, and cross-tenant access each have a specific mitigation
- **Designed and built private voice assistant devices** on Raspberry Pi and ReSpeaker hardware: wake word, speech-to-text, and speech synthesis all run on the device itself, feeding a self-hosted AI agent hands-free. Each unit keeps its own memory scope and listens on no inbound ports
- **Launched two production AI sites.** hire-duane.org is an interactive resume with RAG-backed chat and job-fit evaluation, built to be readable by crawling agents. job-radar.net runs on AWS and handles multi-provider job search with AI scoring, resume tailoring, application workflow, and interview prep
- **Deployed OpenBrain behind custom MCP servers:** a model-agnostic memory layer on PostgreSQL and pgvector that answers semantic queries from Claude, ChatGPT, Cursor, or any MCP client, all against one shared knowledge base
- **Automated multi-step workflows in n8n,** wiring APIs and services together with LLM-powered decision nodes
- **Wrote conversational agents for Home Assistant** that handle automations, device states, and scenes in plain language

---

## Experience

### Responsys / Oracle (2007–2026)

**Titles held (in progression):** Principal Professional Solutions Consultant → Data Architect → Solutions Architect → Principal Applications Engineer, Operations

#### Building the Platform (2007–2013)

- Designed and built the company's data pipeline and integration framework from scratch. It replaced 95% of the custom scripts running in production, became the standard across professional services, and grew to carry 200+ production jobs for 80+ enterprise customers
- Owned end-to-end delivery of customer engagements: discovery, requirements gathering, documentation, implementation, custom development, and handover to support
- Trained consultants and partners on implementation best practices; primary subject matter expert for custom data integration across the organization

#### Owning the Platform (2013–2026)

- Fielded the final escalations on production data integration issues, joining customer calls as the subject matter expert. As the author of the framework, the buck stopped there: anything that could not be resolved was an infrastructure problem, not an integration one.
- Made the architectural decisions on reliability, redundancy, and capacity planning after Oracle acquired the company
- Led the migration of the whole environment from bare metal to containers on Oracle Cloud Infrastructure (OCI), using Docker, Kubernetes, Git, and Jenkins, and finished it without a significant downtime event
- Deployed the environment in new datacenters as the platform expanded

**Notable customers:** Williams Sonoma, Pottery Barn, West Elm, Epson, Orbitz, Carlson Wagonlit, Verizon, Disney, Symantec, Lenovo, Levi's, Lego, PayPal, See's, Coach, Grainger, Intuit, Wells Fargo, BabyCenter

---

### Extensity / Geac / Infor (1999–2007)

**Titles held:** Principal Professional Services Consultant → Team Lead, Custom Solutions Group

- Ran enterprise software implementations start to finish, from discovery and requirements through training and support handover, for domestic and international clients
- Built multi-currency and exchange rate support from scratch, which made the company's first international enterprise deployments possible at Cisco and Sybase. The features later shipped in the core product
- Worked directly with engineering to drive bug fixes and code changes into the product codebase
- Spent 18 months in the UK as lead technical member of the founding professional services team; trained and mentored three colleagues, hands-on across all client implementations
- Led a team of professional services developers implementing custom solutions across the client base

**Notable customers:** Cisco Systems, Sybase, Ernst & Young, ATKearney, State of Alaska, Franklin Investments, Lawrence Livermore National Labs, Memorial Sloane Kettering Cancer Center, UCLA, McKinsey & Co.

---

## Education

**Bachelor of Arts in Computer Science** at UC Berkeley

---

## Additional Notes for the AI Assistant

- Duane has 20+ years of professional experience total.
- His career spans two long-tenure roles, both in professional services / consulting.
- A recurring theme is building things that didn't exist and then owning them long-term: frameworks, integrations, infrastructure.
- He is comfortable at both the technical implementation level and the customer-facing consulting level.
- His recent independent work focuses heavily on AI (agents, LLMs, prompt engineering) and modern infrastructure (containers, Kubernetes, automation).
- This interactive resume site itself is an example of his current AI + infrastructure work.
- If asked about salary, availability, or specific personal details not listed here, suggest the visitor contact Duane directly at duane@hire-duane.org.

<!-- TODO: Expand this file through Q&A sessions to add richer narrative detail, anecdotes, and context for each section. -->
