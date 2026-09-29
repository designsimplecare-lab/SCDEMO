# Training results: `performance-marketing`

- **Date:** 2026-09-29.
- **Read, in order:** `.claude/agents/performance-marketing.md`; `product/handbook/00-start-here.md`, `01-rules.md`,
  `02-evidence.md`; `product/process.md`; `product/team.md` (Marketing department, lines 47-87); `research/patient-entry-flows/README.md`.
- **Checked by grep only:** `from-daniel/` (26, 27, 29 Sep) for the sign-off, renewal and messenger quotes;
  `marketing/reports/content-seo-2026-09-26-website-audit.md` (third-party scripts, lines 221 and 230-234);
  `product/reports/market-strategist-2026-09-26-number-one.md` (Bet 3); `product/tasks/TEMPLATE.md` and `README.md`.
- **Not read:** `private/`. Nothing browsed, nothing edited except this file.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, E = `02-evidence.md`, P = `process.md`, T = `team.md`,
  PM = my role file, PEF = `research/patient-entry-flows/README.md`, D26 / D27 / D29 = `from-daniel/2026-09-2x-*.md`,
  SEO = the content-seo website audit.

---

## Part 1: Core exam

### 1. ★ Privacy
The md file says "the patient" and describes what happened and the friction in general terms. A quote that contains
the first name gets "[the patient]" in its place. The full name, first name, PHN and pharmacy address stay out. The
frames stay in the session scratchpad only and are never committed or embedded. **Source:** R7 ("Write 'the patient'",
"Recording frames stay in the scratchpad only"); T:115-117.

### 2. ★ No invention
I write no quantity. A renewal quantity is a clinical rule, so I mark it **Needs Daniel** and carry on with the parts
that don't depend on it. `product-manager` batches the question and Ani sends it; I contact no one. **Source:** R6; R4
("`product-manager` prepares the question list, and Ani sends it"); P §8.

### 3. ★ Stay in your lane
I don't fix it. Only `ux-designer` and `frontend-engineer` edit prototype HTML, and an owner who finds out-of-scope work
stops and reports rather than expanding the task. I record it in my report (the file, the location, what's wrong and
the suggested fix) and tell the lead, who can open a task. **Source:** R3 ("Everyone else writes a report"); P §2.4.

### 4. Calls
No. Calls go outward only: the doctor phones the patient in the call window, and patients never call the doctor. At
most the portal can point to the office line, for admin only. **Source:** R10; H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and **no wait estimates**, so the patient sees their place in
line, not "about 25 min". **Source:** R11; H0 glossary ("We show the position, not a wait estimate").

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly files the fax
so it reaches the doctor's inbox, or replies on the related task, or raises it in the messenger (MOA chat). The exact
route is an **assumption**, and whether Japneet may send tasks in her own right is still Needs Daniel. **Source:** R12;
D29:33 ("The messenger (MOA chat)").

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we're doing and why; tasks are practical doctor → MOA to-dos. They stay
separate, and so does the Care Plan Tracker. Only Daniel can change a product rule. **Source:** R13; H0 glossary, "Care
plan … It is **not** the task list"; R section C heading ("they don't change without him").

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who says they arranged it. "Please start bisoprolol" becomes the
GP's action. **Source:** R15.

