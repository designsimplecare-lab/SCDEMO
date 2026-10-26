# Ava EMR: how its clinical workflows are designed

*Research note, 26 October 2026.*

## How this was done

- **Videos.** I analysed 25 public Ava Academy videos at avaindustries.ca/ava-academy/video-library, frame by frame. The Mux players have no captions and the narration was not available, so everything here comes from what is on screen.
  - Short tutorials were sampled every 4 to 10 seconds, more densely when a modal opens.
  - The two webinars were sampled every 45 to 60 seconds, and densely around product screens.
- **Lesson pages and web.** I read the lesson page text (Next.js page JSON) and ran a short web search on prescribing.
- **No missing lessons.** The Module 2 and Module 3 index pages list only the lessons we already had:
  - Module 2 lesson 6 is "6. Favourites", at the slug `7-favourites`.
  - Module 3 lesson 3 is "3. Task and Imported File Macros", at the slug `5-task-and-imported-file-macros`.
- **Demo data.** All screens use demo clinics, most of them set up for Alberta. Demo patients are called "demo patient" here, and staff names are left out.
- **Citations.** Timestamps look like "m3-1 @1:20". Video keys:

| Key | Video |
|---|---|
| m1-1 … m1-5 | Orientation Module 1: navigation, scheduler, chart basics, core workflow, core workflow complex |
| m2-1 … m2-5, m2-7 | Module 2: PDF forms, note templates, stencils, macros, billing basics, favourites |
| m3-1, m3-2, m3-5 | Module 3: labs and investigations, consult responses, task and imported-file macros |
| m4-1, m4-2 | Module 4: task overview; task management, routing and mass reassign |
| sw-files, sw-connect | Support workflow: assigning and classifying imported files; Ava Connect access and patient messages |
| ai | Ava Pro: AI workflow overview |
| tags, booking | Ava Pro: patient tags; public booking |
| web-charting | Webinar 2026-09-22, "Less Charting, More Caring" |
| web-eforms | Webinar 2026-10-21, "Smarter eForms" |
| helcim, event | Helcim payments; "Seed to Scale" event |

- **What counts as fact.** Anything marked *inferred* is my reading and is not shown on screen.

---

## 1. Summary of Ava's design approach

Ava is a dense, desktop-first EMR. It has a thin top menu, and there is no left navigation:

- Dashboard, Scheduler, Bills, Tasks, Consults/Waitlists, Data Management;
- a tab for the open patient;
- on the right, a clinic switcher, a "Patient Charts" search and a user menu that holds most configuration.

**Two hubs.** The product is organised around two places:

1. **The chart.** It is chart-centric for documentation.
   - The chart is a fixed dashboard of about 12 to 17 small panels in three or four columns, with no tabs:
     - left column: Health Profile, Social History, Allergies, Medications, Notices;
     - centre column: Clinical Notes and Consults;
     - right column: Reminders, Labs, Investigations, Other Documents/Forms, Letters, Calculated Results, Photos.
   - Every panel follows the same pattern: "↗" opens the full view and "+" adds an item inline.
   - The note editor opens in the middle of that dashboard.
   - The note's footer collects what happened in the visit: "Changed Medications", "Requisitions", the AI buttons, Complete, and the bill.
2. **Tasks.** It is task-centric for everything that comes in.
   - One three-pane Tasks screen is the inbox for imported faxes and labs, results, consult responses, patient messages, failed faxes, reminders and requisition tracking.
   - The left pane has about 18 categories with counts. The centre pane shows the document. The right pane is a persistent patient sidebar.

**Speed tools.** Ava speeds up charting with four overlapping tools:

- note templates;
- stencils, which are pre-filled templates with patient aliases;
- macros, which are typed shortcuts with pick-list tokens;
- favourites for bills and medications.

Each tool has "most used" counts and can be shared with the clinic.

**AI.** AI (Ava Pro) appears as clearly labelled assistants: scribe, AutoChart, consult letters, care plans, document classification and new-patient pre-fill. Almost every AI output needs a click to apply.

**Overall.** The design is fast for an expert but visually overwhelming:

- tiny text of about 11 to 12 px;
- many icon-only buttons;
- red used for several different meanings;
- every panel visible at once.

This matches our client's description, "the best EMR" but overwhelming.

---

## 2. Workflows as seen on screen

### 2.1 Navigation and layout (m1-1; also m1-3, m2-3, m4-2)

- **Top menu** (m1-1 @0:43–1:16):
  - Scheduler ▾: Day View, Week View, Pending Appointments.
  - Bills ▾ (Alberta clinic): My AB Bills, My AB Payment Summaries, My Private Invoices, Billable Clinical Notes, Clinic AB Bills, Clinic AB Payment Summaries, Clinic AB Submission Reports, Clinic Private Invoices, AB Notices.
  - Tasks ▾: Tasks, Outgoing Faxes, All Tasks, New Reminder.
  - Consults/Waitlists ▾: Consults, Consult Requests, Waitlists, Address Book. "Enhanced Waitlists" also appears in web-eforms @38:30.
  - Data Management ▾: Patient Lists, Panel Profiles, Prevention + Screening, Merge Charts, Data Exports.
- **Dashboard** (m1-4 @0:10, m1-1 @0:15). Three columns:
  - "Ava Updates", a feed of release notes;
  - a mini day schedule;
  - patient search ("Change to Advanced Search", "Inc. Deceased?", "Non-clinic pts?", "New Pt.") and a **patient sidebar**.
- **Patient sidebar.** It appears on the dashboard, the scheduler and Tasks, and contains:
  - a demographics card, including the preferred pharmacy, with icons for demographics, $ (bill), calendar and ID card;
  - pink "Notices";
  - tag pills;
  - 12 accordion buttons: Ava Connect, Appointments, Bills, Calculated Results, Clinical Notes, Clinic Policies, Histories (PMHx, Sx, Fx…), Invoices, Labs/Inv., Other Documents, Screening, Tasks/Reminders.
  - There is no Medications button in the sidebar (m3-1, sw-files @6:20).
