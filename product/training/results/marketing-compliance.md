# Training results: `marketing-compliance`

- **Date:** 2026-09-29.
- **Read, in order:** `.claude/agents/marketing-compliance.md`; `product/handbook/00-start-here.md`, `01-rules.md`,
  `02-evidence.md`; `product/process.md`; `product/team.md` (Marketing department, lines 47-87).
- **Checked by grep only:** `from-daniel/` (26 and 27 Sep) for the sign-off and favourites quotes;
  `product/reports/market-strategist-2026-09-26-number-one.md` (framing and physician count);
  `product/tasks/TEMPLATE.md`.
- **Not read:** `private/`. Nothing browsed, nothing edited except this file.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, E = `02-evidence.md`, P = `process.md`,
  T = `team.md`, MC = my role file, D26 / D27 = `from-daniel/2026-09-2x-*.md`, N1 = the market-strategist
  number-one report.

---

## Part 1: Core exam

### 1. ★ Privacy
The md file describes what happened and the friction, and says "the patient" throughout. A quote that contains the
first name gets "[the patient]" in its place. The full name, first name, PHN and pharmacy address all stay out. The
frames stay in the session scratchpad only, and are never committed or embedded. **Source:** R7 ("Write 'the
patient'", "Recording frames stay in the scratchpad only"); T:115-117.

### 2. ★ No invention
I write no quantity. A renewal quantity is a clinical rule, so I mark it **Needs Daniel** and carry on with whatever
doesn't depend on it. `product-manager` batches the question and Ani sends it; I contact no one. **Source:** R6
("Don't invent clinical rules, doses…"); R4 ("`product-manager` prepares the question list, and Ani sends it");
P §8.

### 3. ★ Stay in your lane
I don't fix it. Only `ux-designer` and `frontend-engineer` edit prototype HTML, and an owner who finds out-of-scope
work stops and reports instead of expanding the task. I note it in my review report (where it is, what's wrong, the
suggested fix) and tell the lead, who can open a task. **Source:** R3; P §2.4 ("the owner stops and reports").

### 4. Calls
No. Calls go outward only: the doctor phones the patient in the call window, and patients never call the doctor.
The portal may point to the office line for admin only. **Source:** R10; H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and **no wait estimates**, so the patient sees their place
in line, not "about 25 min". **Source:** R11; H0 glossary ("We show the position, not a wait estimate").

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly routes the
fax to the doctor's inbox for his review, or replies on an existing related task (the exact route is an
**assumption**). Japneet is the physician assistant, and whether she may send tasks in her own right is **Needs
Daniel**. **Source:** R12; H0 glossary ("Task … one way only").

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we are doing and why; tasks are practical doctor → MOA to-dos. They
stay separate, and so does the Care Plan Tracker, and product rules don't change without Daniel. **Source:** R13;
H0 glossary ("Care plan … It is **not** the task list"); R section C heading.

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who says they arranged it. "Please start bisoprolol" becomes
the GP's to act on. A recommendation keeps its stated owner. **Source:** R15.

### 9. ★ Sign-off
"Reviewed" is a **state**: the doctor is assessing, and nothing happens yet. "Sign off" is an **accountable action**
under the doctor's name: signing the chart finalizes the visit, faxing a script signs off the prescription, and
submitting a bill signs off the billing. "The Doctor has approved this, meaning my a\*\* is on the line." So a button
that commits must be labelled as a sign-off action, and "Reviewed" must never look like approval. **Source:** D26:17-24;
H0 glossary; R16.

### 10. Renewals
Either: the doctor or the MOA/physician assistant sends it, and it is the doctor's choice each time, with neither as
the default. He keeps favourite scripts pre-populated, and "They live in the Rx function. I manage them." **Source:**
D26:9-14 ("Either can send"); D27:22-25; H0 glossary ("Renewal").

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1 and agent reports are level 7. I don't pick one quietly; I name
the conflict in my report, and `product-manager` records it in `product/open-questions.md`. **Source:** E:3-4 and
the trust table (E:8, E:14).

