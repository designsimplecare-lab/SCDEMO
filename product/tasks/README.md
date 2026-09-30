# Task board

Every piece of work has a task file here: `T-NNN-<slug>.md`, made from [`TEMPLATE.md`](TEMPLATE.md).
The process is in [`../process.md`](../process.md). The lead keeps this board current.

**Who:** Ani manages the team and approves; Manoj owns every design task. **Status:** all 26 agents are certified as of 29 Sep 2026 (see [`../training/`](../training/README.md)). The
tasks below are **Ready**, and waiting for Ani's go.

| ID | Title | Type | Priority | Owner | Gates | Status |
|---|---|---|---|---|---|---|
| T-001 | Analyse recording: "Fixing Annoying Appointment Chat Flow" | Research | P1 | `ux-researcher` | — | Ready |
| T-002 | Analyse recording: "Hair Transplant Follow-Up Prescription Help" | Research | P1 | `ux-researcher` | `clinical-safety` (read-only check) | Ready |
| T-003 | Analyse recording: "Medication Renewal and Safe Titration Discussion" | Research | P1 | `ux-researcher` | `clinical-safety` (read-only check) | Ready |
| T-004 | Fold Daniel's 27 Sep answers (round 2) into the product docs. This includes: OQ-61 answered (renewals are delegated to Japneet, the PA, under the doctor's sign-off), so update REQ-RX-07/10, HZ-09 and the QA harness wording | Spec | P1 | `product-manager` | — | Ready |
| T-005 | Finish the simplecare.ca audit (the partial draft is filed) | Review | P2 | `content-seo` | `marketing-compliance` | Ready |
| T-006 | Finish the QA baseline (the partial harness is filed) | Review | P2 | `qa-engineer` | — | Ready |
| T-007 | Re-align market strategy and marketing to Daniel's direction (the confidential source is in `private/`). Includes re-checking the October calendar's "family doctor" posts P03 and P11 | Research | P1 | `market-strategist` | `marketing-lead` | Ready |
| T-008 | Home per Daniel's 29 Sep markup: time beside the greeting; the attention list trimmed to name, test and value; no task rows (`from-daniel/2026-09-29-home-feedback.md`) | Design | P1 | **Manoj** (+ `ux-designer`) | `qa-engineer`, `clinical-safety` (the attention list) | Ready |
| T-009 | Movable messenger and AI panels (Daniel), weighed against Ani's idea of chat as a primary left-nav item | Design | P1 | **Manoj** (+ `ux-designer`) | `qa-engineer`, `accessibility` | Ready |
| T-010 | Add Daniel's 29 Sep feedback and the call-window limit to the product docs | Spec | P1 | `product-manager` | — | Ready |
| T-011 | Patient chat QA run on **staging** (before sign-in) | Review | P1 | `patient-chat-qa` | lead | In review. Phase 1 done; phase 2 (signed in) waits for Ani |
| T-012 | Emergency screening in the Simplicity chat | Design | P1 | **Manoj** (+ `ux-designer`) | `clinical-safety`, `content-designer`, `accessibility`, `patient-chat-qa` | Ready |
| T-013 | A chat that listens to what the patient says | Design | P1 | **Manoj** (+ `ux-designer`) | `content-designer`, `ai-engineer`, `accessibility`, `patient-chat-qa` | Ready |
| T-014 | Clear booking paths: family doctor, walk-in, named doctor, holding the window | Design | P1 | **Manoj** (+ `ux-designer`) | `content-designer`, `patient`, `patient-chat-qa` | Ready |
| T-015 | Booking without the AI, and useful empty states | Design | P1 | **Manoj** (+ `ux-designer`) | `content-designer`, `patient`, `accessibility` | Ready |
| T-016 | Privacy on shared devices, and a safe "Clear conversation" | Design | P1 | **Manoj** (+ `ux-designer`) | `privacy-security`, `content-designer`, `accessibility` | Ready |
| T-017 | Chat polish: scrolling, time formats, phone sizes, keyboard, cost notice | Design | P2 | **Manoj** (+ `ux-designer`) | `accessibility`, `content-designer` | Ready |

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
