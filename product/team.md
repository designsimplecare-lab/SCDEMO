# SimpleCare agent team — operating model

**Team size:** 25 agents (17 product and build, plus 8 marketing).

**Onboarding:** every agent starts with [`handbook/00-start-here.md`](handbook/00-start-here.md), then
[`handbook/01-rules.md`](handbook/01-rules.md), [`handbook/02-evidence.md`](handbook/02-evidence.md) and
[`process.md`](process.md). **No agent takes a task until it is certified:** see
[`training/`](training/README.md). Tasks live in [`tasks/`](tasks/README.md).

**Goal:** make SimpleCare the best virtual family practice in Canada. Win BC first, then compete
nationally with Maple, TELUS Health, Tia Health and the BC virtual walk-ins (Walk In, Avee, 121Clinicians).

**What we are:** a physician-led virtual family practice, MSP-covered with private pay available,
serving walk-in visits, ongoing care and people looking for a family doctor. Care happens by outward
phone calls in call windows, with a live queue (simplecare.ca). The product is three portals over one
record: physician, MOA and patient.

**Humans who decide:**
- **Dr. Daniel Pannozzo** owns clinical and business decisions. His exact words are the spec.
- **Ani** owns design and product, and is the only one who approves a deploy.
- **Agents draft and analyse; people sign.** Privacy officer, clinical-safety sign-off, legal and
  regulatory approval, and every clinical rule (doses, thresholds, protocols) belong to accountable
  people.

## The roster

| Area | Agent (`.claude/agents/`) | Owns |
|---|---|---|
| Users | `doctor` | The physician's view; walks use cases like a live call |
| | `moa` | The MOA's view: tasks, faxes, billing fixes, sending renewals |
| | `patient` | The patient's view: booking, the queue, uploads, reported readings, clear language |
| Product | `product-manager` | `product/` docs: use cases, requirements, decisions, open questions |
| | `ux-researcher` | Shadowing analysis, usability test scripts, time-on-task |
| | `market-strategist` | Competitors, positioning, growth, what makes us number 1 |
| Design | `ux-designer` | Interaction and visual design in the prototypes |
| | `content-designer` | Words: microcopy, patient letters, handout templates, tone |
| | `accessibility` | WCAG 2.2 AA audits and fixes guidance |
| Safety and trust | `clinical-safety` | Clinical risk log per feature; safe defaults; what needs Daniel |
| | `privacy-security` | Privacy (PIPA BC / PIPEDA / PHIPA), security controls, PIA drafts |
| | `qa-engineer` | Test scripts from use cases; design-rule and regression checks |
| Build | `tech-lead` | Architecture, data model (FHIR), prototype-to-production plan |
| | `integrations-engineer` | PharmaNet, labs (PLIS/Excelleris/LifeLabs), Teleplan, eFax, registries |
| | `frontend-engineer` | Design system as components; production-grade UI code |
| | `ai-engineer` | Ambient scribe, summaries, guardrails; the doctor always signs |
| | `billing-msp` | MSP/Teleplan and private-pay rules, claims and rejections |

## Marketing department

| Agent (`.claude/agents/`) | Owns |
|---|---|
| `marketing-lead` | Strategy, brand and positioning (`marketing/brand.md`), the quarterly plan and KPIs, campaign briefs, and coordinating the team |
| `social-media-manager` | Organic social: the content calendar, posts, short-video scripts, community replies |
| `content-seo` | Search: the SEO audit, keyword map, concern landing pages, health articles and FAQs |
| `performance-marketing` | Paid acquisition, the funnel, the tracking plan (privacy-safe), A/B tests and dashboards |
| `brand-designer` | Social and ad creatives, storyboards, templates, all on SimpleCare Paper |
| `lifecycle-crm` | Reminders, queue notifications, post-visit follow-ups and newsletters (CASL-compliant) |
| `partnerships-pr` | Pharmacy and community partnerships, press, and physician recruitment |
| `marketing-compliance` | The gate. It reviews every public draft for health-advertising, drug-promotion, CASL, privacy and claims rules |

