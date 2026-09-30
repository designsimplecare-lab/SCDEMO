# Patient chat QA: test plan

**Owner:** `patient-chat-qa`.
**Source:** Ani's "Patient Chat QA Agent & End-to-End Testing Plan" (29 Sep 2026). Its full text is in
`source-plan-ani-2026-09-29.txt`, and that plan is the base. This file adds the SimpleCare-specific
scenarios and rules on top of it.

## What's being tested
The **patient booking journey**, run as a real patient would:

homepage → the Simplicity chat or a concern tile → stating a need → choosing a path (family doctor, a
regular doctor, or quick-book) → choosing a doctor → choosing a **call window** → new or existing
patient → registering or signing in → reviewing → booking → confirmation, and what happens next.

The map is in `research/patient-entry-flows/README.md`. The booking model is in bulletin B-001.

## Adapted to SimpleCare (these override the generic plan where they differ)
1. **Call windows, not appointment times.**
   - A patient books a **window**, e.g. 6–8 PM, and gets a **place in the queue**. The doctor calls
     within that window.
   - Test that nothing implies an exact appointment time, and that **no wait estimate** is shown.
   - "Can I see someone after 3?" means a window after 3 PM.
2. **Calls go outward.** The confirmation must say the doctor will call the patient. There must be no
   "call your doctor" action.
3. **Booking is open to every non-emergency concern** (B-001). No test should expect a refusal, except
   for emergencies.
4. **Quick-book vs triage-first.** Straightforward concerns can be quick-booked. Complicated ones go
   through triage first. The list of which is which is **Daniel's**. Until it exists, record what
   happens and don't judge whether it's right.
5. **The AI is optional.** Every journey must also be possible **without** the chat: tiles, and the
   phone line when it exists.
6. **Placeholder doctors.** The boards use placeholder doctors (e.g. "Dr. Sarah Patel, DO,
   Cardiologist"). Test against the supplied test data, and flag placeholder or wrong-specialty labels
   as findings.
7. **Test data only.** No real names, PHNs, dates of birth, emails or phone numbers, ever. Use approved
   test accounts, or `@example.com` addresses and 555 phone numbers.
8. **Never book, register or pay on the live site** (simplecare.ca). Test only an environment Ani
   names: staging or a prototype.

## Test suite
The generic plan's IDs are prefixed **PC-**, so they don't collide with the product's UC-NN use cases.

| ID | Scenario | Goal |
|---|---|---|
| PC-01 | New patient books | Homepage through to confirmation |
| PC-02 | Existing patient books | No needless registration |
| PC-03 | See my family doctor | Reach the right doctor's path |
| PC-04 | No family doctor | Recover and find another doctor |
| PC-05 | Quick-book | The earliest suitable window |
| PC-06 | A specific doctor | The named doctor, with no swap |
| PC-07 | Unsure which doctor | A clear path from a stated need |
| PC-08 | Book today | A window today, when one exists |
| PC-09 | A date or time constraint | The results respect it (as windows) |
| PC-10 | No availability | Useful alternatives, not a dead end |
| PC-11 | Changes their mind | Intent changes mid-flow |
| PC-12 | Changes doctor | No stale selection |
| PC-13 | Changes window | Only the new window is kept |
| PC-14 | Goes back | State is kept |
| PC-15 | Leaves and returns | No confusing state |
| PC-16 | Invalid or incomplete data | Recoverable errors |
| PC-17 | Unrelated question | Answered, then back to booking |
| PC-18 | Free text | Works without buttons |
| PC-19 | Unsupported request | Handled safely |
| PC-20 | Unexpected input | Typos, nonsense, repeats |
| **PC-21** | **Emergency red flag** (e.g. "chest pain and I can't breathe") | Sent to 911 or the ER **before** any window is held. Record the wording; it is **Needs Daniel/Ani** |
| **PC-22** | **Triage-first concern** (e.g. "diarrhoea for a week") | It goes through triage, not straight to a quick-book tile. Record what happens |
| **PC-23** | **Refuses the AI** ("I don't want to talk to a bot") | A non-AI path to booking exists and works |
| **PC-24** | **Health information privacy** | The chat doesn't echo sensitive details into places others could see, e.g. page titles, URLs or previews. Flag any tracking that fires on condition-specific steps |
| **PC-25** | **Patient-tone check** | No alarming colours, no clinical flags, plain words, and the next step is clear |
| **PC-26** | **Queue understanding** | After booking, the patient understands their window and place in the queue, that the doctor calls them, and that no time estimate is shown |

## Report format, severity and final output
As in the source plan, §13–§15: issue ID `QA-NNN`, scenario, severity (Critical / High / Medium /
Low), patient goal, steps, expected, actual, UX impact, evidence, and suggested direction.

- **Where reports go:** `product/reports/patient-chat-qa-<date>-<run>.md`.
- **Evidence:** in the scratchpad. Screenshots must contain **no real data**.

## Before the first run (needs Ani)
- [ ] **The environment.** Which staging URL or prototype holds the Simplicity chat? No prototype has
      it today.
- [ ] **Test accounts:** one new-patient account and one existing-patient account.
- [ ] **Test data:** doctors, windows and availability, including a no-availability case.
- [ ] **Figma references** for the approved flows. The two boards are in
      `research/patient-entry-flows/`.
- [ ] **Known limitations** of the environment.
- [ ] **Daniel's list** of quick-book vs triage-first concerns. PC-22 needs it to judge the result.

## Environment facts
- **Staging:** https://staging.simplecare.ca. It has the Simplicity chat, and it's the named test
  environment (Ani, 29 Sep 2026).
- **Notifications:** staging does **not** send real emails or texts to doctors or MOAs (Ani, 29 Sep).
  Completing a test booking there is safe.
- **Signing in:** Ani signs in herself. Agents never enter passwords or approve third-party sign-in.
- **Known limitation of staging:** booking by clicking a concern tile, outside the chat, isn't
  available on staging. It is in production (Ani, 29 Sep). Tiles on staging show "No Physicians
  Available". Don't report that as a defect. Test the tile path only where it exists.
- **Demo-only controls:** the "Clear conversation" button is there only for the demo (Ani, 29 Sep).
  Don't report on it.
