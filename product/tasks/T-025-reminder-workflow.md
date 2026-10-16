# T-025 — Specialist report → reminders, patient reply and drafted orders (Daniel, 15 Oct)

| Field | Value |
|---|---|
| Status | Ready, waiting for Ani's go |
| Type | Design + build |
| Priority | P1 |
| Size | M |
| Requested by | Daniel (via Ani) |
| Date | 2026-10-15 |
| Owner | `ux-designer` (Ani approves) |
| Contributors | `ai-engineer`, `clinical-safety`, `privacy-security`, `content-designer` |
| Gates | `clinical-safety`, `privacy-security`, `qa-engineer`, `accessibility` |

## Request
Daniel, 15 Oct: "Can we extract from these reports - and build this workflow into Simple?" "Reminder
workflow." "Best is that the AI completes these reqs/tests automatically for the Doc to sign off on."
See `from-daniel/2026-10-15-reminder-workflow.md`.

## Scope (a demo, in the main portal, with invented data)
When a specialist report is opened from the Inbox (or the chart's "new consult" line):
1. **Cedar · What the report recommends:** each recommendation with its timing, and what the patient
   decided; each line links to its source in the report.
2. **Reply to the patient:** drafted by Cedar, edited and approved by the doctor, sent through the
   patient portal (the patient is told by a notice with no health details).
3. **Reminders:** the recommendations become dated care-plan items owned by the GP, shown in Pending and on
   Home when due. The patient sees the same dates in the patient portal.
4. **Drafted orders:** the repeat imaging and the repeat blood test appear in Action as drafts, to
   Accept, Edit or Reject, and the doctor signs them.
- **Out:** real patient data, real sending, and anything signed or ordered without the doctor.

## Acceptance criteria
- [ ] Built into `simplecare-physician-portal-v2.html` (and the patient portal for the patient's
      reminder), light only, in the portal's design system.
- [ ] The doctor approves the letter, signs the orders and confirms the reminders; nothing is automatic.
- [ ] No health information in any email or SMS text; patient reminder channels need consent.
- [ ] The care plan and tasks stay separate (rule 13). The recommendation keeps its stated owner (rule 15).
- [ ] Demo report text is invented, with a fictional specialist and patient.
- [ ] Checked with the `doctor` agent before Ani's review.

## Inputs
`from-daniel/2026-10-15-reminder-workflow.md`; `product/training/bulletins/B-007-ai-chart-assist.md`;
`product/training/bulletins/B-003-requirements-intake-emergency-documents.md` (document routing);
`product/specs/chart-shell.md`.

## Log
- 2026-10-15 — created from Daniel's WhatsApp. Waiting for Ani's go and a redacted sample report.
