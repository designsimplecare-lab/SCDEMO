# T-021 — The chart: an AI workflow that gets the note done

| Field | Value |
|---|---|
| Status | Blocked: waiting for Daniel's chart requirements document |
| Type | Design |
| Priority | P1 |
| Size | L |
| Requested by | Daniel (via Ani) |
| Date | 2026-09-30 |
| Owner | **Manoj** (+ `ux-designer`) |
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
- [ ] Written once Daniel's document arrives.
- [ ] The doctor always signs, and AI drafts never auto-file (rule 18).
- [ ] Follows `product/handbook/01-rules.md`.

## Inputs
- `from-daniel/2026-09-30-chart-workflow.md`
- Daniel's chart requirements document (awaited)
- The current v2 chart: https://designsimplecare-lab.github.io/SCDEMO/simplecare-physician-portal-v2.html

## Log
- 2026-09-30 — created, blocked on Daniel's document
