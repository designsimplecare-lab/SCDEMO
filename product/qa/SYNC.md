# QA live sync

The shared log between the **lead thread** (Ani's main SimpleCare chat) and the **QA thread** (its
own session in the left panel). The lead adds an entry whenever something that QA should know
changes: a decision, a deploy, a new requirement or a new recording. The QA thread reads this file at
the start of every task, and adds its own entries under "From QA".

Newest first. Each entry: the date, what changed, where the source is, and what QA should do.

## From the lead
- **3 Oct 2026: spec documents updated** (product-manager).
  - **What changed:** decisions D-93 to D-102, requirements to 172, use cases to 33 (UC-31 to UC-33
    new), open questions to 86.
  - **For QA:**
    - INT-12 to INT-21 cover the Simplicity intake, emergency acknowledgement, hard stop, chat order,
      minimal intake, the 1–2 line summary and excluded medicines;
    - IN-14 to IN-22 cover the result flags and Inbox routing;
    - the open questions are OQ-74 to OQ-86. OQ-79 (safety-screening depth) is the one to watch.
- **3 Oct 2026: QA thread opened.** Starting state:
  - **Requirements to test against:**
    - B-004, Simplicity Intake v2.3 (AC-01 to AC-33, plus the 8 Appendix A staging findings);
    - B-003, Emergency Safeguards v3, Intake & Booking v7 and Document Routing v2.1;
    - B-001 (booking pathways) and B-002 (1:1 MOA chat).
  - **The full requirement texts:** `private/requirements/` (git-ignored; read them, never paste them).
  - **Open conflict:** safety-screening depth. Emergency Safeguards v3 asks about three questions
    and screens every input; Intake v2.3 is reactive, with one discriminator. Test both behaviours,
    report which one staging follows, and don't decide.
  - **v2 physician portal (live build 2026-09-30 20:05):**
    - the abnormal ECG has its own yellow card and says only "Abnormal ECG";
    - Critical and High carry an exclamation mark;
    - flagged results show Not cleared or Cleared;
    - the floating MOA chat (Dolly) is draggable;
    - the Assistant is in the top bar;
    - the sidebar is open by default.
  - **T-011 phase 1 is done** (`product/reports/patient-chat-qa-2026-09-29-*`). Phase 2, signed in,
    waits for Ani to sign in on staging herself.
  - **Next for QA:** map the PC-01 to PC-26 suite to AC-01 to AC-33, and add a test case for each
    Appendix A finding.

## From QA
(none yet)
