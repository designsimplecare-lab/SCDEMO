# QA live sync

The shared log between the **lead thread** (Ani's main SimpleCare chat) and the **QA thread** (its
own session in the left panel). The lead adds an entry whenever something that QA should know
changes: a decision, a deploy, a new requirement or a new recording. The QA thread reads this file at
the start of every task, and adds its own entries under "From QA".

Newest first. Each entry: the date, what changed, where the source is, and what QA should do.

## From the lead
- **3 Oct 2026: design system for now = the demo's own** (the portal's CSS variables and components), not the Figma library, which comes later. Judge new screens against the portal's existing look.
- **3 Oct 2026: billing follows Daniel's PRD (Ani's decision).**
  - **Decision:** the doctor attests claims in a batch, and Finalize no longer submits on its own.
  - **Work:** T-023 has `billing-msp` writing `product/specs/billing-redesign.md`. `ux-designer`
    builds it into the physician portal after the chart (T-021).
  - **One main version:** `simplecare-physician-portal-v2.html` is the only version; there are no
    "v3" files.
  - **For QA:** when the build lands, test it against the T-023 spec and B-005.
- **3 Oct 2026: design ownership changed.** The `ux-designer` agent now owns all design tasks
  (T-012 to T-017, T-020, T-021), and Ani approves every design. Where QA reports say "Needs Manoj",
  read "needs `ux-designer` and Ani's approval".
- **3 Oct 2026: ECG Critical v2.0 and Chart View v2.5 arrived** (B-006).
  - **ECG:** there is one priority, CRITICAL ECG, triggered only by the dictionary phrases or a
    source critical flag, and the source phrase is shown verbatim. "Abnormal ECG" alone, and plain
    AF, are not critical. The v2 demo ECG (AF) correctly stays a yellow "Abnormal ECG".
  - **Chart:** the note sits beside the context; a this-visit strip blocks Finalize until complete;
    the PHN is masked; Needs Attention has Critical, To do and Info tiers. T-021 is unblocked, but no
    v2 change has been made yet.
  - **For QA:** v2.5's section 9 task targets are the future acceptance test for the chart.
- **3 Oct 2026: Simple Billing PRD v1.5 arrived** (Daniel, 1 Oct).
  - **Summary:** B-005. The full text is in `private/requirements/`. Its commercial and
    organisational sections are confidential: never quote them.
  - **For QA:** when you test v2 billing, check against B-005 (the attestation, claim-state and
    eligibility results). The gap report is task T-022 (`billing-msp`); don't run it unless Ani asks.
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
- **3 Oct 2026: PC suite mapped to Intake v2.3; Appendix A cases added; staging probed** (T-011).
  - **Where:** `product/tests/patient-chat/README.md` (updated) and
    `product/reports/patient-chat-qa-2026-10-03-probe.md` (new). Committed by the lead
    to master on 3 Oct. Screenshots
    `product/reports/shots/r2-*.png` (git-ignored).
  - **The mapping:** 29 of 33 ACs have a PC case. PC-27–PC-34 are the 8 Appendix A findings (one
    each); PC-35–PC-45 fill the gaps; PC-21a–c and PC-46–PC-47 test safety screening. AC-11, AC-13,
    AC-14 and AC-28 can't be tested from the patient side (engineering or registry audit).
  - **Staging today:** the routine Rx Renewal path is fixed. **All 8 Appendix A findings pass**, plus
    the acknowledgement first and the typed message kept (AC-24, AC-33).
  - **But emergencies are still missed (🔴):**
    - QA-028: "chest pain and I cant breathe" → "I can help with chest cold"; later a one-line "if
      this is an emergency, call 911" in the same message as the doctor and window list.
    - QA-029: lips and tongue swelling, hard to swallow, typed mid-renewal → read as a "timing
      preference"; windows filtered to the morning.
    - QA-030 (🟠): chest pressure going down the left arm → chest-cold questions, then the scheduler.
    - QA-031 (🟠): "really bad headache" → no questions at all, straight to the scheduler.
  - **OQ-79 (safety depth), not decided:** staging follows **neither** document. 0 safety questions
    in all 4 safety runs (ES3 expects up to ~3 on triage-first presentations; IN23 allows at most 1),
    and no reaction to explicit urgent words, which both require.
  - **For the lead:** commit the two files when Ani approves; tell Ani that QA-028/029 look like a
    release blocker for the chat on staging; add OQ-79's evidence line (QA-028–031) via
    `product-manager`.
  - **Needs Daniel:** OQ-79, OQ-69, whether QA-030 is a hard stop, and whether naming "chest cold" to
    the patient is acceptable.
  - **Needs Ani:** a physician-side summary view (AC-06, AC-21), doctor test data (AC-10, AC-26),
    phase 2 sign-in with a test patient who has a Family Doctor (AC-12, AC-31), and an AI-off test
    (AC-27). Overnight 12:30–8:00 AM call windows: intended?
  - **QA is stopped here for Ani.**
