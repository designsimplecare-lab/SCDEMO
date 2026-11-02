# Prescribing redesign: Medications and prescribing (design decisions, 21 Oct 2026)

Status: **Built** in `simplecare-physician-portal-v2.html` (Ani, 21 Oct: "do all"; first build 22 Oct, see "What was built" at the end). Gates still to run: `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility`. Sources: Daniel's two prototypes and his Prescription Modal Requirements v2
(`from-daniel/2026-10-21-prescribing-prototypes.md`, `…-prescription-modal-requirements-v2.md`). His screens show the **fields and rules**;
this is our design, in the portal's own design system (light mode, no uppercase, ≥14px, 44px buttons, red only for critical, Mage icons).
Replaces the "Renew a prescription" card (`rx-card`); keeps what it does: favourites, directions × days = quantity, send by fax myself or ask the MOA.

## The shape: one panel, three steps
Opens from **Prescribe**, as a full-height panel over the chart, not squeezed into the note column. Callers: the Orders row, the Medications section of the chart ("New prescription"), and a renewal visit (opens by itself, see below). The note toolbar's Prescribe button also calls it, but that toolbar is hidden in the v2 chart. The chart stays behind it.
- **Top:** a step bar with plain names, **1 Review medications · 2 Decide · 3 Sign and send**, showing which are done.
- **Left (main):** the current step.
- **Right (always visible):** "Prescriptions today" (the final regimen: new, changed, stopped) and the safety check. Under it on narrow screens.
- **Bottom bar:** Back, and the one next action ("Continue to decide", "Continue to sign", "Sign and send 4 prescriptions").

## Patient facts (one band, always on top)
Weight, kidney function with its date, **allergies and adverse reactions from the chart and from PharmaNet together** (anything only on PharmaNet shows "Add to chart"),
today's concern, and the protective word when PharmaNet asks for it. Source line: "PharmaNet" when live; in phase 1, "CareConnect · imported by Dr. Pannozzo, date".
No PHN here (Daniel: identity is not front and center).

## Step 1: Review medications (reconcile)
- **Phase 1 entry:** "Add medications" with upload screenshot or PDF, then an AI draft with the original image beside the rows; every row is a draft until confirmed ("Confirm" per row, "Confirm all"). Source tag stays on each row.
- **Two groups, the first open:** **To reconcile (N)** then **Matches the chart (N)** collapsed to one line.
- **A row is one line plus one sentence:** drug, strength and directions; below it the indication with its source, or "No indication on file"; prescriber and pharmacy; days left (marked "estimated" for imports).
  Facts only: "As per PharmaNet: last filled 2026-07-01 · overdue by 19 days".
- **One tap fixes it:** *Add to chart*, *Still taking*, *Record as stopped*, *Link to a chart entry*. Pharmacist comments and discontinued dates sit on the row.
- **Issues:** a small count on the row; tapping opens the reasons right under the row (not only on hover).
- **Dispense history** is a collapsed line, "PharmaNet dispense history, 15 most recent of 31", opened before leaving the step; DINs only here.
- Footer line: "AI suggestions stay drafts until you approve." Button: **Continue**.

## Step 2: Decide (by problem)
- **One row per problem**, today's concern first, then the chart's problems, then drugs with no indication. Under the problem name: one status line (for example "148/90 on ramipril · 44 days left").
- **Choices are a segmented control** with the AI's pick selected and **No change as the default**; the labels are plain (Continue, Renew now, Adjust, Stop). One AI line below, labelled AI, with the reason and source.
- **Choosing writes the order as one sentence you can edit by tapping a part:** drug, dose, how often, how long, quantity, repeats ("Nitrofurantoin 100 mg · 1 capsule · twice a day · 5 days · 10 capsules · no repeats"). Quantity and days supply are calculated, never typed, and show their working.
- **Behind "More options"** (closed): route, indication code, patient instructions, do not substitute, compliance packaging, notes to the pharmacist, dispense interval for controlled drugs.
- **"Add a drug for this problem"** offers **Favourites first** (Daniel prescribes from favourites), then search; never the raw Health Canada database as the first view.
- Renewals default to 90 days plus the drug's standard repeats; fewer repeats when a lab or review is due sooner. A drug another prescriber still has fills for defaults to No change.

