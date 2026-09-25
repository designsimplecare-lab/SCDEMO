# Shadowing 3 — recurrent hernia follow-up (current production)

Source: a screen recording supplied by Ani, 25 Sep 2026, titled "Evaluating Recurrent Left Inguinoscrotal
Hernia Symptoms", 5 min 0 s long. This is the current production SimpleCare (Daysheet queue → chart modal).
Patient details are left out.

**These notes come from the screen only.** The audio is not transcribed yet, so nothing here says what
was said on the call. The recording is also sparse: it holds only about 25 distinct frames, and the screen
stays frozen for long stretches (for example 209–252 s and 252–300 s) while the call timer runs on. Anything
the doctor did inside those gaps is not visible. Times below are video time; the call timer is quoted where
it helps.

## The visit, as seen on screen
1. **0 s — the chart is already open, and a call has already been tried.** The button reads **"Call
   Again"**, so at least one attempt happened before the recording starts. The Encounter Note box shows
   the *previous* follow-up note (three weeks earlier), with the small "Back to this visit" link, the same
   state as in shadowing 2.
2. **1–4 s — two presses to dial.** He clicks "Call Again". The button does not dial; it resets to
   **"Call Patient"**. He clicks again, and at 4 s it shows the yellow **"Calling…"**.
3. **~7–12 s — connected.** The pill turns green, "Connected 0:01". The states themselves are clear
   (yellow Calling…, green Connected with a timer).
4. **36–45 s — the call drops and he redials.** At 36 s it reads "Connected 0:25". By the next captured
   frame (45 s) it is back to **"Calling…"**. The frames between do not show whether the product said the
   call had ended. At ~52 s it reconnects, and **the timer restarts from 0:00**, so the screen no longer
   shows how long he has been with the patient. This is the fourth press of Call for one patient, counting
   the attempt before the recording.
5. **0–83 s — reading the last note in the small box.** The box shows only the top of the previous note:
   the chief complaint (a medication follow-up for hair-loss treatment and constipation, with a *possible*
   hernia as the third item) and the start of S. In the captured frames the box is not scrolled, so the
   hernia part of that note (its A and P, further down) is not what is in view.
6. **~83 s — he switches to today's note.** He clicks "Back to this visit". The heading changes from
   "Encounter Note" to **"Today's Note"**, and the box is empty. Its grey placeholder is a made-up
   clinical example about **left ear pain**, unrelated to this patient. The header already says "Note
   documented September 25 at 12:41 PM" although nothing has been written, and by ~156 s that stamp has
   moved on to 12:42 PM, still with nothing typed.
7. **83–180 s — about a minute and a half on the call with the note empty.** No typing, no clicks on
   Prescribe, Labs, Imaging, Referral, Send Task or Transfer to Dolly are visible. The screen is static
   apart from the timer (Connected 0:31 → 2:07).
8. **~180–209 s — digging for the hernia history.** He scrolls the chart modal (its own scrollbar, not
   the page) past "Finalize Visit" into **Previous Notes & Events** ("3 records on file"). The header and
   call bar stay pinned; the action buttons and today's note scroll out of view. He opens the hernia
   note, which is the one that actually set up today's visit:
   - assessment: query *recurrent* left inguinoscrotal hernia after previous repairs; no signs of bowel
     obstruction or strangulation by history;
   - plan: the patient to send copies of the previous operative reports and the most recent imaging;
     follow up once those are reviewed, then decide on the urgency of a General Surgery referral; avoid
     heavy lifting; analgesia as needed; go to the ED for a list of red-flag symptoms.
   The note is signed, but its O section still carries an **unfilled template placeholder**: "Physical
   examination: [document findings including reducibility, cough impulse, tenderness, testicular
   examination, and skin changes if performed]".
9. **209–252 s — he drag-selects the whole A and P.** The text is highlighted from the examination line
   to the last ED instruction, possibly to copy it into today's note. The note has its own "Select" button,
   but he used the mouse. No paste is visible, and today's note is off-screen the whole time.
10. **252–300 s — back up to the previous follow-up, read in full.** He scrolls up the timeline to the
    note from three weeks earlier, now shown whole: its plan asked the patient to **email the hernia's
    details to support@simplecare.ca** "so appropriate imaging can be directed", with "RTC following
    imaging". So the hernia thread runs across two notes plus an email to the general support inbox.
