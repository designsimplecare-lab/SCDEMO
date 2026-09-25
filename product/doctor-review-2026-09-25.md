# Doctor review of v2, 25 Sep 2026

Reviewer: the "doctor" agent (a BC virtual family doctor modelled on Daniel Pannozzo).
Prototype: `simplecare-physician-portal-v2.html`, build stamp `v2 · build 2026-09-25 12:45`, at 100% zoom, 1440 px wide.
Sources: `from-daniel/2026-09-21-meeting-notes.md` (cited as **21 Sep**), `shadowing/2026-09-25-rx-renewal-by-fax.md` (**S1**),
`shadowing/2026-09-25-medication-follow-up-mri.md` (**S2**), `shadowing/2026-09-25-recurrent-hernia.md` (**S3**).
There is no `product/use-cases.md` yet, so nothing here contradicts one.

Labels: **Observed** means it is in a recording or in Daniel's words, and I quote it. **Doctor judgement** is my opinion
of the workflow. **Needs Daniel** is a clinical or policy call I will not make.

---

## 1. Use cases walked

1. Start of day on Home: who is next, what needs me, which window am I in.
2. Rx renewal (S1): call, confirm, 90 tablets to the pharmacy, note, finalize. Walked on Greg Nakashima ("Rx renewal").
3. Follow-up where the last plan matters (S2). v2 has no titration or MRI patient, so I walked it on Behdis Maleki
   (iron-deficiency follow-up with a care plan) and Andrey Abushakhmanov (plain follow-up).
4. Clear the inbox: Gloria's critical troponin first, then routine results, then sign-off.
5. Recurrent hernia follow-up (S3), checked against the same chart.

---

## 2. Step by step

### Use case 1: start the day on Home

**Step 1: which window am I in?** The top right says "12:48 PM New York · 12m left". The queue says "Current window ·
8:00–10:00" and the chip row reads 8:00–10:00 / 10:00–2:00 / 2:00–5:00 / 5:00–7:00.
- What got in the way: the clock is in my zone and the windows are in BC time, and neither label says so. At a glance
  I read "12:48" next to "8:00–10:00" and think I'm three hours late. BC time only appears in the pill's accessible
  text ("BC call window 8–10 AM · 10 min left").
- Evidence (**Observed**, 21 Sep): he wants "the active window and the moving clock in front of him at all times" and
  says *"when I don't know where I am, I get nervous."* The windows are open and visible, which is good.
- **Doctor judgement:** put the BC time beside my local time ("9:48 AM PT · 12:48 PM ET"), or tag the window chips "PT".

**Step 2: who is next?** Row 1, Gloria Anne McDonald, has the "Next" badge. 0 clicks. Good.
- The header says "Live queue 6", but the table shows 8 rows (2 in the current window and 6 later today). I don't
  know which number to trust.
- Visit status labels are cut off: "Doctor to C…" on Kathleen and Greg. Callback is a status I act on
  (**Observed**, 21 Sep: the callback workflow gets *"95% contact rate"*), so it has to be readable.

**Step 3: what needs my attention?** There are four rows: Gloria troponin 0.42 (critical, red), Gloria intake flag
"Chest pressure" (amber), Louise Tam "Rebook EDS referral · 4d overdue", and Frank Delacroix "Review MRI report · due today".
- Gloria takes two rows. That's one patient and one decision, and she's also next in the queue. Merge them per patient.
- "Review MRI report" is the exact line Daniel rejected. **Observed**, 21 Sep: *"Review MRI report"* is a mystery,
  and the AI should give under five words of context. *"Don't keep it a mystery."* It is still in the data (`DOC_TASKS` t6).
- Frank's MRI task is marked urgent. **Observed**, 21 Sep: "Imaging and consult reports rarely need urgent review."
- Louise Tam's row is an MOA's overdue referral (Dolly). I can see why an overdue urgent task shows up, but it isn't
  mine to act on.