## Step 3: Sign and send
- A plain list of exactly what will be sent (drug and sentence, quantity, repeats, pharmacy), nothing editable here except **Back**.
- **Send to:** the patient's pharmacy with **Change**. Route today: fax. **Two equal buttons, neither default** (Daniel, 26 Sep): "Sign and send by fax" and "Sign and ask the MOA to send". After onboarding the route becomes PharmaNet with the same screen.
- The button names the count: **Sign and send 4 prescriptions**. This is a separate, deliberate click; the sign line reads "Signed by Dr. Pannozzo, time".
- After sending: the fax confirmation and a preview (later: each PharmaNet prescription ID and its message); a duplicate shows both IDs.

## Safety (always visible, never hidden by a step)
Grouped, plain-sentence warnings on the right (allergy, kidney function, interaction, duplicate, sedative with age, maximum dose), with "clear" lines for the ones that pass.
An override needs a typed reason that is stored with the prescription. **Schedule 1A drugs cannot be sent by fax or electronically**: the send is blocked with the reason.
PharmaNet screening is off unless requested (protective word). Red only for a blocking or critical item.

## AI behaviour (from Daniel's rules)
The AI fills and proposes; **the doctor approves each change and signs**; nothing reaches the chart or PharmaNet without that; every approval is saved with name, time and what was approved.
Every AI statement shows a source or says "AI draft". It never gives a reason or judgement about the patient's behaviour, only facts.

## Cut from the prototypes (kept but out of the way)
DIN and full dispense history (collapsed), substitution and notes (More options), the type-a-change box (kept as a later option; the segmented choices come first),
the large "Final regimen" text block (becomes the compact right list).

## What carries over from today's card
Favourites, the quantity worked out from directions × days, the pharmacy line, the fax and MOA routes, "nothing leaves until you press".

## Needs Daniel (do not guess)
1. Does phase 1 let the doctor add a drug the patient reports that is not on PharmaNet? (His page says not in phase 1.)
2. The favourites list: his actual drugs.
3. The PharmaNet Terminology Worksheet for indication and frequency codes.
4. Whether "ask the MOA to send" stays once e-prescribing is live.

## Build notes
- One main file: `simplecare-physician-portal-v2.html`, replacing the `rx-card` and its JS (`rxOpen`, `RX_STATE`, `rxReview`); keep the MOA task path (`moaTask`).
- Demo data: invented patients only; no real PharmaNet data; the PharmaNet source is shown as a label (phase 1: "CareConnect import").
- Gates: `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility`. New task T-026.

## What was built (22 Oct 2026)
One panel, `#rx-panel` (`role="dialog"`, `aria-modal`, labelled by its heading), replacing the `rx-card`. Sources are in the portal as demo data, marked in the code; nothing is real PharmaNet data and no vendor or model is named in the interface.

