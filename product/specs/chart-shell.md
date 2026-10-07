# Chart shell: the core encounter view (T-021)

Owner: `ux-designer` · Ani approves · Built into `simplecare-physician-portal-v2.html` (the chart, `#pcv-c`) · Build 2026-10-07 06:10 (declutter, Layout v2, Daniel review, Left panel and call widget, Batch A, Batch B, then Chart tab; see the end)
Source: Physician Chart View Requirements v2.5 (B-006), delivery step 1 · ECG Critical Result Requirements v2.0 · Daniel, 30 Sep (`from-daniel/2026-09-30-chart-workflow.md`, `2026-09-30-ecg-and-result-flags.md`).
Scope: light theme, 1440 px, the demo patient. Dark theme not checked (Ani, 4 Oct). The Figma "SC – Design System" is not used yet (Ani, 3 Oct); the chart uses v2's own variables, buttons, tags and Mage icons.

## One-screen summary

**What it is.** Opening a chart now shows, top to bottom: the persistent banner (patient snapshot, then the this-visit strip), Needs attention, Today, Relevant to chest pain, Since you last saw. The note and its actions sit **beside** that context at 1440 px, so the doctor sees where to chart straight away (Daniel: "where am I charting?"). The full chart is one click away and takes the context's place; the note stays.

**What changed from v2.**
1. Note column beside the context, with Prescribe, Order, Refer, Task, Message under it and Sign off pinned at the bottom (v2: note low on the page).
2. New this-visit strip. Sign off is disabled until it is complete (v2: none).
3. Masked PHN, no clinical counts or conditions chip in the banner (v2: full PHN, conditions chip).
4. One Needs attention group: the critical troponin, with the abnormal ECG (To do) and CK (Info) grouped under it (v2: separate cards plus an "Also in today" line).
5. Today, Relevant to chest pain and Since you last saw replace "This visit", the care-plan block, the right rail and the tab row. The care plan, results, medications and conditions moved behind **Full chart**.
6. AI text (the scribe draft and an intake-based suggestion) is marked and kept out of the note until the doctor accepts it (v2: the scribe wrote straight into the note).

**Kept from v2, unchanged.** Call, Task MOA, prescribing card, scribe and its proposals, sign-off and claim, care plan, results, the review screen, the MOA chat, the Assistant, Daniel's "Abnormal ECG" wording, and the held assessment and plan while a critical result is unsigned.

**Proof.** Light screenshots in `product/reports/shots/t021-*.png`. All three inline scripts pass `node --check`. The console was clean in every run (chart, finalize block, strip, full chart and back, scribe, dropped call, sign-off, Home, Inbox, Claims, Tasks, MOA chat, Assistant, review and back, and every other queue patient's chart).

**Needs Daniel (top):** which tier the CK sits in; whether a non-BC patient blocks Sign off; the strip's data source and wording; High vs To do. See the end.

## Anatomy

```
Banner (sticky):  photo · name · age · gender · masked PHN · allergies · family doctor · Call · Full chart
                  This visit: location · ID verified · consent · others present · video/phone · callback
                  [notices: dropped call; patient outside BC]   [one line: reason + critical, only once scrolled]
Context column                                        Note column (sticky, beside)
  Needs attention (grouped)                             Today's note + "draft saved"
  Today  (one surface, divided by hairlines)            AI suggestion (marked)
  Relevant to chest pain                                Ambient scribe (v2)
  Since you last saw                                    Note, Insert chips, Actions
                                                        Sign off (pinned) · Save draft
Full chart replaces the context column: Timeline · Results · Medications · Problems · Care plan · Consults · Documents · Messages · Search
```

## Per part

### 1. Patient snapshot (v2.5 §3)
- **Shows:** name (legal name; "Goes by Gloria" only when it differs), age, gender as recorded, PHN masked to its last three digits, a photo placeholder, allergies, family doctor. No counts, no badges.
- **States:** allergies in three: named (ink, with a symbol; not red), "No known drug allergies" (green tick), "Allergies not recorded" (amber tag with the word).
- **Words:** "Family doctor". Nothing is uppercase.
- **Behaviour:** sticky while scrolling. Demo switcher "Next allergy state" cycles the three.
- **Accessibility:** the masked PHN has an aria-label naming its last digits; the photo placeholder has a text alternative.
- **Changed from v2 and why:** v2 showed the full PHN and a conditions chip ("HTN, T2DM, BP above target +11"). v2.5 §3 asks for a masked PHN and no counts or diagnosis badges.
- **Open:** the photo is a placeholder. v2.5 wants the patient's dated intake photo (needs intake data).

### 2. This-visit strip (v2.5 §3)
- **Shows:** location, ID verified (method, date), consent, others present, video or phone, callback number.
- **States:** incomplete items are an amber tag with a word ("Not confirmed", "Not asked", "Not verified", "Not recorded"). Each tag is the button that opens a small form to complete it. Complete: collapses to one line ("Complete · Location · Phone · Callback"), with "Show details". Outside BC: a notice with no close button. Dropped call: the strip re-expands and a notice offers "Call back [number]".
- **Behaviour:** Sign off & finalize is `aria-disabled` (still focusable) until it is complete, and the line beside it names what is missing, with links to each. Pressing it anyway explains and moves to the first missing item. The note is never lost (draft saved on every keystroke).
- **Accessibility:** forms are dialogs; Escape closes and returns focus; Enter confirms; the tag's label says what it does.
- **Changed from v2 and why:** v2 had no strip, and Finalize did not depend on it.
- **Open (Needs Daniel):** the Virtual Care Compliance spec is TBD. The location, ID, consent and callback values are **invented demo data** (v2 has none; 555-01xx is a fictional number range). Wording of the outside-BC notice, whether it blocks Sign off, and whether location is asked on every call are his.

### 3. Needs attention (v2.5 §3, §7; ECG v2.0; Daniel 30 Sep)
- **Shows:** one group directly under the banner. The critical troponin first (value in red, the only red text, with its concern "Acute myocardial injury"). Under "Related": **Abnormal ECG** (To do) and **CK 210 U/L above range** (Info). Each item has its source, time, the responsible doctor, its stage ("Not reviewed", "Not cleared", "Reviewed, not signed off") and a direct action ("Review result", "Review ECG", "Open result").
- **Tiers:** Critical (red symbol and word), To do (amber symbol and word), Info (blue symbol and word). Every tier has a word and a symbol as well as colour.
- **ECG:** says only "Abnormal ECG". The machine reading stays on the tracing (Daniel, 30 Sep). It is **not** critical: ECG v2.0 makes "ABNORMAL ECG" alone, and plain AF without a source critical flag, non-triggers; every ECG still needs physician review, so it is To do. A real CRITICAL ECG would show verbatim source phrases (not built; see open points).
- **Empty:** one quiet line, "Nothing requiring attention", no empty card (demo switcher "Nothing needs attention").
- **Behaviour:** the data and tiering come from v2's existing `labTier` rules (LifeLabs limits plus SimpleCare's troponin escalation); nothing new is classified. Reviewing the ECG or the result updates the list.
- **Changed from v2 and why:** v2 had a critical card, a separate yellow ECG card and an "Also in today" line. v2.5 groups related items under the critical one.
- **Open (Needs Daniel):** CK is shown as Info because it is above range but not actionable alone (v2.5 §7 "abnormal ≠ actionable"). Daniel said on 30 Sep that a yellow result is something "the doctor has to look at it and clear". Is CK To do or Info? Also: a LifeLabs "alert" (High) result is shown as To do with the word "high" kept; Daniel's own bands are Critical, High, yellow, and v2.5's are Critical, To do, Info (OQ-76).

### 4. Today (v2.5 §3)
- **Shows:** the reason in the patient's words ("Follow up — chest pressure noted", 24 px), the intake summary, and the intake red flag in exact words ("Chest pressure", with a "Flagged at intake" tag and "Open intake").
- **Behaviour:** the red flag row appears only when intake flagged something (display by exception).
- **Data note:** v2's AI intake summary says "no prior cardiac workup", which contradicts the chart (cardiology saw her Jul 28). The shell shows only its first sentence. Needs the AI engineer to fix the source text.

