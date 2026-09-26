# SimpleCare use cases

Owner: product manager agent. First written 25 Sep 2026. Scope: the physician portal in depth. The
MOA and patient portals are covered where the sources speak to them. No patient identifiers appear
here. Demo patients are described by their role in the demo, never by name.

## Source key

| Code | Source |
|---|---|
| MTG21 | `from-daniel/2026-09-21-meeting-notes.md` (line numbers as `MTG21:43`) |
| S1 | `shadowing/2026-09-25-rx-renewal-by-fax.md` (shadowing 1) |
| S2 | `shadowing/2026-09-25-medication-follow-up-mri.md` (shadowing 2) |
| S3 | `shadowing/2026-09-25-recurrent-hernia.md` (shadowing 3) |
| S4 | `shadowing/2026-09-25-weight-medication-diverticulitis.md` (shadowing 4, screen only) |
| SIA | `simplecare-stakeholder-interview-analysis.md` |
| IA | `physician-portal-ia-redesign.md` |
| HUX | `healthcare-ux-design-reference.md` |
| COMP | `simplecare-competitor-research.md` |
| SCS | `simplecare-session-changes-summary.md` |
| SPEC | `from-other-session/portal-change-spec.md` (the 15 Sep change spec) |
| DR | `product/doctor-review-2026-09-25.md` (the doctor agent's walk-through of v2) |
| V2 | `simplecare-physician-portal-v2.html`, build 2026-09-25 12:45 (line numbers as `V2:5397`) |
| V2b | the same file, build 2026-09-25 13:10, commit `d2a2823` (line numbers as `V2b:10182`) |
| MOAP | `simplecare-moa-portal.html` |
| PP | `simplecare-patient-portal-v2.html` |
| `abc1234` | a git commit; its message quotes the decision |
| MEM | Ani's project memory (`simplecare-product-model.md`), outside the repo; used only when no repo source exists |

Status words: **built** (works in v2), **partly built**, **not built**. "Production" means today's
live SimpleCare (Daysheet queue, then a chart modal), as seen in the shadowing recordings.

---

## Physician

### UC-01 Start the day on Home

- **Actor:** physician.
- **Trigger:** the doctor opens the portal before or during a call window.
- **Today (evidence):** production spreads "today" across five screens that disagree (IA:7). Daniel
  calls the current product "a developer tool" and wants it to answer "what's my job today, what's
  critical" (SIA:6). He is a visual thinker who loses track of time in hard consultations: *"when I
  don't know where I am, I get nervous."* (MTG21:66-71).
- **v2 should:** open on Home with two sections only: Needs your attention, then the Live queue
  (SPEC:34-38). The clock and the BC window state are in view on every screen (V2:3775, V2:4077).
  The four call windows show as open segments, and the running one is marked (MTG21:13, `c3c67dd`).
  Needs your attention shows only when something is critical (MTG21:10, MTG21:72-74).
- **Status:** partly built. Home (`screen-today`), `renderCriticals` (V2:6017) and the profile-pill
  clock are built. Build 13:10 fixed two gaps: a patient's intake flag folds into their critical
  result row, so there is one row per patient (V2b:6164-6172), and the "Review MRI report" task is
  gone (V2b:6812). Still open from DR:29-40: local time and BC windows are unlabelled; "Live
  queue 6" sits above 8 rows.
- **Sources:** MTG21:10-13, 64-74; SIA:6, 22; IA:44-53; SPEC:30-45; `1518976`, `392eccb`, `d2a2823`;
  DR:27-53, 218.

### UC-02 Work the live queue across call windows

- **Actor:** physician.
- **Trigger:** a call window is running; there may be 40 to 100 patients in it.
- **Today (evidence):** Daniel rejects a row cap: 40-60 patients in one window must scroll, not
  paginate (MTG21:80-81). He wants to set visit status from the list without opening the chart
  (MTG21:12, 20-21), and the columns in the order patient, visit status, billing status, health card
  (MTG21:18-19). He resisted filters (*"I'm not a big filter guy"*) and then agreed to three
  (MTG21:43-46).
- **v2 should:** follow the clock, and hold patients left over from an earlier window in a Carryover
  band (`f081c07`, SPEC:117-127). Never switch windows mid-call or mid-chart (SPEC:129-132,
  `607bd2d`). Offer three multi-select filters (visit status, billing, health card) (`887c021`,
  `056bba3`). Visit status is a dropdown with Daniel's four statuses (V2:5397, V2:6380). Whoever is
  next carries a Next marker (SPEC:207-215).
- **Status:** built (`renderQueue` V2:5772, `openStatusMenu` V2:6421, `QF_DEFS` V2:6152). Defects:
  "Doctor to Callback" is cut off in the column (DR:41-42). Daniel's new "doctor running late"
  status is not built, because he has not sent it yet (MTG21:27-28, 57-59).
- **Sources:** MTG21:12, 18-24, 43-59, 80-81; SPEC:107-216; `8546d30`, `f308201`, `c3c67dd`;
  DR:38-42.

### UC-03 Call the patient

- **Actor:** physician.
- **Trigger:** the patient is next in the window, or needs a callback.
- **Today (evidence):**
  - S1: *"Double tap for call now like fifty times. My goodness."* It was the first thing said and
    the largest friction in the recording (S1:8-9).
  - S2: the call connected cleanly, so the fault may be intermittent (S2:9-10).
  - S3: "Call Again" only reset the button, so a second press was needed to dial. The call dropped
    at about 0:25 and he redialled, and the timer restarted at 0:00. That makes four presses for one
    patient (S3:18-26).
  - S4: one press, Calling…, then Connected, with no drop (S4:35-37).
  - Two visits out of four had call trouble: S1 and S3 (S4:80-81).
  - Daniel likes branded calling, where the caller ID shows the clinic (SIA:56). A branded number
    plus a doctor-to-callback status gets *"95% contact rate"* (MTG21:86-87).
- **v2 should:** dial on one press, whatever the label. Show Calling… and then Connected with a
  timer. Show a dropped call at once ("Call dropped at 0:31 · Redial"). Count the whole contact
  across reconnects ("2 calls · 4:10") (S1:27, S3:86-88). Offer Transfer to MOA only during a live
  call (SIA:52). Calls always go outward; the patient never dials the doctor (MEM; MOAP:258 says the
  MOA line is admin only).
- **Status:** partly built. One press works and a second press does nothing (`pcStartCall`
  V2b:9397). Build 13:10 added the dropped-call line ("Call dropped at 00:31", `pcCallSum`
  V2b:9409), a Redial label, and a running total across redials ("2 calls · 04:10",
  `pcTimerText` V2b:9396). The drop is simulated from the demo switcher (`pcDropCall` V2b:9420).
  Not built: In progress is set only when the call starts from the queue (`callPatient` V2b:6372);
  the chart's own Call button does not set it (V2b:4546). Transfer is still always enabled where it
  appears (V2b:4708, 4775).
- **Sources:** S1:8-9, 27; S2:9-10; S3:18-26, 71-73, 86-88; S4:35-37, 80-81; SIA:52, 56;
  MTG21:86-87; DR:65-70; `d2a2823`.

### UC-04 Call back a missed or dropped patient

- **Actor:** physician (with the MOA).
- **Trigger:** a call was missed or dropped; the row reads Doctor to Callback.
- **Today (evidence):** Daniel merged "missed" and "dropped" into Doctor to Callback: *"Remove In
  visit, call dropped, scheduled. Have In queue, Completed, Doctor to Callback, No-Show."* (V2:5397,
  `f308201`). The callback workflow is what gets the 95% contact rate (MTG21:86-87).
