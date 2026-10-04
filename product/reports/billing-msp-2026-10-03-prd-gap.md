# T-022: v2 billing vs the Simple Billing PRD v1.5, gap report

`billing-msp`, 3 Oct 2026. Task: `product/tasks/T-022-billing-align-prd.md`. PRD cited by requirement ID only (BIL15, private, confidential).
Files: **V2** = `simplecare-physician-portal-v2.html` (build 2026-09-30 20:05), **MOAP** = `simplecare-moa-portal.html` (build 2026-09-22 18:03).
Owner tags: **Needs Daniel**, **design (ux-designer)**, **engineering later**, **no change**. (The lead said on 3 Oct that the human designer has left, so design goes to `ux-designer`. The handbook still says Manoj.)
Bulletins: I read B-005 in full. I checked B-001 to B-004 and B-006 for billing content. The only one is B-006/D-106: Finalize is blocked until the this-visit strip is complete.

## One-screen summary

| # | Problem, in plain words | Severity | Owner |
|---|---|---|---|
| 1 | **Nobody has decided who signs off a claim, or when.** Also, v2's own path doesn't work. Finalize never submits a claim, because its check looks for bill states that no row has (V2:7419). Meanwhile the queue dropdown submits a claim in one tap and never shows it (V2:6884-6889). There is no batch, no step that shows the claim, and no check of who is pressing. | High | Needs Daniel (OQ-87), then design |
| 2 | **The doctor never codes the visit.** v2 makes up the fee item from the booking concern, with fee codes and dollar amounts that have no source (V2:6691-6699). "+ Diagnosis" only shows a toast (V2:4895). In the PRD, the physician's coding is the source. | High | Needs Daniel (OQ-24), design |
| 3 | **A rejected claim goes back unchanged in one tap.** The doctor sees no reason, no days left and no dispute path. The deadline wording is vague and unsourced (V2:5806-5807), even though MSP publishes a 90-day rule. | Medium | design; wording Needs Daniel |
| 4 | **The health card column is missing two PRD results** (coverage ended, name/DOB mismatch) and the out-of-province path. One of its explanations cites MSP premiums, which were abolished in 2020 (V2:5787). | Medium | Needs Daniel (OQ-89), design |
| 5 | **The MOA portal has no billing at all** (MOAP:207-217). The PRD's billing items are all missing there: MOA field permissions, physician questions (L3) and the daily digest. An L3 question may also clash with rule 12 (tasks go doctor to MOA only). | Medium | Needs Daniel, design |

**What each person needs to do**
- **Daniel:** answer OQ-87 (Finalize vs batch attestation) first. Then OQ-88/89 (labels), the new asks N1-N5 below, and OQ-24 (real fee items).
- **design (ux-designer):** don't redesign anything until OQ-87 is answered. After that: the claim detail (fee, diagnosis, AI flags, reason, days left), the attestation screen, and an MOA billing queue.
- **product-manager:** correct REQ-BIL-05's status (Finalize does not submit in practice), and add N1-N5 to Daniel's list.
- **Ani:** confirm the design owner change in the handbook. Approve sending the batched questions.

## Gap table

