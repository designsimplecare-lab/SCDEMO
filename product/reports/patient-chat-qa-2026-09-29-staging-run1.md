# Patient chat QA: staging, run 1 (before sign-in)

> **Evidence:** the screenshots are in `product/reports/shots/`. They are local only, git-ignored and
> not published, because they show the unreleased staging UI. The links work on Ani's machine.

| Field | Value |
|---|---|
| Task | T-011 |
| Agent | `patient-chat-qa` |
| Date | 2026-09-29, about 12:15–13:05 PDT (BC time) |
| Environment | https://staging.simplecare.ca (named by Ani). The API is `api.staging.simplecare.ca`. |
| Plan | `product/tests/patient-chat/README.md` (PC-01…PC-26), with the source plan §13–§15 for format and severity |
| Read before work | handbook 00–02, `product/process.md`, bulletin B-001, role file, test plan (including the 29 Sep "Environment facts" addition) |
| Browser | Headless Chrome driven over CDP. A fresh profile per scenario. 1440×900, plus 390×844 phone checks. |
| Evidence folder | `/private/tmp/claude-501/-Users-aniharutyunyan-Desktop-SCDEMO/7ca0d29f-9880-43b2-ba3e-9d48b0fba9e2/scratchpad/pcqa/`. Below, `shots/…` means `…/pcqa/shots/…`, and `net-<scenario>.jsonl` is the network log. |

## Limits kept in this run
- **No sign-in, registration, password, email, phone number or SSO.** The driver refused clicks on sign-in and account labels, and blocked Google, Apple and Microsoft sign-in hosts. Every flow stopped at "I have account / I'm new here", or at "Welcome to Simple Care… create your account".
- **No booking was completed.** Nothing was sent to a person. The only writes were chat-session calls to the staging API: `/public/ai-consultations/session/*`.
- **Production was never touched.** Requests to `simplecare.ca` and `www.simplecare.ca` were blocked at the network layer. None was attempted.
- **Test data only.** Every message was an invented patient phrase. The doctors on the cards are staging fixtures. No real personal data appears in this report or in the screenshots.
- **Read-only API check.** For PC-10 and PC-23, I made read-only GET calls to the public staging endpoints the page itself uses: services, and physicians-with-slots.
- **Bundle check.** For PC-24, I downloaded the public JS bundle from staging to see where the Meta Pixel is called.

## Scenario status
**Status key:**
- **done:** run to its evaluable end. The outcome is shown in brackets.
- **partly done:** stopped at the account step, or covered only in part.
- **blocked:** couldn't proceed in this environment.
- **not run:** needs sign-in, or out of scope.

| ID | Scenario | Status | Outcome and where it stopped |
|---|---|---|---|
| PC-01 | New patient books | partly done | Reached "I have account / I'm new here". Window **not held** (QA-012). |
| PC-02 | Existing patient books | not run | Needs Ani's sign-in. |
| PC-03 | See my family doctor | partly done | Goes straight to sign-in (QA-011). |
| PC-04 | No family doctor | partly done | Trapped at sign-in. Recovered only via "Clear conversation", then "Become a regular patient", then the account step (QA-011, QA-016). |
| PC-05 | Quick-book | partly done | Soonest window shown and selectable. The AI repeated a question (QA-013). Reached the account step. |
| PC-06 | A specific doctor | blocked | The named doctor isn't offered for a walk-in. "Book An Appointment" under his photo doesn't preselect him, and the path dead-ends (QA-017, QA-007). |
| PC-07 | Unsure which doctor | done (fail) | No clarifying question. The need is only asked for after a doctor and window are picked (QA-009). |
| PC-08 | Book today | partly done | Covered in the PC-01 and PC-05 runs: today's windows are shown and selectable. Typed "today" requests were ignored (QA-006, QA-008). |
| PC-09 | Time constraint | done (fail) | "after 3 today" ignored. 1–3 PM is still shown first as "Soonest" (QA-009). |
| PC-10 | No availability | done (fail) | Non-chat path: "No Physicians Available" for all 102 concerns. The empty state offers no chat or phone alternative (QA-007). |
| PC-11 | Changes their mind | done (fail) | Each change of intent was treated as a symptom answer (QA-008). |
| PC-12 | Changes doctor | partly done | Covered inside PC-11: there's no way to change the doctor in the chat (QA-008). |
| PC-13 | Changes window | done (fail) | "Show other times" lists windows, but every chip is disabled. Free text can't be sent (QA-008, QA-010). |
| PC-14 | Goes back | done (pass, with issues) | "Go back" leaves for the homepage. Forward and reload restore the chat (QA-006). |
| PC-15 | Leaves and returns | done (fail) | A homepage message overwrote the old chat's first bubble and was never sent (QA-006). After a browser restart the transcript is reordered (QA-025). |
| PC-16 | Invalid or incomplete data | not run | The fields are in registration, which is out of scope. |
| PC-17 | Unrelated question | done (fail) | The hours and MSP question went unanswered and was logged as a symptom answer (QA-014). |
| PC-18 | Free text | done (fail at button steps) | Free text works only at intake questions. At button steps it silently can't be sent (QA-010). |
| PC-19 | Unsupported request | not run | Not run separately. The "should I call 911?" turn is recorded under PC-21. |
| PC-20 | Unexpected input | done (issues) | Nonsense and "idk" were accepted as clinical answers. Rapid second messages were silently held (QA-015, QA-010). |
| **PC-21** | **Emergency red flag** | **done (fail)** | Not caught at entry or mid-intake. After a confirmed emergency, intake resumes (QA-001, QA-002, QA-003). |
| **PC-22** | **Triage-first concern** | **done (recorded)** | Chat: 5 generic questions after the window is picked. Tile: goes straight to slot selection (QA-018). |
| **PC-23** | **Refuses the AI** | **blocked** | The refusal is ignored. Every non-AI path dead-ends with "No Physicians Available" (QA-007). |
| PC-24 | Health-information privacy | partly done | Title and URL are clean. The chat persists on the device (QA-005). The pixel can't be verified on staging (QA-026). |
| PC-25 | Patient tone | done | Red "Clear conversation" and a red emergency block. Small text on phones (QA-020, QA-023, QA-004). |
| PC-26 | Queue understanding | not run | Only visible after booking. |

