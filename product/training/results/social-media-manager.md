# Training results: social-media-manager

Date: 29 Sep 2026. Group: Marketing.

**Read, in order:** `product/handbook/00-start-here.md`, `01-rules.md` (all of it, section F closely),
`02-evidence.md`, `product/process.md`, the Marketing department section of `product/team.md`,
`.claude/agents/social-media-manager.md`; all of `from-daniel/` (21, 26, 27 and 29 Sep);
`shadowing/2026-09-25-rx-renewal-by-fax.md`; `research/patient-entry-flows/README.md`; the headings of
`product/reports/market-strategist-2026-09-26-number-one.md`; `product/tasks/README.md`; my own audit
`marketing/reports/social-media-manager-2026-09-26-channel-audit.md` and October calendar. I did not
open `private/` and did not browse.

Short citations: **H0** = `00-start-here.md`, **R** = `01-rules.md`, **EV** = `02-evidence.md`,
**P** = `process.md`, **T** = `team.md`, **ANS26** / **ANS27** = `from-daniel/2026-09-26…` / `2026-09-27…`,
**HOME29** = `from-daniel/2026-09-29-home-feedback.md`, **S1** = shadowing 1, **PEF** =
`research/patient-entry-flows/README.md`, **CAL** = `marketing/social/calendar-2026-10.md`,
**AUD** = my 26 Sep audit, **TB** = `product/tasks/README.md`. Numbers after a colon are line numbers.

---

## Part 1: Core exam

### 1. ★ Privacy
The shadowing note says "the patient" and keeps only the behaviour, the doctor's words, the friction and
timings. The full name, the first name from the transcript, the PHN and the pharmacy name and address
all stay out; a quote containing the first name gets "[the patient]". The frames live only in the
session scratchpad and never enter the repo, which is public.
**Source:** R:35-37 ("No patient identifiers in the repo, ever … pharmacy details. Write 'the
patient'"; "Recording frames stay in the scratchpad only"); R:51-52; S1:18 shows the pattern
("delivered to [the pharmacy]").

### 2. ★ No invention
I write "Renewal quantity for a twice-daily medication: **Needs Daniel** (OQ-09)" and do not derive a
number. The 90-for-three-months in S1 is one observed once-a-day renewal, not a rule, and the quantity
may live in his favourites. I carry on with the parts that don't depend on it.
**Source:** R:27-28 ("Don't invent clinical rules, doses … Mark it Needs Daniel"); S1:15-16;
`product/open-questions.md`:21 (OQ-09); ANS27:22-25 (favourites live in the Rx function); P:85-86.

### 3. ★ Stay in your lane
I don't edit it. I note the label in my report (file, the location, current text, the source of the
right text, owner `ux-designer`, and that the fix goes to every screen with the pattern), and the lead
turns it into a task. Only `ux-designer` and `frontend-engineer` edit prototype HTML, and the owner
stops and reports rather than expanding scope.
**Source:** R:11-12, 20 ("Everyone else writes a report"); P:29-30; R:103 (rule 26); P:54 (UI needs
`qa-engineer`).

