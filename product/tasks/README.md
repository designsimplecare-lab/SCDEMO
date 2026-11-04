# Task board

Every piece of work has a task file here: `T-NNN-<slug>.md`, made from [`TEMPLATE.md`](TEMPLATE.md).
The process is in [`../process.md`](../process.md). The lead keeps this board current.

**Who:** Ani manages the team and approves every design; the `ux-designer` agent owns design tasks (since 3 Oct). **Status:** all 26 agents are certified as of 29 Sep 2026 (see [`../training/`](../training/README.md)). The
tasks below are **Ready**, and waiting for Ani's go.

| ID | Title | Type | Priority | Owner | Gates | Status |
|---|---|---|---|---|---|---|
| T-001 | Analyse recording: "Fixing Annoying Appointment Chat Flow" | Research | P1 | `ux-researcher` | — | Ready |
| T-002 | Analyse recording: "Hair Transplant Follow-Up Prescription Help" | Research | P1 | `ux-researcher` | `clinical-safety` (read-only check) | Ready |
| T-003 | Analyse recording: "Medication Renewal and Safe Titration Discussion" | Research | P1 | `ux-researcher` | `clinical-safety` (read-only check) | Ready |
| T-004 | Fold Daniel's 27 Sep answers (round 2) into the product docs. This includes: OQ-61 answered (renewals are delegated to Japneet, the PA, under the doctor's sign-off), so update REQ-RX-07/10, HZ-09 and the QA harness wording | Spec | P1 | `product-manager` | — | Done 30 Sep |
| T-005 | Finish the simplecare.ca audit (the partial draft is filed) | Review | P2 | `content-seo` | `marketing-compliance` | Ready |
| T-006 | Finish the QA baseline (the partial harness is filed) | Review | P2 | `qa-engineer` | — | Ready |
| T-007 | Re-align market strategy and marketing to Daniel's direction (the confidential source is in `private/`). Includes re-checking the October calendar's "family doctor" posts P03 and P11 | Research | P1 | `market-strategist` | `marketing-lead` | Ready |
| T-008 | Home per Daniel's 29 Sep markup: time beside the greeting; the attention list trimmed to name, test and value; no task rows (`from-daniel/2026-09-29-home-feedback.md`) | Design | P1 | `ux-designer` | `qa-engineer`, `clinical-safety` (the attention list) | Done 30 Sep, built by the ux-designer agent at Ani\'s request |
| T-009 | Movable messenger and AI panels (Daniel), weighed against Ani's idea of chat as a primary left-nav item | Design | P1 | `ux-designer` | `qa-engineer`, `accessibility` | Done 30 Sep, built by the ux-designer agent at Ani\'s request |
| T-010 | Add Daniel's 29 Sep feedback and the call-window limit to the product docs | Spec | P1 | `product-manager` | — | Done 30 Sep |
| T-011 | Patient chat QA run on **staging** (before sign-in) | Review | P1 | `patient-chat-qa` | lead | In review. Phase 1 done; phase 2 (signed in) waits for Ani |
| T-012 | Emergency screening in the Simplicity chat | Design | P1 | `ux-designer` | `clinical-safety`, `content-designer`, `accessibility`, `patient-chat-qa` | Ready |
| T-013 | A chat that listens to what the patient says | Design | P1 | `ux-designer` | `content-designer`, `ai-engineer`, `accessibility`, `patient-chat-qa` | Ready |
| T-014 | Clear booking paths: family doctor, walk-in, named doctor, holding the window | Design | P1 | `ux-designer` | `content-designer`, `patient`, `patient-chat-qa` | Ready |
| T-015 | Routing people who refuse the AI, and useful empty states (the tile path exists in production) | Design | P1 | `ux-designer` | `content-designer`, `patient`, `accessibility` | Ready |
| T-016 | Privacy on shared devices | Design | P1 | `ux-designer` | `privacy-security`, `content-designer`, `accessibility` | Ready |
| T-017 | Chat polish: scrolling, time formats, phone sizes, keyboard, cost notice | Design | P2 | `ux-designer` | `accessibility`, `content-designer` | Ready |
| T-018 | Whistler bus ad, 11×20 interior card, with a QR to booking | Marketing / design | P1 | `brand-designer` (+ `marketing-lead`) | `marketing-compliance`, `accessibility` | Ready |
| T-019 | Chat as 1:1 with the paired MOA (B-002): the floating chat, one conversation, smart quick-question suggestions | Design | P1 | **Ani** (direction), built by the lead | `qa-engineer`, `moa` walkthrough | Built 30 Sep; the MOA-portal side (up to 5 doctors) is still to do |
| T-020 | Redesign Home with the design system ([Figma brief](https://www.figma.com/design/CvL4YxfOIyIrh51dobPWxf)) | Design | P1 | `ux-designer` | `qa-engineer`, `accessibility`, `clinical-safety` | Ready |
| T-021 | The chart: an AI workflow that gets the note done (Daniel, 30 Sep) | Design | P1 | `ux-designer` | `clinical-safety`, `qa-engineer`, `accessibility` | Deployed 4 Oct (build 11:22); doctor-agent and accessibility checks still to run |
| T-022 | Align v2 billing with the Simple Billing PRD v1.5 (gap report) | Review | P2 | `billing-msp` | `clinical-safety`, `qa-engineer` | In review: report delivered; waiting on Daniel (OQ-87) |
| T-023 | Rebuild billing the PRD way (batch attestation, claim detail, refusals, health card, MOA billing queue) | Design + build | P1 | `ux-designer` (+ `billing-msp` spec) | `clinical-safety`, `qa-engineer`, `accessibility` | In progress: spec approved 4 Oct; being built |
| T-024 | AI Chart Assist in the chart, Phase 1 first (Daniel's requirements, 11 Oct) | Design + build | P1 | `ux-designer` | `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility` | Ready; queued behind the 11 Oct chart changes |
| T-025 | Specialist report → reminders, patient reply and drafted orders (Daniel, 15 Oct) | Design + build | P1 | `ux-designer` | `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility` | In progress: Ani approved 15 Oct |
| T-026 | Prescribing redesign: Medications and prescribing, three steps (Daniel's Prescription Modal v2, 21 Oct) | Design + build | P1 | `ux-designer` | `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility` | Built in the demo (Ani, "do all", 21 Oct; build 22 Oct, stamp in the portal): panel, three steps, safety check, both send routes, Schedule 1A block, override. In review: `clinical-safety`, `privacy-security`, `qa-engineer` and `accessibility` have not run yet; safety data is demo data; waiting on Daniel (see the spec) |
| T-027 | Prescribing v2: prescription pad first, reconciliation as a mode, med list as the result (Daniel, 25 Oct) | Design + build | P0 | `ux-designer` | `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility` | Ready: waiting for Ani's go |
| T-028 | Lab and imaging requisitions with order panels and AI-suggested tests | Design + build | P1 | `ux-designer` | `clinical-safety`, `qa-engineer`, `accessibility` | Ready: needs requisition field data |
| T-029 | Referral built from Daniel's referral forms | Design + build | P1 | `ux-designer` | `qa-engineer`, `accessibility` | Ready: needs his referral HTML |
| T-030 | Create a medical note or document from the chart | Design + build | P1 | `ux-designer` | `qa-engineer`, `accessibility` | Built (demo types; Daniel to confirm types): Order → Document and Chart > Documents (`DC_TYPES`) |
| T-031 | Clinical flowsheets per condition | Design + build | P2 | `ux-designer` | `clinical-safety`, `qa-engineer` | Ready: needs the reference pack |
| T-032 | Prescribing: list ordered by Due for renewal (days overdue), differences, Simple then PharmaNet; Continue keeps the row and adds to the pad; no MOA route; drug search with DIN; paste screenshot (Daniel, 31 Oct) | Design + build | P0 | `ux-designer` | `clinical-safety`, `qa-engineer` | Built 2 Nov (see the spec, "31 Oct changes"); in review: `clinical-safety`, `qa-engineer` |
| T-033 | Lab requisition: horizontal suggestions, Cedar panel, anticipated sections open, compact overview on top (31 Oct) | Design + build | P1 | `ux-designer` | `qa-engineer` | Built 2 Nov (spec: orders-referrals-documents, "31 Oct changes"); in review: `qa-engineer` |
| T-034 | Imaging: one synthesized clinical-question field under 20 words (31 Oct); the standard form's CT and procedure sections, consent, previous images, hospital transport (addendum, 2 Nov) | Design + build | P1 | `ux-designer` | `qa-engineer` | Built 2 Nov (spec: orders-referrals-documents, "31 Oct changes"); in review: `qa-engineer` |
| T-035 | Referral: more space, better letter, suggested specialist, synthesized reason and summary, source documents (31 Oct) | Design + build | P1 | `ux-designer` | `qa-engineer` | Built 2 Nov (spec: orders-referrals-documents, "31 Oct changes"); in review: `qa-engineer` |
| T-036 | Note to patient (renamed) and visit summary to the patient, doctor signs, on/off per doctor (31 Oct) | Design + build | P1 | `ux-designer` | `clinical-safety`, `privacy-security` | Built 2 Nov: rename, and the visit summary (Cedar draft, gaps flagged, phone preview with the fixed subject, doctor signs, per-doctor on/off); spec: orders-referrals-documents, "Visit summary"; in review: `clinical-safety`, `privacy-security` |
| T-037 | Chart review under intake summary, no repetition; results shown the LifeLabs way with reference range and two priors (31 Oct) | Design + build | P1 | `ux-designer` | `clinical-safety`, `qa-engineer` | Built 2 Nov: Chart review is Ordered and pending, Who this patient is (Cedar sentences with sources, PharmaNet medicines not on the list) and Medications and what they treat (grouped by concern); history, past visits, investigations and prior care moved to the left summary (PMHx with Surgical history and Consult reports; new Investigations row; Pending kept); results LifeLabs-style (Out of range / Within range, the word for the arrow, reference interval, two earlier values with dates) in the review, Chart > Results, Inbox rows, Home and Needs attention; spec: chart-shell, "2 Nov: chart review and results (T-037)"; in review: `clinical-safety`, `qa-engineer` |
| T-038 | Cedar on/off per area, per doctor, in the profile menu (Daniel, 18 Oct Loom item 2; 31 Oct call) | Design + build | P1 | `ux-designer` | `clinical-safety`, `qa-engineer` | Built 3 Nov: "Cedar helps with" group of seven switches (listening and the note, chart review, prescribing, lab and imaging orders, referrals, documents and letters, visit summaries), all On by default; off = no Cedar draft or suggestion there and one quiet line; safety checks and chart data always show; spec: chart-shell, "3 Nov: Cedar switches (T-038)"; open: the "AI view", per visit as well as per doctor; in review: `clinical-safety`, `qa-engineer` |
| T-039 | The note up front on every chart (Daniel, 31 Oct 01:53:50 "the first place that I start is the note"; 02:56:42 "There's my note. Boom.") | Design + build | P1 | `ux-designer` | `qa-engineer` | Built 4 Nov: Needs attention one line per item (value, word, reference) with the rest behind Show all; Chart review two sentences with the rest behind Show all; with chart layout 2 (4 Nov: patient and Patient summary in one left card, steps as tabs above the work) the Note heading is visible without scrolling on all 8 demo charts at 1280 x 800 and 1440 x 900 (Gloria 1703 -> 734 px at 1440). Spec: chart-shell, "3 Nov: 31 Oct re-read gaps" and "4 Nov: chart layout 2"; in review: `qa-engineer` |
| T-040 | Prescribing gaps from the 31 Oct re-read (coverage check items 2, 28, 30, 31, 35, 36, 62, 94) | Design + build | P1 | `ux-designer` | `clinical-safety`, `qa-engineer` | Built 4 Nov: another prescriber of a Simple Care drug flagged with the differences; the next form opens after Sign and fax when the note says so; Confirm and continue in one press on a due difference; the pad's PharmaNet check over 18 months (finished and PRN too), naming PharmaNet; the reason on the name line; fly-to-pad; a Cedar line citing the consult on a dose difference. Dropped by Ani: no group headings (item 20, kept) and the "process each drug" hint (item 72). Spec: prescribing-redesign, "3 Nov: 31 Oct re-read gaps"; in review: `clinical-safety` (18-month window and the other-prescriber rule need Daniel) |

**Recording files (local, never committed):**
- `~/Downloads/Fixing Annoying Appointment Chat Flow.mp4`
- `~/Downloads/Hair Transplant Follow-Up Prescription Help.mp4`
- `~/Downloads/Medication Renewal and Safe Titration Discussion.mp4`

## Filed as input (first-round reports, not yet acted on)
- `product/reports/`:
  - `moa-2026-09-26-baseline.md`
  - `patient-2026-09-26-baseline.md`
  - `clinical-safety-hazard-log.md`
  - `market-strategist-2026-09-26-number-one.md`
  - `integrations-engineer-2026-09-26-roadmap.md`
- `marketing/`:
  - `reports/social-media-manager-2026-09-26-channel-audit.md`
  - `social/calendar-2026-10.md`
  - `reports/content-seo-2026-09-26-website-audit.md` (partial)
  - `content/concern-page-template.md`

**Findings from training, for future tasks:**
- `billing-msp`:
  - v2 tells the doctor a rejected claim must be resubmitted "within the window", and nothing sources
    that.
  - v2's fee codes and amounts are unsourced (OQ-24, REQ-BIL-07).
  - Finalize also submits the claim, and the button doesn't say so (OQ-51).
- `content-designer`: "Approve" on suggested conditions, and a bare "Sign off" on results, don't say
  what they do.

**Superseded by Daniel's 27 Sep direction; re-check before using:**
- The clinical-safety hazard log still says Home shows critical results only. Daniel changed that to
  Critical and High on 27 Sep. Update it when `clinical-safety` next gets a task.
- The market strategist's bet "sell family doctor, not walk-in".
- The partnerships agent's pharmacy channel.
