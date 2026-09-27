# SimpleCare agent team — operating model

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
