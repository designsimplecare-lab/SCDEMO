# SimpleCare requirements

Owner: product manager agent. First written 25 Sep 2026. The source codes are the same as in
`use-cases.md`: MTG21, S1-S5, SIA, IA, HUX, COMP, SCS, SPEC, DR, V2 (build 12:45), V2b (build 13:10,
`d2a2823`), V2c (build 2026-09-30 10:33, `b8331e5`), MOAP, PP, MEM, ANS26 (Daniel's written answers
of 26 Sep 2026, `from-daniel/2026-09-26-answers-to-shadowing-questions.md`), ANS27 (his round-2
answers), HOME29 (his Home markup), BOOK29 (his booking model), B-001, QA29 and commit hashes; see
the key in `use-cases.md`. From 30 Sep: MOA30, ECG30, CHART30, B-002 to B-004, V2d (build
2026-09-30 20:05, `cf6207c`), and four SimpleCare requirement documents, git-ignored and cited by
section or by their own IDs, never quoted at length: IB7 (Intake & Booking v7.0), ES3 (Emergency
Safeguards v3.0, draft), DOC21 (Document Routing v2.1) and IN23 (Simplicity Intake v2.3, which wins
over IB7 for the chat, D-102). From 3 Oct: BIL15 (Simple Billing PRD v1.5, cited only by its IDs
for what the portals show; its commercial and organisational sections are confidential), ECG20
(ECG Critical v2.0), CV25 (Physician Chart View v2.5), and "private strategy, 3 Oct 2026
(confidential)", cited by name only. A requirement **superseded** by a later one keeps its ID and says
which one replaced it. "Assumption" marks a
claim with no source. Status: **built** (works in v2), **partly built**, **not built**. "Open" names
the open questions that block a requirement (see `open-questions.md`). This file sets no clinical
thresholds, doses or billing codes. Where one is needed, it points to an open question.

Priority is set from 26 Sep 2026 on the requirements that Daniel's answers touch; the others are
not yet prioritised.
- **P1:** Daniel has asked for it in his own words, and v2 lacks it or contradicts it. Next build.
- **P2:** needed, but it waits on an open question or on P1 work.
- **P3:** keep, but later (for example, it serves only a fallback).

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
- 29 Sep: *"we have limited the number of windows. What that number is, i am not sure."*
  (HOME29:8; D-83). "Four" is the build's number, not his. The accept line holds for whatever number
  he sets.
- Status: built (four windows).
- Open: OQ-66, OQ-34.

**REQ-HQ-02 · The clock and the window state are on every screen.**
- The doctor's local time and the state of the BC call day are in view on every screen.
- Rationale: Daniel, 25 Sep: *"This is very useful info and I want it front and center... when I am
  in other time zones it orients me."* (V2:4077). His six states are listed at V2:5600-5608
  (`f308201`).
- On Home, the time sits next to the greeting. Daniel, 29 Sep: *"Can we place the timing info next
  to Good Evening or Good Morning or Good Afternoon whatever it might be"* (HOME29:14-15; D-84).
- Accept: the zone of each time is named (for example PT beside local time), and the windows use BC
  time (DR:29-36). On Home, the local time and the window state read as one line with the greeting,
  for example "Good evening, Dr. Pannozzo · 7:50 PM Toronto · 10m left" (HOME29:24-26).
- Status: partly built (V2c).
  - Since 30 Sep the time has its own pill before the theme button (`b8331e5`,
    V2c:4291-4293; D-92).
  - The greeting is at the other end of the top bar (V2c:4289, 5547), so it is not beside the
    greeting yet. T-008 (Manoj) is building that.
  - 30 Sep: Ani recorded the pill as decided: *"The time is in its own pill, before the theme
    button."* (HOME29:43; D-92). Daniel still needs to hear that it isn't beside the greeting
    (OQ-71).
  - The zone labels are missing (DR:31-33).
- Priority: P1.
- Open: OQ-71, OQ-39, OQ-66.

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
- Accept: position numbers, not wait times. A red-flag intake sorts first. Finalizing a visit never
  changes the order: *"Finalizing a visit, doesn't break the queue."* (ANS27:46; D-82).
- Status: built. That Finalize leaves the order alone was not re-tested this run.

**REQ-HQ-10 · No DOB, PHN or other noisy detail on list rows.**
- Rationale: MTG21:14, 82; `236eed3`.
- Accept: search by name, PHN or DOB still works (`236eed3`).
- Status: built for DOB and PHN. "Remove noisy detail fields" is not itemised.
- Open: OQ-03.

**REQ-HQ-11 · Needs your attention appears only when populated, and each row reads name, test and
value, nothing more.**
- A row shows:
  - the patient's name, with age and sex;
  - the test;
  - the value, with its arrow. Red is only for a critical value.
- A row does not show the reference range, the diagnosis or context text, the source or the
  assignee. There are no task rows. One patient has one row.
- Rationale:
  - MTG21:10.
  - Daniel, 29 Sep, on the marked-up Home: *"I eliminated the extra stuff that isn't needed -
    crossed off"* (HOME29:17, 23-32; D-85).
  - The earlier "Review MRI report" mystery (MTG21:60-62) was a task row, and task rows are gone.
- Accept:
  - The section is absent on a clean day.
  - Each row holds exactly those three things, plus its Review action.
  - No row is a task.
  - There is one row per patient (DR:46-48).
- Status: built (`2a96f07`, V2d). A row is the icon, the patient with age, the test and the value
  with its arrow; the range, basis and intake flag are one click away (`renderCriticals`
  V2d:6450-6500). Task rows no longer render (`renderAttnTasks` returns early, V2d:6420-6428). A
  patient with an intake flag gets a second "Review intake" button, which OQ-35 should confirm.
- Priority: P1 (built; keep).
- Open: OQ-35 (confirm: no context line; what happens to the intake flag). OQ-01 is answered.
- 30 Sep: yellow (abnormal, not Critical or High) results stay off Home; they belong on the chart
  and in the Inbox (ECG30:71-72; D-96).

**REQ-HQ-12 · The attention list is not an inbox: Critical and High results only.**
- Results in the Critical and High bands appear there. Routine results never do, and neither do
  tasks. Over-tagging is guarded against.
- Rationale:
  - Daniel, 27 Sep: *"Critical and High belong."* (ANS27:8; D-78). This replaces the 21 Sep
    *"we are keeping it to critical values."* (`392eccb`; D-39).
  - The task row was crossed off on 29 Sep (HOME29:27-28; D-85).
  - Still true: *"If everything needs your attention, then nothing needs your attention."*
    (`53c6597`).
- Accept:
  - A Critical or High result that is not yet reviewed shows. A Routine one never does.
  - The bands are the Inbox's own tiering (REQ-IN-07), with no new rule added.
  - No task appears, whatever its priority or age.
- Status: built (`2a96f07`, V2d). Critical and alert-tier results not yet reviewed show, Critical
  first (`renderCriticals` V2d:6463-6466); no task shows (V2d:6420-6428). The hazard log's HZ-16
  still describes the old gap; it is `clinical-safety`'s to update.
- Priority: P1 (built; keep).
- The names of the bands are open: DOC21 says HIGH / URGENT (OQ-76).
- 3 Oct: Chart View v2.5 defines tiers Critical, To do and Info for the chart's Needs Attention
  (CV25 §3). Whether Home follows them is OQ-92.
- Open: none (OQ-01 answered).

**REQ-HQ-13 · The navigation is collapsed by default, and remembered. SUPERSEDED 30 Sep 2026 by
REQ-HQ-18.**
- Rationale: MTG21:23; V2:7950.
- Accept: the first visit shows the icon rail; if the doctor opens it, it stays open on the next
  visit.
- Status: superseded. Ani set the sidebar open by default (HOME29:47-48; D-95). Kept so the ID
  isn't reused; "remembered" carries over to REQ-HQ-18.

**REQ-HQ-14 · Row behaviour.**
- The row opens the chart. Call is shown only on the next patient. Task MOA is revealed on hover and
  focus. On touch, the actions stay visible.
- Rationale: SPEC:167-205 (*"mirrors a walk-in queue"*); `607bd2d`.
- 27 Sep: he rarely works out of order, but *"I will call them immediately"* for one particular
  patient (ANS27:46-48; D-82). So a way to call a patient who is not next is needed. Where it sits
  (the row, or Add-On) is OQ-04.
- Accept: as in SPEC:182-205.
- Status: built (V2:5822-5828).
- Open: OQ-04 (partly answered), OQ-05.

**REQ-HQ-15 · The queue count matches the rows shown.**
- Rationale: "Live queue 6" sits above 8 rows (DR:39-40).
- Accept: the header count equals the rows the doctor can see, or its label says what it counts.
- Status: not built (defect).

**REQ-HQ-16 · The doctor can see whether the MOA is online.**
- Rationale: *"He does want to see whether his MOA is currently online"* (SIA:22, 38).
- Accept: presence is visible without opening chat.
- Status: built (demo, 30 Sep). The floating chat button shows the doctor's one MOA with her
  picture, name and "Your MOA · Online" (`c070791`, `3f11454`; V2d:5577-5581). The presence is
  demo data; no real signal exists. The dot on the doctor's avatar is the doctor's own status
  (`f047109`).

**REQ-HQ-17 · Opening the queue never carries a search over from the last patient.**
- The search clears when the Daysheet opens, or shows as a filter chip with a clear button.
- Rationale: S4 opened on "Search all appointments" still filtered by the previous patient's name
  (S4:14-17, 131-132).
- Accept: after closing a chart, the queue shows every row in the window, or a visible chip says
  what is filtering it.
- Status: partly built. v2's queue search has a clear button (`clearQueueSearch` V2b:4265, 6236),
  but nothing clears it when the doctor comes back from a chart (no other caller found).

**REQ-HQ-18 · The navigation is open by default, and the doctor's own choice is remembered.**
- Replaces REQ-HQ-13.
- Rationale: Ani, 30 Sep: *"The **sidebar is open by default**. This replaces Daniel's 21 Sep
  collapsed default, and a doctor's own choice is still remembered."* (HOME29:47-48; D-95).
- Accept: a first visit shows the full navigation. A doctor who collapses it finds it collapsed on
  the next visit, and the other way round.
- Status: built (`c070791`; `initSidebarCollapse` V2d:8433-8439).
- Priority: P2. Daniel's 21 Sep word was the opposite, so he should be told (OQ-71 batch note).

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
- 26 Sep: Daniel confirms a last-note summary at the top, with the care plan beside it (ANS26:37;
  D-74). See REQ-CH-31.
- Priority: P1.
- Open: OQ-63 (OQ-37 answered).

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
- 26 Sep: Finalize is the chart's sign-off: *"It means the chart is completed... It means that i've
  finalized the visit."* (ANS26:18-20; D-71). Its wording follows REQ-UI-06.
