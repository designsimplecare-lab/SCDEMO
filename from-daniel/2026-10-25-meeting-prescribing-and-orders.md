# Meeting with Daniel, 25 Oct 2026: prescribing, medication reconciliation, orders — requirements

Source: recorded video call (about 2 h 25 min) plus its transcript. The lead read the whole transcript and checked
frames of the recording: Daniel reviewed the **live demo** (Home, then the new prescribing panel, steps 1 and 2) and then
showed his own portal's lab and imaging requisitions. Quotes are verbatim; profanity, personal matters and anything about
named people outside the product are left out. Business and partner topics from the same call are in
`private/daniel-meeting-2026-10-25-confidential.md` (git-ignored).

**His priority, in his words:** "What I really want to focus our attention on is the prescription modal because once that's
done, everything falls into place." And: "This is the only modal that has any major consequence because it's so clinical and
it's so integrated." Labs, imaging and referrals "shouldn't be as difficult" because their forms are fixed or already done.
He liked the demo overall: "I actually like this a lot … this does look significantly … pretty good actually."

## A. Prescribing: the model (three things, not one)
1. **Prescription pad = what I am doing today.** "What is on the prescription pad is what I'm doing right now." It is part of
   the **clinical encounter** ("anything that's happening right now is called the clinical encounter … I love that word").
