# Daniel's review of the Figma use-case journeys: seven videos, read in full — 18 Oct 2026

Source: seven Looms (about 5 minutes each) that Daniel recorded while going over the Figma journeys file
(demo screenshots of the doctor flows, captured 16 Oct from the demo). **The links are in `private/links/`;
the videos can show real patients.** The lead read the full transcripts and then checked the frames of videos 3 to 6 (and parts of 2) against them; the screens he points at are our own journey screenshots (UC-01 to UC-07), so each remark below maps to a screen we can see.
Quotes are verbatim; profanity and personal venting are left out. This file **replaces** the earlier partial
notes in `2026-10-18-portal-walkthrough.md` and `2026-10-18-modular-ai-and-note.md`.

Daniel said at the end of video 2: "I've made too many changes, and there's going to be downstream
consequences … I'll focus my attention on those things now, and we will leave it there." **He is sending more
(see "Coming from Daniel").**

## What each video says

**1. Physician Portal Workflow and Prescribing Tools (4:56): his live portal, for reference**
- His flow today: the AI proposes the diagnosis code ("technically accurate … Boom. And done. Submitted
  claim"), and the claim then shows as paid.
- **Calling:** "when you call the patient, it pairs to your cellular device. When you headset call, it pairs to
  the internet … it would be good to have both those things because … the doctor could choose one or the
  other."
- **Actions in his portal:** prescribe, labs, imaging, referrals, create a note, documents, review billing. "We
  shouldn't have [review billing] here. It should be at the end of the chart because that's how you complete
  the chart when you submit the billing … at the bottom is when I would do my billing."
- **Prescribing is the most important action.** The Health Canada drug database "doesn't work. It's not
  clinical … really just a database … we have a use case, we can't use it right now." He chooses from his
  favorites.

**2. Modular AI for Clinical Documentation Workflows (4:26)**
- "I'm talking to the patient and the AI is filling this out in real time."
- **Modular AI:** "a doctor could turn on the AI for the note-taking, but turn it off for the prescriptions … we
  can activate it where we want it activated. And then we would even have an AI view … going from start to
  finish. As I pick up the phone, the scripts are auto-populated, everything's done."
- **The diagnosis:** "there's my diagnosis in the chart, that would be my assessment. But this add diagnosis,
  that's billing. That's the ICD9 code. So we can remove that. All this is just one big note."
- **Orders and pending:** (about the Action tab's last lab orders and what is pending) "this goes into the chart
  review … I'm gonna wanna see right at the top because I need that information to make my assessments. That's
  a rate limiting step. So when I look at the chart, I would want that in the chart summary … right up front,
  not buried down here, it's too important. And this goes into the lab results section of the chart. So not
  quite here. This is **purely action-oriented**." The Actions are what he already uses ("these things don't
  change").
- "Pending items. I don't know. We'll worry about that later." "The chart timeline, I'll think about … I've
  already done a little bit of work on it, and I want to do more work on it."

**3. AI Intake Summary and Chart Review (5:01)**
- **Dropped call:** "if there's a call drops, I should already be in the chart … I would just push the button
  again."
- **Review is sequential, not split.** "I don't think I would like it split like that. I like it more
  sequential."
- **Names and order.** First **"Intake summary"**: "the summary from what the patient said … you have to fill
  out the questionnaire, or you talk to the AI, and then it's just the intake summary." Then **"Chart review"**
  ("the AI chart review"): "the AI is pulling data off the various data feeds, and that would be the chart
  review, and it would … highlight or prioritize at the top the major [points], how it relates to their present
  concern." He said he would "come up with a better verbiage" later.

**4. Streamlining Call Button to Open Chart (5:00)**
- **Call opens the chart.** "If I'm on this page and there's the call button at the top … it would make sense to
  open the chart automatically … all I have to do is press the call button, and boom, there's the chart."
  Other doctors "would want to enter the chart and then take a look." So both: "you call, and the chart opens up
  automatically … or you've entered into the chart and you can call."
- **A more streamlined top of the chart:** "this could be a little bit more streamlined up here … we would just
  combine all this … all this would fit in here at the top, nice and neat. Because … this looks like this is
  separate from this."
- **Patient identity is not front and center:** "it's good to know the patient, it's good to know the PHN, but
  this is redundant information at this point … it's not something that should be front and center."
- **ECG:** "related, to do, abnormal ECG … the ECG, we just grab right off the [ECG]. ECGs have a report at the
  top … it's got to be right here, and this is gone too, because there's no point in having this."
- **He likes:** "Doctor to call back, boom. I like that … helps streamline, especially if I've got 90 people."

**5. Integrated Call Window Timer for Scheduling (5:01)**
- **The timer:** "I do like having a timer to tick down … so I know how much time is left in my call window.
  And when I'm looking at this, it wouldn't be information that I would utilize, because it'd be too out of the
  way … it's sort of like a subtle cue to keep you on track … more clinical utility than at first meets the eye.
  That's why I want it more integrated … when you finally get off the phone, you're disoriented. And so it's
  just there to reorient you." He first says "we could probably just eliminate that and just have it there."
- **Call windows in the queue:** "wouldn't it just be like the call window? … it defaults to whatever time it
  actually is. I wouldn't say 'later today', I would want to know what call window you are referring to. So
  there's the first, this would be the second, and so on … **We don't need live**, so we default … This is
  highlighted, that's good. Kind of like the purple, that's nice."
- **Visit statuses:** "Doctor to call back, completed, no show. We'll have a few more. There should be an
  **administrative cancellation**, so that means … the admin is cancelling, not your MOA per se … I'll have a
  list of all the things that we should have."
- "Next patient waits at the top … Excellent. And this is obviously needs your attention in the chart. That's
  good. Chart opens with a call button ready. I would say even better … would be to have the call button open
  the chart. That's what I care about."

**6. Prioritizing Critical Lab Results and UI Updates (5:00)**
- **A welcome touch:** "it'd be nice that this would have a few like Panorama Ridge … nice for the doctors to
  see all the cool stuff in the province."
- **Home wording:** "17 to review, two unread messages. I didn't really understand what that meant … just have
  … Seventeen to review."
- **Needs attention:** "a coordinated color system."
- **Lab work in Needs attention is all critical.** "A potassium level of 6.3 is still critical … is it
  catastrophic? No, it's high and certainly could become catastrophic … that's why I'm very judicious in what is
  presented to the doctor as far as needs attention is concerned … if I'm grabbing your attention for lab work,
  it should all be critical. There shouldn't be any soft [stuff] in there … Critical result means you got to
  move on it."
- **Other things also need attention, but they are not critical results.** "The lab work is always shown first.
  MSP claim [failing] to submit … not get paid, that's critical for me … I would want that under that; it would
  definitely need my attention, but that's not a critical result … needs your attention are just the things you
  really ought to address immediately. But the critical would always be at the top." He will "re-review [the lab
  work], reorganize it, and … we'll have an updated list."
- **Live queue:** "I don't really understand this. I think it should just be eliminated. I think it should just
  be your call windows. There's no point in having live because it doesn't give me any more information … the
  call window is highlighted … if you're outside of it, it carries forward, as we discussed in the past."

**7. Streamlining SOAP Notes and Clinical Actions (5:01)**
- "This would be the intake, and then this would be the chart review … in relation to what the patient came in
  for." Preventive reminders ("your colorectal cancer screening is not up to date") are separate: "I'll add that
  on somewhere else."
- **The Patient summary stays.** "So the patient summary here is still this … medications, past medical history,
  all that." The intake is "just a very brief heads-up", fleshed out in the chart; decisions after it are
  "downstream" (path-dependent).
- **Actions:** "the actions you would just rip right off of my dirty chart that [a colleague] and I created, that
  doesn't change … old school actions, they make a lot of sense. I'll give you that list, and that would just
  pretty much be the action area of the chart, **including billing**."
- **Prescribing:** "we're going to have to streamline this because people can be on 30 different drugs … the way
  I would want this in front of me is … clinical … I'll come up with a document for the prescriptions." He is
  "pretty happy with the imaging and the referrals … not a bad system."
- **The note is integrated:** "I don't want to have to click multiple times. A SOAP note is integrated … doctors
  don't want to be clicking."

## What Daniel wants updated, with the lead's certainty
| # | Change | Certainty |
|---|---|---|
| 1 | **Call opens the chart:** pressing Call on a patient in the queue or on Home starts the call and opens the chart; calling from inside the chart still works. | Certain |
| 2 | **Review is one column, in order:** Needs attention, then **Intake summary** (what the patient said; brief), then **Chart review** (AI: data feeds, highlighting what relates to today's concern first). Not split side by side. | Certain |
| 3 | **Remove "Add diagnosis" (ICD-9) from the note.** The Assessment is his written impression. The code belongs to billing at the end of the chart (the AI suggests it, he confirms). | Certain |
| 4 | **Ordered and pending moves to the top of the chart summary,** and the lab results go in the chart's lab results section. The Action tab becomes purely actions. | Certain on moving it up; the exact home is Daniel's call |
| 5 | **Needs attention: lab results are all Critical** (no soft tier). Other urgent items (for example a claim that failed to submit) also appear there, under the criticals, in a different, coordinated colour. Critical is always on top. | Certain; Daniel will send an updated lab list |
| 6 | **Queue: group by call window,** named first, second and so on (with times), defaulting to the current window and highlighted. **Remove "Live" and "Later today".** Carry-forward stays. | Certain |
| 7 | **The call-window timer stays and moves where he looks:** into the current call-window band in the queue ("Current window · 8:00–10:00") instead of the small top-right pill ("11:54 AM New York · 1h 6m left"), which he says to eliminate. In video 5 the cursor is on that pill on Home (UC-01-3) when he says it. | Certain (frames match the words) |
| 8 | **Home: say "17 to review"** only. | Certain |
| 9 | **Visit statuses:** add **Administrative cancellation** (cancelled by admin, not the MOA). He will send the full list. | Certain on this one |
| 10 | **Top of the chart (UC-03-2, video 4):** today the patient card (name, PHN, allergies, Call, Chart) sits in a left box apart from the Review/Note/Action/Sign off tab bar on the right. He wants these combined into one neat top block, with the PHN line dropped from the front. The left Patient summary list (medications, past medical history …) stays. | Intent certain; exact layout is the designer's call |
| 11 | **Call: phone or headset** (built). Billing at the end of the chart. Prescribing from favourites. | Certain |
| 12 | **The AI is modular:** switch Cedar on or off per part (note, prescribing, and so on), and an "AI view" that does everything from the moment the call starts. | Intent certain; the "AI view" and where the switches live are unclear |
| 13 | **ECG card (UC-03-2):** the "Related · To do · Abnormal ECG · Review ECG" row. He wants the report text that is printed at the top of the ECG shown right there, and the "To do" label (and the generic "Abnormal ECG" wording) gone. | Fairly certain |
| 14 | **Welcome screen with BC photos** (Panorama Ridge). | Low priority |

## Coming from Daniel (do not build these yet)
His **Action list** (to replace ours, billing included); a **document on prescriptions** (people can be on 30
drugs); his **chart timeline** work; the updated **lab/critical list**; the **full list of visit statuses**;
where **preventive-care reminders** go; his own **better wording** for Intake summary and Chart review.

## What the frames added (checked 18 Oct)
- **Video 4** is on UC-03 step 2 (chart opens with Call ready): his header, ECG and PHN remarks all point at that one screen.
  UC-04 ("Doctor to call back") is the part he likes.
- **Video 5** starts on Home (UC-01-3), then UC-02 (filter by call window, status dropdown), then UC-03.
- **Video 6** stays on UC-01-3 (Home): "Needs your attention" shows three rows today (troponin red; potassium 6.3 yellow;
  "MSP claim not submitted · 4 days left" yellow). Potassium becomes Critical; the claim row stays below it in another colour.
  Near the end he moves to UC-01-4 (queue with the "Live" chip, "Current window" and "Later today" bands): that is where
  Live and Later today go and named call windows come in.
- **Video 3** is on UC-04/UC-05; the "Today · Intake" card beside "Cedar · Key clinical findings" on the Review tab is the split
  layout he does not want. **Video 2** was on UC-07 steps 3 and 4 (Note with Add diagnosis; Action with Lab orders).
- The Action tab (UC-07-4) holds Refer, Task, Message, then Lab orders and results: his "purely action" point removes the lab block from it.

## Questions for Daniel
1. (Answered by the frames: the pill goes and the countdown moves into the current call-window band.)
2. Where does Needs attention sit relative to the Intake summary? (Lead's proposal: first, always, with
   criticals on top.)
3. ECG: confirm the card should show the printed report line instead of "Abnormal ECG".
4. Where do the Cedar on/off switches live, and what is the "AI view"?
5. Which colours for Needs attention (critical vs other urgent)?
