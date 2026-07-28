# SimpleCare — Summary of Changes This Session

## Physician portal (`simplecare-physician-portal-lofi.html`)

Sidebar navigation was restructured into a collapsible icon rail, with Claims, Fee Settings, and Register Patient grouped under a hover flyout labeled "Practice" since they're infrequent, admin-adjacent actions. A redundant identity card in the sidebar was removed after you caught it duplicating the topbar profile. The topbar now separates Task MOA (solid button) and Add On (outlined button) on the left from the patient-view switcher, name, and profile menu on the right.

Task MOA — the modal for sending a task to your MOA — now actually populates a real task-history list instead of just showing a confirmation toast. That history was split into two separate views per the interview: "My outstanding tasks" stays on the Today dashboard for things you personally didn't finish, while a separate "Carry Forward" screen shows the MOA-facing delegation history with status (in progress, completed, carried forward). These were previously one conflated list.

Add On was built to match the real doctor-chat screenshots you shared: patients added outside the normal booking flow have no queue or scheduler state — they're logged as encounters, not scheduled visits.

A floating MOA chat widget was added, separate from Task MOA, supporting multiple staff threads with an online-presence indicator (now a small dot on the chat button rather than a separate dashboard strip, per the Today-screen reorg below).

The Calendar screen got a category cherry-picking guardrail: doctors can pause categories like Dermatology, but at least 50% of categories must stay active — matching the "no blatant cherry-picking" business rule from the interview.

The Today screen was reorganized twice: once for general "what's my job today" clarity (alerts → call windows/live queue → outstanding tasks → scheduled later → activity log), and again just now to add the Inbox review feature in the correct priority position.

Newest addition: a full "clear the inbox" review-and-sign-off feature — the last unbuilt item from Daniel's five dashboard requirements. Every lab, imaging report, and consult note now moves through a received → reviewed → signed-off state machine. It shows as a dashboard preview box on Today (urgent items first, with a count badge), a nav-level Inbox destination under Patients, and a full screen with three sections (needs review, awaiting sign-off, signed-off history). Opening an item marks it reviewed in one click; signing off is a separate deliberate action.

## Patient portal (`simplecare-patient-portal-v2.html`)

Added an episodic-vs-family-medicine entry fork: choosing "ongoing care" routes into a follow-up booking pre-paired with Dr. Pannozzo, while choosing a same-day concern goes through the normal walk-in path.

## Landing page & booking flow (`simplecare-landing-booking-redesign.html`)

Rebuilt from an initial symmetric two-card fork (which you correctly pushed back on) to match Daniel's actual written spec: the concern/buffet grid stays the default, unchanged homepage content, with one additional Family Practice entry point layered above it — not an equal either/or choice. A demo toggle simulates attached vs. unattached patient status so both walk-in outcomes are testable.

Just completed: both booking paths now run fully end to end instead of dead-ending in a toast alert. Walk-in: concern → doctor/slot pool → confirm → sign in → (attachment interrupt, attached patients only) → consent → registration → intake → confirmation. Family Practice: entry banner → sign in/register → straight to your own doctor's scheduler (returning patients) or a doctor-pairing screen (new patients) → consent → registration → intake → confirmation. Registration includes a Trusted Person section, explicitly marked as parked per your instruction to leave it aside for now. Every transition was verified programmatically.

Earlier additions to this file: a pulsing "next available" trust pill (like your competitor Avee), and reassurance copy above the concern grid, corrected once already after an overclaim about not needing to sign in at all.

## Hero mockup (`simplecare-hero-highfi.html`)

A standalone high-fidelity hero matching the real site's visual language (navy topbar, coastline photo placeholder, next-available pill, trust row, Family Practice CTA pill). You confirmed the next-available pill and Family Practice CTA were implemented on the real live site from this mockup.

## Flow comparison (`simplecare-both-flows-lofi.html`)

A static side-by-side wireframe comparing the two booking flows step by step, plus the clickable version above once you asked for something interactive instead.

## Stakeholder interview analysis (`simplecare-stakeholder-interview-analysis.md`)

Full write-up of the Daniel Pannozzo interview — navigation philosophy, the episodic-vs-comprehensive business split, confirmed dashboard requirements, the precise Carry Forward mental model, MOA chat priority, and chart-walkthrough feedback. One correction made after you caught a misattribution: the skeleton-first/design-system framework was your explanation to him, not his requirement.

## Real live site — just flagged, not yet actioned

Reviewing your live homepage screenshot: the H1 itself reads "British Columbia's Virtual Family Practice," which contradicts the very next line reassuring one-time visitors — worth softening to something concern-neutral. The subhead's closing phrase "Private visit is available" doesn't clearly parse on its own. The top nav also dropped "Become a Patient" in favor of "Call" and "Login," which removes the persistent Family Practice entry point from every page except the homepage hero — worth confirming that's intentional.

## Still open, not built or decided

Copilot's fate in the physician nav (Daniel said "not currently" used — stronger than the design assumed). Wiring Add-On encounters into Claims for billing. Unifying Register Patient and Add On into one front-end form. A multi-doctor picker for the episodic path (currently only shows Dr. Pannozzo). A physician-side opt-in setting for virtual-episodic-only. Retell AI as a third booking pathway, explicitly deferred. The simplified single-button flow for already-attached patients inside a logged-in dashboard. Trusted Person, explicitly parked. The GitHub push, paused at the Personal Access Token prompt.