**Counts:** 13 done, 7 partly done, 2 blocked, 4 not run (26 in total).

---

## Issues

### QA-001: An emergency stated in the first message is ignored, and booking goes ahead
- **Scenario:** PC-21, emergency red flag.
- **Severity:** Critical (serious safety issue). Clinical wording and treatment: **Needs Daniel/Ani** (rule 17a).
- **Patient goal:** Get help for chest pain and trouble breathing.
- **Steps:**
  1. Fresh profile. On the homepage, type "I have chest pain and I can't breathe" and press Enter.
  2. "Before we start": click "I understand — continue".
  3. Click "Quick-book a doctor", then "Today 1:00 pm - 3:00 pm".
- **Expected:** Sent to 911 or the ER **before** any window is offered or held (plan PC-21; rule 17a; B-001 §1).
- **Actual:**
  - Simplicity replies with its standard greeting and the three booking options.
  - Doctors and windows follow. After the window is picked, the AI asks "When did this start?"
  - The only emergency text before booking is the general notice line: "It is not emergency care — if this is an emergency, call 911."
  - **Technical cause:** the network log shows the opening message is held on the client. It's POSTed to `/session/messages` only after `/session/pathway` and `/session/physician` (`net-PC-21.jsonl`, `net-PC-01.jsonl`). So the AI can't screen it until a doctor and window have been chosen.
- **UX impact:** A patient in an emergency is invited to pick a call window and wait for a call.
- **Evidence:** `shots/pc21-01-first-msg.png`, `shots/pc21-02-after-consent.png`, `shots/pc21-03-window-picked.png`.
- **Suggested direction:** Screen the first free-text message before any pathway or window is offered. Daniel and Ani decide the wording, the treatment and the red-flag list.

### QA-002: Red flags stated during intake are not caught
- **Scenario:** PC-21 (variant, mid-flow).
- **Severity:** Critical. **Needs Daniel.**
- **Patient goal:** A patient with a sore throat reports that it has become an emergency.
- **Steps:**
  1. Fresh profile: "I don't know which doctor I need", then "Quick-book a doctor", then "Dr. Dev Test — Today 6:00 pm - 8:00 pm", then "I have a sore throat".
  2. Answer "When did this start?" with: "yesterday. now my throat feels like its closing up and its really hard to breathe".
  3. Then: "worse. i can barely breathe right now".
- **Expected:** An emergency redirect, the same as QA-001.
- **Actual:** Routine intake continues: "Since it started, has it been getting better, worse, or staying about the same?", then "Have you tried anything for this so far…". I waited 12 seconds; nothing else arrived.
- **UX impact:** A patient describing airway symptoms stays in a routine queue flow.
- **Evidence:** `shots/pc21b-01-midflow-redflag.png`, `shots/pc21b-02-no-redirect.png`, `shots/pc21b-03-second-redflag.png`, `net-PC-21b.jsonl`.
- **Suggested direction:** Screen every free-text turn, not only one fixed question. Daniel owns the red-flag list.

### QA-003: After the patient confirms an emergency, intake resumes, and the only action is "I understand"
- **Scenario:** PC-21.
- **Severity:** High. **Needs Daniel/Ani.**
- **Patient goal:** Understand what to do once the chat recognises an emergency.
- **Steps:**
  1. Continue QA-001: "like 20 minutes ago and its getting worse. should i call 911?"
  2. The AI asks: "Are you currently experiencing what you believe may be a life-threatening emergency…?" Answer "yes".
  3. Click the only button.
  4. Type "ok but can i still keep my spot with the doctor today?"
- **Expected:** A clear stop that points to 911 or the ER. Whether booking may continue is **Daniel's** call; it isn't decided anywhere in the repo.
- **Actual:**
  - A red "Please read this first" block appears: "call 9-1-1 or go to the nearest emergency department now. Do not wait for a Simple Care physician to contact you."
  - Its only action is a red button: "I understand that Quick-book is not an emergency service and that I should not wait…". There is no tap-to-call.
  - After it, the AI asks the next routine question ("Have you tried anything for this so far…"). It ignores the patient's question about keeping the spot, and the Dr. Emma Tester 1–3 PM selection stays active.
  - The emergency check came only after the patient asked about 911 themselves.
- **UX impact:** The flow recovers into booking, which signals that waiting for the call is acceptable.
- **Evidence:** `shots/pc21-04-ask-911.png`, `shots/pc21-05-yes-emergency.png`, `shots/pc21-06-emergency-message.png`, `shots/pc21-07-after-ack.png`, `shots/pc21-08-keep-spot.png`.
- **Suggested direction:** Record this for Daniel: whether the flow may continue after a confirmed emergency, whether a call action is offered, and whether the block uses red (rule 17a).

### QA-004: Three different emergency treatments across the pathways
- **Scenario:** PC-21 and PC-25.
- **Severity:** Medium. **Needs Daniel/Ani.**
- **Patient goal:** Know when this service isn't appropriate.
- **Steps:** Compare the chat's "Before we start" notice, the tile path's "Before You Continue" modal, and the chat's red emergency block.
- **Expected:** One agreed wording and treatment (rule 17a).
- **Actual:** There are three versions:
  1. **Chat notice** (`shots/pc01-01-after-first-msg.png`): one sentence, "if this is an emergency, call 911", shown after the patient has already typed.
  2. **Tile modal** (`shots/pc06-04-book-pannozzo.png`): orange icons and a list of red flags (chest pain or trouble breathing, fainting, severe injuries, heavy bleeding, severe allergic symptoms, controlled-medication requests).
  3. **Chat emergency block** (`shots/pc21-06-emergency-message.png`): red, with a long acknowledgement button.
