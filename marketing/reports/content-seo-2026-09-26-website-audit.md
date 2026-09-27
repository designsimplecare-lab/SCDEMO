# simplecare.ca website audit — content-seo, 26 Sep 2026

**Status:** Draft for Ani's approval. Nothing on the site was changed, no form was submitted and nothing
was booked. `marketing-compliance` should review the recommendations that touch public copy.

**Method.**
- `curl` fetched the raw HTML, headers and timings of every sitemap URL, plus `robots.txt`, `llms.txt`,
  the public service API and a few probe URLs. The fetches ran on 26 Sep 2026, about 18:25 PT; the
  server `date` header reads 27 Sep 01:25 GMT.
- A headless browser tab rendered the JavaScript pages, so the audit covers what a visitor sees. The
  tab loaded pages and read the DOM only. The one click was on the "Sick Note" tile, to see where it
  leads, and I stopped at the safety modal.
- WebSearch checked the results pages for six intents. It is a US-based index, not Google Search
  Console, so it hints at the ranking picture but does not measure it.
- Raw captures are in the session scratchpad (`site/`, `comp/`). They are not in the repo.

---

## Top 3 problems (ranked by impact)

1. **Almost none of the concern tiles has a page search can find.** The homepage lists 15 categories
   and 103 active concerns (API count, see §1). Every tile is a click handler on an `<li>`, not a
   link, and it opens `/patient/appointment?serviceId=…`, which sends `noindex, nofollow`.
   - Only **9 concerns** have a landing page.
   - No crawlable link reaches those 9 pages from the homepage or the nav. Only the sitemap and the
     pages' own "related services" strip link to them.
   - Every other `/services/<slug>` URL (for example `/services/sick-note`) returns **200 with a
     blank page**. `/services/` in the sitemap does the same.
2. **Crawl and duplicate signals are broken in several places.**
   - `/about`, `/services/` and `/feedback` carry the homepage's title and a **canonical pointing to
     the homepage**.
   - Unknown URLs return a **soft 404**: status 200 with the homepage's head.
   - The sitemap lists noindex pages (`/cas`, `/register`) and `/api-docs`.
   - `https://www.simplecare.ca/` serves 200 instead of redirecting to the bare domain.
   - `og-image.jpg` and `twitter-image.jpg` return HTML, so **every Facebook and Instagram link share
     has no image**.
3. **The site's words don't match the product, and no marketing page has emergency wording.**
   - The title says "Online Walk-In Clinic" but the H1 says "Virtual Family Practice".
   - The concern pages promise "From sign-up to prescription — usually under 30 minutes". Their hero
     picture shows a video call. The homepage, by contrast, says care comes by phone in a call window
     with a queue.
   - The homepage claims "120+ Clinical Concerns"; the catalogue has 103.
   - The blank service pages show "Consult Top Doctors Online" and "Connect Within 60secs".
   - No marketing page says "call 911". That wording appears only in the booking modal.
   - The weight-loss page names Ozempic® and Wegovy®, which our no-prescription-brand rule forbids.

## Top 3 opportunities

1. **Build the concern-page system from the catalogue.** That means ~100 real pages, one per concern,
   with crawlable links from the homepage tiles. The data (titles, synonyms, MSP flag) is already in
   `/api/v1/services/with-subcategories`. Walk In has 60 condition pages and Avee has 31 medication
   pages; SimpleCare has 9. Template: `marketing/content/concern-page-template.md`.
2. **Own the "no family doctor BC" and "virtual family doctor BC" intents.** No BC virtual walk-in
   sells continuity; the results for "no family doctor BC" are health authorities and news. This is
   the market-strategist's Bet 2
   (`product/reports/market-strategist-2026-09-26-number-one.md`, lines 172–176).
3. **Make "how your visit works" (call window, queue, your place in line) a page and a snippet.**
   Every competitor books slots. 121Clinicians' FAQ admits to late calls
   (`simplecare-competitor-research.md`, line 11). A crawlable `/how-it-works` page, a queue FAQ and
   a "next call window" signal on the homepage turn the product difference into search and conversion
   copy.

