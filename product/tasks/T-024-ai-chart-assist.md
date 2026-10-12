# T-024 — AI Chart Assist in the chart (Daniel's requirements, 11 Oct)

| Field | Value |
|---|---|
| Status | Ready, queued behind the 11 Oct chart changes (same file) |
| Type | Design + build |
| Priority | P1 (Daniel: high priority) |
| Size | L |
| Requested by | Daniel (via Ani) |
| Date | 2026-10-11 |
| Owner | `ux-designer` (Ani approves) |
| Contributors | `ai-engineer`, `doctor` |
| Gates | `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility` |

## Request
Daniel's "Simple Chart | AI Chart Assist" development requirements. See bulletin B-007; the full text is
in `private/requirements/`.

## Scope: Phase 1 first
- **In (Phase 1):**
  - transcript panel beside the note, with the status badge (Transcribing, Ready, Available until a
    date) and the "Transcript expired" state;
  - source links: tapping an AI-drafted sentence highlights its source in the transcript, intake or
    chart, and they grey out with a tooltip once expired;
  - AI-drafted markers until accepted or edited, cleared on sign-off, so a signed note is clean text;
  - Regenerate (it never overwrites a doctor's edit without asking);
  - the SOAP drafting already in the note, with the Subjective and Objective split.
- **Later (Phase 2):** AI-assisted prescriptions, investigations and referrals in Action.
- **Later (Phase 3):** one orchestrating control, section controls, the consolidated queue, the audit
  view and the model improvement flag. The **engineering review screen** is a separate internal screen,
  not part of the clinical app.
- **Out until reviewed:** anything that plays or stores patient audio beyond a demo indicator. That needs
  consent and privacy decisions (B-007 flags).

## Acceptance criteria
- [ ] Built into `simplecare-physician-portal-v2.html` (the one main version), light mode only, in the
      portal's own design system.
- [ ] The doctor authorises every clinical action; nothing signs or sends by itself (rule 18).
- [ ] The signed note shows clean text only, with no AI markers.
- [ ] No transcript content in the audit view. No audio controls in the clinical workflow.
- [ ] Demo transcripts are invented text only, with no real patient data.
- [ ] Follows `product/handbook/01-rules.md`; checked with the `doctor` agent before Ani's review.

## Inputs
- `product/training/bulletins/B-007-ai-chart-assist.md`
- `from-daniel/2026-10-11-chart-feedback.md`; `product/specs/chart-shell.md`

## Log
- 2026-10-11 — created. Starts after the 11 Oct chart changes finish (one agent edits the portal at a
  time).
