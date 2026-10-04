# T-021 — The chart: an AI workflow that gets the note done

| Field | Value |
|---|---|
| Status | Ready: Daniel's chart document arrived (Chart View v2.5, B-006) |
| Type | Design |
| Priority | P1 |
| Size | L |
| Requested by | Daniel (via Ani) |
| Date | 2026-09-30 |
| Owner | `ux-designer` (Ani approves) |
| Contributors | `product-manager`, `ai-engineer`, `doctor` |
| Gates | `clinical-safety`, `qa-engineer`, `accessibility` |

## Request
Daniel, 30 Sep: "I'm more interested in an AI workflow, which is to say, how do I get through the
chart, right? How do I complete that f\*\*\*\*\*? … I'm talking to the patient, right? Boom, there's my
note. … At the end of it, the chart's done." He will send a requirements document on the chart.

## Why
In v2 he couldn't find where to chart ("where's my note? … where am I charting?"). The note box sits
below the visit summary. See `from-daniel/2026-09-30-chart-workflow.md`.

## Scope
- In: the in-call charting flow, from the open chart to the AI-drafted note to the doctor's sign-off,
  with the chart done; and how the completed chart then displays.
- Out until Daniel says otherwise: the comprehensive care plan ("don't worry about that just yet").

## Acceptance criteria
- [ ] Design follows Chart View v2.5 (B-006). Start with its first delivery step, the core
      encounter shell: the patient snapshot with the this-visit strip, Today, Needs Attention, the
      note and actions beside the context at ≥1440 px, and simplified full-chart navigation.
- [ ] Built from SC – Design System (as in T-020).
- [ ] The "Where v2 differs today" list in B-006 is resolved or explicitly deferred.
- [ ] Checked against v2.5's task targets with the `doctor` agent before Ani's review.
- [ ] The doctor always signs, and AI drafts never auto-file (rule 18).
- [ ] Follows `product/handbook/01-rules.md`.

## Inputs
- `from-daniel/2026-09-30-chart-workflow.md`
- `product/training/bulletins/B-006-ecg-critical-and-chart-view.md`, with the full text of Chart View v2.5 in `private/requirements/`
- ECG Critical Result Requirements v2.0 (same bulletin) for how a CRITICAL ECG shows in Needs Attention
- The current v2 chart: https://designsimplecare-lab.github.io/SCDEMO/simplecare-physician-portal-v2.html

## Log
- 2026-09-30 — created, blocked on Daniel's document
- 2026-10-03 — Chart View v2.5 arrived; unblocked
- 2026-10-03 — owner changed; Ani approves the design.