- **User menu** (m1-1 @2:07, m4-2 @1:22). It mixes personal and configuration items: Admin, Account Management, Clinic Management, Issue Management, Ava eForm Templates, Flowsheets, PDF Forms, Billing/Locum Defaults, Note Templates, Scribe Templates, Stencils, Sign Out, Support.
- **Settings are split across two places:**
  - **Account Management** (m2-7 @0:32): Employee Information, Provider Credentials, Ava Intelligence, Security + Passwords, External Services, Clinic Positions, My Schedules, Authorized Prescribers, Appointment Types, Screening Templates, Ava Customizations, Billing Favourites, Medication Favourites, Macros.
  - **Clinic Management** (m3-5 @2:45, m4-2 @1:32): Task Groups, Task Routers, Mass Reassign Tasks, Rooms, Clinic Pods, Fax Providers, Letterheads, Tags, Employees, Locum Assignments, Authorized Prescribers, Audit Patient View, Appointment Types, Public Booking, Clinic PDF Forms, Clinic Ava eForms. The booking video @0:25 also shows Bill Templates, Medication Favourites and Task Macros here.
- **Floating dock** at the bottom right of the chart: notes, microphone (scribe), AutoChart, clock and calendar (m1-3 @2:54, ai @0:16).
- **Bottom left:** chat pills for internal messaging, *inferred* to be "EMR Messenger" (m1-1, m2-5).

### 2.2 Scheduler (m1-2, m1-4)

- **Day View** (m1-4 @0:18) is a grid with one column per provider. Each column shows a count and six small icons (edit, calendar, refresh, print, list, $).
  - Above the grid: provider and resource chips ("Procedure Room", "Walk-In", "Arrived", "+ Add") and "Walk-In Queue (0) +".
- **Booking takes about four clicks in one modal** (m1-4 @0:42–0:58): click a slot → "Appointment Scheduling" → search for the patient → Save.
  - The modal also shows:
    - a warning when the provider is not the patient's primary clinician;
    - demographics and an "Ava Connect Dashboard" link;
    - the lists Upcoming Appointments and **Unpaid Invoices**.
  - Fields: Type, Duration, Preceptor, "Appointment Notes/Chief Complaint", Status, Clinic Pod, Clinic Resources, Room.
  - Checkboxes: Mark as private?, Critical?, Skip Reminders?, Pt. Confirmed?
  - Buttons: Delete, Close, Save + Copy, Save.
- **Appointment statuses** (m1-4 @2:02): Booked, Arrived, Roomed, Ready, Left, Transcribed, Billed, Cancelled, Missed.
  - Status changes through a dropdown in the same modal, with the toast "Updated Appointment!".
  - The block changes colour, and later reads "Rm 1".
- **Week View** shows one provider at a time (m1-2 @1:39). A printable "clinic_dayview.pdf" daysheet is available (m1-2 @1:32).
- **New Patient** is one long modal of about 30 fields (m1-2 @2:07). Its buttons are "Save + Add Family Member" and Save.
- **Public booking** (booking video):
  - The patient goes through a five-step stepper and ends on "Your Appointment is Pending".
  - Staff see a pending block. If no chart matches the PHN, the modal says it could not match one, with the options Create New Patient Chart / Attach to Existing Patient / Rebook / Delete (booking @4:05–4:25).

### 2.3 Chart (m1-3; also web-charting @4:30, sw-connect @0:58)

- **Opening the chart.** It is opened from search ("Go to Chart") or from the scheduler. A "Patient Notice Pop Up" modal appears on open (m1-3 @0:38, m1-4 @1:30).
- **Panels** (m1-3 @0:46):
  - **Column 1:** patient header; demographics, weight and height, pharmacy, primary clinician; Family Hx | Vaccines; **Health Profile** (problems with ICD-9 code and a red ⚠); Social History; Allergies/Intolerances; **Medications** (drug plus a short sig such as "1 TAB PO BID"); Notices.
  - **Column 2:** Clinical Notes list (date, type icon, author, edit and print); Vitals ↗ and Invoices ↗; the note workspace.
  - **Column 3:** Consults with status (Incomplete, Received, Sent, Booked, Waitlisted); Patient Lists ↗; Ava Connect ↗.
  - **Column 4:** Reminders (overdue in red); Clinic Policies; Screening; **Labs** (abnormal rows in red); **Investigations**; Other Documents/Forms; Letters; Calculated Results; Photos.
- **Inline add.** For example, Health Profile "+" opens a form with an ICD-9 type-ahead, Date of Onset, Category, Notes, "Active Problem?" and "Mark as Private?" (m1-3 @1:10–1:26).
- **Lists are cut to about five rows.** To see the rest you open "↗", which opens a full modal (for example Reminders, m1-3 @2:14).
- **Ava Connect card.** It shows whether the patient has signed up for the portal. If they have, it suggests messaging the patient instead of calling (m1-5 @0:46, web-charting @24:30).
- **Patient Summary PDF** (ai @2:22) has sections for histories, allergies, current medications, vaccines and vitals.

### 2.4 Core visit workflow, simple (m1-4) and complex (m1-5)

**Simple** (m1-4):

1. Book the appointment (@0:50).
2. Arrive: set Status to Arrived and Save (@1:14).
3. Open the chart; the notice pop-up appears (@1:30).
4. The note opens inline as "SOAP Note - Rm 1" (@1:38).
   - Fields: Note Date, Author, Clinic, Appointment, Chief Complaint, Preceptor ID, Locum Covering For, Confidential, Critical, Subjective, Objective.
   - An always-visible vitals grid: BP, HR, Temp, O2 Sat, RR, Weight, Height, BMI, Waist.
   - Then Assessment, Plan, Dx 1–3, Mode.
   - Toasts: "Note Saved!" and "Autosaved Clinical Note".
5. Note footer (@2:34):
   - **Ava Pro**: AutoChart, "Generate Care Plan (AI Assist)", Create Care Plan;
   - tabs Chart Updates | Attachments | Sending Options;
   - **"Changed Medications:"** and **"Requisitions:"**;
   - buttons **Print Reqs/Meds**, Cancel, Save, **Complete**.
6. A pink "Bills" section sits under the note with "New Bill", which opens the Bills modal (@2:42).

In total this is roughly 15 to 20 clicks across 3 screens and 3 modals.

**Complex** (m1-5):

