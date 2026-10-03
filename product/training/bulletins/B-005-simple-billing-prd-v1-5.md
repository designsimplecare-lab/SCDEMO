# B-005 — Simple Billing PRD v1.5 (Daniel, 1 Oct 2026)

**Date:** 3 Oct 2026 · **From:** Ani (forwarded) · **Read before your next task** (process.md step 2a)

Daniel's billing product requirements. The full text is in
`private/requirements/Simple-Billing-PRD-v1.5.*` (git-ignored). **Its commercial and organisational
sections are confidential:** never repeat them in a repo file.
Cite requirement IDs (CNF-nn, CLM-nn, ELT-nn and so on) and summarise only the billing behaviour that
the SimpleCare portals show.

## What it says about how billing works
- **The physician's coding is the source; the system checks it.** Claims arrive, get an
  eligibility check, then an AI review and a pre-scrub. Then the physician attests, the final scrub
  runs, and the claim is submitted, reconciled and returned. The AI **flags** likely errors,
  unsupported codes and missed codes, with a confidence score. It **never changes a claim**.
  (COD-01 to COD-06)
- **Batch attestation, which is the physician's sign-off:**
  - clean claims are attested together in one action;
  - a flagged claim needs a decision on that claim;
  - the physician attests personally, with MFA;
  - staff uploads and billing-staff actions never count as attestation;
  - any proposed change to a clinical field sends the claim back to the physician.

  (CNF-09, CNF-10, CNF-12; matches Daniel: "To submit a bill is to 'sign off' on your billing")
- **Claim states:** Ingested → Pre-scrubbed → Awaiting attestation → Attested → Final-scrubbed →
  Queued → Submitted → Acknowledged or Teleplan-rejected → Paid, Refused, Adjusted or Held →
  Resubmitted or Under appeal → Closed. There are also side states: Returned to physician, and
  Written off or Deleted (each needs two-person approval). (Section 6)
- **Every completed billable encounter gets exactly one disposition:** a submitted claim,
  intentionally not billed, alternate payer, private pay, bundled or non-billable, or a documented
  exception. A missing disposition creates an exception. (CLM-01 to CLM-06)
- **Eligibility:**
  - Results are eligible, not eligible, coverage ended (with the date), or demographic mismatch,
    each with the next action, returned within 5 seconds.
  - The check runs at the point of care, overnight against the next day's schedule, and on
    ingestion.
  - Out-of-province cards follow the reciprocal workflow. Quebec patients go to private pay or
    patient reimbursement. (ELT-01 to ELT-10, ELG-01 to ELG-04)
- **What MOAs may and may not change:** MOAs may correct the PHN, name, date of birth, sex and
  clerical fields. Only the physician may change the fee item, ICD-9, units, time, a service
  location that changes the fee, or the referring practitioner. (ROLE-R7, CTL-03)
- **Escalation, levels L0 to L5:** L3 is a question for the physician, with the context, the exact
  question and one-tap answers where possible, due in 1 business day. Reminders come as **one daily
  digest**, not one per claim. (Section 8, ESC-09, CNF-02)
- **Deadlines:** an unresolved claim alerts at day 30, day 60 and day 75 against the MSP submission
  deadline. Over-age and resubmission pathways are checked before a claim counts as lost.
  (SCR-06 to SCR-10)
- **Disputes vs corrections:** a refusal that looks correctly billed is flagged as a **potential
  dispute** and isn't changed. The physician authorises substantive disputes. (APL-01 to APL-09)
- **Expected vs estimated payment** are always labelled apart. (Section 1 definitions, REC-09)
- **The physician monthly statement** shows billed, accepted, paid, adjusted, outstanding, refused,
  under appeal and written off, each with its reasons. (RPT-02)
- **Private-pay patient invoicing is out of this PRD's scope.** The clinic's own private-pay states
  in v2 stay as they are.

## What it means for the v2 physician portal
- **Visit-level vs batch attestation:** v2 submits a claim when the doctor finalizes the visit
  (REQ-BIL-05). The PRD's model is batch attestation, with clean claims together and flagged claims
  one by one. How the two fit for SimpleCare's own visits is a **question for Daniel**.
- **Status names:** v2's MSP statuses (Submit claim, Claim submitted, Review claim, Claim rejected,
  Claim paid) are a simpler set than the PRD's claim states. Map them; don't rename anything without
  Daniel (REQ-BIL-02).
- **Health card column:** v2's labels (Verified, Check required, Invalid card, Private pay) should
  map onto the PRD's eligibility results. "Coverage ended (date)" and "demographic mismatch" are
  missing.
- **AI review findings** appear at attestation as flags with reasons. They never edit the claim.
- **This settles a training finding:** v2's unsourced "resubmit within the window" can now point to
  the day 30, 60 and 75 deadline rules. Fee codes and amounts are **still** unsourced (REQ-BIL-07).

## Questions to raise (don't resolve them yourself)
- Does SimpleCare's own visit flow use the PRD's batch attestation, or keep "sign off the visit =
  submit the claim"?
- Should the queue and Claims screens use the PRD's claim states, or keep v2's simpler labels?
- Should the health card column add "coverage ended" and "demographic mismatch"?
- Is there a daily billing digest for the doctor in the physician portal?

## Self-check
1. Can the AI change a fee code on a claim? (No. It flags with a confidence score; the physician
   decides.)
2. Can an MOA change an ICD-9 code? (No. It's physician-only.)
3. A refusal looks correctly billed. What happens? (It's flagged as a potential dispute, not
   changed.)
4. Can this bulletin, or any repo file, describe the PRD's commercial sections? (No. They're confidential and
   stay in `private/`.)
