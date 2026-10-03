# SimpleCare open questions

Owner: product manager agent. First written 25 Sep 2026. Every question waiting on Daniel or Ani.
Each one gives the owner, the date raised, what it blocks and its source. Source codes are as in
`use-cases.md`: ANS26 is Daniel's written answers of 26 Sep 2026
(`from-daniel/2026-09-26-answers-to-shadowing-questions.md`), ANS27 his round-2 answers of 27 Sep
(`from-daniel/2026-09-27-answers-round-2.md`), HOME29 his 29 Sep Home markup
(`from-daniel/2026-09-29-home-feedback.md`) and BOOK29 his 29 Sep booking model
(`from-daniel/2026-09-29-booking-pathways.md`). QA03 is
`product/reports/patient-chat-qa-2026-10-03-probe.md` (staging probe, 3 Oct). From 30 Sep: MOA30, ECG30 and CHART30 (Daniel's
MOA pairing, ECG and chart notes), B-002 to B-004, the requirement documents IB7, ES3, DOC21 and
IN23 (git-ignored; cited by section or ID), and V2d (build 2026-09-30 20:05, `cf6207c`). From
3 Oct: B-005 and BIL15 (Simple Billing PRD v1.5, cited by its IDs; its commercial and
organisational sections are confidential and never recorded), B-006, ECG20 and CV25, and "private
strategy, 3 Oct 2026 (confidential)", cited by name only; see the key in `use-cases.md`. Daniel answers well in numbered batches of 5 to 8,
one line each, with the work each answer unblocks (Ani's working note). **Top 8** marks the batch to
send next. **ANSWERED** marks a question Daniel has answered: the entry keeps his words and the
date, and whatever the answer left open moves to a new question. Ani sends the batch; no agent
contacts Daniel (rule 4).

## Top 8 for Daniel (round 3, updated 3 Oct 2026, second pass)

**Answered since the first pass (3 Oct):** OQ-74 (ECG Critical v2.0) and OQ-82 (Chart View v2.5).
Their places go to OQ-87 and OQ-91, and OQ-92 joins OQ-76.

**Round 3 (prepared 30 Sep) has no recorded answer.** If it has not gone yet, send this version: it
adds what 30 Sep to 2 Oct brought (ECG30, CHART30, B-003, B-004). Five round-3 items move to the next
batch; they are unchanged.

**This round, most important first.**
1. **OQ-79 with OQ-69: how deep does emergency screening go, and do you approve the draft list and
   messages?** ES3 (draft) screens every message and asks up to about three safety questions; IN23
   asks at most one, reactively. Who is the Clinical Director?
   - Why first: on staging, "chest pain, can't breathe" is offered doctors and windows (QA29:12).
   - Unblocks: REQ-INT-11, REQ-INT-16, REQ-INT-17; T-012.
2. **OQ-76 with OQ-92: one priority vocabulary, and does Home follow the chart?** Four versions
   now exist: Critical / High / yellow (yours), HIGH / URGENT (routing), CRITICAL ECG (ECG v2.0),
   and Critical / To do / Info (Chart View v2.5).
   - Unblocks: REQ-IN-14, REQ-IN-18, REQ-IN-23, REQ-CH-37, REQ-HQ-12; T-020, T-021.
3. **OQ-75: when you "clear" a yellow result, is that your sign-off, or a lighter "seen"?** And does
   clearing a Home card leave the Inbox report open (DOC21 §9)?
   - Unblocks: REQ-IN-16, REQ-IN-19.
4. **OQ-87: does Finalize still submit the claim, or do claims wait for your batch attestation?**
   (Billing PRD CNF-09.) This replaces OQ-51.
   - Unblocks: REQ-BIL-05, REQ-BIL-08, REQ-UI-06.
5. **OQ-91: please send Chart View v2.1, and say when the four companion specs come.** Also OQ-81,
   one line: was "Chase their office" wrong, or unexpected?
   - Unblocks: REQ-CH-36, REQ-CH-37 and the AI part of REQ-CH-33 (T-021).
6. **OQ-67: which concerns are quick-book, and which triage-first?** IN23 puts each pathway in a
   registry the Clinical Director edits.
   - Unblocks: REQ-INT-08, T-014.
7. **OQ-66: how many call windows, and at what times?** (round 3, unchanged).
   - Unblocks: REQ-HQ-01, REQ-HQ-02.
8. **OQ-86: may the system create an MOA task by itself for an overdue result?** The routing
   document says yes; our rule is that tasks exist only when you press Task.
   - Unblocks: REQ-IN-22, REQ-CH-29.

**For information in the same message (not questions):** the time now sits in its own pill rather
than beside the greeting (D-92), and the sidebar is open by default (D-95). Both are Ani's 30 Sep
calls against his earlier words (OQ-71).

**Next batch:**
- From round 3: OQ-68 (triage without the AI), OQ-04 (where he presses to call a patient now),
  OQ-70 (a script Japneet sends), OQ-65 (labs) and OQ-64 (readings).
- New: OQ-78 (two companion documents), OQ-83 (who covers when the MOA is away), OQ-84
  (cross-coverage timeframes), OQ-85 (document time limits) and what is left of OQ-77.
- From the billing PRD: OQ-88 (claim status words), OQ-89 (health-card results) and OQ-90 (a
  daily billing digest). From the MOA model: OQ-93 (what "CRM" means).
- Earlier: OQ-09, OQ-35, OQ-73, OQ-72, OQ-62, OQ-51 and OQ-63.

**Add to item 1 (OQ-79):** staging asked no safety questions in 4 runs and missed four urgent
presentations (QA03). OQ-94 rides with it: is "chest cold" acceptable to say, and is QA-030 a hard
stop?

**For Ani and Manoj, not Daniel:** OQ-80 (the "Hello" menu: confirm IN23's cards) and OQ-77 (that
"availability" always means a call window).

---

## Home and queue

### OQ-01 · Does High belong in Needs your attention? · ANSWERED 27 Sep 2026
- **Answer (Daniel, 27 Sep 2026):** *"Critical and High belong."* (ANS27:8).
- **Means:** Home's attention list shows the Critical and High bands. That settles the same-day
  conflict below in favour of MTG21:72. Recorded as D-78, REQ-HQ-11 and REQ-HQ-12.
- **The task half, answered on 29 Sep:** his Home markup crossed off the whole task row
  (HOME29:27-28). So tasks do not appear in the list at all (D-85). The Urgent, High or overdue
  rule for tasks (SPEC:44-45) goes.
- **Not answered:** whether "in today's queue" changes anything. Nothing he said suggests it does,
  so it is not carried forward. What a trimmed row keeps is confirmed in OQ-35.
- **Owner:** Daniel. **Raised:** 21 Sep 2026 (a conflict within the same day). **Blocked:**
  REQ-HQ-11, REQ-HQ-12.
- **The conflict (as asked):**
  - MTG21:72 says "Critical to high urgency only".
  - The code quotes Daniel: *"So as to not overwhelm the doctor - we are keeping it to critical
    values."* (`392eccb`).
  - For tasks, v2 uses Urgent, High or overdue, which the spec marks as an assumption (SPEC:44-45).
  - So an alert-tier potassium for a patient in today's queue does not reach Home (DR:52-53,
    232-234).
- **Ask:** critical only, or critical and high? Does "the patient is in today's queue" change it?
  Does one rule apply to both results and tasks?

### OQ-02 · The "doctor running late" status
- **Owner:** Daniel (his action item). **Raised:** 21 Sep 2026. **Blocks:** REQ-HQ-06, REQ-PT-05.
- **Ask:** its name, its time tolerance, what triggers the text and email, and the wording.
- **Source:** MTG21:27-28, 57-59.

### OQ-03 · Which "noisy detail fields" come out?
- **Owner:** Ani (check the transcript), then Daniel. **Raised:** 21 Sep 2026. **Blocks:**
  REQ-HQ-10.
- **Why:** the aligned decision "Remove noisy detail fields" (MTG21:14) names no fields. Only DOB
  and PHN are named (MTG21:82).
- **Now (29 Sep):** the Home markup does name the noise, but only on the attention list: the
  reference range, the diagnosis text, the source and the assignee (HOME29:27-30; D-85). Whether
  queue rows lose anything is still open.

### OQ-04 · Calling out of order: callbacks and urgent patients · PARTLY ANSWERED 27 Sep
- **Answer (Daniel, 27 Sep 2026):** *"Finalizing a visit, doesn't break the queue. Though, I can't
  remember a time where I skipped ahead to finalize a visit. Sometimes when a patient ... pulls some
  sh\*t with me - I will call them immediately"* (ANS27:46-48; the ellipsis leaves out how he
  described the patient).
- **Means:** finalizing never changes the queue order. He rarely works out of order, but he does
  sometimes call one particular patient straight away (ANS27:51-53). Recorded as D-82.
- **Still open, and in this round's batch:**
  - where he presses to call that patient: the row itself (Call shows only on the next patient,
    D-31) or Add-On;
  - whether Doctor to Callback patients are called the same way. His answer doesn't mention them.
- **Owner:** Daniel. **Raised:** 15 Sep 2026 (SPEC:322-323); again 25 Sep (DR:249-250). **Blocks:**
  REQ-HQ-14; UC-04.
- **Why:** Call renders only on the next patient (*"mirrors a walk-in queue"*, SPEC:167-177), and
  the confirm-dialog escape was rejected. A Doctor to Callback patient is out of order by
  definition, and callbacks drive the *"95% contact rate"* (MTG21:86-87).
- **Ask:** may he call a callback or an urgent patient from the queue, or must it go through Add-On?

### OQ-05 · Task on every row: visible, or on hover?
- **Owner:** Daniel. **Raised:** 15 Sep 2026. **Blocks:** REQ-HQ-14.
- **Why:** Daniel accepted the clutter: *"It can look a bit cluttered with a 'Task' button for every
  patient but it serves a useful purpose."* The spec hides it behind hover and flags this as a
  conflict (SPEC:274-286). The design session also once judged a row Task wrong, because nothing
  about a queued patient is known yet (`506b71b`).
- **Ask:** is hover-plus-prefill enough?

### OQ-33 · A patient who carries over more than once
- **Owner:** Daniel. **Raised:** 15 Sep 2026. **Blocks:** REQ-HQ-03.
- **Why:** SPEC:125-127 assumes one Carryover band with an age indicator.

### OQ-34 · Window lengths and window times · PARTLY ANSWERED 29 Sep 2026
- **Answer (Daniel, 29 Sep 2026):** Ani asked, *"this is maximum window ranges right? can it not be
  7 to 9"*. Daniel: *"Yes - we have limited the number of windows. What that number is, i am not
  sure."* (HOME29:7-8).
- **Means:** there is a fixed, deliberately limited set of windows. D-08's per-patient length is
  not current (D-83). The number and the times are still open, and they move to OQ-66.
- **Owner:** Daniel. **Raised:** 25 Sep 2026 (found in this review). **Blocks:** REQ-HQ-01,
  REQ-HQ-02.
- **Why:**
  - On 8 Aug, windows were "determined by physicians based on patient needs" (15-60 min per patient,
    `c7456f1`).
  - Since 18 Sep they are four fixed BC windows: 8-10, 10-2, 2-5 and 5-7 (`f308201`, SPEC:113-115).
  - Daniel's own six-state examples use 3-5, 6-8 and 7-9 PM (V2:5600-5608).
