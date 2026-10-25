# Workflow sign-off tracker

Phase 1 of the plan: every demo workflow is finished and signed off by Daniel **before** the Figma
design system is applied in code and developers add the backend. Made 5 Oct 2026 from
`use-cases.md`, `open-questions.md`, `decisions.md`, `from-daniel/` and the current builds.

**Where we are:** Daniel has not signed off any whole workflow yet. He has set rules, reviewed v2
screens with changes, and approved one screen (the critical troponin card, 30 Sep).

**Sign-off column:** In scope? (Ani decides) → Shown to Daniel → Changes done → **Signed off** (date + his words).

## Physician portal (`simplecare-physician-portal-v2.html`)
| # | Workflow | Built | Daniel so far | Blocked by | In scope? | Signed off |
|---|---|---|---|---|---|---|
| 1 | Start the day on Home | Partly | Changes requested 21 + 29 Sep | OQ-66, 92, 76, 35, 39, 71 | | |
| 2 | Work the live queue across call windows | Yes | Rules agreed 21 Sep | OQ-02, 33, 05 | | |
| 3 | Call the patient (dropped call, redial) | Partly | Not shown | OQ-32, 07 | | |
| 4 | Call back a missed patient | Partly | Partly answered 27 Sep | OQ-06, 04, 29 | | |
| 5 | Read the intake before calling | Partly | Rules set | OQ-40 | | |
| 6 | Renew a prescription by fax | Partly (no failed fax) | Rules set, not shown | OQ-09, 70, 50, 55 | | |
| 7 | Chart a visit with AI help (T-021) | Step 1 of 3 | **New build not shown** | OQ-91, 81, 16, 31, 63; chart-shell items 1–4 | | |
| 8 | Review a critical result | Yes | **Troponin card approved 30 Sep** | OQ-11, 07 | | |
| 9 | Clear an abnormal result / ECG | Yes (demo) | Not shown | OQ-75, 76 | | |
| 10 | Sign off routine results in the Inbox | Partly (no batch) | Rules set | OQ-62, 12, 13, 14, 38 | | |
| 11 | Result straight into the chart | Partly | Not shown | — | | |
| 12 | Problem list and care plan | Yes | "Pretty good" 30 Sep | OQ-81 | | |
| 13 | Hand work to the MOA, see it picked up | Partly | Rules set | OQ-41, 15, 86 | | |
| 14 | Keep my own unfinished work | Partly | Contradiction logged | OQ-22, 23 | | |
| 15 | Message my paired MOA | Physician side | Not shown | OQ-83 | | |
| 16 | Finalize the visit, then sign off claims (T-023) | Yes, local | **Build not shown** | OQ-87, 88, 89, 90, 24, 25; billing N1–N17 | | |
| 17 | Confirm identity and coverage | Partly | Words set | OQ-89, 58 | | |
| 18 | See an unbooked patient (Add-On) | Partly | Not shown | OQ-04, 58 | | |
| 19 | Go off service; calendar | Yes | Not shown | OQ-66 | | |
| 20 | New problem from uploaded lab PDFs | No | Rules set | OQ-65, 45, 46 | | |
| 21 | After a hospital stay: wait for bloodwork | No | Rules set | OQ-54, 57, 56, 64, 19 | | |
| 22 | PA (Japneet) delegated renewal | Partly | Rule set 27 Sep | OQ-70; billing N6 | | |

## MOA portal (`simplecare-moa-portal.html`)
| # | Workflow | Built | Daniel so far | Blocked by | In scope? | Signed off |
|---|---|---|---|---|---|---|
| 23 | Work tasks physicians send | Partly | Rules set | OQ-41, 93 | | |
| 24 | Chase referrals, imaging, callbacks, faxes | Partly | Not shown | OQ-19 | | |
| 25 | Route an outside fax to the right chart | No | His DOC21 rules | OQ-78, 85, 86, 76 | | |
| 26 | Work billing rejections | Yes, local | Not shown | OQ-88; N8 | | |
| 27 | Chat with paired doctors (up to 5) | No | Pairing set | OQ-83 | | |

## Patient portal (`simplecare-patient-portal-v2.html`)
| # | Workflow | Built | Daniel so far | Blocked by | In scope? | Signed off |
|---|---|---|---|---|---|---|
| 28 | Book a visit and do intake | Partly | Booking model 29 Sep | OQ-67, 73, 69 | | |
| 29 | Wait in the queue | Partly (shows wait time, against D-05) | Rule set | OQ-26, 02, 29, 28 | | |
| 30 | Results, uploads, readings | Partly | Rules set | OQ-27, 54, 64, 56, 52 | | |
| 31 | Appointments, activity, family, profile | Yes | "Calm" rule | — | | |

## Public site / Simplicity chat (staging, no prototype here)
| # | Workflow | Built | Daniel so far | Blocked by | In scope? | Signed off |
|---|---|---|---|---|---|---|
| 32 | Book through the AI chat | On staging | Not shown | OQ-80, 84 | | |
| 33 | Emergency while booking | **Fails on staging** | Not shown | **OQ-79, 69, 94** | | |
| 34 | Book without the AI | Partly | Rule set | OQ-68 | | |
| 35 | Book by WhatsApp or text | No | Idea only | OQ-72 | | |
| 36 | Shared-device privacy | No | Not shown | — | | |

## Daniel's top 8 questions (round 3)
1. OQ-79 + 69 + 94: emergency screening depth, red-flag list and wording
2. OQ-76 + 92: one priority vocabulary across Home, Inbox and chart
3. OQ-75: is "clear" on a yellow result a sign-off?
4. OQ-87: does Finalize submit the claim, or wait for batch sign-off?
5. OQ-91 + 81: Chart View v2.1 companion specs; "Chase their office"
6. OQ-67: which concerns are quick-book vs triage first
7. OQ-66: how many call windows, at what times
8. OQ-86: may the system create an MOA task for an overdue result?

Full list: `open-questions.md`.
