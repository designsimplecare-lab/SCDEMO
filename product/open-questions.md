# SimpleCare open questions

Owner: product manager agent. First written 25 Sep 2026. Every question waiting on Daniel or Ani.
Each one gives the owner, the date raised, what it blocks and its source. Source codes are as in
`use-cases.md`. Daniel answers well in numbered batches of 5 to 8, one line each, with the work each
answer unblocks (Ani's working note). **Top 5** marks the batch to send first.

## Top 5 for Daniel

1. **OQ-01**: does High urgency belong on Home, or critical only?
2. **OQ-09**: how is a renewal's quantity set?
3. **OQ-08**: who sends renewal faxes, the doctor or the MOA?
4. **OQ-10**: is a separate sign-off after review a legal or College requirement?
5. **OQ-04**: how does the doctor call a Doctor to Callback or urgent patient, when Call shows only
   on the next patient?

---

## Home and queue

### OQ-01 · Does High belong in Needs your attention? · Top 5
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

### OQ-04 · Calling out of order: callbacks and urgent patients · Top 5
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
- **Source:** S2:72.

### OQ-16 · Signing a note that still holds a template placeholder
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-07.
- **Ask:** on a virtual visit with no exam, should sign-off block, or ask? Was the S3 placeholder
  signed knowingly?
- **Source:** S3:48-50, 118; DR:251.

### OQ-37 · Is "Since last visit" generated or verbatim?
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-01, REQ-CH-20.
- **Why:** it summarises the last plan mid-call. SPEC:264-272 treats a generated care-plan summary
  as a clinical-safety question. Build 13:10 shows Plan / Ask about / Pending as short lines beside
  the signed note (V2b:10182). S4 adds a second question: to fit today's reason, something has to
  decide which earlier notes "touch" it (S4:105-107).
- **Ask:** quote the last P section, synthesise it, or both, and what is the review path? Who or
  what decides that a note matches today's reason: the problem list, the category, or AI?

### OQ-20 · Is the production timeline in date order?
- **Owner:** Ani. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-02.
- **Why:** the hernia note sits below a later-looking follow-up (S3:114-115).

### OQ-19 · Where do outside records land, and who tracks them?
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-10, REQ-MP-04.
- **Ask:** when a patient sends operative reports or imaging, do they go to Documents, the support
  inbox or the MOA? Who marks the request received?
- **Source:** S3:54-57, 116-117.

### OQ-18 · Continuity on other platforms
- **Owner:** Ani and Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-16, REQ-INT-04.
- **Ask:** should intake ask "seen on another platform (for example Tia or Rocket)?" What does the
  chart show with the answer?
- **Source:** S1:10-12, 29-30.

### OQ-31 · The ambient scribe: now, or phase two?
- **Owner:** Daniel. **Raised:** 25 Sep 2026 (a conflict between sources). **Blocks:** REQ-CH-19.
- **Why:** SIA:40, 62 defer AI call documentation to phase two. The scribe was built on 9 Sep with
  Daniel's constraints (`1b201eb`). MTG21:29-32 has Daniel writing feedback on "the current AI
  workflow".
- **Ask:** is it in the demo scope?

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

### OQ-47 · Where do weights come from?
- **Owner:** Ani (check production), then Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-21.
- **Ask:** are weights only the patient's own intake answers today? Does production store any vitals
  history? Should a patient-reported weight and a measured one look different?
- **Source:** S4:19-22, 143-144.

### OQ-48 · How do lab PDFs get onto the chart?
- **Owner:** Ani and Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-22, REQ-CH-23; UC-26.
- **Why:** every file in S4 had the same upload date and a generic name, with a duplicate
  (S4:40-45).
- **Ask:** does the MOA upload them in batches? Could the upload step capture the collection date
  and test names, or can they be read from the PDF? How much can be read from a scanned report?
- **Source:** S4:116-121, 145-146.

### OQ-49 · Shadowing 4: did the eye click fail?
- **Owner:** Ani (the audio, or production). **Raised:** 25 Sep 2026. **Blocks:** REQ-CH-24
  (evidence).
- **Ask:** at 115 s the eye on a July file opened nothing. Was it a fault, or did he move away
  before the viewer opened?
- **Source:** S4:52-53, 147.

---

## Prescribing

### OQ-08 · Who sends renewal faxes? · Top 5
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-RX-01, REQ-RX-07.
- **Why:** S1 suggests the doctor faxes; S2 suggests the MOA, on a spoken instruction (S2:38-39,
  73-74). The answer decides whether "Send by fax" or "Ask MOA to send" is the primary button
  (DR:243-244). Build 13:10 has both, with "Review & fax" primary and "Ask MOA to send" secondary
  (V2b:4601-4602, D-64). The designer raised it again on that build.
- **Ask:** which should be primary, or should it follow the pharmacy or the drug?

### OQ-09 · Renewal quantity rules · Top 5
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
- **Source:** DR:240-242; S1:15-16; S2:30-32; `d2a2823`.

### OQ-50 · What real signal says a fax was delivered, or failed?
- **Owner:** Ani (production and the fax provider). **Raised:** 25 Sep 2026. **Blocks:** REQ-RX-05.
- **Why:** build 13:10 shows "Sending", then "Delivered" after a 5 s demo timer (V2b:10066-10074).
  In production the patient gets a copy as proof of delivery, and the doctor sees nothing (S1:17-19).
- **Ask:** what does the fax service report, and when? What should a failed fax say, and who
  retries it: the doctor or the MOA?

---

## Inbox and review

### OQ-10 · Review versus sign-off · Top 5
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-IN-01, REQ-IN-11.
- **The conflict:** v7 §5.6 replaced review-then-sign-off with one question (`1e6c53f`). The
  stakeholder interview asks for every result to be "reviewed and individually signed off" (SIA:22).
  v2 has both steps, so a normal result takes four actions (DR:168-170).
- **Ask:** is the separate sign-off a legal or College requirement? Can a physician's "No follow-up
  required" on a routine result count as sign-off?

### OQ-11 · First contact on a critical result
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-RV-07.
- **Ask:** when the patient is already in today's queue, should the default be "I call now" rather
  than "the MOA calls and hands over"? Is there a policy on who makes first contact?
- **Now:** build 13:10 shows "Call now" as a secondary button beside Accept & assign when the
  patient is queued (V2b:8998-9006, D-67). The designer asks whether it should be primary there.
- **Source:** DR:144-146, 247-248; `2094417`, `d2a2823`.

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
- **Source:** S2:38-40, 62-63; `d2a2823`.

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
- **Owner:** Daniel. **Raised:** 25 Sep 2026. **Blocks:** REQ-BIL-04.
- **Why:** the button used to read "Finalize & review billing" and opened no review (DR:87-88).
  Build 13:10 renamed it "Finalize today's visit" and submits a pending claim with no review
  (V2b:4618, 7114; D-65).
- **Ask:** is signing the visit and submitting the claim in one step right, or does he want to see
  the claim before it goes?

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
