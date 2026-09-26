# SimpleCare decision log

Owner: product manager agent. First written 25 Sep 2026. Each entry gives what was decided, by whom,
the quote behind it, what it replaced, and the source. The dates are the dates of the source or the
commit. Source codes are as in `use-cases.md`. **Reversed** marks a decision that a later entry
undid; the later entry names it. "Design" in *By* means the decision came from a design session with
no client quote; Ani approved it by shipping it.

## Before August

### D-01 · before 27 Jul 2026 · The clinical logic stays; the job is organisation
- **Decided:** reorganise and prioritise the portal by how often each thing is used. Do not rebuild
  the clinical logic.
- **By:** Daniel.
- **Quote:** *"the problem we have here is just an organization and how we are selling this to the
  customer."*
- **Replaced:** nothing. This set the scope.
- **Source:** SIA:8. The interview date is not recorded; the file is in the first commit, `2c0ad38`.

### D-02 · before 27 Jul 2026 · Out of scope for now
- **Decided:** these are future phases: locum and call-group coverage, EMR interoperability (TELUS,
  Accuro, Oscar), a native Google Meet embed, AI call documentation, and the multi-call-group
  opt-in.
- **By:** Daniel.
- **Quote:** *"let's keep this nice to have... there are many more severe issues you have to
  solve."*
- **Replaced:** nothing.
- **Source:** SIA:14, 40, 62. See D-22 for AI documentation being built anyway.

### D-03 · before 27 Jul 2026 · No analytics on the dashboard
- **Decided:** the dashboard is today's patients, an inbox of everything to review and sign off, and
  outstanding tasks. No analytics.
- **By:** Daniel.
- **Quote:** his dashboard requirements, in order (SIA:22).
- **Replaced:** the stat tiles, which were later removed (`896837b`).
- **Source:** SIA:22.

## August

### D-04 · 4 Aug 2026 · The chart is a screen, not a modal inside a modal
- **Decided:** a queue row opens the patient on a normal detail screen with the portal's own
  sidebar.
- **By:** design.
- **Quote:** "the popup ... made the page feel frozen".
- **Replaced:** the production-style chart modal. S2:18-20 later showed the cost of that modal.
- **Source:** `fdbc5d5`.

### D-05 · 8 Aug 2026 · Queue position, not wait time
- **Decided:** the first column is the queue number, first come first served.
- **By:** Daniel.
- **Quote:** "wait duration is a pace metric he does not want".
- **Replaced:** the wait-time chips.
- **Source:** `8cd0893`.

### D-06 · 8 Aug 2026 · No pace-judging metrics
- **Decided:** the progress bar, the next-up tile and the seen-today count are removed. "Running
  behind" and "Waiting" collapse into "In queue".
- **By:** Daniel (the 8 Aug meeting).
- **Quote:** "Remove pace-judging metrics per Daniel".
- **Replaced:** the day-at-a-glance header (`a354f7b`).
- **Source:** `874f906`.

### D-07 · 8 Aug 2026 · An AI intake line on every queue row
- **Decided:** a one- or two-line AI summary of the visit reason on each row.
- **By:** Daniel (the 8 Aug meeting).
- **Quote:** "so the reason is visible without opening documents".
- **Replaced:** nothing.
- **Source:** `874f906`. It became one field with the clinical concern in D-27.

### D-08 · 8 Aug 2026 · Call window length set by the physician per patient
- **Decided:** a physician-set window per patient (15/20/30/45/60 min).
- **By:** Daniel (the 8 Aug notes).
- **Quote:** *"call window lengths should be determined by physicians based on patient needs"*.
- **Replaced:** a fixed system slot.
- **Source:** `c7456f1`.
- **Status:** silently superseded. The four fixed BC windows are used since `f308201` and in
  SPEC:113-115. This is not reconciled; see OQ-34.

### D-09 · 8 Aug 2026 · Copilot leaves the nav
- **Decided:** Copilot comes out of the sidebar and the floating assistant stays. It was renamed
  SimpleCare Assistant.
- **By:** Daniel (the 8 Aug notes).
- **Quote:** none recorded. SCS:49: Daniel said Copilot is "not currently" used.
- **Replaced:** a Copilot nav item.
- **Source:** `c7456f1`, `6127e4c`; IA:55-57.

### D-10 · 10 Aug 2026 · One source for results
- **Decided:** all results live in the Inbox data, and Home's alerts derive from it.
- **By:** design.
- **Quote:** "Home is now a shortcut into the Inbox rather than a parallel list."
- **Replaced:** a separate hard-coded critical list.
- **Source:** `8109d96`.

