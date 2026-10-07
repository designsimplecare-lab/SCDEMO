# Copy diet, 7 Oct 2026

Ani, 7 Oct: "there is so much text — where can we remove it?"

Scope: `simplecare-login.html`, `simplecare-billing-portal.html`, `simplecare-moa-portal.html`,
`simplecare-patient-portal-v2.html`. The physician portal is not in scope (another agent is working there).

**How we measured.** Headless Chrome at 1440×900 (and 390×844 for the patient portal). For each screen we
count the words in `document.body.innerText`. For drawers and panels we count only the drawer's own text.
Hidden tabs and closed menus are not counted. The billing portal had no build stamp before; the new one adds
3 words to every "after" count.

**Rules applied**
- Say it once.
- No explanatory subtitles.
- Labels and buttons are 1–3 words, verb first.
- Use the audience's own abbreviations.
- Help text that is still needed goes behind an ⓘ tooltip.
- Safety, emergency, consent and legal wording is kept. Where it was shortened, the meaning is unchanged.
- No wait estimates in the patient portal (rule 11).

**What we checked**
- Every inline script passes `node --check`.
- The console is clean on every screen.
- No text is under 14 px. This fixes three places that were already under 14 px: the login labels (13.5 px),
  the login eyebrow (13 px) and the patient notification titles (13 px).
- No horizontal scroll, and no clipped text.
- Screenshots are in `product/reports/shots/copydiet-*-after*.png` (git-ignored).

---

## Login (`simplecare-login.html`): −29% overall (sign-in 73 → 51 words, −30%)

| Before | After |
|---|---|
| "Sign in" + subtitle "Welcome back. Pick up where you left off." | "Sign in" (no subtitle) |
| Password placeholder "Your password" | none (the label says it) |
| "New to SimpleCare? Ask your practice admin" | "No account? Ask your admin" |
| Splash "Click anywhere to continue" | "Click to continue" |
| "Critical results reach you before your first call." / "Graded against the LifeLabs British Columbia standard, not by guesswork." | "Critical results reach you first." / "Graded to the LifeLabs BC standard." |
| "The queue follows the clock, so you do not have to." / "It moves with your call windows and holds anyone carried over from earlier." | "The queue follows the clock." / "It moves with your call windows and keeps carry-overs." |
| "Patients wait at home, not in a waiting room." / "They book a call window and hold a place in line. You phone them." | "Patients wait at home." / "They hold a place in line. You phone them." |
| The other value lines | trimmed the same way |
| Field labels at 13.5 px, eyebrow at 13 px | 14 px |

## Billing (`simplecare-billing-portal.html`): −29% overall

| Screen | Words before → after |
|---|---|
| Work queue · Refused | 808 → 591 (−27%) |
| Held by MSP | 190 → 123 (−35%) |
| Waiting on doctor | 287 → 213 (−26%) |
| Resent | 320 → 206 (−36%) |
| Remittance | 329 → 229 (−30%) |
| Claim drawer | 204 → 164 (−20%) |
| Fix & resend drawer | 124 → 77 (−38%) |
| Ask doctor drawer | 134 → 101 (−25%) |
| Close unpaid drawer | 156 → 108 (−31%) |

| Before | After |
|---|---|
| Work queue subtitle: "MSP claims that were refused or held… Dr. Pannozzo decides the coding and approves write-offs." | ⓘ tooltip on the title |
| Remittance subtitle: "MSP's latest statement, matched line by line against our claims." | removed |
| Strip "Refused — fix & resend · $394.91 not paid" | "Refused · $394.91 unpaid" |
| Strip "Waiting on the doctor · next answer by today" | "Waiting on doctor · next due today" |
| Fee text "13737 · Telehealth visit, age 70–79" | "13737 · Visit 70–79" |
| "AM · The patient's initials don't match MSP's records. Refused by MSP 10 Jul, before review." | "AM · Initials don't match MSP's records. Refused 10 Jul, pre-edit." |
| "Who fixes it: You (billing agent). Bill the exact legal name MSP has on file (check it with MSP), then resend…" | "Use the legal name MSP has on file, then resend with code X and a note." (the chip already says "You fix it") |
| "This is a coding question, so Dr. Pannozzo decides. You can't change the fee code, diagnosis or times; you resend once he answers." | "Coding is the doctor's call. Resend after he answers." |
| Buttons "Fix and resend" · "Ask the doctor" · "Mark closed — not paid" | "Fix & resend" · "Ask doctor" · "Close unpaid" |
| Held panel: "MSP will decide on a later statement. Don't resend. A resend while MSP holds a claim is refused as a duplicate." | "**Don't resend.** MSP decides on a later statement." with the duplicate rule in ⓘ |
| Each held card repeated the meaning of BH | "BH · Held on 29 Sep statement." |
| Waiting panel: "Questions and write-offs you've sent… comes back to Refused for you to resend." | "Answered claims return to Refused." |
| "Question sent 2 Oct to Dr. Pannozzo: …" · "Answer by Wed 7 Oct" · "Send a reminder" | "Asked 2 Oct: …" · "Due Wed 7 Oct" · "Remind" |
| Resent card: chip "Sent — waiting for MSP" plus the timing sentence | no chip (the tab says it). "Answer on the Fri 30 Oct statement", with the close-off and pre-edit timing in ⓘ |
| Empty states, e.g. "Nothing refused. Every refused claim has been resent, asked about or closed." | "Nothing refused." |
| Remittance: third pill "Next close-off …" (already in the top bar) | removed |
| Reconciliation paragraph "12 of 17 lines matched… No statement-level adjustments this time." | the strip gives the counts; the head keeps "no statement-level adjustments" |
| Column "Where it is now" · "Matched · paid as billed" · "In your queue · refused / 83 days left to resend" | "Status" · "Matched" · "In queue / 83 days left" |
| Drawer eyebrow "MSP claim · Dr. Daniel Pannozzo"; title rows "What it means / Who fixes it" | "MSP claim"; "Meaning / Who" |
| "83 days left to resend · last day …" plus "How we count this" (repeats the header chip) | one disclosure, "Last day to resend: Thu 8 Oct", with the 90-day rule inside |
| "Submission code X · resending a refused claim" + "Why code X" disclosure | "X" + ⓘ (same rule text) |
| Note hint "MSP reads this with the claim. Say what was wrong…" | removed (the note is prefilled) |
| "Resend with code X" | "Resend (code X)" |
| Write-off notice "Write-offs need the doctor's approval. This goes to Dr. Pannozzo first…" | "**Needs Dr. Pannozzo's approval.** The claim closes, and $x is written off, only when he approves." |
| Reasons "The patient had no MSP coverage on the visit date" etc. | "No MSP coverage on visit date" etc. |