11. **300 s — the recording ends mid-call** (the call timer would be about 4:10 on the second call). No
    note typed, no order, referral, prescription or task, and no finalize are visible. What came next is
    not in the recording.

## Patterns across the three visits
- **The note is not written during the call.** Shadowing 1: the note never changed on screen. Shadowing 2:
  nothing typed, finalized with the old note in the box. Shadowing 3: today's note stays empty for as
  long as the recording shows it. Across all three, the call is spent talking and reading, and writing
  happens after, or not at all.
- **Mid-call reading of the last plan, in the wrong place.** In shadowing 2 and 3 the chart opens on the
  *previous* note, and the doctor digs through it for the plan while the patient is on the line. In
  shadowing 3 the plan he needed was not even in the latest note but in another one lower down the
  timeline, and reading it pushed today's note off-screen.
- **Calling is unreliable.** Shadowing 1: "fifty" presses. Shadowing 2: clean. Shadowing 3: a press that
  only resets the button, a second press to dial, a dropped call and a redial that restarts the timer. Two
  visits out of three had call trouble.
- **The action row goes unused on screen.** Prescribe, Labs, Imaging, Referral, Send Task and Transfer
  to Dolly are always there, and across the three recordings they were barely touched during the call.
  Work gets handed off by fax (1), by voice to Japneet (2), or by asking the patient to email support and
  send records (3).
- **What the doctor needs lives outside the chart.** Shadowing 1: "have we spoken on Tia or Rocket?".
  Shadowing 3: operative reports and imaging from previous repairs elsewhere, requested from the patient,
  with nothing on screen saying whether they have arrived.
- **Nested scrolling.** The note box, the chart modal, the left nav and the queue page behind all scroll
  on their own. In shadowing 2 he fought the small box; in shadowing 3 he gave up on it and used the modal
  scroll instead, which works but hides today's note.

## What it changes in v2
- **Call Again dials.** One press dials, whatever the label. A dropped call changes the pill at once to
  "Call dropped at 0:31 · Redial" (grey, with the Mage phone icon), so the doctor never finds out from
  silence. The timer counts the whole contact across reconnects ("2 calls · 4:10").
- **"Since last visit" follows the reason, not just the latest note.** Today's reason was the hernia, so
  the block leads with the hernia thread from every note that mentions it: previous repairs, the working
  assessment (query recurrence), and the plan's open items. The hair-loss and constipation items from the
  latest note go below it, not above.
- **Outstanding requests have a status.** "Waiting on the patient: operative reports and latest imaging,
  asked 3 weeks ago, not received" is shown with the care plan, beside the reason. When the patient emails
  support, the email is attached to that item rather than left in the general inbox. If the doctor wants
  the office to chase the records, it is one press of Task to the MOA on shift, as now; nothing becomes a
  task on its own.
- **A pending decision is a draft, not a sentence.** "Decide urgency of General Surgery referral after
  records" appears as a draft referral under the plan. The doctor promotes it with one press when ready.
- **Old notes open beside today's note.** Reading history opens a side panel next to the editor, so
  today's note stays in view. Each column scrolls once; no box inside a box.
- **Carry forward instead of drag-select.** Each section of an older note (A, P, red flags) has "Copy to
  today's note". Red-flag and precaution lines arrive as tick-lines ("ED precautions reviewed").
- **Unfilled placeholders block sign-off.** A note that still contains bracketed template text such as
  "[document findings …]" asks before it is signed and marks the line to fill or remove.
- **An empty note looks empty.** The placeholder is neutral ("Start typing, or pick a section below"), or
  starts from the intake reason as CC. No invented clinical example like ear pain. "Note documented at"
  appears only after the first word is typed.

## Open questions
- What happened between 36 s and 45 s: did the patient hang up, did the line drop, or did the doctor end
  the call? Did the product say anything? The audio should settle it.
- Did he paste the selected A and P into today's note, and did he finalize after the recording ended?
- Is the timeline in date order? The hernia note sits *below* the follow-up from three weeks earlier,
  yet its content reads as the later of the two. Its date is off-screen in every frame.
- Did the operative reports and imaging ever arrive, and where would the doctor look for them today:
  Documents, the support inbox, or the MOA?
- Was the unfilled examination placeholder signed knowingly (a virtual visit, no exam), or missed?