| # | PRD ID(s) | What v2 does today | Gap | Proposed change | Owner |
|---|---|---|---|---|---|
| G1 | CNF-09, CNF-10, COD-04 | Finalize ("Sign off & finalize visit", V2:4902) only submits when `r.bill` is `pending` or `none` (V2:7419). Every demo row uses `msp-*`/`pri-*` keys (V2:5758-5774), so the branch never runs. If it did run, it would set `submitted`, which isn't a key in BILL_STATUS, and the row would fall back to "Submit claim" (V2:6291). D-65 and REQ-BIL-05 describe it as working. | Visit-level submission is effectively not built. Batch attestation is not built either. | Decide OQ-87 first. If Finalize submits: the button must say it also signs off the bill (D-71), and it must show any AI flag first. If batch: Finalize closes the visit only, and the claim waits as "Submit claim". Either way, remove the dead branch. | Needs Daniel |
| G2 | CNF-09, CNF-10, TAIL-04 | The queue's billing dropdown puts "Sign off & submit" first (V2:6884-6889, 6768). One tap submits without showing the fee, the diagnosis or any warning. The Details modal shows only explanatory text (V2:6775-6790). | The doctor attests to a claim he hasn't seen. There is no batch "attest all clean claims", no claim-level decision for flagged claims, and no MFA. | Claims gets an attestation view: clean claims in one action with a count, and flagged claims one by one. The one-tap dropdown submit is kept only for clean claims, if Daniel allows it. MFA step: engineering. | design (ux-designer); MFA engineering later |
| G3 | COD-01, CNF-12, ROLE-R7 | The fee item is derived from the concern (V2:6691-6699, default V2:6699). The "+ Diagnosis" chip is a toast (V2:4895). No ICD-9, units or time anywhere. | There is no physician coding step, which is the PRD's starting point. | A fee item and diagnosis field in This visit (or in the claim detail), set by the doctor. Real codes come from Daniel. | Needs Daniel (N1, OQ-24); design |
| G4 | §6 claim states | 5 MSP labels (V2:5796-5809). `BILL_NEXT` sends every open state to "Claim submitted" (V2:6756-6759). | Missing: Returned to physician, Teleplan-rejected vs Refused, Adjusted, Held, Under appeal, Written off, Closed. | Keep Daniel's 5 labels and map the PRD's states under them (mapping table below). New labels only where the doctor's next action differs: flagged as N2-N4. | Needs Daniel (OQ-88) |
| G5 | §6 Held; SUB-04 | "Review claim" means "MSP returned a query on the fee item before adjudicating" (V2:5803). | No source. MSP gives its reasons as explanatory codes on the remittance (gov.bc.ca, below). The PRD has no "query" state. | Give "Review claim" a new meaning: the doctor's decision is needed (flagged at attestation, Returned to physician, or an L3 question). MSP's Held stays under "Claim submitted", with its reason. | Needs Daniel (N2) |
| G6 | APL-01, APL-05, REF-02, REF-03 | "Claim rejected" leads to "Sign off & resubmit" (V2:6769), which moves straight to "Claim submitted" with no change made (V2:6758, 6805-6822). | No reason or explanatory code is shown. There is no correction step and no "Potential dispute". Resubmitting unchanged is neither a correction nor a proper reassessment request. | The rejected detail shows the reason, days left and the open pathway. Correct clinical fields (the doctor) or demographic fields (the MOA). If the claim looks correctly billed, show "Potential dispute" and the doctor authorises a reassessment. MSP's published route is to resubmit with a note record (below). | design (ux-designer); Needs Daniel (N3) |
| G7 | SCR-06 to SCR-10, CNF-01, REF-03 | "Refusals expire, so this is time-limited" and "resubmit within the window" (V2:5806-5807). "Submit claim" shows no age. | No days-remaining figure and no day 30/60/75 alerts. A claim waiting for attestation doesn't count down, even though the MSP clock is running (CNF-01). | Show "N days left" calculated from the versioned rule, on "Submit claim" and "Claim rejected". Alerts at day 30, 60 and 75. Exact wording: Daniel. | design; wording Needs Daniel |
| G8 | ELT-01, ELT-07, ELG-03 | Health card: Verified, Check required, Invalid card, Private pay (V2:5780-5792). | Coverage ended (with date) and demographic mismatch are missing. No out-of-province or Quebec path. "Private pay" is a payer, not an eligibility result. | Map the labels as in the table below. Add "Coverage ended" and an "Out of province" cause if Daniel agrees. | Needs Daniel (OQ-89, N4) |
| G9 | ELT-03, ELT-05, ELT-09, ELG-01 | "Re-check with MSP" flips the card to Verified with no input and no stored result (V2:6808-6812). "Checked against MSP this morning" (V2:5782) has no timestamp. The Private pay card offers "Task the MOA" even though its text says "Nothing to check here" (V2:5791, 6801). | The result isn't stored with the visit or claim. There is no re-check before submission, and no "Teleplan unavailable, retrying". | Show the check time and the date of service. Store the response with the claim. Remove the action from Private pay. | design (ux-designer); storage engineering later |
| G10 | COD-01 to COD-03, COD-06 | No AI review on claims anywhere in V2. | Flags with reason and confidence at attestation are missing. | A flag row in the claim detail: the finding, the reason, the confidence, and Accept / Dismiss as the doctor's press. The claim is never edited by the AI (rule 18). Gate: `clinical-safety`. | design (ux-designer); engineering later |
| G11 | §8 L3, ESC-09, ESC-10, CNF-02 | No billing questions or digest in Home, Inbox or Claims. | L3 questions (context, exact question, one-tap answers, due in 1 business day) and one daily digest are missing. | One digest card on Home or Claims: attestations due, L3 questions, deadline risk. Placement depends on OQ-90. | Needs Daniel (OQ-90, N5); design |
| G12 | CLM-01 to CLM-06 | Claims says "Every encounter, billed and accounted for" (V2:5391). Bill state ignores visit status: rows still in queue already read Claim submitted/Claim paid (V2:5760, 5764), and missed or no-show rows carry claims (V2:5766, 5774). | No disposition for a completed visit: not billed (with reason), bundled or non-billable, alternate payer. Billable vs not billable for no-shows is undefined. | A claim exists only for a completed visit. Add "Not billed" with a reason (CLM-06). Fix the demo rows so they agree. Whether a no-show is billable: Daniel. | design; Needs Daniel |
| G13 | REC-09, RPT-02 | Claims totals: "$… unbilled" adds up every open row, including rejected and private ones (V2:6712-6718). MSP fee amounts appear on private-pay rows (V2:6736-6739). Fee Settings says $100 private (V2:5403). "awaiting adjudication" shows a dollar total (V2:6719). | Totals are mislabelled, expected and estimated amounts aren't told apart, and the private fee contradicts itself. | Split totals by state. Label each amount "expected" or "estimated". Private rows use the private fee, not MSP codes. | design (ux-designer) |
| G14 | ROLE-R7, CTL-03, QUE-01, QUE-03 | MOAP has no billing screen (nav MOAP:207-217) and no billing task type (MOAP:373-381). "Task the MOA" from Invalid card creates a generic task (V2:6801, 6814). | MOA field permissions aren't modelled. There is no billing queue with issue, suggested fix, owner and deadline. | An MOA billing queue. PHN, name, DOB, sex and clerical fields are editable. Fee item, ICD-9, units, time, fee-changing location and referrer are read-only, with "Ask the doctor". | design (ux-designer); Needs Daniel (N5) |
| G15 | CNF-04 to CNF-07, CNF-10 | The Physician Assistant portal is identical to the physician portal (handbook), so "Sign off & submit" would be available to the physician assistant. | The PRD has the physician attest personally. Delegation is off unless it has been verified as permissible. | Hide or disable attestation for the physician assistant until Daniel decides. | Needs Daniel (N6) |
| G16 | RPT-02 | No monthly statement. | Billed, accepted, paid, adjusted, outstanding, refused, under appeal and written off, each with reasons. | Later, from the same states. | engineering later |
| G17 | (out of PRD scope) | Private states: Payment due, Review payment, Payment paid (V2:5812-5819). | None against the PRD. OQ-25 is still open. | Keep as is. | no change |

