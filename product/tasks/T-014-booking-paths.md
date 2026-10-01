# T-014 — Clear booking paths: family doctor, walk-in, named doctor, holding the window

| Field | Value |
|---|---|
| Status | Ready (waiting for Ani's go) |
| Type | Design |
| Priority | P1 |
| Size | M |
| Requested by | Ani |
| Date | 2026-09-29 |
| Owner | **Manoj** (product designer) |
| Contributors | `ux-designer` (prototype and spec drafts, for Manoj), `content-designer` (words) |
| Gates | `content-designer`, `patient`, `patient-chat-qa` |

## Request
> "write tasks for designer to improve experience" (Ani, 29 Sep 2026)

## Why
Patients get trapped or confused on the way to booking. Examples: "See my family doctor" when they
have none; a window that isn't held before sign-up; a doctor asked for by name who can't be booked;
a lifelong "Become a regular patient" choice made from a list with no information.
Evidence: QA-011, QA-012, QA-016, QA-017, QA-018, QA-027 (PC-03, 04, 05, 06, 22) in `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (summary: `product/reports/patient-chat-qa-2026-09-29-SUMMARY.md`).

## Scope
- **In:** the patient-facing Simplicity chat and booking flow, as designed. The work happens in a
  **new prototype**, `simplecare-patient-chat.html`, shared by T-012 to T-017, plus a short spec for the
  dev team.
- **Out:**
  - changing staging or production code (that's the dev team's);
  - clinical wording or rules (Daniel's).

## Acceptance criteria
- [ ] **"See my family doctor" without one** leads to a clear next step: "You don't have a family doctor with us yet. Book a walk-in, or become a regular patient."
- [ ] **The chosen window is visibly held** ("Holding 6–8 PM with Dr. X for 10 min") **before** any account step. The account prompt says why it's needed.
- [ ] **Asking for a doctor by name,** or pressing a doctor's own "Book" button, preselects that doctor.
- [ ] **"Become a regular patient"** shows who each doctor is (their bio card), and what choosing them means.
- [ ] **Quick-book vs triage-first** (bulletin B-001) is visible: triage-first concerns go through their questions **before** a window is chosen.
- [ ] **"Get started" in the header** leads into care, not straight to account creation.
- [ ] **Time is always a call window** with a place in the queue. No exact times, and no wait estimates (rule 11).
- [ ] It follows `product/handbook/01-rules.md`, bulletin B-001, and the SimpleCare Paper design rules.
- [ ] **Evidence:** screenshots at desktop and phone width (in `product/reports/shots/`), plus a dev spec with the states, copy and behaviour: `product/specs/T-014-booking-paths.md`.
- [ ] **Re-test:** after the gates, `patient-chat-qa` re-runs the scenarios above against the prototype.

## Needs Daniel / Ani
- The list of which concerns are triage-first is **Needs Daniel**; use placeholders.
- "Hold" duration: **Needs Daniel** (Ani relays).

## Inputs
- `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (see the issues listed above)
- `product/tests/patient-chat/README.md`
- `research/patient-entry-flows/` (Ani's boards)
- `product/training/bulletins/B-001-booking-pathways.md`
- `product/training/bulletins/B-003-requirements-intake-emergency-documents.md` (full text in `private/requirements/`)
- Staging, for reference only: https://staging.simplecare.ca

## Output
- A section of `simplecare-patient-chat.html` covering this task
- `product/specs/T-014-booking-paths.md`

## Review
| Gate | Verdict | Notes |
|---|---|---|
| | | |

## Approval
- Ani: ☐  ·  Daniel (clinical): ☐ required

## Log
- 2026-09-29: owner changed to Manoj, the newly hired designer. The `ux-designer` agent assists.
- 2026-09-29 — created from staging QA run 1