- **v2 should:** let the doctor find callbacks with the visit-status filter (paired with In queue,
  `056bba3`). How the doctor calls them is open, because Call appears only on the Next row
  (SPEC:167-177) and a callback is out of order by definition (DR:249-250).
- **Status:** partly built. The status and filter are built. The recovery flow is unspecified
  (SPEC:316-319).
- **Sources:** MTG21:86-87; SPEC:167-177, 316-323; `f308201`, `9bcfefd`; DR:249-250.

### UC-05 Read the intake before calling

- **Actor:** physician.
- **Trigger:** the doctor looks at the next patient in the queue.
- **Today (evidence):**
  - S2: intake is a separate modal, so the doctor opens intake, closes it, then opens the chart
    (S2:26-27).
  - S2: a patient-written request for a referral to a named clinic in another city surprised him:
    *"What the f\*\*\* is this?"* (S2:41-42).
  - S1: the doctor asked whether they had spoken before on other platforms (*"Tia or Rocket"*),
    because "No previous notes" only covers SimpleCare (S1:10-12).
  - S2: "Prescription Renewal" was the right category, but it did not say which medication, or that
    the dose had just been titrated (S2:54-56).
  - S4: the same detour, intake modal, then close, then Access Chart (S4:18-23). The weight intake
    has the patient's own height and weight, with no BMI and nothing to compare with (S4:19-22).
  - S4: the Daysheet opened still filtered by a search from the previous patient (S4:14-17).
- **v2 should:** show the reason in the patient's words beside the category, on the row and at the
  top of the chart, with no separate modal (S2:54-58). Flag patient-written requests in the row
  (S2:68-69). A red-flag intake explains itself and sorts to the top (`1a9c71b`, `1ca73bc`). The
  intake answers are readable inside the chart, with BMI worked out from height and weight
  (S4:104-111). Opening the Daysheet clears an earlier patient search (S4:131-132).
- **Status:** partly built. The one-line AI intake summary is on every row (`874f906`, `944d26a`). A
  red-flag intake is on Home, sorts to the top, and shows on the chart banner (V2:9157). The intake
  is still a separate view ("View intake note", V2b:4641, `openBrief` V2b:6652). Request flags, the
  other-platforms question, intake inside the chart and BMI are not built.
- **Sources:** S1:10-12, 29-30; S2:7-8, 26-27, 41-42, 54-58, 68-69; S4:14-23, 104-111, 131-132;
  `1a9c71b`, `56e5f20`.

### UC-06 Renew a prescription by fax (shadowing 1)

- **Actor:** physician.
- **Trigger:** a queue row reads as a renewal. The patient ran out about a week ago and could not
  see their own doctor (S1:13-14).