**Channels the marketing team owns** (Ani, 26 Sep 2026: "give our web and social to the marketing team to
analyse and be owner of it")
| Channel | Owner | Supporting |
|---|---|---|
| Website, https://simplecare.ca | `content-seo` | `performance-marketing` (funnel), `brand-designer` |
| Instagram, https://www.instagram.com/simplecareca/ | `social-media-manager` | `brand-designer` |
| Facebook, https://www.facebook.com/SimpleCare.CA | `social-media-manager` | `brand-designer` |
| All channels, overall | `marketing-lead` | `marketing-compliance` (the gate) |

"Owner" means the agent audits the channel, keeps its plan and calendar, and drafts every change and
post. A person with the account still publishes, after Ani approves.

**Marketing rules**
- **Drafts only.** No agent posts, publishes, sends, schedules, spends money or logs in to any
  account. Ani approves everything.
- **Every public draft goes through `marketing-compliance` first.** Health content also needs
  Daniel's clinical review.
- **No patient information** anywhere in marketing.
  - No patient stories, faces or testimonials without documented consent, and physician-advertising
    rules may restrict testimonials even with it.
  - No health or concern data in ad pixels or targeting.
- **No prescription-drug promotion to the public.** Don't name prescription brands for weight loss,
  ED, hair loss and the like.
- **No claim without a source.** No "best" or "#1" without evidence. No invented numbers or reviews.
- **Where it goes:** everything is in `marketing/`. `marketing/brand.md` is the source of truth for the
  brand, and `marketing/plan.md` holds the plan. Reports go in `marketing/reports/`.
- **The marketing flow:** `marketing-lead` writes the brief → the specialists draft →
  `brand-designer` makes the visuals → `marketing-compliance` reviews → Ani approves → a person posts.

## How work flows

1. **Input arrives.** A recording, a message from Daniel, a meeting, or a request from Ani.
2. **Understand it.**
   - `ux-researcher` writes up the observation, in `shadowing/` or `research/`.
   - `product-manager` updates `product/` and adds the questions to `open-questions.md`.
3. **Decide what matters.**
   - The persona agents (`doctor`, `moa`, `patient`) each rank their asks.
   - `market-strategist` says what moves the market.
   - `product-manager` merges all of it into a prioritised list, P1–P3.
4. **Design it.**
   - `ux-designer` builds the change; `content-designer` writes the words.
   - Before building, `tech-lead` and `integrations-engineer` say whether it is feasible in
     production.
5. **Check it.**
   - `qa-engineer` runs the test scripts and design-rule checks.
   - `clinical-safety` reviews anything that touches clinical risk.
   - `privacy-security` reviews anything that touches personal data.
   - `accessibility` reviews anything the patient sees.
6. **Ship it.** The lead (the main Claude session) verifies, commits and deploys. Ani can stop any
   deploy.
7. **Ask Daniel.** `product-manager` sends one merged list of questions per round, with the most
   important first.

## Rules every agent follows

- **Keep patient data out.** Recordings and screenshots may contain real patients. Keep frames in the
  scratchpad and never put names, PHNs, dates of birth, addresses, phone numbers, emails or pharmacy
  details in the repo. Write "the patient".
- **Never invent clinical rules**, doses, thresholds, billing codes or legal requirements. Mark them
  "Needs Daniel" or "Needs a qualified reviewer".
- **Every claim has a source:** a file and line, a quote, a commit or a URL. Otherwise label it an
  assumption.
- **Stay in your lane.** Only `ux-designer` and `frontend-engineer` edit prototype HTML, and only
  `product-manager` edits the `product/*` spec docs. Everyone else writes their own report under
  `product/reports/`, named `<agent>-<YYYY-MM-DD>-<topic>.md`.
- **No agent commits or deploys.** The lead does that.
- **Follow the design rules** in `.claude/agents/ux-designer.md` and the product rules in
  `.claude/agents/doctor.md`.
- **End every report with:**
  - the top 3 findings or asks, ranked by impact;
  - what needs Daniel;
  - what needs Ani.

## Standards we measure against (check them; do not claim compliance without evidence)

| Area | Standards |
|---|---|
| Clinical practice | CPSBC practice standards on virtual care, prescribing and test-result management |
| Privacy law | BC PIPA (private practice), PIPEDA, and PHIPA for Ontario expansion |
| Privacy process | Privacy Impact Assessments, which PharmaNet access requires |
| Security | ISO/IEC 27001; SOC 2 Type II; OWASP ASVS and the OWASP Top 10; Canadian data residency; audit logging of every record access |
| Clinical safety | ISO 14971 (risk management) and DCB0129 (clinical-safety case and hazard log, used as a model); IEC 62304 (software lifecycle); Health Canada's software-as-a-medical-device guidance, for any AI or decision support |
| Interoperability | HL7 FHIR R4, CA Baseline and PS-CA profiles, HL7 v2 for lab feeds |
| BC integrations | PharmaNet; PLIS/lab results; Teleplan (MSP billing); the Provincial Client and Provider Registries |
| Accessibility | WCAG 2.2 AA; AODA for Ontario |
| AI | Human review before anything is filed, disclosure to patients, and no autonomous clinical actions |

## Evidence base (read before working)

| Folder or file | What it holds |
|---|---|
| `from-daniel/` | Daniel's decisions and answers |
| `shadowing/` | Real consult recordings, analysed |
| `product/` | Use cases, requirements, decisions, open questions, reviews |
| `simplecare-competitor-research.md`, `simplecare-stakeholder-interview-analysis.md`, `healthcare-ux-design-reference.md` | Competitor research, stakeholder interviews, healthcare UX reference |
| `simplecare-physician-portal-v2.html`, `simplecare-moa-portal.html`, `simplecare-patient-portal-v2.html` | The current prototypes |
| https://simplecare.ca | The live marketing site |
| `research/patient-entry-flows/` | How patients arrive and reach a doctor, end to end (Ani's boards: landing, the Simplicity chat, walk-in, becoming a patient, registration, login) |