1. Arrive and room the patient in one save (@0:14–0:30).
2. Clinical Notes "+" opens **"Select Note/Flowsheet Template"**, which has four quadrants (@0:54):
   - Blank Note Template;
   - Note Stencil;
   - Flowsheet (for example a prenatal record or "INR Manager");
   - Copy Recent Clinical Note.
   Each quadrant shows a "Most Commonly Used" list with use counts.
3. Pick a stencil. The note is pre-filled with questions and pick-list tokens such as `<<Today#Yesterday#…>>` (pick one) and `<<Clear&Wheezing&Rhonchi>>` (pick several, *inferred*). An alias inserts the full medication list as 13 numbered lines (@1:34).
4. Clicking a token opens a keyboard-driven popup: "Backspace - Remove Text / Spacebar - Select/Deselect Text / Enter - Confirm Selected Text" (@2:06).
5. Right-clicking in a field opens a menu: Time Now, Date Now, Histories ▸, Macros ▸, Save Selected as Macro (@2:46).
6. **Complete** locks the note. The fields turn grey, an "Addendum" / "Add to Addendum" area appears, and the button becomes "Unlock Note" (@3:42–3:50).
   - In the demo, the Assessment and Plan tokens were still unresolved when the note was completed.
7. New Bill: typing "03" shows billing favourites marked with a heart (@4:14–4:28). After billing, the appointment status becomes "Billed" (m2-5 @2:20).

**Close-out in the webinar** (web-charting @28:15). The Chart Updates tab shows:

- **"Updated During Encounter:"**
  - Medications, with a green ✓ and the prescriber for each;
  - Requisitions, for example "Lab Req – Diabetes – APL" and "Investigation Req – Mammo-1";
- "Mark Appointment as 'Left'";
- Print Reqs/Meds | Cancel | Save | Complete.

### 2.5 Note templates, stencils, macros, favourites

- **Note templates** (m2-2):
  - User menu > Note Templates has "My Templates Collection", which shows Times Used, Version and a **Bill Template** link per template (m2-7 @2:52).
  - **Browse Templates** is a shared library across Ava clinics. It contains hundreds of templates, many of them duplicates, for example "1st Gyne Consult" ×8 (m2-2 @0:58–1:18).
  - The builder (@1:28–2:38) offers field types **Text Field, Checkbox, Radio Button, Section Header, Vitals**. You drag fields into one or two columns.
  - It warns: "Field names must be unique otherwise the data put into the fields will not be persisted."
- **Stencils** (m2-3):
  - Stencils are templates pre-filled with wording and aliases. There are three kinds: Clinical Notes, Consults/Requests and Letters (@2:38).
  - The editor has an **Alias References** panel of click-to-copy tokens, for example `%^p_full_name^%`, `%^p_meds^%`, `%^p_allergies^%` and last vitals such as `%^p_bp^%`. You copy a token to the clipboard and paste it (@0:28, @1:18).
  - A consult stencil can be linked to a waitlist (@2:38).
  - Letter stencils (for example "Sick Note") open in a Letters modal with Save + Fax and Save + Print (@4:28).
- **Macros** (m2-4; web-charting @6:30–18:30):
  - They live in Account Management > Macros. Fields: Category, Name, **Typing Shortcut**, Icon, Macro Content, Share With Clinic?
  - You trigger one by typing ";" and the shortcut (for example ";ROS"), or through the right-click menu; the help text says Option/Alt + right-click (m2-4 @0:40).
  - Any selected text can become a macro with "Save Selected as Macro" (m2-4 @2:24).
  - **Dynamic macros** pull recent values with dates, for example `<<labs:A1c>>` gives a picker such as "5.2 (2026-Sep-22)", and `<<vitals:bp>>` works the same way (web-charting @6:30–8:30).
  - Histories ▸ inserts whole lists. In the demo that was a 38-item problem list and 15 medications, pasted into Assessment (m2-4 @2:00–2:16).
- **Billing favourites** (m2-7 @0:42–1:52):
  - "My Bill Favourites" has columns code, shortcut, modifiers and Dx.
  - The form has about 8 inputs, including "Add Lines" and "Share With Clinic?".
  - Favourites appear first in the service-code type-ahead.
  - They can be attached to an **Appointment Type** (field "Bill Template", m2-7 @2:22–2:42) or to a **Note Template**.
- **Medication favourites** are covered in section 5.

### 2.6 PDF forms and eForms (m2-1; web-charting @21:30–25:30; web-eforms)

- **Clinic PDF Forms** (m2-1 @0:20). Columns: PDF Name, Category (Lab / Investigation / Referral Form / Patient Handout / Other), Version, Geography (AB, BC…). The shared library includes BC health-authority and LifeLabs forms.
- **Requisition Tracking** (m2-1 @0:50):
  - Fields: "Due in X Days" (for example 30 days) and Assign To.
  - If the patient has not completed the requisition by then, a notice appears in Tasks under "Reqs." (24–26 items in the demos).
- **Form Defaults.** Aliases are pre-placed on the PDF, for example `%^p_phn^%` and `%^provider_full_name^%`, and default ticks can be saved (m2-1 @2:40).
  - Uploaded PDFs need fields dragged on by hand ("Apply Fields", @3:20).
  - "Duplicate PDF Form" stores a **Fax Number** with each form (@2:20).
- **Ordering from the chart:**
  - Labs/Investigations "+" opens an inline **"New Requisition"** mini-form with the form type, provider, clinic, Fax From and Letterhead (m1-3 @2:38, web-charting @24:50).
  - The form opens in an editor with To, To Fax, "Only 1st Page?", From, Letterhead, Coverpage Notes and **Fax**.
  - A paper-plane icon has the tooltip "Click to send to the Ava Connect portal" (web-charting @25:05–25:20).
- **eForms v2** (web-eforms):
  - Patients fill a stepper on the Ava Connect portal (@1:30).
  - The chart shows "Patient Answers", with automatic scoring such as "PHQ-9 Score: 19 [Moderately Severe]" (@5:30).
  - One-click outputs: **Build SOAP Clinical Note**, Build Blank Clinical Note, consult letter, letter (@4:30).
  - **Smart Fields** suggest chart entries with this note: "Review before adding them to the chart". Each item has its own ✓ / 🗑 (@7:52).
  - The builder has show/hide logic, conditional styling, score calculators and output formats (@12:30–26:30).

