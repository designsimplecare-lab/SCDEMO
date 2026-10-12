# B-007 — AI Chart Assist: development requirements (Daniel, 11 Oct 2026)

**Date:** 11 Oct 2026 · **From:** Ani (forwarded) · **Read before your next task** (process.md step 2a)

Daniel's requirements for the AI inside the chart, marked "high priority". The full text is in
`private/requirements/Simple_Chart_AI_Chart_Assist_Requirements.txt` (git-ignored; transcribed from a
screenshot because the PDF itself couldn't be opened). Cite it by section number and summarise; don't
paste. In the product, the AI is **Cedar**. Vendor and model names stay out of public files.

**Guiding principle:** one integrated assistant, two flexible modes, and physician authorisation for all
clinical documentation and actions. This fits rule 18 (the doctor always signs).

## The two modes (§2)
- **Full encounter assist:** the call is transcribed with consent. Cedar combines the transcript, the
  full intake and the relevant chart history to draft the SOAP note and the doctor's prescriptions,
  investigations and referrals. Everything needs the doctor's review.
- **Section-specific assist:** the doctor can start the AI on its own in **Review** (clinical summary),
  **Note** (SOAP drafting), **Prescribe**, **Order** or **Refer**. Manual workflows always stay available.

## Interface (§3, §4)
- It lives inside the existing **Review → Note → Action → Sign off** page. Suggestions appear in their
  own section, with **Accept, Reject, Edit and Regenerate**.
- **One consolidated queue** of proposed actions.
- **Physician edits are kept.** Access to the original intake and the transcript is always one step away.
- **Distinguish three kinds of content:** what the patient reported, verified findings, and the doctor's
  decisions. Unsupported findings and unconfirmed plans never reach a signed note.
- **The SOAP Plan and the clinical actions agree,** with no duplicates.
- **Explicit doctor authorisation before signing or sending any clinical action.**

## Transcript, audio and audit (§5)
Audio is deleted right after transcription, and transcripts 30 days after sign-off. The signed note is
the record. The screen must say so clearly:
- **Transcript panel** beside the note, with a status badge: Transcribing, Ready, or "Available until
  [date]". After that: "Transcript expired", with no broken links.
- **Source links:** tapping an AI-drafted sentence highlights its source in the transcript, intake or
  chart. They grey out, with a tooltip, once the transcript has expired.
- **AI-drafted markers** on text until the doctor accepts or edits it. They clear on sign-off, and the
  signed note shows clean text only.
- **Audit view** on signed encounters (read-only): which sections were AI-drafted, the model and
  version, times, and the accept, reject and edit actions. No transcript content.
- **Model improvement flag:** a small indicator on encounters enrolled in the audio improvement
  program, with a one-click **Remove** that deletes the audio. No other audio controls in the clinical
  workflow.
- **Engineering review screen:** a separate internal screen, **not in the clinical app**, where staff
  play enrolled audio, correct transcripts word by word and mark them verified.

## Phases (§6)
1. **Phase 1:** transcription, SOAP drafting, intake and chart context, physician editing, the
   transcript panel with expiry states, and AI-drafted markers.
2. **Phase 2:** AI-assisted prescriptions, investigations and referrals.
3. **Phase 3:** unified encounter orchestration, section controls, the consolidated review queue, the
   audit view, the model improvement flag and the engineering review screen.

## How it fits what's already in the portal
- **Already there (8 Oct):** Cedar listens with the call when consent is on file, scribe suggestions
  appear per section of the note with Accept, Edit and Reject, and the intake suggestion is marked.
  Daniel's 11 Oct feedback adds Cedar's key clinical findings in Review and a Subjective and Objective
  split in the note. All of that is Phase 1 territory.
- **Missing for Phase 1:** the transcript panel and its expiry states, source links that highlight, a
  "Regenerate" action, and markers that clear on sign-off.

## Flags and questions (don't resolve them yourself)
- **Audio for model improvement, and staff listening to patient consultations.** The engineering
  review screen lets staff play patient audio. That needs patient consent that is specific to that use,
  a BC privacy review (PIPA, data residency, who may listen, from where), and `privacy-security`. **Needs
  Daniel, Ani and `privacy-security` before any build of §5's last two bullets.**
- **Which consent covers recording?** The doc says "appropriate consent". The demo currently asks for
  consent or relies on consent on file. What the consent says is **Needs Daniel**.
- **Prescriptions, investigations and referrals drafted by AI:** these touch clinical risk
  (`clinical-safety` gate, rule 20). PharmaNet access is limited to a physician located in BC (Chart
  View v2.5, companion spec not written).
- **The 30-day transcript rule vs record-keeping:** the signed note is the record. Confirm with
  `privacy-security` that this meets the CPSBC record standard.
- **"Regenerate":** does it replace a suggestion the doctor has edited? Proposed default: it never
  overwrites an edit, and it asks first.

## Self-check
1. Does the AI-drafted sentence in a signed note still carry its marker? (No. Markers clear on sign-off
   and the signed note is clean text. The audit view lists what was AI-drafted.)
2. Can the doctor still play the audio from the chart? (No. There are no audio controls in the clinical
   workflow, except removing an encounter from the improvement program.)
3. The transcript is 31 days past sign-off. What does the doctor see? ("Transcript expired", and the source
   links grey out with a tooltip. Nothing is broken.)
4. Can Cedar send a prescription on its own? (No. The doctor authorises every clinical action.)
