# Integration roadmap: getting results, medications, fax receipts, billing and registries from the source

**Agent:** integrations-engineer · **Date:** 26 Sep 2026 · **Status:** draft for Ani and Daniel

**Why:** Daniel, 26 Sep: *"We need API access so that we get the results from the source. I am relying
on patients to help me."* (`from-daniel/2026-09-26-answers-to-shadowing-questions.md`, section 6;
D-77, REQ-IN-12, OQ-65.)

**Read this first.** SimpleCare has **no access to, and no conformance with**, any system in this report.
Nothing here says otherwise. Every "how it lands in v2" line is a proposal for `ux-designer` and
`content-designer`. None of it has been built.

**How the claims are marked**
- **Verified:** read in the cited official document or page on 26 Sep 2026. The source is given.
- **Assumption:** not verified. It is my inference or common industry practice, and it must be
  confirmed before anyone relies on it.
- Timelines are **assumptions** unless a source is given.
- Sources [S1]–[S30] are listed at the end. Every one was accessed on **26 Sep 2026**.

---

## 1. The recommended order

| # | Integration | Why at this point | Gate | Rough time to first data (assumption unless cited) |
|---|---|---|---|---|
| 1 | **Lab results via Excelleris** (LifeLabs and the Excelleris health-authority labs), plus **CDX** for Interior and Northern Health | Answers D-77 directly. It is a vendor route, and the Ministry's PLIS is closed | An Excelleris setup form per provider, and an EMR that Excelleris will deliver to | Setup "can take up to four weeks" for each provider [S14]. Building the EMR side: 2–4 months (assumption) |
| 2 | **eFax with delivery receipts** | Unblocks REQ-RX-05 and OQ-50. It is the cheapest and fastest, and needs no government step | A commercial contract, Canadian data residency, and privacy review | 2–6 weeks (assumption) |
| 3 | **CareConnect (view only)**, a bridge for results and medications that SimpleCare did not order | The only official route today to results ordered elsewhere (the shadowing 5 case) and to PharmaNet dispenses. It is free | Per-user enrolment and the HPCAA agreement. The clinic worksite is registered separately | Enrolment was described as "less than an hour" in 2021 [S19]. Approval time: unknown |
| 4 | **Teleplan** (MSP claims, remittances, eligibility) | SimpleCare already bills MSP (v2 has claim states), so this may be a matter of keeping or replacing the current billing software | Teleplan vendor approval through Teleplan Support, and testing on the vendor test site [S22] | 2–4 months to build and test your own (assumption). Zero if an existing vendor is kept |
| 5 | **PharmaNet + Provincial Client Registry (PCR)**, then **Provider & Location Registry (PLR)** | Highest clinical value after labs, but the longest road: EMR access means full e-prescribing, and new applications must use the PCR | A Vendor Participation Agreement, Ministry conformance and certification, PRIME, and a site Organization Agreement | Formal testing alone needs "a minimum of four weeks notice" and takes "3-8 business days" [S2]. Overall: 12–24 months (assumption) |
| — | **PLIS** (the provincial lab repository) | **Not possible now:** "no new integrations permitted with PLIS until a new transport mechanism is determined" [S1] | — | Unknown |

**Start #5's discovery session now**, even though it ships last. Its lead time is the longest, and its
answers decide whether SimpleCare builds its own EMR integrations or works through an approved vendor.

---

## 2. A decision that sits above all five: who is the "software organization"?

- **Verified:** Ministry integration is done by a **software organization** (a vendor or health
  authority). It signs a Vendor Participation Agreement, completes self-tests and formal conformance,
  and receives an Interface Approval Notice "valid for 5 years" [S2 §6.2, §6.3.8].
- **Verified:** a medical practice uses PharmaNet only through an approved vendor: "An organization must
  contract an approved PharmaNet software vendor before registering a site." The vendors listed are
  **iClinic Inc., Medinet, Plexia Electronic Medical Systems Inc. and CareConnect** [S9].
- **Assumption:** SimpleCare's three portals over one record amount to an EMR. For SimpleCare to receive
  PharmaNet, PCR or PLR data inside its own product, it would have to **become a certified vendor**. The
  alternative is to **run on, or integrate with, an approved EMR**. The repo does not record which EMR
  SimpleCare runs today. The stakeholder analysis only names TELUS, Accuro and Oscar as the EMRs other
  doctors use (`simplecare-stakeholder-interview-analysis.md:62`).
- **This is a build-versus-partner decision for Ani and Daniel**, informed by `tech-lead`. Everything
  below works either way, but the timelines only hold for the "build" path.

---

## 3. Lab results from the source

