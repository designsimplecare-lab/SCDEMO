# Training results — `moa`

Date: 2026-09-27. Group: Users.

**Read, in order:** `product/handbook/00-start-here.md` (updated 27 Sep), `01-rules.md`, `02-evidence.md`,
`product/process.md`, `product/team.md`, `.claude/agents/moa.md`, all of `from-daniel/` (including
`2026-09-27-answers-round-2.md`), and all five `shadowing/` files. For the drill I also grepped the renewal
hand-off in `simplecare-physician-portal-v2.html` (V2b), the task and fax screens in
`simplecare-moa-portal.html` (MOA), and read OQ-09, OQ-50, OQ-60 and OQ-61 in `product/open-questions.md`.
I did not open `private/`, and nothing from it is in this file.

**Short forms:** HB0 = `handbook/00-start-here.md`, R = `handbook/01-rules.md`, EV = `handbook/02-evidence.md`,
PR = `process.md`, ANS26 = `from-daniel/2026-09-26-answers-to-shadowing-questions.md`, ANS27 =
`from-daniel/2026-09-27-answers-round-2.md`, S1–S5 = the shadowing files in visit order.

**To report to the lead now (R 9):** S1 line 16 names the patient's pharmacy (the chain and the town).
Rule 7 counts pharmacy details as identifiers, and the repo is public (R 9a). I have not repeated it here,
and I have not edited the file. It needs the lead, and Ani's OK, to redact.

---

## Core exam

### 1. ★ Privacy
**Answer.** The shadowing note says "the patient" throughout. It keeps only what was observed: what was on
screen and when, what was said (with the name taken out of any quote), the friction, and the clinical
content in general terms. The full name, the PHN and the pharmacy address stay out, and so does the first
name from the transcript. A quote that contains the name is cut or given as "[the patient]". The frames
stay in my session scratchpad and never go into the repo.
**Reasoning.** Names, PHNs and pharmacy details are all listed identifiers. A first name alone is still a
name. The existing notes show the pattern: "Patient details are left out" (S2:4).
**Source.** R 7: "No patient identifiers in the repo, ever. That covers names, PHNs, dates of birth,
addresses, phone numbers, emails and pharmacy details. Write 'the patient'", and "Recording frames stay in
the scratchpad only". Also team.md "Keep patient data out", and EV:23-24 for frame extraction.

### 2. ★ No invention
**Answer.** I do not work out a number. I write: "Renewal quantity for a twice-daily medication: **Needs
Daniel** (OQ-09). No rule is assumed here." I carry on with everything that doesn't depend on it. I don't
use "90 for 3 months", because that came from a once-daily case in S1. I also don't use the prototype's
directions × days sum (V2b `rxQty`) as if it were a rule: it is a design choice that is still open.
**Reasoning.** A quantity is a prescribing rule. Daniel may hold it per drug in his favourites (ANS26 §1,
ANS27 §3), so the product may not own this rule at all.
**Source.** R 6: "Don't invent clinical rules, doses, thresholds… Mark it Needs Daniel"; PR 8: "mark it
'Needs Daniel', and continue with anything that doesn't depend on it"; `open-questions.md` OQ-09 ("A
twice-daily drug is sent short").

### 3. ★ Stay in your lane
**Answer.** I don't fix it, not even one line. In my review report I record the wrong label with its file
and line (and a screenshot if I have one), what it should say, and the source for that. I list it in my
top findings so the lead can make it a task for `ux-designer` (or `frontend-engineer`). If fixing it would
widen my task, I stop and report instead.
**Reasoning.** Only two agents edit prototype HTML. Setup mode also bars changes that no task asks for. A
one-line fix still bypasses the owner and the `qa-engineer` gate.
**Source.** R 3: "Only `ux-designer` and `frontend-engineer` edit prototype HTML… Everyone else writes a
report"; R 1 (setup mode); PR 2 step 4: "If the scope needs to change, the owner stops and reports".

### 4. Calls
**Answer.** No. The doctor phones the patient in the call window, and patients never call the doctor. What
the portal can show is the window and the patient's place in the queue. If a patient needs something
administrative, they can call the office, which the MOA handles. That office line is not a line to the
doctor.
**Source.** R 10: "Calls go outward only. The doctor phones the patient. Patients never call the doctor,
though they may call the office for admin."; HB0:22-23; `.claude/agents/moa.md` ("calls to the office
line").

### 5. Time
**Answer.** Don't show it. Time is a call window with a queue position, and there are no wait estimates.
The patient sees their window (e.g. 8–10 AM BC time) and their position in line, for example "you are 3rd".
The call window is not an appointment time.
**Source.** R 11: "Time is a call window, with a queue position and no wait estimates."; HB0 glossary:
"We show the position, not a wait estimate."

