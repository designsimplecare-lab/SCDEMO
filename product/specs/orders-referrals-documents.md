# Lab requisition, imaging requisition, referral, medical documents: current state and redesign (26 Oct 2026)

Status: **current state recorded; redesign decided; build T-028, T-029, T-030.**
Sources: screenshots of Daniel's live portal sent by Ani on 26 Oct (one test patient; no identifiers recorded here), and
Daniel's 25 Oct meeting (`from-daniel/2026-10-25-meeting-prescribing-and-orders.md`, section J). Daniel's rules: the Ministry's
requisition fields stay **verbatim**, every one; "how you present the information is going to be up to us"; the AI suggests,
the doctor signs.

## 1. Current state (Daniel's portal)

**Shared frame (all four screens).** A full-screen "Chart" overlay: patient identity (legal name, PHN with Verified, preferred
name, email, date of birth and age, sex), address, the patient's pharmacy (name, phone, fax, address); a row of actions: Call
Patient, Headset Call, Transfer to [the MOA] (with online dot), Send Task. Each form has a back arrow and title, and a fixed footer:
**Cancel · + Send to MOA · Add Note + · Preview · Fax to Lab / Fax to Radiology / Fax Direct · Carry Forward**, with the hint
"Select at least one test before saving or sending this requisition." Section headings are uppercase (ours must not be).

### 1a. Lab Requisition (three columns of collapsible sections)
- **Hematology:** Hematology profile; INR; Ferritin (query iron deficiency). "Choose up to one. Select again to clear."
  On Anticoagulant? Yes / No; Specify: [text]. HFE – Hemochromatosis (check ONE only): Confirm diagnosis (ferritin first, + TS,
  + DNA testing); Screen relatives (First-degree living relative available for testing).
- **Microbiology:** note "Label all specimens with patient's first & last name, DOB, PHN & site".
  *Routine culture:* Penicillin Allergy? Yes / No; choose up to one: Throat, Sputum, Blood; Other, Site [text]; Deep Wound, Site**
  [text]; Superficial Wound, Site [text]. **Clinical information required: Genital Culture, Site [text]; History: Peripartum,
  Pelvic / Genitourinary Surgery, Other [text]. Group B Strep Pregnancy Screen (vagino-anorectal swab), with Penicillin Allergy.
  *STI tests:* Chlamydia / Gonorrhea NAAT; Trichomonas NAAT; Site: Vagina, Urine (first catch), Cervix, Urethra, Other [text];
  Gonorrhea (GC) Culture, Site [text].
  *Vaginitis:* Initial (Bacterial Vaginosis / Yeast); Chronic/recurrent (Bacterial Vaginosis / Yeast identification);
  Pre-Pubertal or Post-Menopausal (Culture).
  *Dermatophytes:* Dermatophyte culture; KOH prep (direct exam); Specimen: Skin, Nail, Hair; Site [text].
  *Mycology:* Yeast; Fungus; Site [text].
- **Urine tests:** Dipstick (routine screening, or atypical symptoms); Dipstick + Culture if indicated (e.g., risk of resistant
  uropathogen); Microscopy (requires with ua / suspected pediatric UTI); Culture (Symptomatic UTI, pregnancy, pre-urological procedure).
- **Serology tests:** *Hepatitis:* Acute viral hepatitis undefined etiology (Hepatitis A (anti-HAV IgM), Hepatitis B (HBsAg &
  anti-HBc), Hepatitis C (anti-HCV)); Chronic viral hepatitis undefined etiology (Hepatitis B (HBsAg; anti-HBc; anti-HBs),
  Hepatitis C (anti-HCV)). *Investigation of hepatitis immune status:* Hepatitis A (anti-HAV); Hepatitis B (anti-HBs).
  *Hepatitis marker(s):* HBsAg ("For other hepatitis markers, please order specific test(s) below"). HIV Serology; Syphilis Screening.
- **Stool tests:** choose up to one, "One only (IDP includes C. difficile testing)": Infectious Diarrhea Panel; C. difficile testing.
- **Miscellaneous tests:** ECG; FIT (Age 50–74 asymptomatic q2y), Copy – Colon Screening Program; FIT, No copy to Colon Screening
  Program. *Other tests* (collapsed; contents not seen).
