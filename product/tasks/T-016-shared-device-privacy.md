# T-016 — Privacy on shared devices, and a safe "Clear conversation"

| Field | Value |
|---|---|
| Status | Ready (waiting for Ani's go) |
| Type | Design |
| Priority | P1 |
| Size | S |
| Requested by | Ani |
| Date | 2026-09-29 |
| Owner | `ux-designer` |
| Contributors | `content-designer` (words) |
| Gates | `privacy-security`, `content-designer`, `accessibility` |

## Request
> "write tasks for designer to improve experience" (Ani, 29 Sep 2026)

## Why
Health conversations reappear for the next person on the same device. "Clear conversation" is red and
wipes the chat with no confirmation. A restored chat is reordered, with every timestamp showing "Just now".
Evidence: QA-005, QA-020, QA-025 (PC-15, PC-24) in `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (summary: `product/reports/patient-chat-qa-2026-09-29-SUMMARY.md`).

## Scope
- **In:** the patient-facing Simplicity chat and booking flow, as designed. The work happens in a
  **new prototype**, `simplecare-patient-chat.html`, shared by T-012 to T-017, plus a short spec for the
  dev team.
- **Out:**
  - changing staging or production code (that's the dev team's);
  - clinical wording or rules (Daniel's).

## Acceptance criteria
- [ ] **Decide what is kept on the device, for how long, and when it's cleared.** For example: cleared when the tab closes, or "Resume your chat?" with a clear "Not me" option. Choose with `privacy-security`.
- [ ] **"Clear conversation"** becomes a neutral secondary action, and asks for confirmation.
- [ ] **A restored chat keeps its order and its real timestamps.**
- [ ] It follows `product/handbook/01-rules.md`, bulletin B-001, and the SimpleCare Paper design rules.
- [ ] **Evidence:** screenshots at desktop and phone width (in `product/reports/shots/`), plus a dev spec with the states, copy and behaviour: `product/specs/T-016-shared-device-privacy.md`.
- [ ] **Re-test:** after the gates, `patient-chat-qa` re-runs the scenarios above against the prototype.

## Needs Daniel / Ani
- Retention and storage rules are **`privacy-security` and Ani's** decision.

## Inputs
- `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (see the issues listed above)
- `product/tests/patient-chat/README.md`
- `research/patient-entry-flows/` (Ani's boards)
- `product/training/bulletins/B-001-booking-pathways.md`
- Staging, for reference only: https://staging.simplecare.ca

## Output
- A section of `simplecare-patient-chat.html` covering this task
- `product/specs/T-016-shared-device-privacy.md`

## Review
| Gate | Verdict | Notes |
|---|---|---|
| | | |

## Approval
- Ani: ☐  ·  Daniel (clinical): ☐ n/a

## Log
- 2026-09-29 — created from staging QA run 1
