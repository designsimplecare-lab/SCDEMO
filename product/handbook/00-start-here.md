# Start here — SimpleCare agent onboarding

Every agent reads this handbook before its first task, and again whenever it changes. It is short on
purpose. The detail lives in the files it points to.

**Reading order**
1. This page: who we are, who we serve, and the words we use.
2. [`01-rules.md`](01-rules.md): the non-negotiables for product, clinical, design, privacy and marketing.
3. [`02-evidence.md`](02-evidence.md): where the knowledge lives, and how much to trust each source.
4. [`../process.md`](../process.md): how a task moves from request to done.
5. [`../team.md`](../team.md): the roster, who owns what, and the standards.
6. Your own role file, `.claude/agents/<you>.md`.

---

## Who we are
SimpleCare (https://simplecare.ca) is a **physician-led virtual family practice for British
Columbia**.
- **Coverage:** MSP-covered, with private pay available (e.g. no card).
- **What we offer:** walk-in style same-day visits, ongoing care for conditions, and a family doctor
  for people who have none. More than 120 concerns are bookable, as the site says. The market strategist counted 103 service
  pages, so **Ani should confirm the figure** before it's used in marketing.
- **How care happens:** the doctor **phones the patient** in the patient's chosen **call window**. The
  patient holds a **place in the queue** for that window.

**Direction (Daniel, 27 Sep 2026).**
- Growth depends on **more physicians** and a high volume of **straightforward walk-in consults**.
  Those keep doctors busy, and busy doctors value the platform.
- Comprehensive family practice is offered, and it matters to regulators.
- Pharmacy partnerships are not a priority.
- The confidential detail is in `private/daniel-strategy-2026-09-27.md`. It is local only; never quote
  it anywhere public.

## The people
| Who | What they do | How we represent them |
|---|---|---|
| **Dr. Daniel Pannozzo** | The client and lead physician. Owns clinical and business decisions. His exact words are the spec. | `doctor` agent; his words in `from-daniel/` |
| **Ani** | **Manages the whole team:** sets priorities, assigns tasks, approves every deploy and every public draft. |  — |
| **Physicians** | Call patients from the queue, chart, prescribe, review results and sign off. They may work from another time zone. | `doctor` |
| **MOAs** (e.g. Dolly) | Handle tasks from the doctor, faxes, billing fixes and the office line. | `moa` |
| **Physician assistant** (Japneet) | Works in the **Physician Assistant portal**, which is identical to the physician portal. Sends renewals when the doctor delegates, under his sign-off: "Always me. I can delegate authority to Japneet, but it is my responsibility." | `moa` (for now) |
| **Design** | Since 3 Oct 2026 the `ux-designer` agent owns all design work (patient chat and booking, the portals, the design system, visual treatment), with `content-designer` and `brand-designer`. **Ani approves every design decision.** | `ux-designer` |
| **Engineering** (Samin, Sai, Dev) | The real backend team. Backend documentation is on their to-do list. | — |
| **Patients** | Walk-ins, people managing an ongoing condition, and new patients who have lost their family doctor. | `patient` |

## The product
There are three portals over one record: **physician**, **MOA** and **patient**. The public
**website** is the front door, with the **Simplicity** chat assistant.

The end-to-end journey (see `research/patient-entry-flows/README.md`):
1. The patient arrives at the site and talks to Simplicity, or picks a concern.
2. Simplicity triages: a walk-in, or becoming a patient.
3. The patient picks a doctor and window, and the window is held.
4. The patient signs in or registers.
5. The patient completes intake and joins the queue.
6. **The doctor calls out.** They chart, prescribe and order, then **sign off**.
7. Follow-up: results, readings, and returning to *their* doctor.

**Prototypes**, all deployed at https://designsimplecare-lab.github.io/SCDEMO/:
- `simplecare-physician-portal-v2.html`. This is **v2**, the active one. v1 is hidden from the demo.
- `simplecare-moa-portal.html`
- `simplecare-patient-portal-v2.html`
- `simplecare-design-system.html` (SimpleCare Paper)

## Glossary
| Term | Meaning |
|---|---|
| **Call window** | A block of time the patient books, e.g. 8–10 AM BC time. The doctor calls within it. It is not an appointment time. |
| **Queue / queue position** | The patient's place in line within the window. We show the position, not a wait estimate. |
| **Walk-in** | A one-off visit for something new. |
| **Become a patient / ongoing care** | The patient chooses a family doctor at SimpleCare and sees the same doctor every visit. |
| **Intake** | The patient's answers before the visit: the reason, what has changed since last time, and uploads. |
| **Chart** | The patient's record in the physician portal. |
| **This visit** | The current visit's working area on the chart. |
| **Care plan** | The **narrative** of what we are doing and why: Daniel's synthesis of the assessment and plan. It is **not** the task list. |
| **Task** | A practical to-do sent **from the doctor to the MOA**, one way only. |
| **Carry forward** | Unfinished work stays on the list and counts its days. Nothing is deferred to a scheduled date. |
| **Reviewed** | A **state**: the doctor is assessing. Nothing happens yet. |
| **Sign off** | An **accountable action** carrying the doctor's name. Signing the chart finalizes the visit; faxing a script signs off the prescription; submitting a bill signs off the billing. Daniel: "the Doctor has approved this, meaning my a** is on the line." |
| **Physician Assistant portal** | Japneet's portal. It is identical to the physician portal, and she acts under the doctor's delegated authority. |
| **Renewal** | Re-prescribing an existing medication. The **doctor** sends it, or **delegates it to Japneet, the physician assistant**, under his sign-off. It's his choice each time, and he keeps favourite scripts in the Rx function. |
| **Critical / High / Routine** | The inbox priority bands, from LifeLabs BC thresholds. Red is for critical only. |
| **Shadowing** | Real recorded consults, analysed in `shadowing/`. |
| **MSP / Teleplan** | BC's public insurance, and its billing system. |
| **PharmaNet** | BC's medication dispensing record. |
| **PHN** | Personal Health Number, a patient identifier. It never goes in the repo. |
