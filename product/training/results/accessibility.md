# Training results — `accessibility`

Date: 2026-09-29. Group: Design.

**Read, in order:** `product/training/README.md`, `.claude/agents/accessibility.md`, `product/handbook/00-start-here.md`,
`01-rules.md`, `02-evidence.md`, `product/process.md`, `product/team.md`, `research/patient-entry-flows/README.md`,
all four `from-daniel/` files, `shadowing/2026-09-25-rx-renewal-by-fax.md`, `product/tasks/README.md` and
`TEMPLATE.md`, and `simplecare-design-system.html` (grepped: tokens, focus ring, reduced motion). I did not open
`private/`, and nothing from it is here. No patient identifiers are in this file.

**Short forms:** HB0 = `handbook/00-start-here.md`, R = `handbook/01-rules.md`, EV = `handbook/02-evidence.md`,
PR = `process.md`, TM = `team.md`, EF = `research/patient-entry-flows/README.md`, ANS26 / ANS27 = `from-daniel/`
answers of 26 and 27 Sep, DS = `simplecare-design-system.html`, ROLE = `.claude/agents/accessibility.md`.

---

## Core exam

### 1. ★ Privacy
The shadowing note says "the patient" and records only what was observed and said, with the first name cut from
any quote (e.g. "[the patient]"). The full name, PHN and pharmacy address stay out entirely, because pharmacy
details count as identifiers too. The frames stay in my session scratchpad and never enter the repo, which is public.
**Source:** R 7 (lines 29-31): "No patient identifiers in the repo, ever … pharmacy details. Write 'the patient'", and
"Recording frames stay in the scratchpad only"; R 9c (line 40): the repo is public.

### 2. ★ No invention
I don't work out a number. I write "Renewal quantity for a twice-daily medication: **Needs Daniel**. No rule is
assumed," and continue with anything that doesn't depend on it. The "90 for 3 months" in shadowing 1 was one
observed case, not a rule for other frequencies.
**Source:** R 6 (lines 25-26): "Don't invent clinical rules, doses, thresholds … Mark it Needs Daniel"; shadowing 1
line 15 (a single observed renewal).

### 3. ★ Stay in your lane
I don't edit the prototype, even for one line: only `ux-designer` and `frontend-engineer` edit prototype HTML. I
record it in my report as a finding (element, screen, how to reproduce, suggested label, severity) and name
`ux-designer` or `frontend-engineer` to apply it. If the label has clinical meaning, the correct wording is Needs
Daniel or `content-designer`, not my guess.
**Source:** R 3 (lines 11-18): "Everyone else writes a report"; ROLE "Output": "`ux-designer` or `frontend-engineer`
applies the fixes".

### 4. Calls
No. Calls go outward only: the doctor phones the patient in their call window, and patients never call the doctor.
A patient may call the office for admin, so an office phone link is acceptable, but not "Call my doctor now".
**Source:** R 10 (lines 47-48): "Calls go outward only. The doctor phones the patient. Patients never call the
doctor, though they may call the office for admin"; HB0 line 22.