**Kept word for word:** MSP's own explanatory-code wording ("MSP's words") and the claim history entries.

## MOA (`simplecare-moa-portal.html`): −22% overall

| Screen | Words before → after |
|---|---|
| Today | 371 → 285 (−23%) |
| Tasks | 244 → 198 (−19%) |
| Referrals | 142 → 110 (−23%) |
| Imaging | 115 → 90 (−22%) |
| Callbacks | 151 → 129 (−15%) |
| Faxes | 129 → 97 (−25%) |
| Directory | 151 → 126 (−17%) |
| Task drawer | 76 → 50 (−34%) |
| Payment-link task drawer | 119 → 72 (−39%) |
| Other drawers | −7% to −25% |

Most of what remains on the MOA screens is the doctor's own task text and the patient data.

| Before | After |
|---|---|
| Today subtitle "Tue 6 Oct 2026. What Dr. Pannozzo has asked of you, and the referrals and bookings you're chasing." | "Tue 6 Oct 2026" |
| Box notes ("Dr. Pannozzo marked these urgent.", "Each task says what to do, for whom and why…", "Declined referrals go to the next specialist…") | removed |
| "Needs attention now" + an Urgent tag on every card in it | "Urgent" (tag hidden inside that box) |
| Strip subs "declined by the specialist", "first come, first served", "no sure match" | removed |
| Page subtitles on Tasks, Referrals, Imaging, Callbacks, Faxes, Directory | removed |
| Titles "Imaging bookings", "Patient callbacks", "Specialist directory" | same as the nav: "Imaging", "Callbacks", "Directory" |
| "Need something from Dr. Pannozzo?" / "Ask in chat, by email or by phone. Only Dr. Pannozzo creates tasks." | "Ask Dr. Pannozzo" / "Only Dr. Pannozzo creates tasks." |
| "Your last reply: …" / "You asked: …" | "Reply: …" / "Asked: …" |
| Drawer eyebrow repeated the title ("Call patient" / "Call patient") | "Task" |
| Radios "Reply: tell him where it stands" / "Ask a question: you need something from him to finish" | "Reply" / "Question" |
| "It stays on this task. Only Dr. Pannozzo creates tasks." | "Only Dr. Pannozzo creates tasks." |
| Placeholders "For example: …" | the example only |
| Buttons "Escalate unpaid link", "Go to referrals", "Send referral", "Save booking", "Open document" | "Escalate", "Referrals", "Send", "Save", "Open" |
| "How did it go?" / "Reached the patient" / "Left a voicemail" | "Outcome" / "Reached" / "Voicemail" |
| Imaging hint "For example: Eagle Ridge, Thu 8 Oct, 9:30 AM" | the field's placeholder |
| Toasts "… Dr. Pannozzo sees it on the task." / "… on this task" | trimmed |

**Kept:** the rule 12 direction ("From Dr. Pannozzo", "Only Dr. Pannozzo creates tasks"). The fax rule "Confirm
a second identifier before filing" (patient identification) is shortened but keeps its meaning. "Dr. Pannozzo
stays responsible" stays on referrals.

## Patient (`simplecare-patient-portal-v2.html`): −24% at 1440, −26% at 390

