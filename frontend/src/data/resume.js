export const resumeData = {
  name: "Duane Pinkerton",
  contact: {
    email: "duane@hire-duane.org",
    phone: "510.519.1105",
    location: "Oakland, CA",
    github: "github.com/duaneoca",
    linkedin: "linkedin.com/in/duane-pinkerton",
  },

  summary: `20+ years in technical professional services, at the point where deep implementation work meets direct customer engagement. The loop has always been the same: sit with a customer, understand what they actually need, find where the product falls short, then go write the missing piece. I've built data pipelines and integration systems from scratch, owned them through production at enterprise scale, and made the architectural decisions about how they grow. I'm drawn to understanding how systems work, and to making them work better.`,

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
      text: "Built and deployed an agentic email pipeline: a LangGraph agent that classifies job emails, pulls structured data out of them through a Classifier+Critic validation loop, and hands genuinely ambiguous cases to a human over Slack. Langfuse for observability, MCP servers on both ends. Wrote the threat model before any code, then built against it: prompt injection, stored XSS, and cross-tenant access each have a specific mitigation.",
      chatPrompt: "Tell me about your agentic email pipeline project.",
    },
    {
      id: "proj-hermes-sat",
      text: "Designed and built private voice assistant devices on Raspberry Pi and ReSpeaker hardware: wake word, speech-to-text, and speech synthesis all run on the device itself, feeding a self-hosted AI agent hands-free. Each unit keeps its own memory scope and listens on no inbound ports",
      chatPrompt: "Tell me about your private voice assistant project.",
    },
    {
      id: "proj-ai-app",
      text: "Launched two production AI sites. hire-duane.org is an interactive resume with RAG-backed chat and job-fit evaluation, built to be readable by crawling agents. job-radar.net runs on AWS and handles multi-provider job search with AI scoring, resume tailoring, application workflow, and interview prep",
      chatPrompt: "Tell me about the AI-powered sites you've built.",
    },
    {
      id: "proj-openbrain",
      text: "Deployed OpenBrain behind custom MCP servers: a model-agnostic memory layer on PostgreSQL and pgvector that answers semantic queries from Claude, ChatGPT, Cursor, or any MCP client, all against one shared knowledge base",
      chatPrompt: "Tell me about your OpenBrain and MCP server work.",
    },
    {
      id: "proj-n8n",
      text: "Automated multi-step workflows in n8n, wiring APIs and services together with LLM-powered decision nodes",
      chatPrompt: "Tell me about your n8n workflow automation work.",
    },
    {
      id: "proj-ha-agents",
      text: "Wrote conversational agents for Home Assistant that handle automations, device states, and scenes in plain language",
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
            "Designed and built the company's data pipeline and integration framework from scratch. It replaced 95% of the custom scripts running in production, became the standard across professional services, and grew to carry 200+ production jobs for 80+ enterprise customers",
            "Owned end-to-end delivery of customer engagements: discovery, requirements gathering, documentation, implementation, custom development, and handover to support",
            "Trained consultants and partners on implementation best practices; primary subject matter expert for custom data integration across the organization",
          ],
        },
        {
          id: "exp-oracle-owning",
          title: "Owning the Platform",
          period: "2013 – 2026",
          bullets: [
            "Fielded the final escalations on production data integration issues, joining customer calls as the subject matter expert. As the author of the framework, the buck stopped there: anything that could not be resolved was an infrastructure problem, not an integration one.",
            "Made the architectural decisions on reliability, redundancy, and capacity planning after Oracle acquired the company",
            "Led the migration of the whole environment from bare metal to containers on Oracle Cloud Infrastructure (OCI), using Docker, Kubernetes, Git, and Jenkins, and finished it without a significant downtime event",
            "Deployed the environment in new datacenters as the platform expanded",
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
        "Ran enterprise software implementations start to finish, from discovery and requirements through training and support handover, for domestic and international clients",
        "Built multi-currency and exchange rate support from scratch, which made the company's first international enterprise deployments possible at Cisco and Sybase. The features later shipped in the core product",
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