### D-11 · 10 Aug 2026 · Review as one question (v7 §5.6), later reversed
- **Decided:** replace review-then-sign-off with the single clinical question, "does this delivery
  require follow-up?".
- **By:** Daniel's v7 requirements.
- **Quote:** "replaces review-then-sign-off with the single clinical question".
- **Replaced:** the two-step review.
- **Source:** `1e6c53f`.
- **Reversed:** the received → reviewed → signed-off state machine came back (SCS:17), and Sign off
  became a real button on 23 Sep (`8444fe4`). See OQ-10.

### D-12 · 10 Aug 2026 · Outstanding tasks leave Home, later contradicted
- **Decided:** "My outstanding tasks" moves to Carry Forward as "Mine, not delegated".
- **By:** design, on "a dashboard of alerts, the queue and access to charts".
- **Quote:** as above.
- **Replaced:** the personal list on Home.
- **Source:** `8e14497`.
- **Conflict:** Daniel: *"Yours should stay on your dashboard"* (SIA:30), and SCS:7 says it stays on
  Today. v2 keeps it off Home. See OQ-22.

### D-13 · 20 Aug 2026 · One "Review result" action
- **Decided:** a single Review result action replaces Acknowledge / Open.
- **By:** Daniel.
- **Quote:** "reviewing is the medical/legal requirement the EMR must reflect".
- **Replaced:** Acknowledge and Open.
- **Source:** `4738c40`.

### D-14 · 20 Aug 2026 · Follow-up actions from review
- **Decided:** Book into scheduler & call, MOA to contact the patient, and Message the patient to
  book. "Prepare repeat lab work" is removed.
- **By:** Daniel.
- **Quote:** "connecting with the patient is what matters".
- **Replaced:** the v7 option set.
- **Source:** `4738c40`.

### D-15 · 20 Aug 2026 · The Inbox shows identifiers and a flat order, later reversed
- **Decided:** flagged results sit in their own section and the rest are purely chronological. Every
  result carries PHN and DOB.
- **By:** Daniel.
- **Quote:** none.
- **Replaced:** the "n of m abnormal" ordering.
- **Source:** `4738c40`.
- **Reversed:** three bands with FIFO inside each (D-45), and rows show the name only (D-52).

### D-16 · 20 Aug 2026 · Carry Forward becomes Deferred Tasks, later reversed
- **Decided:** rename it Deferred Tasks, with a Defer CTA (later today / tomorrow / in 3 days / next
  week).
- **By:** Daniel's review.
- **Quote:** none.
- **Replaced:** Carry Forward.
- **Source:** `4738c40`, `c503ece`.
- **Reversed:** 8 Sep, D-21.

### D-17 · 20 Aug 2026 · The patient portal is calm
- **Decided:** no red and no warning icon. Remove My conditions. No visit summaries: prescriptions,
  labs, imaging and consult reports only.
- **By:** Daniel (physician review of the patient portal).
- **Quote:** "Leads with what the doctor did and states that the office will call".
- **Replaced:** an alarmist banner; "Just came in" cards.
- **Source:** `5a4fb10`. PP still offers "View visit summary" (PP:1973); see OQ-27.

### D-18 · 30 Aug 2026 · The care plan lives on the chart; specialist items keep their owner
- **Decided:** a persistent care-plan block. Responsibility is read from the consult wording.
- **By:** Daniel.
- **Quote:** "the chart itself should answer what the plan is, who owns it, what is outstanding".
- **Replaced:** the care plan behind a tab.
- **Source:** `2b4ea14`.

## September

### D-19 · 1 Sep 2026 · Tasks are practical, the care plan is narrative
- **Decided:** Outstanding Tasks is the practical list and the chart keeps the narrative.
- **By:** Daniel.
- **Quote:** *"This list is practical. It is just the shit that I gotta do, even if at the time I do
  it I don't remember why I am doing it."*
- **Replaced:** a Deferred Tasks screen and a Care Plan Tracking screen, merged into one.
- **Source:** `afdc728`.

### D-20 · 1 Sep 2026 · Call from the queue opens the chart and starts the call
- **Decided:** the queue's Call opens the chart and starts the call together.
- **By:** design.
- **Quote:** none.
- **Replaced:** call first, then open the chart.
- **Source:** `afdc728`; V2:6227.

