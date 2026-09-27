# Training results: market-strategist

Date: 27 Sep 2026. Group: Product.

**Read, in order:** `product/handbook/00-start-here.md` (27 Sep version), `01-rules.md` (including 9a),
`02-evidence.md`, `product/process.md`, `product/team.md`, `.claude/agents/market-strategist.md`;
all of `from-daniel/`; `shadowing/2026-09-25-rx-renewal-by-fax.md`; `product/use-cases.md`;
`research/patient-entry-flows/README.md`; and the confidential strategy file in `private/`. That
file was read for direction only. Nothing from it is quoted, paraphrased or summarised here. Where
it matters, this file says "see private strategy".

Short citations: **H0** = `00-start-here.md`, **R** = `01-rules.md`, **EV** = `02-evidence.md`,
**P** = `process.md`, **T** = `team.md`, **ANS26** = `from-daniel/2026-09-26-answers-to-shadowing-questions.md`,
**ANS27** = `from-daniel/2026-09-27-answers-round-2.md`, **MTG21** = `from-daniel/2026-09-21-meeting-notes.md`,
**S1** = the first shadowing file, **UC** = `product/use-cases.md`, **PEF** = `research/patient-entry-flows/README.md`,
**MOAP** = `simplecare-moa-portal.html`. Numbers after a colon are line numbers.

---

## Part 1: Core exam

