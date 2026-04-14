# Duane Pinkerton — Skills & Expertise in Depth

*How Duane actually uses these skills, at what depth, and in what contexts.*
*Built through Q&A sessions — more specific than the resume's skill list.*

---

## Customer Engagement

### Requirements Discovery

When Duane sits down with a customer for the first time, the first thing he does is listen. The goal is to hear as much of their story as possible — what they're trying to accomplish from their perspective, and what their current solutions are. Critically: finding out what *isn't* working with the current solution is often the most direct indicator of what success will look like for the new implementation.

During this listening phase he takes notes on things to return to, and is simultaneously beginning to visualize how the solution will meet their goals. Once the conversation becomes interactive, he draws on experience from previous implementations to ask about scenarios the customer may not have considered and blind spots they may not see. A customer knows their business deeply; they don't necessarily know what questions they should be asking about the product.

A key technique: restate what you've heard in your own words. This surfaces misunderstandings in both directions — things you didn't understand correctly, and requirements the customer forgot to mention until they hear them reflected back.

### Gap Analysis

Gaps are where customer requirements aren't part of the out-of-the-box offering. Duane's framing: *know where all the corners and gaps are in the product, because that's where the opportunity lies.*

There are three ways to fill a gap:
- **Configuration outside normal scope** — something the product can do that isn't in the standard implementation path
- **Features or add-ons** the customer wasn't aware existed
- **Custom development** — building what doesn't exist

Customers are almost never satisfied with "we'll get that into the product roadmap for an upcoming release." If Duane knows the product well, gaps are being mentally slotted into one of those three buckets in real time, during the conversation. The dialogue that follows sounds like: *"It doesn't really do it like A, but it can do B and C — will that work for you?"* or *"We don't really offer that, but let me go back and tweak some dials and see what's possible with a custom solution. Can I get back to you in a couple of days?"*

### Knowing When to Build vs. Configure

This judgment comes almost entirely from product depth. The consultants who reach for custom development first are usually the ones who don't know the product well enough to see the configuration path.

**Talked out of a custom build:** A colleague at Responsys was heading toward writing custom automation to split a large file into smaller segments to meet a customer's server limitations. They weren't aware that file splitting — using multiple approaches — was already built into the Standard Framework. A few minutes of conversation redirected the implementation to something that was already tested and maintained.

**Custom build was the right call:** The Extensity/Cisco international deployment. After extensive investigation and attempts to configure around the gap, the product simply had no way to convert foreign currency expenses to a user's home currency at transaction time. The solution required custom math added to the UI — pulling from a custom exchange rate table Duane built — to perform the conversion. There was no configuration path. It had to be built.

---

## Languages & Scripting

Duane's view on programming languages: programming is programming — languages are syntax. This isn't a deflection; it reflects how he actually works. He evaluates which language is right for a given environment based on what tools are already available, what the performance characteristics need to be, and what the problem actually requires.

### Bash / Unix Shell — Deep

This is Duane's most-used language by volume. When he joined Responsys, the environment was already bash-based, and after evaluating alternatives, he concluded bash was the right tool for the job: the Unix environment already provided everything needed — `ftp`, `sftp`, `http` for file transfer; `zip`, `tar`, `gz` for compression; `pgp` and `GPG` for encryption; `sqlldr` and `sqlplus` for database access. There was no reason to introduce a heavier runtime. Shell also gave maximum throughput with minimum overhead — Java in particular can be a significant memory and CPU consumer for the kind of work the Standard Framework was doing.

The only places where a true programming language was needed: API access. SOAP calls were written in Java; REST calls in Python.

The Standard Framework itself started simply — supporting multiple accounts sending multiple zip files containing multiple data files for the Williams Sonoma group (also including Pottery Barn and West Elm). It grew as customer requirements evolved, eventually incorporating multiple shared libraries and parallel processing. Over 4,000 lines at its peak.

### Java — Proficient (debugging and patching depth)

Duane's Java foundation came from Extensity, whose product was written in Java. He didn't do heavy original Java development there but became deeply familiar with the codebase through debugging, bug fixes, and patches — including writing the multi-currency and exchange rate features from scratch during the UK deployment.

At Responsys, he wrote the SOAP API integration in Java. That code is still in production.

His Java depth is strongest on the diagnostic and modification side — reading unfamiliar Java codebases, understanding what they're doing, and making targeted changes — rather than greenfield Java architecture.

### Python — Proficient (growing)

Duane's most notable Python work came from a specific constraint: modern Oracle SQLPlus doesn't handle blob objects. In the containerized OCI solution, the team needed to read and write blobs. He wrote the packages to handle blob object management for that environment.

He also wrote a REST API solution in Python to replace the legacy SOAP integration — but it hadn't been deployed to production before he left Oracle.

Python is where he's actively building more depth, particularly around API work and AI tooling.

### SQL — Strong

SQL is one of Duane's strongest technical skills, developed over two long tenures with very different scale requirements.

