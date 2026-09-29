# Training results — content-designer

Date: 29 Sep 2026. Group: Design.

**Read:** `.claude/agents/content-designer.md`, `product/handbook/00-start-here.md`, `01-rules.md`,
`02-evidence.md`, `product/process.md`, `product/team.md`, `product/tasks/TEMPLATE.md`, and all four
`from-daniel/` files (21, 26, 27 and 29 Sep). For the drill, one grep of
`simplecare-physician-portal-v2.html` for sign-off labels. I did not open `private/`.

Codes: **H0** = `handbook/00-start-here.md`, **R** = `handbook/01-rules.md`, **EV** = `02-evidence.md`,
**P** = `process.md`, **T** = `team.md`, **CD** = `.claude/agents/content-designer.md`,
**MTG21 / ANS26 / ANS27** = the `from-daniel/` files, **PPv2** = the v2 physician portal. Numbers are
line numbers.

---

## Part 1 — Core exam

### 1. ★ Privacy
The `shadowing/` note says "the patient" and describes the frame generically ("the header shows the
patient's details and pharmacy"). The full name, PHN, pharmacy name and address, and the first name
from the transcript all stay out; any quote containing the name is trimmed or reads "[the patient]".
Frames stay in my session scratchpad only, never in the repo. **Source:** R:7 ("No patient identifiers
in the repo, ever … pharmacy details. Write 'the patient'"; "Recording frames stay in the scratchpad
only"); R:9c (the repo is public).

### 2. ★ No invention
I write no number. The quantity line reads "Renewal quantity: **Needs Daniel**", and I carry on with
the parts of the task that don't depend on it. In a copy deck, the template shows a placeholder slot
("[quantity], set by the doctor"), not a made-up value. **Source:** R:6 ("Don't invent clinical rules,
doses, thresholds … Mark it Needs Daniel"); P:83-84 ("mark it 'Needs Daniel', and continue").

### 3. ★ Stay in your lane
I don't touch the HTML. I record it in my report (screen, element, current text, proposed text, why,
source) and flag it to the lead, and `ux-designer` applies it under a task. If it's outside my task's
scope, I report it rather than expanding the task. **Source:** R:12 ("Only `ux-designer` and
`frontend-engineer` edit prototype HTML"); CD ("`ux-designer` applies the changes"); P:29-30.

### 4. Calls
Not acceptable. Calls go outward only: the doctor phones the patient in their call window, and
patients never call the doctor (they may call the office for admin). The button breaks the core care
model. Patient copy should instead say who moves next, e.g. "Your doctor will call you in your window."
**Source:** R:10; H0:22-23.

### 5. Time
No wait estimates. We show the call window and the patient's queue position, e.g. "You're 4th in line
for the 8–10 AM window", never "about 25 min". **Source:** R:11 ("a call window, with a queue position
and no wait estimates"); H0:67 ("We show the position, not a wait estimate").

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor.
Dolly routes the fax into the doctor's inbox (results/documents), or replies on an existing task if
one relates to it. Japneet is the PA working in the doctor's portal, not an MOA, and whether she can
send tasks in her own right is Needs Daniel. **Source:** R:12; H0:74 ("from the doctor to the MOA, one
way only"); H0:40.

### 7. Care plan vs tasks
No. The care plan is the narrative of what we're doing and why (Daniel's synthesis); tasks are
practical to-dos for the MOA. They stay separate, as does the Care Plan Tracker, and only Daniel can
change that rule. **Source:** R:13 ("Never merge them"); H0:73; ANS26:37-40 (he asked for a "Care
Plan" at the top of the chart).

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who said they arranged it. "Please start
bisoprolol" becomes the GP's to act on. Copy must keep each item's stated owner visible. **Source:**
R:15 (the stress-test / bisoprolol example).

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off" is an accountable
action carrying the doctor's name: signing the chart finalizes the visit, faxing a script signs off
the prescription, submitting a bill signs off the billing ("my a\*\* is on the line"). So a button that
approves must say "Sign off" plus what will happen ("Sign off & fax"), and "Reviewed" must never label
an action. **Source:** ANS26:16-34; H0:76-77; R:16; CD (sign-off language).

### 10. Renewals
Either can send; it's the doctor's call each time, and neither is the default. Japneet (PA, in the
identical PA portal) can send under his delegated authority, but the sign-off is always his. His
favourites are pre-populated scripts that live in the Rx function, and he manages them. **Source:**
ANS26:8-14; ANS27:13-25 ("Always me … it is my responsibility"; "They live in the Rx function. I
manage them.").

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1, and agent reports are level 7. I say the
conflict out loud in my report, cite both, and don't pick silently; the PM logs it in
`open-questions.md`. **Source:** EV:3-4, EV:8, EV:14.

### 12. Process
The lead writes `product/tasks/T-NNN-inbox-….md` from the template, adds it to the board, and triages
it: type, P1–P3, size, one owner (likely `ux-designer`, with me as contributor for labels), gates.
"Make it better" is ambiguous, so the lead asks Ani what's wrong before it's Ready; acceptance
criteria and inputs get written. Gates: `qa-engineer` (UI) and `clinical-safety` (results and
sign-off); each writes pass / fix / block. Ani approves, the lead commits and deploys, and the PM
updates statuses. **Source:** P:17-35, P:49-57, P:82; R:19.

### 13. Design rules
(1) Text is ink, colour goes on icons; brand blue for primary actions, red for critical only.
(2) No uppercase styling; sentence case everywhere. (3) Nothing a physician reads under 14px; buttons
44px with an icon; reading text caps at 66ch. (4) Mage Icons only. (5) Show by exception and use
progressive disclosure; and a fix on one screen goes to every screen with that pattern. **Source:**
R:21-26.

---

## Part 2 — Role drill: copy deck for sign-off language

**1. Expected task file.** `T-NNN-sign-off-language`. Type: Content. Owner: `content-designer`.
Contributors: `ux-designer` (applies), `doctor` (walks it). Gates: `clinical-safety` (sign-off,
prescribing, billing), `qa-engineer` (UI change), `accessibility` if any patient-facing text changes.
Acceptance: every approving action says "Sign off" + its outcome; "Reviewed" labels only a state; one
label per meaning across chart, renewal, billing and inbox (and the PA portal, which is identical);
each row cites a source.

**2. Plan.**
1. Inventory: grep PPv2 (and the MOA portal for status words it shows) for approve / sign off /
   reviewed / submit / fax / finalize. Record screen, element, line, current text.
2. Classify each: accountable action, state, or delegation (hand-off to MOA/Japneet).
3. Propose text per Daniel's three examples. Already aligned, keep: "Sign off & finalize visit"
   (PPv2:4722), "Sign off & fax" (PPv2:10149), "Sign off & submit" / "Sign off & resubmit"
   (PPv2:6563-6564).
4. Flag gaps, e.g. "Send it myself (fax)" (PPv2:4703) vs "Sign off & fax" — one label for one action;
   bare "Sign off" on results (PPv2:4949) — say what it does, which is **Needs Daniel** (what signing a
   result triggers); "Approve" on suggested conditions (PPv2:7118) — is that a sign-off? **Needs
   Daniel**; "Acknowledged … moved to awaiting sign-off" (PPv2:6298) — check "Acknowledged" vs
   "Reviewed" is one state word.
5. Delegation copy: "Send to Dolly" / "Ask Japneet to send" must say the script still goes out under
   the doctor's sign-off (ANS27:13-20), without implying the MOA signs.
6. Apply across screens: every repeat of a pattern gets the same label (R:26).
7. Write the deck: screen → element → current → proposed → why → source, then a status-word glossary.

**3. Sources.** ANS26:16-34 (the definitions and three examples); ANS27:13-25 (always the doctor's;
PA portal); H0:76-78; R:16, R:23, R:26; CD house rules; PPv2 greps (demo data only).

**4. Needs Daniel:** what signing off a result does (release to patient? file?); whether approving a
suggested condition is a sign-off; the confirm wording for delegated sends. **Needs Ani:** whether
the "&" form is the house pattern everywhere; scope (physician only, or PA and MOA status words too).

**5. Risks and rules.** A label that implies sign-off where none happens is a clinical-safety risk,
so every proposal goes through `clinical-safety`. I edit no HTML (R:12); `ux-designer` applies. No
patient names from demo rows in the deck. No new clinical meaning invented; unclear outcomes stay
Needs Daniel.

**Output:** `product/reports/content-designer-<date>-sign-off-language.md`, ending with the top 3
findings, what needs Daniel, and what needs Ani.