### 5. Time
Don't show it. Time is a call window with a queue position and no wait estimate, so the patient sees their place in
line within the window. A call window "is not an appointment time" either.
**Source:** R 11 (line 49): "Time is a call window, with a queue position and no wait estimates"; HB0 glossary lines
66-67: "We show the position, not a wait estimate"; EF lines 86-88.

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; Dolly can reply on a task she already has, but never creates one for the doctor.
Instead she files the fax to the patient's chart so it reaches the doctor's inbox for his review, and gets his
attention by the messenger (MOA chat), or by phone if it is urgent. Japneet is the Physician Assistant working in a
portal identical to the doctor's; whether she can send tasks in her own right is Needs Daniel.
**Source:** R 12 (lines 50-53): "The MOA replies on a task and never creates one for the doctor"; HB0 line 74 ("one
way only"), line 40; ANS27 lines 14-20; `from-daniel/2026-09-29-home-feedback.md` line 33 (messenger = MOA chat).

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we are doing and why; tasks are practical to-dos sent to the MOA.
The rule says to keep them, and the Care Plan Tracker, separate and never merge them. Daniel asked for the care plan
at the top of the chart as its own thing.
**Source:** R 13 (line 54): "The care plan and tasks stay separate … Never merge them"; HB0 glossary line 73: "It is
not the task list"; ANS26 lines 37-40.

### 8. Specialist wording
"I have arranged an echo" stays with the specialist: they said they arranged it, so it is not a GP task.
"Please start bisoprolol" becomes the GP's, because it asks the GP to act. Each recommendation keeps its stated owner.
**Source:** R 15 (lines 56-57): "'I have arranged the stress test' stays with the specialist; 'please start
bisoprolol' becomes the GP's".

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off" is an accountable action carrying
the doctor's name; Daniel's examples are signing the chart (finalizing the visit), faxing a script (signing off the
prescription) and submitting a bill (signing off the billing). So an approving button must name the action and the
accountability ("Sign off and fax", "Sign off chart"), never a vague "Done" or "Reviewed", and a "Reviewed" mark must
not read as approval. For me it also means the button's accessible name must carry that same wording.
**Source:** ANS26 lines 17-34: "To Fax is to 'sign off' on the script", "To submit a bill is to 'sign off' on your
billing", "The Doctor has approved this, meaning my a\*\* is on the line"; R 16 (line 58); HB0 line 77.

### 10. Renewals
Either can send it, and it is the doctor's choice each time; neither is the default. Daniel keeps favourite scripts
pre-populated, which live in the Rx function and which he manages. Whoever sends it, the sign-off is always his (he
named Japneet, the PA, as the one who sends when he delegates).
**Source:** ANS26 lines 8-14: "Either can send … I also have my favorite's pre-populated"; ANS27 lines 14-25:
"Always me. I can delegate authority to Japneet, but it is my responsibility", "They live in the Rx function. I
manage them"; HB0 line 79.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1 and agent reports are level 7. I don't pick one quietly. I state
the conflict in my report with both sources, follow Daniel, and flag it to the lead so `product-manager` can add it to
the known contradictions in `product/open-questions.md`.
**Source:** EV lines 3-4 ("When sources conflict, say so; don't pick one quietly"), lines 8 and 14.

### 12. Process
The lead writes `product/tasks/T-NNN-<slug>.md` from the template with Ani's words quoted, adds it to the board, and,
because "better" is ambiguous, asks Ani what she means (PR 8). At triage the lead sets type (Design), priority and
size, one owner (`ux-designer`), contributors (e.g. `doctor`, `moa`), and gates: `qa-engineer` for UI and
`clinical-safety` because the inbox holds results and sign-off (not `accessibility` by rule, since the inbox isn't
patient-facing). The owner works in scope, gates write pass/fix/block, Ani approves (Daniel too if clinical), and only
the lead commits and deploys, after which `product-manager` updates the statuses.
**Source:** PR lines 16-35 (lifecycle), 49-57 (gates), 81-83 (escalation); R 4 (lines 19-20).

### 13. Design rules
Five: (1) text is ink and colour goes on icons, with brand blue #4353E8 for primary actions and the current state;
(2) red is for critical only; (3) nothing a physician reads is under 14px, and buttons are 44px with an icon;
(4) no uppercase styling, sentence case everywhere; (5) Mage Icons only. Also: one tag spec, reading text at 66ch,
show by exception, and a fix on one screen goes to every screen with that pattern.
**Source:** R 21-26 (lines 71-84).

---

## Role drill — audit plan for the Simplicity chat on a phone

**First finding:** the chat is not built in any prototype (`grep -ci simplicity *.html` = 0 in all files). It exists on
Ani's boards (EF lines 11-14, 30-41) and, as an assumption, on simplecare.ca. So step 0 is asking the lead which
artefact is in scope.

**1. Expected task file.** Type: Review / audit. Owner: `accessibility`. Contributors: `patient` (walks it, EF
line 93), `content-designer` (plain language). Gates on my report: none required; `clinical-safety` for the red-flag
step. Acceptance: findings by WCAG 2.2 SC with severity, element, repro and fix; contrast measured, not guessed;
tested at 375px and 320px; evidence in the report, screenshots in the scratchpad; ends with top 3 / Daniel / Ani.

**2. Plan, by success criterion** (who: older patients on phones, low vision, tremor; ROLE "Who to think about"):
- **4.1.3 / 1.3.1** New Simplicity messages announced politely (`role="log"`); each message says who sent it; the typing
  indicator is not re-announced.
- **2.1.1 / 2.1.2 / 3.2.2** The whole flow by keyboard: concern, triage chips, "How many days…", doctor and window,
  "I have account / I'm new here". No trap. Focus moves to the new question, not back to the top.
- **2.4.7 / 2.4.11** A visible brand-blue focus ring (DS line 53 `--focus`) that the on-screen keyboard or a sticky
  composer never hides.
- **2.5.8 + house rule** Every chip, window chip, "More" and send control is at least 44px (R 22), with spacing for tremor.
- **1.4.3 / 1.4.11** Computed contrast of the placeholder "Tell us how we can help…", chips, the "Soonest" badge and
  focus. DS lists `--good` at 3.97:1 and `--warn` at 4.07:1, fine for icons, failing as text.
- **3.3.2** The composer has a real label, not placeholder only.
- **1.4.10 / 1.4.4 / 1.4.12 / 1.3.4** Reflow at 320px without sideways scroll (the doctor cards); 200% text; text
  spacing; both orientations.
- **2.5.1 / 2.3.3** Any swipe (e.g. through doctor cards) has a tap alternative; typing animation and auto-scroll follow
  reduced motion (DS line 136).
- **2.2.1** The held window ("Holding today 6:00–8:00 pm", EF line 40): if the hold expires, warn the patient and let
  them extend it.
- **Red-flag screen** (EF lines 76-78, R 20): announced assertively, reached before any slot is held, with a 44px `tel:`
  911 link. I check only that it is perceivable. The wording is Daniel's, and the review is `clinical-safety`'s.

**3. Sources.** EF, ROLE, R 17 and 21-23, DS tokens, WCAG 2.2 (w3.org, cite with date). AODA applicability: Needs a
qualified reviewer.

**4. Needs Daniel:** red-flag wording and triggers. **Needs Ani:** which artefact to audit (boards, a future build or the
live site, which `content-seo` owns, TM line 64); the hold length and expiry behaviour; a person with a real phone for
VoiceOver/TalkBack, since my tools only give headless Chrome. **Conflict for Ani and Daniel:** R 17 says no red in the
patient portal, and R 21 says red is for critical only. Which one governs the emergency screen?

**5. Risks and rules.** Use only synthetic concerns (the board's sore-throat example), never real data. Stop at
sign-in: no account and no login (R 4). Report, don't fix (R 3), and don't write clinical copy (R 6). Claim no WCAG
conformance without evidence (TM line 133).

**Top 3:** (1) the chat isn't built, so the scope must be set first; (2) announcing new messages and handling focus
are the biggest screen-reader risks; (3) whether the emergency screen can use red needs a decision.
