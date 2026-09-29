# Role drills — practice tasks (training only; do not change anything)

Each drill is a **dry run.** Describe what you would produce, and outline it (headings, key points,
sources). Do not edit prototypes, spec docs or marketing files, and don't browse to act on any
account. Write your drill to `product/training/results/<agent>.md`, after your core-exam answers.

For every drill, include:
1. the task file you would expect (type, owner, gates, acceptance criteria);
2. your plan, step by step;
3. the sources you'd use;
4. what needs Daniel, and what needs Ani;
5. the risks, and how you'd stay inside the rules.

## Users
- **doctor.** In shadowing 2 (the gabapentin follow-up), which information did you need mid-call, and
  where did you have to dig for it? Outline the walkthrough report you'd write for a new v2 build of
  that flow.
- **moa.** A renewal hand-off arrives: "send 3 months at 300". List what you need to act safely, and
  what you'd report back to the doctor at each state.
- **patient.** As the "new patient who lost their family doctor", walk the entry flow in
  `research/patient-entry-flows/README.md`. Outline where you'd get confused or worried.

## Product
- **product-manager.** Daniel answers a new question that contradicts an existing decision. List every
  file you would update, and how.
- **ux-researcher.** A new recording arrives with no transcript. Outline your analysis plan and the
  structure of your note.
- **market-strategist.** Outline how you'd test the bet "sell 'your virtual family doctor', not
  'walk-in'" before recommending a site change.

## Design
- **ux-designer.** A task asks for an emergency red-flag screen in the Simplicity chat. What do you need
  first, which gates apply, and what can you design without Daniel?
- **content-designer.** Outline a copy deck for relabelling approving actions with the sign-off
  language, across the chart, the renewal and billing.
- **accessibility.** Outline an audit plan for the Simplicity chat on a phone.
- **frontend-engineer.** Outline how you'd safely make a change in the ~11,000-line v2 file, from
  finding the code to proving it works.

## Safety and trust
- **clinical-safety.** Pick one hazard from the hazard log. Outline how you'd re-review it after a
  design change.
- **privacy-security.** Outline the data-flow map you'd draw for patient-uploaded bloodwork.
- **qa-engineer.** Outline the test script for UC-06 (renewal by fax), with its pass/fail checks.
- **patient-chat-qa.** Walk PC-11 (changes their mind) and PC-21 (emergency red flag) as a dry run:
  - the steps and messages you'd use;
  - what you'd verify;
  - what you can't judge without Daniel or Ani;
  - what you need from Ani before a real run.

## Build
- **tech-lead.** Outline how you'd model "sign-off" as data and events, and why.
- **integrations-engineer.** Outline the question list for the BC health IT vendor session (PLR, PCR,
  PharmaNet).
- **ai-engineer.** Outline the evaluation plan for a last-note summary, including how you'd avoid real
  patient data.
- **billing-msp.** Outline what you'd need to verify before the prototype says anything about claim
  time limits.

## Marketing
- **marketing-lead.** Outline `marketing/brand.md`: the sections, and the sources for each.
- **social-media-manager.** Outline one week of posts, and say how each passes compliance.
- **content-seo.** Outline a concern landing page for "prescription renewal", including the safety
  block, and what needs clinical review.
- **performance-marketing.** Outline a tracking plan for the website-to-booking funnel that keeps
  health data out of ad pixels.
- **brand-designer.** Outline the Instagram post template system, and how it follows SimpleCare Paper.
- **lifecycle-crm.** Outline the "almost your turn" message, and explain why it contains no health
  information.
- **partnerships-pr.** Outline a physician-recruitment one-pager, and the compliance risks to flag.
- **marketing-compliance.** Review this draft line and give your verdict: *"Canada's #1 virtual clinic
  — get your Ozempic prescription today!"*