- Priority: P1.
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
- 30 Sep: an abnormal result that is neither Critical nor High (the demo's abnormal ECG) gets its own
  yellow card right under the critical one, "Not cleared", with "Review result"; the "Also in today"
  line no longer carries it (ECG30:52-54; V2d:10653-10668; REQ-IN-14, REQ-IN-15).

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
- 27 Sep: *"No - don't mention Rocket or Tia, I ask because many of my patients come from there."*
  (ANS27:38; D-81).
  - Intake will not ask this question. So the other-platform half has no source of data, and it is
    **on hold**. He asks it himself.
  - The returning-patient half stands (REQ-ID-05).
  - No competitor is named on the chart.
- Status: not built.
- Open: none (OQ-18 answered).

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
- Priority: P2 (which notes match today's reason waits on OQ-63).
- Open: OQ-63 (OQ-37 answered).

**REQ-CH-21 · Weight is a trend, with BMI.**
- For a weight reason, the chart shows weight over time. Each reading is patient-reported and
  carries its date and who entered it (REQ-CH-32). The intake figure is the newest point. BMI is
  worked out from height and weight, with the change since the first reading.
- Rationale: the intake had the patient's own height and weight, no BMI, and no earlier weight to
  compare with (S4:19-22, 76-77, 108-111). Daniel, 26 Sep: *"The weights come from me asking the
  patient."* (ANS26:43; D-75). This replaces "patient-reported or measured".
- Accept: the doctor can say how the weight has changed without asking the patient or opening a
  file. No weight target or BMI cut-off is shown unless Daniel sets one.
- Status: not built. "Last vitals" shows one static weight (V2b:4643-4650).
- Priority: P2.
- Open: OQ-64 (OQ-47 answered).

**REQ-CH-22 · Results are read by test, over time, not as files.**
- Every test in Results shows its earlier values and dates in one line, with the latest flagged
  where the lab flagged it. A reason can bring a preset group of tests to the top.
- Rationale: in S4 the doctor spent about four minutes opening lab PDFs one at a time, and nothing
  put a test beside its earlier values (S4:46-56, 74-77, 112-115). Daniel, 26 Sep: *"it is madness
  that I am opening up raw pdf's to find out what the f\*\*\* is going on."* (ANS26:50; D-76).
- Accept: a test's history is readable without opening a document. Which tests go in a preset
  group is set by Daniel (OQ-46), not by the product.
- Status: not built. Results is a static list of three lines, the same for every patient
  (`vcp-results` V2b:4659-4663). The value-and-flag line format is there (S4:96-98).
- Priority: P1 (raised on 26 Sep). The data comes from REQ-IN-12.
- Open: OQ-46, OQ-65 (OQ-48 answered).

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
- 26 Sep: results should come from the source as data (D-76, D-77), so this now serves only what
  still arrives as a file: a patient upload or a fax. A patient upload is also marked
  patient-supplied (REQ-IN-13).
- 30 Sep: DOC21 §5 gives every faxed document a fixed label pattern and chart section (Labs,
  Imaging, Pathology, Consult Reports and so on), with dates as YYYY.MM.DD and "- Patient Provided"
  on what the patient sent. That covers the naming half of this requirement for faxes. The full
  pattern lives in a Labelling Standard we don't have yet (OQ-78).
- Priority: P3.
- Open: OQ-78 (OQ-48 answered).

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
- 26 Sep: the patient upload is a fallback: *"I am relying on patients to help me."* The goal is the
  result from the source (ANS26:56; D-77, REQ-IN-12). The pending item stays, and closes on either.
- 30 Sep: DOC21 §6 tracks SimpleCare's own orders the same way (REQ-IN-22), but creates the MOA
  task by itself. That conflicts with "nothing becomes a task on its own" (OQ-86).
- Priority: P2.
- Open: OQ-52, OQ-54, OQ-65, OQ-86 (OQ-53 answered).

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

**REQ-CH-31 · The top of the chart holds the care plan and a summary of the last note.**
- Above today's note: the care plan (what we are doing, REQ-CH-11) and a short summary of the last
  note, with its date and a way to open the note read-only.
- Rationale: Daniel, 26 Sep: *"Yes ....exactly - I need a 'Care Plan' and even the last note summary
  is good too"* (ANS26:37; D-74). S2's whole call went on reading the last plan (S2:11-17).
- Accept: on a follow-up, both are readable without scrolling and before today's note. If the
  summary is machine-written, it says so, as the intake summary does (REQ-INT-05); who writes it and
  whether he approves it are OQ-63.
- Status: partly built. "Since last visit" sits at the top of the visit card (`slv` V2b:4573,
  `renderSinceLast` V2b:10182). The care plan sits below today's note and Finalize
  (`care-plan-mount` V2b:4624-4625).
- Priority: P1.
- Open: OQ-63, OQ-81.
- 30 Sep: on the full care plan, *"this is more comprehensive care, so don't worry about that just
  yet."* (CHART30:17-18). T-021 leaves it out of scope. He reacted to "Chase their office" on a
  specialist's item (CHART30:21-22); what he meant is OQ-81. The priority stays until his chart
  document says otherwise (OQ-82).

**REQ-CH-32 · Patient-reported measurements are entered once and read as a trend.**
- Blood pressure and weight (and whatever else "etc." covers) are the patient's readings. Each is
  stored as a value with a date, marked patient-reported, with who entered it. The chart shows each
  measure over time. A home BP series feeds the hypertension care item (REQ-PT-10).
- Rationale: Daniel, 26 Sep: *"I get my patient's to work. It means I get them to do their blood
  pressures, their weights etc."* (ANS26:43-44; D-75).
- Accept: the doctor can read the latest readings and their trend without asking the patient. No
  target or cut-off is shown unless Daniel sets one. Whether the patient enters readings in the
  portal, the doctor enters them on the call, or both, is OQ-64.
- Status: not built. "Last vitals" is one static set, including heart rate and temperature, with no
  source or date per reading (V2b:4643-4650). The patient portal has no readings entry (no match
  found by search).
- Priority: P2.
- Open: OQ-64, OQ-56.

**REQ-CH-33 · During the call, an AI workflow takes the doctor to a complete chart, and the note
is where he expects it.**
- While the doctor talks to the patient, the AI drafts the note step by step, so the chart is done
  when the call ends. How the completed chart then displays comes second. The doctor reviews and
  signs; nothing files itself (rule 18; D-22).
- Rationale: Daniel, 30 Sep: *"where am I charting?"* *"I'm more interested in an AI workflow, which
  is to say, how do I get through the chart, right? How do I complete that f\*\*\*\*\*? And then
  when it's complete, it's how it's displayed."* *"At the end of it, the chart's done."*
  (CHART30:11-12, 27-31; D-99). In the frames, the note box sat below "Since last visit", the
  "Read the Jun 25 note" button and the scribe bar, and he scrolled past it (CHART30:14-15). Five of
  five shadowed visits had no note written during the call (use cases, patterns table).
- Accept (from CV25, 3 Oct): the note and its actions (Prescribe, Order, Refer, Task, Message,
  Finalize) sit beside the context at 1440 px or wider, or one tab away. The draft survives
  navigation, interruption and a dropped call. Opening labs or the full chart never loses the note
  (CV25 §3, §7). AI text stays visually distinct until accepted, and scribe-proposed medications,
  allergies, problems and plan items are accepted, edited or rejected one by one (CV25 §7). A
  physician catches an AI negation error before signing at least 90% of the time (CV25 §9).
- 3 Oct: the document arrived as Physician Chart View v2.5 (D-106). Its delivery order puts the
  core encounter shell first and context-aware AI only after the AI Governance companion spec,
  which is not written (CV25 §10; OQ-91). The layout is REQ-CH-34 to REQ-CH-42.
- Status: not built. The note box is low on the page in v2 (CHART30:14-15; B-006:102). T-021 is
  unblocked.
- Priority: P1. `clinical-safety` and `ai-engineer` gate the AI drafting.
- Open: OQ-91 (the AI Governance companion), OQ-31. OQ-82 is answered.

**From Physician Chart View v2.5 (CH-34 to CH-42).** Daniel's chart document, forwarded 3 Oct
(D-106). Each requirement names the CV25 section, and its gap against V2d (B-006, "Where v2 differs
today").

**REQ-CH-34 · The chart is an encounter workspace with one scan order.**
- Patient snapshot, Needs Attention, Today, Relevant to [concern], Since you last saw, Clinical
  threads, then the full chart one step away. Identity, allergies, the this-visit strip, the reason
  for the visit and unresolved critical items stay in view while scrolling.
- Rationale: CV25 §2-§3. Its product definition: reduce the work of finding, assembling and
  interpreting the record; cut clicks and duplication, not clinically relevant data.
- Accept: the doctor states the reason for the visit in a median of 5 seconds or less (CV25 §9).
  The full chart opens without losing the encounter, one action back (CV25 §3).
- Status: not built. v2's chart is "This visit" with "Since last visit", the note and the care plan
  stacked as cards (REQ-CH-31; B-006:108-110).
- Priority: P1 (T-021).

**REQ-CH-35 · The patient snapshot shows a masked PHN and allergies in three states, and no
clinical counts.**
- Name, date of birth or age, gender as recorded, a masked PHN, the dated photo from intake, the
  family doctor, and allergies as a named list, "No known drug allergies", or "Not recorded" in
  amber. No diagnosis badges or clinical counts.
- Rationale: CV25 §3. It refines REQ-CH-12 (the banner) and REQ-ID-02 (identifiers on the chart,
  not on list rows).
- Accept: no full PHN on the chart's face (assumption: shown in full one action away, for claims and
  faxes; CV25 doesn't say). "Not recorded" never looks like "none".
- Status: not built. **Gap:** v2's chart header shows the full PHN (V2d:4809). Allergy status is
  always shown (REQ-CH-12), but not in CV25's three states.
- Priority: P1.

**REQ-CH-36 · A this-visit strip must be complete before Finalize.**
- The patient's current location, identity verified (method and date), consent, others present,
  video or phone, and the callback number. Incomplete items are flagged. Once complete it may
  collapse, with location and callback one action away; it re-expands on a dropped call or a
  location change. A patient outside BC gets a notice that can't be dismissed.
- Rationale: CV25 §3. ES3 §8 also makes the patient's current location part of emergency safety.
- Accept: Finalize is blocked until the strip is complete. After a dropped call, the doctor finds
  the location and callback number 100% of the time (CV25 §9).
- Status: not built. **Gap:** v2 has no strip, and Finalize doesn't depend on one (B-006:104-105;
  `finalizeVisit` asks only about an empty note, REQ-CH-07). What it must record comes from the
  Virtual Care Compliance companion, not yet written (OQ-91).
- Priority: P1. `clinical-safety` and `privacy-security` review it.
- Open: OQ-91.

**REQ-CH-37 · Needs Attention on the chart is one place, with related items grouped and abnormal
kept apart from actionable.**
- Directly under the banner. Only unresolved items that need review or action. Each shows its
  name, value, units and range, source, received time, responsible doctor and stage (reviewed,
  patient told, follow-up due, closed), with a direct action. Related items are grouped under the
  lead one (for example an ECG and CK under a troponin). Tiers: Critical, To do, Info. Critical
  items can never be hidden or re-ranked here. When empty, one quiet line: "Nothing requiring
  attention".
- Rationale: CV25 §3, §7. The classification comes from the Critical Results & Escalation
  companion, not yet written (CV25 §1).
- Accept: with an unrelated abnormal result on screen, the doctor finds the highest-priority action
  in 10 seconds or less, every time (CV25 §9). The same fact never appears twice as competing
  alerts (CV25 §7).
- Status: partly built. v2 shows unsigned Critical and High results at the top of the chart
  (REQ-CH-13). **Gaps:** the abnormal ECG is a separate yellow card rather than grouped under the
  critical one (V2d:10653-10668; B-006:106-107); "Also in today" is a separate line; there are no
  stages, responsible doctor or To do / Info tiers.
- Priority: P1.
- Open: OQ-76 (tier names), OQ-92 (Home vs chart), OQ-91 (the escalation companion).

**REQ-CH-38 · Today and "Relevant to [concern]" put the visit's reason first and gather context in
five fixed categories.**
- Today: the reason in the patient's words, a concise intake summary (REQ-INT-20), and intake red
  flags in the patient's exact words.
- Relevant to [concern]: history, medications (each with its source and date, for example
  PharmaNet or the SimpleCare record), investigations, prior related care, and pending. Selection is
  rules-first; AI may rank or add items marked "suggested" but never silently drops chart content.
  Every item opens its source. The doctor can mark an item Relevant, Not relevant, Missing or
  Incorrect; "Incorrect" goes to chart-correction review and never edits the record.
- Rationale: CV25 §3-§5. It takes over REQ-CH-20 ("Since last visit" fits today's reason) and
  REQ-INT-06 (the full intake inside the chart).
- Accept: the source of a summarised item opens in 3 clicks or fewer; a non-PharmaNet medication
  list is recognised at least 90% of the time (CV25 §9).
- Status: not built. v2's intake is a separate view (REQ-INT-06), and "Since last visit" is drawn
  from the last plan, not from the concern (REQ-CH-01).
- Priority: P1.

**REQ-CH-39 · "Since you last saw" lists what is new, changed, pending and resolved, and pending
loops stay visible.**
- From the treating physician's last relevant visit (with a labelled clinic fallback): 3-6 items by
  default, critical always shown, then "+N more". Unfinished care is visible: ordered not done,
  resulted not reviewed, patient not yet told, referred not seen, report missing, follow-up due.
  "Acknowledged is not closed."
- Rationale: CV25 §3, §6.
- Accept: the doctor states what changed since the relevant prior visit at least 90% right within
  30 seconds (CV25 §9).
- Status: partly built. v2's "Since last visit" has Plan / Ask about / Pending lines (REQ-CH-01,
  `renderSinceLast`). **Gap:** it needs reshaping into NEW / CHANGED / PENDING / RESOLVED
  (B-006:108-109).
- Priority: P1. Relates to REQ-CH-29 and REQ-IN-22 (pending and overdue results).

**REQ-CH-40 · Clinical threads replace a flat problem list, and a stale thread says so.**
- One row per curated active problem: status, treatment, monitoring, last decision and next step,
  with the date of the last meaningful review. Suggestions never add a thread by themselves.
  Trends show the latest value, units, normal range and flag beside them.
- Rationale: CV25 §3, §6. Its stale default for a chronic problem is "more than 12 months,
  configurable"; that is the document's default, not ours. It extends REQ-CH-17 (the problem list
  with the doctor approving) and sits alongside the care plan (REQ-CH-11, REQ-CH-31).
- Accept: stale or conflicting information is recognised at least 90% of the time (CV25 §9).
- Status: not built. v2 has a conditions panel and a care plan (UC-15).
- Priority: P2 (CV25's third delivery step, §10).
- Open: OQ-81.

**REQ-CH-41 · The chart follows CV25's visual rules.**
- No duplicate primary display. Typography before containers: hierarchy, spacing and subtle
  separators, no wall of cards. Red only for critical or destructive states; amber for to do,
  overdue, stale and conflicts; every colour state also has a word or symbol. Opening any part of
  the chart keeps the note, scroll position and visit state. The chart works without AI. No new
  dashboard, alert taxonomy or permanent chrome. WCAG 2.2 AA; the banner, Needs Attention and the
  reason load within 1 second.
- Rationale: CV25 §7. It matches handbook rule 21 and REQ-UI-01 (red for critical only).
- Accept: the chart is usable with AI off 100% of the time (CV25 §9).
- Status: partly built. Red is mostly reserved (REQ-UI-01). **Gap:** v2's chart is many cards
  (B-006:110).
- Priority: P1.

**REQ-CH-42 · The chart is accepted by physician task performance, not by looks.**
- A final test with at least 15 physicians on realistic cases with interruptions and competing
  abnormal results, against the targets in CV25 §9, including zero wrong-patient errors and a SUS
  score of at least 68 (target 80).
- Rationale: CV25 §9.
- Accept: as CV25 §9. `ux-researcher` plans the test; Ani and Daniel approve.
- Status: not built (process).
- Priority: P2.

---

## Prescribing (RX)

**REQ-RX-01 · A renewal is one flow.**
- The current medication, a supply choice, the pharmacy on file, Send, the fax status on the visit,
  and a one-line note drafted.
- Rationale: S1:26-28; `29d956d`.
- Accept: a renewal completes from the chart without leaving "This visit".
- Status: built (build 13:10, `rxOpen` V2b:9930). The fax status sits on the card and the note line
  is drafted into today's note (`rxConfirm` V2b:10042). Failed faxes are REQ-RX-05.
- Priority: P1.
- Open: none (OQ-08 answered: either sends, REQ-RX-10).

**REQ-RX-02 · The quantity is correct for the directions.**
- The supply buttons do not fix the tablet count whatever the dosing.
- Rationale: twice daily for 3 months was sent as 90 tablets, and the note recorded it (DR:75-77).
- Accept: to be set by OQ-09. Until then, quantity is its own field and is never inferred.
- Status: built differently (build 13:10). Quantity is worked out as doses a day × days
  (`rxQty` V2b:9911), so twice daily for 3 months reads 180. It is shown, not typed. This departs
  from the interim accept line above; see D-63. The rule still waits on OQ-09.
- 26 Sep: a favourite may carry the quantity (ANS26:8-9; REQ-RX-11).
- Priority: P2 (waits on OQ-09 and OQ-60).
- Open: OQ-09, OQ-60.

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
- 26 Sep: *"To Fax is to 'sign off' on the script"* (ANS26:22; D-71). The press that sends is the
  doctor's sign-off, so it reads as one (REQ-UI-06). Since `c1015e4` it reads "Sign off & fax"
  (V2c:10166). The delegated route's "Send to Japneet" does not (REQ-RX-07).
- Priority: P1.

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

**REQ-RX-07 · "Ask Japneet to send" is on the renewal card: a delegation to the physician
assistant, under the doctor's sign-off.**
- The doctor hands the renewal to Japneet, the physician assistant (PA). She works in a Physician
  Assistant portal identical to his. The card shows it was sent and picked up, and the record keeps
  the sign-off as his.
- Rationale:
  - S2:38-40, 62-63.
  - Daniel, 27 Sep: *"Always me. I can delegate authority to Japneet, but it is my responsibility.
    She uses the Physician Assistant Portal - which is identical to my portal."* (ANS27:14-15;
    D-79). Until 30 Sep this requirement called her the MOA. She isn't one.
- Accept:
  - The button names the PA.
  - The hand-off goes to the PA, not to the MOA task queue.
  - The note line and the record carry the doctor's name as the signer, and name Japneet as the
    person who sent it. The exact wording waits on OQ-70.
  - The card shows "sent", then "picked up".
- Status: partly built (V2c).
  - The button reads "Ask Japneet to send" (V2c:10113) and goes through the same check step.
  - Japneet is modelled as the MOA buddy (`MOA_ROSTER` V2c:6870-6871).
  - The route files an MOA "Prescriptions" task at routine priority (`moaTask` V2c:10183).
  - The note line reads "Sent to Japneet (MOA) to fax", with no sign-off by the doctor
    (V2c:10187).
  - Picked up is a 7 s demo timer.
- Hazard: HZ-09 in the clinical-safety log (the renewal waits at routine, and the sign-off is
  unclear). Its sign-off cause is now answered by D-79; the log is `clinical-safety`'s to update.
- Priority: P1.
- Open: OQ-70, OQ-41 (OQ-08 and OQ-61 answered).

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

**REQ-RX-10 · "Send it myself" and "Ask Japneet to send" carry equal weight.**
- Both routes sit side by side with the same visual weight. Neither is preselected or styled as the
  default, and the product does not choose by drug or pharmacy. Either way, the sign-off is the
  doctor's.
- Rationale:
  - Daniel, 26 Sep: *"Either can send... So if I am f\*\*\*ing around, she sends it. If I think
    she'll f\*\*\* it up, then i send it."* (ANS26:8-9; D-72). It is the doctor's call each time
    (ANS26:12-13).
  - 27 Sep: "she" is Japneet, the physician assistant, and the responsibility stays his
    (ANS27:14-15; D-79).
- Accept:
  - At rest, neither button is the primary style.
  - Either completes the renewal.
  - The visit record says which route was taken and who sent it, under the doctor's sign-off.
- Status: built for equal weight (`c1015e4`). "Send it myself (fax)" and "Ask Japneet to send"
  share one plain style, and neither is the default (V2c:4717-4720, 10113). The record for the
  delegated route is REQ-RX-07's gap.
- Priority: P1.
- Open: OQ-70 (OQ-61 answered).

**REQ-RX-11 · The doctor's favourite prescriptions are pre-populated.**
- A prescription or renewal can start from one of the doctor's favourites, a saved script that fills
  in its fields. The check step still runs before anything is sent (REQ-RX-04).
- Rationale: Daniel, 26 Sep: *"I also have my favorite's pre-populated."* (ANS26:8-9; D-73). He
  describes them as something he has now, so a v2 without them would be a step back from production
  (inference from the quote; OQ-60 asks where they live).
- 27 Sep: *"They live in the Rx function. I manage them."* (ANS27:23; D-80). Favourites belong to
  prescribing, and the doctor adds and changes them.
- Accept: from the renewal card, the doctor can pick a favourite and see it filled in, then edit or
  send it. Only the doctor adds, changes or removes a favourite. Which fields a favourite holds is
  OQ-09. Whether Japneet may send from one is OQ-70.
- Status: partly built (`c1015e4`).
  - The renewal card has a Favourites button that fills a line, from invented demo favourites
    (V2c:4706, 10546-10583).
  - There is no place to add, change or remove a favourite.
- Priority: P1.
- Open: OQ-09, OQ-70 (OQ-60 answered).

---

## Inbox (IN)

**REQ-IN-01 · Every external result is reviewed and individually signed off.**
- It moves received → reviewed → signed off. The three stages are tabs.
- Rationale: *"every test result, lab, imaging report, and consult note ... must be reviewed and
  individually signed off"* (SIA:22). Tabs: `07dd1ae`.
- Accept: Sign off is reachable (it once was not, `8444fe4`), and a signed item leaves Needs review.
- 26 Sep: Daniel confirms the two stages: *"Reviewing is separate, all it means is that the Doctor
  is assessing... To sign off is typically an action."* (ANS26:17-18; D-71). Reviewed is a state,
  set by opening the item (V2:4976); Sign off is the action (REQ-UI-06).
- Status: built.
- Priority: P1 (built; keep).
- Open: OQ-62 (OQ-10 answered).

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
- 30 Sep: High also carries an exclamation mark, and other abnormal values are yellow (REQ-IN-14;
  D-96).

**REQ-IN-11 · A routine "No follow-up" moves to the next result, and reviewed items can be signed
off together.**
- Rationale: 14 routine results means 14 round trips; a normal Pap takes four actions (DR:157-170).
- Status: partly built (build 13:10). A routine "No follow-up" opened from the Inbox lands on the
  next result (`rvNo` V2b:8951), and review has "Next result" (`rvNextResult` V2b:8972). Batch
  sign-off is not built.
- 26 Sep: sign-off is his accountable action (ANS26:25), so whether one press or a batch may sign
  off is his call (OQ-62).
- Priority: P2.
- Open: OQ-62 (OQ-10 answered).

**REQ-IN-12 · Results come from the source by integration, as data.**
- Results reach SimpleCare directly from the lab or other source through an API: test, value,
  units, reference range, the lab's flag, collection date and the source's name. They enter the
  Inbox and are tiered as now (REQ-IN-07), and they feed results by test on the chart (REQ-CH-22).
  The source document stays viewable (REQ-RV-05).
- Rationale: Daniel, 26 Sep: *"We need API access so that we get the results from the source. I am
  relying on patients to help me."* and *"it is madness that I am opening up raw pdf's"*
  (ANS26:50, 56; D-76, D-77). S4 and S5 show both halves: PDFs read one at a time (S4:46-56), and
  an outside result that depends on the patient (S5:52-54).
- Accept: a result from a connected source can be read, trended and signed off without opening a
  file. Which source is connected first is OQ-65; no source is assumed here.
- Status: not built as an integration. The Inbox's demo results already carry values, flags and
  tiers (REQ-IN-07); the chart's Results tab does not (`vcp-results` V2b:4659-4663).
- Priority: P1.
- Open: OQ-65.

**REQ-IN-13 · A result the patient uploads is a fallback, and is marked patient-supplied.**
- Wherever it appears (the Inbox if it goes there, the chart's Results and Documents, "Since last
  visit"), a patient upload carries a "patient-supplied" label. It never looks like a result from a
  connected source, and its values do not join a trend unmarked.
- Rationale: *"I am relying on patients to help me."* (ANS26:56). The answer file: a patient upload
  is only a fallback, marked as patient-supplied (ANS26:59-60; D-77).
- Accept: the doctor can tell from the row alone that a result came from the patient. Where an
  upload lands, and whether it is tiered, is OQ-54.
- Status: not built. PP's "Add a document" saves to health records (PP:929-933, 2279-2282), and the
  physician portal shows nothing on arrival (S5:112-114).
- Priority: P2.
- Open: OQ-54, OQ-52.

**REQ-IN-14 · Three flag levels: Critical (red), High (with an exclamation mark), and Abnormal
(yellow, which the doctor clears).**
- Critical is the only red. High carries an exclamation mark as well as its colour. A result that
  is outside its range, or abnormal, but neither Critical nor High is yellow, and the doctor looks
  at it and clears it.
- Rationale: Daniel, 30 Sep: *"critical and high, I would even argue, is like almost the same
  category … both of them should be with an exclamation mark at least"*; *"yellow is fine as
  abnormal, like unless it's critical."*; *"all it means is that the doctor has to look at it and
  clear it."* (ECG30:32-42; D-96).
- Accept: on the chart, in Recent results and in the Inbox, a Critical value reads red with an
  exclamation mark, a High value has an exclamation mark, and an abnormal one is yellow. Yellow
  results never show on Home (ECG30:71-72). No new thresholds: the bands are REQ-IN-07's.
- Status: built on the chart (`cf6207c`, V2d). Recent results mark Critical and High with an
  exclamation mark (`rsVal` V2d:10992-11001). An abnormal result that is neither gets its own
  yellow card under the critical one (V2d:10653-10668). Not re-checked in the Inbox rows.
- Priority: P1. `clinical-safety` reviews it (ECG30:68-69).
- Open: OQ-75, OQ-76.
- 3 Oct: Chart View v2.5 uses Critical, To do and Info on the chart, and "abnormal ≠ actionable"
  (CV25 §3, §7; REQ-CH-37). Whether a yellow result is "To do", "Info" or neither is OQ-76.

**REQ-IN-15 · An abnormal ECG says only "Abnormal ECG"; the machine's reading stays on the
tracing.**
- Wherever an abnormal ECG appears (the chart card, the Inbox row, the review, the AI summary), it
  reads "Abnormal ECG". The ECG machine's interpretation is never repeated outside the tracing.
- Rationale: *"I would just say abnormal ECG, right? Because you wouldn't want to bias the doctor."*
  *"that's the source document, right? It's on there. But that's not something that we should tell
  the doctor. We just have to flag it as abnormal."* (ECG30:15-22; D-97).
- Accept: searching every surface for the machine's wording finds it only on the tracing. When
  Daniel's critical-ECG list exists, an ECG on it becomes a red card that names the finding
  (ECG30:61-63). Until then every abnormal ECG is yellow.
- Status: built (`traceFlag` V2d:8181-8185; used at V2d:8233, 9086, 9128, 10662, 10687). The
  critical-ECG case is not built, by design, until the list arrives.
- Priority: P1.
- Open: none (OQ-74 answered 3 Oct). The critical case is REQ-IN-23: ECG Critical v2.0 shows a
  CRITICAL ECG's printed phrases verbatim, so the "machine reading stays on the tracing" rule here
  holds for a non-critical abnormal ECG only (D-105).

**REQ-IN-16 · Every flagged result shows whether it has been cleared.**
- A flagged value says "Not cleared", which opens the result, or "Cleared".
- Rationale: Daniel, 30 Sep, at a yellow flag: *"did the doctor like clear this or what do we do?"*
  (ECG30:44-46; D-98).
- Accept: the doctor can tell from the results list alone which flagged values still need him.
- Status: built (`rsClear` V2d:11003-11010). In the demo, "Cleared" means the result is signed off
  (ECG30:57-58). That meaning is not Daniel's yet (OQ-75).
- Priority: P1.
- Open: OQ-75.

**REQ-IN-17 · The Inbox opens chart-linked documents, never a raw fax.**
- Every faxed document becomes an identified, labelled document filed in the right chart section,
  then routed to the responsible physician. An Inbox item opens that filed document in the chart.
- Rationale: DOC21's core principle, §1, §9 and §16 (fax is only a way in; physicians receive
  chart-linked documents). Matching the patient and routing to a doctor are separate decisions, and
  the receiving fax number is a routing signal, never an identity signal (DOC21 §7, §8). Each
  physician gets a dedicated fax number (Ani's routing note, B-003:92-93). Daniel: *"it is madness
  that I am opening up raw pdf's"* (ANS26:50).
- Accept: no physician screen lists faxes. A document with an identity conflict is never attached
  automatically; it waits for the MOA (REQ-MP-06). The original file stays viewable from the item
  (REQ-RV-05).
- Status: partly built (demo). Inbox items are results already tied to a patient, and open the
  review with the source document (REQ-RV-05). There is no ingestion, matching or routing.
- Priority: P2 (an engineering pipeline; the physician-side shape is built). `integrations-engineer`
  and `privacy-security` own the feasibility.
- Open: OQ-78.

**REQ-IN-18 · Attention protocols own priority; routing never sets or lowers it.**
- What goes to Needs your attention, and at what level, is decided by the attention protocol for
  that document type, not by the routing step. A critical signal found while reading a document is
  handed on at once, before the patient match finishes, and never held back. All reports stay in
  the Inbox; Home is an escalation layer only.
- Rationale: DOC21 §2 (stage 10), §4 (critical-signal early handoff) and §9 (one source of truth for
  priority). It agrees with REQ-IN-07: tiering is deterministic and AI never sets a tier. B-003:101-102.
- Accept: no routing rule changes a tier. A critical result in a document still awaiting identity
  confirmation alerts the intended physician before it is attached (DOC21 §14).
- Status: built in principle for labs (the Inbox's `labTier` decides; Home reads it). Not built for
  documents or the early handoff.
- Priority: P2.
- Open: OQ-76 (the level names), OQ-78 (the Review Labwork Attention Protocol).

**REQ-IN-19 · Clearing a card on Home never closes the Inbox report unless the review is done.**
- Rationale: DOC21 §9: clearing an attention card must not close the underlying Inbox report unless
  the physician completes the review.
- Accept: after the doctor deals with a Home card, the report is still in the Inbox until he signs
  it off (REQ-IN-01).
- Status: built in effect (demo). A Home row leaves once the result is no longer "received"
  (`renderCriticals` V2d:6463-6466); the Inbox item stays until it is signed off.
- Priority: P2.
- Open: OQ-75 (what "clear" means).

**REQ-IN-20 · Every Inbox item has a review time limit by document type, and escalates when it
passes.**
- The limits are a safety net, not a priority model: a protocol may shorten one, never lengthen it.
  When one passes, the responsible physician is reminded, then the covering physician, then the
  clinical director.
- Rationale: DOC21 §9. Its proposed defaults run from 1 business day (hospital/ED) to 5 (consults,
  forms and the rest), "clinic-configurable". They are quoted as proposals only.
- Accept: an unreviewed item past its limit escalates (DOC21 §14). The limits are set by Daniel
  (OQ-85), not by the product.
- Status: not built.
- Priority: P2.
- Open: OQ-85, OQ-78.

**REQ-IN-21 · Lab and imaging reports update in versions; a new version reopens the item as
"Updated".**
- One order gives one evolving report. A newer version replaces what the doctor sees, the older
  ones stay in the history, and a version arriving after he acknowledged one reopens the item as
  "Updated" with what changed. Each version is checked again for attention. Pathology reports stay
  separate documents.
- Rationale: DOC21 §6 and §14.
- Accept: a cumulative report adds no duplicate row; an added critical value can raise attention
  even if the first version didn't.
- Status: not built.
- Priority: P2.
- Relates to REQ-IN-09 (pending results stay visible): DOC21's "Remaining Results" is that list.

**REQ-IN-22 · An order with no result inside its expected window goes on the ordering physician's
Overdue list.**
- Rationale: DOC21 §6 and §14. The doctor can close an overdue order with a reason (received another
  way, not done, declined, cancelled), and the closure is recorded. Its expected windows are
  proposed defaults (OQ-85).
- Accept: an order past its window appears on the list without anyone looking for it.
- DOC21 also creates an MOA follow-up task automatically. That conflicts with rule 12 and
  REQ-TK-01, so it is not adopted until Daniel answers OQ-86.
- Status: not built.
- Priority: P2.
- Open: OQ-86, OQ-85. Relates to REQ-CH-29 (orders made outside SimpleCare).

**REQ-IN-23 · A CRITICAL ECG is one priority, taken from the printed report and shown verbatim.**
- An ECG becomes CRITICAL ECG when its printed interpretation holds a phrase from the trigger
  dictionary, or the source explicitly marks it critical or urgent. SimpleCare reads the report and
  never interprets the waveform. "Abnormal ECG" alone, or plain atrial fibrillation with no source
  critical flag, is not a trigger.
- In Needs Attention it shows: CRITICAL ECG, the matched phrases verbatim, the source of the
  interpretation (machine, preliminary, cardiologist-confirmed or clinician), the ECG and report
  times, the printed measurements, the original one click away, and the acknowledgement status and
  reviewer. It stays until a physician documents the review.
- Several triggers make one priority and one alert. An unknown phrase the source calls critical
  still routes, and is logged. Nothing is downgraded by a reassuring line elsewhere.
- Rationale: ECG20 §2-§8 (the dictionary is §3 and is not copied here). It answers Daniel's
  *"We'll have our own protocols"* (ECG30:25; OQ-74; D-105).
- Accept: as ECG20 §8. Every ECG still needs physician review.
- Status: not built. The demo's only ECG is plain AF without a source flag, which ECG20 says is not
  critical, so v2's yellow "Abnormal ECG" is right (B-006:35-39).
- Priority: P1. `clinical-safety` gates it.
- Open: OQ-76 (is CRITICAL ECG a kind of Critical?), OQ-92 (does it show on Home?).

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
- 3 Oct: each doctor has one primary MOA, the same one every time (private strategy, 3 Oct 2026
  (confidential); D-103). So "the MOA on service" and "the primary MOA" are normally the same
  person; who stands in when she is away is OQ-83.

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
- 29 Sep: task rows leave Needs your attention (HOME29:27-28; D-85). The row he crossed off was a
  delegated task, so this does not settle where his own work sits. It is not in the attention list.
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

**REQ-TK-12 · The doctor's chat is one conversation with the MOA paired for this call window.**
- The doctor chats with one named person, the MOA paired with them now, with her presence showing.
  There is no list of threads, no picking a recipient, and no ticket queue. Chat and tasks stay
  separate: a task still travels doctor → MOA (REQ-TK-01).
- Rationale: Daniel, 30 Sep: *"1 MOA, with the proper tools, can be paired with x 5 docs."* *"on our
  system - it shows to the Docs 1:1 pairing."* *"What we don't want is what [a competitor] does -
  Doctor submits a ticket in a queue"* (MOA30:10-13). Ani: a doctor has just one MOA (B-002:11;
  D-93). Rule 12a.
- Accept: opening chat lands in the one conversation, which names the MOA and says she is "your MOA
  this window". When the pairing changes, the new MOA is named (B-002:32-33).
- Status: built on the physician side (`fcdb13d`; `MOA_THREADS` holds one conversation and
  `toggleChatPanel` opens it directly, V2d:8502-8510, 8531-8539). Carry-over between windows is
  OQ-83.
- 3 Oct: the doctor's MOA is the same one every time (D-103), so the label "Your MOA this window"
  may become "Your MOA" (copy for Manoj).
- Priority: P1.
- Open: OQ-83.

**REQ-TK-13 · Chat suggests quick messages, and nothing sends by itself.**
- Above the message box, chips offer replies when the MOA's last message is a question ("Yes, go
  ahead", "Not yet"), or asks that fit the screen (on a chart, about that patient; on Home, about the
  day). A tap fills the box; the doctor sends.
- Rationale: Ani, 30 Sep (B-002:26-29; `fcdb13d`). Daniel wants the doctor spared needless clicks
  (*"I don't want the doctor clicking a bunch of stupid buttons."*, `2094417`); rule 18 keeps the
  send with the doctor.
- Accept: no chip sends a message. Chips never name another patient than the one on screen.
- Status: built (`chatSuggestions`, `renderChatSuggest`, `chatUseSuggest` V2d:8599-8623).
- Priority: P2.

---

## Intake (INT)

**REQ-INT-01 · The reason is shown in the patient's words with its category.**
- It is on the queue row and at the top of the chart, with no separate intake modal.
- Rationale: S2:26-27, 54-58. S4 repeats the detour: intake modal, close, then chart (S4:18-23).
- Status: partly built. There is an AI line on the row, and "View intake note" still opens a
  separate view (V2b:4641, `openBrief` V2b:6652).
- 30 Sep: the line is the physician summary of REQ-INT-20 (B-003:101). The patient's original
  message stays viewable (IN23 §19).

**REQ-INT-02 · A red-flag intake explains itself.**
- It sorts to the top and shows on the chart banner ("read it before calling").
- Rationale: `1a9c71b`, `56e5f20`.
- Status: built.

**REQ-INT-03 · A patient-written request is summarised as a flag on the queue row.**
- For example, a request for a referral to a named clinic.
- Rationale: S2:41-42, 68-69.
- Status: not built.
- Open: OQ-40.

**REQ-INT-04 · Intake asks whether the patient has been seen on another platform. WITHDRAWN
27 Sep 2026.**
- Daniel: *"No - don't mention Rocket or Tia, I ask because many of my patients come from there."*
  (ANS27:38; D-81).
  - Intake does not ask this, and no competitor is named in intake or in the product (rule 16a).
  - He asks it himself on the call.
  - Kept here, so the ID isn't reused. It was raised from S1 and S5 (S1:10-12; S5:26-29), where he
    asked it out loud.
- Status: withdrawn. Nothing to build.
- Open: none (OQ-18 answered).

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

**Booking, from Daniel's 29 Sep booking model (INT-07 to INT-11).** These are patient-facing.
- The v2 prototypes don't model them yet. Manoj is designing them in a new shared prototype,
  `simplecare-patient-chat.html` (T-012 to T-015), which does not exist yet.
- "Production" and "staging" below are the live system, as tested in QA29.

**REQ-INT-07 · Booking is open to every concern that is not an emergency.**
- No concern, doctor or pathway refuses a booking, except an emergency, which is redirected
  (REQ-INT-11).
- Rationale: Daniel, 29 Sep: *"I am not blocking patients anymore. They can book for every single
  problem no matter how hard so long as it is not an Emergency."* *"Indeed, no doctor should
  block."* (BOOK29:32-34; D-87). Hard cases are organised, not turned away: *"What we need to do is
  organize these Patients so what is hard can become manageable."* (BOOK29:37).
- Accept:
  - Any non-emergency concern reaches a booked window on every pathway.
  - No screen says a concern can't be booked.
  - An empty day offers other days, other doctors or the phone line, never a dead end (T-015).
- Status: open in production. Ani: *"in current state all is open."* (BOOK29:8). Not modelled in
  the prototypes.
- Priority: P1.
- Open: OQ-69 (what counts as an emergency).

**REQ-INT-08 · Each concern has one of two intake depths: quick-book or triage-first.**
- Straightforward concerns get a quick-book tile. Complicated ones go through triage before a
  window is chosen.
- Which concern gets which depth is Daniel's list. The product never decides it.
- Rationale: *"those can be displayed … We do that already."* *"i am not so inclined to quick book
  a Hemorrhoid Ani … You have a Hemorrhoid, you put in some work."* *"And so preference is given to
  the AI for more complicated concerns."* (BOOK29:11-19; D-88).
  - His quick-book examples: Rx Renewal, Sick Note, Bladder Infection, Birth Control Refill.
  - His triage-first examples: hemorrhoids, diarrhoea, constipation.
- Accept:
  - The depth is data per concern, set from Daniel's list.
  - A triage-first concern never shows a quick-book tile.
  - Triage finishes before a window is offered (T-014).
  - Until the list arrives, only his named examples are classed. Every other concern is marked
    unclassified, not guessed.
- Status: partly built in production. Quick-book tiles exist ("We do that already"). The split is
  not in the prototypes.
- 2 Oct: IN23 keeps each pathway (its questions, slots, safety triggers, stop rule and care types)
  in a versioned registry the Clinical Director edits without a code change (ENG-10, §11, AC-28).
  A routine pathway is written to finish in 2-3 questions, never more than 4 (AI-19).
- Priority: P1.
- Open: OQ-67, OQ-68.

**REQ-INT-09 · Many booking pathways, all into the same queue.**
- The pathways:
  - concern tiles ("Know what you need");
  - the Simplicity AI chat;
  - the clinic phone line, which may itself become AI;
  - possibly WhatsApp or text booking, which is not decided.
- Each ends in the same call window and queue as the others.
- Rationale: *"these other pathways exist to give as many patients as possible as many booking
  pathways as possible"* (BOOK29:24-25). *"we ought to even have WhatsApp? Text based booking … why
  not."* (BOOK29:26; D-89). "Same queue" is the lead's reading (BOOK29:52-53).
- Accept:
  - A booking from any pathway shows in the physician queue the same way.
  - The patient's window is held before any account step (T-014).
  - No pathway is presented as the main one.
- Status: partly built.
  - Tiles and the chat exist. Both were tested on staging, and tile booking works in production
    (QA29:13).
  - The clinic phone line exists (BOOK29:24). How it books into the queue is not documented in
    our sources.
  - WhatsApp or text booking is not built and not decided.
  - On staging the window isn't held before sign-up (QA29:16).
- Priority: P1 (WhatsApp or text: P3, waiting on OQ-72).
- Open: OQ-72, OQ-73.

**REQ-INT-10 · The AI is offered, never forced.**
- Every pathway, including triage for a complicated concern, works without talking to an AI.
- A patient who says they don't want the AI is offered the tiles or the phone line.
- Rationale: *"Some people f\*\*\*ing hate AI. So they don't want to talk to some bulls\*\*t
  agent."* (BOOK29:23; D-90; B-001 item 4).
- Accept:
  - From the chat, a patient can reach a non-AI pathway in one step.
  - A triage-first concern has a non-AI triage. Its content waits on OQ-68.
- Status: partly built. The tile path works in production. QA-007 was a staging-only gap (QA29:13;
  `b85fd4d`). There is no non-AI triage for triage-first concerns.
- 2 Oct: if the AI service is down, the service cards and a non-AI direct-booking path stay
  available, and an outside evidence service failing never blocks booking (IN23 AI-21, AC-27).
- Priority: P1.
- Open: OQ-68.

**REQ-INT-11 · An emergency is caught first and redirected, on every patient-facing pathway.**
- Before any pathway, doctor or window appears, and at any point in the chat, a message that
  signals an emergency shows one emergency screen (call 911 or go to the ER). Booking does not
  quietly resume afterwards.
- Rationale:
  - Booking is open *"so long as it is not an Emergency"* (BOOK29:32-33).
  - On staging, "chest pain, can't breathe" is offered doctors and call windows (QA29:12, QA-001 to
    QA-004).
  - Rule 17a: the wording is Daniel's, the look is Manoj's, and Ani approves.
- Accept:
  - The first message is checked before anything else.
  - The same check runs mid-chat.
  - One emergency treatment is used in the chat, on the tiles and on the doctor pages.
  - The red-flag list and the words come only from Daniel. Until then they are marked placeholders
    (T-012).
- 30 Sep: ES3 (draft) gives the screening a source: every patient input on every surface where a
  patient types (chat, reason for visit, forms, messages) is screened before the next routine reply,
  across the whole conversation (ES3 §1, §3, §16). Its hard-stop domains are §4. What happens on a
  hard stop is REQ-INT-17. The draft still needs a designated physician's approval (ES3 document
  control), so ES3 replaces "placeholders" with "draft, not yet approved".