### What exists in BC (verified unless marked)
| Route | What it gives | Status for SimpleCare |
|---|---|---|
| **PLIS** (Ministry) | "approximately 95% of all laboratory test results performed by public and private community laboratories across B.C." [S6]. EMRs can view summaries, retrieve reports and store results for trending [S2 §2] | **Closed to new integrations** [S1, S2 §2: "Integration with PLIS is currently on hold until further notice."] |
| **Excelleris** (a LifeLabs subsidiary; LifeLabs is owned by Quest Diagnostics since Aug 2024 [S17]) | Delivers reports to a provider's EMR, to the Launchpad web portal, or by fax [S13, S15]. The Island Health and VCH/PHSA/Providence (CST) forms route health-authority results through Excelleris [S15, S16] | Open. It is set up per provider by form [S13, S14] |
| **CDX** (Interior and Northern Health) | Lab, imaging and transcribed reports to clinic EMRs, plus clinic-to-clinic documents. "no additional costs" [S18] | Open. EMR vendors not listed can ask to join [S18] |
| **CareConnect** (PHSA, the provincial eHealth viewer) | A view-only record: labs, reports, medications, visits [S19, S20, S21] | Open to community physicians and MOAs [S21]. **"CareConnect is a view only application"** [S20] |
| **Health Gateway** (patient-facing) | The patient sees "blood tests … and other lab tests done in B.C." back to 2020, and medications back to 1995 [S29] | This is the patient's own view, not an API for clinics. What a patient shares from it is **patient-supplied** |

**The key limit (verified):** Excelleris and the health authorities deliver to the **ordering or copied
("cc'd") provider**. Island Health: *"ALWAYS 'CC' the clinic where the patient was seen … This is the
only way to ensure that patient results are received by the clinic"* [S16]. **So a direct feed only
brings results that a SimpleCare doctor ordered or was copied on.** The shadowing 5 case (bloodwork
ordered by someone else, OQ-53) cannot come by API while PLIS is closed. It can only be seen in
CareConnect, or uploaded by the patient.

**"Accelerus" (MTG21:31).** No BC health-IT company by that name turned up in a search. **Assumption:**
it is a transcription of **Excelleris** by the meeting-notes tool, since the two sound alike. **Needs
Daniel to confirm.**

### Protocol and format
- **Verified:** BC lab interfaces use HL7 [S12, 2010, historical context]. Excelleris offers "real time"
  EMR delivery through its **Rover API** [S15]. The Excelleris provider form offers EMR, Launchpad or fax
  [S13].
- **Assumption:** the payload is HL7 v2 ORU^R01 with LOINC or provincial test codes, and some report
  types arrive only as PDF or text. That is why the form asks for a fax number "for delivery of report
  types not supported by your EMR" [S13].
- **Verified:** one EMR integration polls Excelleris "every 15 minutes", using a certificate and login
  issued per provider [S14].

### Access prerequisites
- **Verified:** an Excelleris Electronic Distribution Application and acceptable-use acknowledgement,
  signed by each provider (with MSP number, clinic and delivery method) [S13]. For EMR delivery, the
  EMR's support team starts the setup [S13]. The provider's certificate and login are issued to whoever
  submitted the request [S14].
- **Assumption:** Excelleris runs its own EMR-vendor onboarding and conformance ("conformance
  assistance" is mentioned [S15]). What it requires is unknown. **Ask Excelleris.**
- **Assumption:** a Privacy Impact Assessment and a privacy-officer review before production (owned by
  `privacy-security`).

### Failure modes and what the UI must say (proposals)
| Failure | Proposed behaviour in v2 |
|---|---|
| Feed down, or not polled | An Inbox line such as "Lab feed last checked 09:12 · nothing new", or "Lab feed not reached since 08:40", so that "no results" never passes silently for "all clear" |
| Result cannot be matched to a patient (name or PHN mismatch) | Held for the MOA to match, never auto-filed. The MOA portal already has a fax inbox for unmatched documents (MOA:214; REQ context in `requirements.md:1066`) |
| Corrected or amended result | Marked "Corrected by lab", with the earlier value kept in history. It re-enters review. **Assumption** that a correction arrives as a new message version |
| Preliminary or partial result | Marked "Preliminary". Tiering still applies (REQ-IN-07) |
| Cancelled test | "Cancelled by lab" (already specified in REQ-CH-23) |
| A report type the EMR cannot take | It arrives by fax and is labelled as a fax, not as "direct" |
| Result ordered elsewhere | Not delivered. The "Expected" item (REQ-CH-29) stays open, with "Open in CareConnect" or "Ask the patient to upload" |

### How it lands in the v2 UI
- **Results by test (chart):** v2 already has the label `rsSrc`: *"… · From LifeLabs (direct)"* versus
  *"… · Uploaded by patient · patient-supplied"* (`simplecare-physician-portal-v2.html:10717-10721`).
  The rail says "LifeLabs, direct" (`renderResults`, V2:10729-10775). With a feed, the source is
  **the performing lab named in the message**, not a hard-coded string:
  - "From LifeLabs (direct)"
  - "From Interior Health (direct)" (CDX)
  - "From Fraser Health lab via Excelleris (direct)"
  - "Received by fax" (for a report type that fell back to fax)
  - "Uploaded by patient · patient-supplied" (unchanged)
- **Times:** v2 keeps collected, received and reported apart (`LAB_PANELS`, V2:9270-9273). With a feed:
  - collected and reported come from the message;
  - **received is the time SimpleCare took it in**, per Daniel: "the time the clinic received the
    result, never the time the lab generated it" (`from-daniel/2026-09-21-meeting-notes.md:78-79`).
- **Inbox:** unchanged tiering (REQ-IN-07), plus the feed-status line above.
- **Expected results (REQ-CH-29):** when a matching direct result arrives, the "Expected" row could
  close itself with "Arrived Oct 3 · From LifeLabs (direct)". **Assumption:** matching by test and date
  is reliable enough. **Needs Daniel** on whether it may close without him.
- **CareConnect is not "direct" data.** If a doctor copies a value from CareConnect, it must read as
  "entered by the doctor from CareConnect", never "direct". **Needs `clinical-safety`.**

---

## 4. PharmaNet (medication history and e-prescribing)

### What it gives (verified)
- PharmaNet "records all prescription dispensed by community pharmacies in BC" [S2 §2].
- Medication profile transactions [S3 §4.6]. Each returns "patient dispense history and all clinical
  conditions and adverse reactions":
  - **TRP:** all dispenses for the past 14 months;
  - **TRR:** the most recent 15 dispenses.
- **The EMR access type makes e-prescribing mandatory.** In the permissions table for the "EMR" access
  type [S3 §2.1]:
  - TRP, TRR, TMU, TPI, TIL and TIP are **Mandatory**;
  - **TRX-X1 Record Prescription, X2 Update Status, X3 Adjust/Adapt, X0 and X4 Retrieve** are
    **Mandatory**.
  - "TIL … and TRX transactions are only available through PharmaNet v70 compliant (i.e.,
    e-Prescribing) POS applications."
  - **Assumption, drawn from those rules:** a new EMR cannot connect to read medication history alone.
    It must implement e-prescribing.