At Extensity, the entire account configuration for a customer was built as a single SQL script — it dropped, created, and populated tables. Writing and debugging those scripts gave him a thorough grounding in relational data modeling and SQL as a deployment tool.

At Responsys/Oracle, the scale was enterprise: tables with up to a billion records. That environment taught him how to apply indexes and partitions judiciously — knowing when they help, when they hurt, and how to structure queries to work with large datasets efficiently rather than against them. SQL performance tuning became a genuine specialty.

### REST APIs — Developing

By Duane's own honest assessment: REST is relatively new to him. He describes himself as a better REST hacker than author at this point — comfortable reading, calling, and adapting existing APIs, less experienced building them from scratch. The Python REST replacement for the Responsys SOAP integration was his most substantive original REST work, and it didn't reach production before he left.

---

## Infrastructure

Duane's infrastructure experience spans production Oracle-scale systems, and he's honest about where his depth is strong versus where he's still building it. He doesn't overclaim.

### Docker — Strong

Docker is where Duane has the most hands-on infrastructure depth. His primary work was replicating the bare metal environment inside containers — evaluating which packages were needed to run the software and building images that matched the production environment accurately.

The most technically complex piece was a custom init script he wrote to build customer-specific environments inside the container at startup. Every customer account had its own configuration: `.ssh` folder setup, encryption keys, and the specific scripts configured for that account's integration jobs. On bare metal, these were set up statically. In a container that spins up fresh, they need to be reconstructed.

To handle this securely, all sensitive data — encryption keys, passwords, email addresses — was stored in GPG-encrypted files in a database table. When a container initialized, the init script pulled those secrets from the database, decrypted them, and installed them in the correct locations so the scripts could run successfully. This ensured that sensitive credentials were never stored in the container image itself.

### Kubernetes — Working Knowledge (actively expanding)

Duane describes himself honestly as a Kubernetes user rather than a Kubernetes administrator during the Oracle years. His production experience covers: working with namespaces, starting and stopping containers, checking status, and pulling logs for diagnostics. The deeper configuration — cluster setup, CI/CD integration, ingress configuration, orchestration design — was owned by a dedicated ops teammate.

He's actively expanding this through personal projects, including deploying applications on k3s, configuring ingress-nginx and cert-manager, and managing deployments through GitHub Actions CI/CD pipelines. The interactive resume project itself is a concrete example of this hands-on work.

### OCI (Oracle Cloud Infrastructure) — Novice

Duane has navigating familiarity with OCI — finding and working with stored objects, basic email configuration, and vault setup. He's worked within the platform as part of a larger team's infrastructure, but doesn't claim depth here. Self-described novice.

### Git — Proficient

Regular production use of Git throughout the Oracle years: committing code changes, managing branches, handling merges, and resolving conflicts. Gaining broader practical experience through personal GitHub projects, including working with GitHub Actions workflows and GitHub Container Registry.

### Jenkins — Familiar (user, not builder)

Duane has experience using Jenkins CI/CD pipelines built and maintained by the operations team. He's comfortable with the concepts — pipeline stages, build triggers, deployment steps — and navigating Jenkins as a user. He hasn't designed or built a Jenkins pipeline himself. His current CI/CD work is with GitHub Actions.

---

## Data Pipeline Architecture & SQL Performance

Duane's mental model for data pipeline architecture moves through four layers:

**1. Understand the data first.**
Before anything else: how do the tables and files relate to each other? What are the primary keys? What are the constraints? What volume is expected — thousands of records, millions, billions? The shape of the data determines everything that follows. This isn't a quick step.

**2. Understand what needs to happen to the data.**
Does the customer need a report? A consolidation of multiple sources into one? Interpretation — taking many records and boiling them down into something actionable? The goal defines the approach. A pipeline that generates a report is architecturally different from one that merges two data sources or transforms raw records into aggregated summaries.

**3. Match the available tools to the goals.**
Are we merging tables? Running queries across multiple tables? Transforming data in flight? The tool selection follows from the data shape and the goal — not the other way around.

**4. Design for performance from the start.**
This is where Duane's experience with billion-record tables at Oracle is most relevant. The questions he's thinking about:

- **Indexes**: Where do they help, and what's the cost? Every index speeds up reads and slows down writes. You don't put them everywhere — you put them where the query patterns justify the overhead.
- **Partitioning**: On very large tables, partitioning means queries and writes only touch the relevant slice of data rather than the full table. The difference between querying a billion-record table and a ten-million-record partition is not incremental.
- **Multi-step intermediate tables**: Sometimes the right architecture is to run a large query into a new staging table first, then query from that. Breaking complex operations into steps can make individually acceptable queries out of what would otherwise be one unacceptably slow one.
- **PL/SQL blocks**: Wrapping queries in PL/SQL lets the database process data in controlled batches rather than attempting to hold everything in memory at once. Essential at scale.

Duane's summary of the discipline: *the architecture is in understanding the data, and applying the right tools to accomplish the work in an appropriate amount of time.* The tools are well-known. The judgment about which tool belongs where, and in what order, is what experience gives you.
