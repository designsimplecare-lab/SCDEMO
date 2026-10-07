# Billing redesign: spec for T-023

`billing-msp`, 3 Oct 2026. Task: `product/tasks/T-023-billing-redesign.md`. Status: **draft for Ani's approval** (the build starts only after she approves it).
Builder: `ux-designer`, after T-021. Gates: `clinical-safety` (sign-off and AI flags), `qa-engineer`, `accessibility`.

**Sources.** PRD = Simple Billing PRD v1.5 (Daniel, 1 Oct 2026). It is cited by requirement ID only, and its confidential sections are left out.
**V2** = `simplecare-physician-portal-v2.html` (build 2026-10-03 22:00). **MOAP** = `simplecare-moa-portal.html` (build 2026-10-03 22:00).
**Gap IDs** G1–G17 and N1–N6 are from `product/reports/billing-msp-2026-10-03-prd-gap.md`.
**Official MSP pages**, checked 3 Oct 2026:
- [Billing and payments](https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/msp/claim-submission-payment/billing-and-payments)
- [Explanatory codes](https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/msp/claim-submission-payment/explanatory-codes)

**Design basis (Ani, 3 Oct, through the lead).** Build with the design system that's already in V2: its CSS variables, font, tag and button patterns, Mage icons and dark theme. Do **not** use the Figma SC – Design System tokens; that migration comes later. The MOA portal uses its own existing classes. `product/design/sc-design-system-tokens.md` doesn't apply to this task.

**Words.** "Attestation" is the PRD's name for the concept. On screen, the action uses Daniel's sign-off language: *"To submit a bill is to 'sign off' on your billing"* (D-71; REQ-BIL-02). So the buttons say "Sign off & submit", not "Attest".

---

## One-screen summary

**The new flow, as the doctor and the MOA experience it**
1. **The doctor codes during the visit.** A one-line billing row above Finalize shows the fee item, diagnosis and time. The time is filled in from the call log, and the doctor can change any of it.
2. **"Sign off & finalize visit" closes the visit only.** The note is signed and the visit gets its disposition (an MSP claim, private pay, not billed and so on). The claim waits in Claims. **Nothing goes to MSP at Finalize.**
3. **Once a day, one billing digest card** gives the counts: claims ready to sign off, claims that need a decision, questions from the MOA, and deadline risk. It never sends one reminder per claim.
4. **In Claims, the doctor signs off clean claims together** with one button ("Sign off & submit 4 claims") and a simulated code check (MFA). Flagged claims are listed one by one with their warnings and AI findings. Each needs his decision before it can go. The physician assistant can see Claims but can't sign off.
5. **MSP's response comes back to the right person.** Patient-detail problems go to the MOA's new **Billing** queue. She corrects the PHN, name, DOB or sex and resubmits. Coding problems go to the doctor as "Claim rejected", showing the reason, the explanatory code and the days left, with **Correct** or **Dispute**.
6. **When only the doctor can fix something, the MOA asks a question on the claim.** The coding fields are locked for her, so she uses "Ask the doctor". He answers with one tap. A question on a claim is not a task (rule 12: this is a proposal, Needs Daniel, N5).
7. **Every completed visit ends with exactly one disposition**, and every claim shows days left from day 30 onward. Totals always say "expected", "estimated", "paid" or "due", and never mix MSP with private pay.

**What changes from V2 today**
- The one-tap "Sign off & submit" leaves the queue (V2:6884-6889).
- Finalize's dead billing branch goes (V2:7419).
- The invented fee codes and amounts become visibly marked demo values (V2:6691-6699).
- Health-card results gain "Coverage ended" and "Out of province".
- The MOA portal gets a Billing screen.

**Before the build**
- Ani: approve this spec and the open points marked Needs Ani.
- Daniel's open points (N1–N6 and the new ones) don't block a **demo** build. Each one shows as a flagged placeholder or a proposed default.

---

## Daniel review, 5 Oct

Daniel reviewed the billing demo with Ani on 5 Oct 2026; Ani approved the changes on 6 Oct. **These rules replace the parts of this spec they contradict** (sections 2, 2a, 2b, 5, 6, 7 on claims, 8a and 10 as noted). Build: `ux-designer`, 6 Oct; notes in `billing-build-notes.md`.

**Home**
- No billing card on Home. Home Needs attention is clinical only; the queue billing status and the sidebar Claims are the shortcuts into Claims. (Replaces 8a, the digest.)
- One exception: an MSP claim not submitted yet that is close to going stale-dated appears as one item in Home Needs attention, amber (not red, not critical), and opens that claim in Claims. Threshold: 5 days left or fewer (proposal; Needs Daniel).

**Claims: MSP and private pay are separate**
- A segmented switch at the top of Claims: "MSP | Private pay". The two are organised differently and never mixed.
- MSP tiles: **Needs submission**, **Rejected by MSP**, **Paid this cycle**. "With MSP", "Ready to sign off" and "Needs your decision" are gone. Submitted claims stay reachable through the Submitted, Paid and All tabs.
- Order: **Rejected by MSP first** (top priority, front and center), then **Needs submission**.

