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
