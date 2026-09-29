# Training results: content-seo

Date: 29 Sep 2026. Group: Marketing.

**Read, in order:** `product/training/README.md`; `.claude/agents/content-seo.md`;
`product/handbook/00-start-here.md`, `01-rules.md` (section F and rule 17a in particular),
`02-evidence.md`; `product/process.md`; the Marketing department section of `product/team.md`
(lines 47–88); a skim of `marketing/reports/content-seo-2026-09-26-website-audit.md` and
`marketing/content/concern-page-template.md`; `from-daniel/` (the 26 and 27 Sep answers);
`shadowing/2026-09-25-rx-renewal-by-fax.md`; the headings of the market-strategist report and of
`research/patient-entry-flows/README.md`. Nothing in `private/` was opened. Nothing was browsed.

---

## Core exam

**1. ★ Privacy.** The note says "the patient" and describes what happened; the full name, PHN,
pharmacy address and the first name from the transcript all stay out, because the rule covers names,
PHNs and pharmacy details alike. The frames live in the session scratchpad only, never in the repo.
If any of these details had already reached a public file or git history, I would stop and report it
to the lead. *Source:* `product/handbook/01-rules.md` lines 7–8 and 41–43.

**2. ★ No invention.** I would not write a quantity. I write "Renewal quantity for a twice-daily
medication: **Needs Daniel**" and carry on with the parts that don't depend on it. The one
observation I have (90 tablets for 3 months in shadowing 1) is a single visit, not a rule.
*Source:* `01-rules.md` line 27 ("Don't invent… doses"); `process.md` lines 84–86;
`shadowing/2026-09-25-rx-renewal-by-fax.md` line 16.

**3. ★ Stay in your lane.** I don't fix it. Only `ux-designer` and `frontend-engineer` edit
prototype HTML, so I record the wrong label in my review report (where it is, what it says, what it
should say, with a source) and the lead turns it into a task. If it changed the task's scope, I'd
stop and report rather than expand it. *Source:* `01-rules.md` lines 12 and 20; `process.md`
lines 29–30.

**4. Calls.** No. Calls go outward only: the doctor phones the patient, and patients never call the
doctor. They may call the office for admin, so a "Call the office" link for admin questions is fine,
but "Call my doctor now" is not. *Source:* `01-rules.md` lines 58–59.

**5. Time.** Not allowed. Time is a call window with a queue position and no wait estimates; we show
the patient's place in line, not a duration. Daniel called wait duration a pace metric he does not
want. *Source:* `01-rules.md` line 60; `00-start-here.md` line 67; commit `8cd0893`.

**6. ★ Tasks.** No. Tasks travel doctor → MOA only, and the MOA never creates one for the doctor.
Instead she matches the fax to the patient and files it from the Fax inbox, so it reaches the
doctor's inbox for his review, and she uses the MOA chat (or replies on an existing task) to draw his
attention. Japneet is not the answer either:
she is the physician assistant working under the doctor's delegated authority, and whether she can
send tasks in her own right is still Needs Daniel. *Source:* `01-rules.md` lines 61–64;
`00-start-here.md` line 74; `simplecare-moa-portal.html` lines 298–302 (Fax inbox).

**7. Care plan vs tasks.** No. The care plan is Daniel's narrative of what we're doing and why, and
a task is a one-way practical to-do for the MOA. They stay separate, and so does the Care Plan
Tracker. Clutter is solved with progressive disclosure, not by merging. *Source:* `01-rules.md`
line 65 and line 101; `00-start-here.md` lines 73–74; Daniel, 26 Sep: "I need a 'Care Plan'"
(`from-daniel/2026-09-26-answers-to-shadowing-questions.md` line 37).

**8. Specialist wording.** "I have arranged an echo" stays with the specialist, who said they would
do it. "Please start bisoprolol" is a request to the GP, so it becomes the GP's item. Each item
keeps its stated owner. *Source:* `01-rules.md` line 66.

**9. ★ Sign-off.** "Reviewed" is a state: the doctor is assessing and nothing happens yet. "Sign off"
is an accountable action carrying the doctor's name. Daniel's three examples: signing the chart
finalizes the visit; "To Fax is to 'sign off' on the script"; "To submit a bill is to 'sign off' on
your billing". Buttons that approve must therefore say what they commit ("Sign off and fax"), never a
neutral "Done" or "Reviewed", because "my a\*\* is on the line". *Source:*
`from-daniel/2026-09-26-answers-to-shadowing-questions.md` lines 17–33; `00-start-here.md` lines
76–77.

**10. Renewals.** Either can send; it is the doctor's call each time, and neither is the default
("Either can send… If I think she'll f\*\*\* it up, then i send it"). He keeps favourite scripts
pre-populated, and they "live in the Rx function. I manage them." Whoever sends it, the sign-off is
always his ("Always me."). *Source:* `from-daniel/2026-09-26-answers-to-shadowing-questions.md`
lines 7–14; `from-daniel/2026-09-27-answers-round-2.md` lines 14 and 22–25.

**11. Evidence.** Daniel's words win: `from-daniel/` is trust level 1 and agent reports are level 7.
I don't pick quietly: I name the conflict in my output, cite both sources, and tell the lead so
`product-manager` can log it in `product/open-questions.md`. *Source:* `02-evidence.md` lines 3–4,
8 and 14.

