# Finding any patient's chart: Phase 0 and 1 wireframes in the demo

Source: Daniel's "Finding Any Patient's Chart, Specification Version 2.3" (5 Nov 2026), kept in git-ignored `private/requirements/`.
It names Ani as owner of "Phase 0 and 1 wireframes, including safe-mode limits", one of the items needed before the Phase 0 release.
Daniel raised the question on the 4 Nov call (00:30:55): "is there an evidence-based way of accessing a patient's chart very
quickly?" (`from-daniel/2026-11-04-meeting-chart-version-2-review.md` §9). Ani asked for it on 5 Nov.

**Principle (spec):** recognition over recall. The doctor gets a short list of candidates with their evidence and any conflicting
clues, and chooses one. Search never opens a chart by itself, and never signs, submits, changes a status, bills, orders or sends
anything.

## What the demo shows (Phases 0 and 1 only)
- **One search control**, reachable from the day sheet, the chart, the Inbox and the worklists, opened with **Ctrl+K / ⌘K**.
  - Identity matches update while the doctor types; plain-language queries run on Enter.
  - A result under the pointer or keyboard focus never moves.
- **Clues** it understands:
  - **Exact or partial:** PHN, name, date of birth.
  - **Fuzzy:** nicknames, typos, and approximate names, sounding alike or misspelled.
  - **Approximate:** "I think 1985", or a year range.
  - **Negative:** "not Gloria".
  - **Basic visit circumstances:** visit date, clinician, pharmacy.
  - Clinical and narrative clues ("man from Trail with rash last fall") are Phase 2 and later. The demo shows them as not yet
    supported and does not fake them.
- **Candidate card:**
  - **Identity:** recorded full name, date of birth, one more identifier (PHN masked to its last digits), last visit date and a
    chart-state label.
  - **Context:** one short, sourced context line, only where authorized.
  - **No invented summary:** if there is no verified clinical summary, the card says so.
- **Grouping and ranking:**
  - **Groups:** today's day sheet, recently opened or assigned, then other patients.
  - **Strong matches first:** a stronger match is never hidden in a lower group, and an exact identifier outranks recency.
  - **Day-sheet badge:** a patient on today's day sheet is flagged.
- **Narrowing:**
  - Exclusions, approximate years, "I think" clues.
  - One question at a time, with "Not sure" and "Neither" answers.
  - **Conflicts shown:** e.g. two patients sharing a surname, address and phone are both shown with what tells them apart; the system
    never silently picks one.
- **Selection:** a deliberate click or Enter on a card opens the chart. A query that looks like an exact identifier still needs that
  selection. The chart opens with its identity banner (the existing patient header).
- **Chart states** (spec §8), each with a prominent label:
  - **Active:** normal.
  - **Inactive or transferred:** viewing allowed. New prescriptions, orders and referrals are blocked until staff reactivate the
    chart.
  - **Deceased:** prescriptions and clinical drafts blocked.
  - **Merged:** the old record redirects to the surviving chart with a notice, and identity is confirmed again.
  - **Suspected duplicate:** shown separately with a warning, never merged or picked.
- **Screen-share safe mode:**
  - **What it hides:** patient autocomplete, candidate cards, recent-patient lists and unrelated identifiers.
  - **Turning it on:** a manual toggle that is easy to find. On by default in patient-facing sessions.
  - **Warning:** shown while safe mode is off and screen sharing can't be detected.
- **Screen states:** idle, loading, results, no result, ambiguous, unauthorized, safe mode, access blocked from outside Canada,
  degraded service (Cedar unavailable: exact and structured lookup still work), merged-chart redirect, inactive-chart action block.
- **Two-identifier check** (spec §6): before a prescription, order or referral draft starts, the doctor confirms the full name and
  date of birth plus the PHN's last digits. A shared phone or address does not count. Confirm again if the patient context changes.
- **Desktop only.** Keyboard-only operation and screen-reader labels throughout.

## Out of scope
Phase 2 to 4 searches; cohort searches ("warfarin patients without a recent INR"; the spec routes these to a separate reporting tool);
voice; break-glass. The authorization matrix, purpose-of-use rules and audit are backend; the demo shows only their visible states
(e.g. a reason prompt, an unauthorized result).