### D-21 · 8 Sep 2026 · Tasks and the Care Plan Tracker are distinct again; tasks are one-way
- **Decided:**
  - Tasks are separate from the Care Plan Tracker.
  - The MOA cannot create a task for the doctor.
  - A task exists only when the doctor presses Task.
  - Routing: the MOA on service, copying the primary MOA, forwarded to Admin.
  - No scheduled deferral.
  - Off service is added.
- **By:** Daniel.
- **Quote:** *"They would be distinct."* *"The MOA can't initiate a Task to the Doctor."* *"We
  wouldn't defer to next week. The tasks need to be present and completed asap."*
- **Replaced:** the 1 Sep merge (D-19), and Deferred Tasks with its Defer CTA (D-16).
- **Source:** `9b7b5f6`.

### D-22 · 9 Sep 2026 · The ambient scribe proposes and never files
- **Decided:** consent comes first, and the scribe drafts the note and proposes work. The doctor
  presses Task.
- **By:** Daniel (the constraints).
- **Quote:** *"The doctor decide what is a Task. By pressing Task button. always."* *"that could be
  dangerous if AI fucks it up"*.
- **Replaced:** nothing.
- **Source:** `1b201eb`.
- **Conflict:** AI call documentation was deferred to phase two (SIA:40, 62). See OQ-31.

### D-23 · 13 Sep 2026 · Assigned Tasks, priority bands, and the Care Plan Tracker as a chart tool
- **Decided:**
  - Tasks is renamed Assigned Tasks.
  - It uses Daniel's four filter labels.
  - It has Urgent / High / Routine bands, oldest first within each.
  - Type is a badge.
  - The Care Plan Tracker becomes a chart tool.
  - The Encounter Log is dimmed.
- **By:** Daniel (WhatsApp review).
- **Quote:** *"The work that needs attention should win over whether it is imaging, referral, or lab
  work."* *"The Care Plan Tracker is a chart view tool ... an in the moment refresher"*. The
  Encounter Log is *"only a historical bean counter of activities"*.
- **Replaced:** Tasks sectioned by type; the Care Plan Tracker in the nav.
- **Source:** `11b0ecb`.

### D-24 · 13 Sep 2026 · Critical or nothing
- **Decided:** flagging has two states, not three. Avatars are removed from the day sheet.
- **By:** Daniel.
- **Quote:** *"Critical or nothing"*. *"We don't need the round things with the patient info."*
- **Replaced:** a proposed small yellow flag.
- **Source:** `1ca73bc`.

### D-25 · 13 Sep 2026 · A Task button on every row, then removed, then on hover (unresolved)
- **Decided:**
  - 13 Sep: every row gets a one-press Task (`1ca73bc`: *"Clicks = bad. Tasking easy = good."*).
  - Same day: it is removed, because a queued patient has not been seen and there is nothing to task
    (`506b71b`, "It was wrong").
  - Then Task MOA returns on row hover (`56e5f20`).
  - SPEC keeps it behind hover but records Daniel's wish for a visible button on every patient: *"It
    can look a bit cluttered with a 'Task' button for every patient but it serves a useful
    purpose."* (SPEC:274-286).
- **By:** Daniel, then design.
- **Replaced:** each step replaced the one before.
- **Source:** as cited.
- **Open:** OQ-05.

### D-26 · 13 Sep 2026 · Claims front and centre
- **Decided:** Claims is a top-level nav item with a grey count. Billing status is a column on the
  day sheet.
- **By:** Daniel.
- **Quote:** *"Claims are so important that i want that front and center"*. *"Leave no claim
  behind."*
- **Replaced:** Claims inside the Practice flyout; a red claims badge.
- **Source:** `27c18b3`, `74660d7`, `11b0ecb`.

### D-27 · 14 Sep 2026 · Five flat nav items; settings under the avatar
- **Decided:** Home · Inbox · Claims · Tasks · Technical Support. Schedule and Fee settings sit
  under the avatar. Register Patient becomes New patient on Home. The Encounter Log leaves the nav.
  Clinical concern and the AI summary become one field.
- **By:** Daniel (dashboard pass).
- **Quote:** none beyond the commit.
- **Replaced:** the four-group nav (IA:18-42) and the Practice flyout (SCS:5).
- **Source:** `944d26a`.

### D-28 · 13-14 Sep 2026 · Health-card and billing vocabularies
- **Decided:** Health card: Verified / Check required / Invalid card / Private pay. MSP has 5 states
  and Private has 3. An invented "Pending" is removed.
