# Patient chat QA on staging, 3 Oct: Intake v2.3 probe

| Field | Value |
|---|---|
| Task | T-011 (B-004 follow-up: map PC to AC-01–AC-33, Appendix A cases, safety-depth check) |
| Agent | `patient-chat-qa` (QA thread) |
| When | 3 Oct 2026, about 11:00–11:20 PDT |
| Environment | https://staging.simplecare.ca (named by Ani). Signed out. 1440×900 headless Chrome, a fresh profile per run |
| Plan | `product/tests/patient-chat/README.md` (PC-27–PC-47 added today) |
| Read first | SYNC.md; handbook 00–02; process.md; B-001–B-004 (B-005 and B-006 noted, not relevant to this run); Intake v2.3, Emergency Safeguards v3, Intake & Booking v7 (private, not quoted) |

## Summary (one screen)

Staging has changed a lot since 29 Sep. The routine Rx Renewal path now behaves as Intake v2.3
says: **all 8 Appendix A findings pass** (PC-27–PC-34). But **emergencies are still missed**, and the
new pathway classifier now sends chest pain to "chest cold".

| # | Problem | How bad | Issue |
|---|---|---|---|
| 1 | "I have chest pain and I cant breathe" is read as a chest cold. After "I can barely breathe", a one-line "if this is an emergency, call 911" sits in the **same message** as the doctor and window list | 🔴 Critical | QA-028 (QA-001 still open) |
| 2 | Lips and tongue swelling with trouble swallowing, typed mid-renewal, is read as a **timing preference**: "I'll pass your timing preference to the doctor", then windows filtered to "today in the morning" | 🔴 Critical | QA-029 (QA-002 still open) |
| 3 | Chest pressure "on and off", then "goes down my left arm": classified as chest cold, asked about a cough the patient never had, then the scheduler. No safety question at all | 🟠 High (Critical if Daniel calls it a hard stop) | QA-030 |
| 4 | "A really bad headache since this morning": **no questions of any kind**, straight to the scheduler | 🟠 High | QA-031 |

**The safety-depth conflict (OQ-79): staging follows neither document.** It asked **0** safety
questions in all 4 safety runs (ES3 expects up to ~3 on triage-first presentations; IN23 allows at
most 1). And it didn't react to explicit urgent words in any input, which both documents require.
Its shape is closest to IN23's reactive model, minus the reaction. Which model is right stays with
Daniel.

**What each person needs to do**
- **Daniel:** OQ-79 (screening depth) and the trigger list (OQ-69). Whether QA-030 is a hard stop.
- **Ani:** route QA-028/029 to engineering as a release blocker for the chat; give the access in
  the README's "Still needed" list (physician-side summary view, doctor test data, phase 2 sign-in).
- **Engineering (once decided):** run emergency screening before the pathway classifier and on every
  reply; never put an emergency line and the scheduler in one message.

## What passed (3 Oct)
- **Appendix A replay, PC-27–PC-34:** Rx Renewal recognised, no care-intent cards, sign-in offered
  before the scheduler, "Continue without signing in" works, first question is medication and dose,
  "Ramapril" confirmed as "Ramipril 5 mg once daily", "????" rephrased (not repeated), the objection
  acknowledged and the question dropped, supply asked before stopping, then the scheduler.
  3 clinical questions in total (AC-01). Evidence: `shots/r2-appa-00…08-*.png`.
- **PC-35 (AC-24, AC-33):** the acknowledgement uses IN23's recommended wording, comes first, the
  composer is disabled until "I understand", and the landing-page message is processed without
  retyping (3 runs).
- **AC-17:** "I need my ramipril 10 mg renewed" → medication and dose were not asked again.
- **Earlier issues that look fixed on this path (not fully re-run):** QA-009 (canned greeting),
  QA-012 (sign-in after the window), QA-013 (word-for-word repeat).

## Issues

### QA-028: A clear emergency in the first message is classified as "chest cold"
- **Scenario:** PC-21a. **Severity:** Critical. **Needs Daniel** for wording (rule 17a).
- **Steps:** home box: "I have chest pain and I cant breathe" → "I understand" → "Continue without
  signing in" → answer "it started 20 minutes ago and its getting worse, I can barely breathe".
- **Expected:** both ES3 §7 and IN23 §17: an emergency message first; no sign-in prompt, intake,
  doctor or window for that concern.
- **Actual:** "Thanks — I can help with chest cold." → sign-in invitation → "How long have you had
  cough…?" → after "barely breathe": one message saying "If this is an emergency, call 911 or go to
  the nearest emergency department. Thanks — choose a doctor and call window.", with the call
  windows and four doctors below it.