---

## 1. Site inventory

**Sources:** `https://simplecare.ca/sitemap.xml` (20 live URLs; 16 regional URLs are commented out),
`robots.txt`, `llms.txt`, and the links in the rendered pages.

| URL | Status | In sitemap | Indexable | What it is |
|---|---|---|---|---|
| `/` | 200 | yes | yes | Homepage: hero, search, 15 category cards, "How your visit works", "Who we are" |
| `/about` | 200 | yes | **no, canonical → `/`** | Story, mission, and 9 service cards whose "Learn more" are buttons |
| `/doctors` | 200 | yes | yes | 2 physicians; bios open in a modal with no URL of their own |
| `/faq` | 200 | yes | yes | 4 questions |
| `/services` → 301 → `/services/` | 200 | yes | **no, canonical → `/`** | **Renders blank** except the footer |
| `/services/uti-treatment` | 200 | yes | yes | Concern page (prerendered) |
| `/services/prescription-renewal` | 200 | yes | yes | Concern page |
| `/services/birth-control` | 200 | yes | yes | Concern page |
| `/services/cold-sore` | 200 | yes | yes | Concern page |
| `/services/acne-treatment` | 200 | yes | yes | Concern page |
| `/services/weight-loss` | 200 | yes | yes | Concern page (names Ozempic®/Wegovy® in its FAQ) |
| `/services/hair-loss` | 200 | yes | yes | Concern page |
| `/services/erectile-dysfunction` | 200 | yes | yes | Concern page |
| `/services/allergy-relief` | 200 | yes | yes | Concern page |
| `/services/sick-note` (and any other slug) | 200 | no | yes, but blank | **Soft 404**: its own title, empty body |
| `/terms-of-service`, `/privacy`, `/patient-consent` | 200 | yes | yes | Legal |
| `/cas`, `/register` | 200 | **yes** | noindex (header) | Login and sign-up; they shouldn't be in the sitemap |
| `/api-docs`, `/openapi.json`, `/llms.txt`, `/mcp` | 200 | `/api-docs` yes | yes | Agent and AI channel |
| `/feedback` ("Contact") | 200 | no | **canonical → `/`** | Contact form (not submitted) |
| `/patient/appointment?serviceId=…` | 200 | no | noindex, nofollow | Booking flow; every tile lands here |
| 16 regional URLs (`/victoria`, `/vancouver`, `/kelowna` …) | **302** → `/` | commented out | n/a | Paused |
| `/does-not-exist-xyz`, `/sitemap_index.xml` | **200** | n/a | homepage head | Soft 404 |

**Concerns: are they pages or tiles?**
- The API lists 15 categories and **103 active concerns** (`/api/v1/services/with-subcategories`,
  26 Sep).
- The homepage shows 4–5 per card and "+N More" for the rest.
- **9 of the 103 have a real page (9%).** The other 94 exist only as tiles and booking links.

| Category | Active concerns | Concern pages |
|---|---|---|
| Family Practice | 3 | 0 |
| Everyday Health | 10 | 3 (prescription renewal, birth control, cold sore; the site names bladder infection "UTI") |
| Ongoing Health | 16 | 1 (weight loss) |
| Infections | 12 | 1 (UTI) |
| Medical Forms | 11 | 0 |
| Ear, Nose & Throat | 4 | 1 (allergy relief) |
| Skin Concerns | 13 | 1 (acne) |
| Travel Health | 4 | 0 |
| Bone, Joint & Muscle | 5 | 0 |
| Sleeping Health | 3 | 0 |
| Digestive Health | 4 | 0 |
| Mental Health | 3 | 0 |
| Sexual Health | 3 | 0 |
| Women's Health | 8 | 0 |
| Men's Health | 4 | 2 (hair loss, ED) |

**Stale category names.**
- `llms.txt` and the `/services/` `<noscript>` fallback still use the old names ("Common Concerns",
  "Preventative Health", "Medical Documentation").