**Rejected by MSP**
- Keeps Correct, Dispute and "ask MSP to reassess", the claim details and history, and the link to the related visit (Daniel liked it).
- Each rejected claim counts down from the rejection date: about 90 days to fix it ("about 3 months"; the exact window per rejection type Needs Daniel and Dev). Dev to supply the full list of rejection types. *(6 Oct: 90 days from the statement date that refused it; MSP's real codes. See "Dev answers, 6 Oct".)*
- A corrected claim goes back to Needs submission, keeps the rejection's countdown, and the doctor submits it himself.

**Needs submission**
- One merged list of every MSP claim not submitted yet, for any reason. The product doesn't ask or track why.
- No batch sign-off and no include checkboxes. Each claim has its own **Submit claim** button. The doctor submits one at a time; the system sends the day's submitted claims to MSP in one batch at the end of the day (said once, in a quiet line). *(6 Oct: wrong; there is no batch. See "Dev answers, 6 Oct".)*
- A day countdown on each claim: 90 days from the date of service; the visit day is day 90, the next day day 89 (Daniel will double-check the rule). Sorted fewest days left first. *(6 Oct: the visit day is day 0; the last day is visit + 90.)*
- Chip tones (proposal, Needs Daniel): neutral; amber at 10 days or fewer; stronger amber at 5 or fewer; critical red only at 2 days or fewer (48 hours). This is the only red in billing (rule 21: red is critical only). Daniel's own proposal adds an automatic alert to the doctor's inbox at 48 hours: not built, Needs Daniel.
- The simulated code check stays, asked once per session.

**The billing agent**
- The person who works on rejections and asks billing questions is the **billing agent**, a role separate from the MOA (it can be the same person). The doctor stays responsible for every claim. The MOA is not part of the doctor's billing. Demo person: Japneet, "billing agent".
- The billing agent's question on a claim stays ("Can you check the diagnosis on this claim?", with "Fix it now" and "The diagnosis is right · resubmit as is"), shown inside its claim: in Needs submission, or in Rejected by MSP when it came from a rejection. "Resubmit as is" runs the code check, because the doctor always presses submit himself.
- The MOA portal's Billing screen (section 10) is hidden from the MOA nav. A separate billing agent view is future work.

**Removed use cases**
- Health card problems on claims (coverage ended, name mismatch, invalid card): they are caught before the visit. The queue's health-card column stays.
- The duplicate check (it won't happen).
- The AI review flag "fee item may not match the visit", and the AI flag system on claims. AI help to make the note audit-proof belongs in the chart note (a later discussion).
- "Not billed" and "Alternate payer" (section 6): a visit is MSP or private pay, decided before the visit.
- The physician-assistant viewer switch on Claims: Japneet now appears in billing as the billing agent, so it no longer made sense.

**Coding ("Your coding")**
- "Fee item" is renamed **Fee code**. Fee codes are deterministic by the patient's age (about 5 codes): the code is set automatically from the age ("Set from age · 74") and can still be changed from the short list. The real codes and age bands Need Daniel. *(6 Oct: real codes; no list, only visit or counselling. See "Dev answers, 6 Oct".)*
- **Diagnosis (ICD-9):** a search box only. Results appear only after typing (for example "back pain", "UTI", "cold sore"). No long list, no free text. AI pre-fills it. If nothing is found: "Can't find it? Open the ICD-9 source list" (Daniel has the source document and list; link Needs Daniel).
- Removed: units, service location, referring practitioner and the whole Disposition section.
- **Time:** start and stop, filled from the call, editable; every change is logged. Time matters for time-based codes.
- The chart's billing row shows fee code · diagnosis · time, with Change (no disposition).

**Finalize in the chart** (replaces section 5's "Finalize closes the visit only")
- Daniel wants a bill submitted when the consult is done, and the doctor always presses submit himself.
- MSP visit: primary **Sign off & submit claim** (finalizes the visit and submits that one claim, after the code check); secondary **Finalize, submit later** (the claim goes to Needs submission). Cancelling the code check also leaves it in Needs submission.
- A claim can't be submitted without a diagnosis: Sign off & submit opens the diagnosis search; Finalize, submit later still closes the visit.
- Private-pay visit: just finalize.

**Private pay view**
- Payment status per visit: the card on file charged after the visit, or a payment link sent (a form is released once it's paid), with **Outstanding** or **Paid**.
- An outstanding payment link has "Ask the MOA to follow up" (doctor → MOA, rule 12).

**Later (not in this build):** an analytics page: earnings by remittance cycle and by period, and volume by weekday.

---

## Dev answers, 6 Oct

Dev answered our 13 billing questions on 6 Oct 2026 (answers kept private; public MSP rules only here). **These rules replace the parts of "Daniel review, 5 Oct" and the older sections they contradict.** Build: `ux-designer`, 6 Oct; details, mapping choices and open questions in `billing-build-notes.md`, "Dev answers, 6 Oct".

**Fee codes.** MSP telehealth codes, picked automatically from the patient's age on the visit date; the doctor never picks a visit code. Visit: 13237 (0–1) $41.42, 13437 (2–49) $38.61, 13537 (50–59) $41.42, 13637 (60–69) $43.29, 13737 (70–79) $48.76, 13837 (80+) $56.47. Counselling: 13238–13838 ($77.24–$112.93), at least 20 minutes, start and end time on the claim, at most 4 per patient per year. Every claim starts as the visit code; when the call lasted 20 minutes or more, "Switch to counselling (13x38)" is offered (Your coding, the claim drawer, the chart billing row). The system never switches on its own. A counselling claim without times can't be submitted, with one message everywhere.

**Explanatory codes.** MSP's real codes (list dated 1 Jul 2026). The claim shows the code(s), what they mean, who fixes it and how. YY (and DR, HK) are wrappers, never shown alone: "YY · VN". Held (BH): "MSP will decide on a later statement. Don't resend."

**Diagnosis list.** MSP's list plus Dr. Pannozzo's 4 Oct codes, with plain-English search words; "suicide" finds 311, 50B, 300.4 and V62.8.

**Submission.** No end-of-day batch: a claim goes to MSP the moment the doctor presses Submit. MSP processes what it received at 7 PM Pacific each business day; twice a month that run is the payment close-off, and anything later rolls to the next one. Copy: "Claims go to MSP as soon as you submit. MSP processes them at 7 PM each business day."

**Deadlines.** First submission: the visit day is day 0, the last day is the visit date + 90 days (8 Jul → 6 Oct). A refused claim: resend with a note within 90 days of the statement date that refused it.

**States.** Dev's seven user-facing states are the chip labels everywhere: Needs info (+ Doctor / Billing), Ready to send, Sent — waiting for MSP, Held by MSP, Refused — fix & resend, Paid ("Paid $x of $y" when they differ), Closed — not paid. Amber for the needs-attention states; red only on the 2-days-left chip and tab count badges.

**Name check.** A 3+ word name MSP hasn't confirmed: "Patient name not yet confirmed by MSP" with "Check with MSP now"; the answer comes the next business day and the claim waits.

**History.** Dev's event types with doctor-facing labels (created, edited old → new, blocked by check, name check, sent to MSP, refused + code + meaning, held, paid $ + date, adjusted, resent with a note, closed); newest first, collapsed after five.

---

## 0. Rules for every part

**The design system to use (V2's own).**
- **Colours:** `--ink`, `--ink-soft`, `--ink-faint`, `--paper`, `--panel`, `--wash`, `--line`, and `--accent` (#4353E8, dark #0A84FF).
- **Tones:** `--warn` with `--warn-wash`, `--good` with `--good-wash`. The tag washes are `--tag-warn`, `--tag-info` and `--tag-bad`, with their icon colours `--tag-*-ic`.
- **Dark theme:** `:root[data-theme="dark"]`, toggled by `toggleTheme()` (V2:5964).
- **Font:** the system stack (V2:24).

**Components to reuse.**

| Need | Reuse | Where in V2 |
|---|---|---|
| Status chip on rows | `.bill-pill` (`.warn`, `.info`, `.ok`); `button.bill-pill.go` when it can be acted on | 1719-1725, 3811-3815 |
| Health-card chip | `.q-ver` (`.ok`, `.warn`, `.info`) with `CARD_ICON` | 825-829, 6286 |
| Dropdown on a chip | `#q-statusmenu` via `openBillMenu()` | 4555, 6879 |
| Panels | `.box`, `.box-title` | 256 |
| Claims rows | `.cl-row`, `.cl-who`, `.cl-fee`, `.cl-amt` | 1860-1871 |
| Totals | `.cl-stats`, `.cl-stat` (`.k`, `.v`, `.s`) | 1854-1859 |
| Filters | `.cpt-filters` buttons, `.on` | 1948-1951 |
| Dialogs (claim detail, code check) | `.defer-overlay` + `.defer-card` with `.bl-eyebrow`, `.defer-ttl`, `.bl-who`, `.bl-block`, `.bl-k`, `.bl-v`, `.defer-acts` (the existing `#bill-overlay`) | 2291-2294, 5673-5689 |
| Buttons | `.btn`, `.btn.dark` (primary), `.btn.xs`, always with `<span class="ic" data-pdic="…">` | 267-275 |
| Sign-off stamp | `soStamp(at)`: "Signed off by Dr. Pannozzo · time" | 10795 |
| AI marker | `AI_MARK` (the gradient sparkle used on AI drafts) | 5870 |
| Empty line | `.pc-empty` | 1324 |
| Toast | `toast()` | 6977 |
| Icons | `ICONS` via `data-pdic`. Billing uses `complete`, `claims`, `cardok`, `cardwarn`, `carderr`, `cardinfo`, `clock`, `alert`, `edit`, `taskmoa`, `chat`, `reopen`, `user`, `eye` and **`demo`** | ICONS map |

**Fixes that come with the build** (rules 21–23, 26).
- **Red is critical only (rule 21).** No billing state uses `--crit` or the `.bad` tone.
  - "Claim rejected" and "Invalid card" move from `.bad` to `.warn`, and keep their distinct icons (`alert`, `carderr`).
  - This changes how they look today. **Needs Ani** (open point N15).
- **Sentence case (rule 23).** `.cl-stat .k` is uppercase today (V2:1855); remove the transform.
- **Sizes (rule 22).** Billing text is 14 px minimum. Primary buttons are 44 px with an icon.
- **One vocabulary everywhere (rule 26).** The queue, Claims, the claim detail, the digest and the MOA portal use the same state words.

**Demo values (REQ-BIL-07, OQ-24).**
- Every fee code, fee amount, diagnosis code and explanatory code carries a **"Demo value"** tag: an inline chip with the `demo` icon, `--wash` fill, `--ink-soft` text and 14 px.
- Claims also shows one line at the top: "Fee items, amounts and explanatory codes here are demo values, not real MSP data."
- **Replace V2's realistic-looking figures** (`00100` "Office visit" $33.55, `13437` "Telephone management" $19.40; V2:6691-6699) with values that can't be mistaken for real ones:
  - fee items `DEMO-A` "Visit" at $30.00 and `DEMO-B` "Brief follow-up" at $20.00;
  - diagnosis codes `DX-D1` to `DX-D9`;
  - explanatory codes `EX-D1` to `EX-D9`.
- The private visit fee ($100, V2:5403, unsourced) is also tagged "Demo value".
- **No PHN or DOB strings.** Where a field needs one, show a masked placeholder ("•••• ••• •••") tagged "Demo value".

**What billing never does, on any screen**
- It never submits or signs off from the queue.
- The AI never changes a claim (COD-01; rule 18).
- The MOA or the physician assistant never signs off (CNF-10).
- The MOA never edits coding (ROLE-R7, CTL-03).
- Billing never blocks the clinical sign-off of a visit.
- Billing never uses red.
- No amount appears without its basis word.

---

## 1. Queue billing column

**Purpose.** The column shows where each of today's visits stands for billing. Since sign-off now happens in Claims, it is information plus a shortcut. It is no longer a submit button.

**Anatomy.** It is the existing billing cell (`billCell`, V2:6291-6294): one `.bill-pill` per row, which becomes a `button.bill-pill.go` with a caret when there is something to do.

**States**

| Visit / claim | Cell words | Treatment | Flag |
|---|---|---|---|
| In queue, or Doctor to Callback (no claim yet) | "—" (screen reader: "No claim yet. The visit isn't finished.") | `--ink-faint` text, not a pill | **new**: replaces claim states on unfinished visits (G12) |
| Completed, clean claim waiting for sign-off | "Submit claim" | `button.bill-pill.warn.go` | kept |
| Completed, needs a decision (flag, missing diagnosis, card problem, question) | "Review claim" | `button.bill-pill.warn.go` | kept; **meaning changes** (N2) |
| Signed off today | "Claim submitted" | `span.bill-pill.info` | kept |
| Not billed (with a reason) | "Not billed" | `span.bill-pill`, `--wash` fill, no tone | **new** (N4) |
| Alternate payer | "Alternate payer" | `span.bill-pill`, `--wash` fill | **new** (N4) |
| No-show | "No-show billing: not decided" | dashed `--line-strong` outline, `--ink-faint` text | **placeholder** (N4) |
| Private pay | "Payment due" / "Review payment" / "Payment paid" | as today | kept (G17) |

Claims from earlier days (rejected, paid and so on) don't appear in the queue. The queue is today's day sheet, and Claims holds the rest.

**Behaviour.** The first item in the dropdown is the next step, and the second is Details (REQ-BIL-01).

| Cell | Menu item 1 | Menu item 2 |
|---|---|---|
| Submit claim | "Sign off in Claims": opens Claims on "Needs attention", scrolls to the claim in "Ready to sign off" and outlines it in `--accent` for 2 s | "Details": opens the claim detail (part 3) |
| Review claim | "Decide in Claims": scrolls to its card in "Needs your decision" | "Details" |
| Payment due / Review payment | "Mark as paid" / "Clear the payment" (unchanged) | "Details" |

**Never**
- No "Sign off & submit" in this menu (removes V2:6768, 6884-6889). Nothing in the queue submits a claim.
- No amounts.
- No badge on the normal case (rule 25).

**PRD:** CNF-09, CNF-10, TAIL-04 (sign-off happens on the screen that shows the claim); CLM-01 (a claim only for a completed visit).

**Demo**
- Every MSP row in today's queue shows "—" until the visit is finalized.
- Finalizing Gloria McDonald in the demo turns her cell into "Submit claim".
- Manjit: "Payment paid". Korynn (no-show): the placeholder.

---

## 2. Claims: sign-off (batch attestation)

**Purpose.** This is the one place where the doctor signs off his claims. Clean claims go together in one action. Flagged claims each get a decision.

**Anatomy, top to bottom** (`#screen-claims`, V2:5389)
1. `h1` "Claims". `.sub` "Every completed visit, billed and accounted for." (Today it says "Every encounter…", V2:5391; only completed visits have claims.)
2. **Demo line:** the `demo` icon plus "Fee items, amounts and explanatory codes here are demo values, not real MSP data."
3. **Demo viewer switch (new, demo only):** a `.cpt-filters`-style pair, "Viewing as: Dr. Pannozzo | Japneet (physician assistant)", tagged "Demo".
4. **Totals** (part 9).
5. **Filters** (`.cpt-filters`, Daniel's labels kept), each with its count: "Needs attention", "Submitted", "Paid", "All".
6. **"Needs attention"** shows three `.box` sections in this order: **Ready to sign off**, **Needs your decision**, **Rejected by MSP**. Within each, rows are ordered by fewest days left, then by age.
7. **A "Private pay" `.box`** sits below. It always shows, with its own rows and states. It is never mixed into the MSP sections.

### 2a. Ready to sign off (clean claims)

**Anatomy**
- **Title:** `.box-title` "Ready to sign off".
- **Summary line:** "4 clean claims · $110.00 expected", with a "Demo value" tag. The PRD asks for count and value (TAIL-04).
- **Rows** (`.cl-row`), from left to right:
  - a checkbox labelled "Include" (checked by default);
  - `.cl-who`: the name, then the service date and window;
  - `.cl-fee`: the fee item code and name with its tag, and the diagnosis below;
  - the time ("12 min");
  - `.cl-amt` with its tag;
  - the payer, only when it isn't plain MSP ("Reciprocal · Alberta");
  - `.btn.xs` "Details".
- **Sign-off statement**, above the button (`.bl-v` style, `--ink-soft`):
  > "Signing off is your attestation. You confirm these claims are for services you provided, and that the fee item, diagnosis, units and time are documented in your notes."

  This is **draft wording, Needs Daniel** (N7). It may need a qualified reviewer, and it covers the documentation affirmation in COD-10.
- **Primary button:** `.btn.dark` with `data-pdic="complete"`, "Sign off & submit 4 claims". The count follows the ticked rows ("…1 claim").

**States**

| State | Words |
|---|---|
| Default | as above |
| No rows ticked | Button disabled, with the helper "Tick at least one claim to sign off." |
| Empty | `.pc-empty` "Nothing to sign off. Claims from finalized visits land here." |
| After sign-off | The rows leave. The box shows `soStamp` plus "· 4 claims signed off and queued for MSP". Those claims now show "Claim submitted" under "Submitted". |
| Physician assistant viewing (**new**) | No checkboxes. The button is replaced by an info block (`.bl-block`, `--tag-info` fill, `user` icon): **"Only Dr. Pannozzo can sign off his claims."** "You can review claims and their flags. Signing off is his attestation, and it can't be delegated." Every decision button on this screen is disabled with the same sentence as its tooltip (CNF-04 to CNF-07; N6). |

**Behaviour**
- Unticking a row leaves that claim as "Submit claim" for later. It stays in the list and keeps counting its days.
- The button opens the **code check** (2c). Nothing is signed off until the code is confirmed.
- **Never:** a flagged claim is never in this list, and the button never signs off a flagged claim. There's no sign-off without the code check, and no undo in the demo. (Pulling a claim back before the day's transmission: **Needs Daniel**, N16.)

### 2b. Needs your decision (flagged claims, one by one)

**Anatomy.** One card per claim (a `.box` inside the section, with a `--line` border).
- **Header row:** the name, service date, fee item with its tag, the `.bill-pill.warn` "Review claim", and the days-left chip (part 4, from day 30).
- **Flag rows**, one per issue. Each row has an icon, a kind label, the finding, the reason, the confidence (AI flags only) and its own decision buttons.

| Kind label | Icon | Finding / reason (example words) | Decision buttons | After the decision |
|---|---|---|---|---|
| "AI review" + `AI_MARK` | — | "Fee item may not match the visit. The note reads as a brief follow-up; the claim uses DEMO-A." "Confidence 86%" | "Accept" / "Dismiss" | "Accepted by you · fee item changed to DEMO-B" or "Dismissed by you · Coded correctly" |
| "Health card" | `cardwarn` / `carderr` | "MSP has a different name for this card number." / "MSP coverage ended 31 Aug 2026." | "Re-check with MSP"; "Task the MOA"; for coverage ended also "Switch to private pay" and "Alternate payer" | the new stored result, or "Private pay chosen by you" |
| "Duplicate check" | `alert` | "Another claim has the same patient, date and fee item (1 Oct)." | "Not a duplicate" / "Mark not billed (duplicate)" | "Kept by you" / "Not billed · duplicate" |
| "Returned to you" + "Question from Dolly" | `chat` | see part 8 | the one-tap answers | "Answered by you · …" |
| "Diagnosis needed" | `edit` | "No diagnosis on this claim." | "Add diagnosis" | the diagnosis shown |

- **Card footer:**
  - the primary `.btn.dark` "Sign off & submit this claim";
  - `.btn` "Not billed…", which asks for a reason (part 6);
  - `.btn.xs` "Details".
- **Until every flag is decided,** the primary button is disabled, with the helper "Decide each flag first."

**Behaviour**
- **Accept on an AI flag** opens the claim detail with that field editable. The AI's suggestion is shown *beside* the current value. Nothing changes until the doctor presses "Save change" (COD-01, rule 18).
- **Dismiss** offers optional reason chips: "Coded correctly", "Documented in the note", "Other". The decision is logged (COD-06).
- **Only findings at or above the confidence threshold show here.** The default threshold is 0.80 (COD-03), and lower-confidence findings are not shown. Whether SimpleCare keeps 0.80 is **Needs Daniel** (N13).
- **Signing off this claim** uses the same code check. The check is asked once per sign-off session, not once per claim. How long a session lasts is for engineering and `privacy-security` (N14).
- **Never:** the AI never edits a field, a decision is never made for him, a flagged claim is never added to the batch, and there are no decision buttons for the physician assistant.

### 2c. Code check (simulated MFA, new)

**Anatomy:** a `.defer-overlay` with a `.defer-card` (460 px).
- `.bl-eyebrow` "Sign-off"; `.defer-ttl` "Confirm it's you".
- Body: "Enter the 6-digit code from your authenticator app to sign off 4 claims."
- One input (`inputmode="numeric"`, `autocomplete="one-time-code"`, 6 digits).
- Demo hint (`.pc-empty`): "Demo: any 6 digits work."
- `.defer-acts`: `.btn` "Cancel" and `.btn.dark` with `complete`, "Confirm and sign off".

**States**

| State | Words |
|---|---|
| Fewer than 6 digits | Button disabled |
| Wrong code (demo trigger: "000000") | "That code didn't work. Check your app and try again." |
| Success | The dialog closes. Toast: "Signed off by Dr. Pannozzo · 4 claims queued for MSP". The `soStamp` time is stored on each claim, which shows who signed off and when (REQ-BIL-08). |

**PRD:** CNF-10, SEC-02, ROLE-R6.

### 2d. Rejected by MSP

This section holds only rejections the **doctor** must act on. Rejections the MOA is fixing appear under "Submitted" as a non-interactive "Claim rejected", with the line "Dolly is fixing the patient's details. Nothing for you."

Each row shows the name, service date and fee item with its tag; the pill; one reason line ("EX-D1 · Fee item not payable with this diagnosis", tagged "Demo value"); and the days-left chip.

| Pill | Primary | Secondary |
|---|---|---|
| "Claim rejected" | "Correct": opens the detail with the coding editable; saving returns it to "Ready to sign off" | "Dispute instead": changes the state to "Potential dispute" |
| "Potential dispute" (**new**, N3) | "Sign off & ask MSP to reassess" (code check if the session has expired): it becomes "Under appeal", and the MOA gets a "Prepare reassessment" item | "Correct instead" |
| "Paid, adjusted" (**new**, N3) | "Accept": it becomes "Claim paid" | "Dispute": it becomes "Potential dispute" |

**PRD (2a–2d):** CNF-09, CNF-10, CNF-12, COD-01 to COD-03, COD-06, TAIL-04, CLM-06, APL-01, APL-05, REF-02, REF-03, SCR-02, SCR-05, SUB-04.

---

## 3. Claim detail

**Purpose.** One claim in full: the doctor's coding, the checks, the AI findings, MSP's response and its history. It opens from "Details" anywhere.

**Anatomy.** Reuse `#bill-overlay` (`.defer-card`, widened to 560 px, with a scrolling body). It keeps V2's "one modal for billing and health card" pattern (V2:6772-6804).
- **Header:**
  - `.bl-eyebrow` gives the payer: "MSP claim", "Reciprocal claim · Alberta", or "Private pay".
  - `.defer-ttl` is the state pill's words.
  - `.bl-who` reads "Name · service date · window", followed by the days-left chip.
- **`.bl-block` "Your coding"** (`.bl-k`), with "Change" (`.btn.xs`, `edit` icon) on each line. The doctor sees "Change" only in Submit claim, Review claim or Claim rejected.

  | Field | Example | Notes |
  |---|---|---|
  | Fee item | "DEMO-A · Visit" + tag | the picker lists DEMO-A to DEMO-C, each tagged; the real list Needs Daniel (N1, OQ-24) |
  | Diagnosis (ICD-9) | "DX-D3 · Yeast infection" + tag | searchable by words |
  | Units | "1" | |
  | Time | "9:12–9:24 AM · 12 min · from the call log" | editable |
  | Service location | "Virtual (phone)" | physician-only when it changes the fee (ROLE-R7) |
  | Referring practitioner | "None" | physician-only |

  The amount isn't a field. It comes from the fee item, is shown with "expected" and its tag, and can't be typed.
- **`.bl-block` "AI review" (with `AI_MARK`).** Each finding shows the finding (bold), the reason, "Confidence 86%", and "Accept" / "Dismiss".
  - Decided: "Accepted by you · 10:40 AM · fee item DEMO-A → DEMO-B" or "Dismissed by you · Coded correctly".
  - Empty: "No AI findings on this claim."
  - A fixed line: "The AI only flags. It never changes a claim."
- **`.bl-block` "Health card".** The stored check (part 7) and "Re-check with MSP".
- **`.bl-block` "MSP response"** (when there is one):
  - "Refused 26 Sep · EX-D1 · Fee item not payable with this diagnosis" (tagged);
  - "83 days left · to 25 Dec";
  - "How we count this" (disclosure). It quotes MSP: claims within 90 days of the service date, and code X within 90 days of the original claim's remittance date (gov.bc.ca, Billing and payments, checked 3 Oct 2026).
- **`.bl-block` "Disposition".** "MSP claim", with "Change" (doctor only; part 6).
- **`.bl-block` "Visit".** "Open the 2 Oct note", which links to the visit's note read-only (COD-07).
- **`.bl-block` "History".** Collapsed to the last 2 entries, with "Show all". Each entry gives the time, who, and what. Demo for Carol-Anne Feldman, 2 Oct:
  - "2 Oct 9:24 AM · Dr. Pannozzo · Visit signed off; claim created"
  - "2 Oct 9:24 AM · System · Health card checked: name doesn't match MSP"
  - "2 Oct 9:25 AM · AI review · 1 finding (86%)"
  - "3 Oct 10:40 AM · Dr. Pannozzo · Finding dismissed: coded correctly"
- **`.defer-acts`.** The state's primary action, in the same words as in Claims, plus "Close".

**Behaviour**
- **Change** opens an inline picker, and "Save change" applies it. The history logs who changed what, with the before and after values (AUD-02).
- A coding change on a claim that's already signed off but not yet sent puts it back to "Review claim" ("Changed after sign-off: sign off again"). The PRD analogue is CNF-12.
- **For the MOA** (part 10), the same coding block is read-only, with "Ask the doctor".
- **For the physician assistant**, everything is read-only.
- **Never:** the AI never applies a change, and no amount can be typed in. Below-threshold findings never show.

**PRD:** COD-01 to COD-03, COD-06, COD-07, COD-10, CNF-12, ROLE-R7, CTL-03, ELT-05, ELG-04, REF-02, REF-03, AUD-02, AUD-05.

---

## 4. Claim states and how they map

Daniel's five MSP labels are kept. The PRD states sit underneath them. New labels appear only where the doctor's next step differs from the existing labels (OQ-88).

| Today's label (V2:5796-5820) | PRD state(s) underneath (§6) | Shown to the doctor as | Doctor's next step | Who else acts | Flag |
|---|---|---|---|---|---|
| — | (no claim: the visit isn't completed) | "—" | none | — | **new** (G12) |
| Submit claim | Ingested, Pre-scrubbed, Awaiting attestation (clean) | "Submit claim" | sign off in the batch | — | kept |
| Review claim | Awaiting attestation with a flag (COD-03, SCR-04); **Returned to physician** (CNF-12); an open question (L3); disposition needed | "Review claim", with the flag kind as a sub-line | a decision on that claim | MOA (asks) | kept; **meaning changes** from "MSP query" (N2) |
| Claim submitted | Attested, Final-scrubbed, Queued, Submitted, Acknowledged; **Resubmitted** | "Claim submitted"; sub-line "Signed off 10:42 AM" or "Resubmitted 3 Oct" | none | — | kept |
| Claim submitted | **Held** (MSP is holding it, with a reason) | "Claim submitted"; sub-line "Held by MSP · EX-D5" | none unless MSP's reason needs the doctor, which makes it "Review claim" | MOA | Held under "submitted" (N2) |
| Claim rejected | **Teleplan-rejected** or **Refused**, fixable by the MOA (patient details) | "Claim rejected", not a button; "Dolly is fixing the patient's details. Nothing for you." | none | MOA corrects and resubmits (SUB-04, ROLE-R7) | (N2) |
| Claim rejected | **Refused** (coding) | "Claim rejected", with the reason, explanatory code and days left | "Correct" or "Dispute instead" | — | kept |
| *(new)* Potential dispute | Refused or Adjusted, but it appears correctly billed (APL-01) | "Potential dispute" | "Sign off & ask MSP to reassess" | MOA prepares and sends it with a note record (APL-05; gov.bc.ca: "re-submit the claim with a note record … requesting a reassessment") | **new** (N3) |
| *(new)* Under appeal | **Under appeal** | "Under appeal"; sub-line "Reassessment requested 15 Sep" | none; it can't be written off while under appeal (APL-07) | MOA tracks it | **new** (N3) |
| *(new)* Paid, adjusted | **Adjusted** | "Paid, adjusted"; "$5.00 less than expected · EX-D3" (tagged) | "Accept" or "Dispute" | — | **new** (N3) |
| Claim paid | **Paid** → **Closed** | "Claim paid" | none | — | kept |
| *(new)* Not billed | Disposition: intentionally not billed; bundled or non-billable (CLM-01, CLM-06) | "Not billed", with the reason | none | — | **new** (N4) |
| *(new)* Written off | **Written off** (two-person approval, REF-04, CTL-01) | "Written off" (only in "All"); "Proposed by Dolly · approved by a second signer" | none; reported with its history (CNF-08) | two people, never the same person twice (CTL-02) | **new**; who signs Needs Daniel (N8) |
| — | **Deleted** (two-person) | not shown; audit only | — | — | — |

**Days-left cues** (SCR-06 to SCR-10, REF-03). These show on any claim not yet accepted by MSP: Submit claim, Review claim and Claim rejected (including the MOA-fixing variant).
- **How it's counted:** 90 days from the service date. For a refused claim, the later of that date and 90 days from the remittance date (code X). Source: gov.bc.ca, Billing and payments, checked 3 Oct 2026.
- **Which rule applies to which edge case** (reciprocal claims, claims never acknowledged): verify with MSP. The rule is versioned (SCR-10).

| Day since service | Chip words (proposed; wording Needs Daniel, N12) | Treatment | PRD escalation |
|---|---|---|---|
| 1–29 | none (show by exception, rule 25) | — | — |
| 30–59 | "Day 34 · 56 days left" | `--wash` fill, `clock` icon, `--ink` text | day 30: L1 (MOA), SCR-07 |
| 60–74 | "Day 62 · 28 days left" | `.warn` tones, `clock` icon | day 60: L2; unsigned claim within 30 days of the deadline: L4 (CNF-01) |
| 75+ | "Day 80 · 10 days left" in bold | `.warn` tones, `alert` icon (never red) | day 75: L4 |
| Past the deadline | "Past the deadline" plus the pathway if one exists | `.warn`, `alert` | SCR-08, SCR-09 |

The PRD's L2 and L4 owners have no SimpleCare equivalent named yet: **Needs Daniel** (N8). Separately, a claim waiting for sign-off more than 3 business days goes into the digest (CNF-01).

---

## 5. Finalize visit

**Purpose.** Finalize closes the visit: the doctor's clinical sign-off. It also sets the visit's disposition and sends the claim to Claims. **It no longer submits anything**, and that fixes the dead branch at V2:7419.

**Anatomy** (in `#vc-finrow`, V2:4900, inside the This visit area that T-021 is rebuilding; coordinate with `product/specs/chart-shell.md` when it exists)
1. **Billing row (new)**, one line above the button. `claims` icon, then: "Billing · MSP claim · DEMO-A Visit [Demo value] · Yeast infection · 12 min", and `.btn.xs` "Change".
   - "Change" opens the coding picker from part 3.
   - The "+ Diagnosis" chip (V2:4895), which only shows a toast today, opens the same picker.
   - Where the doctor codes is **Needs Daniel** (N1). This row is the proposal, because it is the fewest clicks: he codes while the visit is fresh and signs off later in a batch.
2. **The button, kept:** `.btn.dark` with `complete`, **"Sign off & finalize visit"** (V2:4902). These are Daniel's words: *"I 'sign off' on the chart … It means that i've finalized the visit"* (D-71).
3. **Helper line under the button (new),** `--ink-soft`, 14 px: "Your claim goes to Claims for sign-off. Nothing is sent to MSP yet."

**Billing-row states**

| Case | Words |
|---|---|
| Coded, card verified | "Billing · MSP claim · DEMO-A Visit · [diagnosis] · 12 min" + "Change" |
| No diagnosis | "Billing · MSP claim · Diagnosis not set" + "Add diagnosis" |
| Card problem | "Billing · MSP claim · Health card: coverage ended 31 Aug" + "Change" |
| Private pay | "Billing · Private pay · Private visit fee [Demo value]" |
| Not billed chosen | "Billing · Not billed · [reason]" + "Change" |

**Behaviour on press**
- **D-65's behaviour is kept:** it asks first on an empty note or template text, ends a live call, sets Completed, stamps and locks the note, and offers the next patient.
- **T-021 / D-106's gate is kept:** it is blocked until the this-visit strip is complete.
- **It creates the claim:**
  - "Submit claim" when it's clean;
  - "Review claim" when there's a flag, no diagnosis, or a card problem;
  - or no claim, with the disposition "Not billed", "Alternate payer" or "Private pay".
- **It attaches the stored health-card check** to the claim (ELT-05).
- **Toast:** "Signed off by Dr. Pannozzo · Gloria moved to Completed · claim waiting in Claims".

**Never**
- It never submits to MSP, and it never counts as the attestation (CNF-09).
- It never asks for the code check.
- Billing never blocks Finalize. A billing problem becomes "Review claim", not a stop. (CLM-04 blocks *financial* closing, not the clinical sign-off.)

**PRD:** CNF-09, COD-04, CLM-01, CLM-04, ELT-05. Also D-65, D-71, D-106, REQ-BIL-05 (superseded by this flow), REQ-BIL-08.

---

## 6. Encounter disposition

**Purpose.** Every completed visit resolves to **exactly one** disposition, so no visit goes unaccounted for (CLM-01 to CLM-06; REQ-BIL-10).

**Anatomy**
- A single-choice radio list, inside "Change" on the billing row and in the claim detail's "Disposition" block.
- Under the selected choice: the reason, or the payer, when one is needed.

| PRD disposition | Picker words | Queue / Claims label | Needs | Who sets it | Flag |
|---|---|---|---|---|---|
| Submitted claim | "MSP claim" (or "Reciprocal claim" for an out-of-province card) | the claim state (part 4) | — | default at Finalize; the doctor | kept |
| Intentionally not billed | "Not billed" | "Not billed" | a reason (required): chips "Doctor's choice", "Duplicate", "Other", plus free text | the doctor | **new** (N4); the reason list Needs Daniel |
| Bundled or non-billable | "Bundled or not billable" | "Not billed", with the sub-line "Bundled" or "Not billable" | which visit it's bundled with (optional) | the doctor | **new** (N4) |
| Alternate payer | "Alternate payer" | "Alternate payer" | which: "WorkSafeBC", "ICBC", "Other" | the doctor | **new**; whether SimpleCare bills these Needs Daniel (N4) |
| Private pay | "Private pay" | the private states (unchanged) | — | the doctor; the MOA before the visit (ELT-08); after the visit, Needs Daniel (N10) | kept |
| Documented exception | (not pickable) | "Review claim" (doctor) / an MOA item | — | the system, when no disposition is set or it can't be resolved (CLM-03) | **new** |

**Proposed default at Finalize** (an assumption, for Daniel to confirm; no extra click in the common case):

| Health card | Default disposition |
|---|---|
| Verified | MSP claim |
| Out of province (reciprocal) | Reciprocal claim |
| Out of province (Quebec) | Private pay |
| Private pay | Private pay |
| Check required, Invalid card, Coverage ended | MSP claim, flagged "Review claim" until it's resolved |

**Behaviour**
- Choosing one replaces the previous choice, and the change is logged.
- "Not billed" without a reason can't be saved: "Add a reason to save."
- **Never:** a completed visit is never left with no disposition, and never has two.

**No-show (N4, Needs Daniel): placeholder only.**
- Korynn's queue cell shows the dashed "No-show billing: not decided".
- In Claims "All", a dashed card reads: "Whether a no-show is billed, and how, isn't decided yet."
- No claim, amount or disposition is created for a no-show.

**PRD:** CLM-01 to CLM-06, ELT-08, ELG-03, REC-01, REC-02.

---

## 7. Health card

**Purpose.** It shows whether MSP covers the patient on the date of service, and the next step if not. It is a stored, timestamped result, never a guess.

**Anatomy**
- The existing `.q-ver` chip in the queue's card column, with `CARD_ICON`.
- "Verified" is plain text. Every other result is a `button.q-ver.go` that opens `#bill-overlay` in card mode, with "What this means", "What happens next", the stored check and the actions.

| PRD result | Chip words | Tone / icon | What this means | What happens next | Actions | Flag |
|---|---|---|---|---|---|---|
| Eligible | "Verified" | `.ok` / `cardok`; plain | (tooltip) "Checked 3 Oct, 7:42 AM, for today's visit" | — | — | kept; replaces "Checked against MSP this morning" (V2:5782), which implied an overnight check |
| Demographic mismatch: name | "Check required" | `.warn` / `cardwarn` | "MSP has a different name for this card number." | "Confirm the patient's legal name on the call, or ask the MOA to correct it. Then re-check." | "Re-check with MSP", "Task the MOA" | kept; cause shown (OQ-89) |
| Demographic mismatch: DOB | "Check required" | same | "MSP has a different date of birth for this card number." | same | same | kept |
| Missing PHN | "Check required" | same | "There's no card number on file." | "Ask the patient for it on the call, or ask the MOA." | "Task the MOA" | kept |
| Teleplan unavailable | "Check required"; sub-line "MSP not responding · retrying" | same | "MSP's eligibility check isn't responding. It retries automatically and checks again before the claim is sent." | — | "Re-check with MSP" | **new cause** (ELT-09) |
| Not eligible | "Invalid card" | `.warn` (was `.bad`) / `carderr` | "MSP says this card isn't valid for 3 Oct." | "The visit can go ahead. Before billing: correct the card number, bill another payer, or bill the patient privately." | "Re-check with MSP", "Task the MOA" | kept. Remove "coverage lapsed on a premium" (V2:5787): MSP premiums ended 1 Jan 2020 (gov.bc.ca, Premiums, checked 3 Oct 2026) |
| Coverage ended | "Coverage ended · 31 Aug" | `.warn` / `carderr` | "MSP coverage for this card ended on 31 Aug 2026." | same as Invalid card | same | **new** (OQ-89) |
| Out of province, reciprocal | "Out of province · Alberta" | `.info` / `cardinfo` | "Alberta card. MSP can't check it here; it's billed as a reciprocal claim." | "Confirm the card on the call." | — | **new** (N4; ELT-07). Reciprocal rules: verify with MSP (N11) |
| Out of province, Quebec | "Out of province · Quebec" | `.info` / `cardinfo` | "Quebec doesn't take part in reciprocal medical billing." | "This visit is private pay, or the patient claims it back from Quebec." | — | **new** (ELT-07, ELG-03); reimbursement handling Needs Daniel (N11) |
| (a payer, not a result) | "Private pay" | `.info` / `cardinfo`; plain | "Paying privately. There's no MSP card to check." | — | **none**: remove "Task the MOA" (V2:6801) | kept |

**The stored check** (new; the same line in the card dialog and the claim detail): "Checked 3 Oct, 7:42 AM · for a 3 Oct visit · at check-in". Earlier checks are listed beneath it, newest first (ELT-03, ELT-05, ELG-04).

**"Re-check with MSP" behaviour**
1. The button shows "Checking…" while it's disabled. The PRD target is under 5 seconds (ELT-01).
2. The result replaces the chip, and a new timestamped entry is added to the list.
3. Toast: "Re-checked · [result]". For example: "Re-checked · still: name doesn't match MSP".
4. **Never** does it silently flip to "Verified" with no new input (today's `billingAct()` does, V2:6808-6812).
5. In the demo, a re-check returns the same result with a new time, because the two portals don't share state.

**When it runs:** at check-in (when the patient joins the queue) and again before submission (ELG-01). The overnight check (ELT-06) isn't decided for SimpleCare, so nothing on screen implies it.

**PRD:** ELT-01, ELT-03, ELT-05, ELT-07 to ELT-09, ELG-01 to ELG-04.

---

## 8. Daily billing digest and questions on claims (L3)

### 8a. Digest card

**Purpose.** One daily summary instead of a reminder per claim (CNF-02).

**Placement.** A `.box` on Home (T-020). The same card sits at the top of Claims only when Home isn't built yet. Placement is **OQ-90, Needs Daniel**.

**Anatomy**
- `.box-title` "Billing today".
- Up to 5 lines, each a link into the right Claims section. Zero lines are hidden (rule 25). Deadline risk comes first:
  1. `alert` icon: "1 claim has 10 days left to submit"
  2. "4 clean claims ready to sign off · $110.00 expected" + "Demo value"
  3. "4 claims need your decision"
  4. `chat` icon: "1 question from Dolly · answer by Tue 6 Oct"
  5. "2 claims rejected by MSP"
- `.btn.dark` with `claims`: "Open Claims".
- Caption, `--ink-faint`: "Updated today, 7:00 AM". The time is a demo value; the real time Needs Daniel.

**States**
- Empty: one quiet line, "Billing is up to date." (the same pattern as Needs Attention).
- Physician assistant: the same card, read-only, with the sentence "Dr. Pannozzo signs these off."

**Never**
- One notification per claim (CNF-02).
- Patient names on the card, or in any notification or push (APP-03).

### 8b. A question on a claim (L3)

**Purpose.** The MOA (or a check) needs the doctor's answer about a field only he can change (ROLE-R7). The PRD's L3 item gives the context, the exact question and one-tap answers (ESC-09).

**Anatomy.** A flag row inside the claim's "Needs your decision" card (2b) and in the claim detail. **It is never shown in Assigned Tasks.**
- Kind label "Question from Dolly", with the `chat` icon.
- **Context** (`--ink-soft`): "15 Jul visit · DEMO-A · DX-D7 [Demo value]. Teleplan returned the claim because of the diagnosis code (EX-D4, demo)."
- **The question** (bold, Dolly's words): "Can you check the diagnosis on this claim?"
- **One-tap answers** (`.btn`):
  - "Fix it now": opens the claim detail with the diagnosis editable;
  - "The diagnosis is right · resubmit as is": Dolly resubmits it, and the doctor's answer is logged as his confirmation (QUE-08).
- **Due:** "Answer by Tue 6 Oct".
  - The PRD's escalation table gives L3 **2 business days** (PRD §8). The question was raised Fri 2 Oct, and business days exclude weekends and BC statutory holidays (ESC-02).
  - **Note:** B-005, REQ-BIL-13 and the T-023 brief say 1 business day. The PRD table says 2. This spec follows the PRD. **Needs Ani** (N9): the lead corrects B-005, and `product-manager` corrects REQ-BIL-13.

**States**

| State | Words |
|---|---|
| Open | as above |
| Overdue | "Overdue since Tue 6 Oct" (`.warn`, `alert`). It escalates (ESC-10), and the L4 owner at SimpleCare Needs Daniel (N8). |
| Answered | "Answered by Dr. Pannozzo · 3 Oct, 10:45 AM · 'The diagnosis is right · resubmit as is'". The flag counts as decided. The MOA sees the answer on her item. |

### 8c. Rule 12 tension (N5, Needs Daniel) and a compliant wording

Rule 12 says tasks travel doctor → MOA only, and the MOA never creates one for the doctor. A question from the MOA to the doctor could read as exactly that. **Proposed wording** for Daniel to approve; the lead would then add it to the handbook, which isn't this spec's job:

> **A question on a claim is not a task.** When only the doctor may change a claim field (fee item, diagnosis, units, time, a fee-changing location or the referrer), the MOA may attach one question to that claim. The doctor answers it in Claims, usually with one tap. It never appears in his task list, has no assignee, asks only for an answer about that claim, and takes its due date from the billing rules.

**How the build honours it**
- No "task", "assign" or "to-do" anywhere in the words.
- The question has no place in Assigned Tasks or the task counts.
- It lives on the claim and in the digest's count only.

**Fallback if Daniel says no.** The MOA marks the item "Needs the doctor's coding". The system raises the question itself, in the same place and with the same words except the "from" line.

**PRD:** CNF-01, CNF-02, ESC-02, ESC-09, ESC-10, QUE-04, QUE-05, QUE-08, APP-03. §8 table: L3 deadline is 2 business days.

---

## 9. Totals

**Purpose.** Show the money truthfully. Every figure names its basis. MSP and private pay are never added together, and expected and estimated are never added together (REC-09, PRD §1 definitions).

**Anatomy.** `.cl-stats` in two labelled groups, so private pay is never in the same group as MSP.
- **Group "MSP"**, four `.cl-stat`:

  | `.k` | `.v` | `.s` |
  |---|---|---|
  | "Ready to sign off" | 4 | "$110.00 expected" |
  | "Needs your decision" | 4 | "Amounts after your decision" (no dollar figure, because the coding may change) |
  | "With MSP" | 3 | "$60.00 expected · 1 under appeal" |
  | "Rejected" | 3 | "$90.00 billed, not paid" |
  | "Paid this cycle" | 2 | "$55.00 paid · 1 adjusted, $5.00 less than expected" |

- **Group "Private pay"**, two `.cl-stat`:

  | `.k` | `.v` | `.s` |
  |---|---|---|
  | "Payment due" | 1 | "$100.00 due" |
  | "Payment paid" | 1 | "$100.00 paid" |

- Every dollar figure carries the "Demo value" tag.

**Rules**
- **Basis words:**
  - "expected" for an amount calculable from published rules;
  - "estimated" for a modelled amount;
  - "paid" for remittance;
  - "billed" for the claimed amount;
  - "due" for private pay.
- **Never mixed:** no figure adds MSP to private pay, expected to estimated, or paid to unpaid. Flagged and not-billed visits have no dollar figure.
- **Estimated in the demo** appears in one place only: the Under appeal claim's detail, "Possible recovery $30.00 estimated". An appeal's outcome isn't calculable, so it is never in a total. Whether any SimpleCare MSP figure is ever "estimated" in practice is **Needs Daniel** (N13).
- **Private rows never show MSP fee codes** (G13). They show "Private visit fee", tagged.
- **Remove:**
  - "$… unbilled", which summed rejected and private rows (V2:6718);
  - "$… awaiting adjudication" (V2:6719).
- **"This cycle"** is one MSP payment cycle (PRD §1 definitions).

**PRD:** REC-08, REC-09, PRD §1 definitions (expected, estimated, payment cycle), TAIL-04.

---

## 10. MOA portal billing queue

**Purpose.** Dolly's one place to fix what she's allowed to fix (patient details and clerical fields), and to ask the doctor about what she isn't. Today, MOAP has no billing at all (MOAP:207-217).

**Design basis.** MOAP's existing classes:
- `.box`, `.box-title`, `.box-note`;
- `.row` (`.t`, `.d`, `.who`, `.acts`);
- `.pill` (`.warn`, `.info`, `.good`, `.mut`);
- `.seg` filters, `.btn`, `.nav-btn` with `.nav-flag`, `.empty`, and its own `data-ic` icon map.

Where its map has no billing icon, copy V2's `claims` Mage icon into it. Don't use `.tasktype` for billing: it is uppercase (MOAP:93), which breaks rule 23. **MOAP has no dark theme** (only the build stamp has a dark rule, MOAP:198), so "light and dark" for MOAP is **Needs Ani** (N15).

**Anatomy**
- **Navigation:** under "Work", after "Tasks from physicians": "Billing", with a `.nav-flag` count of open items.
- **Header:** `h1` "Billing". `.sub` "Claims that need a fix before MSP pays. You can correct patient details; coding stays with the doctor."
- **Filters:** `.seg` with "Open · 3", "Waiting on the doctor · 3", "Done · 0".
- **Rows** (`.row`), ordered by deadline, then loss risk, escalation level, age, and amount (QUE-02):
  - a `.pill` kind: "Teleplan rejection", "MSP refusal", "Held by MSP", "Health card", "Patient details", "Reassessment";
  - `.t`: the name and the visit date;
  - `.d`: the issue, then the suggested fix;
  - `.who`: "Owner: Dolly · Due Mon 5 Oct", plus the days-left words from day 30 (part 4);
  - `.acts`: `.btn` "Open".
- **Item detail** (a panel in the screen, `.box` sections) shows the issue, suggested fix, history, owner, level and deadline (QUE-03):
  1. **"What came back":** the source (Teleplan or MSP), the date, and the explanatory code with its reason (tagged).
  2. **"Suggested fix":** one sentence.
  3. **"Patient details" (editable):**
     - PHN (a masked input, "•••• ••• •••", tagged; the demo accepts any 10 digits and stores nothing);
     - legal name; date of birth (masked, tagged); sex;
     - clerical fields: "Note to MSP" (the note record text).
  4. **"Coding" (read-only):** fee item, diagnosis (ICD-9), units, time, service location (when it changes the fee) and referring practitioner.
     - Each field is shown in `--ink-soft` with the line "Only the doctor can change this."
     - One `.btn` "Ask the doctor".
  5. **"History and messages":** every event and message, which stay in the claim history (QUE-05).
  6. **Actions:** they depend on the item (below).

**Actions and their words**

| Item | Primary | Secondary | Result |
|---|---|---|---|
| Teleplan rejection, or MSP refusal for patient details | "Save and resubmit" (enabled once an editable field changes) | "Ask the doctor"; "Mark done" | Toast "Resubmitted · Carol-Anne Feldman, 29 Sep claim"; the doctor's view shows "Claim submitted · Resubmitted 3 Oct" |
| Held by MSP | "Mark done" (requires "What did you do?") | "Ask the doctor" | Closed with a note (ESC-11) |
| Health card | "Re-check with MSP" | "Record new card number"; "Mark done" | the new stored result |
| Coding refusal / question sent | (none; it sits in "Waiting on the doctor" as "With Dr. Pannozzo") | — | moves to Open when he answers or corrects |
| Reassessment authorised by the doctor | "Send to MSP" (after writing the note record) | — | Under appeal (APL-05) |

**"Ask the doctor" composer** (a `.box` inline):
- The context is filled in for her: claim, date, field and MSP's reason.
- "Your question" (a required text field).
- "Answers he can tap": two editable suggested answers.
- "Send to Dr. Pannozzo".

The item moves to "Waiting on the doctor". The question appears on the doctor's claim and in his digest count (part 8). **Words never say "task".**

**Tasks from physicians.** When the doctor uses "Task the MOA" on a health-card flag, it arrives here as a doctor → MOA task (rule 12 allows this direction) of a new kind, "Billing", linked to its billing item. This replaces the generic task V2 creates today (V2:6814).

**Today screen.** Billing items at day 60 or later appear in "Needs attention now".

**Never**
- No editing of coding (ROLE-R7, CTL-03).
- No sign-off or attestation (CNF-10).
- No resubmission after a coding change without the doctor (QUE-08).
- No write-off alone: "Propose write-off" needs a second signer, and can never be approved by its proposer (REF-04, CTL-02). Who the second signer is at SimpleCare is Needs Daniel (N8).

**PRD:** ROLE-R7, CTL-02, CTL-03, QUE-01 to QUE-05, QUE-08, SUB-04, ELG-02, ESC-11, REF-04, APL-05.

**Demo items**

| Filter | Item | Pill | Issue → suggested fix | Due / days |
|---|---|---|---|---|
| Open | Carol-Anne Feldman, 29 Sep | Teleplan rejection | "Name on the claim doesn't match MSP's record for this card (EX-D2, demo)" → "Confirm the legal name with the patient, correct it, resubmit." | Due Mon 5 Oct |
| Open | Owen Brady, 25 Aug | Held by MSP | "MSP is holding this claim (EX-D5, demo)" → "Check the explanatory code and send what MSP asks for." | Day 39 · 51 days left |
| Open | K Arli Eyre, 30 Sep | Health card | "Coverage ended 31 Aug 2026 (demo)" → "Ask the patient about coverage. If there's none, the doctor chooses private pay, another payer, or not billed." | Due Mon 5 Oct |
| Waiting on the doctor | Nadia Hassan, 15 Jul | Teleplan rejection | "Diagnosis code problem (EX-D4, demo)" → "Question sent: can you check the diagnosis?" | **Day 80 · 10 days left** |
| Waiting on the doctor | Behdis Maleki, 12 Sep | MSP refusal | "Fee item not payable with this diagnosis (EX-D1, demo)" → "With Dr. Pannozzo: coding." | Day 21 · 83 days left (chip hidden before day 30) |
| Waiting on the doctor | Andrey Abushakhmanov, 5 Sep | Reassessment | "Looks correctly billed (EX-D2, demo)" → "Waiting for Dr. Pannozzo to authorise a reassessment." | Day 28 · 76 days left |

---

## Demo data, all in one place

These are existing demo names only, from V2's `QUEUE_DATA` and day sheets (V2:5757-5775, 5859-5861) and MOAP. There are no PHNs or DOBs. Every code and amount is tagged "Demo value". "Today" is Sat 3 Oct 2026.

**Today's queue** (the health card and billing columns)

| Patient | Visit status | Health card | Billing cell |
|---|---|---|---|
| Gloria McDonald | In queue (next) | Verified | "—"; after the demo Finalize, "Submit claim" (DEMO-A, chest pressure, joins Ready to sign off) |
| Andrey Abushakhmanov | In queue | **Out of province · Alberta** (was Verified) | "—" |
| Carol-Anne Feldman | In queue | Check required (name) | "—" |
| Behdis Maleki | In queue | Verified | "—" |
| K Arli Eyre | Doctor to Callback | **Coverage ended · 31 Aug** (was Invalid card) | "—" |
| Greg | Doctor to Callback | Private pay | "—" |
| Manjit | Completed | **Invalid card** (was Private pay), so private pay | "Payment paid" |
| Korynn | No-show | **Out of province · Quebec** (was Private pay) | the no-show placeholder |

**Claims** (MSP unless marked)

| Patient | Service date | Coding (all demo) | State | Detail |
|---|---|---|---|---|
| Behdis Maleki | 2 Oct | DEMO-A · follow-up · 14 min · $30.00 | Submit claim | clean |
| Andrey Abushakhmanov | 2 Oct | DEMO-A · follow-up · 11 min · $30.00 | Submit claim | clean; "Reciprocal · Alberta" |
| Grace Lin | 1 Oct | DEMO-B · lab review · 8 min · $20.00 | Submit claim | clean |
| Owen Brady | 1 Oct | DEMO-A · back pain · 13 min · $30.00 | Submit claim | clean |
| Carol-Anne Feldman | 2 Oct | DEMO-A · yeast infection · 12 min | Review claim | AI: fee item may not match the visit (86%); health card: name mismatch |
| Nadia Hassan | 15 Jul | DEMO-A · DX-D7 | Review claim | Returned to you + question from Dolly; **day 80 · 10 days left** |
| K Arli Eyre | 30 Sep | DEMO-A | Review claim | health card: coverage ended 31 Aug |
| Grace Lin | 1 Oct | DEMO-B | Review claim | duplicate check (same patient, date and fee item) |
| Behdis Maleki | 12 Sep | DEMO-A | Claim rejected | EX-D1; refused 26 Sep; 83 days left (to 25 Dec, code X window) |
| Andrey Abushakhmanov | 5 Sep | DEMO-A | Potential dispute | EX-D2; refused 19 Sep; 76 days left (to 18 Dec) |
| Grace Lin | 10 Sep | DEMO-A | Paid, adjusted | $25.00 paid, $5.00 less than expected; EX-D3 |
| Andrey Abushakhmanov | 28 Sep | DEMO-A | Claim submitted | acknowledged |
| Owen Brady | 25 Aug | DEMO-A | Claim submitted · held by MSP | EX-D5; day 39 · 51 days left |
| Carol-Anne Feldman | 29 Sep | DEMO-A | Claim rejected (Dolly fixing) | Teleplan rejection, name |
| Nadia Hassan | 20 Aug | DEMO-A | Under appeal | reassessment requested 15 Sep; possible recovery $30.00 estimated |
| Behdis Maleki | 2 Sep | DEMO-A | Claim paid | $30.00 paid 16 Sep |
| Gloria McDonald | 24 Sep | — | Not billed | reason "Doctor's choice" |
| Frank D. | 2 Jul | DEMO-A | Written off | "Past the deadline, no pathway"; proposed by Dolly, approved by a second signer |
| Greg | 30 Sep | Private visit fee $100.00 | Payment due | private |
| Manjit | 3 Oct | Private visit fee $100.00 | Payment paid | private |

**Counts that follow from this data**
- Needs attention: 11 (4 ready, 4 to decide, 3 rejected by MSP). This is also the Claims nav count.
- Submitted: 4. Paid: 2 (including Grace Lin's adjusted claim once accepted).

**Code changes this implies (for `ux-designer`)**
- Replace `FEE_ITEM` and `feeFor()`.
- Replace `BILL_STATUS`, `BILL_NEXT`, `BILL_DO` and `BILL_SAID`.
- Remove the `pending`/`none` branch in `finalizeVisit()`.
- Rows get `card` values `ended`, `oop` and `oop-qc`.
- Claims reads a `CLAIMS` array with dates, instead of only `QUEUE_DATA`.

---

## Open points

| # | Point | Owner |
|---|---|---|
| N1 | Where the doctor codes a visit (the proposal is the billing row above Finalize), and who supplies the real fee items (OQ-24). | Needs Daniel |
| N2 | "Review claim" now means "your decision is needed"; MSP holds sit under "Claim submitted"; MOA-fixable rejections show as a non-interactive "Claim rejected". | Needs Daniel |
| N3 | Add "Potential dispute", "Under appeal" and "Paid, adjusted" as states. | Needs Daniel |
| N4 | Add "Not billed" (with a reason), "Alternate payer" and the "Out of province" card cause. Is a no-show billable, and how? (Placeholder shown.) Does SimpleCare bill WorkSafeBC or ICBC? | Needs Daniel |
| N5 | A question on a claim from the MOA (L3) under rule 12: approve the "not a task" wording in 8c, or use the system-raised fallback. | Needs Daniel |
| N6 | May the physician assistant ever sign off claims? (The build blocks it, per Ani's decision and CNF-04 to CNF-07. Note that the handbook's rule 12 treats her actions as the doctor's.) | Needs Daniel |
| N7 | The sign-off statement wording (2a), including the documentation affirmation (COD-10). | Needs Daniel; may need a qualified reviewer |
| N8 | Who at SimpleCare is the second signer for write-offs (REF-04, CTL-01), and who owns L2 and L4 escalations, including an overdue question. | Needs Daniel |
| N9 | **Correction:** the PRD §8 table gives L3 questions 2 business days, but B-005, REQ-BIL-13 and the T-023 brief say 1. This spec uses 2. | Needs Ani (the lead corrects B-005; `product-manager` corrects REQ-BIL-13) |
| N10 | After a visit, may the MOA switch a visit to private pay, or only the doctor? (ELT-08 covers before the visit.) | Needs Daniel |
| N11 | Reciprocal claim rules, and Quebec reimbursement handling. No official MSP reciprocal page was found on 3 Oct 2026; the Quebec exclusion comes from the PRD. | Needs Daniel; verify with MSP |
| N12 | Days-left chip wording, and the counting edge cases (code X window, reciprocal, claims never acknowledged). | Needs Daniel (words); verify with MSP (rules) |
| N13 | Keep the AI flag threshold at the PRD default of 0.80? Is any SimpleCare MSP amount ever "estimated"? The digest's time of day. | Needs Daniel |
| N14 | How long one code check lasts across a sign-off session. | Needs Ani, to route to engineering and `privacy-security` |
| N15 | Design: no red for "Claim rejected" and "Invalid card" (a change from today, rule 21); the digest's placement on Home (with T-020); MOAP has no dark theme, so is "light and dark" in scope for MOAP? | Needs Ani |
| N16 | Can a signed-off claim be pulled back before the day's transmission? Should a single clean claim ever be signed off from the queue? (Currently no to both.) | Needs Daniel |
| N17 | The private visit fee ($100, V2:5403) is unsourced, so it's shown as a demo value. OQ-25 (is private pay automated?) is still open. | Needs Daniel |

---

## Top 3 findings or asks, ranked by impact
1. **Finalize no longer submits; the doctor signs off in Claims with one button for clean claims.** This fixes V2's broken path both ways: the dead branch at Finalize, and the queue submitting a claim he never saw. Flagged claims each get a decision first, and the AI never edits (CNF-09, CNF-10, COD-01).
2. **Rejections reach the right person, with the reason and the days left.** Patient-detail fixes go to Dolly's new Billing queue. Coding goes to the doctor with Correct or Dispute, counted against MSP's published 90-day and code X rules (gov.bc.ca, checked 3 Oct 2026).
3. **Two corrections to our own documents.** The L3 deadline is 2 business days in the PRD, not 1 (N9). And the MOA-to-doctor question needs Daniel's ruling under rule 12 (N5, wording proposed in 8c).

## What needs Daniel
N1–N8, N10–N13, N16 and N17 above. The most important first: N1 (where coding happens and the real fee items), N5 (questions under rule 12), N6 (the physician assistant), N7 (the sign-off statement), then N2–N4 (the state words).

## What needs Ani
- Approve this spec so the T-023 build can start after T-021.
- N9: have the lead correct B-005, and `product-manager` correct REQ-BIL-13.
- N14: route the code-check session length to engineering and `privacy-security`.
- N15: no red for billing; the digest's placement on Home; whether MOAP gets a dark theme in this task.