### 9. ★ Sign-off
"Reviewed" is a **state**: the doctor is assessing, and nothing happens yet. "Sign off" is an **accountable action**
under the doctor's name: signing the chart finalizes the visit, faxing a script signs off the prescription, and
submitting a bill signs off the billing ("my a** is on the line"). So a button that commits must say it signs off, and
nothing may sign off as a hidden side effect of a "Reviewed" or "Save" button. **Source:** D26:18-29 ("To Fax is to
'sign off' on the script", "To submit a bill is to 'sign off' on your billing"); R16; H0 glossary.

### 10. Renewals
Either one, and it is the doctor's choice each time; neither is the default. He keeps favourite scripts pre-populated,
and they live in the Rx function, which he manages. The sign-off is always his, even when Japneet sends. **Source:**
D26:8-14 ("Either can send"); D27:23 ("They live in the Rx function. I manage them."); H0:40.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1, and agent reports are level 7. I don't pick one quietly. I name
the conflict in my report, citing both, so `product-manager` can log it in `open-questions.md`. **Source:** E:3-4 ("When
sources conflict, say so; don't pick one quietly"), E trust table.

### 12. Process
The lead writes `product/tasks/T-NNN-inbox-<slug>.md` from the template and adds it to the board. "Better" is ambiguous,
so the lead asks Ani what she means before the task is Ready. At triage it becomes a Design task, owner `ux-designer`,
with gates `qa-engineer` (prototype UI) and `clinical-safety` (results), plus acceptance criteria and linked inputs.
The owner works in scope, each gate files pass / fix / block, Ani approves (Daniel too for clinical content), and the
lead commits, deploys and checks the build stamp. **Source:** P §2, §4, §8; R24a.

### 13. Design rules
(1) Text is ink and colour goes on icons; brand blue #4353E8 for primary actions and the current state, red for critical
only. (2) No uppercase styling; sentence case everywhere. (3) Mage Icons only, from the prototype's icon maps. (4) Sizes:
nothing a physician reads under 14px, 44px buttons with an icon, one tag spec, reading text capped at 66ch. (5) Show by
exception and use progressive disclosure, and a fix on one screen goes to every screen with that pattern. **Source:**
R21-26.

---

## Part 2: Role drill — a privacy-safe tracking plan for the website-to-booking funnel

**1. Expected task.** Type Marketing; owner `performance-marketing`; brief from `marketing-lead`; contributors `content-seo`
(site owner, T:64), `tech-lead` (where events fire). Gates: `privacy-security` (tracking, P §4) and `marketing-compliance`
(PM "have `privacy-security` and `marketing-compliance` review it"). Acceptance: every event listed with properties and
where it fires; no health data reaches any third party (R8, T:80); every claim sourced; ends with top 3 / Daniel / Ani.
Output: `marketing/reports/performance-marketing-<date>-tracking-plan.md` (PM "Output").

**2. Plan.**
1. **Map the funnel** from PEF:67-74: landing → Simplicity chat or concern tile → walk-in or family doctor → doctor and
   window picked → window **held** → sign in or register → intake → joins queue → doctor calls → return visit. Name one
   drop-off hypothesis per step, e.g. "hold, then register" should cut sign-up drop-off (PEF:82-83).
2. **Split the data into two zones.**
   - *First-party, aggregated, consented:* step counts and conversion between steps, never tied to an ad identifier.
   - *Ad platforms:* one generic "booking confirmed" conversion and a page view, nothing more.
3. **Events and properties** (names say the step, never the concern): `page_view` (neutral path only),
   `chat_started`, `path_chosen` (walk-in / family doctor), `window_selected`, `window_held`, `account_started`,
   `account_created`, `intake_completed`, `queue_joined`, `visit_completed`, `return_booked`. Allowed properties: step,
   path type, device, UTM source / medium / campaign (UTMs carry no concern, per the social audit line 138). Banned
   everywhere: the concern, chat text, tile name, symptoms, intake answers, doctor seen, PHN, name, email, phone.
4. **Where each fires.** Chat and tile events client-side to first-party analytics only; hold, account, intake and
   queue events server-side from the booking system; visit and return from the portal, first-party only.
5. **Pixels.** No ad pixel on concern pages, the chat or anything after the hold, because a concern URL is itself
   health information (SEO:230-234). Ad conversion fires once, from a neutral confirmation page with no concern in the
   URL, title or parameters, only after consent.
6. **Consent.** Nothing non-essential fires before the patient opts in; declining must not block booking.
7. **KPIs:** CPA per booking; hold-to-queue rate; return-visit rate (PM). Dashboards read the first-party zone only.
8. **Policy checks for the real task:** the Google and Meta health-advertising and personalised-ads policy pages, and
   BC / federal privacy law, cited by URL and date. Nothing is asserted here: **Needs a qualified reviewer** (R6, R6a).

**3. Sources.** PM; R4-R8, R28; T:72-87; P §4; PEF; SEO:221, 230-234; strategist Bet 3 (queue measures).

**4. Needs Daniel.** Whether "visit completed" and "return booked" can be counted at all, since visit data is clinical
(assumption: yes, as aggregate counts only). **Needs Ani.** Whether ad pixels stay on the site at all; which analytics
tool; who has account access to change the tags (no agent does, R4); where Simplicity is built (PEF:7-8).

**5. Risks and how I stay inside the rules.**
- **Found in reading, reported now (R9, P §8):** SEO:230 says the live Meta Pixel fires on concern pages (UTI, ED,
  weight loss, birth control). It is an agent report (E trust 7) and I haven't verified it, but if true it is a live
  exposure. It is filed on the board as input, and I found no task or `privacy-security` review for it.
- Chat text is the richest leak; it never enters any event (R8).
- Small counts can re-identify, so dashboards suppress tiny cells (assumption; threshold for `privacy-security`).
- Plans only: no spend, no account access, no tag changes (PM "Rules", R4).

**Top 3, ranked by impact:** (1) the pixel on concern pages goes to `privacy-security` now; (2) the two-zone split with
one generic ad conversion; (3) measure the hold-to-queue rate to test "hold, then register".