- **Ask:** are the four fixed windows current? Are the example times illustrative only?

### OQ-39 · How should the time zone read?
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-HQ-02.
- **Why:** local time sits beside BC windows with neither labelled, so 12:48 beside 8:00-10:00 reads
  as three hours late (DR:31-36). Daniel gave the wording *"7:21 AM Toronto · 3h 39m until window"*
  (V2:4077).
- **Ask:** "PT", "BC time", or the city name?
- **Now (29 Sep):** Daniel's markup reads the pill as *"7:50 PM Toronto · 10m left"*
  (HOME29:24-26). He moved it but did not change the wording, so the city name may be enough.
  Still to confirm; whether the windows need "BC time" is still open.

### OQ-66 · How many call windows, and at what times? · Top 8
- **Owner:** Daniel. **Raised:** 30 Sep 2026 (opened by the answer to OQ-34). **Blocks:**
  REQ-HQ-01, REQ-HQ-02; UC-02, UC-23.
- **Why:** *"we have limited the number of windows. What that number is, i am not sure."*
  (HOME29:8). v2 shows four fixed BC windows, 8-10, 10-2, 2-5 and 5-7 (`f308201`, SPEC:113-115).
  Daniel's own examples use 3-5, 6-8 and 7-9 PM (V2:5600-5608). Ani asked whether a window can be
  7 to 9 (HOME29:7).
- **Ask:** how many windows are there in a day, and what are their start and end times (BC time)?
  Are they the same every day and for every doctor? Who can change them: the practice, or each
  doctor? No number is assumed here.
- **Source:** HOME29:6-11; OQ-34.

### OQ-71 · Where does the time sit: beside the greeting, or in its own pill?
- **Owner:** Manoj (design), with Ani. **Raised:** 30 Sep 2026 (a conflict between sources).
  **Blocks:** REQ-HQ-02; T-008.
- **The conflict:**
  - Daniel, 29 Sep: *"Can we place the timing info next to Good Evening or Good Morning or Good
    Afternoon whatever it might be"* (HOME29:14-15). His arrow runs from the greeting to the pill
    (HOME29:24-25).
  - Ani, 30 Sep: the time moved into its own pill, before the theme button (`b8331e5`;
    V2c:4291-4293).
  - The greeting stays at the top left (V2c:4289, 5547), and the pill is at the top right. So the
    time is still not next to the greeting.
- **Ask:** is the 30 Sep pill a step toward Daniel's placement, or where it ends up? T-008 names
  "time beside the greeting". Daniel's words are the spec, so any other placement goes back to him.
- **Now (30 Sep):** Ani wrote it down as decided: *"The time is in its own pill, before the theme
  button."* (HOME29:43; D-92). Left for Daniel: tell him it is not beside the greeting, and do the
  same for the sidebar, now open by default against his 21 Sep word (D-95). Both go in his next
  batch as information, not as questions.
- **Source:** HOME29:14-15, 24-26; `b8331e5`; T-008 on the task board.

### OQ-35 · The AI line in Needs your attention
- **Owner:** Daniel. **Raised:** 21 Sep 2026. **Blocks:** REQ-HQ-11.
- **Why:** the AI should synthesise the finding in under five words (MTG21:60-62). The spec blocked
  a similar generated care-plan summary on a safety question: is the text verbatim or generated, and
  what is the review path? (SPEC:264-272).
- **Ask:** is a generated five-word line acceptable, and must it quote the report?
- **Now (29 Sep), probably settled; confirm:**
  - His markup crossed off the diagnosis text on the result row, which is where a context line
    would sit (HOME29:29-30).
  - It kept the name, age/sex, test and value (HOME29:31-32).
  - Two things to confirm, in the next batch:
    - Is there no context line on a Home row at all?
    - Does a patient's intake flag still show on the row? Since D-62 its text sits in the crossed
      part (V2c:6301-6303), and there is a "Review intake" button (V2c:6307).
  - The markup is read from an image, and HOME29:23 asks to confirm with Daniel where unsure.
- **Source:** MTG21:60-62; HOME29:23-32; D-62, D-85.

### OQ-92 · Does Home follow the chart's Needs Attention tiers? · Top 8
- **Owner:** Daniel. **Raised:** 3 Oct 2026 (a conflict between sources). **Blocks:** REQ-HQ-12,
  REQ-CH-37; T-020.
- **The conflict:** Home's list holds Critical and High results (rule 16b; ANS27:8; D-78).
  Chart View v2.5 defines Needs Attention on the chart with tiers Critical, To do and Info, and
  "abnormal ≠ actionable" (CV25 §3, §7). ECG Critical v2.0 puts a CRITICAL ECG in Needs Attention
  (ECG20 §4).
- **Ask:** does Home's "Needs your attention" use the chart's tiers, and which of them (Critical
  only, or Critical and To do)? Does a CRITICAL ECG show on Home?
- **Source:** ANS27:7-11; CV25 §3, §7; ECG20 §4; B-006:120-121.

---

## Call

### OQ-06 · What happens when the next patient does not answer?
- **Owner:** Daniel. **Raised:** 15 Sep 2026. **Blocks:** REQ-CALL-02; UC-04.
- **Ask:** does the queue auto-advance? Does the patient keep their position? How long until
  No-show?
- **Source:** SPEC:316-319. PP mentions "a short grace window" (PP:1966), but no rule sets its
  length.

### OQ-21 · Shadowing 3 audio
- **Owner:** Ani. **Raised:** 25 Sep 2026. **Blocks:** REQ-CALL-02 (evidence).
- **Ask:** what happened between 36 s and 45 s: did the patient hang up, did the line drop, or did
  the doctor end the call? Did the product say anything? Did he paste the selected A and P? Did he
  finalize?
- **Source:** S3:111-113.

### OQ-32 · Transfer to the MOA
- **Owner:** Ani. **Raised:** 25 Sep 2026. **Blocks:** REQ-CALL-05.
- **Why:** Daniel said it must be unavailable until a call is live (SIA:52). Chart version C has no
  Transfer. The other layouts show it always enabled (V2:4576).
- **Ask:** is Transfer kept in v2, and where?

### OQ-29 · Do "Rejoin now" and "Reconnect now" let the patient start a call?
- **Owner:** Ani, then Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CALL-06, REQ-PT-07.
- **Why:** calls go outward only (MEM). PP's missed and dropped states offer patient buttons
  (PP:1967-1970). Their effect in production is not documented.

---

## Chart

### OQ-17 · What did production's "Finalize Visit" close?
- **Owner:** Ani (check production), then Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-03,
  REQ-CH-06.
- **Ask:** the old "Charting" note, today's visit, or both?
- **Now (26 Sep):** Daniel: *"So I 'sign off' on the chart - what does that mean? It means the
  chart is completed. What does that mean? It means that i've finalized the visit."*
  (ANS26:18-20). So Finalize is the chart's sign-off and closes the visit (D-71), which matches
  D-65. What production's button closed is still Ani's check.
- **Source:** S2:72; ANS26:18-20.

### OQ-16 · Signing a note that still holds a template placeholder
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-07.
- **Ask:** on a virtual visit with no exam, should sign-off block, or ask? Was the S3 placeholder
  signed knowingly?
- **Source:** S3:48-50, 118; DR:251.

### OQ-37 · Is "Since last visit" generated or verbatim? · ANSWERED 26 Sep 2026
- **Answer (Daniel, 26 Sep 2026):** *"Yes ....exactly - I need a 'Care Plan' and even the last note
  summary is good too"* (ANS26:37).
- **Means:** both belong at the top of the chart: the care plan (the narrative of what we are doing)
  and a summary of the last note (ANS26:39-40). A summary, not only a quote, is acceptable to him.
  Recorded as D-74 and REQ-CH-31.
- **Not answered:** who or what writes the summary, whether the doctor must review generated text,
  and how the product picks the notes that match today's reason. These move to OQ-63.
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocked:** REQ-CH-01, REQ-CH-20.
- **Why:** it summarises the last plan mid-call. SPEC:264-272 treats a generated care-plan summary
  as a clinical-safety question. Build 13:10 shows Plan / Ask about / Pending as short lines beside
  the signed note (V2b:10182). S4 adds a second question: to fit today's reason, something has to
  decide which earlier notes "touch" it (S4:105-107).
- **Asked:** quote the last P section, synthesise it, or both, and what is the review path? Who or
  what decides that a note matches today's reason: the problem list, the category, or AI?

### OQ-63 · The last-note summary: who writes it, and which notes it draws on
- **Owner:** Daniel. **Raised:** 26 Sep 2026 (opened by the answer to OQ-37). **Blocks:**
  REQ-CH-31, REQ-CH-01, REQ-CH-20.
- **Why:** he wants *"a 'Care Plan' and even the last note summary"* at the top (ANS26:37). A
  generated summary of a clinical note was treated as a safety question in the spec (SPEC:264-272),
  and his answer does not say how it is made.
- **Ask:** may AI write the summary from the signed note, marked as machine-written like the intake
  summary (REQ-INT-05)? Or is it the doctor's own words, for example the last P section? Must he
  approve it before it shows? When today's reason is new, is "the last note" the latest note, or the
  latest note about this reason (S4:105-107)?
- **Source:** ANS26:37-40; SPEC:264-272; S4:99-107.

### OQ-20 · Is the production timeline in date order?
- **Owner:** Ani. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-02.
- **Why:** the hernia note sits below a later-looking follow-up (S3:114-115).

### OQ-19 · Where do outside records land, and who tracks them?
- **Owner:** Daniel. **Raised:** 25 Sep 2026; again 26 Sep (S5). **Blocks:** REQ-CH-10,
  REQ-MP-04.
- **Ask:** when a patient sends operative reports or imaging, do they go to Documents, the support
  inbox or the MOA? Who marks the request received?
- **Now:** S5 is the second visit where the doctor asks the patient to send something and nothing
  tracks it (S5:78-82). For a patient-uploaded result, see OQ-52 and OQ-54.
- **Source:** S3:54-57, 116-117; S5:49-54, 78-82.
- **Now (30 Sep), for faxed documents:** DOC21 files each faxed document in a chart section and
  routes it to the responsible physician; patient-provided documents keep "- Patient Provided" in
  the label (§5, §8). Records a patient emails are not covered.

### OQ-18 · Continuity on other platforms · ANSWERED 27 Sep 2026
- **Answer (Daniel, 27 Sep 2026):** *"No - don't mention Rocket or Tia, I ask because many of my
  patients come from there."* (ANS27:38).
- **Means:**
  - Intake does not ask the question, and no competitor is named in intake or anywhere in the
    product (D-81; rule 16a).
  - He asks it himself on the call, because many of his patients come from those platforms
    (ANS27:41-43).
  - REQ-INT-04 is withdrawn. The other-platform half of REQ-CH-16 now has no source of data and is
    on hold.
- **Not carried forward:** a neutral question with no names. His "No" reads as no question at all.
  If one is ever wanted, the wording is his.
- **Owner:** Daniel (the question and its wording), then Ani (where the answer shows). **Raised:**
  25 Sep 2026 (S1); again 26 Sep 2026 (S5). **Blocked:** REQ-CH-16, REQ-INT-04.