- 2 Oct: IN23 calls safety "primarily reactive", with at most one safety question per pathway
  (§17). How deep the screening goes is OQ-79.
- Status: not built. It fails on staging (QA29:12).
- Priority: P1. `clinical-safety` gates it.
- Open: OQ-69, OQ-79.

**From SimpleCare's requirement documents (INT-12 to INT-21).** IB7 (30 Sep) and IN23 (2 Oct) are
SimpleCare's own specs for booking and the Simplicity chat; IN23 wins for the chat where they
differ (D-102). ES3 is a draft awaiting physician approval. These are patient-facing, so the same
note applies as for INT-07 to INT-11: the prototypes don't model them yet (T-012 to T-015).

**REQ-INT-12 · A Fast-Track service card goes straight to booking, not through the AI chat;
clinical intake still runs.**
- A card sets the concern's pathway directly. Free text is the other way in; the patient is never
  made to do both. Skipping AI navigation never skips clinical intake.
- Rationale: IB7 §2, §10, §20; IN23 AI-22. B-003 self-check 1.
- Accept: from a card, the next screen is booking or the pathway's intake, never the navigation
  chat. A card never leads to the Quick Care / Family Doctor choice (IN23 AC-30).
- Status: partly built in production (tiles book; QA29:13). Not modelled in the prototypes.
- Priority: P1.

