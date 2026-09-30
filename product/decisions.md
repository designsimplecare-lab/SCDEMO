# SimpleCare decision log

Owner: product manager agent. First written 25 Sep 2026. Each entry gives what was decided, by whom,
the quote behind it, what it replaced, and the source. The dates are the dates of the source or the
commit. Source codes are as in `use-cases.md`. **Reversed** marks a decision that a later entry
undid; the later entry names it. "Design" in *By* means the decision came from a design session with
no client quote; Ani approved it by shipping it. From 29 Sep 2026, design decisions are Manoj's,
with Ani approving (D-91).

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
- **Superseded (29 Sep):** Daniel confirms a limited, fixed set of windows (D-83). The number and
  the times are OQ-66.

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
- **Amended (30 Sep):** chat becomes a left-nav item (D-86).

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
- **Refined (27 Sep):** Daniel rarely works out of order, but sometimes calls a particular patient
  immediately (D-82). How he does that is still OQ-04.

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
- **Reversed (29 Sep):** Daniel crossed the task row off Home, so the band holds results only
  (D-85). OQ-01 is answered.

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
- **Reversed (27 Sep):** *"Critical and High belong."* (D-78).

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
- **Reversed (placement):** on 29 Sep Daniel asked for the time next to the greeting (D-84). On
  30 Sep Ani moved it out of the profile pill into its own pill (D-92). The content stays.

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
    **Replaced (29-30 Sep):** the chat becomes a movable panel and a left-nav item (D-86).
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
- **Affected (29 Sep):** one row per patient stands. But the flag's text sits in the part of the
  row Daniel crossed off (D-85). Whether the flag stays in another form is OQ-35.

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
  a demo timer. Which route leads was OQ-08. **Partly replaced** by D-72 (26 Sep): neither leads;
  the two are equal choices. **Corrected** by D-79 (27 Sep): the person who sends is Japneet, the
  physician assistant, under the doctor's sign-off. It is not an MOA.
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
  reason instead (REQ-CH-20, S4:99-100). S5 (a first visit) shows it is hidden when there is no
  previous visit, and its Pending cannot hold a result ordered outside SimpleCare (V2b:10185-10195;
  S5:104-106; REQ-CH-29). D-74 (26 Sep) confirms a last-note summary at the top and adds the care
  plan beside it.
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

### D-71 · 26 Sep 2026 · Reviewed is a state; sign-off is the doctor's accountable action
- **Decided:**
  - *Reviewed* means the doctor is assessing. Nothing further has to happen until he signs off.
  - *Sign off* is always an action, and it is the doctor's approval with his name on it:
    - signing off the chart = finalizing the visit;
    - faxing a script = signing off the prescription;
    - submitting a bill = signing off the billing.
  - The product uses the language of sign-off for these approving actions.
- **By:** Daniel.
- **Quote:** *"Reviewing is separate, all it means is that the Doctor is assessing - it means no
  further action is necessarily to be taken until such time as I review and sign off. To sign off is
  typically an action. So I 'sign off' on the chart - what does that mean? It means the chart is
  completed. What does that mean? It means that i've finalized the visit."* *"To Fax is to 'sign
  off' on the script"* *"To submit a bill is to 'sign off' on your billing."* *"It is action
  oriented."* *"The Doctor has approved this, meaning my a\*\* is on the line."*
- **Replaced:** confirms the Inbox's received → reviewed → signed off (`07dd1ae`, REQ-IN-01) over
  v7 §5.6's single question (`1e6c53f`). Answers OQ-10. Extends sign-off beyond results to the
  chart, the script and the bill (REQ-UI-06). Confirms D-65 (Finalize closes the visit) as the
  chart's sign-off.
- **Note:** build 13:10 submits the claim inside Finalize without saying so (V2b:7114), which does
  not yet read as signing off the bill (OQ-51). Whether one press may sign off a routine result is
  OQ-62; whose sign-off an MOA-sent script is, OQ-61.
- **Source:** ANS26:16-34.

### D-72 · 26 Sep 2026 · Either the doctor or Japneet (the PA) sends a renewal, his choice each time
- **Decided:** "Send it myself" and "Ask the MOA to send" are equal choices. The doctor picks each
  time, so neither is the default.
- **By:** Daniel.
- **Quote:** *"Either can send - Japneet [has] prescribing experience, but I also have my favorite's
  pre-populated. So if I am f\*\*\*ing around, she sends it. If I think she'll f\*\*\* it up,
  then i send it."*