- **Why it moved up:** the doctor asked it out loud in 2 of 5 visits, both times in front of a
  chart that said "no previous notes": *"Tia or Rocket"* (S1:10-12), and *"Have we spoken before
  at either Tia Health or Rocket, or is this the first time?"* (S5:26-29). The chart cannot answer
  it (S5:75-77).
- **Ask:** should intake ask "seen on another virtual platform (for example Tia Health or Rocket
  Doctor)?" Should it also ask for the name of a previous family doctor? What does the chart show
  with the answer, and can records be requested from the other platform?
- **Source:** S1:10-12, 29-30; S5:26-29, 75-77, 153-155.

### OQ-31 · The ambient scribe: now, or phase two?
- **Owner:** Daniel. **Raised:** 25 Sep 2026 (a conflict between sources). **Blocks:** REQ-CH-19,
  REQ-CH-28.
- **Why:** SIA:40, 62 defer AI call documentation to phase two. The scribe was built on 9 Sep with
  Daniel's constraints (`1b201eb`). MTG21:29-32 has Daniel writing feedback on "the current AI
  workflow".
- **Ask:** is it in the demo scope?
- **Now:** S5 is the strongest case for capture during the call: a full history said aloud and
  none of it written (S5:37-46, 71-74). REQ-CH-28 depends on this answer.
- **Now (30 Sep), probably now:** Daniel wants *"an AI workflow"* in which, while he talks to the
  patient, *"there's my note"*, and *"At the end of it, the chart's done."* (CHART30:26-31; D-99).
  That reads as in scope now. Confirm with his chart requirements document (OQ-82).

### OQ-81 · "Chase their office": what did it make you think?
- **Owner:** Daniel. **Raised:** 30 Sep 2026. **Blocks:** REQ-CH-31 (the wording of
  specialist-owned items); D-18.
- **Why:** on a specialist's care-plan item he said *"Whoa, Chase their office. The f\*\*\*? I'm
  gonna have to review this."* (CHART30:21-22). It is unclear whether he was surprised or bothered
  (CHART30:24).
- **Ask:** is "Chase their office" wrong, or just unexpected? What should a specialist-owned item
  say instead, if anything?
- **Source:** CHART30:21-24, 52.

### OQ-82 · Daniel's chart requirements document · ANSWERED 3 Oct 2026
- **Answer (3 Oct 2026):** it arrived as Physician Chart View Requirements v2.5 (B-006:6-7). It
  answers "where am I charting?": the note sits beside the context at 1440 px or one tab away
  (CV25 §3). T-021 is unblocked. Recorded as D-106 and REQ-CH-33 to REQ-CH-42.
- **Not answered:** the scribe and AI governance are left to a companion spec still marked TBD, and
  until then Chart View v2.1 applies, which we don't have (CV25 §1). That moves to OQ-91.
- **Owner:** Daniel. **Raised:** 30 Sep 2026. **Blocks:** REQ-CH-33; T-021 (Blocked); UC-09,
  UC-19.
- **Why:** *"So, I'll give a requirements document on the chart itself."* *"I'm going to zero in on
  this tonight"* (CHART30:34-37). The chart is not redesigned until it arrives (CHART30:46-49).
- **Ask:** when can we expect it? Should it cover the ambient scribe, the note's structure and
  sign-off together?
- **Source:** CHART30:33-38, 46-49, 53-54; T-021.

### OQ-91 · Chart View v2.1 and its four companion specs are missing · Top 8
- **Owner:** Daniel (or whoever authors them). **Raised:** 3 Oct 2026. **Blocks:** REQ-CH-36,
  REQ-CH-37, REQ-CH-33 (the AI part), REQ-RX (PharmaNet); T-021.
- **Why:** Chart View v2.5 leaves four areas to companion specs marked TBD: Critical Results &
  Escalation; Prescribing & PharmaNet Access; AI Governance & Scribe; Virtual Care Compliance.
  Until each is published, the matching sections of Chart View v2.1 apply (CV25 §1), and we don't
  have v2.1. The AI part of the chart waits for the AI Governance companion (CV25 §10).
- **Ask:** please send Chart View v2.1, and say when each companion spec is expected and who
  writes it.
- **Source:** CV25 §1, §10; B-006:97-99, 122.

### OQ-42 · Document viewer: share and PDF
- **Owner:** Ani. **Raised:** before 27 Jul 2026. **Blocks:** REQ-CH-18.
- **Ask:** are share and download-as-PDF from the preview still wanted?
- **Source:** SIA:50.

### OQ-43 · Shadowing 4 audio: what was the diverticulitis part?
- **Owner:** Ani (the audio). **Raised:** 25 Sep 2026. **Blocks:** UC-26 (evidence); REQ-CH-20,
  REQ-CH-26.
- **Why:** the recording's title names diverticulitis, but no frame shows anything about it
  (S4:7-9). The audio is not transcribed.
- **Ask:** was it a current episode, a past one, or a reason to be careful with the medication? Did
  it change what he did?
- **Source:** S4:7-9, 135-136.

### OQ-44 · Shadowing 4: was a weight-loss medication prescribed, and who does the paperwork?
- **Owner:** Ani (the audio), then Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-26; UC-26.
- **Ask:** was a medication started, restarted or changed after the recording? Did he use Prescribe
  or hand it to the MOA? Did it need Special Authority or other coverage paperwork, and who does
  that? What happened with the GLP-1 the intake says was tried?
- **Source:** S4:20-21, 128-130, 137-139.

### OQ-45 · When are the latest results "old"?
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-25.
- **Why:** the latest labs in S4 were about a year old (S4:47-48). S4:122-124 proposes "Last drawn
  13 months ago" and a prefilled requisition. No threshold is set here.
- **Ask:** did he order new bloodwork in that visit? Is a stated age plus a draft requisition
  wanted? From what age, and does it differ by test?
- **Source:** S4:122-124, 140.

### OQ-46 · Which tests belong in a reason's preset group?
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-22, REQ-CH-25.
- **Why:** S4:112-115 suggests a weight or diabetes group (glucose/A1c, lipids, kidney, liver,
  TSH). That list is the designer's note, not Daniel's, and is not a clinical rule.
- **Ask:** which reasons get a preset, and which tests are in each? Which result was he looking for
  across the files in S4: glucose, lipids, or an A1c not seen in the frames (S4:141-142)?
- **Source:** S4:112-115, 141-142.

### OQ-47 · Where do weights come from? · ANSWERED 26 Sep 2026
- **Answer (Daniel, 26 Sep 2026):** *"The weights come from me asking the patient. I get my
  patient's to work. It means I get them to do their blood pressures, their weights etc."*
  (ANS26:43-44).
- **Means:** measurements are reported by the patient, and the doctor reads them as a trend
  (ANS26:46-47). Recorded as D-75, REQ-CH-21 and REQ-CH-32.
- **Not answered:** whether the patient enters the reading in the portal or the doctor enters it on
  the call, what "etc." covers, and whether production stores any vitals history. These move to
  OQ-64.
- **Owner:** Ani (check production), then Daniel. **Raised:** 25 Sep 2026. **Blocked:** REQ-CH-21.
- **Asked:** are weights only the patient's own intake answers today? Does production store any vitals
  history? Should a patient-reported weight and a measured one look different?
- **Source:** S4:19-22, 143-144.

### OQ-64 · Patient-reported vitals: who enters them, and where · reworded
- **Owner:** Daniel; Ani (what production stores today). **Raised:** 26 Sep 2026 (opened by the
  answer to OQ-47). **Blocks:** REQ-CH-32, REQ-CH-21, REQ-PT-10.
- **27 Sep:** Daniel replied *"Can clarify patient readings?"* (ANS27:33). The question was unclear.
  **Reworded for round 3:** "When a patient does home blood pressure or weight, how does the number
  reach you today? Do they type it into the SimpleCare app, tell you on the call so you type it, or
  send a photo? Which do you want?"
- **Why:** *"I get them to do their blood pressures, their weights etc."* (ANS26:43-44). The answer
  file reads this as "portal or on the call" (ANS26:46-47); Daniel did not say which. v2's "Last
  vitals" shows one static set, including heart rate and temperature, with no source
  (V2b:4643-4650).
- **Ask:** does the patient type readings into the patient portal, does he type what they tell him
  on the call, or both? Which measurements beyond BP and weight does "etc." cover? Should a reading
  he enters on the call look different from one the patient entered? Does production keep any
  vitals history? No target or cut-off is assumed here.
- **Source:** ANS26:43-47; S4:19-22, 143-144; V2b:4643-4650.

### OQ-48 · How do lab PDFs get onto the chart? · ANSWERED 26 Sep 2026
- **Answer (Daniel, 26 Sep 2026):** *"yes....it is madness that I am opening up raw pdf's to find
  out what the f\*\*\* is going on."* and *"We need API access so that we get the results from the
  source."* (ANS26:50, 56).
- **Means:** the fix is not a better PDF upload. Results must be data (values and trends by test),
  taken from the source by integration (ANS26:52, 59). Recorded as D-76, D-77, REQ-CH-22 and
  REQ-IN-12. Anything that still arrives as a file (a patient upload, a fax) keeps REQ-CH-23's
  naming and sorting.
- **Not answered:** how the MOA uploads today, and how much can be read from a scanned report.
  With the direction set, these matter only for the fallback; which source comes first is OQ-65.
- **Owner:** Ani and Daniel. **Raised:** 25 Sep 2026. **Blocked:** REQ-CH-22, REQ-CH-23; UC-26.
- **Why:** every file in S4 had the same upload date and a generic name, with a duplicate
  (S4:40-45).
- **Asked:** does the MOA upload them in batches? Could the upload step capture the collection date
  and test names, or can they be read from the PDF? How much can be read from a scanned report?
- **Source:** S4:116-121, 145-146.

### OQ-49 · Shadowing 4: did the eye click fail?
- **Owner:** Ani (the audio, or production). **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-24
  (evidence).
- **Ask:** at 115 s the eye on a July file opened nothing. Was it a fault, or did he move away
  before the viewer opened?
- **Source:** S4:52-53, 147.

### OQ-52 · What is "the follow-up section of SimpleCare"?
- **Owner:** Ani (check the production patient app). **Raised:** 26 Sep 2026. **Blocks:**
  REQ-PT-09, REQ-CH-29.
- **Why:** the doctor told the patient to *"attach it to the chart under the follow-up section of
  SimpleCare"* (S5:49-51). v2's patient portal has only a general "Add a document" saved to health
  records (PP:929-933, 2279-2282).
- **Ask:** is it a real upload place in production? Does an upload there reach the doctor, or land
  in a general document list?
- **Now (26 Sep):** Daniel calls the patient upload a stopgap, *"I am relying on patients to help
  me."*, and wants results from the source (ANS26:56; D-77). An upload stays as the fallback,
  marked patient-supplied (REQ-IN-13), so this check is still needed but no longer decides the
  main route.
- **Source:** S5:49-51, 158-159.

### OQ-53 · Can SimpleCare get an outside result directly? · ANSWERED 26 Sep 2026
- **Answer (Daniel, 26 Sep 2026):** *"The fact that i need to do this is wild"* and *"We need API
  access so that we get the results from the source. I am relying on patients to help me."*
  (ANS26:55-56).