- **UX impact:** Chat users never see the red-flag list that tile users get.
- **Evidence:** As listed above.
- **Suggested direction:** Daniel and Ani agree one version for every pathway.

### QA-005: A health conversation stays on the device and reopens for the next person without sign-in
- **Scenario:** PC-24 and PC-15.
- **Severity:** High (privacy). **privacy-security** should review.
- **Patient goal:** A patient on a shared or family computer expects their symptoms not to be shown to the next user.
- **Steps:**
  1. Phone profile: "I need to see a doctor", then Quick-book, then "Dr. Dev Test — Today 8:00 pm - 9:00 pm", then "i think i have a bladder infection, burning when i pee".
  2. Close Chrome entirely.
  3. Relaunch with the same profile and open `https://staging.simplecare.ca/care`, or type anything on the homepage (see QA-006).
- **Expected:** Nothing sensitive should appear where others could see it (plan PC-24). What counts as the right retention is **privacy-security**'s call.
- **Actual:**
  - The full conversation, including the symptom text, reopens with no sign-in.
  - `localStorage` holds `sc.care.token`, which persists across browser restarts.
  - The page title (generic), the URL (`/care`), cookies and web storage contain **no** health text. That part is good.
- **UX impact:** On a shared device, the next visitor who starts a chat sees the previous person's symptoms.
- **Evidence:** `shots/pc24-02-care-after-restart.png`, `shots/pc15-03-top-of-chat.png`, `net-PC-24-restart.jsonl`.
- **Suggested direction:** Decide the session lifetime and storage for anonymous chats, and how a patient ends one. Record the facts only; privacy-security decides.

### QA-006: A new message from the homepage overwrites the old chat's first message and is never sent
- **Scenario:** PC-15, PC-08 and PC-14.
- **Severity:** High (the transcript no longer matches what the patient said, and the new intent is lost).
- **Patient goal:** Come back and say "I need a doctor today".
- **Steps:**
  1. Complete PC-01 to the account step.
  2. Click "Go back", which goes to the homepage.
  3. Type "hi again, I need a doctor today" and press Enter.
- **Expected:** Either a new conversation, or the message added to the current one and answered.
- **Actual:**
  - The page opens `/care` with the **old** conversation.
  - The first bubble, originally "I need to see a doctor.", now reads "hi again, I need a doctor today". All the old turns follow it: the Dr. Emma Tester window, the sore-throat intake, and the account step.
  - No request was sent for the new text (`net-PC-14-15.jsonl`).
  - In the same session, "Go back" left the chat for the homepage. It isn't a step back. The chat does survive forward and reload.
- **UX impact:** The patient believes they asked for "today", but nothing changed. The visible record now pairs words the patient never said together.
- **Evidence:** `shots/pc14-01-after-goback.png`, `shots/pc15-02-home-new-msg.png`, `shots/pc15-03-top-of-chat.png`.
- **Suggested direction:** A homepage message with an existing chat should either resume the chat visibly and send the message, or offer a new chat. Don't rewrite history.

### QA-007: Every non-AI path dead-ends with "No Physicians Available", while the chat offers same-day windows
- **Scenario:** PC-23, PC-06, PC-10 and PC-22.
- **Severity:** High. It blocks the "AI is optional" rule in B-001 §4. It may be staging data configuration: **Needs Ani/engineering** to confirm.
- **Patient goal:** Book without the chatbot.
- **Steps:**
  1. Homepage: click the "Diarrhea" tile, then dismiss "Before You Continue". Also tried: "Book An Appointment" under Dr. Daniel Pannozzo; the bio modal's "Book Appointment"; the Common Concerns category; and the Sick Note concern.
  2. Read-only check: GET `/api/v1/patient/physicians/by-subcategory/<id>/with-slots` for all 102 concerns returned by `/services/with-subcategories`.
- **Expected:** A working non-chat route to the same queue (B-001 §3–4). If a concern has no availability, useful alternatives (PC-10).
- **Actual:**
  - Every attempt shows "No Physicians Available. We currently don't have any physicians offering <concern> at this time."
  - The API returns `{"success":true,"data":[]}` for **all 102** concerns (0 of 102 have physicians).
  - It already appears after choosing only the category, before any concern is chosen.
  - The empty state offers "Try Another Clinical Concern" and "Back to Home". It doesn't mention the chat or the phone line.
  - At the same moment, the chat's quick-book offered Dr. Emma Tester and Dr. Dev Test with windows today (`shots/pc05-04-more-windows.png`).
  - The header's "Get started" goes to account creation, not booking (`shots/pc23-02-get-started.png`).
- **UX impact:** A patient who "hates AI" can't book at all. Two pathways give contradictory availability for the same concern.
- **Evidence:** `shots/pc22-03-tile-diarrhea.png`, `shots/pc22-04-tile-no-physicians.png`, `shots/pc10-01-no-physicians-common-concerns.png`, `shots/pc06-08-sick-note-physicians.png`, `shots/pc06-10-bio-book.png`, `net-PC-06.jsonl`.
- **Suggested direction:** Confirm whether staging physicians are meant to be linked to services. If so, check why the walk-in chat list and the service list disagree. Give the empty state an alternative route.

### QA-008: Changes of mind are ignored, and neither the doctor nor the window can be changed before the account step
- **Scenario:** PC-11, PC-12 and PC-13.
- **Severity:** High (the patient can end up with the wrong window or doctor).
- **Patient goal:** Switch from tomorrow to today, then to the family doctor. Or pick a different window.
- **Steps:**
  - **PC-11:**
    1. "I need to see a doctor", then Quick-book, then "Dr. Dev Test — Tomorrow 6:00 pm - 8:00 pm".
    2. Type "Actually, I need someone today."
    3. Then "Actually, show me my family doctor."
    4. Then "can I change the doctor and time please? I want today".
  - **PC-13:** at the account step, click "Show other times", then "Tomorrow 9:00 AM – 11:00 AM". Then type "Can I change the time? Tomorrow morning works better for me".
