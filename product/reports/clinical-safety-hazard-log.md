# Clinical hazard log — physician portal v2

**Living log.** Kept by the `clinical-safety` agent. It is modelled on ISO 14971 and DCB0129, and it
claims no compliance with either. **I am not the accountable clinical safety officer.** A qualified
person must review and sign this log before any feature here reaches a patient.

- **Scope:** what `simplecare-physician-portal-v2.html` does today, at build stamp
  `v2 · build 2026-09-26 19:16` (V2:10792), commit `c1015e4`. I found the code with grep and did not
  read the whole file.
- **Evidence:** `shadowing/` (S1–S5), `from-daniel/` (ANS26 = 26 Sep answers, MTG21 = 21 Sep
  meeting), and `product/open-questions.md` (OQ-…). Code references are `V2:<line>`.
- **First entry:** 26 Sep 2026. **Next review:** after the next prototype build that touches
  results, prescribing, sign-off or the scribe.

## How hazards are rated

Every rating is qualitative. None of them sets a clinical threshold.

| Severity | Meaning |
|---|---|
| Catastrophic | Could contribute to death or permanent harm (for example, a missed critical result or a drug given against an allergy) |
| Major | Could cause serious but recoverable harm, or delay treatment that is needed |
| Moderate | Could cause minor harm, or care that is wrong but caught later |
| Minor | Inconvenience, with no plausible harm |

| Likelihood | Meaning |
|---|---|
| Likely | Expected in normal use; seen in shadowing or built into the default path |
| Possible | Needs a plausible combination, such as a busy window, an unusual value or a second patient with the same name |
| Unlikely | Needs several things to go wrong at once |

**Residual risk** is the risk that remains with the controls this build already has, assuming the
design ships as it is. It is **High** (must be fixed or accepted by the clinical safety officer
before go-live), **Medium** (fix before go-live unless accepted, with a rationale) or **Low** (keep
monitoring).

Many hazards come from demo scaffolding: timers, name-keyed data and hard-coded text. They are
logged anyway, because a prototype that looks finished tends to become the spec.

---

## Register, ranked by residual risk

| ID | Feature | Hazard | Sev. | Lik. | Residual | Owner |
|---|---|---|---|---|---|---|
| HZ-01 | Result tiering, inbox bands | A result the lab would phone about lands in Routine, or loses its critical flag | Catastrophic | Possible | **High** | Daniel (rules); integrations-engineer |
| HZ-02 | Chart header, renewal, favourites | Every chart says "No known drug allergies", and nothing checks allergies or interactions | Catastrophic | Possible | **High** | ux-designer; tech-lead; Daniel |
| HZ-03 | Sign off & finalize | The visit is signed with an auto-written note, a template line, or an open critical result | Major | Likely | **High** | ux-designer; Daniel |
| HZ-04 | Ambient scribe | AI text becomes the signed note unmarked, and says actions were done that were not | Major | Possible | **High** | ai-engineer; Daniel; qualified SaMD reviewer |
| HZ-05 | Critical result hand-off to the MOA | A critical result is handed off, leaves Home, and nobody confirms the patient was reached | Catastrophic | Possible | **High** | Daniel; ux-designer; tech-lead |
| HZ-06 | Patient identity | A result, task or chart is linked to the wrong patient through name matching | Catastrophic | Possible | **High** | tech-lead; ux-designer |
| HZ-07 | Renewal: dose and quantity | The wrong dose, or a quantity that runs out early, is faxed | Major | Possible | **Medium** | Daniel (rules); ux-designer |
| HZ-08 | Renewal: fax status | "Delivered" shows for a fax that failed or had no pharmacy | Major | Possible | **Medium** | integrations-engineer; Ani |
| HZ-09 | Renewal: "Ask the MOA to send" | A renewal waits a week in the MOA queue, and whose sign-off it carries is unclear | Major | Possible | **Medium** | Daniel |
| HZ-10 | Since last visit, care plan, recall | Stale or wrong-problem context is read as current | Major | Likely | **Medium** | ai-engineer; ux-designer; Daniel |
| HZ-11 | Outside medications | A dose the patient reported is renewed as if verified | Major | Possible | **Medium** | ux-designer; Daniel |
| HZ-12 | Patient-uploaded results, expected results | A critical value the patient uploads is never tiered, and a result that never arrives goes unnoticed | Major | Possible | **Medium** | Daniel; ux-designer |
| HZ-13 | Patient-reported BP and weight | An implausible or mis-unit reading is saved and trended | Moderate | Possible | **Medium** | ux-designer; Daniel |
| HZ-14 | Call drop and redial | "On call" shows without a connection, or the doctor documents in one chart while talking to another patient | Major | Possible | **Medium** | frontend-engineer; tech-lead |
| HZ-15 | Today's note | Reopening the chart wipes an unsaved note | Moderate | Likely | **Medium** | frontend-engineer |
| HZ-16 | Inbox order, Home band | Older results sort as new, and High results are not on Home | Moderate | Possible | **Low** | frontend-engineer; Daniel |
| HZ-17 | Signed note | A signed note cannot be corrected (no addendum) | Moderate | Possible | **Low** | ux-designer |
| HZ-18 | "Signed off by" stamp | The signer's name is hard-coded, not taken from who is signed in | Major | Unlikely | **Low** | tech-lead |

