# Training results: `tech-lead`

- **Date:** 2026-09-29.
- **Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md`, `02-evidence.md`, `product/process.md`,
  `product/team.md`, `.claude/agents/tech-lead.md`.
- **Evidence read:** all of `from-daniel/` (21, 26, 27, 29 Sep); `shadowing/2026-09-25-rx-renewal-by-fax.md`;
  `product/reports/integrations-engineer-2026-09-26-roadmap.md` (skimmed: §1, §2, §5, top 3, Needs Daniel/Ani).
- **Checked by grep only:** `product/decisions.md` (D-71), `product/open-questions.md` (OQ-51, OQ-61, OQ-62),
  `product/reports/clinical-safety-hazard-log.md` (HZ-03, HZ-06, HZ-09, HZ-17), `product/tasks/TEMPLATE.md`.
- **Not read:** `private/`. Nothing from it is used here. Nothing browsed, nothing else edited.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, H2 = `02-evidence.md`, P = `process.md`,
  T = `team.md`, TL = `.claude/agents/tech-lead.md`, D21 / D26 / D27 / D29 = `from-daniel/2026-09-2x-*.md`,
  RM = the integrations roadmap.

---

## Part 1: Core exam

### 1. ★ Privacy
The shadowing note gets "the patient", the clinical story in general terms, the on-screen behaviour and friction,
and quotes with the first name replaced by "[the patient]". The full name, first name, PHN and the pharmacy's name
and address stay out (as would DOB, phone, email). Frames stay in the session scratchpad only and are never
committed; the note describes a frame, it doesn't embed it. **Source:** R7 ("Write 'the patient'", "Recording frames
stay in the scratchpad only"); T:115-117; shadowing 1 does this ("Patient details omitted", line 4).

### 2. ★ No invention
I write no quantity and no default. I mark it **Needs Daniel** (a quantity is a clinical rule), carry on with the
parts that don't depend on it, and pass the question to `product-manager` for the batched list that Ani sends.
The "90 / 3 months" in shadowing 1 is one observed visit, not a rule for all twice-daily medications. **Source:**
R6; R4 ("Asking Daniel" = PM prepares, Ani sends); P §8 "A clinical question"; shadowing 1:15.

### 3. ★ Stay in your lane
I don't touch it: only `ux-designer` and `frontend-engineer` edit prototype HTML, and a review task has fixed
scope. I record it in my report (file, line or anchor, what's wrong, proposed fix) and tell the lead, who can open
a task. **Source:** R3 ("Only `ux-designer` and `frontend-engineer` edit prototype HTML"); P §2.4 ("the owner stops
and reports; it doesn't expand the task on its own").

### 4. Calls
Not acceptable. Calls go outward only: the doctor phones the patient in the call window; patients never call the
doctor, though they may call the office for admin. At most the portal could offer the office line for admin.
**Source:** R10; H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and no wait estimates; we show the position, not a wait.
"About 25 min" is a wait estimate. **Source:** R11; H0:66-67 (glossary, "We show the position, not a wait estimate").

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly files the
fax to the patient's chart/inbox so it reaches the doctor through his review flow (or replies on an existing task
if the fax belongs to one); the doctor decides and, if work follows, sends her a task. Japneet is not the answer
here: she is the PA in the doctor's identical portal, and whether she can send tasks in her own right is Needs
Daniel. **Source:** R12; H0:74, H0:40; D27 §2; RM §5 ("Inbound faxes land in the MOA 'Fax inbox' ... until the MOA
files them").

### 7. Care plan vs tasks
No. The care plan is the narrative of what we're doing and why (Daniel's synthesis of assessment and plan); tasks
are practical doctor → MOA to-dos. They stay separate, as does the Care Plan Tracker, and don't change without
Daniel. In data terms they are also different resources (FHIR `CarePlan` vs `Task`). **Source:** R13; H0:73-74;
D26 §3 ("I need a 'Care Plan'"); TL "care plan versus tasks".

### 8. Specialist wording
"I have arranged an echo" stays with the specialist; we track it as expected, not as our to-do. "Please start
bisoprolol" becomes the GP's, for the doctor to decide and sign. **Source:** R15 ("'I have arranged the stress test'
stays with the specialist; 'please start bisoprolol' becomes the GP's").

### 9. ★ Sign-off
*Reviewed* is a state: the doctor is assessing, nothing happens yet. *Sign off* is an accountable action with the
doctor's name: signing the chart finalizes the visit, faxing a script signs off the prescription, submitting a
bill signs off the billing ("my a** is on the line"). So approving buttons say what they do in sign-off language
and show who signs; a "Reviewed" control must never imply approval or trigger an action. **Source:** D26 §2;
D-71 (decisions.md:640-661); R16; H0:76-77.

### 10. Renewals
Either can send; it's the doctor's call each time, and neither is the default. He keeps favourite scripts
pre-populated; they live in the Rx function and he manages them. Whoever sends, the sign-off is always his ("Always
me. I can delegate authority to Japneet, but it is my responsibility"). **Source:** D26 §1 ("Either can send ... I
also have my favorite's pre-populated"); D27 §2-3 ("They live in the Rx function. I manage them.").

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1, agent reports are level 7. I don't pick quietly: I name the
conflict in my report, cite both, and flag it to the lead so `product-manager` logs it in `open-questions.md`.
**Source:** H2:3-4 ("When sources conflict, say so; don't pick one quietly"), H2 table rows 1 and 7.

### 12. Process
The lead writes `product/tasks/T-NNN-inbox-*.md` from TEMPLATE and adds it to the board; triage sets type (Design),
priority, size, one owner (`ux-designer`), contributors (e.g. `doctor`, `content-designer`) and gates. Because
"better" is ambiguous, the lead asks Ani what she means before it's Ready. Gates: `qa-engineer` (prototype UI),
`clinical-safety` (results/sign-off), and `tech-lead` if it needs new data or an integration. Each gate writes a
verdict report; Ani approves (Daniel too for clinical content); the lead commits and deploys, checks the build
stamp, and `product-manager` updates statuses. **Source:** P §2 (1-7), §4, §8; R24a.

### 13. Design rules
(1) Text is ink, colour on icons; brand blue #4353E8 for primary actions/current state; red for critical only.
(2) Nothing a physician reads under 14px; buttons 44px with an icon; reading text ≤66ch. (3) No uppercase styling,
sentence case everywhere. (4) Mage Icons only, from the prototype's icon maps. (5) Show by exception and
progressive disclosure; and a fix on one screen goes to every screen with that pattern. **Source:** R21-R26.

---

## Part 2: Role drill — model "sign-off" as data and events

**1. Expected task.** Type: Engineering plan. Owner: `tech-lead`. Contributors: `integrations-engineer` (fax
receipt, Teleplan submit), `ai-engineer` (drafts), `privacy-security`. Gates: `clinical-safety` (sign-off),
`privacy-security` (identity, audit). Acceptance: an ADR in `product/adr/ADR-001-sign-off.md` (context, decision,
alternatives, consequences), every claim sourced, open items marked Needs Daniel, ends with top 3 / Daniel / Ani.

**2. Plan.**
- Map the three sign-offs from D26 §2 / D-71 to their target resource: chart → `Encounter` + note
  (`DocumentReference`/`Composition`, status final); script → `MedicationRequest` sent by fax; bill → the claim
  record submitted to Teleplan.
- Keep *Reviewed* as a **state** on the item (e.g. inbox item status received → reviewed), mutable, no signature,
  no side effects. Source: D-71 "Replaced" line (received → reviewed → signed off).
- Model *sign-off* as a separate **event**: a FHIR `Provenance` (activity = sign-off, agent = the accountable
  doctor, target = exact resource version) plus an `AuditEvent`. Fields: who pressed, on whose authority, when
  (server time), what version/hash was signed.
- **Immutable, append-only.** A signed version never changes; a correction is a new version (addendum) with its
  own sign-off (HZ-17). Why: accountability has to survive edits ("my a** is on the line").
- **Delegation.** Record two roles: the actor (e.g. Japneet in the PA portal) and the accountable doctor, who is
  always Daniel ("Always me ... it is my responsibility", D27 §2). Whether a delegated send needs his later check is
  OQ-61; the model leaves room for a "pending doctor check" step without assuming it.
- **Downstream events are separate from the sign-off.** Fax queued/sent/failed and the patient copy are their own
  events after the script's sign-off (RM §5); a Teleplan acceptance/rejection follows the bill's sign-off. Sign-off
  never means "delivered".
- **Guards (proposals for clinical-safety):** sign-off blocked or warned on unedited AI draft (R18, HZ-04) and open
  critical result (R19, HZ-03); exact thresholds are not mine to set. Identity: the event binds to a registry-backed
  patient ID, not a name match (HZ-06).
- Alternatives to weigh in the ADR: a boolean `signed` flag (rejected: loses who/when/what version); digital
  signature via PKI (possible later; cost and vendor call for Ani and Daniel).

**3. Sources.** D26 §1-2; D27 §2; D-71; OQ-51, OQ-61, OQ-62; R16, R18, R19; hazard log HZ-03/04/06/09/17; RM §2, §5;
TL ("Model it as a signed, immutable, audited event"); T standards row (FHIR R4, CA Baseline, audit logging).

**4. Needs Daniel.** Whose sign-off an MOA- or PA-sent script carries and whether he checks it (OQ-61); one-press or
batch sign-off of routine results (OQ-62); whether Finalize also signs off the bill (OQ-51); what blocks sign-off
(critical open, unedited draft). **Needs Ani.** ADR format and where ADRs live; whether signatures need PKI (vendor
and cost); build versus partner EMR (RM §2), since an approved EMR may already define sign-off; hosting in Canada.

**5. Risks and rules.** Risk: the model implies a clinical rule (e.g. "critical blocks sign-off") — I mark those as
proposals for `clinical-safety` and Daniel (R6, R20). Risk: the real backend already models this — Samin, Sai and
Dev's docs don't exist yet (D27 §8), so I label my current-system assumptions. No demo names or patient data in
examples; nothing from `private/`; I write only my ADR/report, don't touch prototypes or spec docs, and don't commit.
