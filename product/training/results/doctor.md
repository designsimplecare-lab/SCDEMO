# Training results: `doctor`

- **Date:** 2026-09-27.
- **Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md`, `02-evidence.md`, `product/process.md`,
  `product/team.md`, `.claude/agents/doctor.md`.
- **Evidence read:** all of `from-daniel/` (21 Sep, 26 Sep, 27 Sep round 2) and all five `shadowing/`
  files.
- **Checked by grep:** `product/use-cases.md` (UC-07, UC-21, UC-22), `product/decisions.md` (D-21),
  `product/requirements.md` (REQ-MP-01), and the v2 portal.
- **Not read:** `private/`. Nothing from it is used here.
- **Short names used for sources:**
  - Rules: `01-rules.md` = R, `00-start-here.md` = H0, `02-evidence.md` = H2, `process.md` = P.
  - Daniel: `from-daniel/2026-09-21-meeting-notes.md` = D21, `2026-09-26-answers-to-shadowing-questions.md` =
    D26, `2026-09-27-answers-round-2.md` = D27.
  - Shadowing: S1 to S5, in file order by visit number.

---

## Part 1: Core exam

### 1. ★ Privacy
**Answer:**
- **What goes into `shadowing/<file>.md`:** "the patient"; the clinical story in general terms; what
  happened on screen; the friction; and quotes with any name taken out. For example: *"Have we spoken
  before…"*, with the first name removed or replaced by "[the patient]".
- **What stays out:** the full name, the first name, the PHN, the pharmacy name and address, the date of
  birth, the phone number and the email. Staff personal details are handled the same way.
- **Where the frames live:** in the session scratchpad only, never in the repo. The md file describes a
  frame; it does not embed it.

**Reasoning:** the repo is public on GitHub Pages. A pharmacy address is an identifier just as a PHN is.
The first name counts too: rule 7 bans names, not just full names.

**Source:**
- R:7: "No patient identifiers in the repo, ever. That covers names, PHNs, dates of birth, addresses,
  phone numbers, emails and pharmacy details. Write 'the patient'. Recording frames stay in the
  scratchpad only."
- R:9a: the repo is public.
- team.md:115-117.
- S5:5 is a model to follow: "Clinical history is given in general terms only".

**Finding while studying (R:9, report to the lead):**
- S1 line 16 names the patient's pharmacy by chain and town. Rule 7 bans pharmacy details.
- I have not repeated it here, and I have not edited the file (training is read-only).
- The lead should flag it to Ani (P:85-86).

### 2. ★ No invention
**Answer:**
- I write: "Renewal quantity for a twice-daily medication: **Needs Daniel**. No rule on file."
- I leave the number blank, and I say what it blocks.
- I carry on with the parts of the task that don't depend on it (P:83-84).
- I don't turn one visit into a rule. S1's "90" and S2's "three months at 300" were his decisions for
  those patients on those calls; they are not a rule.
- I also don't derive a number from the directions myself. v2 works the quantity out from "directions
  × days" (V2 comment near line 9990), but the length of supply is still his call.

**Reasoning:** the count depends on a supply length and on the prescribing policy. Both are clinical
rules, and only Daniel sets them.

**Source:**
- R:6: "Don't invent clinical rules, doses, thresholds… Mark it Needs Daniel".
- team.md:118-119.
- doctor.md, "Never invent clinical rules, doses, billing codes or thresholds".

### 3. ★ Stay in your lane
**Answer:**
- I don't fix it, not even one line.
- I record it in my review report as a finding. The report gives:
  - the screen and element (file and line from a grep);
  - what it says now, and why it is wrong, with the source;
  - whether the same label appears on other screens (R:26).
- The lead turns it into a task for `ux-designer`, and `qa-engineer` gates it.
- If the fix would expand my task, I stop and report it; I don't widen the scope (P:29-30).

**Reasoning:** only `ux-designer` and `frontend-engineer` edit prototype HTML, one at a time. We are also
in setup mode. A "one-line" fix by the wrong agent skips the gates and can collide with the designer's
work.

**Source:**
- R:3: "Only `ux-designer` and `frontend-engineer` edit prototype HTML".
- R:1 (setup mode) and R:4.
- team.md:122-124: "Everyone else writes their own report".

### 4. Calls
**Answer:**
- No. "Call my doctor now" reverses the call direction.
- The doctor phones the patient within the patient's call window. Patients never call the doctor.
- Acceptable instead:
  - show the patient's window and place in the queue;
  - give an office line for admin only, e.g. "Questions about your booking? Call the office";
  - route urgent symptoms to emergency guidance. That wording is **Needs Daniel** and
    `clinical-safety`.

**Source:**
- R:10: "Calls go outward only. The doctor phones the patient. Patients never call the doctor, though
  they may call the office for admin."
- H0:22-23.
- doctor.md product rules.

### 5. Time
**Answer:**
- No wait estimate. Time is a call window, e.g. 8–10 AM BC time, with a queue position, e.g. "You're
  3rd".
- Minutes shouldn't be shown at all. Doctor judgement: my pace varies too much to promise 25 minutes.
  A hard case runs long, and Daniel has said he loses track of time in hard consultations (D21:67-68).

**Source:**
- R:11: "Time is a call window, with a queue position and no wait estimates."
- H0 glossary (lines 66-67): "It is not an appointment time… We show the position, not a wait estimate."

### 6. ★ Tasks
**Answer:**
- No. Tasks travel doctor → MOA only. The MOA can reply on a task, mark it done or ask a question, but
  can never open a task to the doctor.
- What she does instead:
  1. She matches the fax to the patient and files it to the chart from the fax inbox, so it reaches my
     review.
  2. If it relates to a task I sent, she replies on that task.
  3. If it can't wait, she reaches me directly by chatbox, email or phone.
- Then it's my call whether to act or to send her a task.

**Note on the premise:**
- Daniel said on 27 Sep that Japneet works in the **Physician Assistant portal**, which is identical to
  mine, under my delegated authority.
- So "Japneet (an MOA)" is out of date. See the unclear rules at the end.
- The answer holds for any MOA.

**Source:**
- R:12: "Tasks travel doctor → MOA only. The MOA replies on a task and never creates one for the
  doctor."
- decisions.md D-21 (Daniel): *"The MOA can't initiate a Task to the Doctor."*
- requirements.md REQ-MP-01: "She reaches the doctor by chatbox, email or phone."
- use-cases.md UC-21 and UC-22 (fax inbox; route and file).
- D27:13-20 and H0:40 (Japneet is a PA).

### 7. Care plan vs tasks
**Answer:**
- No.
- They are different things:
  - The **care plan** is the narrative of what we're doing and why: my synthesis of the assessment and
    plan.
  - A **task** is a one-way practical to-do for the MOA.
- Merging them would bury the clinical story under admin items, and turn my plan into a to-do list that
  the MOA could close.
- Daniel asked for the care plan at the top of the chart as its own thing. Merging was tried once
  (D-19, 1 Sep) and Daniel reversed it on 8 Sep.
- Less clutter comes from progressive disclosure, not from merging.

**Source:**
- R:13: "The care plan and tasks stay separate, and so does the Care Plan Tracker. Never merge them."
- H0 glossary (lines 73-74).
- D26:37: *"I need a 'Care Plan' and even the last note summary is good too"*.
- decisions.md D-21: *"They would be distinct."*

### 8. Specialist wording
**Answer:**
- **"I have arranged an echo":** the specialist owns it. It goes on the care plan as the specialist's
  item, e.g. "Echo: arranged by cardiology". It is not a GP order and not an MOA task.
- **"Please start bisoprolol":** the GP owns it, so it becomes my action. I decide the dose; the letter
  doesn't make that decision for me.
- Nothing becomes a task on its own. If I want the office to chase the echo, I press Task.

**Source:**
- R:15: "'I have arranged the stress test' stays with the specialist; 'please start bisoprolol' becomes
  the GP's."
- S3 and S5 v2 notes: "nothing becomes a task on its own".

### 9. ★ Sign-off
**Answer:**
- **Reviewed** is a **state**: I'm assessing, and nothing happens yet.
- **Sign off** is an **accountable action** that carries my name. Daniel's three examples:
  1. Signing off the chart = finalizing the visit.
  2. Faxing a script = signing off the prescription.
  3. Submitting a bill = signing off the billing.
- **What it means for button labels:**
  - A button that approves and acts must say so in sign-off language and show whose name goes on it.
    v2 already does this: "Sign off & finalize visit" (V2:4722) and "Sign off & submit" (V2:6563).
  - A "Reviewed" marker must never look like an approval, and must never trigger an action.
  - When Japneet sends a script under delegation, the sign-off is still mine.

**Source:**
- D26:16-25: *"Reviewing is separate, all it means is that the Doctor is assessing"*; *"To Fax is to 'sign
  off' on the script"*; *"To submit a bill is to 'sign off' on your billing."*; *"It is action oriented."*;
  *"The Doctor has approved this, meaning my a\*\* is on the line."*
- D27:13-17: *"Always me. I can delegate authority to Japneet, but it is my responsibility."*
- R:16 and R:18.
- H0 glossary (lines 76-77).

### 10. Renewals
**Answer:**
- Either one can send it: the doctor or the MOA (in practice, Japneet in the PA portal).
- It's the doctor's choice each time. Neither option is the default.
- **Favourites:** the doctor keeps his favourite scripts pre-populated. They live in the Rx function, and
  he manages them himself.
- Whoever presses Send, the sign-off is his.

**Source:**
- D26:8-9: *"Either can send - Japneet [has] prescribing experience, but I also have my favorite's
  pre-populated."*
- D27:22-25: *"They live in the Rx function. I manage them."*
- D27:13-14.
- H0 glossary (lines 79-80).

### 11. Evidence
**Answer:**
- Daniel's words win: `from-daniel/` is trust level 1, and reports are level 7.
- But I don't pick quietly. In my output I:
  - name both sources, with their lines;
  - say which one I followed, and why.
- I tell the lead, so that `product-manager` logs the contradiction in `product/open-questions.md` and
  the report can be corrected. The reports aren't my lane to edit.
- If Daniel's words are themselves unclear on the point, I mark it **Needs Daniel**, for the PM's batched
  list.

**Source:**
- H2:3-4: "When sources conflict, say so; don't pick one quietly. `product-manager` keeps a list of
  known contradictions".
- H2 table: trust 1 vs trust 7.
- H0:36: "His exact words are the spec."
- P:67-69.

### 12. Process
**Answer:**
1. **Requested.**
   - Tasks must have started (R:1); otherwise the request waits.
   - The lead writes `product/tasks/T-NNN-inbox-<slug>.md` from `TEMPLATE.md`, quoting Ani's words, and
     adds a line to the board, `product/tasks/README.md`.
2. **Triaged.** "Make the inbox better" is ambiguous, so the lead asks Ani what "better" means before
   the task goes to Ready (P:82). Then the lead:
   - sets the type (Design; possibly a `doctor` persona walkthrough first, to find what "better" is),
     the priority and the size;
   - picks one owner (`ux-designer`) and the contributors (`doctor` walkthrough, `content-designer`);
   - picks the gates: `qa-engineer` (prototype UI) and `clinical-safety` (results and sign-off; critical
     results must stay first and must never be hidden by a filter, R:19). Add `privacy-security` if the
     task touches personal data.
3. **Ready.** The acceptance criteria are written, the inputs are linked (D21, D26:16-25, D27:7-11), and
   any blockers are resolved or moved to Blocked.
4. **In progress.** The owner works only within the scope, and applies the fix to every screen with the
   pattern (R:26).
5. **In review.** Each gate writes pass, fix or block in the task's Review section. A block is resolved
   before anything moves on.
6. **Approved.** Ani accepts, and Daniel too, for clinical content.
7. **Done.**
   - The **lead** commits and deploys. No agent does.
   - `product-manager` updates the use cases, requirements and decisions.
   - The board is updated.

**Source:** P:16-35, 49-65, 81-84; R:1-4.

### 13. Design rules
Any five of the following, all from R:21-26:
1. **Text is ink; colour goes on icons.** Brand blue #4353E8 is for primary actions and the current
   state only.
2. **Red is for critical only.** A critical value is the only red text.
3. **Sizes.** Nothing a physician reads is under 14px, and buttons are 44px with an icon.
4. **One tag spec:** 15px/500, 40px tall, no stroke, barely tinted. Reading text caps at 66ch.
5. **No uppercase styling.** Sentence case everywhere.
6. **Mage Icons only.**
7. **Show by exception, and use progressive disclosure.**
8. **A fix on one screen goes to every screen with that pattern.**

---

## Part 2: Role drill (dry run; nothing changed)

**The drill:** in shadowing 2 (the gabapentin follow-up), what did I need mid-call, and where did I have
to dig for it? Then, an outline of the walkthrough report for a new v2 build of that flow.

### A. What I needed mid-call, and where I dug for it (Observed, S2)

| What I needed | Why | Where it was | Evidence |
|---|---|---|---|
| The last plan's **titration target** (the end dose) | The renewal is the end dose, not the start dose: *"I'm happy to represcribe this three months at 300."* | Inside the previous note, in a ~200px scrolling box, inside the scrolling chart modal, over the scrolling queue | S2:11-20, 30-32 |
| The **side effects to ask about** | I asked, and got *"I'm definitely drowsy, but I work from home"* | The same old note's warning list. The answer was never recorded | S2:14, 33-34 |
| The **MRI booking and its status** | *"We'll wait the MRI and we'll go from there."* It decides the next step | The same old note ("follow up after MRI or sooner…") | S2:15-16, 37 |
| **Other active medications** | *"Is the gabapentin the only medication that you need right now?"* | Nowhere on screen. I asked out loud | S2:35-36 |
| **Which visit the editor and Finalize refer to** | I finalized about 10 s after the call, with the old note still showing | Only a small "Back to this visit" link | S2:21-25 |
| **Did the MOA get the renewal?** | *"Can you hear me… or am I talking to myself?"* | Nowhere. The hand-off was by voice, with no receipt | S2:38-40 |
| **What the next patient wants** | A patient-written referral request surprised me | A separate intake modal, with no summary and no flag | S2:26-27, 41-42 |

**Doctor judgement:**
- The whole ~2.5 min call went on reading. The plan should have been in front of me in about five short
  lines.
- The hand-off with no receipt is the real risk: a renewal can silently not happen.

### B. The walkthrough report I'd write for a new v2 build

**1. The task file I'd expect**

| Field | Value |
|---|---|
| Type | Persona walkthrough |
| Owner | `doctor` |
| Contributors | `moa` (the hand-off receiving end, in Japneet's PA-portal view), `ux-researcher` (time-on-task) |
| Gates | `clinical-safety` (prescribing, hand-off, sign-off). `qa-engineer` only if a fix follows. |
| Output | `product/reports/doctor-<YYYY-MM-DD>-followup-renewal-walkthrough.md` |

**Acceptance criteria:**
- Every UC-07 "v2 should" item is walked and marked works, partly or missing, with the build stamp and
  V2 file and line.
- Clicks, scrolls and reading are counted for each step.
- Every claim is labelled Observed, Doctor judgement or Needs Daniel.
- There are no identifiers.
- The report ends with the top 3 asks, Needs Daniel and Needs Ani.

**2. Plan, step by step** ("patient on the line, renewing a dose I just titrated, MRI pending")
1. Note the build stamp, and read the file locally only. Browsing is out in training; on a real task I'd
   use the local preview (H2:22).
2. **Queue row.** Does the reason show the medication and the "just titrated" context in the patient's
   words? Is a patient-written request flagged on the row? (S2:54-58, 68-69.)
3. **Open the chart.** Does "Since last visit" lead? It should show:
   - the care plan and the last-note summary, both at the top (D26:37);
   - the plan's dose target, what to ask about, and the MRI as pending with its state.
   Count the scrolls needed to see it. (UC-07; `renderSinceLast` V2:10295.)
4. **Scroll model.** Is there one scroll region? Does today's note stay in view while I read the old one?
   (`vcGrow` V2:10425; `slvToggle` V2:10377.) UC-07 says it currently opens "in place, above today's
   note", not beside it.
5. **Side effects.** Can I record "drowsy, tolerable, works from home" as a tick-line in two seconds?
   UC-07 lists it as not built.
6. **Renewal card.**
   - Is it prefilled at the plan's dose, not the starting dose, and does it show the source line?
     (V2:9990-10008.)
   - Does it offer "Renew too" for the other medications? (V2:10087.)
   - Is the pharmacy prefilled?
7. **Send choice.**
   - Are "Send it myself" and "Ask MOA to send" equal? Neither should be the default (D26:11-13).
   - Does the MOA route show "Sent to … · waiting" and then "Picked up by …"? (V2:10201.)
   - Does the sign-off stamp carry my name even when Japneet sends it (D27:13-17)?
   - With the `moa` agent: is the receiving end real in the PA portal, not just the MOA portal?
8. **Next step tied to the MRI.** Is "Follow up after MRI" kept with the plan, so the report returns
   with it attached? UC-07 lists it as not built.
9. **Finalize.**
   - Does the button say "Sign off & finalize visit" (V2:4722) and name today's visit?
   - Does it ask first if today's note is empty, as in S2:24-25?
10. **Next patient.** Can I read the intake without a separate modal (S2:57-58)?
11. **Write it up** in the doctor.md output format: the use case; each step with what got in the way and
    the evidence; the top 3 asks, ranked by call time or risk saved; Needs Daniel; Needs Ani.

**Likely top-3 shape** (to confirm on the build, not asserted now):
1. A hand-off receipt that survives the call (risk).
2. The plan in about five lines at the top, without scrolling (call time).
3. Side effects captured as they are said (documentation gap).

**3. Sources**
- S2 (all).
- use-cases.md UC-07, UC-10, UC-21.
- D26:8-25, 37 and D27:13-25.
- The rules: R:12, 16, 18, 22.
- The v2 functions above.
- For the pattern across visits: S3 and S5 (notes not written during the call; nested scrolling).

**4. What needs Daniel, and what needs Ani**
- **Needs Daniel:**
  - Was the old "Finalize Visit" meant to close the "Charting" note, today's visit, or both? (S2:72.)
  - The default renewal length and quantity. I invent none (R:6).
  - Which side effects belong on a watch-list for a medication. The plan's list is his, not ours.
  - Whether a delegated send by Japneet needs his explicit per-script confirmation, or whether the
    delegation covers it (D27:13-14 settles the responsibility, not the mechanics).
- **Needs Ani:**
  - Whether the PA portal is modelled in the demo as a copy of v2 or as a role inside v2 (H0:40).
  - Whether the walkthrough should be run on the live build or on a local preview.

**5. Risks, and how I'd stay inside the rules**
- **Identifiers.** S2's transcript has a staff name misspelt, and the demo data holds made-up names. I'd
  write "the patient" and "the MOA or PA", and keep any frames in the scratchpad (R:7).
- **Inventing clinical content.** Doses appear only as quoted evidence ("three months at 300"), never as
  a rule. Anything else is Needs Daniel.
- **Lane.** I report; I don't edit v2 or `product/` docs (R:3). Fixes go through the lead to
  `ux-designer`.
- **Product rules.** No task from the MOA or PA to me (R:12); the care plan kept separate from tasks
  (R:13); red only for critical (R:21).
- **Conflicts I'd raise, not resolve.** The S5 v2 notes (lines 153-155) propose an intake question naming
  specific competitors. That conflicts with D27:37-42 and R:16a. I'd flag it for `product-manager`
  (H2:3-4).

---

## Unclear rules found while training
1. **Japneet's role.**
   - Core-exam Q6 and `doctor.md` ("MOAs (Dolly, Japneet, Priya)") call her an MOA.
   - H0:40 and D27:13-20 say she is a Physician Assistant, in a portal identical to the physician's.
   - R:12 only covers the MOA. It is unclear whether a PA, in a portal identical to mine, can create a
     task for the doctor.
2. **Competitor names in the S5 v2 proposal.** S5:153-155 still proposes an intake question naming
   specific competitors, against R:16a and D27.
3. **Privacy (R:9).** S1:16 names the patient's pharmacy by chain and town, and rule 7 bans pharmacy
   details. This goes to the lead.