## Proposed mapping: v2 labels to PRD states and eligibility results

| v2 label (keep) | PRD state or result underneath | Doctor's next action | Flag |
|---|---|---|---|
| Submit claim | Ingested, Pre-scrubbed, Awaiting attestation (clean) | Attest (batch or single, per OQ-87) | none |
| Review claim | Awaiting attestation with a flag (COD-03); Returned to physician (CNF-12); open L3 question | A claim-level decision | **Meaning changes**: today it says "MSP query" (N2) |
| Claim submitted | Attested, Final-scrubbed, Queued, Submitted, Acknowledged; Held (with reason) | None | Held under "submitted": N2 |
| Claim rejected | Refused; Teleplan-rejected only when it needs the doctor (data errors go to the MOA first, SUB-04) | Correct, or authorise a dispute | none |
| *(new) Potential dispute / Under appeal* | APL-01, Under appeal | Authorise (APL-05) | **New state** (N3) |
| Claim paid | Paid, Closed | None | none |
| *(new) Paid, adjusted* | Adjusted | Accept, or dispute | **New state** (N3) |
| *(new) Not billed* | Disposition: intentionally not billed, bundled/non-billable, alternate payer (CLM-01, CLM-06) | Reason at attestation | **New state** (N4) |
| (not on the queue) | Written off, Deleted | Shown on the statement (RPT-02) | engineering later |
| Verified | Eligible (for the date of service) | None | none |
| Check required | Demographic mismatch (name or DOB); missing PHN; Teleplan unavailable, check queued (ELT-09) | Confirm details, re-check | Cause shown in detail (OQ-89) |
| Invalid card | Not eligible; **Coverage ended (date)** | PHN correction, alternate payer or private pay (ELG-03) | Add the date, or a separate label (OQ-89) |
| Private pay | Not an eligibility result: a payer/disposition (CLM-01, ELT-08) | None | none |
| *(new) Out of province* | ELT-07 reciprocal workflow; Quebec goes to private pay or reimbursement | Reciprocal billing or private pay | **New cause** (N4) |