- **Chemistry:** Glucose – fasting (fasting a minimum of 8 hours); Glucose – random; GTT – gestational diabetes confirmatory (75 g
  load, fasting, 1 hour test); GTT – gestational diabetes screen (50 g load, 1 hour post-load); GTT – non-gestational diabetes
  (impaired fasting glucose); HbA1C/A1C; Albumin/microalbumin ratio (ACR) – Urine.
- **Lipids:** choose up to one ("Check one only"). Note: "Fasting is not required for any of the panels but clinician may
  specifically instruct patient to fast for 10 hours in select circumstances." Full Lipid Profile – Total, HDL, non-HDL, LDL
  cholesterol, & triglycerides (Baseline or Follow-up of complex dyslipidemia); Follow-up Lipid Profile – Total, HDL & non-HDL
  cholesterol only; Apo B (not available with lipid profiles unless diagnosis of complex dyslipidemia is indicated).
- **Thyroid function:** choose up to one; "For other thyroid investigations, please order specific tests below and provide
  diagnosis." Monitor thyroid replacement therapy (TSH Only); Suspected Hypothyroidism (TSH first, fT4 if indicated); Suspected
  Hyperthyroidism (TSH first, fT4 & fT3 if indicated).
- **Other chemistry tests:** Sodium; Potassium; Albumin; Alk phos; Alt; Bilirubin; GGT; T. Protein; Creatinine / eGFR; Calcium;
  Creatine kinase (CK); PSA (Known cancer); PSA screening; Pregnancy test; B-HCG – quantitative.
- **Diagnosis / current medications:** Diagnosis [text]; Current medications / antibiotics / date and time of last dose [text].
- **STAT order / copy to practitioner:** If this is a STAT order, please provide contact telephone number [text]; Copy to
  practitioner / MSP practitioner number & clinic name / address [text] ×2.
- **Standing orders** (valid for a max of 2 yrs / 24 mos): Effective date; Expiry date; Details & frequency.
- **Instructions to patients** [text].

### 1b. Imaging Requisition (one centred column)
- **Modality selection:** X-Ray, Ultrasound, Echo, CT, Angio/Intv, Nuclear Medicine, Breast Imaging.
- **Exam requested** [text, e.g. "Chest 2 Views"]; **Priority level:** Routine / Urgent / Stat.
- **Patient safety risk assessment:** Pt Diabetic; On Metformin; Breast Feeding; Pregnant Yes / No; LMP [date]; G, P, A [text];
  Height [cm]; Weight [kg]; Previous contrast reaction? [details].
- **Pertinent history / medications** [text].
- **Copy to (optional):** "Doctor name, fax number; Doctor name, fax number" — "The requisition will also be faxed to these
  doctors. Up to two doctors."
- Footer as above with **Fax to Radiology**. Daniel's portal also holds radiologist-approved exam categories (data with the developer).

