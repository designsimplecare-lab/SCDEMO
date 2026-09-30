# Patient chat QA on staging, 29 Sep: the one-page summary

The full report (27 issues, with the steps for each) is in
`patient-chat-qa-2026-09-29-staging-run1.md`. **This page is all you need to read first.**

The run covered 26 scenarios: 13 done, of which 10 failed; 7 partly done; 2 blocked; 4 need sign-in.

## The 5 problems that matter, in plain words

| # | Problem | How bad | Issues |
|---|---|---|---|
| 1 | **Emergencies slip through.** "Chest pain, can't breathe" gets doctors and call windows instead of "call 911". A red flag mid-chat is missed too. Even a confirmed emergency goes back to routine questions. | 🔴 Critical | QA-001, 002, 003, 004 |
| ~~2~~ | ~~**Without the AI, you can't book.**~~ **Resolved:** a staging-only limitation. Booking from a concern tile works in production (Ani, 29 Sep). | ✅ n/a | QA-007 |
| 3 | **The chat doesn't listen.** Everyone gets the same greeting. "After 3 PM" and "today" are ignored. Unrelated questions aren't answered. Nonsense is accepted as a medical answer. Changing your mind doesn't work. | 🟠 High | QA-008, 009, 013, 014, 015, 006, 010 |
| 4 | **Privacy on shared devices.** Someone's symptoms reappear for the next person who opens the site. | 🟠 High | QA-005 |
| 5 | **The paths are confusing.** "See my family doctor" traps people without one. Your window isn't held before sign-up. A named doctor can't be booked. "Become a regular patient" asks you to choose for life, with no information. | 🟡 Medium | QA-011, 012, 016, 017, 018 |

**The rest is polish** (🟡/⚪): the red "Clear conversation" button, time formats, small text on phones,
keyboard access to the tiles, and similar (QA-019 to QA-027).

## What each person needs to do
- **Daniel:** say how emergencies should be caught and worded, and which concerns need triage first.
- **Manoj:** pick one emergency style (in T-012).
- **Ani:** sign in on staging, for the second half of testing.
- **Dev team** (once decided):
  - check the first message for emergencies **before** showing doctors;
  - clear the chat between visitors;
  - let the chat understand changes of mind and time requests.