- Behdis Maleki's potassium of 6.3 is tiered **High** in the Inbox, and she's in today's 10:00–2:00 window. It is not
  on Home. See Needs Daniel, item 1.

### Use case 2: Rx renewal (S1 pattern), Greg Nakashima

**Step 1: open the chart.** One click on the row. The renewal card opens by itself because the concern reads "Rx
renewal". Good, and that's what S1 asked for.
- The banner reads **"Greg · Age not recorded · Not recorded"**, but the queue row says Gregory Paul Nakashima, 58Y,
  Male. On a renewal I confirm identity out loud, and the chart doesn't match the list.
- **Every chart shows the same PHN (9650 791 088), the same pharmacy (Lincoln Pharmacy, Coquitlam) and the same two
  medications (Metformin 500 mg, Amlodipine 5 mg).** Behdis's lab report carries PHN 9650 333 502, and her chart shows
  9650 791 088. In a demo to doctors, a PHN mismatch between a lab and a chart reads as a wrong-patient error.

**Step 2: call.** One press of Call gives "Calling…" and then "On call" with a green timer, and a second press does
nothing. This fixes S1's *"Double tap for call now like fifty times. My goodness."*
- Calling from the chart doesn't change the visit status (Greg stays "Doctor to Callback"). Only the queue's Call on
  the Next row sets In progress.
- If the call drops, I press End and then Call, and the timer restarts at 00:00. S3 is exactly this: a dropped call and
  a redial that restarted the timer. There's no "call dropped" state and no running total.

**Step 3: confirm and renew.** The card preselects **Metformin 500 mg · twice daily** with **3 months · 90**. Greg's
intake says "Requests renewal of **blood pressure** medication". I pressed Send by fax, and the note wrote itself:
"Rx renewal: Metformin 500 mg twice daily, 90 tablets (3 months), faxed to Lincoln Pharmacy, Coquitlam."
- **That line is wrong.** Twice daily for 3 months is 180 tablets. Ninety tablets is 45 days. The supply buttons tie 90
  to 3 months regardless of the directions, so any twice-daily medication is prescribed short, and the note records
  the mistake.
- The card defaulted to the wrong drug. The drug he asked for (amlodipine) is the second option in the list.
- Send goes out in one press, with no summary of drug, strength, directions, quantity and pharmacy to check first. A
  fax to a pharmacy can't be taken back.
- The status says "Faxed … · **delivered** 12:50 PM" in the same second I pressed it. **Observed**, S1: the doctor tells
  the patient *"When you receive that copy, it just means the fax has been successfully delivered."* A real fax goes
  queued, then sending, then delivered or failed. If it says delivered straight away, I'll stop trusting it.
- The card doesn't show when the drug was last dispensed. The queue AI line knows ("last dispensed 90 days ago").
- There is no "Ask MOA to send" on the card. See use case 3, step 4.

**Step 4: finalize.** I pressed "Finalize & review billing" and got a toast, "Visit signed", and nothing else.
- No billing review opened, even though the button promised one.
- The visit status stayed "Doctor to Callback". The patient doesn't move to Completed, and the queue doesn't offer the
  next patient. **Observed**, S2: "The patient leaves the queue at once." That is what production does, and v2 does less.
- After signing, the note is still editable, and nothing shows that it was signed.
- Clicks: open chart 1, Call 1, End 1, Send 1, Finalize 1. That's five, with no reading, which is the right count.
  The quantity bug and the silent finalize make it unsafe to demo as it stands.

### Use case 3: follow-up where the last plan matters (S2 pattern)

**Step 1: what did we decide last time?** On Andrey's chart I looked for the last note. It isn't on the chart. The
Timeline tab has a one-line event, "Visit note — Discussed medication adherence and follow-up plan with Andrey", and
it can't be opened. The "More" box, collapsed by default, says "Last visit · Jun 25, 2026". There's no S/O/A/P, no
plan text and no "Since last visit".
- **Observed**, S2: "The whole call (about 2.5 min) was spent reading the previous visit's note". The plan held the
  titration target, the side effects to ask about, and the pending MRI. S2's own recommendation was "Follow-up visits
  open on the last plan… a 'Since last visit' block". v2 doesn't have it. Production at least lets you read the old
  note. **v2 is worse than production here.**

