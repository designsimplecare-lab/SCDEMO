# Social channel audit: Instagram and Facebook

**Agent:** `social-media-manager` | **Date checked:** 26 Sep 2026 | **Status:** draft for Ani

**Method:** I viewed both profiles logged out, in the built-in browser and with WebFetch. I did not log in,
follow, like, comment or message. I read the post captions, like counts and dates from each post
page's public metadata (`<meta name="description">` and `<time datetime>`). Instagram shows 12 of the
17 posts to logged-out visitors. Facebook shows three feed items, the Intro and the Photos grid; the
rest needs a login. Anything past those limits is marked as not visible.

Brand reference: `simplecare-design-system.html` (tokens `--paper:#EEF0F4`, `--accent:#4353E8`,
`--ink:#17181C`, `--brand-navy:#162660` "logo only", font Manrope, card radius 20px) and the navy app
icon ("Simple / care" wordmark on a navy circle).

---

## 1. Instagram: https://www.instagram.com/simplecareca/

| Item | What is publicly visible |
|---|---|
| Handle / name | `@simplecareca` / "Simple Care CA" |
| Bio | "Making healthcare simple, accessible and patient-first." |
| Link in bio | **None.** The profile header has no external link. WebFetch's summary claimed simplecare.ca was there, but the page DOM shows no link. |
| Followers / following / posts | **7 followers, 1 following, 17 posts** (meta description) |
| Highlights | None |
| Posting frequency | **All the checked posts went up in one batch**, on 27 Jul 2026 between 22:30 and 23:02 UTC (`<time datetime>` on 5 posts; the other 7 are also dated "July 27, 2026" in their metadata). Nothing has been posted since. |
| Last post | 27 Jul 2026, so **61 days without a post** as of 26 Sep 2026 |
| Formats | Only single static images. No Reels, carousels, Stories highlights or video. |
| Engagement | 0 or 1 like on each of the 12 visible posts, and **0 comments on every one**. For example, `/p/DbUDsjgk-5_/` has "0 likes, 0 comments" and `/p/DbUDWy3DyTa/` has "1 likes, 0 comments". |

**Themes seen, in the 12 visible posts:**
- **Condition ads (7):** UTI, sinus infection, pink eye, infections same day, skin (acne, eczema, nail
  fungus, shingles), digestive health, prescription renewal.
- **Brand intro (2):** "Introducing Simple Care", "Need a Doctor? … MSP Covered".
- **How it works (2):** "Need A Doctor? … A Doctor will Call During Your Scheduled Window"; "About Simple
  Care … HOW IT WORKS Book your visit / Join the queue".
- **Founder (1):** "MEET Dr. Daniel Pannozzo", linking to https://simplecare.ca/doctors.

**Problems found:**
1. **A post sends people to the wrong website.** `/p/DbUDsjgk-5_/` ("Most visits are seen the same day")
   ends with **"BOOK NOW AT simplecare.com"**. I downloaded the public image to the scratchpad to check.
   simplecare.com is a different, live healthcare site: it returns HTTP 200 and its page headings are
   "FIND A HEALTHCARE PROVIDER!", "PROVIDERS" and "PATIENTS". This is a live misdirect. The post can't
   be edited, so it needs archiving and a corrected repost.
2. **Nowhere to click.** There is no link in bio, and the captions contain URLs that can't be tapped
   on Instagram. That leaves no route to booking.