- **Today (evidence):** the call took about 2.5 minutes and the doctor spent about 3 minutes in the
  chart (S1:7). Steps:
  1. Press Call many times before it dials (S1:8-9).
  2. Ask about continuity on other platforms (S1:10-12).
  3. A one-line check: *"Everything going okay?"* (S1:13-14).
  4. Plan: a three-month supply, 90 tablets or capsules, faxed to the pharmacy on the chart header
     (S1:15-16).
  5. Explain the fax confirmation to the patient out loud. The patient gets proof of delivery; the
     doctor sees no fax status (S1:17-19).
  6. After the call: prescribe, fax, a minimal note, finalize. The note never changed during the
     call (S1:20-21).
- **Friction observed:** calling; continuity lives outside the chart; no visible fax status for the
  doctor; the note is written after the call, or not at all.
- **v2 should:** keep the pharmacy in the chart header (v2 had moved it under More, which was
  wrong). Offer a renewal flow that lists the current medication, defaults to 3 months, prefills the
  pharmacy, sends by fax, shows the fax status on the visit, and drafts the one-line note
  (S1:24-28).
- **Status:** partly built. Build 13:10 rebuilt the card (`rxOpen` V2b:9930) and fixed the five DR
  defects (DR:72-86, 200-206):
  - Each patient has their own medications, pharmacy and PHN (`RX_MEDS` V2b:9894, `ptChart`
    V2b:9883). The medication rail reads the same list (`renderMedRail` V2b:10309).
  - The drug the intake names is preselected, at the last plan's dose when there is one, with "Dose
    from the <date> plan (list says …)" (`rxStateFor` V2b:9924, `rxLineFrom` V2b:9920).
  - Quantity is directions × days, never typed into the data (`rxQty` V2b:9911). Supply is 1 or 3
    months, default 3.
  - "Check before it goes" lists drug, dose, directions, quantity, days and last dispensed before
    Send (`rxReview` V2b:10014, `rxRenderReview` V2b:10023).
  - Status is "Sending to …", then "Delivered to … · patient copy sent" a few seconds later
    (`rxConfirm` V2b:10042, `rxRenderStatus` V2b:10080). The delay is a demo timer.
  - "Also active · Renew too" offers the other medications (V2b:9972-9983).
  - Not built: a failed fax and retry; any supply other than 1 or 3 months. The quantity rule waits
    on OQ-09.
- **Sources:** S1 (all); `29d956d`, `d2a2823`; V2:3751, 4424-4480, 9643-9681; V2b:9885-10095;
  DR:55-93, 200-206.

### UC-07 Follow-up where the last plan sets the renewal (shadowing 2)

- **Actor:** physician.
- **Trigger:** a renewal of a nerve-pain medication that was being titrated, plus a check on a
  pending MRI (S2:7-8).
- **Today (evidence):**
  1. The call starts cleanly (S2:9-10).
  2. The doctor spends the whole call, about 2.5 minutes, reading the previous visit's note in a
     small scrolling box. He needs its plan: the titration schedule, the side effects to ask about,
     the booked MRI, and "follow up after MRI" (S2:11-17).
  3. The note box scrolls inside the chart modal, which scrolls over the queue, which also scrolls
     (S2:18-20).
  4. The editor shows the previous note, and only a small "Back to this visit" link says so.
     "Finalize Visit" does not say which visit it finalizes (S2:21-23).
  5. The renewal dose is the titration target from the last plan: *"I'm happy to represcribe this
     three months at 300."* (S2:30-32).
  6. He asks about side effects and gets an answer, *"I'm definitely drowsy, but I work from home"*,
     and it is never recorded (S2:33-34).
  7. A medication check: *"Is the gabapentin the only medication that you need right now?"*
     (S2:35-36).
  8. *"We'll wait the MRI and we'll go from there."* (S2:37).
  9. He finalizes about 10 s after the call, with the old note still in the box and no new note
     (S2:24-25).
  10. He hands the prescription to the MOA by voice, with no confirmation: *"Can you hear me,
      Jebney, or am I talking to myself?… Guess I'm talking to myself."* (S2:38-40).
- **Friction observed:** reading the plan mid-call; nested scrolling; an ambiguous editor and
  Finalize; side effects not recorded; a voice hand-off with no receipt.
- **v2 should:**
  - Open a follow-up on "Since last visit", from the last P section plus open orders (S2:45-48).
  - Use one scroll region (S2:49-50).
  - Always say whose note is in the editor, and name what the button finalizes (S2:51-53).
  - Prefill the renewal at the current dose, with "renew too?" for the other medications (S2:59-61).
  - Make "Ask MOA to send" a one-tap task that shows "picked up" (S2:62-63).
  - Record side effects as tick-lines (S2:64-65).
  - Tie the next step to the pending result (S2:66-67).
- **Status:** partly built (build 13:10). DR:97-104 had judged v2 "worse than production here".
  - "Since last visit" shows the previous visit's Plan, Ask about and Pending, and adds any unread
    result from the Inbox to Pending (`renderSinceLast` V2b:10182).
  - "Read the <date> note" opens it read-only in place, above today's note (`slvToggle`
    V2b:10221).
  - The note box grows with its text instead of scrolling (`vcGrow` V2b:10269).
  - The button reads "Finalize today's visit" (V2b:4618).
  - The renewal takes the plan's dose, and "Ask MOA to send" shows "Picked up by <MOA>" (UC-06,
    UC-10).
  - Not built: side effects as tick-lines; the next step tied to the pending result.
- **Sources:** S2 (all); DR:95-136, 207-212; `d2a2823`.