### 1. ★ Privacy
**Answer.** In the shadowing note I write "the patient". The note keeps the observed behaviour,
the doctor's words, the friction, and timings. Out of it go the full name, the first name from the
transcript, the PHN, and the pharmacy name and address. Every extracted frame stays in the session
scratchpad and never enters the repo. If a quote contains the first name, I cut or bracket it
("[the patient]").
**Why.** Names, PHNs and pharmacy details are all identifiers, and "no patient identifiers in the
repo, ever" has no exception for a first name alone. The repo is public (R:30-31).
**Source.** R:24-27 ("No patient identifiers in the repo, ever … pharmacy details. Write 'the
patient'"; "Recording frames stay in the scratchpad only"); T:115-117; README training rules.
**Flag for the lead (rule 9).** S1:16 names the pharmacy chain and its town from the recorded
visit. Rule 7 lists pharmacy details as identifiers, so I am reporting it and have not edited it.

### 2. ★ No invention
**Answer.** I don't work out a number. I write: "Renewal quantity for a twice-daily medication:
**Needs Daniel** (open question OQ-09)." If the output needs a placeholder, I label it plainly as
an unconfirmed demo value. I carry on with any part of the task that doesn't depend on it.
**Why.** Quantities and doses are clinical rules. The one data point we have (90 for three months
in S1) is a single observed visit, not a rule. Extending it to twice-daily would be invention.
**Source.** R:20-21 ("Don't invent clinical rules, doses, thresholds … Mark it Needs Daniel");
UC:196-198 ("The quantity rule waits on OQ-09"); `product/open-questions.md`:21 (OQ-09); P:83-84.

### 3. ★ Stay in your lane
**Answer.** I don't touch the prototype. I record the label in my report with the file, the
line or function, the current text, the source for the correct text, and the owner
(`ux-designer`). I also note that the fix applies to every screen with that pattern. The lead
turns it into a task, or I raise it as a spawned suggestion. If it is live and touches clinical
meaning, I tell the lead straight away.
**Why.** A one-line fix is still a prototype edit. Only `ux-designer` and `frontend-engineer`
edit prototype HTML, and only one of them at a time. It also needs `qa-engineer`.
**Source.** R:11-15; T:122-124; P:29-30 (the owner stops and reports; it doesn't expand the task);
P:52 (any UI change needs `qa-engineer`); R:71.

### 4. Calls
**Answer.** No. A "Call my doctor now" button breaks the core model. The doctor phones the
patient, and patients never call the doctor. The patient can call the office for admin only.
A safe alternative is a way to see their place in the queue, or to contact the office about
admin.
**Source.** R:37-38 ("Calls go outward only. The doctor phones the patient. Patients never call
the doctor"); H0:22-23; MOAP:258 area (the MOA line is admin); UC:99-100.

### 5. Time
**Answer.** It isn't allowed. Time is a call window with a queue position, and there are no wait
estimates. Show "You're 4th in line for 8–10 AM" and who moves next, never "about 25 min". The
patient prototype already conflicts with this ("about 25 minutes behind"), and it is logged as an
open question.
**Source.** R:39 ("Time is a call window, with a queue position and no wait estimates"); H0:66-67
("We show the position, not a wait estimate"); UC:700-701 (PP:1953, 1962 conflict with `8cd0893`).

### 6. ★ Tasks
**Answer.** No. Tasks travel from the doctor to the MOA only. The MOA can reply on a task, mark it
done, or ask a question on it, but never creates one for the doctor. Instead:
- if the fax relates to an existing task, she replies on that task;
- otherwise she reaches the doctor by chatbox, email or phone, which stays out of his task list.

The doctor can then create a task if he wants one.
**Note on the question.** The handbook says Japneet is the **physician assistant**, working in the
Physician Assistant portal (identical to the physician portal), not an MOA. The one-way rule still
applies: nobody creates a task for the doctor. See "Unclear rules" at the end.
**Source.** R:41 ("Tasks travel doctor → MOA only. The MOA replies on a task and never creates one
for the doctor"); H0:74; MOAP:258 ("Anything you need from a doctor goes by chatbox, email or phone
instead"), MOAP:266-271; H0:40; ANS27:13-20.

### 7. Care plan vs tasks
**Answer.** No. The care plan is the narrative of what we're doing and why: Daniel's synthesis of
the assessment and plan. Tasks are practical to-dos from the doctor to the MOA. The Care Plan
Tracker stays separate too. Merging them loses the reasoning, and mixes clinical intent with
admin work. To reduce clutter, use progressive disclosure within each one instead.
**Source.** R:42 ("The care plan and tasks stay separate … Never merge them"); H0:73-74; ANS26:37
(he wants the care plan at the top of the chart); R:69-70.

### 8. Specialist wording
**Answer.**
- **"I have arranged an echo":** the specialist owns it. It stays with them, and we track it as
  pending on their side.
- **"Please start bisoprolol":** it becomes the GP's action. It goes to the GP, who decides and
  signs.
**Source.** R:44-45 (a recommendation keeps its stated owner: "I have arranged the stress test"
stays with the specialist; "please start bisoprolol" becomes the GP's).

### 9. ★ Sign-off
**Answer.**
- **Reviewed** is a **state**: the doctor is assessing, and nothing happens yet.
- **Sign off** is an **accountable action** carrying the doctor's name. Daniel's three examples:
  - signing off the chart finalizes the visit;
  - faxing a script signs off the prescription;
  - submitting a bill signs off the billing.

He says it means "the Doctor has approved this, meaning my a\*\* is on the line."

**Why it matters for labels.** A button that approves must say that it is a sign-off, and show
whose name it carries. For example, "Sign off and fax" rather than a neutral "Send". The doctor
must know that the press is his accountable approval. "Reviewed" must never look like, or trigger,
a sign-off. Sign-off stays the doctor's even when he delegates the action to Japneet.
**Source.** ANS26:17-33; H0:76-77; R:47; ANS27:13-18 ("Always me. I can delegate authority to
Japneet, but it is my responsibility").

### 10. Renewals
**Answer.** Either one sends it, and it's the doctor's call each time. "Send it myself" and "Ask
the MOA (or Japneet) to send" are equal choices, and neither is the default.
- **Favourites:** he keeps favourite scripts pre-populated. They live in the Rx function, and he
  manages them.
- **Sign-off:** it stays his even when someone else sends.
**Source.** ANS26:8-13 ("Either can send … I also have my favorite's pre-populated"); ANS27:22-25
("They live in the Rx function. I manage them"); ANS27:13-18; H0:79.

### 11. Evidence
**Answer.** Daniel's words win. They are trust level 1, and agent reports are level 7. I don't
resolve the conflict quietly:
- I state it in my output, citing both sources;
- I pass it to `product-manager` for `product/open-questions.md`;
- I label the report's claim as superseded wherever I rely on it.

**A live example from my own files.** My 26 Sep bet "sell family doctor, not walk-in", and PEF:83-85
and PEF:89 (ask about Tia or Rocket at intake), are now out of line with Daniel. See H0:25-29 and
ANS27:37-43 ("No - don't mention Rocket or Tia").
**Source.** EV:3-4 ("When sources conflict, say so; don't pick one quietly"), EV:8, EV:14.

### 12. Process: "make the inbox better"
**Answer.**
1. **Requested.** The lead writes `product/tasks/T-NNN-<slug>.md` from `TEMPLATE.md`, quoting
   Ani's words, and adds a line to the board, `product/tasks/README.md`.
2. **Triaged.** The request is vague, so the lead asks Ani what "better" means before the task is
   Ready. For example: which inbox, which friction, which evidence.
   - Type: Design. The lead sets P1–P3 and S/M/L.
   - One owner: `ux-designer`. Contributors: `doctor` (a walkthrough), `content-designer` if the
     words change, and `product-manager` for the use cases (UC-12, UC-13).
   - Gates:
     - `qa-engineer`, because it is UI;
     - `clinical-safety`, because the inbox is results and sign-off;
     - `privacy-security`, if it touches personal data;
     - `tech-lead`, if production feasibility is in question;
     - `accessibility`, only if a patient sees it.
   - The lead checks it against the rules, e.g. Critical and High on Home, red is critical only,
     FIFO within each band, and a fix applies across screens.
3. **Ready.** Acceptance criteria are written and inputs linked. Anything that needs Daniel goes
   to Blocked.
4. **In progress.** The owner works in scope only.
5. **In review.** Each gate writes pass, fix or block in the task's Review section. A block is
   resolved first.
6. **Approved.** Ani accepts, and Daniel does too if clinical content changed.
7. **Done.** The lead commits and deploys. `product-manager` updates statuses and decisions, and
   the board is updated.

Before any of this, setup mode applies: no prototype changes until Ani says tasks have started.
**Source.** P:16-35, 49-57, 59-65, 81-82; R:7-9, 16-17, 50, 79-80; MTG21:50-52.

### 13. Design rules (five of SimpleCare Paper)
1. **Text is ink, and colour goes on icons.** Brand blue #4353E8 is for primary actions and the
   current state only. Red is critical only (R:59-61).
2. **Sizes.** Nothing a physician reads is under 14px. Buttons are 44px with an icon (R:62-64).
3. **One tag spec:** 15px/500, 40px tall, no stroke, barely tinted. Reading text caps at 66ch
   (R:65-66).
4. **No uppercase styling.** Sentence case everywhere (R:67).
5. **Mage Icons only** (R:68).

Also: show by exception and use progressive disclosure (R:69-70), and a fix on one screen goes to
every screen with that pattern (R:71).

---

## Part 2: Role drill (market-strategist)

**The drill:** "Outline how you'd test the bet 'sell your virtual family doctor, not walk-in'
before recommending a site change." (`role-drills.md`:28-29)

### 0. The bet is superseded, and this is how I would re-frame it
Daniel's 27 Sep direction supersedes my 26 Sep bet 2
(`product/reports/market-strategist-2026-09-26-number-one.md`:171-203). The public-safe form of
the direction is in H0:25-29:
- growth depends on **more physicians** and a high volume of **straightforward walk-in consults**;
- busy doctors value the platform;
- comprehensive family practice is offered;
- pharmacy partnerships are not a priority.

The reasons behind it: **see private strategy.**

**The re-framed bet.** Lead with fast, simple walk-in care for everyday concerns, and keep "your
own doctor, if you want one" as a visible second path, not the headline. The test becomes: *does
leading with walk-in for everyday concerns fill doctors' call windows with straightforward
visits, without hurting trust or safety?*

The measure of success moves from "attached panel size" to **full windows for doctors.** Supply
stays the first constraint, so this is tested together with physician recruitment (bet 1), not
instead of it.

What I keep from the old bet: continuity is still real and still offered (S5 via UC:596). It
becomes a retention and trust signal inside the walk-in journey (the same doctor again next time),
not the acquisition message.

**What I drop:**
- "Lost your family doctor?" as the hero;
- the other-platforms question at intake. Daniel said "No" (ANS27:37-43), so my old bet 2's OQ-18
  item is withdrawn.

### 1. The task file I'd expect
- **T-NNN, "Test the walk-in-first positioning before any site change".** Type: Research.
  Priority P1, because Daniel says we need to move faster. Size M.
- **Owner:** `market-strategist`. **Contributors:**
  - `ux-researcher` (the preference and comprehension test);
  - `performance-marketing` (the funnel baseline, and a privacy-safe measurement plan);
  - `content-seo` (search demand by concern, and the site owner);
  - `patient` (walks both variants);
  - `partnerships-pr` (the physician-recruitment angle);
  - `product-manager` (logs the superseded bet and the stale docs).
- **Gates:**
  - `privacy-security`, for any funnel or chat data, aggregate only;
  - `marketing-compliance`, for any draft copy variant;
  - `clinical-safety`, for which concerns count as "straightforward", and for red-flag screening
    in the chat.
- **Acceptance criteria:**
  - a funnel baseline by care type and concern group, aggregate and with no identifiers;
  - two hero variants tested with at least 5 people on the prototype, not the live site;
  - search demand for everyday-concern terms against family-doctor terms;
  - decision thresholds written **before** the results;
  - a recommendation with impact, cost, evidence and measure;
  - every claim sourced; no confidential specifics;
  - ends with the top 3, what needs Daniel, and what needs Ani.

### 2. Plan, step by step
1. **Write down the hypothesis and kill criteria first.** For example: walk-in-first raises
   landing-to-held-window conversion, and the share of bookings in everyday concerns, with no drop
   in trust scores. The thresholds are set with Ani **before** any data comes in. **Assumption:**
   the exact thresholds are hers to set.
2. **Baseline from what already exists, with no site change.** Ask Ani and engineering for
   aggregate counts only, with no patient-level rows:
   - bookings by care type and concern group;
   - fill rate per call window;
   - patients per window-hour;
   - drop-off between the held window and the queue;
   - repeat visits.

   Also, if logged and privacy-approved, Simplicity's triage split (walk-in against "become a
   patient") (PEF:32-35, 66-73).
3. **Supply check.** Count the active physicians and open window-hours. If windows are already
   full, more demand only means late calls. Then the recommendation is "recruit first", and the
   copy test waits.
4. **Message test on the prototype.** Two hero variants, same layout, only the words change:
   - A: walk-in-first, e.g. "Same-day care for everyday concerns, from BC doctors";
   - B: the current "Walk-in. Family Practice." (PEF:11-12).

   `ux-researcher` runs a first-click, a 5-second recall and a "what would you book?" test, with
   the `patient` persona walk as a warm-up. The draft copy goes through `marketing-compliance`
   first, and it goes nowhere public.
5. **Demand check.** `content-seo` compares search interest for everyday-concern terms
   (renewal, forms, infections, skin) with "family doctor" terms in BC. It cites the URLs and the
   dates checked, when browsing is allowed.
6. **Doctor side.** Ask doctors and recruits whether steady, straightforward walk-in volume makes
   them choose SimpleCare (a question for Daniel). This ties the demand bet to the supply bet.
7. **Decide and write it up.** The report goes to `product/reports/market-strategist-<date>-walk-in-first.md`.
   Only if the thresholds are met do I recommend a live A/B of the hero. That is a site change, so
   it needs Ani and `marketing-compliance`, and `content-seo` drafts it.

**What I'd measure after launch:**
- window fill rate;
- patients per window-hour;
- landing → held window → queued conversion;
- the share of bookings in everyday concerns;
- repeat visits with the same doctor (kept as a retention signal);
- active physicians and window-hours offered.

### 3. Sources I'd use
- H0:25-29 (the direction, public-safe) and "see private strategy" for the rest.
- PEF:10-28, 30-41, 66-73, 83-85 (the hero, the triage, the hold-then-register flow).
- UC-24 (UC:704-717): booking forks into walk-in or family practice.
- UC-23 (UC:690-702): the queue, with no wait estimates.
- ANS27:37-43: don't name competitors, and don't ask about them at intake.
- MTG21:80-81: 40–60 patients per window is the volume a doctor expects.
- My 26 Sep report: the bet 1 supply evidence, and the superseded bet 2.
- `simplecare-competitor-research.md`: to be refreshed with dated URLs when browsing is allowed.

### 4. What needs Daniel, and what needs Ani
**Needs Daniel:**
- Which concerns count as "straightforward" for walk-in marketing. This is a clinical judgment;
  `clinical-safety` reviews it.
- The red-flag and emergency wording in Simplicity, before any slot is held (PEF:76-78).
- Whether "same-day" can be promised, given current supply.
- Anything that touches the specifics in the private strategy.

**Needs Ani:**
- Approval of the test and its kill criteria.
- Access to aggregate funnel data.
- Whether the hero test may later run live.
- Confirmation that the re-framed wording stays inside what the handbook says publicly.

### 5. Risks, and how I'd stay inside the rules
- **Confidentiality (9a).** No markets, pricing, shares, tax or contract detail in any file.
  "See private strategy" only. The public-safe ceiling is the handbook's own wording (H0:25-29).
- **Health data in marketing (rule 8).** Concern groups are measured in aggregate, server side.
  No concern data goes into ad pixels, targeting, subject lines or SMS.
- **Drug promotion and claims (rule 28, T:81-83).** "Everyday concerns" copy must not name
  prescription drugs. There is no "fastest", "#1" or "same-day" without evidence.
- **Queue promise (rule 11).** Copy says "call window" and "your place in line", never a wait
  time.
- **Supply.** A demand push without doctors produces late calls, the very complaint we beat
  competitors on (UC:694-695). Test and ship it with recruitment.
- **Competitors (16a).** They are named only in internal analysis, never in product, intake or
  public copy.
- **Lane.** I write reports. The site copy belongs to `content-seo` and `content-designer`, and the
  prototype to `ux-designer`. No browsing, posting or spending by agents.
- **Stale docs to hand to `product-manager` (I edit none of them):**
  - PEF:83-85 recommends leading with "your virtual family doctor";
  - PEF:89 suggests asking about Tia or Rocket at intake;
  - UC-05 and OQ-18 carry the other-platforms intake question;
  - my 26 Sep report's bet 2.

  All of these conflict with H0:25-29 and ANS27:37-43.

---

## Top 3 findings or asks (ranked by impact)
1. **The positioning bet is superseded.** It is re-framed as walk-in-first for everyday concerns,
   measured by full windows for doctors, and paired with recruitment. It is tested on the
   prototype and aggregate data before any site change.
2. **Stale docs conflict with Daniel.** PEF:83-85 and 89, UC-05 and OQ-18, and my own bet 2 conflict
   with H0:25-29 and ANS27:37-43. `product-manager` should log and update them.
3. **Possible identifier in a public file.** S1:16 names the patient's pharmacy and town. It is
   reported to the lead under rules 7 and 9, and I have not edited it.

**Needs Daniel:** what counts as "straightforward"; the red-flag wording; whether "same-day" can be
promised.
**Needs Ani:** approve the test and thresholds; aggregate data access; the S1:16 privacy fix; and
whether the handbook's public wording is the limit for re-framing.

## Unclear rules
- **Q6 calls Japneet an MOA, but H0:40 and ANS27:19-20 say she is the physician assistant, in a
  portal identical to the physician's.** Does rule 12 (tasks doctor → MOA only) govern her? For
  example, can she create tasks for the MOA, since her portal is identical to the doctor's?
- **Rule 9a says "never paraphrase" the confidential strategy,** yet H0:25-29 is itself a public
  paraphrase of it. I treated the handbook's wording as the public-safe limit. The lead should
  confirm that.