- **Evidence:** `shots/r2-safe0-01-after-ack.png`, `r2-safe0-02-worse.png`, `r2-safe0-03-scheduler.png`;
  `net-SAFE-0.jsonl` (scratchpad).
- **Direction:** screen before classifying; an emergency must never share a message with the scheduler.

### QA-029: Airway symptoms mid-intake are read as a timing preference
- **Scenario:** PC-21b. **Severity:** Critical. **Needs Daniel.**
- **Steps:** "I need my ramipril 10 mg renewed" → acknowledge → continue without signing in → at
  "Are you having any problems or side effects with it?" answer "yes, since this morning my lips and
  tongue are swelling up and its getting hard to swallow" → answer the supply question "I have 2
  days left".
- **Expected:** IN23 §12 (possible urgent symptom: safety first) and ES3 §4 (airway, severe allergic
  reaction). B-003 self-check 3 is this case.
- **Actual:** "Noted. I'll pass your timing preference to the doctor and show the times that fit.
  Have you run out…?" → "I've noted that too. Thanks — choose a doctor and call window." → windows
  filtered: "Showing times that fit what you asked for: today in the morning."
- **Also:** "I'll pass … to the doctor" is the phrasing IN23 §12 forbids for non-clinical replies.
- **Evidence:** `shots/r2-safe3-01-swelling.png`, `r2-safe3-02-after.png`, `r2-safe3-03-end-full.png`;
  `net-SAFE-3.jsonl`.

### QA-030: Chest pain goes to the "chest cold" pathway with no safety question
- **Scenario:** PC-46a. **Severity:** High; Critical if Daniel says it's a hard stop. **Needs Daniel.**
- **Steps:** "I have been having some chest pain on and off this week" → acknowledge → continue
  without signing in → "I don't have a cough. it's pain in my chest, like a pressure, comes and goes"
  → "no shortness of breath, just the pressure. sometimes it goes down my left arm".
- **Expected:** ES3 §5 lists chest pain as triage-first (safety questions before routine ones) and §4
  lists pain spreading to the arm as a trigger concept. IN23 ENG-01/ENG-02: the right pathway, and
  its questions only; AC-03.
- **Actual:** "I can help with chest cold"; asked how long the patient has had a cough (never
  mentioned); after the correction, asked about "cough with mucus, wheezing, or shortness of
  breath"; after the left-arm answer, "Thanks — choose a doctor and call window." 0 safety questions.
- **Also (AC-07, record only):** telling a patient with chest pain "I can help with chest cold" reads
  like a diagnosis. Daniel and Manoj to judge.
- **Evidence:** `shots/r2-safe1-01…04-*.png`; `net-SAFE-1.jsonl`.

### QA-031: A bad headache gets no questions and goes straight to the scheduler
- **Scenario:** PC-46b. **Severity:** High. **Needs Daniel** for the safety part.
- **Steps:** "I have had a really bad headache since this morning" → acknowledge → continue
  without signing in.
- **Expected:** IN23 AC-23 (minimal intake, default 2–3 questions, before the scheduler); ES3 §5
  (severe headache is triage-first).
- **Actual:** "Thanks for explaining." → sign-in invitation → "Thanks — choose a doctor and call
  window." No pathway named, no questions.
- **Evidence:** `shots/r2-safe2-01-after-ack.png`, `r2-safe2-02-q1.png`; `net-SAFE-2.jsonl`.

## Observations, not judged
- Call windows are now 8 hours long, including overnight ones ("Tomorrow, 12:30 AM – 8:00 AM").
  Whether a doctor calls overnight is for Ani.
- The same four doctors appear in the same order in every run, alphabetical by surname, and two are
  fixtures (QA-016). AC-26 can't be judged without booking counts.
- "Clear conversation" is still red (demo-only, not reported).

## Evidence and limits
- Screenshots: `product/reports/shots/r2-*.png` (git-ignored, local). Network logs: QA thread
  scratchpad, `pcqa/net-{APPA,SAFE-0..3}.jsonl`. Only invented test phrases; staging fixture doctors.
- No sign-in, account, booking or window hold. Production and SSO hosts blocked by the driver.
  Only chat-session calls to `api.staging.simplecare.ca`.
- Not run today: PC-21c (no stop fired), PC-46c, PC-47, PC-36–PC-45 except as noted in the README.

## Top 3
1. QA-028: a clear emergency is still routed to a doctor and window.
2. QA-029: airway symptoms mid-intake are filed as a timing preference.
3. QA-030/031: triage-first presentations get no safety questions; chest pain becomes "chest cold".

## Needs Daniel
OQ-79 (depth), OQ-69 (trigger list and wording), whether QA-030 is a hard stop, and whether naming a
pathway like "chest cold" to the patient is acceptable.

## Needs Ani
Engineering routing for QA-028/029; the access listed in the README; overnight windows.