### UC-08 Follow-up whose history spans several notes and outside records (shadowing 3)

- **Actor:** physician.
- **Trigger:** a follow-up for a query recurrent hernia. The hernia plan sits in an older note, not
  the latest one (S3:39-47).
- **Today (evidence), from the screen only, without audio (S3:7-11):**
  1. Four presses of Call, a dropped call, and a timer reset (S3:14-26).
  2. About 83 s reading the top of the latest note, which covers other problems (S3:27-30).
  3. He switches to Today's Note. It is empty, with a made-up placeholder about ear pain, and "Note
     documented at" already stamped (S3:31-35).
  4. About 1.5 minutes on the call with the note empty and no actions pressed (S3:36-38).
  5. He scrolls the chart modal into Previous Notes & Events and opens the hernia note. Its plan:
     the patient is to send previous operative reports and imaging, then the urgency of a surgical
     referral is decided (S3:39-47).
  6. That signed note still holds an unfilled template placeholder in its O section (S3:48-50).
  7. He drag-selects the A and P, perhaps to copy them. Today's note is off-screen the whole time
     (S3:51-53).
  8. The earlier note asked the patient to email details to the general support inbox (S3:54-57).
  9. The recording ends mid-call. No note, order, referral, prescription, task or finalize is
     visible (S3:58-60).
- **Friction observed:** calling; history spread across notes and an email; nothing shows whether
  the outside records arrived; reading history hides today's note; placeholders are signed unfilled.
- **v2 should:**
  - Make "Since last visit" follow today's reason across every note (S3:89-92).
  - Give outstanding requests a status, including "waiting on the patient", with the patient's email
    attached (S3:93-97).
  - Show a pending decision as a draft referral (S3:98-99).
  - Open old notes beside today's note (S3:100-101), with "Copy to today's note" per section
    (S3:102-103).
  - Ask before signing a note with bracketed placeholders (S3:104-105), and show an honestly empty
    note (S3:106-108).
- **Status:** partly built. DR:174-177: "this visit couldn't be done in v2 at all". Build 13:10
  added pieces:
  - Finalize asks first when the note is empty or holds bracketed template text (`finalizeVisit`
    V2b:7091, `vcFinWarn` V2b:10296).
  - Pending items can read "waiting on the patient" in the demo data (V2b:10163).
  - v2's note starts from the intake reason as CC (V2:9153), which matches part of S3:106-107.
  - Not built: "Since last visit" holds only the latest visit, one per patient (`PT_LAST`
    V2b:10124), so it cannot follow today's reason back two notes. Also not built: copy to today's
    note, a draft referral, and an attached patient email.
- **Sources:** S3 (all); DR:172-189; `d2a2823`.

### UC-09 Document the visit and finalize

- **Actor:** physician.
- **Trigger:** the call ends.
- **Today (evidence):** across all four recordings the note is not written during the call. The
  call is spent talking and reading, and writing happens after, or not at all (S3:63-66,
  S4:66-67). Daniel on
  documentation: *"I don't want you to spend your time now on that sick note, call ends, that's it"*
  (SIA:40). The patient leaves the queue at once on Finalize (S2:26).
- **v2 should:** close the visit on Finalize: set it Completed, lock and stamp the note, ask about
  an empty note or unfilled placeholders, open billing review if the button promises it, and offer
  the next patient (DR:213-217). Review the problem list at the end of the visit, on the way through
  billing (`632998a`).
- **Status:** built (build 13:10). `finalizeVisit` (V2b:7091) first surfaces problem-list
  suggestions. It asks before signing an empty note or one with bracketed text. It ends a live call,
  sets the row to Completed, stamps "Signed by … · read-only" and locks the note (`vcNoteState`
  V2b:10276), submits a pending claim, and offers "Next: <patient>" (V2b:4620). The button now reads
  "Finalize today's visit" (V2b:4618), so it no longer promises a billing review. See D-65.
- **Sources:** S2:21-26, 51-53; S3:63-66, 104-108; S4:66-67; SIA:40; `632998a`, `d2a2823`;
  DR:87-93, 213-217.

### UC-10 Hand work to the MOA and know it was picked up

- **Actor:** physician, then MOA.
- **Trigger:** something needs doing that the doctor will not do personally: send a prescription,
  chase records, book a follow-up.
- **Today (evidence):** the action row (Prescribe, Labs, Imaging, Referral, Send Task, Transfer)
  went nearly unused across the four recordings. Work was handed off by fax (S1), by voice (S2), or
  by asking the patient to email support (S3) (S3:74-77). S4 shows no hand-off at all (S4:82).
  Daniel does not use in-app MOA chat and uses Google Meet instead, because "70% of the time"
  coordination is complicated (SIA:38). Task categories currently read as peers of "Send to MOA"
  when they are sub-steps of it (SIA:48).
- **v2 should:** create a task only when the doctor presses Task (`9b7b5f6`, V2:1656). Route it to
  the MOA on service, copy the primary MOA, and forward it to Admin (V2:6591). Prefill it with the
  patient and context (`56e5f20`). Show that it was picked up (S2:62-63).