- **By:** Daniel.
- **Quote:** *"Health-card status"* is his term.
- **Replaced:** "MSP status", and "Pending".
- **Source:** `3c5f4fe`, `c0cae95`.
- **Note:** private pay was taken off the dashboard ("may be fully automated", `944d26a`) and
  restored the same day (`c0cae95`). See OQ-25.

### D-29 · 14 Sep 2026 · Two kinds of status, two shapes
- **Decided:** visit status is reported (an icon and a word). Billing is a control (a chip with a
  chevron). A state with nothing to do is plain text.
- **By:** Ani.
- **Quote:** none.
- **Replaced:** identical-looking pills.
- **Source:** `9d298c7`, `ae1b5a9`.

### D-30 · 14 Sep 2026 · Names in sentence case; Mage icons only; no capitals anywhere
- **By:** Ani.
- **Quote:** *"never use capital letters anywhere in this portal."* (V2:2963).
- **Replaced:** uppercased names and labels; mixed icon sets.
- **Source:** `9d298c7`, `00649ec`.

### D-31 · 15 Sep 2026 · Call only on the next patient
- **Decided:** Call renders only on the active patient. The out-of-order confirm dialog is removed.
  Doctor-initiated calls go through Add-On.
- **By:** Daniel (the change spec).
- **Quote:** "mirrors a walk-in queue. Patients cannot skip the line" (SPEC:174-175).
- **Replaced:** `f081c07`, where every open row kept Call and out-of-turn calls were confirmed.
- **Source:** SPEC:167-181, 245-256; `607bd2d`.
- **Open:** OQ-04.

### D-32 · 15 Sep 2026 · Needs your attention; the queue follows the clock; Carryover
- **Decided:**
  - Alerts is renamed Needs your attention.
  - The queue auto-advances with the clock and never interrupts a call or an open chart.
  - Carryover is pinned above the current window.
  - The row opens the chart and Access Chart is removed.
- **By:** Daniel (the change spec).
- **Quote:** SPEC:16-24, 107-156.
- **Replaced:** a manual window dropdown.
- **Source:** `f081c07`, `607bd2d`.
- **Note:** the "routine items (not blocking)" drawer that SPEC:22-23 said to keep was left out at
  Ani's call (`607bd2d`). It had already been deleted in `944d26a`.

### D-33 · 15 Sep 2026 · Column order, later reversed
- **Decided:** # / Patient / Health card / Billing / Visit status / Clinical concern.
- **By:** Daniel (SPEC:160-165).
- **Replaced:** the earlier order.
- **Source:** `e48be35`.
- **Reversed:** 21 Sep, D-43.

### D-34 · 15 Sep 2026 · The attention band includes tasks
- **Decided:** the band draws from the Inbox and the Action Centre. Its threshold for tasks is
  Urgent, High or overdue, marked as an assumption.
- **By:** Daniel (SPEC §2); the threshold is an assumption.
- **Quote:** SPEC:44-45.
- **Replaced:** results only.
- **Source:** `0ae6630`.
- **Open:** OQ-01.

### D-35 · 18 Sep 2026 · Daniel's items 6, 7 and 8
- **Decided:**
  - 6: four visit statuses.
  - 7: the billing filter comes off the day sheet.
  - 8: the top line carries the date, his own clock and the BC call-day state, in six states.
- **By:** Daniel.
- **Quote:** *"Remove In visit, call dropped, scheduled. Have In queue, Completed, Doctor to
  Callback, No-Show."* *"Remove this - we will have this in Claims."*
- **Replaced:** 7 statuses; the billing filter; the rotating summary.
- **Source:** `f308201`; V2:5397, 5600-5608, 6150.
- **Reversed (item 7):** the billing filter came back on 21 Sep (D-44).

### D-36 · 18 Sep 2026 · Inbox oldest first
- **By:** Daniel.
- **Quote:** *"everything in chronological order"*.
- **Replaced:** newest first.
- **Source:** `f308201`.
- **Refined:** 21 Sep, D-45.

