# Training results — ux-researcher

Date: 27 Sep 2026. Group: Product.

**Read, in order:** `product/handbook/00-start-here.md` (27 Sep version), `01-rules.md`, `02-evidence.md`,
`product/process.md`, `product/team.md`, `.claude/agents/ux-researcher.md`. **Evidence:** all three
`from-daniel/` files; all five `shadowing/` files; `product/use-cases.md`;
`research/patient-entry-flows/README.md`. For single facts: `product/open-questions.md` (OQ-09),
`product/tasks/TEMPLATE.md`, `.claude/agents/ux-designer.md` (design rules), and one grep of
`simplecare-moa-portal.html` (the task rule note). I did not open `private/`, and nothing from it is used here.

Short source codes: **H0** = `handbook/00-start-here.md`, **R** = `handbook/01-rules.md`, **EV** =
`handbook/02-evidence.md`, **P** = `process.md`, **T** = `team.md`, **MTG21 / ANS26 / ANS27** = the
three `from-daniel/` files (21, 26 and 27 Sep), **S1–S5** = shadowing 1–5, **UC** = `use-cases.md`,
**MOAP** = `simplecare-moa-portal.html`. Numbers after a colon are line numbers.

---

## Part 1 — Core exam

### 1. ★ Privacy
**Answer.** The note says "the patient" and describes the frame generically, e.g. "the header shows
the patient's details and the pharmacy on file" (the way S5:20-21 does it). The full name, the PHN, the
pharmacy's name and address, and the first name in the transcript all stay out. Any transcript quote
that contains the name is trimmed, or the name is replaced with "[the patient]". Frames stay in my
session scratchpad only. They are never copied into the repo or linked from it, and they are not
committed.

**Why.** No patient identifiers in the repo, ever: names, PHNs and pharmacy details are named
explicitly. Frames stay in the scratchpad. The repo is public on GitHub Pages.