**REQ-INT-13 · Booking follows the patient's relationship: the Family Doctor first, then a doctor
seen before, in a fixed order.**
- A formally assigned Family Doctor is the default for routine and ongoing care, labelled "Your
  Family Doctor". "Your Family Doctor" appears only for a formal attachment.
- An unattached patient sees the doctors they have seen before at the top, each with a small "Seen
  before" badge, and can still pick anyone.
- The order is fixed for the same inputs: assigned Family Doctor, a doctor seen before, then the
  least-booked eligible doctor in the selected call window, then the rest (IN23 AI-20, AC-26).
- Rationale: IB7 §5-§7, §19-§20; IN23 §6, §8, AI-14, AI-15, AI-20. Daniel already offers continuity
  out loud (S5:30-32; REQ-ID-06).
- Accept: an unattached patient who saw Dr. A once sees "Seen before" by Dr. A, never "Your Family
  Doctor" (B-003 self-check 2). Signing in mid-chat with an assigned doctor and a follow-up or
  chronic-medication concern offers "See My Family Doctor" first (IN23 AC-31).
- Status: not built.
- Priority: P1.
- Open: OQ-77 (that "availability" means a call window), OQ-58.

**REQ-INT-14 · Cross-coverage never changes the patient's attachment, and no doctor is swapped in
silently.**
- Another doctor is offered when the Family Doctor can't see the patient within a clinically
  appropriate timeframe for the concern. The patient stays attached; the covering doctor charts in
  the shared record and hands ongoing care back. The screen says the Family Doctor is unavailable
  and shows their next availability alongside any permitted alternative.
