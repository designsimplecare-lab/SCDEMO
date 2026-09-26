# SimpleCare open questions

Owner: product manager agent. First written 25 Sep 2026. Every question waiting on Daniel or Ani.
Each one gives the owner, the date raised, what it blocks and its source. Source codes are as in
`use-cases.md`; ANS26 is Daniel's written answers of 26 Sep 2026
(`from-daniel/2026-09-26-answers-to-shadowing-questions.md`). Daniel answers well in numbered
batches of 5 to 8, one line each, with the work each answer unblocks (Ani's working note). **Top 8**
marks the batch to send next. **ANSWERED** marks a question Daniel has answered: the entry keeps his
words and the date, and whatever the answer left open moves to a new question.

## Top 8 for Daniel

Answered on 26 Sep 2026 (ANS26), so no longer in this list: OQ-08, OQ-10, OQ-37, OQ-47, OQ-48 and
OQ-53. Everything below is still unanswered.

1. **OQ-01**: does High urgency belong on Home, or critical only?
2. **OQ-61**: when the MOA sends a renewal, whose sign-off is it, and does the doctor check it
   first? Opened by his answers on who sends and on sign-off (ANS26:8-9, 22-25).
3. **OQ-60**: where do your favourite prescriptions live, and who can add, change or use them?
   (ANS26:8-9).
4. **OQ-09**: how is a renewal's quantity set? Does a favourite carry it?
5. **OQ-65**: which lab or result source should be connected first? Is the Accelerus API access in
   your 21 Sep next steps that route? (ANS26:56; MTG21:31).
6. **OQ-64**: does the patient enter their own BP and weight in the portal, or do you enter what
   they tell you on the call, or both? (ANS26:43-44).
7. **OQ-18**: should intake ask whether the patient was seen on another platform? He asked it out
   loud in 2 of 5 visits (S1:10-12; S5:26-29).
8. **OQ-04**: how does the doctor call a Doctor to Callback or urgent patient, when Call shows only
   on the next patient?

Next batch: OQ-62 (one press to sign off a routine result), OQ-51 (the bill's sign-off at
Finalize), OQ-63 (who writes the last-note summary), OQ-11 and OQ-16.

---

## Home and queue

### OQ-01 · Does High belong in Needs your attention? · Top 8
- **Owner:** Daniel. **Raised:** 21 Sep 2026 (a conflict within the same day). **Blocks:**
  REQ-HQ-11, REQ-HQ-12.
- **The conflict:**
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

### OQ-04 · Calling out of order: callbacks and urgent patients · Top 8
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

### OQ-34 · Window lengths and window times
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

### OQ-35 · The AI line in Needs your attention
- **Owner:** Daniel. **Raised:** 21 Sep 2026. **Blocks:** REQ-HQ-11.
- **Why:** the AI should synthesise the finding in under five words (MTG21:60-62). The spec blocked
  a similar generated care-plan summary on a safety question: is the text verbatim or generated, and
  what is the review path? (SPEC:264-272).
- **Ask:** is a generated five-word line acceptable, and must it quote the report?

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

### OQ-18 · Continuity on other platforms · Top 8
- **Owner:** Daniel (the question and its wording), then Ani (where the answer shows). **Raised:**
  25 Sep 2026 (S1); again 26 Sep 2026 (S5). **Blocks:** REQ-CH-16, REQ-INT-04.
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

### OQ-64 · Patient-reported vitals: who enters them, and where
- **Owner:** Daniel; Ani (what production stores today). **Raised:** 26 Sep 2026 (opened by the
  answer to OQ-47). **Blocks:** REQ-CH-32, REQ-CH-21, REQ-PT-10.
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

### OQ-65 · Which result source is connected first?
- **Owner:** Daniel (the source and the access); Ani (what the demo shows). **Raised:** 26 Sep 2026
  (opened by the answers to OQ-48 and OQ-53). **Blocks:** REQ-IN-12, REQ-CH-22, REQ-CH-29.
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

### OQ-09 · Renewal quantity rules · Top 8
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-RX-02, REQ-RX-03.
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

### OQ-60 · Favourite prescriptions: where they live and who manages them
- **Owner:** Daniel. **Raised:** 26 Sep 2026 (opened by the answer to OQ-08). **Blocks:**
  REQ-RX-11, REQ-RX-02.
- **Why:** *"I also have my favorite's pre-populated."* (ANS26:8-9). v2 has no favourites; the
  renewal card starts from the patient's medication list only (`RX_MEDS` V2b:9894).
- **Ask:** where are they today (production's prescribing screen, or somewhere else)? What does one
  hold: drug, strength, directions, quantity, supply, repeats? Are they his alone, or shared with
  other doctors? Who may add or change one: only him, or the MOA too? Can the MOA send from one?
- **Source:** ANS26:8-14.

### OQ-61 · When the MOA sends a renewal, whose sign-off is it?
- **Owner:** Daniel. **Raised:** 26 Sep 2026 (opened by the answers to OQ-08 and OQ-10).
  **Blocks:** REQ-RX-10, REQ-RX-07, REQ-UI-06.
- **Why:** either can send (ANS26:8-9), but *"To Fax is to 'sign off' on the script"* and *"The
  Doctor has approved this, meaning my a\*\* is on the line."* (ANS26:22-25). When the MOA sends,
  it is not clear who has signed off. Build 13:10 puts "Ask MOA to send" through the doctor's own
  check step first (V2b:10014), which may be more than he wants when he hands it off.
- **Ask:** when he asks the MOA to send, has he signed off at that moment, or does the MOA's send
  carry his name? Does he see the script before it goes, or only after? Should the visit's record
  say "sent by <MOA> for Dr. <name>"? No prescribing rule is assumed here.
- **Source:** ANS26:8-9, 17-34; V2b:10014, 10055-10064.

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

### OQ-23 · Names for self-carry and Carry Forward
- **Owner:** Daniel. **Raised:** before 27 Jul 2026. **Blocks:** REQ-TK-07.
- **Why:** he floated "remind me later" and did not settle it (SIA:54). He dislikes "tickle"
  (SIA:22).

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

---

## Billing

### OQ-24 · Fee items, codes, amounts and claim time limits
- **Owner:** Daniel. **Raised:** 15 Sep 2026 (SPEC:297-300); 25 Sep (placeholders found).
  **Blocks:** REQ-BIL-07.
- **Why:** v2 shows fee codes and dollar amounts (V2:6246-6254) and "Refusals expire" (V2:5381). No
  source supports them.

### OQ-25 · Is private pay fully automated?
- **Owner:** Daniel. **Raised:** 14 Sep 2026. **Blocks:** REQ-BIL-02.
- **Why:** private pay came off the dashboard because it "may be fully automated" (`944d26a`), and
  was restored the same day (`c0cae95`).

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

---

## Daniel's own action items (tracking only)

### OQ-36 · The status of Daniel's 21 Sep next steps
- **Owner:** Daniel. **Raised:** 21 Sep 2026. **Blocks:** no current requirement.
- **Items:** written feedback on the AI workflow; Open Evidence as a clinical sidekick; Accelerus
  onboarding and API access; UI for AI interaction including voice (MTG21:25-32).
- **Now (26 Sep):** *"We need API access so that we get the results from the source."* (ANS26:56).
  Whether the Accelerus API access is that route is asked in OQ-65.

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