---

## Hazards in detail

### HZ-01 · A result the lab would phone about lands in Routine · Residual: High
- **Feature:** result tiering (`labCheck`, `applyLabRules`), the inbox's Critical / High / Routine
  bands, the Home "Needs your attention" band, and the critical row on the chart.
- **Cause:**
  - The tier comes only from the numeric LifeLabs BC table plus the SimpleCare escalation table
    (V2:7840-7916). A test that is not in the table gets no tier, *"however far outside its
    reference range it sits"* (V2:7826-7828).
  - Any severity the source marked that the table does not agree with is **removed** at load
    (V2:7955-7968). In production this could strip the lab's own critical flag.
  - A censored value such as ">50000" or "<0.5" gives `parseFloat` = NaN, which returns no tier
    (V2:7923-7924).
  - Units are converted only for troponin (V2:7899-7902). Another unit mismatch passes silently.
  - Narrative results (ECG, imaging, screening, cultures) have no tier at all.
  - The demo data shows the effect. Haemoglobin 71 g/L (down from 118) was marked critical and is
    demoted to Routine (V2:7724-7725). A new atrial fibrillation on the ECG of the patient with the
    critical troponin is Routine (V2:7795-7798). A positive FIT is Routine (V2:7803-7805).
- **Effect:** a result that needs same-day action waits in Routine, behind other results, first in,
  first out.
- **Existing controls:** the tier is a floor that SimpleCare may raise and never lower (V2:7866).
  Troponin and lactate are escalated in Daniel's own words (V2:7858-7862). The AI line "never gives
  an all-clear under an abnormal finding" (V2:8820-8824). Critical and High results sit at the top
  of the chart (V2:10388-10424).
- **Recommended controls:**
  - Keep the lab's own abnormal or critical flag (HL7 v2 OBX-8) as a second floor. SimpleCare's
    table may raise it and never clear it.
  - Treat a value that cannot be parsed, or a unit that does not match, as "needs a person": show
    it in a visible band, never Routine.
  - Give narrative results a path to High or Critical: a flag the lab or the MOA can set, and a
    rule for results related to an open critical result for the same patient.
  - Log every tier decision with its rule, for audit.
- **Needs Daniel:** OQ-12 (results with no LifeLabs limit, haemoglobin 71, the ECG), OQ-13
  (digoxin) and OQ-14 (the rest of the escalation table). The thresholds themselves need him or a
  qualified reviewer to verify them against the source PDF. This log does not set any.