| Screen | 1440 before → after | 390 before → after |
|---|---|---|
| Dashboard | 510 → 401 (−21%) | 497 → 388 (−22%) |
| Health records | 506 → 367 (−27%) | 493 → 354 (−28%) |
| Visit history | 118 → 89 (−25%) | 101 → 72 (−29%) |
| Clinical activity | 136 → 103 (−24%) | 123 → 90 (−27%) |
| Family | 157 → 116 (−26%) | 144 → 103 (−28%) |
| Profile | 69 → 57 (−17%) | 56 → 44 (−21%) |
| Care choice | 84 → 48 (−43%) | 71 → 35 (−51%) |
| Booking steps 1–4 + done | −8% to −28% | −10% to −33% |
| Queue states (all 8) | 191 → 128 (−33%) | 191 → 128 (−33%) |
| Visit summary drawer | 74 → 53 (−28%) | 74 → 53 (−28%) |
| Assistant | 44 → 20 (−55%) | 44 → 20 (−55%) |
| Notifications | 45 → 45 (0%; font fixed to 14 px) | 45 → 45 (0%) |

**Wait estimates removed (rule 11)**

| Before | After |
|---|---|
| Dashboard card "11:40 – 12:10 PM" / "Estimated call time · #6 in line, 5 ahead" | "10:00 AM – 2:00 PM" / "Your call window · #6 in line · Pacific time" |
| Queue, waiting: "5 patients ahead · estimated call 11:40 AM – 12:10 PM." | "Your call window: 10:00 AM – 2:00 PM. We'll text you when it's close." |
| Queue, next: "The doctor will call you within a few minutes." | "Please stay near your phone, with a signal." |
| Queue, delayed: "running about 25 minutes behind" + toast "We'll text you a fresh estimate" | "The doctor is running behind. Your spot is held." + "We'll text you if anything changes" |
| Booking, same-day: "Join today's queue now · typical wait 60–90 min" | "Join today's queue" |

**Other cuts**

| Before | After |
|---|---|
| Subtitles under Dashboard, Visit history, Health records, Clinical activity, Family (both modes), Profile, Care choice | removed |
| "Today's appointment lives on your dashboard. This is history only." | removed |
| "Exactly what was ordered, what has come back, and what is still with the lab." (×2) | removed |
| Lab strip "tests ordered / reviewed by your doctor / in, awaiting review / still with the lab" | "tests / reviewed / awaiting review / at the lab" |
| "All 5 tests are back and Dr. Pannozzo has reviewed them. He wants to talk one of them through with you." | "All back and reviewed. Dr. Pannozzo wants to go over one with you." |
| Lab note "A result arriving does not mean something is wrong, and it does not mean you need to book…" | "A new result doesn't mean something is wrong or that you need to book. If your doctor wants to see you, our office will contact you." |
| Upload zone "Add a document" heading and zone title "Add a document" | zone title only; "PDF, JPG or PNG" |
| "Prescriptions · 9 total" / "Show all 9 prescriptions" | "Prescriptions · 9" / "Show all 9" |
| Visit summary "Laboratory ordered, CBC" under "Laboratory" | "CBC" under "Lab tests ordered" |
| Care choice option subs (two sentences each) | "One-off care with the next available doctor" / "The same doctor for every visit" |
| Done state "View visit summary", "Track my place live", "Back to dashboard" | "View summary", "Track live", "Dashboard" |
| Assistant intro listing everything it can do (chips below list it too) | "Hi Ani 👋 What do you need?" |
| Feedback placeholder "Tell us what happened, we read every one of these" | "What happened?" |

**Kept, meaning unchanged**
- Emergency wording (911 / ER triage alert): untouched.
- "By confirming, you agree that a no-show or a cancel inside 24 hours may carry a fee": untouched.
- "A no-show fee may apply": kept.
- 24-hour phone-only rule: "Within 24 hours, cancel or reschedule by phone: 778 949 APPT".
- Record access: "Your doctor's visit notes and clinical documentation stay in the medical record at their
  office. Ask them if you need a copy."
- Family authorization: "You manage Leo's record until he turns 19 (BC's age of majority); then it becomes his
  own. Karen authorized you to manage hers and can revoke that at any time." The add-member minor and adult
  notes are trimmed the same way.
- "Our office will call you within 24 hours to book a time" (who moves next): kept.

## Needs Ani

1. **Top-bar title repeats the page h1** in billing and MOA ("Work queue" twice). We kept both. Dropping one
   is a layout change across portals.
2. **Lab work appears in full on both the Dashboard and Health records.** It is the largest block of patient
   text. A dashboard summary that links to the full list would cut about 40% more, but it is a design change.
3. **Patient call-back times disagree.** The critical banner says "within 24 hours"; the renal panel says
   "today, 4:00–5:30 PM". Both are kept. This is pre-existing, and one should go.
4. **The call window on the dashboard card is now 10:00 AM – 2:00 PM,** taken from the Today's visit header,
   which was the only window shown. Confirm this is the intended demo window.
5. **The queue "next" state no longer says "within a few minutes".** We read that as a wait estimate under
   rule 11. Confirm.
6. **The MOA Imaging subtitle said "Dr. Pannozzo handles labs himself".** This scoping note was removed. Should
   it come back as a tooltip?
7. **The billing fee text is now "Visit 70–79" / "Counselling 60–69"** instead of "Telehealth visit, age 70–79".
   Japneet works in codes, but confirm.
