# Training results: `marketing-lead`

- **Date:** 2026-09-29.
- **Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md` (incl. 9a–9c, section F), `02-evidence.md`,
  `product/process.md`, `product/team.md` (Marketing department, rules, standards), `.claude/agents/marketing-lead.md`.
- **Evidence read:** all four `from-daniel/` files (21, 26, 27, 29 Sep); `shadowing/2026-09-25-rx-renewal-by-fax.md`;
  skimmed `product/reports/market-strategist-2026-09-26-number-one.md`, `research/patient-entry-flows/README.md`,
  `marketing/reports/social-media-manager-2026-09-26-channel-audit.md`; `product/tasks/TEMPLATE.md`; grep of
  `simplecare-design-system.html` for tokens.
- **Private:** private strategy, 27 Sep 2026 (confidential) was read for direction only. Nothing from it is quoted or
  paraphrased here. Nothing edited, nothing browsed.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, P = `process.md`, T = `team.md`, ML = my role file,
  D21 / D26 / D27 / D29 = `from-daniel/2026-09-2x-*.md`, S1 = shadowing 1, MS = market-strategist report,
  EF = patient-entry-flows README, SMA = social channel audit, DS = `simplecare-design-system.html`.

---

## Part 1: Core exam

### 1. ★ Privacy
The md describes the visit, the screen and the friction, and calls the person "the patient"; a quote with the first name
becomes "[the patient]". The full name, first name, PHN and pharmacy name and address stay out, as do DOB, phone and
email. Frames stay in the session scratchpad only and are described, never embedded. **Source:** R7 ("Write 'the patient'",
"Recording frames stay in the scratchpad only"); T:114-116.

### 2. ★ No invention
I write no quantity. It is a clinical rule nobody has given, so I mark it **Needs Daniel**, hand the question to
`product-manager` for the batched list (Ani sends it), and carry on with what doesn't depend on it. S1's "ninety" is
one observed once-daily renewal, not a rule. **Source:** R6; R4 ("`product-manager` prepares ... Ani sends it"); P §8; S1:15.

### 3. ★ Stay in your lane
I don't fix it: only `ux-designer` and `frontend-engineer` edit prototype HTML. I note it in my report (file, line,
what's wrong, suggested fix) and tell the lead, who can open a task. A scope change means stop and report, not expand.
**Source:** R3 ("Everyone else writes a report"); P §2.4 ("the owner stops and reports").

### 4. Calls
Not acceptable. Calls go outward only: the doctor phones the patient in the call window, and patients never call the
doctor (they may call the office for admin). The same holds in marketing copy: never promise "call your doctor".
**Source:** R10; H0:22-23.

### 5. Time
No. Time is a call window with a queue position and **no wait estimates**; show the place in line ("you're 3rd"), not
minutes. A late doctor is handled by Daniel's coming "running late" status and message, not an estimate. **Source:**
R11; H0 glossary "Queue / queue position" ("We show the position, not a wait estimate"); D21:57-59.

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly routes the
fax into the doctor's inbox/results flow for review (or messages him on the MOA chat), and if he wants action he sends
her a task. Japneet is the PA in the doctor's portal, not an MOA. **Source:** R12; H0 glossary "Task"; D27:13-20.

### 7. Care plan vs tasks
No. The care plan is the narrative of what we're doing and why (Daniel's synthesis of assessment and plan); tasks are
one-way practical to-dos for the MOA. They stay separate, as does the Care Plan Tracker, and that rule changes only with
Daniel. **Source:** R13; H0 glossary "Care plan"; D26:37-40 ("I need a 'Care Plan'").

### 8. Specialist wording
"I have arranged an echo" stays with the specialist: it is theirs to follow up, and the GP just tracks it. "Please start
bisoprolol" becomes the GP's action. The item keeps the owner the letter states. **Source:** R15.

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing and nothing happens yet. "Sign off" is an accountable action carrying
his name: signing the chart finalizes the visit, faxing a script signs off the prescription, submitting a bill signs off
the billing ("my a** is on the line"). So approving buttons use sign-off language and say whose name they carry, and a
"Reviewed" control must never look like approval. **Source:** D26:16-34; R16; H0 glossary "Sign off".

### 10. Renewals
Either can send it; it is the doctor's call each time, and neither is the default. The PA (Japneet) can send under his
delegated authority, but sign-off is "Always me". His favourites are pre-populated, "live in the Rx function. I manage
them." **Source:** D26:8-14; D27:13-25.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1, agent reports level 7. I don't pick quietly: I name the conflict in
my report with both sources, and it goes to `product-manager`'s contradictions list in `open-questions.md`.
**Source:** `02-evidence.md`:3-4 and :8 ("His exact words are the spec"); H0 people table.

### 12. Process
The lead writes `product/tasks/T-NNN-inbox-….md` from TEMPLATE and adds it to the board; triage sets type (Design),
priority, size, one owner (`ux-designer`), contributors, and gates (`qa-engineer`; `clinical-safety` since the inbox
carries results). "Better" is ambiguous, so the lead asks Ani to define it before Ready; acceptance criteria are written
and inputs linked. The owner works in scope, gates write pass/fix/block reports, Ani approves (Daniel too if clinical),
then the lead commits and deploys and `product-manager` updates statuses. **Source:** P §2, §4, §8; R4.

### 13. Design rules
(1) Text is ink; colour goes on icons; brand blue #4353E8 only for primary actions/current state; red for critical only.
(2) Sentence case, no uppercase styling. (3) Mage Icons only, from the icon maps. (4) Sizes: physician text ≥14px,
buttons 44px with an icon, reading text ≤66ch. (5) Show by exception with progressive disclosure, and a fix on one
screen goes to every screen with that pattern. **Source:** R21-R26; DS tokens (`--accent`, `--crit-text` "nothing else",
`--brand-navy` "logo only").

---

## Part 2: Role drill — outline `marketing/brand.md`

**1. Expected task.** `T-NNN-brand-source-of-truth` · Type: Marketing · Owner: `marketing-lead` · Contributors:
`content-seo`, `social-media-manager`, `brand-designer`, `marketing-compliance` · Gates: `marketing-compliance`
(public-facing rules), `privacy-security` (claims about data). Criteria: every fact has a source or is labelled
assumption; nothing beyond the H0 Direction ceiling; open items listed as Needs Daniel / Needs Ani.

**2. Outline (section → sources)**
1. *What we are* — physician-led virtual family practice for BC, MSP-covered, private pay available. H0:17-21; EF:12.
2. *Positioning* — lead with same-day walk-in volume, family practice available; proof points: the live queue ("it's
   your turn"), a physician-led practice, 120+ concerns (unverified). H0:25-29 (the public ceiling, R9b); EF:84-86;
   MS:75 (120+ vs 103 services). **Conflict flagged:** ML:14 ("continuity rather than one-off visits") and MS Bet 2
   say lead with continuity; H0 Direction points at walk-in volume. Private strategy, 27 Sep 2026 (confidential)
   settles it; contents left out. Final wording is Ani and Daniel's call (EF:84-86).
3. *How it works, in patient words* — pick a call window, get your place in line, email updates, the doctor calls you.
   No wait estimates, no "call your doctor". EF:19-24; R10-R11.
4. *Audiences* — walk-ins (primary), people managing an ongoing condition, people without a family doctor, physicians
   to recruit (growth depends on them). Pharmacies: listed in ML:21 but "not a priority" (H0:29) — demote, flag to lead.
5. *Voice and tone* — plain, warm, calm; attention without alarm; sentence case; no red or alarm language. ML:22; R17, R23.
6. *Visual rules* — SimpleCare Paper: Manrope, paper/panel, accent #4353E8 for actions, navy logo only, no lime, UI
   and team imagery over stock "patients". DS tokens; SMA §3.
7. *Name and spelling* — "Simple Care" vs "SimpleCare": Needs Ani (SMA:185-189).
8. *Claims we may make / may not make* — approved facts with sources; banned: "best", "#1", invented numbers/reviews,
   prescription-drug names, competitor names, "Data stored in Canada" until `privacy-security` confirms. R16a, R28; MS:236-242.
9. *Consent and people* — no patient stories/faces/testimonials without documented consent; staff first names only
   with written consent. R7, R28; T Marketing rules.
10. *Privacy in marketing* — no health or concern data in pixels, targeting, subject lines or SMS previews. R8.
11. *Emergency wording* — placeholder only; wording and treatment Need Daniel and Ani. R17a.
12. *Review flow* — brief → specialists → `brand-designer` → `marketing-compliance` → Ani → a person posts. T Marketing rules.

**3. Plan.** Read the sources above → verify live-site facts by public browsing (only when the task allows, R6a) →
draft `marketing/brand.md` → send to `marketing-compliance` → report in `marketing/reports/marketing-lead-<date>-brand.md`
→ Ani approves. No posting, no commit.

**4. Needs Daniel:** homepage promise (walk-in-led vs family-doctor-led); emergency redirection wording; consent to film
or feature him; which health claims are clinically sound. **Needs Ani:** brand name spelling; the "120+ concerns" check;
confirm role-file positioning/audiences should follow the H0 Direction; budget, if any.

**5. Risks and guardrails.** The repo is public: no strategy, pricing, markets or partner terms in `brand.md` — only the
H0 Direction wording (R9b-9c). No invented stats or reviews (R6, R28). Competitors named only in internal reports, never
in brand copy (R16a). Everything is a draft for Ani (R27).

**Top 3:** (1) settle the positioning conflict before any copy is written; (2) verify every proof point (120+, data
residency); (3) one name, one visual system across site and social. **Needs Daniel / Ani:** as in step 4.
