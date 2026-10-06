# T-023 billing: build notes

## Daniel review, 5 Oct: what changed (built 6 Oct)

`ux-designer`, 6 Oct 2026, after Ani approved the updates. Rules: `billing-redesign.md`, "Daniel review, 5 Oct". Files: `simplecare-physician-portal-v2.html` and `simplecare-moa-portal.html`. Light mode only. Committed locally in six steps ("Daniel 5 Oct (step 1)" … "(step 6)"); not pushed or deployed. The section further down ("5 Oct") describes the build before this review; where they differ, this section wins.

**Built**
1. **Light by default.** The portal no longer follows the system dark setting (it opened dark on Daniel's computer). Dark only when someone uses the theme button; the choice is remembered (`sc-theme`, try/catch). The MOA portal has no theme switch and never followed the system, so it is unchanged.
2. **Home.** "Billing today" is gone. One amber Needs attention row for an MSP claim not submitted yet with 5 days left or fewer (demo: Frank D., 9 Jul visit, 4 days left); it opens the claim in Claims. Several such claims fold into one row ("N MSP claims not submitted", fewest days shown). The queue billing status ("Needs submission", "Payment outstanding") opens Claims; nothing in the queue submits.
3. **Claims.** "MSP | Private pay" switch. MSP tiles: Needs submission, Rejected by MSP, Paid this cycle. Rejected by MSP first (Correct, Dispute, reassess, Open the visit, Details, days left from the rejection date), then Needs submission (one list, one Submit claim each, 90-day countdown, fewest first, one quiet line about the end-of-day batch). Japneet (billing agent) asks the question on Nadia Hassan's returned claim. Removed: health-card, duplicate and AI review flags on claims, Not billed, Alternate payer, the batch and checkboxes, the PA viewer switch, the digest. Private pay: card on file or payment link, Outstanding/Paid, "Ask the MOA to follow up". The code check is asked once per session. Demo hook: `t23DemoDays('c18', 2)` shows the 48-hour red chip.
4. **Your coding.** Fee code set from age (demo codes DEMO-1…DEMO-5 by demo age bands), changeable from the short list; ICD-9 search only (demo list DX-D1…DX-D16 with search words), results after typing, "Can't find it? Open the ICD-9 source list" (placeholder: shows a toast); start and stop time (demo 9:12–9:24 AM), changes logged on the claim's history. The chart billing row: fee code · diagnosis · time · Change.
5. **Finalize.** Sign off & submit claim (primary) and Finalize, submit later (secondary) above the note column's footer, the same nodes in Current and v2 (the v2 Sign off popover). Private pay: one button, Sign off & finalize visit; the demo charges the card on file.
6. **Chart v2** opens on the Note tab during an open visit; no-show and signed-off visits open on Review. Current stays the default layout.
- **MOA portal:** the Billing screen is hidden from the nav, its Today items and the health-card billing task are off (`T23M_BILLING_FOR_MOA = false`); the code is kept. **Future work:** a separate billing agent view.

**Verification (6 Oct).** `node --check` on the 5 inline scripts in the physician portal and the 1 in the MOA portal: all pass. Headless Chrome 1440 × 900 with the system set to dark: the portal opens light; console clean on every run. Checked: Claims MSP and Private pay; submit one claim (code asked once, then not again); Correct a rejection (back in Needs submission, keeps its countdown); dispute → reassess; adjusted → dispute; the billing agent's question, both answers; Ask the MOA to follow up; the coding dialog (no results before typing, "uti", "back pain", no match → source link; fee list; time change logged); Sign off & submit claim and Finalize, submit later in both layouts; a missing diagnosis blocks only the submit; private pay finalize; v2 start tab on all eight queue charts; Home; regression on Inbox, Tasks, Assistant (claims answer), MOA chat, every queue chart, the queue billing column. Measured: 0 red elements in Claims at the demo values, text 14 px minimum in Claims and the coding dialog. Screenshots (local): `product/reports/shots/daniel5-*.png`.

**Still open**
- **Needs Daniel:** the stale-date thresholds (Home item at 5 days or fewer; chips amber at 10, stronger at 5, red at 2, and whether 48 hours also sends an inbox alert, which isn't built); the exact 90-day rule (is the visit day day 90?); the rejection window ("about 3 months", per rejection type?); the official ICD-9 source list and its link; the real fee codes and age bands; what "Paid this cycle" covers (the remittance period); whether a no-show is billed.
- **Needs Dev:** the full list of MSP rejection types (Daniel asked for it), and the structure of claim details and history.
- **Needs Ani:** retiring the PA viewer switch; the stronger-amber chip (warn wash, bold) versus the plain amber; the Home row names the patient (the old digest named none); the private-pay demo charges the card on finalize; v2 opens a completed-but-unsigned demo visit (Manjit) on Note.
- The two portals still don't share state.

---

## 5 Oct (before Daniel's review)

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
