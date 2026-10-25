# Daniel's "Prescription Modal — Requirements v2 (PharmaNet and Electronic Prescribing)" — 18 Oct 2026, read 21 Oct

Source: PDF (9 pages) attached to "Simple Chart: PharmaNet & Medication Reconciliation" in his Notion; read in the browser pane
(not kept in the repo). It is the written spec behind the two prototypes (`2026-10-21-prescribing-prototypes.md`) and
replaces his version 1. It is built to the PharmaNet electronic prescribing standard (Conformance Standards v3.7, Volume 4C, Table 4).

## Phases
- **Phase 1, now:** build the modal once and run it on **fax**. Import medications (CareConnect screenshot or PDF, uploaded lists), reconcile, plan, sign, fax.
- **Phase 2, when BC opens prescriber onboarding (expected early 2027):** switch the send route to PharmaNet with **no change to the screen or the data**.
- **Phase 3, later:** other provinces (adapters), FHIR messaging, other organisations.
- Goal for the doctor: **the AI fills in everything; the doctor approves changes and signs.**

## Medication sources (phase 1 runs on imports)
| Source | How it gets in | Row label |
|---|---|---|
| CareConnect | the doctor uploads a screenshot or PDF; the AI extracts rows | "CareConnect · imported by the doctor, date" |
| Uploaded list | pharmacy list, hospital discharge summary, the patient's own list | tagged by source |
| Clinical intake / doctor | intake form or typed | Intake or Doctor |
| PharmaNet (after approval) | live connection | PharmaNet |
- Extraction runs on the built-in AI in Canada; the uploaded image is **not kept** after extraction unless the doctor saves it.
- **Every extracted row is an AI draft until the doctor confirms it**; show the original image beside the rows. Leave a field empty rather than guess. Days left always "estimated" for imports. Each confirmed row keeps its source tag in the chart.
- CareConnect data counts as PharmaNet data: tag it, care only, never de-identified, never sent to the connector or used for training.

## Three steps, three approvals
Nothing the AI fills in reaches the chart or PharmaNet without the doctor. Every approval is saved with the prescriber's name, date, time and what was approved.
1. **Medication review.** PharmaNet profile pulled and matched to our chart. Mismatches are grouped under "To reconcile"; each AI-proposed change has its own Approve button, and "Approve remaining and continue" approves the rest.
2. **Plan and prescribe.** A plan per problem; each decision writes a structured prescription. The safety check runs on the final regimen.
3. **Approve and sign.** A separate, deliberate click: the prescriber's attestation. Sends by fax (or PharmaNet later), then shows the result.

**Step 1 rules.** Always at the top, a PharmaNet band: adverse reactions and clinical conditions from PharmaNet beside our allergies, with "Add to chart" for anything missing; the protective-word prompt when PharmaNet asks for it.
One compact row per drug: drug, strength, form, directions; the **indication only if one exists** with a clickable source (problem list, visit note, PharmaNet e-Rx; who and when), otherwise "No indication on file"; e-Rx details when they exist (fills authorised and dispensed, expiry); pharmacist comments and discontinued dates on the row itself (never only in a hover); prescriber and Simple Rx or outside; pharmacy; date filled; quantity; days left ("PharmaNet days supply" on e-prescriptions, otherwise "estimated"); an issue-count badge (details on hover, keyboard focus or tap, *Ani designs*); the AI plan, adjustable by clicking.
**Grouping:** *To reconcile* = on PharmaNet but not in our chart (one click: add to chart, or add all), and in our chart but refill overdue as per PharmaNet (record as stopped, or still taking); *Reconciled* = in the chart, on PharmaNet, taken as prescribed.
**Wording:** state facts from PharmaNet, never a reason or a judgement ("As per PharmaNet: last filled 2026-07-01 · overdue by 19 days").
**Dispense history:** the 15 most recent PharmaNet dispenses with comments and discontinued dates, visible before leaving the review, with "View all".
Not in phase 1: patient-reported drugs that are not in PharmaNet (they come from the intake or the doctor).

**Step 2 AI rules.**
- The plan on a drug's row is about that drug only; a new drug (for example amlodipine for blood pressure) sits in the **problem's** plan.
- **Default is No change.** Propose a renewal only when 14 days or fewer are left, or when supply would run out before the next follow-up (policy 5.2: no coverage with more than 14 days left).
- A renewal defaults to **90 days plus the drug's standard repeats** from its clinical library record; fewer repeats when a lab or review is due sooner.
- Check PharmaNet e-prescriptions before renewing: if another prescriber's prescription still has fills left, propose No change.
- Indication code pre-filled from the visit's clinical concern.

**Structured fields (used by fax and PharmaNet alike).** Drug, DIN and name (AI, from the BC drug library; PharmaNet Provincial Medication Value Set where possible); dose and unit (AI, two decimals); route and frequency (AI; the frequency code supports taper and "other"); **total quantity and total days supply are calculated** (one decimal; never a fixed default); refills and dispense interval (AI; interval for controlled drugs); date written, dispense start and expiry (system; expiry defaults to 2 years); indication code (AI; PharmaNet code list with "Other indication" plus notes); patient instructions (generated from the fields, editable); prescriber notes, do not substitute, compliance packaging (the doctor, optional).
**Safety check on the final regimen:** local drug check including PharmaNet adverse reactions; PharmaNet screening is off unless requested; any override needs a reason stored with the prescription; **Schedule 1A drugs are blocked** from fax and electronic send.

**Step 3, send.** Today (fax): sign and send to the patient's pharmacy; stop own prescription = note in chart and to the pharmacy. After onboarding: record, revoke or discontinue with reason, adjust and list own prescriptions through PharmaNet transactions. After sending show the fax confirmation and a preview (or each PharmaNet prescription ID, response status and message). Duplicates: show PharmaNet's warning with both IDs. Another prescriber's drug: never cancel their prescription; record the decision in the chart and send a note. Fax content: prescriber name, College registration, contact details, date, patient name, PHN, date of birth, allergies, each drug with quantity and refills, signature. Every send, cancel and change is logged against the prescriber and the visit.

## Data and privacy
PharmaNet data is viewed live and not stored as a raw profile; only what the doctor confirms into the chart (a drug, an allergy, an indication) is saved, tagged PharmaNet. It is **never de-identified, sent to the doctor connector, or used for AI training**. A prescription the doctor signs is the doctor's own data. Processing, storage and backups in Canada; access only for care by authorised users.

## Open questions in his page (for the Ministry)
Terminology Worksheet copy; whether transactions are tested now or at onboarding; the onboarding date; whether to build message version 70 now; whether a certified application may provide e-prescribing to other organisations.
