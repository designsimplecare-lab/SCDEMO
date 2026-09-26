# SimpleCare requirements

Owner: product manager agent. First written 25 Sep 2026. The source codes are the same as in
`use-cases.md`: MTG21, S1-S5, SIA, IA, HUX, COMP, SCS, SPEC, DR, V2 (build 12:45), V2b (build 13:10,
`d2a2823`), MOAP, PP, MEM and commit hashes. "Assumption" marks a claim with no source. Status:
**built** (works in v2), **partly built**, **not built**. "Open" names the open questions that
block a requirement (see `open-questions.md`). This file sets no clinical thresholds, doses or
billing codes. Where one is needed, it points to an open question.

Areas: [Home and queue](#home-and-queue-hq) · [Call](#call-call) · [Chart](#chart-ch) ·
[Prescribing](#prescribing-rx) · [Inbox](#inbox-in) · [Review](#review-rv) · [MOA hand-off and
tasks](#moa-hand-off-and-tasks-tk) · [Intake](#intake-int) · [Billing](#billing-bil) · [Patient
identity](#patient-identity-id) · [Look and feel](#look-and-feel-ui) · [MOA portal](#moa-portal-mp)
· [Patient portal](#patient-portal-pt)

---

## Home and queue (HQ)

**REQ-HQ-01 · The call windows are open on the page.**
- The four windows show as segments that need no click to reveal them. The window the clock is in is
  marked.
- Rationale: *"I want them call windows like here like boom boom boom boom."* (V2:725). *"When I
  don't know where I am, I get nervous."* (MTG21:66-71). What he meant by "remove it" was never the
  windows (MTG21:53-54).
- Accept: all four windows are visible at rest; the live window has a marker; picking one pins the
  queue to it, and clicking it again releases the pin (`c3c67dd`).
- Status: built.
- Open: OQ-34.

**REQ-HQ-02 · The clock and the window state are on every screen.**
- The doctor's local time and the state of the BC call day are in view on every screen.
- Rationale: Daniel, 25 Sep: *"This is very useful info and I want it front and center... when I am
  in other time zones it orients me."* (V2:4077). His six states are listed at V2:5600-5608
  (`f308201`).
- Accept: the zone of each time is named (for example PT beside local time), and the windows use BC
  time (DR:29-36).
- Status: partly built. The clock is in the profile pill (`9b496d2`). The zone labels are missing
  (DR:31-33).
- Open: OQ-34.

**REQ-HQ-03 · The queue follows the clock and holds carryover.**
- Patients unfinished from an earlier window stay in a Carryover band above the current window.
- Rationale: SPEC:117-127; `f081c07`.
- Accept: at a window change, unfinished patients do not disappear. The switch never happens
  mid-call or with a chart open (SPEC:129-132).
- Status: built (`607bd2d`).
- Open: OQ-33.

**REQ-HQ-04 · The columns read patient, visit status, billing status, health card, then clinical
concern.**
- Rationale: MTG21:11, 18-19; `8546d30`.
- Accept: the column order matches, and billing stays where the doctor learned to find it (V2:3159).
- Status: built.

**REQ-HQ-05 · Visit status is set from the row.**
- The row has a dropdown with Daniel's four statuses: In queue, Completed, Doctor to Callback,
  No-show.
- Rationale: MTG21:12, 20-21. *"Remove In visit, call dropped, scheduled. Have In queue, Completed,
  Doctor to Callback, No-Show."* (V2:5397).
- Accept: the status changes without opening the chart, and the full label fits its column.
- Status: partly built (V2:6401-6448). "Doctor to C…" is cut off (DR:41-42).

**REQ-HQ-06 · A "doctor running late" visit status.**
- It has a time tolerance and sends an automated text and email to the patient.
- Rationale: MTG21:27-28, 57-59. Daniel owns the design.
- Accept: to be written when Daniel sends the name, the tolerance and the message.
- Status: not built.
- Open: OQ-02, OQ-26.

**REQ-HQ-07 · Three filters, multi-select, and no "showing now" toggle.**
- The filters are visit status, billing status and health card.
- Rationale: *"I'm not a big filter guy"*, then *"You got me on that one."* (MTG21:43-46). Remove
  the showing-now filter (MTG21:13, 22).
- Accept: the filters combine; a filter can only offer states the rows can show (`0b82fb2`); there
  is no showing-now chip (V2:5582).
- Status: built (`887c021`, `056bba3`, `8546d30`).

**REQ-HQ-08 · There is no row cap.**
- A window of 40 to 60 or more patients scrolls. It does not paginate.
- Rationale: MTG21:80-81.
- Accept: every row in the window renders in one scrolling list, and the next patient is marked
  (SPEC:207-215).
- Status: built.

**REQ-HQ-09 · Queue order is first come, first served, with no pace metrics.**
- Rationale: wait duration is a pace metric Daniel does not want (`8cd0893`, `874f906`). *"Anything
  red is at the top."* (V2:5787).
- Accept: position numbers, not wait times. A red-flag intake sorts first.
- Status: built.

**REQ-HQ-10 · No DOB, PHN or other noisy detail on list rows.**
- Rationale: MTG21:14, 82; `236eed3`.
- Accept: search by name, PHN or DOB still works (`236eed3`).
- Status: built for DOB and PHN. "Remove noisy detail fields" is not itemised.
- Open: OQ-03.

**REQ-HQ-11 · Needs your attention appears only when populated, and says what is wrong.**
- Rationale: MTG21:10. *"Review MRI report"* is a mystery. The AI should give under five words of
  context: *"Don't keep it a mystery."* (MTG21:60-62).
- Accept: the section is absent on a clean day. Each row names the finding and never a bare task
  title. There is one row per patient (DR:46-48).
- Status: built to the current rule (build 13:10). A patient's intake flag folds into their critical
  result row as a second reason and a second button (`renderCriticals` V2b:6164-6172). "Review MRI
  report" is removed from the task data (V2b:6812). The intake-flag row is still static markup
  (V2b:4230).
- Open: OQ-01, OQ-35.

**REQ-HQ-12 · The attention list is not an inbox.**
- Only the most urgent items appear there, and routine never does. Over-tagging is guarded against.
- Rationale: MTG21:72-74. *"If everything needs your attention, then nothing needs your attention."*
  (`53c6597`). *"So as to not overwhelm the doctor - we are keeping it to critical values."*
  (`392eccb`).
- Accept: results are critical only. The threshold for tasks is set by OQ-01. Overdue is a status,
  not a priority (SPEC:84-92).
- Status: partly built. Results are critical-only (V2:6017). Tasks use Urgent, High or overdue
  (V2:5922), which the spec marks as an assumption (SPEC:44-45).
- Open: OQ-01.

**REQ-HQ-13 · The navigation is collapsed by default, and remembered.**
- Rationale: MTG21:23; V2:7950.
- Accept: the first visit shows the icon rail; if the doctor opens it, it stays open on the next
  visit.
- Status: built.

**REQ-HQ-14 · Row behaviour.**
- The row opens the chart. Call is shown only on the next patient. Task MOA is revealed on hover and
  focus. On touch, the actions stay visible.
- Rationale: SPEC:167-205 (*"mirrors a walk-in queue"*); `607bd2d`.
- Accept: as in SPEC:182-205.
- Status: built (V2:5822-5828).
- Open: OQ-04, OQ-05.

**REQ-HQ-15 · The queue count matches the rows shown.**
- Rationale: "Live queue 6" sits above 8 rows (DR:39-40).
- Accept: the header count equals the rows the doctor can see, or its label says what it counts.
- Status: not built (defect).

**REQ-HQ-16 · The doctor can see whether the MOA is online.**
- Rationale: *"He does want to see whether his MOA is currently online"* (SIA:22, 38).
- Accept: presence is visible without opening chat.
- Status: partly built. The MOA roll-up is in the chat tooltip. The dot on the avatar is the
  doctor's own status (`f047109`).

**REQ-HQ-17 · Opening the queue never carries a search over from the last patient.**
- The search clears when the Daysheet opens, or shows as a filter chip with a clear button.
- Rationale: S4 opened on "Search all appointments" still filtered by the previous patient's name
  (S4:14-17, 131-132).
- Accept: after closing a chart, the queue shows every row in the window, or a visible chip says
  what is filtering it.
- Status: partly built. v2's queue search has a clear button (`clearQueueSearch` V2b:4265, 6236),
  but nothing clears it when the doctor comes back from a chart (no other caller found).

---

## Call (CALL)

**REQ-CALL-01 · One press dials.**
- A press dials whatever the button's label. A second press during a call does nothing. The state is
  visible: Calling…, then connected with a timer.
- Rationale: *"Double tap for call now like fifty times."* (S1:8-9). "Call Again" only reset the
  button (S3:18-20), and again in S5 (S5:13-17). Call trouble in 3 of 5 visits (S5:83-84).
- Accept: from rest, one press reaches Calling…; there is no reset-only press.
- Status: built (`pcStartCall` V2:9195, `29d956d`).

**REQ-CALL-02 · A dropped call is shown at once.**
- The pill changes to "Call dropped at m:ss · Redial". The doctor never learns of a drop from
  silence.
- Rationale: S3:22-26, 86-88.
- Accept: a drop changes the call state within a second, and one press redials.
- Status: built (build 13:10). "Call dropped at 00:31" and a Redial label (`pcCallSum` V2b:9409,
  `pcEndCall` V2b:9425). In the demo the drop is triggered from the demo switcher (`pcDropCall`
  V2b:9420).
- Open: OQ-06, OQ-21.

**REQ-CALL-03 · The timer counts the whole contact across reconnects ("2 calls · 4:10").**
- Rationale: *"the timer restarts from 0:00, so the screen no longer shows how long he has been with
  the patient."* (S3:24-25).
- Accept: a redial keeps the running total.
- Status: built (`pcCallRec`, `pcTimerText` V2b:9395-9396).

**REQ-CALL-04 · Starting a call from the chart sets the visit to in progress.**
- Rationale: DR:67-68.
- Accept: the queue row reflects the call whichever door it was started from.
- Status: partly built. From the queue, `callPatient` sets In progress (V2b:6372). The chart's own
  Call button calls `pcStartCall` directly and does not (V2b:4546, 9397).

**REQ-CALL-05 · Transfer to the MOA is offered only during a live call.**
- Rationale: *"you can't transfer a call you're not currently on"* (SIA:52).
- Accept: Transfer is disabled or hidden until the call is connected.
- Status: not built. Chart version C has no Transfer; the other layouts show it always enabled
  (V2:4576).
- Open: OQ-32.

**REQ-CALL-06 · Calls go outward only.**
- The patient never dials the doctor. The office line is for admin.
- Rationale: MEM (no repo source found); MOAP:258 routes MOA-to-doctor contact outside tasks.
- Accept: no patient-side control places a call to the doctor.
- Status: built in PP, as far as searched.
- Open: OQ-29.

**REQ-CALL-07 · Branded caller ID stays.**
- Rationale: SIA:56; MTG21:86-87 (*"95% contact rate"*).
- Accept: production behaviour is kept.
- Status: exists in production; not modelled in v2 (assumption: it needs no UI).

---

## Chart (CH)

**REQ-CH-01 · A follow-up opens on "Since last visit".**
- It shows the last plan in short lines (a medication change and its target, what to ask about) and
  the outstanding items with their dates. It follows today's reason across every note, not only the
  latest one.
- Rationale: the whole of S2's call went on reading the last plan (S2:11-17, 45-48). In S3 the plan
  sat two notes back (S3:67-70, 89-92).
- Accept: on a follow-up, the plan items needed for today are readable without scrolling or opening
  a note.
- Status: partly built (build 13:10). "Since last visit" shows the previous visit's Plan, Ask about
  and Pending, and adds unread Inbox results to Pending (`renderSinceLast` V2b:10182). It holds one
  visit per patient (`PT_LAST` V2b:10124), so it does not follow the reason across notes. For a new
  reason it would show the wrong plan (S4:99-100); see REQ-CH-20.
- Open: OQ-37.

**REQ-CH-02 · Older notes open read-only beside today's note, and the chart has one scroll region.**
- Rationale: nested scrolling (S2:18-20, S3:81-83). Reading history pushed today's note off-screen
  (S3:39-42), and again in S4, where the chart had five scroll regions (S4:28-31, 83-85).
- Accept: no box-inside-box scrolling; today's note stays in view while an older one is open.
- Status: partly built (build 13:10). "Read the <date> note" opens the previous note read-only in
  place, above today's note (`slvToggle` V2b:10221). The note box grows with its text instead of
  scrolling (`vcGrow` V2b:10269). Only the latest note can be opened, and nothing keeps today's note
  in view beside it.
- Open: OQ-20.

**REQ-CH-03 · The editor always says whose note it is.**
- The primary button names what it does ("Finalize today's visit").
- Rationale: S2:21-23, 51-53.
- Accept: an older note is never shown inside today's editor.
- Status: built (build 13:10). "This visit" holds only today's note, and the button reads
  "Finalize today's visit" (V2b:4618). A signed note says "Signed by … · read-only" (V2b:10282).
- Open: OQ-17.

**REQ-CH-04 · "Copy to today's note" on each section of an older note.**
- Precaution lines arrive as tick-lines.
- Rationale: the doctor drag-selected A and P instead (S3:51-53, 102-103).
- Status: not built.

**REQ-CH-05 · An empty note looks empty.**
- The placeholder is neutral, or the note starts from the intake reason as CC. There is no invented
  clinical example. "Documented at" appears only after the first word.
- Rationale: S3:31-35, 106-108. S4 shows the same ear-pain placeholder and early stamp (S4:24-27),
  and S5 again, with the stamp following the clock while nothing is written (S5:20-25).
- Status: partly built. The note is prefilled "Patient presents for <reason>." (V2:9153), and the
  placeholder is neutral.

**REQ-CH-06 · Finalize closes the visit.**
- It sets Completed, locks and stamps the note, opens billing review when the label promises one,
  and offers the next patient.
- Rationale: in production the patient leaves the queue at once (S2:26). v2 shows a toast only
  (DR:87-91).
- Accept: after Finalize the row reads Completed and the note is read-only.
- Status: built (build 13:10). `finalizeVisit` (V2b:7091) ends a live call, sets Completed, stamps
  and locks the note (`vcNoteState` V2b:10276), submits a pending claim, and offers "Next: <patient>"
  (V2b:4620). The label no longer promises a billing review (see REQ-BIL-04, D-65).
- Open: OQ-17.

**REQ-CH-07 · Ask before finalizing an empty note, or a note with bracketed template text.**
- Rationale: S2:53; a signed note carried "[document findings …]" (S3:48-50, 104-105).
- Accept: the prompt marks the line to fill or remove.
- Status: built (build 13:10). "Today's note is empty. Finalize anyway?" and "still has template
  text: "[…]". Finalize anyway?", with Keep writing / Finalize anyway (`finalizeVisit`
  V2b:7100-7107, `vcFinWarn` V2b:10296). Whether it should block instead is OQ-16.
- Open: OQ-16.

**REQ-CH-08 · The plan's watch-list becomes quick tick-lines in today's note.**
- Rationale: side effects were asked about and answered, then not recorded (S2:33-34, 64-65).
- Status: not built.

**REQ-CH-09 · A pending decision is a draft, not a sentence.**
- For example, a draft referral under the plan that the doctor promotes with one press.
- Rationale: S3:98-99; DR:187-189.
- Status: not built.

**REQ-CH-10 · Outstanding requests carry a status and an owner, including "waiting on the
patient".**
- A patient's email about the item attaches to it.
- Rationale: S3:78-80, 93-97. v2 owners are only GP or specialist (DR:178-180). S5 repeats the
  pattern: the doctor asks the patient to send something, and nothing tracks it (S5:49-54, 78-82).
  For results ordered elsewhere, see REQ-CH-29.
- Accept: "asked 3 weeks ago, not received" is readable beside the reason. Nothing becomes a task on
  its own (S3:95-97).
- Status: partly built. "Since last visit" Pending lines carry a date and a state, including
  "waiting on the patient", in the demo data (V2b:10163). There is no owner and no attached email.
- Open: OQ-19.

**REQ-CH-11 · The care plan (narrative) and Tasks (practical) stay separate.**
- Rationale: *"They would be distinct."* (`9b7b5f6`); `afdc728`; MEM.
- Accept: no merged list.
- Status: built.

**REQ-CH-12 · The banner shows what is needed before phoning.**
- Preferred name; allergy status always ("none" is a safety fact); alerts and conditions only when
  present; the pharmacy; Call and Task MOA.
- Rationale: `82626a5`. The pharmacy is back in the header for renewals (S1:24-25, `29d956d`).
- Status: built (V2:4414-4436).

**REQ-CH-13 · A critical or alert-tier result received today shows on that patient's chart.**
- The scribe and the draft note never assess without it.
- Rationale: DR:147-151, 195-199 ("The biggest risk I found").
- Accept: opening the chart of a patient with an unreviewed critical shows it at the top of This
  visit.
- Status: built (build 13:10). Critical and high results not yet signed off sit at the top of the
  chart with value, reference, concern, received time, review state, "Review result", and "Also in
  today" for the patient's other results (`renderChartAlerts` V2b:10237). It uses the Inbox's own
  tiering: "labTier decides, nothing new is inferred" (V2b:10230). Whether the scribe now reads it
  was not checked.

**REQ-CH-14 · The "Where this came from" recall shows whatever door the doctor came in by.**
- Rationale: `632998a`; DR:113-115.
- Status: partly built (from the Inbox only, `fastTrack` V2:8490).

**REQ-CH-15 · Chart data is the patient's own.**
- PHN, medications, pharmacy, age and sex match the queue row and the patient's documents.
- Rationale: in a demo to doctors, a PHN mismatch reads as a wrong-patient error (DR:61-63).
- Status: partly built (build 13:10). PHN, pharmacy and medications are per patient (`PT_CHART`
  V2b:9873, `RX_MEDS` V2b:9894), and the medication rail reads the same list (`renderMedRail`
  V2b:10309). Age and sex on the banner were not re-checked. The Results tab is the same static list
  for every patient (V2b:4659-4663).

**REQ-CH-16 · Continuity is visible.**
- A returning-patient indicator, and whether the patient was seen on another platform. The
  other-platform answer shows beside "No previous notes".
- Rationale: SIA:46. The doctor asked about other platforms in 2 of 5 visits, both times in front of
  a chart that said "no previous notes": *"Tia or Rocket"* (S1:10-12) and *"Have we spoken before at
  either Tia Health or Rocket, or is this the first time?"* (S5:26-29, 75-77, 153-155). Raised in
  priority on 26 Sep.
- Accept: on a chart with no SimpleCare notes, the doctor can tell from the screen whether the
  patient was seen on another platform, without asking.
- Status: not built.
- Open: OQ-18.

**REQ-CH-17 · The problem list maintains itself, with the doctor approving.**
- Suggestions carry their evidence and land nowhere until approved. Every change is logged. Review
  happens at Finalize.
- Rationale: `11b0ecb`, `74660d7`, `632998a`.
- Status: built.

**REQ-CH-18 · One click on a document opens it.**
- There is no separate Preview step. Share and download as PDF are available from the viewer.
- Rationale: SIA:50.
- Status: partly built. Inbox rows open on click (`8444fe4`). Share and PDF were not found.
- Open: OQ-42.

**REQ-CH-19 · The ambient scribe proposes and the doctor presses.**
- Consent comes first. The scribe files nothing. Each proposal links to the moment it came from.
- Rationale: *"The doctor decide what is a Task. By pressing Task button. always."* (`1b201eb`,
  V2:1656). S5 is the strongest case for it: a full history said aloud and none of it written
  (S5:37-46, 71-74). See REQ-CH-28.
- Status: built as a demo.
- Open: OQ-31.

**REQ-CH-20 · "Since last visit" fits today's reason, not only the latest note.**
- When no earlier note touches today's reason, the block says so ("First visit for weight") and
  shows that reason's context instead: the intake answers, the relevant history and the latest
  relevant results. The unrelated last plan drops to one line below.
- Rationale: in S4 the reason was new (weight) and the latest note was about something else. He read
  it anyway, because the chart opens on it (S4:32-39, 71-73, 105-107). S3 is the same problem for a
  follow-up (S3:89-92).
- Accept: for a new reason, nothing from an unrelated plan is presented as today's plan; for a
  follow-up, the matching thread is shown even when it is not in the latest note.
- Status: not built. `renderSinceLast` (V2b:10182) always shows the previous visit.
- Open: OQ-37.

**REQ-CH-21 · Weight is a trend, with BMI.**
- For a weight reason, the chart shows weight over time. Each reading says whether it was
  patient-reported or measured. The intake figure is the newest point. BMI is worked out from height
  and weight, with the change since the first reading.
- Rationale: the intake had the patient's own height and weight, no BMI, and no earlier weight to
  compare with (S4:19-22, 76-77, 108-111).
- Accept: the doctor can say how the weight has changed without asking the patient or opening a
  file. No weight target or BMI cut-off is shown unless Daniel sets one.
- Status: not built. "Last vitals" shows one static weight (V2b:4643-4650).
- Open: OQ-47.

**REQ-CH-22 · Results are read by test, over time, not as files.**
- Every test in Results shows its earlier values and dates in one line, with the latest flagged
  where the lab flagged it. A reason can bring a preset group of tests to the top.
- Rationale: in S4 the doctor spent about four minutes opening lab PDFs one at a time, and nothing
  put a test beside its earlier values (S4:46-56, 74-77, 112-115).
- Accept: a test's history is readable without opening a document. Which tests go in a preset
  group is set by Daniel (OQ-46), not by the product.
- Status: not built. Results is a static list of three lines, the same for every patient
  (`vcp-results` V2b:4659-4663). The value-and-flag line format is there (S4:96-98).
- Open: OQ-46, OQ-48.

**REQ-CH-23 · Uploaded documents are named, dated, sorted and de-duplicated.**
- An uploaded report takes its collection date and the tests it holds as its title, not "Custom
  Lab" and the upload date. The list sorts newest collection first. A file identical to one already
  on the chart is flagged. A report holding only cancelled tests says "Cancelled by lab". The viewer
  names the report, never an internal file id.
- Rationale: every file was "Custom Lab — <date> — Reported.pdf" with the same upload date, in no
  order, with two identical names; the viewer showed the same file id for every file
  (S4:40-45, 50-51, 56-58, 116-121).
- Accept: the doctor can pick the report he wants from the list without opening another first.
- Status: not built. Documents is an empty placeholder (`vcp-docs` V2b:4672).
- Open: OQ-48.

**REQ-CH-24 · The document list keeps its place, and its actions are safe.**
- Closing the viewer returns to the same scroll position with that row highlighted. View is always
  visible, not only on hover. Delete sits behind the row's menu, away from View.
- Rationale: the list reset to the top after each report; view and delete appeared only on hover,
  side by side; one eye click opened nothing (S4:44-45, 52-53, 59-60, 125-127).
- Status: not built.
- Open: OQ-49.

**REQ-CH-25 · The age of the latest relevant results is stated.**
- When the most recent relevant result is old, the group says so ("Last drawn 13 months ago") and
  offers a prefilled requisition as a draft the doctor sends with one press. It never orders on its
  own.
- Rationale: the latest labs he read were about a year old, ordered by other physicians
  (S4:47-48, 122-124, 140).
- Accept: the age is shown; the draft is sent only by the doctor. How old counts as old is not set
  here (OQ-45).
- Status: not built.
- Open: OQ-45, OQ-46.

**REQ-CH-26 · The medication history answers what the intake says was tried.**
- When the intake says a medication was tried before (in S4, a GLP-1), the chart shows when, what
  dose and why it stopped, from the medication list, or "not on file" if it was prescribed elsewhere.
- Rationale: S4:20-21, 69-70, 128-130.
- Accept: the doctor can ask about the gap instead of hunting for it.
- Status: not built. The Medications tab lists active medications only (`renderMedRail`
  V2b:10309).
- Open: OQ-44.

**REQ-CH-27 · Medications started elsewhere go on the list during the call.**
- For a patient with nothing on file, the medications section offers "Add what the patient takes":
  drug, dose, start month, any dose change, and where it came from (for example "started in
  hospital", "patient-reported"). The lines then feed the renewal card and later visits.
- Rationale: in S5, three medications started in hospital, and one dose change, were confirmed by
  voice only. The medication list, Prescriptions and intake were never opened (S5:33-46, 122-126).
  The renewal card reads the medication list (`RX_MEDS` V2b:9894), so it would open empty for this
  patient (S5:101-103). S4 is the same gap for a drug tried elsewhere (REQ-CH-26).
- Accept: each line shows its source; a patient-reported line looks different from one SimpleCare
  prescribed. No dose or interaction rule is added by the product.
- Status: not built. `RX_MEDS` is fixed demo data per patient, with no way to add a line.
- Open: OQ-57.

**REQ-CH-28 · History said aloud is captured as short lines.**
- A "New to SimpleCare" chart has a short history block the doctor fills from the call: previous
  family doctor (and whether records were transferred), a recent hospital stay (reason, length,
  month), new diagnoses. A new diagnosis is offered to the problem list and lands only when
  approved (REQ-CH-17). The scribe may draft these lines; the doctor presses (REQ-CH-19).
- Rationale: in S5 the caret sat in an empty note for over four minutes while the patient gave a
  hospital stay, a new diagnosis, three new medications with dates and a planned test. None of it
  was written (S5:37-46, 71-74, 127-130). The note is not written during the call in 5 of 5 visits.
- Accept: the history can be recorded in one line per event without writing a SOAP note mid-call.
- Status: not built. The scribe demo drafts note lines and proposals (V2b:7371), but there is no
  history block.
- Open: OQ-31, OQ-57.

**REQ-CH-29 · Results expected from tests ordered outside SimpleCare are tracked.**
- The doctor can add a pending item with no SimpleCare requisition: what, when it is booked, who
  ordered it, and "waiting on the patient" when the patient is to upload it. It shows in "Since last
  visit" at the next visit and under the care plan now. When its date passes with nothing received,
  it shows as overdue to the doctor, who decides whether to task the MOA. Nothing becomes a task on
  its own (REQ-TK-01). An upload tied to it closes it (REQ-PT-09).
- Rationale: the doctor's words: *"When you have that lab work done, you can just attach it to the
  chart under the follow-up section of SimpleCare, and then we can review together."* The result
  will not reach him by itself, and nothing records that it is expected (S5:49-54, 131-135). The
  same pattern as S3's outside records asked by email (S3:54-57, 93-97; S5:78-82).
- Accept: at the next visit, "Since last visit" says whether the expected result arrived.
- Status: not built. "Since last visit" is hidden with no previous visit (V2b:10185), and its
  Pending comes only from the previous visit's plan and unread Inbox results (V2b:10187-10195). The
  demo data can already say "waiting on the patient" (V2b:10163).
- Open: OQ-52, OQ-53, OQ-54.

**REQ-CH-30 · Standard patient education is sent with one press after the visit.**
- Patient instructions get a small library of standard handouts. The doctor picks one during or
  after the call; it is released to the patient portal; the note records "<handout> sent". The
  first handout is home blood-pressure measurement, because the doctor promised it in S5.
- Rationale: *"I'm going to give you instructions on how to take your blood pressure. That's going
  to be the most important thing."* Nothing was sent or queued on screen (S5:60-65, 141-145).
- Accept: the handout's content is Daniel's. The product ships no protocol, number of readings or
  target until he supplies it (OQ-56). The designer's example in S5:142-143 is not adopted.
- Status: partly built. "Send patient instructions" releases instructions to the patient portal
  (V2b:9480), and the scribe drafts a "Patient instructions" line (V2b:7371). There is no handout
  content or library.
- Open: OQ-56.

---

## Prescribing (RX)

**REQ-RX-01 · A renewal is one flow.**
- The current medication, a supply choice, the pharmacy on file, Send, the fax status on the visit,
  and a one-line note drafted.
- Rationale: S1:26-28; `29d956d`.
- Accept: a renewal completes from the chart without leaving "This visit".
- Status: built (build 13:10, `rxOpen` V2b:9930). The fax status sits on the card and the note line
  is drafted into today's note (`rxConfirm` V2b:10042). Failed faxes are REQ-RX-05.
- Open: OQ-08.

**REQ-RX-02 · The quantity is correct for the directions.**
- The supply buttons do not fix the tablet count whatever the dosing.
- Rationale: twice daily for 3 months was sent as 90 tablets, and the note recorded it (DR:75-77).
- Accept: to be set by OQ-09. Until then, quantity is its own field and is never inferred.
- Status: built differently (build 13:10). Quantity is worked out as doses a day × days
  (`rxQty` V2b:9911), so twice daily for 3 months reads 180. It is shown, not typed. This departs
  from the interim accept line above; see D-63. The rule still waits on OQ-09.
- Open: OQ-09.

**REQ-RX-03 · The renewal is prefilled from the intake and the last plan.**
- It preselects the drug the patient asked for, at the current (titration-target) dose, with
  strength shown.
- Rationale: S2:30-32, 59-61; DR:78, 121-123.
- Status: built (build 13:10). The drug the intake names is preselected at the last plan's dose,
  with "Dose from the <date> plan (list says …)" (`rxStateFor` V2b:9924, `rxLineFrom` V2b:9920).
  The medications are demo data per patient (`RX_MEDS` V2b:9894).
- Open: OQ-09.

**REQ-RX-04 · A summary is confirmed before Send.**
- Drug, strength, directions, quantity, pharmacy.
- Rationale: a pharmacy fax cannot be taken back (DR:79-80).
- Status: built (build 13:10). "Check before it goes" lists drug, dose, directions, quantity, days,
  last dispensed and where it goes, then Send by fax / Edit (`rxReview` V2b:10014,
  `rxRenderReview` V2b:10023). Code: "A fax to a pharmacy cannot be taken back, so nothing goes
  before this check." (V2b:10013).

**REQ-RX-05 · Real fax states are shown.**
- Queued, sending, then delivered or failed, with a retry.
- Rationale: the doctor explains fax delivery to the patient but has no status himself (S1:17-19).
  v2 said "delivered" instantly (DR:81-83).
- Status: partly built (build 13:10). "Sending to …", then "Delivered to … · patient copy sent"
  a few seconds later, on a demo timer (`rxConfirm` V2b:10066-10074, `rxRenderStatus` V2b:10080).
  Failed and retry are not built.
- Open: OQ-50.

**REQ-RX-06 · Other active medications are offered with "renew too?".**
- Rationale: *"Is the gabapentin the only medication that you need right now?"* (S2:35-36, 59-61).
- Status: built (build 13:10). "Also active · Renew too" (V2b:9972-9983).

**REQ-RX-07 · "Ask MOA to send" is on the renewal card.**
- It files the task with the drug filled in, and shows "Sent to <MOA> → picked up".
- Rationale: S2:38-40, 62-63.
- Status: built (build 13:10). "Ask MOA to send" goes through the same check step, files the task
  with the drug and pharmacy written in (`moaTask` V2b:10102), writes the note line, and shows "Sent
  to <MOA> · waiting", then "Picked up by <MOA>" (V2b:10055-10064). Picked up is a 7 s demo timer.
  "Review & fax" is the primary button and "Ask MOA to send" the secondary (V2b:4601-4602).
- Open: OQ-08, OQ-41.

**REQ-RX-08 · The last-dispensed date shows on the card.**
- Rationale: the queue's AI line already knows it (DR:84).
- Status: built (build 13:10), on each line and in the check step (V2b:9950, 10031).

**REQ-RX-09 · A decision not to prescribe is recorded.**
- The renewal card offers "No renewal today" with a reason (for example "supply lasts past the
  draw; awaiting bloodwork") and the date the patient's supply runs out. It writes one note line
  and marks the medication "next review after <item>", linked to the pending item (REQ-CH-29).
- Rationale: the outcome of S5 was a decision not to prescribe: *"Do you need medications from now
  until after your blood work, or are you okay?"* Prescribe was never touched, and nothing on
  screen recorded the decision or the supply date (S5:55-59, 87-89, 118-121).
- Accept: after the visit, the chart shows that no renewal was given, why, and until when the
  supply lasts. Whether and when the chart warns about a running-out supply is OQ-55; no number of
  days is set here.
- Status: not built. The renewal card has Send, Ask MOA to send and Edit only (V2b:4601-4602).
- Open: OQ-55.

---

## Inbox (IN)

**REQ-IN-01 · Every external result is reviewed and individually signed off.**
- It moves received → reviewed → signed off. The three stages are tabs.
- Rationale: *"every test result, lab, imaging report, and consult note ... must be reviewed and
  individually signed off"* (SIA:22). Tabs: `07dd1ae`.
- Accept: Sign off is reachable (it once was not, `8444fe4`), and a signed item leaves Needs review.
- Status: built.
- Open: OQ-10.

**REQ-IN-02 · The Inbox holds external reports only.**
- Internal work is in Tasks. Review returns to wherever it was opened from.
- Rationale: *"the inbox is only for external reports, nothing that's internally generated."*
  (`aa1e8b8`); SPEC:49-66.
- Status: built.

**REQ-IN-03 · Three bands, and FIFO inside each band, never across.**
- Rationale: *"it is not superior to anything within its respective category."* (MTG21:50-52);
  `133c966`.
- Accept: a routine from 6 am never sits above a high from 9 am (V2:7809).
- Status: built.

**REQ-IN-04 · Timestamps are the clinic's received time.**
- Never the time the lab generated the result.
- Rationale: otherwise the record implies clinic negligence (MTG21:78-79); `887c021`.
- Status: built.

**REQ-IN-05 · No relative age ("2 hours ago") beside the received time.**
- Rationale: MTG21:47-49.
- Status: built.

**REQ-IN-06 · Rows show the patient's name only.**
- Identifiers are on the chart and the source document.
- Rationale: `236eed3`; V2:7781.
- Status: built.

**REQ-IN-07 · Tiering is deterministic.**
- The LifeLabs BC critical and alert list is a floor. A SimpleCare escalation may raise a tier and
  never lower it. AI never sets a tier.
- Rationale: `4fc705b`, `94ff101`; V2:7561-7605; `reference/lifelabs-critical-results-bc.pdf`.
- Accept: a test absent from the list gets no tier; only the escalation table raises one.
- Status: built for the list and the cardiac/perfusion escalations.
- Open: OQ-12, OQ-13, OQ-14.

**REQ-IN-08 · The clinical concern leads each flagged row.**
- Rationale: *"ensure the clinical concern is shared - it is a reminder to the doctor to pay
  attention"* (`94ff101`).
- Status: built.

**REQ-IN-09 · Results still pending from the same order stay visible after the fast ones are
cleared.**
- Rationale: the STI-panel case (SPEC:234-241). The strip that listed all outstanding tests was
  removed at Daniel's *"remove this"* (V2:4846).
- Status: not built (no code found by search).
- Open: OQ-38.

**REQ-IN-10 · Colour only on the value that set the band.**
- Red ink only on a critical value, amber for high. No filled rows.
- Rationale: MTG21:83; `8444fe4`, `625cfe7`.
- Status: built.

**REQ-IN-11 · A routine "No follow-up" moves to the next result, and reviewed items can be signed
off together.**
- Rationale: 14 routine results means 14 round trips; a normal Pap takes four actions (DR:157-170).
- Status: partly built (build 13:10). A routine "No follow-up" opened from the Inbox lands on the
  next result (`rvNo` V2b:8951), and review has "Next result" (`rvNextResult` V2b:8972). Batch
  sign-off is not built.
- Open: OQ-10.

---

## Review (RV)

**REQ-RV-01 · A Critical or High result opens on a drafted follow-up.**
- The draft holds a suggested action, a plan and patient-contact instructions, every field editable.
  The buttons are Accept & assign / Modify / No follow-up required.
- Rationale: *"I don't want the doctor clicking a bunch of stupid buttons."* (`2094417`).
- Accept: the common case is one button (`f241a4b`).
- Status: built.

**REQ-RV-02 · Closing a Critical or High result without follow-up takes a second, deliberate step.**
- Rationale: one click had closed a critical troponin (`e270f7c`).
- Status: built.

**REQ-RV-03 · Every line above a button says what the button will actually do.**
- Rationale: "books Today 4:00-5:30" was untrue (`f241a4b`, `e270f7c`).
- Status: built.

**REQ-RV-04 · The AI line names the abnormal finding.**
- It is never generic, and never says "no critical values" under an abnormal result.
- Rationale: `e270f7c`. A cytology report was summarised as "All values within the reference range"
  (DR:158-160).
- Status: partly built.

**REQ-RV-05 · The source document is open by default and stays paper in dark mode.**
- Rationale: `7e27ff2`, `f241a4b`, `e270f7c`.
- Status: built.

**REQ-RV-06 · The review shows other results waiting for the same patient.**
- Rationale: an ECG sat eight rows down in Routine (`e270f7c`).
- Status: built.

**REQ-RV-07 · When the patient is in today's queue, review offers "Call now".**
- Rationale: DR:144-146.
- Status: built (build 13:10). On a drafted review, "Call now" shows when the patient is in today's
  queue (waiting, next, delayed, in progress, missed or dropped), and opens the chart on the call
  (`rvQueueRow` V2b:8961, V2b:8998-9006). It is secondary to Accept & assign; OQ-11 asks which leads.
- Open: OQ-11, OQ-07.

**REQ-RV-08 · A reviewed row shows what was decided.**
- Accepting twice does not file a second task.
- Rationale: *"sign-off is never blind"* (`e270f7c`).
- Status: built.

---

## MOA hand-off and tasks (TK)

**REQ-TK-01 · Tasks travel one way, doctor to MOA.**
- A task exists only when the doctor presses Task. The MOA replies on it.
- Rationale: *"The MOA can't initiate a Task to the Doctor."* (`9b7b5f6`; V2:6591; MOAP:258).
- Accept: no automatic tasks; there are none from blank notes, MOA questions, the scribe or results.
- Status: built.

**REQ-TK-02 · Routing: the MOA on service for the window, copying the doctor's primary MOA,
forwarded to Admin.**
- Rationale: V2:6591-6600; `9b7b5f6`.
- Status: built.

**REQ-TK-03 · The doctor sees that the task was received and picked up.**
- Rationale: *"Can you hear me, … or am I talking to myself?"* (S2:38-40, 62-63).
- Status: partly built (build 13:10). Only the renewal card's hand-off shows "Picked up by <MOA>",
  on a demo timer (V2b:10060-10064). The Tasks screen does not show it.
- Open: OQ-41.

**REQ-TK-04 · A task starts with the patient and context filled in.**
- Rationale: `56e5f20`. The underlying need is that tasking populates patient context for the MOA
  (SPEC:284-286).
- Status: built.

**REQ-TK-05 · Priority bands Urgent / High / Routine, oldest first within a band.**
- Overdue is a status. Time tolerance is shown beside the deadline.
- Rationale: *"The work that needs attention should win over whether it is imaging, referral, or lab
  work."* (`11b0ecb`); SPEC:84-92; `94ff101`.
- Status: built. The tolerance values are an assumption in the code (V2:6620-6630).
- Open: OQ-15.

**REQ-TK-06 · No scheduled deferral.**
- Carry forward keeps the item on the list and counts its days.
- Rationale: *"We wouldn't defer to next week. The tasks need to be present and completed asap."*
  (`9b7b5f6`).
- Status: built.

**REQ-TK-07 · The doctor's own unfinished tasks are separate from delegated ones, and stay on the
dashboard.**
- Rationale: *"Yours should stay on your dashboard"* (SIA:30-32).
- Status: partly built. Tasks has an "Assigned to Dr. Pannozzo" filter; Home shows only urgent, high
  or overdue.
- Open: OQ-22, OQ-23.

**REQ-TK-08 · Task types match the chart's tools, and type is a badge, never a section.**
- Rationale: *"pretty much the tools i have on the chart ... its all consistent"* (V2:6611).
- Status: built.

**REQ-TK-09 · The due date comes from priority or tolerance, never a fixed date.**
- Rationale: new tasks are hard-coded to Sep 19 (DR:128; V2:7445).
- Status: partly built (build 13:10). Tasks from the Task MOA dialog and the renewal card get Today,
  Tomorrow or This week from priority (`moaTask` V2b:10102). Tasks accepted from the scribe are
  still stamped "Sep 19" (V2b:7475).
- Open: OQ-15.

**REQ-TK-10 · A task made from a result links back to the source, and the document stays in the
Inbox.**
- Rationale: SPEC:59-66; `2094417`.
- Status: built.

**REQ-TK-11 · A task can go to anyone, doctor to doctor included.**
- Rationale: *"doctor to doctor even"* (`11b0ecb`).
- Status: built.

---

## Intake (INT)

**REQ-INT-01 · The reason is shown in the patient's words with its category.**
- It is on the queue row and at the top of the chart, with no separate intake modal.
- Rationale: S2:26-27, 54-58. S4 repeats the detour: intake modal, close, then chart (S4:18-23).
- Status: partly built. There is an AI line on the row, and "View intake note" still opens a
  separate view (V2b:4641, `openBrief` V2b:6652).

**REQ-INT-02 · A red-flag intake explains itself.**
- It sorts to the top and shows on the chart banner ("read it before calling").
- Rationale: `1a9c71b`, `56e5f20`.
- Status: built.

**REQ-INT-03 · A patient-written request is summarised as a flag on the queue row.**
- For example, a request for a referral to a named clinic.
- Rationale: S2:41-42, 68-69.
- Status: not built.
- Open: OQ-40.

**REQ-INT-04 · Intake asks whether the patient has been seen on another platform.**
- For example: "Have you been seen on another virtual platform (e.g. Tia Health, Rocket Doctor)?"
  The answer feeds REQ-CH-16.
- Rationale: asked out loud in 2 of 5 visits, S1 and S5 (S1:10-12, 29-30; S5:26-29, 75-77,
  153-155). Priority raised on 26 Sep: now in the first batch for Daniel (OQ-18).
- Accept: the answer is on the chart before the call starts.
- Status: not built.
- Open: OQ-18.

**REQ-INT-05 · The AI intake summary is marked as machine-written.**
- Rationale: *"so nobody mistakes a machine summary for a colleague's note"* (`944d26a`).
- Status: built.

**REQ-INT-06 · The full intake is readable inside the chart.**
- The patient's answers (goal, history ticked, what was tried, the figures they typed) sit in the
  chart next to today's note, not in a modal opened from the queue.
- Rationale: S2 and S4 both show intake, then close, then chart (S2:26-27; S4:18-23). In S4 the
  intake held what the visit needed: the goal, a GLP-1 tried before, height and weight
  (S4:19-22, 101-102).
- Accept: every intake answer is readable from the chart without a separate view, and today's note
  stays in view.
- Status: not built. "View intake note" opens `openBrief` (V2b:4641, 6652).

---

## Billing (BIL)

**REQ-BIL-01 · Billing status is the way in.**
- An actionable state is a dropdown with the next step first, then Details. A state with nothing to
  do is plain text.
- Rationale: `944d26a`, `5d36fa1`, V2:6428.
- Status: built.

**REQ-BIL-02 · Daniel's vocabularies, in full.**
- MSP: Submit claim, Claim submitted, Review claim, Claim rejected, Claim paid. Private: Payment
  due, Review payment, Payment paid. Health card: Verified, Check required, Invalid card, Private
  pay.
- Rationale: `3c5f4fe`, `c0cae95`.
- Status: built.
- Open: OQ-25.

**REQ-BIL-03 · Claims is a top-level destination with a neutral count.**
- Rationale: *"Claims are so important that i want that front and center"* (`27c18b3`); `74660d7`.
- Status: built.

**REQ-BIL-04 · "Finalize & review billing" opens the billing review.**
- Rationale: DR:87-88.
- Status: superseded by build 13:10. The button is now "Finalize today's visit" (V2b:4618) and
  promises no billing review (D-65). Whether Finalize should open one is OQ-51.
- Open: OQ-51.

**REQ-BIL-05 · Leave no claim behind: signing the visit submits its claim.**
- Rationale: `11b0ecb`, `632998a`.
- Status: partly built (only when the demo bill state is pending or none, V2b:7114).

**REQ-BIL-06 · Add-On encounters reach Claims.**
- Rationale: SCS:49.
- Status: not built.

**REQ-BIL-07 · Fee items, codes, amounts and claim time limits come from Daniel.**
- They are never invented.
- Rationale: the prototype's fee codes and amounts (V2:6246-6254) and "Refusals expire" (V2:5381)
  have no source. Claims optimisation "needs scoping" (SPEC:297-300).
- Status: not specified.
- Open: OQ-24.

---

## Patient identity (ID)

**REQ-ID-01 · The preferred name leads, and the legal name is secondary.**
- Names are never uppercased.
- Rationale: misgendering causes real harm (SIA:46); `9d298c7`, `f241a4b`.
- Status: partly built. The queue follows Daniel's mock (V2:5328); the chart banner shows the first
  name only (DR:59-60).

**REQ-ID-02 · DOB and PHN are on the chart and the source document, not on list rows.**
- Rationale: MTG21:82; `236eed3`; V2:8445-8449.
- Status: built.

**REQ-ID-03 · Identity is the same on the queue, the chart and the documents.**
- Rationale: DR:59-63.
- Status: partly built (see REQ-CH-15).

**REQ-ID-04 · Health card: Verified is quiet; Check required and Invalid card open the cause and the
way out.**
- Rationale: *"a mistyped number versus a cancelled card are different problems"* (`944d26a`);
  `f0fe73f`.
- Status: built. The explanatory copy in the modal (V2:5351-5370) is an assumption, not Daniel's
  text.

**REQ-ID-05 · A returning patient is marked.**
- Rationale: SIA:46.
- Status: not built.

**REQ-ID-06 · A new patient taking up ongoing care is marked as continuing with the doctor.**
- When a new patient wants ongoing care (for example after losing their family doctor), the doctor
  can mark them as continuing with him. The chart header shows it, and the follow-up is booked with
  the same doctor. It is the physician-side end of the patient's Family Practice path (REQ-PT-06).
- Rationale: *"I'm running this platform for continuity, which is to say if you need ongoing
  assistance, you know, lab work, referrals, blood work… then I'm more than happy to help."* The
  patient's family doctor had stopped practising. Nothing on the chart records the choice
  (S5:30-32, 37-38, 90-92, 149-152). Comprehensive care pairs a patient with one doctor (SIA:16).
- Accept: from the chart, the doctor can tell a one-off patient from one continuing with him.
- Status: not built.
- Open: OQ-58.

---

## Look and feel (UI)

**REQ-UI-01 · Red is reserved for critical alerts alone.**
- Rationale: MTG21:83.
- Status: partly built. Red also marks Doctor to Callback (`c51b998`), overdue tasks (`0ae6630`),
  the intake flag on the chart banner and an overdue care-plan item (DR:152-153).
- Open: OQ-30.

**REQ-UI-02 · Colour only where it should pull the eye.**
- Rationale: *"Even this colour scheme is a little bit overwhelming."* (MTG21:55-56). *"I like a
  minimum of shapes and colours"* (`c51b998`).
- Status: built (`0c120f8`, `75aa856`, `afd50dd`).

**REQ-UI-03 · The product is tested at 100% browser zoom.**
- Rationale: MTG21:84.
- Status: process. DR ran at 100%.

**REQ-UI-04 · Dark mode is supported.**
- Rationale: a popular demo feature with doctors (MTG21:85).
- Status: built (`da2dd76`, `e737885`).

**REQ-UI-05 · Standing rules.**
- Mage icons only; controls 44 px; no capitals; nothing under 14 px; reading text capped at 66ch;
  tags without stroke.
- Rationale: `9d298c7`, `00649ec`, `1518976`, `affc632`, `29d956d`.
- Status: built.

---

## MOA portal (MP)

**REQ-MP-01 · The MOA cannot open a task to the doctor.**
- She reaches the doctor by chatbox, email or phone.
- Rationale: MOAP:258, 264-270; `9b7b5f6`.
- Status: built.

**REQ-MP-02 · MOA work surfaces.**
- Tasks from physicians, a referral pipeline with rejections to reroute, imaging, a callback queue,
  a fax inbox for unmatched documents, and a specialist directory.
- Rationale: `a0d31ca` ("built from Daniel's description of MOA responsibilities").
- Status: built as a demo.

**REQ-MP-03 · Picking up a task is visible to the physician.**
- Rationale: see REQ-TK-03.
- Status: not built in the MOA portal. The physician side simulates it for renewals (REQ-TK-03).
- Open: OQ-41.

**REQ-MP-04 · Records or emails a patient sends for a waiting item are attached to that item.**
- Rationale: S3:93-97.
- Status: not built.
- Open: OQ-19.

---

## Patient portal (PT)

**REQ-PT-01 · The patient sees their queue number, not a wait estimate.**
- Rationale: `8cd0893` (Daniel on the physician queue); MEM.
- Status: partly built. PP shows an estimated call time and "about 25 minutes behind" (PP:1953,
  1962).
- Open: OQ-26.

**REQ-PT-02 · Attention without alarm.**
- No red, no warning icons, no HIGH/LOW flags. Say plainly who moves next.
- Rationale: `5a4fb10`; HUX:18, 25.
- Status: built (PP:860).

**REQ-PT-03 · No visit summaries or physician notes go to the patient.**
- Rationale: `5a4fb10`.
- Status: partly built. The "done" state offers "View visit summary" (PP:1973).
- Open: OQ-27.

**REQ-PT-04 · Every ordered test is named, with its state.**
- Rationale: *"I want the patient to know as well"* (`c503ece`).
- Status: built.

**REQ-PT-05 · Automated SMS and email when the doctor is running late.**
- Rationale: MTG21:27-28, 57-59.
- Status: not built.
- Open: OQ-02, OQ-26.

**REQ-PT-06 · Walk-in and family practice are separate entry paths.**
- Rationale: SIA:16; SCS:21-27.
- Status: built.

**REQ-PT-07 · The patient never places a call to the doctor.**
- Rationale: MEM.
- Status: built as far as searched. "Rejoin now" and "Reconnect now" (PP:1967-1970) need checking.
- Open: OQ-29.

**REQ-PT-08 · No fees are stated to patients unless Daniel has set them.**
- Rationale: PP:1975 says "A no-show fee may apply", and that has no source.
- Status: not specified.
- Open: OQ-28.

**REQ-PT-09 · A doctor's request to upload is a named item in the patient portal.**
- "Your doctor asked for your bloodwork results · Upload", tied to the pending item (REQ-CH-29). An
  upload there reaches the physician portal marked "sent by the patient" and closes the pending
  item. The general "Add a document" stays for anything else.
- Rationale: the doctor named a place, *"attach it to the chart under the follow-up section of
  SimpleCare"* (S5:49-51, 136-140). Getting the result depends on the patient (S5:52-54).
- Accept: the doctor can see that the upload arrived without searching Documents.
- Status: partly built. PP's "Add a document" ("Lab result from elsewhere…") saves to health
  records (PP:929-933, 2279-2282). It is not linked to a request, and the physician portal shows
  nothing when it arrives (S5:112-114).
- Open: OQ-52, OQ-54.

**REQ-PT-10 · The patient can send home readings back after instructions.**
- A handout that asks for readings (first, home blood pressure) carries a readings form in the
  patient portal. The series reaches the chart as data, marked patient-reported, beside the
  hypertension care item's "Valid home BP series needed".
- Rationale: the patient already has a machine and measures regularly; the doctor is sending
  instructions (S5:60-65, 146-148). v2 already names the gap: "No home readings logged …
  Hypertension Canada asks for a series before changing treatment." (V2b:6852-6853), and a demo
  pending item reads "Home BP log · waiting on the patient" (V2b:10163).
- Accept: readings arrive as values with dates, not as a file. How many readings and over how long
  are Daniel's (OQ-56).
- Status: not built.
- Open: OQ-56.

---

## Changelog

- 25 Sep 2026, first run: 114 requirements across 13 areas, each with a source and a status against
  v2 build 2026-09-25 12:45. Defects and gaps from the doctor review (DR) are folded in: HQ-15,
  CALL-02 to CALL-04, CH-13, CH-15, RX-02 to RX-08, IN-11, TK-09 and BIL-04.
- 25 Sep 2026, second run: 123 requirements (9 new). New from shadowing 4: HQ-17, CH-20 to CH-26
  and INT-06. Moved for build 13:10 (`d2a2823`), naming the function: to built CALL-02, CALL-03,
  CH-03, CH-06, CH-07, CH-13, RX-01, RX-03, RX-04, RX-06, RX-07, RX-08, RV-07, and HQ-11 (to the
  current rule); to partly built CALL-04, CH-01, CH-02, CH-10, CH-15, RX-05, IN-11, TK-03, TK-09 and
  ID-03. RX-02 is built differently from its interim accept line (D-63). BIL-04 is superseded (D-65).
  S4 evidence added to CH-02, CH-05 and INT-01.
- 26 Sep 2026, third run: 131 requirements (8 new), from shadowing 5 (S5). New: CH-27 (medications
  started elsewhere), CH-28 (history said aloud), CH-29 (results expected from outside tests),
  CH-30 (patient education), RX-09 (a decision not to prescribe), ID-06 (a new patient continuing
  with the doctor), PT-09 (a request to upload) and PT-10 (home readings back). Strengthened with
  S5 evidence: CALL-01, CH-05, CH-10, CH-19, and CH-16 and INT-04, whose other-platforms question
  has now come up in 2 of 5 visits (S1, S5) and is raised in priority. No statuses moved; the build
  is still 13:10.