- The live API and homepage say "Everyday Health", "Ongoing Health" and "Medical Forms".
- AI assistants reading `llms.txt` will therefore describe the catalogue in names the site no longer
  uses.

## 2. Technical SEO

### 2.1 Head tags per key page (raw HTML, the version crawlers see first)

| Page | `<title>` | Meta description | Canonical | H1 in raw HTML | H1 after render |
|---|---|---|---|---|---|
| `/` | "BC Online Walk-In Clinic \| MSP-Covered Virtual Care \| Simple Care" (65 chars) | Good, 158 chars | `https://simplecare.ca` | **none** (empty `#root`) | "British Columbia's Virtual Family Practice." |
| `/about` | **Same as home** | **Same as home** | **→ home** | none | **none** (H2s only) |
| `/doctors` | "Simple Care Doctors \| BC-Licensed Virtual Physicians" | OK, thin | self | inside `<noscript>`, and it's agent instructions | "Our Doctors" |
| `/faq` | "Simple Care FAQ \| Virtual Walk-In Clinic Questions", which changes after render to "…MSP Coverage and Virtual Care in BC" | OK | self | none | "FAQ" |
| `/services/` | **Same as home** | **Same as home** | **→ home** | inside `<noscript>` | **none: blank page** |
| `/services/uti-treatment` (the pattern for all 9) | "Book UTI Treatment Online in BC \| MSP Virtual Doctor \| Simple Care" | Good, specific | self | "UTI Treatment" (prerendered) | same |
| `/services/sick-note` | "Sick Note \| Simple Care" | "Learn about sick note virtual care options…" | self | none | **none: blank** |

**Headings on the 9 concern pages.**
- The pages share one H2 pattern: "Safe. Convenient. Secure.", "Meet Your Physician", Symptoms,
  Eligibility, "Available Throughout BC", "How To…", and 12 FAQ H3s.
- They run 567–875 words. That is sound, but it is a template, so the pages differ only in their
  middle sections.
- The H1s are bare nouns ("Cold Sore", "Weight Loss"). "Cold sore treatment online in BC" would match
  the query.

**Homepage headings.**
- One H1, then H2s for "Click a concern to book", "How your visit works" and "Who We Are".
- The 15 categories are H3s, and so are the 5 visit steps.
- The structure is sound. The H1 ("Virtual Family Practice") and the title ("Online Walk-In Clinic")
  pull in different directions; see §3.

### 2.2 Structured data

| Page | What is there | Problems |
|---|---|---|
| All pages | `MedicalOrganization` + `MedicalClinic`, `WebSite` | There is no `telephone`, `logo`, `sameAs` (Instagram, Facebook), `url` for booking, or `availableService`. The second, smaller `MedicalOrganization` node on the concern pages repeats the same `@id`; it's harmless but redundant. |
| 9 concern pages | `BreadcrumbList`, `MedicalWebPage`, `MedicalCondition`, `MedicalService`, `FAQPage` (12 Q&As) | The breadcrumb reads **Home › About Us › UTI Treatment**; it should be Home › Services › UTI. `MedicalCondition.name` is "UTI Treatment", which is a service, not a condition. `description` values are cut off with "…". There is no `lastReviewed` or `reviewedBy`. |
| `/faq` | `FAQPage` (4 Q&As), injected by JS | Thin. There is nothing on the queue, emergencies, private pay, or who is eligible. |
| `/doctors` | none beyond the organization | **There is no `Physician` schema.** The bios live in modals with no URL, so the CPSBC number and training can't be indexed or tied to the pages. |

**FAQ rich results.** Google restricted them in August 2023 ("Changes to HowTo and FAQ rich results",
https://developers.google.com/search/blog/2023/08/howto-faq-changes; I confirmed the title, but the
body did not load in this fetch). Keep the markup, because it is valid and AI answer engines read
it, but don't count on the rich result.

### 2.3 Open Graph, image alt text and internal links

**Open Graph.**
- The tags exist on every page.
- **`https://simplecare.ca/og-image.jpg` and `/twitter-image.jpg` return `text/html` (the SPA
  fallback), not an image.** Every share has a broken preview. This matters now that
  `social-media-manager` owns Instagram and Facebook.