### HZ-02 · Every chart says "No known drug allergies" · Residual: High
- **Feature:** the chart's safety line, the renewal card, Favourites, and "Renew too".
- **Cause:** the allergy line is static markup with a green tick and is the same for every patient
  (V2:4638, and V2:4585, 4849, 5043 in the other chart versions). No code sets it per patient (grep
  finds no writer). The renewal card, Favourites (which can add a drug that is *"not on this
  patient's medication list"*, V2:10055, 10553-10566) and "Renew too" run no allergy, interaction
  or duplicate check.
- **Effect:** a doctor who trusts the tick prescribes a drug the patient is allergic to. The comment
  at V2:4636 says why this matters: *"'none' is itself a safety fact."*
- **Existing controls:** none beyond the doctor's own knowledge and the pharmacist's check.
- **Recommended controls:**
  - Take allergy status from the record, with its source and the date it was last confirmed. When
    it is unknown, show "Allergies not recorded" and no tick.
  - Show allergies in the renewal card's "Check before it goes" step.
  - Integration (PharmaNet or a drug database) for interactions and duplicates. A qualified reviewer
    sets which checks are required.
- **Needs Daniel:** does he want an allergy check at the renewal's check step, and should an
  unconfirmed allergy status block the fax or only warn?

### HZ-03 · The visit is signed with an auto-written note, a template line or an open critical result · Residual: High
- **Feature:** "Sign off & finalize visit" (V2:4722, `finalizeVisit` V2:7191-7222).
- **Cause:**
  - **The empty-note guard never fires on a fresh chart.** Opening a chart pre-fills the note with
    "Patient presents for <concern>. " (V2:9446), so the check `if(!txt)` (V2:7202) finds text.
  - The placeholder guard matches only bracketed text, `\[[^\]]{3,}\]` (V2:7203). The "+ Normal
    exam" and "+ Follow-up template" chips insert an unbracketed "Normal exam: " (V2:4711-4712,
    9384-9389). A phone visit can therefore be signed with an exam heading that was never filled
    in. The scribe's "ASSESSMENT AND PLAN · Not drafted" line (V2:7523) also passes.
  - Finalize does not check any of these:
    - an unsigned critical or high result for this patient, although `chartCritical` exists
      (V2:10390);
    - scribe proposals still waiting (`scPending`, V2:7555);
    - a renewal still sending, or not yet picked up.
  - Finalize also submits the bill (V2:7213). Daniel treats billing as its own sign-off
    (ANS26:30-31; OQ-51). That question belongs to billing-msp; it is noted here because it bundles
    two accountable actions into one press.
- **Effect:** a signed visit with no real documentation, or a visit closed while a critical result
  for the same patient is still unaddressed. S1–S5 show that the note is not written during the
  call in 5 of 5 visits, which makes this the likely path, not an edge case.
- **Existing controls:**
  - "Sign off anyway" is a second, deliberate press (V2:10453-10461).
  - After sign-off the note is read-only and stamped (V2:10432-10437), and the renewal card locks
    (V2:10048-10051).
- **Recommended controls:**
  - Count only what the doctor typed or accepted as content. An auto-prefilled line counts as
    empty.
  - Widen the template check to any inserted heading left with nothing after it.
  - Before sign-off, list what is still open for this patient: critical or high results, pending
    scribe proposals, and renewals not yet delivered. Each one needs a press to acknowledge it.
- **Needs Daniel:** OQ-16. Should sign-off be blocked, or ask, when an open critical result exists
  for the same patient?

### HZ-04 · The scribe's text becomes the signed note unmarked · Residual: High
- **Feature:** the ambient scribe (V2:7440-7680).
- **Cause:**
  - The scribe streams its text straight into the doctor's note field (`scStep`, V2:7527-7537).
    Starting it **clears whatever the doctor had typed** (V2:7508). Once the text is there, nothing
    marks which lines are machine-written, and Finalize treats them like the doctor's own.
  - The drafted PLAN states actions as done: *"Fresh requisition … released to the portal"*
    (V2:7487). They happen only if the matching proposal is accepted (V2:7560-7581). A proposal
    that is dismissed or ignored leaves the note claiming it happened.
  - "Create task" on the Prescription proposal (bisoprolol, V2:7458-7462) sends the prescription to
    the MOA as a task. This **skips the renewal card's "Check before it goes" step** and its
    sign-off.
  - The critical-result hold (`scHeld`, V2:7519) covers only the assessment, the plan and two
    proposals. It is keyed to "any unsigned critical result on this chart":
    - it lifts as soon as the result is signed off in the inbox, even if the call never discussed
      it;
    - a High (alert-tier) result holds nothing;
    - the "Held back" sentence is hard-coded to one patient's items (V2:7677).
  - "Code as stable angina" says it is *"Suggested only"*, yet "Add to note" reports *"Coded on the
    visit note"* (V2:7563-7567).
- **Effect:** an unreviewed AI draft is filed as the doctor's note. The record says things were
  done that were not, such as safety netting released or bloods requested. A new drug reaches the
  MOA without the dose check.
- **Existing controls:**
  - Consent comes first, and declining is easy (V2:7609-7627).
  - Nothing is created without a press (V2:7678). Each proposal shows *"What it heard"* with a
    timestamp.
  - Proposals are labelled "CLEAR" or "CHECK THIS".
  - The critical hold exists and says what it held back.
