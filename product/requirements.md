# SimpleCare requirements

Owner: product manager agent. First written 25 Sep 2026. The source codes are the same as in
`use-cases.md`: MTG21, S1-S3, SIA, IA, HUX, COMP, SCS, SPEC, DR, V2, MOAP, PP, MEM and commit
hashes. "Assumption" marks a claim with no source. Status: **built** (works in v2), **partly
built**, **not built**. "Open" names the open questions that block a requirement (see
`open-questions.md`). This file sets no clinical thresholds, doses or billing codes. Where one is
needed, it points to an open question.

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
- Status: partly built. The intake-flag row is static markup (V2:4110-4121), and "Review MRI report"
  remains in the task data (DR:47-48).
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

---

## Call (CALL)

**REQ-CALL-01 · One press dials.**
- A press dials whatever the button's label. A second press during a call does nothing. The state is
  visible: Calling…, then connected with a timer.
- Rationale: *"Double tap for call now like fifty times."* (S1:8-9). "Call Again" only reset the
  button (S3:18-20).
- Accept: from rest, one press reaches Calling…; there is no reset-only press.
- Status: built (`pcStartCall` V2:9195, `29d956d`).

**REQ-CALL-02 · A dropped call is shown at once.**
- The pill changes to "Call dropped at m:ss · Redial". The doctor never learns of a drop from
  silence.
- Rationale: S3:22-26, 86-88.
- Accept: a drop changes the call state within a second, and one press redials.
- Status: not built (DR:69-70).
- Open: OQ-06, OQ-21.

**REQ-CALL-03 · The timer counts the whole contact across reconnects ("2 calls · 4:10").**
- Rationale: *"the timer restarts from 0:00, so the screen no longer shows how long he has been with
  the patient."* (S3:24-25).
- Accept: a redial keeps the running total.
- Status: not built.

**REQ-CALL-04 · Starting a call from the chart sets the visit to in progress.**
- Rationale: DR:67-68.
- Accept: the queue row reflects the call whichever door it was started from.
- Status: not built.

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
- Status: not built (DR:97-104).
- Open: OQ-37.

**REQ-CH-02 · Older notes open read-only beside today's note, and the chart has one scroll region.**
- Rationale: nested scrolling (S2:18-20, S3:81-83). Reading history pushed today's note off-screen
  (S3:39-42).
- Accept: no box-inside-box scrolling; today's note stays in view while an older one is open.
- Status: not built. v2 has no openable previous note (DR:97-100).
- Open: OQ-20.

**REQ-CH-03 · The editor always says whose note it is.**
- The primary button names what it does ("Finalize today's visit").
- Rationale: S2:21-23, 51-53.
- Accept: an older note is never shown inside today's editor.
- Status: partly built. "This visit" holds only today's note; the button reads "Finalize & review
  billing".
- Open: OQ-17.

**REQ-CH-04 · "Copy to today's note" on each section of an older note.**
- Precaution lines arrive as tick-lines.
- Rationale: the doctor drag-selected A and P instead (S3:51-53, 102-103).
- Status: not built.

**REQ-CH-05 · An empty note looks empty.**
- The placeholder is neutral, or the note starts from the intake reason as CC. There is no invented
  clinical example. "Documented at" appears only after the first word.
- Rationale: S3:31-35, 106-108.
- Status: partly built. The note is prefilled "Patient presents for <reason>." (V2:9153), and the
  placeholder is neutral.

**REQ-CH-06 · Finalize closes the visit.**
- It sets Completed, locks and stamps the note, opens billing review when the label promises one,
  and offers the next patient.
- Rationale: in production the patient leaves the queue at once (S2:26). v2 shows a toast only
  (DR:87-91).
- Accept: after Finalize the row reads Completed and the note is read-only.
- Status: partly built (`finalizeVisit` V2:6947).
- Open: OQ-17.

**REQ-CH-07 · Ask before finalizing an empty note, or a note with bracketed template text.**
- Rationale: S2:53; a signed note carried "[document findings …]" (S3:48-50, 104-105).
- Accept: the prompt marks the line to fill or remove.
- Status: not built.
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
- Rationale: S3:78-80, 93-97. v2 owners are only GP or specialist (DR:178-180).
- Accept: "asked 3 weeks ago, not received" is readable beside the reason. Nothing becomes a task on
  its own (S3:95-97).
- Status: not built.
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
- Status: not built.

**REQ-CH-14 · The "Where this came from" recall shows whatever door the doctor came in by.**
- Rationale: `632998a`; DR:113-115.
- Status: partly built (from the Inbox only, `fastTrack` V2:8490).

