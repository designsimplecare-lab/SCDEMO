# Meeting with Daniel, 31 Oct 2026: review of prescribing, lab, imaging, referral, note to patient, visit summary, chart and results — requirements

Source: recorded call (about 3 h 15 min) and its full transcript, read end to end by the lead; frames checked where he pointed at
the screen. He reviewed the **live demo, build 2026-10-26 20:42**. Also: a lab report format he showed (LifeLabs) and his WhatsApp
examples of synthesized radiology and referral text. Quotes are verbatim; profanity, patient stories and names, personal matters and
anything about named people are left out. Business and regulatory topics are in `private/daniel-meeting-2026-10-31-confidential.md`.

**His overall verdict:** "I think we're like 95% of the way there." "This is already better than [what we have]." "I would say we're …
nearly done." Next he wants the developers to start connecting the backend, beginning with the **Inbox**.

## 1. Prescribing — medication list (left) and prescription pad (right)

### 1a. Top line
- Keep **allergies** and **kidney function** at the top as a constant reminder ("drug allergies and kidney function are so important").
  A short "today" summary up there is fine.
- **No medications next to today's concern** ("I know the drugs that a diabetic should be on").
- If kidney function is not up to date, offer a **quick way to order it** without leaving for another part of the chart (he called a
  button "maybe overkill", but wants an efficient jump to labs).

### 1b. How the list is ordered (the main change)
The list follows the conversation: "What is the patient phoning for? I need my drugs." From top to bottom:
1. **Due for renewal — drugs Simple prescribed.** Label it **"Due for renewal"** (not "active", not "possibly lapsed"). Due = about
   **7 days or less** of supply left (pharmacies use 14; patients get nervous within a week). Order by supply left, fewest first
   (ties alphabetical). If the patient has run out, say **"26 days overdue"** (computed, not "none left since Oct 4") — "that's clinical
   information".
2. **Simple's drugs where PharmaNet differs** (example: Simple 5 mg, PharmaNet 10 mg after a cardiologist changed it) — highlighted;
   "I would zero in on that in three seconds". The doctor **confirms** the PharmaNet version; it goes to the medication list, not the pad.
3. The rest of **Simple's drugs**.
4. A dividing line, then **PharmaNet: drugs not prescribed at Simple** ("our handiwork at the top … don't forget the stuff at the bottom").
   Organized the **same way** (due for renewal first, then by date), **open, not buried**, with the **same buttons**. Show **who prescribed
   it** and that they are not a Simple Care doctor. For a **new patient** everything is here, and there is no side-by-side: "Just show me
   the list" as per PharmaNet; verify with the patient; continue on the pad.
5. A short **"Cedar flagged"** summary for the PharmaNet list (example: opioids from several prescribers), sourced; doctors tend to ignore
   the PharmaNet list, so nudge them to look.
6. **PharmaNet dispense history**: the raw, purely chronological list (who, what, when; it reveals which specialists the patient saw).
   He "really likes" it; **collapsed** by default.
- A drug with no Simple record (walk-in, new patient) gets only a **soft, neutral flag** ("we don't have a record of this"), never an alarm.
- The design must stay **neutral** for any practice (walk-in, family, specialist).

### 1c. The actions on each drug ("process each drug")
- **Continue** (re-prescribe): the drug **stays in the list** with its button highlighted and **appears on the pad**; the doctor can remove
  it from the pad. "Should this list change? Probably not." Avoid the word "reconciliation" on the main action: "Just continue and prescribe."
- **Adjust dose**, **Stop**, and **Confirm** (for a difference: "as per PharmaNet it's actually 10 mg") — sometimes confirm, sometimes
  prescribe, sometimes both.
