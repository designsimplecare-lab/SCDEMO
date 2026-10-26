# T-027 — Prescribing v2: prescription pad first, reconciliation as a mode, med list as the result

| Field | Value |
|---|---|
| Status | Ready (waiting for Ani's go) |
| Type | Design + build |
| Priority | P0 |
| Size | L |
| Requested by | Daniel (via Ani), meeting 25 Oct 2026 |
| Date | 2026-10-26 |
| Owner | `ux-designer` |
| Gates | `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility` |

## Source
`from-daniel/2026-10-25-meeting-prescribing-and-orders.md`, section(s) A to I.

## Scope
- Rebuild the T-026 panel (`product/specs/prescribing-redesign.md`) around three things: **prescription pad** (today), **medication reconciliation** (process), **medication list** (result, reconciled as of a date by a named doctor, or marked not reconciled).
- Open on the **pad**: drugs from today's note labelled "from today's clinical encounter", favourites and quick scripts, the med list beside it to glance at.
- **AI safety at the pad**: allergy, interaction, kidney-function dose; override or sign off with a note; allergies readable at a glance.
- **Reconciliation** offered from the pad, and the default for medication-renewal visits: each row shows **Simple vs the source and the difference**; the doctor verifies each drug with the patient; signing adds to the med list.
- **The past**: last 12 months, newest first, active marked (filled within 3 months), 18 months on request, window adjustable; last filled, pills left, pharmacy.
- **Sources**: Simple's prescriptions first; PharmaNet only when the doctor is allowed (two cases: with and without PharmaNet); upload a pharmacy list, paste a CareConnect screenshot, type, or take a photo; AI extracts the standard fields as drafts.
- **Pharmacy**: ask the pharmacy to verify all or chosen drugs (doctor signs); send the reconciled list to the pharmacy.
- **Look**: a classic, slightly retro, clinical prescription pad that carries weight; a soft reminder, no loud alert.
- **Remove** the protective-word box from the default view (prompt only if PharmaNet asks, pending Daniel); remove decision reminders such as "cardiology asked" from the panel and offer them in the chart as "Add to prescription pad".
- Later (not now): CareConnect in a movable, resizable window beside the pad.

## Waiting on Daniel
Standard prescription fields list; interaction and allergy rules; protective-word decision; whether PharmaNet can be told a reconciliation was done.