- **Recommended controls:**
  - Put the draft in its own area, marked as machine-written line by line. The doctor accepts it
    into the note section by section.
  - Turning the scribe on never erases typed text.
  - Draft actions as proposals ("Proposed: release safety netting"), never as past tense, until the
    matching proposal is accepted.
  - Send prescription proposals through the renewal card's check step.
  - Finalize lists any proposals left unhandled.
  - The hold rule should cover results the call has not addressed, not only results the doctor has
    not signed off.
- **Needs Daniel:** which proposals a critical result should hold back. For example, should
  "start bisoprolol" and "chase the stress test" still surface while a troponin is critical? That
  is a clinical call, and this log does not make it. OQ-31.
- **SaMD flag:** see the section below.

### HZ-05 · A critical result handed to the MOA with no confirmed contact · Residual: High
- **Feature:** Review → "Accept & assign" (V2:9016-9050), "Record no follow-up" (V2:9054,
  9195-9199), the Home critical band (V2:6255-6257), MOA tasks.
- **Cause:**
  - "Accept & assign" marks the result *reviewed* (V2:9025). The Home critical band shows only
    *received* results (V2:6255-6257), so the result **leaves Home at once**.
  - What remains is an urgent MOA task, "Phone <name> now and hand them to the doctor"
    (V2:8954-8957). It has no pick-up signal, no "patient reached" outcome and no escalation if
    nobody acts. "Picked up" exists only for renewals, and there it is a 7 s demo timer
    (V2:10170-10177). OQ-41 is still open.
  - A critical result can be closed with "No follow-up" and no reason (V2:9054, 9195-9199). The
    Reason field is on the other path only (V2:4435).
  - There is no route for a critical result that arrives outside call windows or while the doctor
    is on a call (OQ-07). LifeLabs phones critical results 24 hours a day (V2:7822).
- **Effect:** the critical result drops off the doctor's view, the MOA task is missed or
  misunderstood, and the patient is never reached.
- **Existing controls:**
  - A critical result opens on a drafted follow-up, "Contact <name> now".
  - Closing without follow-up takes a second press (REQ-RV-02).
  - The unsigned result stays at the top of the chart with its disposition (V2:10404).
  - "Call now" appears when the patient is in today's queue.
  - Emergency-contact fallback text is included.
- **Recommended controls:**
  - Keep a critical result on Home until the patient-contact outcome is recorded (reached, not
    reached, escalated), not just until it is reviewed.
  - A real acknowledgement from the MOA, and an escalation back to the doctor when it has not
    come within a tolerance Daniel sets.
  - Require a reason to close a critical result with no follow-up.
  - Log every step for audit.
- **Needs Daniel:** OQ-11 (who makes first contact), OQ-07 (interrupting a call), OQ-15 (the time
  tolerances), the after-hours route, and how long an MOA may take to acknowledge a critical-result
  task. No numbers are set here.

### HZ-06 · Records linked to the wrong patient through name matching · Residual: High
- **Feature:** patient identity across the inbox, the chart, tasks and the scribe.
- **Cause:**
  - Results join the chart by display-name string (`inboxFor`, V2:10291-10294). Every data table is
    keyed by that display name (`RX_MEDS`, `PT_RESULTS`, `PT_LAST`, `PT_CHART`).
  - "Open chart" from the inbox uses a **prefix** match on names (V2:8755, 8762-8764). Its
    legal-name branch upper-cases the query against a mixed-case name, so it can never match.
  - A task's chart number is the last four digits of the PHN (V2:9033, 9177), or the hard-coded
    `#6448`, which two different patients carry (V2:6889, 6909, 7269, 7574).
  - Every scribe task is filed against one named patient, whichever chart is open (V2:7574).
  - A task's "preferred" name is the first word of the name (V2:9033). The demo holds two different
    patients called Manjit, with different PHNs (V2:7723 and V2:5577, 9985). A task reading
    "Contact Manjit now about Haemoglobin 71" is ambiguous in the MOA queue.
  - The live chart header shows legal name, preferred name, age, sex and PHN, but **no DOB**
    (V2:4629), although REQ-ID-02 is marked built. The hidden chart versions show the same
    hard-coded DOB for everyone (V2:9419).
- **Effect:** a critical result sits on the wrong chart or on none, the MOA phones the wrong patient,
  or identity on the phone is checked against the wrong data.
