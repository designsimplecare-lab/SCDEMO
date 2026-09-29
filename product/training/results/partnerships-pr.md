# Training results: `partnerships-pr`

- **Date:** 2026-09-29.
- **Read, in order:** `product/training/README.md`; `.claude/agents/partnerships-pr.md` (29 Sep: physicians first, pharmacy
  deprioritised); `product/handbook/00-start-here.md`, `01-rules.md` (incl. 9a–9c and section F), `02-evidence.md`;
  `product/process.md`; `product/team.md` (Marketing department and rules).
- **Evidence read:** all four `from-daniel/` files; `shadowing/2026-09-25-rx-renewal-by-fax.md`;
  `product/reports/market-strategist-2026-09-26-number-one.md`; `research/patient-entry-flows/README.md`;
  `product/tasks/TEMPLATE.md`.
- **Not read:** `private/`. Nothing from it is used here. Nothing edited except this file; nothing browsed.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, EV = `02-evidence.md`, P = `process.md`, T = `team.md`,
  PR = my role file, D21 / D26 / D27 = `from-daniel/2026-09-2x-*.md`, S1 = shadowing 1, MS = market-strategist report,
  EF = patient-entry-flows README. Numbers after a colon are line numbers.

---

## Part 1: Core exam

### 1. ★ Privacy
The shadowing file describes the visit, the screen and the friction, and calls the person "the patient"; any quote that
uses the first name becomes "[the patient]". The full name, first name, PHN and pharmacy name and address stay out of the
repo entirely. The frames stay in the session scratchpad only and are described, never embedded or committed.
**Source:** R:36-38 ("Write 'the patient'", "Recording frames stay in the scratchpad only"); T:115-117.

### 2. ★ No invention
I write no quantity. A renewal quantity is a clinical rule nobody has given me, so I mark it **Needs Daniel** and give the
question to `product-manager` for the batched list, which Ani sends; I carry on with anything that doesn't depend on it.
S1's "ninety" was one observed renewal, not a rule. **Source:** R:28-29 ("Don't invent … doses"); R:24-25; P:86-87; S1:15.

