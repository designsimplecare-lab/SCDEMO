# Shadowing 2 — medication follow-up and MRI update (current production)

Source: a screen recording supplied by Ani, 25 Sep 2026, 4 min 13 s long. This is the current
production SimpleCare (Daysheet queue → chart modal). Patient details are left out. The notes come
from the screen only, because the audio was not transcribed; ask Ani for the Loom transcript.

## The visit, as seen on screen
1. **Queue → chart.** The row's clinical concern read **"Prescription Renewal"**. The recording is
   titled "Medication follow-up and MRI update", so the label in the queue did not match the real visit.
2. **The call started cleanly this time.** "Calling…" changed to "Connected 0:03" within seconds. The
   "fifty presses" problem from shadowing 1 did not happen, so it may be intermittent.
3. **The whole call (about 2.5 min) was spent reading the previous visit's note.** In the Encounter Note
   box the doctor opened the last follow-up note, which carries a "Charting" badge and was documented the
   next day at 2:34 AM. He scrolled it up and down while talking. What he needed from it was the plan:
   - the dose-titration schedule for a nerve-pain medication;
   - the side effects to ask about;
   - an MRI C-spine booked for a date next month;
   - "follow up after MRI or sooner if symptoms progress".
4. **Nested scrolling.** The note box is roughly 200px tall and scrolls. It sits inside the chart modal,
   which also scrolls, over the queue page, which scrolls too. Reading one plan took constant scrolling in
   the smallest of the three.
5. **An ambiguous editor.** The Encounter Note box was showing the *previous* visit's note, with only a
   small "Back to this visit" link to show it. The big "Finalize Visit" button beneath does not say which
   visit it finalizes.
6. **Finalize came about 10 s after the call ended**, while the box still showed the previous note. No
   new note was typed on screen, and Prescribe, Labs and the other order buttons were never used.
7. **The patient leaves the queue at once.** The next action was opening the next patient's Intake Note.
   It is a separate modal from the queue, so the doctor reads intake → closes it → opens the chart.

## What it changes in v2
- **Follow-up visits open on the last plan.** For a follow-up, "This visit" leads with a "Since last
  visit" block. It gives the last plan in short lines (the medication change and its target, what to ask
  about) and the outstanding items with their dates (MRI booked for …, result not back). Its source is
  the last note's P section plus open orders, so the doctor does not have to dig for it mid-call.
- **One scroll region.** The note grows with its content and the chart scrolls once. No box-inside-box
  scrolling.
- **The editor always says whose note it is.** An older note opens read-only beside today's note, not
  in its place. The primary button names what it does ("Finalize today's visit"). Finalize with an empty
  note today asks first.
- **Reason shown in the patient's words.** The queue category ("Prescription Renewal") was wrong for
  this visit. Show the intake answer with the category, as v2's queue already does with the AI line, and
  let the doctor correct the category.
- **Intake without a detour.** The intake answers are readable from the queue row and at the top of the
  chart, so no separate modal is needed.

## Open questions
- What was said on the call? Did the doctor change the dose, or only confirm the plan?
- Was "Finalize Visit" meant to close the old "Charting" note, today's visit, or both?
