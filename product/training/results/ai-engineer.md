# Training results: `ai-engineer`

- **Date:** 2026-09-29.
- **Read, in order:** `.claude/agents/ai-engineer.md`, `product/handbook/00-start-here.md`, `01-rules.md`,
  `02-evidence.md`, `product/process.md`, `product/team.md`, `product/training/core-exam.md`, `role-drills.md`.
- **Evidence read:** all four `from-daniel/` files (21, 26, 27, 29 Sep); `shadowing/2026-09-25-rx-renewal-by-fax.md`;
  `product/reports/clinical-safety-hazard-log.md` (register, HZ-04, HZ-10, the SaMD list, Needs Daniel);
  `product/reports/integrations-engineer-2026-09-26-roadmap.md` (grepped for AI, vendor and data content; it has
  almost none on AI). By grep: `product/open-questions.md` (OQ-09, OQ-31, OQ-37, OQ-63), `product/use-cases.md` (UC-19).
- **Not read:** `private/`. Nothing from it is used here. Nothing edited except this file; nothing browsed.
- **Short names:** H0 = `00-start-here.md`, R = `01-rules.md`, H2 = `02-evidence.md`, P = `process.md`,
  T = `team.md`, AIE = `ai-engineer.md`, HZ = the hazard log, D21 / D26 / D27 / D29 = `from-daniel/2026-09-2x-*.md`,
  OQ = `open-questions.md`. Line numbers are from `cat -n` on 29 Sep.

---

## Part 1: Core exam

