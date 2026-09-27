# MOA baseline review: 26 Sep 2026

Agent: `moa`. I played the MOA on shift (Japneet as the buddy on service, Dolly as the primary MOA), working
`simplecare-moa-portal.html` (build stamp 2026-09-22 18:03, MOAP:534) against what
`simplecare-physician-portal-v2.html` (build 2026-09-26 19:16) now sends.

**Sources.** MOAP = `simplecare-moa-portal.html`. V2 = `simplecare-physician-portal-v2.html`. PP =
`simplecare-patient-portal-v2.html`. S1–S5 = `shadowing/` visits 1–5. ANS26 =
`from-daniel/2026-09-26-answers-to-shadowing-questions.md`. SIA = `simplecare-stakeholder-interview-analysis.md`.
REQ-, OQ- and UC- numbers refer to `product/`.

**Method.** I read both portals' code and took headless Chrome screenshots of each step. The
screenshots are kept in the scratchpad (`…/scratchpad/moa/`, files `moa-01…06`, `phys-01…09`), not in
the repo. Patients are called "the patient" here, not by the demo names.

**Summary.** The MOA portal was built before the 25–26 Sep work and has not been updated since. The
physician side now sends typed, prioritised tasks, uses "Ask Japneet to send" and "Picked up", and
signs off in the doctor's name. None of these reaches the MOA portal, and the MOA portal has no way
to send any of them back. The two portals also run on different task data, so the demo cannot show a
single hand-off from end to end.

---

## Flow 1: receiving a task from the doctor

**Observed**
1. The doctor presses Task MOA, picks a type chip and a priority, writes a note, and presses Send to
   MOA. That is 4–5 actions. The routing line reads "Goes to Japneet, on service for this window,
   copies Dolly … as your primary MOA, and forwards to Practice admin" (V2:5302-5340, 6832-6838; screenshot
   `phys-09`).
2. On the MOA side, nothing arrives. MOAP renders its own hard-coded `TASKS` array (MOAP:373-381). The
   physician's `DOC_TASKS` (V2:6886+) and `moaTask()` (V2:10214) never reach it. The doctor's Home
   shows an urgent EDS referral rebook as "4d overdue · Dolly" (V2:6892; `phys-06`), but that task is
   not in Dolly's portal.
3. **The signed-in MOA is not the one tasks go to.** MOAP signs in "Dolly" under a different surname
   from the one V2 copies (MOAP:224 vs V2:6853). Tasks go to Japneet (V2:6854), and there is no Japneet
   view. The doctor's chat lists three other MOAs: Priya M., Jordan T. and Office Admin (V2:8285-8297).
   The chart's transfer button says "Transfer to Dolly" (V2:4803, 4870, 5059). So "who is my MOA" has
   four different answers in the prototypes.
4. **The two portals use different words.**

   | | Physician v2 sends | MOA portal shows |
   |---|---|---|
   | Type | Lab Work, Imaging, Referrals, Prescriptions, Documents, Patient Notes (V2:6858) | Call patient, Reroute referral, Book imaging, Route document, Chase referral (MOAP:374-380) |
   | Priority | Urgent, High or Routine, with a due date and a tolerance (V2:6872-6883, 10214-10224) | An urgent yes/no only |

   MOAP has no due date, no tolerance and no count of days carried forward.
5. **Picking up a task is impossible.** MOAP has an "In progress" filter (MOAP:262, `data-f="mine"`),
   but no button moves a task into it. A task offers only Mark done, Reply and Open. Reply and Open are
   toasts (MOAP:421-426, 450-452).
6. **A task arrives that the doctor did not create.** "Route document … from Auto-routing"
   (MOAP:378; `moa-01`) breaks REQ-TK-01: *"no automatic tasks"*. It also contradicts MOAP's own rule
   note (MOAP:258).
7. **"Carried forward to you" labels new work.** The heading is on tasks sent 1–3 hours ago
   (MOAP:242). In Daniel's model, carry forward is the exception for work not done the same day:
   *"if something is not done in a day, you'd better have a good reason"* (SIA:30).

**MOA judgement.** For an urgent, routine or patient-note task, I cannot tell the doctor "picked
up", and I cannot tell urgent from high or when something is due. I also cannot see the doctor's
own list, so I cannot tell which of my tasks he is watching. When an MOA reply goes nowhere, we are
back to *"Can you hear me, Jebney, or am I talking to myself?"* (S2:39-40).

## Flow 2: "Ask Japneet to send" a renewal

