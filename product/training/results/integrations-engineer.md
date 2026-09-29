# Training results: `integrations-engineer`

- **Date:** 2026-09-29.
- **Read, in order:** `product/training/README.md`, `.claude/agents/integrations-engineer.md`,
  `product/handbook/00-start-here.md`, `01-rules.md`, `02-evidence.md`, `product/process.md`, `product/team.md`.
- **Evidence read:** `from-daniel/` 26 and 27 Sep in full; 21 and 29 Sep by grep (labs, fax, API);
  `shadowing/2026-09-25-rx-renewal-by-fax.md` by grep; my own roadmap,
  `product/reports/integrations-engineer-2026-09-26-roadmap.md` (skimmed: sections 1, 2, 8, 9 and the ending);
  `product/tasks/TEMPLATE.md`; `product/open-questions.md` (OQ-50, OQ-65 anchors only).
- **Not read:** `private/`. Nothing from it is used here. Nothing edited except this file; nothing browsed.
- **Short names:** H0 = `00-start-here.md`, R = `01-rules.md`, H2 = `02-evidence.md`, P = `process.md`,
  T = `team.md`, IE = my role file, RM = my 26 Sep roadmap, D21 / D26 / D27 = `from-daniel/2026-09-2x-*.md`.

---

## Part 1: Core exam

### 1. ★ Privacy
The md gets "the patient", the clinical story in general terms, what was on screen and the friction; quotes
have the first name replaced by "[the patient]". The full name, first name, PHN and pharmacy name and address
stay out (as do date of birth, phone, email). Frames live only in the session scratchpad, never in the repo; if
I find an identifier already committed (including in git history) I report it to the lead and don't rewrite
anything. **Source:** R7 ("Write 'the patient'", "Recording frames stay in the scratchpad only"); R9; T:115-117.

### 2. ★ No invention
I write no quantity. I mark it **Needs Daniel** (a quantity is a clinical rule I may not invent) and carry on with
the parts that don't depend on it. The question goes to `product-manager` for the batched list, and Ani sends it.
(Shadowing 1 shows one observed case, a three-month supply, but one visit is not a rule.) **Source:** R6; R4
("product-manager prepares the question list, and Ani sends it"); P §8; `shadowing/2026-09-25-rx-renewal-by-fax.md:15`.

