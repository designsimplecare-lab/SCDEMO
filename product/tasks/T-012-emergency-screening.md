# T-012 — Emergency screening in the Simplicity chat

| Field | Value |
|---|---|
| Status | Ready (waiting for Ani's go) |
| Type | Design |
| Priority | P1 |
| Size | M |
| Requested by | Ani |
| Date | 2026-09-29 |
| Owner | `ux-designer` (Ani approves) |
| Contributors | `content-designer` (words) |
| Gates | `clinical-safety`, `content-designer`, `accessibility`, `patient-chat-qa` |

## Request
> "write tasks for designer to improve experience" (Ani, 29 Sep 2026)

## Why
A patient who types "chest pain, can't breathe" is offered doctors and call windows. A red flag
mid-chat is missed, and a confirmed emergency goes back to routine questions.
Evidence: QA-001, QA-002, QA-003, QA-004 (PC-21) in `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (summary: `product/reports/patient-chat-qa-2026-09-29-SUMMARY.md`).

## Scope
- **In:** the patient-facing Simplicity chat and booking flow, as designed. The work happens in a
  **new prototype**, `simplecare-patient-chat.html`, shared by T-012 to T-017, plus a short spec for the
  dev team.
- **Out:**
  - changing staging or production code (that's the dev team's);
  - clinical wording or rules (Daniel's).

## Acceptance criteria
- [ ] **The first message is checked before anything else.** Design the moment when the patient's first message looks like an emergency. The patient is sent to 911 or the ER **before** any pathway, doctor or window appears.
- [ ] **The same check mid-chat.** A red flag at any point stops the booking and shows the emergency screen.
- [ ] **One emergency treatment everywhere:** chat, tiles and doctor pages. Today there are three.
- [ ] **After the emergency screen,** the patient either leaves safely, or says "it's not an emergency" and continues. Intake must never quietly resume.
- [ ] **Design all the states:** the detection, the screen, the "I'm not in an emergency" path, and a phone-width version.
- [ ] It follows `product/handbook/01-rules.md`, bulletin B-001, and the SimpleCare Paper design rules.
- [ ] **Evidence:** screenshots at desktop and phone width (in `product/reports/shots/`), plus a dev spec with the states, copy and behaviour: `product/specs/T-012-emergency-screening.md`.
- [ ] **Re-test:** after the gates, `patient-chat-qa` re-runs the scenarios above against the prototype.

## Needs Daniel / Ani
- The emergency wording, the red-flag list and whether the screen uses red are **Needs Daniel (wording) and Ani's approval of the look** (rule 17a). Design with clearly marked placeholders.

## Inputs
- `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (see the issues listed above)
- `product/tests/patient-chat/README.md`
- `research/patient-entry-flows/` (Ani's boards)
- `product/training/bulletins/B-001-booking-pathways.md`
- `product/training/bulletins/B-003-requirements-intake-emergency-documents.md` (full text in `private/requirements/`)
- `product/training/bulletins/B-004-simplicity-intake-v2-3.md` (Intake v2.3; full text in `private/requirements/`)
- Staging, for reference only: https://staging.simplecare.ca

## Output
- A section of `simplecare-patient-chat.html` covering this task
- `product/specs/T-012-emergency-screening.md`

## Review
| Gate | Verdict | Notes |
|---|---|---|
| | | |

## Approval
- Ani: ☐  ·  Daniel (clinical): ☐ required

## Log
- 2026-09-29: owner changed to Manoj, the newly hired designer. The `ux-designer` agent assists.
- 2026-09-29 — created from staging QA run 1
- 2026-10-03: owner changed to `ux-designer`; Ani approves the design.
