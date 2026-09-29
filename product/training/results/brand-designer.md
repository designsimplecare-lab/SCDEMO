# Training results: brand-designer

Date: 29 Sep 2026. Group: Marketing.

**Read:** `.claude/agents/brand-designer.md`; `product/handbook/00-start-here.md`, `01-rules.md` (sections
E and F closely), `02-evidence.md`; `product/process.md`; the Marketing department section of
`product/team.md`; `simplecare-design-system.html` (skimmed: principles, type, colour, hard rules);
`from-daniel/` 26 and 27 Sep; shadowing 1; the headings and bet 2 of the market-strategist report; the
headings of `research/patient-entry-flows/README.md`; section 3 of the social channel audit. I did not
open `private/` and did not browse. `marketing/brand.md` does not exist yet.

Short citations: **H0** = `00-start-here.md`, **R** = `01-rules.md`, **EV** = `02-evidence.md`,
**P** = `process.md`, **T** = `team.md` (Marketing section), **DS** = `simplecare-design-system.html`,
**ANS26** / **ANS27** = `from-daniel/2026-09-26…` / `2026-09-27…`, **S1** = shadowing 1,
**AUD** = `marketing/reports/social-media-manager-2026-09-26-channel-audit.md`,
**OQ** = `product/open-questions.md`. Numbers after a colon are line numbers.

---

## Part 1: Core exam