- **Existing controls:** the queue shows the legal name, the preferred name, age and sex (V2:5559).
  The chart banner leads with the legal name, and "Preferred:" shows when it differs (V2:9414-9418).
  PHNs now differ per patient and match the inbox (V2:9973-9977).
- **Recommended controls:**
  - Join everything on a unique patient identifier (PHN plus an internal ID, the FHIR Patient ID),
    never a name.
  - Every task and hand-off shows legal name, preferred name and a second identifier.
  - Show DOB on the chart header for phone identity checks.
  - Flag same-name patients across the day sheet and the MOA queue.
  - Bind the scribe session to the patient on the call.
- **Needs Ani:** confirm whether DOB belongs on the chart header. D-48 removes it from the list view
  only.

### HZ-07 · Wrong dose or a short quantity on a renewal · Residual: Medium
- **Feature:** the renewal card (V2:10014-10190), Favourites (V2:10525-10566), "Renew too".
- **Cause:**
  - Quantity = doses per day × days (V2:10016). This assumes **one unit per dose**, and there is no
    strength or units-per-dose field. A dose typed as "300 mg" for 100 mg capsules faxes a third of
    the supply needed.
  - Only four directions are offered (V2:9998). There is no PRN, no taper, no half-tablet and no
    "two tablets".
  - Dose is free text, checked only for being non-empty (V2:10126-10127).
  - The default dose is the last plan's target, not the listed dose (V2:10025-10028). Shadowing
    supports this (S2: *"three months at 300"*), but the patient may not have reached the target.
  - A favourite replaces the whole line, including the plan-dose note (V2:10563).
  - The card does not show an open critical or high result, or monitoring bloods, for the drug
    being renewed.
- **Effect:** the patient runs out early, or gets the wrong dose.
- **Existing controls:**
  - The quantity is computed rather than typed, which fixes the "90 tablets twice daily" error in
    the doctor review.
  - "(list says 25 mg)" shows when the plan dose differs (V2:10054).
  - "From your favourites · not on this patient's medication list".
  - "Check before it goes" lists drug, dose, directions, quantity and days before the fax (V2:10133-10151).
- **Recommended controls:**
  - Structured strength and units per dose.
  - PRN and taper directions, or a free-text route that forces the quantity to be typed.
  - Show the listed dose beside the proposed dose in the check step.
  - Show open results for the same patient in the check step.
- **Needs Daniel:** OQ-09 (quantity rules and drugs never to default to 90 days), OQ-60
  (favourites), and which bloods, if any, a renewal should show. Nothing is set here.

### HZ-08 · "Delivered" shows for a fax that failed or had no pharmacy · Residual: Medium
- **Feature:** fax status on the renewal card.
- **Cause:**
  - "Delivered" is a 5 s timer with no failure state (V2:10180-10186).
  - The fax can be confirmed with **no pharmacy on file**: two demo patients have none (V2:9983,
    9986). The status then reads "Delivered to the pharmacy on file" (V2:10155, 10204).
  - On the MOA route the doctor sees "Picked up" and never "faxed" or "delivered" (V2:10199-10201).
- **Effect:** the doctor and the patient believe a prescription reached a pharmacy when it did not.
  S1 shows that today only the patient gets proof of delivery.
- **Existing controls:** "No pharmacy on file. Ask the patient on the call." shows in the card
  (V2:10077). "Sending" and "Delivered" are two separate events.
- **Recommended controls:**
  - Block the fax until a pharmacy with a fax number is chosen.
  - Take status only from the fax provider, and give a failed fax a visible state and an owner.
  - Show delivery on the MOA route too.
- **Needs Ani:** OQ-50 (what the fax service really reports).

### HZ-09 · A renewal waits in the MOA queue, and its sign-off is unclear · Residual: Medium
- **Feature:** "Ask the MOA to send" (V2:10159-10177, `moaTask` V2:10207-10227).
- **Cause:**
  - The renewal task is always `prio:'routine'`, which is due "This week" (V2:10162, 10210). S1's
    patient had run out a week earlier.
  - Who signs off the script when the MOA faxes is undefined. Daniel: *"To Fax is to 'sign off' on
    the script"* (ANS26:22). The note line records "Sent to <MOA>", with no sign-off (V2:10166).
