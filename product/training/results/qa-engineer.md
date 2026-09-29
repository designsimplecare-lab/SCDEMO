# Training results — qa-engineer

Date: 29 Sep 2026. Group: Safety and trust.

**What I read:** `.claude/agents/qa-engineer.md`; the handbook in order (`00-start-here.md`,
`01-rules.md`, `02-evidence.md`, `product/process.md`, `product/team.md`); all of `from-daniel/`;
`shadowing/2026-09-25-rx-renewal-by-fax.md`; UC-06 in `product/use-cases.md`; HZ-07 to HZ-09 in the
hazard log; REQ-RX-01 to REQ-RX-11 and REQ-UI-06; OQ-09 and OQ-61. For the drill I grepped the v2
physician portal and read the UC-06 block of `product/tests/harness/run.mjs`.

**Rules I kept:** I wrote this one file only. I ran no tests, edited nothing else and browsed
nothing. There are no patient identifiers here and nothing from `private/`: I did not open it.

Codes: R = `01-rules.md`, H0 = `00-start-here.md`, EV = `02-evidence.md`, PR = `process.md`,
TM = `team.md`, ANS26 / ANS27 / MTG21 / HOME29 = the `from-daniel/` files for 26, 27, 21 and 29 Sep, S1 = shadowing 1,
UC = `use-cases.md`, REQ = `requirements.md`, OQ = `open-questions.md`, HZ = hazard log,
RUN = `product/tests/harness/run.mjs`, V2 = `simplecare-physician-portal-v2.html`.

---

## Core exam