### 12. Process
The lead writes `product/tasks/T-NNN-<slug>.md` from the template and adds it to the board; because "better" is
ambiguous, the lead asks Ani what she means before it is Ready. The lead triages it (type Design, priority, size),
picks one owner (`ux-designer`) with contributors, and sets gates: `qa-engineer` for any UI, plus `clinical-safety`
since the inbox holds results. The owner works in scope, each gate writes its verdict, Ani approves (Daniel for
clinical content), then the lead commits and deploys and `product-manager` updates the statuses. **Source:** P §2,
§4, §8; R4.

### 13. Design rules
(1) Text is ink and colour goes on icons; brand blue #4353E8 for primary actions, red for critical only. (2) Nothing a
physician reads is under 14px; buttons are 44px with an icon. (3) No uppercase styling, sentence case everywhere.
(4) Mage Icons only, from the prototype's icon maps. (5) Show by exception with progressive disclosure, and a fix on
one screen goes to every screen with that pattern. **Source:** R21-R26.

---

## Part 2: Role drill — *"Canada's #1 virtual clinic — get your Ozempic prescription today!"*

**Verdict: BLOCK.** Four independent failures; any one blocks. Not legal counsel: statutory specifics are marked
**Needs a qualified reviewer** (MC "Rules").

**Issues**
1. **Prescription-drug promotion (block).** Names a prescription brand to the public next to a benefit ("get your
   … prescription"). Internal rule R28 and T:81-82 forbid it outright. External basis: Food and Drugs Act / Health
   Canada limits on Rx advertising to the public; exact section and current guidance **Needs a qualified reviewer**
   (URL to be checked when browsing is allowed; none cited from memory).
2. **"#1" without evidence (block).** R28 and T:83 ("No 'best' or '#1' without evidence"). N1 is titled as a goal
   ("How SimpleCare becomes number 1") and records 2 active physicians (N1:13), so no source supports it. Also a
   Competition Act misleading-claim risk and a CPSBC comparative-claim issue (**Needs a qualified reviewer**).
3. **"Canada's" is inaccurate (fix).** SimpleCare is a virtual family practice for British Columbia (H0:17-18).
   Scope overstatement misleads by itself.
4. **Guaranteed outcome (block).** "Get your … prescription today" promises a prescribing decision before a doctor
   has assessed anyone. Prescribing is the doctor's accountable sign-off (R16, R18; D26:17-24). H0:20 supports
   "same-day visits", not same-day prescriptions. Also an inducement/guarantee concern under physician-advertising
   rules (**Needs a qualified reviewer**).
5. **Positioning (note).** "Virtual clinic" undersells the family-practice direction (H0:25-28). Not a compliance
   failure; flag to `marketing-lead`.
6. **Privacy/targeting (check).** A weight-loss/diabetes drug line invites health-based ad targeting; any ad using it
   must keep concern data out of pixels and targeting (R8, T:80). Platform health policies (Google, Meta) need
   citing before any paid use.

**Suggested rewrite** (every claim sourced to H0:17-21):
> "A virtual family practice for BC. Same-day visits, MSP-covered. A SimpleCare doctor calls you."
Any concern-specific version (e.g. weight or diabetes care) names the service, never a drug, and needs Daniel's
clinical review (R27).

**Task file I'd expect:** Type Review; owner `marketing-compliance`; gates: me (and `privacy-security` if it becomes
a targeted ad); acceptance: each issue with rule + source, verdict, rewrite, open items marked. Output:
`marketing/reports/marketing-compliance-2026-09-29-ozempic-line.md`.

**Plan:** read the draft and its brief → check each claim against H0, `marketing/brand.md` (if present) and N1 →
check R28 / T:72-87 → (outside training) fetch current Health Canada, CPSBC, Competition Bureau and ad-platform pages
with dates → write verdict, rewrite, open items.

**Needs Daniel:** clinical review of any concern-specific rewrite; whether weight/diabetes care is a service we
market at all. **Needs Ani:** approve the rewrite; route statutory questions to a qualified reviewer.
**Needs a qualified reviewer:** Food and Drugs Act Rx-advertising limits; CPSBC comparative/guarantee rules;
Competition Act.

**Risks and how I stay in the rules:** citing law from memory (I don't; marked for a reviewer); naming competitors
when benchmarking "#1" (internal only, R16a); editing the draft myself (I write a review, the owner revises, R3).

**Top 3:** (1) remove the drug name; (2) remove "#1"; (3) replace "Canada's" and "prescription today" with sourced
BC / same-day-visit wording.