### 1. ★ Privacy
The md file says "the patient" and gets the clinical story in general terms, what happened on screen, the friction
and the timings, with quotes that have the first name removed or replaced by "[the patient]". The full name, first
name, PHN, pharmacy name and address stay out, as do date of birth, phone and email. The frames stay in the session
scratchpad only, and the md describes a frame rather than embedding it. **Source:** R:33-37 (rule 7: "Write 'the
patient'", "Recording frames stay in the scratchpad only"); T:115-117.

### 2. ★ No invention
I write no quantity. I mark it **Needs Daniel**, because a quantity is a clinical rule, and it is already an open
question: v2 ties "3 months" to 90 tablets, so a twice-daily drug is sent short (OQ-09, OQ:398-411). I carry on with
whatever doesn't depend on it, and the question goes to `product-manager` for Daniel's batched list, which Ani sends.
**Source:** R:25-26 (rule 6); R:21-22; P:83-86.

### 3. ★ Stay in your lane
I don't fix it. Only `ux-designer` and `frontend-engineer` edit prototype HTML, and a scope change means the owner
stops and reports. I record it in my report (file, line, what's wrong, the suggested fix) and tell the lead, who
can open a task. **Source:** R:11-18 (rule 3); P:29-30.

### 4. Calls
No. Calls go outward only: the doctor phones the patient in their call window, and patients never call the doctor.
They may call the office for admin, so the most the portal could offer is the office line for admin questions.
**Source:** R:56-57 (rule 10); H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and **no wait estimates**, so we show the place in the
queue, not "about 25 min". The window is not an appointment time either. **Source:** R:58 (rule 11); H0:66-67.

### 6. ★ Tasks
No. Tasks go doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly routes the fax
to the doctor's inbox (or the fax/document flow) for his review, or replies on an existing task if there is one;
the exact routing is an **assumption**, and a gap there is a question for Daniel, not a reason to reverse the
direction. Japneet is the physician assistant, who works in the doctor's portal under his sign-off, so this rule is
about Dolly. **Source:** R:59-62 (rule 12); H0:39-40, 74.

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we are doing and why, and tasks are practical doctor → MOA to-dos.
They stay separate, and so does the Care Plan Tracker. Only Daniel can change that rule. **Source:** R:63 (rule 13);
H0:73-74; D26:36-40.

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who has said they own it. "Please start bisoprolol" becomes the
GP's action. A recommendation keeps its stated owner, and any AI summary of the letter must keep that owner too.
**Source:** R:65-66 (rule 15).

### 9. ★ Sign-off
"Reviewed" is a **state**: the doctor is assessing, and nothing happens yet. "Sign off" is an **accountable action**
with the doctor's name on it: signing the chart finalizes the visit, faxing a script signs off the prescription, and
submitting a bill signs off the billing ("my a\*\* is on the line"). So a button that commits must say what it signs
off ("Sign and finalize", "Fax script"), and an AI draft may never look signed or carry a sign-off label.
**Source:** D26:16-33; R:67 (rule 16); H0:76-77.

### 10. Renewals
Either can send; it is the doctor's choice each time, and neither is the default ("Either can send…"). He keeps
favourite scripts pre-populated, and they "live in the Rx function. I manage them." Sign-off is always his, even
when Japneet sends. **Source:** D26:7-14; D27:13-25.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust 1 and agent reports are trust 7. I don't pick quietly: I name both
sources in my report and pass the contradiction to `product-manager` for `open-questions.md`. **Source:** H2:3-4,
8, 14.

### 12. Process
"Make the inbox better" is ambiguous, so the lead asks Ani what she means before scoping (P:84). The lead writes
`product/tasks/T-NNN-<slug>.md` from `TEMPLATE.md`, adds it to the board, and triages it: type, P1–P3, size, one
owner (probably `ux-designer`), and the gates `qa-engineer` (UI) and `clinical-safety` (results), plus
`privacy-security` or `tech-lead` if the change needs them. The owner works in scope, each gate writes pass, fix or
block in its own report, Ani approves (and Daniel, for clinical content), and the **lead** commits and deploys; no
agent does. **Source:** P:16-36, 51-59; R:19-20.

### 13. Design rules
(1) Text is ink and colour goes on icons; brand blue #4353E8 only for primary actions and the current state; red
only for critical. (2) Nothing a physician reads is under 14px; buttons are 44px with an icon; one tag spec. (3) No
uppercase styling; sentence case. (4) Mage Icons only, from the prototype's icon maps. (5) Show by exception, with
progressive disclosure. (Also: a fix on one screen goes to every screen with that pattern.) **Source:** R:84-101.

---

## Part 2: Role drill — evaluation plan for the last-note summary

**Scope.** Top of the chart ("Since last visit"), which Daniel asked for: *"even the last note summary is good too"*
(D26:37). Output: short Plan / Ask about / Pending lines, labelled machine-written, each linked to its source line,
with the note's age shown (AIE:14-17; HZ-10 controls). It is display-only: it never writes into today's note (R18).

**1. Test set, with no real patient data.**
- The cases are **synthetic notes written from scratch**, modelled on the *patterns* in S1–S5, never on their text:
  a renewal; follow-up where the plan was two notes back (S3); a new reason where the latest note is unrelated (S4);
  outside results and other platforms (S5); and no previous note.
- Nothing from recordings, frames, `private/`, the live system or production notes. Every name is fictional,
  and there are no PHNs, dates of birth or pharmacies. Each file is grepped for identifiers and checked against the
  pre-commit denylist before it is committed (R7, R9).
- The doses and drugs in these notes are fixtures, not guidance. Daniel (or a qualified reviewer) checks that the
  cases are realistic, since I don't invent clinical content (R6).
- **Adversarial cases:** a newer result dated after the note; a critical result that is still open; a dose change
  inside the note; negations ("no chest pain"); a specialist's "arranged" versus "please start" (R15); an action that
  was only proposed, never done (HZ-04); a competitor named in the note, which must not reach the summary (R16a).
- **Data handling.** No real note goes to a model vendor. Even synthetic data goes only to a vendor that
  `privacy-security` has reviewed. Choosing a vendor or model is a recommendation for Ani and Daniel (AIE:30-31).

**2. Gold standard.** For each case, a list of key facts: plan items, meds and doses as written, the owner of each
item, pending items, and the note date. It is drafted by `doctor` and `clinical-safety` independently, and Daniel
settles any disagreement.

**3. Measures, per summary.**
- Accuracy: each statement is supported by the line it links to.
- Omissions: key facts missed, reported separately for meds and doses.
- Hallucinations: unsupported statements, with drug, dose and owner errors counted apart.
- Tense errors: an action stated as done when it was only proposed.
- Wrong owner (R15); staleness correctly flagged; a working source link on every line.
- Time saved: time to orient on the chart with the summary versus the full note (`ux-researcher` time-on-task, with
  demo data).
- Later, in a pilot with Daniel's approval: the doctor's edit and dismiss rate.

**4. Method.** Automated checks run on every prompt or model change: every sentence has a source anchor; drug and
dose strings match the source exactly; no text past the note date. Two human raters score each summary. The pass
thresholds (for example, zero dose errors) are **not mine to set**: Needs Daniel and Ani.

**5. Gates and hazards.** `clinical-safety`: HZ-10, and item 5 on the SaMD list (possible SaMD function; a
qualified reviewer decides). `privacy-security`: data and vendor. `qa-engineer`, if the UI changes. The report
would go in `product/reports/ai-engineer-<date>-last-note-summary-eval.md` (AIE:36).

**Needs Daniel:** OQ-63: may AI write it, must he approve it before it shows, and which note is "the last note" when
today's reason is new (OQ:171-183)? Also: are the cases realistic, and what error rates are acceptable?
**Needs Ani:** vendor or model direction; whether synthetic fixtures may live in this public repo; the pass bar.

---

**Top 3 findings or asks.**
1. **OQ-63 blocks the design.** Until Daniel says who writes the summary and whether he approves it, the evaluation
   can be built but not calibrated.
2. **The scribe's critical-result hold is weaker than my role file suggests.** AIE:17 calls it an existing rule, but
   HZ-04 shows it lifts once the result is signed off in the inbox, holds nothing for High results, and is hard-coded
   to one patient (HZ:168-174). It needs to be fixed in the scribe's design.
3. **A label doesn't match how the text is made.** The Review "AI summary" is built from a template (`rvDraft`) but
   labelled AI (HZ:476-478). Evaluation and SaMD classification depend on labelling honestly.

**Needs Daniel:** OQ-63; OQ-31 (the scribe was built although AI documentation was deferred to phase two; UC-19);
the scribe's hold list (HZ Needs Daniel).
**Needs Ani / the lead:** (a) the exam asks for 2–5 sentences and the brief says 2–4; I used 2–4. (b) AIE:30 says "no
real patient data leaves the machine", but it doesn't say whether de-identified shadowing text counts. I've treated
it as off-limits for any model and used synthetic cases only. Please confirm.
