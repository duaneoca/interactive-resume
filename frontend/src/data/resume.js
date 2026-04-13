export const resumeData = {
  name: "Duane Pinkerton",
  contact: {
    email: "duaneo@gmail.com",
    phone: "510.541.0141",
    location: "Oakland, CA",
    github: "github.com/duaneoca",
  },

  summary: `Twenty-six years in technical professional services, consistently at the intersection of deep implementation work and direct customer engagement. My career has been built around a specific loop: sit with a customer, understand what they actually need, figure out where the product falls short, and go write the missing piece. I've built data pipelines and integration systems from scratch, owned them end-to-end through production at enterprise scale, and made the architectural decisions about how they grow. I'm drawn to understanding how systems work — and to making them work better.`,

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
      items: ["Java", "Python", "SQL", "Unix/Shell", "REST APIs"],
    },
    {
      id: "skills-infra",
      category: "Infrastructure",
      items: ["Docker", "Kubernetes", "OCI", "Git", "Jenkins"],
    },
    {
      id: "skills-technical",
      category: "Technical Strengths",
      items: [
        "SQL performance tuning",
        "Data pipeline architecture",
        "Distributed systems operations",
      ],
    },
  ],

  currentProjects: [
    {
      id: "proj-ha-agents",
      text: "Building AI agents and agentic workflows for Home Assistant using prompt engineering — natural-language control of automations, device states, and scenes through conversational AI",
      chatPrompt: "Tell me about your Home Assistant AI agent work.",
    },
    {
      id: "proj-ha-llm",
      text: "Using LLMs to diagnose system and configuration issues in Home Assistant — treating AI as a knowledgeable first-responder for troubleshooting",
      chatPrompt: "How are you using LLMs for Home Assistant troubleshooting?",
    },
    {
      id: "proj-n8n",
      text: "Building workflow orchestration pipelines in n8n, connecting APIs and services in ways that weren't practical before LLMs",
      chatPrompt: "Tell me about your n8n workflow automation work.",
    },
    {
      id: "proj-ai-academy",
      text: "Completing Anthropic's AI Academy",
      chatPrompt: "Tell me about your AI learning and development.",
    },
    {
      id: "proj-ai-app",
      text: "Building an application that uses AI both as a development tool and as a runtime feature — currently in early design and development",
      chatPrompt: "Tell me about the AI application you're building.",
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
            "Designed and built the company's custom data pipeline and integration framework from scratch — it replaced 95% of existing custom scripts in production and became the standard across the professional services organization, eventually supporting 200+ production jobs across 80+ enterprise customers",
            "Owned end-to-end delivery of customer engagements: discovery, requirements, documentation, implementation, custom development, and handover to support",
            "Trained consultants and partners on implementation best practices; served as the primary subject matter expert for custom data integration across the organization",
          ],
        },
        {
          id: "exp-oracle-owning",
          title: "Owning the Platform",
          period: "2013 – 2026",
          bullets: [
            "Following Oracle's acquisition and consolidation of the professional services organization, transitioned into an operations role to preserve and evolve the platform — made key architectural decisions around reliability, redundancy, and capacity planning",
            "Led the migration of the entire environment from bare metal to a containerized infrastructure on OCI using Docker, Kubernetes, Git, and Jenkins — completed with zero significant downtime events",
            "Responsible for deploying the environment in new datacenters as the platform expanded",
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
        "Owned end-to-end delivery of enterprise software implementations — from discovery through training and support handover — for a portfolio of complex domestic and international clients",
        "Built multi-currency and exchange rate support from scratch, enabling the company's first international enterprise deployments — including rollouts for Cisco and Sybase across their global offices; those capabilities were later incorporated into the product itself",
        "Worked directly with engineering to get bug fixes and code changes into the codebase",
        "Spent 18 months in the UK as the lead technical member of the founding professional services team — trained and mentored three colleagues and was hands-on across all client implementations",
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
