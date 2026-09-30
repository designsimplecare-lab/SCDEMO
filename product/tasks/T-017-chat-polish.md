# T-017 — Chat polish: scrolling, time formats, phone sizes, keyboard, cost notice

| Field | Value |
|---|---|
| Status | Ready (waiting for Ani's go) |
| Type | Design |
| Priority | P2 |
| Size | S |
| Requested by | Ani |
| Date | 2026-09-29 |
| Owner | **Manoj** (product designer) |
| Contributors | `ux-designer` (prototype and spec drafts, for Manoj), `content-designer` (words) |
| Gates | `accessibility`, `content-designer` |

## Request
> "write tasks for designer to improve experience" (Ani, 29 Sep 2026)

## Why
Smaller issues that add friction.
Evidence: QA-019, QA-021, QA-022, QA-023, QA-024 in `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (summary: `product/reports/patient-chat-qa-2026-09-29-SUMMARY.md`).

## Scope
- **In:** the patient-facing Simplicity chat and booking flow, as designed. The work happens in a
  **new prototype**, `simplecare-patient-chat.html`, shared by T-012 to T-017, plus a short spec for the
  dev team.
- **Out:**
  - changing staging or production code (that's the dev team's);
  - clinical wording or rules (Daniel's).

## Acceptance criteria
- [ ] **New messages and cards scroll into view.**
- [ ] **One time format everywhere,** and show the time zone on windows (BC time, with the patient's local time where it differs).
- [ ] **Phone sizes:** text at least 16px (the proposed default, rule 22) and 44px targets.
- [ ] **Keyboard:** concern tiles can be reached with the keyboard, and the mic button has a proper label.
- [ ] **Cost notice.** When a concern isn't MSP-covered (e.g. a sick note), say so before the account step. The wording is **Needs Ani**.
- [ ] It follows `product/handbook/01-rules.md`, bulletin B-001, and the SimpleCare Paper design rules.
- [ ] **Evidence:** screenshots at desktop and phone width (in `product/reports/shots/`), plus a dev spec with the states, copy and behaviour: `product/specs/T-017-chat-polish.md`.
- [ ] **Re-test:** after the gates, `patient-chat-qa` re-runs the scenarios above against the prototype.

## Inputs
- `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (see the issues listed above)
- `product/tests/patient-chat/README.md`
- `research/patient-entry-flows/` (Ani's boards)
- `product/training/bulletins/B-001-booking-pathways.md`
- Staging, for reference only: https://staging.simplecare.ca

## Output
- A section of `simplecare-patient-chat.html` covering this task
- `product/specs/T-017-chat-polish.md`

## Review
| Gate | Verdict | Notes |
|---|---|---|
| | | |

## Approval
- Ani: ☐  ·  Daniel (clinical): ☐ n/a

## Log
- 2026-09-29: owner changed to Manoj, the newly hired designer. The `ux-designer` agent assists.
- 2026-09-29 — created from staging QA run 1