**Source.** R:24-26 (rule 7, "Recording frames stay in the scratchpad only"); R:30-31 (the repo is
public); T:115-117; `.claude/agents/ux-researcher.md` ("Keep frames in the scratchpad only. No
identifiers in the repo."); H0:84 (PHN "never goes in the repo").

### 2. ★ No invention
**Answer.** I write **"Needs Daniel"** for the quantity and give no number. I cite the open question
(OQ-09, "Renewal quantity rules", owner Daniel, not answered). I can say what I observed and what the
build does, each labelled for what it is. Observed: S1 was "three-month supply, 90 tablets/capsules"
for one drug. Build: v2 computes directions × days with a 3-month default (`rxQty`). Neither of these
is a rule. I do not work out "180" and present it as the answer, and I do not assume that 3 months
applies to every chronic drug. OQ-09 asks exactly that, and also asks whether a favourite carries the
quantity (ANS26:8-9). Then I carry on with whatever does not depend on the answer.

**Why.** Doses and clinical rules are never invented. A clinical question is marked "Needs Daniel",
and the work goes on without it.

**Source.** R:20-21 (rule 6); T:118-119; P:83-84; `product/open-questions.md`:398-412 (OQ-09); S1:15-16.

### 3. ★ Stay in your lane
**Answer.** I don't fix it, even though it is one line. I record it in my own report as a finding: the
screen, the file and line (found with grep), the current label, why it is wrong with its source, and
a screenshot or quote as evidence. I raise it with the lead, who can make it a task for `ux-designer`
(prototype HTML), or for `product-manager` if it is in a `product/` spec doc. I don't widen my review
task to take in the fix.

**Why.** Only `ux-designer` and `frontend-engineer` edit prototype HTML, and only one of them at a
time. Everyone else writes a report. The owner works only within the task's scope: "If the scope needs
to change, the owner stops and reports".

**Source.** R:11-15 (rule 3); P:29-30; T:122-124.

### 4. Calls
**Answer.** No. A "Call my doctor now" button breaks the product model, because calls go outward only.
The doctor phones the patient, in the patient's call window, from the queue. Patients may call the
office for admin, but never the doctor. The need behind the button (the patient wants to be seen
sooner, or has missed a call) is served by the queue position and by the doctor-to-callback status.
If the need is urgent, the answer is emergency guidance, and that wording needs Daniel.

**Why.** It is one of Daniel's product rules, and it doesn't change without him.

**Source.** R:36-38 (rule 10: "Patients never call the doctor, though they may call the office for
admin"); H0:22-23; UC:99-100 (MOAP:258 says the MOA line is admin only); MTG21:86-87 (doctor to
callback); `research/patient-entry-flows/README.md`:76-78 (the emergency wording needs Daniel).

### 5. Time
**Answer.** It isn't allowed. Time is a call window with a queue position, and there are **no wait
estimates**. The patient sees their place in line within the window (e.g. "3rd in line, 8–10 AM BC
time") and the state (waiting, next and so on), never "about 25 min". This is already a known
conflict: the patient portal shows an estimated call time and "about 25 minutes behind", against
Daniel's queue-number decision. I would cite that conflict, not repeat it.

**Why.** It is Daniel's rule. The call window "is not an appointment time", and "We show the
position, not a wait estimate."

**Source.** R:39 (rule 11); H0:66-67 (glossary); UC:695-701 (UC-23, commit `8cd0893`, and the conflict
at PP:1953, 1962); `research/patient-entry-flows/README.md`:86-88.

### 6. ★ Tasks
**Answer.** No. Tasks travel **doctor → MOA only**. The MOA replies on a task, marks it done or asks
a question on it, but never creates one for the doctor. What she should do:
- If the fax belongs to a task the doctor already sent, **reply on that task**.
- Otherwise, reach him outside the task list, "by chatbox, email or phone instead", as the MOA
  portal says.
- The fax itself goes to the patient's record through the normal fax and inbox route, so the doctor
  reviews and signs it off there. **Assumption:** the exact filing route for an incoming fax is not
  spelled out in the sources I read.

**A note on the question's wording.** It calls Japneet "an MOA". The handbook (27 Sep) and Daniel
(27 Sep) say she is the **physician assistant**, working in a Physician Assistant portal "identical
to my portal". The answer is the same either way. Being in the PA portal does not let her send tasks
to the doctor, and whatever she does under delegated authority is still his sign-off: "Always me."

**Source.** R:41-42 (rule 12); H0:74 (glossary: "one way only"); MOAP:258 ("you can reply on it,
mark it done, or ask a question — you can't open a new one. Anything you need from a doctor goes by
chatbox, email or phone instead"); UC:666-667 (UC-21); H0:40, H0:78; ANS27:13-20.

### 7. Care plan vs tasks
**Answer.** No, they stay separate, and so does the Care Plan Tracker. They are different things:
- The **care plan** is the narrative of what we are doing and why, Daniel's synthesis of the
  assessment and plan. He wants it at the top of the chart with the last-note summary.
- **Tasks** are practical to-dos sent to the MOA. In his words they are the things he has to get
  done, "even if at the time I do it I don't remember why".
- The **Care Plan Tracker** is "an in the moment refresher".

Merging them would lose the "why" and push the doctor's reasoning into the MOA's work queue. The
clutter needs a different fix: progressive disclosure, and showing things by exception.

**Source.** R:43 (rule 13, "Never merge them"); H0:73-74; UC:433-435 (UC-15, commits `afdc728`,
`9b7b5f6`, `11b0ecb`); ANS26:36-40; R:68-69 (rule 25).

### 8. Specialist wording
**Answer.**
- "I have arranged an echo" stays with the **specialist**, who is its stated owner. On our side it
  is at most a pending item to watch for the result. It is not a GP task or order.
- "Please start bisoprolol" becomes the **GP's** item. It is a suggestion the doctor approves
  (nothing lands until he does). The prescribing decision and its sign-off are his. No task is made
  on its own.
- I would not add a dose or a start plan. That is **Needs Daniel**.

**Source.** R:44-45 (rule 15, which is the same pattern with a stress test); UC:436-438 (UC-15:
suggestions "land nowhere until approved", specialist items stay with the specialist, `2b4ea14`);
R:53-54 (rule 18).

### 9. ★ Sign-off
**Answer.**
- **Reviewed** is a **state**. The doctor is assessing, and "no further action is necessarily to be
  taken until such time as I review and sign off".
- **Sign off** is an **accountable action** that carries the doctor's name: "The Doctor has approved
  this, meaning my a\*\* is on the line." Daniel's three examples:
  1. signing off the chart = **finalizing the visit** ("It means that i've finalized the visit");
  2. **faxing a script** = signing off the prescription ("To Fax is to 'sign off' on the script");
  3. **submitting a bill** = signing off the billing ("To submit a bill is to 'sign off' on your
     billing").
- Sign-off stays his when the physician assistant or MOA does the action: "Always me. I can delegate
  authority to Japneet, but it is my responsibility."

**Why it matters for buttons.** An approving button must say it signs off, and that it does so in
the doctor's name. A "Send by fax" or "Finalize" that doesn't read as a sign-off hides
accountability. A state such as Reviewed must never look like an approval, or like an action that
finishes the work. Each sign-off also has its own press and label; a bill should not be submitted
silently inside Finalize. UC-09 and UC-16 record that the build does this today (whether it should
be one press or two is OQ-51).

**Source.** ANS26:16-34; H0:76-77; R:46 (rule 16); ANS27:13-20; UC:199-201, 313-322, 456-461.

### 10. Renewals
**Answer.** Either one sends it, and it is the doctor's call each time. Neither is the default:
"Either can send". He sends it himself when he thinks a delegate might get it wrong, and delegates
it when he is busy. Delegating moves the action, not the responsibility: the sign-off is always his,
and Japneet works under his delegated authority in the PA portal. On favourites: he keeps his
favourite scripts **pre-populated**, "They live in the Rx function. I manage them."

**Source.** ANS26:7-14; ANS27:13-25; H0:79 (glossary: Renewal); UC:178-183.

### 11. Evidence
**Answer.** Daniel's words in `from-daniel/` win. They are trust level 1, "His exact words are the
spec". Agent reports are level 7, "only as good as their sources". I don't pick one quietly, though.
In my output I state the conflict with both citations and go with Daniel. I also ask the lead to have
`product-manager` log it in `product/open-questions.md`, because I don't edit `product/` myself. If
Daniel's words are ambiguous or out of date for the case, I mark it Needs Daniel rather than
resolving it myself.

**Example from this reading.** UC-01 still says Needs your attention shows only critical items
(UC:50), and UC-27, S5 and the entry-flows notes recommend an intake question that names Tia and
Rocket (S5:153-155, UC:635, README:89-90). Daniel's 27 Sep answers supersede both: "Critical and
High belong"; "don't mention Rocket or Tia".

**Source.** EV:3-4, EV:8, EV:14; ANS27:7-11, 37-43; R:46-48 (rules 16a, 16b).

### 12. Process
**Answer.** Step by step:
1. **Requested.** The lead writes `product/tasks/T-NNN-inbox-<slug>.md` from `TEMPLATE.md` and adds a
   line to the board, `product/tasks/README.md`. "Make the inbox better" is ambiguous (better for
   whom, and in what way?), so the lead asks Ani to say what she means before anyone builds.
2. **Triaged.** The lead sets the type, the priority (P1–P3) and the size, and checks the task
   against the rules. It may split: a Research task first (`ux-researcher`: evidence from the
   shadowing, UC-12, UC-13 and Daniel's inbox rules), then a Design task (owner `ux-designer`, with
   `content-designer` for the words).
3. **Gates.** `qa-engineer` (prototype UI). `clinical-safety` (the inbox is results and sign-off).
   `tech-lead` if a new integration or feasibility is involved. `privacy-security` if personal data
   or uploads are touched.
4. **Ready.** The acceptance criteria and the linked inputs are written. Blockers go to Blocked.
5. **In progress.** The owner works only within the scope. A fix goes to every screen that uses the
   pattern (rule 26).
6. **In review.** Each gate writes pass, fix or block in the task's Review section. A block is
   resolved before anything moves on.
7. **Approved.** Ani approves, and Daniel does too for clinical content, e.g. banding or sign-off
   behaviour.
8. **Done.** The **lead** commits and deploys. `product-manager` updates the use cases, requirements
   and decisions. The board is updated, and the output ends with the top 3, what needs Daniel and
   what needs Ani.

**Source.** P:16-35 (lifecycle), P:49-57 (gates), P:59-65 (definition of done), P:82 (an ambiguous
request goes to Ani); R:16-17 (rule 4); R:71 (rule 26).

### 13. Design rules (SimpleCare Paper)
**Answer.** Any five of these:
1. **Text is ink, colour goes on icons.** Brand blue #4353E8 is only for primary actions and the
   current state. **Red is for critical only**: a critical value is the only red text.
2. **Sizes.** Nothing a physician reads is under 14px. Buttons are 44px with an icon. There is one
   tag spec (15px/500, 40px tall, no stroke, barely tinted). Reading text caps at 66ch.
3. **No uppercase styling.** Sentence case everywhere.
4. **Mage Icons only.**
5. **Show by exception** (no badge on the normal case), and **progressive disclosure**.
6. **A fix on one screen goes to every screen with that pattern.**
7. In the patient portal: **no red, no clinical flags, no HIGH/LOW**, and name each test individually.

**Source.** R:58-71 (rules 21-26); R:49-50 (rule 17); `.claude/agents/ux-designer.md`:23-32.

---

## Part 2 — Role drill: a new recording arrives with no transcript

### 1. The task file I would expect
| Field | Value |
|---|---|
| Title | T-NNN — Shadowing 6: <topic in general terms, no identifiers> |
| Type | Research |
| Priority / size | Set by the lead (likely P2, M) |
| Owner | `ux-researcher` |
| Contributors | `doctor` (reads the draft as the physician, ranks asks); `product-manager` (receives open questions and the use-case mapping) |
| Gates | `privacy-security` (the recording contains personal data, and frames need handling). `clinical-safety` if the note touches results, prescribing, sign-off or hand-off, which it usually does. No `qa-engineer`, because no prototype UI changes. |
| Inputs | The video path (stays outside the repo); Ani's title for it; the date; any context from Ani |

**Acceptance criteria:**
- `shadowing/<YYYY-MM-DD>-<topic>.md` is written in the house style, with the "screen only" caveat.
- Every step has a video timestamp.
- No identifiers. Frames only in the scratchpad.
- Each observation is labelled seen, inferred, or not visible.
- Each open question is routed to Daniel or Ani.
- Pattern counts across visits are updated with evidence.
- The output ends with the top 3, what needs Daniel and what needs Ani.
- `privacy-security` passes.

### 2. Plan, step by step
1. **Check the task and scope.** Confirm there is an assigned task (setup-mode rule), and confirm
   with Ani whether a transcript exists and just wasn't sent (Loom usually has one: S1, S2, S5). If
   the audio can be transcribed later, say so in the note. I don't transcribe it myself or guess at
   speech.
2. **Extract frames to the scratchpad.**
   `swift <scratchpad>/shadow1/frames.swift <video> <scratchpad>/shadowN/ 5`
   - First a pass at every 5 s, then 1 s frames around busy moments: call state changes, clicks,
     modal changes, scrolls. This is the S4 method (S4:9-10).
   - Record where the screen is frozen (e.g. S3:8-10), because nothing inside those gaps can be
     claimed.
   - There is no ffmpeg.
3. **Privacy pass before I write anything.** List what is identifying in the frames (name, PHN, DOB,
   phone, address, pharmacy, other patients in the queue or in a leftover search as in S4:14-15, and
   staff personal details). Decide on generic wording for each one ("the header shows the patient's
   details and the pharmacy on file"). No crops or screenshots go into the repo.
4. **Reconstruct the visit, frame by frame, with video time:**
   - the way in (queue → intake → chart detours);
   - each call press and state, quoting the call timer where it helps (Calling… / Connected, drops,
     a timer reset);
   - what was read, where, and for how long;
   - scrolling, and which scroll region;
   - typing, or its absence (the note);
   - the actions used and not used (Prescribe, Labs, Task, Transfer);
   - hand-offs;
   - finalize.
5. **Label the evidence.** "Seen" (in a frame); "inferred" (e.g. a drag-select *possibly* to copy,
   S3:51-53); "not visible" (a frozen screen, or the recording ending mid-call). Without audio I claim
   nothing about what was said. The title may hint at the content (S4:7-9), and I say so.
6. **Measure,** as far as screen-only allows:
   - time to first action;
   - time on the call spent reading (and on what);
   - presses to dial;
   - the number of scroll regions and how far they were scrolled;
   - clicks per task;
   - whether the note was written during the call (yes/no, with timestamps).

   For v2 comparisons, the prototype is checked by grep, never by reading 9,000 lines.
7. **Patterns across visits.** Update the running counts (note not written: 5/5; call trouble: 3/5;
   action row unused: 5/5; and so on), matching the table at UC:746-758. Mark any row this recording
   cannot judge as "no audio" rather than "no".
8. **Check against v2 and the current rules.** "What v2 already covers" (built, partly, not built,
   cited). "What it changes in v2" is limited to what the task allows, and checked against the
   27 Sep rules first. For example, no intake question that names competitors (rule 16a), and
   Critical and High on Home (rule 16b). Anything clinical in a proposed change is marked Needs
   Daniel. I don't write guideline protocols myself.
9. **Open questions.** Each one is tagged Daniel or Ani and handed to `product-manager` to batch. I
   don't send anything to Daniel myself.
10. **Review.** `privacy-security` checks for identifiers and `clinical-safety` checks the clinical
    wording. Then the `doctor` agent reads it. The lead commits. I don't.

### 3. Structure of the note (`shadowing/<date>-<topic>.md`)
```
# Shadowing N — <topic in general terms> (current production)
Source: screen recording supplied by Ani, <date>, <length>. Current production (Daysheet → chart modal).
Patient details are left out.
**These notes come from the screen only.** No transcript. Frame step, frozen stretches, what can't be seen.

## The visit, as seen on screen
1. **0–N s: <step>.** What is on screen, what he did, the call timer. (Seen / inferred / not visible)
…

## Measures
| Measure | Value | Frames |   (time to first action, reading time and where, presses to dial,
                                 scroll regions, clicks, note written during the call y/n)

## Patterns across the N visits
- <pattern>, n out of N, with the shadowing refs; "no audio" where it can't be judged.

## What v2 already covers
- <item> — built / partly / not built, with the use case and the v2 function or line.

## What it changes in v2
- <change> — source frame; Needs Daniel where it is clinical.

## Open questions
- For the audio / Daniel / Ani: what happened in the gaps, what was said, what came after the recording.

## Top 3, needs Daniel, needs Ani
```
(The last section follows the ending required in the role file and P:64.)

### 4. Sources I'd use
- The recording and its frames (scratchpad only).
- Earlier shadowing files: S3 and S4 are the screen-only models.
- `product/use-cases.md`: the patterns table, UC-03, UC-05, UC-09, UC-10.
- `from-daniel/` for the rules in force (ANS26, ANS27).
- The rules, R.
- The v2 prototype, by grep.
- `product/open-questions.md`, so I don't re-ask something already open.

### 5. What needs Daniel, and what needs Ani
- **Needs Daniel** (batched through `product-manager`, never sent directly):
  - What was said, and why he did what he did, when the screen can't show it.
  - Any clinical reading of the visit: doses, whether an exam placeholder was signed knowingly
    (S3:118), guideline content.
  - Whether an outcome such as "no refill" was deliberate.
- **Needs Ani:**
  - Whether a transcript or audio exists, and whether it can be sent.
  - The recording's date and title as she wants them cited.
  - Whether this task may include "What it changes in v2" proposals (setup mode, rule 1).
  - Approval of the note before the lead commits it.

### 6. Risks, and how I'd stay inside the rules
| Risk | Control |
|---|---|
| Identifiers leak (the chart header, the queue, a stale search, the pharmacy) | Privacy pass before writing; generic wording; frames only in the scratchpad; `privacy-security` gate. |
| Over-reading silence as fact | Label seen / inferred / not visible; claim nothing during frozen stretches; no statements about speech. |
| Clinical invention in the "v2 changes" | Needs Daniel on anything clinical; no protocols or doses written by me. |
| Out-of-date rules repeated (e.g. naming competitors) | Check against the 27 Sep handbook and ANS27 before proposing anything. |
| Scope creep into design | A report and notes only; no prototype or `product/` edits; open items handed to the lead and PM. |
| Committing or sharing | I don't commit, deploy or post. The lead does. |

---

## Top 3 findings from training, ranked by impact
1. **A possible privacy exposure in a public file (rule 9).** `shadowing/2026-09-25-rx-renewal-by-fax.md`:15-16
   names the patient's pharmacy and its town. Rule 7 counts pharmacy details as identifiers, and the
   repo is public. I have not repeated the detail here and have edited nothing. The lead should
   decide the fix with Ani (P:85-86).
2. **The evidence contradicts the 27 Sep rules in three places.**
   - S5:153-155, UC-05, UC-27 (UC:635) and the entry-flows README:89-90 still recommend an intake
     question that names Tia or Rocket. Rule 16a and ANS27:37-43 say never.
   - UC-01 (UC:50) still says attention shows critical items only. Rule 16b and ANS27:7-11 say
     Critical and High.

   `product-manager` should update these and log them.
3. **Clinical detail written by an agent.** S5:142-143 states a specific home-BP method as the
   handout content. UC-27 says the handout content is Daniel's (OQ-56). It should read Needs Daniel.

## What needs Daniel
- Confirm the handout content for home BP (OQ-56).
- The renewal quantity rule (OQ-09).
- Both go through `product-manager`'s batched list.

## What needs Ani
- Decide the fix for the pharmacy detail in S1.
- Confirm whether staff first names in quotes (e.g. S2:39) count as the "staff personal details" of
  rule 7.
- Say where the frame script lives for a new session. The role file says `<scratchpad>/shadow1/frames.swift`,
  but each session has its own scratchpad.
- Core exam Q6 calls Japneet an MOA, while H0:40 says she is the physician assistant. The exam
  wording should be corrected.