- **Effect:** a treatment gap, and an unclear line of accountability for the script.
- **Existing controls:** the doctor's own check step comes before the task. The task carries the
  full script text. "Sent / Picked up" shows on the card.
- **Recommended controls:**
  - The doctor chooses the priority, or it follows the supply the patient has left.
  - The record says "sent by <MOA> for Dr. <name>", with the doctor's sign-off time.
- **Needs Daniel:** OQ-61 (whose sign-off it is) and the priority for renewal tasks.

### HZ-10 · Stale or wrong-problem context read as current · Residual: Medium
- **Feature:** "Since last visit": care plan, last-note summary, "Ask about", "Pending"
  (V2:10295-10350). The fast-track recall line (V2:8766-8772).
- **Cause:**
  - The block always shows the latest SimpleCare note (V2:10297). Nothing checks whether that note
    concerns today's reason. S4 is the case: a weight visit, where the latest note was about iron
    deficiency (S4:99-107).
  - Staleness shows only as a date. There is no "N months ago" and no warning when the note is old.
  - Only SimpleCare notes count. In S1 and S5 the doctor asked about Tia and Rocket in front of
    "No previous notes".
  - "Pending" includes only SimpleCare orders, unread inbox items and expected results added by
    hand.
  - The summary does not say who wrote it (OQ-63).
  - The recall line asserts *"you started bisoprolol today"* as a fixed string, whether or not
    anything was started (V2:8769).
- **Effect:** the doctor acts on the wrong plan or an old dose, or misses a thread in another note
  (S3: the hernia plan was not in the latest note).
- **Existing controls:** the block names the date, the reason and the author (V2:10319-10320). The
  full signed note opens read-only in place. It is hidden when there is no previous visit. Critical
  and high results have their own row above it.
- **Recommended controls:**
  - When no earlier note touches today's reason, say "First visit for <reason>", with the unrelated
    plan reduced to one line (S4).
  - Show the age of the last note.
  - Mark any generated summary as machine-written, with a link to the source lines.
  - Never show a recall sentence that is not derived from the record.