- `/about` and `/services/` set `og:url` to the homepage.
- `twitter:creator` is "@simplecare"; it's unverified whether that handle is ours.

**Image alt text.**
- Decorative icons have `alt=""`, which is correct.
- Category icons, the logo, the physician photos and the LegitScript seal have meaningful alt text.
- The concern-page hero has good alt text, but the picture shows a video call (see §3).
- No image lacks an `alt` attribute. `accessibility` should confirm this in a proper audit.

**Internal links.**
- Rendered homepage `<a>` links: `/`, `/about`, `/doctors`, `/faq`, `tel:`, LegitScript, `/privacy`,
  `/terms-of-service`, `/patient-consent` and `/feedback`.
- There are **no links to `/services/*`**. The nav has no Services item.
- The 9 concern pages cross-link each other (prev/next plus a strip), so they form a closed cluster
  that nothing links into.

### 2.4 Indexability

- `robots.txt` is permissive and well commented, and it disallows `/api/`.
- Private routes send `X-Robots-Tag: noindex, nofollow`, which is correct (checked on `/cas`,
  `/register` and `/patient/appointment`).
- `<meta name="robots" content="index, follow">` is on every page.

**Problems.**
- Soft 404s: any path returns 200.
- Canonicals on `/about`, `/services/` and `/feedback` point to the homepage.
- The sitemap includes noindex URLs.
- The `www.` host doesn't 301 to the bare domain. Its canonical tag points to the bare domain, which
  mitigates this.
- The regional pages use 302, a temporary redirect. That's fine while they're paused; use 301 or 410
  if they're dropped.

**Discovery signal.** A `site:simplecare.ca` query on the WebSearch tool returned only `/` and
`/doctors`. That's one index, not Google, but it fits the orphaned-page problem.
**Needs Ani:** Google Search Console access, read-only, for the real index coverage.

### 2.5 Page weight and load hints

Measured with curl from one location and the browser Resource Timing API. This is a lab snapshot, not
field Core Web Vitals.

| Item | Result |
|---|---|
| HTML | 7 KB (home) to 22 KB (concern pages); TTFB 55–85 ms; HTTP/2; HSTS; strong CSP |
| JS on homepage | 7 scripts, **~1.8 MB decoded**, ~640 KB compressed. `index` 979 KB (276 KB compressed). **`map-vendor` is 996 KB (274 KB compressed) and is `modulepreload`ed on every page, though the marketing pages show no map.** `framer` is 116 KB. |
| CSS | `index.css` is 381 KB decoded (72 KB compressed) |
| Third party | Meta Pixel (`fbevents.js`, 415 KB decoded), GTM/GA, Google accounts, the LegitScript seal |
| Requests | 54 on homepage load |
| Caching | Hashed assets are `immutable`, 1 year, which is good. HTML is `no-store`, which is acceptable for an SPA but keeps the edge from caching marketing pages. |
| Rendering | Home, `/about` and `/faq` are client-rendered only; their raw HTML has no content. The 9 concern pages are prerendered, which is good. Google renders JavaScript; many AI crawlers and link-preview bots don't. |

**Load hint.** Remove the `map-vendor` preload from marketing routes, and prerender `/`, `/about`,
`/faq` and `/doctors` the way the concern pages already are. Those are the two biggest cheap wins.
They belong to `frontend-engineer` and `tech-lead`.

