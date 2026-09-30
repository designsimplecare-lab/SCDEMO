# T-013 — A chat that listens to what the patient says

| Field | Value |
|---|---|
| Status | Ready (waiting for Ani's go) |
| Type | Design |
| Priority | P1 |
| Size | L |
| Requested by | Ani |
| Date | 2026-09-29 |
| Owner | `ux-designer` |
| Contributors | `content-designer` (words) |
| Gates | `content-designer`, `ai-engineer`, `accessibility`, `patient-chat-qa` |

## Request
> "write tasks for designer to improve experience" (Ani, 29 Sep 2026)

## Why
The chat gives everyone the same greeting, and ignores times, "today" and changes of mind. It
leaves unrelated questions unanswered, accepts nonsense as medical answers, and sometimes silently
won't send a message.
Evidence: QA-006, QA-008, QA-009, QA-010, QA-013, QA-014, QA-015 (PC-07, 09, 11, 13, 17, 18, 20) in `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (summary: `product/reports/patient-chat-qa-2026-09-29-SUMMARY.md`).

## Scope
- **In:** the patient-facing Simplicity chat and booking flow, as designed. The work happens in a
  **new prototype**, `simplecare-patient-chat.html`, shared by T-012 to T-017, plus a short spec for the
  dev team.
- **Out:**
  - changing staging or production code (that's the dev team's);
  - clinical wording or rules (Daniel's).

## Acceptance criteria
- [ ] **The first reply reflects the patient's message,** e.g. "Sounds like a sore throat. Here's how to see a doctor", not a canned greeting.
- [ ] **Time and date requests** ("today", "after 3", "tomorrow") filter the call windows shown. Say plainly when none match.
- [ ] **Changing your mind** ("actually, show me my family doctor") switches path. The old doctor and window are visibly cleared, not stored as a symptom answer.
- [ ] **An unrelated question** ("what are your hours?") gets an answer, then "Shall we continue booking?", and the booking is kept.
- [ ] **Unclear answers** ("idk", nonsense) get a gentle clarifying question, and aren't passed to the doctor as clinical answers.
- [ ] **The message box always shows whether you can type.** If a step needs a button, say so; no silent disabled Send.
- [ ] **A message typed on the homepage never overwrites** an existing chat.
- [ ] It follows `product/handbook/01-rules.md`, bulletin B-001, and the SimpleCare Paper design rules.
- [ ] **Evidence:** screenshots at desktop and phone width (in `product/reports/shots/`), plus a dev spec with the states, copy and behaviour: `product/specs/T-013-chat-that-listens.md`.
- [ ] **Re-test:** after the gates, `patient-chat-qa` re-runs the scenarios above against the prototype.

## Needs Daniel / Ani
- What the AI can actually understand is for `ai-engineer` to judge. The design shows the target behaviour, with a fallback when the AI isn't sure.

## Inputs
- `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (see the issues listed above)
- `product/tests/patient-chat/README.md`
- `research/patient-entry-flows/` (Ani's boards)
- `product/training/bulletins/B-001-booking-pathways.md`
- Staging, for reference only: https://staging.simplecare.ca

## Output
- A section of `simplecare-patient-chat.html` covering this task
- `product/specs/T-013-chat-that-listens.md`

## Review
| Gate | Verdict | Notes |
|---|---|---|
| | | |

## Approval
- Ani: ☐  ·  Daniel (clinical): ☐ n/a

## Log
- 2026-09-29 — created from staging QA run 1
