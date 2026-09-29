# Training results: `frontend-engineer`

- **Date:** 2026-09-29.
- **Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md`, `02-evidence.md`, `product/process.md`,
  `product/team.md`, `.claude/agents/frontend-engineer.md`, and the engineering rules in `.claude/agents/ux-designer.md`.
- **Evidence read:** `from-daniel/` (21, 26, 27 and 29 Sep), by grep and the relevant sections.
- **Checked by grep only:** `product/use-cases.md` (UC-21), `product/tasks/README.md`, `TEMPLATE.md`, and
  `simplecare-physician-portal-v2.html` (anchors only; nothing edited, nothing browsed).
- **Not read:** `private/`. Nothing from it is used here.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, H2 = `02-evidence.md`, P = `process.md`,
  T = `team.md`, UXD = `ux-designer.md`, FE = `frontend-engineer.md`, D26 / D27 / D29 = `from-daniel/2026-09-2x-*.md`.

---

## Part 1: Core exam

### 1. ★ Privacy
The md file gets "the patient", the clinical story in general terms, what happened on screen, the friction, and
quotes with the first name removed or replaced by "[the patient]". The full name, first name, PHN and pharmacy
name and address stay out, as do date of birth, phone and email. Frames stay in the session scratchpad only; the
md describes a frame, never embeds it. **Source:** R7 ("Write 'the patient'", "Recording frames stay in the scratchpad only"); T:115-117.

### 2. ★ No invention
I write no quantity. I mark it **Needs Daniel** (a dose or quantity is a clinical rule) and, if the task can go on
without it, I continue with the parts that don't depend on it. The question goes to `product-manager` for Daniel's
batched list, and Ani sends it; I contact no one. **Source:** R6; R4 ("Asking Daniel" = PM prepares, Ani sends); P §8 "A clinical question".

### 3. ★ Stay in your lane
Although `frontend-engineer` may edit prototype HTML, I don't fix it: it is outside the task's scope, and only one
of `ux-designer` / `frontend-engineer` edits a file at a time, on the lead's say. I record it in my report (file,
line, what's wrong, the proposed fix) and tell the lead, who can open a task. **Source:** P §2.4 ("If the scope
needs to change, the owner stops and reports"); R1-R3; FE:18.

### 4. Calls
No. Calls go outward only: the doctor phones the patient in the call window, and patients never call the
doctor. They may phone the office for admin, so an office-line contact for admin is the most it could offer.
**Source:** R10; H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and **no wait estimates**; we show the position, not an
estimate. The designer should show "your place in the queue" within the window instead. **Source:** R11; H0 glossary "Queue / queue position".

### 6. ★ Tasks
No. Tasks go doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly can reply on
an existing task (reply, mark done or ask a question) or route the fax to the doctor through the fax/inbox flow
(**assumption:** the exact routing isn't specified). If there's no way to do it, that's a product question for
Daniel via PM, not a reason to reverse the direction. **Source:** R12; UC-21 (`use-cases.md:666`).

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we are doing and why; tasks are practical doctor → MOA to-dos.
They stay separate, and so does the Care Plan Tracker; merging them breaks a Daniel rule, which only he can change.
**Source:** R13; H0 glossary "Care plan"; D26 §3 ("I need a 'Care Plan'").

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who said they arranged it. "Please start bisoprolol" becomes
the GP's action. A recommendation keeps its stated owner. **Source:** R15.

### 9. ★ Sign-off
"Reviewed" is a **state**: the doctor is assessing, and nothing happens yet. "Sign off" is an **accountable
action** carrying the doctor's name: signing the chart finalizes the visit, faxing a script signs off the
prescription, submitting a bill signs off the billing ("my a\*\* is on the line"). Buttons that commit must be
labelled as the action that signs off (e.g. "Sign and finalize", "Fax script"), never as "Reviewed", and a
"Reviewed" control must not imply anything was approved. **Source:** D26 §2; R16; H0 glossary.

### 10. Renewals
Either can send; it's the doctor's call each time, and neither is the default ("Either can send…"). The doctor
keeps favourite prescriptions pre-populated; they live in the Rx function and he manages them ("They live in the
Rx function. I manage them."). Sign-off is always his, even when Japneet sends. **Source:** D26 §1; D27 §2-3.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust 1, and reports are trust 7. I say so openly rather than picking one
quietly, cite both, and pass the contradiction to `product-manager` for `open-questions.md`. **Source:** H2:3-4 and the trust table.

### 12. Process
"Make the inbox better" is ambiguous, so the lead clarifies with Ani before writing the task (P §8). The lead
writes `product/tasks/T-NNN-inbox-*.md` from `TEMPLATE.md`, adds it to the board, and triages it: type Design,
priority, size, one owner (`ux-designer`), and gates `qa-engineer` (prototype UI) + `clinical-safety` (results),
with `tech-lead` if production feasibility matters. The owner works in scope, gates write pass/fix/block, Ani
approves (Daniel too for clinical content), and the **lead** commits and deploys; PM updates statuses. **Source:** P §2, §4, §5; R4.

### 13. Design rules
(1) Text is ink, colour sits on icons; blue #4353E8 for primary actions and current state; red only for critical.
(2) Nothing a physician reads is under 14px; buttons 44px with an icon; one tag spec 15px/500, 40px, no stroke.
(3) No uppercase styling; sentence case. (4) Mage Icons only. (5) Show by exception and use progressive
disclosure. (Also: a fix on one screen goes to every screen with that pattern.) **Source:** R21-R26; UXD:17-35.

---

## Part 2: Role drill — safe change in the v2 file

**Note:** the v2 file is now 10,794 lines, not 9,000 (`wc -l`, 29 Sep).

**1. Expected task file.** `T-NNN` from `TEMPLATE.md`; type Design (or a bug fix); owner `frontend-engineer`, with
`ux-designer` told not to edit the file meanwhile (FE:18); gates `qa-engineer` always, plus `clinical-safety` if it
touches results/sign-off/tasks, and `accessibility` if a patient sees it (P §4). Acceptance: the change is visible
on every screen with the pattern (R26), console clean, `node --check` passes, the build stamp updated, before/after screenshots.

**2. Plan.**
1. **Find.** Grep, don't read end to end (H2:19): the element's id/class, `data-pdic`, and comments quoting the decision.
   Anchors today: the single `</style>` at line 4232; `<script>` at 5501; `paintPd()` at 8089; `ICONS` at 8523
   (a second map, `PC_ICONS`, at 9206); build stamp `div.build-stamp` at 10792. List every screen with the pattern.
2. **Understand the cascade.** Many layers restate rules; at equal specificity the later rule wins (UXD:44-45).
   Measure the current computed style before changing anything.
3. **Patch.** CSS goes at the end of the one `</style>`, with id-led selectors. Use exact-anchor patches that fail
   loudly: Edit with a unique `old_string`, or Python with `assert s.count(anchor)==1`. Icons via `ICONS` + `data-pdic` spans, painted by `paintPd()`.
4. **Comment.** Each change gets a short comment quoting who asked and why (UXD:49), with no patient identifiers.
5. **Build stamp.** Update `v2 · build YYYY-MM-DD HH:MM` so everyone can tell which version is loaded.
6. **Prove it.** Extract the inline script and run `node --check`; serve via Bash (`python3 -m http.server 8765`)
   and open it in headless Chrome; confirm a clean console; measure computed styles (≥14px text, 44px targets,
   tag 40px); take light and dark screenshots of every affected screen; check keyboard focus is visible.
7. **Hand off.** A report in `product/reports/frontend-engineer-<date>-<topic>.md`, gates review, the lead commits. I don't commit or deploy.

**3. Sources.** The task file; `from-daniel/` for the ask verbatim; `product/use-cases.md` / `requirements.md` IDs;
UXD engineering and design rules; `simplecare-design-system.html` for tokens; `git log --oneline` for recent changes to the area.

**4. Needs Daniel / Ani.** Daniel: any clinical wording, threshold or behaviour the change implies (e.g. what the
attention list must keep, D29). Ani: design calls not covered by the rules, conflicts such as "movable panels"
versus chat in the left nav (D29), and approving the deploy.

**5. Risks, and staying inside the rules.**
- A patch hits the wrong occurrence → count-asserted anchors, and fail rather than guess.
- An earlier cascade layer wins or a later one overrides → id-led selector at the end, verified by measurement.
- A fix on one screen only → grep for all instances of the pattern (R26).
- Stale cache arguments → the build stamp settles which version is loaded.
- Two editors at once → one editor per file, on the lead's word (R3).
- Scope creep → any other bug I find goes in the report, not the patch (P §2.4).
- Demo data only; no real identifiers in comments or screenshots (R7).

---

**Top 3 findings or asks.** (1) The drill's "9,000 lines" is stale: the file is 10,794 lines. (2) There are two icon
maps (`ICONS`, `PC_ICONS`), so the rule "via `ICONS`" should say which applies where. (3) The Design type in
P §3 names only `ux-designer` as owner; how a frontend bug-fix task is typed isn't stated.
**Needs Daniel:** nothing for training. **Needs Ani / the lead:** points 2 and 3 above, and whether the owner or the
lead sets the build stamp at deploy.
