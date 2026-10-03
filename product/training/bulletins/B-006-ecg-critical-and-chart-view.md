# B-006 — ECG Critical Result Requirements v2.0 and Physician Chart View Requirements v2.5

**Date:** 3 Oct 2026 · **From:** Ani (forwarded) · **Read before your next task** (process.md step 2a)

The full texts are in `private/requirements/` (git-ignored). Cite them by title, version and section,
and summarise; don't paste. The chart document is the "requirements document on the chart" that Daniel
promised in his 30 Sep recording. **T-021 is unblocked.**

## 1. ECG Critical Result Requirements v2.0, single-priority model
- **One priority only: CRITICAL ECG.** An ECG becomes CRITICAL ECG when its *printed* interpretation
  contains a phrase from the trigger dictionary, or an explicit high-priority designation (critical,
  urgent, serious, acute, emergent, STAT…).
  - Dictionary examples: acute MI or STEMI, acute ischemia or injury, complete or high-grade AV
    block, VT or VF, wide-complex tachycardia, extreme rate.
  - Conditional entries count only when the source marks them critical: AF or flutter with RVR,
    prolonged QT, WPW, SVT, pauses, pacemaker failure.
- **Simple never interprets the waveform.** It extracts what the report already says.
- **"ABNORMAL ECG" alone is not a trigger.** Plain atrial fibrillation without a source critical
  flag is not a trigger either.
- **Every ECG still needs physician review.**
- **A CRITICAL ECG shows, in Needs Attention:**
  - the matched source phrases **verbatim**;
  - the source of the interpretation (machine, preliminary, cardiologist-confirmed or clinician);
  - the ECG and report times and the printed measurements;
  - the original, one click away;
  - the acknowledgement status and reviewer.

  It stays there until a physician documents the review.
- **Fail-safe rules:**
  - an unknown phrase the source labels critical still routes to CRITICAL ECG, and the phrase is
    logged;
  - several triggers still make one priority and one alert;
  - nothing is downgraded because another part of the report looks reassuring.

**How this fits Daniel's 30 Sep recording:** a non-critical abnormal ECG says only "Abnormal ECG", and
the machine reading stays on the tracing. A critical ECG names its printed finding ("if the ECG is
saying, you know, STEMI or AFib, then we'll note that"). The written spec is newer, and it puts
plain AF **outside** the critical list unless the source flags it. So the demo patient's AF ECG
correctly stays a yellow "Abnormal ECG" in v2. This answers OQ-74.

## 2. Physician Chart View Requirements v2.5
**The product principle:** reduce the work of finding, assembling and interpreting the record. Show
what matters now, what changed and what needs action, and keep the full chart one step away. "If the
screen looks busy when nothing is wrong, the design has failed."

**Scan order:** Patient snapshot → Needs Attention → Today → Relevant to [concern] → Since you last
saw → Clinical threads → Full chart. The **note and its actions** sit beside the context at ≥1440 px,
or one tab away. (This answers Daniel's "where am I charting?")

- **Patient snapshot (persistent):**
  - name, DOB or age, gender as recorded;
  - a **masked PHN**;
  - the dated photo the patient supplied;
  - allergies in three states: named, "No known drug allergies", or "Not recorded" in amber;
  - the family doctor.

  No clinical counts or diagnosis badges.
- **This-visit strip:**
  - the patient's current location, identity verified (method and date), consent, others present,
    video or phone, and the callback number;
  - **Finalize is blocked until the strip is complete**;
  - a patient outside BC gets a notice they can't dismiss;
  - it re-expands on a dropped call.
- **Needs Attention:** one place, directly under the banner.
  - Each item shows the value, units and range, the source, the time, the responsible doctor and its
    stage (reviewed, patient told, follow-up due, closed).
  - **Related items are grouped**, for example the ECG and CK under the troponin.
  - The tiers are **Critical, To do and Info**.
  - **Abnormal ≠ actionable.**
  - When there's nothing, it shows one quiet line ("Nothing requiring attention").
  - The classification comes from the Critical Results & Escalation companion spec, which is not
    written yet.
- **Today:** the reason for the visit in the patient's words, a concise intake summary, and intake
  red flags in the patient's exact words.
- **Relevant to [concern]:** always the same five categories: history, medications (with source and
  date), investigations, prior related care, pending.
- **Since you last saw:** NEW, CHANGED, PENDING and RESOLVED; 3–6 items, critical always shown, then
  "+N more".
- **Clinical threads:** curated active problems with status, treatment, monitoring, last decision
  and next step. Stale ones are shown as stale.
- **Rules for everything:**
  - no duplicate primary display;
  - typography before containers (no wall of cards);
  - red only for critical; amber for to do, overdue, stale or conflict;
  - every colour also has a word or symbol;
  - AI text stays visually distinct until accepted;
  - opening the full chart never loses the note;
  - WCAG 2.2 AA;
  - the chart works without AI;
  - no new alert taxonomy or extra chrome.
- **Acceptance is by task performance with at least 15 physicians.** For example: find the
  highest-priority action in 10 seconds or less, state what changed with at least 90% right, find
  the location and callback after a dropped call 100% of the time, and catch an AI negation error
  before signing.
- **Delivery order:** core encounter shell → structured context → longitudinal threads →
  context-aware AI (only after the AI Governance companion) → physician testing.
- **Four companion specs are still "TBD"** (Critical Results & Escalation; Prescribing & PharmaNet;
  AI Governance & Scribe; Virtual Care Compliance). Until they're published, Chart View v2.1 applies
  to those areas, and **we don't have v2.1**.

## Where v2 differs today (input to T-021)
- **The note is low on the page.** v2.5 puts it beside the context.
- **v2 shows the full PHN** in the chart header; v2.5 asks for a masked PHN.
- **There's no this-visit strip** (location, identity verified, consent, callback), and Finalize
  doesn't depend on it.
- **The abnormal ECG is its own yellow card** (30 Sep). v2.5 groups related items under the
  critical one with Critical, To do and Info tiers.
- **"Also in today for …" and "Since last visit"** need reshaping into Needs Attention, Today and
  Since you last saw.
- **v2's chart has many cards.** v2.5 says typography before containers.

## Conflicts to raise (don't resolve them yourself)
- **Priority names now come in four versions:**
  - Daniel 27 and 30 Sep: Critical, High, then yellow;
  - Routing v2.1: HIGH / URGENT;
  - ECG v2.0: CRITICAL ECG;
  - Chart View v2.5: Critical, To do, Info.

  OQ-76 needs one answer. v2.5 defers to the unwritten Critical Results & Escalation spec.
- **Home vs chart:** Daniel's Home rule is Critical and High (rule 16b). v2.5 defines Needs Attention
  for the chart. Does Home follow the same tiers?
- **The missing documents:** Chart View v2.1 and the four companion specs.

## Self-check
1. An ECG printout reads "Atrial fibrillation · Abnormal ECG", with no critical banner. Is it
   CRITICAL ECG? (No. It needs review, and shows as "Abnormal ECG".)
2. A printout reads "*** ACUTE MI *** ST elevation, consider anterior injury". What does the doctor
   see? (CRITICAL ECG in Needs Attention, with those phrases verbatim, and the original one click
   away.)
3. Where does the note sit at 1440 px? (Beside the context, not below it.)
4. Can the doctor finalize without the patient's location and callback number? (No. The this-visit
   strip must be complete.)
