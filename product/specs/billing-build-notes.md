# T-023 billing: build notes

`ux-designer`, 5 Oct 2026. Spec: `product/specs/billing-redesign.md` (Ani approved it on 4 Oct). Task: `product/tasks/T-023-billing-redesign.md`.
Files: `simplecare-physician-portal-v2.html` (build 2026-10-05 10:30) and `simplecare-moa-portal.html` (build 2026-10-05 11:15). Light mode only. Built locally, not pushed or deployed.

## One-screen summary
- **Finalize closes the visit only.** One billing line now sits above "Sign off & finalize visit": the fee item with its "Demo value" tag, the diagnosis and the time, plus "Change". Under the button: "Your claim goes to Claims for sign-off. Nothing is sent to MSP yet." Finalize sets the disposition and creates "Submit claim" or "Review claim". The old dead branch that submitted is gone. The T-021 gates still apply: the strip, the AI suggestion, an empty note and problem-list suggestions.
- **The doctor signs off in Claims.** The 4 clean claims go together, with ticks, the draft attestation and "Sign off & submit 4 claims". Each flagged claim is a card with its flags: AI review (Accept opens the field with the suggestion beside it, Dismiss takes optional reasons), Health card, Duplicate check, the question from Dolly, and Diagnosis needed. "Sign off & submit this claim" stays disabled until every flag is decided.
- **Code check.** Every sign-off asks for a simulated 6-digit code first. "000000" shows the wrong-code message. The code is asked once per visit to Claims.
- **Viewer switch.** It is labelled "Demo". Japneet (physician assistant) sees everything, but every decision button is disabled, with "Only Dr. Pannozzo can sign off his claims."
- **Rejected by MSP.** Behdis shows "Correct" and "Dispute instead". Andrey shows "Sign off & ask MSP to reassess", which runs the code check and moves the claim to Under appeal. Grace shows "Accept" and "Dispute". All show days left. The day 30, 60 and 75 chips appear by exception, and nothing in billing is red. That was measured: 0 red elements.
- **Claim detail** (#bill-overlay, 560 px) shows: Your coding with Change, AI review ("The AI only flags…"), Health card with its stored checks, MSP response with "How we count this", Disposition, Visit, and History (the last 2 entries, then "Show all"). Every change is logged with its before and after values.
- **Queue.** Unfinished visits show "—". Gloria shows "Submit claim" after Finalize. Her menu offers "Sign off in Claims" and "Details". Nothing in the queue submits. Korynn shows the dashed no-show placeholder. The health-card column now shows Out of province (Alberta, Quebec), Coverage ended · 31 Aug and Invalid card (amber, not red). Each opens a dialog with "What this means", "What happens next", the stored check, and "Re-check with MSP", which returns the same result with a new time.
- **Home** has the "Billing today" digest: deadline risk, ready, to decide, the question from Dolly, and rejected. It names no patients.
- **MOA portal** has a new **Billing** screen with Open · 3, Waiting on the doctor · 3 and Done. An item shows: What came back, Suggested fix, editable Patient details (masked PHN and date of birth, both demo; nothing is stored), read-only Coding ("Only the doctor can change this.") with "Ask the doctor", History, and the actions for its kind. Items at day 60 or later appear on Today. The doctor's health-card task arrives as a "Billing" task.

**Verification.** `node --check` passes on all 4 inline scripts in V2 and the 1 in MOAP. Headless Chrome at 1440 px, light: the console was clean in every run, apart from the local server's favicon 404. The runs covered Claims, the batch sign-off, the wrong and right codes, AI Accept, the claim detail, the PA view, the queue menu, Finalize on Gloria, the disposition reason error, the card dialog and re-check, reassess, adjusted to paid, the Submitted and All views, the digest, the question overdue and answered, and the MOA queue (resubmit, ask, held needs a note, re-check). Regression: Inbox, Tasks, MOA chat, the Assistant, every queue patient's chart and Fee Settings.

## Built vs not built
**Built:** spec parts 0–10 as listed above, with every code and amount tagged "Demo value" (DEMO-A/B/C, DX-D1..D9, EX-D1..D5; the $100 private fee is tagged too). "Claim rejected" and "Invalid card" use amber, not red. The `.cl-stat` labels are sentence case. Totals come in two groups (MSP and Private pay) with basis words. The Assistant's claims answer now reads the same counts.

**Not built, or simplified:**
- Day counts use the spec's demo "today", Sat 3 Oct 2026, so the spec's numbers hold. The queue's date label still follows the real clock.
- The two portals don't share state. A question sent in MOAP doesn't appear in V2, and the doctor's answer in V2 doesn't move Dolly's item. Demo buttons stand in for that.
- No "Propose write-off" flow in MOAP. There is a one-line rule instead, because the second signer Needs Daniel.
- "Changed after sign-off: sign off again" can't happen in the UI, because Change is hidden once a claim is submitted.
- The "Prepare reassessment" item for the MOA after the doctor authorises is shown only through MOAP's demo button.
- The question's overdue state has a JS demo hook, `t23QOverdue(true)`, but no switcher button.
- The "chat" icon isn't in MOAP's icon map, so "Ask the doctor" has no icon. The existing Chatbox button has the same gap.
- The dark theme was not touched or tested.

## Still open
**Needs Daniel:** N1 (where coding happens; the real fee list), N2–N4 (the new state words, the no-show, alternate payers), N5 (the "question on a claim is not a task" wording), N6 (may the PA sign off), N7 (attestation wording: shown with a "Draft wording · Needs Daniel" tag), N8 (second signer; L2 and L4 owners), N10, N11 (reciprocal and Quebec), N12 (chip wording and edge cases), N13 (the 0.80 threshold, "estimated", the digest time: shown with a "Demo time · Needs Daniel" tag), N16 and N17.
**Needs Ani:** N9 (L3 = 2 business days in the PRD; B-005 and REQ-BIL-13 say 1), N14 (how long the code check lasts; the build asks once per visit to Claims), N15 (no red for billing; the digest on Home above the live queue; MOAP stays light only).

Screenshots (local, git-ignored): `product/reports/shots/t023-*.png`.
