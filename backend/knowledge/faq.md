# Duane Pinkerton — Common Questions & Answers

*Answers to questions a recruiter, hiring manager, or colleague might ask.*
*Written in Duane's voice, based on Q&A sessions.*

---

## Why did you leave Oracle?

The writing was on the wall. Duane had already put a plan in motion to find a new opportunity and was actively working on brushing up his skills. The timing simply didn't work out — he wasn't able to arrange the next role before the previous one ended. He's straightforward about this: no drama, no bad blood, just a transition that didn't land on the schedule he'd hoped for.

---

## What kind of role are you looking for?

A role that leverages his experience as a Solutions Architect and DevOps engineer while keeping him engaged with new technology. He's specifically excited about deploying AI — it sits at the intersection of his customer-engagement instincts and his technical depth, and it's where he's putting the most energy right now. The Forward Deployed Engineer title is the closest match to what he's been doing for 26 years, updated for the current era.

---

## What does a typical customer engagement look like for you, start to finish?

The standard answer is requirements gathering, scoping, execution, documentation, deployment. What Duane actually cares about is what happens inside that process: building a real relationship with the customer's team, and genuinely digging into the challenges they're trying to resolve — not just the ones they put on the scope document. His primary goal is always to deliver a solution that meets or exceeds expectations, and he finds the relationship piece is what makes the difference between a successful project and a great one.

---

## Tell me about a time a customer engagement went sideways. What happened?

Two situations stand out, at very different scales.

**The Cisco deployment at Extensity:** Cisco had purchased a product that couldn't actually meet their requirements for international expense management — no multi-currency support, no exchange rate handling. Duane's response was to change the product. He built the missing capability himself, working across time zones while the dev team slept, and the code eventually made it into the product permanently. The lesson: sometimes "sideways" means the product has to grow.

**The Responsys storage failure:** At the company level, a significant storage solution failed catastrophically — both the primary data source and the backup were lost. It became an all-hands moment across the company. Duane's responsibility was to reload any customer data he had access to, and to ensure any new data coming in was processed as the absolute top priority.

What he took from both situations: acknowledge the failure early, communicate with the customer regularly, and put everything into resolving it correctly and quickly. Get other people involved — many hands make light work, and nobody should be an island in a crisis.

---

## What's your experience with non-technical stakeholders?

Duane does well with them and genuinely enjoys it. He's approachable, patient with questions, and happy to fill in understanding as a project moves along. He's also had a lot of practice — he's easily the geekiest person in his friend group, so breaking down technical concepts for people who didn't ask for a technical career is something he's been doing his whole adult life. He doesn't talk down; he translates.

---

## What's your management experience?

Duane has never been a people manager, and he's honest that several aspects of that role don't appeal to him. What he has done — and enjoyed — is serve as team lead on multiple occasions. He likes sharing knowledge, helping teammates become more productive, and collaborating on architectural decisions. His approach to leadership is through expertise and mentorship, not org chart authority.

---

## What debugging process do you use when something breaks in production?

Start by getting the full story of exactly what's happening — not assumptions, the actual reported behavior. Then: logs and source. Trace the reported error to what the logs show, then trace the logs to the source code to understand what it's supposed to be doing and where it's diverging.

If possible, deploy a modified version with additional debugging — including output of the data the code is actually working with at the point of failure. If a code change is required, make sure the debugging improvements make it into the production code too, not just the hotfix. Future diagnosis should be easier than the one you just did. (Keeping PII out of logs, obviously.)

---

## How do you decide what to build vs. what to buy vs. what to configure?

There's a lot to balance. The scale of the tool matters first: a CRM platform is a buy; a script to process log output is a build. For purchased tools, he looks at the company's longevity — will this vendor exist in five years? For open source, he looks at how actively the code is maintained. A good tool is flexible enough to be configured for divergent needs; a brittle one that can only do one thing is a risk regardless of how well it does that one thing.

The deeper judgment: what's the cost of being wrong? A bad buy is expensive and slow to undo. A bad custom build is a maintenance burden forever. Configuration is usually the right answer when the product can actually do the thing — the mistake is reaching for custom development before you've fully explored what the product already does.

---

## What kind of team and company environment brings out your best work?

Collaborative and customer-focused. Duane firmly believes that a customer's success is what drives revenue, not the other way around. He picked up a line early in his career — working in a restaurant in school, his manager told him: customers vote with their feet. Most won't tell you when they've had a bad experience; they just won't come back. A happy customer tells two people. An unhappy one tells ten. That framing stuck.

He works best when the team around him shares that orientation — when doing right by the customer is the default, not a trade-off.

---

## What are you less good at, or actively working to improve?

Focus, in an era built to destroy it. Duane has had periods where distraction was a real challenge. He's been working on it deliberately and has made significant progress recently — which he notes is especially meaningful given that he currently has no employer setting expectations. The discipline is coming from within.

---

## What's your take on AI — where is it going?

He's thought about this seriously, including following interviews and perspectives from people much closer to the cutting edge than he is. There's plenty of doom-and-gloom framing out there, and while the risks are real and technically possible, that's not where his attention goes.

His actual view: AI gives us capabilities we simply didn't have before. It can remember things we forget. It can sustain focus on tasks that would bore a human. It can expand what any individual can know and do. The interesting territory isn't AI versus humans — it's what humans and AI can accomplish together that neither could manage alone. That's what he finds genuinely exciting, and it's why he's building toward it rather than watching from a distance.

---

## What projects are you most proud of?

Three stand out:

**The international deployments at Extensity** — enabling the company's first international enterprise customers (Cisco, Sybase, Ernst & Young, ATKearney) by building multi-currency and exchange rate support from scratch while living in the UK. Early career, high stakes, real impact. These were the first feathers in his cap.

**The Standard Framework at Responsys** — 4,000+ lines of bash that replaced a sprawling collection of copy-paste scripts and became the data integration standard for the entire professional services organization. He designed and built it, watched it grow to support 200+ production jobs across 80+ enterprise customers, and owned it for nearly two decades. The architecture held.

**The Docker images for the containerized platform at Oracle** — a genuinely interesting technical challenge: replicating a multi-user bare metal environment inside a Docker container, including a custom init script that pulled encrypted secrets from a database at startup, decrypted them, and built each customer's specific environment from scratch on every container launch. Clean, secure, and reproducible.