**Shell.** Step bar with done ticks; the patient band (weight from the patient's own readings, kidney function with its date or "Not on file", allergies and reactions from the chart and PharmaNet together with "Add to chart" for PharmaNet-only items, today's concern, the protective word when PharmaNet asks, no PHN); "Prescriptions today" and the "Safety check" always visible on the right (under the main column below 900 px); bottom bar with Back and the one next action.
**Focus.** Esc closes (the open override form or picker first). Once the doctor uses the panel, Tab stays inside it (including the live call widget, so a call can always be ended), the chart behind is inert, and focus returns to the control that opened it. A renewal visit opens the panel without taking focus and without trapping it until the doctor uses it (lead, 22 Oct).
**Step 1.** "Add medications" (upload screenshot or PDF, which in the demo loads a sample AI draft; or "Use the chart list only"); every row is an AI draft until confirmed (Confirm per row, Confirm all); "To reconcile (N)" open and "Matches the chart (N)" collapsed; drug, strength and directions, indication with source or "No indication on file", prescriber and pharmacy, fill date and days left marked estimated, facts-only wording; one-tap fixes (Add to chart, Still taking, Record as stopped, Link to a chart entry); an issue count that opens the reasons under the row by mouse or keyboard; a placeholder image panel beside the rows on wide screens; "PharmaNet dispense history, 15 most recent of N", collapsed, DINs only there (the DINs are placeholders). Each approval is saved with name and time and shown on the row.
**Step 2.** One row per problem, today's concern first; segmented choices (No change, Renew now, Adjust, Stop, or a start); the AI pick is marked and selected only by rule (14 days or fewer left and no other prescriber's fills, or a sourced recommendation) and **stays an AI draft until the doctor approves it or chooses**; Continue is off until every AI proposal is approved. The order is one sentence whose parts open a chooser (drug, dose, how often, how long, quantity, repeats); quantity and days supply are calculated with the working shown, never typed. Renewals default to 90 days plus the library's standard repeats. "More options" (closed): route, indication, instructions, do not substitute, compliance packaging, note to the pharmacist, dispense interval for a Schedule 1A drug. "Add a drug for this problem": Favourites first, then search.
**Step 3.** A plain list of exactly what will be sent, "Send to" the pharmacy with Change, and two equal buttons, neither the default: "Sign and send N prescriptions by fax" and "Sign and ask <MOA> to send N prescriptions". Both reuse the old paths: the fax goes Sending then Delivered with the patient copy, and the MOA path files one `Prescriptions` task through `moaTask` and shows "Picked up by". The note gets the plan line with "Signed off by Dr. Pannozzo, time"; after sending the panel shows the signed line and a fax preview; Chart > Documents lists the prescription (what it is, date, transmission status). Stopping a drug writes a note to the pharmacy and chart, or the chart only when another prescriber wrote it.
**Safety.** Grouped plain sentences (allergy, kidney function, interaction, duplicate, sedative and age, maximum dose, Schedule 1A) with "Clear: ..." for the rest. A warning on a drug being prescribed needs an override with a typed reason, saved with name and time and printed in the send list and the note, before either sign button works. A Schedule 1A drug is blocked from both routes with its reason, with "Remove from this send". Red is on the icon only; the words stay ink.

### Changed from the proposal
- Renewal visits still open the panel by themselves (the old card did), but without taking focus (lead).
- The AI's pick is selected, but needs the doctor's approval before Continue works (Daniel: "the AI fills in everything; the doctor approves changes and signs").
- Demo patients: Gloria (74F, kidney function not on file, sedative with age, a Schedule 1A search result) and Greg (renewal, PharmaNet-only sulfa reaction). Others get their chart list as the starting point.

### Needs Daniel / clinical-safety (nothing here is a clinical rule)
All drugs, strengths, interaction pairs, kidney limits, maximum doses, Schedule 1A flags, standard repeats and fill dates are invented demo data. Needs: the drug-check source and rules; his favourites; the PharmaNet indication and frequency code lists (the indication code is left out until then); the real standard repeats per drug; what a Schedule 1A drug should do instead of fax; whether a drug the patient reports that is not on PharmaNet can be added in phase 1; whether "ask the MOA to send" stays after e-prescribing.

## 31 Oct changes (T-032, built 2 Nov 2026)
Source: Daniel's review of build 2026-10-26 20:42, `from-daniel/2026-10-31-meeting-review-of-prescribing-orders-chart.md`, section 1.
Built in `simplecare-physician-portal-v2.html` (functions in the T-027 block: `rxRecModel`, `rxRecHtml`, `rxRecRow2`, `rxActsHtml`,
`rxSupply`, `rxCedarFlag`, `rxNewListHtml`, `rxUpHtml`, `rxReadImage`, `rxStrip`, `rxPadLine`, `rxPadSearchHtml`, `rxNextForms`,
`rxNextHtml`, `rxPadHtml`, `rxBarPad`; actions `RX_ACT.cont`, `.adj`, `.stp`, `.conf`, `.accept`, `.chgai`, `.addfree`, `.dym`,
`.pastebtn`, `.orderkid`, `.next`, `.recsign`).

**Top line.** Allergies and kidney function stay as the constant reminder, with a short "Today" line; no medications beside the concern.
Kidney function not on file shows **Order kidney function**, which opens the lab requisition over the panel with Creatinine / eGFR ticked;
closing it comes back to the same place. Allergy words are ink with the red on the icon (red text is for a critical value only).
Needs Daniel: how old a kidney result is "out of date" (the demo only acts on "not on file").

**The list, in Daniel's order** (one item per medicine; the row never moves when the doctor acts on it):
1. **Due for renewal**: Simple Care's drugs with 7 days or less of supply (`RX_DUE = 7`, his "about 7 days"), fewest first, ties
   alphabetical. Supply is in days: "27 days overdue", "4 days left", "Next dose in 4 days" (long-interval drugs).