2. **Medication reconciliation = a process.** Comparing **what Simple has** (drugs prescribed in Simple, by any Simple doctor)
   with **a source of truth** (PharmaNet, a pharmacy's faxed list, CareConnect), **verified with the patient**.
   "Medication reconciliation is a process and then the med list is the result of that process."
3. **Medication list = the result.** "All roads lead to the med list." It is reconciled **as of a date, by a named doctor**
   ("a doctor has signed off on this list of drugs on this particular date"). If not signed off, it must **say it is not
   reconciled** ("this has not been reconciled with the patient"). Signing off a reconciliation adds drugs to the med list even
   if they are not prescribed today; prescribing adds them through the pad.

## B. Where the doctor starts (hybrid)
- **Default: start at the prescription pad**, with the med list there "to glance at", and AI flags. "If I'm doing something
  very quickly I don't want to see 50 different drugs in front of me … I'm not doing a reconciliation."
- **Reconciliation is offered, never forced.** Some doctors only want the pad ("starts at the prescription pad and never looks
  back"); guidelines say start with reconciliation; so: start at the pad "in a way that allowed the doctor to consider doing a
  med reconciliation".
- **Start at reconciliation when the visit is for it:** "If somebody literally says, I need all my prescription drugs renewed,
  then yes, I am doing a medication reconciliation." He wants that to be easy, as its own kind of visit.
- **Drugs from today's note go onto the pad:** "Grab it from the note into the prescription pad." Label clearly what comes
  from **today's clinical encounter** versus the past ("Can you make that clear to the doctor … based on today's clinical
  encounter").
- **Favourites and quick scripts on the pad:** "there's a cold sore, Valtrex … a urinary tract infection, Macrobid".

## C. AI safety on the pad (before anything is sent)
- Flag **drug allergies** against what is being prescribed (example: a sulfa drug when the patient is anaphylactic), **drug-drug
  interactions**, and **dose for kidney function and history** ("their renal function is in the tank. Dose adjust or don't
  prescribe … consider an alternative").
- The doctor can **override or sign off**, with a note such as "reviewed with the patient".
- **Allergies must be readable at a glance**, however long the list (his example: a patient with pages of listed allergies,
  one of which he could not see in time).
- **No reminders at the prescribing step about decisions already made in the chart.** Example from the demo: "cardiology asked
  you to start bisoprolol". "This is a clinical decision, not a medication reconciliation … This would be in the chart."
  The AI should offer it **in the chart, at the moment of decision**: "Hey, do you want to add that to your prescription pad?"
  Then it is on the pad, already decided. Remove it from the prescribing panel.

## D. The past: what to show and how far back
- Show drugs **prescribed within the last 12 months, in chronological order** (most recently prescribed first: a month ago,
  three months ago, six months ago). "I don't want multiple drop downs … no, it's just boom, there you go."
- **Active** = filled within the last 3 months (he also said "prescribed within the last 6 months is active").
- **Full reconciliation goes back 18 months** (PharmaNet's own limit), on request.
- **The doctor can change the window** ("define how far back you want to go"); 12 months is the default.
- Catch a year's supply dispensed at once (people who fill a year and leave the country).
- Show **when last filled, pills left outstanding, the pharmacy**, and make it easy to contact that pharmacy.

## E. Where the past comes from (fill in what the system can, from wherever it can)
- First, **Simple's own prescriptions** (any Simple doctor) — "that would be the initial list".
- **PharmaNet**, when the doctor has it. Access rule (as he explained it): the doctor must be **verified and physically in BC**.
  So some doctors (including Daniel and a colleague outside BC) will not see PharmaNet; the design needs **two cases**: with
  PharmaNet (auto-filled) and without (manual sources).
- Without PharmaNet: **upload a pharmacy's faxed list** ("that's PharmaNet" — pharmacies use it), **screenshot from CareConnect and
  paste it** (Cmd+V), **type it manually**, or **take a photo** (camera, as with ID). "We should give them two ways of doing it"
  at least: upload and type.
- AI extracts the **standard prescription fields** (drug, dose, form, route, frequency, days, quantity, repeats); Daniel will send
  the standard list ("prescriptions are standardized … all scripts have to have it").
- Anything that did not originate in Simple is **part of the reconciliation**, compared with Simple's list.
- **CareConnect is view-only.** No copying, downloading or printing ("they will ban you"). Never scrape it.
- **Later: CareConnect beside the pad.** Once Simple is onboarded, the doctor opens CareConnect from inside Simple; show it in a
  **small window the doctor can move and resize, that stays put while typing**, beside the prescription pad, so they can read and
  type without switching pages. Daniel meets CareConnect next week.

## F. The reconciliation screen must show what is compared
Daniel could not tell what the demo's AI row was being reconciled against: "what am I referencing … compared to what I have on
file?" Each row must show **Simple's version vs the source's version and the difference**, and the doctor **verifies with the
patient**, drug by drug ("Hey, you filled this this date … Can I sign off on that? Boom. Okay, done. Verified.").
The end state reads: "Here's what Simple has. Here's what PharmaNet has. Here's the discrepancy. Here's what I'm doing today.
This is the med list as of today" — the new source of truth.

## G. Pharmacy workflows (new)
- **Ask the pharmacy to verify:** when the doctor is unsure what the patient takes (or for a critical drug such as warfarin),
  one click sends the pharmacy a request to verify **all or chosen drugs**, with an automated note; the patient is told to bring
  their pill bottles; the pharmacist and patient count pills; the result comes back. The doctor signs the request.
- **Send the reconciled list back to the pharmacy:** "This is their true med list … Don't confuse other doctors."
- **Ask PharmaNet later** whether a completed reconciliation can be marked there ("reconciled by Dr. X on this day"). Not now.

## H. Look and feel of the pad
- "Can you make it look like the **classic doctor's pad**? … maybe even a little bit retro … Make it **clinical**. Not this isn't
  Apple." It should carry weight: "This is where you can kill somebody … don't treat it like a Starbucks coffee." A **soft**
  reminder of consequence, not a loud alert. He believes the right look "will save lives because it reminds the physician to take
  this seriously".
- The next-step button sits next to the content (he asked whether "Continue" should be at the bottom).

## I. PharmaNet access and the protective word
- He does not want the protective-word box on the panel: opening the chart is the authorisation to pull PharmaNet ("the way that
  we authorize that access is when the doctor clicks on the chart … we just have to clarify what access means").
  **Conflict to resolve:** his own Prescription Modal v2 spec maps the protective-word prompt to the conformance rules
  (PNetTx2.1, 2.2). Lead's reading: remove the box from the default view; keep a prompt only when PharmaNet itself asks for the
  patient's protective word. Confirm with Daniel.
- Call the source "**PharmaNet**" ("doctors would understand PharmaNet").

## J. Orders, imaging, referrals, documents (the other actions)
- **Lab and imaging requisitions are the Ministry's standard forms:** "this is all standard stuff provided by the ministry … has
  nothing to do with us." Keep **every field**; how they look is ours ("How you present the information is going to be up to us").
  He showed his portal's versions (hematology and other sections, then preview; imaging by modality: X-ray, ultrasound, CT, MRI and
  others) and the BC requisition each mirrors. The field data is with the developer; Ani may log in to his portal to capture it.
- **Imaging categories** come from a BC radiologist ("radiology approved") and are source-verified: keep them as they are.
- **AI on orders:** preset **order panels** ("every EMR has it"); the AI **suggests the tests** (or a panel) **with the reason**,
  can add tests with justification, and suggests guideline-based repeats from the chart; the doctor signs; the requisition fills
  itself. He will send versions of the panels.
- **Imaging "RADS blurb":** the AI writes the one-line clinical question for the radiologist (age, sex, the symptom and how long,
  what to rule out); the doctor edits and sends.
- **Referrals:** his referral forms "look phenomenal" and "get picked up"; reuse them (the HTML is with the developer).
- **What the demo is missing, per Daniel:** labs, imaging, referrals, **documents (a note or a medical document)**; billing he and the
  developer will handle. "I've used this on my day-to-day. I don't feel like I'm missing anything" beyond those.
- He confirmed he gave **no requirements** for Order, Refer and Message ("you just said have at her … means go nuts"), and said he
  **will send requirements**.
- Provider location, identity verification: "we already do that. Whatever."

## K. Other product notes
- **Clinical flowsheets** (from a competitor reference pack he shared): a checklist of tests, exam findings, counselling and education
  for one condition, flagging what is overdue, built on BC clinical guidelines. "The fact that it's there means that we should have it
  too." Lower priority; review the pack and map it.
- He reviewed a competitor EMR's demos and found the workflows overwhelming ("throwing a bunch of stuff at me"); his bar is less on
  screen, not more.

## Lead's to-do list (proposed, nothing built yet)
See the task files T-027 to T-031 and the board in `product/tasks/README.md`.
1. **T-027 Prescribing v2, pad first (P0).** Rebuild T-026 around A to I: pad first with today's encounter drugs and favourites; med
   list beside it (12 months, chronological, active marked, reconciled-as-of stamp); AI safety at the pad with override; reconciliation
   as an opt-in mode (default for renewal visits) with Simple vs source side by side and per-drug patient verification; sources:
   Simple, PharmaNet (when allowed), upload, paste screenshot, type, photo; ask-pharmacy-to-verify and send-list-to-pharmacy; retro
   clinical pad look; no protective-word box; move the "cardiology asked" item into the chart with "Add to prescription pad".
2. **T-028 Lab and imaging requisitions (P1).** Ministry fields kept verbatim (needs his field data); order panels; AI-suggested
   tests with reasons; imaging by modality with the radiologist's categories; AI clinical one-liner; preview of the filled form;
   sign and send. Replaces the placeholder Order drawer.
3. **T-029 Referral (P1).** Rebuild the Refer drawer from his referral forms (needs the HTML); keep the send choice.
4. **T-030 Documents and notes (P1).** Create a medical note or document from the chart (types to confirm with Daniel).
5. **T-031 Clinical flowsheets (P2).** Review the reference pack; propose flowsheets per condition with overdue flags.
6. **Waiting on Daniel:** the standard prescription fields; order panels; the requisition field data and referral HTML (or portal
   access for Ani); the drug-to-allergy and interaction rules; the protective-word decision; message and document requirements.
