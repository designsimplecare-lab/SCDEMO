# T-023 — Rebuild billing the way Daniel's Simple Billing PRD v1.5 describes

| Field | Value |
|---|---|
| Status | In progress: spec approved by Ani (4 Oct); `ux-designer` is building |
| Type | Design + build |
| Priority | P1 |
| Size | L |
| Requested by | Ani |
| Date | 2026-10-03 |
| Owner | `ux-designer` (Ani approves) |
| Contributors | `billing-msp` (spec), `moa` (walkthrough), `doctor` (walkthrough), `content-designer` (words) |
| Gates | `clinical-safety` (attestation and sign-off), `qa-engineer`, `accessibility` |

## Request
Ani, 3 Oct: "Daniel changed the billing so we should change our billing how he did, new way."

**Decision (Ani, 3 Oct):** billing in the physician portal follows the PRD's model. The doctor
**attests claims in a batch** (clean claims together, flagged claims one by one), personally. This
replaces "finalizing the visit submits its claim". It answers OQ-87 by following the PRD (CNF-09,
CNF-10). Daniel can still overrule it.

## Why
The T-022 gap report (`product/reports/billing-msp-2026-10-03-prd-gap.md`) found 17 gaps. The biggest
are that there's no physician sign-off step, the doctor never codes the visit, refused claims resend
unchanged, health-card results are missing, and the MOA has no billing screen.

## Scope (the design items from the gap report)
- **G1, G2, G15:** a batch attestation view in Claims. Clean claims are attested together; flagged
  claims need a decision each. The physician's own action, with an MFA step simulated in the demo.
  The physician assistant can't attest. Finalize no longer submits on its own.
- **G3, G10:** a claim detail with the fee item, ICD-9, units and time, set by the doctor; and AI
  review flags (finding, reason, confidence, Accept or Dismiss). The AI never changes a claim.
- **G4 to G7:** claim states mapped from Daniel's labels to the PRD (Returned to physician, Refused
  with its reason and explanatory code, Adjusted, Held, Under appeal, Written off, Closed). Refused
  shows days left and a correction or potential-dispute path. Day 30, 60 and 75 deadline cues.
- **G8, G9:** health-card results (eligible, not eligible, coverage ended with the date, name or DOB
  mismatch, out of province), with a timestamped, stored check.
- **G11:** one daily billing digest, and L3 physician questions with one-tap answers. How these fit
  rule 12 is **Needs Daniel** (N5).
- **G12, G13:** every completed encounter gets one disposition. Totals separate expected from
  estimated, and private pay from MSP.
- **G14:** an MOA billing queue in `simplecare-moa-portal.html`, with field permissions (MOAs edit
  demographics only).
- **Out:** the monthly statement (G16, later), private-pay states (G17, unchanged), and every
  confidential PRD section.

## Acceptance criteria
- [ ] The spec `product/specs/billing-redesign.md` (from `billing-msp`) is approved by Ani before the
      build starts.
- [ ] Built into `simplecare-physician-portal-v2.html` (the one main version) and
      `simplecare-moa-portal.html`, in light mode only (no dark-mode work for now, Ani 4 Oct), built in the demo's existing design system (not Figma yet).
- [ ] Daniel's status words are kept where they still fit (REQ-BIL-02). Any new state is flagged.
- [ ] Fee codes and amounts stay **visibly marked as demo values** until Daniel supplies real ones
      (REQ-BIL-07, OQ-24). Nothing is invented as if it were real.
- [ ] Other screens still work. The build stamp is updated, and the change is deployed after Ani
      sees it.

## Inputs
- `product/reports/billing-msp-2026-10-03-prd-gap.md` (G1–G17, N1–N6)
- `product/training/bulletins/B-005-simple-billing-prd-v1-5.md`;
  `private/requirements/Simple-Billing-PRD-v1.5.txt`

## Log
- 2026-10-03 — created. Ani decided billing follows the PRD (batch attestation). `billing-msp`
  writes the spec while `ux-designer` finishes T-021.
- 2026-10-03 — Ani: use the demo's existing design system; the Figma library comes later
- 2026-10-04 — Ani: no dark-mode work for now; light only
- 2026-10-04 — Ani approved the spec ("start build billing"); `ux-designer` started the build. T-021 (chart) is live as of build 2026-10-04 11:22.