### 1c. Referral (form left, letter preview right)
- **Search specialist** (by name, specialty, or city) or **Enter manually**.
- **Referral details:** "Add the reason for referral, clinical summary, and generate the referral letter." URGENT checkbox ("Adds a
  red, bold, underlined URGENT label above the greeting in the referral letter"); **Reason for referral**; **Clinical summary**;
  **Request** ("What you specifically want the specialist to do"); **Generate AI Preview**.
- **Supporting documents:** "Attach the patient's documents to fax with this referral (up to 5)"; list of the chart's documents
  with type (Form, Lab Report, Imaging, Uploaded).
- **Referral preview:** "Generate the specialist letter and review it on the right before sending."
- Footer with **Fax Direct**.

### 1d. Letters (medical documents)
"Letters" list with **Create Medical Document** and **Upload**; empty state "No letters on record."

## 2. Redesign decisions (ours; Daniel: fields fixed, presentation ours)

**Common to all four**
- Opens inside our chart (the Order, Refer and document actions), not a separate full-screen chart; the patient band stays our compact
  top block. No uppercase headings; our design system; light mode.
- **Pre-filled from the chart, editable, marked as such:** diagnosis or reason (today's clinical concern), current medications,
  allergies (for example penicillin), pregnancy where recorded, height and weight, the patient's pharmacy, the doctor's details.
- **AI drafts, the doctor signs.** Every AI-filled field shows "AI draft" until the doctor accepts or edits it.
- **One footer pattern:** Cancel · Save for later (was "Carry Forward") · Preview · **two equal send buttons, neither default:**
  "Sign and fax to lab / radiology / specialist" and "Sign and ask the MOA to send" (was "Send to MOA"). "Add Note" becomes a quiet
  checkbox "Add a line to today's note" (on by default). The button stays disabled until the form is valid, and the reason shows.
- **Preview** shows the filled official form or letter exactly as it will be faxed.
- Filing: Documents, and "Ordered and pending" at the top of Chart review; a referral also in Consults.

**Lab requisition**
- Top: **Suggested for today** — the AI proposes tests (or a panel) with a one-line reason each, from today's concern and the chart
  (for example repeats due by guideline); one tap adds each; "Add all".
- **Order panels and favourites** as chips (demo: Diabetes follow-up, Annual physical, Chest pain workup, Fatigue); one tap adds the panel.
- **Search any test** across every section (typing "TSH" finds the thyroid options).
- The **full Ministry form** below, every section and every field verbatim, in one column of sections; sections with selections
  open, the rest closed with a count. "Choose up to one" groups behave as single choice (radio-like, select again to clear).
- **Follow-up questions appear only when needed:** INR or anticoagulant-related tests ask "On anticoagulant?"; cultures ask penicillin
  allergy (pre-answered from the chart's allergies); wound, genital, STI, dermatophyte and mycology choices reveal Site; STAT reveals
  the phone number.
- A right rail **"This requisition"** lists the chosen tests with remove buttons and the required details still missing.
- Diagnosis, current medications, copy to practitioner, standing orders (effective and expiry dates, details and frequency) and
  instructions to patients sit under **More details** (diagnosis and medications pre-filled and shown in the rail).

**Imaging requisition**
- Modality as a segmented control; **Exam** as a search over the categories for that modality (demo list until Daniel's radiology
  data arrives); Priority Routine / Urgent / Stat.
- **Clinical question for the radiologist** (the "RADS blurb"): the AI drafts one line from age, sex, symptom and duration, and what to
  rule out; the doctor edits. It feeds the pertinent history field.
- **Safety questions only when relevant:** contrast exams (CT, angio) ask diabetic, on metformin, previous contrast reaction; pregnancy,
  LMP and G/P/A only for patients who could be pregnant; breast feeding for breast imaging and contrast; height and weight for CT and
  nuclear medicine; pre-filled from the chart.
- Copy to up to two doctors (name and fax).

**Referral**
- Keep the two-column layout (form left, the letter preview right, updating live).
- Specialist search over a demo directory (name, specialty, city, fax) or enter manually.
- Reason pre-filled from today's concern; **Clinical summary and Request drafted by the AI** with the sources it used (notes, results),
  marked AI draft; Urgent as a clear toggle (the letter shows "Urgent" above the greeting).
- Supporting documents: the AI **suggests** relevant ones (shown with a reason) but ticks none; up to five.

**Medical documents**
- "Documents and letters" list in the chart with **Create a document** and **Upload**.
- Create: choose a type (demo: Work or school note, To whom it may concern letter, Patient letter, Form) → the AI drafts from today's
  encounter, marked AI draft → edit → preview → sign → send (fax, the patient's portal, or print) or save.

## 3. Not decided / needs Daniel
The radiology exam categories and the "Other tests" list (data with the developer); the order panels he will send; which document
types he wants; whether Add Note should always add a line; the referral directory source.

## 31 Oct changes (built 2 Nov 2026)
Source: Daniel's review of build 2026-10-26 20:42, `from-daniel/2026-10-31-meeting-review-of-prescribing-orders-chart.md`, sections 2 to 5.

### Lab requisition (T-033)
Functions: `lrFresh`, `lrOverviewHtml`, `lrOvRow`, `lrOv`, `lrUse`, `lrInstrDraft`, `lrInstr`, `lrSugIds`, `lrSecLikely`, `lrSecOpen`, `lrMain`.
- **Overview at the top**, compact and collapsible (open by default; each row one line, one tap opens its fields with the Ministry's
  verbatim labels): **Copy to** (pre-filled; demo: the chart's cardiologist who asked for the tests, with the source shown);
  **Instructions to the patient** (Cedar draft from the tests chosen, only what the form prints: Glucose – fasting gives "Fasting test:
  please do not eat for at least 8 hours before your blood test."; marked "Cedar draft" until edited); **Diagnosis**, **Current
  medications** and **Standing orders** are not pre-filled (Diagnosis and medications offer "Use today’s concern" / "Use the medication
  list" on tap). The old "Details" fold at the bottom is gone.
- **Suggested tests in one horizontal row** of chips, plus **a suggested panel** (demo: Chest pain workup for exertional chest pressure),
  "Add all", and "Why" which lists each reason with its source.
- **All tests on the form**: every section listed; the ones holding Cedar's suggestions or chosen tests open, the rest closed with a count.
- Opened from prescribing ("Order kidney function", or "Next, as per your note"), the tests arrive ticked with the reason shown.
- Needs Daniel: what "Copy to: pre-filled (from provider location)" means exactly; his own panels; the patient-instruction wording.

### Imaging requisition (T-034, with the 2 Nov addendum)
Functions: `imCq`, `imFresh`, `imMain`, `imMissing`, `imLabRow`, `imLabFrom`, `imOld`, `imRenal`, `imCT`, `imProc`, `imOrderKid`, `imFold`, `imPaper`; `opClose` returns to the form it was opened from.
- **One field** (Daniel: "clinical question and pertinent history are one field"): **Pertinent history / medications** holds the clinical
  question for the radiologist in one line, drafted by Cedar (Gloria: Daniel's own example, 18 words), with a live word count and a soft
  hint above 20 words; "AI draft" until accepted or edited; square-bracket gaps block signing. The separate history field is gone.
- **Shorter**: one column (no rail); modality, exam, site and priority in one card; the safety card only when a question applies; Copies and
  Hospital transport folded; what is still needed listed at the end and in the footer. The MOA route stays (both buttons).
- **Standard form fields added** (addendum): Any site / specify site; previous images and location; able to give consent, with "An interpreter
  must accompany a patient who does not speak English."; copies of report to; appointment date and time, escort, mode of transport and other
  (O2, isolation, portable, IV pump) under the closed **Hospital transport**.
- **Must be completed for CT** (CT only): Kidney function abnormal? Previous L-spine surgery? If yes, or for CT abdomen/pelvis: eGFR and
  creatinine with dates. **Must be completed for core biopsies, angiograms and interventional procedures** (Angio/Intv, or an exam naming
  biopsy or angiogram): INR, platelets, eGFR, creatinine with dates, and anticoagulant or anti-platelet yes/no with the list (pre-answered from
  the medication list with a DEMO class map; Gloria's ASA reads as anti-platelet). Values and dates come from Results with their source; a
  value older than 3 months is flagged ("Older than 3 months; the form asks for one within 3 months") and, for kidney function, offers
  **Order kidney function**, which saves the imaging requisition, opens the lab requisition with Creatinine / eGFR ticked, and comes back to
  the imaging requisition when closed. A missing value blocks signing (the form says mandatory); an old one is flagged, not blocked.
- Needs Daniel: who "could be pregnant"; the radiology exam list; whether an old value should block; the anticoagulant / anti-platelet list.

### Referral (T-035)
Functions: `rfRank`, `rfKm`, `rfCity`, `rfDirLine`, `rfDocs`, `rfSuggest`, `rfSumDraft`, `rfFresh`, `rfMain`, `rfLetter`, `rfMissing`; the panel carries `data-kind` so the referral takes more room.
- **More spacious**: the referral uses the full panel width (up to 1320 px), wider gaps and padding; the letter sits on a soft panel.
- **Cedar suggests the specialist**: up to three from the specialty the chart points to, ranked by the specialist already following the patient
  (when taking referrals), then taking referrals, then distance; each shows the clinic, "N km from the patient" and Taking referrals /
  Waitlist / Not taking referrals; "Best match" on the first; one tap chooses. Labelled "From the specialist list the MOAs keep up to date
  (demo list)". Search and Enter manually stay. DEMO: the list, distances and intake status are invented.
- **Reason synthesized** (Cedar draft with its sources; Gloria: "Suspected NSTEMI with elevated troponin and exertional chest pain.").
- **Clinical summary in Daniel's style** (age and sex, symptom, history, key results, pending reports, medications, allergies); Gloria's is his
  example verbatim; other patients get the same shape built from the chart.
- **Supporting documents are the source documents**: lab reports (grouped by date), consult letters and uploads first; the visit note and the
  intake are still listed but never suggested. Cedar suggests the lab report holding the flagged values and the earlier letter from the same
  specialty, with the reason; none is ticked; up to five.
- **The letter**: letterhead (SimpleCare, the doctor, the practice), date, To and Re blocks, Urgent above the greeting (as in Daniel's form),
  headed sections (Reason for referral, Clinical summary, Request, Enclosed) and a signature block.
- The MOA route stays (Daniel: referrals are laborious).


### Note to patient (rename, section 5)
"Message" is now **Note to patient** on every doctor-facing label: the Action row and note-toolbar buttons, the drawer title, the field
label, the send button ("Send note"), the toast, the done state and the Chart > Messages item heading. The patient's email and text notice is
unchanged ("You have a new message from your care team"): it is patient-facing copy and Daniel asked only for the doctor-side name (open point).

### Visit summary to the patient (T-036, built 2 Nov 2026)
Source: Daniel, 31 Oct (section 6) and his "Visit Summary Requirements" (24 Oct; copy in `private/requirements/`, principles summarised in
the 2 Nov addendum). Functions: `vsDraft`, `vsRender`, `vsHtml`, `vsIn`, `vsState`, `vsSend`, `vsTabs`, `vsMode`, `vsOn`, `vsToggleSetting`, `vsSubject`; `msRenderBody`, `msState`, `msSend` branch to it.
- The **Note to patient** drawer has two tabs, **Note** (the existing short note, the default) and **Visit summary**. The summary tab widens
  the drawer: the editable draft on the left, a phone-width preview on the right with the **subject always "Dr. Pannozzo – Visit Summary –
  [date]"** (never a condition, test, medicine or specialty), the body, and the fixed footer "Prepared with AI help and checked by Dr.
  Pannozzo. Contact the clinic with questions."
- **Cedar drafts it** to the principles: actions first; only the headings that apply (What you need to do, What we found, What to expect,
  Good to know; How you are doing for a sensitive visit); bold medicine, dose and danger sign; the safety net in the first section; plain
  words, no abbreviations (a test name may follow its full name once). It shows "AI draft" until edited, the word count (aim 150 or fewer),
  the format it chose and why, and what it used.
- **Accuracy**: only what the note documents. Anything missing is a gap in [square brackets] (highlighted in the preview, listed under "Gaps
  for you") and blocks signing until filled or deleted; other gaps are listed without blocking (for example, a new medicine's side effects
  that the note does not give). If today's note does not contain what the draft says, a warning says so.
- **The doctor signs and sends** ("Sign and send visit summary"); it never goes by itself. It is filed in Chart > Messages as "Visit
  summary" with the subject, and a line goes into the Plan. **No review request** appears on it.
- **Per-doctor setting**: "Visit summaries by Cedar" (On / Off) in the profile menu, a switch kept per browser in the demo. Off: no Visit
  summary tab, no draft, and a quiet line in the drawer says where to turn it on.
- **Demo drafts**, one per worked-example style: Gloria (new long-term medicine, from the scribe's plan: bisoprolol; the chest-pain advice is
  a gap because the note says it was given verbally), Manjit (results only: thyroid tests with their range and trend), Korynn (sensitive:
  neutral words, 9-8-8 line, How you are doing as a gap). Other patients get the shape with gaps.
- Needs Daniel: the safety-net wording per condition (rule 17a); whether the setting defaults to on; whether summaries also go by email
  (the demo files them in the portal); the templates he designed earlier.