**12. Process.** The lead writes `product/tasks/T-NNN-<slug>.md` from the template and adds it to
the board, then triages it: type (Design), priority and size, one owner (`ux-designer`), and the
gates. Because "better" is ambiguous, the lead asks Ani what she means before it is Ready. The owner
works within scope; `qa-engineer` gates any UI change and `clinical-safety` gates the inbox (results)
before it moves on. Ani approves, and the lead commits and deploys; `product-manager` then updates
the statuses. *Source:* `process.md` lines 21–37, 54–55 and 83–84.

**13. Design rules.** (1) Text is ink and colour goes on icons; brand blue #4353E8 for primary
actions, red only for critical. (2) Nothing a physician reads is under 14px, and buttons are 44px
with an icon. (3) No uppercase styling, sentence case everywhere. (4) Mage Icons only, from the
prototype's icon maps. (5) Show by exception and use progressive disclosure, and a fix on one screen
goes to every screen with that pattern. *Source:* `01-rules.md` lines 86–103.

---

## Role drill: concern landing page for "prescription renewal"

1. **Task I'd expect.** Type: Marketing (content). Owner: `content-seo`, via a `marketing-lead` brief.
   Contributors: `content-designer` (copy), `brand-designer` (image). Gates: `marketing-compliance`,
   `accessibility` (patients see it), `clinical-safety` (it touches prescribing and emergency wording),
   `privacy-security` if the page carries a pixel. Acceptance: a draft in
   `marketing/content/prescription-renewal.md` that follows the template, cites a source for every
   claim, marks every clinical line "Needs clinical review", and ends with top 3 / Daniel / Ani.
2. **Plan.** Start from the live page (`/services/prescription-renewal`, audit row 6 of the keyword
   map, P1) and the template; rewrite, don't reinvent.
   - **Head:** title "Prescription Renewal Online in BC | MSP-Covered | Simple Care"; H1
     "Prescription renewal online in BC"; self-canonical; a meta line on "a BC doctor phones you in
     your call window". Keywords: renewal / refill online BC. Volumes unverified.
   - **Hero:** what the doctor can do ("if it's right for you, the doctor can send a renewal to your
     pharmacy"), the coverage line, and a real `<a>` CTA "Choose a call window". The image shows a
     phone call, not video.
   - **Safety block, directly under the hero:** the general 911 wording from the live booking modal
     as a placeholder, plus three renewal red-flag slots left blank, and 8-1-1. Marked
     `[NEEDS CLINICAL REVIEW + ANI: wording and visual treatment]`. I don't choose its colour or style.
   - **What we can and can't do:** slots only. For example, which medications can't be renewed
     online (the booking modal already excludes controlled medications) and when a visit or bloodwork
     is needed first. All of it is Daniel's.
   - **How your visit works:** the homepage's five steps word for word (call window, queue, place in
     line, the doctor phones you). Then "after the call, the prescription is faxed to your pharmacy".
   - **FAQ:** "Do I need my old bottle?", "Which pharmacy?", "Is it covered?". Answers come from
     Daniel or the site, never from me.
   - **Trust:** a "Medically reviewed by … on {date}" line; `MedicalWebPage` and `Physician`
     schema; internal links to `/how-it-works` and `/family-practice`.
3. **Sources.** The template (§2.1–2.4); audit §3 (lines 279–290, the booking-modal wording) and
   keyword map row 6; `00-start-here.md` lines 22–23; `01-rules.md` §F and 17a; `team.md` lines 73–84.
4. **Needs Daniel:** the red flags; what can and can't be renewed by phone; any quantities, how
   often, or bloodwork first (never from shadowing's "90"); whether we mention BC pharmacists'
   renewals (unverified at source); whether "same day" or "under 30 minutes" survive; and his
   reviewer line. **Needs Ani:** the emergency block's wording and visual treatment, with Daniel
   (rule 17a); the title positioning; Search Console / Keyword Planner access; and the final approval.
5. **Risks and how I stay inside the rules.**
   - **Drug promotion:** name no medication or brand, not even from shadowing (rule 28).
   - **Promises:** no guaranteed prescription, no time promise, no "best" or "#1", no testimonials.
   - **Model drift:** no "video visit", no "call your doctor", no wait estimate (rules 10 and 11).
   - **Privacy:** no concern data in pixels or targeting on a renewal URL (rule 8); flag it to
     `privacy-security`.
   - **Competitors and lane:** named in the audit, never on the page. A draft only: I don't edit the
     site or the template, or publish; `frontend-engineer` builds it after Ani approves.
   - **Top 3 recommendations, by impact:** (1) add the safety block, pending Daniel and Ani;
     (2) make the page reachable by a crawlable link and replace the video-call and "30 minutes"
     copy; (3) add the reviewed-by line and the schema.

**Unclear rule.** Rule 17a routes emergency wording and its visual treatment to Daniel **and Ani**,
but my role file and the template (§2.2: "Needs clinical review", "the site's alert style") route it
to Daniel alone and pick a style. The lead should confirm 17a governs and update the template.