- **New applications must use the PCR:** "New POS applications must integrate with the PCR" [S3 §2.1
  notes; S7 PNetTx1.1].

### Protocol and format (verified)
- The messages are **HL7 v2.x with the CPhA Pharmacy Claim Standard**. Each response carries a ZZZ
  "Response Status" of 0 (success) or 1 (did not perform) [S5].
- The transport is the **PharmaNet API Gateway**: OAuth2 tokens from the Ministry identity platform, with
  REST endpoints named after FHIR resources (`/Medication`, `/MedicationDispense`, `/MedicationRequest`,
  `/MedicationStatement`, `/Patient`, `/Practitioner`, `/Consent`, `/Location`, `/Claim`) in sandbox,
  training and production [S4]. The stated goals include "Using HL7 Version 2 electronic prescription
  service capabilities" [S4 §1.1].
- **Assumption:** the payloads are HL7 v2 messages carried through those endpoints, not native FHIR
  resources. **Ask at discovery.**

### Access prerequisites (verified unless marked)
- **For SimpleCare as a vendor** [S2 §6; S4 §1.3]:
  - submit the Request for Integration Services (HLTH 4637);
  - take part in a **vendor discovery session**;
  - sign a **Vendor Participation Agreement**, then get access to the API Gateway sandbox through the
    APS portal;
  - self-test, then file a Conformance Initiation Notice (HLTH 4636);
  - pass formal conformance ("minimum of four weeks notice … 3-8 business days");
  - complete a "privacy/security gap analysis" and, if applicable, the **HLTH 801 cloud security
    schedule**;
  - receive the **IAN** (valid 5 years). Material changes need an Application Release Assessment
    (HLTH 4635).
- **For the clinic and its users:**
  - register the site in **PRIME** with a signing authority who can sign the **Organization Agreement
    for PharmaNet Use**;
  - name a PharmaNet administrator, a privacy officer and a technical contact [S9];
  - "Medical practices must register all sites, enrol all users in PRIME, and receive ministry
    approval" [S2 §6.2.4.2]. That covers the doctor and the MOA.
- **Privacy and residency:** "Access to, disclosure and storage of electronic health information must
  be within Canada unless permitted in writing by the Ministry" [S8 PS1.1]. The cloud service must
  maintain ISO 27017, CSA CCM or NIST 800-53 [S8 PS18.1]. "Users must not access HIE services from
  outside Canada" [S10 Bus2.5].
- **Remote access matters for a virtual clinic** [S11]. The Policy for Secure Remote Access to PharmaNet
  (v1.1, 2020, still listed) says:
  - "Remote access to PharmaNet must be done via a laptop or desktop computer only. Mobile devices such
    as tablets and smartphones are not permitted."
  - Addresses must be "geofenced to ensure all remote access occurs from within BC only".
  - It also requires a VPN, AES-256, MFA and a one-hour inactivity timeout.
- **Assumption:** a PIA is expected. The conformance volumes I read name a "privacy/security gap
  analysis" and HLTH 801, not a PIA by name. `team.md` says PharmaNet access requires a PIA, and that is
  **not verified here**.

### Use rules the product must enforce (verified)
- **PNet14.3:** access "only … for direct patient care". Guideline: access "within five days before or
  after a clinical encounter", with an access log.
