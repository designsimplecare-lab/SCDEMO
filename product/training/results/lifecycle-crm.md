# Training results: `lifecycle-crm`

- **Date:** 2026-09-29.
- **Read, in order:** `.claude/agents/lifecycle-crm.md`; `product/handbook/00-start-here.md`, `01-rules.md`,
  `02-evidence.md`; `product/process.md`; `product/team.md` (Marketing department, lines 47-87);
  `research/patient-entry-flows/README.md` (skimmed).
- **Checked by grep only:** `from-daniel/` (21, 26, 27 Sep) for the sign-off, renewal, favourites and notification
  lines; `simplecare-patient-portal-v2.html` for the existing queue notification (line 798).
- **Not read:** `private/`. Nothing browsed, nothing edited except this file.
- **Short names:** R = `01-rules.md`, H0 = `00-start-here.md`, E = `02-evidence.md`, P = `process.md`,
  T = `team.md`, LC = my role file, PEF = `research/patient-entry-flows/README.md`,
  D21 / D26 / D27 = `from-daniel/2026-09-2x-*.md`, PP2 = `simplecare-patient-portal-v2.html`.

---

## Part 1: Core exam

### 1. ★ Privacy
The md file says "the patient" and describes what happened and the friction in general terms; any quote with the
first name gets "[the patient]" instead. The full name, first name, PHN and pharmacy address all stay out. The frames
stay in the session scratchpad only, never committed or embedded. **Source:** R7 ("Write 'the patient'", "Recording
frames stay in the scratchpad only"); T:115-117.

### 2. ★ No invention
I write no quantity. A renewal quantity is a clinical rule, so I write **Needs Daniel** in its place and continue
with the parts that don't depend on it. `product-manager` batches the question and Ani sends it; I contact no one.
**Source:** R6; R4 ("`product-manager` prepares the question list, and Ani sends it"); P §8.

### 3. ★ Stay in your lane
I don't fix it. Only `ux-designer` and `frontend-engineer` edit prototype HTML, and an owner who finds out-of-scope
work stops and reports instead of expanding the task. I note the file, location, what's wrong and the suggested
fix in my report, and tell the lead, who can open a task. **Source:** R3; P §2.4.

### 4. Calls
Not acceptable. Calls go outward only: the doctor phones the patient in the call window, and patients never call
the doctor. The portal may at most point to the office line for admin. **Source:** R10; H0:22-23.

### 5. Time
Not allowed. Time is a call window with a queue position and no wait estimates, so the patient sees their place in
line, not "about 25 min". **Source:** R11; H0:67 ("We show the position, not a wait estimate").

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor. Dolly routes
the fax to the doctor's inbox (or replies on an existing task), and he decides whether to task her. **Source:** R12
("The MOA replies on a task and never creates one for the doctor"); H0:74.

### 7. Care plan vs tasks
No. The care plan is the narrative of what we are doing and why (Daniel's synthesis of assessment and plan); tasks
are practical doctor → MOA to-dos. They stay separate, and so does the Care Plan Tracker. It is Daniel's rule, so
it doesn't change without him. **Source:** R13; H0:73-74; R §C heading.

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who said they arranged it. "Please start bisoprolol" becomes the
GP's action. A recommendation keeps its stated owner. **Source:** R15.

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off" is an accountable action with the
doctor's name on it. Daniel's three examples: signing the chart finalizes the visit; "To Fax is to 'sign off' on the
script"; "To submit a bill is to 'sign off' on your billing." Buttons must name the real action (Sign chart, Fax
script, Submit bill), because a sign-off carries accountability: "my a\*\* is on the line." A "Reviewed" toggle must
never look like, or trigger, a sign-off. **Source:** D26 §2 (lines 16-25); H0:76-77; R16.

### 10. Renewals
Either can send. It is the doctor's choice each time, and neither is the default. Daniel keeps favourite scripts
pre-populated ("I also have my favorite's pre-populated"), and favourites live in the Rx function, managed by the
doctor. Sign-off stays his even when he delegates. **Source:** D26 §1 (lines 8-14); D27 §3 (line 25); H0:79.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1, and agent reports are level 7. I don't pick quietly. I note the
conflict in my report, with both sources, and flag it so `product-manager` adds it to the contradictions list in
`product/open-questions.md`. **Source:** E:3-4, table rows 1 and 7.

### 12. Process
The lead turns the message into `product/tasks/T-NNN-<slug>.md` from the template and adds it to the board. At
triage it gets a type (design), priority and size, one owner (`ux-designer`), contributors, gates (`qa-engineer` for
UI, plus `clinical-safety` because the inbox holds results), and a rules check. "Make it better" is ambiguous, so the
lead asks Ani for acceptance criteria before Ready. The owner works in scope; each gate writes pass / fix / block;
Ani approves (Daniel too if clinical). The lead commits and deploys, and `product-manager` updates the statuses.
**Source:** P §2 (steps 1-7), §4, §8.

### 13. Design rules
(1) Text is ink and colour goes on icons; brand blue #4353E8 for primary actions and current state only. (2) Red is
critical only. (3) Sizes: nothing a physician reads under 14px, 44px buttons with an icon, reading text at 66ch.
(4) Sentence case; no uppercase styling. (5) Mage Icons only, from the prototype's icon maps. Also: show by exception,
progressive disclosure, and a fix on one screen goes to every screen with that pattern. **Source:** R21-R26.

---

## Part 2: Role drill — the "almost your turn" message

**Job of the message:** tell the patient to have their phone ready, because the doctor will call soon. Nothing else.

**Trigger:** the patient's queue position reaches a set number in their call window. PP2 line 798 already uses
"The doctor is 2 patients away". **The threshold is Needs Daniel.**

**Outline (draft, not final copy):**
- **SMS:** "SimpleCare: You're 2nd in line in your call window. Please keep your phone nearby. The doctor will
  call you." (If a branded caller number is used, add "from [number]". D21:86 ties a branded number to his contact
  rate; showing it is **Needs Daniel/Ani**.)
