# Physician Portal — Change Specification

Implementation spec for the SimpleCare doctor portal. Derived from a physician
review plus design decisions made on top of it.

Reference prototype (Live Queue, all changes applied):
https://claude.ai/artifact/WHPGeYHMybBDjsVnWxeKVj

**How to read this.** Items marked `DECIDED` are settled — implement as written.
Items marked `ASSUMPTION` were inferred, not specified by the client; implement
the stated default but surface it for confirmation. Items in *Do not build* are
deliberately excluded and must not be implemented.

---

## 1. Rename "Alerts" to "Needs your attention"

`DECIDED`

- The section currently titled **Alerts** is retitled **"Needs your attention"**.
- Title change only. No change to contents, ordering, or behaviour.
- Preserve the existing two-tier split: blocking items listed individually;
  non-blocking items collapsed behind a `N routine items (not blocking)` toggle.

**Acceptance:** no occurrence of "Alerts" remains in doctor-facing UI for this
section. Collapse behaviour is unchanged.

---

## 2. Home page composition

`DECIDED`

The Home page renders exactly two stacked sections, in this order:

1. **Needs your attention** — combined, prioritised summary drawing from *both*
   the Inbox and the Doctor Action Centre.
2. **Live queue** — the current call window plus any carryover patients.

**Acceptance:** an urgent item originating in the Doctor Action Centre appears in
Needs your attention without the doctor opening the Action Centre, and vice versa
for the Inbox.

`ASSUMPTION` — the inclusion threshold is: priority `Urgent`, priority `High`, or
any item whose status is `Overdue`. Not specified by the client. Confirm.

---

## 3. Separate the Inbox from the Doctor Action Centre

`DECIDED` — this is the structural change the rest depends on.

| | Inbox | Doctor Action Centre |
|---|---|---|
| Contains | Incoming **external** clinical information | **Internal** work items |
| Examples | LifeLabs results, imaging, consultation reports, discharge summaries | Patient follow-up, prescriptions, forms, referrals, staff escalations, delegated tasks |
| Entry point | Existing Inbox nav | Left navigation |

### 3.1 Linked tasks

- Reviewing an Inbox item **may generate** a Doctor Action Centre task.
- The task holds a reference back to the originating document.
- The document **does not move**. It remains in the Inbox and in the patient chart.

**Acceptance:** creating a task from an Inbox item leaves that item present in
the Inbox. Opening the task navigates to the source document.

### 3.2 Action Centre views

Three views: **My Actions**, **Team Actions**, **Completed**.

### 3.3 Task data model

Every task carries, and displays:

| Field | Values |
|---|---|
| `priority` | `Urgent` \| `High` \| `Routine` |
| `status` | includes `Overdue` |
| `timeTolerance` | — |
| `deadline` | — |
| `assignee` | — |

**Critical rule:** `Overdue` is a **status, not a priority**. An overdue item does
**not** escalate to a higher priority band. It sorts first *within* its existing
band.

Sort order: priority band (Urgent → High → Routine), then overdue-first within
each band, then by deadline ascending.

**Acceptance:** an overdue `Routine` task sorts above a non-overdue `Routine`
task, and below every `High` task.

### 3.4 Task row density

`DECIDED` — do not render all five fields as equal-weight text; the list becomes
unscannable.

- Primary line: patient name + action
- `priority` → severity stripe / colour, not a text label
- `deadline` → relative time (`in 2h`, `3d overdue`)
- `assignee` → avatar
- `timeTolerance` → detail view only, not the row

---

## 4. Call windows and Carryover

`DECIDED`

### 4.1 Default and auto-advance

- The queue defaults to the **current call window**, not `All`.
- It advances automatically as the day progresses.
- Windows: `8:00–10:00`, `10:00–2:00`, `2:00–5:00`, `5:00–7:00`.

### 4.2 Carryover

When a new window begins, unfinished patients from the previous window are
**not hidden**. They render in a **Carryover** section pinned above the current
window's patients.

A notice states: which window has started, and how many patients carried over.

`ASSUMPTION` — a patient who carries over more than once remains in Carryover
with an age indicator rather than creating a second carryover section. Not
specified. Confirm.

### 4.3 Interruption rule

Auto-advance **must never** interrupt an active call or an open chart. Defer the
switch until both are closed.

### 4.4 Manual override

- Selecting `All` or a specific window manually **pauses** auto-advance.
- Auto-advance resumes only when the doctor explicitly returns to auto.

### 4.5 Auto state must be visible

`DECIDED` — this is a design addition, not client-specified, and it is required.

Auto/paused is a **persistent visible indicator**, not an option buried in a
dropdown:

- Auto on → `Auto-advancing · 2:00 – 5:00`
- Auto paused → `Paused — viewing All`, visually distinct, with one-click return

**Rationale:** as a dropdown option, doctors do not notice they have left auto
mode. This is a known mode-confusion failure.

### 4.6 All view

When viewing `All`, render **time separators** grouping patients by call window.

---

## 5. Live Queue table

### 5.1 Column order

`DECIDED` — move **Billing status** to sit directly beside **Visit status**,
forming a single status cluster at the right edge.

