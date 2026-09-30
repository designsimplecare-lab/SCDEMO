# T-015 — Booking without the AI, and useful empty states

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
| Gates | `content-designer`, `patient`, `accessibility` |

## Request
> "write tasks for designer to improve experience" (Ani, 29 Sep 2026)

## Why
Every concern tile and doctor button shows "No Physicians Available", while the chat offers windows.
A patient who refuses the AI can't book at all.
Evidence: QA-007 (PC-10, PC-23) in `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (summary: `product/reports/patient-chat-qa-2026-09-29-SUMMARY.md`).

## Scope
- **In:** the patient-facing Simplicity chat and booking flow, as designed. The work happens in a
  **new prototype**, `simplecare-patient-chat.html`, shared by T-012 to T-017, plus a short spec for the
  dev team.
- **Out:**
  - changing staging or production code (that's the dev team's);
  - clinical wording or rules (Daniel's).

## Acceptance criteria
- [ ] **A complete non-AI path:** a concern tile, then the call windows, then booking, with no chat needed (B-001: the AI is offered, never forced).
- [ ] **Empty state.** When no window is available, show the alternatives (other days, other doctors, the phone line), never a dead end.
- [ ] **A patient who says "I don't want to talk to a bot"** is offered the tile path or the phone line.
- [ ] **Triage-first concerns without the AI:** show where the non-AI triage would sit (a short form or the phone). Its content is **Needs Daniel/Ani**.
- [ ] It follows `product/handbook/01-rules.md`, bulletin B-001, and the SimpleCare Paper design rules.
- [ ] **Evidence:** screenshots at desktop and phone width (in `product/reports/shots/`), plus a dev spec with the states, copy and behaviour: `product/specs/T-015-non-ai-pathway.md`.
- [ ] **Re-test:** after the gates, `patient-chat-qa` re-runs the scenarios above against the prototype.

## Needs Daniel / Ani
- **First, Ani confirms** whether "No Physicians Available" is only a staging-data gap. If it is, the design still covers the real empty state.

## Inputs
- `product/reports/patient-chat-qa-2026-09-29-staging-run1.md` (see the issues listed above)
- `product/tests/patient-chat/README.md`
- `research/patient-entry-flows/` (Ani's boards)
- `product/training/bulletins/B-001-booking-pathways.md`
- Staging, for reference only: https://staging.simplecare.ca

## Output
- A section of `simplecare-patient-chat.html` covering this task
- `product/specs/T-015-non-ai-pathway.md`

## Review
| Gate | Verdict | Notes |
|---|---|---|
| | | |

## Approval
- Ani: ☐  ·  Daniel (clinical): ☐ required

## Log
- 2026-09-29 — created from staging QA run 1