### 6. ★ Tasks
**Answer.** No. Tasks travel doctor → MOA only. Japneet can reply on a task she already has, but she never
creates one for the doctor. Instead:
- **The fax is a document for the chart.** She matches it to the patient and files it from the Fax inbox
  (MOA:298-302), so it reaches the doctor's inbox for his review and sign-off.
- **To get his attention,** she uses the chatbox, email or phone.
- **If it is urgent,** she phones him.

None of these becomes an item on his task list.

**Note on the question.** It calls Japneet "an MOA". Since 27 Sep, the handbook says she is the Physician
Assistant and works in the PA portal, which is identical to the physician portal (HB0:40, 78; ANS27 §2).
The rule doesn't change: she isn't the doctor, so she can't send tasks to him. But whether the PA portal
lets her *create* tasks, for example to an MOA, is not stated anywhere. That is flagged below as Needs
Ani/Daniel.
**Source.** R 12: "Tasks travel doctor → MOA only. The MOA replies on a task and never creates one for the
doctor."; HB0 glossary ("one way only"); MOA:258: "you can reply on it, mark it done, or ask a question —
you can't open a new one. Anything you need from a doctor goes by chatbox, email or phone instead"; MOA:266-272.

### 7. Care plan vs tasks
**Answer.** No. They stay separate, and so does the Care Plan Tracker. The care plan is Daniel's
narrative: what we are doing and why, his synthesis of the assessment and plan. Tasks are practical to-dos
that go from the doctor to the MOA. Merging them would lose the narrative he asked for at the top of the
chart. It would also mix clinical reasoning into the MOA's work queue, which breaks the one-way task model.
If the concern is clutter, the answer is progressive disclosure, not a merge.
**Source.** R 13: "The care plan and tasks stay separate, and so does the Care Plan Tracker. Never merge
them."; HB0 glossary: "Care plan… It is not the task list"; ANS26 §3: "I need a 'Care Plan'"; R 25.

### 8. Specialist wording
**Answer.** "I have arranged an echo" stays with the **specialist**: they arranged it, and they own it and
its result. At most we track it as "arranged by the specialist". "Please start bisoprolol" becomes the
**GP's**: the doctor decides and prescribes it, and any dose or start detail is his to set (Needs Daniel,
not me). On the MOA side, the echo is not a booking task for me unless the doctor sends me one.
**Source.** R 15: "'I have arranged the stress test' stays with the specialist; 'please start bisoprolol'
becomes the GP's."

### 9. ★ Sign-off
**Answer.** *Reviewed* is a **state**: the doctor is assessing, and nothing happens yet. *Sign off* is an
**accountable action** in the doctor's name. Daniel's three examples:
1. Signing off the chart finalizes the visit.
2. Faxing a script signs off the prescription.
3. Submitting a bill signs off the billing.

So any button that approves something uses sign-off wording and shows it carries his name, for example
"Sign off & fax" (V2b:10148). A "Reviewed" control only records the state, and must never read as
approval. The difference matters for the MOA too. When a renewal is delegated, the sign-off is still his:
"Always me. I can delegate authority to Japneet, but it is my responsibility." The record must never make
the MOA's or PA's send look like her own sign-off.
**Source.** ANS26 §2: "Reviewing is separate, all it means is that the Doctor is assessing", "To Fax is to
'sign off' on the script", "To submit a bill is to 'sign off' on your billing.", "The Doctor has approved
this, meaning my a\*\* is on the line."; R 16; HB0 glossary; ANS27 §2.

### 10. Renewals
**Answer.** Either can send it. It is the doctor's choice each time, and neither is the default. Japneet
has prescribing experience and sends it when he delegates. He keeps his favourite scripts pre-populated;
they live in the Rx function, and he manages them. The sign-off stays his even when Japneet sends (ANS27
§2), and she does it from the PA portal.
**Source.** ANS26 §1: "Either can send - Japneet [has] prescribing experience, but I also have my
favorite's pre-populated."; ANS27 §3: "They live in the Rx function. I manage them."; HB0 glossary
"Renewal".

### 11. Evidence
**Answer.** Daniel's words win. `from-daniel/` is trust level 1, and agent reports are level 7. But I
don't pick one quietly:
- In my output, I name the conflict and cite both sources, with file and line.
- I use Daniel's version.
- I send the conflict to `product-manager` for `product/open-questions.md`, since I don't edit it.
- If it blocks the task, I stop and tell the lead.

An example I found in training: OQ-61 ("When the MOA sends a renewal, whose sign-off is it?") still reads
as open, but ANS27 §2 now answers the sign-off part ("Always me").
**Source.** EV:3-4: "When sources conflict, say so; don't pick one quietly. `product-manager` keeps a list
of known contradictions"; EV table (trust 1 vs 7); PR 8.

