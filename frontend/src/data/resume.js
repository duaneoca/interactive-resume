export const resumeData = {
  name: "Duane Pinkerton",
  contact: {
    email: "duane@hire-duane.org",
    phone: "510.519.1105",
    location: "Oakland, CA",
    github: "github.com/duaneoca",
    linkedin: "linkedin.com/in/duane-pinkerton",
  },

  summary: `20+ years in technical professional services, consistently at the intersection of deep implementation work and direct customer engagement. My career has been built around a specific loop: sit with a customer, understand what they actually need, figure out where the product falls short, and go write the missing piece. I've built data pipelines and integration systems from scratch, owned them end-to-end through production at enterprise scale, and made the architectural decisions about how they grow. I'm drawn to understanding how systems work, and to making them work better.`,

  skills: [
    {
      id: "skills-customer",
      category: "Customer Engagement",
      items: [
        "Requirements discovery",
        "Gap analysis",
        "Translating technical constraints into business terms",
        "Knowing when to build vs. configure",
      ],
    },
    {
      id: "skills-languages",
      category: "Languages & Scripting",
      items: ["Python", "Java", "SQL", "JavaScript", "Unix/Shell", "REST APIs"],
    },
    {
      id: "skills-infra",
      category: "Infrastructure",
      items: [
        "Docker",
        "Kubernetes",
        "AWS (EC2)",
        "Oracle Cloud Infrastructure (OCI)",
        "Linode",
        "Git",
        "Jenkins",
        "CI/CD",
      ],
    },
    {
      id: "skills-technical",
      category: "Technical Strengths",
      items: [
        "SQL performance tuning",
        "Data pipeline architecture",
        "Distributed systems operations",
        "System integration",
      ],
    },
    {
      id: "skills-ai",
      category: "AI & Emerging",
      items: [
        "LLM integration (Claude, OpenAI, multi-provider)",
        "RAG & vector search (pgvector, Supabase)",
        "LangGraph & agentic systems",
        "MCP (Model Context Protocol)",
        "Prompt engineering & evaluation",
        "Langfuse observability",
        "n8n workflow orchestration",
        "Edge / on-device AI (wake word, STT, TTS)",
      ],
    },
  ],

  currentProjects: [
    {
      id: "proj-email-agent",
      text: "Built and deployed an agentic email pipeline: a LangGraph-orchestrated agent that classifies job emails, extracts structured data through a Classifier+Critic validation loop, and escalates ambiguous cases to a human via interactive Slack, with Langfuse observability and MCP servers on both ends. Hardened it against attack vectors including prompt injection, stored XSS, and cross-tenant access, with security mitigations baked into every build phase rather than bolted on after.",
      chatPrompt: "Tell me about your agentic email pipeline project.",
    },
    {
      id: "proj-hermes-sat",
      text: "Built and deployed private voice assistant devices (Raspberry Pi + ReSpeaker) running a fully on-device wake-word, speech-to-text, and text-to-speech pipeline as a hands-free front-end to a self-hosted AI agent, with per-device memory scoping and a zero-inbound-port security posture",
      chatPrompt: "Tell me about your private voice assistant project.",
    },
    {
      id: "proj-ai-app",
      text: "Built and launched two production AI sites: hire-duane.org (interactive resume with RAG-backed chat, job-fit evaluation, and agentic crawling support) and job-radar.net (multi-provider job search with AI scoring, resume tailoring, application workflow, interview prep, and an agentic email agent; hosted on AWS)",
      chatPrompt: "Tell me about the AI-powered sites you've built.",
    },
    {
      id: "proj-openbrain",
      text: "Deployed OpenBrain with custom MCP servers: a model-agnostic memory layer on PostgreSQL + pgvector (Supabase) that serves semantic retrieval to Claude, ChatGPT, Cursor, and any MCP-compatible client from one shared knowledge base",
      chatPrompt: "Tell me about your OpenBrain and MCP server work.",
    },
    {
      id: "proj-n8n",
      text: "Automated multi-step workflows in n8n, wiring APIs and services together through LLM-powered decision nodes",
      chatPrompt: "Tell me about your n8n workflow automation work.",
    },
    {
      id: "proj-ha-agents",
      text: "Engineered conversational AI agents for Home Assistant: natural-language control of automations, device states, and scenes",
      chatPrompt: "Tell me about your Home Assistant AI agent work.",
    },
  ],

  experience: [
    {
      id: "exp-oracle",
      company: "Responsys / Oracle",
      period: "2007 – 2026",
      roles:
        "Principal Professional Solutions Consultant → Data Architect → Solutions Architect → Principal Applications Engineer, Operations",
      sections: [
        {
          id: "exp-oracle-building",
          title: "Building the Platform",
          period: "2007 – 2013",
          bullets: [
            "Designed and built the company's custom data pipeline and integration framework from scratch: replaced 95% of existing custom scripts in production, became the organization standard, and scaled to 200+ production jobs across 80+ enterprise customers",
            "Owned end-to-end delivery of customer engagements: discovery, requirements gathering, documentation, implementation, custom development, and handover to support",
            "Trained consultants and partners on implementation best practices; primary subject matter expert for custom data integration across the organization",
          ],
        },
        {
          id: "exp-oracle-owning",
          title: "Owning the Platform",
          period: "2013 – 2026",
          bullets: [
            "Made key architectural decisions around platform reliability, redundancy, and capacity planning following Oracle's acquisition",
            "Led the migration of the full environment from bare metal to a containerized infrastructure on Oracle Cloud Infrastructure (OCI) using Docker, Kubernetes, Git, and Jenkins; completed with zero significant downtime events",
            "Deployed and stood up the environment in new datacenters as the platform expanded geographically",
          ],
        },
      ],
      notableCustomers: [
        "Williams Sonoma",
        "Pottery Barn",
        "West Elm",
        "Epson",
        "Orbitz",
        "Carlson Wagonlit",
        "Verizon",
        "Disney",
        "Symantec",
        "Lenovo",
        "Levi's",
        "Lego",
        "PayPal",
        "See's",
        "Coach",
        "Grainger",
        "Intuit",
        "Wells Fargo",
        "BabyCenter",
      ],
    },
    {
      id: "exp-extensity",
      company: "Extensity / Geac / Infor",
      period: "1999 – 2007",
      roles:
        "Principal Professional Services Consultant → Team Lead, Custom Solutions Group",
      bullets: [
        "Owned end-to-end delivery of enterprise software implementations (discovery, requirements, implementation, training, and support handover) across a portfolio of complex domestic and international clients",
        "Built multi-currency and exchange rate support from scratch, enabling the company's first international enterprise deployments (Cisco, Sybase); those capabilities were later incorporated into the core product",
        "Worked directly with engineering to drive bug fixes and code changes into the product codebase",
        "Spent 18 months in the UK as lead technical member of the founding professional services team; trained and mentored three colleagues, hands-on across all client implementations",
        "Led a team of professional services developers implementing custom solutions across the client base",
      ],
      notableCustomers: [
        "Cisco Systems",
        "Sybase",
        "Ernst & Young",
        "ATKearney",
        "State of Alaska",
        "Franklin Investments",
        "Lawrence Livermore National Labs",
        "Memorial Sloane Kettering Cancer Center",
        "UCLA",
        "McKinsey & Co.",
      ],
    },
  ],

  education: [
    {
      id: "edu-berkeley",
      degree: "Bachelor of Arts in Computer Science",
      school: "UC Berkeley",
    },
  ],
};