- **Expected:** The changed intent is recognised, old selections don't silently remain, and there's no restart unless it's necessary (source plan UC-11, UC-13).
- **Actual:**
  - **PC-11:** the replies were, in order: "What can we help you with today?" (repeated), "When did this start?" and "Since it started…?". Each change was stored as a symptom answer. The tomorrow window stayed.
  - **PC-13:** every window chip under "Show other times" is `disabled`, with only the original one marked pressed. The only explanation is "Sign in to hold one of these windows." The typed request couldn't be sent (QA-010).
  - The only way to change anything is "Clear conversation", which starts over.
- **UX impact:** The patient has to restart, or sign in, to change their mind. Their "change" messages go to the doctor as clinical answers.
- **Evidence:** `shots/pc11-01-need-today.png`, `shots/pc11-02-family-doctor.png`, `shots/pc11-03-change-doctor.png`, `shots/pc13-01-other-times.png`, `shots/pc13-02-after-click-other.png`, `shots/pc13-04-send-click.png`.
- **Suggested direction:** Let the patient change the doctor or window in the chat before the account step, and recognise "change / actually / instead" turns.

### QA-009: The opening message is ignored, and every patient gets the same canned greeting
- **Scenario:** PC-01, PC-05, PC-06, PC-07, PC-09 and PC-23.
- **Severity:** Medium (the patient can continue, but results ignore what they asked, e.g. PC-09).
- **Patient goal:** Be understood from the first sentence.
- **Steps:** Fresh profile each time, with these opening messages:
  - "whats the fastest i can talk to a doctor? earliest available please"
  - "Can I see Dr. Pannozzo?"
  - "I don't know which doctor I need"
  - "I need an appointment after 3 today"
  - "I don't want to talk to a bot. can I just book with a real person?"
  - "I have chest pain and I can't breathe"
- **Expected:**
  - Intent is recognised and the patient isn't forced to know internal terms (UC-07).
  - A time constraint is respected, as a window (plan §Adapted 1; UC-09).
- **Actual:**
  - Every message gets the identical reply: "Hello! Thank you for connecting with us… which option best fits your needs today?", plus three buttons ("See my family doctor", "Become a regular patient", "Quick-book a doctor").
  - For "after 3 today", the cards still lead with "Today 1:00 pm - 3:00 pm", marked "Soonest".
  - The patient describes the need only after picking a doctor and window.
- **UX impact:**
  - Patients have to translate their need into product terms: "regular patient" vs "family doctor" vs "quick-book".
  - The unsure patient (PC-07) gets no guidance.
- **Evidence:** `shots/pc05-02-options.png`, `shots/pc07-02-no-clarification.png`, `shots/pc09-01-after-3.png`, `shots/pc23-01-refuse-bot.png`, `shots/pc06-01-quickbook-no-pannozzo.png`.
- **Suggested direction:** Use the opening message to pre-select the path, filter the windows, or ask one clarifying question.

### QA-010: The composer takes typing, but Send is disabled with no visible change, so messages silently go nowhere
- **Scenario:** PC-18, PC-13, PC-04 and PC-20.
- **Severity:** Medium.
- **Patient goal:** Reply in words instead of buttons.
- **Steps:** At any button step (the pathway choice, doctor cards, account step), type a reply and press Enter or click Send. Also type a second message while a reply is still loading.
- **Expected:** Free text works, or the box clearly shows that it's unavailable (UC-18; source plan §10, "unexpected text where a button choice is expected").
- **Actual:**
  - The textarea stays enabled.
  - The Send button is `disabled`, but it keeps the same navy (`rgb(22,38,96)`) and opacity 1. Only the cursor changes, to `not-allowed`.
  - The text stays in the box with no message. The small hint says "Choose an option above to get started" or "We have what we need for now".
  - **PC-05:** the stale text ("any doctor is fine, just the soonest one") was still in the box when the reason question arrived. One Enter would have sent it as the medical reason.
  - **PC-20:** a second message typed during loading was held silently.
- **UX impact:** Patients think they've replied. Stale text can be sent as the wrong answer.
- **Evidence:** `shots/pc05-03-freetext.png`, `shots/pc05-05-stale-text-in-composer.png`, `shots/pc13-04-send-click.png`, `shots/pc04-01-no-family-doctor.png`, `shots/pc20-03-rapid.png`.
- **Suggested direction:** Make the disabled state visible, and either accept free text at button steps or clear it.

### QA-011: The family-doctor path goes straight to sign-in, and a patient without one is trapped
- **Scenario:** PC-03 and PC-04.
- **Severity:** Medium.
- **Patient goal:** Start with "See my family doctor", then realise they don't have one.
- **Steps:**
  1. "I need my family doctor", then "See my family doctor".
  2. Type "oh wait, I don't actually have a family doctor".
- **Expected:** The patient isn't trapped, and the next option is clearly explained (UC-04).
- **Actual:**
  - The reply is "To book with your regular doctor, you'll need to sign in to your SimpleCare account first", with "I have account" and "I'm new here". "I'm new here" is offered even on the family-doctor path.
  - The typed correction can't be sent (QA-010).
  - The only exits are:
    - "Go back", which goes to the homepage and keeps the same state;
    - "Clear conversation", which is red, wipes everything, and has no confirmation or undo.
  - Terminology shifts between "family doctor" and "regular doctor" across the button and the reply.
- **UX impact:** A patient who picked the wrong option has to find a destructive red link to recover.
- **Evidence:** `shots/pc03-01-family-doctor.png`, `shots/pc04-01-no-family-doctor.png`, `shots/pc04-02-clear-conversation.png`.
- **Suggested direction:** Offer "I don't have a family doctor here" as a way out at that step.