- **Status:** partly built. Task MOA from the chart banner, the row hover and review (`sendTaskMoa`
  V2b:7599). Build 13:10: one task function for the dialog and the renewal card, with due set from
  priority (`moaTask` V2b:10102). The renewal hand-off shows "Sent to <MOA> · waiting", then "Picked
  up by <MOA>" on a 7 s demo timer (V2b:10060-10064). Not built: "picked up" anywhere else (the
  Tasks screen does not show it), and scribe tasks are still stamped "Sep 19" (V2b:7475).
- **Sources:** S2:38-40, 62-63; S3:74-77, 95-97; S4:82; SIA:28-38, 48; `9b7b5f6`, `afdc728`,
  `11b0ecb`, `d2a2823`; DR:121-128.

### UC-11 Keep my own unfinished work on my desk

- **Actor:** physician.
- **Trigger:** the doctor cannot finish something in the moment.
- **Today (evidence):** Daniel's policy is same-day by default (*"if something is not done in a day,
  you'd better have a good reason"*). His own carried items *"shouldn't mix with that. Yours should
  stay on your dashboard"* (SIA:30). He dislikes Oscar's "tickle" and floated "remind me later"
  (SIA:22, 54). Scheduled deferral was rejected: *"We wouldn't defer to next week."* (`9b7b5f6`).
- **v2 should:** keep personal tasks separate from delegated ones, and keep them in view on Home
  (SIA:32).
- **Status:** partly built. The Task dialog can keep a task as the doctor's own (`tm-keep`,
  V2:5108), and Tasks filters "Assigned to Dr. Pannozzo" (V2:7071). Home does not show personal
  tasks unless they are urgent, high or overdue (V2:5922). See the contradiction logged in
  `decisions.md`.
- **Sources:** SIA:26-34, 54; SCS:7; `8e14497`, `9b7b5f6`, `11b0ecb`.

### UC-12 Review a critical result

- **Actor:** physician.
- **Trigger:** a critical lab arrives, for example one on the LifeLabs BC critical list.
- **Today (evidence):** Daniel: *"anything critical, what has to happen? Contact the patient."* and
  *"I don't want the doctor clicking a bunch of stupid buttons."* (`2094417`). Needs your attention
  is *"the stuff that I paused my clinic and did before anything else"* (`aa1e8b8`).
- **v2 should:**
  - Open the result on a drafted follow-up: action, plan, contact instructions, with an
    emergency-contact fallback. Every field is editable (`2094417`).
  - Commit with Accept & assign, which files one MOA task linked to the source (`2094417`,
    SPEC:59-66).
  - Make closing without follow-up take a second deliberate step (`e270f7c`).
  - Show the patient's other waiting results (`e270f7c`).
  - When the patient is in today's queue, offer "Call now" (DR:195-199).
  - Put the critical result on the patient's chart (DR:147-151).
- **Status:** built (build 13:10). Review, drafts and escalation (`openReview` V2b:8697, `rvAccept`
  V2b:8913). "Call now" shows on a drafted review when the patient is in today's queue, and opens
  the chart on the call (`rvQueueRow` V2b:8961, V2b:8998-9006). It is a secondary button beside
  Accept & assign; which is primary is OQ-11. A critical or high result not yet signed off sits at
  the top of that patient's chart, with "Review result" and "Also in today" (`renderChartAlerts`
  V2b:10237). This closes the gap DR:147-151 called "the biggest risk I found".
- **Sources:** `2094417`, `aa1e8b8`, `392eccb`, `e270f7c`, `f241a4b`, `d2a2823`; DR:138-153,
  195-199.

### UC-13 Clear routine results and sign off

- **Actor:** physician.
- **Trigger:** routine results accumulate in the Inbox.
- **Today (evidence):** Daniel wants every test result, lab, imaging report and consult note
  reviewed and individually signed off (SIA:22). Lab work is the foundation. Imaging and consult
  reports rarely need urgent review (MTG21:75-77).
- **v2 should:**
  - Show Needs review / Awaiting sign-off / Signed off as tabs (`07dd1ae`).
  - Use three bands, with FIFO inside each band and never across bands (MTG21:50-52).
  - Show the clinic received time (MTG21:78-79).
  - Show the name only on rows (`236eed3`).
  - Close a routine result with one "No follow-up" and move to the next one (DR:157).
- **Status:** partly built. Tabs, bands, FIFO, received time and sign-off are built. Build 13:10: a
  routine "No follow-up" opened from the Inbox lands on the next result (`rvNo` V2b:8951), and review
  has a "Next result" button (`rvNextResult` V2b:8972). Batch sign-off is not built.
- **Sources:** MTG21:47-52, 75-79; SIA:22-24; SCS:17; `8444fe4`, `133c966`, `07dd1ae`, `535ad1a`,
  `d2a2823`; DR:155-170.

### UC-14 Go from a result straight into the chart, with the reason on top

- **Actor:** physician.
- **Trigger:** a result that has work attached to it.
- **Today (evidence):** Daniel: *"i wouldn't mind a fast track into the chart. Then the chart
  reminds me ... hey stupid, you were working her up for Dyspepsia."* (V2:8486, `632998a`).
- **v2 should:** offer Open chart from the result and show a "Where this came from" line on arrival.
  It should show whatever door the doctor came in by (DR:113-115).
- **Status:** partly built (`fastTrack` V2:8490). The recall appears only when arriving from the
  Inbox.
- **Sources:** `632998a`, `aa1e8b8`; DR:113-115.