### 5. Relevant to chest pain (v2.5 §4, §5)
- **Shows:** the five categories, always in the same order: History, Medications (with source and date: "Simple Care record · last renewed Aug 30 · not checked against PharmaNet"), Investigations, Prior related care, Pending. Every line is a button that opens its source in the full chart. "Show what they wrote" expands the cardiology quotes in place.
- **Data:** the demo patient's list is curated from v2's data (conditions, medications, care plan, readings, results, consults). Other patients get the same five categories built from their own data and labelled "From the chart". Nothing is invented; "Smoking status: not recorded" says so.
- **Not duplicated:** today's troponin, CK and ECG are pointed to ("in Needs attention above"), not repeated (v2.5 §7).
- **Open:** v2.5 §4 wants deterministic, clinician-reviewed selection rules and a Relevant / Not relevant / Missing / Incorrect feedback control. Both belong to delivery step 2 (not built).

### 6. Since you last saw (v2.5 §3, §6)
- **Shows:** New, Changed, Pending, Resolved as a word with a symbol, five items, then "+2 more". "Read the Jun 25 note" opens it read-only. Labels are sentence case, not the spec's capitals (rule 23).
- **Open:** v2.5 says critical items are always shown; today's critical is item 1. The "relevant prior visit" is the doctor's own Jun 25 visit; a clinic fallback is not built.

### 7. Note and actions (v2.5 §3; Daniel 30 Sep)
- **Shows:** at 1440 px the note column is beside the context and stays in view while the context scrolls. Under the note: Prescribe, Order, Refer, Task (the MOA; tasks go doctor to MOA only), Message. Sign off & finalize and Save draft are pinned at the bottom. The note saves a draft on every keystroke ("Draft saved · time").
- **Reuses v2:** the prescribing card (Prescribe opens it), the scribe, Insert chips, the empty-note and template-text warnings, sign-off and claim submission.
- **Below 1440 px:** "Chart" and "Note" tabs: the note is one tab away.
- **Changed from v2 and why:** the note was below the visit summary and the care plan; Daniel could not find it.
- **Open:** Order, Refer and Message are still the v2 demo toasts, not flows. Message goes to the patient portal (not decided).

### 8. Full chart (v2.5 §3, §7)
> Superseded on 7 Oct: the full chart is now the visit's 4th tab, **Chart**. See "Chart tab, 7 Oct" at the end.

- **Shows:** a "Full chart" button in the banner opens, in place of the context column, nine tabs: Timeline, Results, Medications, Problems, Care plan, Consults, Documents, Messages, Search. A search box searches all of them. "Back to the visit" (or Escape) returns.
- **Preserved:** the note text, the draft, the scroll position and the visit state. Focus returns to the control that opened it. Every "source" line in Relevant context and every Needs attention action opens the right tab.
- **Care plan:** it lives here, still separate from the task list (rule 13). Daniel, 30 Sep: "this is more comprehensive care, so don't worry about that just yet."
- **Open:** Clinical threads (v2.5 §6) are not built; Problems shows v2's conditions list. Consults and Documents are built from v2's care plan and last note, not real documents.

### 9. AI text (v2.5 §7)
- **Shows:** a tinted block with an AI mark, a label ("AI suggestion · not in your note until you accept"), its source line, and Accept and Reject. Before the call it is the first sentence of the intake summary. Once the scribe runs, the scribe's draft goes in this block instead of straight into the note.
- **Behaviour:** accepting adds the text to the note as the doctor's own; rejecting adds nothing. Signing with an undecided suggestion asks first and says it will not be filed (rule 18). The scribe's proposals (tasks, orders) are unchanged and still need a button press each.
- **Works without AI:** if there is no suggestion the block is absent and the chart is unchanged.
- **Open:** v2.5 §9 tests catching an AI negation error before signing. The block shows its source line, but there is no negation-check design yet (needs `ai-engineer`).

## Accessibility and measures (light, 1440 × 1000)
- Text 14 px or larger; buttons 44 px with an icon; tags 15 px/500, 40 px (32 px inline in a reading line: Needs Ani); no uppercase styling; reading text capped at 66 ch.
- Focus: a visible 2 px ring; the page leaves room for the topbar and banner (`scroll-padding-top` set from their measured height) so a focused item is never hidden; full keyboard (tabs with arrow keys, Escape to close, Enter to confirm).
- Colour: red only on the critical value and its symbol; amber for incomplete and To do; every state has a word.
- Banner height 162 px with an incomplete strip (the strip is one line at 1440).
- Not done: a contrast check with a tool, screen-reader testing, and the dark theme. The `accessibility` gate needs to run.

## Not done, and what it needs
| Item | Needs |
|---|---|
| CRITICAL ECG display (verbatim phrases, source, measurements, acknowledgement) | Daniel's go-ahead on the display; a data feed for the printed text. Only the demo's non-critical ECG exists |
| Critical item closure ("patient told", "follow-up due", "closed" stages) | Critical Results & Escalation spec (TBD) |
| Clinical threads, trends, pending loops, preventive care | Delivery steps 2 and 3 |
| Relevant / Not relevant / Missing / Incorrect feedback | Delivery step 2 |
| Real location, ID, consent and callback data; dated intake photo | Intake and Virtual Care Compliance data |
| Re-expanding the strip on a location change | A location source |
| Task targets with 15 physicians; check with the `doctor` agent | Prototype review (the brief asks for it before Ani sees it) |
| Gates: `clinical-safety`, `qa-engineer`, `accessibility` | The lead |
| Dark theme, Figma "SC – Design System" | Ani, later |

## Needs Daniel
1. CK above range alongside a critical troponin: Info, or To do? (and High vs To do naming, OQ-76).
2. Patient outside BC: the exact notice wording, and whether it blocks Sign off.
3. The this-visit strip: what counts as "complete", how location, ID and consent are captured, and whether location is re-asked every call.
4. Is a CRITICAL ECG shown in the same group as the troponin, or separately? (ECG v2.0 says it stays in Needs attention until a physician documents review.)
5. Chart View v2.1 and the four companion specs, which v2.5 defers to, are not in the repo.

## Needs Ani
1. Approve the layout: one group for Needs attention, and Today, Relevant and Since you last saw on one surface rather than separate cards.
2. A second tag height (32 px) inside reading lines, or keep 40 px everywhere?
3. "Care plan" sits behind Full chart, not on the first screen. OK?
4. The floating MOA chat sits over the bottom of the note column at 1440 × 1000; the note card is shortened to clear it. Move the chat, or accept?
5. New demo-switcher rows ("Chart states") in the portal: keep or remove before deploy?
6. Dark theme and the Figma migration: when?

## Declutter, 5 Oct

Ani, 5 Oct: the chart was "overwhelming, too much text and noise". The lead reviewed all eight queue charts at 1440 px. Same clinical content and the same gates; the presentation changed. Light mode only. Screenshots: `product/reports/shots/chart-declutter-before-*.png` and `chart-declutter-after-*.png` (local only).