2. **PharmaNet differs**: Simple's drugs whose strength differs on PharmaNet, highlighted (barely tinted row, the two doses marked).
3. **Other Simple Care medications**.
4. A line, then **PharmaNet: not prescribed at Simple**: due first, then by last fill, newest first; prescriber shown with "not a Simple
   Care doctor"; a soft "No Simple Care record" under the name (ink-faint, no tag, no alarm). Earlier fills of the same drug ride along
   ("Also from Dr. S. Gill, Aug 2"). For a patient with no Simple history this is the whole list, headed "PharmaNet", with no Simple column
   (demo: Korynn, new after a hospital stay).
5. **Cedar flagged** (a quiet grey note on the PharmaNet section, with its source): DEMO rule, a drug marked controlled in the demo
   library dispensed by 2 or more prescribers in the last 90 days (Gloria: tramadol from two prescribers). Needs Daniel: what Cedar flags,
   and the window.
6. **PharmaNet dispense history**: the raw fills, newest first (who, what, when, pharmacy, demo DIN), collapsed.
Sources: PharmaNet live, **Uploaded file** (renamed from "Uploaded profile"), Patient only (no comparison column; supply reads "Ask the patient").

**Actions per drug.** Continue (on the pad as a renewal; the button stays pressed; pressing again or removing it from the pad undoes it),
Adjust dose (on the pad as a change with the strength chooser open), Stop (a stop line on the pad: a note to the pharmacy for Simple's own
prescriptions, a chart note for anyone else's), Confirm (dose differences: the PharmaNet strength goes to the medication list, not the pad,
marked with its prescriber; drugs prescribed elsewhere: join the list marked with their prescriber). Continue is off on an unconfirmed
dose difference until the doctor confirms or adjusts it. After signing, a prescribed drug reads "Prescribed today".

**The end state.** "New medication list" (collapsed, with its count) shows where the patient ends up; **Sign off the medication list**
works once every dose difference has a decision. The word "reconciliation" is no longer on any action. The note line reads "Medication list
checked with the patient against PharmaNet: N medicines. Signed off by …".

**"Ask the pharmacy to verify": kept, as a secondary link** beside the source tabs (it files an MOA task to ask the pharmacy for the list
when the doctor cannot settle it on the call). It is not a prescription route, so Daniel's "no MOA" rule does not apply to it.

**The pad.** Cedar drafts from today's note or the call: "As per your note: “Start bisoprolol 2.5 mg daily alongside existing
amlodipine.”" with a subtle "Cedar draft" and **Add**, **Change** (adds it and opens the strength chooser) or **Ignore**. The bar has
**Sign and fax** only ("If the fax fails, <MOA> resends it."); "Sign, <MOA> sends" is removed (Daniel: "I can't really think of a use case
where I would have this prescription directed to my MOA"). After signing, if today's note names labs or imaging, a card "Next, as per your
note" quotes the line and offers **Open the lab requisition** (tests named in the line are ticked: lipids, HbA1c, creatinine, CBC, ferritin,
TSH) or the imaging requisition; the button takes focus. Nothing is offered when the note says nothing.

**Add a drug.** Search a drug reference (DEMO list with demo DIN numbers, labelled as modelled on Health Canada's Drug Product Database),
by name, strength or DIN; spelling help ("Did you mean Amoxicillin?"); free text always allowed ("Add “…” as written") with a soft notice
on the pad line: "Not in Health Canada’s drug list. It is sent as you wrote it." Needs: the real Drug Product Database feed.

**Paste a screenshot.** In Uploaded file, Cmd+V or Ctrl+V anywhere in the panel reads an image from the clipboard (the `paste` event), and
switches the source to Uploaded file; Paste (asks the browser for the clipboard, falls back to the shortcut), Upload a file, Take a photo.
The image is shown above the rows as the source, can be hidden, and stays in the browser tab. In the demo the rows are sample rows, and the
panel says so.

**Demo data added** (invented): Gloria's denosumab is due in 4 days; tramadol fills from Dr. S. Gill and Dr. K. Brar; Korynn's PharmaNet
profile (sertraline due, pantoprazole, a finished cephalexin course); more drugs in the demo library (tramadol, pantoprazole, cephalexin,
azithromycin, losartan, rosuvastatin).
