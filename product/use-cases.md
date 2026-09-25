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
| SIA | `simplecare-stakeholder-interview-analysis.md` |
| IA | `physician-portal-ia-redesign.md` |
| HUX | `healthcare-ux-design-reference.md` |
| COMP | `simplecare-competitor-research.md` |
| SCS | `simplecare-session-changes-summary.md` |
| SPEC | `from-other-session/portal-change-spec.md` (the 15 Sep change spec) |
| DR | `product/doctor-review-2026-09-25.md` (the doctor agent's walk-through of v2) |
| V2 | `simplecare-physician-portal-v2.html`, build 2026-09-25 12:45 (line numbers as `V2:5397`) |
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
  clock are built. Gaps found by DR:29-53: local time and BC windows are unlabelled; "Live queue 6"
  sits above 8 rows; one patient takes two attention rows; "Review MRI report" is still in the task
  data.
- **Sources:** MTG21:10-13, 64-74; SIA:6, 22; IA:44-53; SPEC:30-45; `1518976`, `392eccb`; DR:27-53.

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
  - Two visits out of three had call trouble (S3:71-73).
  - Daniel likes branded calling, where the caller ID shows the clinic (SIA:56). A branded number
    plus a doctor-to-callback status gets *"95% contact rate"* (MTG21:86-87).
- **v2 should:** dial on one press, whatever the label. Show Calling… and then Connected with a
  timer. Show a dropped call at once ("Call dropped at 0:31 · Redial"). Count the whole contact
  across reconnects ("2 calls · 4:10") (S1:27, S3:86-88). Offer Transfer to MOA only during a live
  call (SIA:52). Calls always go outward; the patient never dials the doctor (MEM; MOAP:258 says the
  MOA line is admin only).
- **Status:** partly built. One press works and a second press does nothing (`pcStartCall` V2:9195,
  `29d956d`). Not built: the dropped-call state, the running total, and setting In progress when a
  call starts from the chart (DR:65-70). Transfer is absent from chart version C and always enabled
  in the other layouts (V2:4576, 4643, 4832).
- **Sources:** S1:8-9, 27; S2:9-10; S3:18-26, 71-73, 86-88; SIA:52, 56; MTG21:86-87; DR:65-70.

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
- **v2 should:** show the reason in the patient's words beside the category, on the row and at the
  top of the chart, with no separate modal (S2:54-58). Flag patient-written requests in the row
  (S2:68-69). A red-flag intake explains itself and sorts to the top (`1a9c71b`, `1ca73bc`).
- **Status:** partly built. The one-line AI intake summary is on every row (`874f906`, `944d26a`). A
  red-flag intake is on Home, sorts to the top, and shows on the chart banner (V2:9157). The intake
  is still a separate view ("View intake note", V2:4509, `openBrief`). Request flags and the
  other-platforms question are not built.
- **Sources:** S1:10-12, 29-30; S2:7-8, 26-27, 41-42, 54-58, 68-69; `1a9c71b`, `56e5f20`.

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
- **Status:** partly built. The "Renew a prescription" card opens from "+ Renew prescription"
  (`rxOpen` V2:9643, `29d956d`). The pharmacy is in the banner (V2:4422). The note line writes
  itself. Defects DR found (DR:72-86):
  - 90 tablets is tied to 3 months whatever the directions, so a twice-daily drug is prescribed
    short.
  - The card defaults to a drug the intake did not name.
  - There is no summary to confirm before Send.
  - "Delivered" appears the instant Send is pressed.
  - Every chart shows the same medications, pharmacy and PHN.
- **Sources:** S1 (all); `29d956d`; V2:3751, 4424-4480, 9643-9681; DR:55-93.

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
- **Status:** not built. v2 has no openable previous note and no "Since last visit". DR:97-104
  judges v2 "worse than production here". The care plan block holds the right material for some demo
  patients (DR:106-108).
- **Sources:** S2 (all); DR:95-136.

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
- **Status:** not built. DR:174-177: "this visit couldn't be done in v2 at all". v2's note starts
  from the intake reason as CC (V2:9153), which matches part of S3:106-107.
- **Sources:** S3 (all); DR:172-189.

### UC-09 Document the visit and finalize

- **Actor:** physician.
- **Trigger:** the call ends.
- **Today (evidence):** across all three recordings the note is not written during the call. The
  call is spent talking and reading, and writing happens after, or not at all (S3:63-66). Daniel on
  documentation: *"I don't want you to spend your time now on that sick note, call ends, that's it"*
  (SIA:40). The patient leaves the queue at once on Finalize (S2:26).
- **v2 should:** close the visit on Finalize: set it Completed, lock and stamp the note, ask about
  an empty note or unfilled placeholders, open billing review if the button promises it, and offer
  the next patient (DR:213-217). Review the problem list at the end of the visit, on the way through
  billing (`632998a`).
- **Status:** partly built. `finalizeVisit` (V2:6947) surfaces problem-list suggestions and submits
  a pending claim. It sets no status, locks nothing, never opens billing, and does not check the
  note (DR:87-93).
- **Sources:** S2:21-26, 51-53; S3:63-66, 104-108; SIA:40; `632998a`; DR:87-93, 213-217.

### UC-10 Hand work to the MOA and know it was picked up

- **Actor:** physician, then MOA.
- **Trigger:** something needs doing that the doctor will not do personally: send a prescription,
  chase records, book a follow-up.
- **Today (evidence):** the action row (Prescribe, Labs, Imaging, Referral, Send Task, Transfer)
  went nearly unused across the three recordings. Work was handed off by fax (S1), by voice (S2), or
  by asking the patient to email support (S3) (S3:74-77). Daniel does not use in-app MOA chat and
  uses Google Meet instead, because "70% of the time" coordination is complicated (SIA:38). Task
  categories currently read as peers of "Send to MOA" when they are sub-steps of it (SIA:48).
- **v2 should:** create a task only when the doctor presses Task (`9b7b5f6`, V2:1656). Route it to
  the MOA on service, copy the primary MOA, and forward it to Admin (V2:6591). Prefill it with the
  patient and context (`56e5f20`). Show that it was picked up (S2:62-63).
- **Status:** partly built. Task MOA from the chart banner, the row hover and review (`sendTaskMoa`
  V2:7428). There is no "picked up" state, and due dates are hard-coded (DR:124-128).
- **Sources:** S2:38-40, 62-63; S3:74-77, 95-97; SIA:28-38, 48; `9b7b5f6`, `afdc728`, `11b0ecb`;
  DR:121-128.

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
- **Status:** partly built. Review, drafts and escalation are built (`openReview` V2:8536,
  `rvAccept` V2:8752). Not built: "Call now" from review, and the critical result on the chart.
  DR:147-151 calls the chart gap "the biggest risk I found".
- **Sources:** `2094417`, `aa1e8b8`, `392eccb`, `e270f7c`, `f241a4b`; DR:138-153.

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
- **Status:** partly built. Tabs, bands, FIFO, received time and sign-off are built. There is no
  move-to-next and no batch sign-off, so a normal Pap takes four actions (DR:155-170).
- **Sources:** MTG21:47-52, 75-79; SIA:22-24; SCS:17; `8444fe4`, `133c966`, `07dd1ae`, `535ad1a`;
  DR:155-170.

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
- **Status:** built (conditions panel, care plan block). DR:109-110: the care plan and the
  medication list disagree for one demo patient.
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
- **Status:** partly built. The vocabulary and quiet-when-verified are built. The chart banner shows
  the wrong age and sex, and the same PHN for every patient (DR:59-63). There is no
  returning-patient indicator (SIA:46).
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

## Changelog

- 25 Sep 2026, first run: wrote UC-01 to UC-25 from all listed sources, the v2 prototype, git
  history to `0e413e6`, and the doctor review (DR). The three shadowing visits are UC-06, UC-07 and
  UC-08.