## Unsourced items still in v2

| Where | What | Status |
|---|---|---|
| V2:6691-6699 | Fee codes `00100` "Office visit" and `13437` "Telephone management", amounts $33.55 and $19.40, assigned by concern | No source. **Needs Daniel / verify against the MSP Payment Schedule** (OQ-24) |
| V2:6716-6720, 6738-6739 | Those amounts summed into "unbilled", "awaiting adjudication" and "paid" totals, private-pay rows included | Same source problem, and private rows use MSP figures |
| V2:5403 | "Private Visit Fee $100 CAD" | No source. Needs Daniel |
| V2:5806-5807 | "Refusals expire, so this is time-limited." / "resubmit within the window" | Vague. Official: claims within 90 days of the service date; over 90 days, submission code X, only within 90 days of the original claim's remittance date ([gov.bc.ca, Billing and Payments](https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/msp/claim-submission-payment/billing-and-payments), checked 3 Oct 2026). Wording: Needs Daniel |
| V2:5803 | "MSP returned a query on the fee item before adjudicating" | No source (G5). Verify with MSP |
| V2:5787 | "coverage lapsed on a premium" | Outdated: "MSP premiums were eliminated as of January 1, 2020" ([gov.bc.ca, Premiums](https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/premiums), checked 3 Oct 2026) |
| V2:5782 | "Checked against MSP this morning" | Implies an overnight check (ELT-06) that SimpleCare hasn't decided on. Assumption |

## New asks for Daniel (for product-manager to batch)
- **N1.** Where does the doctor code a SimpleCare visit (fee item, diagnosis), and who supplies the real fee items? (G3, OQ-24)
- **N2.** May "Review claim" mean "your decision is needed", with MSP holds shown under "Claim submitted"? (G5)
- **N3.** Add "Potential dispute" and "Paid, adjusted" as states? (G6, mapping)
- **N4.** Add "Not billed (reason)" and an "Out of province" card cause? Is a no-show billable? (G8, G12)
- **N5.** Is a billing question from the MOA to you (L3) allowed under rule 12, as a question on the claim rather than a task? (G11, G14)
- **N6.** May the physician assistant attest claims, or only you? (G15)

## Top 3 findings, ranked by impact
1. **Attestation is undecided, and v2's submit path is broken both ways** (G1, G2). Finalize never submits, and the queue submits without showing the claim. OQ-87 blocks everything after it.
2. **There is no coding step, and the fee data is invented** (G3, unsourced items). Every claim, total and AI flag depends on it.
3. **Rejections lack a reason, days left and a dispute route** (G6, G7). That is where money is lost, and the 90-day rule is published.

## What needs Daniel
OQ-87 (first), OQ-88, OQ-89, OQ-90, OQ-24, and N1-N6 above.

## What needs Ani
- Confirm the design owner change ("design (ux-designer)") in the handbook and team files.
- Approve product-manager batching N1-N6 with OQ-87 to OQ-90.
- A privacy item was reported to the lead separately, outside this report.
