# Daniel's two prescribing prototypes (built with an AI tool): the fields — 21 Oct 2026

Source: two web prototypes Daniel built and sent through Ani (links in `private/links/`). Ani's brief: **they show the
fields and the content he needs; they are not the design.** We redesign them to be simple and intuitive in our own
design system. Both use an invented demo patient (name omitted here). Read through screenshots and clicks (the pages are
framed and read-only); the right edge of the second one is cut off in the narrow pane, so the last columns are not seen.
This is the "document on prescriptions" Daniel promised in the 18 Oct videos ("people can be on 30 different drugs").

## 1. "Prescription Pad": write the prescription as one sentence
- **Header:** name, age and sex, PHN, weight (kg), CrCl (mL/min), allergies (red).
- **Provenance line:** "Written by AI from the visit · Checked against PharmaNet 16:24 · Click any part to change it".
- **One row per prescription:** indication (for example CYSTITIS) with a NEW or RENEWAL tag, then the whole order as
  clickable parts: **drug, strength, dose (1 cap), frequency (BID), duration (5 days), quantity (#10), repeats (no repeats)**.
  Below it: patient directions in plain words ("Take 1 cap twice a day, with food, for 5 days"), "Substitution allowed",
  "Total supply", and for a renewal "Refill every 90 days" and "Renews Rx [number]".
- **Click a part to change it:** the drug shows alternatives as chips (same indication); the dose shows chips (0.5, 1, 2, 3 cap).
- **A status dot per row** (blue and green). Clicking it shows the reason in a sentence ("CrCl 48 is acceptable. Avoid below 30").
- **Remove** (×) per row.
- **A type-a-change box:** "add amox 500 tid 7 days · make it fosfomycin · remove levothyroxine", then Apply (AI edits the order).
- **Footer:** "Send by PharmaNet e-prescription · any pharmacy the patient chooses · change", then the doctor's name, "College ID on file",
  and one button: **Sign and send**.

## 2. "Prescription Modal: Reconcile then Prescribe": two steps
**Header:** "Medication review and prescribing · Virtual visit · date", name, age, sex, weight; **PharmaNet live · 14 months**;
CrCl with its date; allergy (named, with reaction); problems from the chart; today's concern; **protective word** ("none on profile · Enter if asked");
a PharmaNet box showing **adverse reactions not in the chart** (drug, reaction, source, date, "Add to chart allergies") and **clinical conditions
PharmaNet knows**.

**Always visible on the right:** **Final regimen** (every drug with route and directions; new ones marked, stopped ones struck through) and
**Safety check, final regimen** (grouped warnings, for example *Sedative · age 65+* and *Renal*, then "Interactions resolved. Allergy,
duplicates, Schedule 1A, maximum dose: clear").

**Step 1: Medication review (reconcile).**
- Filters: All drugs · Needs attention · "Add outside drugs to chart".
- Summary line: *6 to reconcile · 3 interactions · 3 without indication*; "Assumes taking as filled unless the visit says otherwise".
- Table columns: drug and directions; prescriber and pharmacy (tags "Simple Rx" or "Outside"); fill (date, quantity).
- **Group "To reconcile: PharmaNet and chart disagree"**; each drug shows an interaction-count badge (hover for issues), directions, a source line
  (pharmacist note, e-Rx written date, fills authorised and dispensed, expiry), the indication with a link to the chart source (problem list, visit note, lab),
  and an action: *Record as stopped / Still taking*, *On PharmaNet, not in chart: Add to chart*, or *No indication on file: Link to a chart entry*.
  An AI tag marks inferred statements (for example "last filled 2026-07-01, overdue by 19 days").
- **Group "Reconciled"**: in the chart, on PharmaNet, taken as prescribed (drug, directions, indication, the latest relevant result such as LDL or TSH, source).
- **PharmaNet dispense history**: 15 most recent of 31 in 14 months, newest first (date, drug and DIN, quantity, directions, prescriber, pharmacy), "View all".
- Footer line: "AI suggestions stay drafts until you approve · approval is recorded in the chart with your name and time"; **Approve remaining and continue**.

**Step 2: Plan and prescribe (by problem, not by drug).**
- One row per problem (including today's UTI and drugs with no indication), each with a one-line status (for example "148/90 on ramipril 10 mg · 44 d left").
- **One choice set per problem**, with the AI's pick pre-selected: UTI = nitrofurantoin / fosfomycin / cephalexin; hypertension = Continue / Titrate / Add agent;
  dyslipidemia = Continue / Renew now; diabetes = Restart IR / Switch to XR / Add agent; hypothyroidism = Renew / Adjust; depression = Bridge / Assume care / No change;
  low back pain and zopiclone = Continue / Taper / Do not renew; omeprazole and ASA = Review next visit / Step down PPI / Stop ASA.
- An **AI suggestion line** under each in one sentence with the reason (kidney function, allergy, interaction, fills left, Beers list).
- "+ Add a drug for this problem".
- The chosen option produces a **ready order card** on the right (drug, dose, route, frequency, quantity, repeats, indication, substitution).
- **Sticky bottom bar:** "Back to review", **Send by** (e-Rx and others), and **Approve and sign N prescriptions**.

## The field list (union of the two)
Patient: name, age, sex, weight, CrCl and date, allergies with reaction, protective word, PHN.
Context: problems, today's concern, PharmaNet adverse reactions and conditions not in the chart.
Each drug: name, strength, form, route, dose, frequency, duration, quantity, repeats, refill interval, substitution allowed, indication, patient directions,
prescriber, pharmacy, fill and dispense dates, fills authorised and dispensed, expiry, source of each statement, interaction and safety flags, AI tag,
status (new, renewal, continue, stopped, not in chart, no indication).
Whole order: final regimen, grouped safety check, send method, pharmacy, "Approve and sign N".

## What this tells us (lead's reading, to confirm with Ani)
- Daniel's mental model is **by problem**, with the AI proposing and the doctor approving; the Health Canada drug database stays out of it.
- Two jobs, in order: **reconcile what the patient actually takes (PharmaNet vs chart)**, then **decide per problem**.
- Everything the AI says carries a source and stays a draft until the doctor signs (already our rule).
- Needs the PharmaNet and medication-reconciliation specs in his Notion (Integrations; Simple Chart: PharmaNet & Medication Reconciliation), not read yet.