- **PNet14.4:** "The most recent patient medication profile must be reviewed before providing care."
- **Protective word (PNet6.x; PNetTx2.1–2.6):**
  - if the patient has one, they must give it and consent;
  - it is never shown in clear text, and is encrypted if stored;
  - a wrong word returns the error "17 Field Keyword…".
- **Downtime (PNet8.3):** prescribers may keep a local record and submit it later, or fax or print it
  with "This is the official prescription authorization."
- **CPSBC (Writing Prescriptions, 1 Apr 2026)** [S24]:
  - licensees should "where possible obtain medication information from the PharmaNet database";
  - they "may assign the task of faxing a prescription to a pharmacy to their medical staff". This
    supports D-72.
  - Its list of acceptable ways to deliver a prescription (8a) names paper, fax and verbal, **not**
    PharmaNet e-prescribing. **Needs a qualified reviewer** to reconcile this with the mandatory TRX
    transactions.

### Timeline (assumption)
12–24 months on the "build" path: e-prescribing, PCR, conformance, and PRIME for every user. The
"partner" path is months if SimpleCare runs on an approved EMR. The interim is **CareConnect**
(PharmaNet is viewable there for eligible users [S20, S21]), which is view only.

### Failure modes and UI (proposals)
| Failure | Proposed behaviour |
|---|---|
| PharmaNet unavailable | "PharmaNet not reached · showing the profile from Sep 20". For e-prescribing: the PNet8.3 options, with the fax route carrying the required note |
| Protective word required | A prompt: "This patient has a PharmaNet protective word. Ask the patient for it." Masked entry. A wrong word shows as such |
| Outside the 5-day window, or no encounter | Do not fetch. The profile is pulled when the patient is in today's queue or on a call, never in bulk for the whole panel |
| Stale profile | Show "checked 10:14 today" and a refresh. Before Send, if the profile is older than today, prompt a refresh (PNet14.4). **Needs Daniel** on whether it may block |
| PharmaNet and chart disagree | Show both, labelled, and never merge them silently. Profile errors are reported to the HIBC help desk (PNet14.1) |

### How it lands in the v2 UI
- **Renewal card:** "last dispensed" is hard-coded today (`RX_MEDS … last:'Aug 30'`, V2:9999-10005;
  shown at V2:10056 and V2:10141), with no source. Proposed: **"last dispensed Aug 30 · PharmaNet ·
  checked 10:14"**. With TRR data, add "90 tablets · at the pharmacy on file" or "at another pharmacy".
- **Medications started elsewhere (D-76 context):** today they read "Started elsewhere: … ·
  patient-reported" (V2:10471). With PharmaNet, a dispensed item reads **"Dispensed Sep 3 at another
  pharmacy · PharmaNet"**, and the patient-reported line stays as it is when PharmaNet has no record.
- **Send:** if SimpleCare becomes an EMR-type PharmaNet application, "Send it myself" and "Ask the MOA
  to send" (REQ-RX-10) gain a PharmaNet e-prescription route beside fax. This is not designed here; it
  is flagged for `ux-designer`, `clinical-safety` and Daniel.

---

## 5. eFax with delivery receipts

