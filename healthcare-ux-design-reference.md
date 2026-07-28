# Healthcare UX Design Reference — for SimpleCare

Research notes gathered while designing the SimpleCare patient and physician portals. Sources at bottom.

## From NN/g's longitudinal diary study (9 patients, 93 logged interactions)

- **Patient portals beat phone calls.** They were the single most-used digital channel, mainly because patients actively avoid "phone tag" (calls going back and forth, voicemail loops).
- **Device switching is normal and task-dependent.** Smartphones dominate for quick tasks (scheduling, messaging). People switch to a computer for anything complex, like intake forms, because of password-manager convenience, screen size, and better site support on desktop. Don't assume mobile-only covers every use case, especially long intake forms.
- **Pain points cluster at the start of the journey**, not the end: scheduling and pre-visit intake. Root causes were missing features (no provider-chat when expected), poor findability (patients couldn't locate their own lab results in the portal), and broken widgets/calendars.
- **Telehealth visits feel impersonal and rushed** to patients even when the tech works fine. Multiple participants cited losing nonverbal cues and feeling disconnected. Tone and pacing matter as much as function for the actual call.
- **Patients want a plain-language explanation of results**, not just the raw report. A lab result with no interpretive text was a specifically cited frustration.
- **Digital and in-person steps must be synced.** A user was asked to redo on-paper intake she'd already completed online — pure wasted effort and a trust hit. Any online→in-person (or vice versa) handoff needs to carry context forward, not duplicate it.

## From healthcare UX principles for dual-audience (patient + provider) apps

- **Patient and provider views need separate information architectures**, not the same UI with fields hidden. Example: a lab result — provider needs reference range, trend, ordering status, clinical significance; patient needs plain-language interpretation + one recommended action + a way to ask a question. Same underlying data, different presentation logic.
- **Alert fatigue is a patient-safety issue, not a cosmetic one.** In clinical decision-support systems, physicians override roughly half to nearly all algorithmic alerts when every notification carries equal visual weight. Fixes: stratify severity structurally (critical = inline, blocking, requires acknowledgment; non-critical = separate notification lane), show context at the point of interruption, capture a reason when a provider dismisses something, use progressive disclosure (most actionable info first, full context on expand).
- **Patient-facing copy should sit at a 6th–8th grade reading level** (NIH guidance). ~36% of US adults have basic/below-basic health literacy. Avoid passive voice under stress, translate EHR abbreviations, and don't reuse legal-review consent copy for patient-facing screens.
- **Adherence-driving patterns share three properties**: one decision per screen, timing shown when the patient can actually act, and visible progress (streaks, completion state).
- **Accessibility specifics for healthcare, beyond generic WCAG 2.1 AA**: 44×44px minimum touch targets (motor-control conditions), never color-only for clinical status (e.g. a red-only critical alert fails colorblind users), and session-timeout defaults tuned for young mobile users can lock out patients with cognitive or digital-literacy limits mid-form.
- **A shared healthcare design system pays back fast**: accessibility/contrast/keyboard-nav testing happens once per component instead of once per screen.

## Direct implications already applied / to apply to SimpleCare

- Queue and "today" messaging should stay calm and reassuring, not transactional — this was a specifically named complaint pattern.
- "Just came in" / clinical activity feed items would benefit from a one-line plain-language gloss, not just a clinical label.
- When the physician portal is built: design its alert/notification system around severity stratification (critical inline + ack required vs. a separate notification lane), not a flat list — directly maps to the alert-fatigue research.
- Keep patient-facing copy at a 6th–8th grade level; physician-facing views can and should be denser/more clinical — these should be two different information architectures over the same data, not one view with toggles.
- Booking/intake friction (the toast-stub problem in the original draft) matched exactly where NN/g found real-world pain points cluster — good justification for prioritizing that flow first, which we did.

## Sources

- [Digital Interactions in Healthcare Customer Journeys](https://www.nngroup.com/articles/healthcare-customer-journeys/) — Nielsen Norman Group, Kim Flaherty & Alex Katsarakes, Mar 2023. Primary research (diary study), not vendor content.
- [Healthcare UX Design: Principles for Building Patient and Provider Apps](https://www.themomentum.ai/blog/healthcare-ux-design-principles-patient-provider-apps) — Momentum (healthcare dev/design vendor blog). Useful synthesis; treat as a secondary source, not primary research.