### D-37 · 18 Sep 2026 · Deterministic lab triage
- **Decided:** encode the LifeLabs BC critical and alert list (Doc#56548 Ver 3.0) as the floor. A
  test absent from the list gets no tier. Digoxin is not encoded.
- **By:** Daniel supplied the source; the design session encoded it.
- **Quote:** "severity decided by whoever wrote the fixture rather than by the standard" is the
  failure it prevents.
- **Replaced:** severities typed into the demo data.
- **Source:** `4fc705b`; `reference/lifelabs-critical-results-bc.pdf`.
- **Open:** OQ-13.

### D-38 · 19 Sep 2026 · SimpleCare escalation over the floor; clinical concern first; time tolerance
- **Decided:**
  - A SimpleCare rule may raise a LifeLabs tier and never lower it (troponin, lactate).
  - The clinical concern leads the row.
  - Tolerance has the shape 24h / 3 days / 1 week, with one value in use today.
  - The outstanding-labs strip is removed.
- **By:** Daniel.
- **Quote:** *"ensure the clinical concern is shared - it is a reminder to the doctor to pay
  attention"*. *"Right now - its 'Needs Attention' and that means the same day"*. *"remove this."*
- **Replaced:** the LifeLabs tier as final; the outstanding-labs strip.
- **Source:** `94ff101`.
- **Open:** OQ-14, OQ-15.

### D-39 · 21 Sep 2026 · The attention band holds critical values only
- **By:** Daniel.
- **Quote:** *"So as to not overwhelm the doctor - we are keeping it to critical values."*
- **Replaced:** alert-tier results on Home.
- **Source:** `392eccb`.
- **Conflict:** MTG21:72 on the same day says "Critical to high urgency only". See OQ-01.

### D-40 · 21 Sep 2026 · Review returns where you came from; the Inbox is external only
- **By:** Daniel.
- **Quote:** *"the inbox is only for external reports, nothing that's internally generated."*
- **Replaced:** a hard-coded "Back to Inbox".
- **Source:** `aa1e8b8`.

### D-41 · 21 Sep 2026 · A drafted follow-up for a lab
- **Decided:** a drafted disposition with three buttons: Accept & assign / Modify / No follow-up
  required. Contact the patient is the default for critical results.
- **By:** Daniel (videos 3 and 4).
- **Quote:** *"anything critical, what has to happen? Contact the patient. That's what has to
  happen."*
- **Replaced:** Done and Done-and-next.
- **Source:** `2094417`.

### D-42 · 21 Sep 2026 · The meeting's aligned decisions
- **Decided:**
  1. Needs your attention appears only when populated.
  2. Flip health card and visit status.
  3. Visit status is a dropdown in the queue.
  4. Remove the showing-now filter and restore the open windows.
  5. Remove noisy detail fields.
- **By:** Daniel and Ani.
- **Quote:** MTG21:8-14.
- **Replaced:** the auto "Showing now" chip (`f081c07`, `abe9f20`).
- **Source:** MTG21:8-24; `8546d30`, `c3c67dd` (Daniel: *"Good. Good."*).
- **Open:** item 5 is not itemised; see OQ-03.

### D-43 · 21 Sep 2026 · Columns read patient, visit status, billing status, health card
- **By:** Daniel.
- **Quote:** MTG21:18-19.
- **Replaced:** D-33.
- **Source:** `8546d30`.

### D-44 · 21 Sep 2026 · Three filters, not one
- **By:** Ani, and Daniel conceded.
- **Quote:** *"I'm not a big filter guy."*, then *"You got me on that one."*
- **Replaced:** the one-filter position, and the removal of the billing filter in D-35.
- **Source:** MTG21:43-46; `887c021`.

### D-45 · 21 Sep 2026 · FIFO inside each band, never across
- **By:** Daniel.
- **Quote:** *"it is not superior to anything within its respective category."*
- **Replaced:** D-36 (oldest first overall).
- **Source:** MTG21:50-52; `133c966`.

### D-46 · 21 Sep 2026 · No relative age beside the received time
- **By:** Ani, and Daniel agreed.
- **Quote:** *"it came two hour ago, one day ago"* is redundant.
- **Source:** MTG21:47-49; `887c021`.

### D-47 · 21 Sep 2026 · Timestamps are the clinic's received time
- **By:** Daniel.
- **Quote:** otherwise *"the record implies clinic negligence"* (paraphrased in MTG21).
- **Replaced:** a facsimile footer labelled "Collected" (`887c021`).
- **Source:** MTG21:78-79.

### D-48 · 21 Sep 2026 · No row cap; DOB and PHN off the list; red for critical only; test at 100%
- **By:** Daniel.
- **Quote:** 40-60 patients *"must scroll, not paginate"*; *"Red is reserved for critical alerts
  alone."*
- **Replaced:** nothing specific.
- **Source:** MTG21:80-84.

### D-49 · 21 Sep 2026 · The nav is collapsed by default
- **By:** Daniel.
- **Quote:** "Set default view — navigation menu collapsed by default."
- **Replaced:** the sidebar expanded by default (`7591b2d`, 3 Aug).
- **Source:** MTG21:23; `8546d30`.

### D-50 · 22 Sep 2026 · One colour per status; greens quieter
- **By:** Daniel.
- **Quote:** *"I like a minimum of shapes and colours... if I don't need to pay attention to it,
  then I don't want to pay attention to it."*
- **Replaced:** five hues for "In queue"; the green verified chip.
- **Source:** `c51b998`, `f0fe73f`; MTG21:55-56.

### D-51 · 22 Sep 2026 · Tasks Daniel rejected by name leave the band
- **Decided:** three tasks are made routine.
- **By:** Daniel.
- **Quote:** *"referral for [HSAT] -- no way that goes there"*; *"sign off on imaging due in two
  days -- nope."*
- **Replaced:** those tasks marked high.
- **Source:** `53c6597`.
- **Note:** DR:47-49 found "Review MRI report" still marked urgent in the data.

### D-52 · 23 Sep 2026 · Inbox rows show the name only
- **By:** design, following Daniel's queue decision.
- **Quote:** *"it's nice to have it there, but you're probably right."* (V2:7781).
- **Replaced:** PHN and DOB on every row (D-15).
- **Source:** `236eed3`.

### D-53 · 23 Sep 2026 · Keep v1; the redesign goes in v2
- **By:** Ani.
- **Quote:** *"keep current version including previous version of inbox and create a new v2"*.
- **Source:** `c5cf307`.
- **Later:** 25 Sep, v2 became the default with v1 secondary (`32d01b1`). Then *"hide version 1 from
  demo for now"*: v1 is gone from the demo, and the file is kept (`8778804`).

### D-54 · 23 Sep 2026 · The inbox redesign
- **Decided:** calm two-line rows, a received time on the right, 44 px controls, and a reachable
  Sign off.
- **By:** Ani.
- **Quote:** *"overwhelming, fonts are small, buttons are small ... make it clean"*.
- **Replaced:** 138-170 px cards, and a sign-off that could not be reached.
- **Source:** `8444fe4`, `f241a4b`, `e270f7c`.

### D-55 · 24 Sep 2026 · The chart shows what this visit needs; pharmacy under More (reversed)
- **By:** Ani.
- **Quote:** *"so much going on, so much info at once -- prioritize actions for the doctor"*.
- **Replaced:** the full chart layout.
- **Source:** `82626a5`.
- **Reversed (pharmacy):** 25 Sep the pharmacy moved back to the header. S1:24-25: "wrong for
  renewals, one of the most common reasons in the queue" (`29d956d`).

### D-56 · 24 Sep 2026 · Colour back where it carries meaning
- **By:** Ani.
- **Quote:** *"everything looks the same, no clear hierarchy, very little colour."*
- **Replaced:** the ink-only pass (`1518976`, `8444fe4`).
- **Source:** `0c120f8`.

### D-57 · Tag strokes, reversed several times
- **History:**
  - 14 Sep: outlined chips (`9d298c7`), then the outlines were dropped from the MSP pills
    (`a3a39f1`).
  - 22 Sep: the billing chip was filled with no stroke (`ae1b5a9`).
  - 23 Sep: the stroke came back on billing only (`5dfffd7`).
  - 25 Sep: Ani, *"do not have stroke on tags"* (`29d956d`, V2:3787). No tag has a stroke now.
- **By:** Ani.

### D-58 · 25 Sep 2026 · The clock is front and centre, inside the profile pill
- **By:** Daniel (the content), and Ani (the placement).
- **Quote:** *"This is very useful info and I want it front and center... when I am in other time
  zones it orients me."* Ani: the time lives in the profile pill.
- **Replaced:** the date and clock under Live queue (`41205af`); a separate time pill.
- **Source:** V2:4077-4080; `29d956d`, `9b496d2`, `bed86c4`.

### D-59 · 25 Sep 2026 · One-press Call and renewal by fax, from shadowing 1
- **By:** design, from S1.
- **Quote:** *"Double tap for call now like fifty times. My goodness."*
- **Replaced:** a call button that did not show its state.
- **Source:** `29d956d`; S1:8-9, 24-28.

### D-60 · 25 Sep 2026 · Other 25 Sep interface decisions
- **By:** Ani.
- **Decided:**
  - Remove the notification bell (`7820ef5`: *"remove notification bell from top"*).
  - The inbox stages become tabs (`07dd1ae`: *"this should be tabs on top"*).
  - Billing becomes a dropdown like visit status (`9b496d2`).
  - Tags are medium weight with softer tints (`afd50dd`: *"these tag texts are very bold"*).
  - One tag spec (`57ee981`: *"why do these 3 have different font sizes"*).
  - The chat docks to the bottom (`afd50dd`). This replaced the top-bar dropdown from `dc4bd73`.
  - Reading text is capped at 66ch (`affc632`).
  - The inbox source sits under the name (`535ad1a`).

### D-61 · 25 Sep 2026 · The "Review MRI report" task is removed
- **Decided:** delete the task rather than give it a finding. There is no report behind it to draw
  one from.
- **By:** design (the designer agent, from DR:218), shipped by Ani in build 13:10.
- **Quote:** Daniel, 21 Sep: *"Don't keep it a mystery."* Code: "it goes rather than being given an
  invented one" (V2b:6812-6815).
- **Replaced:** an urgent "Review MRI report" task that D-51 had left in the data (DR:47-49).
- **Source:** `d2a2823`; MTG21:60-62, 75-77.

### D-62 · 25 Sep 2026 · One attention row per patient
- **Decided:** a patient's intake flag folds into their critical result row on Home, as a second
  reason and a second button ("Review intake").
- **By:** design, from the doctor review; shipped in build 13:10.
- **Quote:** *"That's one patient and one decision."* (DR ask 5, quoted at V2b:6164).
- **Replaced:** two rows for one patient (a critical result and an intake flag).
- **Source:** `d2a2823`; DR:218-219; V2b:6164-6172.

### D-63 · 25 Sep 2026 · The renewal card is per patient, with a computed quantity and a check step
- **Decided:**
  - Each patient's own medications, pharmacy and PHN; the intake's drug preselected, at the last
    plan's dose.
  - Quantity is worked out as doses a day × days, shown, never typed into the data.
  - Supply is 1 or 3 months, default 3.
  - "Check before it goes" comes before anything is sent.
  - Status reads "Sending to …", then "Delivered … · patient copy sent" as a later event.
  - "Also active · Renew too" for the other medications.
- **By:** design, from DR ask 2 and S1/S2; shipped in build 13:10.
- **Quote:** *"A fax to a pharmacy cannot be taken back, so nothing goes before this check."*
  (V2b:10013). S2: *"I'm happy to represcribe this three months at 300."* (V2b:9890). S1: "Delivered
  is a later event than sent, never the same second." (V2b:10070).
- **Replaced:** fixed demo medications on every chart, 90 tablets tied to 3 months, no summary,
  and "Delivered" at the instant of Send (DR:72-86).
- **Note:** REQ-RX-02's interim line said quantity should be its own field and never inferred. The
  build infers it from the directions instead. The rule still waits on Daniel (OQ-09).
- **Source:** `d2a2823`; V2b:9885-10095; DR:200-206.

### D-64 · 25 Sep 2026 · "Ask MOA to send" on the renewal card
- **Decided:** the renewal card gets a second route, "Ask MOA to send". It goes through the same
  check, files the same task the Task MOA dialog files with the drug and pharmacy written in, writes
  the note line, and shows "Sent to <MOA> · waiting", then "Picked up by <MOA>". One task function
  now serves both, with due set from priority.
- **By:** design, from S2 and DR ask 2; shipped in build 13:10.
- **Quote:** S2: *"Can you hear me, … or am I talking to myself?"*; code: "the hand-off answers"
  (V2b:10060).
- **Replaced:** a spoken hand-off with no receipt; tasks stamped "due Sep 19" (V2b:10099-10101).
- **Note:** "Review & fax" is primary and "Ask MOA to send" secondary (V2b:4601-4602). Picked up is
  a demo timer. Which route leads is OQ-08.
- **Source:** `d2a2823`; S2:38-40, 62-63.

### D-65 · 25 Sep 2026 · Finalize closes today's visit
- **Decided:** Finalize asks first on an empty note or bracketed template text, ends a live call,
  sets Completed, stamps and locks the note, submits a pending claim, and offers the next patient.
  The button is renamed "Finalize today's visit".
- **By:** design, from DR ask 4, S2 and S3; shipped in build 13:10.
- **Quote:** S2: "The patient leaves the queue at once." S2: "Finalize with an empty note today
  asks first." (V2b:7100, 7110).
- **Replaced:** "Finalize & review billing", which showed a toast and opened no billing review
  (DR:87-91). REQ-BIL-04 is superseded; OQ-51 asks whether a billing review is wanted.
- **Source:** `d2a2823`; V2b:4618-4620, 7091-7120, 10276-10306.

### D-66 · 25 Sep 2026 · "Since last visit", from the previous visit's plan
- **Decided:** a block at the top of a follow-up with the previous visit's Plan, Ask about and
  Pending (plus unread Inbox results), and "Read the <date> note" to open it read-only in place.
  The note box grows with its text instead of scrolling.
- **By:** design, from DR ask 3, S2 and S3; shipped in build 13:10.
- **Quote:** code: "read-only, in place, under the summary: today's note below never changes"
  (V2b:10211). S2: the note box "scrolls. It sits inside the chart modal, which also scrolls"
  (V2b:10268).
- **Replaced:** nothing; v2 had no previous note to open (DR:97-100).
- **Note:** it holds one previous visit per patient. S4 (a new reason) shows it must fit today's
  reason instead (REQ-CH-20, S4:99-100).
- **Source:** `d2a2823`; V2b:10117-10227.

### D-67 · 25 Sep 2026 · Critical results on the chart, and "Call now" from review
- **Decided:** critical and high results not yet signed off sit at the top of the patient's chart,
  using the Inbox's own tiering. On a drafted review, "Call now" appears when the patient is in
  today's queue, as a secondary button beside Accept & assign.
- **By:** design, from DR ask 1; shipped in build 13:10.
- **Quote:** DR: "the biggest risk I found" (DR:147-151). Code: "labTier decides, nothing new is
  inferred" (V2b:10230).
- **Replaced:** a chart with no sign of a critical result; review with MOA hand-off only.
- **Note:** whether "Call now" should lead is OQ-11.
- **Source:** `d2a2823`; V2b:4367, 8961-9006, 10229-10265; DR:195-199.

### D-68 · 25 Sep 2026 · A dropped call is shown, and the timer counts the whole contact
- **Decided:** "Call dropped at m:ss" with a Redial label; a redial carries on the timer and counts
  the calls ("2 calls · 04:10").
- **By:** design, from S3; shipped in build 13:10.
- **Quote:** S3: "the timer restarts from 0:00, so the screen no longer shows how long he has been
  with the patient" (V2b:9390-9392).
- **Replaced:** a timer that reset on each call, and no drop state.
- **Source:** `d2a2823`; V2b:9390-9435.

### D-69 · 25 Sep 2026 · Next result in review
- **Decided:** a routine "No follow-up" opened from the Inbox lands on the next result, and review
  has a "Next result" button.
- **By:** design, from DR ask 5; shipped in build 13:10.
- **Quote:** "from the inbox, a routine 'No follow-up' lands on the next result" (V2b:8954).
- **Replaced:** a round trip to the Inbox after every result (DR:157-170).
- **Source:** `d2a2823`; V2b:4293, 8951-8972.

### D-70 · 25 Sep 2026 · Other build 13:10 fixes
- **Decided:**
  - `#chart:N` deep links wait for the whole script, so opening a chart by link no longer stops the
    page (V2b:9812-9829).
  - The medication rail and Medications tab read the renewal card's list, so the chart cannot
    disagree with itself (V2b:10306-10309).
- **By:** design, from the doctor review; shipped in build 13:10.
- **Quote:** DR: "#chart:5 ... throws in rxOpen because RX_MEDS is declared further down the
  script" (V2b:9817).
- **Replaced:** a deep link that broke the rest of the script; a rail that disagreed with the care
  plan (DR:109-110).
- **Source:** `d2a2823`.

## Changelog

- 25 Sep 2026, first run: 60 entries from 27 Jul to 25 Sep 2026, including the reversals: D-11,
  D-12, D-15, D-16, D-19, D-25, D-33, D-35 (item 7), D-36, D-55 and D-57.
- 25 Sep 2026, second run: 70 entries. Added D-61 to D-70 for build 13:10 (`d2a2823`), including
  the removal of the "Review MRI report" task (D-61) and the "Ask MOA to send" hand-off (D-64).
  D-65 replaces "Finalize & review billing". D-63 notes that the computed quantity departs from
  REQ-RX-02's interim rule. Shadowing 4 brought no decisions; its questions are in
  `open-questions.md`.
