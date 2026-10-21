# Daniel's Notion "Product Specs" database: what is in it — 21 Oct 2026

Source: Daniel's Notion (SimpleCare > Product Specs), read through the browser pane that Ani signed in to. The Notion
connector is signed in to Ani's own workspace and cannot see these pages, so reading goes through the pane. Daniel is
adding pages while we read (six new rows appeared within an hour on 21 Oct), so re-read the index before relying on this.
Titles and statuses only here; the page bodies are read one at a time and recorded when used.

## Index (status in brackets)
- **Billing & Payments:** AI-Assisted Billing v1 (In Review); Alberta & Saskatchewan v1.0 (Draft); Payments Architecture, Stripe Connect (Draft); Private Pay, Stripe (Draft).
- **Clinical:** Category & Clinical Problem Review; Chart-Based Care Plan Tracking; Chronic Conditions & Care-Gap Review; EMR Workflows & Statuses (all Draft); EMR Document Labelling Standard (Approved); Quick-Book Safety Gate v1.0 (Approved).
- **Communications & IVR:** Email & SMS Templates (Approved); Email Deliverability, Round 2 SES (In Review); IVR Call Script (Approved).
- **Integrations:** Document Routing, SRFax (Draft); DRO / Ocean eReferrals (In Review); **new:** Excelleris Launchpad Tunnel (Draft); Interior Health / CDX (Draft); PharmaNet / BC HIE Engagement, 8 Oct 2026 (Strategy, Draft).
- **Legal & Consent:** Patient Consent Flow v1.0 (Draft).
- **Marketing & Growth:** Meta Ads Intake Line Call Flow; Meta Advertising, privacy-safe (Draft); **new:** X/Twitter Capacity Auto-Posting.
- **Platform & Data:** Product Structure Plan (Strategy, Draft).
- **Portals:** MOA Portal; Patient Portal; **Physician Portal** (all Draft; the Physician Portal page was reviewed 1 Oct).
- **Scheduling & Capacity:** Capacity Dispatcher; Panel Administration; **new:** Walk-In Backup Coverage & Call Window.
- **Simple Chart: Data Feed & Compliance:** PharmaNet & Medication Reconciliation; AI De-identification Service v1.0; AI Booking & Clinical Intake (two PDFs: Simplicity AI Intake Requirements v2.3, which we hold as B-004, and **Emergency Department Redirect**, not yet read).

## Read so far

**Portals — Physician Portal (1 Oct, Draft).** It holds Chart View v2.5 and ECG Critical v2.0 (both already in `private/requirements/`
and summarised in B-006), a labwork attention protocol, and imaging and consult report review types. Its summary adds two things
we have not built: a **Doctor Action Centre** for follow-up work, and **automated lab follow-up** (a deterministic safety layer, an AI
clinical-context layer, automatic MOA assignment, physician approval), plus live-queue changes (local time and the BC call-window states).

**Clinical — EMR Workflows & Statuses (reviewed 14 Aug, Draft).** The status rules, which answer part of Daniel's "full list of visit statuses":
- Doctor completion finalises the visit with one of: **Completed, No Show, Call Dropped, Doctor to Call Back, Administrative Cancellation** (cancelled by the admin).
- Also **Patient Declined Virtual Visit**.
- MOA completion is separate: the MOA runs the tasks (fax and so on) and presses Complete.
- **Complete:** the doctor finalises and no tasks are outstanding.
- **Pending MOA:** the doctor finalised and sent tasks the MOA has not completed.
- **Needs Review (x):** the MOA sent a task or document back to the doctor; x is the number of documents to review.
- "Send to MOA" is the doctor's final authorisation of a document. A MOA can edit a document (for example add a test to a lab requisition) but cannot sign it off; it goes back to the doctor.
- The page also covers Carry Forward tasks, Encounter History, the Follow Up booking flow, running medical notes, the Documents modal and the Task MOA button (body not yet read in full).

## To read next
EMR Workflows (rest of the page), MOA Portal, Patient Portal, Document Routing, the ED Redirect PDF (needs Ani's yes to download), Quick-Book Safety Gate, Consent Flow, Walk-In Backup Coverage.
