# B-003 — Three requirement documents: intake and booking, emergency safeguards, document routing

**Date:** 30 Sep 2026 · **From:** Ani (forwarded) · **Read before your next task** (process.md step 2a)

Ani shared three SimpleCare requirement documents. The full text is in `private/requirements/`
(git-ignored). Cite them by title and version, and summarise rather than paste: the repo is public.

| Document | Version | Status in the document |
|---|---|---|
| AI Clinical Intake & Booking Requirements (plain language) | v7.0 | Product requirements |
| AI Emergency Safeguards Framework | v3.0 | Draft for clinical approval; a designated SimpleCare physician approves criteria and wording |
| Clinical Document Ingestion, Labelling, Filing & Physician Routing | v2.1 | Engineering requirements |

## 1. Intake and booking (v7)
- **Three ways in, one booking and intake process:** the Simplicity chat, Fast-Track service cards,
  and the signed-in portal.
- **Fast-Track cards go straight to booking.** They do not pass through the AI navigation chat.
- **AI navigation and AI clinical intake are different things.** A patient can skip navigation, but
  intake still runs before the visit.
- **A "Hello" with nothing else gets three choices:** "See my Family Doctor", "Find a Family Doctor",
  "Get Care Today". A clear first message skips the menu.
- **Three patient relationships:**
  - assigned Family Doctor: that doctor is the default;
  - existing but unattached: the episodic scheduler, with doctors seen before shown first;
  - new: the standard pathway.
- **A doctor seen before gets a small "Seen before" badge.** "Your Family Doctor" appears only for a
  formal attachment.
- **Cross-coverage never changes attachment.** It applies when the Family Doctor isn't available
  within a clinically appropriate timeframe. That timeframe depends on the concern, not a fixed rule.
- **Signed-in intake confirms, not re-asks.** For example: "I see ramipril 10 mg daily. Still the
  same?" The AI gets only the chart information this visit needs.
- **The physician sees a one- or two-line summary.** No formal CC/HPI, no red-flag section, no long
  note.
- **Normal bookings create no admin tasks.** Humans handle exceptions only.
- **Words:** "You have seen this doctor before", never "This is your doctor" for an unattached
  patient. Never "You have a UTI", and never "This is definitely not serious".

## 2. Emergency safeguards (v3, draft)
- **Simplicity screens for emergencies and stops booking.** It never decides whether a non-emergency
  patient is suitable for virtual care; the physician decides that.
- **Every input is screened before the next routine reply,** across the whole conversation and every
  surface where a patient types (chat, reason-for-visit, forms, messages).
- **Hard-stop domains, in plain language:**
  - self-declared or third-party emergencies;
  - airway, breathing, shock, chest pain, stroke, severe headache;
  - sepsis, anaphylaxis, diabetic emergencies, GI bleeding or acute abdomen;
  - trauma, poisoning, pregnancy, mental health, paediatrics;
  - other time-critical conditions.
- **Triage-first concerns get at most about three safety questions,** one at a time, before any
  routine question.
- **On a hard stop:**
  - intake stops;
  - no scheduler and no doctor availability appear;
  - the approved message for that domain shows first, using the emergency number for the patient's
    current location;
  - the state persists, and the patient preferring otherwise never downgrades it.
- **Vital signs can only escalate,** never reassure.
- **The design rules:**
  - two detection layers, where either one is enough;
  - the hard stop sits outside the chat model;
  - if screening fails, booking pauses: fail safe, not fail open.
- **Current location is asked early:** "Are you in BC right now?"
- **Disclosures:**
  - "not an emergency service";
  - "you are talking to an AI";
  - a safety net after booking, with HealthLink BC 8-1-1 and 9-8-8 where relevant.
- **A staffed clinic sees a real-time alert** when a hard stop fires for an identified patient.
- **Release gate:** zero missed hard-stop scenarios on a test set with at least 20 per domain.

## 3. Document routing (v2.1)
- **Fax is only a way in.** Each inbound document becomes an identified, labelled chart document,
  filed in the right section and routed to the responsible physician.
- **The physician never sees a raw fax inbox.** An Inbox item opens the filed chart document.
- **Patient matching and physician routing are separate decisions.**
  - The receiving fax number is a routing signal, never an identity signal.
  - A document is never auto-attached on an identity conflict.
- **Routing doesn't own priority.** Attention protocols decide what goes to Needs Your Attention. A
  critical signal is handed off before the patient match completes, and it's never held back.
- **Clearing an attention card doesn't close the Inbox report** unless the physician completes the
  review.
- **Lab and imaging reports evolve in versions.** A new version after acknowledgement reopens the
  item as "Updated" and shows what changed. Pathology reports stay as separate documents.
- **Review time limits by document type:** Hospital/ED 1 business day, imaging and pathology 2,
  labs 3, the rest 5. They escalate when missed.
- **Overdue list:** a requisition with no result inside its expected window appears there and
  creates an MOA follow-up task.
- **The MOA queue is for document exceptions only:** match, split, label, routing, misdirected fax.
  Critical Signal items sort first, with a 1-business-hour limit.
- **Labels follow a fixed pattern,** for example "Lab Report - [Panel] - YYYY.MM.DD", with chart
  sections Labs, Imaging, Pathology, Consult Reports, Allied Health, Hospital/ED, Referrals, Forms,
  Administrative, Other. Patient-provided documents end in "- Patient Provided".
- **Fax numbers (Ani's routing task note):** each physician gets a dedicated SRFax number, either new
  or ported from their existing number, mapped uniquely to that physician.

## What this overrides or sharpens
- **T-012 (emergency screening):** its "red-flag list and wording are Daniel's" placeholder now has a
  source: the v3 framework, still a draft that needs physician approval. Design to its domains,
  hard-stop behaviour and BC messages. Don't invent beyond it.
- **T-014 and T-015:** Fast-Track cards bypass AI navigation; the "Seen before" badge; the Family
  Doctor default and cross-coverage; the three choices for an empty first message.
- **Physician portal:** the one- or two-line intake summary matches v2's clinical concern line. The
  Inbox is the source of truth, and Needs Your Attention is only an escalation layer.

## Conflicts to raise (don't resolve them yourself)
- **Priority names:** v2.1 calls the levels **HIGH / URGENT**. Daniel's words, and v2, use
  **Critical / High** (27 and 30 Sep). Ani or Daniel decide.
- **What "clear" means:** v2.1 separates clearing an attention card from completing the review.
  Daniel's 30 Sep recording asks whether a yellow flag was "cleared". v2 currently treats cleared as
  signed off (`from-daniel/2026-09-30-ecg-and-result-flags.md`).
- **Scheduler and call windows:** v7 talks about a physician scheduler and appointments. Our model is
  call windows with a queue position, and no wait estimates (rule 11). Ask how they fit before you
  design a scheduler.
- **Missing companion documents:** v2.1 depends on two we don't have yet, the **Simple Clinical
  Document Labelling Standard** and the **Review Labwork Attention Protocol**.

## Self-check
1. A patient clicks the "Sinus infection" Fast-Track card. Does Simplicity's navigation chat open
   first? (No. It goes straight to booking, and intake still runs.)
2. An unattached patient saw Dr. A once. What does the scheduler show next to Dr. A? ("Seen before",
   never "Your Family Doctor".)
3. A patient types "my throat is closing" in the reason-for-visit field. What happens? (A hard stop
   with the allergy or airway message first, no availability shown, and the state persists.)
4. A fax arrives on Dr. A's number for a patient Dr. A has never seen, ordered by Dr. B. Who gets it?
   (Dr. B, the ordering physician. The fax number is a signal, not an identity.)
