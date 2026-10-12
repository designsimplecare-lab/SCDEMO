# Daniel's feedback on the new chart: this-visit, allergies, Review and Note — 11 Oct 2026

Source: WhatsApp from Dr. Daniel Pannozzo to Ani (messages 6:25–6:51 PM), with screenshots of the
chart and a PDF, "Simple Chart | AI Chart Assist Requirements". Quotes are verbatim. Two of his
messages end in "Read more", so the **Review and Note texts are cut off**; the rest is in the PDF.

## What he said
> "Significant improvement with the portal."

**This visit**
> "Location is not relevant to us - can be removed. If someone else is present it is documented by the
> doctor - not something we would need in the doctor chart. ID Verified, already presumed verified.
> The chart is primarily clinical."

→ Remove **Location**, **Others present** and **ID verified** from the chart. This overrides Chart View
v2.5 on those three (its this-visit strip had them, and Finalize waited for them). His screenshot
still shows consent ("On file") and the phone line with the callback number; he didn't mention them.

**Allergies**
> "Alleriges are especially important - make it more prominent"

**Review area** (screenshot of the empty space beside "Today")
> "This area represents good real estate to present the patient the Doctor - the key findings. And the
> AI can also help by tailoring the information towards the clinical concern."

**Review: AI-assisted clinical overview** (his text, cut off at "Read more")
- Use the space in Review for a concise, clinically relevant overview tailored to today's complaint.
- **Keep the existing Needs Attention and Today sections.**
- Add **"Cedar — Key Clinical Findings"**. Cedar analyses the raw intake and the longitudinal chart to
  identify **relevant medical history** (existing diagnoses, previous episodes, related conditions) and
  **medications** (current, previous treatments, relevant PharmaNet dispensing records). The rest is cut off.

**Note: family medicine SOAP** (cut off at "Assessment")
- Standard SOAP documentation with Cedar-assisted note generation.
- **Replace Findings with separate Subjective and Objective sections.**
- Reason: chief complaint. Subjective: HPI, symptoms, relevant history. Objective: examination
  findings, vitals, investigations. Assessment: clinical impressions and ICD-9 diagnoses.
  (Plan and the rest are cut off.)

**PDF: Simple Chart | AI Chart Assist, development requirements.** Only its first lines are visible in
the screenshot: a full-encounter mode (transcribe the call with consent, then draft the SOAP note and
the doctor's prescriptions, investigations and referrals) and a section-specific mode (AI on its own
in Review, Note, Prescribe, Order or Refer), inside the Review → Note → Action → Sign off page, with
Accept, Reject, Edit and Regenerate. All output needs the physician's review. **The file itself
couldn't be opened; it needs to be copied somewhere readable.**

## What changed in v2 (built 11 Oct 2026)
See the commit that follows this file. In short: the chart's this-visit line loses Location, Others
present and ID verified; allergies become the most prominent item in the patient banner; Review gets
"Cedar · Key clinical findings" (history and medications first, then Chart View v2.5's other three
categories as a default) beside Today; the note becomes Reason, Subjective, Objective, Assessment, Plan.

## Flags
- **Location and the BC standard:** the CPSBC virtual-care standard has the doctor confirm where the
  patient is. Daniel says that isn't needed in the chart; the Emergency Safeguards v3 document has the
  Simplicity chat confirm location at intake ("Are you in BC right now?", §8). So removing it from the
  chart is consistent only if intake captures it. **Ask Daniel and `clinical-safety`.**
- **Cedar and PharmaNet:** "relevant PharmaNet dispensing records" depends on PharmaNet access, which
  Chart View v2.5 limits to a physician located in BC (companion spec not yet written).
- **Cut-off texts and the PDF:** the Review categories beyond history and medications, the Plan
  section and the AI Chart Assist modes are not built until the full text is available.

## Follow-up, 11 Oct 2026
The PDF text arrived as a screenshot and is now filed: bulletin B-007, task T-024. The "couldn't be opened" note above no longer applies; the Review and Note messages that were cut off are partly covered by it (SOAP drafting, section-specific assist), and the rest stays as stated.