**Privacy check for `privacy-security`.** The Meta Pixel fires on the concern pages (UTI, ED,
weight loss, birth control). The page URL is itself health information. The team rule is: "No health
or concern data in ad pixels or targeting" (`product/team.md`, line 75). `referrer-policy:
no-referrer` is set on the response, but the pixel script can still read `location`. This needs
checking before any concern-page build-out.

## 3. Content and conversion

**Is the value clear in 5 seconds? Mostly yes.**
- The rendered homepage shows, above the fold: "British Columbia's Virtual Family Practice", "MSP
  Covered", "No Card? No Problem. Private appointments available", "Book Online 24/7" and the phone
  number.
- Three gaps:
  - The browser tab and Google snippet say "Online Walk-In Clinic" while the page says "Family
    Practice".
  - It never says the doctor **phones you**.
  - It gives no sign of when the next call window is.

**Booking CTAs.**
- The concern tiles are the main CTA, followed by the search box ("Type your symptoms or select
  reason") and "Book an Appointment" / "Get started".
- The concern pages have "Book Virtual Appointment".
- All of these are `<button>`s, which is fine for the flow but gives search engines no links.
- Private-pay pricing appears on none of the audited pages. Walk In lists "$45 Sick Notes" in its
  results-page title (https://walkin.ca/our-services/online-doctors-note/).

**Trust signals.**
- Present:
  - the LegitScript seal in the footer;
  - Dr. Pannozzo's CPSBC number on the concern pages;
  - physician bios with training;
  - "Licensed BC Physicians".
- Missing:
  - bios at crawlable URLs;
  - a named medical reviewer and review date on health content;
  - a physical or mailing address and a contact page with its own head tags.
- Reviews and testimonials are correctly absent (team rule).

**"How your visit works" and the queue: the best content on the site, but hidden.** The homepage's
5 steps are "Select a call window → Join the queue → Track your place → Need help? Call us → It's your
turn". They are clear and they differ from every competitor. But:
- they exist only on the client-rendered homepage, not as a page or in the FAQ;
- **the 9 concern pages contradict them.** "Register → intake form → Consult with your virtual doctor
  → antibiotics → pharmacy" and "From sign-up to prescription — usually under 30 minutes" describe a
  different, faster-sounding model. The hero shows a laptop video call. Care is an outward phone call
  in a call window (`MEMORY.md` product model; `.claude/agents/doctor.md`, line 36).
- "Most visits are seen the same day" (homepage) and "usually under 30 minutes" have no source I
  could find. **Needs Daniel:** keep them, source them, or cut them.

**Safety and emergency wording.**
- None of the marketing pages mentions 911 or the emergency department (checked in the rendered text
  of `/`, `/about`, `/faq`, `/doctors` and all 9 concern pages).
- The concern FAQs say "seek prompt medical attention" or "in-person care may be required". Only
  Allergy Relief has an emergency question, and it doesn't give 911.
- The booking flow does have a good block. After a tile is clicked, a "Before You Continue" modal
  says: "Call 911 or go to the nearest emergency department". It lists chest pain or trouble
  breathing, fainting, severe injuries, heavy bleeding, severe allergic symptoms, and requests for
  controlled medications. That approved-looking wording should also appear on every concern page (see
  the template).
- Walk In puts "Call 911 for collapse, marked confusion or breathing difficulty" on its UTI page
  (https://walkin.ca/conditions/uti/).

**Live copy for `marketing-compliance`.**
- `/services/weight-loss` FAQ: "Do I Qualify for Ozempic®, Wegovy®, or Other Weight Loss
  Medications?" This breaks the team's no-prescription-brand rule (`product/team.md`, lines 76–77).
- `/services/` and every unknown `/services/*` render "Consult Top Doctors Online For Any Health
  Concern" and "Connect Within 60secs". Both are unsubstantiated superlative or speed claims, and
  they look like leftover template text.
- Homepage: "120+ Clinical Concerns Covered", against 103 in the catalogue (also flagged by
  market-strategist, report line 73).

**Honest-content opportunity.**
- BC pharmacists can renew many prescriptions and treat some minor ailments. A search summary of
  https://www.bcpharmacy.ca and gov.bc.ca pages says so; I didn't verify it at source.
- Since 12 Nov 2025, BC employers can't ask for a sick note for an employee's first two short
  absences (5 days or fewer) in a calendar year (https://news.gov.bc.ca/releases/2025LBR0041-001106;
  https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/forms-resources/igm/esa-part-6-section-49-2).
- Saying so on the relevant pages builds trust and wins "do I need a sick note BC" searches.
  **Needs Daniel** before it goes on a clinical page.

## 4. Keyword map: top 20 BC intents

**Volumes are unverified estimates.** I had no keyword tool or Search Console. "Est. H/M/L" is my
relative judgement from how crowded the results page is and how commercial the query is. Validate it
with Google Keyword Planner or Search Console before committing effort (**Needs Ani:** access). "SERP
now" is what WebSearch returned on 26 Sep 2026; it's a US index, so treat it as indicative.

| # | Intent (main keyword + close variants) | Est. volume | Proposed page | Exists? | Priority | SERP now / note |
|---|---|---|---|---|---|---|
| 1 | online doctor BC; virtual doctor BC; see a doctor online BC | Est. H | `/` (retitle: "Online Doctor in BC, MSP-Covered \| Simple Care") | Yes, fix | **P1** | Maple, Island Health, Avee, Rocket Doctor, Walk In |
| 2 | virtual walk in clinic BC; online walk-in clinic BC | Est. H | `/` plus a new `/virtual-walk-in-clinic-bc` | Partly | **P1** | Rocket Doctor has a dedicated page |
| 3 | no family doctor BC; how to find a family doctor BC | Est. H | New `/no-family-doctor-bc` explainer (Health Connect Registry, 8-1-1, what we offer) | No | **P1** | Health authorities and news only, **no clinic owns it** |
| 4 | virtual family doctor BC; family doctor accepting patients BC | Est. M–H | New `/family-practice` (Family Practice category: New Patient, General Health, Follow-up) | No | **P1** | Needs Daniel on what "accepting" can honestly mean |
| 5 | sick note online BC; doctor's note online BC | Est. H | `/services/sick-note` (**blank today**) | Blank | **P1** | Avee, Walk In ($45), MedLetter ($49); law-firm pages on the Nov 2025 rule |
| 6 | prescription renewal online BC; prescription refill BC | Est. H | `/services/prescription-renewal` | Yes | **P1** (link it, fix steps, add safety) | Avee, Tia, Maple, Walk In, gov.bc.ca PPRSS |
| 7 | UTI treatment online BC; bladder infection doctor online | Est. M–H | `/services/uti-treatment` (+ "bladder infection" synonym on the page) | Yes | **P1** | Walk In, Tia, TelePlus, US brands |
| 8 | how does telehealth work BC; virtual appointment how it works | Est. M | New `/how-it-works` (call window, queue, phone call) | No | **P1** | Walk In `/telehealth-bc/`, Avee `/telehealth-bc` |
| 9 | MSP covered virtual care; is telehealth covered by MSP | Est. M | New `/msp-coverage` (+ private pay, no card) | No | **P1** | gov.bc.ca, clinic FAQs |
| 10 | birth control prescription online BC; birth control refill | Est. M | `/services/birth-control` | Yes | P2 | |
| 11 | emergency contraception BC online | Est. L–M | `/services/emergency-contraception` | No | P2 | Time-sensitive; needs a strong safety and timing block (Needs Daniel) |
| 12 | return to work note BC; modified duties note | Est. M | `/services/return-to-work` (+ Modified Duties, Extended Absence) | No | P2 | |
| 13 | massage / physio / chiro note BC (for extended health) | Est. M | `/services/massage-physio-chiro-note` (one page, 4 concerns) | No | P2 | Private pay; state the price |
| 14 | disability tax credit form doctor BC; T2201 doctor | Est. L–M | `/services/disability-tax-credit` | No | P2 | High value, private pay |
| 15 | private online doctor BC; no MSP / no care card doctor | Est. M | `/private-appointments` | No | P2 | Walk In `/private-doctor-in-bc/`; 121Clinicians' self-pay pages |
| 16 | STI testing BC online; PrEP BC | Est. M | `/services/sti-testing`, `/services/prep` | No | P2 | |
| 17 | sinus infection / pink eye / sore throat online doctor BC | Est. M each | `/services/sinus-infection`, `/pink-eye`, `/sore-throat` | No | P2 | Walk In has all three |
| 18 | anxiety / depression doctor online BC | Est. M | `/services/anxiety`, `/services/depression` | No | P2 | Needs a crisis block (9-8-8, 911) and **Daniel's review** |
| 19 | blood pressure / diabetes / thyroid follow-up online BC | Est. L–M | Ongoing Health pages, linked to `/family-practice` | No | P3 | Supports the continuity story |
| 20 | online doctor Vancouver / Victoria / Kelowna … | Est. M each | The paused regional URLs | Paused | P3 | Only with unique local content, not doorway pages. Avee has 337 location URLs; Walk In has 10. |

**Rules for building these pages.**
- One concern per page. Where the booking concerns are thin, group them on one page (the four
  therapy notes, for example).
- Use the API `synonyms` for secondary keywords.
- Every page links up to its category and to `/how-it-works`, and across to 3 related concerns.
- The homepage tiles become `<a href="/services/<slug>">` links, with booking one click deeper, or a
  link and a "Book" button side by side.

## 5. Competitors (fetched 26 Sep 2026 with curl)

| Basic | SimpleCare | Avee Health (https://www.avee.health/) | Walk In (https://walkin.ca/) | 121Clinicians (https://121clinicians.com/) |
|---|---|---|---|---|
| Home title | "BC Online Walk-In Clinic \| MSP-Covered Virtual Care" | "See a Doctor Online in BC Today \| Free, No Wait" | "Online Doctor BC \| Virtual Care \| Walk In" | "121clinicians Home - 121Clinicians-Virtual Walk In Medical Clinic" |
| Meta description | Yes | Yes | Yes | **None** |
| H1 in raw HTML | None (JS) | **None** | "Online Doctors in BC" | "121Clinicians-Virtual Walk In Medical Clinic" |
| Server-rendered text | ~0 words (home) | 349 words | 1,169 words | 560 words |
| Schema | MedicalClinic, WebSite | MedicalBusiness, **AggregateRating** (self-served; Google ignores self-serving review markup) | Organization, WebSite + SearchAction, WebPage, Place, City | Organization, WebSite, BreadcrumbList |
| Sitemap URLs | 20 | **521** (337 locations, 93 blog, 31 medications, 16 doctors, 11 languages, 5 services, 3 conditions) | ~174 (88 posts, 70 pages incl. **~60 `/conditions/*`**, 6 services, 10 locations) | ~43 (26 pages, 10 products, 4 posts) |
| Concern pages | 9 | 5 services + 3 conditions + **31 drug pages** (e.g. `/medications/ozempic`, `/medications/viagra`) | **~60 condition pages** (UTI, sore throat, anxiety…) | 1 list page ("Medical conditions we can help with") |
| Doctor pages | 0 (modals) | 16 at their own URLs | `/our-doctors/` | none found |
| 911 / emergency on pages | No (booking modal only) | No (home, sick-note or anxiety pages) | **Yes** (home, UTI, `/telehealth-bc/`) | Yes (home) |
| "How it works" | Homepage only, queue model | H2 on home, `/telehealth-bc` | H2 on home, `/telehealth-bc/` (1,831 words, "When virtual care is not suitable") | H2 on home |
| TTFB (curl) | 55–85 ms | 100–160 ms | 135–580 ms | **~0.9–3.9 s** |

**What to copy.**
- Walk In: the breadth of condition pages, 911 on every clinical page, a "when virtual care is not
  suitable" section, and a price in the title of paid services.
- Avee: doctor pages with their own URLs, and a "next available" signal.

**What not to copy.**
- Avee's prescription-brand pages (Ozempic, Viagra, Mounjaro). They conflict with our
  no-brand-promotion rule.
- Its self-served AggregateRating.
- Its 337 thin location pages; the metro page has 383 words.

**Where we already lead.**
- Prerendered concern pages with FAQ schema.
- A strong CSP and security headers.
- The fastest TTFB of the four.
- `llms.txt` plus a public MCP endpoint, which none of the others has.

---

## Recommendations, ranked by impact

1. **Fix what's broken (a week of `frontend-engineer` time, no new content).**
   - Make the homepage tiles and the About cards crawlable `<a>` links to the concern pages, and add
     "Services" to the nav.
   - Return a real 404 for unknown paths and blank `/services/*`.
   - Give `/about`, `/services/` and `/feedback` their own titles and self-canonicals, and fix
     `/services/` so it renders.
   - Take `/cas`, `/register` and `/api-docs` out of the sitemap.
   - Upload real `og-image.jpg` and `twitter-image.jpg` files (`brand-designer`).
   - 301 `www` to the bare domain.
   - Correct the breadcrumb and the `MedicalCondition` names.
   - Drop the `map-vendor` preload on marketing routes.
2. **Make the words match the product (copy from `content-designer`, sign-off from
   `marketing-compliance`).**
   - On all 9 concern pages, replace "usually under 30 minutes" and the video-call hero with the
     call-window and queue steps.
   - Add the emergency block (template).
   - Remove the Ozempic®/Wegovy® wording.
   - Remove the "Top Doctors / 60secs" text.
   - Resolve "120+" against 103.
   - Align the title with the H1 (the positioning call is Ani's; see below).
3. **Scale the concern pages from the template.**
   - Start with the P1 rows of the keyword map: sick note, `/how-it-works`, `/no-family-doctor-bc`,
     `/family-practice`, `/msp-coverage`.
   - Then the P2 pages, in batches of about 10, each with Daniel's clinical review.
   - Add `Physician` pages with their own URLs, and "Reviewed by" and a date on each page.

## What needs Daniel

- Clinical review of the emergency and red-flag block in the template, and of every concern page
  before it goes live.
- Whether "Most visits are seen the same day" and "usually under 30 minutes" are true enough to keep,
  and on what evidence.
- Which concerns can honestly say a prescription "may" be given, and which must say "assessment
  only", for example controlled medications and ADHD ("Focus/Attention Problems").
- What "accepting new patients" or "family practice" can truthfully promise, given attachment and LFP
  (market-strategist report, lines 306 on).
- Whether to mention pharmacist prescribing and the Nov 2025 sick-note rule on our pages.

## What needs Ani

- Positioning: should the homepage title lead with "Online Doctor / Walk-In" (search demand) or
  "Virtual Family Practice" (strategy)? My recommendation: title "Online Doctor in BC, MSP-Covered |
  Simple Care", keep the H1 "Virtual Family Practice", and build `/family-practice` to own the
  continuity intents.
- Read-only access to Google Search Console and Keyword Planner, to replace the estimates.
- Approval to brief `frontend-engineer` on recommendation 1, and to route the Meta Pixel on concern
  pages to `privacy-security`.
- The "120+" claim: correct it to the real count or remove it.

## Sources

- SimpleCare: https://simplecare.ca/, `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
  `/api/v1/services/with-subcategories`, `/about`, `/faq`, `/doctors`, `/services/`,
  `/services/uti-treatment` (and the 8 sibling pages), `/services/sick-note`,
  `/services/weight-loss`, `https://www.simplecare.ca/`, `/og-image.jpg`. All fetched 26 Sep 2026.
- Avee: https://www.avee.health/, `/sitemap.xml` (13 child sitemaps), `/services/doctors-note`,
  `/conditions/anxiety`, `/locations/bc/metro-vancouver`.
- Walk In: https://walkin.ca/, `/sitemap_index.xml`, `/conditions/uti/`, `/telehealth-bc/`,
  `/our-services/online-doctors-note/`.
- 121Clinicians: https://121clinicians.com/, `/sitemap_index.xml`,
  `/medical-conditions-we-can-help-with-at-121clinicians/`.
- BC sick-note rule: https://news.gov.bc.ca/releases/2025LBR0041-001106 and
  https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/forms-resources/igm/esa-part-6-section-49-2
  (from search results, not read in full).
- Google FAQ rich results change: https://developers.google.com/search/blog/2023/08/howto-faq-changes
  (title confirmed only).
- Internal: `product/team.md`; `simplecare-competitor-research.md`;
  `product/reports/market-strategist-2026-09-26-number-one.md`; `.claude/agents/doctor.md`.