Order: `#` · `Patient` · `Health card` · `Clinical concern` · `Billing status` · `Visit status` · `actions`

### 5.2 Call button — active patient only

`DECIDED`

- The Call button renders **only** on the active patient (next in line).
- No other row may be called from the queue.

**Rationale (client):** mirrors a walk-in queue. Patients cannot skip the line,
and sequential calling is what makes the queue function.

Doctor-initiated calls do not go through the queue — see §7.

> A visible-but-secondary button with a confirm dialog was proposed and
> **rejected**. Do not reintroduce it.

### 5.3 Row click opens the chart

`DECIDED`

- Clicking anywhere on a patient row opens that patient's chart.
- There is **no** "Access Chart" button. It was removed as redundant.
- Rows must be keyboard reachable (`tabindex="0"`) and open on `Enter`.
- Rows must render as interactive (pointer cursor, hover state).
- Action buttons inside a row must `stopPropagation` so they do not also open
  the chart.

### 5.4 Row actions reveal on hover

`DECIDED`

- `Call` (active patient only) and `Task MOA` are **hidden at rest** and revealed
  on row hover.
- Must also reveal on `:focus-within` so keyboard users can reach them.
- Buttons stay in the DOM with reserved width — **rows must not shift** when
  actions appear. Use opacity, not `display`.
- Hidden buttons must be `pointer-events: none` so they cannot be clicked while
  invisible.
- **Touch:** `@media (hover: none)` keeps actions permanently visible. Hover does
  not exist on touch devices and the actions would otherwise be unreachable.

### 5.5 Active patient marker

`DECIDED` — required consequence of 5.4.

With the Call button hidden at rest, nothing indicates who is next. The active
patient row must carry a persistent marker:

- A coloured edge on the row, and
- A `NEXT` tag beside the patient name

---

## 6. Inbox

### 6.1 Sort oldest first

`DECIDED` — the Inbox sorts **oldest first** for chronological review.

> **Hard dependency.** This is only safe because urgent results surface in
> "Needs your attention" (§2). Without that, a critical result arriving late in
> the day sits at the bottom of the list. **Do not ship 6.1 before §2.**

### 6.2 Remove the outstanding-labs strip

Remove the "Lab work still outstanding" block from the Inbox. Its function is
replaced by 6.3.

### 6.3 Outstanding results after clearing

When a doctor clears results, any **still-pending items from the same order**
remain visible to them.

**Client's case:** an STI panel returns gonorrhea and chlamydia quickly while HIV
and Hep C lag. The doctor clears the fast results and must still see the slow
ones listed as outstanding.

---

## 7. Add-On booking

`DECIDED`

When the **doctor** books a patient (rather than the patient entering the queue),
the patient is created under **Add-On**:

- Callable immediately, with no queue position
- Held **outside** the patient-initiated queue
- Does not affect queue ordering

This is the sanctioned path for doctor-initiated calls, given §5.2.

---

## Do not build

These are unresolved. Implementing them now risks building the wrong thing.

### Care Plan summary in the Inbox — BLOCKED

The client asked for a "highly synthesized" care plan pulled from the patient
chart into the Inbox, so the doctor sees why each patient is being worked up.

**Blocked on a clinical safety question:** is this doctor-authored text carried
verbatim from the chart, or generated? If generated, what is the review path
before a doctor acts on it? A stale or incorrect care-plan summary in a clinical
context is a safety defect, not a UX flaw.

### Task button placement — CONFLICT, needs client sign-off

The client asked for a Task button on **every patient** — in queue rows, the
chart, and the Referrals / Imaging / Labs / Prescriptions modals — and explicitly
accepted the visual cost:

> "It can look a bit cluttered with a 'Task' button for every patient but it
> serves a useful purpose."

Current spec (§5.4) hides Task behind hover, which reverses that decision.
**Flag to the client before building.** The underlying requirement is that
tasking auto-populates patient context for the MOA — not necessarily that a
button is visible on every row.

### Source document verification — NEEDS DESIGN

Doctors want to verify results against the source document (LifeLabs, imaging
centre, hospital report). Labelling is already standardised and clinically
validated; imaging labels match Radiology's internal scheme. Incoming faxes are
auto-labelled and attached to the chart.

The UI approach was explicitly left open. Needs a design pass before spec.

### Claims — NEEDS SCOPING

Client asked to "review our current physician portal and optimize it" for claims.
No specifics provided. Not actionable yet.

---

## Out of scope

**MOA-side experience.** How tasks are received, queued, and worked by the MOA is
deliberately deferred until the doctor portal is settled. This spec defines only
the doctor's side of task creation.

---

## Gaps the client did not address

Worth raising rather than guessing:

1. **Call failure handling.** Statuses `Missed call` and `Call dropped` exist, but
   the recovery flow is unspecified. What happens to queue position when the
   active patient does not answer? Does the queue auto-advance?
2. **Notification model.** Nothing specifies how or whether the doctor is
   interrupted for a newly arrived urgent result mid-call.
3. **Queue override authority.** §5.2 forbids calling out of order. No escape
   hatch is defined for genuine clinical urgency beyond Add-On, which is a
   booking action rather than a call action.