- Rationale: IB7 §7-§9 (the timeframe depends on the concern, not a fixed rule); IN23 §8.
- Accept: after a covered visit, the patient's Family Doctor is unchanged. No timeframe is coded
  until Daniel sets who decides it (OQ-84). An emergency or in-person concern is never "solved" by
  offering another virtual doctor (IB7 §9).
- Status: not built.
- Priority: P2.
- Open: OQ-84, OQ-77.

**REQ-INT-15 · Doctors opt into episodic and comprehensive care separately.**
- Quick Care shows only doctors taking episodic visits; finding a Family Doctor shows only doctors
  accepting new comprehensive patients. A doctor can take either, both or neither.
- Rationale: IN23 §8, AI-16, AC-10, AC-11; IB7 §15.
- Accept: a doctor not accepting new comprehensive patients never appears in the Family Doctor path.
- Status: not built.
- Priority: P2.

**REQ-INT-16 · Simplicity opens with the emergency acknowledgement, once, before anything else.**
- The patient must accept that Simplicity is not for emergencies before typing, picking a card,
  signing in or booking through the chat. There is no "decline and continue". It is shown once per
  chat and is not a clinical question. A concern typed before it (for example on the landing page)
  is kept and handled afterwards; the patient never retypes it.
- Rationale: IN23 §5, AC-24, AC-33; ES3 §11 (the "not an emergency service" disclosure).
- Accept: as IN23 AC-24 and AC-33. The wording is IN23's recommended text until Daniel approves the
  final words (rule 17a; OQ-69). The look is Manoj's.
