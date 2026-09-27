# Training results — product-manager

Date: 27 Sep 2026. Group: Product.

**What I read:**
- `.claude/agents/product-manager.md`.
- The handbook in order: `00-start-here.md`, `01-rules.md`, `02-evidence.md`, `product/process.md`,
  `product/team.md`.
- All of `from-daniel/` (MTG21, ANS26, ANS27).
- `shadowing/2026-09-25-rx-renewal-by-fax.md` (S1).
- `research/patient-entry-flows/README.md`, and `product/use-cases.md` skimmed (headings, UC-10,
  UC-21, UC-22, the patterns table and the changelog).
- To answer precisely, I also looked up single entries in `decisions.md` (D-21, D-39, D-71 to D-73),
  `open-questions.md` (OQ-01, OQ-09, OQ-19), `requirements.md` (REQ-HQ-12, REQ-MP-01/02), the task
  board and template, and the MOA portal's task rule note (MOAP:258).

**Rules I kept:** I read, and wrote this one file only. I edited no spec doc and browsed nothing.
There are no patient identifiers here, and nothing from `private/`.

Source codes: ANS26 = `from-daniel/2026-09-26-answers-to-shadowing-questions.md`, ANS27 =
`from-daniel/2026-09-27-answers-round-2.md`, MTG21 = `from-daniel/2026-09-21-meeting-notes.md`.
Line numbers follow each code, as `ANS27:14`.

---

## Privacy finding, reported first (rule 9)

`shadowing/2026-09-25-rx-renewal-by-fax.md` line 16 names the patient's pharmacy and its town, and
line 18 repeats the pharmacy name. Pharmacy details are patient identifiers under rule 7
(`01-rules.md:24-25`; `team.md:115-117`). The file is tracked in git, and the repo is public
(`01-rules.md:30-31`).

I have not edited it, because training is read-and-write-results only. **For the lead:** replace
both with "the patient's pharmacy" and flag it to Ani (`process.md:85-86`). The history keeps the
text, so Ani decides whether that matters.

---

## Core exam

### 1 ★ Privacy
**What goes in** `shadowing/<file>.md`:
- what happened, the timings, the friction, and what the doctor needed;
- quotes, with any name replaced by "the patient" or "[the patient]".

**What stays out:**
- the patient's full name, the first name from the transcript, and the PHN;
- the pharmacy's name and address, which also count as identifiers;
- staff personal details, which are treated the same way.

**Where the frames live:** in the scratchpad only, never in the repo. If I found identifiers
already public, I would stop and report them to the lead at once.

**Why:** the rule is no identifiers in the repo, ever. The recording is analysed for behaviour, not
for who the patient is.

