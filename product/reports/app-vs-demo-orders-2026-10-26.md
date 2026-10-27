# Real app vs demo: lab requisition, imaging requisition, referral (26 Oct 2026)

**Question (Ani):** locate the current portal in GitHub and check whether the referral and lab fields used in the demo match the real app.

**Real app:** `github.com/pann2310/Simplecare`, staging at commit `1cf235e0` (26 Oct 2026, "Merge pull request #922"), read-only checkout at
`/private/tmp/claude-501/-Users-aniharutyunyan-Desktop-Projects-Simple-Care-Simplecare-staging/3348bf87-d0ac-4586-9e82-77a0fc4eefa9/scratchpad/app-staging` (paths below are relative to it).
**Demo:** `SCDEMO/simplecare-physician-portal-v2.html`. Lab is at lines 20047–20436, imaging at 20438–20670, referral at 20673–20880.
**Spec:** `product/specs/orders-referrals-documents.md` (Daniel's screens, recorded on 26 Oct). Those screens are this app: the labels match the code word for word.

---

## Top findings

### What the demo must change so engineering can build it on the current data model
1. **Imaging modality is multi-select in the app, but the demo allows one.** The app stores `examTypes String[]`, and the backend requires at least one entry (`examTypes: z.array(z.string()).min(1)`). The demo's segmented control allows only one modality. Make it a multi-select chip group, or get engineering to agree to single-select.
2. **Breast Imaging is not a modality in the app.** In the app it is a separate button that opens the provincial *Standard Outpatient Breast Imaging* PDF, prefilled with demographics only. Nothing is stored and nothing clinical is captured (`ImagingRequisitionForm.tsx:460`, `ImagingSubview.tsx:349`, `breastImagingReqPdfFiller.ts`). The PDF filler has no "Breast Imaging" checkbox to tick (`imagingReqPdfFiller.ts:101`). The demo treats it as a seventh modality with exams (screening or diagnostic mammogram, breast ultrasound). Either show it as a link to a separate form, or flag it as new backend work.
3. **The radiology exam lists already exist in the code.** The spec says they are "with the developer", but `ImagingRequisitionForm.tsx:48` (`ULTRASOUND_EXAMS`, 16 categories) and `:67` (`XRAY_EXAMS`, about 60 categories) hold the real grouped lists, for X-Ray and Ultrasound only. Every other modality is a free-text field (placeholder "Chest 2 Views"). Replace the demo's invented `IM_EXAMS` (demo:20449) with these lists, and keep free text for Echo, CT, Angio and Nuclear Medicine.
4. **The app's CT section is missing from the demo.** When CT or Angio/Intv is chosen, the app shows "This section must be completed if requesting CT" with five fields: Abnormal Kidney Function? (Yes/No), Prior L-Spine surgery? (Yes/No), eGFR and its date, Creatinine and its date. All are stored on `ImagingRequisition`. Add them under "Safety questions when relevant" for CT and Angio.
5. **Imaging safety answers are checkboxes in the app, not Yes/No.** `diabetic`, `metformin` and `breastFeeding` are booleans defaulting to false, so the app cannot tell "No" from "not answered". "Previous contrast reaction?" is a single free-text field (`contrastReaction`) with no Yes/No. The demo requires Yes/No answers and blocks signing until they are given. Either make them checkboxes (and contrast reaction a details field), or flag them as schema changes (nullable `yes`/`no` strings, as `pregnant` already is).
6. **G, P, A are three fields in the app, one in the demo.** The app stores `gravida`, `para` and `abortus` (≤10 characters each). The demo has one text box ("G2 P2 A0"). Split it into three.
7. **Imaging "Copy to" is one validated string in the app.** The app stores `copyTo` as a single string, at most 200 characters, in the form "Dr. Name, fax 250-555-0101; Dr. Name, fax 604-555-0102". It allows at most two doctors, names of 60 characters or fewer, and a valid 10-digit North American fax (`utils/imagingCopyTo.ts`). The demo's four inputs (name and fax ×2) are fine as a presentation, but they must serialise to that string and show the same validation messages.
8. **Lab "Routine culture" is not "choose up to one" in the app.** Throat, Sputum, Blood, Other, Deep Wound and Superficial Wound are independent checkboxes in the app. The demo groups them as single choice (`one:true`, demo:20060). Note that Daniel's screenshot text says "choose up to one", which contradicts the app's behaviour, so ask Daniel which is right before changing either side. In the app, single choice applies only to HFE, Lipids, Thyroid, Stool and FIT, plus the Yes/No answers.
9. **Group B Strep has its own "Penicillin Allergy" checkbox in the app** (`groupBStrepPenicillin`, separate from the routine-culture `penicillinAllergy` yes/no). The demo uses the shared culture question for both. Give GBS its own checkbox.
10. **Referral: the app lets the doctor send to the MOA with only a reason.** In the app the specialist can be left blank ("the MOA will find one"), and Clinical summary and Request are optional (`referralRequirements.ts`; `Referral.specialistName String?`). Preview and fax need reason, specialist name and specialty. The demo blocks *both* sign buttons until there is a specialist, a summary and a request, and the AI drafts have been accepted. Relax the MOA route to match, or record a deliberate rule change for Daniel.
11. **Referral manual entry fields differ.** The app has Specialist Name, Specialty, Clinic / Title, City and a separate Recipient Fax. The demo has Name, Specialty, "Clinic and address" and Fax number, and no City. Rename "Clinic and address" to "Clinic / title" and add City (both `specialistClinic` and `specialistCity` are stored and printed in the letter).
12. **Referral supporting documents: the app can attach only four source types.** Allowed types are `UPLOAD | LAB | IMAGING | PRESCRIPTION` (`services/pdf/supportingDocuments.ts:15`), up to 5. The demo offers visit notes, the intake form, results grouped by date, consult letters and letters. Visit notes, intake, consult letters and generated letters are new backend work, unless they exist as uploads. Results grouped by date map only loosely to a lab requisition (`LAB` is a `LabRequest`, not a result).

### What the demo adds that needs backend work
- **Lab "Suggested for today" (AI tests with reasons and sources)**, and the imaging "From the chart" exam suggestion: there is no endpoint or table for these. The only AI order support today is the referral draft.
- **Lab order panels and favourites.** The app has a static `LAB_PANELS` config (`frontend/src/config/labPanels.ts`): *Diabetes Monitoring, STI Screen (Urine), STI Screen (Comprehensive), Fatigue*. Only its name is used, as a label (`LabRequest.panelId`). Its test keys (`hba1c`, `cbc`, `tsh`, `b12`, `gcCtNaat`, …) do not match the form's field names (`hemoglobinA1c`, `hematologyProfile`, …), and B12 is not on the form at all. The demo's panels (Diabetes follow-up, Annual physical, Chest pain workup, Fatigue) and favourites need a panel → form-field mapping, plus per-physician favourites storage (none exists).
- **Lab STAT as a priority switch.** The app has no STAT flag, only `contactPhoneForStat`. The demo's Routine/STAT toggle can be derived ("STAT if a phone is entered"), or a field must be added. `selectedTests` and `formData` are rebuilt from the Zod schema, which strips unknown keys.
- **"AI draft / accepted / edited" state per field**, and the source list ("Sources the AI used"). Referral stores only `aiDraftId` and word-level `aiDraftDiff`. Imaging and lab store nothing. The demo's imaging "Clinical question for the radiologist" has no column. It can live inside `pertinentHistory`, as the demo already feeds it there, but its draft/accepted state cannot be stored.
- **Pre-fill from the chart.** The demo pre-fills lab diagnosis and medications, penicillin allergy, diabetic, metformin and weight. The app pre-fills none of these: the lab form starts empty, and only patient demographics are filled. This needs frontend wiring, but no schema change.
- **Referral auto-draft on open.** The app drafts only when the doctor presses "Generate AI Preview" (`POST` preview → `ReferralAiDraft`). The demo drafts the summary and request on open, and suggests documents with reasons.
- **Referral directory.** The app's `ReferralDirectory` is a physician registry (`lastName`, `givenNames`, specialty RC/non-RC 1–4, two addresses, `fax1`/`fax2`). The demo's directory includes a non-physician entry (Coastal Physiotherapy). Physiotherapy cannot be found in the real directory.
- **Footer.** The demo's "Save for later (was Carry Forward)" conflates two app features. The app has both **Save Draft** (status DRAFT) and **Carry Forward**, which needs a reason of 500 characters or fewer (`carryForwardReason`, status CARRIED_FORWARD). It is meant to bring the form to a later visit. Decide whether "Save for later" means Save Draft (closest) and where Carry Forward goes.
- **HSAT.** The app has a full HSAT requisition (HLTH 1944 Form A, `HsatRequisition`, `HsatRequisitionForm.tsx`). The demo has no HSAT form, only a "Referral for HSAT" task. Add it, or scope it out on purpose.

### App bugs noticed in passing (for engineering, not the demo)
- **Genital Culture "Site" and Gonorrhea (GC) Culture "Site" are shown on the lab form but never saved or printed.** `genitalCultureSite` and `gonorrheaCultureSite` exist in `LabRequestForm.helpers.ts` but are missing from `fillLabPdfSchema` and from `fillInputFromLabRequestFormValue`. The helper's own comment admits this (helpers.ts:230). The doctor types a site that is then lost.
- Backend fields that no UI exposes: `sendBillTo` (hard-coded "MSP"), `billToOther`, `icbcWcbNumber`, `locumPhysician`, `pregnant`, `fasting`/`fastingText`, `nonNominalReporting` (HIV non-nominal reporting checkbox on the PDF), `standingOrders`. For imaging: `icbc`, `wcb`, `mspBilling`, `appointmentDate`/`Time`. `specifySite` is silently set equal to `examRequested`.

---

## Where the real app defines these forms

| Layer | Lab | Imaging | Breast imaging | HSAT | Referral |
|---|---|---|---|---|---|
| UI form | `frontend/src/components/physician/chart/LabRequestForm.tsx` (labels), `LabRequestForm.helpers.ts:3-126` (value type) | `ImagingRequisitionForm.tsx` (value type :16-38, exam lists :48/:67) | button in `ImagingRequisitionForm.tsx:460` | `HsatRequisitionForm.tsx` | `ReferralForm.tsx` |
| Screen / footer / required rules | `LabRequestSubview.tsx:200-201, 742, 807-830` | `ImagingSubview.tsx:347, 593, 872-896` | `ImagingSubview.tsx:349` | `HsatSubview.tsx` | `ReferralSubview.tsx:277-278`, `utils/referralRequirements.ts` |
| Backend validation | `backend/src/validators/labRequest.validators.ts:31-225` | `validators/imagingRequest.validators.ts:4-65` | `controllers/imagingRequestController.ts:27-80` | `validators/hsatRequest.validators.ts` | `controllers/referralController.ts:39-61` (create), `:173-193` (AI preview) |
| DB (`backend/prisma/schema.prisma`) | `LabRequest` :3615 (`selectedTests[]`, `formData Json`, `panelId`, `note`, carry-forward) | `ImagingRequisition` :4309 (typed columns) | none (not stored) | `HsatRequisition` :4397 | `Referral` :4162, `ReferralDirectory` :4209, `ReferralAiDraft` :5420 |
| PDF / letter | `services/labRequestPdfFiller.ts` | `services/imagingReqPdfFiller.ts` | `services/breastImagingReqPdfFiller.ts` | `services/hsatReqPdfFiller.ts` | `services/pdf/referralPdf.service.ts`, `templates/referral/template.html` |
| Snapshot / MOA adapter | `services/clinicalDocument/adapters/` (lab) | `…/imagingRequisition.adapter.ts` | — | `…/hsatRequisition.adapter.ts` | `…/referral.adapter.ts` |

---

## 1. Lab requisition

Real app: every field is optional (`z.boolean().optional()` / `z.string().max(n).optional()`). The only rule is **at least one test** ("Select at least one test before saving or sending this requisition.", `LabRequestSubview.tsx:742`). Demo: at least one test, plus every follow-up answer the chosen tests bring (`lrMissing`, demo:20190).

| Field (app key) | Real app (label, type) | Demo (LR_SECS id, demo:20055) | Match? |
|---|---|---|---|
| hematologyProfile | "Hematology profile", checkbox | `hem-prof` | Match |
| ptInr | "INR", checkbox | `hem-inr` | Match |
| ferritin | "Ferritin (query iron deficiency)", checkbox | `hem-fer` | Match |
| anticoagulant | "On Anticoagulant?", yes/no, single choice, always shown in Hematology | shown only when INR is chosen, and then required | Different: demo hides it unless INR is chosen and makes it required (OK as presentation, but the app does not require it) |
| anticoagulantSpecify | "Specify:", text ≤100 | shown when Yes, required | Different (required in demo only) |
| hfe | "HFE - Hemochromatosis (check ONE only)": confirmDiagnosis / siblingParent, enum | `hfe-conf` / `hfe-rel`, one:true | Match (labels verbatim) |
| penicillinAllergy | "Penicillin Allergy?", yes/no, single choice, Routine culture | shared `pen` question for all cultures and GBS, pre-filled from chart allergies, required | Different: pre-fill is new; required in demo only; demo also uses it for GBS (see groupBStrepPenicillin) |
| throat, sputum, blood | checkboxes, independent | `rc-thr/spu/bld` in a **choose up to one** group | **Different**: single choice in demo, multi in app (ask Daniel) |
| otherCulture + otherCultureSite | "Other, Site:" checkbox + text ≤200 | `rc-oth` + site, required | Match (site required in demo only) |
| deepWound + deepWoundSite | "Deep Wound, Site:**" + text ≤200 | `rc-dw` + "Site**" | Match |
| superficialWound + superficialWoundSite | "Superficial Wound, Site:" + text ≤200 | `rc-sw` + site | Match |
| genitalCulture | "Genital Culture" checkbox | `gen` | Match |
| genitalCultureSite | "Site:" text, **UI only, not saved (app bug)** | site, required | Demo is right; the app drops it |
| genitalCulturePeripartum / Pelvic / Other / OtherDesc | "History:" Peripartum, Pelvic / Genitourinary Surgery, Other: [text ≤200] | `genhist` multi pills + Other text, required | Match (required in demo only) |
| groupBStrepScreen | "Group B Strep Pregnancy Screen (vagino-anorectal swab)" | `gbs` | Match |
| groupBStrepPenicillin | separate "Penicillin Allergy" **checkbox** under GBS | not present (GBS reuses the culture yes/no) | **Missing in demo** |
| chlamydiaGonorrheaNaat, trichomonasNaat | checkboxes | `sti-ct`, `sti-tv` | Match |
| stiSiteVagina/Urine/Cervix/Urethra/Other + OtherDesc | "Site:" Vagina, Urine (first catch), Cervix, Urethra, Other: [text ≤200], checkboxes | `stisite` multi pills + Other text, required | Match |
| gonorrheaCulture | "Gonorrhea (GC) Culture" | `gc` | Match |
| gonorrheaCultureSite | "Site:" text, **UI only, not saved (app bug)** | site, required | Demo is right; the app drops it |
| vaginitisInitial / ChronicRecurrent / PrePubertalPostMenopausal | three checkboxes, labels as spec | `vag-i/c/p` | Match |
| dermatophyteCulture, dermatophyteKohPrep | checkboxes | `der-c`, `der-k` | Match |
| dermatophyteSkin/Nail/Hair | "Specimen:" checkboxes | `derm` pills, required | Match |
| dermatophyteSpecifySite | "Site:" text ≤100 | `dermSite`, required | Match (UI key in app is `dermatophyteSite`) |
| mycologyYeast, mycologyFungus, mycologySite | checkboxes + "Site:" text ≤200 | `myc-y`, `myc-f`, `mycSite` required | Match |
| urineDipstick / DipstickCulture / Microscopy / Culture | 4 checkboxes, labels as spec | `uri-d/dc/m/c` | Match |
| acuteViralHepatitis | one checkbox, sub-lines are text only | `hep-a` (sub-lines as description) | Match |
| chronicViralHepatitis | one checkbox | `hep-c` | Match |
| hepatitisA, hepatitisB (immune status) | "Hepatitis A (anti-HAV)", "Hepatitis B (anti-HBs)" | `hi-a`, `hi-b` | Match |
| hbsAg | "HBsAg" under Hepatitis marker(s) | `hm-s` | Match |
| hivSerology, syphilisScreening | checkboxes | `hiv`, `syp` | Match |
| nonNominalReporting | backend + PDF only (no UI) | not present | Missing in both UIs (form has it) |
| stoolTests | infectiousDiarrhea / cDifficile, single choice | `st-idp/cd`, one:true | Match |
| ecg | "ECG" | `ecg` | Match |
| fit | copyToColonScreening / noCopyToColonScreening, single | `fit-c/n`, one:true | Match |
| otherTests | "OTHER TESTS" textarea ≤2000 (Misc) | `other` textarea | Match |
| glucoseFasting, glucoseRandom, gtt75g, gtt50g, gttNonGestational, hemoglobinA1c, albuminCreatinine | 7 checkboxes | `glu-f, glu-r, gtt-c, gtt-s, gtt-n, a1c, acr` | Match |
| lipids | fullProfile / followUp / apoB, single ("CHECK ONE ONLY") | `lip-f/u`, `apob`, one:true | Match |
| thyroidFunction | monitorReplacement / suspectedHypo / suspectedHyper, single | `thy-m/o/r` | Match |
| sodium … hcgQuantitative (15) | 15 checkboxes | `na, k, alb, alp, alt, bili, ggt, tp, cr, ca, ck, psa-k, psa-s, preg, bhcg` | Match (app key `psaMspBillable` = "PSA (Known cancer)") |
| diagnosis | "DIAGNOSIS" text ≤500 | `dx`, pre-filled from today's concern | Different: pre-fill is new (no schema change) |
| currentMedications | "CURRENT MEDICATIONS / ANTIBIOTICS / DATE AND TIME OF LAST DOSE" ≤500 | `meds`, pre-filled from med list | Different: pre-fill is new |
| contactPhoneForStat | "IF THIS IS A STAT ORDER, PLEASE PROVIDE CONTACT TELEPHONE NUMBER" ≤30 | Routine/**STAT** switch reveals `phone`, required when STAT | Different: there is no STAT flag in the app (derive it from the phone, or add a field) |
| copyToPhysician1/2 | "COPY TO PRACTITIONER/MSP PRACTITIONER NUMBER & CLINIC NAME/ADDRESS" ×2, ≤200 | `cc1`, `cc2` | Match |
| standingOrderEffectiveDate / ExpiryDate | dates (string ≤10), no 24-month rule | `soEff`, `soExp` with max = eff + 24 months, enforced | Different: the demo adds validation the app lacks (fine) |
| standingOrderDetails | "DETAILS & FREQUENCY" ≤2000 | `soDet` | Match |
| instructionsToPatients | text ≤2000 | `instr` | Match |
| sendBillTo / billToOther / icbcWcbNumber | backend only, fixed "MSP" | not present | Missing in both UIs |
| pregnant, fasting, fastingText, locumPhysician | backend + PDF only | not present | Missing in both UIs |
| panelId | `LabRequest.panelId` (label only) | LR_PANELS: Diabetes follow-up, Annual physical, Chest pain workup, Fatigue | **Different**: app panels are Diabetes Monitoring, STI Screen (Urine), STI Screen (Comprehensive), Fatigue, with non-matching test keys |
| Suggested for today (AI) | none | `LR_AI` (demo:20115) | **Missing in app** (backend work) |
| Favourites | none | `LR_FAVS` | **Missing in app** |
| Search any test | none (form only) | yes | Missing in app (frontend only) |
| note ("Add Note" / Send to MOA note) | `LabRequest.note` ≤2000 | "Add a line to today's note" checkbox | Different meaning: the app's note is a message to the MOA, the demo's is a line in the visit note |

## 2. Imaging requisition

Real app: required are **at least one modality** and a valid Copy to; everything else is optional (`ImagingSubview.tsx:347`). Demo requires a modality, an exam, the clinical question (accepted, no [brackets] left), conditional safety answers, and height/weight for CT and Nuclear Medicine (`imMissing`, demo:20538).

| Field (app key) | Real app (label, type) | Demo | Match? |
|---|---|---|---|
| examTypes | "Modality Selection": X-Ray, Ultrasound, Echo, CT, Angio/Intv, Nuclear Medicine; **multi-select**, string[] min 1 | single-choice segmented control, 7 options incl. Breast Imaging | **Different** (single vs multi; Breast Imaging) |
| Breast Imaging | separate button: opens the provincial breast-imaging PDF with demographics only; nothing stored | a modality with 3 exams; safety questions apply | **Different / needs backend** |
| examRequested | "Exam Requested": grouped dropdown for X-Ray (`XRAY_EXAMS`) and Ultrasound (`ULTRASOUND_EXAMS`); free text ≤500 otherwise | search chips over invented `IM_EXAMS`, free text allowed; required | **Different**: use the real lists; required in demo only |
| specifySite | backend copy of examRequested | — | n/a |
| priority | "Priority Level": ROUTINE / URGENT / STAT, required, default ROUTINE | Routine / Urgent / Stat | Match |
| diabetic | "Pt Diabetic" checkbox (boolean) | Yes/No pills, contrast exams only, pre-filled, required | **Different** (app can't store "No" vs unanswered) |
| metformin | "On Metformin" checkbox | Yes/No, pre-filled from med list, required for contrast | **Different** (same) |
| breastFeeding | "Breast Feeding" checkbox | Yes/No, only for breast imaging or contrast in women 12–55 | **Different** (same) |
| pregnant | "Pregnant" Yes/No (string, nullable) | Yes/No, women 12–55 only, required | Match (conditional display is presentation) |
| lmp | "LMP" text/date ≤20 | date | Match |
| gravida, para, abortus | three inputs ≤10 each ("G, P, A") | one text "G, P, A" | **Different**: split into three |
| height, weight | "Height" cm, "Weight" kg, ≤10 | cm/kg, CT and NM only, weight pre-filled | Match (conditional and pre-fill are new) |
| contrastReaction | "Previous contrast reaction?" free text ("Details...") ≤500 | Yes/No + details | **Different**: the app has no Yes/No |
| pertinentHistory | "Pertinent History / Medications" ≤5000 | textarea pre-filled from clinical question, meds and allergies | Match (pre-fill is new) |
| Clinical question for the radiologist (AI) | none | `cq` with AI draft state | **Missing in app**: store it inside pertinentHistory (state not storable) |
| copyTo | single string "Name, fax 250-…; Name, fax …", ≤200, max 2, validated | 2 × (Doctor name, Fax number) | Different in shape: serialise to the app string and reuse its validation |
| kidneyFunctionAbnormal | "Abnormal Kidney Function?" Yes/No (CT section) | — | **Missing in demo** |
| lSpineSurgery | "Prior L-Spine surgery?" Yes/No | — | **Missing in demo** |
| egfr + egfrDate | "eGFR" + "Date" | — | **Missing in demo** |
| creatinine + creatinineDate | "Creatinine" + "Date" | — | **Missing in demo** |
| icbc, wcb, physicianPhone, mspBilling, appointmentDate/Time | backend/PDF only | — | n/a (no UI either side) |
| facilityId | chosen at fax time (FaxImagingFacilityDialog) | "Sign and fax to radiology" (no facility picker shown) | Demo should show where it is faxed (a facility picker exists in the app) |
| "From the chart" exam suggestion | none | `IM_FROM` | Missing in app |

## 3. Referral

Real app: `reason` is required to save or send to the MOA. To preview or fax, specialist name and specialty are also needed (`referralRequirements.ts`). Clinical summary and request are optional, and there are up to 5 supporting documents. Demo: requires a specialist (name and specialty), reason, summary and request, with both AI drafts accepted or edited, before **either** sign button. Faxing yourself also needs a fax number.

| Field (app key) | Real app (label, type) | Demo (demo:20743-20880) | Match? |
|---|---|---|---|
| specialist search | "Search Specialist": "Search by name, specialty, or city..." over `ReferralDirectory` (physicians, 2 addresses, fax1/fax2) | "Search by name, specialty or city" over invented `RF_DIR` (incl. a physiotherapy clinic) | Match in behaviour; directory content differs (needs the real source; physio is not in it) |
| specialistName | "Specialist Name" ≤200 (nullable; MOA may fill) | "Name", required for both routes | Different (required-ness) |
| specialistSpecialty | "Specialty" ≤200 | "Specialty", required | Different (same) |
| specialistClinic | "Clinic / Title" ≤300 | "Clinic and address" | **Different label/meaning** |
| specialistCity | "City" ≤100 | — (shown only from directory) | **Missing in demo (manual entry)** |
| recipientFax | "Recipient Fax" ≤50, separate field | "Fax number" in manual entry; from directory | Match (needed to fax yourself in both) |
| isUrgent | "URGENT" checkbox; "Adds a red, bold, underlined URGENT label above the greeting" | "Urgent" switch; letter shows "Urgent" | Match (app letter prints "URGENT" in caps, red, bold, underlined) |
| reason | "Reason for Referral", required | "Reason for referral", pre-filled from today's concern | Match (pre-fill is new) |
| clinicalSummary | "Clinical Summary", optional, AI via "Generate AI Preview" | AI-drafted on open with sources, required, accept state | Different: required in demo; auto-draft, sources and accept state are new |
| request | "Request" ("What you specifically want the specialist to do"), optional | same help text, AI draft, required | Different (required-ness, auto-draft) |
| aiDraftId / aiDraftDiff | stored (`ReferralAiDraft`) | — | Demo silent; fine |
| supportingDocuments | ≤5 of UPLOAD / LAB / IMAGING / PRESCRIPTION | ≤5 of visit note, intake, lab report (results by date), consult letter, letter, upload; AI suggestions with reasons | **Different**: 4 of the demo's 6 kinds can't be attached today |
| emailPatient | column (no form control) | — | n/a |
| Letter content | template: clinic header, patient name/DOB/PHN/address/contact/email, physician CPSBC and billing numbers, specialist name/clinic/city/fax, REASON FOR REFERRAL, clinical summary, REQUEST, "Thank you for seeing this patient." | To, Re (name, age, sex, PHN), "Dear …", "Thank you for seeing … for [reason]", summary, Request, **Enclosed** list | Different: the app letter has no "Enclosed" list and the demo letter lacks DOB/address/contact/CPSBC/billing. Make the demo preview follow the real template. |
| Footer | Cancel · Send to MOA · Preview · **Fax Referral** · Save Draft · Carry Forward | Cancel · Save for later · Preview · Sign and fax to specialist · Sign and ask the MOA to send | Different by design; map "Save for later" to Save Draft, and decide on Carry Forward |

## 4. HSAT (in the app, not in the demo)
`HsatRequisition` / `HsatRequisitionForm.tsx` covers these fields:
- Preferred Language and Secondary Contact Number.
- HSAT Facility: name, address, email, phone and fax. Fax is required before sending.
- Safety Critical Occupation (yes/no).
- Patient History and Comorbid Conditions, and Allergies and Medications.
- Primary Care Provider: Same as Referring / None / Named, plus a name.
- Copy to, using the same validated string as imaging.
- Step 1 OSA risk: witnessed apneas, habitual loud snoring, diagnosed hypertension.
- Step 2 exclusions: 7 booleans.
- "Patient eligible for HSAT?" (yes/no; the UI will not send without it).

The demo has none of this. If HSAT is in scope for T-028, it needs its own panel.