- **Means:** yes, that is the goal: results come from the lab or source by API. Until then a patient
  upload is the fallback, and it is marked patient-supplied (ANS26:59-60). Recorded as D-77,
  REQ-IN-12 and REQ-IN-13.
- **Not answered:** who orders in a case like S5, and whether SimpleCare can be named as a copy-to
  in the meantime. Which source to connect first is OQ-65.
- **Owner:** Daniel. **Raised:** 26 Sep 2026. **Blocked:** REQ-CH-29.
- **Why:** the bloodwork was ordered elsewhere, so the result will not come to him by itself; it
  depends on the patient uploading it (S5:52-54).
- **Asked:** who usually orders it in a case like this: the hospital or the previous clinic? Could
  SimpleCare be named as a copy-to, so the result arrives in the Inbox? Until then, is a patient
  upload the plan?
- **Source:** S5:52-54, 160-161.

### OQ-65 · Which result source is connected first? · reworded
- **Owner:** Daniel (the source and the access); Ani (what the demo shows). **Raised:** 26 Sep 2026
  (opened by the answers to OQ-48 and OQ-53). **Blocks:** REQ-IN-12, REQ-CH-22, REQ-CH-29.
- **27 Sep:** Daniel replied *"Can you clarify your question surrounding labs?"* (ANS27:28). The
  question was unclear. **Reworded for round 3:** "Which lab sends you the most results today? We
  would show that lab's results as numbers first. And is Accelerus, from your 21 Sep next steps,
  the company that would send them?"
- **Why:** *"We need API access so that we get the results from the source."* (ANS26:56). The only
  lab named in the sources is LifeLabs, whose BC critical list sets the Inbox tiers (MTG21:75;
  REQ-IN-07). His 21 Sep next steps include "Contact Accelerus to finalise onboarding and secure API
  access" (MTG21:31); what Accelerus provides is not recorded.
- **Ask:** which source first: LifeLabs, other BC labs, hospital results, or all through one
  provider? Is the Accelerus access that route? Until it exists, should the demo show results as
  data labelled with their source?
- **Source:** ANS26:50-60; MTG21:31, 75.

### OQ-54 · Should a patient upload prompt a doctor review?
- **Owner:** Daniel. **Raised:** 26 Sep 2026. **Blocks:** REQ-PT-09, REQ-CH-29.
- **Why:** the plan was *"and then we can review together"* (S5:50-51). A patient-uploaded lab is
  an external report, and every external result is reviewed and signed off (REQ-IN-01), but the
  Inbox holds external reports "only" and today they come from labs and faxes (REQ-IN-02). An
  upload could also be tiered by the LifeLabs list (REQ-IN-07) or not.
- **Ask:** does a patient upload go to the Inbox for review and sign-off, to Home, or only to the
  chart? Is it tiered like a lab report? When the expected result is overdue, does he want to see
  that, and does he or the MOA chase it (a task only if he presses Task)?
- **Now (26 Sep):** a patient upload is only a fallback and is marked patient-supplied
  (ANS26:59-60; D-77, REQ-IN-13). Where it lands, and whether it is tiered, is still his call.
- **Source:** S5:49-54, 112-114, 131-140; REQ-IN-01, REQ-IN-02; ANS26:59-60.

### OQ-57 · Medication reconciliation for medications started elsewhere
- **Owner:** Daniel. **Raised:** 26 Sep 2026. **Blocks:** REQ-CH-27, REQ-CH-28.
- **Why:** in S5 three medications started in hospital, and a dose change, came only from what the
  patient said. The medication list was never opened (S5:33-46).
- **Ask:** is a patient-reported line enough, or does he want the hospital discharge summary
  requested? Who requests it: he, the MOA or the patient? Did he add the three medications to the
  medication list after the call, and how much of the history went into the note? No clinical
  follow-up for the diagnosis is assumed here (S5:166-168).
- **Source:** S5:33-46, 162-163, 166-168.

### OQ-59 · Shadowing 5: what happened before and after the recording?
- **Owner:** Ani. **Raised:** 26 Sep 2026. **Blocks:** UC-27 (evidence).
- **Ask:** the first call attempt happened before the recording began: did it fail, or did the
  patient miss it? After the call: was the note written, were the instructions sent, and how
  (a template, a typed message or the MOA)?
- **Source:** S5:13-15, 66-68, 164-165, 171.

---

## Prescribing

### OQ-08 · Who sends renewal faxes? · ANSWERED 26 Sep 2026
- **Answer (Daniel, 26 Sep 2026):** *"Either can send - Japneet [has] prescribing experience, but I
  also have my favorite's pre-populated. So if I am f\*\*\*ing around, she sends it. If I think
  she'll f\*\*\* it up, then i send it."* (ANS26:8-9).
- **Means:** "Send it myself" and "Ask the MOA to send" are equal choices, the doctor's call each
  time, so neither is the default or the primary button (ANS26:12-13). Recorded as D-72 and
  REQ-RX-10. Build 13:10 makes "Review & fax" primary (V2b:4601-4602), which no longer matches.
- **Opened:** OQ-60 (favourites) and OQ-61 (whose sign-off it is when the MOA sends).
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocked:** REQ-RX-01, REQ-RX-07.
- **Why:** S1 suggests the doctor faxes; S2 suggests the MOA, on a spoken instruction (S2:38-39,
  73-74). The answer decides whether "Send by fax" or "Ask MOA to send" is the primary button
  (DR:243-244). Build 13:10 has both, with "Review & fax" primary and "Ask MOA to send" secondary
  (V2b:4601-4602, D-64). The designer raised it again on that build.
- **Asked:** which should be primary, or should it follow the pharmacy or the drug?

### OQ-09 · Renewal quantity rules · next batch
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-RX-02, REQ-RX-03.
- **Not yet asked:** it was on our round-2 list, but the batch Ani sent had backend documentation as
  its item 8 instead (ANS27:55-59). It goes in the next batch.
- **Why:** v2 ties "3 months" to 90 tablets whatever the directions. A twice-daily drug is sent
  short, and the note records it (DR:75-77).
- **Ask:**
  - Is 3 months the default for every chronic medication?
  - Are there drugs he would not default to 90 days, such as controlled substances or drugs being
    titrated?
  - Does the quantity come from directions × days, or does he always type it?
- **Now:** build 13:10 defaults to 3 months and computes directions × days (`rxQty` V2b:9911,
  D-63). The designer asks again: is 3 months the default supply for every chronic medication?
- **Now (26 Sep):** the doctor keeps favourite prescriptions pre-populated (ANS26:8-9, D-73). If a
  favourite holds the quantity, the rule may be his per drug rather than the product's. Ask with
  OQ-60.
- **Source:** DR:240-242; S1:15-16; S2:30-32; `d2a2823`; ANS26:8-9.

### OQ-50 · What real signal says a fax was delivered, or failed?
- **Owner:** Ani (production and the fax provider). **Raised:** 25 Sep 2026. **Blocks:** REQ-RX-05.
- **Why:** build 13:10 shows "Sending", then "Delivered" after a 5 s demo timer (V2b:10066-10074).
  In production the patient gets a copy as proof of delivery, and the doctor sees nothing (S1:17-19).
- **Ask:** what does the fax service report, and when? What should a failed fax say, and who
  retries it: the doctor or the MOA?

### OQ-55 · Recording a decision not to prescribe
- **Owner:** Daniel. **Raised:** 26 Sep 2026. **Blocks:** REQ-RX-09.
- **Why:** the outcome of S5 was no refill until after the bloodwork, and nothing recorded it or
  the date the supply runs out (S5:55-59).
- **Ask:** is a note line enough, or should the medication itself show "no renewal · next review
  after <item>"? Does he want the supply-until date kept, and a warning before it runs out? If so,
  how many days before? No number is set here.
- **Source:** S5:55-59, 118-121.

### OQ-60 · Favourite prescriptions: where they live and who manages them · ANSWERED 27 Sep 2026
- **Answer (Daniel, 27 Sep 2026):** *"They live in the Rx function. I manage them."* (ANS27:23).
- **Means:** favourites belong to the prescribing (Rx) function, and the doctor adds and changes
  them (ANS27:25). Recorded as D-80 and REQ-RX-11.
- **Not answered, and moved:**
  - what a favourite holds, and whether it carries the quantity: OQ-09;
  - whether Japneet may send from one: OQ-70;
  - whether favourites are shared with other doctors. His "I manage them" suggests they are his
    own (inference). Ask only if it matters.
- **Owner:** Daniel. **Raised:** 26 Sep 2026 (opened by the answer to OQ-08). **Blocked:**
  REQ-RX-11, REQ-RX-02.
- **Why:** *"I also have my favorite's pre-populated."* (ANS26:8-9). v2 has no favourites; the
  renewal card starts from the patient's medication list only (`RX_MEDS` V2b:9894).
