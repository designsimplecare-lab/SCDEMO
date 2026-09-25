# Shadowing 2 — medication follow-up and MRI update (current production)

Source: a screen recording and its Loom transcript, supplied by Ani, 25 Sep 2026, 4 min 13 s long.
This is the current production SimpleCare (Daysheet queue → chart modal). Patient details are left out.

## The visit, as seen on screen
1. **Queue → chart.** The row read **"Prescription Renewal"**, and that was right: a renewal of a
   nerve-pain medication the patient had been titrating, plus a check on the MRI date.
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
   new note was typed, and Prescribe was never opened.
7. **The patient leaves the queue at once.** The next action was opening the next patient's Intake Note.
   It is a separate modal from the queue, so the doctor reads intake → closes it → opens the chart.

## What the transcript adds
- **He needed the last plan to know the renewal dose.** *"I'm happy to represcribe this three months at
  300. You think that's the correct… dose is working for you?"* The last plan set the titration target
  (300 mg at bedtime). The renewal is that end dose, not the starting one.
- **The side effects were asked about and answered, then not recorded.** *"I'm definitely drowsy, but I
  work from home, so it's okay."* This came from the plan's warning list and never reached a note.
- **A medication check.** *"Is the gabapentin the only medication that you need right now?"* The patient
  said they had plenty of another pain medication.
- **The MRI decides what happens next.** *"We'll wait the MRI and we'll go from there."*
- **The prescription was handed to the MOA by voice, with no confirmation.** After the call: *"Send them
  three months supply at 300 and good to go."* A minute later: *"Can you hear me, Jebney, or am I
  talking to myself?… Guess I'm talking to myself."* Nothing in the product said whether the MOA got it.
- **A patient-written referral request surprised him.** The next intake asked for a named specialist
  clinic in another city. *"What the f\*\*\* is this?"* The intake gave it no summary and no flag.

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
- **Reason shown in the patient's words.** "Prescription Renewal" was right here, but it did not say
  *which* medication, or that the dose had just been titrated. Show the intake answer with the category,
  as v2's queue already does with the AI line.
- **Intake without a detour.** The intake answers are readable from the queue row and at the top of the
  chart, so no separate modal is needed.
- **Renewal prefilled from the last plan.** The medication and the *current* dose (the titration
  target reached), 3 months, the pharmacy on file. Other active medications are listed with "renew
  too?", which is the question he asked out loud.
- **"Ask MOA to send" as a real hand-off.** It gives a one-tap task to the MOA on shift. The doctor
  sees "Sent to Japneet → picked up", and never has to ask "can you hear me?".
- **Side effects recorded as they are said.** The plan's watch-list becomes quick tick-lines in the
  note, e.g. "drowsy, tolerable, works from home".
- **The next step tied to the pending result.** "Follow up after MRI (Oct 22)" is kept with the plan,
  so when the report arrives it comes back with this plan attached.
- **Patient-written requests summarised at intake.** "Patient requests referral to <clinic>" appears as
  a flag in the queue row, before the doctor opens the chart.

## Open questions
- Was "Finalize Visit" meant to close the old "Charting" note, today's visit, or both?
- Who sends renewal faxes in practice, the doctor or the MOA? This visit suggests the MOA does, on a
  spoken instruction.
