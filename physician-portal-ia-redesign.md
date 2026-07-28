# SimpleCare Physician Portal — Information Architecture Redesign

Based on review of the current build (Dashboard, Daysheet, Carry Forward, Claims, Set Schedule, Calendar, Copilot, Encounter History, Call Logs, Register Patient, Fee Settings, Profile). UX structure only — no visual design in this pass.

## The core problem

The current app has thirteen flat, equally-weighted nav items and five different screens that each partially represent "today's schedule" (Dashboard's Upcoming Appointments, Daysheet's queue + call-window tabs, Calendar's week grid, Set Schedule's day tabs, Copilot's Today Schedule command). None of them agree with each other, and none is clearly the canonical source of truth. Meanwhile the screen that matters most clinically — the live patient queue — currently shows completed visits with "0" in the queue-position column, which means it isn't actually a queue at all.

Everything below is designed around fixing that: one canonical Today surface, and a nav structure organized by how often and why a physician touches each thing, not by feature-team boundaries.

## Guiding principles (from healthcare UX research, applied here)

- **One source of truth per concept.** "Today's schedule" should exist in exactly one place with one data shape. Every other screen either deep-links into it or doesn't reference it at all.
- **Provider views need structured density, not flat lists.** Physicians are time-constrained and alert volume is real — every notification-style element (missing Dx, chart-verification warnings, queue urgency) needs a severity tier, not uniform visual weight. Flat, same-weight alerts are the documented cause of alert fatigue and override behavior in clinical software.
- **Patient/provider parity on shared concepts.** The patient app now has real queue states (waiting, next, in-progress, delayed, dropped, done, no-show) with symptom-flagged intake. The physician's queue view should mirror this exactly — same state model, richer clinical context layered on top — not reinvent it as a static appointment table.
- **Frequency and role should drive placement, not alphabetical/feature order.** Daily clinical tools, weekly admin tasks, and one-time account setup are three different mental categories and should look like three different categories in the nav.

## Proposed navigation structure

Replace the flat 13-item list with four grouped sections (visually separated, not just spaced):

**Clinical workflow** (daily, physician's core loop)
- Today — the new canonical view, replaces Dashboard as the landing screen
- Encounter Log — renamed from "Encounter History" (see below)
- Copilot — demoted from a top-level destination to a contextual panel (see below); if it stays in nav, it lives here as a secondary/assistive tool, not equal-weight with Today

**Schedule** (frequent, but distinct mental mode from "seeing patients right now")
- Calendar — becomes the single schedule-editing + week-overview surface
- Set Schedule folds into Calendar as an edit mode, not a separate destination (same data, same day-picker, no duplicate UI pattern)

**Practice admin** (weekly/periodic, arguably MO-portal territory — flag for the MO portal conversation)
- Claims
- Fee Settings
- Carry Forward (needs a decision: is this a real recurring workflow or dead weight? Currently empty-state only — confirm it's used before keeping it as a permanent nav slot)
- Register Patient — likely belongs in the MO portal, not here; recommend removing from physician nav unless doctors register patients themselves in practice

**Account** (rare)
- Profile
- Call Logs — this one is debatable placement; it's really a telephony/ops tool. If MOAs manage calls, it may also belong in the MO portal. If physicians place outbound calls themselves, keep it here but visually separate from clinical items.
- Sign Out

This turns "which of 13 equal things do I click" into "which of 4 categories am I in," which is a much faster scan, and it makes the eventual MO-portal split obvious rather than something we have to invent later.

## The canonical "Today" view (replaces Dashboard + merges Daysheet's queue)

This becomes the physician's landing screen and the only place "today" lives. Structure, top to bottom:

1. **Stratified alerts band** (only if something needs attention — collapses to nothing on a clean day). Two tiers: critical (e.g., a flagged red-symptom intake, an overdue chart-verification item) shown inline and requiring acknowledgment; routine (e.g., "7 claims missing Dx") shown as a dismissible single line, not a blocking banner. This directly fixes the flat-alert problem in Claims and Copilot's review queue.
2. **Live queue** — the actual replacement for the broken "Patient Queue" table. Same state model as the patient app: waiting / next / in-progress / delayed / dropped-reconnecting / done / no-show, per patient, with real position and wait time, not a static "0." Each row surfaces the clinical concern and any red-flagged intake symptoms at a glance — this is the one piece of information a physician needs before every call and it's currently missing entirely.
3. **Call-window context** — today's windows (8–10, 10–2, etc.) as a compact strip, not a separate tab system; clicking one filters the live queue rather than navigating away.
4. **Scheduled (non-queue) appointments for today** — the "Karen Anderson / Eric Janusson" style list, kept but clearly visually separated from the live queue so physicians never confuse "booked for later" with "waiting right now."

Everything currently duplicated across Dashboard's stat cards, Quick Actions, and Upcoming Appointments either merges into this view or gets cut. The three Quick Actions buttons (View Appointments, Manage Schedule, Update Profile) are pure duplicates of nav items and should be removed outright — that space should go to the queue instead.

## Copilot: contextual, not a destination

Right now Copilot requires leaving the workflow, typing a command, and reading results in a separate transcript. Recommend inverting this: surface Copilot's outputs (Patient Brief, Summarize Day) inline inside the Today view and inside each patient's chart, triggered by a button in context, rather than a standalone command-line screen. Keep a lightweight Copilot destination for power users who want the raw command interface, but it shouldn't be where most physicians encounter this feature day to day. The "verify source chart before clinical decisions" disclaimer is good practice and should follow the content wherever it surfaces, not stay trapped in a separate screen.

## Encounter Log (renamed from "Encounter History")

The current screen is a fax/delivery audit trail — what was sent, to whom, when. That's a legitimate and useful screen, but "Encounter History" implies actual clinical encounter records (SOAP notes, visit summaries), which this isn't. Rename to something accurate like **Encounter Log** or **Document Log**, and if real encounter/visit history doesn't exist yet as a screen, that's a separate gap worth naming explicitly rather than letting this screen imply it's already covered.

## Open questions before we build any screen

- Is Carry Forward an active workflow or should it be cut/merged into the Today alerts band as a category rather than its own nav item?
- Does Register Patient belong here at all, or entirely in the MO portal?
- Do physicians place outbound calls themselves (keep Call Logs prominent) or is that primarily MOA-driven (demote or move to MO portal)?

## Suggested build order once this is confirmed

1. Today view (alerts band + live queue + call-window strip + scheduled list) — highest leverage, fixes the core broken screen
2. Nav regrouping (mostly a placement/labeling exercise once Today exists)
3. Calendar/Set Schedule merge
4. Copilot contextual surfacing
5. Encounter Log rename + gap-check for real encounter records
6. Practice-admin section cleanup, informed by what moves to the MO portal