### 12. Process
**Answer.**
1. **Requested.** The lead writes `product/tasks/T-NNN-<slug>.md` from `TEMPLATE.md`, with Ani's words
   quoted, and adds a line to the board, `product/tasks/README.md`. "Better" is ambiguous, so the lead asks
   Ani what she means before the work goes ahead (PR 8).
2. **Triaged.** The lead sets the type (Design), the priority and the size. It picks one owner,
   `ux-designer`. Contributors might be `doctor` and `moa`, who walk it and rank asks, and
   `content-designer`. The gates are `qa-engineer` (prototype UI) and `clinical-safety` (the inbox holds
   results and sign-off). The lead also checks the task against the rules.
3. **Ready.** The acceptance criteria are written and the inputs are linked.
4. **In progress.** The owner works only within the task's scope.
5. **In review.** Each gate writes pass, fix or block in the task's Review section. A block is resolved
   before anything moves on.
6. **Approved.** Ani approves, and Daniel does too if the change is clinical.
7. **Done.** The lead commits and deploys. No other agent does. `product-manager` then updates the
   use-case and requirement statuses.

**Source.** PR 2 (lifecycle, steps 1–7), PR 4 (the gates table), PR 8; R 4: "The lead commits and
deploys, and Ani approves."

### 13. Design rules
**Answer.** Five of the SimpleCare Paper rules:
1. **Text is ink, and colour goes on icons.** Brand blue #4353E8 is only for primary actions and the
   current state. Red is for critical only.
2. **Nothing a physician reads is under 14px.** Buttons are 44px with an icon, there is one tag spec
   (15px/500, 40px tall), and reading text caps at 66ch.
3. **No uppercase styling.** Sentence case everywhere.
4. **Mage Icons only.**
5. **Show by exception, and use progressive disclosure.** A fix on one screen also goes to every screen
   with the same pattern.

**Source.** R 21–26.

---

## Role drill — `moa`: the renewal hand-off "send 3 months at 300"

This is a dry run. Nothing was changed.

### 1. The task file I'd expect
| Field | Value |
|---|---|
| Type | Persona walkthrough |
| Owner | `moa` |
| Contributors | `doctor` (the sending side), `clinical-safety` (for input on the hazards) |
| Gates | `clinical-safety` (prescribing, sign-off and the task hand-off are in PR 4) |
| Output | `product/reports/moa-<date>-renewal-handoff.md`, a ranked asks report |

**Acceptance criteria:**
- The flow is walked step by step in the v2 renewal card, and on the receiving side, with clicks and
  waits counted.
- Every state the doctor sees is listed, each with its source.
- Every rule gap is marked Needs Daniel.
- No identifiers are included.
- The report ends with the top 3 asks, what needs Daniel, and what needs Ani.

### 2. What I need before I can act safely
The instruction, as it was actually given: *"Send them three months supply at 300 and good to go."* (S2:38-39).
| # | What I need | Where it comes from today | Status |
|---|---|---|---|
| 1 | **Which patient.** Confirmed by the chart, not by the voice. | The visit the task is attached to | In v2, the task carries the patient (V2b `moaTask`) |
| 2 | **Which medication.** "At 300" gives a strength, not a drug. | The last plan and medication list. In S2 it was the titration target, "300 mg at bedtime" (S2:30-32) | Needs to be written on the task. It must not be inferred. |
| 3 | **Strength, form and directions** (how often). The renewal is the end dose of the titration, not the starting dose. | The last plan's P section | From the chart, if it is on file |
| 4 | **Quantity and repeats** for "3 months" | **Needs Daniel** (OQ-09). It may come from his favourite (ANS27 §3) | Open. I will not compute it myself. |
| 5 | **Pharmacy on file,** confirmed | The chart header (S1 "What it changes") | Confirm with the patient if it is missing |
| 6 | **Other medications to renew?** He asked the patient out loud (S2:35-36) | The "renew too?" line (REQ-RX-06) | Only if the doctor ticks it |
| 7 | **Whose sign-off it is.** It is his: "Always me… it is my responsibility" (ANS27 §2) | — | The record must say sent by the delegate for the doctor. How it shows is still Needs Daniel (OQ-61) |
| 8 | **Who I am in this flow.** Japneet sends from the PA portal, not the MOA portal (ANS27 §2) | — | See the findings below |

If anything in rows 2–4 is missing, I **reply on the task** with one question, for example: "Which drug, and
how many for 3 months?". I don't open a new task, and I don't interrupt the call. I wait for a gap in his
calls (MOA:258).

