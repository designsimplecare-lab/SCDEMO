# Meeting with Daniel Pannozzo — 21 Sep 2026, 15:00 PDT

Source: Gemini meeting notes, Google Doc
`1x5_9wC5UNOxGWqthUZHwrKDJ1w2OieFqS984ePp0Qvs` (tabs: Quick notes / Full notes /
Transcript). Captured 22 Sep 2026. The full transcript stays in the doc; the
actionable half is reproduced here so it is not lost behind a login.

## Decisions marked "Aligned"

1. **Needs-your-attention appears only when populated** — no empty-state list.
2. **Flip health card verification and visit status** in the table.
3. **Visit status becomes a clickable dropdown** directly in the queue.
4. **Remove the "showing now" filter**, restore the open display of time windows.
5. **Remove noisy detail fields** to reduce clutter.

## Next steps — Ani

- **Reorder UI** — columns read: patient name, visit status, billing status,
  health card verification, in that order.
- **Add dropdown** — update visit status from the patient list, without opening
  the chart.
- **Add filters** — filtering on the patient list; remove the showing-now button.
- **Set default view** — navigation menu collapsed by default.

## Next steps — Daniel

- Design a new visit status category, plus the automated email/SMS notification
  system for patients.
- Write detailed feedback on the current AI workflow.
- Investigate Open Evidence as a clinical AI sidekick.
- Contact Accelerus to finalise onboarding and secure API access.
- Evaluate intuitive UI for AI interaction, including voice commands.

## Group

- Finalise the design for the EMR chart.

## Agreed in conversation but missing from Gemini's summary

These were settled on the call and do not appear in the decisions or the next
steps, which is how they were missed on the first pass.

- **Three filters, not one.** Daniel: *"I'm not a big filter guy."* Ani put the
  volume to him -- ninety or a hundred rows in a window -- and he conceded:
  *"You got me on that one."* Ani: *"we need three filter here"* -- visit
  status, billing status, health card.
- **The relative age is redundant.** Ani called out *"it came two hour ago, one
  day ago"* sitting beside a received time; Daniel agreed. The order still has
  to be first in, first out.
- **FIFO inside each band, never across them.** Routine, high, critical. First
  in wins, but only against its own category: *"it is not superior to anything
  within its respective category."*
- **What Daniel meant by "remove it"** was never the time windows -- it was the
  visit status filter, and he abandoned that too. The windows stay open.
- **Greens are too loud.** *"Even this colour scheme is a little bit
  overwhelming."* Colour only where it should pull the eye.
- **A new visit status is coming from Daniel** -- "doctor is running late",
  name to follow -- with a time tolerance and an automated text and email to
  the patient.
- **The attention line must say what is wrong, drawn from the report itself.**
  *"Review MRI report"* is a mystery; the AI should synthesise under five words
  of context. *"Don't keep it a mystery."*

## Points worth keeping from the detail

- **Why the windows must stay open.** Daniel is a visual thinker and loses track
  of time inside hard consultations: *"when I don't know where I am, I get
  nervous."* He wants the active window and the moving clock in front of him at
  all times, with no click to reveal them, so that a window that has moved on
  without him reads as a warning that carried-over patients are now stacked on
  the next one.
- **The attention list is not an inbox.** Critical to high urgency only; routine
  never appears. His stated worry is MOAs over-tagging: if everything needs your
  attention, nothing does.
- **Lab work is the foundation.** He mapped it from LifeLabs source
  documentation himself over five to six hours. Imaging and consult reports
  rarely need urgent review.
- **Lab timestamps must be the time the clinic received the result**, never the
  time the lab generated it — otherwise the record implies clinic negligence.
- **Volume.** He rejects a cap on rows: 40–60 patients in one call window must
  scroll, not paginate. A "Gloria is next" badge tracks the queue.
- **Colour.** Red is reserved for critical alerts alone.
- **DOB and personal health number** come out of the primary list view.
- **Test at 100% browser zoom**, not 75%.
- Dark mode is a popular demo feature with doctors.
- Callback workflow: a branded number plus a doctor-to-call-back status gets him
  a **95% contact rate**.
