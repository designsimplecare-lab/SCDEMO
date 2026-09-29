# Training results — privacy-security

Date: 29 Sep 2026. Group: Safety and trust.

**What I read:** `.claude/agents/privacy-security.md`; the handbook in order (`00-start-here.md`,
`01-rules.md`, `02-evidence.md`, `product/process.md`, `product/team.md`); all of `from-daniel/`;
`shadowing/2026-09-25-rx-renewal-by-fax.md`; `product/reports/clinical-safety-hazard-log.md` (the
register, HZ-06 and HZ-12). I also grepped the patient portal's upload code, the MOA portal's task
note, the git history and the tracked file list, for the drill and the public-repo section.

**Rules I kept:** I wrote this one file only, edited nothing else and browsed nothing. There are no
patient identifiers here and nothing from `private/`: I did not open it.

Codes: R = `product/handbook/01-rules.md`, H0 = `00-start-here.md`, EV = `02-evidence.md`,
PR = `product/process.md`, TM = `product/team.md`, ANS26 / ANS27 / MTG21 / HOME29 = the
`from-daniel/` files for 26 Sep, 27 Sep, 21 Sep and 29 Sep, S1 = shadowing 1, HZ = hazard log,
PP = `simplecare-patient-portal-v2.html`, MOAP = `simplecare-moa-portal.html`, V2 = physician portal v2.

---

## Core exam