### 2.7 Prescribing

See section 5. In short: the prescribing screen is **native to Ava**. It is a "Medications" modal opened from the chart (web-charting @25:30–28:15).

### 2.8 Labs and investigations: incoming files, matching, classification, routing, review, filing (m3-1, m3-5, sw-files)

**Inbox.** Tasks has three panes (m4-1 @0:51):

- **Left:** an owner dropdown, "Currently Due", and categories with counts: All, Urgent, Labs, Investigations, Reminder, Pt. Messages, Reqs., Recently Completed, Group by Patient, Other Clinics, Consults, Con. Requests, Notes, Imported Files, Other, Failed Faxes, Patient Forms, Recycle Bin. Below them: "Filters/Sorting", **Import PDF**, and the list.
- **Centre:** the item. The empty state reads "No task selected! Select a task to get started!"
- **Right:** "Assign Patient", which is patient search plus the sidebar.

**Steps for an imported investigation** (m3-1):

1. **Import.** "Import PDF" opens "Import Documents" with "Drop Files Here (Max 10 MB)" (@1:12). Faxes also arrive in Imported Files.
2. **Match the patient.** You search by name or HCN by hand; the trainer circles the name and DOB on the PDF (sw-files @1:32).
   - If no chart exists, "New Pt." opens **"New Patient (Patient Data Pre-Filled with Ava Pro)"**, filled from the document (sw-files @2:20).
   - Re-attaching to another patient shows a red warning (sw-files @2:56).
3. **Claim + Sort.** The tooltip says it assigns the file to you and lets you sort it (m3-1 @1:57).
4. **Classify** with four buttons: **Results (Labs/Imaging)**, **Consults**, **Inc. Consult Request**, **Other Document** (@2:06).
   - An **"Ava Intelligence: Consult | Allergy | Consult Report"** banner can suggest the classification. You click it to accept (sw-files @3:44).
5. **Result form** (m3-1 @2:22; sw-files @5:20):
   - Type of Result: Lab or Investigation.
   - Type: X-Ray, ECG, Ultrasound, Mammogram… or a lab type.
   - Name and Date.
   - **Abnormal Flag**: blank / Normal / Abnormal / Critical, set by hand for PDFs.
   - Save as Result. Toast: "Attached imported file!"
6. **Route.** The file becomes a task for the MOA. The MOA picks the physician (the list is grouped "Physicians"), types "Please review…", and clicks **Reassign**. The next item loads by itself (@2:52–3:19).
7. **Doctor review** (@3:32–3:52). The doctor reads the result, types an instruction ("Recall patient to discuss results"), sets the assignee back to the MOA, and saves.
   - **There is no Sign, Acknowledge or Reviewed button.** Review is recorded only as a note plus a reassignment in the task history.
8. **Close.** The MOA clicks **Mark Complete** (@4:02).
9. **Filed.** The result shows in the chart under Investigations. "↗" opens a viewer with Subcategory/Name filters, "Abnormal/Critical Only?" and "Include Deleted?" (m3-1 @4:12–4:22; web-charting @45:05).

**Other details:**

- **Structured labs** show as a table with columns Test / Result / Ref./Units / Flag / Status. Abnormal rows are fully red with an "L" or "H" flag, and abnormal rows in the task list are red too (m3-5 @2:15).
- **Task detail block** (m3-1 @2:40):
  - a history log;
  - "New Notes" and "Confidential?";
  - **Message Patient** (when the patient has the portal), **Fax**, a macro dropdown, the assignee, Save/Reassign;
  - ▸Priority, Recall?, ▸Due Date;
  - **Mark Complete**;
  - then a PDF viewer with two toolbars of about 20 icons.
- **Macros** (m3-5):
  - An **Imported File Macro** sets Category, Subcategory, Document name, notes and assignee in one step (@1:25). An example is "Discharge Summary".
  - **Clickable icon macros** fill in assignee, note and priority in one click (@2:25). An example is "Urgent Lab Review – Dr. X".
  - Ava's own guidance on the settings page recommends no more than 3 or 4 icon macros, to avoid clutter (@2:45).
- **Clinic AI switches** (m4-2 @3:22, m2-7 @2:12): "Ava Intelligence Settings" with Document Classifier, Predict Employee and Results Classifier.
- **AutoChart on a filed result** suggests problems and reminders, for example "Repeat chest X-ray", and highlights the source sentence (web-charting @45:05–45:30).

**Click count.** Filing and routing one investigation takes the MOA about 9 clicks. The doctor's review takes about 3, then the MOA closes it with 1 more (m3-1).

### 2.9 Consult responses and referrals (m1-3, m3-2, m2-3, sw-files, ai)

- **Outgoing referral.** Consults "New Consult Request" opens an inline form of about 25 fields (m1-3 @1:58–2:06):
  - Service, Referring Provider, Letter Name, Consultant, Fax Number, Stencil;
  - "More…" with Priority, Outgoing clinic, Letterhead and Coverpage;
  - a rich-text letter with an AI icon;
  - "Additional History" checkboxes: PMHx, Meds, Allergies, Family History, Social History, Vaccines;
  - Attachments;
  - a **Task** block: Due Date, Assign To (for example "MOA Task Group"), Priority.
- **AI-drafted referral** (ai @1:28–1:52). AutoChart's "Open Form" pre-fills the letter, and "Context Notes Used" chips show which earlier notes it drew on. "Autochart: Generate a Consult Request" lets you regenerate it from a prompt.
- **28-day reminder.** "Send Reminder ☑ 28 days" with an assignee is on by default when a consult is created (sw-files @4:32; ai @1:28).
- **Incoming response** (m3-2):
  1. Imported File → match the patient → Claim + Sort → Consults (@0:37–0:51).
  2. "Assign Imported File to Consult" lists the patient's open consults (@0:58).
  3. The preview form has Direction ("Response (Left)"), Document Date, **Category** and **Consult Status** (@1:05).
     - Category is pre-filled by AI. The page URL showed `prediction_name=Consult+Report` with confidence 0.855.
     - Category options: Outgoing Document, Consult Request, Referral Received Confirmation, Consult Report…
  4. Choosing "Referral Received Confirmation" sets the status to **Received** → Attach (@1:40).
  5. "Assign Consult Task" → note "Review document" → Mark Complete (@1:47–2:08).
  6. The chart's consult detail shows the status, Latest Document, Consultant and Fax, Appointment Time, "Main Consult Task: … Incomplete", "+ add reminder", and the attached PDF (@2:36).