All demo patients are invented. No real identifiers in this public repo.

## Built (5 Nov 2026, `simplecare-physician-portal-v2.html`)
- **One search control.** Ctrl+K / ⌘K from any screen, even while typing; the top-bar search button; the Home field (it no longer filters
  the day sheet: typing, a click or Enter opens the one search with what was typed). Listed under Keyboard shortcuts.
- **Clues.** PHN (full or digits), name, date of birth, birth year while typing. On Enter: "I think 1985" / "about 1985" (±2 years), ranges
  and decades, "not …", visit date ("seen Jun 25"), clinician ("Dr. …", "locum"), pharmacy, place. Fuzzy names are deterministic: a small
  nickname map, Mc/Mac, edit distance, a sounds-alike key. The chips under the box show what was understood, and which clues wait for Enter.
- **Candidate cards.** Recorded name, date of birth and age, PHN masked to its last 3 digits, last visit, chart-state label, one sourced
  context line or "No verified clinical summary", then matching and conflicting evidence. Labels, never scores.
- **Grouping.** Best match (an exact identifier, or a stronger match that would sit under a weaker one), today's day sheet (with a Today
  badge outside that group), recent, other patients, possible duplicates last.
- **Narrowing.** One question at a time (born when, where they live, recorded sex) with Not sure and Neither; ruled-out patients sit
  behind a disclosure. Two patients sharing a surname, address and phone get a side-by-side "what tells them apart" table.
- **Selection.** Click or Enter on a card only; an exact PHN still needs it. Focus moves to the patient's name on the chart. The arrow keys
  move a highlight while focus stays in the box; a card under the pointer or the highlight keeps its place when results update.
- **Chart states.** Inactive or transferred, and deceased: a label beside the name, a status line on the patient card, and the blocked
  actions say why (Prescribe, Order labs, Order imaging, Refer; Document too when deceased) on the Action tiles and on every other button
  that opens them. Merged: the old record opens a redirect view, then the surviving chart with a notice. Suspected duplicate: its own group
  with a warning. Not on your panel: a reason prompt before the chart opens.
- **Two-identifier check.** Over the prescribing panel and the lab, imaging and referral panel until the doctor ticks "Name and date of
  birth match" and "PHN ending … matches". The panels themselves are unchanged. Recorded as "Identity confirmed 11:19" in the panel header;
  asked again whenever a chart is selected. "They don't match" stops drafting and offers Task MOA.
- **Safe mode.** Toggle in the top bar (labelled only while on) and in the search footer. A warning stays in the footer while it is off.
  In safe mode: no suggestions, no cards, no recent list; Enter on a full PHN, or a full name with date of birth, shows one row with the name only.
- **Screen states.** Idle (recent patients), loading (identity results stay, a placeholder below), results, no result, ambiguous, Phase 2+
  "not available yet" (symptoms, medicines, descriptions), cohort ("belongs in the reporting tool"), worklists ("unbilled this week" opens
  Claims). Session states from the address: `?search=degraded`, `?search=abroad`, `?search=unauthorized`.
- **Demo patients.** Invented: an inactive (transferred) chart, a deceased chart, a merged record and its surviving chart, a suspected
  duplicate, two patients sharing a surname, address and phone, a patient last seen in March, a second Gloria and a second Kathleen, and one
  patient on another physician's panel. The earlier and later day sheets' patients are searchable too. None joins today's day sheet; an
  off-sheet chart reads "No visit today". Today's patients now have a recorded date of birth (the banner showed one date for everyone).

### Left out
- Saved shortlists, interrupted-search recovery, the stale-index state and audit logging (spec §3, §9): backend or later.
- Safe mode by default in patient-facing sessions: this portal has no patient-facing session to switch on.
- Hiding the day sheet itself in safe mode: the spec lists search surfaces only. **Needs Ani.**
- **Needs Daniel:** the reason list in the prompt (two placeholders until D4); whether "clinical drafts" on a deceased chart includes
  documents and the note (documents are blocked, the note is not); whether Call and Sign off should show on a chart with no visit today.