### UC-15 Keep the problem list and care plan true

- **Actor:** physician.
- **Trigger:** labs, medications or consult letters imply a condition; a specialist makes
  recommendations.
- **Today (evidence):** the care plan is *"more narrative"*. Tasks are *"just the shit that I gotta
  do, even if at the time I do it I don't remember why"* (`afdc728`). They are distinct (`9b7b5f6`).
  The Care Plan Tracker is *"a chart view tool ... an in the moment refresher"* (`11b0ecb`).
- **v2 should:** suggest additions with their evidence, have them land nowhere until approved, and
  log every change (`11b0ecb`, `74660d7`). Keep specialist-owned items with the specialist
  (`2b4ea14`).
- **Status:** built (conditions panel, care plan block). DR:109-110 found the care plan and the
  medication list disagreeing for one demo patient. Build 13:10 has the rail and the Medications tab
  read the renewal card's list (`renderMedRail` V2b:10309).
- **Sources:** `2b4ea14`, `afdc728`, `9b7b5f6`, `11b0ecb`, `74660d7`, `632998a`; DR:106-112.

### UC-16 Act on billing from the queue and from Claims

- **Actor:** physician (the MOA chases private payments, V2:5389).
- **Trigger:** a visit closes; a claim is rejected or queried.
- **Today (evidence):** *"Claims are so important that i want that front and center"* and *"Leave no
  claim behind."* (`27c18b3`, `11b0ecb`). Daniel gave both status vocabularies (`3c5f4fe`,
  `c0cae95`).
- **v2 should:** make billing status the way in: an actionable state is a dropdown whose next step
  comes first, and a finished state is plain text (`944d26a`, `5d36fa1`, V2:6428). Put Claims in the
  nav with a neutral count (`74660d7`).
- **Status:** built (`openBilling` V2:6328, `renderClaims` V2:6261). "Finalize & review billing"
  does not open a billing review (DR:87-88). Fee codes and amounts in the demo are placeholders
  (V2:6246-6254), not rules.
- **Sources:** `27c18b3`, `3c5f4fe`, `c0cae95`, `944d26a`, `2983802`, `5d36fa1`, `9b496d2`;
  SPEC:297-300.

### UC-17 Confirm who the patient is, and how they pay

- **Actor:** physician (and the MOA to fix coverage).
- **Trigger:** every call; every claim.
- **Today (evidence):**
  - Preferred name first and legal name secondary; misgendering causes real harm (SIA:46).
  - DOB and PHN come out of the list view (MTG21:82).
  - Health-card status is Daniel's term, with four states (`3c5f4fe`, `c0cae95`).
  - On a renewal the doctor confirms identity out loud (DR:59-60).
- **v2 should:** keep preferred name first. Keep identifiers on the chart and on the source
  document, not on list rows (`236eed3`). A verified card stays quiet; "check required" and
  "invalid" open the cause and the way out (`944d26a`). The chart must match the queue row
  (DR:59-63).
- **Status:** partly built. The vocabulary and quiet-when-verified are built. Build 13:10 gives each
  patient their own PHN and pharmacy (`ptChart` V2b:9883). Age and sex on the banner were not
  re-checked (DR:59-63). There is no returning-patient indicator (SIA:46).
- **Sources:** SIA:46; MTG21:82; `3c5f4fe`, `236eed3`, `9d298c7`; DR:59-63.

### UC-18 See a patient the queue did not book (Add-On, New patient)

- **Actor:** physician.
- **Trigger:** the doctor needs to call someone who is not in the patient-initiated queue.
- **Today (evidence):** the spec makes Add-On the sanctioned path for a doctor-initiated call:
  callable at once, with no queue position (SPEC:245-256). Add-on patients are logged as encounters,
  not visits (SCS:9).
- **Status:** partly built (`openAddOn` V2:8138 records an encounter). Add-On is not wired to Claims
  (SCS:49). Registration lives on Home as New patient (`944d26a`).
- **Sources:** SPEC:245-256, 316-323; SCS:9, 49; `944d26a`.

### UC-19 Let the scribe draft the note

- **Actor:** physician (the patient consents).
- **Trigger:** a call starts and the patient agrees to be recorded.
- **Today (evidence):** the note is not written during the call (S3:63-66). Daniel called AI
  documentation *"the thing we have to do to compete"* but put it in phase two (SIA:40, 62).
- **v2 should:** capture nothing without consent. The scribe proposes and the doctor presses: *"The
  doctor decide what is a Task. By pressing Task button. always."* Every proposal links to the
  moment it came from (`1b201eb`, V2:1656, V2:7157).
- **Status:** built as a demo inside "This visit" (`1b201eb`). DR:148-151: for the demo's
  critical-troponin patient, the scribe drafts "stable angina" because the chart lacks the result.
- **Sources:** SIA:40, 62; `1b201eb`; DR:147-151.

### UC-20 Go off service

- **Actor:** physician.
- **Trigger:** holiday or time away.
- **Today (evidence):** *"Off Service is just so that your patients know where you are and don't
  call the clinic that often."* (V2:7136, `9b7b5f6`). Call-group coverage is future work (SIA:14).
- **Status:** built (`toggleService` V2:7140).
- **Sources:** `9b7b5f6`; SIA:14, 62.

### UC-26 A new problem in an established patient, read through uploaded lab PDFs (shadowing 4)