**1 ★ Privacy.** The shadowing file gets what was seen and said, with the person written as "the
patient". The full name, the PHN, the pharmacy address and the first name from the transcript all
stay out. The frames stay in the scratchpad and are never committed. Source: R:33-35 ("No patient
identifiers in the repo, ever … Write 'the patient'. Recording frames stay in the scratchpad only");
TM:115-117. S1:3-4 shows the pattern ("Patient details omitted").

**2 ★ No invention.** I write "Renewal quantity for a twice-daily medication: **Needs Daniel**
(OQ-09)", and continue with whatever doesn't depend on it. I don't turn the 90 tablets in S1:15 into
a rule, because that was one observed visit. As QA, a test may check that the shown quantity equals
directions × days, because that is what the build claims (REQ-RX-02). It must not assert that this is
clinically correct. Source: R:25-26; PR:85-86; OQ-09 (OQ:398-411).

**3 ★ Stay in your lane.** I don't fix it. I log the label, the file and line, what it should say
and the evidence as a finding in my own report, and flag it to the lead, who can raise a bug-fix task
for `ux-designer` or `frontend-engineer`. Source: R:11-12 (only those two edit prototype HTML);
PR:29-30 (the owner stays in scope and reports); PR:48 (bug fixes are theirs).

**4 Calls.** No. Calls go outward only: the doctor phones the patient in their call window, and
patients never call the doctor. They may call the office for admin, so an office-line link for admin
could be fine, but not "Call my doctor now". Source: R:56-57; H0:22-23; `.claude/agents/doctor.md:38`.

**5 Time.** Not allowed. Time is a call window with a queue position and no wait estimate, so the
patient sees their place in line (e.g. "3rd in line, 8–10 AM window"), not minutes. Source: R:58;
glossary H0:66-67 ("We show the position, not a wait estimate").

**6 ★ Tasks.** No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one
for the doctor. Dolly brings the fax to the doctor's attention through the channel that isn't a task,
such as the MOA chat (the messenger in HOME29), or files it where the doctor reviews incoming
documents. If the doctor wants action, he sends her a task. Japneet is the physician assistant, works
in the doctor's portal under his sign-off, and whether she can task in her own right is Needs Daniel.
Source: R:59-62; H0:74, 40.

**7 Care plan vs tasks.** No. The care plan is Daniel's narrative of what we're doing and why; tasks
are one-way practical to-dos for the MOA. They stay separate, and so does the Care Plan Tracker.
Daniel asked for the care plan at the top of the chart as its own thing. Source: R:63; H0:73-74;
ANS26:37-40.

**8 Specialist wording.** "I have arranged an echo" stays with the specialist: the product tracks it
as the specialist's, not as a GP or MOA to-do. "Please start bisoprolol" becomes the GP's, to act on
with the doctor's sign-off. Source: R:65-66 (the stress-test and bisoprolol example).

**9 ★ Sign-off.** *Reviewed* is a state: the doctor is assessing, and nothing happens yet. *Sign off*
is an accountable action that carries his name: signing the chart finalizes the visit, faxing a
script signs off the prescription, and submitting a bill signs off the billing ("The Doctor has
approved this, meaning my a\*\* is on the line."). So approving buttons must say they sign off and the
record must read "Signed off by Dr. <name> · <time>"; a label like "Send by fax" hides the sign-off,
and "Reviewed" must never look like one. Source: ANS26:16-25; H0:76-77; R:67; REQ-UI-06.

**10 Renewals.** Either sends; it is the doctor's call each time, and neither route is the default.
Delegated renewals go to Japneet, who uses the PA portal, and the sign-off is always his ("Always me.
I can delegate authority to Japneet, but it is my responsibility."). He keeps favourites
pre-populated, and they live in the Rx function, which he manages. Source: ANS26:8-14; ANS27:13-25;
H0:79.

**11 Evidence.** Daniel's words win: `from-daniel/` is trust level 1 and agent reports are level 7.
I don't pick quietly. I note the conflict in my report, with both sources, and flag it to the lead so
`product-manager` can log it in `open-questions.md` and fix the spec. Source: EV:3-4, 8, 14; R:13-14
(only the PM edits spec docs).

**12 Process.** The lead writes `product/tasks/T-NNN-<slug>.md` from the template and adds it to the
board. "Make the inbox better" is ambiguous, so the lead asks Ani what "better" means before it goes
Ready (PR:83-84). At triage: type Design, owner `ux-designer`, acceptance criteria written, gates
`qa-engineer` (prototype UI) and `clinical-safety` (results and sign-off), plus `privacy-security`
if personal data changes. The owner works in scope; each gate writes pass / fix / block in
`product/reports/<agent>-<date>-T-NNN-review.md`, and any block is resolved first. Ani approves (and
Daniel, for clinical content), the lead commits and deploys, and `product-manager` updates the
statuses. Source: PR:16-36, 51-59.

**13 Design rules.** (1) Text is ink and colour goes on icons; red is for critical values only.
(2) Nothing a physician reads is under 14px. (3) Buttons are 44px with an icon. (4) No uppercase
styling: sentence case everywhere. (5) One tag spec: 15px/500, 40px tall, no stroke. Also: reading
text caps at 66ch, Mage Icons only, and the build stamp is updated with every edit. Source: R:84-101.

---

## Role drill — the UC-06 test script (renewal by fax)

**1. Task file I'd expect.** Type: Review / audit. Owner: `qa-engineer`. Gates: none of its own (it
feeds other tasks' qa gate). Output: `product/tests/UC-06-renewal-by-fax.md` plus automated steps in
RUN. Acceptance: every step has an expected result, the REQ IDs and the deep link; the run records
pass/fail with evidence; `built` versus `gap` is marked from UC-06 status.

**2. The script.** Start: `#chart:5` (the renewal row, RUN:140-142). Locate code by id and function
name (`rxOpen`, `rxQty`, `rxReview`, `rxConfirm`, `moaTask`), not line numbers: UC-06 cites
`rxOpen` at V2b:9930, and today it is at V2:10035.

| # | Step | Pass if | REQ | Expect |
|---|---|---|---|---|
| 1 | Open `#chart:5` | Chart and renewal card show, 0 console errors | RX-01 | built |
| 2 | Look at the header | Pharmacy is in the chart banner, not under More | RX-01 | built |
| 3 | Read the card line | Intake drug preselected at the plan dose, "list says …" shown | RX-03 | built |
| 4 | Read supply | 3 months on by default; quantity shown = directions × days | RX-02 | built |
| 5 | Look at the two routes | Same weight at rest: bg, border, weight, height | RX-10 | gap |
| 6 | Open Favourites | A list of pre-filled scripts; check step still runs after | RX-11 | built? |
| 7 | Press send | "Check before it goes": drug, dose, directions, qty, days, last dispensed, pharmacy | RX-04, RX-08 | built |
| 8 | Read the confirm label | It says it signs off | UI-06 | gap |
| 9 | Confirm | "Sending to …" then "Delivered to … · patient copy sent" | RX-05 | built (demo timer) |
| 10 | Read note + record | Note line added; "Signed off by Dr. <name> · <time>" | UI-06, RX-01 | check |
| 11 | Delegate route | One task filed with drug and pharmacy; "Picked up by …" | RX-07 | built |
| 12 | Patient with no pharmacy | Send is blocked, not "Delivered to the pharmacy on file" | HZ-08 | gap |
| 13 | Failed fax | A failed state and retry exist | RX-05 | gap |
| 14 | Every step | No text < 14px, buttons ≥ 44px, no uppercase, red only on critical | R:84-101 | scan |

**3. Sources.** UC:156-196; REQ-RX-01 to 11, REQ-UI-06; S1:15-21; ANS26:8-25; ANS27:13-25; HZ-07 to
HZ-09; OQ-09, OQ-50, OQ-61; RUN:140-175.

**4. Needs Daniel.** The quantity rule and drugs never defaulted to 90 days (OQ-09): until then,
step 4 checks arithmetic only, never clinical correctness. Priority of a delegated renewal (HZ-09).
**Needs Ani / lead.** What the fax service really reports (OQ-50), before step 13 has a real
expected result. Whether step 12's block is the wanted behaviour (HZ-08 recommends it).

**5. Risks and rules.** Conflicts I'd report, not fix. (a) ANS27:13-20 answers OQ-61 ("Always me",
and Japneet uses the PA portal), but REQ-RX-07/10, HZ-09 and RUN 06-12 still call it "Ask the MOA
to send" and list OQ-61 as open: to the PM. (b) The demo timers make steps 9 and 11 pass without any
real delivery, so the report says so next to each pass. Demo data only; screenshots stay under the
run's out dir, and no identifiers go in the report.

**Top 3.** (1) The route label and OQ-61 status lag Daniel's 27 Sep answer. (2) Sign-off wording is
missing on the fax press (step 8). (3) A fax can "deliver" with no pharmacy (step 12).