3. **Captions promise more than the site does.** Sinus: "prescribe treatment same day". Infections
   post: "prescription sent same day". UTI: "prescribe treatment … same day". The site's own FAQ is
   careful: "If clinically appropriate, your physician can send a prescription"
   (https://simplecare.ca/faq). Other claims for `marketing-compliance` to review: "no waiting room
   exposure risk" (pink eye) and "One physician. Ongoing care." (intro post). The site says "Licensed
   BC Physicians", plural.
4. **The whole account was dumped in 30 minutes.** The algorithm and new visitors both read it as
   inactive.

## 2. Facebook: https://www.facebook.com/SimpleCare.CA

| Item | What is publicly visible |
|---|---|
| Page name | "Simple Care CA", with the browser title "Simple Care CA \| Victoria BC" |
| Category | Page · Medical & health |
| Intro | "Making healthcare simple, accessible, and patient-first." |
| Contact | Address at 780 Tolmie Ave, Victoria; +1 778-949-2778; support@simplecare.ca; simplecare.ca |
| Hours | **"Always open"** |
| Reviews | "Not yet rated (0 reviews)" |
| Followers | **3 followers, 3 following** |
| Posts visible logged out | 23 Jul 2026: "Book Appointment www.simplecare.ca", Call now button, 1 reaction, 1 share. 24 Jul 2026: "Learn more" link post, 2 reactions, 1 share. 3 Aug 2026: profile picture updated. |
| Last post | 3 Aug 2026 (a profile picture change). The last real post was 24 Jul 2026. |
| Formats | Link posts with CTA buttons, plus the Photos grid: 8 images, mostly the same artwork as on Instagram, with a mountain-lake cover reading "MSP Covered / Need a Doctor?". The Reels tab showed the number "71" but no reels to a logged-out visitor, so I couldn't verify what that counts. |
| Engagement | 1–2 reactions per post, 0 visible comments |

**Problems found:**
1. **"Victoria BC" in the page title** undersells the service. The site says it serves "patients
   throughout British Columbia" (simplecare.ca, "Who We Are").
2. **"Always open" is misleading.** Booking is "Online 24/7" (simplecare.ca), but the doctor calls in
   call windows, so people will expect a doctor at 3 a.m. Suggested wording: "Book online 24/7 ·
   Doctor calls during your window".
3. **Missing links.** The page doesn't link to Instagram, and the website footer links to neither
   channel. I found no social links in the footer on simplecare.ca.
4. **Unclear main button.** The page has no clear "Book now" call to action beyond the old posts'
   buttons (the page-level button isn't visible logged out, so this needs checking with admin access).

## 3. Visual consistency with the brand

| Element | Brand (design system) | What is on the channels | Verdict |
|---|---|---|---|
| Avatar | Navy app icon, "Simple / care" | Same icon on IG and FB | **Consistent** |
| Typeface | Manrope | A heavier geometric sans (looks like Poppins) on every post | Off-brand |
| Colour | Paper grey, white cards, blue accent `#4353E8`; navy is "logo only" | Big navy backgrounds, lime-yellow quote marks and buttons | Off-brand: navy overused, lime isn't in the system |
| Logo | One wordmark | A second script "Simple Care" logo with a hummingbird on the "About" post | Conflicting logo |
| Imagery | UI and typography first, per the prototypes | Stock lifestyle photos (smiling couples, a woman on a phone, a mountain lake) | Generic; stock "patients" can read as testimonials |
| Density | Short, 16px body | "About" and "How it works" posts have long, small text | Hard to read at phone size |
| Name | The site uses "Simple Care"; product docs use "SimpleCare" | "Simple Care CA", "SimpleCare", "SINPLECARE" (typo in the auto alt text on `/p/DbUGTzyj1Zw/`, which needs a visual check) | Needs one spelling (Ani, `marketing-lead`) |

## 4. What is missing, on both channels

- **"How it works" content** that makes the differentiator clear: pick a call window, join the queue,
  see your place in line, the doctor calls you. The site has all five steps
  (simplecare.ca, "How your visit works"); social has one dense graphic.
- **Reels or short video.** None on Instagram, and nothing visible on Facebook.
- **A link to booking.** There is no IG bio link and no UTM-tagged links, so traffic from social can't
  be measured.
- **Highlights** such as How it works, FAQ, What we treat and Meet the doctor.
- **Human faces from the team.** One founder post, no video.
- **Community presence.** No replies, no local (Victoria or BC) tags, no partner collaborations.
- **Accessibility.** Posts rely on Instagram's automatic alt text ("May be an image of hospital…"),
  and there is no custom alt text.
- **Consistency across channels.** FB and IG are separate and unlinked, with different follow counts
  and no shared calendar.

## 5. Competitors' public social presence (checked 26 Sep 2026, logged out)

| | Instagram | Facebook | What they do that we don't |
|---|---|---|---|
| **Avee Health** (BC, MSP) | [@aveehealth](https://www.instagram.com/aveehealth/): 1,340 followers, 69 posts. Bio: "Need a Doctor in British Columbia? Book a free same-day appointment now!" Link `booking.avee.health/?source=instagram`. 10 highlights (Tutorial, FAQ, Who we are?, Your Stories, Career Fair…). **Reels-first**, posting every 3–6 days: 28 Jul, 2, 6, 12, 15, 18 and 21 Aug, 23 Sep. A pharmacy partner shared a post on 19 Sep. | [aveehealth](https://www.facebook.com/aveehealth/): 533 followers, links to X, LinkedIn and lnk.bio, "Online booking" CTA. Latest 15 Sep, a family testimonial-style video with 24 reactions and 8 comments. | Short video, a tracked booking link, FAQ and tutorial highlights, pharmacy co-marketing. Their testimonial video is the kind `marketing-compliance` must judge before we copy the idea. |
| **Maple** (national, private pay) | [@getmaple](https://www.instagram.com/getmaple/): 9,785 followers, 686 posts, campsite.bio link, 3 pinned posts, latest 12 Aug 2026. Mix of text graphics and Reels, plus a creator collaboration on 7 Jul. | [getmaple](https://www.facebook.com/getmaple/): 23K followers. Latest 12 Aug ("Staying on top of your health? Kinda chic, honestly.") with 1 reaction. | Pinned "start here" posts, creator content. Their size doesn't turn into Facebook engagement. |
| **Tia Health** (WELL, BC/AB/ON) | [@tiahealth](https://www.instagram.com/tiahealth/): 1,320 followers, 199 posts, linktr.ee, highlights (Health Tips, FAQ, Reviews, App). **Latest visible post 29 Jan 2025**; the one before is Apr 2024. | [TiaHealth](https://www.facebook.com/TiaHealth/): 9.4K followers, "40% recommend (35 reviews)". Latest 29 Jan 2025, a weight-loss post. A visible unanswered comment complains the doctor never joined a booked video call. | A cautionary example: a dormant channel with an unanswered complaint about a no-show clinician is a public liability. |

**Takeaways:**
- The BC competitor to beat on social is **Avee**, not Maple. Avee is small (1.3K) but active, uses
  video, and tracks its links. SimpleCare can match its cadence in a month.
- **Fear of being forgotten is a public, category-wide worry.** It shows in Tia's comment, and
  `simplecare-competitor-research.md` notes Avee reviews and 121Clinicians' FAQ say the same. "The
  doctor calls you when it's your turn, and you can see your place in line" is our strongest social
  message, and nobody else is saying it.
- **The low bar is an opening.** Tia is dormant and Maple's Facebook barely engages. Steady, useful,
  on-brand posting is enough to stand out in BC.

## 6. Fixes to make before the October calendar starts

Each needs the person with account access, after Ani approves and `marketing-compliance` reviews.

1. **Instagram:** archive `/p/DbUDsjgk-5_/` (the simplecare.com misdirect) and repost it corrected.
2. **Instagram bio:**
   - Draft: "BC's virtual family practice · MSP-covered, private visits available · Book online, the
     doctor calls you when it's your turn".
   - Link: `https://simplecare.ca/?utm_source=instagram&utm_medium=social&utm_campaign=profile`.
   - No health or concern data in the UTMs; `performance-marketing` owns the tracking plan.
3. **Instagram highlights:** How it works · What we treat · FAQ · Meet the doctor.
4. **Facebook:**
   - Change the page title from "Victoria BC" to "Virtual family practice · BC".
   - Change "Always open" to "Book online 24/7 · Doctor calls in your window". The exact wording
     depends on what Facebook's hours field allows.
   - Set the main button to "Book now" pointing to simplecare.ca with a UTM.
   - Link to Instagram.
5. **Website:** add IG and FB links to the simplecare.ca footer. Handed to `content-seo`, which owns
   the site.
6. **Existing claims:** `marketing-compliance` reviews the "prescription sent same day" captions and
   decides whether to archive them or add "if clinically appropriate".
7. **Visuals:** `brand-designer` makes one social template set on SimpleCare Paper: Manrope, white
   cards, the `#4353E8` accent, navy for the logo only, and no second logo.

## 7. October calendar

Drafted in `marketing/social/calendar-2026-10.md`: 14 posts, all on both platforms, 4 of them Reels,
built around the "how it works" and "it's your turn" story. Every post is marked "Needs
marketing-compliance review".

---

## Top 3 recommendations, ranked by impact

1. **Stop the leaks this week.** Archive and fix the post that says "simplecare.com" (a third-party
   healthcare site). Add a tracked booking link to the IG bio and a "Book now" button on Facebook.
   Correct "Victoria BC" and "Always open". These are small edits, and today every visitor is either
   misdirected or has nowhere to go.
2. **Make "it's your turn" the social story, in video.** A short Reel of the real flow: pick a window,
   see your place in line, the doctor calls. It answers the category's most visible complaint (being
   forgotten), which no BC competitor addresses on social. Aim for 2–3 posts a week, at least one a
   Reel, instead of batch dumps.
3. **Rebuild the visuals on the design system** and re-check old claims. One template set (Manrope,
   Paper, blue accent, navy logo only), UI screens and team faces instead of stock "patients", and
   "if clinically appropriate" wherever a prescription is mentioned.

## What needs Daniel

- Clinical review of each health-education post in the calendar: the respiratory season, mental
  health, travel health and sick-note posts.
- Consent and 30 minutes to film the "Meet Dr. Pannozzo" and "It's your turn" Reels.
- May we publish the call-window times (8–10, 10–2, 2–5, 5–7) on social? They aren't on
  simplecare.ca today.
- Are call windows running on Thanksgiving Monday (12 Oct)?
- Can staff (for example the MOA team) appear on social, with written consent?

## What needs Ani

- Approve the channel fixes in section 6, and say who has account access to make them.
- One brand name for public use: "Simple Care" (site) or "SimpleCare" (product docs).
- Approve using prototype screens in the "your place in line" Reel, only if the live patient
  experience matches them. Demo data only.
- Confirm what number the doctor calls from (caller ID), for the "Get ready for your call" post.
