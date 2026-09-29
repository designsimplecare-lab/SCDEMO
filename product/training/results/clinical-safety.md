# Training results — `clinical-safety`

Date: 2026-09-29. Group: Safety and trust.

**Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md`, `02-evidence.md`, `product/process.md`,
`product/team.md`, `.claude/agents/clinical-safety.md`, all four files in `from-daniel/`, the first example
visit (`shadowing/2026-09-25-rx-renewal-by-fax.md`), and `product/reports/clinical-safety-hazard-log.md`
(skimmed: the register, HZ-01 to HZ-06, the SaMD list, Top 3, Needs Daniel and Needs Ani). For the drill I
also read `product/tasks/TEMPLATE.md` and the board, and grepped `simplecare-physician-portal-v2.html` and
`simplecare-moa-portal.html`. I did not open `private/`, nothing from it is here, and I browsed nothing.

**Short forms:** HB0 = `handbook/00-start-here.md`, R = `handbook/01-rules.md` (rule number), EV =
`handbook/02-evidence.md`, PR = `process.md`, TM = `team.md`, ROLE = `.claude/agents/clinical-safety.md`,
MTG21 / ANS26 / ANS27 / HOME29 = the four `from-daniel/` files by date, S1 = shadowing 1, HZ = hazard log,
MOA = `simplecare-moa-portal.html`. Numbers after a colon are line numbers.

**For the lead (R 7, R 9):** HOME29:28 quotes a demo task row that gives a staff member's first name *and*
surname. R 7 allows staff first names in their work role; it doesn't say whether surnames are allowed. I have
not repeated the surname, and I have edited nothing. Is a surname allowed?

---

## Core exam

### 1. ★ Privacy
The shadowing note says "the patient" throughout. It keeps only what was observed: the screens, the steps,
the friction, and quotes with any name replaced by "[the patient]". The full name, the PHN and the pharmacy
address stay out. So does the first name from the transcript, because a first name is still a name. The
frames stay in my session scratchpad, and never go into the repo or `images/`.
**Source:** R 7 (R:29-32): "No patient identifiers in the repo, ever … names, PHNs … and pharmacy details.
Write 'the patient'", and "Recording frames stay in the scratchpad only"; EV:23-24. S1:4 shows the pattern
("Patient details omitted").

### 2. ★ No invention
I write: "Renewal quantity for a twice-daily medication: **Needs Daniel** (OQ-09). No rule is assumed." I
don't work out a number. I don't reuse the "90 for 3 months" from S1:15, because that was one case, and I
don't treat the prototype's arithmetic as a rule. In the hazard log it stays a hazard (HZ-07), owned by
"Daniel (rules)". I carry on with the work that doesn't depend on the number.
**Source:** R 6 (R:25-26); ROLE: "Never set clinical thresholds or doses. Mark them 'Needs Daniel'"; PR:83-84
("mark it 'Needs Daniel', and continue with anything that doesn't depend on it").

### 3. ★ Stay in your lane
I don't touch the HTML. I log the wrong label in my review with its file and line, what it should say, and
who owns the fix (`ux-designer`, through the lead). If the label could mislead a clinician (for example, a
result tier or a sign-off state), I also rate it as a hazard. The fix goes into a task; the review's scope
doesn't grow on its own.
**Source:** R 3 (R:11-18): "Only `ux-designer` and `frontend-engineer` edit prototype HTML … Everyone else
writes a report"; PR:28-29: "If the scope needs to change, the owner stops and reports".

### 4. Calls
No. Calls go outward only: the doctor phones the patient, in the patient's call window. A patient may phone
the office for admin, but never the doctor. From a safety point of view, a patient who feels they need the
doctor *now* may need an emergency route instead. The wording of any such route is clinical, so it is
**Needs Daniel**, and I wouldn't draft it.
**Source:** R 10 (R:47-48): "Calls go outward only. The doctor phones the patient. Patients never call the
doctor, though they may call the office for admin."; HB0:22-23.

### 5. Time
No wait estimates. Patients see their call window and their queue position. A call window is "not an
appointment time", and a time estimate we can't keep sets a false expectation.
**Source:** R 11 (R:49): "Time is a call window, with a queue position and no wait estimates"; HB0:66-67 ("We
show the position, not a wait estimate").

### 6. ★ Tasks
No. Tasks travel from the doctor to the MOA only. Dolly can reply on a task she already has, but never
create one for the doctor. Instead, she matches the fax to the patient and files it to the chart, so it
reaches the doctor's inbox for review. To get his attention, she uses the chatbox, email or phone, and she
phones him if the fax is urgent (for example, a critical result).
**Source:** R 12 (R:50-53): "The MOA replies on a task and never creates one for the doctor"; HB0:74 ("one way
only"); MOA:258: "you can't open a new one. Anything you need from a doctor goes by chatbox, email" or phone.

### 7. Care plan vs tasks
No. They stay separate, and so does the Care Plan Tracker. The care plan is Daniel's narrative of what we are
doing and why. A task is a practical to-do from the doctor to the MOA. If they were merged, a line of the plan
could be read as a to-do that has been done, and a to-do as part of the plan. That is the stale-context
hazard (HZ-10).
**Source:** R 13 (R:54): "The care plan and tasks stay separate … Never merge them"; HB0:73-74; ANS26:37-40.

### 8. Specialist wording
The echo belongs to the specialist, because "I have arranged" means they own it. We may track that it
happens, but we don't order it again. "Please start bisoprolol" becomes the GP's, and the doctor decides
and signs the prescription. I would not set a dose: if the letter doesn't give one, it is **Needs Daniel**.
**Source:** R 15 (R:56-57): "'I have arranged the stress test' stays with the specialist; 'please start
bisoprolol' becomes the GP's"; R 6.

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off" is an accountable action
that carries his name. Daniel's three examples:
- signing off the chart means finalizing the visit;
- faxing a script is signing off the prescription;
- submitting a bill is signing off the billing.

So buttons that approve something must use sign-off language and show whose name they carry. "Reviewed"
must never be the button that makes something happen. One press must not bundle two sign-offs, which
Finalize-plus-bill does today (HZ-03).
**Source:** ANS26:17-25: "Reviewing is separate, all it means is that the Doctor is assessing"; "To Fax is to
'sign off' on the script"; "To submit a bill is to 'sign off' on your billing"; "The Doctor has approved this,
meaning my a\*\* is on the line."; R 16; HB0:76-77.

### 10. Renewals
Either one sends it, and the doctor chooses each time, so neither is the default. Japneet sends under his
delegated authority, but the sign-off is always his. He keeps his favourite scripts pre-populated. They live
in the Rx function, and he manages them.
**Source:** ANS26:8-9: "Either can send … I also have my favorite's pre-populated"; ANS27:14-15: "Always me. I
can delegate authority to Japneet, but it is my responsibility"; ANS27:23: "They live in the Rx function. I
manage them."; HB0:79.

### 11. Evidence
Daniel's words win: `from-daniel/` has the highest trust, and agent reports come seventh. But I don't pick
quietly. I name both sources and the conflict in my output, and ask the lead to have `product-manager` add
it to `open-questions.md`. If the report is my own hazard log, I correct the entry and date the change.
**Source:** EV:4: "When sources conflict, say so; don't pick one quietly. `product-manager` keeps a list of
known contradictions"; EV:8 and EV:14 (trust levels 1 and 7).

### 12. Process
1. The request is vague, so the lead asks Ani what "better" means (PR:82).
2. The lead writes `product/tasks/T-NNN-inbox-….md` from the template, and adds it to the board. At triage,
   the lead sets the type (Design), the priority and the size, and one owner (`ux-designer`). The gates are
   `qa-engineer` (UI) and `clinical-safety` (the inbox is results). The lead also checks the task against
   R.
3. At Ready, the acceptance criteria are written. The owner works within scope, and the gates each record
   pass, fix or block.
4. Ani approves, and Daniel does too, because it is clinical content. The lead commits and deploys, and
   `product-manager` updates the statuses.

**Source:** PR:16-35, PR:49-57 (the gates table: "Results … → `clinical-safety`"), R 4, R 20.

### 13. Design rules
1. Text is ink, and colour goes on icons. Red is for critical only: a critical value is the only red text.
2. Nothing a physician reads is under 14px, and buttons are 44px with an icon.
3. Sentence case, and no uppercase styling.
4. Mage Icons only.
5. Show by exception, with progressive disclosure. A fix on one screen goes to every screen with that
   pattern.

**Source:** R 21-26 (R:72-84).

---

## Role drill — re-reviewing HZ-05 after a design change

**The hazard (HZ:199-231):** a critical result is handed to the MOA and leaves Home. Nobody then confirms
that the patient was reached. Residual risk: High. **The design change:** T-008, which trims Home to
Daniel's 29 Sep markup. The task rows are crossed off, and the result rows keep only the name, the
age/sex, the test and the value (HOME29:27-32).

**1. Task I'd expect.** Either the `clinical-safety` gate on T-008 (the board already names it for "the
attention list"), or a new Review task. Type: Review. Owner: `clinical-safety`. Approval: Ani and Daniel
(clinical). Acceptance criteria:
- the build stamp and commit are recorded;
- each cause is re-checked, with its V2 line;
- the likelihood and residual risk are re-rated, with reasons;
- no thresholds or tolerances are set;
- there is a pass, fix or block verdict.

**2. Plan.**
1. Record the new build stamp (V2:10792 today) and run `git log` to get the commit. The log's baseline is
   `c1015e4` (HZ:7-8).
2. Grep the changed code: the Home attention render (from V2:6149), "Accept & assign" (V2:9016-9050), the
   MOA task text (V2:8954-8957) and "No follow-up" (V2:9054).
3. Walk the scenario in the demo: a critical result arrives, then Accept & assign. Does it stay on Home?
   Where is the MOA task visible now that task rows are off Home? Can it close with no reason?
4. Check that each existing control is still there, and each recommended control, one by one.
5. Look for **new** hazards from the trim:
   - The assignee is gone from the row, so who moves next may be invisible.
   - With the task rows gone, the hand-off may leave no trace on Home.
   - The identity kept on the row is the name and the age/sex. Is a second identifier needed (HZ-06)?
   - High must now be on Home (R 16b), which retires part of HZ-16.
6. Re-rate. Severity stays Catastrophic, because a design change doesn't make the harm smaller. Only the
   likelihood and the residual risk can move.
7. Add a dated re-review entry under HZ-05 in the log, and give the lead a verdict. If a critical result
   can still leave Home before contact is recorded, the verdict is "block".

**3. Sources.** HZ-05, MTG21:72-74 ("Critical to high urgency only"), ANS27:7-10, HOME29:23-34, R 18-20,
OQ-07, OQ-11, OQ-15 and OQ-41.

**4. What needs Daniel and what needs Ani.**
- **Daniel:** how long an MOA may take to acknowledge a critical-result task (OQ-15, and no number from
  me). Who makes first contact (OQ-11). The after-hours route. Whether he meant the assignee to come off
  critical rows too, or only off routine clutter. His words are the spec, so I ask him and don't overrule
  the markup.
- **Ani:** where a critical hand-off shows its outcome once task rows are off Home. Whether to accept the
  residual risk until a qualified clinical safety officer signs.

**5. Risks, and how I stay inside the rules.**
- I read and grep only, and write only the log and my verdict. The fix goes to `ux-designer`.
- I write "the patient", not demo names. I'm not the accountable officer, and the verdict says so.
- An AI "under five words" line on the row would be a SaMD question for a qualified reviewer (MTG21:60-62,
  HZ:467-481).