- Status: not built in the prototypes. Staging not checked against it.
- Priority: P1. `clinical-safety` and `accessibility` gate it.
- Open: OQ-69, OQ-79.

**REQ-INT-17 · An emergency hard stop ends booking for that concern and shows the approved message
first.**
- When a hard stop fires: intake stops; no scheduler and no doctor availability appear; the
  approved message for that domain shows first, with the emergency number for where the patient is
  now; and the state persists. The patient preferring otherwise never lowers it; only a clear
  data-entry mistake can be corrected, once.
- Readings the patient enters can only raise concern, never reassure. Current location is asked
  early ("Are you in BC right now?"), but an emergency message never waits for it.
- Two detection layers run, either one enough; the hard stop is held outside the chat model; if
  screening fails, intake pauses (fail safe, not fail open). A staffed clinic sees a real-time alert
  for an identified patient.
- Rationale: ES3 §3, §6, §7, §8, §10, §12, §14, §16. IN23 §17 agrees on the outcome: a 911 or ED
  message and no virtual booking for that concern. Booking is open *"so long as it is not an
  Emergency"* (BOOK29:32-33).
- Accept: as ES3 §16. Messages come only from ES3's approved table once a physician approves it
  (ES3 §7, §15); nothing is reworded in the product. ES3's release gate (no missed hard-stop case
  in at least 20 per domain, §15) is `patient-chat-qa`'s and `clinical-safety`'s to apply.
- Status: not built. It fails on staging (QA29:12).
- Priority: P1. `clinical-safety` gates it.
- Open: OQ-69, OQ-79.

**REQ-INT-18 · The chat goes in order: concern, care intent, sign-in, minimal intake, then the
scheduler.**
- Understand the concern first (AI-01). Infer Quick Care or Family Doctor when it is clear, and
  show the care-intent cards only when it isn't, with a small "Not sure?" (AI-13, AI-17, AI-23).
- Invite sign-in after the concern and intent are known and before the scheduler; "Continue without
  signing in" costs nothing, and a second invitation comes only before holding a window (§6,
  AC-08).
- On the free-text path the scheduler comes after minimal intake. A doctor or window chosen earlier
  is kept, and the patient never describes the concern twice (§18, AC-05, AC-23).
- A normal booking creates no admin task; people handle exceptions only (IB7 §17).
- Rationale: IN23 §3, §4, §6, §7, §18. B-004 Appendix A: on staging (2 Oct) the scheduler came
  before intake and sign-in came after the window was chosen.
- Accept: IN23 AC-05, AC-08, AC-09, AC-12, AC-23, AC-29, AC-30, AC-31.
- Status: not built. Fails on staging (B-004 Appendix A; QA29:16).
- Priority: P1.
- Open: OQ-80 (the "Hello" menu), OQ-73 (how long a window is held).

**REQ-INT-19 · Intake asks only what the pathway needs, and stops when it has it.**
- Free text is classified to a specific pathway (for example Rx Renewal), with one discriminator
  question or General/Other Concern when unsure (ENG-01, AI-08).
- Questions come from that pathway only; symptom questions (onset, progression, regular
  medications) are for symptom pathways and the Family Doctor pathway (ENG-02, QS-01 to QS-06).
- Each pathway has slots; anything the patient already said, in any message, fills them, and only
  empty slots are asked about (ENG-03, ENG-04, AI-05). Default 2-3 clinical questions, at most 4
  (AI-04).
- Intake stops when the slots are filled or declined, never on turn count (ENG-05, AI-09).
- Every reply is classified before use: confusion gets one plainer rephrase, never a word-for-word
  repeat; an objection drops the question; navigation and complaints stay out of the summary
  (IN23 §12, ENG-07, AI-11).
- Rationale: IN23 §9, §10, §12, §16, §20. B-004 Appendix A lists eight staging failures of exactly
  these rules (2 Oct).
- Accept: IN23 AC-01 to AC-04, AC-16 to AC-22 and AC-25. `patient-chat-qa` maps its PC-01 to PC-26
  suite to AC-01 to AC-33 (B-004).
- Status: not built. Fails on staging (B-004 Appendix A).
- Priority: P1.

**REQ-INT-20 · The physician gets a one- or two-line intake summary, built from the answers.**
- The reason for the visit and the few answers that matter, from the filled slots, not a condensed
  transcript. Anything the patient didn't confirm is marked "unconfirmed". A safety event goes at the
  top. The patient's original message is viewable. No formal CC/HPI, no separate red-flag section,
  no long note, and no navigation chatter.
- Rationale: IB7 §16; IN23 §19, ENG-08, AC-06, AC-21. It matches v2's clinical-concern line on the
  queue row (B-003:101; REQ-INT-01, REQ-INT-05).
- Accept: as IN23 AC-06 and AC-21. A red-flag intake still sorts first on Home and explains itself
  (REQ-INT-02), now as the summary's top line.
- Status: partly built. v2 shows a one-line, machine-marked intake summary on every queue row
  (`874f906`, `944d26a`). "Unconfirmed" marks and the original message are not built.
- Priority: P1.

**REQ-INT-21 · A request for a medicine on the Clinical Director's excluded list is declined, with
no booking for it.**
- The list (stronger opioids, matched by generic, brand and combination name, tolerant of
  misspellings) belongs to the Clinical Director and lives in the pathway registry. Other controlled
  medicines named in IN23 §17 go to the physician as normal. No general warning about "controlled
  medications". Booking for other concerns stays open.
- Rationale: IN23 §17, AC-32; B-004 self-check 4. The product never decides what to prescribe
  (rule 18); this list is SimpleCare's own clinical rule, not ours.
- Accept: as IN23 AC-32. The wording is IN23's recommended text until Daniel approves it.
- Status: not built.
- Priority: P1. `clinical-safety` gates it.

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
- Open: OQ-25, OQ-88, OQ-89.
- 3 Oct: the billing PRD has a longer claim lifecycle (BIL15 §6) and four eligibility results
  (ELT-01). Map v2's words onto them; rename nothing without Daniel (B-005:60-65). Private-pay
  invoicing is outside the PRD, so v2's private states stay (B-005:53-54).

**REQ-BIL-03 · Claims is a top-level destination with a neutral count.**
- Rationale: *"Claims are so important that i want that front and center"* (`27c18b3`); `74660d7`.
- Status: built.

**REQ-BIL-04 · "Finalize & review billing" opens the billing review.**
- Rationale: DR:87-88.
- Status: superseded by build 13:10. The button is now "Finalize today's visit" (V2b:4618) and
  promises no billing review (D-65). Whether Finalize should open one is OQ-51.
- Open: OQ-51.

**REQ-BIL-05 · Leave no claim behind: signing the visit submits its claim.**
- Rationale: `11b0ecb`, `632998a`. Daniel, 26 Sep: *"To submit a bill is to 'sign off' on your
  billing."* (ANS26:23; D-71). So submitting is his sign-off and must say so (REQ-UI-06).
- Status: partly built (only when the demo bill state is pending or none, V2b:7114). The claim is
  submitted inside Finalize, and nothing on the button says the bill is being signed off.
- Priority: P1.
- Open: OQ-51, OQ-87.
- 3 Oct: the billing PRD's model is batch attestation (REQ-BIL-08) and one disposition per visit
  (REQ-BIL-10). Whether Finalize keeps submitting is OQ-87.