**Sources:** `01-rules.md:24-29` ("Recording frames stay in the scratchpad only"; "Treat staff
personal details the same way"); `team.md:115-117`; `02-evidence.md:23-24`; training README, "No
patient identifiers in answers, even when quoting a shadowing file."

### 2 ★ No invention
I write that the renewal quantity for a twice-daily medication is **Needs Daniel**, and I don't
compute or guess a number.

As PM, I add the case to the existing question, **OQ-09 "Renewal quantity rules"**, rather than a
new file. It already asks whether quantity is directions × days or typed by him
(`open-questions.md:398-413`). Every requirement that depends on it (REQ-RX-02, REQ-RX-03) stays
blocked.

Three things are not a rule:
- v2's `rxQty` directions × days is how the build behaves (D-63).
- S1's "ninety" was one once-daily case (S1:15-16).
- His favourites may carry the quantity per drug (ANS26:8-9; ANS27:22-25).

**Sources:** `01-rules.md:20-21` ("Don't invent clinical rules, doses, thresholds…"); `team.md:118-119`;
`process.md:83-84` (mark it and continue with what doesn't depend on it).

### 3 ★ Stay in your lane
I don't fix it, even though it is one line. Only `ux-designer` or `frontend-engineer` edits
prototype HTML, and only one of them at a time. We are also in setup mode, and work needs a task.

I would write it into my review output with its location, the correct label and the source for it.
The lead then turns it into a task for `ux-designer`, with `qa-engineer` as the gate. I'd add a note
that the fix applies to every screen with that label (rule 26).

**Sources:** `01-rules.md:7-15`; `team.md:122-124`; `process.md:29-30` ("If the scope needs to
change, the owner stops and reports").

### 4 Calls
No, it is not acceptable. Calls go outward only: the doctor phones the patient within their call
window. Patients never call the doctor, though they may call the office for admin.

Instead, the patient portal could offer:
- the queue position;
- a route to the office for admin questions ("Questions before the visit? Talk to us");
- for anything urgent, emergency guidance, whose wording needs Daniel.

**Sources:** `01-rules.md:37-38`; `00-start-here.md:22-23`; `research/patient-entry-flows/README.md:22-23,
76-78`.

### 5 Time
The model says no. Time is a call window with a queue position, and there are no wait estimates.
The window is a block of time the doctor calls within, not an appointment time. So we show "your
place in the queue" for the window, and never "about 25 min".

**Sources:** `01-rules.md:39`; the glossary, `00-start-here.md:66-67` ("We show the position, not a
wait estimate"); `research/patient-entry-flows/README.md:86-88`.

### 6 ★ Tasks
**A correction to the question first:** since 27 Sep, Japneet is the **physician assistant**. She
works in the Physician Assistant portal, which is identical to the physician portal; she is not in
the MOA portal (ANS27:14-20; `00-start-here.md:40`).

The answer is the same either way: **no, she cannot create a task for the doctor.**
- Tasks travel doctor → MOA only. A task exists only when the doctor presses Task.
- The MOA replies on a task, marks it done or asks a question, but never opens one.

**What she does instead:**
- **The fax is an outside document** (a report or a letter). It goes where the doctor reviews and
  signs off external reports, the Inbox, and is filed to the patient's chart. "The inbox is only for
  external reports" (D-40, `aa1e8b8`).
- **Anything else she needs from him** goes by chatbox, email or phone, and stays out of his task
  list.
- **Where an outside record lands, and who tracks it,** is still open (OQ-19), so I mark that part
  "Needs Daniel".

**Sources:** `01-rules.md:40`; D-21 (*"The MOA can't initiate a Task to the Doctor."*); MOAP:258
("Anything you need from a doctor goes by chatbox, email or phone instead…"); REQ-MP-01.

### 7 Care plan vs tasks
No. The care plan, the tasks and the Care Plan Tracker stay separate, and they are never merged.
- **The care plan is the narrative:** what we're doing and why. Daniel wants it at the top of the
  chart with a last-note summary.
- **A task is a practical doctor → MOA to-do.**

A merge was tried once, on 1 Sep (D-19), and Daniel reversed it on 8 Sep: *"They would be distinct."*
(D-21). To reduce clutter we use progressive disclosure, not a merge.

**Sources:** `01-rules.md:41`; `00-start-here.md:73-74`; ANS26:37-40 (D-74); `01-rules.md:69-70`
(rule 25).

### 8 Specialist wording
- **"I have arranged an echo"** stays with the specialist. They have arranged it, so the GP only
  tracks it.
- **"Please start bisoprolol"** becomes the GP's item: a prescribing decision for the doctor.

I would not add a dose, a start date or a follow-up interval that the letter doesn't state. Those
are Needs Daniel (rule 6). And because this is a result or letter that feeds prescribing, the
feature goes through `clinical-safety`.

**Sources:** `01-rules.md:43-44` ("I have arranged the stress test" stays with the specialist;
"please start bisoprolol" becomes the GP's); `process.md:53`.

### 9 ★ Sign-off
**Reviewed is a state.** The doctor is assessing, and nothing happens yet: *"all it means is that
the Doctor is assessing"* (ANS26:17-18).

**Sign off is an accountable action** carrying the doctor's name. Daniel's three examples:
1. Signing off the chart = finalizing the visit (ANS26:19-20).
2. Faxing a script = signing off the prescription: *"To Fax is to 'sign off' on the script"*
   (ANS26:22).
3. Submitting a bill = signing off the billing (ANS26:23).

*"The Doctor has approved this, meaning my a\*\* is on the line."* (ANS26:25). Delegation doesn't
move it: *"Always me. I can delegate authority to Japneet, but it is my responsibility."* (ANS27:14-15).

**Why it matters for buttons:**
- Every approving action (finalize, fax, submit bill, sign off a result) is labelled in sign-off
  language, and shows that it carries the doctor's name.
- "Reviewed" never looks like, or triggers, an approval.
- Nothing is signed off as a side effect. The build submits the claim inside Finalize without saying
  so (D-71 note, OQ-51), and that is the gap to close.

**Sources:** `01-rules.md:45`; the glossary, `00-start-here.md:76-77`; D-71.

### 10 Renewals
Either can send, and it's **the doctor's choice each time**, so neither is the default: *"Either
can send… if I am f\*\*\*ing around, she sends it. If I think she'll f\*\*\* it up, then i send it."*
(ANS26:8-9; D-72).
- When Japneet sends, it is still the doctor's sign-off (ANS27:14-15).
- **Favourites:** he keeps favourite scripts pre-populated: *"I also have my favorite's
  pre-populated."* (ANS26:8-9).
- On 27 Sep he added: *"They live in the Rx function. I manage them."* (ANS27:22-23).

**Sources:** `00-start-here.md:40, 79`; ANS26:7-14; ANS27:13-25.

### 11 Evidence
**Daniel's words win.** `from-daniel/` is trust level 1, and agent reports are level 7, "only as
good as their sources" (`02-evidence.md:8, 14`).

But I don't pick quietly (`02-evidence.md:3-4`):
- I name the conflict in my output.
- I log it in `open-questions.md` as a known contradiction.
- I note in the backlog that the report's ask rests on something Daniel contradicts.
- I tell the lead, so the report's author re-checks.

If the newer source is the report and Daniel's words are old, the newer Daniel source still wins.
If none exists, I ask Daniel in the next batch.

### 12 Process
1. **Requested.** The lead writes `product/tasks/T-NNN-inbox-<slug>.md` from `TEMPLATE.md` and adds
   it to the board (`process.md:21-22`).
2. **Clarified.** "Make the inbox better" is ambiguous, so the lead asks Ani what "better" means
   before triage (`process.md:82`). While in setup mode, it stays queued until Ani says go and the
   owner is certified (`01-rules.md:7-8`; `tasks/README.md:6-7`).
3. **Triaged.**
   - Type **Design**, with a priority and a size.
   - **One owner:** `ux-designer`.
   - **Contributors:** `doctor` (walkthrough), `content-designer` (labels), `product-manager`
     (REQ-IN and REQ-RV).
   - **Gates:** `qa-engineer` for the UI, and `clinical-safety` because the Inbox touches results
     and sign-off. `tech-lead` also joins if a lab feed is involved (`process.md:49-57`).
4. **Ready.** The acceptance criteria are written and the inputs are linked: REQ-IN, D-45, D-54 and
   D-71.
5. **In progress.** The owner stays in scope.
6. **In review.** Each gate writes pass, fix or block, and a block is resolved first.
7. **Approved.** Ani approves, and Daniel does too if the change touches clinical content such as
   bands or thresholds.
8. **Done.** The lead commits and deploys, and I update the statuses and decisions
   (`process.md:31-35`). The output ends with the top 3, what needs Daniel and what needs Ani
   (`process.md:59-65`).

No agent commits (`01-rules.md:16-17`).

### 13 Design rules
Any five of these, from `01-rules.md:58-71`:
1. **Text is ink, and colour goes on icons.** Brand blue #4353E8 is for primary actions and the
   current state. Red is for critical only.
2. **Nothing a physician reads is under 14px.** Buttons are 44px with an icon.
3. **One tag spec:** 15px/500, 40px tall, no stroke, barely tinted. Reading text caps at 66ch.
4. **No uppercase styling.** Sentence case everywhere.
5. **Mage Icons only.**
6. **Show by exception, and use progressive disclosure.**
7. **A fix on one screen goes to every screen with that pattern.**

---

## Role drill — Daniel answers a new question that contradicts an existing decision

**A real case, used as the worked example.** ANS27:7-8 says *"Critical and High belong."* That
reverses **D-39**, "the attention band holds critical values only": *"So as to not overwhelm the
doctor - we are keeping it to critical values."* (`392eccb`). It also answers **OQ-01**. This is the
queued task **T-004**.

### 1. The task file I'd expect
- **ID and title:** `T-004`, "Fold Daniel's 27 Sep answers (round 2) into the product docs".
- **Type:** Spec. **Priority:** P1. **Size:** M.
- **Owner:** `product-manager`. **Contributors:** none needed.
- **Gates:** none for docs (the board says "—"). The build change that follows is a separate Design
  task, with the `qa-engineer` and `clinical-safety` gates.
- **Acceptance criteria:**
  - Every affected D, OQ, REQ and UC entry is updated in place, with ANS27 line citations.
  - The old decision is kept and marked Reversed; nothing is deleted.
  - Each status names the screen or function.
  - Every changed file ends with a changelog line.
  - No identifiers, and nothing from `private/`.
  - It ends with the top 3, what needs Daniel and what needs Ani.

### 2. Every file I'd update, and how

| File | How |
|---|---|
| `product/use-cases.md` | Add **ANS27** to the source key. **UC-01:** its line 50 reads "only when something is critical", which becomes "Critical and High" (ANS27:7-8); the status goes to *partly built*, naming `renderCriticals` (V2:6017), which is still critical-only. Check UC-12 and UC-13 for the same claim. Add a changelog entry. |
| `product/decisions.md` | Add **D-78 · 27 Sep 2026 · Home's attention list shows Critical and High**, with By: Daniel, the quote, Replaced: D-39, and Source: ANS27:7-11. Edit **D-39** in place: add "**Reversed:** 27 Sep, D-78", and keep its quote and its conflict note. Update the changelog's reversals list. |
| `product/open-questions.md` | Mark **OQ-01 · ANSWERED 27 Sep 2026** with his words. Move what the answer left open into a new OQ: does the same rule apply to tasks as well as results, and does "in today's queue" change it (the OQ-01 sub-asks). Take OQ-01 out of the Top 8, rebuild the list, and resolve the entry in the known-contradictions list (`02-evidence.md:3-4`). |
| `product/requirements.md` | **REQ-HQ-12:** the accept line goes from "results are critical only" to "Critical and High results appear; routine never does". The rationale gets the ANS27 quote, and "Open: OQ-01" goes. **REQ-HQ-11:** re-check against the new rule. Keep MTG21:72-74's over-tagging guard. Add a changelog line. |
| `product/backlog.md` | I own it, but the file does not exist yet. With T-004 I'd create it once. The new item: change Home's attention list to Critical and High (P1). Builder: `ux-designer`. Checkers: `qa-engineer` and `clinical-safety`. Source: ANS27:7-8, D-78. |
| Merged question list for Daniel | This lives in `open-questions.md` as the Top 8. Add the new follow-up OQ in its ranked place. The lead or Ani sends it. |

**What I would not edit** (not my lane), and would report to the lead instead:
- The prototype.
- Agent reports in `product/reports/` that assume the old rule. I'd grep for them and list them.
- `from-daniel/`, which is Daniel's words as filed.
- The handbook, where rule 16b already says Critical and High.
- The task board.

The same run also covers the other ANS27 items that change existing entries:
- **Japneet is in a PA portal, not the MOA portal.** This touches D-64, D-72, UC-10, REQ-RX-10 and
  OQ-61; OQ-61 is answered by *"Always me."*
- **Favourites live in Rx** (OQ-60).
- **Never name competitors** (OQ-18, REQ-INT-04). It changes the S1 v2 note that suggested asking
  "Tia or Rocket?" at intake.
- **Two questions he asked to have clarified** (OQ-65, OQ-64). These are rewritten, not closed.

### 3. The plan, step by step
1. Read ANS27 in full; not a summary.
2. Grep `product/` for every D, OQ, REQ and UC that cites the old decision (D-39, `392eccb`, OQ-01,
   "critical only").
3. Write D-78, then mark D-39 Reversed.
4. Close OQ-01, and open the follow-up question.
5. Update the REQs, then the UCs and statuses. Grep the HTML for the function names; don't read it
   end to end.
6. Add the backlog item.
7. Rebuild the Top 8.
8. Add changelogs.
9. Self-check: sources on every line, no identifiers, nothing from `private/`, lines under about 100
   characters.

### 4. Sources
- `from-daniel/2026-09-27-answers-round-2.md:7-11`.
- D-39 (`392eccb`), and MTG21:72-74.
- OQ-01 (`open-questions.md:38-49`).
- REQ-HQ-11 and REQ-HQ-12 (`requirements.md:105-125`), and UC-01 (`use-cases.md:39-58`).
- V2 `renderCriticals`.
- `01-rules.md:48` (rule 16b).

### 5. What needs Daniel, and what needs Ani
- **Daniel:**
  - Does Critical and High also set the threshold for tasks on Home?
  - Does "the patient is in today's queue" change it?
  - The labs and readings questions, rephrased.
- **Ani:**
  - Approve the docs update.
  - Open the Design task to change Home's attention list; it touches results, so `clinical-safety`
    is a gate.
  - Decide whether the attention list's over-tagging guard needs a design answer now that High is in.

### 6. Risks, and how I stay inside the rules
- **Silently rewriting history.** I never delete a decision; I mark it Reversed and link it
  (role file; `decisions.md:5-6`).
- **Over-reading the answer.** "Critical and High belong" is about results on Home. I don't extend it
  to tasks without asking.
- **Inventing thresholds.** The bands come from LifeLabs; I don't define what counts as "High".
- **Lane creep.** Docs only. The prototype change is its own task.
- **Confidential leakage.** The same thread held business strategy (ANS27:4-5). None of it goes in;
  where needed I write "see private strategy".
- **Privacy.** Say "the patient" throughout.

---

## Top 3, what needs Daniel, what needs Ani
**Top 3:**
1. S1 lines 16 and 18 expose the patient's pharmacy in a public repo. This needs a fix and a flag
   to Ani.
2. ANS27 reverses D-39 and answers OQ-01, OQ-60 and OQ-61. The spec docs still say critical-only,
   and still call Japneet an MOA (T-004).
3. The exam's Q6 calls Japneet "an MOA", which is now out of date (ANS27:14-20).

**Needs Daniel:** the renewal quantity rule (OQ-09); whether Critical and High applies to tasks.

**Needs Ani:** the S1 privacy fix; the go for T-004.

## Rules I found unclear
1. **Rule 12 and the physician assistant.** Rule 12 names the MOA, but Japneet is now a physician
   assistant in a portal identical to the doctor's, represented by the `moa` agent "for now"
   (`00-start-here.md:40`). Can a PA create tasks? Is she a task recipient? The rule doesn't say.
2. **Sending questions to Daniel.** My role file and `team.md:110-111` say I "send" one merged list
   to Daniel. Rule 4 says no agent sends anything. I read it as: I draft the list, and the lead or
   Ani sends it.
3. **`private/` versus rule 9a.** `private/` is trust level 1 (`02-evidence.md:8`), but rule 9a
   forbids quoting or paraphrasing it. When it wins a conflict, is "see private strategy" enough as
   a source?
4. **Handbook ownership.** "Only product-manager edits the product/ spec documents," but the handbook
   and training files also sit under `product/`, and the lead edits them. It would help to name the
   spec docs explicitly.

## Changelog
- 27 Sep 2026: wrote this file only. No other file changed.
