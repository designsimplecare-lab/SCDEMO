# Chart, version 2: brief (Ani, 4 Nov 2026)

Ani asked for a second version of the patient chart built on the mental model **Understand → Review → Decide → Document → Sign off**,
from a redesign brief she pasted (summarised below). It lives **inside the one main file** as a switchable chart layout, so the current
chart (version 1) and version 2 can be compared on the same data. No separate file.

## The brief (Ani's, summarised)
- A purpose-built clinical workspace, not a reskin: rethink hierarchy, layout and interaction; preserve every function.
- Prioritise clinical clarity, hierarchy over cards, context over duplication, progressive disclosure, efficient workflows, clinical safety.
  Never remove clinically relevant information to look cleaner.
- **Three zones:**
  - **Compact patient header** (persistent): name, age and sex, patient identifier, allergies, relevant alerts, encounter status,
    primary action Call.
  - **Left: encounter workflow navigation** with a clear active state; counts only when meaningful; no decorative badges.
  - **Center (most of the width):**
    1. **Clinical alerts** on top: critical, abnormal, items needing review; severity hierarchy (critical red, warning amber, normal
       neutral) not by colour alone; each with name, value, reference range, severity, date and time, a review action; no big card per result.
    2. **Clinical context / AI chart review:** concise, sourced, clearly marked as Cedar, expandable, no duplication.
    3. **Documentation** as the primary working surface; Cedar suggestions inside the relevant section with Accept, Edit, Reject and
       Regenerate; Cedar text distinct from clinician text; autosave and draft status; Save draft and Sign off always reachable.
  - **Right: contextual patient information** as a compact, collapsible panel or drawer: Intake summary, Medications, Allergies, Past
    medical history, Investigations, Pending orders, Previous encounters. Counts only when useful. It must not compete with the note.
- **Visual:** white and light neutral surfaces, subtle borders instead of shadows, few rounded cards, clear type hierarchy, 8px spacing,
  restrained blue for primary actions, semantic colour only for clinical states, few decorative icons, dense but calm.
  Suggested palette: background #F7F8FA, surface #FFFFFF, text #202936, secondary #667085, borders #E5E7EB, primary #4559D8,
  critical #D92D20, warning #DC9A24, success #16865B.
- **Interaction:** the workflow stays visible; little scrolling between related tasks; critical findings immediately reachable; desktop
  workstation resolutions first; keyboard efficient; loading, empty, error and completed states.
- **Engineering:** reuse the existing components, data and logic; shared tokens; no duplicated UI; no new mock data where data exists;
  nothing breaks.
- **Second pass:** evaluate as a practising physician, find the five biggest remaining sources of cognitive load, extra clicks or
  interruptions, and refine without hiding clinical information.