**Rules now in force**
1. **One name.** The patient card carries the name. The top bar says "Patient chart". Back and the visit status are one small line ("Home · Open visit · today · In queue"). No previous visit with this doctor: a small "New patient" tag by the name.
2. **Visit checks shown once.** The banner has one quiet line: mode, callback, location once confirmed, and "N checks before finalize" (a link that opens the first missing check). The checklist itself lives only by Finalize ("To finalize:" plus an amber tag per missing item; each tag opens its form). Done items are not pills; once all are done the footer says "Visit checks complete" with Details. Finalize stays `aria-disabled` until every check is done, and pressing it opens the first missing check (unchanged gate).
3. **Today** is the reason as the headline, then one line: the patient's own words from booking when captured (`words` on the queue row; none in the demo data yet), otherwise the intake summary. The empty "Reason" row is gone (it was showing its own label as the value). The intake red flag row is unchanged.
4. **Needs attention** is hidden when empty (was "Nothing requiring attention"). One card per result: the value that set the tier is the headline, the same panel's other out-of-range values are one line in that card ("Also out of range: Creatinine 104 µmol/L ↑ · eGFR 54 mL/min ↓ · Urea 9.1 mmol/L ↑"), and there is one action. Other same-day unresolved items stay grouped under a critical one as "Related", each with its own action. Critical red, To do amber, words and symbols: unchanged. Every row is the same full-width grid, so stages and actions line up.
5. **Each fact once.** "From the chart → Investigations" leaves out today's values that are in Needs attention and shows one pointer ("Renal function panel, today · see Needs attention"). "Since you last saw" leaves out results already in Needs attention and items already under Pending; for the demo patient it also drops the consults, lipid panel and home BP shown under Relevant. The section is hidden when nothing is left or there is no previous visit.
6. **Less micro text.** No "Each line opens its source" caption; the chevron on each source line is always visible instead. The medications source line ("Simple Care record · last renewed … · not checked against PharmaNet") sits behind one small info button per section (click or keyboard, not hover only).
7. **The note leads the right column.** Header: Today's note, draft status, a small "Scribe" toggle and "Save draft". The scribe panel appears only once the scribe is in use (consent, live, review). The AI suggestion is a slim banner above the note with the same label ("AI suggestion · not in your note until you accept"), its source, and Accept and Reject; undecided AI text still triggers the warning at sign-off and is never filed. One compact toolbar sits directly above the note: Insert (one small menu: follow-up template, normal exam, reading from patient, diagnosis), then Prescribe, Order, Refer, Task, Message. The note opens empty with a placeholder (it used to open with "Patient presents for …"). The note column is 500 px.
8. **Footer:** the checklist, the one billing line (T-023, unchanged logic; its demo marker is an icon with its words on hover and for screen readers), then one full-width primary "Sign off & finalize visit". The column now ends above the floating MOA chat at any scroll position, so nothing is under it.
9. **No-show state.** A row with status "missed" (Doctor to Callback) or "noshow" shows one "No-show" banner at the top of the context: what is known (no answer or marked, the call window, the queue status, and calls made from this chart today), "Call again" (primary; calls go outward only) and "Mark no-show" (sets the queue status). The chart context stays below. Hidden while in this state: the AI suggestion, scribe, toolbar, checklist, Finalize, the banner's own Call button (one primary). The note stays for an optional attempt note. A no-show shows the existing billing placeholder ("No-show billing: not decided", Needs Daniel). "Call again" brings the full visit back, with a one-line reminder and "Mark no-show".
10. **Hierarchy.** One primary per area (Call in the banner, Finalize in the note column, Call again in the no-show banner, the critical result's Review keeps its outline). Other secondary actions are tonal (grey fill, no stroke) or text links. Tighter spacing; nothing under 14 px.

**Also fixed:** `csFocus` was called by Show details, Show what they wrote, +N more and closing a check, but was never defined, so those controls threw.

**Deviations to confirm (Needs Ani)**
- Toolbar, header and footer text buttons are 36 px tall, not 44 px, because the lead asked for a compact toolbar. Hit areas are still 36 px or more.
- The no-show banner's Mark no-show uses the flag icon (the Mage set in the portal has no "x" icon).
- The finalize helper line under the button ("Your claim goes to Claims for sign-off …", T-023) is kept, at two lines at most.

**Not changed, and why**
- Andrey's ALT 88 and AST 65 (above range today) are not in Needs attention. That is the data and the existing rules, not a bug: their flags are `high` (above the reference range), not LifeLabs `alert` or `crit`, and the item has no `abnormal` mark, so `labTier` and `resultIsAbnormal` return nothing. They now show under "From the chart → Investigations" and as "New · Liver function" in Since you last saw. Whether above-range results like these are To do (Daniel, 30 Sep: a yellow result is one "the doctor has to look at and clear") is **Needs Daniel**.
- Sign-off for the demo patient still stops first at the suggested problem-list updates (existing v2 gate).

## Layout v2, 5 Oct

Ani, 5 Oct: after the declutter the chart "still feels like too much text in one long scroll". She asked for "Chart layout v2", borrowing the **visual structure only** of a telestroke product she designed: a left column of stacked white context cards, the work split by tabs, and one primary "Sign off & finalize" at the top right that says what is missing. Not its content, and not its AI behaviour. Light mode only. Screenshots (local only): `product/reports/shots/chart-v2-{gloria,behdis,greg}-{review,note,orders}.png`, `chart-v2-arli-{review,note}.png`, `chart-v2-gloria-sidebar-open.png`.

**How it ships.** The project rule is one main file, so v2 is a switchable layout inside `simplecare-physician-portal-v2.html`, not a new file.
- A segmented control in the chart's crumb line: "Layout: Current | v2". `?chart=v2` (or `?chart=current`) sets it from a link. The choice is remembered in this browser (`localStorage` key `sc-chart-layout`, wrapped in try/catch, so a blocked store just means Current).
- **Default is Current.** The deployed chart is unchanged unless someone picks v2.
- **One set of nodes, two arrangements.** `csLayout('v2')` moves the chart's existing nodes into the v2 frame and leaves a marker where each was; `csLayout('current')` puts them back. Moved: the patient card, the notices (dropped call, outside BC), the no-show banner, Needs attention, Today, Since you last saw, the note, the AI block, the scribe, Insert, the prescribing card, the footer (checklist, warnings, the T-023 billing line, Finalize, Next patient, claim helper) and the full chart. So Finalize gates, critical results, AI Accept/Reject, the billing line, no-show, Insert, scribe consent and the full chart are the **same functions** in both layouts. The v2-only code is presentation: the sidebar sections, the This visit card, the investigations card, the tabs, the header, and label-above-value branches in the patient card, Today and the Needs attention row (`CS.layout === 'v2'`). No clinical rule, tier or gate was changed.

**Anatomy (v2)**
```
Crumb:  Home · visit status                                        Layout: Current | v2
Left column (312 px; 280 px at 1360 px and below; sticky, scrolls on its own)
  Patient card: name, New patient (when no previous visit), age · sex · masked PHN,
                Allergies (label, value), Family doctor (label, value), Call (primary) + Full chart
  This visit:   Visit (Phone), Callback; checks as a short list: done = quiet tick + value,
                missing = one tonal chip each (opens its form by Finalize)
  Medications N · History N · Pending N [k overdue] · Since you last saw N · Previous visits N
                (collapsible cards, collapsed by default; each line opens its source in the full chart)
Main
  Tab bar (sticky):  Review [badge] | Note [badge or tick] | Orders [badge]      Save draft   [Sign off & finalize · N checks left]
  Review:  no-show banner (when it applies) · Needs attention (card, "N to review" chip) · Today · Relevant investigations
  Note:    Today's note + draft status, Scribe, Insert · AI suggestion (Accept / Reject) · scribe panel when in use · the note
  Orders:  Prescribe, Order, Refer, Task, Message as rows · the prescribing card under them when open
  Full chart replaces the tab content; any tab, Back to the visit or Escape returns
```

**Rules in v2**
1. **One card pattern.** Icon + title + at most one status chip + actions on the right. White cards on the page, generous spacing. Colour only on status chips; critical stays red (value, symbol, "2 to review" chip and the Review badge when a critical is unreviewed) and is the only strong colour.
2. **Label above value, one fact per line.** Long dot-separated lines are split: the value first, then quiet lines. A Needs attention row is: tier word (label), result and value (red only when critical), the concern, the range, "Also out of range" when the panel has more, "Received …" and one info button that opens panel, lab, responsible doctor and why it is flagged. Stage and action stay on the right, as before.
3. **Tabs.** `role=tablist`, roving tabindex, Left/Right/Home/End. Marks: Review shows the count of Needs attention items still "Not reviewed" or "Not cleared" (a tick when none are left); Note shows 1 while AI text waits for Accept or Reject, and a tick once the note has text and nothing is pending; Orders shows 1 while an open prescription has not been sent. Every mark has words for screen readers.
4. **Sign off & finalize** is the one primary in the main area. It shows "N checks left" and opens a popover holding the chart's own footer: the checklist (each missing check is the tag that opens its form), any warning (empty note, template text, undecided AI text), the T-023 billing line, the real "Sign off & finalize visit" button, Next patient and the claim helper. Pressing Finalize with a check missing, a missing-check chip in This visit, or a blocked finalize all open the right form in that popover. Escape or the close button closes it and returns focus. After sign-off the header button reads "Signed off" (tonal) and opens the billing status and Next patient. **T-023 unchanged:** Finalize closes the visit only; the claim goes to Claims for sign-off.
5. **Save draft** is a ghost button next to it (44 px; icon only at 1360 px and below, its name kept for screen readers and on hover).
6. **AI text** is the same slim block above the note, with Accept and Reject; nothing enters the note until Accept, and undecided text still triggers the warning at Finalize and is never filed.
7. **No-show.** The banner (Call again, Mark no-show) leads the Review tab. The Note tab shows the note with "Note the attempt (optional)"; Insert, Scribe and the AI block are hidden; a marked no-show shows the existing "No-show billing: not decided" placeholder under the note. The Orders tab and Sign off & finalize are hidden (Call again is the one primary). Call again brings the full visit back and moves to the Note tab, as Current moves focus to the note.
8. **Each fact once.** The investigations card leaves out today's results already in Needs attention on the same tab (Current's "see Needs attention" pointer is not needed). Since you last saw is the chart's own section; its "Read the note" link moved to Previous visits.

