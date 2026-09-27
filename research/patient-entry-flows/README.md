# Patient entry flows — how patients arrive and reach a doctor

Source: Ani's design boards, 26 Sep 2026, saved in this folder:
- `board-walkin-registration-login.webp`
- `board-become-patient-about.webp`

Ani is designing these now. They are the front half of the product: everything that happens before
the doctor's queue in `simplecare-physician-portal-v2.html`.

## 1. Arrival: the landing page ("MacBook Air – 223")
- **Hero:** "Virtual Doctors of British Columbia", with the line "Walk-in. Family Practice. MSP Covered."
- **The Simplicity assistant sits in the hero.** It says: "Hi, I'm Simplicity. We'll guide you to your
  Family Doctor or Walk-in care." It is a chat box ("Tell us how we can help…"), so booking starts as a
  conversation.
- **"Know What You Need?"** Concern tiles let the patient fast-track the visit: Everyday Health,
  Ongoing Health, Infections, Medical Forms, ENT, Skin, Travel, Bone/Joint, Sleep, Digestive, Mental,
  Sexual, Women's and Men's Health. These mirror the 120+ concerns on the live site.
- **How Your Visit Works:**
  1. Choose your time window.
  2. Get your spot in line.
  3. Stay updated by email.
  4. Questions before the visit? Talk to us.
  5. The doctor will call you.
- **Our Doctors:** Dr. Daniel Pannozzo and Dr. Luke Turanich (Primary Care Doctors), with bio links.
- **Who We Are**, the stats (120+ concerns, licensed BC physicians, secure platform), and a footer with
  social links.
- **Header:** Home, About Us, Doctors, FAQ; the phone number; "Become a Patient" / "Need family
  doctor"; Login.

## 2. Walk-in: a new concern ("WALK IN", MacBook 227 / 230, iPhone 16 – 2)
1. The patient types the concern, e.g. "I've had a sore throat and a cough that won't go away".
2. Simplicity triages the patient's intent. There are two variants on the boards:
   - three options: **See my family doctor** / **Become a regular patient** / **Quick-book a doctor**;
   - two options: **Something new (seen today)** / **I want a regular doctor (ongoing care)**. This
     variant can ask a follow-up, "How many days have you had these symptoms?"
3. "Quick-book a doctor" leads to **"Choose a doctor and call window that works for you"**. It shows
   doctor cards, each with window chips (Today 1:00–3:00 pm, Tomorrow…), a **"Soonest"** badge, and
   "More".
4. The patient picks one, e.g. "Dr. Michael Chen — Today 6:00–8:00 pm".
5. **The slot is held before the account exists:** "Holding today 6:00–8:00 pm with Dr. Michael Chen.
   Have you been here before?" The patient answers **I have account** or **I'm new here**.

## 3. Become a patient: ongoing care ("BECOME A PATIENT", MacBook 231)
1. The patient chooses "Become a regular patient", or "I want family doctor".
2. **"Choose your family practice doctor.** This physician becomes your ongoing SimpleCare doctor —
   same doctor every visit from here on."
3. A doctor bio card appears. For Dr. Daniel Pannozzo it covers his education and training (McMaster
   MD, Calgary family medicine residency) and a personal note. The patient chooses **Select Dr.
   Daniel Pannozzo**.
4. The patient goes on to registration.

## 4. New patient registration: the current process
1. **"Welcome to Simple Care", with the key information.** This covers what the service is, the
   eligibility and location rules, how records are used, and security. The patient ticks two
   agreements (the Patient Consent Agreement and the Terms of Service) and presses Next.
2. **Registration, which runs in several steps with a progress bar.** "Create your account" asks for
   an email address, or sign-up with Google, Apple or Microsoft, then Next.

## 5. Returning patient: the current login
- A **"Sign in to Simple Care"** modal over the page, offering email or sign-in with Google, Apple or
  Microsoft.

## 6. About Us / Doctors ("ABOUT US", MacBook 232)
- An "Our Doctors" grid with photos, "About Dr…" links and a "Book an appointment" hover.

## End to end
The patient arrives (search, social, word of mouth or a pharmacy) → reaches the landing page and
Simplicity → says what's wrong or picks a concern → Simplicity triages: walk-in or family doctor →
the patient picks a doctor and call window, which is **held** → signs in or registers (consent, account,
then the steps) → intake questions → joins the **queue** in that window, with email updates → the
**doctor calls out** (the physician portal: the Home queue, then the chart, the call, the plan, sign
off) → follow-up: the prescription is faxed, results arrive, the patient is asked for readings or
uploads, and a return visit is booked with *their* doctor.

## What the team should watch
- **Emergency screening before booking** (clinical-safety). A free-text chat that takes symptoms must
  catch red flags, such as chest pain or trouble breathing, and send the patient to 911 or the ER
  before any slot is held. That wording needs Daniel.
- **Doctor cards need real data.** The boards use placeholders, e.g. "Dr. Sarah Patel, DO" labelled
  "Cardiologist" in a family-practice flow. Real cards need real doctors, and "Primary Care" labels.
- **Hold, then register, is a strong pattern** (performance-marketing). It commits the patient before
  sign-up and should reduce drop-off. Measure it.
- **Walk-in or family doctor.** The hero reads "Walk-in. Family Practice." The market strategist
  recommends leading with "your virtual family doctor" (continuity). That is a positioning call for Ani
  and Daniel.
- **Choosing a doctor and window versus the queue model.** Picking a window fits Daniel's call-window
  model. The queue position in that window should be visible after booking, but with no wait estimate
  (a Daniel decision).
- **Ask about other platforms at intake** (Tia, Rocket). Daniel asked this out loud in two recorded
  visits.
- **Privacy at registration.** Keep sign-up minimal, and send consent and SSO scopes through
  privacy-security review.
- **Accessibility on phones.** The chat must work with a screen reader and keyboard, and meet the
  44px target size.