- **Actor:** physician (the MOA uploads the documents; assumption, see OQ-48).
- **Trigger:** a queue row with the category "Weight Loss". The intake asks for medication-assisted
  weight loss, lists type 2 diabetes or prediabetes and joint problems, and says a GLP-1 was tried
  before (S4:14-22). The patient's earlier notes are about unrelated problems (S4:28-31).
- **Today (evidence), from the screen only, without audio (S4:7-11):**
  1. The Daysheet opens still filtered by the previous patient's search. He clears it (S4:14-17).
  2. Intake in its own modal, then close, then Access Chart. The intake has the patient's own
     height and weight, no BMI, and no earlier weight to compare with (S4:18-23).
  3. Today's note is empty, with the made-up ear-pain placeholder, and already stamped "Note
     documented" (S4:24-27).
  4. Opening "Previous Notes & Events" pushes the action row and today's note out of view
     (S4:28-31).
  5. He reads the latest note (iron deficiency), before and after the call connects, for about
     45 s. Nothing in it is about weight (S4:32-39).
  6. The call connects on one press (S4:35-37).
  7. Labs → Results shows "Lab Documents": PDFs all named "Custom Lab — <date> — Reported.pdf", all
     dated by the upload day, not in date order, with two identical names. View and delete show only
     on hover, side by side (S4:40-45).
  8. He opens files one at a time: a year-old report from other physicians; a file holding one
     cancelled test; an eye click that opens nothing; then the twin file, which is the report with
     glucose (flagged), lipids, kidney and TSH (S4:46-56). The viewer's header shows the same internal
     file id for every file (S4:56-58).
  9. Closing the viewer resets the list to the top (S4:59-60).
  10. 2 min 20 s on the call with the lab list open, no clicks. The recording ends mid-call with no
      note, prescription, order, referral, task or finalize (S4:61-63).
- **Friction observed:** a stale search; the intake detour; the chart opens on the wrong note for a
  new reason; results are files, not data; unsorted, misnamed and duplicated uploads; no weight
  trend; the list loses its place; the note is never touched.
- **v2 should:**
  - When no earlier note touches today's reason, "Since last visit" says so ("First visit for
    weight") and shows that reason's context: intake answers, weight history, latest relevant labs.
    The unrelated last plan drops to one line (S4:105-107).
  - Show weight over time, each reading marked patient-reported or measured, with BMI and the change
    since the first reading (S4:108-111).
  - Show each test with its earlier values and dates in one line, and a preset group first for a
    weight or diabetes reason (S4:112-115).
  - Name uploaded reports by collection date and tests, sort newest collection first, flag
    duplicates, mark a cancelled-only report, and name the report in the viewer (S4:116-121).
  - Say when the latest relevant labs are over a year old, and offer a prefilled requisition as a
    draft the doctor sends (S4:122-124).
  - Keep the list's place after the viewer closes; show view always; keep delete behind the row's
    menu (S4:125-127).
  - Answer the intake's "GLP-1 tried before" from the medication history, or say "not on file"
    (S4:128-130).
  - Clear a stale patient search when the Daysheet opens (S4:131-132).
- **Status:** not built. What v2 has:
  - The call and the honest empty note already work (S4:88-94).
  - Critical results reach the chart (`renderChartAlerts` V2b:10237), but nothing here was critical.
  - Results is a static list of lines with a value and a flag, the same for every patient
    (`vcp-results` V2b:4659-4663). It has no history per test.
  - "Last vitals" holds one static weight (V2b:4643-4650).
  - Documents is an empty placeholder (`vcp-docs` V2b:4672).
  - "Since last visit" would show the latest, unrelated plan (`renderSinceLast` V2b:10182;
    S4:99-100).
  - The intake is still a separate view (V2b:4641).
- **Sources:** S4 (all); V2b as cited.

---

## MOA

### UC-21 Work the tasks physicians send

- **Actor:** MOA.
- **Trigger:** a physician presses Task.
- **Today (evidence):** S2 shows the MOA receiving a spoken instruction with no confirmation back
  (S2:38-40). The MOA carries her unfinished tasks forward, and the doctor looks them up later
  (SIA:30).
- **v2 should:** the MOA can reply on a task, mark it done, or ask a question, but cannot open a new
  task to the doctor (MOAP:258). The doctor sees when the task is picked up (S2:62-63).
- **Status:** partly built. MOAP has Tasks with Open / In progress / Completed and Reply
  (MOAP:255-270, 450). Nothing sends a "picked up" signal back to the physician portal.
- **Sources:** SIA:28-34; MOAP:255-270, 424-451; `9b7b5f6`; S2:38-40, 62-63.

### UC-22 Chase referrals, records and faxes

- **Actor:** MOA.
- **Trigger:** a referral bounces, a fax cannot be matched, a patient must be called back, or a
  patient's records arrive.
- **Today (evidence):** Daniel's example is a referral that bounced back and keeps cycling. He calls
  this "a genuine patient-safety mechanism" (SIA:34). S3: the patient was asked to email the support
  inbox, and nothing shows whether the records arrived (S3:54-57, 78-80).
- **v2 should:** attach a patient's email to the waiting plan item, not leave it in the general
  inbox (S3:93-97).
