# Daniel on modular AI, the diagnosis in the note, and putting pending orders on top — 18 Oct 2026

Source: a 4:26 Loom Daniel recorded for Ani, "Modular AI for Clinical Documentation Workflows". **The link
is kept in `private/links/` because the video can show real patients.** The lead could read the transcript
only up to 2:09; **the second half (2:09–4:26) is missing**, so what follows covers the first half only.
Quotes are verbatim, with profanity left out.

## What he said
**AI that works while he talks.**
> "I'm talking to the patient and the AI is filling this out in real time."

**The AI is modular, like the platform: switch it on where you want it.**
> "I think that AI … can be modularized, just like the entire platform is modularized."
> "you can apply agentic workflows where you want. So, a doctor could turn on the AI for the note-taking,
> but turn it off for the prescriptions. Or … we can basically activate it where we want it activated."

**An "AI view": start to finish.**
> "we would even have an AI view. And that's where we talk about going from start to finish. As I pick up
> the phone, the scripts are auto-populated, you know, everything's done."

**The diagnosis in the note is the assessment; the ICD-9 code is billing, so remove "Add diagnosis".**
> "the diagnosis is: there's my diagnosis in the chart, that would be my assessment. But this add
> diagnosis, that's billing. That's the ICD9 code. So we can remove that. All this is just one big note."

**What was ordered and what is pending belongs at the top of the chart summary.** About the Action tab's
list of the last lab orders and what is pending:
> "this goes right into the clinical, this goes into the chart review. That's … I'm gonna want to see right
> at the top because … I need that information to make my assessments."
> "that's a rate limiting step. So when I look at the chart, I would want that in the chart summary."
> "this is what you order, this is what's pending. Right, and it's good to see that right up front, not
> buried down here, it's too important."

## What it means (the lead's reading)
1. **Per-section AI switches.** The doctor can turn Cedar on or off for each part (Review, Note, Prescribe,
   Order, Refer), and there is an "AI view" or full-encounter mode that does it all from the moment the call
   starts. This is the two modes in the AI Chart Assist requirements (`B-007`).
2. **No ICD-9 picker in the note.** The Assessment is plain clinical text. The ICD-9 diagnosis is a billing
   item and belongs with the billing at the end of the chart, where the AI suggests it and the doctor
   confirms. This **replaces** his 11 Oct line "Assessment: clinical impressions and ICD-9 diagnoses".
3. **"Ordered and pending" moves to the top of Review,** right under what needs attention. It is the list of
   the latest orders and what is still outstanding, with their status.
4. **The note is "one big note",** which fits the continuous-note change already made.

## Questions for Daniel
- What does the second half of the video (2:09 onward) say? Ani, please paste it or let us read it.
- Per-section AI switches: where do they live (on each section, or one panel), and is the setting per
  doctor or per visit?
- Should the AI's ICD-9 suggestion appear only at Sign off (billing), or also as a hint while writing the
  assessment?

## Context (Ani, 18 Oct)
Daniel recorded these videos while going over **the Figma use-case journeys file** (screenshots of the
doctor flows from the demo as captured on 16 Oct, including changes that were not yet live). So his
comments on the note, the Action tab and the call are about those demo screens. The first video also shows
his own live portal for comparison. If he leaves comments in the Figma file, they are about the same
screens.
