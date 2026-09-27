# Concern landing page template (simplecare.ca/services/<slug>)

**Status:** Draft for Ani's approval. It is a template, not a live page.
- Every page built from it needs **Daniel's clinical review** and a **`marketing-compliance` review**
  before it is published.
- The source audit is `marketing/reports/content-seo-2026-09-26-website-audit.md`.
- Everything in `{curly braces}` is filled in for each concern. Everything marked **Needs clinical
  review** is written by, or signed off by, Daniel. Agents never invent the clinical content.

**Ground rules** (from `product/team.md` and the product model):
- Care is a **phone call from the doctor in a call window**, with a live queue. Don't say "video
  visit", "in minutes" or "instant".
- **Don't name prescription drug brands** (no Ozempic, Viagra, Accutane and so on) and don't promise
  a prescription. Write "if it's right for you, the doctor can send a prescription to your pharmacy".
- **No claim without a source:** no "best", "top doctors", "#1", time promises or invented numbers.
- **No testimonials, patient stories or ratings.**
- Plain language at grade 6–8, sentence case, second person.

---

## 1. Head and URL (SEO fields)

| Field | Pattern | Example (sick note) |
|---|---|---|
| URL | `/services/{slug}`: lowercase, hyphens, the patient's words | `/services/sick-note` |
| `<title>` (≤ 60 chars) | `{Concern} Online in BC \| MSP-Covered \| Simple Care`, or `… \| Private, ${price}` for uninsured services | `Sick Note Online in BC \| Simple Care` |
| Meta description (140–160 chars) | What you get + how (a phone call from a BC doctor) + coverage + CTA | "Need a sick note in BC? A BC-licensed doctor phones you in your chosen call window. {Coverage line}. Join today's queue." |
| Canonical | Self, absolute, no trailing slash | `https://simplecare.ca/services/sick-note` |
| Robots | `index, follow` | |
| OG / Twitter | Same title and description; `og:image` = the concern's image (1200×630, real file) | |
| H1 | `{Concern} online in BC`, never the bare noun | "Sick note online in BC" |
| Secondary keywords | The API `synonyms` for the concern, plus the keyword-map variants | "doctor's note", "work note", "medical note for work" |

## 2. Page sections, in order

### 2.1 Hero (above the fold)

- **H1:** `{Concern} online in BC`
- **Intro (1–2 sentences):** "A BC-licensed doctor can assess {concern in plain words} by phone. If
  it's right for you, they can {what we can do: e.g. write a note / send a prescription to your
  pharmacy / order tests}."
- **Coverage line:**
  - MSP-covered concerns: "Covered by MSP for eligible BC residents. No BC Services Card? Private
    appointments are available."
  - Uninsured concerns: "This service isn't covered by MSP. The cost is ${price}." (**Needs Ani:**
    the price list).
- **Primary CTA:** `<a href="/patient/appointment?serviceId={id}">Choose a call window</a>`. It's a
  real link, with booking one step deeper.
- **Secondary:** "How your visit works ↓" (anchor to 2.4)
- **Next-window signal (optional, when the API supports it):** "Next call window: {day, time
  range}". It shows the queue position model, never a wait time (Daniel: "queue number, not
  duration", `8cd0893`).
- **Image:** a person at home **on the phone**, not a laptop video call. Alt text: "Patient speaking
  with a Simple Care doctor by phone".

### 2.2 Emergency safety block — **Needs clinical review**