**REQ-BIL-06 · Add-On encounters reach Claims.**
- Rationale: SCS:49.
- Status: not built.

**REQ-BIL-07 · Fee items, codes, amounts and claim time limits come from Daniel.**
- They are never invented.
- Rationale: the prototype's fee codes and amounts (V2:6246-6254) and "Refusals expire" (V2:5381)
  have no source. Claims optimisation "needs scoping" (SPEC:297-300).
- Status: not specified.
- Open: OQ-24.
- 3 Oct: the billing PRD gives deadline behaviour (REQ-BIL-14) but no fee codes or amounts, which
  stay unsourced (B-005:67-68).

**From Simple Billing PRD v1.5 (BIL-08 to BIL-15).** Daniel's billing requirements of 1 Oct,
forwarded 3 Oct (B-005; D-104). Only the behaviour the portals show is recorded here, cited by
PRD ID. The PRD's commercial and organisational sections are confidential and stay out of the repo.

**REQ-BIL-08 · Submitting a claim is the physician's personal attestation.**
- Clean claims can be attested together in one action; a flagged claim needs a decision on that
  claim. The physician attests personally, with MFA. Staff uploads and billing-staff actions never
  count as attestation. A proposed change to a clinical field sends the claim back to the
  physician.
- Rationale: BIL15 CNF-09, CNF-10, CNF-12, COD-04. It is Daniel's *"To submit a bill is to 'sign
  off' on your billing."* (ANS26:23; D-71; REQ-UI-06).
- Accept: no claim is submitted without the physician's own attestation; the record shows who
  attested and when.
- Status: partly built. v2's billing actions read "Sign off & submit" per claim (REQ-UI-06), and
  Finalize submits the claim (REQ-BIL-05). There is no batch attestation and no MFA step.
- Priority: P1.
- Open: OQ-87 (Finalize vs batch attestation), OQ-51.

**REQ-BIL-09 · The AI review flags likely errors and missed codes, with a reason and confidence,
and never changes a claim.**
- Rationale: BIL15 COD-01 to COD-06. Flags above a configurable confidence threshold appear at
  attestation (COD-03). The physician decides.
- Accept: every flag shows its reason; accepting or rejecting it is the physician's press; the claim
  is unchanged until he acts. Rule 18 applies.
- Status: not built.
- Priority: P2. `clinical-safety` and `ai-engineer` review it.

**REQ-BIL-10 · Every completed billable visit ends with exactly one disposition.**
- A submitted claim, intentionally not billed (with a reason), alternate payer, private pay,
  bundled or non-billable, or a documented exception. A visit with no disposition creates an
  exception.
- Rationale: BIL15 CLM-01 to CLM-06. It sharpens "Leave no claim behind" (REQ-BIL-05; `11b0ecb`).
- Accept: no completed visit is left with no disposition; the doctor can mark one "not billed"
  with a reason at attestation (CLM-06).
- Status: partly built. Finalize submits a pending claim (REQ-BIL-05); the other dispositions are
  not modelled.
- Priority: P2.

**REQ-BIL-11 · An eligibility check returns a result with its next action.**
- Eligible, not eligible, coverage ended (with the date) or demographic mismatch, each with what to
  do next. It runs at the point of care, overnight against the next day's bookings, and when a
  claim comes in. Out-of-province cards follow the reciprocal-billing workflow. An ineligible
  result offers PHN correction, reciprocal billing, alternate payer or private pay.
- Rationale: BIL15 ELT-01 to ELT-10, ELG-01 to ELG-04. The 5-second response is ELT-01's.
- Accept: as ELT-01 and ELT-08. The result is stored with the visit and any claim (ELT-05).
- Status: partly built. v2's health-card column has Verified, Check required, Invalid card and
  Private pay, and a non-verified state opens its cause (REQ-BIL-02, REQ-ID-04). "Coverage ended"
  and "demographic mismatch" are missing (B-005:63-65).
- Priority: P2.
- Open: OQ-89.

**REQ-BIL-12 · The MOA may correct demographic and clerical fields only; clinical billing fields
are the physician's.**
- The MOA may correct the PHN, name, date of birth, sex and clerical fields. Only the physician
  changes the fee item, diagnosis code, units, time, a fee-changing service location, or the
  referring practitioner.
- Rationale: BIL15 ROLE-R7, CTL-03, CNF-12.
- Accept: in the MOA portal those clinical fields are read-only; a proposed change goes to the
  physician as a question (REQ-BIL-13).
- Status: not modelled (MOAP has no claim editing).
- Priority: P2.

**REQ-BIL-13 · A billing question for the physician (L3) comes with its context and one-tap
answers, in one daily digest.**
- Rationale: BIL15 §8, ESC-09, ESC-10, CNF-02. L3 items are due in 1 business day and escalate
  if unanswered (B-005:42-44).
- Accept: the question names the claim, the exact question and, where possible, one-tap answers.
  Reminders are one digest a day, never one per claim.
- Status: not built.
- Priority: P2.
- Open: OQ-90 (a digest in the physician portal).

**REQ-BIL-14 · An unresolved claim raises deadline alerts at day 30, 60 and 75.**
- Against the MSP submission deadline. Over-age and resubmission pathways are checked before a
  claim counts as lost. Deadline rules are versioned.
- Rationale: BIL15 SCR-06 to SCR-10. It gives a source to v2's unsourced "resubmit within the
  window" (team board, training finding; B-005:67-68).
- Accept: a rejected claim says how many days remain and which pathway is open, from the rule, not
  invented text.
- Status: partly built. v2 tells the doctor to "resubmit within the window" with no rule behind
  it (V2d:5807). Fee codes and amounts stay unsourced (REQ-BIL-07).
- Priority: P2.

**REQ-BIL-15 · A refusal that looks correctly billed is flagged as a potential dispute, not
changed; expected and estimated payments are labelled apart.**
- The physician authorises substantive disputes. A claim under appeal can't be written off until
  it is resolved or withdrawn. Expected and estimated payments are never shown as the same thing.
  The physician's monthly statement shows billed, accepted, paid, adjusted, outstanding, refused,
  under appeal and written off, each with reasons.
- Rationale: BIL15 APL-01, APL-05, APL-07, REC-09, RPT-02.
- Accept: a refused claim that matches the rules shows "Potential dispute" and is not edited.
- Status: not built. v2's Claims has "Claim rejected" with resubmit actions (REQ-BIL-02).
- Priority: P3.

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
- 3 Oct: on the chart itself the PHN is masked (CV25 §3; REQ-CH-35).

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

**REQ-UI-06 · Approving actions are sign-offs, in words and in the record.**
- Three actions are the doctor's sign-off: finalizing the visit (the chart), sending a script by
  fax, and submitting a bill. A result's Sign off is the same kind of action. Each one uses the
  language of sign-off, records the doctor's name and the time, and is never done as an unnamed side
  effect of another press. *Reviewed* is shown as a state, never as a sign-off.
- Rationale: Daniel, 26 Sep: *"To Fax is to 'sign off' on the script"*, *"To submit a bill is to
  'sign off' on your billing."*, *"It is action oriented."* and *"The Doctor has approved this,
  meaning my a\*\* is on the line."* (ANS26:17-25; D-71).
- Accept: every approving button says it signs off; after it, the record reads "Signed off by
  Dr. <name> · <time>" or the same in the product's words. If one press signs off two things (the
  visit and the bill), the label says both (OQ-51). The exact copy is the designer's to draft.
- 27 Sep: *"Always me. I can delegate authority to Japneet, but it is my responsibility."*
  (ANS27:14; D-79). A script Japneet sends is still his sign-off.
- Status: partly built (V2c; `c1015e4` moved it on from build 13:10).
  - Built:
    - Finalize reads "Sign off & finalize visit" (V2c:4738). Its toast says "Signed off by
      Dr. Pannozzo", and adds "claim submitted" when it bills (V2c:7237). The stamp reads "Signed
      off by Dr. Pannozzo · today …" (V2c:10456).
    - The self-send check step reads "Sign off & fax". The note line records "Signed off by
      Dr. Pannozzo <time>" (V2c:10166, 10197).
    - Billing actions read "Sign off & submit" and "Sign off & resubmit" (V2c:6580-6581).
    - Inbox sign-off toasts "Signed off by Dr. Pannozzo" (V2c:8213).
  - Not built: the delegated route's check step reads "Send to Japneet", and its note says "Sent to
    Japneet (MOA)", with no sign-off by the doctor (V2c:10166, 10187). That is OQ-70.
  - Not re-checked this run: whether Finalize's label says it also signs off the bill (OQ-51).
- Priority: P1.
- Open: OQ-51, OQ-62, OQ-70 (OQ-61 answered).

**REQ-UI-07 · The messenger and the AI assistant are movable panels.**
- The doctor can drag the MOA chat panel and the SimpleCare Assistant panel to where they want them
  on the screen.
- Rationale: Daniel, 29 Sep: *"3. I'd like the messenger function movable"* *"4. The AI function
  movable."* (HOME29:19-21; D-86).
- Accept:
  - Each panel can be moved by pointer and by keyboard (accessibility gates it, T-009).
  - A moved panel never covers the call controls or the note it is needed beside.
  - Whether a position is remembered is a design detail for Manoj (assumption: remembered, like
    the nav in REQ-HQ-13).
- Status: built (`2a96f07`, `41ed729`). Both panels drag by their header and move by arrow keys on
  the grip, with Home to reset (`pdMovable` V2d:11119-11160). Positions are remembered
  (`pdApplySaved` V2d:11104). The floating MOA chat button drags too, and a double-click resets it
  (V2d:11187-11188).
- Priority: P1 (built; keep).

**REQ-UI-08 · Chat is a primary left-nav item. SUPERSEDED 30 Sep 2026 by REQ-UI-09.**
- The MOA chat gets its own item in the left navigation, as well as the movable panel (REQ-UI-07).
- Rationale: Ani, 29 Sep: *"I'm thinking to make chat one big menu on the left nav so it becomes
  more primary"* (HOME29:37). On 30 Sep she decided to build it alongside Daniel's movable panels.
  That was relayed in the T-010 brief (D-86).
- Accept:
  - Chat is reachable from the nav on every screen.
  - The nav stays collapsed by default (REQ-HQ-13).
  - The MOA's online presence is visible from it (REQ-HQ-16).
- Status: superseded. It was built at 10:50 on 30 Sep (`2a96f07`) and removed at 10:58 when chat
  went back to the top bar (`6553b88`). At 13:37 Ani made the MOA chat a floating button instead
  (HOME29:44-46; D-94). Kept so the ID isn't reused.

**REQ-UI-09 · The SimpleCare Assistant opens from the top bar; the MOA chat is a floating,
draggable button showing the doctor's MOA.**
- The Assistant has a top-bar button. The chat button floats at the bottom right with the MOA's
  picture, name and status, can be dragged anywhere, and remembers its spot. A drag never opens it.