**Step 2: what dose were we titrating to?** On Behdis's chart, the care plan does carry the last plan: "Ferrous
fumarate 300 mg daily · Ongoing · Care plan, May 12", "Repeat ferritin and CBC · Due Aug 31", "Refer to GI if ferritin
remains low · Awaiting". That's the right material, and it answers "what are we doing" well.
- The Medications rail on the same chart lists Metformin and Amlodipine, and ferrous fumarate isn't there. The care
  plan and the medication list disagree about what she takes.
- Nothing puts together "last time we said X; today check Y". Four cards of plan items with due dates in the past
  (Aug 31, Sep 10) still take reading mid-call.
- The recall line ("You were working her up for iron deficiency… you wanted a repeat before escalating to GI") is
  exactly the right sentence, but it only appears when I come in from the Inbox's Open chart, not from the queue.
  From the queue I'd never see it.

**Step 3: what is pending, the MRI?** There's no imaging on Andrey or Behdis. Across the prototype, pending imaging
lives in care plan items (Gloria's stress test "Ordered · Due Sep 12", which has passed). There is no "Follow up after
MRI (Oct 22)" pattern, where the next step is tied to a pending result as S2 asks.

**Step 4: renew at the current dose and hand it to the MOA.** The renewal card lists only the default medications
(Metformin and Amlodipine), not the medication from the plan. There's no dose or strength field, so "3 months at 300"
(**Observed**, S2: *"I'm happy to represcribe this three months at 300"*) can't be entered.
- Handing off to the MOA means the generic Task MOA dialog: pick Prescriptions, type the drug, dose and quantity by
  hand, and send. It goes to "Marisol Reyes". There's no "picked up" state afterwards. **Observed**, S2: *"Can you hear
  me, Jebney, or am I talking to myself?… Guess I'm talking to myself."* v2 swaps the voice for a toast, and I still
  don't know if anyone has it.
- New tasks are hard-coded to "due Sep 19", which was six days ago, whatever priority I pick.

**Step 5: record the side effects.** There's no quick-line for side effects. I'd type into a free-text box that
already says "Patient presents for follow up appointment." **Observed**, S2: *"I'm definitely drowsy, but I work from
home, so it's okay."* It was asked and answered and never recorded. v2 doesn't change that.

**Step 6: the other medication question.** **Observed**, S2: *"Is the gabapentin the only medication that you need
right now?"* The card has no "renew too?" list. After one Send, the button disappears, and I'd have to close and
reopen the card for a second drug.

### Use case 4: clear the inbox

**Step 1: the critical first.** On Home, the troponin row is one click to its review. The page is strong: "Critical —
immediate assessment · Troponin I above 0.05 µg/L · LifeLabs BC critical limit", the source report open by default,
and "Also waiting for Gloria: 12-lead ECG". The drafted disposition says "Contact Gloria now" and "hand them to the
doctor", with an emergency-contact fallback. That's well built.
- The only way to commit is **Accept & assign**, which sends the call to Marisol as an MOA task. Gloria is **next in my
  own queue**, and the review doesn't say so. I want a "She's next. Call now" button that opens her chart on the call.
  Handing a critical off to an MOA who will then hand her back to me costs minutes.
- **The biggest risk I found:** I opened Gloria's chart from the queue, and **the troponin isn't on it**. Recent
  results show Ferritin and CBC from Jun 25. The banner says "Intake flag — read it before calling", and nothing says
  critical troponin or new AF on ECG. The scribe demo for her drafts "ASSESSMENT: Stable exertional angina. No features
  of instability" and "Telephone review in four weeks". A doctor who works from the chart, and that's the whole design
  intent, would treat an acute myocardial injury as stable angina.
- The intake flag is amber on Home and a red dot on the chart banner. **Observed**, 21 Sep: "Red is reserved for
  critical alerts alone." Gloria's overdue lipid panel ("Due Aug 20, 2026") is also red in the care plan.

**Step 2: routine results.** For Priya Raman's Pap I clicked the row, then No follow-up required, and landed back in
the Inbox. That's two clicks, which is good.
- It returns to the list, not to the next result. The code has a "next" path (`rvDone(true)`), but no button uses it.
  With 14 routine results that's 14 round trips.
- The AI summary for the Pap says "All values are within the reference range". A cytology report has no values. The
  line is generic, and a doctor will spot it.
- The 12-lead ECG for Gloria ("atrial fibrillation · left anterior divisional block") sits in **Routine** under the
  critical troponin for the same patient, the same morning. Manjit Dhaliwal's haemoglobin 71 g/L is also Routine. See
  Needs Daniel, item 2.
- The inbox order is FIFO inside each band (Owen Brady yesterday 9:40 AM, then later ones), and it doesn't cross bands.
  That matches **Observed**, 21 Sep: *"it is not superior to anything within its respective category."* Received time is
  the clinic receipt ("received Today, 7:22 AM"), as he asked.

**Step 3: sign off.** Reviewed items move to Awaiting sign-off and each needs its own Sign off press. There's no
"sign off all reviewed" option. For a normal Pap, that's open, No follow-up, switch tab, Sign off: four actions to
close one normal result.

### Use case 5: recurrent hernia (S3 pattern)

- **Reading the history.** The hernia plan was two notes back (**Observed**, S3: "the plan he needed was not even in
  the latest note but in another one lower down the timeline"). v2 has no previous notes that can be opened, so this
  visit couldn't be done in v2 at all. S3's "Since last visit follows the reason" and "old notes open beside today's
  note" are both missing.
- **Waiting on the patient.** Operative reports and imaging were requested from the patient three weeks ago. The v2
  care plan has owners GP and SPEC with statuses such as "Awaiting", and the only chase action is "Chase their office".
  I found no "waiting on the patient" owner, and nothing links the patient's email to support to the plan item.
- **The call.** Same as use case 2: no dropped-call state, and the timer restarts at 00:00 on redial. **Observed**, S3:
  "the timer restarts from 0:00, so the screen no longer shows how long he has been with the patient."
- **The empty note.** v2's placeholder is neutral ("Document the visit..."), but it's hidden, because every chart
  opens prefilled with "Patient presents for <concern>." That's fine as a CC. S3's other ask, blocking sign-off on
  bracketed template text, isn't there: finalize doesn't check the note at all, even an empty one. S2 asked for
  "Finalize with an empty note today asks first."
- **Draft referral from a pending decision.** Not present. Behdis's "Refer to GI if ferritin remains low · Awaiting ·
  Due Conditional" is the nearest thing, and the pattern is right. It needs a one-press "Create referral" that drafts
  and stays linked to the result it waits on.

---

## 3. Top asks, ranked by the call time or risk they save

1. **Put today's critical result on the patient's chart, and let me call from the review.** A critical or alert-tier
   result received today goes in the chart banner, top of "This visit", in the same red row as Home, with the ECG
   beside it. The scribe and the draft note must not assess a patient without it. On the review page, when the patient
   is in my queue today, offer "She's next · Call now" beside Accept & assign. *Saves: a missed MI on the patient I'm
   about to phone. Minutes on every critical.*
2. **Make the renewal card correct before making it fast.** Work out the quantity from the directions and the duration
   (twice daily × 3 months = 180), or show the quantity as its own field. Preselect the drug the intake names. Show
   strength, directions, last dispensed and quantity in a one-line summary I confirm before Send. Show the real fax
   states (sending, then delivered or failed with a retry). Add "Ask MOA to send", which creates the task with the drug
   filled in and shows "Sent to [MOA] → picked up". List the other active medications with "renew too?". Use the
   patient's own medications, pharmacy and PHN on every chart. *Saves: a short prescription on every twice-daily
   renewal, which is one of the most common reasons in the queue, and S2's "am I talking to myself?".*
3. **"Since last visit" at the top of every follow-up, drawn from the last plan and following today's reason.** Give
   short lines: the medication change and its target dose, what to ask about (as tick-lines that write into today's
   note, e.g. "drowsy, tolerable"), outstanding items with dates and who they're waiting on (a lab, a specialist, or
   the patient), and "follow up after X". Older notes open read-only beside today's note, with "Copy to today's note"
   per section. Show the recall sentence whatever door I came in by. *Saves: the ~2.5 min of reading in S2 and the
   history hunt in S3. It's the largest block of call time in the recordings.*
4. **Make Finalize close the visit.** It should set the visit to Completed, lock and stamp the note, ask first if the
   note is empty or still has [bracketed] template text, open billing if the button says "review billing", then offer
   "Next: <name>". Starting a call from the chart sets In progress. A dropped call shows "Call dropped at 0:31 · Redial",
   and the timer keeps a running total ("2 calls · 4:10"). *Saves: rows stuck in the wrong status, unsigned or template
   notes, and S3's redial confusion.*
5. **Home's attention list: one row per patient, saying what's wrong.** Merge Gloria's troponin and intake flag into
   one row. Replace "Review MRI report" with the finding in under five words. Fix the queue count (6 vs 8 rows), the
   cut-off "Doctor to C…", and the missing "PT" on the windows. In the Inbox, a routine "No follow-up" moves me to the
   next result, and "Sign off all reviewed" closes the batch. *Saves: 14 round trips on a normal inbox, and Daniel's
   exact complaint repeated back to him.*

Also found, not ranked: the deep link `#chart:5` (and any deep link to a renewal chart) throws in `rxOpen` because
`RX_MEDS` is declared further down the script than the deep-link code. The rest of the script then stops, so the page
stays on Home. Opening the same chart by clicking works. It only bites shared or screenshot links.

---

## 4. Needs Daniel

1. **Does High belong on Home?** The 21 Sep notes say the attention list is "Critical to high urgency only". The code
   quotes him later: *"So as to not overwhelm the doctor - we are keeping it to critical values."* So Behdis's
   potassium of 6.3 (High), with her in today's queue, doesn't appear on Home. Which rule is current, and does "patient
   is in today's queue" change it?
2. **Tiering for results with no LifeLabs limit.** The 12-lead ECG with atrial fibrillation sits in Routine beside a
   critical troponin for the same patient. Should an ECG or a related result for a patient who already has a critical
   inherit its urgency, or be grouped with it? Haemoglobin 71 g/L is Routine under the current rules. Is that the
   LifeLabs BC limit as he mapped it? I won't set a threshold.
3. **Quantity rules for renewals.** Is the default "3 months" for every chronic medication, and are there drugs where
   he wouldn't default to 90 days (controlled substances, medications being titrated)? Does the quantity come from
   directions × days, or does he always type it?
4. **Who sends renewal faxes, the doctor or the MOA?** S2 suggests the MOA, on a spoken instruction. This decides
   whether "Send by fax" or "Ask MOA to send" is the primary button.
5. **Review vs sign-off.** Is the separate sign-off step a legal or College requirement, or can a routine "No follow-up
   required" by the physician count as sign-off? That decides whether the four actions for a normal result can become one.
6. **Critical results and delegation.** When a critical patient is already in his queue today, should the default be
   "I call now" rather than "MOA calls and hands over"? Is there a policy on who makes first contact for a critical value?
7. **Calling a Doctor to Callback patient.** The queue only lets him call the Next patient (*"nobody skips it"*, spec
   5.2). Callbacks are by definition out of order. May he call a callback from the queue, or does it go through Add-On?
8. **Sign-off with a template placeholder** on a virtual visit with no exam (S3): should sign-off block it, or ask?