- **Replaced:** build 13:10's "Review & fax" as the primary button with "Ask MOA to send" secondary
  (V2b:4601-4602, D-64's note). Answers OQ-08. The two routes should now carry equal weight
  (REQ-RX-10).
- **Source:** ANS26:7-13.
- **Corrected (27 Sep):** "she" is Japneet, the physician assistant, not an MOA (D-79). The title
  said "the MOA" until 30 Sep. Built as equal routes in `c1015e4` (V2c:4719-4720).

### D-73 · 26 Sep 2026 · Favourite prescriptions are pre-populated
- **Decided:** the doctor keeps favourite prescriptions, saved scripts he reuses, pre-populated. The
  product supports them (REQ-RX-11).
- **By:** Daniel.
- **Quote:** *"I also have my favorite's pre-populated."*
- **Replaced:** nothing; v2 has no favourites, and the renewal card starts only from the patient's
  medication list (`RX_MEDS` V2b:9894). Where they live and who manages them is OQ-60.
- **Source:** ANS26:8-9, 14.
- **Placed (27 Sep):** in the Rx function, managed by the doctor (D-80).

### D-74 · 26 Sep 2026 · The care plan and a last-note summary, both at the top of the chart
- **Decided:** the top of the chart holds the care plan (the narrative of what we are doing) and a
  summary of the last note.
- **By:** Daniel.
- **Quote:** *"Yes ....exactly - I need a 'Care Plan' and even the last note summary is good too"*
- **Replaced:** confirms D-66 ("Since last visit" from the previous plan) and adds the care plan to
  the top. In build 13:10 the care plan sits below today's note and Finalize (V2b:4624-4625).
  Answers OQ-37 in part; who writes the summary and which notes it draws on is OQ-63.
- **Source:** ANS26:36-40.

### D-75 · 26 Sep 2026 · Measurements are patient-reported
- **Decided:** weight, blood pressure and similar readings come from the patient. The doctor reads
  them as a trend.
- **By:** Daniel.
- **Quote:** *"The weights come from me asking the patient. I get my patient's to work. It means I
  get them to do their blood pressures, their weights etc."*
- **Replaced:** REQ-CH-21's framing of each reading as "patient-reported or measured"; in this
  practice they are patient-reported. v2's "Last vitals" shows one static set with no source
  (V2b:4643-4650). Answers OQ-47; who enters the reading, and where, is OQ-64.
- **Source:** ANS26:42-47.

### D-76 · 26 Sep 2026 · Results are data, not files
- **Decided:** results are shown as values and trends by test. Opening raw PDFs to find a result is
  the problem, not the workflow.
- **By:** Daniel.
- **Quote:** *"yes....it is madness that I am opening up raw pdf's to find out what the f\*\*\* is
  going on."*
- **Replaced:** confirms REQ-CH-22 and raises its priority. What it replaces is production's lab
  documents list (S4:40-56).
- **Source:** ANS26:49-52.

### D-77 · 26 Sep 2026 · Results come from the source by API; a patient upload is a fallback
- **Decided:** results are taken directly from the lab or source by integration (an API). A result
  the patient uploads is only a fallback, and it is marked patient-supplied.
- **By:** Daniel.
- **Quote:** *"The fact that i need to do this is wild"* *"We need API access so that we get the
  results from the source. I am relying on patients to help me."*
- **Replaced:** the S5 plan of a patient upload as the route for an outside result (S5:49-54), and
  the fix OQ-48 looked for in better PDF uploads. Answers OQ-48 and OQ-53. REQ-PT-09 and REQ-CH-29
  stay, as the fallback. Which source comes first is OQ-65; the Accelerus API access in his 21 Sep
  next steps may be related (MTG21:31, not confirmed).
- **Source:** ANS26:54-60.

### D-78 · 27 Sep 2026 · Home's attention list holds Critical and High
- **Decided:** results in the Critical and High bands belong in Needs your attention.
- **By:** Daniel.
- **Quote:** *"Critical and High belong."*
- **Replaced:** D-39 (critical values only). This settles the same-day conflict with MTG21:72 and
  answers OQ-01.
- **Note:**
  - Not built. `renderCriticals` keeps critical only, and its comment still quotes the 21 Sep rule
    (V2c:6262-6274).
  - The Inbox's High band is its alert tier (`labTier` V2c:7990).
  - The clinical-safety hazard log still describes critical-only (HZ-16). That is flagged on the
    task board for `clinical-safety`.
- **Source:** ANS27:7-11.

### D-79 · 27 Sep 2026 · Sign-off is always the doctor's; he may delegate to Japneet, the PA
- **Decided:**
  - Every sign-off is the doctor's. He can delegate the action to Japneet, the physician
    assistant, but not the responsibility.
  - Japneet works in a Physician Assistant portal identical to the physician portal, not in the
    MOA portal.
- **By:** Daniel.
- **Quote:** *"Always me. I can delegate authority to Japneet, but it is my responsibility. She uses
  the Physician Assistant Portal - which is identical to my portal."*
- **Replaced:** the docs' reading of D-64 and D-72 that the second renewal route is an MOA task.
  Answers OQ-61. REQ-RX-07 and REQ-RX-10 are reworded.
- **Note:**
  - v2 still models Japneet as the MOA buddy (V2c:6870-6871). The route files an MOA task, and the
    note reads "Sent to Japneet (MOA)" with no sign-off by the doctor (V2c:10183-10187).
  - What the record should say is OQ-70.
  - Whether she can send tasks to the MOA in her own right is not decided (rule 12; OQ-70).
- **Source:** ANS27:13-20.

### D-80 · 27 Sep 2026 · Favourites live in the Rx function, and the doctor manages them
- **By:** Daniel.
- **Quote:** *"They live in the Rx function. I manage them."*
- **Replaced:** nothing. It places D-73 and answers OQ-60.
- **Note:** built as a demo in `c1015e4`. The renewal card has a Favourites button, filled from
  invented demo favourites (V2c:4706, 10546-10583).
- **Source:** ANS27:22-25.

### D-81 · 27 Sep 2026 · Never name competitors in intake or in the product
- **Decided:** intake does not ask about other platforms, and no competitor is named anywhere in
  the product. He asks the question himself on the call.
- **By:** Daniel.
- **Quote:** *"No - don't mention Rocket or Tia, I ask because many of my patients come from
  there."*
- **Replaced:** REQ-INT-04 (an intake question naming two platforms), now withdrawn. Answers OQ-18.
  The same rule is in the handbook as rule 16a.
- **Source:** ANS27:37-43.

### D-82 · 27 Sep 2026 · Finalizing does not break the queue; calling out of order is rare
- **Decided:**
  - Finalizing a visit never changes the queue order.
  - He rarely works out of order. When he does, it is to call one particular patient immediately.
- **By:** Daniel.
- **Quote:** *"Finalizing a visit, doesn't break the queue. Though, I can't remember a time where I
  skipped ahead to finalize a visit. Sometimes when a patient ... pulls some sh\*t with me - I will
  call them immediately"* (the ellipsis leaves out how he described the patient).
- **Replaced:** nothing. It refines D-31 (Call only on the next patient) and partly answers OQ-04.
  Where he presses for that call is still open.
- **Source:** ANS27:45-53.

### D-83 · 29 Sep 2026 · The number of call windows is deliberately limited
- **By:** Daniel.
- **Quote:** Ani: *"this is maximum window ranges right? can it not be 7 to 9"*. Daniel: *"Yes - we
  have limited the number of windows. What that number is, i am not sure."*
- **Replaced:** D-08's per-patient window length, which was already superseded. Partly answers
  OQ-34.
- **Open:** OQ-66 (the number and the times).
- **Source:** HOME29:6-11.

### D-84 · 29 Sep 2026 · Home: the time next to the greeting
- **By:** Daniel.
- **Quote:** *"1. Can we place the timing info next to Good Evening or Good Morning or Good Afternoon
  whatever it might be"*
- **Replaced:** the time inside the profile pill (D-58). His example reads "Good evening,
  Dr. Pannozzo · 7:50 PM Toronto · 10m left" (HOME29:24-26).
- **Note:** not yet built as asked. On 30 Sep Ani moved the time into its own pill at the top right
  (D-92), while the greeting stays at the top left (V2c:4289, 5547). T-008 (Manoj) carries it. See
  OQ-71.
- **Source:** HOME29:14-15, 24-26.

### D-85 · 29 Sep 2026 · The attention list is trimmed to name, test and value, with no task rows
- **Decided:**
  - The task row goes.
  - On a result row, everything after the value goes: the reference range, the diagnosis text, the
    source and the assignee.
  - Kept: the patient's name with age and sex, the test, and the value with its arrow.
- **By:** Daniel, on a marked-up screenshot. What was crossed off is read from the image
  (HOME29:23).
- **Quote:** *"2. I eliminated the extra stuff that isn't needed - crossed off"*
- **Replaced:**
  - D-34 (the band includes tasks): reversed.
  - On Home only, the clinical concern leading the row (D-38) and the under-five-words context line
    (MTG21:60-62; OQ-35).
  - D-62's one row per patient stands, but the intake flag's text sat in the crossed part (OQ-35).
- **Note:** not built. The task rows come from `attnTasks` (V2c:6177-6188), and the result row still
  renders the range, the concern, the flag and the basis (V2c:6299-6303). T-008 (Manoj) is building
  it.
- **Source:** HOME29:13, 17, 23-32; `from-daniel/images/2026-09-29-home-markup.webp`.

### D-86 · 29-30 Sep 2026 · Movable messenger and AI panels; chat also in the left nav
- **Decided:**
  - The messenger (MOA chat) and the AI assistant become panels the doctor can drag and place.
  - Chat also becomes a primary left-nav item.
- **By:** Daniel (movable panels). Ani (chat in the left nav): on 29 Sep it was her idea; on 30 Sep
  she decided to build both. That decision was relayed by the lead in the T-010 brief and is not
  yet in a commit.
- **Quote:** Daniel: *"3. I'd like the messenger function movable"* *"4. The AI function
  movable."* Ani: *"I'm thinking to make chat one big menu on the left nav so it becomes more
  primary"*.
- **Replaced:**
  - D-60's chat docked to the bottom (`afd50dd`).
  - The chat button in the top bar (V2c:4295).
  - D-27's five nav items gain chat. The AI assistant stays out of the nav, as in D-09.
- **Note:** not built. The AI panel is fixed at the bottom right (V2c:508), and the chat panel is
  fixed too (V2c:3827, 3872). T-008 and T-009 (Manoj) are building it.
- **Source:** HOME29:19-21, 33-40; T-009 on the task board.

### D-87 · 29 Sep 2026 · Booking is open to every concern that is not an emergency
- **Decided:**
  - Patients can book for any concern, however hard.
  - The only hard stop is an emergency, which is sent to 911 or the ER.
  - The product's job is to organise hard cases so they become manageable, not to turn them away.
- **By:** Daniel.
- **Quote:** *"I am not blocking patients anymore. They can book for every single problem no matter
  how hard so long as it is not an Emergency."* *"Indeed, no doctor should block."* *"What we need
  to do is organize these Patients so what is hard can become manageable."*
- **Replaced:** blocking patients by concern ("not ... anymore"). Our sources record no earlier
  blocking rule, only his word. Ani: *"in current state all is open."*
- **Open:** OQ-69 (the red-flag list and the emergency wording, Daniel; the look, Manoj).
- **Source:** BOOK29:7-8, 31-42; B-001.

### D-88 · 29 Sep 2026 · Two intake depths: quick-book and triage-first; Daniel decides which is which
- **Decided:**
  - Straightforward concerns get a quick-book tile.
  - Complicated concerns go through triage first, done by the AI rather than a few static
    questions.
  - Which concern is which is Daniel's call.
- **By:** Daniel.
- **Quote:** *"those can be displayed … We do that already."* *"i am not so inclined to quick book a
  Hemorrhoid Ani … You have a Hemorrhoid, you put in some work."* *"My expectation is that an AI can
  triage in a superior manner than x 4 static questions. And so preference is given to the AI for
  more complicated concerns."* *"Diarrhea is more complicated/Constipation is more complicated
  etc"*
- **His examples:**
  - Quick-book: Rx Renewal, Sick Note, Bladder Infection, Birth Control Refill, "+6 More".
  - Triage-first: hemorrhoids, diarrhoea, constipation.
- **Replaced:** quick-book for every concern card, including the Gastrointestinal Symptoms card he
  was looking at (BOOK29:14-16).
- **Open:** OQ-67 (the full list), OQ-68 (triage without the AI).
- **Source:** BOOK29:10-19.

### D-89 · 29 Sep 2026 · Many booking pathways, all into one queue
- **Decided:** patients choose how to book:
  - concern tiles ("Know what you need");
  - the Simplicity AI chat;
  - the clinic phone line, which may become AI;
  - possibly WhatsApp or text booking, not yet decided.
- **By:** Daniel.
- **Quote:** *"These pathways exist not just because we say to the patient 'Know what you need'"*
  *"So our clinic number (which is also soon to be AI, haha) and these other pathways exist to give
  as many patients as possible as many booking pathways as possible"* *"And indeed - we ought to
  even have WhatsApp? Text based booking … why not."*
- **Replaced:** the assumption that the chat is the main entry (B-001, "What this overrides").
- **Note:** "all into the same queue" is the lead's reading (BOOK29:52-53), not Daniel's words.
  WhatsApp is OQ-72.
- **Source:** BOOK29:21-29, 52-53.

### D-90 · 29 Sep 2026 · The AI is offered, never forced
- **Decided:** every pathway works without talking to an AI agent.
- **By:** Daniel.
- **Quote:** *"Some people f\*\*\*ing hate AI. So they don't want to talk to some bulls\*\*t agent."*
- **Replaced:** nothing written down. It confirms that the tile path is a full pathway. QA-007
  ("without the AI, you can't book") was a staging-only gap, and tile booking works in production
  (Ani, 29 Sep; QA29:13; `b85fd4d`).
- **Open:** OQ-68.
- **Source:** BOOK29:22-25, 54-55.

### D-91 · 29 Sep 2026 · Ani manages the team; Manoj owns all design
- **Decided:**
  - Manoj, a product designer hired on 29 Sep, owns every design task and every design decision:
    the portals, the patient chat and booking, the design system and the visual treatment.
  - Ani manages the team: priorities, task assignment and final approval.
- **By:** Ani.
- **Quote:** *"all tasks for me as designer should go to him … I will manage all team."*
  (`product/team.md`).
- **Replaced:** Ani as designer, where design decisions were approved by her shipping them (this
  log's header). Tasks T-008, T-009 and T-012 to T-017 moved to Manoj. The look of the emergency
  screen is his (rule 17a).
- **Source:** `0595005`, `a32763c`, `3e9a48f`.

### D-92 · 30 Sep 2026 · The time sits in its own top-bar pill, before the theme button
- **Decided:** the time moves out of the profile pill into a pill of its own, styled like the
  profile pill, with a clock where the photo would be. It sits before the theme button.
- **By:** Ani.
- **Quote:** *"Ani, 30 Sep: the time sits in its own pill, before the theme button, styled like the
  profile pill, with a clock where the photo would be"* (V2c:4291-4292).
- **Replaced:** D-58's time inside the profile pill (D-58 had itself replaced a separate pill).
- **Conflict:** Daniel asked for the time next to the greeting (D-84), which is at the other end of
  the top bar. See OQ-71.
- **Source:** `b8331e5`; V2c:4232-4245, 4291-4293.

## Changelog

- 25 Sep 2026, first run: 60 entries from 27 Jul to 25 Sep 2026, including the reversals: D-11,
  D-12, D-15, D-16, D-19, D-25, D-33, D-35 (item 7), D-36, D-55 and D-57.
- 25 Sep 2026, second run: 70 entries. Added D-61 to D-70 for build 13:10 (`d2a2823`), including
  the removal of the "Review MRI report" task (D-61) and the "Ask MOA to send" hand-off (D-64).
  D-65 replaces "Finalize & review billing". D-63 notes that the computed quantity departs from
  REQ-RX-02's interim rule. Shadowing 4 brought no decisions; its questions are in
  `open-questions.md`.
- 26 Sep 2026, third run: still 70 entries. Shadowing 5 (S5) brought no product decision: the
  doctor's *"I'm running this platform for continuity"* (S5:30-32) was said to a patient, not
  decided in a meeting, so it is evidence for REQ-ID-06 and OQ-58, not a D entry. D-66 gains a
  note on what S5 shows about "Since last visit". S5's questions are in `open-questions.md`.
- 26 Sep 2026, fourth run: 77 entries. Added D-71 to D-77 from Daniel's written answers (ANS26,
  `from-daniel/2026-09-26-answers-to-shadowing-questions.md`): review versus sign-off (D-71),
  either sends a renewal (D-72, which replaces D-64's primary/secondary order), favourites (D-73),
  care plan and last-note summary at the top (D-74, confirming D-66), patient-reported
  measurements (D-75), results as data (D-76) and results from the source by API (D-77).
- 30 Sep 2026, fifth run (T-010, with T-004 folded in): 92 entries.
  - Added D-78 to D-82 from Daniel's round-2 answers (ANS27): Critical and High on Home (D-78, which
    reverses D-39); sign-off always his, with the action delegated to Japneet as the PA (D-79,
    which corrects D-64 and D-72); favourites in Rx (D-80); no competitor names (D-81); and
    finalizing does not break the queue (D-82, which refines D-31).
  - Added D-83 to D-86 from his Home markup (HOME29): limited windows (D-83), the time beside the
    greeting (D-84), the trimmed attention list with no task rows (D-85, which reverses D-34 and
    affects D-62), and movable panels with chat in the left nav (D-86, which replaces D-60's docked
    chat).
  - Added D-87 to D-90 from his booking model (BOOK29): open booking, two intake depths, many
    pathways, and the AI optional.
  - Added D-91 (Manoj owns design; Ani manages) and D-92 (the time in its own pill, which reverses
    D-58's placement and conflicts with D-84; OQ-71).
  - D-72's title now names Japneet (PA), not the MOA.
  - Reversal notes added to D-08, D-27, D-31, D-34, D-39, D-58, D-60, D-62, D-64, D-72 and D-73.