- Rationale: Ani, 30 Sep: *"the **SimpleCare Assistant** is in the top bar, and the **MOA chat is the
  floating button** (the doctor's one MOA, with her picture and status). It opens a movable panel
  with one conversation and smart suggestions."* (HOME29:44-46; D-94). Daniel asked for both to be
  movable (HOME29:19-21).
- Accept: the button never covers the call controls or the last queue row it would hide (T-020
  found it covering the last visible row). Both are reachable by keyboard.
- Status: built (`c070791`, `41ed729`, `c3ca401`, `3f11454`; V2d:4461-4462, 5577-5581,
  11187-11188). The old floating Assistant launcher is hidden (V2d:4370-4371). Covering the last row
  is open in T-020.
- Priority: P1.

**REQ-UI-10 · New design work uses "SC – Design System" in Figma.**
- Its components, Mapped variables (Light and Dark), Lato text styles and Elevation styles. The
  rules in handbook section E still apply on top (red for critical only, sizes, sentence case, Mage
  icons).
- Rationale: Ani, 30 Sep (handbook rule E; `813fd68`; D-100;
  https://www.figma.com/design/XoYpGAbbNZUHkKwWDT56g3/SC---Design-System).
- Accept: a design for review names the library components and variables it uses. The primary is
  navy #2C438A in the library.
- Status: not built in v2. v2 (bright blue #4353E8, system font) and `simplecare-design-system.html`
  predate the library; v2 moves to it after the Home redesign (T-020).
- Priority: P1 (T-020).

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
- 30 Sep: DOC21 §10 narrows the fax inbox to document exceptions only (REQ-MP-06).

**REQ-MP-03 · Picking up a task is visible to the physician.**
- Rationale: see REQ-TK-03.
- Status: not built in the MOA portal. The physician side simulates it for renewals (REQ-TK-03).
- Open: OQ-41.

**REQ-MP-04 · Records or emails a patient sends for a waiting item are attached to that item.**
- Rationale: S3:93-97.
- Status: not built.
- Open: OQ-19.

**REQ-MP-05 · The MOA has one conversation for each doctor paired with her, up to 5.**
- Rationale: *"1 MOA, with the proper tools, can be paired with x 5 docs."* (MOA30:10). B-002:13:
  "MOA's side (MOA portal): a conversation for each of their doctors, up to 5." (D-93).
- Accept: the MOA sees each paired doctor's conversation, named, and can tell which need a reply.
  Five is Daniel's figure for one MOA ("x 5"); the portal does not cap it below that.
- Status: not built. MOAP's "Chatbox" button only shows a toast, "Chatbox opened with Dr. Pannozzo"
  (MOAP:270, 454). T-019 lists the MOA side as still to do.
- Priority: P2.
- Open: OQ-83.

**REQ-MP-07 · The MOA portal makes one MOA effective across several doctors, with AI help, for
tasks, billing work and CRM.**
- Each doctor has one primary MOA, the same one every time. Besides tasks and faxes, MOAs do billing
  work and CRM. The MOA portal has to let one MOA carry several doctors' work well, with AI help.
- Rationale: private strategy, 3 Oct 2026 (confidential); D-103. The billing work she may do is
  bounded by REQ-BIL-12 (demographic and clerical fields only). AI help never acts for her or for a
  doctor without a person's press (rule 18).
- Accept: to be written when "CRM" is defined (OQ-93) and the MOA's day is walked through
  (`moa` persona). From one screen she can see each paired doctor's open tasks, chat, document
  exceptions (REQ-MP-06) and billing items.
- Status: partly built. MOAP has tasks, referrals, callbacks, a fax inbox and a specialist
  directory as a demo (REQ-MP-02). No per-doctor view, billing work, CRM or AI help.
- Priority: P2.
- Open: OQ-93, OQ-83.

**REQ-MP-06 · The MOA's document queue holds exceptions only, critical signals first.**
- The MOA handles what automation can't: confirming the patient, splitting a fax, fixing a label or
  the routing, a processing failure, and a misdirected fax (which starts the privacy protocol). It
  is not a second clinical inbox. Critical-signal items sort first, then oldest first; every
  correction is recorded without erasing the machine's decision.
- Rationale: DOC21 §10 and §11 (the misdirected-fax protocol). Its proposed queue limits are 1
  business hour for a critical signal and 1 business day otherwise (OQ-85).
- Accept: a document with an identity conflict reaches the MOA, never a chart (DOC21 §7, §16).
- Status: partly built. MOAP has a fax inbox for unmatched documents (REQ-MP-02); no critical-first
  order, limits or audit.
- Priority: P2. `privacy-security` reviews the misdirected-fax path.
- Open: OQ-85.

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
  SimpleCare"* (S5:49-51, 136-140). Getting the result depends on the patient (S5:52-54). Daniel,
  26 Sep: *"The fact that i need to do this is wild"* (ANS26:55): the upload is a fallback, and the
  goal is the result from the source (D-77, REQ-IN-12). The label is "patient-supplied"
  (REQ-IN-13).
- Accept: the doctor can see that the upload arrived without searching Documents.
- Status: partly built. PP's "Add a document" ("Lab result from elsewhere…") saves to health
  records (PP:929-933, 2279-2282). It is not linked to a request, and the physician portal shows
  nothing when it arrives (S5:112-114).
- Priority: P2.
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
- 26 Sep: *"I get them to do their blood pressures, their weights etc."* (ANS26:43-44; D-75). The
  readings land in REQ-CH-32's trend.
- Status: not built.
- Priority: P2.
- Open: OQ-56, OQ-64.

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
- 26 Sep 2026, fourth run: Daniel's written answers (ANS26). 138 requirements (7 new): CH-31 (care
  plan and last-note summary at the top), CH-32 (patient-reported measurements and their trend),
  RX-10 (equal-weight send options), RX-11 (favourites), IN-12 (results from the source by API),
  IN-13 (patient uploads marked patient-supplied) and UI-06 (approving actions are sign-offs).
  Updated with his words: CH-01, CH-06, CH-20, CH-21 ("patient-reported or measured" replaced),
  CH-22 (raised), CH-23 (now fallback only), CH-29, RX-01, RX-02, RX-04, RX-07 (the build's button
  order no longer matches), IN-01, IN-11, BIL-05, PT-09 and PT-10. Priorities (P1-P3) introduced
  and set on these 23. No statuses moved; the build is still 13:10. Note: the prototype's working
  tree already holds uncommitted changes toward these answers ("Send it myself (fax)" no longer
  primary, a Favourites button, "Sign off & finalize visit"). Statuses stay on the committed build
  until those are committed.
- 30 Sep 2026, fifth run (T-010, with T-004 folded in). Daniel's round-2 answers (ANS27), his Home
  markup (HOME29) and his booking model (BOOK29), checked against the committed build V2c
  (`b8331e5`, 2026-09-30 10:33). The working tree was being edited for T-008/T-009 during this run,
  so no status is taken from it.
  - 145 requirements (7 new), one of them withdrawn.
  - New: INT-07 (open booking), INT-08 (quick-book or triage-first), INT-09 (many pathways, one
    queue), INT-10 (the AI optional), INT-11 (emergency first), UI-07 (movable panels) and UI-08
    (chat in the left nav).
  - Rewritten:
    - HQ-11: name, test and value only, and no task rows. Now not built.
    - HQ-12: Critical and High results, and no tasks. Now not built.
    - RX-07: "Ask Japneet to send", a delegation to the PA under his sign-off. Now partly built.
    - RX-10: now names Japneet. Moved to built for equal weight (`c1015e4`).
  - Updated: HQ-01 and HQ-02 (limited windows; the time beside the greeting vs its own pill), HQ-09
    (finalizing keeps the order), HQ-14 (he sometimes calls a patient immediately), CH-16 (the
    other-platform half on hold), RX-04 ("Sign off & fax"), RX-11 (favourites in Rx, managed by
    him; moved to partly built), TK-07, and UI-06 (status re-read from V2c; the delegated route has
    no sign-off).
  - Withdrawn: INT-04. Intake does not ask about other platforms (D-81).
  - Not re-checked this run: other requirements `c1015e4` may have moved, such as CH-31, CH-32,
    IN-12 and IN-13. That needs a follow-up run.
- 3 Oct 2026, sixth run (the 30 Sep inputs, plus Intake v2.3 of 2 Oct). Statuses checked against
  V2d (build 2026-09-30 20:05, `cf6207c`). The four requirement documents are cited by section or
  by their own IDs (AI-, ENG-, QS-, AC-), never pasted.
  - 172 requirements (27 new); two superseded, one withdrawn.
  - New: HQ-18 (nav open by default); CH-33 (the chart's AI workflow; blocked on Daniel's
    document); IN-14 to IN-16 (three flag levels, "Abnormal ECG" only, Not cleared / Cleared);
    IN-17 to IN-22 (document routing: chart-linked Inbox, protocols own priority, clearing a card,
    review time limits, "Updated" versions, the Overdue list); TK-12 and TK-13 (chat 1:1 with the
    paired MOA; suggestions); MP-05 and MP-06 (the MOA's conversations; document exceptions);
    UI-09 (Assistant in the top bar, MOA chat floating) and UI-10 (SC – Design System);
    INT-12 to INT-21 (Fast-Track cards, relationship routing and "Seen before", cross-coverage,
    physician pools, the emergency acknowledgement, the hard stop, the chat order, minimal intake,
    the physician summary, excluded medicines).
  - Superseded: HQ-13 (by HQ-18) and UI-08 (by UI-09).
  - Moved to built: HQ-11, HQ-12 (`2a96f07`), HQ-16 (demo presence) and UI-07 (`2a96f07`,
    `41ed729`).
  - Updated: HQ-02 (Ani decided the pill), CH-13 (the yellow card), CH-23 (DOC21 labels), CH-29
    (OQ-86), CH-31 (care plan not the focus yet; OQ-81), IN-10, INT-01, INT-08 (the pathway
    registry), INT-10 (AI-21), INT-11 (ES3 screening; OQ-79) and MP-02.
- 3 Oct 2026, seventh run (B-005, B-006 and the 3 Oct MOA model).
  - 191 requirements (19 new); two superseded, one withdrawn.
  - New: CH-34 to CH-42 (Chart View v2.5: the scan order, the snapshot with a masked PHN, the
    this-visit strip before Finalize, Needs Attention with grouping and tiers, Today and Relevant
    context, Since you last saw, Clinical threads, the visual rules, task-based acceptance);
    IN-23 (CRITICAL ECG, ECG Critical v2.0); BIL-08 to BIL-15 (Simple Billing PRD v1.5, by ID:
    attestation, AI review flags, one disposition, eligibility results, MOA field permissions, L3
    questions and the digest, deadlines, disputes and payment labels); MP-07 (one MOA across
    several doctors, with AI help, for tasks, billing and CRM).
  - CH-33 is unblocked: its accept line is now written from CV25 (OQ-82 answered).
  - Gaps against V2d named in CH-35 (full PHN, V2d:4809), CH-36 (no this-visit strip), CH-37 (the
    separate yellow card; no stages or tiers), CH-38, CH-39 and CH-41 (many cards).
  - Updated: HQ-12 (OQ-92), IN-14 (chart tiers), IN-15 (OQ-74 answered; the rule holds for
    non-critical ECGs), TK-02 and TK-12 (one primary MOA), ID-02 (masked on the chart), BIL-02
    (OQ-88, OQ-89), BIL-05 (OQ-87), BIL-07 (still no fee codes).
