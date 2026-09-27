# Patient baseline review: the patient journey, as three patients

Agent: `patient`. Date: 26 Sep 2026. Scope: the live site (https://simplecare.ca) and the patient
portal prototype `simplecare-patient-portal-v2.html` (build stamp "build 2026-09-22 18:03", PP:2287).

Source codes: **PP** = `simplecare-patient-portal-v2.html` line; **SITE** = simplecare.ca, as rendered
by headless Chrome on 26 Sep 2026 (home, /faq, /about, /register, /services/uti-treatment);
**API** = the site's public read-only catalogue and availability endpoints, listed in
https://simplecare.ca/llms.txt (`/api/services`, `/api/availability`), read on 26 Sep 2026. OQ, REQ
and D numbers are from `product/`. Phone screenshots (390x844) are in the scratchpad only
(`.../scratchpad/patient/`), not in the repo.

How I tested: I read the portal's markup and script end to end, then rendered each state at phone
width (dashboard, care choice, booking steps 1 and 4, the queue's waiting, missed, done and no-show
states, and health records). I did not create an account on the live site. Booking there needs
/register or /cas, so the live walk stops at the concern list and the public API.

---

## 1. The walk-in (a bladder infection or a sick note, on a phone, no time)

**On the site**
- **The concern list works well on a phone.** The home page leads with "Click a concern to book" and
  a search box, "Symptoms or select reason". "Bladder Infection" and "Sick Note" are in the first
  group, Everyday Health (SITE home). This is the strongest part of the journey.
- **The promises about speed contradict each other.**
  - "Most visits are seen the same day" (SITE home).
  - "From sign-up to prescription — usually under 30 minutes" (SITE uti).
  - "Connect Within 60secs" (SITE uti, footer).
  - The FAQ says only that availability depends on schedules and demand (SITE faq).
  - The live API on the evening of Sat 26 Sep showed one window, for one physician: Sun 27 Sep,
    07:00–10:00 (API `/api/availability`, New Patient, Sick Note and Blood Pressure all return the
    same window).

  An anxious patient with a bladder infection who reads "60 seconds" and then gets "tomorrow
  morning" loses trust.
- **The sick note has a fee that I could not see on the site.** The API marks Sick Note (and the
  Massage, Orthotics, Physio and Chiro notes, every Medical Forms item and all of Travel Health) as not
  MSP-covered, and returns `service_fee: 50` for Sick Note. The public pages say only "Private
  appointments available" and "Uninsured services require payment" (SITE home, register). I could not
  check whether the fee shows before payment without an account. **Needs Ani** (check production).
- **The concern count is off.** "120 + Clinical Concerns Covered" (SITE home). The API has 103
  active concerns across 15 categories.
- **The UTI page has stray copy.** "HEAR WHAT YOU HAVE BEEN MISSING" (SITE uti, footer) reads like a
  leftover from a template.

**In the portal**
- **Booking asks for free text, not a concern.** Step 2 is a textarea, "Describe your main concern in
  your own words" (PP:1416). The site's 100+ concerns, and the questionnaire behind each one (API
  `questionnaireConfig`, for example `sick-notes`, `blood-pressure-control`), do not appear. So the
  patient who picked "Bladder Infection" on the site starts again from a blank box.
- **Emergency screening is good, but it uses red.** Ticking chest pain, trouble breathing or severe
  bleeding shows a clear 911 message (PP:1418-1426). The alert and the ticked box are red
  (PP:495, 502-505). This is the one place red may be justified. It is Ani's and Daniel's call
  (OQ-30).
- **Booking commits the patient to a fee nobody has set.** Step 4 reads "By confirming, you agree
  that a no-show or a cancel inside 24 hours may carry a fee." (PP:1457). See section 5.
- **The prototype does not work on a phone at all.**
  - There is no `<meta name="viewport">` in the file, and there are no `@media` rules.
  - The left sidebar stays fixed and takes about half of a 390 px screen.
  - Titles, the call-time card and the booking options are cut off on the right (screenshots
    pp-dash, pp-book1, pp-missed).

  The walk-in is on a phone, so this blocks every flow below.

## 2. Call windows and the queue

- **The site explains the model clearly.** "Select a call window · The doctor will call within your
  window · Join the queue · first-come, first-served · Track your place" (SITE home). The doctor
  calls out, which matches REQ-PT-07.
- **The portal shows four window lengths, and none of them matches the live one.**
  - "a 4-hour call window" (PP:1399).
  - "10:00 AM – 2:00 PM window" (PP:1493).
  - "9:00 AM to 1:00 PM window" (PP:810, 907).
  - The live window is 07:00–10:00 (API).

  The window's length is **Needs Daniel**.
- **The queue position is good.** "#6 in line", "5 patients ahead" (PP:1952-1953), "Pacific time"
  (PP:877) and "Text me when it's my turn" (PP:884) are exactly what an anxious patient needs.
