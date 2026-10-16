# Daniel: a reminder workflow built from specialist reports — 15 Oct 2026

Source: WhatsApp from Dr. Daniel Pannozzo to Ani (about 10:45–10:50 PM), with a 2-page specialist
consult report and the doctor's reply to the patient. **Patient details are deliberately left out of this
file:** the repo is public, and the example is a real patient's case. The report was not attached in the
screenshot, so only the reply letter was readable. Quotes are verbatim.

## The example (described, not copied)
A specialist's consult report followed a scan that showed a finding the specialist thought was probably
an artifact. Daniel read it and replied to the patient in a letter that:
- explained the finding and the specialist's view in plain words;
- said what the surgeon recommends (the definitive test) and recorded **the patient's reluctance to have
  it, which he respected**;
- agreed an **alternative: repeat imaging in about 3 months and a repeat blood marker in 6 months**;
- said plainly that repeat imaging can't fully replace the definitive test, and that they can revisit it
  at any time.

## What he asked
> "Can we extract from these reports - and build this workflow into Simple?"
> "Reminder workflow"

Ani asked him: "this will go out from your portal to patient email?" He answered:
> "It is always best to have both the Doctor and Patient aware."
> "Even better that the AI remind the Doc - in some area of the platform."
> "Best is that the AI completes these reqs/tests automatically for the Doc to sign off on"

## What it means (the lead's reading)
From an incoming specialist report, Cedar should:
1. **Extract** the recommendations and their timing ("repeat in about 3 months", "in 6 months") and what
   the patient decided.
2. **Draft the reply to the patient** for the doctor to approve and send through the portal.
3. **Create reminders** for both the doctor and the patient, with dates.
4. **Draft the requisitions and tests** (the repeat scan, the repeat blood test) ready for the doctor to
   sign off. The doctor signs; nothing is ordered or sent by itself (rule 18).

## Fit with what we have
- The chart already says "N recommendations from a new consult are not in the plan yet" and has a care plan
  with owners and due dates, Pending items and an Expected results list. A recommendation keeps its stated
  owner (rule 15), and the care plan and tasks stay separate (rule 13).
- The document-routing spec (B-003) already covers filing a specialist report into the chart and the
  doctor's Inbox. AI Chart Assist Phase 2 (B-007) covers AI-drafted investigations and referrals.

## Questions and flags
- **How does the patient get the letter?** Daniel's idea is the portal, with the patient told by email. By
  our rule 8, **no health information in an email subject or SMS preview**; a generic "you have a new
  message" is fine. Needs Daniel and `privacy-security`.
- **Where do reminders live?** Proposed: as dated care-plan items owned by the GP, shown in Pending, on
  Home when due, and in the doctor's Needs attention when overdue. This is not rule 14's "scheduled
  deferral"; a dated follow-up is care that has been planned.
- **Patient reminders:** a notice in the portal when due. Email or SMS needs the patient's consent
  (CASL) and no health details in the message.
- **A patient who declines the recommended test:** the doctor's reply records an informed choice.
  The chart should keep that decision visible. Needs `clinical-safety`.
- **Report content:** we haven't seen the specialist report. Ani, send a copy with the patient's name and
  identifiers removed, or tell us what a typical one looks like.

## Ani's answer, 15 Oct
The patient is told by the portal **and** by email, and patients already consent to both at registration, so no new consent step. Rule 8 still holds: the email says only that there is a new message.
