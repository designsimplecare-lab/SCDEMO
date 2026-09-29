# Training results: `billing-msp`

- **Date:** 2026-09-29.
- **Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md`, `02-evidence.md`, `product/process.md`,
  `product/team.md`, `.claude/agents/billing-msp.md`.
- **Evidence read:** all four `from-daniel/` files (21, 26, 27, 29 Sep); `shadowing/2026-09-25-rx-renewal-by-fax.md`;
  `product/reports/integrations-engineer-2026-09-26-roadmap.md` §6 (Teleplan).
- **Checked by grep only:** `simplecare-physician-portal-v2.html` (billing states), `product/open-questions.md`
  (OQ-24, OQ-25, OQ-51), `product/requirements.md` (REQ-BIL-07), `product/tasks/TEMPLATE.md`. Nothing edited, nothing browsed.
- **Not read:** `private/`. Nothing from it is used here.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, P = `process.md`, T = `team.md`, BM = `billing-msp.md`,
  D21 / D26 / D27 / D29 = `from-daniel/2026-09-2x-*.md`, RM = the integrations roadmap, V2 = the physician portal v2,
  OQ = `open-questions.md`.

---

## Part 1: Core exam

### 1. ★ Privacy
The md file says "the patient" and describes the clinical story, the screen and the friction in general terms; quotes
that contain the first name get "[the patient]" instead. The full name, first name, PHN and pharmacy name and address
stay out, and so do date of birth, phone and email. Frames live only in the session scratchpad; the md describes a
frame and never embeds one. **Source:** R7 ("Write 'the patient'", "Recording frames stay in the scratchpad only"); T:115-117.

### 2. ★ No invention
I write no quantity: it is a clinical rule, so I mark it **Needs Daniel** and carry on with whatever doesn't depend on
it. The question goes to `product-manager` for the batched list, and Ani sends it; I contact no one. (Shadowing 1's
"ninety" is one observed visit, not a rule.) **Source:** R6; R4 ("`product-manager` prepares ... Ani sends it"); P §8.

### 3. ★ Stay in your lane
I don't fix it: only `ux-designer` and `frontend-engineer` edit prototype HTML, and a scope change means stop and
report. I note it in my report (file, line, what is wrong, the suggested fix) and tell the lead, who can open a task.
**Source:** R3 ("Everyone else writes a report"); P §2.4 ("the owner stops and reports").

### 4. Calls
No. Calls go outward only: the doctor phones the patient in the call window, and patients never call the doctor. The
most it could offer is the office line, for admin only. **Source:** R10; H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and **no wait estimates**; show the patient's place in the
queue instead. **Source:** R11; H0 glossary, "We show the position, not a wait estimate."

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly files the
fax so it reaches the doctor's inbox, or replies on the related task, or messages him in the MOA chat (**assumption**
on the exact route). Whether Japneet may send tasks in her own right is still Needs Daniel. **Source:** R12; D29
("the messenger (MOA chat)").

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we're doing and why; tasks are practical doctor → MOA to-dos. They stay
separate, and so does the Care Plan Tracker. Only Daniel can change that. **Source:** R13; H0 glossary "Care plan"; D26 §3.

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who said they arranged it. "Please start bisoprolol" becomes the
GP's action. **Source:** R15.

### 9. ★ Sign-off
"Reviewed" is a **state**: the doctor is assessing, and nothing happens yet. "Sign off" is an **accountable action**
under the doctor's name: signing the chart finalizes the visit, faxing a script signs off the prescription, and
submitting a bill signs off the billing ("my a** is on the line"). So approving buttons must say they sign off, and
whose name goes on them; a button that submits a claim as a side effect, without saying so, breaks this (OQ-51).
**Source:** D26 §2; R16; H0 glossary.

### 10. Renewals
Either one; it is the doctor's call each time, and neither is the default. He keeps favourite scripts pre-populated;
they live in the Rx function and he manages them. The sign-off is always his, even when Japneet sends it. **Source:**
D26 §1 ("Either can send"); D27 §2-3 ("They live in the Rx function. I manage them.").

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1, and agent reports are level 7. I don't quietly pick one. I note the
conflict in my report, citing both, so `product-manager` can log it in `open-questions.md`. **Source:** `02-evidence.md`
table, "When sources conflict, say so".

### 12. Process
The lead writes `product/tasks/T-NNN-inbox-*.md` from the template and adds it to the board. "Better" is ambiguous, so
the lead asks Ani what she means before it is Ready. Triage: Design type, owner `ux-designer`, gates `qa-engineer`
(prototype UI) and `clinical-safety` (results), with acceptance criteria and inputs linked. The owner works in scope,
the gates write pass/fix/block reports, then Ani approves (and Daniel, for clinical content). The lead commits,
deploys and checks the build stamp, and `product-manager` updates the statuses. **Source:** P §2, §4, §8; R24a.

### 13. Design rules
(1) Text is ink and colour goes on icons; red is for critical only. (2) Nothing a physician reads is under 14px, and
buttons are 44px with an icon. (3) No uppercase styling: sentence case everywhere. (4) Mage Icons only, from the
prototype's icon maps. (5) Show by exception, with progressive disclosure. **Source:** R21-R25.

---

## Part 2: Role drill — what must be verified before the prototype says anything about claim time limits

**1. The task I'd expect.** `T-NNN-claim-time-limits`. Type: Research, then Content. Owner: `billing-msp`.
Contributors: `integrations-engineer` (Teleplan records), `content-designer` (wording). Gates: `clinical-safety`
(sign-off, R16; process table), `qa-engineer` if the UI changes, and `tech-lead` if it needs a live Teleplan feed.
Acceptance criteria: every limit, date or "expires" line in V2 and the MOA portal is listed; each one is either cited
(official URL plus the date checked) or marked **Needs Daniel / verify with MSP**; no number reaches the prototype without a source.

**2. What's in the prototype today (from grep, nothing edited).**
- V2:5612-5613, "Claim rejected": "Refusals expire, so this is time-limited" and "resubmit within the window". Unsourced (OQ-24, REQ-BIL-07).
- V2:6487-6494: fee codes and dollar amounts in `FEE_ITEM`. Unsourced (same OQ).
- V2:5603-5627: the MSP states (submit / submitted / review / rejected / paid) and private pay (due / review / paid).
- V2 "Finalize" submits the claim with no review (OQ-51). That decides when the clock would start.

**3. What I'd verify, in order.**
1. **The submission limit:** how long after the service date a claim may be sent, and whether virtual or telephone
   visits differ. Source: the official MSP Payment Schedule / Preamble and Teleplan pages, with the date checked.
2. **Resubmitting after a refusal:** whether a refused claim has its own window, and whether it runs from the service
   date or the refusal date. "Refusals expire" is not proven until then.
3. **The date and the signal:** what date the clock uses (service, submission, remittance) and which Teleplan record
   carries it. RM §6 cites C12 pre-edit refusals, remittances "twice a month" and nightly processing
   "normally at 7:00 p.m." [S22a]; I'd re-check that at the source rather than trust a report (level 7).
4. **Exceptions:** e.g. retroactive coverage, out-of-province patients, or a card that was invalid and then fixed.
   These are **Needs Daniel / verify with MSP**, not guesses.
5. **Private pay:** whether any time limit applies at all, or it's a clinic policy. That's Daniel's (OQ-25).
6. **The software:** whether today's billing vendor already tracks these limits (RM A11). **Needs Ani.**

**4. Sources.** gov.bc.ca Teleplan and MSP pages (RM [S22], [S22a]); the MSP Payment Schedule; D26 §2 (sign-off
wording); OQ-24, OQ-51; REQ-BIL-07. Web checks happen only when a real task allows browsing (R6a), with URL and date.

**5. Wording, once verified.** The rejected state says what is wrong, who fixes it (doctor or MOA), and the real
deadline as a date, e.g. "Resubmit by [date]". It's shown by exception, with no countdown noise on normal claims (R25).
The re-send button keeps the sign-off language ("Sign off & resubmit", V2:6564). Until then, cut "expire" and "window" to
"MSP refused this claim · reason: [code text]", with no time claim at all.

**6. Needs Daniel** (via `product-manager`; Ani sends): which limits he works to in practice; one sign-off or two
at Finalize (OQ-51); private pay rules (OQ-25); the real fee items to replace `FEE_ITEM`.

**Needs Ani:** which billing software is in use (RM A11), and whether placeholder fees may stay in the demo, labelled as demo data.

**7. Risks, and how I stay inside the rules.** A wrong deadline leads to lost claims or false urgency. So: no number
without a source (R6); secondhand figures get re-checked (`02-evidence.md`); I write a report only and edit nothing
(R3); demo claims contain no PHNs (R7). No browsing and no Teleplan login, ever (R4, R6a).

**Top 3 findings / asks**
1. "Refusals expire ... within the window" (V2:5612-5613) states an unsourced time limit. Soften it until it's verified.
2. The fee codes and amounts in `FEE_ITEM` (V2:6487-6494) are unsourced. Label them as demo data or get Daniel's list.
3. Finalize submits the bill without saying so, which conflicts with "submit a bill is to sign off" (D26 §2; OQ-51).
