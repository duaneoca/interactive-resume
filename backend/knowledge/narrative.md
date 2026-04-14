# Duane Pinkerton — Career Narrative

*The "why" behind the resume: motivations, decisions, the arc of the career.*
*Built through Q&A sessions — richer and more personal than the resume itself.*

---

## Career Philosophy

Duane has never been a job-hopper. His career is defined by two long tenures — eight years at Extensity/Geac/Infor, and nearly twenty at Responsys/Oracle — and the through-line in both is the same: when the work is interesting and the people are good, there's no motivation to leave. He builds deep context, deep relationships, and deep ownership over time, and that's how he does his best work.

When he has moved, it hasn't been chasing the next shiny thing. It's been following the team.

---

## Extensity / Geac / Infor (1999–2007)

### Early Growth

The Extensity years were a formative period — both Duane and the company were growing rapidly at the same time. New features were coming out constantly, and customer engagements were directly feeding product direction. Duane was at the intersection of those two things: his work with clients surfaced needs that became product features, and he was close enough to the product and the team that those loops were short.

### The UK Expat Period

The opportunity to spend 18 months in the UK as the founding member of the European professional services team was, by Duane's own account, fantastic. He got to travel extensively and build something from scratch in a new market.

It also created a technical challenge that defined a key part of his career. The Extensity product had no multi-currency support — no ability to handle exchange rates between the currency of an expense and a user's home currency. For a domestic product going international for the first time, this was a fundamental gap.

The normal path — submit a feature request, wait for the US development team to build it, wait for a release cycle — wasn't viable. Duane was several time zones ahead of headquarters, and client engagements don't wait for release schedules.

Because Extensity was still a startup, the team had access to the Java source code. Duane's solution: while the development team in the US was sleeping, he'd write the missing feature himself, test it, and package it up for the release team to review and formally build. During active client engagements, they'd sometimes be running his hand-compiled version of the product. Before any go-live, the release team would ensure the official build was what got deployed.

That multi-currency and exchange rate work was eventually incorporated into the product permanently — enabling the company's first international enterprise deployments for clients like Cisco and Sybase across their global offices.

### The Pattern This Established

This experience — finding a gap, building the missing piece yourself, owning it through to production — became the defining pattern of Duane's career. He did it again at Responsys, at a much larger scale.

### Leaving Extensity

After eight years, Duane wasn't looking to leave. The decision was made for him by circumstance. Two of the five people on his team left for other jobs. Then his manager resigned. Then his manager's manager. The future of the product was looking uncertain, and his workload was about to double or triple on a collapsing team.

At the same time, former colleagues who had already moved to Responsys were actively recruiting him.

The framing Duane uses: he wasn't leaving one company to join another. He was rejoining a team he'd already been on. That made the decision obvious.

---

## Responsys / Oracle (2007–2026)

### Building the Platform (2007–2013)

When Duane joined Responsys, the data integration environment was a collection of dozens of one-off shell scripts — each one a copy-paste of another with the necessary modifications made by hand. There was a line at the top of many of those scripts that truncated a table. Nobody knew why it was there. They just left it in because it had always been there. That's the kind of codebase it was.

Duane was brought in with a specific mandate: implement data pipelines for customers, and build a reliable, scalable codebase for data integration. The second part was the architectural problem, and it's what he's most proud of from that period.

He built what he called the Standard Framework — a single bash script driven by a properties file. Instead of copy-pasting scripts and modifying them by hand, you'd write a properties file that configured what the script should do for a given job. All jobs shared the same common code. Configuration, not duplication.

The framework started small and grew as new requirements came in from customers — eventually reaching over 4,000 lines of bash shell script. Its capabilities grew to include:

- Loading, merging, and extracting data from tables
- Launching data integration jobs with the Responsys product
- File handling: encryption, decryption, and compression
- Communication libraries for FTP, SFTP, and SCP — plus customer-specific protocols like MDX and AWS integrations
- A common interface that let scripts communicate with external servers through standard protocols

The architectural approach Duane used throughout: look at what a teammate is requesting, find the solution that makes the fewest changes to the codebase, and build it with future needs already in mind. He spent real time anticipating where the platform was going, not just where it was. That meant changes tended to be additive rather than disruptive — and the platform remained coherent even as it grew to support 200+ production jobs across 80+ enterprise customers.

Adoption was smooth. The rest of the professional services team was not made up of coders, so having a well-engineered framework that handled the hard parts and let them configure rather than code made their lives easier. The Standard Framework became the standard because it earned it.