### What it gives
Outbound prescriptions, referrals and requisitions, and inbound documents, with a **per-fax status**.
Example (verified, SRFax's public API [S25]):
- `Get_FaxStatus` returns `SentStatus` ("In Progress", "Sent", "Failed", "Sending Email"), `DateQueued`,
  `DateSent`, `Pages`, `Duration`, `RemoteID` and `ErrorCode` ("Busy", "No Answer", "No Remote Fax").
- No callback is documented on that page, so it would be polled.

SRFax is cited because its API is public. **It is not a recommendation.** Its claim that data stays in
Canada [S26] is the vendor's own and has **not been verified** by us.

### What a receipt means
- **Verified:** Doctors of BC guidance tells physicians to use a cover sheet with sender, recipient and
  page count, and a confidentiality disclaimer [S27].
- **Verified:** CPSBC and the pharmacists' guidance say a valid faxed prescription carries the
  practitioner's phone and fax, the transmission time and date, and the pharmacy's name and fax number,
  and must come "directly from the practitioner" [S23].
- **Assumption:** "Sent" means the receiving fax machine accepted the pages. It does **not** mean a
  pharmacist has seen or acted on it. The UI must not imply more than that.

### Access prerequisites (assumption)
A commercial contract, a Canadian data-residency confirmation in writing, a signed privacy agreement,
number porting, and a PIA update. No government step.

### Failure modes and UI (proposals; the wording is `content-designer`'s)
Today v2 shows "Sending to …", then after a demo timer "Delivered to … · patient copy sent"
(`rxRenderStatus`, V2:10192-10207; OQ-50).

| Provider state | Proposed line on the renewal card |
|---|---|
| Queued or In Progress | "Sending to the pharmacy · queued 10:41" |
| Sent, pages match | **"Delivered to the pharmacy · 10:42 · 2 of 2 pages"**, with the receipt kept on the visit |
| Sent, fewer pages than sent | "Partly delivered · 1 of 2 pages · Resend" (**assumption** that the provider reports pages received) |
| Failed: Busy or No Answer | "Not delivered · line busy · Retry". Who retries is OQ-50 (Daniel and Ani) |
| Failed: No Remote Fax | "Not delivered · this number is not a fax · Check the number" |
| No status after N minutes | "No receipt yet · Check". **N needs Ani/Daniel**; no number is set here |

- The **patient copy** is a separate event with its own status. It is not proof that the pharmacy got
  the fax.
- The **"Signed off by"** stamp (D-71) attaches when the fax is sent, and the receipt follows it.
- **Inbound faxes** land in the MOA "Fax inbox" (MOA:214), unmatched until the MOA files them.

**Timeline (assumption):** 2–6 weeks.

---

## 6. Teleplan / MSP billing

### What it gives (verified)
- Claims submitted "24 hours a day, 7 days a week", remittances, refusals, eligibility checks and notes
  [S22].
- Spec **Teleplan4 Web Record Specifications v4.8** [S22a]:
  - **ASCII fixed-length records**: VS1 vendor, C02 claim, N01 note, B04 batch eligibility; C12
    refusal back;
  - sent over HTTPS to `https://teleplan.hnet.bc.ca/TeleplanBroker` by web services, or through the
    browser;
  - a vendor test site at `tlpt2.moh.hnet.bc.ca` that is "a full production clone".
- **Processing and payment [S22a]:**
  - claims are processed "once each evening … normally at 7:00 p.m.";
  - pre-edit refusals (C12) are available "shortly after on the same evening or the next day";
  - payment is "twice a month (middle and end of the month)", with a close-off about 10 days before;
  - "Approximately 98.8% of all claims are processed within 30 days" [S22].
- **Eligibility rule [S22a]:** the real-time check "must be keyed one PHN at a time. An automated request
  … with a batching process is not acceptable". "If automation is necessary, use the Batch Eligibility
  Request."

### Access prerequisites (verified unless marked)
- The practitioner applies for Teleplan Service (HLTH 2820 opted-in or HLTH 2771 opted-out) and gets a
  data centre ID [S22].
- A vendor gets an application kit from Teleplan Support, tests, and must "obtain approvals as a
  legitimate Teleplan Vendor" [S22a].
- The password expires after 42 days, and no more than two concurrent requests are allowed [S22a].
- Fee codes, virtual-care billing rules and claim content belong to `billing-msp` and Daniel. **None are
  given here.**

### Failure modes and UI
Today v2 has the claim states "Submit claim / Claim submitted / Review claim / Claim rejected / Claim
paid" (V2:5603-5614) and the card states "Verified / Check required / Invalid card / Private pay"
(V2:5586-5598). Proposed sources:

| v2 state | Real signal |
|---|---|
| Claim submitted | Teleplan accepted the file (transmission log). **Assumption** on the exact log |
| Claim rejected | A C12 refusal from the 7 pm pre-edit, or a refusal on the remittance, with its explanatory code |
| Claim paid | A remittance line on the published payment date |
| Card "Verified · Checked against MSP this morning" | Must come from a **batch eligibility (B04)** run for the day's queue, not automated real-time checks. The one-patient "re-check" can be real-time |
| "Check required" / "Invalid card" | The eligibility response. The wording of reasons stays with `billing-msp` |

- **Note (verified):** a PHN "is not an indication of MSP eligibility" [S7 CR1.1]. The card tick must
  say **coverage** was checked with MSP, not that the PHN was found.
- **Downtime:** the error "TETZ-022 ELIGIBILITY SUBSYSTEM UNAVAILABLE" [S22a] should show as "MSP check
  unavailable · try later", never as "Invalid".

**Timeline (assumption):** 2–4 months to build and pass vendor testing, or none if the current billing
vendor is kept. **Needs Ani:** which billing software SimpleCare uses today.

---

## 7. Provincial Client Registry (PCR) and Provider & Location Registry (PLR)

### PCR (verified)
- **What it is:** the authoritative client identity: PHN, name, gender, date of birth, date of death,
  address and phone. It can find a PHN, verify demographics, update them, and create PHNs [S2 §2; S7
  §1].
- **Transactions:** Find Person, Maintain Person, Merge Person. The best search is "full name + date of
  birth" (CR1.2). Documented identity from the BC Services Card is locked (CR1.9). A date of death comes
  only from Vital Statistics (CR1.8).
- **Format:** HL7 v3, plus a **FHIR R4 IG v1.0.0, active 2026-03-25** [S30a]. Transport is the Health
  Registries Broker [S2 §3].
- **Mandatory for any new PharmaNet application** [S3 §2.1].

### PLR (verified)
- **What it is:** authoritative provider and location data (names, identifiers, expertise, contact
  information, licensing status, work locations) sourced from the colleges and HIBC, plus organizations
  and sites, "e.g., clinics or pharmacies" [S2 §2; S31 §1].
- **Use:** real-time query (recommended) or automated distributions [S31 §1].
- **Rules:**
  - "General browsing is not allowed" (PR1.3);
  - MPID use is "restricted to billing and referral purposes" (PR1.6);
  - providers can be flagged confidential (PR1.1);
  - updating work locations is deprecated for new users [S31 §2.2].
- **Format:** HL7 v3, plus a **FHIR R4 IG, active 2026-04-01**, based on CA Baseline (Practitioner,
  Organization, Location, with PractitionerRole referenced) [S30b].
- **Access (verified):** "Any given point of service (PoS) can only access the Provider data fields that
  are included in the relevant information sharing agreements" [S30b]. Vol 1 lists information sharing
  agreements for PLR, PCR and PLIS "(for Health Authorities)" [S2 §4]. **Whether a private virtual
  clinic can sign one is not stated. This is the first discovery question.**

### Failure modes and UI (proposals)
| Case | Proposed behaviour |
|---|---|
| Registry name or date of birth differs from the chart | A quiet flag on the chart header for the MOA: "Registry details differ · Review". Never a silent overwrite. Changes need trusted ID (CR1.11–1.12) |
| Merged PHN returned | Update, with a note "PHN updated from the Client Registry". Old identifiers kept |
| Date of death returned | Stop, and route to the MOA/doctor to confirm identity (CR1.7). **Needs `clinical-safety`**; wording is sensitive |
| No candidate found | "No Registry match · check spelling or add date of birth" (CR1.5) |
| PLR provider confidential | "Details confidential" |
| PLR down | Use the cached directory, labelled "from the Provider Registry · updated Sep 20" |

### How it lands in v2
- **Patient header or card:** "Identity checked with the Client Registry · 7:02", separate from the MSP
  coverage tick.
- **MOA specialist directory and Refer** (MOA:526): entries "From the Provider Registry", with licensing
  status. A retired or suspended referral target is flagged before a referral goes.
- **Pharmacy on file:** **Assumption:** PLR holds pharmacy sites and their fax numbers. If so, the fax
  number could be checked against the PLR before a prescription fax goes, which also serves REQ-RX-05.
  **Ask at discovery.**

**Timeline (assumption):** 6–12 months, mostly the agreement and conformance, if a private clinic is
eligible at all.

---

## 8. Questions for the vendor discovery session (BC Ministry of Health CIS team: PLR, PCR, PharmaNet)

Vol 1 says the discovery session is to "ensure integration plans align with ministry objectives;
confirm understanding of the requirements; identify any constraints; and determine the appropriate
integration approach and readiness" [S2 §6.1]. The questions are ordered most important first.

**Eligibility and path**
1. Can a **private, physician-led virtual family practice** building its own EMR be a software
   organization for PharmaNet (EMR access type), PCR and PLR? Or must it use an approved vendor (iClinic,
   Medinet, Plexia, CareConnect)?
2. Are **new EMR-type PharmaNet vendors being accepted now**, and is there a queue or intake window?
3. PCR and PLR access is described as information sharing agreements "for Health Authorities". What
   agreement, if any, lets a **private community clinic or vendor** query the PCR and PLR?
4. Is there a lighter option for a first release, for example **medication profile read (TRP/TRR)
   without full e-prescribing (TRX)**? Or is the whole EMR permission set mandatory from day one?
5. For a new application, must **PCR integration be complete before PharmaNet conformance**, or can they
   be tested together?

**PharmaNet specifics**
6. On the API Gateway, are payloads HL7 v2 messages carried through the FHIR-named endpoints, or native
   FHIR resources? Is there a FHIR roadmap we should build to?
7. For a virtual practice where doctors and MOAs work from home, how does the **remote access policy**
   apply to a cloud-hosted web EMR? Is a VPN still required? How is "geofenced … within BC only" applied
   to clinicians elsewhere in Canada?
8. Is the remote access policy (v1.1, 2020) still current after the **PPN ended on 4 Sep 2026** [S28]?
9. The **five-day encounter window** (PNet14.3): for a same-day queue, is fetching at queue join
   acceptable? What must the access log hold for an MOA acting on the doctor's behalf?
10. How does the CPSBC Writing Prescriptions guideline (8a lists paper, fax and verbal) fit with
    **mandatory TRX-X1**? When e-prescribing is available, may a clinic still fax?
11. What must an EMR show when a patient has a **protective word**, on a phone consultation?
12. Is a **Privacy Impact Assessment** required for vendor certification or for PRIME site registration,
    beyond the privacy/security gap analysis and HLTH 801? Is there a template?
13. Does storing HIE data in a **Canadian region of a public cloud** meet PS1.1 and PS18.1? What evidence
    does HLTH 801 need?
14. Realistic time from Request for Integration Services to IAN for a new EMR vendor, and the most common
    reasons for failed conformance.

**PCR and PLR specifics**
15. PCR: may a private clinic **create PHNs** or **update demographics**, or only query?
16. PCR: when the Registry returns a date of death or a merged PHN, what must the application do, and is
    there a notification (push) or only query?
17. PLR: does the data field set a private clinic can get include **fax numbers** for providers and
    **pharmacy sites**? Are PLR **distributions** (push) available to a new clinic?
18. PLR: can it confirm a referral target's **licensing status** at send time, and is that a permitted
    "legitimate business or clinical reason" (PR1.3)?

**Labs (PLIS) and what comes next**
19. PLIS is on hold "until a new transport mechanism is determined". Is there a date or a planned
    standard (FHIR?), and can we join a waitlist or a pilot?
20. Until then, is **CareConnect** the Ministry's intended route for a community clinic to see results
    it did not order? Can a web EMR launch CareConnect **in the patient's context** (like "Rapid
    Access")?

**Logistics**
21. Which forms should we file first (HLTH 4637, VPA), and who at the Ministry owns our file?
22. Can we have sandbox access (after the VPA) to prototype read-only flows before committing to the
    full scope?

---

## 9. Assumptions register (everything not verified)

| # | Assumption | Who confirms |
|---|---|---|
| A1 | "Accelerus" in MTG21:31 is Excelleris | Daniel |
| A2 | The Excelleris payload is HL7 v2 ORU with LOINC or provincial codes; some report types are PDF or text only | Excelleris |
| A3 | Excelleris has its own EMR-vendor onboarding and conformance, requirements unknown | Excelleris |
| A4 | A new EMR-type PharmaNet application must implement e-prescribing (inferred from the Vol 3C permissions table) | Ministry CIS |
| A5 | PharmaNet API Gateway payloads are HL7 v2 in FHIR-named endpoints | Ministry CIS |
| A6 | A PIA is required for PharmaNet or registry access | Ministry CIS, `privacy-security` |
| A7 | A fax "Sent" status means the receiving machine accepted the pages, not that the pharmacy acted on it | The fax vendor |
| A8 | The fax vendor reports pages received versus sent | The fax vendor |
| A9 | PLR holds pharmacy fax numbers available to a private clinic | Ministry Registries |
| A10 | All timelines not cited to a source | Each owner |
| A11 | SimpleCare's current EMR and billing software (not recorded in the repo) | Ani |
| A12 | A private virtual clinic is eligible for PCR/PLR agreements | Ministry Registries |

---

## 10. Sources (all accessed 26 Sep 2026)

- [S1] BC Gov, Health Information Exchange (HIE) Systems: https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/software
- [S2] Conformance Standards Vol 1, Overview & Conformance Processes, v3.7, 2026-02-20: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-1-overview-conformance-processes.pdf
- [S2a] Conformance Standards page and Release Notes v3.7: https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/software/conformance-standards
- [S3] Vol 3C, Business Rules – PharmaNet, v3.7: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-3c-bus-rules-pnet.pdf
- [S4] Vol 5C, Transport Protocol – API Gateway, v3.7: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-5c-transport-api-gateway.pdf
- [S5] PharmaNet Implementation Guide, v3.7: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/pnet-implementation-guide-v70.pdf
- [S6] Introduction to PLIS (BC Gov training): https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/software/user-training-material/provincial-laboratory-information-1015/introduction-to-plis-eplha-01
- [S7] Vol 3B, Business Rules – PCR, v3.7: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-3b-bus-rules-pcr.pdf (the PNetTx rules are from Vol 4C: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-4c-app-rules-pnet.pdf)
- [S8] Vol 2, Information Privacy & Security, v3.7: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-2-privacy-security.pdf
- [S9] Community health practice access to PharmaNet: https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/system-access/health-practice-access-to-pharmanet
- [S10] Vol 3A, Business Rules – General, v3.7: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-3a-bus-rules-general.pdf
- [S11] Policy for Secure Remote Access to PharmaNet v1.1 (2020-09-21): https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/remote-access-policy-pnet-v10.pdf
- [S12] BCMJ, Getting connected: electronic delivery of lab, radiology, and hospital reports (May 2010, historical): https://bcmj.org/physician-information-technology-office/getting-connected-electronic-delivery-lab-radiology-and
- [S13] Excelleris Electronic Distribution Application (VCH copy): https://medicalstaff.vch.ca/Documents/Excelleris%20Reports%20Distribution.pdf
- [S14] CHR (TELUS) help: integrating Excelleris (LifeLabs): https://help.inputhealth.com/en/articles/6149886-british-columbia-ontario-and-new-brunswick-integrating-excelleris-lifelabs-with-your-chr-account
- [S15] Excelleris, System Integration and Launchpad: https://www.excelleris.com/solutions/hospitals-health-authorities/system-integration/ · https://www.excelleris.com/solutions/physicians-private-practice-solutions/launchpad/ · CST clinical reports distribution: https://cstproject.ca/clinicalreports.html
- [S16] Island Health, Distribution of Diagnostic Results (Dec 2023): https://medicalstaff.islandhealth.ca/sites/default/files/onboarding/island-health-distribution-preferences-forms-package-dec-2023.pdf
- [S17] Quest Diagnostics completes acquisition of LifeLabs (26 Aug 2024): https://newsroom.questdiagnostics.com/2024-08-26-Quest-Diagnostics-Completes-Acquisition-of-LifeLabs,-Enhancing-Access-to-Diagnostic-Innovation
- [S18] Interior Health, Clinical Data Exchange Service (CDX): https://www.interiorhealth.ca/information-for/medical-staff/e-access-virtual-care-meditech-and-mfa/clinical-data-exchange-service
- [S19] FPSC, CareConnect enrolment open for family doctors (18 May 2021): https://fpscbc.ca/news/news/careconnect-enrolment-now-open-family-doctors-across-bc-through-phsa
- [S20] PHSA CareConnect community-based access FAQ: https://www.phsa.ca/health-professionals/clinical-tools-applications/careconnect/community-based-access/frequently-asked-questions
- [S21] PHSA CareConnect community-based access: https://www.phsa.ca/health-professionals/clinical-tools-applications/careconnect/community-based-access
- [S22] BC Gov, Teleplan: https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/msp/claim-submission-payment/teleplan
- [S22a] Teleplan4 Web Record Specifications v4.8, Chapter 1: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/medical-services-plan/teleplan-ch1.pdf
- [S23] CPSBC, Prescribing verbally or by fax: https://www.cpsbc.ca/registrants/programs/drug-programs/cpp/verbal-fax-rx
- [S24] CPSBC Professional Guideline, Writing Prescriptions, 1 Apr 2026 v1.0: https://www.cpsbc.ca/files/pdf/CPSBC-PG-Writing-Prescriptions.pdf
- [S25] SRFax API, Get_FaxStatus: https://www.srfax.com/developers/internet-fax-api/get_faxstatus/
- [S26] SRFax, Security Overview and PHIPA pages (vendor claims): https://www.srfax.com/more/security-privacy/security-overview/ · https://www.srfax.com/more/security-privacy/phipa-compliance/
- [S27] Doctors of BC, Guidelines for Use of Email or Fax (Aug 2017): https://www.doctorsofbc.ca/sites/default/files/ptv3.0.18_guidelines_for_use_of_email_or_fax.pdf
- [S28] PHSA, Private Physician Network transition ("PPN service ends" 4 Sep 2026): https://www.phsa.ca/health-professionals/professional-resources/private-physician-network
- [S29] BC Gov, Health Gateway: https://www2.gov.bc.ca/gov/content/health/managing-your-health/health-gateway
- [S30a] BC Client Registry FHIR IG: https://fhir-guide.hlth.gov.bc.ca/ClientRegistry/
- [S30b] BC Provider Location Registry FHIR IG: https://fhir-guide.hlth.gov.bc.ca/ProviderLocationRegistry/index.html
- [S31] Vol 3D, Business Rules – PLR, v3.7: https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-3d-bus-rules-plr.pdf

---

## Top 3 findings or asks, ranked by impact

1. **PLIS is closed to new integrations** [S1, S2]. A direct feed (Excelleris, CDX) only brings results
   that a SimpleCare doctor **ordered or was copied on** [S16]. Results ordered elsewhere, the shadowing 5
   case, can only be seen in CareConnect (view only) or uploaded by the patient. **Ask:** start Excelleris
   onboarding now, and make "cc SimpleCare" part of every outside referral and requisition the clinic can
   influence.
2. **PharmaNet for an EMR is all or nothing** [S3 §2.1]:
   - the EMR access type makes **e-prescribing (TRX) mandatory**;
   - new applications **must integrate with the PCR**;
   - remote access is **laptop or desktop only, geofenced to BC** [S11], which is hard for a virtual
     clinic.

   **Ask:** decide build (become a certified vendor, 12–24 months, assumption) versus partner (an
   approved vendor: iClinic, Medinet, Plexia, CareConnect [S9]) before the discovery session.
3. **Fax receipts can be real within weeks.** A fax API reports queued, sent or failed, with pages and an
   error reason [S25], which replaces v2's timer "Delivered". **Ask:** choose a fax vendor with Canadian
   residency confirmed in writing, and settle OQ-50 (who retries).

## Needs Daniel
- Is "Accelerus" (MTG21:31) Excelleris? What has onboarding covered so far, and for which doctors?
  (A1, OQ-65)
- Which source first (OQ-65): the recommendation is Excelleris for LifeLabs and the Excelleris health
  authorities, then CDX.
- May a direct result close an "Expected" item without him (REQ-CH-29)?
- Should a stale PharmaNet profile block Send, or only warn (PNet14.4)?
- Who retries a failed fax, and after how long with no receipt (OQ-50)? No number is set here.
- Does he or the MOA work from outside BC? The PharmaNet remote-access geofence is BC only [S11].
- Is he enrolled in CareConnect today, with PharmaNet access through it?

## Needs Ani
- **Build versus partner** for PharmaNet, PCR and PLR, with `tech-lead`, before the discovery session.
- What EMR and billing software SimpleCare runs today (A11). This decides whether Teleplan is work at
  all.
- Take the section 8 questions to the discovery session. File HLTH 4637 only after the build-versus-
  partner decision.
- Ask `privacy-security` to start the PIA and data-residency evidence (PS1.1, PS18.1, HLTH 801). Every
  route needs it.
- Ask `ux-designer` and `content-designer` to take the section 3–7 UI proposals: source labels, fax
  states, PharmaNet "checked" time, and Registry flags. Nothing in the prototype was changed.