- **The missed-call state frightens.**
  - The panel is pink with a red border (PP:534).
  - A 4:59 countdown runs to automatic no-show (PP:1990, 2009-2014).
  - "I can't take the call" goes straight to "Marked as no-show … A no-show fee may apply"
    (PP:1967, 1975).

  No source sets the length of the grace period (OQ-06).
- **"Reconnect now" reads as if the patient places the call** (PP:1969). So does "I'm ready", whose
  toast is "Answering the call…" (PP:1957). This is still open as OQ-29.

## 3. Getting ready for the call

- **Almost nothing prepares the patient.** The only guidance arrives at "You're next": "Please stay
  near your phone with a signal" (PP:1956). Nothing says:
  - which number the call comes from, or whether it may show as unknown. Assumption: patients often
    do not answer unknown numbers, which feeds the missed-call state;
  - to have their medication list, pharmacy and any home readings to hand;
  - to find a private place;
  - how long the call usually lasts.
- **The "While you wait" card is useful.** It shows the reason, intake done and attachments
  (PP:1497-1506). It could carry the list above.

## 4. The ongoing-care patient (home BP and weight: "I get my patients to work")

- **There is no way to send a reading.** The portal has no BP or weight entry, no readings form and
  no request from the doctor. REQ-PT-10 is not built. Daniel's *"I get them to do their blood
  pressures, their weights etc."* (ANS26:43-44; D-75) has no patient-side home.
- **There is no place for instructions.** The doctor promised home-BP instructions after the call
  (S5:60-65). The physician portal can release "patient instructions" (REQ-CH-30, V2b:9480), but the
  patient portal has no Instructions or handout section. So a released handout would have nowhere to
  land. The protocol, the number of readings and the handout text are **Needs Daniel** (OQ-56). Who
  enters the readings is **Needs Daniel** (OQ-64).
- **Refills contradict the prescriptions list.**
  - The assistant offers to refill Metformin and Amlodipine (PP:2068-2078).
  - Health records lists Amoxicillin and Atorvastatin (PP:1114-1118).
  - The assistant's "Your virtual visits are covered by BC MSP at no cost" (PP:2064) contradicts the
    booking-screen fee line (PP:1457).

## 5. Uploading outside bloodwork ("attach it to the chart under the follow-up section")

