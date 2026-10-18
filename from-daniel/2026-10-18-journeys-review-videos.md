# Daniel's review of the Figma use-case journeys: four videos — 18 Oct 2026

Source: four Looms (each about 5 minutes) that Daniel recorded while going over the Figma journeys file
(demo screenshots of the doctor flows). **Links are in `private/links/`; the videos can show real
patients.** The lead could read only the first 2:20 to 4:00 of each, so **the last part of each video is
missing.** Quotes are verbatim; profanity and personal venting are left out. "Certainty" is the lead's.

## Video 1: "AI Intake Summary and Chart Review" (read to 4:01)
- **Dropped call.** About "Chart of a dropped-call patient opens": "if there's a call drops, I should
  already be in the chart, right? I just call them back … I guess I would just push the button again."
  → No separate step; the doctor stays in the chart and presses Call again. *Certain; the banner with Call
  back already does this.*
- **Review layout: sequential, not split.** "Key clinical findings. Yeah, that could be good. I don't think
  I would like it split like that. I like it more sequential." → Today and Cedar's findings should not sit
  side by side. *Certain.*
- **Rename and order.** "This would be called an … intake summary … This would be at the top. And this is
  basically the summary from what the patient said … you have to fill out the questionnaire, or you talk to
  the AI, and then it's just the intake summary." And: "this would be the AI chart review … This is at the top
  as the intake, then this is basically a chart review." → Review reads **Intake summary** first (what the
  patient said, from the questionnaire or the AI chat), then **Chart review** (the AI's key clinical
  findings), one after the other. He said he'd "come up with a better verbiage" later. *Certain on the
  order and names as given.*

## Video 2: "Streamlining Call Button to Open Chart" (read to 3:29)
- **Call opens the chart.** "If I'm on this page and there's the call button at the top … I can call the
  patient, then it probably would make sense to open the chart automatically." "All I have to do is press the
  call button, and boom, there's the chart." Some doctors "would want to enter the chart and then take a look",
  so both paths: "here you call … and the chart opens up automatically … or you've entered into the chart and
  you can call." → Pressing Call in the queue or on Home starts the call **and opens the chart**; calling from
  inside the chart still works. *Certain.*
- **A more streamlined top of the chart.** "This could be a little bit more streamlined up here … we would
  just combine all this … no more than like this … all this would fit in here at the top, nice and neat.
  Because this looks like this is separate from this." (He points at the patient card and the Patient
  summary list.) → Combine the patient card and the summary list into one compact block at the top.
  *Intent certain; exact layout is the lead's proposal.*
- **ECG.** "So, related, to do, abnormal ECG … I think I did review that in Notion as well. And the ECG, we
  just grab right off the [ECG]. ECGs have a report at the top … It's got to be right here, and this is gone
  too, because there's no point in having this." → The ECG card should use the report printed on the ECG.
  *Partly unclear: what "this is gone" refers to. Ask him.*

## Video 3: "Integrated Call Window Timer for Scheduling" (read to 2:21)
- **Keep the call-window timer, and put it where he looks.** "I do like having a timer to tick down … so I
  know how much time is left in my call window. And when I'm looking at this, … it wouldn't be information
  that I would utilize, because it'd be too out of the way." "It's a subtle cue to keep you on track … more
  clinical utility than at first meets the eye. And that's why I want it more integrated, because I lose
  track of time all the time." When a hard call ends "you're disoriented. And so it's just there to reorient
  you." → The countdown should not live only in the small top-right pill. *Certain.*
- **Live queue by call window.** "Scroll down to the live queue by call window … wouldn't it just be like
  'why later today?' Wouldn't it just be like the call window? Boom, here … the call window here." → The
  queue's group headings should be the call windows themselves, with the current one showing its timer; the
  "Later today" label isn't meaningful. *Fairly certain.*

## Video 4: "Prioritizing Critical Lab Results and UI Updates" (read to 2:49)
- **Home strip wording.** "17 to review, two unread messages. I didn't really understand what that meant.
  … It would just be good to just have … Seventeen to review." → Say only "17 to review". *Certain.*
- **A coordinated colour system for Needs attention.** *Certain; the details are open.*
- **Lab results in Needs attention are all critical.** "I just think that lab work should all be critical …
  a potassium level of 6.3 is still critical … it's high and certainly could become catastrophic … people can
  have arrhythmias at this level … if I'm grabbing your attention for lab work, it should all be critical.
  There shouldn't be any soft [stuff] in there … Critical result means you got to move on it." → No "High"
  tier for labs in Needs attention. Anything that reaches it is Critical. He is "very judicious in what is
  presented … as far as needs attention is concerned." This changes the 27 and 30 Sep "Critical and High"
  rule, and answers part of OQ-76. *Certain.*
- **A nice-to-have.** "It'd be nice that this would have a few like Panorama Ridge … it's nice for the doctors
  to see all the cool stuff in the province." → A few BC landscape photos on a welcome or splash screen.
  *Low priority, loosely understood.*

## Together with the two earlier videos (`2026-10-18-portal-walkthrough.md`, `2026-10-18-modular-ai-and-note.md`)
Phone or headset choice; billing at the end of the chart; prescribing from favourites; per-section AI
switches and an "AI view"; no ICD-9 "Add diagnosis" in the note; ordered and pending at the top of the chart
summary.

## Questions for Daniel
1. ECG card (video 2): what is "gone", and what should the card show from the printed report?
2. Where does Needs attention sit relative to the Intake summary? The lead's proposal: Needs attention first
   when something is there (critical results are never buried), then Intake summary, then Chart review.
3. Which Needs attention colour system does he want, now that labs are all critical?
4. Is the countdown best in the queue's current-window heading, in the chart header, or both?
5. What is in the last part of each video?