**Proof (headless Chrome, light, 1440 × 900 and 1280 × 800).** All five inline scripts pass `node --check`. All eight charts (Gloria, Andrey, Carol-Anne, Behdis, K Arli Eyre, Greg, Manjit, Korynn) open in v2 with a clean console and no horizontal scroll at either size. Current ↔ v2 switched three times on three charts: every node returns to its place each time (note in the note column, snapshot in the banner) and Current looks as before. Checked in v2: Finalize blocked with checks missing (opens the location form), checks completed from the popover, AI Reject (nothing added) and Accept (added, Note tick), sign-off (claim waiting in Claims, Next patient), the billing line, no-show (Call again, Mark no-show, billing placeholder), sidebar sections open and close (`aria-expanded`), tabs by keyboard, Escape and outside click close the popover, Insert menu, scribe consent, full chart and back, Review screen and back. Current regression: default is Current, its gates and AI accept unchanged; Home, Inbox, Claims, Tasks, the Assistant and the MOA chat open with v2 on.

**Measures.** Text 14 px or larger everywhere in v2 (the only exception is T-023's existing icon-only demo marker, which keeps its words for screen readers). Buttons 44 px, except these compact secondary ones: the layout switch (36), Scribe and Insert (36, as in Current's toolbar), "Show what they wrote" (36), text links such as Open intake and Read the note (32), the info buttons (32) and the billing line's Change (32), all as in Current. Missing-check chips and the checklist tags are the 40 px tag spec. Section-header chips ("1 overdue", "2 to review", "Flagged at intake") are 32 px: see Needs Ani.