**Observed (doctor's side, the patient on the renewal row)**
1. Press "+ Renew prescription" (V2:4713). The card opens with the dose, directions, a quantity of
   180 over 3 months, and the pharmacy on file (`phys-02`).
2. Press "Ask Japneet to send". The label follows `MOA_ON_SERVICE` (V2:10057). It now carries the
   same weight as "Send it myself (fax)" (V2:4703-4704), which matches ANS26:8-13 and D-72.
3. A check step appears: "Goes to Japneet, the MOA on shift, to fax to <pharmacy>, with a copy to
   the patient." Press "Send to Japneet". That is 3 presses in total (V2:10141-10150).
4. This files a task: "Fax renewal: <drug>", type Prescriptions, **priority always Routine**
   (V2:10166-10168). It writes to the note: "Sent to Japneet (MOA) to fax to …" (V2:10170).
5. The status shows "Sent to Japneet · waiting". Then **a 7-second timer** changes it to "Picked up
   by Japneet" (V2:10172-10176, 10201; `phys-03`). No MOA action causes the change.
6. The status stops at "picked up". The doctor's own route goes on to show "Delivered to <pharmacy> …
   patient copy sent" and a "Signed off by Dr. Pannozzo" stamp (V2:10180-10187, 10204). The MOA route
   never reaches "faxed" or "delivered", and it has no sign-off stamp.

**Observed (MOA side).** No renewal task arrives. MOAP has no Prescriptions type, and it cannot fax
anything out: the fax screen is inbound only (MOAP:299-303). It cannot show me the script, and it has
nothing to press to say "faxed" or "delivered". The only renewal item is a static "Confirm pharmacy
for his renewal" (MOAP:380).

**MOA judgement.**
- Daniel's words, *"if I am f\*\*\*ing around, she sends it"* (ANS26:8-9), describe a hand-off that
  finishes when the pharmacy has the script, not when I have opened a task. The doctor needs three
  states from me: picked up, faxed, delivered. His own route already shows him two of them.
- A fixed "Routine" priority means a tolerance of "Within 1 week" (V2:6875). In S1 the patient had
  been out of medication for a week. I cannot tell from the task whether this one is for today.
  That is a question for Daniel, not a rule I would set.
- The doctor's check step before "Send to Japneet" may be exactly his sign-off. If it is, the MOA
  portal must show it to me: "Signed off by Dr. Pannozzo, 9:20 PM · you fax it". If it is not, I
  need to know what I am allowed to change. This is OQ-61, and it blocks the MOA screen.

## Flow 3: fixing a rejected claim

**Observed**
1. The MOA portal has **no billing or claims screen**. The `claims` icon is defined but not used
   (MOAP:349).
2. On V2, the rejected claim is queue row 5. That patient's card is also "Invalid card" (V2:5571-5572).
   - The claim modal says: "MSP refused the claim … Correct the reason given and resubmit". **No
     reason is given**. The only action is "Sign off & resubmit", which moves the claim straight to
     submitted with nothing corrected (V2:5611-5613, 6552-6566; `phys-07`).
   - The card modal's action is "Task the MOA" (V2:6596). It opens the task dialog with **Lab Work
     already selected**, an empty note, and no link to the claim or the rejection (`phys-09`). No
     task type exists for billing or coverage (V2:6858).
3. V2 says private-pay "Payment due" means "The MOA chases the payment" (V2:5620). MOAP has no
   payments either.

**MOA judgement.** I would get a "Lab Work" task with no note and no rejection reason, and I would
have to phone the doctor to ask what it is. When I fix the coverage, *"to submit a bill is to 'sign
off' on your billing"* (ANS26:23) means the resubmit is his action. I cannot task him (REQ-MP-01).
So my fix has to show up as a state on the claim itself, for example "Coverage fixed by Japneet ·
ready for your sign-off", not as a task or a message. What counts as a billing correction, and who
may make it, belongs to Daniel and `billing-msp`.

## Flow 4: a patient calls the office

**Observed**
1. PP tells the patient *"Our office will call you within 24 hours"* and offers "Call the office",
   which is a toast (PP:860-863). The office line is for admin only (REQ-CALL-06).
2. MOAP has only an outbound "Patient callbacks" list with a Call button (MOAP:291-296, 499-508;
   `moa-04`). It has no screen for an incoming call, no patient search, and no patient record: "Open"
   only shows a toast, "Opened patient record" (MOAP:425).
3. For a call back about a reviewed result, the task says "Book a follow-up in the next 48 hours"
   (MOAP:377). That is clear. The critical-result task says "Ask her to come in today and confirm she
   has a ride" (MOAP:374). In a virtual practice, "come in" does not say where.
4. The doctor side already shows how a patient's request reaches him. Priya's chat message says the
   patient "asked to move her follow-up to next week — ok to rebook?" (V2:8289). The doctor then
   files a task himself (V2:6907-6911). That keeps tasks one-way, but it costs him a chat read and a
   task during his window.

**MOA judgement.** When a patient calls, I need to find them, see what the doctor last decided for
them (the plan line or the task), and log the call. If they need the doctor, I need to know whether I
may put them on his list as "Doctor to Callback" (Daniel's status, V2 queue) without creating a
task for him. Today I would work from memory and the phone.

## Flow 5: chatting with the doctor mid-window

**Observed**
1. MOAP "Chatbox" is a toast: "Chatbox opened with Dr. Pannozzo — not a task" (MOAP:270, 453-455).
   It has no thread and no link to a patient. The `chat` icon is missing from `ICONS`, so the button
   renders with no icon.
2. MOAP shows only my own presence (MOAP:222). It does not show whether the doctor is on a call,
   between patients, or late in his window.
3. On the doctor side, the chat is a floating panel with other MOAs' threads (V2:8285-8420; `phys-06`).
   Daniel does not use in-app chat today. He uses Google Meet because *"70% of the time"*
   coordination is complicated (SIA:38).

**MOA judgement.** In a shared chat, the thing I most need is not the message itself. It is knowing
when I can send one without pulling him off a live call. If the doctor's state ("on a call · row 3 ·
2:00–5:00 window") showed in my top bar, I could hold a message until he is between patients. Tying
a chat message to a patient would stop the "which patient?" follow-up. Chat stays second to Meet
until Daniel says otherwise.

---

## Does the MOA portal match what physician v2 sends?

| What V2 sends | Where in V2 | In the MOA portal |
|---|---|---|
| A task to the MOA on service, copied to the primary MOA and Admin | V2:6817-6824, 10214 | No. The data is separate, the signed-in MOA is someone else, and there is no copy or overwatch view |
| Type badge (six types) | V2:6858 | No. It uses a different vocabulary with no Prescriptions type |
| Urgent / High / Routine, due date, tolerance, days carried | V2:6872-6883 | Urgent yes/no only |
| "Picked up by <MOA>" | V2:10172-10176, 10201 | No pick-up action. "In progress" cannot be reached |
| Picked up on the doctor's Tasks screen | `tk.picked` is set (V2:10174) but `taskCard` never draws it (V2:7297-7320) | Not applicable |
| MOA reply on a task | Not shown anywhere in V2 | Reply is a toast |
| "Signed off by Dr. Pannozzo" stamps (chart, script, bill) | V2:10180, 10525; ANS26:17-34 | No sign-off wording anywhere in MOAP (no matches) |
| Renewal hand-off: faxed, delivered | Not on the MOA route | No fax-out, no delivery status |
| Claim rejected: coverage fix | V2:5611, 6596 | No claims or coverage screen |

Red for critical only (MTG21:82): MOAP uses red pills for "Urgent" on a referral reroute, for
"Rejected" and for "Closed" (MOAP:419, 471, 523). That is for `ux-designer` to check against the rule.

---

## Top 3 asks, ranked by impact

1. **One task, both ends, with a real "picked up".** Put the two portals on one task list. Sign the
   MOA portal in as the MOA on service (Japneet), with the doctor's Tasks showing the same list. Give
   each task a Pick up action, so the doctor's "Picked up by Japneet" comes from my press, not a
   7-second timer. Show that state and my replies on his Tasks screen. This ends the *"am I talking to
   myself?"* moment for every task, not only renewals. (REQ-TK-03, REQ-MP-03, OQ-41.)
2. **Finish the renewal hand-off on the MOA side.** A Prescriptions task should open the script
   exactly as the doctor checked it, with his sign-off state shown. It needs one "Fax to pharmacy"
   action, then "Faxed", then "Delivered", fed back to his renewal card, the same as his own route
   (V2:10183-10187). Let him set the priority when he sends it. (REQ-RX-07, REQ-RX-10, OQ-61.)
3. **A billing lane with the reason attached.** Add a Claims and coverage list to the MOA portal
   that shows MSP's rejection reason. "Task the MOA" from a claim or card should arrive as a
   billing task with the claim linked, not as "Lab Work". My fix should return to the doctor as
   "ready for your sign-off" on the claim, not as a task. (UC-16, UC-17, REQ-MP-01.)

## Needs Daniel

- **OQ-61.** When he asks Japneet to send, is pressing "Send to Japneet" his sign-off? What may she
  change? Should the record read "sent by Japneet for Dr. Pannozzo"?
- **OQ-41.** What counts as "picked up": opened, accepted or started? He also needs to confirm that
  "faxed" and "delivered" are what he wants back.
- The priority and time tolerance for a renewal handed to the MOA when the patient has run out.
  No value is assumed here.
- Whether the MOA may put a patient who phoned the office on his list as "Doctor to Callback"
  without a task.
- What the MOA should say on a critical-result callback. "Come in today" has no place attached in a
  virtual practice, and I will not script it.
- Which billing corrections the MOA may make before his "Sign off & resubmit" (with `billing-msp`).

## Needs Ani

- Choose the demo roster: one primary MOA, one buddy, the same names in V2's routing, chat and
  transfer and in the MOA portal's sign-in.
- Decide whether the MOA portal joins the v2 design system now, or only after the shared task data
  above is in place. It is still on the 22 Sep build, with a Jul 23 date (MOAP:232).
- Remove the "Auto-routing" task (MOAP:378), or turn it into a fax-inbox item. It breaks the
  one-way task rule.
- Rename "Carried forward to you" to a heading for new work, and keep carry forward for items older
  than the same day (SIA:30).
- Show the doctor's call state in the MOA portal's top bar so chat can wait for a gap between calls.