- **Consult statuses seen:** Incomplete, Sent, Received, Booked, Waitlisted, Completed.
- **Incoming consult requests** (for specialists) appear in Tasks > Con. Requests (m2-3 @3:18).
  - The header reads "Consult Request: Pending review", with **Decline / Req. Info / Accept / Respond**.
  - A stencil letter is ready to send with **Save + Fax**.

### 2.10 Tasks and routing, including mass reassign (m4-1, m4-2, m3-5)

- **Task types and categories** are as in 2.8. Rows show date and title on one line and the patient on the next. Urgent and overdue rows are red, and Urgent has its own count (m4-1).
- **Task notes are an append-only history.** Each note is stamped "author → assignee | date | time" (m4-1 @5:03–5:15).
  - In one log the first entry showed a raw object ID, `#<Employee:0x…>`, which is a visible bug (m4-1 @8:03–8:39).
- **Reassign** uses a dropdown grouped by role. Priority (Normal/Urgent) and Due Date are hidden behind disclosure triangles. "Mark Complete" moves the task to Recently Completed, with the toast "Updated task!" (m4-1 @6:03–7:51).
- **Doing more from inside a task:**
  - the sidebar accordions let you open notes or appointments;
  - the **$** icon opens the full billing modal (m4-1 @3:51);
  - you can message the patient or fax.
- **Reminder task** (m4-1 @8:03): macro dropdown, priority, title, due date, clinic, assignee, "Do not show in my tasks list", Prior Notes / New Notes, Close / Save / Mark Complete.
- **Coverage** (m4-2):
  - **Short-term cross-coverage:** switch the owner dropdown at the top of Tasks to another physician and work their list (@0:32–0:52).
  - **Mass Reassign Tasks** (Clinic Management): Clinic, Move Tasks From, Move Tasks To, "Include Future Tasks?", **Reassign**. That is about 4 clicks.
    - Clinical notes are excluded.
    - No preview of how many tasks will move was seen (@1:32–1:57).
  - **Task Routers:** Start Date, End Date, Redirect From, Redirect To. They run about once an hour (@2:12–2:32).
  - **Default Task Handler** catches unassigned work (@3:22).
- **Task macros** (m3-5 @3:15): General Task Macro and Imported File Macro.
  - Fields: Name, Assign To, Task Priority, Recall, Task Message, Icon.
  - A macro can target a person, a task group, or a service.

### 2.11 Patient messages and the Ava Connect portal (sw-connect; ai; web-eforms)

- **Inbox.** Patient messages are a Tasks category, "Pt. Messages", shown in the same three panes (sw-connect @1:10, @5:10).
- **Thread view:**
  - Header: First Message, Initiated By, CC'd Participants, Primary Participant, Responding Ability.
  - Bubbles carry **read receipts**: "Read at … by …" or "Unread by patient".
  - Composer: "+ Send PDF Document", **"Send As: As Myself"**, **"Check Within: 1 week"**, Send Message.
  - Then Reassign Primary Participant, Save, Mark Complete, Task Notes.
- **After sending**, the toast says the patient has been emailed to check Ava Connect (@6:10).
- **Attachments are filed by hand.** A PDF the patient sends shows "Click to Attach to Chart", one click per file (@6:22).
- **"Edit Conversation Options"** (@7:10–8:10): Outgoing Clinic, **Response Permissions** (Multiple Responses / One Response), CC Participants.
- **Access** is a full-screen modal with tabs Account Management / Send Invitation / Messaging / Caregivers / Permissions (@1:22–1:46).
  - Invitations go by email and are valid for 5 days. The patient signs up by verifying their birthdate and creating a password (@1:58–2:34).
  - **Caregivers** have time-bounded relationships with a history (@3:10–3:34).
  - **Messaging permissions** route patients to task groups (Reception, MOA Task Group, Recalls…) or block messaging (@3:46–4:34).
- **Portal home** (@2:46):
  - Patient Charts: Summary, Medical/Family/Social/Allergy History, **Medications Review**, Referrals, Vaccines.
  - Documents.
  - Biometrics: BP, weight and glucose graphs.
  - Appointments, Test Results, Care Plans, Messages.

### 2.12 Billing basics (m2-5; m1-4, m1-5, m2-7)

- **Where a bill starts.** You can create one from the note's Bills section, from the chart, from the scheduler sidebar's "Bills", or from the $ icon in a task (m2-5 @0:40–2:40, m4-1 @3:51).
- **Bills modal** (m2-5 @1:00–1:50):
  - Left side: billing-history hints, for example "03.04A: No prior 03.04A for…" and "03.05JR: 0 billed this week", plus Prior Bills.
  - Tabs: Standard / Advanced / Extra Text / Patient / Payee / OOP Referral.
  - Fields: Service Code, Calls, Enc #, Mod 1–3, Total Claimed (filled automatically), Dx 1–3 (pre-filled from the note), Ref. PracID, Service Date, Fac. #, LC, FC, BA.
  - Buttons: Save as Favourite, Reset, Create Bill.
  - The Advanced tab adds about 12 more fields.
- **After billing**, the appointment status becomes **Billed** and the note locks with an addendum (m2-5 @2:10–2:20).
- **My Bills** (m2-5 @2:50–4:10):
  - Filters, plus "Submit Selected Bills".
  - **Statuses:** Unsubmitted, Submitted, Sent, Accepted, Held, Paid, Needs Review, Written Off.
  - The bill detail shows "Billing Opportunities", Prior Submissions and Bill Results.
  - A **Needs Review** bill shows the payer's error-code text and the buttons Delete Bill / Write Off / Update Bill / Mark as Paid.
- **Payment notice.** A red banner gives the next BC MSP payment close-off date (m1-5 @4:38, m2-7 @1:52).
- **Private pay** goes through the Helcim browser extension from an Ava invoice (helcim @1:05).

