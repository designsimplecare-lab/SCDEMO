# Reminder workflow: a specialist report becomes a reply, reminders and drafted orders (T-025)

Owner: `ux-designer` · Ani approves · Built into `simplecare-physician-portal-v2.html` (build 2026-10-15 23:45) and `simplecare-patient-portal-v2.html` (build 2026-10-15 23:45) · Light mode only, 1440 px · Demo with invented data.
Source: Daniel, 15 Oct (`from-daniel/2026-10-15-reminder-workflow.md`): "Can we extract from these reports - and build this workflow into Simple?", "Reminder workflow", "Best is that the AI completes these reqs/tests automatically for the Doc to sign off on". Ani, 15 Oct: "yes"; patient reminders go through the portal AND by email; patients agreed at registration, so there is no new consent screen.
Rules in play: 8 (no health information in email or SMS), 13 (care plan and tasks stay separate), 15 (a recommendation keeps its stated owner), 18 (the doctor always signs), 21 to 24 (design). Related: B-007 (AI Chart Assist, Phase 2), B-003 (document routing).

## One-screen summary

**What it does.** The doctor opens a specialist report from the Inbox (or from the new line in the chart's Pending list). Under the report's one-line summary, **Cedar · What the report recommends** shows what Cedar read: the finding, each recommendation with its timing and owner, and what the patient decided. Every line has a source link that scrolls to and marks the paragraph in the report text. Under that, three things Cedar can prepare. The doctor approves each one; nothing is sent, added or ordered by itself.

| Step | Button | What happens | Who acts |
|---|---|---|---|
| Reply | Draft reply to patient | Cedar drafts a plain-language letter, marked AI-drafted and editable. **Approve & send** sends it as a message in the patient portal. | Doctor presses Approve & send |
| Reminders | Add reminders | Cedar proposes dated care-plan items (two the GP's, one staying with the specialist). The doctor can dismiss any, then adds them. They show in Pending and in the care plan. No MOA task is created. | Doctor confirms |
| Orders | Draft orders | The two repeat tests appear in Action as "Cedar-drafted" with Accept, Edit, Reject. They are ordered only when the doctor signs off. | Doctor accepts, then signs off |

**Pending approval is always visible.** A tag "N waiting for your approval" on the block; a tag "N waiting for you" on the drafted orders; a count on the Action step; a line in Sign off ("1 accepted, ordered when you sign off. 1 not decided yet, not ordered unless you accept"); and signing with an undecided draft asks first.

**Patient side.** After Approve & send, the patient portal shows the doctor's message (new Messages page, a dashboard card, a bell notice) and a **Coming up** card with the dated follow-ups ("Repeat thyroid blood test, about January 2027, your doctor will send the requisition"). A small preview of the notification email uses generic wording only. One line says they get messages by portal and email because they agreed at registration.

**Proof.** Both files pass `node --check` on every inline script (13 and 1). The console was clean in every run. Screenshots are in `product/reports/shots/t025-*.png` (local only).

**Needs Daniel (top):** a real, redacted specialist report; what the letter should say; what the reminder timing means; whether a declined test needs a flag in the chart. See the end.

## What is built

### Doctor side (`simplecare-physician-portal-v2.html`)
1. **Demo report.** One new Inbox item for the demo patient: an endocrine surgery consult. The specialist (Dr. R. Calloway, Alderbrook Endocrine Surgery), the clinic, the finding and the text are all invented. Its text has six paragraphs. It holds three recommendations: repeat blood test (TSH) in about 3 months (owner: GP, due Jan 13, 2027), repeat ultrasound in about 6 months (owner: GP, due Apr 13, 2027), and a surgical review after the ultrasound (owner: the specialist's office, stays with them). One thing the patient decided: she prefers not to have the recommended biopsy now. The existing Aug 26 pending consult and its "Review & assign" flow are untouched.
2. **Cedar · What the report recommends** (review screen). Cedar mark, tinted surface and an "Assistive only" line. Sections: what the report found, Recommendations (timing, owner, source link each), What the patient decided (with a line that it stays visible with the reminders), then the three steps. This block replaces the generic AI summary on this screen, so there is one AI block, not two. Other results are unchanged (the block is hidden on them).
3. **Reply.** The letter is built from the extracted facts, in plain language, with the patient's choice respected and the "repeat imaging cannot fully replace the biopsy" and "you can change your mind at any time" lines from Daniel's example. It is italic on a tinted surface with the label "Cedar · AI-drafted letter · not sent until you approve" until the doctor approves. After Approve & send it becomes clean text signed by Dr. Pannozzo, with the time, and the email preview. Discard draft sends nothing.
4. **Reminders.** "Add reminders" opens the proposed list; Dismiss and Add back work per item; "Add N to the care plan" confirms. The items go into the care plan as dated items (status Awaiting; "Due Jan 13, 2027") owned as the report says (GP: "Ours"; the surgical review: Specialist, with "Chase their office"). They show in the chart's Pending list as "Reminder · …, Due in about 3 months (Jan 13, 2027), from the endocrine surgery report" and in Cedar's key findings Pending fold. A reminder can also be dismissed from the care plan ("Dismiss reminder"). No task is created (task count measured: unchanged).
5. **Drafted orders.** "Draft orders" creates two drafts in Action, above Prescribe, Order and the rest: "Repeat thyroid blood test (TSH)" and "Repeat thyroid ultrasound", each marked "Cedar-drafted", with Accept, Edit (name and due date; marked "edited"), Reject, and Undo. The Action step shows a count badge. At Sign off, accepted drafts become "Ordered at sign-off … Signed by Dr. Pannozzo"; their care-plan reminders move to Ordered. Undecided drafts are never ordered, and signing with one asks first. A draft left undecided after sign-off says "Not ordered".
6. **Pending line for the report.** Until the doctor records the review, the chart's Pending list starts with "New report · Endocrine surgery consult · Cedar has read it: 3 recommendations · Not reviewed", which opens the report.
7. **Source links.** "Source: report, paragraph N" opens the report text if it was hidden, scrolls to the paragraph, marks it and moves focus to it.

### Patient side (`simplecare-patient-portal-v2.html`)
1. **Message.** Approve & send writes one record that the patient portal reads (demo only; see below). The portal shows a "Messages" nav item with an unread count, a dashboard card "You have a new message from Dr. Pannozzo · Read message", a bell notice and count, and the letter in a new Messages page. Opening it marks it read (the counts drop).
2. **Coming up.** A dashboard card lists each follow-up: the test, the month, and who moves next ("Your doctor will send the requisition"; "Dr. Calloway's office will contact you to book it"). If the doctor dismisses a reminder after sending, the patient's list updates on its own.
3. **Email preview.** On the Messages page: subject "You have a new message from your doctor's office" and body "You have a new message from your doctor's office. Sign in to read it." No health information, no name, no address. The doctor's side shows the same preview after sending.
4. **Consent.** One line, on the dashboard card and the Messages page: they get messages by portal and email because they agreed when they registered. No consent form.
5. Patient text is 16 px, sentence case, no red. A walkthrough button, "Show the doctor's reply", previews all of this without the doctor's portal.

### Demo wiring (not production)
The doctor's portal writes a record to the browser's `localStorage` (`sc-demo-reminder-v1`); the patient portal reads it on load and when it changes. It works when both pages are on the same origin (a local server or the deployed site). In production this is the message service, with an email sent by the service.

## Proof (headless Chrome, light, 1440 px)
- Review screen: block renders; the source link marks paragraph 2 and focuses it; draft letter, edit and send; payload written with the dated items; Add reminders → Dismiss → Add back → confirm: three plan items (GP, GP, Specialist), tasks unchanged at 8; Draft orders: two drafts, Action badge "2", Accept, Edit (due date changed), Reject, Undo; Sign off with one undecided draft shows the warning; Sign off anyway: both accepted orders became "ordered", reminders moved to Ordered, toast "Signed off · 2 Cedar-drafted orders ordered under your signature".
- Patient portal in a second page on the same server: card, nav badge, bell count (3 to 4), Messages page, counts back down after reading, a later dismissal updated the Coming up list live.
- Regression: Home, Inbox, Claims, Earnings, Tasks, the MOA chat, all eight charts, and every other Inbox result open with a clean console; the block is hidden on other results.
- Measures in the block: text 14 px or larger; buttons 44 px; tags 15 px/500, 40 px, no stroke; no uppercase; reading text capped at 66 ch. Patient text 16 px.
- Screenshots: `t025-a1-block`, `a3-reply-draft`, `a4-reply-sent`, `a5-reminders-proposed`, `b0-chart-pending-new-report`, `b1-action-drafts`, `b2-action-edit`, `b3-signoff-line`, `b4-signoff-warn`, `c1-careplan`, `c3-ordered`, `p1-dashboard`, `p2-notifications`, `p3-messages`, `r1-inbox`, `r2-home`, `r3-claims`, `r4-moa-chat`.

## What is not built
- Real extraction from a real report (the demo report is a hand-written, structured item), real sending, real email, and any real data.
- Reminders on Home when due and in Needs attention when overdue (Daniel's proposal). Reminders show in Pending and the care plan only.
- The sent letter is not yet filed in the chart's Messages or Documents sections.
- Drafted orders do not become real requisitions in "Lab orders". They are tracked in Action and in the care plan.
- SMS reminders. Email and portal only, as Ani decided.
- Regenerate for the letter (B-007 §3); a Cedar audit view; clearing AI markers on sign-off beyond what is described.
- The doctor's review decision on the report stays a separate step; sending, adding or ordering does not record it for the doctor.
- Dark mode, the Figma library, and the legacy `?chart=current` layout (it does not show the new Pending lines).
- The two portals use different demo patients (Gloria on the doctor side, "Ani" on the patient dashboard); the letter greets Gloria.

## Needs Daniel
1. A redacted copy of a real specialist report, or a description of a typical one, to replace the invented text (his 15 Oct request).
2. The letter: wording, tone, and what it must always say. The demo letter follows his example (finding, recommendation, the patient's choice, alternative, "can't fully replace", "revisit at any time").
3. Reminder timing: does "about 3 months" count from the report date or the visit? Should the due date be exact or a window?
4. Should a patient's declined test be a visible flag in the chart (beyond the reminder detail and the block's line)? Needs `clinical-safety` too.
5. Who owns a recommendation that names no one (rule 15 default)? The demo only uses explicit wording.
6. Do repeat orders get signed in the same visit, or at any time the doctor opens the report? The demo signs them at that visit's Sign off, as the brief says.

## Needs Ani
1. Pick one demo patient for both portals (the letter says "Hello Gloria"; the patient dashboard says "Ani").
2. The email preview appears to the patient on the Messages page. Keep it there, or only on the doctor's side?
3. The Cedar block sits between the result summary and the source document, and replaces the generic AI summary on this screen. OK?
4. Drafted orders sit above Prescribe, Order and Refer in Action. OK, or below?
5. The cross-portal wire is a demo (`localStorage`). Fine for the deploy, or show the patient side only from the walkthrough button?
6. The Inbox row for the report sits in Routine (no tier). Should a consult with recommendations rank higher?

## Needs gates before it ships
`clinical-safety` (AI-drafted orders and a patient letter, rule 20), `privacy-security` (the email wording, rule 8, and the consent claim: "agreed at registration" is Ani's statement, not yet checked against the registration text; CASL), `accessibility`, `qa-engineer`, and a check with the `doctor` agent (the brief asks for it before Ani's review). The `doctor` agent has not seen this build.
