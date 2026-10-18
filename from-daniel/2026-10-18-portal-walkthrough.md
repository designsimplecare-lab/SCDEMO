# Daniel's walkthrough of his live physician portal: calling, billing at the end, prescribing — 18 Oct 2026

Source: a 4:56 Loom Daniel recorded for Ani ("Physician Portal Workflow and Prescribing Tools"). He walks
through his own live portal, patient list and prescribing. **The video shows real patients, so the link is
kept in `private/links/` and nothing from the screen is copied here.** The transcript the lead could read
stops at 4:36, so the last ~20 seconds are missing. Quotes are verbatim, with profanity left out.

## What he said
**Calling: offer both routes.**
> "on [the calling service], when you call the patient, it pairs to your cellular device. When you headset call, it pairs to the internet. Wi-Fi voice over IP"
> "depending on where your internet is the strongest, you can use your cellular data or you can use Wi-Fi"
> "because we have those two different options … it would be good to have both those things because you
> know the doctor could choose one or the other."

**Billing belongs at the end of the chart, not as a separate action.** He listed the live actions (prescribe,
labs, imaging, referrals, create a note, documents, review billing), then:
> "we shouldn't have this here. It should be at the end of the chart because that's how you complete the
> chart when you submit the billing"
> "at the bottom is when I would do my billing. I wouldn't use this."

**His live billing flow, shown quickly:** the AI suggests the diagnosis ("this is technically accurate …
that's accurate. Boom. And done. Submitted claim"), and the claim shows as paid in his list.

**Prescribing is the most important action, and the drug database isn't usable yet.**
> "prescribe is the most important, or one of the most … ones that we have to draw off of."
> "this is the Health Canada's drug database API. It doesn't work. It's not clinical. It's not helpful. It
> doesn't give the right clinical. It is really just a database. So, not that we don't have a use case for
> it, we do. It's just can't use it right now."
> "So if we go boom, so I can choose my favorites." (the transcript ends soon after)

## What it means (the lead's reading)
- **Calling:** the Call button should let the doctor choose **phone** (the cell connection) or **headset**
  (internet, Wi-Fi), and the call shows which one is running.
- **Billing at the end of the chart:** already how our demo works (the claim is dealt with at Sign off, and
  "Review billing" is not an action). No change needed.
- **Prescribing:** our demo already starts from the doctor's favourites and doesn't rely on a drug
  database. Keep it that way; the Health Canada database can't be the clinical source for now.

## Tension to settle (feeds OQ-87)
In his live flow the doctor accepts the AI's diagnosis and **submits the claim at the end of the chart**,
which completes it ("that's how you complete the chart when you submit the billing"). Our demo follows the
Simple Billing PRD instead: Sign off closes the visit and the doctor signs off claims **in a batch** from
Claims. His words here lean towards **submitting at the end of the visit**. Ask him which he wants.

## Questions for Daniel
1. Calling: should the doctor's last choice (phone or headset) be remembered as the default?
2. Billing: submit each claim at the end of the visit, or in a batch from Claims (OQ-87)?
3. The end of the video was cut off in what we could read. What did he show after "I can choose my
   favorites"?

## One more observation, from the first frame of the video (Ani sent a screenshot)
His live Daysheet for Saturday 17 Oct shows **three call windows plus Add-On**: 8:00 AM–12:00 PM,
1:00–7:00 PM and 7:00–9:00 PM. The demo has four shorter windows (8–10, 10–2, 2–5, 5–7). On 29 Sep Daniel
said the number of windows is deliberately limited but he wasn't sure how many (see
`from-daniel/2026-09-29-home-feedback.md`, and the open question on window lengths and times). **Ask him
whether the live three-window day is the target.** The screenshot itself shows real patients and is not
stored. The same screen's columns are Number in Queue, Patient, Clinical concern, Visit status, Billing
status and Action ("Access Chart", "Correct"), which our queue already covers.

## Context (Ani, 18 Oct)
Daniel recorded these videos while going over **the Figma use-case journeys file** (screenshots of the
doctor flows from the demo as captured on 16 Oct, including changes that were not yet live). So his
comments on the note, the Action tab and the call are about those demo screens. The first video also shows
his own live portal for comparison. If he leaves comments in the Figma file, they are about the same
screens.
