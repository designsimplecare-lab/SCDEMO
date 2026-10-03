# B-004 — Simplicity AI Intake & Booking Requirements v2.3 (2 Oct 2026)

**Date:** 3 Oct 2026 · **From:** Ani (forwarded) · **Read before your next task** (process.md step 2a)

The newest and most detailed spec for the Simplicity chat. The full text is in
`private/requirements/Simple_Care_Simplicity_AI_Intake_Requirements_v2.3.*` (git-ignored). Cite it as
"Intake v2.3 §n" or by requirement ID (AI-nn, ENG-nn, QS-nn, AC-nn), and summarise; don't paste. Where
it is more specific than Intake & Booking v7 (B-003), **v2.3 wins for the Simplicity chat**.

Core principle: understand enough to route and prepare the doctor, not enough to conduct the visit.

## The flow, in order
1. **The emergency acknowledgement comes first.** It shows once per chat, before anything else, and
   is mandatory: there is no "decline and continue". It doesn't count as a clinical question. A
   message typed before it (for example, in the landing-page box) is kept and processed afterwards,
   and the patient never retypes it. (§5, AC-24, AC-33)
2. **Understand the concern,** by free text or a clinical service card. These are two alternative
   paths, and the patient is never forced through both. A card sets the pathway directly. (AI-01,
   AI-22)
3. **Resolve care intent, Quick Care or Family Doctor.**
   - Infer it when it's clear.
   - Show care-intent cards only when it's genuinely unclear, with a small "Not sure?" option.
   - Never ask again just to confirm. (§7, AI-13, AI-23)
4. **Invite sign-in after the concern and intent are known,** and before the scheduler.
   - "Continue without signing in" carries no penalty.
   - A second invitation comes only when needed, before holding a window. (§6, AC-08)
   - If the patient signs in with an assigned Family Doctor and a follow-up or chronic-medication
     concern, offer "See My Family Doctor" first. (AC-31)
5. **Minimal intake:** 2–3 clinical questions, 4 at most. "Anything else?" doesn't count. Only a
   fired safety trigger can exceed the limit. (AI-04)
6. **Book.** On the free-text path, the scheduler appears only after minimal intake. A doctor or
   window chosen earlier is kept. (§18, AC-23, AC-05)

## How the engine must behave
- **Free text is classified to a specific pathway,** for example Common Concerns → Rx Renewal, with
  a confidence score. Below the threshold, the engine asks one discriminator question or uses
  General/Other Concern. (ENG-01)
- **The pathway's questions only.** There is no generic script. Onset, progression and "regular
  medications" questions are only for symptom pathways and the Family Doctor pathway. (ENG-02)
- **Slots:** each pathway has required information, and questions exist only to fill empty slots.
  Values the patient already gave are taken from every message, including the first. (ENG-03,
  ENG-04)
- **The stop rule is content-based:** intake stops when the slots are filled or declined, never on
  turn count alone. (ENG-05, AI-09)
- **Every reply is classified before it is used:**
  - answer;
  - answer plus new information;
  - confusion: rephrase once, never repeat word for word;
  - objection: drop the question, and never say "I'll pass that to the doctor";
  - decline;
  - a new concern;
  - navigation or dissatisfaction: these are kept out of the summary;
  - possible urgent symptom: safety comes first.

  (§12)
- **Physician summary:** 1–2 lines, built from the slots and not the transcript. Anything not
  confirmed is marked "unconfirmed". The original message is viewable. A safety event goes at the
  top. (§19, ENG-08)
- **Physician pools are configured separately:** episodic and comprehensive, either, both or
  neither. (§8, AI-16)
- **The physician order is fixed:**
  1. the assigned Family Doctor;
  2. a doctor seen before, marked "Seen before";
  3. the least-booked doctor in the selected **call window**;
  4. the rest, by booking count, then earliest availability, then surname.

  (AI-20)
- **Never substitute a doctor silently.** If the assigned or preferred doctor isn't available, say
  so and show their next availability and any permitted alternative. (§8)
- **If the AI is down,** the service cards and a direct-booking path stay available. (AI-21)
- **Pathways live in a versioned registry** that the Clinical Director can edit, not only in
  prompts. (ENG-10, §11)

## Safety (free-text path)
- **Reactive:** it responds to what the patient says. There's no universal red-flag screen on every
  pathway. A pathway may ask **at most one** safety discriminator. (§17)
- **Emergency trigger:** a 911 or ED message, and no virtual booking for that concern.
- **Not suitable for virtual care:** an explanation that the concern needs in-person care, while
  booking for other concerns stays open.
- **Excluded opioids:** the Clinical Director keeps a list of stronger opioids, matched by generic,
  brand and combination name and tolerant of misspellings. Requests on it are declined with set
  wording and not booked.
  - Codeine products, tramadol, benzodiazepines and stimulants are **not** refused automatically;
    they go to the physician.
  - Never give a general warning about "controlled medications". (§17, AC-32)

## Appendix A: staging, 2 Oct
Eight failures were found on staging.simplecare.ca:
- a generic script instead of Rx Renewal;
- the scheduler shown before intake;
- "regular medications" asked first;
- "better or worse?" asked with no symptom;
- a word-for-word repeat after "????";
- "I'll pass that to the doctor" said to an objection;
- the intake stopped early;
- sign-in offered only after the window was chosen.

These match and extend our own staging run (`product/reports/patient-chat-qa-2026-09-29-*`).

## Conflicts to raise (don't resolve them yourself)
- **Safety screening depth:** Emergency Safeguards v3 (B-003) has triage-first presentations ask up
  to about **three** safety questions, and screens every input across every surface. Intake v2.3 is
  "primarily reactive", with at most **one** safety discriminator per pathway. These need
  reconciling by the Clinical Director, and **Needs Daniel**.
- **The "Hello" menu:** v7 offered three choices ("See my Family Doctor", "Find a Family Doctor",
  "Get Care Today"). v2.3 uses two conditional care-intent cards (Quick Care, Family Doctor; or See
  My Family Doctor). **Use v2.3** for the chat, and confirm with Ani.
- **Scheduler vs call windows (B-003 conflict 3), partly answered:** v2.3 orders doctors by bookings
  "in the selected call window", so the scheduler is doctor plus call window.

## Who this affects
- **Manoj, T-012 to T-017 (the chat):**
  - T-012: the acknowledgement first, plus reactive safety.
  - T-013: slots, reply handling and the stop rule.
  - T-014: care intent, sign-in timing, scheduler after intake, physician order.
  - T-015: AI-21, cards working without the AI.
  - T-017: the message kept, and no repeats.
- **`patient-chat-qa` (T-011) and its test suite:** the PC-01 to PC-26 suite should map to AC-01 to
  AC-33, and the 8 Appendix A findings each need a test case.
- **`product-manager`:** fold this into the spec documents.

## Self-check
1. A patient types "I need my ramipril renewed" on the landing page, then opens the chat. What comes
   first, and do they retype? (The emergency acknowledgement. No: the message is kept.)
2. Do they see the Quick Care / Family Doctor cards? (No. Rx Renewal implies Quick Care, unless they
   sign in and have an assigned Family Doctor, in which case "See My Family Doctor" is offered first.)
3. The patient replies "????" to a question. What happens? (Rephrase once in plainer words; never
   repeat word for word. If it's still unclear, skip it unless it's needed for safety.)
4. "Can I get Percocet?" versus "Can I get Tylenol #3?" (Percocet contains oxycodone, so it's
   declined with no booking. Tylenol #3 proceeds to the physician.)