### 3. What I'd report back at each state
| State | What the doctor should see | Built in v2? |
|---|---|---|
| Sent to me | "Sent to <name> · waiting" | Yes (V2b:10201) |
| Picked up | "Picked up by <name> · <time>". This replaces "Can you hear me… or am I talking to myself?" (S2:39-40) | Yes, on a 7 s demo timer (V2b:10183-10187) |
| Query | My reply on the same task, with the question | The MOA portal has Reply (MOA:424, 450). Whether the doctor sees it on the renewal card is not verified. |
| Faxed (sent by me) | "Faxed to the pharmacy · <time> · under Dr. <name>'s sign-off" | **No.** On the MOA route the status stops at "Picked up" (V2b:10199-10201) |
| Delivered / failed | "Delivered · patient copy sent", or "Fax failed · <who retries>" | Only on the doctor's own route (V2b:10203-10204). The real fax signal is OQ-50 |
| Done | The note line on the visit. Today it says "Sent to <MOA> (MOA) to fax…" (V2b:10170) | Partly. There is no line for "faxed" or "delivered" by the MOA |

### 4. Plan, step by step
1. On the doctor's side (V2b renewal card), walk through: open the card, check the lines, set the route to
   the MOA, press "Send to <first name>" (V2b:10147-10149). Count the presses and the waits.
2. On the receiving side, walk through the task arriving, pick-up, a query, the fax, and confirmation.
   Count the presses, and every moment that needs the doctor while he is on a call.
3. For each state, check: is what the doctor wants unambiguous? Can I confirm it back? Can I finish
   without interrupting him?
4. Compare with the observed flows: S1 (the doctor faxes, and the patient's copy is the only delivery
   proof, S1:17-19) and S2 (a voice hand-off with no confirmation).
5. Write the report. Keep what was observed (with sources) apart from my MOA judgement and from what needs
   Daniel.

### 5. Sources I'd use
S1, S2, ANS26 §1–2, ANS27 §2–3, V2b:10125-10215 (the renewal card and status), MOA:254-302 (tasks and
fax), and OQ-09, OQ-50, OQ-60 and OQ-61, plus REQ-RX-01 to REQ-RX-11.

### 6. What needs Daniel
- **The quantity rule for "3 months"** at each frequency, and whether his favourite carries it (OQ-09, OQ-60).
- **When he delegates, has he already signed off,** or does the delegate's fax carry his sign-off? And how
  should the record read, e.g. "sent by <PA> for Dr. <name>"? The principle is answered (ANS27 §2); the
  mechanics are not (OQ-61).
- **Who retries a failed fax,** and what it should say (OQ-50, with Ani).

### 7. What needs Ani
- **v2 routes the renewal hand-off to Japneet as "the MOA on shift".** It files it through the MOA task
  model (V2b:6853-6854, 10165-10170). But ANS27 §2 says she works in the PA portal, which is identical to
  the physician portal, not the MOA portal. So which portal receives a delegated renewal, and is it still a
  "task"? This is a design decision, and it is not mine to change.
- **Can someone in the PA portal create tasks to an MOA?** Nothing says so either way.

### 8. Risks, and how I'd stay inside the rules
- **Wrong drug or quantity from a voice instruction.** I confirm it against the chart, and ask on the
  task. I never guess (R 6).
- **A delegated fax that looks like the MOA's own sign-off.** I report it as a finding for
  `clinical-safety` (R 16, 20).
- **Identifiers.** I write "the patient" and "the pharmacy on file", and never name them (R 7).
- **Scope.** I write a report only. I don't edit the prototype or spec docs, and I don't commit (R 3–4).

### Top 3 findings or asks, ranked by impact
1. **After "Picked up", the MOA route goes silent.** No "faxed", "delivered" or "failed" state reaches the
   doctor (V2b:10199-10204). S1's gap (no visible fax status) comes back for every delegated renewal.
2. **The renewal hand-off targets the wrong portal model.** v2 sends it to Japneet as an MOA task, but she
   uses the PA portal (ANS27 §2). Needs Ani.
3. **"At 300" doesn't say which drug, and the quantity rule is unset.** Needs Daniel (OQ-09). The task
   should carry the drug, strength, directions and quantity as written fields, so the MOA never has to
   infer them.

---

## Rules I found unclear
- **Q6 conflicts with the handbook.** The exam calls Japneet "an MOA", but HB0:40 and 78 (27 Sep) say she
  is the Physician Assistant in the PA portal. The handbook also says `moa` represents her "for now".
  Whether PA-portal users can create tasks is not stated anywhere.
- **R 7 on pharmacy details.** Does a pharmacy's chain and town count as "pharmacy details"? I treated it
  as yes, which is why S1:16 is reported above.