### QA-012: The window isn't held before the account step, and the account prompt is unclear
- **Scenario:** PC-01 and PC-05.
- **Severity:** Medium.
- **Patient goal:** Know that the chosen window is theirs, and what to do next.
- **Steps:** Complete the walk-in intake. The last reply is "Thanks — I'll pass that along to the doctor."
- **Expected:** Ani's design: "Holding today 6:00–8:00 pm with Dr. Michael Chen. Have you been here before?", then "I have account / I'm new here". Source: `research/patient-entry-flows/README.md` §2 step 5.
- **Actual:**
  - Two buttons appear with **no question**.
  - A "Your call window" card shows "Today 1:00 PM – 3:00 PM" **without the doctor's name**, plus the line "Sign in to hold one of these windows." "These" is plural although only one window is shown.
  - For a new patient, "Sign in" doesn't describe the next step.
- **UX impact:**
  - It's unclear whether anything is reserved, or with whom.
  - A new patient may think they need an existing account.
- **Evidence:** `shots/pc01-11.png`, `shots/pc05-11-account-step.png`.
- **Suggested direction:** Say what is (or isn't) held, with whom, and ask the new-or-returning question in words.

### QA-013: The AI repeats its question word for word, ignoring a clear answer
- **Scenario:** PC-05.
- **Severity:** Medium.
- **Patient goal:** Get a sick note.
- **Steps:** Quick-book, then "Dr. Emma Tester — Today 1:00 pm - 3:00 pm". When asked "What can we help you with today?", answer "i need a sick note for work, i was off sick monday and tuesday with a cold".
- **Expected:** The answer is acknowledged and the conversation moves on.
- **Actual:**
  - "What can we help you with today?" is asked again.
  - After the shorter "a sick note", the AI asks "Since it started, has it been getting better, worse…". Those are symptom questions for a document request.
  - It doesn't mention that the Sick Note concern is flagged `mspCovered: false` in the staging service data (see QA-019).
- **UX impact:** The patient feels unheard and has to repeat themselves.
- **Evidence:** `shots/pc05-06-repeat-question.png`, `shots/pc05-07-rephrase.png`, `net-PC-05.jsonl`.
- **Suggested direction:** Investigate why the first answer was dropped. Both messages were POSTed, at stateVersion 3 and 4.

### QA-014: An unrelated question isn't answered, and is logged as a symptom
- **Scenario:** PC-17.
- **Severity:** Medium.
- **Patient goal:** Ask the hours and MSP coverage mid-booking, then carry on.
- **Steps:**
  1. "hi i need a doctor for a rash on my arm", then Quick-book, then a window.
  2. When asked "When did this start?", type "wait, what are your hours? and is this covered by MSP?"
- **Expected:** An answer, then back to booking with the context kept (UC-17).
- **Actual:** The next intake question comes: "Since it started, has it been getting better…?" The question gets no answer. The context is kept, because the intake simply continues.
- **UX impact:** Cost and coverage questions go unanswered at the point of commitment.
- **Evidence:** `shots/pc17-01-hours.png`, `net-PC-17.jsonl`.
- **Suggested direction:** Answer common admin questions from approved content, then resume.

### QA-015: Nonsense and "idk" are accepted as clinical answers and passed to the doctor
- **Scenario:** PC-20.
- **Severity:** Medium.
- **Patient goal:** Not applicable; this is a robustness check.
- **Steps:** Within PC-17's intake, answer "asdkjh qwe", then "idk", then "no" twice.
- **Expected:** A gentle clarification when an answer is unclear (source plan §10).
- **Actual:**
  - Each answer is accepted, and the next question follows.
  - The run ends at "Thanks — I'll pass that along to the doctor", with the transcript including the MSP question and the nonsense.
- **UX impact:** The doctor gets low-quality intake. The patient isn't told their answer was unclear.
- **Evidence:** `shots/pc20-01-nonsense.png`, `shots/pc20-02-idk.png`, `shots/pc20-04-repeat.png`.
- **Suggested direction:** Clarify obviously invalid answers once.

### QA-016: "Become a regular patient" is a lifelong choice from a list of fixtures with no information
- **Scenario:** PC-04.
- **Severity:** Medium.
- **Patient goal:** Choose a family doctor.
- **Steps:** "Become a regular patient", then read the list, then click "Select Dr. Daniel Pannozzo".
- **Expected:**
  - Real doctors with the information needed to choose (plan §Adapted 6).
  - The design shows a bio card before "Select" (`research/patient-entry-flows/README.md` §3).
- **Actual:**
  - Nine doctors are listed:
    - seven are internal fixtures: Dr. Dana NoBackup, Dr. Cara Standby, Dr. Ben Backup, Dr. Ada Overdue, Dr. Patient360 QA Physician, Dr. Dev Test and Dr. Emma Tester;
    - two are real: Dr. Daniel Pannozzo and Dr. Luke Turanich.
  - There are no bios in the chat. Seven show initials.
  - Credentials are inconsistent: "MD, CCFP (FPA)", "CCFP" or blank.
  - One click selects the doctor, with no confirmation, and goes straight to the account step. The patient isn't asked for a reason or a window.
  - Only 2 doctors appear in quick-book, against 9 here. The two lists don't match.
- **UX impact:** A permanent choice made with no information. Test fixtures would confuse any reviewer.
- **Evidence:** `shots/pc04-04-become-patient.png`, `shots/pc04-05-doctor-list-top.png`, `shots/pc04-07-selected-family-doctor.png`.
- **Suggested direction:** Hide the fixtures from patient-facing lists. Show the bio before "Select" and confirm the choice.

### QA-017: A named doctor can't be booked as a walk-in, and his "Book An Appointment" button doesn't preselect him
- **Scenario:** PC-06.
- **Severity:** Medium.
- **Patient goal:** "Can I see Dr. Pannozzo?"
- **Steps:**
  1. Ask in the chat, then Quick-book.
  2. Type "I wanted Dr. Pannozzo, is he not available?"
  3. On the homepage or Doctors page, click "Book An Appointment" under his photo, and "Book Appointment" in his bio.
- **Expected:** The named doctor is selected, with no other doctor substituted (UC-06).
- **Actual:**
  - Quick-book shows only Dr. Emma Tester and Dr. Dev Test, with no explanation. The typed question can't be sent.
  - Both of his buttons open the generic `/patient/appointment`, where no doctor is chosen, and then dead-end (QA-007).
  - The second doctor's link reads "Dr. Luke Turanich, MD" rather than "About Dr. …".
- **UX impact:** A patient could think they're booking with the doctor they chose.
- **Evidence:** `shots/pc06-01-quickbook-no-pannozzo.png`, `shots/pc06-02-ask-pannozzo.png`, `shots/pc06-04-book-pannozzo.png`, `shots/pc06-09-pannozzo-bio-modal.png`, `shots/pc06-10-bio-book.png`.
- **Suggested direction:** Pass the doctor into the booking flow from his card. Say so when a named doctor has no walk-in windows.

### QA-018: Triage-first concerns can be booked from a quick tile, and the chat's triage comes after the window
- **Scenario:** PC-22.
- **Severity:** Medium. **Needs Daniel** (his quick-book vs triage-first list).
- **Patient goal:** Book for diarrhoea lasting a week.
- **Steps:**
  1. **Chat:** "I've had diarrhoea for a week", then "Quick-book a doctor", then "Today 4:30 pm - 6:00 pm", then answer the questions.
  2. **Tile:** homepage, then "Diarrhea".
- **Expected:** Record what happens. B-001 says complicated concerns go through triage, and don't get a quick-book tile. It names haemorrhoids, diarrhoea and constipation as examples, but the final list is Daniel's.
- **Actual:**
  - **Chat:** the only walk-in route is labelled "Quick-book". The questions start after the window is picked. There were 5, all generic:
    1. better or worse;
    2. other symptoms;
    3. what makes it better or worse;
    4. what's been tried;
    5. regular medications.
  - It didn't ask about allergies or other conditions, although the sore-throat run asked both (6 questions).
  - Then the account step.
  - **Tile:** the homepage shows "Hemorrhoids", "Constipation" and "Diarrhea" as tiles. Each goes straight to "Choose an appointment slot" (then Choose Doctor, then Clinical Intake).
  - **Service data:** every category is `careType: WALK_IN`. Nothing marks a concern as triage-first.
- **UX impact:** Can't be judged until Daniel's list exists.
- **Evidence:** `shots/pc22-02-account-step.png`, `shots/pc22-03-tile-diarrhea.png`, `net-PC-22-chat.jsonl`.
- **Suggested direction:** Once Daniel classifies the concerns, rerun PC-22.

### QA-019: Sick Note is marked not MSP-covered in the data, but nothing is said about cost before the account step
- **Scenario:** PC-05 and PC-17.
- **Severity:** Medium. **Needs Ani.**
- **Patient goal:** Know whether a visit is free under MSP.
- **Steps:** Book "a sick note" through the chat quick-book, up to the account step.
- **Expected:** Not defined in the repo (assumption: the cost may be shown after sign-in).
- **Actual:**
  - Staging `/services/with-subcategories` marks Sick Note `mspCovered: false`.
  - The hero says "MSP Covered". The chat never mentions cost, and the patient's coverage question went unanswered (QA-014).
- **UX impact:** A patient may commit expecting it to be free.
- **Evidence:** `shots/pc05-11-account-step.png`, `shots/pc17-01-hours.png`.
- **Suggested direction:** Ani decides whether cost is disclosed before the account step.

### QA-020: "Clear conversation" is red and wipes the chat with no confirmation
- **Scenario:** PC-25 and PC-04.
- **Severity:** Medium.
- **Patient goal:** Not applicable; a tone and safety-of-action check.
- **Steps:** On any chat screen, click "Clear conversation".
- **Expected:**
  - Red is critical only; text is ink (rules 17 and 21).
  - A destructive action is recoverable.
- **Actual:**
  - Red text sits under the composer on every chat screen.
  - One click clears everything at once and shows "Before we start" again. There's no confirm and no undo.
- **UX impact:** An accidental tap loses the intake. The red is alarming next to the composer.
- **Evidence:** `shots/pc04-02-clear-conversation.png`, `shots/m-03-options.png`.
- **Suggested direction:** Neutral styling, plus a confirmation.

### QA-021: New content appears below the fold, and the chat doesn't scroll to it
- **Scenario:** PC-01 (visual).
- **Severity:** Low.
- **Patient goal:** See the doctor cards after choosing Quick-book.
- **Steps:** "Quick-book a doctor".
- **Expected:** The newest content is visible.
- **Actual:** The chat container stayed at `scrollTop` 0. The doctor cards sat under the composer, with only the top of the first card showing.
- **UX impact:** The patient may not realise the choices have arrived.
- **Evidence:** `shots/pc01-03-quickbook.png`, compared with `shots/pc01-04-doctor-cards.png` after manual scrolling.
- **Suggested direction:** Scroll to new content.

### QA-022: Inconsistent time formats and terminology, and no time zone on windows
- **Scenario:** PC-01, PC-05 and PC-06 (visual and content).
- **Severity:** Low.
- **Patient goal:** Understand the window.
- **Steps:** Compare the doctor cards, the "Your call window" card and the tile flow.
- **Expected:** Consistent call-window language, with BC time implied or stated (glossary: "8–10 AM BC time").
- **Actual:**
  - Times appear as "1:00 pm - 3:00 pm" on the cards but "1:00 PM – 3:00 PM" on the account step.
  - No time zone is shown anywhere.
  - Windows for the same doctor overlap (1–3, 2–4, 4:30–6).
  - The tile flow heading says "Choose an appointment slot".
  - Uppercase "CATEGORY" and "CLINICAL CONCERN" labels (rule 23).
  - "CCFP" is shown to patients without explanation.
  - The desktop tile heading ("Know What You Need? Fast-Track Your Visit…") differs from the mobile one ("Or Find Your Concern & Book A Quick Visit — Most visits are seen the same day").
- **UX impact:** Minor confusion, and "appointment slot" suggests an exact time.
- **Evidence:** `shots/pc01-04-doctor-cards.png`, `shots/pc01-11.png`, `shots/pc10-01-no-physicians-common-concerns.png`, `shots/m-01-home.png`.
- **Suggested direction:** One format, "call window" throughout, and sentence case.

### QA-023: Phone text and targets are below the proposed defaults
- **Scenario:** PC-25 (390×844).
- **Severity:** Low. The rule is a **proposed** default pending Ani (rule 22).
- **Patient goal:** Read and tap comfortably on a phone.
- **Steps:** On the phone viewport, go to Quick-book and the doctor cards, and measure the computed sizes.
- **Expected:** Patient body text at least 16px on phones, and 44px buttons (rule 22).
- **Actual:**
  - Text sizes: Simplicity bubble 14px; window time 13px; day label, "Select a call window", credentials, hints and timestamps 12px.
  - Targets: "Go back" 36×36; "More" 42×36; "Clear conversation" 16px tall.
  - The window chips themselves are 151×50, which is fine.
- **UX impact:** Harder reading and tapping for older patients.
- **Evidence:** `shots/m-05-cards.png`, `shots/m-03-options.png`.
- **Suggested direction:** Ani to confirm the defaults, then apply.

### QA-024: Concern tiles can't be reached by keyboard, and the mic button is labelled "Talk to Simplicity"
- **Scenario:** PC-23 and PC-25 (accessibility).
- **Severity:** Medium. The **accessibility** gate should review.
- **Patient goal:** Use the tiles with a keyboard or screen reader.
- **Steps:**
  1. Inspect the "Diarrhea" tile item.
  2. On the homepage, click the round button beside the input.
- **Expected:** Keyboard and screen-reader support (`research/patient-entry-flows/README.md`, "Accessibility on phones").
- **Actual:**
  - The tile items are `li` and `span` elements with click handlers. They have no role and no tabindex, so Tab can't reach them.
  - The homepage button's accessible name, "Talk to Simplicity", reads like "start chat", but it starts **dictation**. With no microphone permission it shows: "We can't hear you — microphone access is blocked…". The error is clear.
  - There is no visible send button in the hero; the patient has to press Enter.
- **UX impact:** Keyboard users can't use the non-AI entry at all. Screen-reader users get a misleading label.
- **Evidence:** `shots/pc18-mic-denied.png`, `shots/pc14-02-talk-again.png`.
- **Suggested direction:** Make the tiles real links or buttons, and rename the mic control.

### QA-025: After a browser restart the transcript is reordered, the selection is gone, and every timestamp says "Just now"
- **Scenario:** PC-15.
- **Severity:** Low.
- **Patient goal:** Resume where they left off.
- **Steps:** Covered in QA-005: relaunch, then open `/care`.
- **Expected:** The same transcript as before.
- **Actual:**
  - The opening message now appears **after** "Choose a doctor and call window".
  - The "Dr. Dev Test — Today 8:00 pm - 9:00 pm" bubble is missing. The pick was held in `sessionStorage`, which was lost.
  - Every turn shows "Just now".
- **UX impact:** The patient can't tell which doctor or window they chose.
- **Evidence:** `shots/pc24-02-care-after-restart.png`.
- **Suggested direction:** Restore the order and the selection from the server session.

### QA-026: Tracking on condition-specific steps can't be verified on staging
- **Scenario:** PC-24.
- **Severity:** Medium (an unverified privacy risk, not a confirmed defect). The **privacy-security** gate should review.
- **Patient goal:** No health information goes to advertisers.
- **Steps:**
  1. Log every request in each scenario (CDP Network events).
  2. Read the staging bundle's `metaPixel` module and find where it's called.
- **Expected:** No tracking fires on condition-specific steps (plan PC-24; rule 8).
- **Actual:**
  - **Requests on staging:** no third-party tracking requests in any scenario. The only hosts were `staging.simplecare.ca`, `api.staging.simplecare.ca`, `simplecare-uploads-stag.s3…` (doctor photos) and `static.legitscript.com` (a seal).
  - **Why:** staging's `metaPixel-DsLSvmIV.js` is an empty stub (`function n(){}function t(){}`). The HTML comment says the pixel is limited to "public marketing pages in production".
  - **Call sites:** it's still called, with no arguments, when a booking is confirmed in `IntakeFormPage`, `DirectBookAppointmentPage` and `PaymentSuccessPage`.
  - **Tile URLs:** they carry `?serviceId=<uuid>`, which the public services API maps to a concern name (e.g. Diarrhea).
  - **Title and URL:** the page title stays generic on `/care` and the tile pages.
- **UX impact:** If production fires the pixel on those pages, the page URL (and so the concern) could go to Meta. This is **assumption**, not observed.
- **Evidence:** `bundle/metaPixel.js`, `bundle/IntakeFormPage-CqKUVikR.js`, `bundle/DirectBookAppointmentPage-CE-7vaeR.js`, `net-PC-22-tile.jsonl`.
- **Suggested direction:** Privacy-security checks the production build (read only, no booking) for pixel events on `/patient/*` routes.

### QA-027: The header "Get started" goes straight to account creation
- **Scenario:** PC-23 and PC-01 (registration).
- **Severity:** Low.
- **Patient goal:** Start booking.
- **Steps:** Click "Get started" in the header.
- **Expected:** Not specified. Assumption: it starts booking.
- **Actual:** It opens `/patient/complete-profile`, "Welcome To Simple Care… create your account", with two agreements. **I stopped here.**
- **UX impact:** A patient who wants to book is asked to register before seeing any windows. That's the opposite of the hold-then-register pattern.
- **Evidence:** `shots/pc23-02-get-started.png`.
- **Suggested direction:** Ani decides where "Get started" leads.

---

## Final output

### A. Scenarios completed (13)
- **Done (13):** PC-07, PC-09, PC-10, PC-11, PC-13, PC-14, PC-15, PC-17, PC-18, PC-20, PC-21, PC-22, PC-25.
- **Of those, passed (with issues):** PC-14 only.
- **Of those, recorded without a verdict:** PC-22 (needs Daniel's list) and PC-25.
- **Partly done (7):** PC-01, PC-03, PC-04 and PC-05, which stopped at the account step; PC-08 and PC-12, covered inside other runs; and PC-24, where the pixel can't be seen on staging.
- **Total attempted:** 22 of 26.

### B. Scenarios failed or blocked
- **Failed:** PC-07, PC-09, PC-10, PC-11, PC-13, PC-15, PC-17, PC-18, PC-20 and **PC-21**.
- **Blocked:** PC-06 and PC-23. On staging, the non-chat path has no physicians for any concern (QA-007).
- **Not run:** PC-02, PC-16 and PC-26 need sign-in or a completed booking. PC-19 wasn't run separately.

### C. UX findings
QA-008, QA-009, QA-010, QA-011, QA-012, QA-016, QA-017, QA-019, QA-020, QA-027.

### D. Functional findings
- QA-001: the opening message is held client-side until a doctor is picked.
- QA-006: a homepage message overwrites the transcript.
- QA-007: the services and physicians API returns empty for all 102 concerns.
- QA-013: a question repeats after a POSTed answer.
- QA-025: a restored session reorders the transcript and loses the pick.

### E. Visual findings
- QA-021: no auto-scroll.
- QA-022: formats, uppercase labels, no time zone.
- QA-023: phone sizes.
- QA-020: red text.
- QA-004: three emergency treatments.

### F. Conversation and context findings
QA-001, QA-002, QA-003, QA-006, QA-008, QA-009, QA-013, QA-014, QA-015, QA-025.

### G. Registration and authentication findings
The account step was reached in PC-01, PC-03, PC-04, PC-05 and PC-20. Nothing past it was tested.
- **The account prompt:** two buttons with no question, and "Sign in to hold" wording aimed at new patients (QA-012).
- **The family-doctor path:** requires sign-in before anything else, and offers "I'm new here" on it (QA-011).
- **"Get started":** leads straight to account creation (QA-027).

### H. Evidence
- **Screenshots:** 93 PNGs in `…/scratchpad/pcqa/shots/`, cited in each issue above.
  - Key files: `pc21-02-after-consent.png`, `pc21-03-window-picked.png`, `pc21-06-emergency-message.png`, `pc21b-02-no-redirect.png`, `pc24-02-care-after-restart.png`, `pc15-03-top-of-chat.png`, `pc22-04-tile-no-physicians.png`, `pc13-02-after-click-other.png`, `pc11-03-change-doctor.png`.
- **Network logs:** `net-<scenario>.jsonl`, one per scenario.
- **Console logs:** `console-<scenario>.jsonl`, which are empty.
- **Bundle excerpts:** `bundle/`.
- **Content:** screenshots and logs hold only invented test phrases and staging fixture doctors.

### I. Priority for investigation (by patient impact)
1. **QA-001, QA-002 and QA-003:** emergency detection at entry and mid-flow, and what happens after a confirmed emergency.
2. **QA-005:** health conversations persisting on shared devices.
3. **QA-007:** the non-AI path dead-ends. That blocks B-001's "AI is optional" and hides availability.
4. **QA-006 and QA-008:** lost or overwritten intent, and no way to change the doctor or window.
5. **QA-026:** verify production pixel behaviour on `/patient/*`.
6. **QA-010, QA-011, QA-012 and QA-009:** silent composer, family-doctor trap, unclear hold, ignored opening message.
7. The rest: Medium and Low content, visual and accessibility items.

---

## Top 3 findings
1. **Emergencies aren't caught before a window is offered** (QA-001, QA-002). "I have chest pain and I can't breathe", and a mid-intake "throat closing up… really hard to breathe", both lead into routine booking and intake. The first message isn't even sent to the AI until a doctor and window are picked.
2. **The chat is the only working path on staging** (QA-007). Tiles, "Book An Appointment" and the doctor bios all end in "No Physicians Available", for all 102 concerns. Meanwhile the chat offers windows today. A patient who refuses the AI can't book.
3. **The chat doesn't track what the patient says** (QA-006, QA-008, QA-009). Opening requests, changes of mind and "today" are ignored or stored as symptoms. A homepage message silently overwrites the old transcript, and the window can't be changed before sign-in.

## What needs Daniel
- **The emergency response in the chat:**
  - which red flags must trigger it, and on which turns;
  - its wording and visual treatment, including the current red block (rule 17a);
  - whether booking may continue after a patient confirms an emergency;
  - whether the chat should show the same red-flag list as the tile modal (QA-001 to QA-004).
- **The quick-book vs triage-first list.** It's needed to judge the Hemorrhoids, Constipation and Diarrhea tiles, and the chat's "Quick-book" label for them (QA-018).
- **Whether the triage question sets are adequate.** Diarrhoea skipped allergies and other conditions; a sick note got symptom questions (QA-013, QA-018). This is clinical, so it's recorded here and not judged.

## What needs Ani
- **Staging physician data:** is the "No Physicians Available" state for every concern intended? If not, who links physicians to services, so PC-06, PC-10 and PC-23 can be rerun (QA-007)?
- **Sign-in:** signing in herself so PC-02, PC-16 and PC-26 can run, and a test account for the new-patient path.
- **Design decisions:**
  - hold before account, versus "Sign in to hold" (QA-012);
  - where "Get started" leads (QA-027);
  - cost disclosure for services that aren't MSP-covered (QA-019);
  - hiding fixture doctors from patient-facing lists (QA-016).
- **Figma references** for the chat flow, so the visual checks can compare against the approved design.
- **Confirming the proposed phone defaults** (16px text, 44px targets) (QA-023).
- **Routing privacy-security** to review session persistence on shared devices (QA-005) and the production pixel on `/patient/*` (QA-026). Also routing **accessibility** to review the tiles and the mic label (QA-024).
- **Side observation, outside the chat:** staging serves `robots: index, follow`, and its `robots.txt` allows all crawling, so staging can be indexed.