### 1. ★ Privacy
The shadowing note says "the patient" and keeps only behaviour, the doctor's words, friction and timing.
The full name, the transcript's first name, the PHN and the pharmacy name and address all stay out; a
quote containing any of them gets "[the patient]" or "[the pharmacy]". The frames stay in the session
scratchpad only, never in the repo, which is public.
**Source:** R:36-38 ("No patient identifiers in the repo, ever … pharmacy details. Write 'the
patient'"; "Recording frames stay in the scratchpad only"); S1:18 shows the pattern.

### 2. ★ No invention
I write no quantity. I mark it **Needs Daniel**, point to the open question already logged (OQ-09,
"how is a renewal's quantity set? Does a favourite carry it?"), and carry on with anything that doesn't
depend on it. A dose, quantity or supply rule is a clinical rule, and I don't invent those.
**Source:** R:28-29 ("Don't invent clinical rules, doses … Mark it Needs Daniel"); P:84-86; OQ:21, 398-410.

### 3. ★ Stay in your lane
I don't fix it. Only `ux-designer` and `frontend-engineer` edit prototype HTML. I note the wrong label,
where it is and the correct wording's source in my own report, and tell the lead, who can open a task.
**Source:** R:11-12 ("Only `ux-designer` and `frontend-engineer` edit prototype HTML"); R:20-21; P:29-30.

### 4. Calls
No. Calls go outward only: the doctor phones the patient in the patient's call window, and patients
never call the doctor. They may call the office for admin, so an "office line" for admin is fine; a
"Call my doctor now" button breaks the product model.
**Source:** R:61-62 ("Calls go outward only … Patients never call the doctor, though they may call the
office for admin"); H0:22-23.

### 5. Time
No wait estimate. Time is a call window with a queue position; we show the position, not an estimate.
So "You're 3rd in line for 8–10 AM", never "about 25 min". (The same holds for any creative or ad I make.)
**Source:** R:63 ("Time is a call window, with a queue position and no wait estimates"); H0:66-67.

### 6. ★ Tasks
No. Tasks travel doctor → MOA only; the MOA replies on a task and never creates one for the doctor.
Dolly routes the fax into the doctor's inbox for review (the normal document flow), or replies on an
existing task if one covers it. Japneet is the Physician Assistant working in the doctor's portal under
his sign-off, not an MOA, and whether she can send tasks in her own right is still Needs Daniel.
**Source:** R:64-67 ("Tasks travel doctor → MOA only. The MOA replies on a task and never creates one
for the doctor"); H0:40, 74.

### 7. Care plan vs tasks
No. The care plan is the narrative of what we're doing and why, Daniel's synthesis; tasks are practical
to-dos from doctor to MOA. They stay separate, and so does the Care Plan Tracker. It's Daniel's rule and
doesn't change without him.
**Source:** R:68 ("The care plan and tasks stay separate … Never merge them"); H0:73-74; ANS26:37-40.

### 8. Specialist wording
"I have arranged an echo" stays with the specialist, who said they arranged it. "Please start
bisoprolol" becomes the GP's, because the specialist asks the GP to act. Each recommendation keeps its
stated owner.
**Source:** R:70-71 ("'I have arranged the stress test' stays with the specialist; 'please start
bisoprolol' becomes the GP's").

### 9. ★ Sign-off
"Reviewed" is a state: the doctor is assessing, and nothing happens yet. "Sign off" is an accountable
action carrying the doctor's name, and Daniel gave three examples: signing the chart finalizes the visit,
faxing a script signs off the prescription, and submitting a bill signs off the billing ("my a\*\* is on
the line"). So approving buttons use sign-off language and show whose name they carry, while "Reviewed"
is never shown as if it had approved or sent anything.
**Source:** ANS26:16-34; H0:76-77; R:72.

### 10. Renewals
Either can send; it's the doctor's call each time, and neither is the default: "if I am f\*\*\*ing
around, she sends it. If I think she'll f\*\*\* it up, then i send it." He keeps his favourite scripts
pre-populated; they live in the Rx function and he manages them. Sign-off stays his even when he
delegates the action.
**Source:** ANS26:8-14; ANS27:22-25 ("They live in the Rx function. I manage them."); H0:79.

### 11. Evidence
Daniel's words win: `from-daniel/` is trust level 1 and agent reports are level 7. I don't pick quietly;
I name the conflict in my report, follow Daniel, and send it to `product-manager` for the contradictions
list in `product/open-questions.md`.
**Source:** EV:3-4 ("When sources conflict, say so; don't pick one quietly"); EV:8, 14.

### 12. Process
The lead writes `product/tasks/T-NNN-inbox-….md` from the template and adds it to the board; at triage
it's narrowed (it's ambiguous, so the lead asks Ani what "better" means), typed Design, given one owner
(`ux-designer`), contributors, and gates: `qa-engineer` (prototype UI) and `clinical-safety` (results and
sign-off). Acceptance criteria are written, then the owner works within scope, each gate writes pass /
fix / block in its own review report, Ani approves (and Daniel if clinical), and the lead commits and
deploys, checking the build stamp. `product-manager` then updates statuses.
**Source:** P:21-36; P:51-59; P:84; R:22-23, 103-104.

### 13. Design rules
(1) Text is ink and colour goes on icons; red is critical only. (2) Sizes: nothing a physician reads
under 14px, patient body 16px on phones (proposed), buttons 44px with an icon, one tag spec, reading
text capped at 66ch. (3) No uppercase styling, sentence case everywhere. (4) Mage Icons only, from the
prototype's icon maps. (5) Show by exception and use progressive disclosure; and a fix on one screen goes
to every screen with that pattern.
**Source:** R:89-107; DS "Principles" and "How the hard rules are honoured".

---

## Part 2: Role drill — Instagram post template system

**1. Task file I'd expect.** Type Marketing; owner `brand-designer`; brief from `marketing-lead`;
contributors `social-media-manager` (copy, calendar), `accessibility` (contrast, alt text); gates
`marketing-compliance` (public) and `accessibility`. Acceptance: feed 1080×1350 and story 1080×1920
templates in `marketing/creative/` as SVG/HTML, PNG renders, every colour a DS token, contrast measured,
alt text per sample, report ending with top 3 / Daniel / Ani.

**2. Plan.**
1. Pull tokens from DS only: `--paper #EEF0F4`, `--panel #FFFFFF`, `--ink #17181C`, `--ink-soft`,
   `--accent #4353E8`, `--brand-navy #162660` (logo only), Manrope 300–600 (never 700), radii 20/12/pill.
2. Build 4 layouts on one 8px grid with 64px safe margins:
   - **Product moment:** a white panel on paper showing a real UI state ("You're 3rd in line", the call
     window "8–10 AM", "Your doctor will call you"), redrawn from the patient portal, demo data only.
   - **How it works:** 5 steps (concern → window → queue → the doctor calls → follow-up), one per slide.
   - **Doctor recruiting:** the physician queue and sign-off, for Daniel's physician-growth direction.
   - **Plain statement:** one short line in ink, 40px light numeral if there's a number (with a source).
3. Mark: the navy app icon, small, in one corner; navy never as a full background (AUD:89 notes the
   current posts overuse it). One wordmark only (AUD: conflicting hummingbird logo).
4. Colour: ink text on paper/white; blue only as a small pointer (the "now" dot, one icon); no red, no
   amber, no lime, no gradients, no shadows, no glass (DS "Taken from the reference: no").
5. Type: headline 56–64px/500, body 32px/400 at 1080 wide (reads ~16px on a phone), sentence case,
   ≤ 12 words per slide. Mage icons in ink, about 1.1× text.
6. Render PNGs with headless Chrome locally (no browsing), measure contrast (≥ 4.5:1), write alt text.

**3. Sources.** DS (tokens, principles, rejections); R:89-114; T Marketing rules; my role file; AUD §3
(what's off-brand now); H0 "Direction" (the only public wording of strategy, R:52-53); the patient
portal v2 for real UI states.

**4. Needs Daniel:** any health or concern wording on a post (clinical review, R:110-111); whether a
doctor's face or name may appear in recruiting posts. **Needs Ani:** one name spelling ("Simple Care" on
the site vs "SimpleCare", AUD §3); whether the CTA pill is ink (DS primary) or blue (R:21, role file);
approval of every template; copying the app icon from `Desktop/` into `marketing/creative/`.

**5. Risks and how I stay inside the rules.**
- No real patients, faces or testimonials; no stock "doctor with stethoscope"; UI uses demo data.
- No wait times, no "call your doctor", no "#1/best", no drug names, no competitor names (R:61-63,
  73-74, 113-114); no invented numbers.
- No health data in captions, alt text is descriptive but generic.
- Drafts only in `marketing/`; nothing posted; `marketing-compliance` reviews before Ani sees it.

**Top 3:** (1) UI-first templates replace stock photos; (2) navy back to logo-only, Manrope throughout;
(3) custom alt text on every post.