- **There is no follow-up section.** Uploads go to a general "Add a document" ("Lab result from
  elsewhere, insurance form, ID, or a photo"), and the toast says "saved to your health records"
  (PP:929-936, 2281). The patient cannot tell whether the doctor will see it, or when. So the patient
  in S5 would not know where "the follow-up section" is (OQ-52).
- **The doctor's request is not an item.** REQ-PT-09's "Your doctor asked for your bloodwork results
  · Upload" is not built. The patient also gets no confirmation that the upload reached the doctor.
  Whether an upload goes to the Inbox for review is **Needs Daniel** (OQ-54).
- **The upload rows show the file name and size**, with "Remove" (PP:1930-1940). That is fine, but
  there is no "who moves next" line after the upload.

## 6. Understanding results and instructions

- **The lab work card is the best thing in the portal.** It names every test with its state:
  reviewed, result in and not yet reviewed, or waiting on the lab. It says who moves next, and adds
  "A result arriving does not mean something is wrong" (PP:2147-2266). This meets REQ-PT-04 and
  REQ-PT-02.
- **It leaves some gaps and contradictions.**
  - "He wants to talk one of them through with you" does not say which test (PP:2158).
    Whether patients see values, or which test, is **Needs Daniel**.
  - It makes two different call-back promises:
    - "Our office will call you within 24 hours" (PP:860).
    - "Our office will call you today between 4:00 and 5:30 pm" (PP:2159).
  - The banner speaks of "August 14 bloodwork" (PP:859), but that panel was ordered Aug 3 (PP:2150).
    The banner's "View your results" opens a 2025 visit that lists only "Laboratory ordered"
    (PP:862, 1624-1628).
  - The assistant's "Open latest result" opens the June 25 visit (PP:2082).
- **The banner is calm in colour.** The ⚠ icon is hidden by CSS (PP:152, 857), which is correct under
  D-17. The class names still say "critical".

## 7. The new patient (lost their family doctor, hospital medications, bloodwork booked elsewhere)

- **The site speaks to this patient.** "Family Practice · New Patient Appointment", and "looking for
  a family doctor, we make it easy" (SITE home). In the API every category, including Family
  Practice, is `careType: WALK_IN`. So the data has no separate family-practice path (REQ-PT-06;
  OQ-58).
- **The portal has no new-patient path.** "Family medicine — ongoing care" (PP:1369-1372) jumps
  straight to a follow-up. It shows the toast "You're paired with Dr. Daniel Pannozzo — continuing
  your ongoing care" (PP:1817-1820), which is wrong for someone who has never been seen. It also
  promises a pairing that OQ-58 says has no rule yet.
- **The portal asks for nothing this patient needs to bring.** It does not ask for:
  - the previous family doctor (OQ-18);
  - medications started in hospital (OQ-57);
  - outside bloodwork already booked, with a place to send it when it is done (REQ-PT-09).

  In S5 all of this was said aloud and captured nowhere (S5:33-46).
- **The "Just stopping by" copy overpromises.** "Matched with whichever doctor is available"
  (PP:1367). The live API lists one physician.

## 8. Known conflicts: the three items the brief asked me to check

| Item | Where it shows (more than the open question cites) | Earlier decision | Open |
|---|---|---|---|
| Wait estimates | PP:876-877 "11:40 – 12:10 PM · Estimated call time"; PP:1953 "estimated call"; PP:1962 "about 25 minutes behind"; **PP:1395 "typical wait 60–90 min" (not in OQ-26)**; SITE "Connect Within 60secs", "usually under 30 minutes" | D-05 queue position, not wait time; REQ-PT-01 | OQ-26 |
| Visit summaries | PP:1973 "View visit summary"; **PP:1972 "Your visit summary … on the way"; PP:1046-1077 "Visit summary would open here" on about 14 history rows; PP:2081 "clinical summary"** | D-17 no visit summaries; REQ-PT-03 | OQ-27 |
| No-show fee | PP:1975; **PP:1457 fee agreement at booking; PP:912, 922, 954 "no fee since it's more than 24 hours out"; PP:1048, 1074 "Would explain the fee"**; PP:2064 says "no cost" | REQ-PT-08 no fees unless Daniel sets them | OQ-28 |

All three still contradict the decisions. The fee now appears as something the patient agrees to at
booking, which is stronger than "may apply". There is a real fee in production: the API's $50 Sick
Note. So patients will meet fees. What is missing is a rule set by Daniel for which fees are shown,
and where.

## 9. Privacy

- **The profile may hold real personal data.** It shows what look like a real personal email, phone
  number, personal health number, legal name, date of birth and home and pharmacy addresses
  (PP:1299-1339). That breaks the team rule on keeping patient data out of the repo. I have not copied
  them here. **Needs Ani**, and should go to `privacy-security`.
- **The addresses are in Ontario**, against a BC MSP account. This is also a realism problem in the
  demo.

---

## Top 3 asks, ranked by impact

1. **Make the patient portal work on a phone.** Add a viewport meta tag and a mobile layout, with the
   sidebar as a bottom bar or a menu. At the same time, cut the four call-window lengths to one real
   window length. Every patient flow is broken at 390 px today, and the walk-in lives on a phone.
2. **Remove the three conflicting promises before anyone sees the demo.** Take out every wait
   estimate (including "typical wait 60–90 min"), every visit summary (the queue, history and
   assistant) and every fee line (booking, cancel, no-show, "no cost"). Replace them with the queue
   number, "who moves next", and fees only where Daniel sets them. On the site, reconcile "60 secs",
   "under 30 minutes" and "same day".
3. **Add one "Your doctor asked for…" area.** It should hold the doctor's requests: "Upload your
   bloodwork", "Send your home BP readings" (values and dates, not files) and the released
   instructions or handout. Each item needs a "sent, the doctor will review it" confirmation. This
   is where "the follow-up section" and "I get my patients to work" land, and it gives the new patient
   continuity.

## What needs Daniel

- Call-window length, the grace period after a missed call, and whether "I can't take the call" means
  a no-show (OQ-06).
- Whether patients may see any time estimate (OQ-26), and which fees are shown to patients, if any:
  no-show, late cancel, uninsured notes (OQ-28).
- The home-BP protocol and handout, what "etc." covers (for example weight), and whether the patient
  types the readings or he does (OQ-56, OQ-64).
- Whether a patient upload goes to his Inbox for review (OQ-54).
- Whether the patient sees values, or which test he wants to discuss, when he "wants to talk one of
  them through".
- What choosing ongoing care should do for a new patient, and whether intake asks for the previous
  family doctor, other platforms and hospital medications (OQ-58, OQ-18, OQ-57).

## What needs Ani

- Is the patient portal meant to be phone-first? I recommend yes: the site is, and the walk-in is.
- Remove or anonymise the personal data on the profile screen (PP:1299-1339) and send it to
  `privacy-security`.
- Check production: whether the $50 Sick Note fee shows before booking, and what production's
  "follow-up section" is (OQ-52).
- Site copy: "Connect Within 60secs", "HEAR WHAT YOU HAVE BEEN MISSING", and "120+" against 103
  active concerns.
- Whether red is allowed in the 911 triage alert and the missed-call state (OQ-30). I recommend
  keeping red only for 911.
