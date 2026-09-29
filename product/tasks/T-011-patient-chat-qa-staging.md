# T-011 — Patient chat QA run on staging (before sign-in)

| Field | Value |
|---|---|
| Status | In review (phase 1 done; phase 2, signed in, waits for Ani) |
| Type | Review |
| Priority | P1 |
| Size | M |
| Requested by | Ani |
| Date | 2026-09-29 |
| Owner | `patient-chat-qa` |
| Contributors | — |
| Gates | lead review (it's a report only) |

## Request
> "here in this staging https://staging.simplecare.ca you can use my simplecare gmail"

## Why
This is the first real run of the patient chat test plan (`product/tests/patient-chat/README.md`).
Ani named staging as the test environment.

## Scope
- **In:**
  - every PC scenario that can run **without an account**: the homepage, tiles, the Simplicity chat,
    intent, doctor and window choice, and the "holding" step;
  - edge cases, change of mind, natural language, and the emergency, triage and refuse-the-AI
    scenarios.
- **Out, this run:**
  - **Signing in or registering.** The agent never enters passwords, uses Google sign-in or creates
    accounts. Ani signs in herself; see Log.
  - **Completing a booking.**
  - Anything on the live simplecare.ca.

## Acceptance criteria
- [ ] Each PC scenario marked: done, partly done (stopped at the account step), blocked, or not run.
- [ ] Every issue in the QA-NNN format with evidence (screenshots in the scratchpad, no real data).
- [ ] Final output A–I from the plan.
- [ ] Follows `product/handbook/01-rules.md` and bulletin B-001.

## Output
`product/reports/patient-chat-qa-2026-09-29-staging-run1.md`

## Log
- 2026-09-29: created. Ani offered her Gmail. The lead can't sign in or approve a Google sign-in on
  her behalf, so the signed-in scenarios wait for Ani to sign in herself.
- 2026-09-29: Ani confirmed that staging does **not** send real emails or texts to doctors or MOAs.
  Test bookings on staging are safe to complete in the signed-in phase, once Ani has signed in
  herself.
- 2026-09-29: phase 1 done. 26 scenarios: 13 done (10 failed), 7 partly done, 2 blocked, 4 not run.
  Report: `product/reports/patient-chat-qa-2026-09-29-staging-run1.md`. The lead checked QA-001
  (emergency) against the screenshots, and it's confirmed.