**1 ★ Privacy.** The shadowing file gets only what was observed and said, with the person written as
"the patient". The full name, the PHN, the pharmacy address and the first name from the transcript
all stay out. The frames stay in the scratchpad only and are never committed. Source: R:33-35 ("No
patient identifiers in the repo, ever … Write 'the patient'. Recording frames stay in the scratchpad
only"); TM:115-117.

**2 ★ No invention.** I write "Renewal quantity for a twice-daily medication: **Needs Daniel**". I
don't work it out from the 90-tablet, three-month renewal in S1:15, because that was one observed
visit and not a stated rule. Source: R:25-26 ("Don't invent clinical rules, doses, thresholds …");
HZ-07 lists a short quantity on a renewal as a hazard (HZ:263).

**3 ★ Stay in your lane.** I don't fix it. I record the label, the file and line, and the evidence as
a finding in my own report and flag it to the lead, who can make it a bug-fix task for
`ux-designer` or `frontend-engineer`. Source: R:11-12
(only `ux-designer` and `frontend-engineer` edit prototype HTML); PR:29-30 (the owner works only
within the task's scope and reports anything outside it).

**4 Calls.** No. Calls go outward only: the doctor phones the patient in the call window, and
patients never call the doctor, though they may call the office for admin. A patient-side option
would have to be something like an office contact for admin, and any change to the rule needs
Daniel. Source: R:51-52; H0:22.

**5 Time.** Daniel's model is a call window with a queue position and **no wait estimates**, so
"about 25 min wait" is out. The patient sees their window and their place in the queue. Source:
R:53; H0:66-68 ("We show the position, not a wait estimate").

**6 ★ Tasks.** No. Tasks travel doctor → MOA only, and Dolly can reply on a task but never create one
for the doctor. She sends it by the chatbox, email or phone instead, so it stays out of his task list.
Japneet is the physician assistant, not an MOA: she works in the doctor's portal under his sign-off,
and whether she can send tasks in her own right is still Needs Daniel. Source: R:54-57; MOAP:258
("you can't open a new one. Anything you need from a doctor goes by chatbox, email or phone
instead").

**7 Care plan vs tasks.** No. The care plan is Daniel's narrative of what we are doing and why, and
tasks are practical doctor → MOA to-dos. They stay separate, and so does the Care Plan Tracker.
Merging them would lose the narrative he asked for at the top of the chart. Source: R:58; H0:73-74;
ANS26:37.

**8 Specialist wording.** "I have arranged an echo" stays with the specialist, who said they
arranged it. "Please start bisoprolol" becomes the GP's to act on. I wouldn't add a dose, because
that is Daniel's call. Source: R:60-61 (the stress-test / bisoprolol rule).

**9 ★ Sign-off.** Reviewed is a **state**: the doctor is assessing, and nothing happens yet. Sign-off
is an **accountable action** carrying the doctor's name: signing the chart finalizes the visit,
faxing a script signs off the prescription, and submitting a bill signs off the billing. So an
approving button must name the action and show that the doctor is signing ("Sign off and fax"), and
"Reviewed" must never look like completion. Source: ANS26:17-25 ("It is action oriented … my a\*\*
is on the line"); H0:76-77; R:62.

**10 Renewals.** Either can send it, and it's the doctor's call each time, so neither is the default.
The one Daniel meant is Japneet, the physician assistant, and the sign-off is still always his. His
favourites are pre-populated scripts that live in the Rx function, and he manages them. Source:
ANS26:8-14 ("I also have my favorite's pre-populated"); ANS27:14-15 ("Always me"), ANS27:23.

**11 Evidence.** Daniel's words in `from-daniel/` win: they are trust level 1, and agent reports are
level 7. I'd say so in my report, cite both places, and ask `product-manager` to log the conflict in
`open-questions.md` rather than pick one quietly. I don't edit the report or the spec myself. Source:
EV:3-4, 8, 14; R:13-14.

**12 Process.** The lead writes `product/tasks/T-NNN-<slug>.md` from the template and adds it to the
board. At triage the lead sets the type, priority and size, and asks Ani what "better" means because
the request is ambiguous. The owner is likely `ux-designer`, with gates `qa-engineer`, and
`clinical-safety` because the inbox holds results. The owner works to the acceptance criteria, each
gate writes pass / fix / block in its own review report (the lead copies it into the task), Ani
approves, and the lead commits and deploys. `product-manager` then
updates the statuses. Source: PR:21-37, 52-58, 84.

**13 Design rules.** (1) Text is ink and colour goes on icons, with red for critical only. (2) Nothing
a physician reads is under 14px, and buttons are 44px with an icon. (3) No uppercase styling:
sentence case. (4) Mage Icons only. (5) Show by exception, with progressive disclosure, and a fix on
one screen goes to every screen with that pattern. Source: R:78-96.

---

## Role drill — the data-flow map for patient-uploaded bloodwork

**1. Task file:** `T-NNN-upload-data-flow`. Type review/audit. Owner `privacy-security`. Contributors
`tech-lead` (storage, access), `clinical-safety` (HZ-12), `patient` (notice wording). Gates
`clinical-safety` (results) and `tech-lead` (feasibility). Acceptance: every hop mapped with data,
purpose, store, viewers, retention and sharing; findings rated by severity; gaps marked "Needs a
qualified reviewer"; ends with top 3 / Daniel / Ani; no identifiers.

**2. The map (hops and what I check at each):**
1. *Collect.* Three entry points: intake (PP:1438-1444), documents (PP:1097-1108) and the dashboard
   (PP:930-968). A lab PDF carries name, PHN, DOB, the ordering clinician, and the values. Check:
   notice at upload, purpose stated, file type and size limits, and whether it is the right patient.
2. *Transit.* TLS from the browser to the server. Today the prototype keeps the file in the browser
   only; it sends nothing (PP:1930-1943).
3. *Store.* The object store and region (Canadian residency), encryption at rest, a virus scan, and
   an internal patient ID, never a name (HZ-06: records join by display name, V2:10291-10294).
4. *Process.* Who transcribes values, and whether OCR or an AI vendor reads them. If a vendor: what
   leaves, where, retention, and whether it trains on the data. Values are marked "entered by <who>
   from a patient upload" (HZ-12).
5. *Use.* The Results row shows "patient-supplied" (V2:10717-10721, as Daniel asked, ANS26:56-60).
   The upload goes through inbox tiering (HZ-12 recommendation). Viewers: the doctor, Japneet under
   delegation, the MOA only where a task needs it (role-based).
6. *Share out.* Any fax to a specialist, or export. Minimum necessary.
7. *Keep and delete.* Retention period, and what "Remove" does after the upload is filed (UC-26 notes
   delete). Patient access to their own uploads.
8. *Audit.* Every view, change and deletion logged with who and when.

**3. Sources:** the PP upload code; V2 Results; HZ-06, HZ-12; ANS26:54-60; UC-26; TM:133-140.

**4. Needs Daniel:** OQ-54 (does an upload prompt a review), OQ-65 (which direct source first:
direct feeds shrink this flow). **Needs Ani:** the backend facts (Samin, Sai and Dev, ANS27:56), the
hosting region, and the AI vendor, if any. **Needs a qualified reviewer:** the retention period and
the PIPA BC reading. I won't state them.

**5. Risks and how I stay inside the rules:**
- A found security defect: `file.name` goes into `innerHTML` unescaped (PP:1933-1934). It is harmless
  in a demo, but it must not carry into production. I report it; `frontend-engineer` fixes it.
- A wrong-patient PDF is a privacy breach and a clinical hazard, so it goes to `clinical-safety` too.
- I use no real PDFs, only demo data. The map shows the evidence and the gaps, and **never says
  "compliant"** (role file).
- PIA-ready text goes to `product/reports/`, and I edit no prototype or spec.

---

## The repo being public on GitHub Pages — risks, and my recommendation to Ani

Pages publishes every tracked file, and git history is public too.
- **High: history keeps what was redacted.** The pharmacy detail taken out of S1 is still readable
  in `29d956d`, and a staff surname in `ac41dc6`. A screenshot deleted in `f047109` is still in
  history too; I have not reviewed it.
- **High: the working docs are public.** That means agent reports (security findings show where to
  look), the team's process and Daniel's quotes.
- **Medium:** MTG21:4 gives a Google Doc ID for the full transcript. If that doc is shared by link,
  anyone can open it.
- **Medium:** only one `.gitignore` line protects `private/`. A `git add -f` or a copy publishes it.
- **Low:** the demo data looks real (PHN-shaped numbers, names), so a real identifier could slip in
  unnoticed.

**Recommendation (for Ani to decide; I change nothing):**
1. Split the repo. A private repo holds the handbook, reports, `from-daniel/`, `shadowing/` and
   research. The public one holds only the demo files.
2. Decide whether to rewrite history (e.g. `git filter-repo` plus a force-push) to remove the
   redacted details.
3. Restrict the linked Google Doc to named people.
4. Add a pre-commit check for PHN-, phone- and DOB-shaped strings and for `private/`, and label the
   fake demo data as fake.

---

## Top 3, ranked by impact
1. Public git history still holds a redacted patient detail (the pharmacy), a staff surname and an
   unreviewed deleted screenshot.
2. Patient uploads skip tiering and are joined by name (HZ-12, HZ-06): a privacy and safety gap
   together.
3. Internal docs and security findings are published with the demo.

**Needs Daniel:** OQ-54 and OQ-65 (for the upload flow).
**Needs Ani:** whether to split the repo and rewrite history; the Google Doc sharing; the backend and
hosting facts for the PIA.

## Rules I found unclear
- R:36 now settles staff surnames: they are not allowed. The lead changed it during my training, and
  I have updated my citations to match.
- Rule 9 says "stop and report" personal data found in public. It doesn't say whether data that
  survives only in git history counts, or whether training should stop for it.