> Placement: directly under the hero, visible without scrolling on mobile, on **every** concern page.
> Styling: the site's alert style, with an icon plus text so it doesn't rely on colour alone.
>
> The general wording below is taken from the live booking-flow modal on simplecare.ca ("Before You
> Continue", seen 26 Sep 2026). The concern-specific list is a **placeholder that Daniel must write
> or approve**. Agents must not fill it in.

```
[NEEDS CLINICAL REVIEW: do not publish until Daniel signs off]

This is not for emergencies.
Call 911 or go to the nearest emergency department if you have:
- chest pain or trouble breathing
- fainting or loss of consciousness
- a severe injury or accident
- heavy bleeding
- a severe allergic reaction (wheezing, throat swelling)

With {concern}, get emergency care right away if you have:
- {red flag 1: Daniel}
- {red flag 2: Daniel}
- {red flag 3: Daniel}

Not sure if it's urgent? Call HealthLink BC at 8-1-1, any time.
{Mental-health pages only, Needs clinical review: "If you are thinking about suicide, call or text
9-8-8, any time."}
```

**Reviewer checklist for this block (Daniel):**
- [ ] The general list matches what the booking modal says, or the modal is updated too.
- [ ] The concern red flags are complete, in plain words, and not diagnostic.
- [ ] The resources and numbers are correct for BC: 911, 8-1-1 HealthLink BC, and 9-8-8 for the
      mental-health pages.
- [ ] Reviewer name and date are recorded in the page's "Medically reviewed" line (section 2.9).

### 2.3 What we can and can't do online — **Needs clinical review**

Two short lists. This section sets honest expectations and is the E-E-A-T signal.

- **"A Simple Care doctor can usually help with:"** {3–5 items. Examples of the form, not content:
  "assessing symptoms by phone", "writing a note for work or school", "sending a prescription to
  your pharmacy if it's right for you", "ordering lab tests"}
- **"You'll need in-person care if:"** {3–5 items, from Daniel. Example of the form: "the doctor
  needs to examine you", "you need a test that can't be ordered virtually"}
- **"We don't provide:"** {e.g. "controlled medications (such as opioids)"; this comes from the
  booking modal, and anything else is Daniel's call}
- **Optional, Needs Daniel:** "Other options" with a neutral pointer to other routes, for example a
  pharmacist for some renewals or minor ailments. Being this honest builds trust.

### 2.4 How your visit works (the same on every page; this is our difference)

Use the homepage's five steps word for word so the site speaks with one voice:

1. **Select a call window.** The doctor will call within your window.
2. **Join the queue.** You're seen first come, first served.
3. **Track your place.** See your place in line and get notified before your call.
4. **Need help? Call us.** (778) 949-APPT. We're here before and after your visit.
5. **It's your turn.** The doctor phones you.

Then one line on what happens after: "After your call, {note / prescription / requisition} is sent
to {you / your pharmacy / your employer's form}." (**Needs clinical review** for each concern.)

**Don't:** use "usually under 30 minutes", "in 60 seconds", "same day" (unless Daniel approves it
and it's sourced) or "video".

### 2.5 About {concern} (short, for patients) — **Needs clinical review**

- **H2:** "About {concern}" or "Common signs of {concern}".
- 80–150 words, plus an optional bullet list of common symptoms.
- Cite a public source for any fact: HealthLink BC, gov.bc.ca or a Canadian professional body. No
  statistics without a source.

### 2.6 Who this is for

- **H2:** "Is an online visit right for me?"
- Eligibility in plain words: BC resident, MSP or private pay, age limits if any (**Needs Daniel**),
  and when someone should book **Family Practice** instead so they keep the same doctor.

### 2.7 Your doctor

- A card with the name, "Family Physician", the CPSBC number and a link to their **own physician
  page** (`/doctors/{slug}`, to be built). No hover-only or modal-only bios.
- Use only facts from the physician's approved bio.

### 2.8 FAQ (5–8 questions)

Mark these up as `FAQPage`. Each answer should be 40–80 words, direct and plain.

Standard questions (the answers are the same across pages, from one source):
1. Is this covered by MSP? What if I don't have a BC Services Card?
2. How does the queue work, and how will I know when it's my turn?
3. Will the doctor call me or video me? (Call.)
4. Can the prescription go to my pharmacy? (If it's right for you.)
5. What if I miss the call? (**Needs Ani / MOA process**)

Concern questions, 2–3, **Needs clinical review**:
6. {Concern question from the keyword map / "People also ask"}
7. {…}

Legal or regulatory facts, for example sick-note rules under the BC Employment Standards Act, must
link to the gov.bc.ca source and carry "Last checked {date}".

### 2.9 Trust footer for the page

- "Medically reviewed by {Dr. name}, {credential}, on {date}." This is shown on the page and set as
  `reviewedBy` / `lastReviewed` in the schema.
- A LegitScript seal (already in the site footer).
- "Last updated {date}".

### 2.10 Related links (the internal-link rules)

- **Up:** a breadcrumb, Home › Services › {Category} › {Concern}.
- **Across:** 3 related concerns in the same category, as real `<a>` links.
- **Always:** `/how-it-works`, `/msp-coverage` and `/family-practice`.
- **Final CTA:** "Choose a call window", as an `<a>` link.

---

## 3. Structured data (JSON-LD pattern)

Fill in the values for each page. Keep one organization node, referenced by `@id`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://simplecare.ca/"},
        {"@type": "ListItem", "position": 2, "name": "Services", "item": "https://simplecare.ca/services"},
        {"@type": "ListItem", "position": 3, "name": "{Category}", "item": "https://simplecare.ca/services#{category-slug}"},
        {"@type": "ListItem", "position": 4, "name": "{Concern}", "item": "https://simplecare.ca/services/{slug}"}
      ]
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://simplecare.ca/services/{slug}#webpage",
      "url": "https://simplecare.ca/services/{slug}",
      "name": "{title}",
      "description": "{full meta description, not truncated}",
      "inLanguage": "en-CA",
      "isPartOf": {"@id": "https://simplecare.ca/#website"},
      "about": {"@type": "MedicalCondition", "name": "{condition name, e.g. Urinary tract infection}"},
      "lastReviewed": "{YYYY-MM-DD}",
      "reviewedBy": {"@id": "https://simplecare.ca/doctors/{physician-slug}#physician"}
    },
    {
      "@type": "MedicalService",
      "@id": "https://simplecare.ca/services/{slug}#service",
      "name": "{Concern} — virtual care by phone in British Columbia",
      "provider": {"@id": "https://simplecare.ca/#organization"},
      "areaServed": {"@type": "AdministrativeArea", "name": "British Columbia"},
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://simplecare.ca/services/{slug}",
        "servicePhone": {"@type": "ContactPoint", "telephone": "+1-778-949-2778"}
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://simplecare.ca/services/{slug}#faq",
      "mainEntity": [
        {"@type": "Question", "name": "{Q}", "acceptedAnswer": {"@type": "Answer", "text": "{A — identical to the visible text}"}}
      ]
    }
  ]
}
```

The physician page (`/doctors/{slug}`) carries a `Physician` node with `@id …#physician`, `name`,
`medicalSpecialty` and `memberOf` → `#organization`. Its `identifier` holds the CPSBC number only if
Daniel agrees to publish it in markup; it's already on the pages as text.

Rules:
- The schema text must match the visible text.
- No `AggregateRating` or `Review` markup.
- No drug names in the markup.

## 4. Pre-publish checklist

- [ ] Title ≤ 60 chars, description 140–160, H1 contains "online in BC"
- [ ] Self-canonical; the page returns 200 with real content (not the blank SPA shell); listed in
      `sitemap.xml`
- [ ] Linked with an `<a>` from the homepage tile, the category and 3 related pages
- [ ] Emergency block present, above the fold on mobile, **signed off by Daniel**
- [ ] "Can and can't do" and the concern content are **signed off by Daniel**, with the reviewer and
      date shown
- [ ] Visit steps match the homepage (call window, queue, phone), and there are no time promises
- [ ] No prescription brand names, superlatives, invented numbers or testimonials
- [ ] Coverage line correct (MSP flag from the API; price for uninsured services from Ani)
- [ ] The image shows a phone call, has alt text, and a real OG image file exists
- [ ] No concern data sent to ad pixels (`privacy-security` has confirmed the Meta Pixel setup)
- [ ] `marketing-compliance` review passed, and Ani approved