**REQ-CH-15 · Chart data is the patient's own.**
- PHN, medications, pharmacy, age and sex match the queue row and the patient's documents.
- Rationale: in a demo to doctors, a PHN mismatch reads as a wrong-patient error (DR:61-63).
- Status: not built (demo data defect).

**REQ-CH-16 · Continuity is visible.**
- A returning-patient indicator, and whether the patient was seen on another platform.
- Rationale: SIA:46; S1:10-12.
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
  V2:1656).
- Status: built as a demo.
- Open: OQ-31.

---

## Prescribing (RX)

**REQ-RX-01 · A renewal is one flow.**
- The current medication, a supply choice, the pharmacy on file, Send, the fax status on the visit,
  and a one-line note drafted.
- Rationale: S1:26-28; `29d956d`.
- Accept: a renewal completes from the chart without leaving "This visit".
- Status: partly built (`rxOpen` V2:9643).
- Open: OQ-08.

**REQ-RX-02 · The quantity is correct for the directions.**
- The supply buttons do not fix the tablet count whatever the dosing.
- Rationale: twice daily for 3 months was sent as 90 tablets, and the note recorded it (DR:75-77).
- Accept: to be set by OQ-09. Until then, quantity is its own field and is never inferred.
- Status: not built (defect).
- Open: OQ-09.

**REQ-RX-03 · The renewal is prefilled from the intake and the last plan.**
- It preselects the drug the patient asked for, at the current (titration-target) dose, with
  strength shown.
- Rationale: S2:30-32, 59-61; DR:78, 121-123.
- Status: not built. The card lists fixed demo medications (V2:9645).
- Open: OQ-09.

**REQ-RX-04 · A summary is confirmed before Send.**
- Drug, strength, directions, quantity, pharmacy.
- Rationale: a pharmacy fax cannot be taken back (DR:79-80).
- Status: not built.

**REQ-RX-05 · Real fax states are shown.**
- Queued, sending, then delivered or failed, with a retry.
- Rationale: the doctor explains fax delivery to the patient but has no status himself (S1:17-19).
  v2 says "delivered" instantly (DR:81-83).
- Status: not built.

**REQ-RX-06 · Other active medications are offered with "renew too?".**
- Rationale: *"Is the gabapentin the only medication that you need right now?"* (S2:35-36, 59-61).
- Status: not built.

**REQ-RX-07 · "Ask MOA to send" is on the renewal card.**
- It files the task with the drug filled in, and shows "Sent to <MOA> → picked up".
- Rationale: S2:38-40, 62-63.
- Status: not built.
- Open: OQ-08, OQ-41.

**REQ-RX-08 · The last-dispensed date shows on the card.**
- Rationale: the queue's AI line already knows it (DR:84).
- Status: not built.

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
- Status: not built. `rvDone(true)` exists but nothing calls it (DR:157).
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
- Status: not built.
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
- Rationale: *"Can you hear me, Jebney, or am I talking to myself?"* (S2:38-40, 62-63).
- Status: not built.
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
- Status: not built (defect).
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
- Rationale: S2:26-27, 54-58.
- Status: partly built. There is an AI line on the row, and "View intake note" still opens a
  separate view (V2:4509).

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
- Rationale: S1:10-12, 29-30.
- Status: not built.
- Open: OQ-18.

**REQ-INT-05 · The AI intake summary is marked as machine-written.**
- Rationale: *"so nobody mistakes a machine summary for a colleague's note"* (`944d26a`).
- Status: built.

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
- Status: not built.

**REQ-BIL-05 · Leave no claim behind: signing the visit submits its claim.**
- Rationale: `11b0ecb`, `632998a`.
- Status: partly built (only when the demo bill state is pending, V2:6955).

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
- Status: not built (see REQ-CH-15).

**REQ-ID-04 · Health card: Verified is quiet; Check required and Invalid card open the cause and the
way out.**
- Rationale: *"a mistyped number versus a cancelled card are different problems"* (`944d26a`);
  `f0fe73f`.
- Status: built. The explanatory copy in the modal (V2:5351-5370) is an assumption, not Daniel's
  text.

**REQ-ID-05 · A returning patient is marked.**
- Rationale: SIA:46.
- Status: not built.

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
- Status: not built.
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

---

## Changelog

- 25 Sep 2026, first run: 114 requirements across 13 areas, each with a source and a status against
  v2 build 2026-09-25 12:45. Defects and gaps from the doctor review (DR) are folded in: HQ-15,
  CALL-02 to CALL-04, CH-13, CH-15, RX-02 to RX-08, IN-11, TK-09 and BIL-04.
