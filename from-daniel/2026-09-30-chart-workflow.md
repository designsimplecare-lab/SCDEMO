# Daniel on completing the chart: "where am I charting?" — 30 Sep 2026

Source: a 4-minute screen recording from Dr. Daniel Pannozzo to Ani, "Completing the Patient Care
Chart Workflow". He is reviewing the v2 chart (demo patient Gloria McDonald), scrolling from the
header, through "This visit" and "Since last visit", the full care plan and the note box. The
recording stays local; it is not committed. Quotes are from the transcript Ani pasted, with
profanity starred.

## What he said
**He couldn't find where to write the note.**
> "So, where's where's my note? So, I'm um, I'm confused."
> "I said this. Nauseum, but uh, where am I charting?"

In the frames, the note box sits below the "Since last visit" summary, the "Read the Jun 25 note"
button and the ambient scribe bar. He scrolled past the care plan and back up before he found it.

**The care plan is comprehensive care, and not the focus right now.**
> "Um like well this is more comprehensive care, so don't worry about that just yet."
> "So, this is full care plan, but what the f oh yeah, this is this is pretty good."

**He reacted to "Chase their office"** on a specialist's care-plan item:
> "Whoa, Chase their office. The f\*\*\*? I'm gonna have to review this."

His meaning isn't clear (surprised or bothered). **Ask him.**

**What he wants: an AI workflow that gets the chart done, not a nicer layout.**
> "Yeah, I'm open to how it could be displayed a little differently, but I'm more interested in an
> AI workflow, which is to say, how do I get through the chart, right? How do I complete that
> f\*\*\*\*\*? And then when it's complete, it's how it's displayed."
> "I'm talking to the patient, right? Boom, there's my note. Boom, this is like, you know, and so
> that's kind of like a progression. … At the end of it, the chart's done."

**He is writing a requirements document for the chart.**
> "So, I'll give a requirements document on the chart itself. I think it's like this is a good
> place to branch off of."
> "I'm going to zero in on this tonight, get this sorted out as in what I think is helpful, go from
> there."

## What this means
- **The chart is two modes.**
  - Doing the work: in the call, the AI turns the conversation into the note step by step, and the
    chart is complete at the end.
  - Showing the result: how the completed chart displays afterwards.

  Today's v2 is mostly the second mode, with the note box low on the page.
- **We wait for his requirements document** before redesigning the chart. The current v2 is the
  base to branch from ("a good place to branch off of").
- **Not changed in v2 yet, on purpose.** A layout fix now would likely be redone once his document
  arrives.

## Open questions for Daniel
- What did "Chase their office" make you think: is it wrong, or unexpected?
- The requirements document: when can we expect it, and should it cover the ambient scribe, the note
  structure and sign-off together?

## Follow-ups
- Task T-021 (the chart's AI charting workflow) is **Blocked** until his document arrives.
- When it arrives: `product-manager` turns it into requirements; `ai-engineer` and `clinical-safety`
  review the AI drafting (the doctor always signs, and nothing auto-files); Manoj designs.

## Follow-up, 3 Oct 2026
Daniel's chart document arrived: **Physician Chart View Requirements v2.5** (bulletin B-006). It puts the note and its actions beside the clinical context at ≥1440 px, and orders the chart: patient snapshot → Needs Attention → Today → relevant context → since you last saw → threads → full chart. T-021 is unblocked.