### 3. ★ Stay in your lane
I don't fix it. Only `ux-designer` and `frontend-engineer` edit prototype HTML, and it is outside my task's scope.
I record it in my report (file, line, what's wrong, a proposed fix) and tell the lead, who can open a task.
**Source:** R3 ("Only `ux-designer` and `frontend-engineer` edit prototype HTML"); P §2.4 ("the owner stops and reports").

### 4. Calls
No. Calls go outward only: the doctor phones the patient in the call window, and patients never call the doctor.
They may call the office for admin, so an office-line contact for admin is the most the portal could offer.
**Source:** R10; H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and no wait estimates; we show the position, not an
estimate. Show "your place in the queue" within the window instead. **Source:** R11; H0 glossary "Queue / queue position".

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly can
reply on an existing task, or the fax reaches the doctor through the fax/inbox flow (**assumption:** the exact
routing isn't specified); if there is no route, that's a question for Daniel via `product-manager`, not a reason
to reverse the direction. **Source:** R12 ("The MOA replies on a task and never creates one for the doctor"); H0 glossary "Task".

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we are doing and why; tasks are practical doctor → MOA to-dos.
They stay separate, and so does the Care Plan Tracker; only Daniel can change that rule. **Source:** R13; H0
glossary "Care plan"; D26 §3 ("I need a 'Care Plan'").

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who says they arranged it. "Please start bisoprolol"
becomes the GP's action. A recommendation keeps its stated owner. **Source:** R15.

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off" is an accountable action that
carries the doctor's name: signing the chart finalizes the visit, faxing a script signs off the prescription, and
submitting a bill signs off the billing ("The Doctor has approved this, meaning my a\*\* is on the line"). So a
button that commits is labelled as the action it is (e.g. "Sign and finalize", "Fax script", "Submit bill"), and
a "Reviewed" control must never imply approval. **Source:** D26 §2 (lines 17-33); R16; H0 glossary "Sign off".

### 10. Renewals
Either can send; it's the doctor's call each time, and neither is the default ("Either can send"). He keeps
favourite scripts pre-populated, which "live in the Rx function. I manage them." Sign-off is always his, even when
Japneet sends ("Always me"). **Source:** D26 §1 (lines 8-14); D27 §2-3.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust 1, reports are trust 7. I don't pick quietly: I cite both, say which
wins, and pass the contradiction to `product-manager` for `open-questions.md`. If the report is mine, I flag it
for correction in my next report. **Source:** H2:3-4 and the trust table.

### 12. Process
The request is ambiguous, so the lead clarifies with Ani first (P §8). The lead writes
`product/tasks/T-NNN-inbox-*.md` from `TEMPLATE.md`, adds it to the board, and triages: type Design, P and size,
one owner (`ux-designer`), gates `qa-engineer` (UI) and `clinical-safety` (results), plus `tech-lead` if it needs
a new data source. The owner works in scope; each gate writes pass/fix/block in its own review report; Ani
approves (Daniel too for clinical content); the **lead** commits and deploys, and PM updates statuses.
**Source:** P §2, §4, §5; R4.

### 13. Design rules
(1) Text is ink, colour goes on icons; brand blue #4353E8 for primary actions and current state, red only for
critical. (2) Nothing a physician reads is under 14px; buttons are 44px with an icon. (3) No uppercase styling,
sentence case. (4) Mage Icons only, from the prototype's icon maps. (5) Show by exception and progressive
disclosure; plus the build stamp is updated in the same change. **Source:** R21-R25, R24a.

---

## Part 2: Role drill — question list for the BC health IT vendor session (PLR, PCR, PharmaNet)

**1. Expected task file.** `T-NNN-vendor-session-questions.md` · Type: Engineering plan · Owner:
`integrations-engineer` · Contributors: `tech-lead` (build vs partner), `privacy-security` (PIA, residency) ·
Gates: `tech-lead` (new integration), `privacy-security` (integrations, personal data), `clinical-safety`
(identity via PCR, prescribing via PharmaNet) (P §4). Acceptance: questions ranked most important first; each
tied to a cited official source or marked **assumption**; no claim of access or conformance; ends with top 3,
Needs Daniel, Needs Ani.

**2. Plan.**
1. Start from RM §8 (22 questions); re-verify every cited Ministry page and add the check date (RM sources are
   dated 26 Sep; browsing only once the task allows it, R6a).
2. Put the gating question first: can a private virtual practice be a software organization, or must it
   partner with an approved vendor (RM §2, Q1-3)? The answer decides the rest.
3. Group: eligibility and path → PharmaNet (read-only first release, remote-access/geofence, encounter window,
   protective word, e-prescribing vs fax) → PCR (query vs create/update, deaths and merged PHNs) → PLR (fax
   numbers for pharmacies, licensing checks, push) → PLIS/CareConnect → PIA and data residency → logistics
   (forms, sandbox, owner at the Ministry).
4. For each question, note what the answer unblocks (a UI state, an assumption A1-A12, OQ-50/OQ-65).
5. Hand the list to Ani; she runs the session. I contact no one.

**3. Sources.** RM §2, §4, §7, §8, §9 and its Ministry sources (conformance Vol 1, 3B, 3C, 3D, 4C; PharmaNet
vendor list; remote access policy); D26 §6 ("We need API access so that we get the results from the source");
D21:31 (Accelerus onboarding), D21:78-79 (lab timestamp = time the clinic received it); `open-questions.md` OQ-50, OQ-65.

**4. Needs Daniel** (via `product-manager`): does he or the MOA work outside BC (geofence); is he on
CareConnect today; is "Accelerus" Excelleris (A1); stale PharmaNet profile: block Send or warn.
**Needs Ani:** build vs partner decision (with `tech-lead`) before the session; which EMR and billing software
SimpleCare runs today (A11); she attends and asks; approval before any form (HLTH 4637, VPA) is filed.

**5. Risks and rules.**
- Implying eligibility or access: every line says "we are asking", never "we have" (IE: "Never claim you have
  access or conformance").
- Stale facts (e.g. policy versions, PPN end): re-verify and date each source (R5).
- Confidential business detail (volumes, pricing, markets) is not put in the questions; write "see private
  strategy" if a question depends on it (R9c).
- No PHNs or sample patient data in examples; use "the patient" (R7).
- Clinical rules (e.g. how stale a profile may be) are **Needs Daniel**, not my numbers (R6).

## Top 3 asks
1. Ani and `tech-lead`: decide build vs partner before the session; it reorders every question.
2. Let me re-verify RM's Ministry sources when the task allows browsing; they are three days old.
3. `product-manager`: add the four Daniel questions above to the next batch.

## Unclear rules
- The exam header says 2–5 sentences; my brief said 2–4. I kept every answer to 4 sentences or fewer.