**Decisions made (Needs Ani to confirm)**
1. The checklist lives in the Sign off popover (one place for every check form), and This visit shows status only; its missing chips open that popover. The billing line also lives in the popover, not under the note.
2. Orders has no completion tick (nothing there must be done for every visit); it gets a badge only for an unsent open prescription.
3. Review shows a tick when nothing is left to review, including when there was nothing (e.g. a no-show).
4. Underline and focus use the portal's primary blue (current state), not the reference's black.
5. 32 px chips in card and section headers (the same open question as the 32 px tag inside reading lines).
6. Empty Medications or History cards say "No medications recorded in Simple Care" / "No conditions recorded in Simple Care" rather than hiding, so the sidebar keeps the same five sections; Pending, Since you last saw and Previous visits hide when empty (display by exception).
7. Under 1100 px the left column stacks above the work (not checked in detail; the brief's sizes are 1280 and 1440).

**Not changed, and why**
- Andrey's ALT 88 and AST 65 above range are still not in Needs attention (existing rules; Needs Daniel, see Declutter).
- The T-023 billing line is the existing one-line row; in the 440 px popover it wraps to two lines.
- Dark theme not checked (light only, Ani 4 Oct).


## Daniel review, 5 Oct (built 6 Oct)

Daniel reviewed the chart with Ani on 5 Oct; Ani approved the updates on 6 Oct. He prefers layout v2. Current stays the default (Ani decides later). Light mode only.

**Finalize submits the claim, when he says so** (billing rules: `billing-redesign.md`, "Daniel review, 5 Oct")
- The billing row above Finalize shows fee code · diagnosis · time, with Change (opens "Your coding"; no disposition).
- MSP visit: primary **Sign off & submit claim** finalizes the visit and submits that one claim after the code check (asked once per session). Secondary (outline) **Finalize, submit later**: the claim goes to Claims, Needs submission. Cancelling the code check also leaves it there. The helper line: "Submitting sends this one claim. Claims go to MSP in one batch at the end of the day."
- No diagnosis: Sign off & submit opens the diagnosis search instead; Finalize, submit later still closes the visit (billing never blocks the clinical sign-off).
- Private pay: one primary, **Sign off & finalize visit**.
- Both buttons go through the same gates (`finalizeVisit`: checks, empty note, template text, undecided AI text, problem-list suggestions). Same nodes and functions in Current and v2 (the v2 Sign off popover holds the moved footer). After sign-off the row says "Claim submitted · goes to MSP at the end of the day" or "Needs submission · in Claims" with Submit claim and Details.

**v2 opens on the Note tab**
- In the review, v2 opened on Review and Daniel asked where to write the note. During an open visit v2 now opens on **Note**; Review keeps its badge (the count still to review, red when critical).
- A no-show opens on Review (its banner, Call again); a signed-off visit opens on Review. Switching Current → v2 on an open chart uses the same rule.
- Screenshots (local): `product/reports/shots/daniel5-chart-billing-row-current.png`, `daniel5-chart-billing-row-v2.png`, `daniel5-v2-note-default.png`.


## Left panel, 6 Oct

Ani, 6 Oct, on Gloria's chart at 1440 px: the left column "scrolls weirdly and looks heavy". It was its own scroll box (cards clipped at the top under the crumb line and at the right edge), and it was seven separate big cards. Screenshots (local only): `product/reports/shots/leftpanel-gloria.png`, `leftpanel-gloria-scrolled.png`, `leftpanel-greg.png`, `leftpanel-arli.png`, `call-widget.png`, `call-widget-home.png`.

**Scrolling (second pass, Ani, 6 Oct: "scrolls on its own").** Two independent scroll areas, like a mail app. At 1101 px and wider the chart grid fills the window below the crumb line (`--v2-h`, measured by `v2Fit` on open, resize and when the chart is shown) and the page itself does not scroll. The left column is its own scroll box (`overflow-y: auto`, `overscroll-behavior: contain`) and so is the main column (tabs, Review / Note / Orders). A wheel over the left column scrolls only the left column; a wheel over the main column scrolls only the main column; when the box under the mouse (or a scrollable element inside it, such as the note) can't move further, the wheel does nothing, so it never moves the other column or the page. Opening a row, answering a check or switching tabs never moves the other column.
- No clipping: the left box has 14 px of inner room on every side (top, right and bottom included), with negative margins so the cards sit where they did; its grid track is `minmax(0, 1fr)` so cards never get wider than the column (at 1280 px they had been 12 px too wide). Soft fades at the top and bottom only when there is more to see (`v2-ft` / `v2-fb`, a mask, updated on scroll and when a row opens). Thin scrollbars, visible on hover or focus.
- Main column: the tab bar with Save draft and Sign off sticks to the top of the column, on a solid backdrop (the page gradient behind its rounded corners, white inside) so nothing scrolled under it shows through. 104 px of room at the bottom for the call widget and the MOA chat; the left column gets 96 px while a call is on.
- Under 1100 px: the columns stack and the page scrolls, as before.
- Replaces the first pass (the column moved with the page and held; `v2Stick` now only resets both columns to the top on a new chart and calls `v2Fit`). Proof (headless Chrome, 1440 × 900 and 1280 × 800, `?nologin=1`, Gloria with Pending open and Greg with Medications open): wheel over the left column → left 400 px, main 0, page 0; wheel over the main column → main ~390–490 px, left unchanged, page 0; wheel up past the top of the left column → main unchanged; document height equals the window; cards 14 px inside the box at both sizes; accordion and inline checks ("At home in BC" → "1 check left") still work; the Sign off popover opens inside the window. Screenshot (local): `leftpanel-scroll.png` (plus `leftpanel-scroll-1280.png`, `leftpanel-scroll-main-*.png`, `leftpanel-scroll-greg-*.png`).

**Anatomy**
```
Patient card   name, New patient, age · sex · PHN, Allergies, Family doctor, Call + Full chart (16 px padding, tighter)
This visit     Phone · Callback 604-555-01xx (one line); "1 call · 00:04" after a call (quiet)
               checks as rows: done = tick, label, value on its own line (wraps; never truncated)
               open = label + one-tap answers:
                 Location: At home in BC | Elsewhere in BC (asks where) | Outside BC (asks where; raises the outside-BC notice)
                 ID verified: BC Services Card | Driver's licence | Name, DOB and PHN
                 Consent: Record verbal consent
                 Others present: No one | Someone (asks who and relationship)
               Location and Others present have "Change" until sign-off (asked on every call)
Patient summary (one card): Medications · History · Pending · Since you last saw · Previous visits
               accordion rows split by thin lines: icon, title 15 px semibold, grey count, status chip ("1 overdue"), chevron
               open row: soft grey background, content 14 px indented under the title (not indented at 1360 px and below)
```

**Rules**
1. One place records a check: `csApplyCheck(key, answer)`. The Sign off popover's forms (`csConfirm`) and the inline answers (`v2Ans`) both call it, so the state, the outside-BC notice, "N checks left" on Sign off and the Finalize gate are shared and update at once. Finalize and its gates are unchanged.
2. One summary row opens by itself per visit, never more: Pending when something is overdue (Gloria); Medications for a prescription renewal visit (Greg, "Rx renewal"); otherwise all rows start closed.
3. Rows are `button` + `aria-expanded` + `aria-controls` inside an `h4` (the card title is the `h3`). Inline answers are buttons in a labelled group; after an answer focus moves to the next open check, or to the card title.
4. Cards: 16 px padding, 12 px gaps, card titles 16 px semibold. Colour only for status (amber icon on an open check, the overdue chip).

**Floating call widget** (Ani, 6 Oct, same day: "the call state should NOT live inside the patient card")
- A dark ink pill, fixed at the bottom of the screen, 12 px left of the "Dolly · Your MOA" chat button and centred on it (moved from the top bar, Ani, 6 Oct: "floats bottom right, beside the MOA chat"): pulsing green dot, "On call · full name", live timer, the callback number, Mute, Hold (amber dot and a hold timer), Keypad (a small dark panel that opens upward) and End call (red, the only red). Buttons 40 px with aria-labels; Mute and Hold use `aria-pressed`. A polite live region speaks state changes only (started, muted, on hold, resumed, ended), never the timer. Reduced motion: no pulse.
- `position: fixed`, so it stays put while scrolling, on every tab and on every screen; `cwPlace` measures the chat button and sets its place (also on resize). The top bar keeps its page title during a call. While a call is on (`body.cw-on`) every screen gets 104 px of room at the bottom so nothing hides behind it; it never covers the tabs or Sign off (they are at the top). At 1280 px and below the callback number is dropped (name, timer and controls stay), so it never reaches the chat button. The name returns to that patient's chart. Screenshot (local): `call-widget-bottom.png` (plus `call-widget-bottom-1440-*` and `-1280-*` for chart, Home and Claims).
- The call belongs to its patient (`PC_CALL_WHO`): opening another chart no longer ends it. One call at a time: Call on another patient asks in the widget, "End the call with Gloria to call Greg?" (End and call | Keep call). Finalize or Mark no-show on another chart does not end it.
- End call: "Call ended · 04:12" for 3 seconds, then it goes. The card's button reads "Call again" (outline) and This visit keeps "N calls · mm:ss total". During the call the card shows only Full chart.
- Billing: the call's real start (first call) and end (last call) fill the coding Time (start and stop) unless the doctor changed the time by hand (a logged change). Same call and timer functions as before.
- Mute, Hold and Keypad are presentation in this demo; there is no telephony behind them.

**Proof (headless Chrome, light, 1440 × 900 and 1280 × 800, `?nologin=1`).** All nine inline scripts pass `node --check`; console clean. All eight charts open with no horizontal scroll, the column has `overflow: visible` and no clipping ancestor, no text under 14 px in it. Accordion rows open and close by keyboard (Enter); inline answers by keyboard. Gloria: Finalize with checks missing opens the location form in the Sign off popover; "At home in BC" → "1 check left"; "Someone" + "Daughter, …" → no checks left; the popover's own forms still work and update the inline rows. Auto-open: Gloria Pending, Greg Medications, others none. Call widget: started on Gloria, through all three tabs, scrolled, Home and Claims and back by its name; no overlap with the tab bar, Sign off, the MOA chat or the top-bar controls at either size; Greg's chart opened during the call (call kept), Call asked to switch, Keep and End and call both work; Mute, Hold (timer), Keypad, End; billing time moved from the demo 9:12–9:24 to the call's times; the no-show "Call again" starts the widget.

**Decisions made (Needs Ani to confirm)**
1. "At home in BC" records the place as "At home in BC" (not the last known town, which the demo takes from the pharmacy and may not be home).
2. Location options stack (three full-width rows) because three choices do not fit side by side in the 312 px column at 14 px.
3. During this patient's call the card's Call button is hidden (the widget is the call); afterwards it is "Call again" as an outline.
4. ~~The widget sits in the top bar~~ Moved to the bottom right beside the MOA chat (Ani, 6 Oct, second pass). ~~If the MOA chat panel is opened it can sit over the widget~~ Fixed in Batch A (5b): the widget moves beside the open panel.


## Batch A, 7 Oct

Lead brief, 6 Oct. Light only; v2 is the only chart layout. Screenshots (local only): `product/reports/shots/batchA-*.png`.

### 1. Critical result bar on every tab (safety)
- **Shows:** while the open chart has a critical result that is not reviewed, a slim bar hangs under the sticky tab bar, on Review, Note and Orders: critical symbol, "Critical · Troponin I **0.42 µg/L** · not reviewed", and **Review**. Two or more: "2 critical results not reviewed". Red only on the symbol and the value (the critical value stays the only red text).
- **Where:** attached to the tab bar (the tab bar loses its bottom corners, the bar takes them), so it sticks with it while the main column scrolls; the column's `scroll-padding-top` grows by the bar's height so focus is never hidden under it.
- **Review:** goes to the Review tab, brings that result's row into view (a short ring on the row; static with reduced motion) and puts focus on its own "Review result" button, so one Enter opens the review. It does not review anything by itself.
- **Gone:** as soon as the result's status is "reviewed" (set by the review screen: Accept & assign, or Done). A reviewed-but-not-signed-off critical stays in Needs attention as before; the bar is only about "not reviewed".
- **Data:** the items and tiers are `csNAItems` / `labTier`, unchanged. Nothing is re-tiered.
- **Accessibility:** `role="alert"` is set only the first time the bar appears for that chart and its set of criticals (then removed after 4 s), so switching tabs does not re-announce it. The Review button's name says what it reviews ("Review Troponin I").
- **Measures:** bar 52 px; Review is a 36 px compact outline button (same exception as the toolbar buttons: Needs Ani). Text 15 px.

### 2. Next patient after sign-off
- **Shows:** right after a successful Sign off & finalize, the Sign off popover closes and a calm card leads the main column (above the tab content, on any tab): a quiet green tick, **Visit signed off**, then "Next: **Andrey Abushakhmanov** · 8:00–10:00 · Phone", with **Open chart** (primary) and **Back to Home** (outline). Nobody left: "That's everyone for now." and Back to Home only.
- **Paths:** Sign off & submit claim (the card is there under the code check; focus comes to it when the check closes, whether the code is entered or cancelled), Finalize, submit later, and private pay's Sign off & finalize visit. All of them go through `finalizeVisit` and its gates (checks, empty note, template text, undecided AI text, problem-list suggestions), unchanged; the card appears only when the visit actually became signed off.
- **Who is next:** `qNext()`, the queue's own rule and the same one the popover's Next patient button uses (the row marked "next", else the first waiting row in queue order). Window from `winLabel`, mode from the visit (Phone).
- **Behaviour:** focus moves to the card's heading. Open chart opens that chart (on its usual start tab); the card goes when another chart opens. A signed-off chart opened later shows only the existing "Signed off" header.
- **Measures:** buttons 44 px, text 15 px, heading 18 px.

### 3. Collapsed sidebar (every screen)
- **Badges:** with the rail collapsed, each count shows again as a small red badge on the icon's top-right (Claims, Tasks, and Inbox when it has one): 22 px, 14 px bold, ringed in the page colour. It mirrors the label's own badge (hidden with the label) through a MutationObserver, so any screen that changes a count changes both. Display by exception: no badge when the count is hidden.
- **Floating label:** the browser tooltip (`title`) is gone in the collapsed rail. One dark label (`#nav-tip`, `position: fixed`, outside the rail, 14 px/600, with the count in a pill) appears beside the icon on hover and on keyboard focus, for the nav items, the expand button ("Expand sidebar") and the demo walkthrough button. Leaving, a click, Escape or scrolling hides it. It is `aria-hidden`; the button's accessible name carries the name and count ("Claims, 13").
- **No black slice:** nothing is added in the button's flow, so the buttons stay 46 × 46 and the active highlight stays the dark circle (measured: width 46 on hover, active and focus).
- **Expanded:** unchanged (badges beside the labels, titles restored on the expand button).

### 4. Keyboard shortcuts
- **In a chart:** 1 / 2 / 3 = Review / Note / Orders (focus goes to the tab); C = Call (the patient card's Call or Call again, or the no-show banner's Call again; during a call it focuses the floating call widget instead of starting anything); ⌘/Ctrl+Enter = opens the Sign off & finalize popover (focus on the first missing check; it never signs, so every gate and the code check stay); ⌘/Ctrl+S = Save draft (the browser's Save page is prevented only on the chart; a signed-off note says it is read-only). Escape keeps closing drawers and the popover, as before.
- **Anywhere:** G then H / C / E / T / I (within 1.5 s) = Home / Claims / Earnings / Tasks / Inbox; ? = the shortcuts drawer.
- **When they fire:** plain keys only when focus is not in a text field, select or editable area, with no ⌘, Ctrl or Alt held, and never while a drawer, the code check or another overlay is open (1 / 2 / 3 and C also wait while the Sign off popover is open). ⌘/Ctrl+S and ⌘/Ctrl+Enter work on the chart from anywhere except other text fields; they also work from the note itself, so the doctor can save or sign off without leaving it. Other browser combos are untouched.
- **Shortcuts drawer:** the shared side drawer (focus in, trap, Escape, focus back), two lists (In a chart, Anywhere) with key caps (14 px) and plain descriptions (15 px). ⌘ on a Mac, Ctrl elsewhere. A discreet "Keyboard shortcuts" item (Mage keyboard icon) in the profile menu opens it too.

### 5. Small fixes
- **(a) Refused claim dates.** Checked every claim with an MSP response (refused, disputed, adjusted, held, closed) and every claim waiting for submission: the Claims list (each tab and All), the claim drawer (header chip, MSP response, deadline line, "How we count this") and the chips all read the same refusal date and days left from one source (`c.msp.on` through `t23LastDay` / `t23DaysLeft`). Behdis Maleki's refused claim (12 Sep visit) reads **Refused 29 Sep · 86 days left** (last day Mon 28 Dec) in the list, the drawer and the chip. No change was needed in the portal. The "Refused 26 Sep · 83 days left (to 25 Dec)" wording is in `product/specs/billing-redesign.md` (lines 358–359, 719, 753), not in the portal; the billing portal (`b06`) also uses 29 Sep. The spec needs its owner to update it (Needs lead).
- **(b) MOA chat panel and the call widget.** While the chat panel is open and would overlap the floating call widget, the widget moves to the panel's left, bottom-aligned as before (1440: widget 542–1004, panel 1016–1416; 1280: 382–844 vs 856–1256); when the panel is dragged so there is no room beside the rail, the widget sits 12 px above it. It slides back when the panel closes (0.18 s; none with reduced motion). Re-placed on open, close, drag and resize.

### Proof (headless Chrome, light, 1440 × 900 and 1280 × 800, `?nologin=1`)
All inline scripts pass `node --check`; the console was clean in every run. Gloria: the bar on Note, Orders and Review, still in place with the main column scrolled 400–500 px; Review from the Note tab → Review tab, focus on "Review result" for Troponin I (in view); Accept & assign and back → the bar is gone. Sign-off: Andrey (Finalize, submit later), Carol-Anne (Sign off & submit claim, code check, then the card with focus), Greg (private pay), Gloria end to end (critical reviewed from the bar, checks, note, problem-list suggestions dismissed) → "Next: Andrey Abushakhmanov · 8:00–10:00 · Phone", Open chart opens Andrey; with no one waiting → "That's everyone for now", Back to Home. Rail: badges Claims 13, Tasks 1 (and they follow a changed count), floating label on hover and keyboard focus, buttons 46 px on hover, active and focus, no black slice. Shortcuts: 1/2/3, C (call starts; during a call focus moves to the widget), ⌘S (Draft saved), ⌘Enter (popover opens on the first missing check, nothing signed), Escape, G then C/E/T/I/H, ?, the profile menu item; typing "1cgh" in the note only types. Screenshots: `batchA-critical-note.png`, `batchA-next-patient.png`, `batchA-rail.png`, `batchA-shortcuts.png` (plus `-1280` versions).

### Needs Ani
1. The bar's Review button and the compact buttons are 36 px (the bar is meant to be slim); 44 px would make the bar 60 px.
2. The bar shows only "not reviewed" criticals. A critical that is reviewed but not signed off stays in Needs attention only. OK?
3. Single-key C starts a call straight away (calls go outward only). Keep, or ask first?
4. The "Visit signed off" card stays at the top of that chart until another chart opens (no close button). OK?


## Batch B, 7 Oct

Lead brief, 6 Oct. Light only; v2 is the only chart layout. Screenshots (local only): `product/reports/shots/batchB-*.png`.

### 1. Structured note (Note tab)
- **Shows:** one compact card with four rows, top to bottom: **Reason**, **Findings**, **Assessment**, **Plan**. Label on the left (15 px/600, 120 px; 104 px at 1360 px and below), the field on the right, a hairline between rows, the row tints grey while you type in it. Each field starts one line tall (44 px) and grows with its text (no inner scroll). Placeholders: "Why the patient is seen today", "History, exam, readings", "Your assessment", "Treatment, follow-up, safety netting". Tab order runs top to bottom (each section's AI buttons and the diagnosis control sit right after their field).
- **AI in Reason:** the intake suggestion ("Chest pressure on exertion for 3 days, eased by rest." for Gloria) sits inside the Reason row with the same label, "AI suggestion · not in your note until you accept", its source and **Accept** / **Reject**. Nothing enters Reason until Accept; Reject adds nothing.
- **Scribe (same consent flow):** the scribe no longer writes one draft. Its blocks arrive in their sections as they are drafted: SUBJECTIVE and BACKGROUND in **Findings**, ASSESSMENT in **Assessment**, PLAN in **Plan**, each marked "AI draft from the call · not in your note until you accept" with **Accept**, **Edit** (the draft opens in an editable box with **Add to note** and **Cancel**; still nothing is inserted until Add) and **Reject**. Never auto-inserted. While a critical result is not reviewed, Assessment and Plan show "AI draft held back · Not drafted. Troponin I 0.42 µg/L is critical and not part of this conversation. Assess with the result before writing the …" with no Accept (doctor review ask 1, unchanged rule). While the scribe listens, one quiet line above the note says its suggestions appear in each section.
- **Insert** goes into the section the doctor was last in. With no section used yet: Normal exam → Findings, Follow-up template → Plan, Reading from patient → Findings. Insert → **Diagnosis** opens the Assessment diagnosis search. Other note lines keep a fixed home: a renewal sent from Prescribe → Plan; a medication started elsewhere and an expected outside result → Findings.
- **Diagnosis in Assessment:** under the Assessment field, **Add diagnosis** ("ICD-9, for the claim") opens the same ICD-9 search as Your coding (one shared result list, `t23DxList`: BC MSP list, results only after typing, exact code → common → rest, leaf codes only, arrow keys and Enter, "Can't find it?" link; Escape or Cancel closes). The pick shows as a chip, "786.5 · Chest pain" (tag spec 15 px/500, 40 px, barely tinted, no stroke) with a remove ×, **Change**, and "The claim's diagnosis · also in Billing". It **is** the claim's diagnosis: one value (`T23.visit[name].dx`), so the billing row and Your coding update at once, and a change in Your coding (or the claim drawer) updates the chip. After sign-off the chip is read-only and shows the claim's diagnosis. Private pay and no-show visits show no diagnosis control (no MSP claim).
- **Visits start with no diagnosis.** The diagnosis used to be pre-filled from the booking reason (Gloria's "Follow up — chest pressure noted" → 786.5): a guess the doctor never chose. Now the doctor picks it (Needs Ani).
- **Sign off & submit claim** needs no separate diagnosis step when Assessment has one. Without one it closes the Sign off popover, goes to the Note tab, opens the Assessment search and says "Add the diagnosis in Assessment to submit the claim, or choose Finalize, submit later". Finalize, submit later still closes the visit without one (billing never blocks the clinical sign-off).
- **Gates (`finalizeVisit`, same confirm pattern as the old empty-note rule):** "Assessment and Plan are empty." / "Assessment is empty." / "Plan is empty." + "Sign off and finalize the visit anyway?" with **Keep writing** (goes to the first empty section) and **Sign off anyway**. Template text in any section still stops sign-off. Undecided AI text anywhere stops it: "The AI suggestion in Reason you haven't accepted will not be filed …" (or "text in Reason and Findings").
- **Note tab mark:** the badge counts AI sections waiting for Accept or Reject; the tick needs Assessment **and** Plan written (Reason may be accepted AI text).
- **Save draft** (button, ⌘/Ctrl+S from any section, and every keystroke) keeps all four sections (`{reason, findings, assessment, plan}` in session storage). A draft saved before this change (one string) opens in **Findings**, so nothing is lost. Signing off keeps the four sections on the signed record; the signed note shows them read-only.
- **No-show:** one field, "Note", with "Note the attempt (optional)."; Reason, Assessment, Plan and the diagnosis control are hidden.
- **How it is built:** `#vc-note-input` stays as a hidden mirror holding the composed text ("Reason:\n…\n\nFindings:\n…", plus "Diagnosis (ICD-9): …" under Assessment) so the template-text gate and the signed record read one string; every writer goes through `nsAppend(section, text)`. Also fixed: the scribe panel's transcript, counts and rules were 11.5–13.5 px; now 14 px.

### 2. Change log on each claim
- **Every edit is logged, one entry per field:** fee code (with the amount when it changes: "Changed fee code 13737 → 13738 (counselling, 24-min call) · amount $48.76 → $97.52"), diagnosis ("Added diagnosis 786.5 · Chest pain", "Changed diagnosis 786.5 → 413", "Removed diagnosis 413"), start and stop time ("Changed start time 9:12 AM → 9:05 AM"), and the counselling switch. Who and when on every entry. The same helper (`t23ChangeList` → `t23LogEdits`) runs for the Assessment chip, Your coding (from the billing row, the Insert menu or a claim), the claim drawer's Change and the counselling switch on the billing row or the claim drawer.
- **Before sign-off** the entries sit on the visit's coding and travel onto the claim when sign-off creates it, so the claim's history starts with them.
- **Billing row:** a small text link, **Edited · 2 changes** (clock icon, 14 px/600, 36 px), only when there has been at least one edit (display by exception). Before sign-off it opens the claim drawer as "Today's claim · Not created yet" (Your coding with Change, then History); after sign-off it opens the claim's own drawer. Both scroll to **History** (expanded) and put focus on its heading, which also shows "N changes".
- **History entries** read what happened first, then "who · when" on a quieter line (Dr. Pannozzo · 3 Oct 9:31 AM; Japneet · billing agent; MSP; SimpleCare), newest first, collapsed after five (Dev's event-type labels, unchanged). There is no live billing-agent edit path in the physician portal; the agent's entries in the demo stories now read "Japneet · billing agent".

### Proof (headless Chrome, light, 1440 × 900 and 1280 × 800, `?nologin=1`)
All 11 inline scripts pass `node --check`; the console was clean in every run. Gloria: Reason suggestion Reject (Reason stays empty) and Accept (Reason filled, Note badge clears); typed Findings, Assessment and Plan (Note tick appears only once Assessment and Plan both have text); Insert with Findings focused adds "Normal exam:" to Findings, with Plan focused adds "Follow-up template:" to Plan; Add diagnosis → "chest pain" → Enter → chip "786.5 · Chest pain", billing row "786.5 · Chest pain", Your coding "786.5 · Chest pain"; in Your coding "angina" → 413 and start 9:05 → chip "413 · Angina pectoris", billing row "413 · Angina pectoris · 9:05–9:24 AM (19 min)", "Edited · 3 changes" → History "Changed start time 9:12 AM → 9:05 AM", "Changed diagnosis 786.5 → 413", "Added diagnosis 786.5 · Chest pain"; signed off (Finalize, submit later) → the claim's history keeps the three plus "Visit signed off; claim created"; a later change on the claim (413 → 786.5) updates the read-only chip and adds a fourth change. ⌘S from Plan saves all four sections; Andrey: chart switching keeps each patient's draft; a one-string draft opens in Findings. Gates: "Assessment and Plan are empty", then "Plan is empty", Keep writing → Plan; Sign off & submit without a diagnosis → Note tab, Assessment search focused. Scribe: Findings suggestion with Accept / Edit / Reject (Edit → Add to note inserts the edited text); with the critical unreviewed, Assessment and Plan show "AI draft held back" with no Accept; with it treated as reviewed, Assessment Accept and Plan Reject work. Tab order Reason → its AI buttons → Findings → Assessment → Add diagnosis → Plan. No text under 14 px in the chart, the Assessment search, Your coding or the claim drawer; no horizontal scroll at either size; all eight charts open with the four sections. Screenshots: `batchB-note.png`, `batchB-diagnosis.png`, `batchB-history.png` (plus `batchB-history-visit`, `batchB-scribe`, `batchB-diagnosis-search-1280`, `batchB-note-1280`, `batchB-history-visit-1280`).

### Needs Ani
1. Visits now start with **no diagnosis** (it was pre-filled from the booking reason). Every MSP Sign off & submit therefore asks for one in Assessment first. OK, or offer the reason's code as a one-tap suggestion?
2. Empty Assessment or Plan is a **confirm** ("… Sign off and finalize the visit anyway?"), the same pattern as the old empty-note rule. Should it be a hard block instead?
3. Insert → Diagnosis opens the Assessment search rather than Your coding.
4. History times use the demo date (3 Oct, the billing "today") with the real clock time, like the existing claim history.
5. The **Edited · N changes** link and the Assessment Change / Add diagnosis buttons are 36 px compact buttons (same exception as the toolbar).

### Needs Daniel
- Should the scribe's BACKGROUND block go in Findings (as built) or in Reason?
- Should the history name a physician assistant who edits a claim, or the supervising doctor? (Dev's open question 11; the demo has no PA edit path.)


## Chart tab, 7 Oct

Ani, 7 Oct: the separate **Full chart** page ("Full chart", "Search the chart", "Back to the visit", nine tabs) "feels awkward because it replaces the whole visit". It is now the visit's 4th tab: **Review · Note · Orders · Chart**. Light only. Screenshots (local only): `product/reports/shots/charttab-results.png`, `charttab-timeline.png`, `charttab-seeall.png`, `charttab-icd-suggest.png` (plus `-1280` versions).

### 1. The Chart tab
- **Shows:** "Search the chart" (a full-width field, 44 px) at the top, then the chart's sections as a compact pill row (36 px, 15 px/500; 14 px at 1360 px and below so the eight fit on one line at 1280; the current section is the barely tinted blue pill, smaller than the main tabs' underline): **Timeline, Results, Medications, Problems, Care plan, Consults, Documents, Messages**. Under it, the section itself.
- **Same content, same functions:** the tab holds the full chart's own node (`#cs-fc`, moved into `#v2p-chart` by `v2Mount`), so Results keeps its trend lines, PDF links, "Not cleared" and **Add an expected result**; the care plan keeps Review & assign, Chase their office, Add plan item; Problems keeps Open list; Consults, Documents and Messages are rendered by `csRenderConsults` / `csRenderDocs` / `csRenderMsgs` as before. No clinical logic was copied or changed.
- **Search** (the old Search sub-tab merged into the field): two letters or more searches the text of every section and shows the results **in place** of the section ("N results for "x" across the chart", section name beside each hit, **Clear search**); no pill is selected while results show. A result opens its section, brings the matching line into view with a short ring (static with reduced motion) and puts focus on it. Enter in the field moves to the first result; Escape (or Clear search, or picking a pill) goes back to the section. Nothing matching: "Nothing in this chart matches. Try another word." A polite live region says the count. A search never carries over to another chart.
- **Remembers its section per chart** (`CS.fcTabBy[name]`): Timeline the first time; switching charts and coming back opens the section that chart was last on.
- **Older content brought to 14 px inside the tab:** the timeline pills (13 px), lab orders (legend, facts, labels 10.5–13.5 px), care plan "Why this is ours" (12.5 px) and problem goals (13 px). Only inside the Chart tab; their other screens are unchanged.

### 2. The doctor never leaves the visit
- The patient card, This visit, Patient summary, the floating call widget, the critical result bar, Save draft and Sign off stay on the Chart tab exactly as on the other three (all in the same frame). The critical bar's Review goes to the Review tab as before. Sign off opens its popover from the Chart tab.
- **Keyboard:** 4 = Chart (and it is in the shortcuts drawer: "Chart tab (the full chart)"). Same rules as 1/2/3: never while typing (note, search field, any field), with a drawer or the Sign off popover open, or with a modifier. On a no-show, 3 does nothing (Orders is hidden); 4 still opens Chart. Left/Right/Home/End move across all four tabs.
- **Fit:** with four tabs, Save draft is icon-only up to 1500 px (its name stays for screen readers and on hover; it was icon-only at 1360 px and below), and at 1360 px and below the tabs are tighter and Sign off reads "Sign off · N checks left" (the button's name and the popover heading keep "Sign off & finalize"). Measured gap between the last tab and Save draft: 73 px at 1440, 63 px at 1280 (49 / 39 px with the Orders badge).

### 3. Entry points
- The patient card's **Full chart** button is now **Chart** and opens the Chart tab on the section that chart was last on (focus on the Chart tab).
- Each **Patient summary** row ends with a small **See all** (14 px/600, blue, chevron; inside the opened row, at its end) that opens the Chart tab on the matching section, focus on that section's pill: Medications → Medications; History → Problems; Pending → where most of its lines point (Care plan for the demo patients, since the pending items are care-plan items; the rule picks another section only if most lines open it); Since you last saw → Timeline; Previous visits → Timeline (it holds the visit notes and consults in date order).
- Every other path that opened the full chart now opens the Chart tab on the right section: each line in Medications, History, Pending, Previous visits and Relevant investigations (`v2Line`, Home BP → Results), **Read the Jun 25 note** → Documents, **Full care plan** (`slvToCarePlan`) → Care plan, "Review them in the care plan" in Consults → Care plan. They all go through `csOpenFull(tab)`, which in v2 now means "Chart tab, this section".
- **Not changed:** Needs attention's Review result / Review ECG / Open result and the critical bar's Review open the **review screen** (`openReview`), not the full chart, as before. The Assistant has no link into the full chart. Open intake still opens the intake brief.

### 4. The separate screen is gone
- No "Full chart" page, title or **Back to the visit** button. `csOpenFull` is kept (re-pointed to the tab); `csCloseFull` is kept for its old callers (opening a chart, the layout switch, Go to needs attention) and does nothing in v2, because there is nothing to close. Escape on the Chart tab no longer "goes back" (it clears a search, closes drawers and the popover as before). `?chart=current` still works with its old full chart (Escape returns), not checked further.
- No-show visits (K Arli Eyre, Korynn) get the Chart tab too, read-only context like the rest of their chart.

### 5. Suggested diagnosis (Batch B, Needs Ani 1)
- When the booking reason maps to an obvious code, Assessment offers it above Add diagnosis: a tag "**Suggested: 786.5 · Chest pain**" (15 px/500, 40 px, grey tint, no stroke), **Use** (44 px outline with an icon) and "From the booking reason". **Never pre-filled:** the claim has no diagnosis until the doctor presses Use (or picks another). Use sets the claim's diagnosis through the same `t23SetVisitDx` as the search (so the chip, billing row, Your coding and the change log all follow) and focus goes to Change. Removing the diagnosis brings the suggestion back. Signed-off, private-pay and no-show visits show none.
- **Map (existing data):** T-023's old pre-fill (`dxBy`, removed in Batch B), kept only where the reason names the problem: "Follow up — chest pressure noted" → 786.5 Chest pain (Gloria), "Yeast infection" → 112.1 Candidiasis of vulva and vagina (Carol-Anne), "Rx renewal" → V68.1 Issue of repeat prescriptions (Greg; private pay, so not shown). Generic reasons ("Follow up appointment" → V67.9, "Lab follow-up" → V72.6, "Standard visit") get no suggestion. All three codes are in `assets/data/bc-msp-diagnostic-codes.json` (checked 7 Oct).

### Proof (headless Chrome, light, 1440 × 900 and 1280 × 800, `?nologin=1`)
All 11 inline scripts pass `node --check`; the console was clean in every run. All eight queue charts: the Chart tab and each of the eight sections render (one section visible at a time), no text under 14 px in the chart screen, no horizontal scroll (page, main or left column); search "mg" shows results in place with no pill selected, a result opens its section with focus on the line, "zzqx" shows the empty line, Clear search returns; every visible See all lands on its section with focus on the pill. Gloria: card Chart → Chart tab; a Relevant investigations line → Results; Read the note → Documents (Visit note · Jun 25); a medication line → Medications; Full care plan → Care plan; `csCloseFull()` leaves the tab; no Back to the visit and no "Full chart" heading anywhere; section memory (Gloria Results, Andrey Timeline then Problems, each kept on return); key 4 → Chart, 2 → Note, 4 typed in Findings and 1 in the search field do nothing; shortcuts drawer lists 4; critical bar shown on Chart, its Review → Review tab; call widget on the Chart tab, not over the MOA chat; Sign off popover opens inside the window; suggestion "Suggested: 786.5 · Chest pain" with no diagnosis set, Use → chip, billing row 786.5, focus on Change; remove → suggestion back; Carol-Anne 112.1, Andrey and Behdis none. `?chart=current`: its full chart opens, search works, Escape closes, switching layouts both ways keeps the node in place.

### Needs Ani
1. **See all** sits at the end of each opened Patient summary row, not in the row header: at 280–312 px the header (icon, title, count, overdue chip, chevron) has no room for it without truncating. OK, or always visible?
2. Pills are 36 px (compact, like the toolbar exception), 15 px, and 14 px at 1360 px and below so the eight sections fit one line at 1280.
3. To fit four tabs, Save draft is icon-only up to 1500 px, and at 1360 px and below Sign off reads "Sign off · N checks left".
4. Pending's See all opens Care plan (where the demo's pending items live), not Results.
5. The suggestion uses the old booking-reason map for three reasons only; "Follow up appointment" → V67.9 is not offered (not "obvious"). Daniel may want a different list (Needs Daniel if it grows).