## Where the brief meets decisions already made (these win)
| Brief says | We keep | Why |
|---|---|---|
| MRN / patient identifier | Masked **PHN** | BC; Daniel's portal |
| Note sections Chief complaint, HPI, ROS, Exam, Assessment, Plan | **Clinical concern, Subjective, Objective, Assessment, Plan** as one continuous note; no ICD-9 picker in the note | Daniel, 11, 12 and 18 Oct ("one big note"; the ICD-9 code is billing) |
| Chart review includes relevant history and previous findings | **Who this patient is** and **Medications and what they treat**; history, investigations and pending live only in the patient context | Daniel, 31 Oct ("no repeat"); Ani, 3 Nov |
| Workflow: Overview, Clinical review, Documentation, Orders, Sign-off | **Review · Note · Action · Sign off** (four steps; Review holds alerts and Cedar's chart review) | Daniel's words in the demo; "Action" also holds Task and Note to patient, which are not orders |
| Warning amber, critical red | Same; red only for critical values and their icon | Ani's rule |
| Palette | The SimpleCare Paper tokens, nudged toward the brief's values where they agree | One design system |
| — | Light mode only; no uppercase; text at least 14px; buttons at least 44px; Cedar never decides (doctor signs); no explaining text in the UI | Ani's rules |
| — | Every Cedar line respects its per-area switch (T-038) | Daniel, 18 and 31 Oct |

## 4 Nov: Version 2 built
Built by the `ux-designer` agent on 4 Nov, commits `20f4fa3` (switch and skeleton), `0d6cdfa` (header and nav), `00928e7` (centre), `04d41e0`
(patient context), `af5dc02` (visual), `c3ef9c5` (responsive) and `b090284` (fixes from the verification run). Light only, headless Chrome, `?nologin=1`.
Screenshots are local only.

### What was built
- **The switch.** Profile menu, "Chart layout": Current or Version 2 (a radio group; arrow keys; 44 px rows). `?chart=2` opens Version 2 for a
  shared link (`?chart=1` forces Current). Otherwise the viewer's choice is kept in this browser (`sc-chart-version`). Default: Current.
- **How it shares the code.** Version 2 is the class `chart-v2` on `#pcv-c`, plus three slots: `#cv2-hd`, `#cv2-nav`, and the panel bar and rail in
  `#v2-side`. `cv2Mount()` moves the existing nodes into them (patient card, step bar, Save draft, draft status), and `cv2Restore()` moves them back.
  Every render, drawer, Cedar switch, note gate and sign-off function is the same one in both layouts. The only shared markup changes are spans
  that Current hides: in `csNARowV2`, the severity word, the received time and a finding wrapper. `nsAIHtml` shows Edit on the intake suggestion
  only when Version 2 is on.
- **Header** (72 px on all 8 demo charts at 1440, one row):
  - the name;
  - age, sex and masked PHN, with the quiet no-allergies tick;
  - the allergy band when an allergy is named or unrecorded;
  - the alerts, as a word and a count ("1 critical, 1 to review", from the same items as Needs attention), which go to the alerts;
  - the visit status (In queue, On call, Signed, No-show and the other status words), so the top line no longer repeats it;
  - Call (split, caret) as the primary, and Chart as the outline secondary.
- **Left nav** (200 px):
  - Review, Note, Action and Sign off, with the existing counts, including the red count on Review (T-039);
  - the same click and scroll-spy behaviour, and Up and Down move between steps;
  - Save draft and "Draft saved · 10:30 AM" (the existing `csDraft` status) at the bottom.
- **Centre:**
  - Needs attention as dense single rows: severity word and icon, finding and value with the LifeLabs word, reference interval, time received,
    and Review. There is one quiet column header, and the rest of each result stays behind Show all.
  - Cedar's chart review, unchanged.
  - The note, with Daniel's five sections. Each Cedar suggestion offers Accept, Edit and Reject.
  - Then Action and Sign off.
- **Right, the patient context:**
  - It reuses the Patient summary renderers, and adds Allergies and Previous encounters (from `PT_LAST`, via `kfVisits`) from data the chart
    already has.
  - It is open by default at 1440 px and wider, and collapsed to a 56 px rail below that; the doctor's choice is remembered (`sc-cv2-ctx`).
  - The rail has one button per section, with a dot when the section has an exception chip ("Pending, 1 overdue").
- **Visual (Version 2 only):**
  - a flat #F7F8FA page, white cards with 1px #E5E7EB borders, 8px radius, no shadows;
  - ink #202936 and #667085;
  - red #D92D20 on critical icons;
  - amber #DC9A24 on warning icons only;
  - brand blue unchanged.

### Decisions beyond the brief (for Ani)
1. **Breakpoint at 1200 px, not about 1100.** It is the breakpoint the current chart already uses for its scroll boxes (`v2Wide`, `v2AutoOpen`), so
   both layouts switch at the same width. From 1201 px the chart has three columns; at 1200 and under it stacks, with the horizontal step bar and
   the patient context as a drawer.
2. **The app nav folds to icons from 1201 to 1440 px on a Version 2 chart.** This is Ani's rule for the first 4 Nov layout ("so the center stays at
   least about 600px"). Pressing Collapse or Expand stops it. Centre: 770 px at 1440 (panel open), 854 px at 1280 (rail).
3. **The panel is titled "Patient summary"**, the chart's existing term, and not "Patient context".
4. **The Review step's heading is kept for screen readers only.** The nav already shows the step, and this brings the Note heading up by its height.
5. **Allergies show in the header and in the panel.** The header gives the state, the panel the detail. Previous encounters lists one visit per
   patient, because the demo has one.
6. **Edit on the intake suggestion is Version 2 only, and there is no Regenerate.** The code has no second draft to offer.
7. **Sizes fixed inside Version 2 only.** Four shared parts were under Ani's sizes: the billing row's labels and Suggested tag (13 and 12 px), and
   Cedar, Insert, Change and See all (30 to 36 px). They are fixed in Version 2 only; Current still has them.

### Measurements
Where the Note heading starts, in px from the top of the window. Version 2 is the default state of a fresh browser.

| Chart | V2 1280 × 800 | V2 1440 × 900 | Current 1280 × 800 | Current 1440 × 900 |
|---|---|---|---|---|
| Gloria | 744 | 766 | 765 | 734 |
| Andrey | 464 | 464 | 488 | 488 |
| Carol-Anne | 615 | 615 | 630 | 630 |
| Behdis | 615 | 615 | 630 | 630 |
| Arli | 576 | 576 | 604 | 604 |
| Greg | 464 | 464 | 488 | 488 |
| Manjit | 464 | 464 | 488 | 488 |
| Korynn | 576 | 576 | 604 | 604 |

All 16 Version 2 positions are visible without scrolling. Gloria at 1440 is lower than Current, because the panel is open and the ECG line wraps.

**Verification:**
- Version 2, all 8 charts at 1440 × 900:
  - no console errors;
  - the seven Action drawers open, close with Esc, and return focus to their row;
  - Cedar Reject and Accept work;
  - Sign off works on the 6 open visits (the header turns to Signed);
  - switching layouts mid-chart keeps the note text.
- No horizontal scroll from 1024 to 1920 px.
- Current: a pixel compare of all 8 charts against `c286a13` shows only sub-pixel text on the reference line.
- Harness: 42/129 in Current, and 42/129 with Version 2 forced through the run's browser profile; the same 42 checks as before.

### Not done, and open
1. **The second pass in the brief** ("evaluate as a practising physician, find the five biggest remaining sources of cognitive load") was not run.
   It is a task for the `doctor` agent on Version 2.
2. **Regenerate** for Cedar suggestions needs a second draft from Cedar (AI Chart Assist delivery, B-007).
3. **Needs Daniel:**
   - Is the header's alert word ("1 critical, 1 to review") enough on its own, beside the red count on Review?
   - Should the status show the call window too?
4. **Local server.** It returned 404 for `assets/` files (photos and the MSP code list), so "Add diagnosis" could not search codes. Sign off was
   tested through "Submit later" on visits with no suggested diagnosis. This is the environment, not the layout.