Duane also owned the full customer engagement cycle during this period: discovery, requirements, documentation, implementation, custom development, and handover to support. He trained consultants and partners on implementation best practices and was the primary subject matter expert on custom data integration across the organization.

### The Oracle Acquisition and Owning the Platform (2013–2026)

Oracle acquired Responsys in 2013. Oracle's general philosophy toward professional services is well-known in the industry: they prefer customers to contract professional services through third parties rather than maintaining internal teams. As a result, Oracle made a significant staff reduction to the professional services organization shortly after the acquisition.

Duane and several colleagues were moved into an operations group specifically to preserve their knowledge and expertise — the institutional understanding of the platform was too valuable to lose. In that operations group, the role expanded substantially: rather than working with a portfolio of customer engagements, the team was now responsible for supporting all customer implementations and maintaining the systems that ran those integrations across the entire platform.

Duane became an on-call employee. That meant regular late-night diagnostic sessions — something goes wrong in production at 2am, and he's the person working out what happened and how to bring the environment back up. It also meant participating in maintenance windows: starting and stopping applications as infrastructure was updated, being involved in software version upgrades, testing and verifying changes before they went to production. The team didn't have complete ownership of the infrastructure at this point but were deeply embedded in every change that touched it.

**Infrastructure evolution over 13 years:**

The platform went through several generations of infrastructure during this period, and Duane was involved at each stage:

1. **Bare metal → virtual hosted**: Oracle moved from bare metal to a semi-automated, virtually hosted version of the product. As part of this, Duane was entirely responsible for defining the data integration environment in a way that it could be automatically deployed alongside the product.

2. **OCI containerization**: When Oracle brought OCI live, there was a strong push to migrate to a fully containerized architecture. The team became entirely responsible for their data integration environment — developing Docker images and deploying containers through Kubernetes using infrastructure managed by the broader Oracle operations team. Job scheduling moved from cron to Argo Workflows.

**An honest note on the containerization work:** In this final architecture, Duane was primarily responsible for owning the Docker images — defining what went into the containers, maintaining them, and ensuring they ran correctly. A teammate owned the Kubernetes configuration, CI/CD pipeline, and Argo orchestration. So while Duane has solid working knowledge of Kubernetes (and is actively building more hands-on experience with it now through personal projects), his deepest production expertise in this stack is on the Docker and container side rather than the orchestration layer.

This distinction matters: Duane is honest about where his depth is and where it isn't. He knows what he knows well, and he knows what he's still building.

---

## The Current Chapter — What Duane Is Doing Now and Why

Duane left Oracle in 2026 after nearly 20 years. He's honest about the context: it's a tough job market, and the pivot he's making is a deliberate one, not a casual exploration.

The target role is Forward Deployed Engineer — a title that's become one of the hottest in the industry, particularly at AI-focused companies. FDE roles sit at the intersection of deep technical work and direct customer engagement. They require someone who can understand what a customer actually needs, figure out where the product falls short, and go build the missing piece. That description is essentially Duane's entire career.

His core strengths map directly to what FDE roles require:
- Requirements discovery and gap analysis — 26 years of it
- Translating technical constraints into business terms — what professional services consulting is
- End-to-end ownership of customer implementations — from discovery through production
- Building things that didn't exist, then being accountable for them long-term

Where he's actively building: infrastructure and AI. His Docker and containerization experience is solid from the Oracle years. His Kubernetes and CI/CD depth is more recent and he's building it hands-on through personal projects — deliberately deploying applications on k3s, using GitHub Actions, setting up ingress and cert-manager from scratch. This interactive resume site is one of those projects. There will be more.

On AI: he's been building AI agents and agentic workflows for Home Assistant using prompt engineering, using LLMs for system diagnostics, building workflow orchestration with n8n, and completing Anthropic's AI Academy. He's not coming from a background where AI was his day job — but he understands systems, he understands customers, and he's actively learning the AI tooling with the same approach he's always used: build something real with it.

The honest summary: the customer-facing and requirements side is deep and long-established. The infrastructure and AI sides are newer but being built deliberately, in public, with real deployments. That combination — proven customer and implementation instincts plus hands-on modern infrastructure and AI work — is what makes the FDE path a natural fit rather than a stretch.

---

## What "Interesting Work" Means to Duane

From the pattern across his career:
- Work that creates real ownership — not just executing someone else's design, but making the architectural decisions
- Being close enough to customers that the work has direct feedback loops
- Building things that didn't exist before, and then being accountable for them long-term
- Teams with strong relationships and mutual trust
- Problems where the gap between "what exists" and "what's needed" is clear, and the path to closing it is his to define