### 2.13 AI workflow (ai; web-charting @28:55–35:30; web-eforms; event)

- **Scribe** (ai @0:22–0:34). Opened from the microphone, it docks on the right and shows:
  - a timer, template, model and "Point Form?";
  - Custom Instructions: a chief-complaint hint, Additional Context, Personalized Instructions;
  - **live "Summary" bullets** that build up while recording;
  - **"Add Directly to Note"** or **"Build Note"**.
- **Settings** (web-charting @34:30): Ava Intelligence > Scribe Defaults, which include **Data Retention Period (days): 90**. Scribe Templates are a separate area.
- **The draft goes straight into the note.** It fills the editable SOAP fields and structured vitals and is autosaved, with the toast "Hang tight, the robots are processing your clinical note…" (ai @0:37–0:40).
  - The note has **no "AI draft" label or state**. Signing is still the clinician's "Complete" click, but that click was not shown in this video.
- **AutoChart** (ai @0:40–1:10; web-charting @28:55):
  - It opens as a right-hand panel with the disclaimer: "fast, but not perfect! Give everything a quick review before using the buttons."
  - Suggestions are grouped: Medical, Family and Social Histories (with ICD-9 codes), Allergies, Medications (Ongoing / Historical / Changed), Consult Requests, Vaccines, Reminders.
  - Each item has its own **✓ "Auto Create"** or 🗑. **Medications and consult requests cannot be auto-created.** They only offer "Open Form", which opens the full New Medication or consult form for review and Save.
  - No bulk accept was seen.
  - The patient-summary PDF showed family history entries **tripled**, *inferred* to come from repeated accepts (ai @2:22–2:40).
- **Care plan** (ai @2:04–2:16). "Get Care Plan (AI Assist)" opens a patient-facing editor (goals, medications, lifestyle, follow-up, warning signs) with **"Save as Draft"** and a separate send button. The plan then appears in the portal under Care Plans (ai @2:58).
- **Other AI:**
  - document classifier, results classifier and "Predict Employee" for imported files (2.8);
  - new-patient pre-fill from faxes;
  - eForm Smart Fields (2.6);
  - "Autochart: Generate a Consult Request" (2.9).
- **Roadmap concept, not shipped** (event @37:40–39:30). A "Level 3: Event Driven" mock-up shows **"Pending AI actions"** for a patient: "All AI-proposed actions… Review each before applying".
  - Each item has Apply/Review/✕. Examples: a metformin dose change triggered by an eGFR rule, a message to reception marked "Draft ready · review before sending", and a CKD stage update.

---

## 3. What is good and what is poor, against our client's priorities

Our client's priorities: less on screen, clinical, few clicks, the doctor always signs, and AI drafts stay drafts.

### Worth learning from

- **One place collects the visit.** The note footer gathers "Changed Medications", "Requisitions", the AI actions and Complete, and "Updated During Encounter" lists every Rx and requisition made in the visit, with who made it (web-charting @28:15). This maps directly onto our Sign off tab.
- **The doctor's click is the gate for AI.** AutoChart applies items one by one. Medications and referrals always open the full form. The care plan has "Save as Draft" and a separate send. The roadmap's "Pending AI actions" inbox (event @39:30) is close to our principle.
- **Prescribing safety is in the flow** (web-charting @25:30–28:00):
  - a permanent "Confirm Allergies" banner;
  - inline pills reading "No medication interactions / No allergies" after choosing a drug;
  - an interactions modal with severity filters;
  - "Prescribe As" for delegation.
- **Favourites by indication.** Searching "Pneumonia" brings up "Pneumonia – Amoxi" with the whole sig, filled in one pick (web-charting @26:30). Quantity appears to calculate itself (m2-7 @3:48–3:52).
- **Medication list actions** on each row and in bulk: hold (with a reason and resume), discontinue, refill, history (web-charting @42:30–43:00).
- **Requisition tracking.** Each requisition gets a due date and an owner, and a notice appears if the patient has not done it (m2-1 @0:50).
- **The 28-day referral reminder is on by default** (sw-files @4:32).
- **Inbox details:**
  - the next item loads by itself after you reassign;
  - an audit trail on every task;
  - a warning before reassigning a document to another patient;
  - AI classification shown as a suggestion you click ("Ava Intelligence" banner).
- **"Most commonly used" with counts** in every picker (templates, stencils, letters). Billing favourites can be linked to an appointment type or note template.
- **Patient messaging:**
  - read receipts;
  - "Check Within" sets a follow-up timer;
  - the patient can be limited to one reply;
  - messages are routed to groups, not individuals.
- **eForms.** One click turns patient answers into a SOAP note, with scores included (web-eforms @4:30–5:30).
- **Ava says it about itself.** Its own guidance recommends no more than 3 or 4 icon macros to avoid clutter (m3-5 @2:45).

### Poor (what makes it overwhelming)

- **Density:**
  - 12 to 17 chart panels visible at once;
  - Tasks shows about 18 categories, two PDF toolbars of about 20 icons and 12 sidebar buttons;
  - text of about 11 to 12 px;
  - many actions that are icons only and rely on tooltips (m1-3, m3-1, m4-1).
- **No explicit doctor sign-off on results.** Review is a free-text note, a reassignment and "Mark Complete", and in the demo the **MOA** clicked Mark Complete (m3-1 @3:32–4:02). Nothing records "reviewed by Dr X at time T" as a state. This is the opposite of "the doctor always signs".
- **AI scribe output looks like human text.** It lands in the note fields and is autosaved, with no AI-draft marker (ai @0:37). AutoChart can create duplicates (ai @2:22–2:40).
- **Four overlapping charting concepts** (templates, stencils, macros, flowsheets), with syntax that looks like code: `%^p_meds^%`, `<<a#b>>`, `<<vitals:bp>>`. Building a stencil means copying aliases to the clipboard and pasting them.
- **Bloated notes.** Histories and stencil aliases paste whole lists (38 problems, 15 meds) into a note. A note can be completed with pick-list tokens still unresolved (m1-5 @3:42).
- **Colour carries too much meaning.** Red means overdue, abnormal and urgent alike. Scheduler colours mix appointment type and status (m1-4 @2:18).
- **Prescribing is hard to find.** The chart has no "Prescribe" button. You open the Medications panel and then a large modal of about 20 fields. Send Selected / Send All / Print Selected / Print All appear with no visible destination (web-charting @27:15). Our client could not find prescribing, which fits this.
- **Long forms everywhere:** the appointment modal (with unpaid invoices), New Patient (about 30 fields), the consult request (about 25 fields), and the bill (about 15 fields plus an Advanced tab of about 12).
- **Configuration is spread** across the user menu, Account Management and Clinic Management. Routers run hourly. Mass reassign shows no preview of how many tasks will move.