- **Status:** partly built. MOAP has a referral pipeline, imaging, callbacks, a fax inbox and a
  specialist directory (`a0d31ca`, MOAP:214, 463). Linking an email to a plan item is not built.
- **Sources:** SIA:34; S3:54-57, 78-80, 93-97; `a0d31ca`.

---

## Patient

### UC-23 Wait in the queue for the doctor's call

- **Actor:** patient.
- **Trigger:** the patient has booked a call window.
- **Today (evidence):** competitors run slot bookings and field complaints about doctors calling
  late. None shows a live queue (COMP:9-13). Daniel wants the queue number, not a wait duration
  (`8cd0893`).
- **v2 should:** show the queue position and the states: waiting, next, in visit, delayed, missed,
  dropped, done, no-show (IA:15, PP:1951-1976). Daniel's coming "doctor running late" status adds an
  automated SMS and email (MTG21:57-59).
- **Status:** partly built. The states are in PP. PP also shows an estimated call time and "about 25
  minutes behind" (PP:1953, 1962), which conflicts with `8cd0893`; see `open-questions.md`.
- **Sources:** COMP:9-23; IA:15; MTG21:27-28, 57-59; PP:1951-1976; `8cd0893`, `874f906`.

### UC-24 Book a visit and complete intake

- **Actor:** patient.
- **Trigger:** the patient needs care, either a one-off concern or an ongoing family doctor.
- **Today (evidence):** episodic patients *"want you to fix the problem, they move on"*, while
  comprehensive care pairs a patient with one doctor (SIA:16). Pain clusters at scheduling and
  intake (HUX:9).
- **v2 should:** fork into walk-in or family practice. Keep the concern grid as the default and put
  Family Practice above it (SCS:21, 25-27).
- **Status:** built in PP and the landing flow (SCS:21-29). Trusted Person is parked (SCS:27).
- **Sources:** SIA:12-18; HUX:7-12; SCS:19-29.

### UC-25 Follow my results and tests

- **Actor:** patient.
- **Trigger:** tests were ordered or results came back.
- **Today (evidence):** *"I want the patient to know as well"* (`c503ece`). Patients want plain
  language (HUX:11).
- **v2 should:** name every ordered test and its state, and say who moves next ("our office will
  call you"). No red, and no clinical flags (`5a4fb10`). No visit summaries or physician notes
  (`5a4fb10`).
- **Status:** partly built. PP's "done" queue state still offers "View visit summary" (PP:1973),
  which conflicts with `5a4fb10`.
- **Sources:** `5a4fb10`, `c503ece`; HUX:11, 18; PP:860, 1970-1973.

---

## Patterns across the shadowing visits

Four recordings, all 25 Sep 2026, all current production. S3 and S4 are screen only, with no audio.

| Pattern | S1 | S2 | S3 | S4 | Use cases |
|---|---|---|---|---|---|
| The note is not written during the call | yes | yes | yes | yes | UC-09, UC-19 |
| The call is spent reading | no | old note | old notes | note, then PDFs | UC-07, 08, 26 |
| The latest note is the wrong place | n/a | no | yes | yes | UC-08, 26 |
| What he needs comes from outside | platforms | no | op reports | outside labs | UC-05, 08, 26 |
| Call trouble | yes | no | yes | no | UC-03 |
| Action row unused; hand-off by | fax | voice | patient email | none seen | UC-10 |
| Nested scrolling hides today's note | no | yes | yes | yes, 5 regions | UC-07, 08, 26 |
| Entry detours | no | intake | no | intake, search | UC-05 |

- **The note, 4 out of 4.** Nothing is typed during any call. In S4 today's note was on screen for
  about one second (S1:20-21; S2:24-25; S3:63-66; S4:66-67).
- **Reading, not doing.** Follow-ups (S2, S3) need the last plan. A new reason (S4) needs data the
  notes do not hold: a weight history, recent metabolic labs, the earlier GLP-1 (S4:68-73). So
  "Since last visit" has to fit today's reason, not only the latest note (REQ-CH-01, REQ-CH-20).
- **Results are files, not data (new in S4).** Generic names, upload dates, no order, duplicates,
  one file at a time, and no test beside its earlier values (S4:74-77). See REQ-CH-21 to REQ-CH-23.
- **Calling, 2 out of 4.** Clean in S2 and S4, wrong in S1 and S3 (S4:80-81).
- **The action row, 4 out of 4.** Barely touched during any call (S3:71-77; S4:82).
- **Nested scrolling.** S4 had five scroll regions, and opening history or results pushed today's
  note off-screen, as in S3 (S4:83-85).

## Changelog

- 25 Sep 2026, first run: wrote UC-01 to UC-25 from all listed sources, the v2 prototype, git
  history to `0e413e6`, and the doctor review (DR). The three shadowing visits are UC-06, UC-07 and
  UC-08.
- 25 Sep 2026, second run: added S4 (shadowing 4) and V2b (build 13:10, `d2a2823`) to the source
  key. New UC-26 for shadowing 4. New section "Patterns across the shadowing visits" (four visits).
  Statuses moved for build 13:10: UC-09 and UC-12 to built; UC-07 and UC-08 to partly built. UC-01,
  UC-03, UC-06, UC-10, UC-13, UC-15 and UC-17 stay partly built or built, with the new functions
  named. S4 evidence added to UC-03, UC-05, UC-09 and UC-10.