- **Email subject:** "You're almost up at SimpleCare". Body: the same line, the call window, and "Questions about
  your booking? Call our office." (admin only, R10). Sender identified as SimpleCare.
- **In-app:** the same position line, in the notifications list. `content-designer` owns the wording.
- **Not included:** a wait estimate. LC's journey says "about 10 minutes", which conflicts with R11 and H0:67; I
  use the position only and flag it (below).

**Why it has no health information:**
1. The rule: health information stays out of email subject lines and SMS previews (R8; LC Rules, "Use neutral
   wording").
2. Previews show on lock screens, shared phones, family tablets and email lists. The concern, doctor type, test or
   medication would disclose a health matter to whoever sees the screen.
3. It isn't needed. The message is logistics; the clinical conversation happens on the call.
4. SMS and email pass through third-party providers; less data sent means less exposure (`privacy-security` gate).
So: no concern, no reason for visit, no test or drug names, and no doctor specialty in any preview.

**Tone:** attention without alarm, plain language, no red or urgency words (R17).

**CASL:** this is a service message about a visit the patient booked, so it is kept free of any promotion (no
newsletter plug, no "book again"). Whether it counts as fully exempt, and what it must carry, is a legal question:
**Needs a qualified reviewer** (`marketing-compliance`). I don't invent the rule (R6).

**Gates:** `marketing-compliance` (email/SMS), `privacy-security` (personal data, SMS vendor), `accessibility` and a
`patient` walkthrough (patient-facing), `content-designer` for the in-app copy. Output would go to
`marketing/lifecycle/` as a draft for Ani (LC Output).

**Top 3 recommendations, by impact**
1. Show the position, never a time, in every channel, and fix LC's "about 10 minutes" line.
2. Keep every preview neutral and identical across SMS, email and in-app, so no channel leaks more than another.
3. Decide the missed-call path (what the patient is told if the call goes unanswered) before launch.

**Needs Daniel:** the trigger threshold; whether the branded caller number goes in the message; the missed-call
policy; whether it ties to the new visit status category and notification system he listed (D21:27).
**Needs Ani:** channel defaults and opt-in design; approval of final copy; correcting the role file (lead edits it).

---

**Unclear rule:** my role file's journey lists an "about 10 minutes" notification, which contradicts R11 ("no wait
estimates") and H0:67. I followed R11. Also, D26 §1 describes renewals as the doctor or Japneet (the PA), while
H0:79 says "the doctor or the MOA"; I cited both.