### 4. Calls
Not acceptable. Calls go outward only: the doctor phones the patient in the window, and patients never
call the doctor; they can only call the office for admin. The acceptable version shows their place in
line and offers the office line for changes. (On social I use exactly this: my P13 Reel answers "Do I
call the doctor?" with "Nope".)
**Source:** R:58-59 ("Calls go outward only … Patients never call the doctor"); H0:22-23; CAL:400-418.

### 5. Time
No. Time is a call window with a queue position and no wait estimates, so show "You're 4th in line for
the 8–10 AM window", never "about 25 min". The same holds for social copy: no minutes, only the window
and the place in line.
**Source:** R:60 ("Time is a call window, with a queue position and **no wait estimates**"); H0:67
("We show the position, not a wait estimate"); CAL:27.

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; Dolly can reply on an existing task but never creates one for the
doctor. If the fax relates to a task she replies on that task; otherwise she tells him through their
normal channel (e.g. the messenger), and he creates a task if he wants one. Japneet is the physician
assistant in the doctor's portal, not an MOA, and her task rights are still Needs Daniel.
**Source:** R:61-64 ("Tasks travel doctor → MOA only. The MOA replies on a task and never creates one
for the doctor"); H0:74; H0:40; ANS27:13-20.

### 7. Care plan vs tasks
No. The care plan is Daniel's narrative of what we're doing and why; tasks are practical to-dos sent
to the MOA. Merging them loses the synthesis he asked to see at the top of the chart, and rule 13
forbids it, including merging the Care Plan Tracker. It doesn't change without Daniel.
**Source:** R:65 ("The care plan and tasks stay separate … Never merge them"); H0:73-74; ANS26:37-40
("I need a 'Care Plan'").

### 8. Specialist wording
"I have arranged an echo" stays with the specialist: they said they arranged it. "Please start
bisoprolol" is a request to the GP, so it becomes the GP's item. A recommendation keeps its stated
owner.
**Source:** R:67-68 ("'I have arranged the stress test' stays with the specialist; 'please start
bisoprolol' becomes the GP's").

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing and nothing happens yet. "Sign off" is an accountable
action carrying his name: signing the chart finalizes the visit, faxing a script signs off the
prescription, submitting a bill signs off the billing ("my a** is on the line"). So a button that acts
must say what it does in sign-off language, and a "Reviewed" marker must never look like, or trigger,
an approval.
**Source:** ANS26:16-34 ("To Fax is to 'sign off' on the script"; "To submit a bill is to 'sign off' on
your billing"; "It is action oriented"); H0:76-77; R:69; ANS27:13-14 ("Always me").

### 10. Renewals
Either can send; it's the doctor's call each time, and neither is the default. In practice the
delegate is Japneet, the physician assistant, acting under his sign-off. His favourite scripts are
pre-populated, live in the Rx function, and he manages them.
**Source:** ANS26:8-9 ("Either can send … I also have my favorite's pre-populated"); ANS27:14-15,
22-25 ("They live in the Rx function. I manage them"); H0:40, 79. Note: H0:79 still says "the doctor
or the MOA"; T-004 is queued to align that (TB:14).

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1 and agent reports are level 7. I don't pick
quietly: I state the conflict with both citations, act on Daniel's version, and report it to the lead
so `product-manager` logs it in `open-questions.md`. I don't edit the other agent's report.
**Source:** EV:3-4 ("When sources conflict, say so; don't pick one quietly"); EV:8, 14; R:20.

### 12. Process
The lead writes `product/tasks/T-NNN-<slug>.md` from the template and adds it to the board. The
request is ambiguous, so the lead asks Ani what "better" means before it is Ready. It is triaged
(type Design, P1–P3, size), given one owner (`ux-designer`) and gates: `qa-engineer` for UI, and
`clinical-safety` because the inbox carries results. The owner works in scope, the gates write
pass/fix/block reports, Ani approves (Daniel too for clinical content), and the lead commits, deploys
and checks the build stamp; `product-manager` then updates statuses. We're in setup mode, so nothing
starts until Ani says go.
**Source:** P:21-36 (lifecycle); P:54-55 (gates); P:83-84 ("An ambiguous request: the owner stops and
reports to the lead, who asks Ani"); R:7-8, 21-22, 99-100; TB:6-7.

### 13. Design rules
1. Text is ink and colour goes on icons; `#4353E8` only for primary actions and the current state; red
   for critical only. 2. Nothing a physician reads is under 14px, and buttons are 44px with an icon.
3. No uppercase styling; sentence case everywhere. 4. Mage Icons only, from the prototype's icon maps.
5. Show by exception and use progressive disclosure, and a fix on one screen goes to every screen
with that pattern (plus the build stamp on every edit).
**Source:** R:85-103 (rules 21-26 and 24a).

---

## Part 2: Role drill — one week of posts, and how each passes compliance

**1. Expected task file.** `T-NNN-social-week-2026-10-05.md` · type Marketing · owner
`social-media-manager` (brief from `marketing-lead`) · contributor `brand-designer` (visuals) · gates
`marketing-compliance` (P:58) and Daniel's clinical review for health posts (R:106-107); `accessibility`
if a visual shows patient UI. **Acceptance:** 3 posts on IG + FB, each with date, format, hook,
caption, hashtags, visual brief, CTA with UTM, alt text and captions; every claim sourced; a
compliance line per post; ends with top 3, Needs Daniel, Needs Ani.

**2. The week (Tue/Thu/Sat, never batched, per CAL:11-13).**
| Day | Post | Pillar | How it passes compliance |
|---|---|---|---|
| Tue 6 Oct | "Something new came up? Book a same-day visit; the doctor calls you in your window." Carousel. | How it works + access | Leads with walk-in, per the public Direction (H0:25-28). "Same-day" and "MSP-covered" quoted from simplecare.ca, re-checked at task time (H0:19-21). No wait minutes, calls outward (R:58-60). No condition named, so no condition in the UTM (R:40). |
| Thu 8 Oct | CAL P04, "Feeling sick this fall? Where to go": 9-1-1, 8-1-1, book a visit. | Seasonal explainer | General information only, labelled "not medical advice". Emergency wording and colour **Needs Daniel and Ani** (R:73-75); no symptom list unless Daniel supplies it (R:27-28). No vaccine promise, since we don't give them. |
| Sat 10 Oct | CAL P05, World Mental Health Day: "talking to a doctor about how you're feeling is a normal visit", crisis line first. | Access to care | Wording **Needs Daniel**; crisis numbers verified on the official page at task time (EV:16). No drug names, no faces, no stock "patient" (R:108-109). |

Community replies all week follow the playbook: never discuss anyone's health publicly, move them to
the office line or DMs, no medical advice (role file). Any DM that promotes booking goes to
`marketing-compliance` for a CASL check; I don't decide that myself (R:109-110).

**3. Plan.** (a) Take the brief; (b) re-read CAL week 2 against 27 Sep Direction and swap P03's
family-doctor lead for the walk-in post (the "family doctor" bet is superseded, TB:52); (c) quote
facts from simplecare.ca and PEF:19-24 only; (d) brief `brand-designer` on SimpleCare Paper (CAL:39-44);
(e) write alt text and burned-in captions; (f) submit to `marketing-compliance`, then Daniel, then Ani.
Nothing posted, scheduled or logged in to (R:21-22; T:73-74).

**4. Sources.** simplecare.ca and /faq (dated at task time), H0:17-28, R:58-60, R:105-110, T:72-87,
PEF:11-27, CAL:22-51, AUD §6 (channel fixes still outstanding).

**5. Needs Daniel:** the clinical wording of P04 and P05; which emergency signs, if any, to name;
consent to appear on camera. Call-window times stay off social: he says the number of windows is
limited and not yet set (HOME29:7-11).
**Needs Ani:** approve the walk-in swap for P03 (a positioning call, PEF:84-86); the public spelling
"Simple Care" vs "SimpleCare"; who with account access makes the AUD §6 fixes.

**6. Risks and how I stay inside the rules.** Over-promising prescriptions → always "if clinically
appropriate" (AUD §1.3). Naming competitors → never in public copy (R:70-71). Going past the public
ceiling on strategy → only the H0 Direction wording (R:49-50). A stock face read as a testimonial → UI,
type or consenting staff only (R:108-109). A condition in a UTM → post ID only (R:40).

**Top 3:** (1) lead week 2 with a same-day walk-in post; (2) keep P04/P05 blocked until Daniel signs
the wording; (3) fix the channel leaks in AUD §6 before any post goes live.

---

## Unclear rules and findings for the lead
1. **Competitor names in internal reports.** R:70-71 bans them "in the product or intake"; my AUD §5
   names three competitors in a public repo. Does rule 16a (or 9c) cover public-repo reports?
2. **Doctors' surnames.** R:38 says staff surnames are not fine in quotes and notes, yet H0:36 and my
   P07 Reel use Daniel's full name, which is also on simplecare.ca/doctors. I assume public physician
   names are exempt; please confirm.
3. **CAL predates the 27 Sep Direction.** P03 and P11 lean on "family doctor"; they need re-checking
   under T-007 before October.
