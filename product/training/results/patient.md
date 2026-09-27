# Training results: patient

- **Agent:** `patient` (group: Users)
- **Date:** 27 Sep 2026
- **Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md`, `02-evidence.md`,
  `product/process.md`, `product/team.md`, `.claude/agents/patient.md`.
- **Evidence read:** all of `from-daniel/` (21 Sep, 26 Sep, 27 Sep); all five `shadowing/` files; and
  `research/patient-entry-flows/README.md` with its two boards. For single facts I also checked
  `product/decisions.md`, `requirements.md`, `use-cases.md`, `open-questions.md` and the patient
  portal prototype (with grep).
- **Not read:** `private/`. Nothing from it is in these answers.
- **Short forms used below:** ANS26 = `from-daniel/2026-09-26-answers-to-shadowing-questions.md`;
  ANS27 = `from-daniel/2026-09-27-answers-round-2.md`; MTG21 = `from-daniel/2026-09-21-meeting-notes.md`;
  S1–S5 = the shadowing files in date order; PEF = `research/patient-entry-flows/README.md`;
  PP = `simplecare-patient-portal-v2.html`.

---

## Part 1: Core exam

### 1. ★ Privacy
**Answer.**
- The shadowing note says "the patient" throughout. It describes the history in general terms, and it
  carries only what was observed on screen and what was said.
- These stay out: the full name, the PHN, the pharmacy name and address, and the first name from the
  transcript. The first name also comes out of any quote. I would write "[the patient]" in its place,
  or quote only the part of the line without it.
- The frames stay in the scratchpad only. They never go into the repo, reports or screenshots.

**Why.** The rule covers names, PHNs, dates of birth, addresses, phone numbers, emails and pharmacy
details. A first name is still a name.

**Source.** `01-rules.md:24-27` (rule 7: "No patient identifiers in the repo, ever … Write 'the patient'.
Recording frames stay in the scratchpad only"); `team.md:115-117`.

**Found during training (reported under rule 9, `01-rules.md:29`).** `S1:15-16` names the patient's
pharmacy, with the chain and the town. That is a pharmacy detail under rule 7, in a public repo. I have
not copied it here. I am reporting it to the lead so that `ux-researcher` can reduce it to "the pharmacy
on the chart header", once Ani says OK.

### 2. ★ No invention
**Answer.** I write **"Renewal quantity for a twice-daily medication: Needs Daniel"**. I do not write a
number, and I carry on with the parts of the task that don't depend on it.

**Why.** Quantities and doses are clinical rules. I may not work one out or copy one from an example.
- S1 happened to be a 90-tablet, three-month renewal (`S1:15`). That is one observation of one
  prescription, not a rule.
- A prototype that calculates directions × days (`S5:101`) is a design behaviour, not a rule Daniel
  has given.

If a guess ever had to appear in a draft, I would label it **assumption**.

**Source.** `01-rules.md:20-21` (rule 6: "Don't invent clinical rules, doses, thresholds … Mark it
**Needs Daniel**"); `process.md:81-84` (a clinical question: mark it "Needs Daniel", and continue with
anything that doesn't depend on it).

### 3. ★ Stay in your lane
**Answer.** I don't fix it, even though it is one line.
- I record it in my report as a finding. The report gives the file and line, what the label says, what
  it should say, and the source for the correct wording.
- The lead can then turn it into a task for `ux-designer`, or for `frontend-engineer`.
- I also don't widen my review task to cover it. If it changes the scope, I stop and report it.

**Source.**
- `01-rules.md:11-15` (rule 3: "Only `ux-designer` and `frontend-engineer` edit prototype HTML … Everyone
  else writes a report").
- `01-rules.md:9-10` (rule 2: only work on assigned tasks).
- `process.md:29-30` ("If the scope needs to change, the owner stops and reports").

### 4. Calls
**Answer.** No, that is not acceptable.
- **The rule.** Calls go outward only. The doctor phones the patient in the patient's call window.
  Patients never call the doctor, though they may call the office for admin.
- **What the patient needs instead.** Clear confirmation that the doctor will call them: the window,
  their place in line, and the number the call will come from.
- **For questions.** An office option, clearly labelled as the office, for admin ("Questions before the
  visit? Talk to us", PEF:22).

As a patient, "Call my doctor now" would also mislead me. I would expect a doctor to answer, and none
would.

**Source.** `01-rules.md:37-38` (rule 10); `00-start-here.md:22-23`; `.claude/agents/patient.md` Rules
("The patient never calls the doctor. The doctor calls out.").

### 5. Time
**Answer.** Don't show "about 25 min wait".
- **What the model says.** Time is a call window, with a queue position and **no wait estimates**. The
  patient sees "#6 in line" and their window, not minutes.
- **The prototype conflicts with it today.**
  - PP shows "estimated call 11:40 AM – 12:10 PM" (PP:1953).
  - PP shows "running about 25 minutes behind" (PP:1962).
  - PP shows "typical wait 60–90 min" (PP:1395).
- **What I would do.** Flag it rather than resolve it quietly. `open-questions.md` OQ-26 records that
  Daniel rejected wait durations on the physician side, and it still asks him whether patients may see
  an estimate. His coming "doctor running late" status (MTG21:57-59) should tell the patient the doctor
  is running late, without promising a time. Until Daniel answers OQ-26, the handbook rule applies.

**Source.** `01-rules.md:39` (rule 11); `00-start-here.md:67-68` ("We show the position, not a wait
estimate"); `open-questions.md` OQ-26.

### 6. ★ Tasks
**Answer.** No, she can't create a task for the doctor. Tasks travel doctor → MOA only. A task exists
only when the doctor presses Task, and the MOA replies on a task.

What she does instead:
- She matches the fax to the patient's chart, so that it reaches the doctor for review through the
  documents and results route. The MOA portal has a fax inbox for this (`use-cases.md:682`;
  `requirements.md:1066`). **Assumption:** a matched fax surfaces in the doctor's inbox. I have not
  traced that routing.
- If the fax relates to a task the doctor already sent her, she **replies on that task**.

Whether it becomes work is the doctor's decision.

**Source.**
- `01-rules.md:40` (rule 12: "The MOA replies on a task and never creates one for the doctor").
- `decisions.md` D-21 (Daniel: *"The MOA can't initiate a Task to the Doctor."*).
- REQ-TK-01.

**Note on the question.** It calls Japneet "an MOA". The handbook says she is the **Physician
Assistant**, working in a Physician Assistant portal that is identical to the physician portal
(`00-start-here.md:40`; ANS27 §2). The rule above answers the question as asked. Whether an identical
portal gives her a Task button, and whether she may use it, is unclear. I would raise it with the lead
as a question for Daniel, not assume it.

### 7. Care plan vs tasks
**Answer.** No. They stay separate, and so does the Care Plan Tracker.
- The **care plan** is the narrative of what we are doing and why: Daniel's synthesis of the
  assessment and plan.
- A **task** is a practical to-do, sent one way from the doctor to the MOA.
- Merging them was tried once. It was reversed: D-19 was replaced by D-21, *"They would be distinct."*
  Putting the narrative into a to-do list would lose the "why".

**Source.** `01-rules.md:41` (rule 13: "Never merge them"); `00-start-here.md:73-74`; `decisions.md`
D-21.

### 8. Specialist wording
**Answer.** A specialist's recommendation keeps its stated owner.
- **"I have arranged an echo"** stays with the **specialist**. The chart tracks it as the specialist's,
  with the result expected back, and the GP does not re-order it.
- **"Please start bisoprolol"** becomes the **GP's** to act on. The doctor decides and prescribes, and
  signs off.
- Neither item turns into a task by itself. The doctor presses Task if he wants the MOA involved
  (D-21).

**Source.** `01-rules.md:43-44` (rule 15, the same pattern: "I have arranged the stress test" stays
with the specialist; "please start bisoprolol" becomes the GP's).

### 9. ★ Sign-off
**Answer.**
- **Reviewed is a state.** The doctor is assessing, and nothing happens yet.
- **Sign off is an accountable action** that carries the doctor's name. Daniel's three examples:
  - signing off the **chart** = finalizing the visit;
  - **faxing a script** = signing off the prescription;
  - **submitting a bill** = signing off the billing.

  In his words: *"The Doctor has approved this, meaning my a\*\* is on the line."*
- **Delegation.** Sign-off stays his even when he delegates the sending: *"Always me. I can delegate
  authority to Japneet, but it is my responsibility."*

**Why it matters for button labels.**
- A button that commits the doctor must say that it signs off, and what it signs off, e.g. "Sign off
  and fax", "Sign off and finalize the visit". It should make clear the approval is in his name.
- A "Reviewed" control must not read like an approval, or trigger one.
- A button that silently does a sign-off hides accountability. An example is Finalize submitting the
  claim without saying so (D-71 note, OQ-51).

**Source.** ANS26:16-34; `decisions.md` D-71; `00-start-here.md:76-77`; `01-rules.md:45` (rule 16);
ANS27 §2.

### 10. Renewals
**Answer.**
- **Who sends.** Either the doctor or the MOA can send the renewal fax. It is the doctor's choice each
  time, so neither route is the default, and the two carry equal weight in the UI.
- **Favourites.** Daniel keeps his favourite scripts pre-populated. They live in the Rx function, and
  he manages them.
- **Sign-off.** Whoever presses send, the sign-off is his.

**Source.**
- ANS26:8-9 (*"Either can send … I also have my favorite's pre-populated. So if I am f\*\*\*ing around,
  she sends it. If I think she'll f\*\*\* it up, then i send it."*).
- ANS27 §3 (*"They live in the Rx function. I manage them."*).
- `decisions.md` D-72, D-73.
- ANS27 §2.

### 11. Evidence
**Answer.** Daniel's words win.
- `from-daniel/` is trust level 1. His exact words are the spec. An agent report in `product/reports/`
  is level 7, "only as good as their sources".
- I don't pick one quietly. In my output I name the conflict, with both sources, and follow Daniel.
- I tell the lead, so that `product-manager` can log it in `product/open-questions.md`.
- If Daniel's words don't clearly settle it, it goes on the PM's batched list as "Needs Daniel".

**Source.** `02-evidence.md:3-4` ("When sources conflict, say so; don't pick one quietly"),
`02-evidence.md:8` and `:14`; `process.md:67-69`.

### 12. Process
**Answer.**
1. **Requested.** Ani's message is the request. It is vague, so the lead asks Ani what "better" means
   before scoping it (`process.md:82`, an ambiguous request). The lead also checks setup mode: no
   prototype change until Ani says tasks have started (rule 1).
2. **The task file.** The lead writes `product/tasks/T-NNN-inbox-<slug>.md` from `TEMPLATE.md` and adds
   it to the board, `product/tasks/README.md`.
3. **Triaged.** Type: Design. Priority and size are set. There is **one owner**, `ux-designer`.
   - Contributors: `doctor` (a walkthrough), `content-designer` (words, for example the sign-off
     labels), and `product-manager` (sources).
   - Gates: `qa-engineer` (prototype UI) and `clinical-safety` (results and sign-off). Add
     `privacy-security` or `tech-lead` if it touches personal data or production feasibility.
   - The lead checks it against the rules: Critical and High on Home; FIFO inside each band; red for
     critical only; rule 26 (a fix goes to every screen with that pattern).
4. **Ready.** The acceptance criteria are written and the inputs linked.
5. **In progress.** The owner works in scope only.
6. **In review.** Each gate writes pass, fix or block in the task's Review section. A block is resolved
   first.
7. **Approved.** Ani accepts. Daniel accepts too, because it is clinical content.
8. **Done.** The **lead** commits and deploys. `product-manager` updates the use cases, requirements
   and decisions. The board is updated. The output ends with the top 3, what needs Daniel and what
   needs Ani.

**Source.** `process.md:16-35`, `:49-57`, `:59-65`; `01-rules.md:7-10`, `:16-17`, `:48`, `:72`.

### 13. Design rules
**Answer.** Five of the SimpleCare Paper rules:
1. **Text is ink, and colour goes on icons.** Brand blue #4353E8 is for primary actions and the current
   state only. Red is critical only. In the patient portal there is no red at all, and no HIGH/LOW
   (rule 17).
2. **Sizes.** Nothing a physician reads is under 14px. Buttons are 44px with an icon. There is one tag
   spec (15px/500, 40px tall, no stroke, barely tinted). Reading text caps at 66ch.
3. **No uppercase styling.** Sentence case everywhere.
4. **Mage Icons only.**
5. **Show by exception, with progressive disclosure.** There is no badge on the normal case; common
   things are visible, and the rest is one click away.

Also: a fix on one screen goes to every screen with that pattern.

**Source.** `01-rules.md:58-71` (rules 21–26); `01-rules.md:49-50` (rule 17).

---

## Part 2: Role drill (patient)

**The drill.** As the "new patient who lost their family doctor", walk the entry flow in
`research/patient-entry-flows/README.md`, and outline where I'd get confused or worried.

This is a dry run from the README and its two boards. I did not browse simplecare.ca, and I changed
nothing.

### 2.1 The task file I would expect
- **Title.** T-NNN: patient walkthrough, becoming a patient after losing a family doctor.
- **Type.** Persona walkthrough (`process.md:47`).
- **Owner.** `patient`.
- **Contributors.** `ux-researcher` (S5 context), and `content-designer` (for any wording asks).
- **Gates.**
  - `accessibility`: the patient sees it (`process.md:55`).
  - `privacy-security`: registration, consent, SSO and uploads (`process.md:54`; PEF:91-92).
  - `clinical-safety`: triage and emergency screening in the chat (`process.md:53`; PEF:76-78).
  - `marketing-compliance`: the landing page is public (`process.md:56`).
  - `qa-engineer` applies only if the walk is run against a built prototype, not the boards.
- **Acceptance criteria.**
  1. Every step on PEF §1, §3, §4 and §5 is walked as this persona.
  2. Each point of confusion or worry is tied to a step, a board or PEF line, and a severity.
  3. There are no patient identifiers. The persona is a composite, and the S5 history is used in
     general terms only.
  4. Nothing clinical is invented. Red-flag wording and readings rules are marked "Needs Daniel".
  5. The report ends with the top 3 asks, what needs Daniel, and what needs Ani.
- **Output.** `product/reports/patient-<YYYY-MM-DD>-new-patient-entry-walk.md`.

### 2.2 Plan, step by step
1. **Set the persona.** It is taken from the role file, with S5 as the real-world anchor.
   - The family doctor stopped practising.
   - A recent hospital stay started new medications.
   - Bloodwork is booked elsewhere.
   - Supply lasts only a few weeks.
   - The patient wants the same doctor from now on, and is on a phone and a little worried.
2. **Walk the flow in order:**
   - arrival on the landing page (PEF:10-28);
   - the Simplicity chat and triage (PEF:30-35);
   - "Become a patient" and choosing a doctor (PEF:43-50);
   - consent, and creating the account (PEF:52-57);
   - login, for the return visit (PEF:59-61);
   - the end-to-end tail: intake → queue → the call → follow-up (PEF:66-73).
3. **At each step, ask four questions.** Do I know where I am? Do I know what happens next, and who
   moves? Can I tell it my situation? Does anything frighten me or read as alarm?
4. **Check each step against the rules:**
   - calls go outward (rule 10);
   - no wait estimates (rule 11);
   - no competitor names (rule 16a);
   - attention without alarm (rule 17);
   - no health information in emails (rule 8);
   - 44px targets, and sentence case (rules 22-23).
5. **Cross-check the portal's follow-up.** Where do my uploads and readings go? PP, UC-25, OQ-64.
6. **Rank the findings by impact** on this persona (could I stop, or get hurt?), then write the report
   with the top 3, what needs Daniel and what needs Ani.

### 2.3 Where I'd get confused or worried (the outline of findings)

**Arrival (PEF §1)**
- **"Walk-in. Family Practice." Which one am I?** I am not sick today. I need a doctor to take me on.
  - The header has "Become a Patient" on the landing page, but "Need family doctor" on the inner pages.
    That gives two names for one thing (PEF:27; both boards). I'd wonder if they are different
    services.
  - Severity: medium.
- **The office phone number sits in the header** (PEF:27). I might think I can phone a doctor, and
  would be let down when I can't (rule 10). It should say it is the office line, for admin.
  - Severity: medium.
- **"How Your Visit Works" is written for walk-ins.** It covers the window, the spot in line, email,
  then the call (PEF:18-23). Nothing says what becoming a patient means, how continuity works, or what
  happens with my records. The boards still show the placeholder "need text for this" under that
  heading and under "Our Doctors" (board 1).
  - Severity: medium.

**The Simplicity chat (PEF §2)**
- **My story doesn't fit a symptom box.** The prompt is "Tell us how we can help…", and one variant
  follows up with "How many days have you had these symptoms?" (PEF:34-35). My need is: my doctor
  retired, I was in hospital, I have new medicines, and bloodwork is booked. I don't know whether to
  type all that or pick a tile. None of the concern tiles says "I need a family doctor" (PEF:15-17).
  - Severity: high for this persona.
- **Worry: what happens if I mention the hospital stay.** If I type that I had a mini-stroke, will the
  chat send me to the ER and frighten me? Or will it not react at all? PEF:76-78 says red-flag screening
  must come before any slot is held, and that its wording needs Daniel. As a patient I need it to be
  clear, calm and specific (attention without alarm, rule 17). I cannot judge the wording until it
  exists.
  - Severity: high. Needs Daniel and `clinical-safety`.
- **"See my family doctor" is ambiguous** in the three-option variant (PEF:33). I don't have one any
  more. Does it mean my old doctor? The two-option variant ("I want a regular doctor (ongoing care)",
  PEF:34) is clearer for me.
  - Severity: medium.

**Choosing a doctor (PEF §3)**
- **"Same doctor every visit from here on" is reassuring** (PEF:45-46), and the bio builds trust. It
  raises questions it doesn't answer:
  - Is he taking new patients?
  - Who calls me if he is away?
  - Can I change doctors later?
  - Severity: medium.
- **Placeholder cards read as a specialist.** A "Cardiologist" label in a family-practice flow
  (PEF:79-80) would make me think I was booking a heart specialist. With my history, that would worry
  me. Real cards need real doctors and "Primary Care" labels.
  - Severity: medium until the real data is in.
- **The doctors shown don't match.** The landing page shows two doctors (PEF:24). The chat boards show
  other names.
  - Severity: low. This is board placeholder data.
- **Did I actually get a doctor, and when is my first call?** The walk-in path chooses a window and
  holds it (PEF:36-41). The become-a-patient path goes from "Select Dr. …" straight to registration
  (PEF:47-50), with no window, no hold and no confirmation that I'm now his patient.
  - The physician-side "continuing with me" mark is not built either (S5:149-152; UC-24 status).
  - Severity: high. I could finish sign-up not knowing whether I'm attached, or when I'll be called.

**Registration and login (PEF §4–5)**
- **Consent comes first, and it is dense on a phone.** Two agreements and the eligibility and location
  rules come before the account (PEF:53-55). I'd want to know up front whether I'm eligible (BC, MSP,
  what happens with no card) before choosing a doctor, not after.
  - Severity: medium.
- **Where do I give my phone number?** The doctor calls me (rule 10). Yet the only step shown asks for
  an email or SSO (PEF:56-57).
  - **Assumption:** a later step asks for it. It isn't on the boards.
  - Severity: high if it's missing.
- **"Stay updated by email" (PEF:21).**
  - I'd worry what the emails say, and who sees them. They must hold no health information (rule 8).
  - Some patients would prefer a text. Daniel's automated SMS and email are coming (MTG21:27-28,
    57-59).
  - Severity: low to medium.
- **SSO sign-in (Google, Apple, Microsoft).** It is convenient, but I'd wonder what SimpleCare gets
  from my account. That goes to `privacy-security` (PEF:91-92).
  - Severity: low.

**Intake, the queue and follow-up (PEF end to end)**
- **Nowhere to tell my history once.** I have a previous doctor with no records transferred, a hospital
  stay, three new medicines and their start dates, and a supply that runs out soon.
  - In S5 all of this was said aloud and nothing captured it (S5:37-46, 71-74).
  - As the patient, I'd have to repeat it every call. I'd also worry that my refill date gets missed.
  - Severity: high.
- **Bloodwork booked elsewhere.** I don't know how SimpleCare gets the result.
  - In S5 the doctor asked for an upload "under the follow-up section" (S5:49-54). The portal has only a
    general "Add a document", not tied to the request (UC-25; PP:929-933).
  - Daniel says an upload is a fallback to results from the source (ANS26:56-60).
  - I need to be told plainly: who gets the result, whether I need to upload it, and where.
  - Severity: high.
- **The queue.** "Get your spot in line" (PEF:20). If a first family-doctor visit shows a time, such as
  PP's "typical wait 60–90 min" (PP:1395) or "estimated call …" (PP:1953), that breaks rule 11. It
  would also make me anxious if the call runs past it.
  - Severity: medium.
- **Instructions and readings after the call.** The doctor promised home blood-pressure instructions
  (S5:60-65). I'd need to know:
  - where they will arrive;
  - how to send my readings back;
  - who looks at them.

  How readings are entered is not settled. Daniel asked for the question to be clarified (ANS27 §5;
  OQ-64).
  - Severity: medium.
- **"Book an appointment"** on the About page's hover (PEF:64) contradicts the call-window model.
  A call window is not an appointment time (`00-start-here.md:66`). I'd expect a set time.
  - Severity: low.

**On a phone (PEF:93-94)**
- Only one phone frame exists, for the walk-in chat (board 1, iPhone 16 – 2). The become-a-patient,
  consent and registration steps are desktop only. I cannot judge the 44px targets, the reading length,
  or the screen reader and keyboard behaviour.
- **Assumption:** the long bio and the consent text are hard to read at phone width.
- This goes to `accessibility`.

### 2.4 Sources I'd use
- PEF:1-94 and both boards.
- S5 (the anchor visit), and S1 and S3 (records and outside information).
- ANS26 §4 and §6; ANS27 §5 and §6.
- MTG21:27-28 and 57-59.
- `use-cases.md` UC-23, UC-24 and UC-25.
- `open-questions.md` OQ-26 and OQ-64.
- PP, by grep only.
- `01-rules.md`, rules 8, 10, 11, 16a, 17, 22 and 23.

### 2.5 What needs Daniel, and what needs Ani
**Needs Daniel**
1. The red-flag and emergency wording in the chat. This includes what happens when a patient mentions
   a recent serious event, such as a hospital stay, and not only current symptoms (PEF:76-78). This is
   with `clinical-safety`.
2. Does a new family-practice patient's first visit use a call window and the queue, like a walk-in?
   Or is it booked another way?
3. What we ask a new patient for at sign-up or intake: previous doctor, hospital discharge information,
   current medications and the date supply runs out. We ask this without naming any other platform
   (ANS27 §6).
4. How patient readings come back: in the portal, on the call, or both (OQ-64). Which home-BP method we
   teach patients.
   - S5:142-143 describes a specific method, but that is the analyst's text, not Daniel's. Daniel said
     only "in keeping with Canada's antihypertensive guidelines" (S5:62-64).
   - Needs Daniel or a qualified reviewer.
5. Whether patients may see any time estimate (OQ-26).

**Needs Ani**
1. The become-a-patient path has no window, no hold and no "you're now Dr. …'s patient" confirmation
   (PEF:47-50 vs 36-41).
2. One label for the header CTA ("Become a Patient" vs "Need family doctor").
3. Where the phone number is collected in registration.
4. A "lost my family doctor" entry in the chat or tiles.
5. Phone frames for the become-a-patient and registration steps.
6. Replace "Book an appointment" with call-window language.
7. The positioning call on the hero, "your virtual family doctor" vs walk-in (PEF:83-85). This is Ani's
   call with Daniel.

### 2.6 Risks, and how I'd stay inside the rules
- **Identifiers.** The persona is a composite, and S5 is referenced in general terms only. There are no
  names, dates of birth, pharmacies or places, and no frames in the repo (rule 7).
- **Inventing clinical content.** I would not write red-flag lists, BP targets, dose or refill rules, or
  a readings schedule. Each is marked Needs Daniel (rule 6).
- **Boards versus a build.** The boards are designs in progress (PEF:7), not what is live. Anything not
  on a board is labelled **assumption**, not a finding about the product.
- **Lane.** I write a report only. I would not edit the boards, PEF, the prototypes, `product/` docs or
  marketing, and I would not browse or log in to simplecare.ca during training (rules 3 and 4).
- **Competitors.** No competitor names in any proposed wording (rule 16a).
- **Tone.** Every proposed patient line is attention without alarm: no red, and no HIGH/LOW (rule 17).

### 2.7 Top 3 asks (ranked by impact)
1. **Tell a new patient clearly that they now have a doctor, and when the first call is.** The
   become-a-patient path has no window, no hold and no confirmation (PEF:43-50).
2. **Give a new patient one place to say what matters:** "my family doctor stopped practising", recent
   hospital care, current medicines, when supply runs out, and tests booked elsewhere. Say plainly who
   gets the results (S5:37-54; ANS26:56-60).
3. **Calm, specific emergency screening in the chat before any hold** (PEF:76-78). Its wording needs
   Daniel and `clinical-safety`.

---

## Contradictions and unclear points found during training
1. **Core exam Q6 calls Japneet "an MOA".** The handbook says she is the Physician Assistant, in a
   portal identical to the physician portal (`00-start-here.md:40`; ANS27 §2). Whether she can create a
   task, given that identical portal, is unclear.
2. **Competitor names at intake.** Three files still propose naming other platforms at intake:
   PEF:89-90, S1:29-30 and S5:153-155. Daniel overruled that on 27 Sep (ANS27 §6; rule 16a). Those
   files should be marked as superseded, which is the PM's and the researcher's lane.
3. **Wait estimates.** The prototype shows three: PP:1395, 1953 and 1962. That goes against rule 11,
   while OQ-26 still lists the question as open with Daniel. The handbook states it as a rule. The
   decision log only records his physician-side rejection.
4. **Who enters readings.** The "Means" under ANS26 §4 reads it as "portal or on the call", but Daniel
   asked for the question to be clarified (ANS27 §5). OQ-64 is open.
5. **Privacy.** S1:15-16 contains the patient's pharmacy (the chain and the town). That is a rule 7
   identifier in a public repo, and I am reporting it to the lead (rule 9).
6. **Where the role output goes.** The role file says to write reports to `product/reports/`, but
   training says `product/training/results/`. I followed the training README.