- **Needs Daniel:** OQ-63 (who writes the summary, whether he approves it first, and what "the last
  note" means for a new reason) and OQ-18 (other platforms).

### HZ-11 · A dose the patient reported is renewed as if verified · Residual: Medium
- **Feature:** "Add one started elsewhere" (V2:10482-10510) and the renewal card.
- **Cause:** a medication the patient reports joins the same list the renewal card reads
  (V2:10503). The card's line drops the source (`rxLineFrom` carries no `src`, V2:10025-10028), so
  "patient-reported" is not visible where the dose is confirmed. The form is fixed to "tablets"
  (V2:10502), and directions are limited to the four options.
- **Effect:** an unverified dose is faxed with the doctor's sign-off.
- **Existing controls:** the medication rail and tab show "Started elsewhere … patient-reported"
  (V2:10471). The note records the line as patient-reported (V2:10505).
- **Recommended controls:** carry "patient-reported, not verified" into the renewal line and the
  check step, until a source such as PharmaNet or a discharge summary confirms it.
- **Needs Daniel:** OQ-57 (medication reconciliation).

### HZ-12 · Patient uploads are never tiered; expected results never go overdue · Residual: Medium
- **Feature:** Results by test, with the source shown (V2:10660-10776). Expected results
  (V2:10697-10701, 10781).
- **Cause:**
  - A result the patient uploads keeps whatever flag was typed. `labCheck` is never applied to it,
    because `rsSync` copies flags only from inbox items (V2:10705-10711). An upload never becomes an
    inbox item, so a critical value in it **never reaches the Critical band or Home**.
  - Who transcribes values from a patient's PDF, and who checks them, is undefined.
  - The trend line mixes sources and labs, with different ranges and units, in one sparkline. The
    source appears only in the text (V2:10745-10750).
  - An expected result has a free-text date and no overdue state. S5 wanted it to turn overdue.
- **Effect:** a critical value the patient uploads is read late or never. Bloodwork ordered
  elsewhere is never chased.
- **Existing controls:** "Uploaded by patient · patient-supplied" is labelled on every row (V2:10717-10721),
  as Daniel asked (ANS26:56-60). "Expected" appears in Results and in "Since last visit".
- **Recommended controls:**
  - Every upload creates an inbox item that goes through the same tiering.
  - Mark transcribed values "entered by <who> from a patient upload".
  - Mark the source on each trend point.
  - An expected result turns overdue after a date the doctor sets.
- **Needs Daniel:** OQ-54 (does an upload prompt a review) and OQ-65 (which direct source comes
  first; direct feeds make this hazard smaller).

### HZ-13 · An implausible or mis-unit reading is saved and trended · Residual: Medium
- **Feature:** "Weight and BP · Reported by patient" (V2:10571-10660).
- **Cause:**
  - The BP check accepts any 2–3 digits over 2–3 digits (V2:10644), including 82/128 and 300/20.
  - Weight accepts any 2–3 digits as kg (V2:10650). A figure in pounds, which is how the S4 intake
    recorded weight (S4:14-16), is saved as kg.
  - By design, no target or out-of-range marker is drawn (V2:10571-10573). A reading of 210/120 is
    therefore shown plainly.
- **Effect:** a false trend, or a dangerous reading that goes unnoticed.
- **Existing controls:** "Reported by patient" is labelled. The reading is written into today's
  note. "Today, on call" is marked.
- **Recommended controls:**
  - Plausibility checks: systolic above diastolic, and ranges a qualified reviewer sets.
  - Ask for the unit.
  - Mark each point by how it arrived (portal or call).
- **Needs Daniel:** OQ-64 (who enters readings) and OQ-56 (the home BP protocol). Should a reading
  above a level he chooses be flagged? No level is set here.

### HZ-14 · "On call" without a connection; documenting in another patient's chart · Residual: Medium
- **Feature:** Call, drop and redial (V2:9488-9540).
- **Cause:**
  - "Calling…" turns to "On call" after 1.2 s whatever happens (V2:9505). There is no ringing, no
    answer and no failed state.
  - A drop happens only from the demo control (V2:9524-9528).
  - `openChart` calls `pcEndCall()` (V2:9467), and call records are keyed to the open chart
    (V2:9498). Opening chart B mid-call silently clears A's call state, with nothing saying "still
    on the line with A".
- **Effect:** the doctor talks to patient A while documenting or prescribing in chart B. Or the
  doctor believes a call connected when it did not (S3, S5: "Call Again" resets instead of
  dialling in production).
- **Existing controls:** one press dials, and a second press does nothing. The timer counts the
  whole contact across redials, and "Call dropped at … · Redial" shows (V2:9515-9520).
- **Recommended controls:**
  - Take call state from telephony.
  - A persistent "On call with <legal name>" bar that stays across charts, with a confirmation
    before opening another chart mid-call.
- **Needs Ani:** OQ-06 (a patient who does not answer).

### HZ-15 · Reopening the chart wipes an unsaved note · Residual: Medium
- **Feature:** today's note.
- **Cause:** `openChart` overwrites the note with the prefill every time (V2:9446). "Save draft"
  only shows a toast (V2:4723). Any path back through `openChart`, such as the queue,
  "Next: <patient>" or "Call now" from review, loses typed text.
- **Effect:** lost documentation, or a note rewritten from memory later.
- **Existing controls:** none.
- **Recommended controls:** save drafts automatically, per patient and per visit, and never
  overwrite them on open.

### HZ-16 · Older results sort as new; High is not on Home · Residual: Low
- **Feature:** inbox first in, first out inside each band (MTG21:47-49). The Home attention band.
- **Cause:**
  - `inboxWhen` parses only "Today" and "Yesterday". A result stamped "Mon" (V2:7810), or any date,
    sorts as today at 00:00 (V2:8076-8082). This breaks oldest-first once a result is more than a
    day old.
  - Home shows critical results only, a decision (D-39), which leaves High results for the inbox
    (OQ-01).
  - The attention band folds after five rows (V2:6186).
- **Effect:** an older result waits behind newer ones in the same band.
- **Existing controls:** bands never mix. Critical rows lead the Home band, before tasks. High
  results show on the chart.
- **Recommended controls:** sort on the full received timestamp (the clinic's received time, per
  MTG21:65-66). Never fold critical rows.
- **Needs Daniel:** OQ-01.

### HZ-17 · A signed note cannot be corrected · Residual: Low
- **Cause:** after sign-off the note is read-only (V2:10434), and no addendum path exists (grep
  "addend" finds nothing).
- **Effect:** a known error stays in the record, or gets worked around outside it.
- **Recommended control:** a dated, attributed addendum. The original is never edited.

### HZ-18 · The "Signed off by" name is hard-coded · Residual: Low
- **Cause:** "Signed off by Dr. Pannozzo" is a literal string (V2:10436, 10534, 7221, 8195).
- **Effect:** in a multi-doctor practice, a sign-off is attributed to the wrong clinician.
- **Recommended control:** take the name from the signed-in user, with a timestamp in the audit
  log.

---

## Possible software-as-a-medical-device functions (for a qualified reviewer)

These features may fall under Health Canada's SaMD guidance. I am not classifying them. A
qualified regulatory reviewer should:

1. **Ambient scribe:** it drafts an assessment and plan, proposes a diagnosis code ("Code as stable
   angina") and proposes orders, including a new prescription (V2:7446-7487).
2. **Result tiering and escalation:** deterministic triage that decides which band a result lands
   in, and what reaches Home (V2:7820-7968).
3. **Review "AI summary" and "Suggested disposition":** the text is built from a template
   (`rvDraft`, V2:8933-8969) but labelled AI (V2:8829, 8979). The label should match how the text
   is made, and the classification may depend on it.
4. **Problem-list suggestions and care gaps:** suggestions block Finalize (V2:7195-7199), and
   guideline-based gaps come with an "Order" button (V2:7179-7182).
5. **The last-note summary**, if it is generated (OQ-63).

## Prototype-only defects that must not carry into production

These are not ranked hazards, because they are demo scaffolding. Each would be a High hazard if it
shipped:

- The scribe's transcript, consent wording and "Held back" text are fixed to one patient, whatever
  chart is open (V2:7440, 7614, 7677).
- The fax "Delivered" and MOA "Picked up" states are timers (V2:10170-10186).
- The allergy line is static (HZ-02).
- The chart number `#6448` is shared, and the signer's name is hard-coded (HZ-06, HZ-18).

---

## Top 3, ranked by impact

1. **HZ-01 and HZ-05: the critical-result chain.** A result the lab would phone about can land in
   Routine (off-list, censored or narrative results, or the lab's flag stripped). A critical result
   that is caught then leaves Home as soon as it is handed to the MOA, with no confirmation that
   the patient was reached and no escalation.
2. **HZ-03 and HZ-04: sign-off without real review.** The empty-note guard never fires, because the
   note is pre-filled. Finalize does not check for an open critical result. The scribe writes
   unmarked text into the note, says actions were taken that were not, and can route a new
   prescription past the check step.
3. **HZ-02 and HZ-06: allergies and identity.** "No known drug allergies" is shown with a tick on
   every chart. Results, tasks and charts join on name strings and shared or derived chart numbers.

## Needs Daniel

- **OQ-12, OQ-13, OQ-14:** tiering for results with no LifeLabs limit (haemoglobin 71, the new AF
  on the ECG, a positive FIT), digoxin, and the rest of the escalation table. He or a qualified
  reviewer should also verify the thresholds already encoded against the LifeLabs source.
- **Critical-result closure:**
  - how long an MOA may take to acknowledge a critical-result task before it goes back to him;
  - the after-hours route;
  - OQ-07 (interrupting a call);
  - OQ-11 (who makes first contact);
  - whether sign-off should block or ask when a critical result is open.
- **The scribe's hold list:** which proposals a critical result should hold back (for example,
  starting bisoprolol or chasing the stress test while the troponin is critical).
- **OQ-61 and the renewal-task priority:** whose sign-off an MOA-sent renewal carries, and whether
  it should be "This week".
- **OQ-09 and OQ-60:** quantity rules, strength and units per dose, and favourites. Also whether an
  allergy check belongs at the renewal's check step.
- **OQ-63:** who writes the last-note summary and whether he approves it. **OQ-54:** whether a
  patient upload prompts a review. **OQ-64 and OQ-56:** readings, and whether any level should be
  flagged.

## Needs Ani

- Whether DOB belongs on the chart header for phone identity checks (HZ-06). REQ-ID-02 says it is
  there, and the live chart does not show it.
- OQ-50 (the real fax delivery and failure signal) and OQ-41 (what counts as "picked up").
- Routing the Medium hazards: HZ-03, HZ-04, HZ-14 and HZ-15 go to ux-designer and
  frontend-engineer; HZ-01 and HZ-06 go to tech-lead and integrations-engineer; HZ-04 goes to
  ai-engineer.
- Naming the accountable clinical safety officer who will review and sign this log.