- The end state is the **new medication list** ("from where you are, to the prescription, to where you will end up, which is the new med
  list"); confirmed drugs prescribed elsewhere are marked with their prescriber.

### 1d. The pad
- Looks good ("we can always experiment with the font").
- **Cedar drafts from the note**: "As per your note … amoxicillin 500 mg twice daily for 10 days for group A strep" → **Add**, change or
  ignore. Every AI item shows **where it came from** (subtly) so it is clear the AI is not deciding on its own.
- **Prescriptions do not go to the MOA.** "I can't really think of a use case where I would have this prescription directed to my MOA."
  The MOA only handles a fax that fails. Remove "ask the MOA to send" from prescribing; keep **Sign and fax**.
- After signing, if the note shows labs or imaging are next, **open the next one** (anticipate the next move); only if the note says so.

### 1e. Adding a drug
- Search a **drug reference** (Health Canada's drug product list by DIN), with **spelling help** ("did you mean …").
- **Free text is allowed** (compounded or experimental drugs); show a **soft notice**, not an error: not in Health Canada's drug list.
- Later: a doctor's own list the AI draws from.

### 1f. Sources
- "PharmaNet live", "Uploaded file", "Patient only" — he likes these. **Pasting a screenshot with Ctrl/Cmd+V must work.** "Patient only"
  comes from the clinical intake ("my water pill" → diuretic); he will refine that option.

## 2. Lab requisition
- Show **Suggested tests horizontally** (less scrolling). **Cedar can suggest a panel.**
- **Open the sections the doctor will likely use**, close the rest (anticipatory; he liked this a lot).
- Move the bottom fields to the **top as a compact overview**, collapsible:
  - **Copy to**: pre-filled (from provider location).
  - **Instructions to the patient**: pre-filled by the AI (for example fasting for a fasting glucose).
  - **Diagnosis**: **not** pre-filled (he fills it only when he expects the lab to refuse a test); collapsible.
  - **Current medications**: **not** pre-filled; collapsible.
  - **Standing orders** (dates and frequency): not pre-filled; collapsible.
- He will send his panels.

## 3. Imaging requisition
- "A bit too long." **Clinical question and pertinent history are one field** on the form: a heavily synthesized one-liner under about
  20 words, e.g. "74F with exertional chest pressure × 3 days, relieved by rest. HTN, T2DM. Assess for acute cardiopulmonary
  abnormalities." Radiologists want the question, briefly.
- Modality, priority and exam suggestions are good (exam data to come). "Don't overthink it. The ministry has done the heavy lifting."
- **The MOA route stays for imaging** (the MOA works through the province's CT and MRI checklists).

## 4. Referral
- Make it **more spacious**; format the **letter preview** better.
- **Cedar suggests the specialist** from proximity to the patient and who is taking patients (an internal list kept up to date by the MOAs).
- **Reason** synthesized, e.g. "Suspected NSTEMI with elevated troponin and exertional chest pain."; **clinical summary** like his example
  (age and sex, symptom, history, key results, pending reports, medications, allergies).
- **Supporting documents**: specialists check **source documents** (the lab report PDF, imaging report, a consult letter), not the visit note.
  Keep standard documents; Cedar suggests the relevant reports.
- **The MOA route stays for referrals** (laborious).

## 5. Task and "Note to patient"
- Rename **Message → "Note to patient"** ("message sounds a little too personal; note sounds more professional").
- Task stays for anything else for the MOA; a future Slack-style team channel may change this (not now).

## 6. Visit summary to the patient
- He wants it "so bad". Requirements document: "Visit Summary Requirements" (sent on WhatsApp; to be saved into `private/requirements/`).
- Cedar drafts it; **the doctor signs before it goes**; each doctor can **turn it on or off** in their settings (doctor autonomy).
- Evidence-based format: grade-6 reading level, scannable; templates such as new long-term medicine, test results, sensitive mental health.
- The patient email templates already exist (designed earlier); can be redone.
- Never put a review request on sensitive summaries (for example a cancer diagnosis).

## 7. Chart view
- **Chart review sits right under the intake summary**: a heavily synthesized picture of who the patient is, emphasis on today's visit;
  medications connected to the clinical concerns; for some concerns (for example mental health) include past drugs from PharmaNet.
- **No repetition**: relevant medical history, prior related care, investigations do not belong in Chart review; they go to the left
  summary (**Past medical history** includes consult reports; surgical history goes under it). Pending is "a version of the inbox specific
  to the patient" (keep, placement open).

## 8. Results
- Flag results the **LifeLabs way**: value, **out of range / within range**, **reference interval**, quietly ("I don't really like colours and
  bells and whistles"). **Show the reference range right there**, not on click. Explain or replace the arrow, and show the **two prior
  values** (example: HbA1c). He liked the critical / high / routine grouping. He will review his critical and flagged-result criteria (Notion).

## 9. Backend
- The developers can start; begin with the **Inbox** (fax and API shown the same way; the document labelling standard is done).

## Lead's to-do list (proposed)
1. **T-032 Prescribing list order and actions** (1a–1f): Due for renewal first with days overdue; differences next; Simple then PharmaNet
   (same buttons, prescriber shown); Cedar flag; collapsed dispense history; Continue keeps the row and adds to the pad; no MOA route; drug
   search with DIN and a soft notice; Cmd+V paste; anticipate the next action after signing.
2. **T-033 Lab requisition top overview** (2).
3. **T-034 Imaging one-field clinical question** (3).
4. **T-035 Referral spacing, suggested specialist, synthesized reason and summary** (4).
5. **T-036 Note to patient and visit summary** (5, 6) — needs the requirements PDF.
6. **T-037 Chart review and results display** (7, 8).


## Addendum (2 Nov): the two documents from WhatsApp, now read
Copies are in `private/requirements/` (not committed).

**Visit Summary Requirements (Daniel, 24 Oct 2026).** Principles, not a fixed template; only the sections that apply; the physician
reviews and signs every summary before release.
- **Actions first:** open with what the patient must do (start, stop or change a medicine, book tests, book follow-up, danger signs).
- **Headings in the patient's words**, drawn from: *What you need to do*, *What we found*, *What to expect*, *Good to know* (a mental
  health example uses *How you are doing*); drop any that do not apply.
- **Fit the encounter:** results-only visit leads with the result and its meaning; no new medicine → no medication details; mental
  health or sensitive → neutral wording, no unneeded detail.
- **Plain language:** grade 6, sentences under 15 words, everyday words; **no abbreviations** (a test name may follow its full name once).
- **Scannable:** bullets for actions; bold the key medicine, dose and danger sign; no paragraph over 3 lines.
- **Address the worry** plainly when reassuring ("not cancer").
- **Complete medicine instructions** when started or changed: name, dose, how often, how to take, when it works, common side effects,
  safety warnings.
- **Safety net** in the first section, bolded (the specific reason to go to emergency; for mental health, 9-8-8 or emergency).
- **Accuracy:** only what the visit note documents; never invent findings, doses or results; **flag gaps for the physician**.
- **Length:** usually 150 words or fewer (one phone screen).
- **Subject line always** "Dr. [Name] – Visit Summary – [date]"; never a condition, body part, test, medicine or specialty (lock screens; BC PIPA).
- **Transparency footer:** "Prepared with AI help and checked by Dr. [Name]. Contact the clinic with questions."
- Three worked examples: new long-term medicine, test results only with no medicine, sensitive mental health follow-up.

**Medical imaging requisition (the health authority's standard form) — fields the demo does not have yet:**
- Modalities on the form: X-Ray, CT, Ultrasound, Echo, Angiogram/Interventional, Nuclear Medicine (the demo also has Breast Imaging).
- Any site or specify site; appointment date and time; previous images and location.
- Escort required (nurse, porter, volunteer); mode of transport (wheelchair, stretcher, bed); other (O2, isolation, portable, IV pump) — hospital use.
- Able to give consent (yes/no); interpreter must accompany a patient who does not speak English.
- Copies of report to.
- **Must be completed for CT:** kidney function abnormal? previous L-spine surgery? If yes, or for CT abdomen/pelvis or angiogram:
  **eGFR and creatinine within 3 months, with dates, mandatory.**
- **Must be completed for core biopsies, angiograms and interventional procedures:** INR, platelets, eGFR, creatinine, each with date;
  anticoagulant or anti-platelet medication (yes/no, list).
- Physician signature, date, phone, MSP billing number. "Incomplete requisition forms will be returned."
- Design consequence: the CT and procedure sections should appear only for those exams and **fill the eGFR, creatinine, INR and platelets
  with their dates from the chart**, flagging when a value is older than 3 months (links to the kidney-function quick order in prescribing).
