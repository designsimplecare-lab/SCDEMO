# T-020 — Redesign Home with the design system

| Field | Value |
|---|---|
| Status | Ready |
| Type | Design |
| Priority | P1 |
| Size | L |
| Requested by | Ani |
| Date | 2026-09-30 |
| Owner | **Manoj** (+ `ux-designer`) |
| Contributors | `content-designer`, `doctor`, `moa` |
| Gates | `qa-engineer`, `accessibility`, `clinical-safety` (Needs your attention) |

## Request
Ani, 30 Sep: "go to figma create a new file post screenshot of this first screen home page and add
prd for designer to redesign this page using our design system documenting new design the way i did
for simplicity chat"

## Why
Home is the first screen the doctor sees, and it carries the whole call day. The build works but grew
change by change. Evidence from the screenshots (in the Figma file):
- About 3 queue rows fit on the first screen at 1440×960, and a window can hold 40–60 (REQ-HQ-08).
- Text is cut off: "Doctor to C…", and the clinical concern ends in "…".
- The floating MOA chat covers the last visible row.
- Critical and High in "Needs your attention" differ mainly by colour.

## Scope
- In: the top bar, Needs your attention, the Live queue (controls, table, group bars), the left
  navigation and the floating MOA chat, in light and dark, at 1280, 1440 and 1920 px.
- Out: the chart, Inbox, Claims and Tasks screens (tell Ani which ones your changes touch, rule 26),
  and the demo-only control.

## Acceptance criteria
- [ ] H1–H8 in the Figma brief meet their "Done when".
- [ ] At least two directions on "Explorations", and Ani picks one.
- [ ] The final design is built from components and variables (light and dark), with the spec beside it:
      anatomy, states, words, behaviour, accessibility, and what changed and why.
- [ ] The product rules hold: call windows with no wait estimates; Critical and High only; carryover
      above the current window; tasks doctor → MOA only; chat 1:1 with the paired MOA.
- [ ] Follows `product/handbook/01-rules.md`.

## Inputs
- **Figma (brief + screenshots):** https://www.figma.com/design/CvL4YxfOIyIrh51dobPWxf
- Live v2: https://designsimplecare-lab.github.io/SCDEMO/simplecare-physician-portal-v2.html (build 2026-09-30 13:51)
- `product/requirements.md`: REQ-HQ-01…17 (HQ-13 is replaced by Ani's 30 Sep decision: navigation open by default) and REQ-UI-01…07
- `from-daniel/2026-09-29-home-feedback.md`
- `simplecare-design-system.html` (where it differs from v2, v2's tokens win)

## Output
- The Figma file above: "Explorations" and "Final + spec" pages.
- After Ani approves: `ux-designer` builds it into `simplecare-physician-portal-v2.html`.

## Review
| Gate | Verdict | Notes |
|---|---|---|
| | | |

## Approval
- Ani: ☐  ·  Daniel (clinical): ☐ for the attention list, if its behaviour changes

## Log
- 2026-09-30 — created, with the Figma brief
