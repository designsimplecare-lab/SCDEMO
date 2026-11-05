# Meeting with Daniel, 4 Nov 2026 (evening): chart Version 2 review — requirements

Source: recorded call (1 h 47 min) and its computer-generated transcript, read end to end. He reviewed the **live demo, build
2026-11-04 21:55**, both chart layouts. Quotes are verbatim (transcript errors corrected only where obvious); profanity, patient
stories and names, personal matters and anything about named people are left out. Business, infrastructure and brand topics are in
`private/daniel-meeting-2026-11-04-confidential.md`.

**Decision:** move forward with **chart Version 2**. Daniel: "I prefer this over the prior … It's clean." (00:50:09) "We can make it even
more compact." Its layout follows UK convention; "the only thing that is a departure is typically the patient summary would be on the
left, not the right."

## 1. Patient header
- **PHN stays visible**: "as I'm talking to the patient, I need to orient myself" (00:07:14). Name, sex, PHN, NKDA all stay.
- **No known drug allergies stays** ("that's useful information"); NKDA as shorthand is acceptable if safe.
- **Pharmacy goes at the top, next to the allergies** (00:20:34–00:23:59): "I want it front and center … I need to know who their
  pharmacist is so I can write them a note." "A good pharmacist is a partner with that patient." Patients change pharmacies often.
  "It's as important as no known drug allergies. It goes at the top." Ani asked whether it could show only when prescribing; he said no.
- Call with its two options: helpful. The Chart button (timeline, results, medications, problems) is the start of the
  **comprehensive care** features he will specify (00:09:57): "a drawer that you open … unobtrusive to the physician but also there and
  flagged."

## 2. Needs attention
- **Only critical (and high) items; red, no yellow** (00:56:03–01:06:51). Pointing at the troponin and the ECG: "these are both
  critical. This isn't just abnormal. This is critical." "This little yellow thing I don't like." Ani: "we should use that red icon."
- **Not "To do"**: asked whether the ECG's severity word should be To do: "No, that's not what I said." (01:04:14)
- **Levels come from LifeLabs, never our own**: "It's LifeLabs that's telling us this … medically legally we're in the clear … We do not
  depart from them whatsoever." "You will upset me if I am looking at things that are critical that I know are not critical." Above
  that: "critical and high", then everything outside the reference range is a yellow flag (not in Needs attention).
- He **did give the list** (LifeLabs critical limits, ECG critical findings, in Notion) and will **reorganise the LifeLabs document**
  into the critical / high wording ("I think there was a little bit of work outstanding").
- **Clicking a result opens it in the chart, never the Inbox** (00:59:32–01:08:02): "I want to see the source document." "Don't port me
  back to the inbox. We stay in the chart always. The inbox gets me to the chart." Agreed: the whole row is clickable and the result
  opens as a **side drawer**; Mark reviewed and Open in Inbox leave the row.
- **Row content**: the finding and value ("troponin 0.42 High") and the concern line ("acute myocardial injury": "keep that … it
  emphasizes the seriousness of this value"). Remove the source/eye icon and the "Also CK … reference 30–200" line from the row.
  **Always show the reference and the received date.**
- Contradiction he spotted: "how come it says also waiting for … cardiac markers? … That's a cardiac marker right there."

## 3. Chart review becomes "Clinical summary"
(01:09:08–01:19:10)
- Name: **"Clinical summary"** (also floated "clinical encounter review"; he may refine).
- Focused on **why the patient is here today**, not the whole history: "if they came to see me for bipolar, I want that chart review to
  be bipolar focused." Example (no identifiers): a patient presenting with nausea who has a psychiatric diagnosis and is on several
  psychiatric medicines; the summary should surface the diagnosis and the medicines that can cause nausea.
- **Sources shown**: "We have to show where the AI is pulling the data from." Sources: booking history, clinical intake, PharmaNet,
  laboratory data.
- **Optional per doctor, on for him**: "right now you're forcing me to use AI … it would be good to make it such that you would click on
  it, activate it." "I'm the type of person that would want it activated all the time." Phase 1: a regular clinical summary.

## 4. Note: one text box
(01:19:10–01:21:27) "I don't like this … what if I want to data dump here? I want one text box … from my perspective I would literally
just want a text box", e.g. to paste a transcript. Ani agreed: one large input field.

## 5. Sign off
(01:21:27) Billing fields before sign-off (code, time, diagnosis): **must have**. The "Before you sign off" flags: fine. The **chart
summary at the end: remove** ("get rid of this … that's going to upset me"). Sign off, Submit claim, Submit later stay; he will propose
the final names.

## 6. Save draft, signing, locking
(00:51:49–00:56:03) Notes should **autosave** (e.g. while the conversation is transcribed): "you wouldn't necessarily then need to save."
There are levels: **saving, signing, and signing and locking**; after sign-off, changes are **addenda**. Doctors often save, return,
alter, then sign. **He will define the terms and check the rules.**

## 7. Patient summary panel (open)
(01:22:32–01:24:41) He wants it **on the left** and **closed by default** ("If Cedar is pumping me full of knowledge … probably not that
often"). Ani: on the left it clashes with the main navigation. He questioned whether Earnings/Claims belong in the nav during a visit
("now is not the time or the place to be claiming anything"). **Unresolved: continue on the next call.**

## 8. Step tabs closer to the work (open)
(01:25:56–01:28:58) He loves the step bar ("I love this"). He wants it **closer to where he is working**, so the mouse travels less
between the content and Review / Note / Action / Sign off: "close the gap … I just want it a little further down with me." Ani: can be
done. Exact behaviour to confirm.

## 9. Home and finding patients
- **"Queue" is the day sheet**: "don't even call it queue … It's just a day sheet." (00:28:07)
- A patient seen earlier is reached through the **Inbox** (a result arrives → open chart → clear → follow up), a **calendar view** of past
  day sheets (not built; he finds calendars slow), or **search** by name, PHN or date of birth. He will research an evidence-based way to
  find a chart quickly; the AI search ("do you remember the case where …") is the backup.
- **Clear and review**: "I clear it, which means I'm looking at the results, and review means I've reviewed with the patient." The
  patient portal should show that results were cleared. Every ordered test is tracked: requisition created → delivered to the patient's
  email → collected → reported → cleared/reviewed ("every test that you order you are medically legally responsible").
- **Practice view** (later): an overview of the whole practice where Cedar finds overdue screenings and drafts outreach (email, text,
  phone) for one-click approval.
- Whole-row click into a chart and dragging the Cedar panel: good. "It looks clean … crisp." A small dot should be a filled blue
  (unspecified). Animated mark: phase 2.

## 10. Phasing
Ani: phase 1 = the current experience, rebranded and more intuitive; phase 2 = agentic AI workflows ("touchless documentation"); a
quarterly roadmap. Daniel agreed. He described the fast-track flow (talk → note transcribed → review → prescriptions populated → done) as
the phase-2 target and will write the clinical workflow documents.

## Daniel's to-dos
Comprehensive care drawer (about a day); the LifeLabs document reorganised into critical / high; terms for save / sign / sign and lock and
addenda; evidence on finding a patient chart; clinical workflow documents; review the prescription modal with Ani (next call); send all
recordings.

## Built after the call (4–5 Nov)
Row → side drawer (1409fb7). The rest of sections 1–5 and 9 is being built in chart Version 2; sections 6–8 wait for the next call.
