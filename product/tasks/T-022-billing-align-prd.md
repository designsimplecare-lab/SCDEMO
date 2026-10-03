# T-022 — Align v2 billing with the Simple Billing PRD v1.5

| Field | Value |
|---|---|
| Status | Ready |
| Type | Review |
| Priority | P2 |
| Size | M |
| Requested by | lead (from Daniel's PRD, forwarded by Ani) |
| Date | 2026-10-03 |
| Owner | `billing-msp` |
| Contributors | `moa`, `doctor`, `product-manager` (spec docs), then **Manoj** for any design change |
| Gates | `clinical-safety` (attestation and sign-off), `qa-engineer` |

## Request
Ani forwarded Daniel's Simple Billing PRD v1.5 (1 Oct 2026). See bulletin B-005; the full text is in
`private/requirements/` (confidential parts stay there).

## Why
v2's billing (the queue billing and health-card columns, Claims, and Finalize submitting the claim)
was built before this PRD. We need a gap list before anything is redesigned.

## Scope
- In: a gap analysis of v2 against the PRD. It covers:
  - claim states vs v2's MSP statuses;
  - visit-level submission vs batch attestation;
  - eligibility results vs the health card column;
  - AI review flags;
  - L3 physician questions;
  - deadlines and refusals vs disputes;
  - the MOA field permissions, on the MOA portal side.
- Out: building anything, and every confidential section (the PRD's commercial and organisational parts).

## Acceptance criteria
- [ ] A report in `product/reports/` with a one-screen summary first. For each gap: the PRD ID, what
      v2 does (file and line), and the proposed change. Each one is marked **Needs Daniel** or
      **design (Manoj)**.
- [ ] No confidential PRD content in the report: cite IDs only.
- [ ] Follows `product/handbook/01-rules.md`.

## Inputs
- `product/training/bulletins/B-005-simple-billing-prd-v1-5.md`
- `private/requirements/Simple-Billing-PRD-v1.5.txt`
- `product/requirements.md` REQ-BIL-01 to 07, `product/open-questions.md` (OQ-24, OQ-25, OQ-51)
- `simplecare-physician-portal-v2.html` (the queue billing column, Claims, Finalize), and
  `simplecare-moa-portal.html`

## Log
- 2026-10-03 — created, waiting for Ani's go
