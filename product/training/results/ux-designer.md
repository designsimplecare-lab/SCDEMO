# Training results — ux-designer

Read: `.claude/agents/ux-designer.md`; handbook 00, 01, 02; `product/process.md`; `product/team.md`;
all of `from-daniel/`; `shadowing/2026-09-25-rx-renewal-by-fax.md`; `simplecare-design-system.html`
(skimmed: Principles and "Rules it keeps"). Nothing from `private/` was opened. Short forms: H0/H1/H2 =
handbook 00/01/02, PR = `product/process.md`, TM = `product/team.md`, ANS26/ANS27 = Daniel's answers of
26 and 27 Sep, MTG21 = 21 Sep meeting notes.

## Core exam

**1. ★ Privacy.** The note gets what happened and what it means, with the person written as "the
patient". The name, PHN and pharmacy address stay out, and so does the first name from the transcript;
if the pharmacy matters, I write "the pharmacy on the chart header", as shadowing 1 does. The frames
stay in the session scratchpad only, never in the repo. Source: H1:29-31 (rule 7: "names, PHNs, dates
of birth, addresses, phone numbers, emails and pharmacy details … Write 'the patient'", "Recording
frames stay in the scratchpad only"); H2:23-24; TM:115-117.

**2. ★ No invention.** I don't pick a number. I write "Quantity: **Needs Daniel** (OQ-09)", keep
quantity as its own visible field, and pass the question to `product-manager` for the batched list.
One observed visit ("ninety", shadowing 1:16) is evidence, not a rule, and REQ-RX-02 says the rule is
still open. Source: H1:25-26 (rule 6); `product/requirements.md` REQ-RX-02 ("The rule still waits on
OQ-09"); PR:82-83.

**3. ★ Stay in your lane.** I don't fix it. I put it in my report as a finding with its location and a
screenshot or quote, and the lead can turn it into a task for `ux-designer` or `frontend-engineer`.
Only those two edit prototype HTML, and only on an assigned task. Source: H1:9-18 (rules 2 and 3);
PR:29-30 ("If the scope needs to change, the owner stops and reports").

**4. Calls.** Not acceptable. Calls go outward only: the doctor phones the patient in their call
window, and patients never call the doctor. They may call the office for admin, so an office-line link
for admin questions would be fine. Source: H1:47-48 (rule 10); H0:22-23.

**5. Time.** Don't show it. Time is a call window with a queue position and no wait estimates, so the
patient sees e.g. their place in line for the 8–10 AM window, not "about 25 min". Source: H1:49 (rule
11); H0:66-67 ("We show the position, not a wait estimate").

**6. ★ Tasks.** No. Tasks go doctor → MOA only; the MOA replies on a task and never creates one for the
doctor. Dolly files the fax to the patient's record, where the doctor reviews it, or raises it through
the MOA–doctor messenger, or replies on an existing task if one relates to it (the exact routing is an
**assumption**; the MOA portal has a fax inbox, UC-22). Japneet is the physician assistant in the
doctor's own portal, so she is not the route either. Source: H1:50-53 (rule 12); H0:74;
`product/use-cases.md`:666 ("cannot open a new task to the doctor").

**7. Care plan vs tasks.** No. The care plan is Daniel's narrative of what we're doing and why; tasks
are practical to-dos for the MOA. They stay separate, and so does the Care Plan Tracker. Clutter is
solved with progressive disclosure, not by merging. Source: H1:54 (rule 13); H0:73; ANS26:37.

**8. Specialist wording.** "I have arranged an echo" stays with the specialist; it's their action,
shown as waiting on them. "Please start bisoprolol" becomes the GP's item. Each keeps its stated owner.
Source: H1:55-57 (rule 15, same pattern as its stress-test example).

**9. ★ Sign-off.** "Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off"
is an accountable action carrying his name: signing the chart finalizes the visit, faxing a script
signs off the prescription, and submitting a bill signs off the billing ("my a\*\* is on the line").
So approving buttons use sign-off language and show whose name it carries, and a "Reviewed" control
must never look like, or trigger, an approval. Source: ANS26:17-25; H1:58 (rule 16); H0:77.

**10. Renewals.** Either one; it's the doctor's call each time, and neither is the default. Japneet (PA)
can send under his delegated authority, and the sign-off is still his ("Always me"). He keeps favourite
scripts pre-populated; they live in the Rx function, and he manages them. Source: ANS26:8-14;
ANS27:13-15, 22-25.

**11. Evidence.** Daniel's words win: `from-daniel/` is trust level 1, and reports are level 7. I don't
pick quietly. I state the conflict with both citations, go with Daniel, and ask `product-manager` to
log it in `open-questions.md`. Example: the hazard log still says Home shows critical only (D-39),
which ANS27:7-10 replaced with Critical and High. Source: H2:3-4, 8, 14.

**12. Process.** The lead writes `product/tasks/T-NNN-inbox-<slug>.md` from the template and adds it to
the board. Triage sets the type (Design), priority and size, with one owner (`ux-designer`) and the gates:
`qa-engineer` for any UI, plus `clinical-safety` because the inbox holds results. Ready once the
acceptance criteria and inputs are written. I work in scope only, with evidence. The gates write
pass/fix/block, Ani approves (and Daniel too for clinical content), and the lead commits and deploys.
`product-manager` then updates the statuses. Source: PR:16-35, 49-57; H1:19-20.

**13. Design rules.** (1) Text is ink and colour goes on icons; blue #4353E8 only for primary actions
and the current state; red only for a critical value. (2) Nothing a physician reads is under 14px, and
buttons are 44px with an icon. (3) One tag spec: 15px/500, 40px, no stroke, barely tinted. (4) No
uppercase; sentence case. (5) Mage Icons only. Also: reading text ≤66ch, show by exception with
progressive disclosure, and a fix goes to every screen with that pattern. Source: H1:71-84 (rules
21-26); `simplecare-design-system.html` Principles.

## Role drill — emergency red-flag screen in the Simplicity chat

**1. Task file I'd expect.** Type: Design. Owner: `ux-designer`. Contributors: `content-designer`
(wording), `clinical-safety` (red-flag list and routing). Gates: `clinical-safety` (triage is clinical
risk), `accessibility` and a `patient` walk (patient-facing), `qa-engineer` (prototype UI),
`privacy-security` (free-text symptoms are health data), `tech-lead` (production feasibility of
detection). Acceptance: (a) a red flag stops the flow **before any slot is held**; (b) the screen says
what to do (911 / ER) in plain words; (c) no path from it back to booking without a deliberate choice;
(d) wording and the red-flag list are marked Needs Daniel until he approves; (e) screenshots at phone
and desktop, 100% zoom (MTG21:84). Source: `research/patient-entry-flows/README.md`:76-78; PR:49-56.

**2. What I need first.**
- The prototype file to work in. No HTML in the repo contains the Simplicity chat (grep "simplicity":
  0 hits across all 13 files); it exists only on Ani's boards. **Needs Ani.**
- The red-flag list, the wording and the destination (911 vs ER vs urgent same-day). **Needs Daniel.**
- A hazard entry. The hazard log has none for the chat; `clinical-safety` adds it first.

**3. What I can design without Daniel.** Structure with placeholder copy marked "Needs Daniel":
- the interruption pattern (chat → full-width stop screen, not a chat bubble that scrolls away);
- the hierarchy: one instruction, one primary action, and a quiet "this isn't an emergency" path that
  returns to triage, never straight to a held slot;
- the layout, 44px controls with Mage icons, sentence case, text ≤66ch, phone first;
- the states: detected, patient disagrees, patient continues (and the flag travels to the doctor as a
  red-flag intake, REQ-INT-02).
I would not write the trigger rules, symptom list or any clinical copy.

**4. Plan.** (1) Read the entry-flows boards, REQ-INT-02 and UC-intake. (2) `clinical-safety` drafts the
hazard and the controls. (3) Wireframe the states with placeholder copy. (4) `content-designer` drafts
the words for Daniel's review. (5) Build in the file Ani names, with exact-anchor patches and a comment
quoting the request. (6) Verify in the browser at 375px and desktop; check the console and computed
sizes. (7) Gates, then Ani and Daniel approve, and the lead ships.

**5. Sources.** `research/patient-entry-flows/README.md`:30-40, 76-78; H1 rules 17, 18, 20;
`product/requirements.md` REQ-INT-02; `product/reports/clinical-safety-hazard-log.md` (the SaMD section,
since chat triage may be decision support); `simplecare-design-system.html`.

**6. Needs Daniel.** The red-flag list; the exact emergency wording; where each flag sends the patient;
whether a flagged patient may still book.
**Needs Ani.** Which prototype holds the chat; whether rule 17 ("no red" in the patient portal) covers
the public site's emergency screen, or whether an emergency may use critical red; patient-side minimum
text size, since the 14px rule is written for physicians.
**Needs a qualified reviewer.** Whether chat symptom screening is software as a medical device.

**7. Risks, and how I stay inside the rules.**
- A missed red flag, or a slot held first → the hold waits on the screen; `clinical-safety` gate.
- Alarm tone → calm, direct words, no clinical flags (rule 17), per `content-designer`.
- Invented triage logic → none; every rule is Needs Daniel (rule 6).
- Health data in analytics → no symptom text in URLs or tracking (rule 8, `privacy-security`).
- Setup mode → no build until Ani starts tasks (rule 1); no commits or deploys (rule 4).

## Top 3 findings
1. The Simplicity chat isn't in any prototype, so the red-flag drill needs a target file from Ani.
2. The hazard log still says "Home shows critical only", which ANS27:7-10 superseded (Critical and High).
3. Rule 17's "no red" is written for the patient portal; its reach to the public site's emergency
   screen is unclear.

## Unclear rules
- Rule 17 vs an emergency screen on the public site (above).
- The design rules give a physician minimum (14px) but no patient-facing minimum.
- The Mage-icons rule names `ICONS`/`paintPd()` in the physician portal; I assume other prototypes use
  Mage Icons by their own mechanism.