- **Ask:** where are they today (production's prescribing screen, or somewhere else)? What does one
  hold: drug, strength, directions, quantity, supply, repeats? Are they his alone, or shared with
  other doctors? Who may add or change one: only him, or the MOA too? Can the MOA send from one?
- **Source:** ANS26:8-14.

### OQ-61 · When the MOA sends a renewal, whose sign-off is it? · ANSWERED 27 Sep 2026
- **Answer (Daniel, 27 Sep 2026):** *"Always me. I can delegate authority to Japneet, but it is my
  responsibility. She uses the Physician Assistant Portal - which is identical to my portal."*
  (ANS27:14-15).
- **Means:**
  - The sign-off is always the doctor's. He delegates the action, never the responsibility.
  - The person who sends is **Japneet, the physician assistant**, not an MOA. She works in a
    Physician Assistant portal identical to his (ANS27:18-20).
  - So the second route on the renewal card is a delegation to the PA, under his sign-off. It is
    not an MOA task. Recorded as D-79; REQ-RX-07 and REQ-RX-10 are reworded.
- **What the build does now (V2c):**
  - The button reads "Ask Japneet to send" (V2c:10113).
  - But she is modelled as the MOA buddy (V2c:6870-6871).
  - The route files an MOA task at routine priority (V2c:10183).
  - The note line reads "Sent to Japneet (MOA) to fax", with no sign-off by the doctor
    (V2c:10187).
- **Not answered, and moved to OQ-70:** what the record says, whether he sees the script first,
  and whether Japneet may send from his favourites.
- **Owner:** Daniel. **Raised:** 26 Sep 2026 (opened by the answers to OQ-08 and OQ-10).
  **Blocked:** REQ-RX-10, REQ-RX-07, REQ-UI-06.
- **Why:** either can send (ANS26:8-9), but *"To Fax is to 'sign off' on the script"* and *"The
  Doctor has approved this, meaning my a\*\* is on the line."* (ANS26:22-25). When the MOA sends,
  it is not clear who has signed off. Build 13:10 puts "Ask MOA to send" through the doctor's own
  check step first (V2b:10014), which may be more than he wants when he hands it off.
- **Ask:** when he asks the MOA to send, has he signed off at that moment, or does the MOA's send
  carry his name? Does he see the script before it goes, or only after? Should the visit's record
  say "sent by <MOA> for Dr. <name>"? No prescribing rule is assumed here.
- **Source:** ANS26:8-9, 17-34; V2b:10014, 10055-10064; ANS27:13-20.

### OQ-70 · A script Japneet sends for the doctor: the record, and what she may use
- **Owner:** Daniel. **Raised:** 30 Sep 2026 (opened by the answer to OQ-61). **Blocks:**
  REQ-RX-07, REQ-UI-06, REQ-RX-11; UC-30. Hazard HZ-09 in the clinical-safety log.
- **Why:**
  - *"Always me. I can delegate authority to Japneet, but it is my responsibility."* (ANS27:14).
  - The build's note line says "Sent to Japneet (MOA)" and carries no sign-off by the doctor
    (V2c:10187).
  - The build files the task at routine priority, and HZ-09 names the gap that opens: S1's patient
    had already run out a week earlier (`product/reports/clinical-safety-hazard-log.md`, HZ-09).
- **Ask:**
  - When Japneet faxes a script for you, should the record read "sent by Japneet (PA) for
    Dr. <name>", with your sign-off time?
  - Do you sign off when you hand it to her, or when she sends it?
  - Do you see the script before it goes, or only after?
  - May she start from your favourites?
  - Can she send tasks to the MOA in her own right? The team rules mark this as not yet decided
    (rule 12).
  - No prescribing rule is assumed here.
- **Source:** ANS27:13-20; V2c:6870-6871, 10183-10187; `product/handbook/01-rules.md` rule 12.

---

## Inbox and review

### OQ-10 · Review versus sign-off · ANSWERED 26 Sep 2026
- **Answer (Daniel, 26 Sep 2026):** *"Reviewing is separate, all it means is that the Doctor is
  assessing - it means no further action is necessarily to be taken until such time as I review and
  sign off. To sign off is typically an action."* Then: *"To Fax is to 'sign off' on the script"*,
  *"To submit a bill is to 'sign off' on your billing."*, *"It is action oriented."* and *"The
  Doctor has approved this, meaning my a\*\* is on the line."* (ANS26:17-25).
- **Means:** reviewed is a state (the doctor is assessing); sign-off is a separate, accountable
  action by the doctor. So the two stages stay. Signing off the chart is finalizing the visit,
  faxing is signing off the script, and submitting a bill is signing off the billing (ANS26:27-34).
  Recorded as D-71 and REQ-UI-06.
- **Not answered:** whether this is a legal or College rule (he answered in terms of his own
  accountability, not a regulation), and whether one press may record "No follow-up required" and
  sign off a routine result. The second moves to OQ-62.
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocked:** REQ-IN-01, REQ-IN-11.
- **The conflict:** v7 §5.6 replaced review-then-sign-off with one question (`1e6c53f`). The
  stakeholder interview asks for every result to be "reviewed and individually signed off" (SIA:22).
  v2 has both steps, so a normal result takes four actions (DR:168-170).
- **Asked:** is the separate sign-off a legal or College requirement? Can a physician's "No follow-up
  required" on a routine result count as sign-off?

### OQ-11 · First contact on a critical result
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-RV-07.
- **Ask:** when the patient is already in today's queue, should the default be "I call now" rather
  than "the MOA calls and hands over"? Is there a policy on who makes first contact?
- **Now:** build 13:10 shows "Call now" as a secondary button beside Accept & assign when the
  patient is queued (V2b:8998-9006, D-67). The designer asks whether it should be primary there.
- **Source:** DR:144-146, 247-248; `2094417`, `d2a2823`.

### OQ-62 · One press to sign off a routine result, and signing off in a batch
- **Owner:** Daniel. **Raised:** 26 Sep 2026 (opened by the answer to OQ-10). **Blocks:**
  REQ-IN-11, REQ-IN-01.
- **Why:** reviewed and signed off stay separate (ANS26:17-20), and sign-off carries his
  accountability (ANS26:25). A normal result still takes four actions (DR:168-170), and 14 routine
  results take 14 round trips (DR:157-170).
- **Ask:** may one press on a routine result say "No follow-up · sign off" and do both? Is signing
  off several reviewed results together acceptable, or must each be its own action?
- **Source:** ANS26:17-25; DR:157-170.

### OQ-07 · Interrupting a call for a new critical result
- **Owner:** Daniel. **Raised:** 15 Sep 2026. **Blocks:** REQ-RV-07, REQ-CH-13.
- **Ask:** is the doctor interrupted mid-call when a critical result arrives, and how?
- **Source:** SPEC:320-321.

### OQ-12 · Tiering for results with no LifeLabs limit
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-IN-07.
- **Ask:** an ECG showing a new arrhythmia sits in Routine beside a critical troponin for the same
  patient. Should a related result inherit urgency, or be grouped with it? Is haemoglobin 71 g/L
  routine under his mapping? No threshold is set here.
- **Source:** DR:161-163, 236-239.
- **Partly answered (30 Sep):** the abnormal ECG gets its own yellow card under the critical one
  (*"boom and then boom"*), not a Routine row (ECG30:11-13; D-97). He calls AFib *"important"* and
  will define critical ECG findings (OQ-74). Still open: haemoglobin 71 g/L, and whether a related
  lab result inherits urgency.

### OQ-13 · Digoxin
- **Owner:** Daniel. **Raised:** 18 Sep 2026. **Blocks:** REQ-IN-07.
- **Why:** the published row extracts as "Less than 3.5 nmol/L", so the direction is ambiguous, and
  it is not encoded.
- **Source:** `4fc705b`; V2:7576-7580.

### OQ-14 · The rest of the SimpleCare escalation table
- **Owner:** Daniel (his Notion task). **Raised:** 19 Sep 2026. **Blocks:** REQ-IN-07.
- **Why:** only cardiac and perfusion are filled in: *"I am going to review each type of task add
  that information into notion"*.
- **Source:** `94ff101`.

### OQ-38 · Where are pending results shown after the fast ones are cleared?
- **Owner:** Ani. **Raised:** 15 Sep 2026. **Blocks:** REQ-IN-09.
- **Why:** SPEC:234-241 (the STI-panel case). The global strip was removed (V2:4846) and nothing has
  replaced it.
- **Now (30 Sep):** DOC21 §6 tracks "Remaining Results" on a linked order, so the physician sees
  which ordered tests have not returned. That is a source for the shape; where it shows is still
  Ani's.

### OQ-74 · Which ECG findings count as critical? · ANSWERED 3 Oct 2026
- **Answer (ECG Critical Result Requirements v2.0, forwarded 3 Oct 2026):** one priority only,
  CRITICAL ECG. An ECG gets it when its printed interpretation holds a phrase from the trigger
  dictionary, or the source explicitly marks it critical or urgent (ECG20 §3-§4). The matched
  phrases show verbatim (ECG20 §5). "Abnormal ECG" alone is not a trigger, and plain atrial
  fibrillation without a source critical flag is not critical (ECG20 §2-§3; B-006:17-19, 35-39).
- **Means:** the demo's AF ECG rightly stays a yellow "Abnormal ECG" (D-97). A CRITICAL ECG goes
  to Needs Attention with its printed phrases, the source of the interpretation, times,
  measurements and the original one click away, until a physician documents the review (D-105,
  REQ-IN-23). The dictionary itself lives in ECG20 §3 and is not copied here.
- **Not answered:** the card's exact words beyond "CRITICAL ECG" plus the verbatim phrase; that is
  copy for Manoj. Which tier name the chart uses is OQ-76.
- **Owner:** Daniel (he is writing the protocol). **Raised:** 30 Sep 2026. **Blocks:** REQ-IN-15,
  REQ-IN-14; HZ log (three flag levels); UC-32.
- **Why:** *"We'll have our own protocols. Like, if the ECG is saying, you know, STEMI or AFib, or
  then we'll note that."* *"I know I haven't clarified what constitutes critical as far as ECG. Are
  concerned. … I'll get that done."* (ECG30:25-30). Until the list exists, the demo ECG shows as a
  yellow "Abnormal ECG" (ECG30:61-63). He named examples; no list is assumed here.
- **Ask:** please send the list of ECG findings that make an ECG critical. When one is critical,
  the card turns red and names the finding: what exactly should it say?
- **Source:** ECG30:24-30, 60-63; D-97.

### OQ-75 · What does "clear" mean: the same as signing off, or lighter? · Top 8
- **Owner:** Daniel. **Raised:** 30 Sep 2026 (ECG30, and a conflict with DOC21). **Blocks:**
  REQ-IN-16, REQ-IN-19, REQ-IN-01; UC-32.
- **The two sides:**
  - Daniel, 30 Sep, on a yellow flag: *"did the doctor like clear this or what do we do?"*
    (ECG30:44-46). v2 treats "cleared" as "its result is signed off" (ECG30:57-58; V2d:11003-11010).
  - DOC21 §9: clearing an attention card must not close the Inbox report unless the physician
    completes the review. So clearing and completing the review are two acts there.
  - Reviewed is a state and sign-off an accountable action (D-71). "Clear" is a third word.
- **Ask:** when you clear a yellow result, is that your sign-off on it, or a lighter "seen"? And
  does clearing a card on Home leave the Inbox report open until you sign it off?
- **Source:** ECG30:39-46, 64-65; DOC21 §9; B-003 conflicts; D-71, D-98.

### OQ-76 · Priority names: four vocabularies, one answer needed · Top 8
- **Owner:** Daniel, or Ani. **Raised:** 30 Sep 2026 (a conflict between sources). **Blocks:**
  REQ-IN-18, REQ-HQ-12, REQ-IN-03.
- **The conflict:** DOC21 names the elevated levels HIGH and URGENT (§4, §9, §14). Daniel's words
  and v2 use Critical and High (ANS27:8; ECG30:33-38; `labTier` V2d:8178). Rule 16b says "Critical
  and High". Not resolved here.
- **Ask:** which words does the product use? If URGENT is DOC21's name for Critical, say so, and
  the documents can be aligned.
- **Source:** DOC21 §4, §9, §14; ANS27:7-11; ECG30:32-42; B-003 conflicts.
- **Now (3 Oct), four versions:**
  - Daniel, 27 and 30 Sep, and v2: Critical, High, then yellow abnormal (ANS27:8; ECG30:32-42).
  - Document Routing v2.1: HIGH / URGENT (DOC21 §4, §9).
  - ECG Critical v2.0: one priority, CRITICAL ECG (ECG20 §4).
  - Chart View v2.5: Critical, To do, Info, for Needs Attention on the chart (CV25 §3). It defers
    classification to a Critical Results & Escalation spec that is not written (CV25 §1; OQ-91).
  - **Ask, reworded:** which one vocabulary do Home, the Inbox and the chart use? Is CRITICAL ECG a
    kind of Critical? Is "High" the chart's "To do"? Whether Home follows the chart's tiers is
    OQ-92.
  - **Blocks also:** REQ-CH-37, REQ-IN-23.

### OQ-78 · Two companion documents for document routing are missing
- **Owner:** Daniel (or whoever authors them). **Raised:** 30 Sep 2026. **Blocks:** REQ-IN-18,
  REQ-IN-20, REQ-CH-23; UC-33.
- **Why:** DOC21 says engineering must receive with it the **Simple Clinical Document Labelling
  Standard** and the **Review Labwork Attention Protocol**. It also says attention protocols for
  imaging, pathology and hospital/ED documents are still to be written (DOC21 header, §9). Until
  then those documents are protected only by review time limits and the critical-signal handoff.
- **Ask:** when can we have the two documents? Who writes the imaging, pathology and hospital/ED
  protocols?
- **Source:** DOC21 header, §5, §9; B-003 conflicts.

### OQ-85 · Confirm document routing's proposed time limits and return windows
- **Owner:** Daniel. **Raised:** 3 Oct 2026. **Blocks:** REQ-IN-20, REQ-IN-22.
- **Why:** DOC21 gives review time limits by document type (§9) and expected-return windows by
  order type (§6), each marked "proposed default, clinic-configurable". They are clinical safety
  values, so the docs quote them as proposals only.
- **Ask:** are DOC21's defaults the ones to build with? Who can change them later?
- **Source:** DOC21 §6, §9.

### OQ-86 · Overdue results: an automatic MOA task, or the doctor presses Task? · Top 8
- **Owner:** Daniel. **Raised:** 3 Oct 2026 (a conflict between sources). **Blocks:** REQ-IN-22,
  REQ-CH-29, REQ-TK-01.
- **The conflict:** DOC21 §6 says an order past its expected window goes on the ordering
  physician's Overdue list "and an MOA follow-up task is created". Our rule is that a task exists
  only when the doctor presses Task (rule 12; REQ-TK-01: *"no automatic tasks"*; REQ-CH-29: "the
  doctor … decides whether to task the MOA").
- **Ask:** may the system create the MOA follow-up task by itself for an overdue result, or does
  the overdue item wait for you to press Task?
- **Source:** DOC21 §6; `9b7b5f6`; REQ-TK-01, REQ-CH-29.

---

## MOA hand-off and tasks

### OQ-41 · What counts as "picked up"?
- **Owner:** Ani, then Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-TK-03, REQ-RX-07, REQ-MP-03.
- **Ask:** is a task picked up when it is opened, accepted, or started? Who sees it, and when?
- **Now:** build 13:10 shows "Picked up by <MOA>" on the renewal card after a 7 s demo timer
  (V2b:10060-10064). No real signal exists yet.
- **Still open (26 Sep):** the heading of Daniel's first answer names "what 'picked up' means"
  (ANS26:7), but his words answer only who sends (ANS26:8-9). Nothing in them defines picked up.
- **Source:** S2:38-40, 62-63; `d2a2823`; ANS26:7-9.

### OQ-15 · Time tolerance values
- **Owner:** Daniel. **Raised:** 19 Sep 2026. **Blocks:** REQ-TK-05, REQ-TK-09.
- **Why:** he confirmed the shape (24h / 3 days / 1 week) and one value in use today. v2 derives
  same day / within 24h / within 1 week from priority, marked "until he fills the rest in"
  (V2:6620-6631). That mapping is an assumption.
- **Source:** `94ff101`.

### OQ-22 · Where does the doctor's own unfinished work live?
- **Owner:** Daniel and Ani. **Raised:** 25 Sep 2026 (a conflict between sources). **Blocks:**
  REQ-TK-07.
- **Why:** *"Yours should stay on your dashboard"* (SIA:30) conflicts with `8e14497`, which moved it
  off Home. v2 shows only urgent, high or overdue tasks on Home.
- **Now (29 Sep):** Daniel crossed off the task row in Needs your attention (HOME29:27-28; D-85).
  The row he crossed was a task delegated to an MOA, not one of his own. So it is still open
  whether his own unfinished work belongs somewhere on Home. It is not in the attention list.

### OQ-23 · Names for self-carry and Carry Forward
- **Owner:** Daniel. **Raised:** before 27 Jul 2026. **Blocks:** REQ-TK-07.
- **Why:** he floated "remind me later" and did not settle it (SIA:54). He dislikes "tickle"
  (SIA:22).

### OQ-83 · When the paired MOA changes between windows, what does the chat show?
- **Owner:** Daniel. **Raised:** 30 Sep 2026. **Blocks:** REQ-TK-12, REQ-MP-05; UC-31.
- **Why:** the pairing can change by call window: *"During any particular call window, we will see
  what we can [staff] them out to."* (MOA30:12). The new MOA is named (B-002:32-33). How the
  earlier conversation carries over is marked Needs Daniel (B-002:34).
- **Ask:** when the doctor's MOA changes at a window boundary, does the new MOA see the earlier
  conversation, and does the doctor? Who answers chat between windows?
- **Source:** MOA30:7-21; B-002.
- **Now (3 Oct), mostly answered:** each doctor has one primary MOA, the same one every time
  (private strategy, 3 Oct 2026 (confidential); D-103). So the MOA doesn't normally change by
  window. **Still open:** who answers the chat, and sees its history, when the primary MOA is away?

### OQ-93 · What does "CRM" mean for the MOA?
- **Owner:** Daniel. **Raised:** 3 Oct 2026. **Blocks:** REQ-MP-07; UC-21.
- **Why:** MOAs also do billing work and CRM, and the MOA portal must make one MOA effective
  across several doctors with AI help (private strategy, 3 Oct 2026 (confidential); D-103). "CRM"
  is not defined.
- **Ask:** does CRM mean keeping in touch with physicians, reaching out to patients (reminders,
  recalls, follow-ups), or both? What should the MOA portal give her for it?
- **Source:** private strategy, 3 Oct 2026 (confidential).

---

## Intake

### OQ-40 · Which patient-written requests get flagged?
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-INT-03.
- **Ask:** referral requests to named clinics, as in S2:41-42, and what else? Who acts on the flag?

### OQ-58 · Taking a new patient into ongoing care
- **Owner:** Daniel. **Raised:** 26 Sep 2026. **Blocks:** REQ-ID-06.
- **Why:** *"I'm running this platform for continuity"*, said to a patient who lost their family
  doctor. Nothing on screen records that the patient is staying (S5:30-32, 90-92).
- **Ask:** does he attach new patients to his panel today, and how? What should marking a patient
  as continuing with him do: a header label, booking follow-ups with him, anything formal? No
  attachment rule is assumed here.
- **Source:** S5:30-32, 90-92, 149-152, 169-170; SIA:16.
- **Now (30 Sep and 2 Oct), partly sourced:** IB7 §15 makes ongoing care an explicit patient
  choice through a Family Doctor pathway, with physicians accepting new patients, and never an
  automatic attachment from episodic visits. IN23 adds separate physician pools for episodic and
  comprehensive care (§8, AI-16). Still open: how the doctor marks the attachment on the chart.

### OQ-67 · Which concerns are quick-book, and which are triage-first? · Top 8
- **Owner:** Daniel. **Raised:** 29 Sep 2026. **Blocks:** REQ-INT-08; T-014; UC-24.
- **Why:**
  - Straightforward concerns get a quick-book tile: *"those can be displayed … We do that
    already."* His example card holds Rx Renewal, Sick Note, Bladder Infection, Birth Control Refill
    and "+6 More" (BOOK29:11-13).
  - Complicated ones go through triage first: *"Diarrhea is more complicated/Constipation is more
    complicated etc"*, and hemorrhoids (BOOK29:14-19).
  - Acid reflux sat on the same gastrointestinal card, and he didn't classify it.
  - Which group a concern is in is his call (B-001). No concern is classified here beyond his own
    examples.
- **Ask:**
  - Please send the list of every bookable concern, each marked quick-book or triage-first.
  - What are the "+6 More"?
  - Does a concern's group ever change, for example with age or a repeat visit? No rule is assumed.
- **Source:** BOOK29:10-19, 47-51; B-001 item 2.
- **Now (2 Oct):** IN23 keeps each pathway's questions, slots and stop rule in a versioned registry
  that the Clinical Director edits (ENG-10, §11, AC-28). That is where the list would live.

### OQ-68 · Triage for a patient who won't use the AI
- **Owner:** Daniel (the questions), Ani and Manoj (where it sits). **Raised:** 29 Sep 2026.
  **Blocks:** REQ-INT-10; T-015; UC-28.
- **Why:**
  - *"Some people f\*\*\*ing hate AI."* (BOOK29:23), so every pathway must work without the AI
    (D-90).
  - But a complicated concern is triaged by the AI, which *"can triage in a superior manner than
    x 4 static questions"* (BOOK29:17-18).
  - So a patient who refuses the AI and has a triage-first concern has no triage today. B-001's
    self-check marks this Needs Daniel/Ani.
- **Ask:**
  - For those patients, is triage a short form, the clinic phone line, or both?
  - Who writes the questions?
  - If the phone line itself becomes AI (BOOK29:24), what does a patient who refuses AI get on the
    phone?
- **Source:** BOOK29:17-18, 22-26, 54-55; B-001; T-015 on the task board.
- **Now (2 Oct):** IN23 keeps the service cards and a non-AI direct-booking path working when the
  AI is down (AI-21, AC-27). It does not say how a triage-first concern is triaged without the AI.

### OQ-69 · The red-flag list and the emergency wording · Top 8
- **Owner:** Daniel (the list and the words); Manoj (the look, including whether it uses red), with
  Ani approving (rule 17a). **Raised:** 29 Sep 2026. **Blocks:** REQ-INT-07, REQ-INT-11; T-012;
  UC-29.
- **Why:**
  - Booking is open *"so long as it is not an Emergency"* (BOOK29:32-33). The emergency is the
    only hard stop.
  - On staging, "chest pain, can't breathe" gets doctors and call windows instead of "call 911". A
    red flag mid-chat is missed, and a confirmed emergency goes back to routine questions (QA29:12,
    QA-001 to QA-004).
- **Ask:**
  - Which symptoms or phrases count as an emergency?
  - Is the same list used in the chat, on the tiles and on the phone line?
  - What exactly does the patient read: 911, the ER, or both? Anything for a mental-health crisis?
  - What happens when the patient says "it's not an emergency"?
  - No clinical list or wording is invented here. The designer uses marked placeholders (T-012).
- **Source:** BOOK29:31-34, 45-46; QA29:12, 22-23; rule 17a; T-012.
- **Now (30 Sep), a draft source:** ES3 sets out hard-stop domains (§4), triage-first safety
  questions (§5), what happens on a hard stop (§7) and default BC messages per domain (§7), with
  "Final wording requires physician approval". IN23 adds a first-prompt acknowledgement with
  recommended wording (§5). So the ask becomes: **approve ES3's domains and messages**, and settle
  OQ-79 (how deep the screening goes). The look is still Manoj's.

### OQ-72 · WhatsApp or text booking
- **Owner:** Daniel (whether and when); `privacy-security` must review before any design.
  **Raised:** 29 Sep 2026. **Blocks:** REQ-INT-09 (the messaging pathway only).
- **Why:** *"And indeed - we ought to even have WhatsApp? Text based booking … why not."*
  (BOOK29:26). It is a pathway, but not a decision: the booking file marks it "not yet decided"
  (BOOK29:52-53). Health information in a messaging app raises privacy questions (rule 8; the
  standards in `product/team.md`). No channel is assumed here.
- **Ask:** is WhatsApp or text booking wanted, and in which phase? Should it only book, or also
  triage?
- **Source:** BOOK29:26, 52-53.

### OQ-73 · How long is a chosen window held before sign-up?
- **Owner:** Daniel (Ani relays). **Raised:** 29 Sep 2026 (T-014). **Blocks:** REQ-INT-09; T-014.
- **Why:** on staging the patient's window isn't held before the account step (QA29:16). T-014 asks
  for a visible hold ("Holding 6–8 PM with Dr. X for 10 min") and lists its length as Needs Daniel.
  The "10 min" is T-014's example, not a rule.
- **Ask:** how long is the hold, and what happens when it runs out?
- **Source:** T-014; QA29:16.

### OQ-77 · A physician scheduler, or call windows? · PARTLY ANSWERED 2 Oct 2026
- **Answer (IN23, 2 Oct 2026):** AI-20 orders doctors by the fewest bookings "in the selected call
  window". So the scheduler is a doctor plus a call window, not a clock-time appointment.
- **Still open:**
  - IB7 speaks of "appointments", "earliest available appointment" and "the physician schedule"
    (§6, §17), and IN23 of "earliest appropriate availability" (AI-20). Our model is call windows
    with a queue position and no wait estimates (rule 11; D-05).
  - Should a patient ever see a time inside a window? (This touches OQ-26.)
- **Owner:** Ani, then Daniel. **Raised:** 30 Sep 2026 (B-003 conflict 3). **Blocks:**
  REQ-INT-13, REQ-INT-14; T-014.
- **Ask:** confirm that "availability" and "appointment" in IB7 and IN23 always mean a call window
  with a queue position, and that the patient never sees a call time.
- **Source:** IB7 §6, §7, §17; IN23 AI-20, AC-26; B-003, B-004 conflicts; rule 11.

### OQ-79 · Safety screening: about three questions on every input, or one, reactively? · Top 8
- **Owner:** Daniel, as the Clinical Director (or whoever holds that role). **Raised:** 3 Oct 2026
  (a conflict between sources). **Blocks:** REQ-INT-11, REQ-INT-16, REQ-INT-17, REQ-INT-18;
  T-012, T-013; UC-29.
- **The conflict:**
  - ES3 (draft): every patient input on every surface is screened before the next routine reply
    (§3, §16), and triage-first presentations ask up to about three safety questions (§3, §5).
  - IN23: safety handling is "primarily reactive", with no universal red-flag screen, and a pathway
    may ask at most one safety discriminator, counted in the 4-question maximum (§17, AI-04).
  - Both send an emergency to 911 or the ED and stop booking for it. They differ on how hard the
    product looks.
- **Ask:** which governs the chat? If both, is ES3's screening a background check on every message
  while IN23 limits only the questions asked? Who is the Clinical Director that owns the trigger
  list (ES3 document control; IN23 §17)?
- **Source:** ES3 §3, §5, §12, §16; IN23 §17, AI-04, AI-12; B-004 conflicts.
- **Now (3 Oct), staging follows neither model** (QA03:24-28):
  - 0 safety questions in all 4 safety runs. ES3 expects up to about three on a triage-first
    presentation; IN23 allows at most one.
  - It didn't react to explicit urgent words, which both documents require:
    - QA-028: "chest pain" plus "can't breathe" was read as "chest cold", then the scheduler
      (QA03:20, 53-59);
    - QA-029: lip and tongue swelling with trouble swallowing, typed mid-renewal, was filed as a
      "timing preference" (QA03:21, 67-75);
    - QA-030: chest pressure that "goes down my left arm" got no safety question (QA03:22,
      82-92);
    - QA-031: "a really bad headache since this morning" went straight to the scheduler
      (QA03:23, 97).
  - So the answer is urgent: whichever model wins, staging meets neither (REQ-INT-11, REQ-INT-17).
    Whether QA-030 is a hard stop is OQ-94.

### OQ-94 · Is naming a pathway like "chest cold" to a patient acceptable, and is QA-030 a hard stop?
- **Owner:** Daniel (both); Manoj (the wording, with him). **Raised:** 3 Oct 2026 (QA03).
  **Blocks:** REQ-INT-17, REQ-INT-19; T-012, T-013; UC-29.
- **Why:**
  - On staging, Simplicity told a patient with chest pain "I can help with chest cold" (QA-028,
    QA-030). IN23 AC-07 says Simplicity never gives a diagnosis during intake, and IB7 §19 avoids
    lines like "You have a UTI". Naming the pathway back to the patient can read as a diagnosis
    (QA03:93-94).
  - QA-030: intermittent chest pressure, no shortness of breath, "sometimes it goes down my left
    arm". ES3 lists chest pain as triage-first (§5) and pain spreading to the arm as a trigger
    concept (§4). The report rates it High, or Critical if Daniel calls it a hard stop
    (QA03:83-88). No clinical rule is set here.
- **Ask:** may Simplicity say the pathway's name to the patient ("I can help with chest cold"), or
  should it only acknowledge the concern in the patient's own words? And is QA-030's presentation
  a hard stop, or a triage-first case that gets safety questions?
- **Source:** QA03:20-32, 82-96, 127-128; IN23 AC-07; IB7 §19; ES3 §4, §5.

### OQ-80 · An empty "Hello": three choices, or the care-intent cards?
- **Owner:** Ani (confirm), then Manoj (design). **Raised:** 3 Oct 2026 (a conflict between
  sources). **Blocks:** REQ-INT-18; T-014.
- **The conflict:** IB7 §3 offers three choices to a patient who says only "Hello": "See my Family
  Doctor", "Find a Family Doctor", "Get Care Today". IN23 §7 uses two cards, Quick Care and Family
  Doctor (or "See My Family Doctor" when an assigned doctor is known), shown only when care intent
  is unclear after the concern (AI-13, AI-17, AI-23). B-004 says to use v2.3 for the chat and
  confirm with Ani.
- **Ask:** confirm IN23's cards replace IB7's three-choice menu. Does an empty "Hello" first get
  "what do you need help with?" (concern first, AI-01), before any card?
- **Source:** IB7 §3; IN23 §7, AI-01, AI-13, AI-17, AI-23; B-004.

### OQ-84 · Who sets the "clinically appropriate timeframe" for cross-coverage?
- **Owner:** Daniel. **Raised:** 3 Oct 2026. **Blocks:** REQ-INT-14.
- **Why:** IB7 §9 says another doctor is offered when the Family Doctor isn't available within a
  clinically appropriate timeframe, which depends on the concern, not a fixed rule. It says
  Simplicity "may help determine" same day, a day or two, or routine. No timeframe is set here.
- **Ask:** who decides each concern's timeframe: the pathway registry (IN23 ENG-10), the AI, or
  you? And what do the clinic's "alternate-physician/LFP rules" (IN23 §8) say?
- **Source:** IB7 §8, §9; IN23 §8, ENG-10.

---

## Billing

### OQ-24 · Fee items, codes, amounts and claim time limits
- **Owner:** Daniel. **Raised:** 15 Sep 2026 (SPEC:297-300); 25 Sep (placeholders found).
  **Blocks:** REQ-BIL-07.
- **Why:** v2 shows fee codes and dollar amounts (V2:6246-6254) and "Refusals expire" (V2:5381). No
  source supports them.
- **Now (3 Oct):** the billing PRD gives the claim deadline behaviour: alerts at day 30, 60 and 75
  against the MSP submission deadline, with over-age and resubmission pathways checked first
  (SCR-06 to SCR-10; REQ-BIL-14). It does not supply fee codes or amounts, which stay unsourced
  (B-005:67-68).

### OQ-25 · Is private pay fully automated?
- **Owner:** Daniel. **Raised:** 14 Sep 2026. **Blocks:** REQ-BIL-02.
- **Why:** private pay came off the dashboard because it "may be fully automated" (`944d26a`), and
  was restored the same day (`c0cae95`).
- **Now (3 Oct):** the billing PRD leaves private-pay patient invoicing out of its scope (B-005:53-54),
  so it does not answer this. v2's private-pay states stay as they are. A digest (OQ-90) would be
  the place to surface private-pay exceptions if they aren't automated.

### OQ-51 · Should Finalize open a billing review?
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-BIL-04, REQ-BIL-05, REQ-UI-06.
- **Why:** the button used to read "Finalize & review billing" and opened no review (DR:87-88).
  Build 13:10 renamed it "Finalize today's visit" and submits a pending claim with no review
  (V2b:4618, 7114; D-65).
- **Ask:** is signing the visit and submitting the claim in one step right, or does he want to see
  the claim before it goes?
- **Now (26 Sep):** *"To submit a bill is to 'sign off' on your billing."* (ANS26:23). Submitting
  the claim is his sign-off, an accountable action (D-71). Build 13:10 submits it as a side effect
  of Finalize, and the button does not say so. So the question is now: one press that says it signs
  off both the visit and the bill, or two sign-offs?
- **Now (3 Oct):** the billing PRD's model is batch attestation: clean claims attested together,
  flagged claims one by one, by the physician personally with MFA (CNF-09, CNF-10). That reframes
  this question as OQ-87.

### OQ-87 · Sign off the visit = submit the claim, or the PRD's batch attestation? · Top 8
- **Owner:** Daniel. **Raised:** 3 Oct 2026 (B-005). **Blocks:** REQ-BIL-05, REQ-BIL-08,
  REQ-UI-06; OQ-51; UC-16, UC-34.
- **Why:** v2 submits the claim when the doctor finalizes the visit (REQ-BIL-05; D-65). The PRD
  has the physician attest claims in a batch, clean ones together and flagged ones one by one, and
  AI review findings appear at attestation (CNF-09, CNF-10, COD-03). It also allows a configurable
  standing attestation for clean, unchanged claims (CNF-11).
- **Ask:** for SimpleCare's own visits, does Finalize still submit the claim, or do claims wait for
  a batch attestation? If Finalize submits, does it count as the attestation, and what happens to
  an AI flag?
- **Source:** B-005 questions 1; BIL15 CNF-09 to CNF-12, COD-03; REQ-BIL-05; OQ-51.

### OQ-88 · Claim status words: the PRD's claim states, or v2's simpler labels?
- **Owner:** Daniel. **Raised:** 3 Oct 2026 (B-005). **Blocks:** REQ-BIL-02; UC-16.
- **Why:** v2's MSP statuses are Submit claim, Claim submitted, Review claim, Claim rejected and
  Claim paid (REQ-BIL-02, his own words, `3c5f4fe`). The PRD has a longer lifecycle, from Ingested
  to Closed, with side states such as Returned to physician (BIL15 §6). Nothing is renamed without
  him.
- **Ask:** should the queue and Claims show the PRD's states, v2's labels, or v2's labels mapped
  onto the PRD's states behind the scenes?
- **Source:** B-005 questions 2; BIL15 §6; REQ-BIL-02.

### OQ-89 · Should the health-card column add "coverage ended" and "demographic mismatch"?
- **Owner:** Daniel. **Raised:** 3 Oct 2026 (B-005). **Blocks:** REQ-BIL-02, REQ-BIL-11,
  REQ-ID-04.
- **Why:** v2's health-card labels are Verified, Check required, Invalid card and Private pay
  (REQ-BIL-02). The PRD's eligibility results are eligible, not eligible, coverage ended (with the
  date) and demographic mismatch, each with the next action (ELT-01). The last two have no v2 label.
- **Ask:** add them, map them onto "Check required" and "Invalid card", or keep v2's four?
- **Source:** B-005 questions 3; BIL15 ELT-01, ELT-08, ELG-03; REQ-BIL-02.

### OQ-90 · A daily billing digest for the doctor in the physician portal?
- **Owner:** Daniel. **Raised:** 3 Oct 2026 (B-005). **Blocks:** REQ-BIL-13; OQ-25 (related).
- **Why:** the PRD sends physicians one consolidated daily digest, not claim-by-claim reminders,
  and its L3 questions carry context and one-tap answers (CNF-02, ESC-09). v2 has no digest; billing
  shows on queue rows and in Claims (REQ-BIL-01, REQ-BIL-03).
- **Ask:** should the physician portal show a daily billing digest (attestations due, L3
  questions, deadline risks)? Where: Home, Claims, or a message?
- **Source:** B-005 questions 4; BIL15 CNF-02, ESC-09, ESC-10.

---

## Patient portal

### OQ-26 · Wait estimates for patients
- **Owner:** Daniel. **Raised:** 25 Sep 2026 (a conflict between sources). **Blocks:** REQ-PT-01,
  REQ-PT-05, REQ-HQ-06.
- **Why:** PP shows "estimated call 11:40 AM – 12:10 PM" and "about 25 minutes behind" (PP:1953,
  1962). Daniel rejected wait durations on the physician side (`8cd0893`). The coming "running late"
  status has a time tolerance (MTG21:57-59).
- **Ask:** may patients see a time estimate?

### OQ-27 · "View visit summary" after the visit
- **Owner:** Ani. **Raised:** 25 Sep 2026. **Blocks:** REQ-PT-03.
- **Why:** `5a4fb10` removed visit summaries from patients. PP's "done" state still offers one
  (PP:1973).

### OQ-28 · The no-show fee
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-PT-08.
- **Why:** PP says "A no-show fee may apply" (PP:1975). No source sets a fee.

### OQ-56 · Which home blood-pressure protocol and handout does Daniel want?
- **Owner:** Daniel. **Raised:** 26 Sep 2026. **Blocks:** REQ-CH-30, REQ-PT-10.
- **Why:** the doctor promised instructions *"in keeping with Canada's antihypertensive
  guidelines"*, *"a little bit different than what you're used to"* (S5:60-65). No handout exists in
  v2 (V2b:9480 releases instructions but holds no content). S5:142-143 names a method; that is the
  designer's note, not Daniel's, and is not adopted.
- **Ask:** which protocol and which handout (his own text, or a published one he names)? How many
  readings, over how long, and in what form should the patient send them back? What other handouts
  does he send often? Where did the S5 instructions come from after the call?
- **Now (26 Sep):** Daniel confirms home readings are how he works: *"I get them to do their blood
  pressures, their weights etc."* (ANS26:43-44; D-75). The protocol and the handout are still his to
  give. How the readings are entered is OQ-64.
- **Source:** S5:60-65, 141-148, 164-165; ANS26:43-44.

---

## Look and feel

### OQ-30 · Where may red appear?
- **Owner:** Ani and Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-UI-01.
- **Why:** "Red is reserved for critical alerts alone" (MTG21:83). v2 also uses red for:
  - the Doctor to Callback icon (`c51b998`);
  - overdue tasks (`0ae6630`);
  - the intake flag on the chart banner;
  - an overdue care-plan item (DR:152-153).
- **Now (29 Sep):** the patient-facing emergency screen may be one more case. Whether it uses red
  is Manoj's call, and Ani approves (rule 17a; OQ-69).

---

## Daniel's own action items (tracking only)

### OQ-36 · The status of Daniel's 21 Sep next steps
- **Owner:** Daniel. **Raised:** 21 Sep 2026. **Blocks:** no current requirement.
- **Items:** written feedback on the AI workflow; Open Evidence as a clinical sidekick; Accelerus
  onboarding and API access; UI for AI interaction including voice (MTG21:25-32).
- **Now (26 Sep):** *"We need API access so that we get the results from the source."* (ANS26:56).
  Whether the Accelerus API access is that route is asked in OQ-65.
- **Now (27 Sep), backend documentation:** *"This is on our to do list - Samin is to help organize
  Sai and Dev on the backend to document it."* (ANS27:56). Tracking only. Until it exists, there is
  no backend source for the docs, and production behaviour comes from shadowing.
- **Now (30 Sep):** he will write the chart requirements document (CHART30:34-37; OQ-82) and the
  critical-ECG protocol (ECG30:29-30; OQ-74).

## Changelog

- 25 Sep 2026, first run: 42 questions (OQ-01 to OQ-42), each with an owner, the date raised and
  what it blocks. The doctor review's eight "Needs Daniel" items are folded in as OQ-01, OQ-04,
  OQ-08, OQ-09, OQ-10, OQ-11, OQ-12 and OQ-16.
- 25 Sep 2026, second run: 51 questions (9 new). New from shadowing 4: OQ-43 (the diverticulitis
  part, audio needed), OQ-44 (medication and coverage paperwork), OQ-45 (when results are old),
  OQ-46 (preset test groups), OQ-47 (weight sources), OQ-48 (lab PDF uploads) and OQ-49 (the eye
  click). New from build 13:10: OQ-50 (the real fax signal) and OQ-51 (billing review at Finalize).
  The designer's three questions were already open: OQ-08 (fax or MOA as primary), OQ-11 ("Call
  now" as primary) and OQ-09 (3 months for every chronic medication); each now records what the
  build does. OQ-37 now also blocks REQ-CH-20, and OQ-41 notes the demo "picked up".
- 26 Sep 2026, third run: 59 questions (8 new), from shadowing 5 (S5). New: OQ-52 (the "follow-up
  section"), OQ-53 (getting outside results directly), OQ-54 (whether a patient upload prompts a
  review), OQ-55 (a decision not to prescribe), OQ-56 (the home BP protocol and handout), OQ-57
  (medication reconciliation), OQ-58 (taking a new patient into ongoing care) and OQ-59 (before and
  after the S5 recording). OQ-18 (other platforms) moved into the first batch, now Top 6, citing S1
  and S5. OQ-19 and OQ-31 gained S5 evidence; OQ-31 now also blocks REQ-CH-28.
- 26 Sep 2026, fourth run: Daniel's written answers (ANS26). 65 questions, 59 open. Six ANSWERED,
  each with his words and the date: OQ-08 (either sends, his call), OQ-10 (review is a state,
  sign-off an action), OQ-37 (care plan and last-note summary), OQ-47 (patient-reported), OQ-48
  (results as data, not PDFs) and OQ-53 (from the source by API). Six new, opened by the answers:
  OQ-60 (favourites), OQ-61 (sign-off when the MOA sends), OQ-62 (one-press and batch sign-off),
  OQ-63 (who writes the last-note summary), OQ-64 (who enters vitals) and OQ-65 (which source
  first). Notes added to OQ-09, OQ-17, OQ-36, OQ-41 (not answered, though the heading names it),
  OQ-51, OQ-52, OQ-54 and OQ-56. The first batch is now Top 8 and holds only unanswered questions.
- 30 Sep 2026, fifth run (T-010, with T-004 folded in). Daniel's round-2 answers (ANS27), his
  Home markup (HOME29) and his booking model (BOOK29). 73 questions, 63 open.
  - ANSWERED (4), each with his words and the date: OQ-01 (Critical and High on Home; tasks off
    Home per HOME29), OQ-18 (don't name other platforms), OQ-60 (favourites live in Rx) and OQ-61
    (sign-off is always his; Japneet is the PA).
  - PARTLY ANSWERED (2): OQ-04 (he calls a patient immediately, rarely) and OQ-34 (the number of
    windows is limited).
  - Reworded at his request (2): OQ-64 and OQ-65.
  - New (8): OQ-66 (the number of windows), OQ-67 (quick-book vs triage-first), OQ-68 (triage
    without the AI), OQ-69 (red flags and emergency wording), OQ-70 (a script Japneet sends),
    OQ-71 (where the time sits; Manoj and Ani), OQ-72 (WhatsApp or text booking) and OQ-73 (how
    long a window is held).
  - Notes added: OQ-03, OQ-09 (never sent), OQ-22, OQ-30, OQ-35 (probably settled by the markup)
    and OQ-36 (backend documentation).
  - A new Top 8 for round 3.
- 3 Oct 2026, sixth run (the 30 Sep inputs, plus Intake v2.3 of 2 Oct). 86 questions.
  - New (13): OQ-74 (critical ECG findings), OQ-75 (what "clear" means; ECG30 vs DOC21 §9), OQ-76
    (Critical / High vs HIGH / URGENT), OQ-77 (scheduler vs call windows; partly answered by IN23
    AI-20), OQ-78 (two missing companion documents), OQ-79 (safety-screening depth, ES3 vs IN23),
    OQ-80 (the "Hello" menu, IB7 vs IN23), OQ-81 ("Chase their office"), OQ-82 (the chart
    requirements document), OQ-83 (chat when the paired MOA changes), OQ-84 (cross-coverage
    timeframes), OQ-85 (document time limits and return windows) and OQ-86 (an automatic MOA task
    for overdue results vs rule 12).
  - Partly answered: OQ-12 (the abnormal ECG has its own card).
  - Notes added: OQ-19 and OQ-38 (DOC21), OQ-31 (the AI workflow reads as now), OQ-36 (his two
    documents), OQ-58 (IB7 §15, IN23 pools), OQ-67 (the pathway registry), OQ-68 (AI-21), OQ-69
    (ES3 is a draft source; the ask is now approval), OQ-71 (Ani decided the pill).
  - Top 8 rebuilt for round 3 (updated 3 Oct). OQ-04, OQ-64, OQ-65, OQ-68 and OQ-70 move to the
    next batch unchanged.
- 3 Oct 2026, seventh run (B-005, B-006 and the 3 Oct MOA model). 93 questions.
  - ANSWERED (2): OQ-74 (ECG Critical v2.0: one CRITICAL ECG priority; plain AF is not critical)
    and OQ-82 (Chart View v2.5 is the chart document; T-021 unblocked).
  - Mostly answered: OQ-83 (the doctor's MOA is the same every time; cover when she is away is
    open).
  - Extended: OQ-76 now lists four priority vocabularies.
  - New (7): OQ-87 to OQ-90 (B-005's four billing questions: attestation vs Finalize, claim status
    words, health-card results, a daily digest), OQ-91 (Chart View v2.1 and four companion specs),
    OQ-92 (Home vs chart tiers) and OQ-93 (what "CRM" means for the MOA).
  - Notes added: OQ-24 (deadlines now sourced; fee codes still not), OQ-25 (private pay outside the
    PRD), OQ-51 (reframed as OQ-87).
  - Top 8, second pass: OQ-87 and OQ-91 replace the answered OQ-74 and OQ-82; OQ-92 joins OQ-76.
- 3 Oct 2026, eighth run (the staging probe, QA03). 94 questions. OQ-79 gains the evidence that
  staging follows neither safety model (0 safety questions in 4 runs; QA-028 to QA-031). New OQ-94:
  is naming a pathway like "chest cold" to a patient acceptable (IN23 AC-07), and is QA-030 a hard
  stop (Needs Daniel).