### 3. ★ Stay in your lane
I don't fix it, even for one line: only `ux-designer` and `frontend-engineer` edit prototype HTML. I record it in my own
report (file, line, what's wrong, the suggested fix) and tell the lead, who can open a task. Widening my task on my own
would break the process too. **Source:** R:11-12, 20-21 ("Everyone else writes a report"); P:29-30 ("the owner stops and
reports").

### 4. Calls
Not acceptable. Calls go outward only: the doctor phones the patient in the patient's call window, and patients never call
the doctor, though they may call the office for admin. For me this also means no marketing copy that says "call your
doctor". **Source:** R:61-62; H0:22-23.

### 5. Time
No. Time is a call window with a queue position and no wait estimates, so the patient sees their place in line, not
minutes. A late doctor will be covered by Daniel's coming "running late" status and message, not an estimate.
**Source:** R:63; H0:67 ("We show the position, not a wait estimate"); D21:57-59.

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly routes the fax
to the doctor's inbox for his review, or tells him in the MOA chat; if he wants something done, he sends her a task.
Japneet is the physician assistant working in the doctor's portal under his authority, not an MOA. **Source:** R:64-67;
H0:74; D27:13-20.

### 7. Care plan vs tasks
No. The care plan is the narrative of what we're doing and why, Daniel's synthesis of the assessment and plan; tasks are
one-way practical to-dos for the MOA. They stay separate, and so does the Care Plan Tracker. Only Daniel can change that.
**Source:** R:68; H0:73-74; D26:37-40 ("I need a 'Care Plan'").

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who owns it; the GP only tracks it. "Please start bisoprolol" becomes
the GP's action. Each item keeps the owner the letter states. **Source:** R:70-71.

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off" is an accountable action carrying his
name: signing the chart finalizes the visit, faxing a script signs off the prescription, and submitting a bill signs off
the billing ("my a** is on the line"). So approving buttons use sign-off language and show whose name they carry, and a
"Reviewed" control must never look like an approval. **Source:** D26:16-34; R:72; H0:77.

### 10. Renewals
The doctor sends it, or delegates it to Japneet, the physician assistant, under his sign-off; it is his choice each time,
and neither is the default. The MOA does not send it in her own right: Daniel's "Either can send" names Japneet (D26:8),
and he later confirmed she works in the PA portal and sign-off is "Always me" (D27:14-15), which is how the handbook now
reads. His favourites are pre-populated scripts that "live in the Rx function. I manage them." **Source:** D26:7-14;
D27:13-25; H0:79. (Conflict noted: D26:12's gloss still says "Ask the MOA to send".)

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1, and agent reports are level 7. I don't pick quietly: I name the
conflict in my report with both sources, and ask for it to go on `product-manager`'s contradictions list in
`open-questions.md`. **Source:** EV:3-4, 8 ("His exact words are the spec"), 14.

### 12. Process
The lead writes `product/tasks/T-NNN-inbox-….md` from the template and adds it to the board. At triage the lead sets the
type (Design), priority and size, one owner (`ux-designer`), the contributors, and the gates (`qa-engineer` for UI, and
`clinical-safety` because the inbox holds results); "better" is ambiguous, so the lead asks Ani to define it before the
task is Ready. The owner works within scope, each gate writes pass / fix / block, Ani approves (Daniel too if clinical),
and the lead commits and deploys, then `product-manager` updates the statuses. **Source:** P:21-37, 52-59, 85; R:22-23.

### 13. Design rules
(1) Text is ink and colour goes on icons; brand blue #4353E8 only for primary actions and the current state; red for
critical only. (2) Sentence case, no uppercase styling. (3) Mage Icons only, from the prototype's icon maps. (4) Sizes:
nothing a physician reads under 14px, buttons 44px with an icon, reading text capped at 66ch. (5) Show by exception with
progressive disclosure, and a fix on one screen goes to every screen with that pattern. **Source:** R:90-109 (21 now notes brand blue is as built in v2).

---

## Part 2: Role drill — pharmacy partnership one-pager (dry run; deprioritised)

Pharmacy is "not a priority" and kept "only as a note for later" (PR:11-13; H0:29). I outline it because the drill asks;
I would not start it without a task from Ani (PR:15).

**1. Expected task.** `T-NNN-pharmacy-one-pager` · Type: Marketing · P3 · S · Owner: `partnerships-pr` · Contributors:
`marketing-lead` (brief), `brand-designer`, `integrations-engineer` (fax-back flow) · Gates: `marketing-compliance`
(public), `privacy-security` (referral data), `clinical-safety` (renewal promises). Criteria: every claim sourced or
labelled assumption; no competitor names; risks listed for Daniel and a qualified reviewer. (P:52-59; T:86-87.)

**2. Outline of the one-pager (audience: BC community pharmacists)**
1. *The problem:* the patient needs a renewal or assessment and can't reach their own doctor (S1:13-14).
2. *What SimpleCare is:* physician-led virtual family practice for BC, MSP-covered (H0:17-19).
3. *How a referral works:* the pharmacist points the patient to SimpleCare → the patient books a call window → the
   doctor calls out → if the doctor prescribes, the script is faxed to the pharmacy the patient chose (H0:22-23; S1:15-19).
4. *What we do not promise:* no guaranteed prescription or timing; the doctor decides and signs (R:84; R:63).
5. *Contact / next step:* placeholder, Needs Ani.

**3. Plan.** Read sources → draft in `marketing/partnerships/` → `marketing-compliance` → report in
`marketing/reports/partnerships-pr-<date>-pharmacy.md` → Ani. No outreach, no sending (R:22-25).

**4. Sources.** S1 (renewal by fax); H0; MS:266-289 (channel idea, internal only); EF:68 ("a pharmacy" as an arrival route).

**5. Compliance risks to flag**
- **Conflict of interest and steering:** any referral fee, benefit or exclusivity between pharmacy and physicians may
  breach professional rules for both. **Needs a qualified reviewer** (MS:286-287); flag to `marketing-compliance` and
  Daniel (PR:18-19).
- **Patient choice of pharmacy:** the script goes to the patient's chosen pharmacy, never by default to the referrer.
- **Privacy:** a pharmacy passing a patient's details to us is a data flow needing consent and `privacy-security`
  review (R:36; T:77-80). No patient or pharmacy details in the repo (R:36).
- **Drug promotion:** no prescription-drug names or "get your X renewed" copy on posters or handouts (R:114; T:81-82).
- **Claims:** no "fast", "same-day" or "#1" without a source; no competitor names, e.g. the 700+ pharmacies figure stays
  internal (R:73-75, 116).
- **CASL:** any emailed pitch to pharmacies is a commercial message (R:115-116).
- **Confidential terms:** agreements and any money flow stay in `private/`, never in the repo (R:54-58).

**Needs Daniel:** whether to pilot at all; conflict-of-interest limits. **Needs Ani:** assign it or keep it parked; route
questions to a qualified reviewer.

---

## Part 3: Physician-recruitment one-pager (the priority)

**1. Expected task.** `T-NNN-physician-recruitment-one-pager` · Type: Marketing · P1 · S · Owner: `partnerships-pr` ·
Contributors: `marketing-lead`, `content-designer`, `brand-designer`, `doctor` (persona check), `billing-msp` ·
Gates: `marketing-compliance`; `tech-lead` (confirms which features are in production). Criteria: only claims about what
is live; Daniel approves every quote of his; nothing beyond the public ceiling (R:52-53).

**2. Outline (audience: BC-licensed family physicians)**
1. *Headline:* practise family medicine from anywhere, with a team behind you. Draft; wording Needs Ani.
2. *Who we are:* a physician-led virtual family practice for BC, built with a practising family doctor, Dr. Daniel
   Pannozzo (H0:17-18, 36; R:39-40).
3. *How the work runs:* you set call windows; patients hold a place in the queue; you phone them; you chart, prescribe
   and sign off (H0:22-23, 54). Walk-in and ongoing-care patients (H0:20).
4. *A steady caseload:* straightforward walk-in volume keeps doctors busy (H0:26-27, the public ceiling). Daniel's
   "40–60 patients in one call window" (D21:80) only with his approval, framed as his experience, not a promise.
5. *The workflow:* favourite scripts pre-filled in Rx (D27:22-25); renewals sent by you or delegated (D26:7-14); branded
   caller ID, "95% contact rate" (D21:86-87, Daniel's figure; publish only with his OK). Anything from the v2 prototype
   (one-press calling, results as data) only once `tech-lead` confirms it is live (MS:167, "sells a prototype").
6. *Support:* MOAs handle your tasks, faxes, billing fixes and the office line (H0:39); a physician assistant can act
   under your delegation (H0:40). No staff names without consent.
7. *Flexibility:* work from another time zone; windows run on BC time (H0:38, 66). Licensing for out-of-province
   physicians: **Needs a qualified reviewer** (MS:301-305, 326-327).
8. *Requirements:* BC licence, MSP billing, insurance. **Needs `billing-msp` and a qualified reviewer**; not asserted.
9. *Pay, split, exclusivity:* not in the repo. See private strategy; **Needs Daniel and Ani** (R:57-58; MS:168).
10. *Next step:* a contact route. A form collecting physician data needs `privacy-security` (P:57). Needs Ani.

**3. Plan.** Brief from `marketing-lead` → `doctor` persona ranks what a physician cares about → draft in
`marketing/recruitment/` → `brand-designer` layout on SimpleCare Paper → `marketing-compliance` → Ani (and Daniel for his
quotes) → report in `marketing/reports/partnerships-pr-<date>-physician-one-pager.md`. Then landing page and LinkedIn
drafts (PR:30-32). Measure: active physicians, window-hours per week (MS:160-165).

**4. Risks and guardrails.**
- No competitor names or comparisons ("unlike …") in public copy; competitor pitches are internal benchmarks only (R:73-75).
- No internal numbers that could be read as weakness or strategy (e.g. the physician count in MS:79) in public copy (R:54-56).
- The PR:11 quote ("We need physicians…") stays internal; Daniel approves any public quote (PR:27).
- "120+ concerns" (H0:21) conflicts with 103 active services (MS:73-76): don't use it until Ani checks.
- No patient stories or testimonials (R:114-115).

**Top 3 recommendations, ranked by impact:** (1) the physician one-pager, then landing page, then LinkedIn, all on one
sourced message; (2) get Daniel's approval on his quotes and the 40–60 and 95% figures, the strongest proof we have;
(3) get `tech-lead` to confirm what is live before any workflow claim.
**Needs Daniel:** pay, split and exclusivity; approval of quotes and figures; licensing for out-of-province physicians
(via a qualified reviewer). **Needs Ani:** the task; the contact route; the "120+" check; whether pharmacy stays parked.

**Rule notes for the lead (not blocking):** T:57 and the PR frontmatter description still list pharmacy first; T:122-124
says reports go in `product/reports/`, while R:20-21 says marketing agents use `marketing/reports/`. I followed R.