---

## 4. Ava compared with the SimpleCare demo today

| Workflow | Ava (as seen) | SimpleCare demo today | Idea to adopt |
|---|---|---|---|
| Navigation and layout | Top menu with 6 items; dashboard; patient sidebar on every screen; config in the user menu | Physician portal with patient chart tabs Review / Note / Action / Sign off; Inbox; billing portal | Keep our fewer, clinical tabs. Borrow the idea of a **persistent patient context** (sidebar), shown compactly, when the doctor is in Inbox or a Task |
| Chart | 12–17 panels at once, lists cut to 5 rows, "↗" to expand, inline "+" | One-column Review: Needs attention, Intake summary, Chart review | Keep one column. Borrow the **same "open / add" control on every section** and inline add, for example an ICD type-ahead for a problem |
| Core visit | Status pipeline Booked → Arrived → Roomed → … → Billed; note footer collects meds, reqs, AI, Complete, bill | Review → Note → Action → Sign off | Add an **"Updated during this visit" list on Sign off** (each Rx, order, referral and message, with who made it), like Ava's Chart Updates |
| Note templates, stencils, macros | Four overlapping tools; `;shortcut` macros; pick-list tokens; dynamic `<<labs:A1c>>` | Note tab; AI draft | Offer **one** concept, "phrases", with a `;` shortcut and dated dynamic values (last A1c, last BP). Block sign-off while any **unresolved placeholder** remains |
| Favourites | Billing and medication favourites; searchable by indication; shared with the clinic; linked to appointment or note type | Three-step prescribing panel | Let Rx search find favourites **by indication** ("UTI", "pneumonia") and fill the full sig. Show "most used" first |
| PDF forms and eForms | Shared form library; alias pre-fill; requisition tracking (due in X days → notice); eForm scoring → one-click SOAP | Order drawer is a placeholder | For the Order drawer: **pre-filled requisition plus a "due in X days" follow-up owner** (MOA). Intake summary could show PHQ-9/GAD-7 scores with bands |
| Prescribing | Native "Medications" modal: allergy banner, interaction and allergy pills, Prescribe As, New Rx / Compound / Blank, Send or Print; Current Medications with hold, discontinue, refill | Three-step prescribing panel | Keep three steps. Add an **always-visible allergy line**, **inline interaction and allergy result** after choosing a drug, a **send destination shown before Send** (pharmacy, fax or print), and per-row **hold (with reason), stop, renew** on the med list |
| Labs and results | Import → manual patient match → Claim + Sort → classify → route to doctor → doctor writes a note and reassigns → MOA marks complete; abnormal in red; no sign-off state | Inbox for results | Keep a **distinct doctor "Reviewed / Sign" action** with a timestamp (Ava lacks one). Borrow: next item loads by itself; abnormal flag with Normal/Abnormal/Critical; one-click "routing macros" (for example "Recall to discuss" → MOA task plus patient message draft) |
| Consults and referrals | Inline referral form; AI-drafted letter with "Context Notes Used"; 28-day reminder on by default; responses filed to the consult with a status | Refer drawer is a placeholder | Refer drawer: show the **sources the AI letter used**, keep **"Remind in 28 days" on by default** and assigned to the MOA, and file incoming responses onto the referral with a status (Sent / Received / Booked / Completed) |
| Tasks and routing | Three-pane Tasks; history log; urgent count; Task Routers by date; Mass Reassign; Default Task Handler | Task MOA drawer | Keep the drawer simple. Borrow the **append-only note history** ("Dr → MOA, time") and a **cover-me-from/to-dates** router later. Don't copy the 18 categories |
| Patient messages | Messages as tasks; read receipts; "Check Within"; one-reply limit; manual "Attach to Chart" | Message drawer is a placeholder | Show **read receipts**, an optional **"follow up if no reply by…"**, and **"allow one reply"**. File attachments into the chart with one tap |
| Billing | Bill from note, chart, scheduler or task; Dx from note; favourites linked to visit type; statuses Unsubmitted → Paid / Needs Review | Billing portal | Pre-fill the **bill from the visit type and the signed note's Dx**. Show the payer's rejection text next to the fix action, as Ava does |
| AI | Scribe writes into the note without a draft marker; AutoChart accepts per item; meds and referrals always need the form; care plan saved as a draft; roadmap "Pending AI actions" | AI drafts stay drafts; the doctor signs | Keep our **visible draft state** (Ava's gap). Borrow Ava's rule that **AI never creates a medication or referral directly**, the per-item accept with its source sentence, and a single "Pending AI actions" list per patient |

---

## 5. Prescribing: everything found

### Seen on screen (sourced)

**The prescribing screen is native to Ava, not a separate outside app.** The charting webinar shows a **"Medications"** modal opened over the chart (web-charting @25:30–28:15 and @42:30–43:00). Its parts, from top to bottom:

1. **Header:** patient, age, ID, and weight with how old the reading is ("over 2 years ago").
2. **A pink "Confirm Allergies" banner that is always visible.** It asks the prescriber to confirm allergies and interactions before prescribing, and lists the documented allergies.
3. **"Today's Medications" row:** **New Rx**, **New Compound**, **New Blank Rx**, and a **"Prescribe As: Myself ▾"** dropdown (delegated prescribing; clinic and account settings both have "Authorized Prescribers", m4-2 @1:32, m2-7 @0:32).
4. **Rx line:**
   - Drug (search), Dosage (min and max) + form, Freq (QD/Daily/QHS/BID…), Duration + unit, PRN (Scheduled), Quantity + unit, Repeats, Long Term, Route, "+ Add";
   - Patient Notes, Pharmacy Notes, Start/End Date, Indication;
   - checkboxes **Mark as private?**, **Externally Prescribed?**, **Historical Medication?**, **No Substitutions?**;
   - **Save as Favourite**, Cancel, Save.
5. **Drug search shows favourites first,** marked with a heart. They can be found by indication keyword, and one pick fills the whole sig (@26:30).
6. **After a drug is chosen, two inline pills appear:** "No medication interactions / 1 food/alcohol interaction" and "No allergies" (@27:45).
   - Clicking opens **Drug Interactions**: severity chips All / Severe / Moderate / Low, a per-drug list, Food & Alcohol, and a table of Severity / Drug 1 / Drug 2 / Effects.
   - Footer: "Data sourced from UpToDate Medi-Span" (@28:00).
7. **Saved lines** list under Today's Medications with a DIN tooltip.
8. **Send and print buttons:** **Send Selected | Send All | Print Selected | Print All** (@27:15).
9. **"Current Medications" table:**
   - columns Med, Dose, Duration, Quantity (R: repeats), Start Date, Notes, Created By;
   - row actions **hold** (with a reason and resume, for example "Held: not needed"), **discontinue**, **refill**, history, copy;
   - buttons **Interactions**, **Previous Rxs**, **Print List**; bulk **Discontinue / Print / Refill Selected** (@42:30).
10. **"Past Medications"** with reasons such as "Discontinued: …" (@43:00).

**Other medication screens and places:**

- **New Medication form**, opened from AutoChart's "Open Form" (ai @1:16–1:22).
  - Fields: Drug, Dosage, Freq., Duration, PRN, Quantity, Repeats; Historical? / External? / Mark Private?; Start/End, Route, Ongoing; **Patient Notes** (pre-filled counselling text); **Pharmacy Notes**.
  - Save adds the drug to the chart's Medications panel.
- **Medication Favourites** (m2-7 @3:12–4:32), under Account Management, with a clinic-level list in Clinic Management (web-charting @38:30).
  - Form: Shortcut Name, Category, Drug (product-level type-ahead, for example "AMOX-500 500 MG"), Dosage min–max + form, Freq, Duration, PRN, Quantity (appears to calculate itself), Repeats, "+ Add", Long Term, Route, Drug Class (filled automatically), Notes, Indication, "Allow Other Users in Your Clinic to Copy…".
  - A "Shared Medication Templates" library lets you copy colleagues' favourites.
  - The page's help text says favourites can also be saved from "the medication screen".
- **Note footer:** "Changed Medications:" and **"Print Reqs/Meds"** (m1-4 @2:34; ai @0:46). At close-out, "Updated During Encounter" lists each new Rx with the prescriber (web-charting @28:15).
- **Supporting places:**
  - the patient card shows the **preferred pharmacy** (for example "Shoppers Drug M…", "Rexall…", "No Pharmacy");
  - the account "Display Names" card includes "Rx/Notes/Letters" (m2-7 @0:32);
  - the portal shows patients a "Medications Review" (sw-connect @2:46);
  - the dashboard release notes mention "22 new medication route options" (m4-2 @0:22).

### Not shown in any frame

- **Where "Send" sends to:** a pharmacy network, fax, or the portal.
- Any **PrescribeIT** or other e-prescribing network label or logo, and no pharmacy logo on the event's partner slide.
- **Renewal requests from pharmacies**, PharmaNet / medication history, the printed Rx layout, and any sign-and-send step with a signature.
- How the Medications modal is opened. The frames go from the chart straight to the modal; *inferred*: the Medications panel's "↗" or "+".
- The "pharmacy refills" topic promised on the Module 3 overview page. None of the three Module 3 videos shows it.

### From the web (sourced, not seen in the videos)

- **July 2024:** Canada Health Infoway and Ava signed an agreement to integrate **PrescribeIT**, the national e-prescribing network, into Ava. The aim was to send prescriptions from Ava to the patient's pharmacy and replace fax. Sources: Canadian Healthcare Technology, 24 July 2024, and the Infoway agreement it reports.
- **Ava's PrescribeIT page.** Search engines still index www.avaindustries.ca/prescribeit. Their snippets describe:
  - creating, renewing and cancelling prescriptions in Ava;
  - "deferred" printed prescriptions with a barcode;
  - two-way pharmacy messaging and pharmacy renewal requests as "coming soon".
  - **Today (26 Oct 2026) that URL returns "404: Page Not Found".**
- **PrescribeIT shut down on 29 May 2026.** Infoway announced on 12 February 2026 that it would wind down the service in favour of an open, standards-based approach (Canadian Pharmacists Association, CPhA Insights, February 2026; also reported by the Alberta College of Pharmacy). Alberta's notice adds that monitored (TPP) drugs need paper pads again after the shutdown.

### Interpretation (inferred)

- Our client's memory that "Ava used an outside e-prescribing service" fits **PrescribeIT**. That was the outside *transmission network* Ava connected to. The *prescribing screen* itself was always native to Ava.
- Ava's PrescribeIT page now returns a 404, and PrescribeIT ended in May 2026. Together these likely explain why our client could not find the e-prescribing feature.
- In the September 2026 webinar, after the shutdown, "Send" and "Print" are still present. Where Send goes now is not shown; fax to the pharmacy or the portal is plausible but unconfirmed.
- **For our design:** prescribing should be **visible from the chart** (Ava hides it behind the Medications panel), and the **destination must be explicit** before the doctor signs.

### Sources

- Ava Academy lesson pages and Mux videos listed above (avaindustries.ca/ava-academy/video-library).
- [Canadian Healthcare Technology: PrescribeIT to be integrated into Ava EMR (24 July 2024)](https://www.canhealth.com/2024/07/24/prescribeit-to-be-integrated-into-ava-emr/)
- [Ava PrescribeIT page (now 404; content known only from search snippets)](https://www.avaindustries.ca/prescribeit)
- [CPhA Insights, February 2026 (PrescribeIT wind-down on 29 May 2026)](https://www.pharmacists.ca/about-cpha/cpha-insights/cpha-insights-feb-2026/)
- [Alberta College of Pharmacy notice on the PrescribeIT shutdown and TPP](https://abpharmacy.ca/?p=16698)

Frames used for this note are kept outside the repository, in the session scratchpad.
