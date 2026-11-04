# Coverage check: Daniel's 31 Oct 2026 review call, line by line

Prepared 3 Nov 2026 by `product-manager` for Ani. Statuses of items 2, 20, 28, 30, 31, 35, 36, 62, 72, 92, 94 and 150 updated 4 Nov by `ux-designer` after T-039 and T-040.

**What was compared**
- The full transcript (about 3 h 15 min, 1463 lines), read end to end. Daniel was reviewing the live demo,
  build 2026-10-26 20:42 (commit `9974f15`).
- What we recorded: `from-daniel/2026-10-31-meeting-review-of-prescribing-orders-chart.md` (called "the
  requirements file" below).
- What we built since: T-032 to T-038 on the board, the "31 Oct changes", "2 Nov" and "3 Nov" sections of
  the three specs, commit `2726175` (Ordered and pending only in the left summary) and `dd1b20f` (compact
  Action tiles).
- The current demo (build 2026-11-03 21:32), checked by grep, plus one read-only headless measurement of
  where the note starts (see item 150).

Patient stories, names, colleagues, insults and business or regulatory remarks are left out. Business and
regulatory points go only to the git-ignored private notes. Quotes are verbatim, with profanity and filler
removed ("…"). Garbled words are fixed in [brackets].

## One-screen summary
1. **The note is not up front.** At 02:56 Daniel removed the repeated sections and said "There's my note.
   Boom." Today, on a 1440 × 900 screen, the note starts 849 to 1890 px down on all eight demo charts. On
   the main demo patient it starts at 1890 px, which is two screens down. Our requirements file kept "no
   repetition" and missed this point. **Severity: high.**
2. **The flag for "another doctor prescribes my drug" is missing** (00:41). When a different prescriber
   fills a drug that Simple Care prescribes, that is a discrepancy to him ("drug seeking"). Today only a dose
   difference is flagged. **High (clinical-safety).**
3. **Three items may contradict what we built.** "Ask the pharmacy to verify" (01:51) is still there and
   files an MOA task. The visit summary uses bold, but at 02:49 he said "I wouldn't even say we need anything
   bold". The prescribing list has three group headings, but at 00:27 and 01:29 he said there is no need for
   separate dividing lines. **Medium.**
4. **Two things are built differently from what he asked.** After Sign and fax, he wants the next form to
   open by itself (01:56); we show a card with a button. Confirming and renewing in one press (00:48) takes
   two presses today. **Medium.**
5. **Seven items are waiting on material from Daniel:** his top-line preview, his rework of "Patient only",
   his lab panels, the imaging exam list, his critical-result criteria, a session on the chart-review
   "gestalt", and his continuity items.

**Counts (170 items):** Built 121 · Partly built 20 · Not built 9 · Not ours 9 · Waiting on Daniel 11.

**What each person needs to do**
- **Ani:** decide on the to-do list at the end. Item 1 is the note.
- **Daniel (through Ani):** answer the "Ambiguous" section.
- **clinical-safety:** review items 28 and 30 before they are built.

---

## 1. Every request, in transcript order

Status key: **Built** / **Partly built** / **Not built** / **Not ours** (backend, business or later
tooling) / **Waiting on Daniel**. Confidence is about what he meant, not about the status.

### Prescribing: the medication list (00:01 to 01:51)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 1 | 00:01:40 | "a reiteration of any drug allergies that they would have and that would be at the top" (again at 01:07:08: "you constantly need to remind yourself") | Allergies repeated at the top of prescribing, even though they are on the chart. | certain | **Built.** `rxStrip` (allergy and kidney strip), T-032. |
| 2 | 00:04:09 | "it can be helpful to know why someone's on the drug … more of like more of a headliner" | Show why the patient takes each drug, as a headline, without crowding. He was trying a version himself. | likely | **Built 4 Nov (T-040).** The indication is on the drug name line ("Metformin · Type 2 diabetes"), 500 weight, ink-soft (`rxRecRow2`, `.rp-ind`). His own mock-up may still change it. |
| 3 | 00:04:09 | "so this here we wouldn't need this this or this" | Remove three things on screen. Most likely the old groups (Active, Possibly lapsed, Long-interval, Recent short courses). | unclear | **Built, if that reading is right.** The old `RX_GROUPS` are gone (commit `8cb6d01`). See A-5. |
| 4 | 00:04:09 | "medications that are active and where the patient's going to run out" | Organize the list by what the patient needs and when they run out. | certain | **Built.** `rxRecModel`, sorted by `bySupply`. |
| 5 | 00:05:34 | "those are the ones that would always come first because you know that's quick medicine" (00:07:23: "No patient comes to simple to … reconcile the meds") | Drugs due for renewal always come first. | certain | **Built.** The Due group is first; `RX_DUE = 7`. |
| 6 | 00:05:34 | "it would just be kind of like a soft flag which is to say just so you know we don't have a record of this" | A drug with no Simple Care record gets a soft, neutral flag. | certain | **Built.** "No Simple Care record" (`rxRecRow2`). |
| 7 | 00:05:34 | "a system where you are flagging it for review … in a way that … doesn't like divert your attention" | For a family-practice patient, a new unknown drug is flagged for review, still without alarm. For a walk-in it is expected. | likely | **Partly built.** One soft line for every patient; there is no walk-in or family difference. He was unsure himself: "I don't know if there's has to be a different system". |
| 8 | 00:07:23 | "it should be neutral which is to say whether you're doing … walk-in medicine comprehensive care medicine neurology psychiatry" | Neutral design that does not bias any kind of practice. | certain | **Built.** There are no practice-specific rules in `rxRecModel`. |
| 9 | 00:08:23 | "my brain can … process the information faster … think a white background" | Use style and colour so the eye reads the list faster, on a white background. | likely | **Partly built.** Light theme with white cards. The visual pass to the SC Design System comes later (rule E). |
| 10 | 00:09:54 | "why would I need a side by side? Just show me the list" | For a new patient, show only the PharmaNet list, with no comparison. | certain | **Built.** The PharmaNet-only table (`pnOnly` in `rxRecRow2`), shown for the new demo patient. |
| 11 | 00:09:54 | "verify that list with the patient and then add it to the prescription pad and then prescribe it" | Check each drug with the patient, then put it on the pad. | certain | **Built.** Confirm and Continue on PharmaNet rows (`RX_ACT.conf`, `RX_ACT.cont`). |
| 12 | 00:11:34 | "then that becomes the simple list and then on any future occasion then I'm looking back at what I did" | Once reconciled, the list becomes Simple Care's list. Next time, the doctor compares against his own work. | certain | **Built.** "New medication list" and "Sign off the medication list" (`rxNewListHtml`). |
| 13 | 00:13:53 | "Still a side by side is helpful because you're comparing to the prior" | Keep the side-by-side view for returning patients. | certain | **Built.** The Simple Care and PharmaNet columns. |
| 14 | 00:15:10 | "I would zero in on that in three seconds … It should be flagged. It should be highlighted like it is there." | Keep the dose difference highlighted as it is. | certain | **Built.** The `diff` row with `<mark>` on both doses. |
| 15 | 00:16:27 | "the drugs that are due, which is why the patient is phoning you, are the ones that ought to be dealt with" | Due drugs come before differences. | certain | **Built.** Group order: due, then diff, then simple. |
| 16 | 00:23:49 | "the ones that have lapsed that are in our system. Those are the ones that we would address first" | Simple Care's own lapsed drugs come first; drugs from elsewhere go below, under PharmaNet. | certain | **Built.** The Simple Care part is sorted before the PharmaNet part (`rxRecModel`). |
| 17 | 00:23:49 | "that's a nice dividing line … what's on top is what Simple has done and then below that is what [PharmaNet] has done" | One dividing line between Simple Care's drugs and PharmaNet's. | certain | **Built.** A line, then "PharmaNet: not prescribed at Simple". |
| 18 | 00:24:58 | "don't forget the [stuff] at the bottom because that matters too" (00:34:35: "I don't want to bury that information too deep") | Keep the PharmaNet section visible. | certain | **Built.** The section is open, not collapsed. |
| 19 | 00:24:58 | "I do like the [PharmaNet] dispense history … pure chronological simplicity … a safe fallback" | Keep the raw, chronological dispense history. | certain | **Built.** "PharmaNet dispense history". |
| 20 | 00:27:23 | "But you don't need to … have a separate dividing line." (Ani: "It's just the order." He: "Correct.") | Due and not-yet-due Simple Care drugs are one ordered list, without separate sections. | likely | **Not built, by decision (Ani, 3 Nov: keep the group names).** The order is right; the three group names stay. Recorded as a question for Daniel in the prescribing spec, "3 Nov: 31 Oct re-read gaps". |
| 21 | 00:27:23 | "the second urgency would be … the medications that we have prescribed right on simple that are [un]reconciled" | Second come Simple Care's drugs that differ from PharmaNet. | certain | **Built.** The `diff` group. |
| 22 | 00:28:52 | "there's 46 tablets left so they don't need it but that is still very important information" | Show a difference even when no refill is needed. | certain | **Built.** |
| 23 | 00:30:05 | "it would be in order of like how many tablets that are left" (00:31:09: if both are out, "maybe alphabetized") | Sort due drugs by supply left, with ties alphabetical. | certain | **Built.** `bySupply`. |
| 24 | 00:31:09 | "I don't need to prescribe it, but I'm reconciling it … It doesn't go into the prescription pad." | Confirming a difference updates the medication list, not the pad. | certain | **Built.** `RX_ACT.conf`. |
| 25 | 00:32:07 | "I would separate that out from an organizational standpoint" | PharmaNet drugs sit in their own part ("Not in Simple" or "as per PharmaNet"). | certain | **Built.** "PharmaNet: not prescribed at Simple". |
| 26 | 00:33:28 | "it also tells you who they saw … you could pull out the doctor's name" | Show the prescriber, and so the specialist, on each PharmaNet fill. | certain | **Built.** `rxWho` on rows; the dispense history shows who. |
| 27 | 00:36:00 | "what if you just … had a list of dangerous drugs that could No, don't do that." | **Don't** reorder PharmaNet by a list of "dangerous drugs". Keep it time-based. | certain | **Built.** PharmaNet is sorted due first, then by date (`pnOrder`). |
| 28 | 00:41:04 | "somebody else has prescribed this drug not me that's drug seeking or there's a dose discrepancy" | When another prescriber fills a drug that Simple Care prescribes, flag it as a discrepancy, not only dose changes. | certain | **Built 4 Nov (T-040).** A fill from another prescriber of a Simple Care drug is kind `other` in `rxRecModel`: placed with the differences, highlighted, "Also filled from Dr. [name], [specialty or not a Simple Care doctor] · [date]". Demo: Greg's atorvastatin. Which drugs and window: Daniel; gate `clinical-safety`. |
| 29 | 00:42:28 | "I want them to … take a look … I want to sort of kind of like nudge them" | Nudge doctors to read the PharmaNet list; don't let them skip it. | certain | **Partly built.** A "Cedar flagged" note and an open list; no other nudge. |
| 30 | 00:43:41 | "the AI is going to be able to see the whole list … as per [PharmaNet] this person's already taking this drug" | When prescribing, Cedar checks the new drug against everything on PharmaNet and says so, naming PharmaNet. | certain | **Built 4 Nov (T-040).** `rxSafety` checks each drug newly added to the pad against PharmaNet fills and says "As per PharmaNet, already taking …" or "As per PharmaNet, filled … (finished)." Finished fills are checked. |
| 31 | 00:45:00 | "look at every drug over the last 18 months and … even the PRNs would need to be flagged" | The check covers about 18 months, including as-needed drugs. | certain | **Built 4 Nov (T-040), window waits on Daniel.** `RX_PN_MONTHS = 18`, covering current, finished and as-needed fills. Demo: Greg's finished azithromycin and PRN acetaminophen. |
| 32 | 00:46:02 | "there's the prescription pad. I think it looks pretty good too." | Keep the pad. | certain | **Built.** |
| 33 | 00:47:09 | "when the medications that are due, you can press the represcribe button. Boom … it autopopulates your prescription pad" | One press puts a due drug on the pad. | certain | **Built.** Continue (`RX_ACT.cont`). |
| 34 | 00:47:09 | "if you want to make a quick adjustment, you would do it in the moment" | Adjust the dose from the list. | certain | **Built.** Adjust dose (`RX_ACT.adj`). |
| 35 | 00:47:09 | "our AI is picking up … from the cardiology report … that this is appropriate … then you would just press reconcile" | On a dose difference, Cedar says why, citing the consult letter. | likely | **Built 4 Nov (T-040).** Under Gloria's amlodipine difference: "Cedar: the cardiology letter of Jul 28 increased amlodipine to 10 mg.", with "Source: Consults, Jul 28" opening the letter's sentence in place. Hidden with Cedar off for prescribing. |
| 36 | 00:48:56 | "sometimes you need to reconcile and sometimes you need to prescribe and sometimes you got to do both" | One action that confirms and renews together. | certain | **Built 4 Nov (T-040).** A difference that is also due gets one primary "Confirm [dose] and continue" (`RX_ACT.confcont`). Demo: Greg's metoprolol. |
| 37 | 00:48:56 | "as per your note … you're talking about amoxicillin 500 milligrams twice daily dosing for 10 days" | Cedar drafts prescriptions from the note. | certain | **Built.** "As per your note" (`rxPadSync`). |
| 38 | 00:49:55 | "they can ignore the AI or they can add from the AI or they can … modify from the AI" | Add, Change or Ignore each Cedar draft. | certain | **Built.** `RX_ACT.accept`, `RX_ACT.chgai`. |
| 39 | 00:49:55 | "some very subtle way as to where the source of the information is coming from" | Show each AI item's source, subtly. | certain | **Built.** "Cedar draft" with its source. |
| 40 | 00:54:21 | "this would draw off a drug data bank" | Drug search uses a real drug reference. | certain | **Partly built.** A demo list modelled on Health Canada's Drug Product Database. The real feed is backend work. |
| 41 | 00:54:21 | "You should have you should still have both" | Keep both the reference search and free text. | certain | **Built.** "Add "…" as written". |
| 42 | 00:55:36 | "Can it spell check me? … I think you meant to say this." | Spelling help. | certain | **Built.** "Did you mean". |
| 43 | 00:56:50 | "it wouldn't be an error. It would be a warning or a notice … very pleasant un[in]trusive notification" | A drug with no DIN gets a soft notice, never an error. | certain | **Built.** "Not in Health Canada's drug list". |
| 44 | 00:58:12 | "that doctor might type in their own list that the AI can draw off of" | A per-doctor drug list, including their own formulations, that Cedar can use (later). | certain | **Partly built.** The pad has Favourites; there is no doctor-made list of custom drugs. |
| 45 | 01:03:13 | "there's the uploaded file. Okay, that's cool." | Keep Uploaded file. | certain | **Built.** |
| 46 | 01:03:13 | "What if I screen and … control V it?" | Paste a screenshot with Ctrl or Cmd+V. | certain | **Built.** The `paste` event and `rxReadImage`. |
| 47 | 01:04:42 | "there's only one person I could reconcile to and that would be with the patient" | Out-of-province patients are reconciled with the patient only. | certain | **Built.** "Patient only" source ("Ask the patient"). |
| 48 | 01:04:42 | "I would agree that I don't want to clutter the UI/UX" | Keep the panel uncluttered. | certain | **Partly built.** An ongoing aim, not a single change. |
| 49 | 01:04:42 | "[PharmaNet] live … Patient only. That's pretty good … Uploaded file … I don't see a major concern here" | Keep the three sources. | certain | **Built.** |
| 50 | 01:05:53 | "don't worry about the patient only. Let me work on that. I'll present something to you" | He will rework "Patient only" (from intake, e.g. "water pill" read as a diuretic). | certain | **Waiting on Daniel.** |
| 51 | 01:05:53 | "at the top here what would be the most helpful kidney function" | Kidney function at the top. | certain | **Built.** `rxStrip`. |
| 52 | 01:07:08 | "kidney function is very important and it's so important that we should make a … hotkey" (01:16:32: "a button to quick order it") | A quick order for kidney function when it is missing or old. | certain | **Built.** "Order kidney function". How old counts as "out of date" waits on Daniel. |
| 53 | 01:13:30 | "I'm going to send you what I'm thinking in terms of … at the top" (01:16:32: "I'll just dump this in your [chat] … quick preview") | He sends his own mock-up of the prescribing top line. | certain | **Waiting on Daniel.** It is not in `from-daniel/`. Ani: confirm whether it arrived. |
| 54 | 01:14:57 | "I don't think that's clinically relevant and I don't like it … the medications next to today's concern. No" | **Don't** show medications beside today's concern in prescribing. | certain | **Built.** The strip shows only a "Today" line. See A-9 for Chart review. |
| 55 | 01:16:32 | "how do you efficiently toggle towards the … lab section?" | A fast way from prescribing to labs. | likely | **Built.** Order kidney function opens the lab form; "Next, as per your note". |
| 56 | 01:16:32 | "kidney function should be up there. Allergy should be up there. And that would be about it." | Nothing else in the top line. | certain | **Built.** Allergies, kidney, and the short "Today" he allowed at 01:51. |
| 57 | 01:17:43 | "I should be able to push this button and it reconciles" | One press confirms a dose difference. | certain | **Built.** Confirm. |
| 58 | 01:19:12 | "it would be also very good to know that … someone else was not a simple care doctor" | A confirmed outside drug joins the list, marked with its prescriber as not a Simple Care doctor. | certain | **Built.** "not a Simple Care doctor". |
| 59 | 01:20:56 | "they would want the same for their office … they would want to know if it was someone in their group" | "Our doctors" means the user's own clinic or group, for other clinics on the platform. | likely | **Not built.** The demo hard-codes Simple Care. This is a later item. |
| 60 | 01:20:56 | "I don't have to say how it was reconciled. I just know it is reconciled." | Show that a drug is reconciled; how it was done is optional. | certain | **Built.** The confirmed state is shown. |
| 61 | 01:21:59 | "this actually would be number one because the patient needs this … I wouldn't want to have to scroll down" | The due drug sits at the very top, with no scrolling. | certain | **Built.** |
| 62 | 01:22:51 | "you take this little thing here … You shrink it into a little prescription and … it goes into your prescription pad" | Animate the row moving onto the pad ("it's satisfying"). | certain | **Built 4 Nov (T-040).** On Continue, the drug name flies to its pad line in 350 ms (`rxFly`); not under prefers-reduced-motion. |
| 63 | 01:22:51 | "reconcile means to reconcile it against the source of truth" (01:23:57: the source of truth is PharmaNet) | Reconcile is not re-prescribe. PharmaNet is the source of truth. | certain | **Built.** The wording was separated (T-032). |
| 64 | 01:25:23 | "Or from the med list … or from the medical reconciliation list" and "That would be your new active tab" | The pad fills from new drugs or the list, and what is prescribed becomes the new list. | certain | **Built.** The pad, and "New medication list". |
| 65 | 01:28:07 | Ani: "Expand. Is that a button you think should be here?" He: "yes and I'll tell you why" | Keep an "Expand" control (which one is unknown). | unclear | **Waiting on Daniel** (Ani first). No "Expand" label in the 26 Oct prescribing code. See A-6. |
| 66 | 01:28:07 | "you would just call it due for renewal and you could say how many days it's overdue" | The label is "Due for renewal", not "lapsed", with days overdue. | certain | **Built.** "days overdue" (`rxSupply`). |
| 67 | 01:29:32 | "you wouldn't even need to call it active. You would the system is going to organize that for the doctor" | No "Active" label; the system orders the list. | certain | **Built.** No "Active" heading. Also see item 20. |
| 68 | 01:30:51 | "we could make it just like seven days left because usually patients get nervous when they only have a week's worth" | Due means about 7 days of supply or less (pharmacies use 14). | certain | **Built.** `RX_DUE = 7`. |
| 69 | 01:32:00 | "you would literally tell me 25 days overdue, 50 days overdue … Based on the prescribing frequency" (01:33:10: "boom 26 days overdue") | Show the computed days overdue, not "none left since [date]". | certain | **Built.** `rxSupply`. |
| 70 | 01:34:24 | "I wouldn't even use the word reconciliation. … Just continue and prescribe." | The main action is Continue, not "reconcile". | certain | **Built.** The word is on no action. |
| 71 | 01:34:24 | "this is a process not a photograph" | Show the flow from the current list, to the prescription, to the new list. | certain | **Built.** "New medication list". |
| 72 | 01:35:29 | "We'll use that word process each drug" | Use the word "process" for working through each drug. | likely | **Not built, by decision (Ani, 3 Nov: no explaining text).** No "Process each drug" hint line; "reconciliation" is still not on any action. |
| 73 | 01:35:29 | "if somebody were to go back in there, they would see the new … medication reconciliation list" | The next viewer sees the updated list. | certain | **Built** in the demo (the signed-off list). Saving it across visits is backend work. |
| 74 | 01:36:57 | "everything else that could be due for renewal but is not ours goes under the [PharmaNet] list" | Don't mix PharmaNet's due drugs with Simple Care's. | certain | **Built.** |
| 75 | 01:39:36 | "being able to dose adjust right there and then would be good or just continue as prescribed … or stop" | Three actions: Adjust dose, Continue, Stop. | certain | **Built.** |
| 76 | 01:40:50 | "Should this list change? Probably not. … The button is highlighted and then appears over here as well" | The row stays where it is, the button stays pressed, and the drug also appears on the pad, where it can be removed. | certain | **Built.** This settles his 01:19 and 01:21 "disappear?" question. |
| 77 | 01:42:19 | "this should be close[d] … if you want to inspect" (01:50:17: "purely chronological is collapsible") | The raw dispense history is collapsed. | certain | **Built.** |
| 78 | 01:43:29 | "We can say AI review or AI not suggests but AI AI flagged" | Label it "flagged", not "suggests". | certain | **Built.** "Cedar flagged". |
| 79 | 01:43:29 | "it could have like a nice little summary like … just so you're aware, just putting this out here" | A short Cedar note on the PharmaNet list (e.g. one drug from many prescribers). | certain | **Built.** `rxCedarFlag` uses a demo rule. What to flag waits on Daniel. |
| 80 | 01:44:47 | "although we call ours Cedar" | The AI is called Cedar. | certain | **Built.** |
| 81 | 01:45:55 | "we can reorganize the [PharmaNet] list based on two criteria. which is due for renewal and chronology" | PharmaNet is ordered due first, then by date, with the same buttons as ours. | certain | **Built.** `pnOrder`. |
| 82 | 01:47:53 | "we don't have to bury [PharmaNet]. We would have it open … The buttons are the same" | For a new patient, PharmaNet is open, with the same buttons. | certain | **Built.** |
| 83 | 01:50:17 | "we can always experiment with the font and make it pretty" | Visual polish later. | certain | **Not built** (later, with the design-system move). |

### Prescribing: the pad, signing and the MOA (01:51 to 01:57)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 84 | 01:51:26 | "Today we can have a little summary up there just to quickly remind the doctor" | A short "Today" line in the top strip. | certain | **Built.** `rxStrip`. |
| 85 | 01:51:26 | "So, I mean, this is gone. This is gone. This is gone." | Either remove three things, or he is noting they are gone. | unclear | **Waiting on Daniel.** See A-1. |
| 86 | 01:51:26 | "Ask the pharmacy to verify. What does that do?" | He questioned this link. After hearing about the MOA, he said the MOA should not handle drug data. | unclear | **Waiting on Daniel.** It is still a secondary link that files an MOA task (spec, T-032: "kept"). See A-2. |
| 87 | 01:51:26 | "right here should be fax fax this to or send to pharmacy" | Sending to the pharmacy should be clear where he looks. He did not find the button at the bottom right. | likely | **Partly built.** "Sign and fax" is in the pad bar (`rxBarPad`). Its placement was not reviewed. |
| 88 | 01:52:26 | "I can't really think of a use case where I would have this prescription directed to my MOA" | **No** MOA route for prescriptions. | certain | **Built.** "Sign, <MOA> sends" was removed. |
| 89 | 01:52:26 | "forget about the MOA being able to see any of the patient data or drugs or doses or anything" | The MOA does not see the drug data. | certain (words) / unclear (scope) | **Partly built.** Removed from the pad; the MOA portal shows no doses (grep "mg": 0). "Ask the pharmacy to verify" still sends the MOA a task. See A-10. |
| 90 | 01:52:26 | "if it fails … then my MOAs can mop that up" | The MOA handles only a failed fax. | certain | **Built.** "If the fax fails, <MOA> resends it." |
| 91 | 01:53:50 | "Sign and fax is good." | Keep Sign and fax. | certain | **Built.** |
| 92 | 01:53:50 | "the first place that I start is the note, right?" | The visit starts in the note, and Cedar learns from it. | certain | **Built 4 Nov (T-039).** The note heading is visible without scrolling on every demo chart (see item 150). Cedar still drafts from the note. |
| 93 | 01:55:14 | "Exactly. And that's exactly what we should do." (Ani: after the call, Cedar has filled in the prescriptions and every form) | After the call, Cedar has drafted everything; the doctor reviews and signs. | certain | **Partly built.** A simulated call (`SC_TURNS`) drafts the note, and the pad drafts from it. Lab, imaging and referral drafts come from chart data, not from that call. |
| 94 | 01:56:33 | "if I go sign and fax this opens up right automatically. Why? Because the AI is anticipating my next move." | After Sign and fax, the next form opens by itself. | certain | **Built 4 Nov (T-040).** After Sign and fax, the first form the note calls for opens by itself over the panel, with a toast ("Lab requisition opened, as per your note."); not with Cedar off for prescribing, and not when the note says nothing. |
| 95 | 01:56:33 | "only if the AI in my note picks up that I want to order" | Only when the note says so; imaging works the same way (01:57:41). | certain | **Built.** `rxNextForms`. |

### Lab requisition (01:57 to 02:08)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 96 | 01:57:41 | "these things to automatically drop down based on my note and based on the likely diagnosis" | Suggested tests come from the note and the likely diagnosis. | certain | **Built.** Suggested for today, with Why. |
| 97 | 01:59:15 | "Can I add something here?" | Add and remove tests in place. | certain | **Built.** |
| 98 | 01:59:15 | "can we put this horizontal?" | Lay this out horizontally (most likely the suggested tests). | likely | **Built.** One horizontal row of chips (T-033). See A-12. |
| 99 | 01:59:15 | "we have our panels. I'll have those." | Use his own panels. | certain | **Waiting on Daniel.** |
| 100 | 01:59:15 | "Cedar could even recommend a panel, right?" | Cedar suggests a panel. | certain | **Built.** The suggested panel. |
| 101 | 02:00:42 | "you add a test up here. So, like that's pretty cool. I like that." | Keep "add a test" at the top. | certain | **Built.** |
| 102 | 02:02:20 | "have those certain sections open for the doctor to adjust as they see fit" | Sections the doctor will likely use start open; the rest start closed. | certain | **Built.** `lrSecLikely`, `lrSecOpen`. |
| 103 | 02:03:25 | "from provider location we'll know everybody there [to] copy automatically" | Fill "Copy to" from the provider's location. | likely | **Partly built.** Filled from the chart's specialist. What "provider location" means waits on Daniel. |
| 104 | 02:04:30 | "Current medications. That's tricky because no one fills that out." | Don't pre-fill current medications. | certain | **Built.** |
| 105 | 02:05:54 | "we'll put the diagnosis at the very top and the doctor can decide to fill it out or not" | The diagnosis sits at the top and is not pre-filled. | certain | **Built.** "Use today's concern" on tap. |
| 106 | 02:07:16 | "All this information would be at the top as an overview nicely formatted not necessarily prepopulated." | The bottom fields move to a compact overview at the top. | certain | **Built.** `lrOverviewHtml`. |
| 107 | 02:07:16 | "Instructions to patient can be prepopulated" | Cedar pre-fills the instructions (e.g. fasting). | certain | **Built.** `lrInstrDraft`. |
| 108 | 02:07:16 | "medications and diagnosis would be collapsible … Copy to … That's collapsible too." (02:08:21: "Standing orders that's collapsible.") | Those rows are collapsible. | certain | **Built.** |
| 109 | 02:08:21 | "Date and frequency is part of this. This is all one thing." | Standing orders and their dates and frequency sit together. | certain | **Built.** One Standing orders row. |

### Imaging requisition (02:08 to 02:20)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 110 | 02:08:21 | "this is a bit too long" | A shorter imaging form. | certain | **Built.** One column, with folds (T-034). |
| 111 | 02:09:25 | "the clinical question is amalgamated with a pertinent history/medications. There's just that's just one thing" | The clinical question and the history are one field, as on the form. | certain | **Built.** `imCq`. |
| 112 | 02:11:36 | "This can this can … referrals … because that is laborious process. Imaging. Yeah, I send imaging" | Keep the MOA route for imaging and referrals (CT and MRI checklists). | certain | **Built.** Both buttons stay. |
| 113 | 02:15:16 | "less than 20 words here" | The clinical question is under about 20 words. | certain | **Built.** Word count and a soft hint (`imWcHtml`). |
| 114 | 02:16:30 | "just a oneliner heavily synthesized … the clinical question would be there" | A one-line synthesis that includes the question. | certain | **Built.** |
| 115 | 02:18:36 | "a very very very high level summary … That's all you would send." ("copy to is fine") | Send only the high-level line; keep Copy to. | certain | **Built.** |
| 116 | 02:19:51 | "Routine, urgent, stat, and then exam modality is excellent, too." | Keep priority and modality. | certain | **Built.** |
| 117 | 02:19:51 | "Hey, we have more than these things" | More modalities than shown. | likely | **Built.** The form's modalities (T-034 addendum). |
| 118 | 02:19:51 | "That's perfect. That's excellent." (exam quick picks) | Keep exam suggestions; he supplies the real list. | certain | **Waiting on Daniel.** The exam list. |
| 119 | 02:20:42 | "Don't overthink it. The ministry has done the heavy lifting for us." | Keep the Ministry form; don't redesign the requisition. | certain | **Built.** |

### Referral (02:20 to 02:34)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 120 | 02:20:42 | "Can we make this a little bit more spacious?" | More room in the referral. | certain | **Built.** Full width (T-035). |
| 121 | 02:21:55 | "It would be [in] proximity to the patient and … who is taking patients and who is not" | Cedar suggests (does not auto-fill) the specialist, by distance and by who is taking patients. | certain | **Built.** `rfRank`, with a demo list. |
| 122 | 02:21:55 | "an internal list that would be updated by my MOAs" | MOAs keep the specialist list up to date. | certain | **Partly built.** Labelled as kept by the MOAs; there is no editing screen in the MOA portal (grep: 0). |
| 123 | 02:27:47 | "this is the reason for referral but I would have it more like this … the clinical summary would be kind of like this" | A synthesized reason and summary, like his examples. | certain | **Built.** `rfSumDraft`. |
| 124 | 02:29:43 | "have the MOAs do Overwatch and smooth out the friction" | The MOA role is fixing friction. | certain | **Not ours** (operations; private notes). |
| 125 | 02:31:20 | "typically what I do is I literally attach the lab results" | Attach the lab results. | certain | **Built.** `rfDocs`. |
| 126 | 02:32:57 | "they check the source documents. Always … the specialist does not want your visit note … They do want that lab report" | Attach unchanged source documents, not the visit note; a consult letter is good too. | certain | **Built.** `rfSuggest`; the note is never suggested. |
| 127 | 02:33:53 | "I like this too. Letter preview. Boom. That's good. But maybe … formatted better." | Keep the letter preview and format it better. | certain | **Built.** `rfLetter`. |

### Task, note to patient, visit summary (02:36 to 02:51)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 128 | 02:37:34 | "This way. go here. This would be at the top." | Possibly: Task moves to the top of the Action list. | unclear | **Not built** under that reading. Task is sixth of seven tiles (`v2-ord`). See A-7. |
| 129 | 02:37:34 | "the task button would be whatever it is that we want the MOA to do" | MOA routes live inside each form; Task covers anything else. | likely | **Built.** The Task tile; MOA routes in imaging and referral. |
| 130 | 02:39:53 | "have [a team chat tool] directly integrated into the EMR itself. And so that becomes our communication hub" | Later: team messaging for call groups inside the EMR. | certain | **Not ours** (later; private notes). |
| 131 | 02:42:56 | "AI agents that pair with the MOAs that become their little helpers" | Later: AI helpers for MOAs. | certain | **Not ours** (later). |
| 132 | 02:44:03 | "Message sounds a little bit too personal. Note sounds a little bit more professional." | Rename Message to "Note to patient". | certain | **Built.** Commit `f7b8b05`. |
| 133 | 02:44:03 | "and a visit summary. … I want that so bad" | A visit summary to the patient. | certain | **Built.** T-036. |
| 134 | 02:46:22 | "some patients … we wouldn't by definition want to send a visit summary to them … So the doctor needs to sign off on this" | Not for every patient; the doctor signs each one. | certain | **Built.** "Sign and send visit summary"; nothing goes by itself. |
| 135 | 02:48:19 | "I still think that they're excellent" (the existing patient email templates) | Reuse the existing email templates. | certain | **Waiting on Daniel.** The templates are not in the repo (T-036 open point). |
| 136 | 02:48:19 | "sixth grade reading level as per the college … scannable format" | Grade 6, scannable. | certain | **Built.** |
| 137 | 02:49:42 | "I wouldn't even say we need anything bold like the way … AI bolds things" | No AI-style bold in the summary. | likely | **Not built.** `vsDraft` turns `**…**` into bold for medicine, dose and danger sign, as his 24 Oct document asks. See A-8. |
| 138 | 02:50:55 | "this is something that they can toggle on or off in their control panel" | A per-doctor on/off switch. | certain | **Built.** T-036 and T-038. |
| 139 | 02:50:55 | "would I autopopulate the note and just have it sent automatically? Probably not." | Never sent automatically; the doctor presses the final button. | certain | **Built.** |
| 140 | 02:50:55 | "I would toggle on" | His own default is on. | certain | **Built.** Default On (`VS_KEY !== '0'`). The default for other doctors is still open. |

### Chart view (02:52 to 02:59)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 141 | 02:52:06 | "dev's responsible for the billing" | Billing belongs to the developer. | certain | **Not ours.** |
| 142 | 02:52:06 | "then we have the action items … I think that that is excellent" | Keep the Action list. | certain | **Built.** Now compact tiles (`dd1b20f`). |
| 143 | 02:53:52 | "That's not bad. Okay, there's the report down there. Interesting." | Keep a sourced Chart review that opens its reports. | certain | **Built.** |
| 144 | 02:55:31 | "this wouldn't go here. It'd be over here." … "No, no repeat." | History and similar sections go to the left summary; nothing repeats. | certain | **Built.** T-037; and `2726175` for Ordered and pending. |
| 145 | 02:55:31 | "past medical history is going to include … consult reports … Past surgical history, just put that under" | Past medical history includes consult reports and surgical history; prior related care goes there too. | certain | **Built.** `crPmhx`. |
| 146 | 02:55:31 | "the allergies are at the top. That's fine." | Allergies stay at the top. | certain | **Built.** The patient banner. |
| 147 | 02:55:31 | "investigations. Nope. Uh this goes over here." | Investigations go to the left summary. | certain | **Built.** `#v2s-inv`. |
| 148 | 02:55:31 | "there's today's concern, which is fine. And so then this would go all the way up at the top." | Something goes to the very top (today's concern, or pending). | unclear | **Waiting on Daniel.** See A-4. |
| 149 | 02:56:42 | "This pending is kind of like a version of the inbox that is specific to the patient." | Keep Pending as the patient's own inbox. | certain | **Built.** Only in the left summary since 3 Nov (`2726175`). |
| 150 | 02:56:42 | "This is all gone. There's my note. Boom." | With the repeats gone, the note comes up front. | likely | **Built 4 Nov (T-039 and the 4 Nov chart layout).** Needs attention is one line per item and Chart review two sentences, the rest behind Show all; the patient and steps moved to a left column. Note heading now 420 to 697 px down at 1440 × 900 and 1280 × 800, visible on all 8 charts (Gloria 1703 → 697 at 1440). |
| 151 | 02:56:42 | "it should be right under the intake summary … with a emphasis on today's visit if it's possible" | Chart review sits right under the intake summary, with today first. | certain | **Built.** |
| 152 | 02:57:57 | "a very heavily synthesized version … you get the gestalt of the patient like who is this person" | A very short picture of who the patient is. He will design it with Ani. | certain | **Partly built.** "Who this patient is" uses demo sentences (`crSentences`). On the main demo patient, Chart review is still about 1000 px tall. |
| 153 | 02:57:57 | "the medications that the patient takes can be connected to their clinical concerns" | Link medications to the concerns they treat. | certain | **Built.** "Medications and what they treat" (`crMedGroups`). |
| 154 | 02:57:57 | "even from [PharmaNet], you would want to know the drugs that they would have taken 18 months ago" | For some concerns (e.g. mental health), show past drugs, even years back. | certain | **Partly built.** Demo only (`CR_PAST`). The window waits on Daniel. |
| 155 | 02:59:08 | "There's a few extra things that are going to be continuity driven that I'll work on with you" | Continuity features, later, with him. | certain | **Waiting on Daniel.** |
| 156 | 02:59:08 | "we should get these guys to port over the functionality and … the back end" | Developers start connecting the backend. | certain | **Not ours.** |

### Inbox and results (03:00 to 03:13)

| # | Time | Quote | What he wants | Conf. | Status and evidence |
|---|---|---|---|---|---|
| 157 | 03:00:31 | "this is where we would begin right here, the inbox" | The backend work starts with the Inbox. | certain | **Not ours.** |
| 158 | 03:02:13 | "the way that the information is displayed to me from fax versus an API is identical" | Fax and API results look the same. | certain | **Built.** Inbox rows show no source channel (`inboxRowHtml`). Keep it that way. |
| 159 | 03:02:13 | "Consults go into the consult section and labs go into the lab sections." | Reports are filed to the right chart section. | certain | **Not ours** (backend filing). |
| 160 | 03:03:28 | "the AI just takes that and says renal panel. So the way it's displayed to the doctor is ultra efficient." | Plain report names on screen; his labelling standard is already done. | certain | **Not ours.** The demo already uses plain names ("Renal function panel"). |
| 161 | 03:04:49 | "doctors can take a look always at the source document" | The source document is always one tap away. | certain | **Built.** The PDF button in Chart > Results. |
| 162 | 03:05:57 | "the source document when downloaded … even that is appropriately labeled" | Downloaded files have clear names. | certain | **Not ours** (file naming; no download in the demo). |
| 163 | 03:07:02 | "anything that is outside the reference range should be flagged" | Flag every out-of-range value, even routine ones, the LifeLabs way. | certain | **Built.** `lrFlag` (T-037). |
| 164 | 03:08:28 | "there's your out of range, right? And then there's the within range and then there's the reference interval" | Out of range, Within range and Reference interval columns. | certain | **Built.** `lrTable`. |
| 165 | 03:10:11 | "on notion the criteria for a critical result or a flagged result. I'll review those." | He reviews his critical and flagged-result criteria. | certain | **Waiting on Daniel.** |
| 166 | 03:10:11 | "I don't really like colors and bells and whistles … in a very very subtle way" | Quiet flags, no extra colour. | certain | **Built.** Red only on critical values. |
| 167 | 03:10:11 | "what does this arrow up mean" | The arrow is unclear. | certain | **Built.** A word replaces the arrow (`lrWord`). |
| 168 | 03:11:49 | "for the hemoglobin A1C, I'd want to see the two priors if we have it" | Show two earlier values. | certain | **Built.** `lrPriors`. |
| 169 | 03:11:49 | "high priority, critical. Yeah, that's pretty good … You're not overwhelming me." | Keep the Critical, High and Routine bands. | certain | **Built.** |
| 170 | 03:13:08 | "I would even want the reference range right there" | The reference range shows without a click. | certain | **Built.** `lrInline`. |

---

## 2. Missed or wrong in our requirements file

The file is `from-daniel/2026-10-31-meeting-review-of-prescribing-orders-chart.md`. Section numbers are
the file's own.

**Missed (absent from the file)**
1. **The note up front (item 150, 02:56:42; also item 92, 01:53:50).** Section 7 says only "no repetition".
   Daniel's point was the result: once the repeats are gone, "There's my note." He also said "the first
   place that I start is the note". Add a chart requirement: the note is reachable without scrolling.
2. **Another prescriber of a Simple Care drug is a discrepancy (item 28, 00:41:04).** Section 1b item 2
   defines a difference as a dose difference only. He named a second case: "somebody else has prescribed
   this drug, not me" (drug seeking). Section 1b item 5 covers only PharmaNet-only drugs.
3. **Cedar's check at prescribing time against the whole PharmaNet list, about 18 months, including PRNs
   (items 30 and 31, 00:43:41 to 00:45:00).** The file has the "Cedar flagged" summary, but not the pad
   warning "as per PharmaNet, this person is already taking this drug", and not the window.
4. **No separate dividing lines inside Simple Care's drugs (item 20, 00:27:23; item 67, 01:29:32).** The
   file lists groups 1 to 3 as a numbered order, and the build turned them into three headed sections. He
   said "you don't need … a separate dividing line" and wanted one category, "Due for renewal", to catch
   the eye, with the system ordering the rest.
5. **The indication as a headline (item 2, 00:01:40 to 00:04:09).** This was his first comment of the
   call. Section 1a records only allergies and kidney function.
6. **His own mock-up of the top line (item 53, 01:13:30 and 01:16:32).** He said he would send it. It is not
   recorded, and not in `from-daniel/`.
7. **Cedar explains a dose difference from the consult letter (item 35, 00:47:09).**
8. **The shrink-and-fly animation onto the pad (item 62, 01:22:51).**
9. **"Ask the pharmacy to verify. What does that do?" (item 86, 01:51:26).** He questioned it, then said
   the MOA should not handle drug data. The file is silent, and the spec kept the link (T-032).
10. **"This is gone" three times (item 85, 01:51:26)** and **"we wouldn't need this, this or this" (item 3,
    00:04:09).** Neither is recorded.
11. **"Expand … yes" (item 65, 01:28:07).** Not recorded.
12. **"Today's concern … this would go all the way up at the top" (item 148, 02:55:31).** Not recorded.
13. **No AI-style bold in the visit summary (item 137, 02:49:42).** The 2 Nov addendum copies his written
    rule ("bold the key medicine, dose and danger sign"), but his later spoken words point the other way.
14. **"Our doctors" relative to the user's own clinic or group (item 59, 01:20:56).** This is a later item.
15. **Use the word "process" (item 72, 01:35:29).** The file uses it only as a heading.
16. **He could not find Sign and fax at the bottom right (item 87, 01:51:26 to 01:52:26).**
17. **Style and colour to read faster, white background (item 9, 00:08:23).**
18. **A walk-in versus family difference for unknown drugs (item 7, 00:05:34).** He was unsure, so this is
    low priority.
19. **Reports filed to the right section (item 159)** and **plain names on screen (item 160).** Backend
    items, but they belong in the Inbox brief that starts the backend work.

**Recorded, but not quite right**
1. **Section 1d, "Prescriptions do not go to the MOA".** He said more: "forget about the MOA being able to
   see any of the patient data or drugs or doses or anything" (01:52:26). Later he made an exception for
   imaging and referrals (02:11:36). Record both, and the scope question (A-10).
2. **Section 1d, "open the next one".** This is right, but the build shows an offer card, not an automatic
   open (item 94). Either the build or the file should change. Mark it as a known gap.
3. **Section 6, "The patient email templates already exist (designed earlier); can be redone".** Redoing
   them was Ani's suggestion ("pixelated"). Daniel said "I still think that they're excellent" (02:48:19).
4. **Section 6, the per-doctor switch.** The file does not record that his own default is on ("I would
   toggle on").
5. **Section 5, "Task stays for anything else".** This is one reading. The other ("This would be at the
   top", 02:37:34) is not mentioned (A-7).
6. **Section 1b item 4, the PharmaNet section heading.** He was undecided between "Not in Simple" and "as
   per PharmaNet" (00:32:07, "Now it could be that that not and simple is the right way"). The file states
   one heading as settled. This is minor.
7. **Section 7, chart review "for some concerns … past drugs from PharmaNet".** He gave a window: "18 months
   ago", even "a decade ago" in some contexts (02:57:57). The window is missing; it is a clinical rule for
   Daniel to confirm.

---

## 3. Ambiguous: needs Ani or Daniel

Each item has the quote, two readings, and our recommendation.

**A-1. "This is gone" three times (01:51:26).**
"we are making significant pro[gress]. … get rid of all that crap … Allergies in … Today we can have a
little summary up there … and then the supply. Yeah. So, I mean, this is gone. This is gone. This is gone.
Ask the pharmacy to verify. What does that do?"
- Reading A, an instruction: remove three things he pointed at near the supply column of the reviewed
  build (most likely the old groups Active, Possibly lapsed, Long-interval).
- Reading B, an observation: in his new order, those things are already gone, so the screen is cleaner.
- **Recommendation:** treat it as done. The old groups are gone in the current build. Ask Ani whether she
  remembers what he pointed at. If it was something in the supply column, list it for Daniel.

**A-2. "Ask the pharmacy to verify. What does that do?" then "for now we would remove … this button"
(01:51:26 to 01:53:50).**
- Reading A: "this button" is "Sign, MOA sends" on the pad, which we removed. "Ask the pharmacy to verify"
  can stay.
- Reading B: "this button" includes "Ask the pharmacy to verify", because it also routes drug data through
  the MOA. He also said "forget about the MOA being able to see any of the patient data or drugs or doses".
- **Recommendation:** ask Daniel, with a yes/no question: "Keep 'Ask the pharmacy to verify' (it files an
  MOA task to fax the pharmacy for the list)?" Until he answers, leave it as is.

**A-3. The note up front (02:56:42).**
"This pending is kind of like a version of the inbox … This is all gone. There's my note. Boom. … it should
be right under the intake summary. There's your intake summary and then here's your chart review"
- Reading A, a requirement: the note should come right after a short intake summary and chart review,
  visible on the first screen. "Boom" is the payoff of removing the repeats.
- Reading B, an observation: he only noticed the note once the repeated sections were gone. The order
  (intake summary, chart review, note) matters, not the exact position.
- Either way, the current page does not deliver it. The note starts below the first screen on every demo
  chart.
- **Recommendation:** build for reading A. The note heading should be visible without scrolling at 1280 ×
  800 on every demo chart. Chart review shows a few lines, with the rest one tap away. Confirm with Daniel
  in the same message.

**A-4. "There's today's concern, which is fine. And so then this would go all the way up at the top"
(02:55:31).**
- Reading A: today's concern (the intake summary) goes to the very top of the Review section, above Needs
  attention.
- Reading B: "this" is the Pending or Ordered and pending block he was looking at, and it goes to the top.
  He spoke about Pending in the next breath.
- **Recommendation:** ask Daniel. Since 3 Nov, Pending is only in the left summary, so reading B is
  already answered differently. If he means reading A, Needs attention (critical results) still has to stay
  first, under rule 19.

**A-5. "So this here we wouldn't need this this or this" (00:04:09).**
- Reading A: the three old group headings in the reviewed list.
- Reading B: three other on-screen items near the top of the prescribing panel.
- **Recommendation:** treat it as done (the groups are gone). Ani checks her memory of the screen.

**A-6. "Expand. Is that a button you think should be here?" "Yes and I'll tell you why" (01:28:07).**
He then talked about due for renewal and never named the button. The 26 Oct prescribing code has no
"Expand" label.
- Reading A: an expand control on a row (to see more detail, such as days overdue).
- Reading B: the panel's widen or full-screen control.
- **Recommendation:** Ani identifies what she pointed at. If it still exists, keep it.

**A-7. Task: "This way. go here. This would be at the top." (02:37:34).**
- Reading A: move Task to the top of the Action list ("because I just want somebody to do something").
- Reading B: he then said the MOA routes are already built into imaging and referral, so Task is just for
  "whatever it is that we want the MOA to do". The order does not matter.
- **Recommendation:** ask Daniel: "Should Task be first in the Action tiles?" It is a small change either
  way.

**A-8. Bold in the visit summary (02:49:42 versus his 24 Oct document).**
Spoken: "I wouldn't even say we need anything bold like the way … AI bolds things". Written: "bold the key
medicine, dose and danger sign".
- Reading A: no bold at all.
- Reading B: no heavy, scattered AI-style bold, but keep the few bolds his document asks for.
- **Recommendation:** keep the three bolds his document asks for (reading B) and confirm with Daniel. His
  written rule is more specific.

**A-9. Medications next to today's concern (01:14:57 versus 02:57:57).**
Prescribing: "the medications next to today's concern. No". Chart review: "the medications … can be
connected to their clinical concerns", and for mental health, pull up past drugs.
- Reading A: there is no conflict. Prescribing must not pair today's concern with the "expected" drugs.
  Chart review may group the patient's own drugs by the concerns they treat.
- Reading B: he dislikes any concern-to-drug pairing.
- **Recommendation:** reading A. It matches both quotes, and it is what we built. Mention it to Daniel as a
  check, not a question.

**A-10. Scope of "forget about the MOA being able to see any of the patient data or drugs or doses"
(01:52:26).**
- Reading A: prescriptions only. The MOA does not process scripts.
- Reading B: the MOA sees no clinical drug data anywhere, except what imaging and referral forms need
  (he allowed those at 02:11:36).
- **Recommendation:** reading A for now, which is what we built. Ask Daniel whether the MOA portal should
  hide medication data in general. This is a privacy question too.

**A-11. Group headings inside Simple Care's drugs (00:27:23, 01:29:32).**
- Reading A: one header only ("Due for renewal"); the other drugs follow in order, with differences
  highlighted in their rows.
- Reading B: the headings are fine; he only meant no extra line between due and not-due.
- **Recommendation:** reading A. It matches "you wouldn't even need to call it active" and "you don't need
  … a separate dividing line". Keep the single line before PharmaNet.

**A-12. "Can we put this horizontal?" (01:59:15).**
He had just said "creatinine". "This" could be the suggested tests, or the test list itself.
- **Recommendation:** treat it as done. The suggested tests are one horizontal row, and Ani agreed at the
  time ("much better horizontal … takes too much scrolling").

---

## 4. To-do for Ani, in priority order

1. **Put the note up front** (02:56:42, 01:53:50; item 150). The note heading should be visible without
   scrolling at 1280 × 800 on all eight demo charts. Shorten Chart review to a few lines, with the rest one
   tap away. Owner: `ux-designer`. Gate: `qa-engineer`.
2. **Flag another prescriber of a Simple Care drug** (00:41:04, 01:43:29; item 28). Owner: `ux-designer`.
   Gate: `clinical-safety`. Which drugs and which window are clinical rules: Daniel decides, and we invent
   none.
3. **Settle three possible contradictions in one message to Daniel:** "Ask the pharmacy to verify" (A-2),
   bold in the visit summary (A-8), and Task at the top (A-7).
4. **One header in the medication list** (00:27:23, 01:29:32; item 20). Keep "Due for renewal" as the only
   heading in the Simple Care part. Differences stay highlighted in their rows.
5. **Open the next form after Sign and fax** (01:56:33; item 94), instead of the card. Alternatively, ask
   Daniel whether the card is enough.
6. **Confirm and renew in one press** (00:48:56; item 36), for a difference that is also due.
7. **The pad's PharmaNet check** (00:43:41 to 00:45:00; items 30 and 31). The warning names PharmaNet ("As
   per PharmaNet …"). It covers finished and as-needed fills too. The window waits on Daniel. Gate:
   `clinical-safety`.
8. **Small things:** a Cedar line citing the consult on a dose difference (item 35); the fly-to-pad
   animation (item 62); the word "process" (item 72); check where Sign and fax sits (item 87).
9. **Ask Daniel for his material:** the top-line mock-up (01:16:32), the "Patient only" rework
   (01:05:53), his lab panels (01:59:15), the imaging exam list (02:19:51), the critical-result criteria
   (03:10:11), a session on the chart-review "gestalt" (02:57:57), the continuity items (02:59:08), and the
   existing email templates (02:48:19).

---

## Changelog (this run)
- Added this file, `product/qa/2026-10-31-coverage-check.md`. It holds 170 items in transcript order with
  their status and evidence, 19 missed and 7 inaccurate points in the requirements file, 12 ambiguous
  points with recommendations, and a 9-step to-do list.
- Measured the note's position (read-only, headless Chrome, `?nologin=1`) on the current build and on the
  reviewed build `9974f15`.
- Appended the new business and regulatory points from the call to
  `private/daniel-meeting-2026-10-31-confidential.md`. That file is git-ignored.
- Did not edit the portal HTML, the requirements file, or any spec. Nothing was committed.

**Top 3 asks:** the note up front (item 150); the other-prescriber flag (item 28); one message to Daniel
on A-2, A-7 and A-8.
**Needs Daniel:** A-2, A-4, A-7, A-8, A-10, the 18-month window, and the material in to-do step 9.
**Needs Ani:** A-1, A-5 and A-6 (what was on screen), and approval of to-do steps 1 and 4.

## Changelog (4 Nov, `ux-designer`)
- Built and committed: T-039 (the note up front, items 92 and 150), the 4 Nov chart layout (Ani), and T-040 (items 2, 28, 30, 31, 35, 36, 62, 94).
- Not built by Ani's decision: item 20 (the group names stay; question for Daniel in the prescribing spec) and item 72 (no explaining text).
- Item 87 (where Sign and fax sits) was not in this round's brief and was not checked.
- The counts in the one-screen summary are those of 3 Nov and were not recounted.
