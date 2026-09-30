# T-018 — Whistler bus ad (interior card, 11" × 20")

| Field | Value |
|---|---|
| Status | Ready (waiting for Ani's go) |
| Type | Marketing / design |
| Priority | P1 (the ski season; the vendor needs about 2 weeks) |
| Size | M |
| Requested by | Daniel (by email, with the team copied), via Ani |
| Date | 2026-09-30 |
| Owner | **Manoj** (design) |
| Contributors | `marketing-lead` (brief and message), `brand-designer` (layout drafts), `content-seo` (the QR landing and tracking), `performance-marketing` (privacy-safe QR attribution) |
| Gates | `marketing-compliance` (required), `accessibility` (legibility at distance) |

## Request
Daniel is advertising on the Whistler buses "to reach visitors who need to see a doctor". The
specs are in `from-daniel/2026-09-30-moa-pairing-and-bus-ads.md` §2.

## Scope
- **In:**
  - the interior card artwork, **11" × 20" landscape, with a ½" clear border**, delivered as a
    **print-ready PDF**;
  - a **QR code** to the booking page, with a privacy-safe campaign tag (no health data);
  - one or two message options, for Ani to pick.
- **Out:** buying media and signing the contract (Daniel).

## Acceptance criteria
- [ ] The message suits **visitors** ("see a doctor today, by phone") and is readable from across a bus
      aisle. At most about 12 words in the headline, and a large QR.
- [ ] The brand follows SimpleCare Paper, with the navy app icon, and Manrope or the system font.
- [ ] **Compliance passes:**
  - no "#1" or "best";
  - no prescription-drug names;
  - no testimonials;
  - accurate claims (e.g. "same day" only if true for visitors);
  - an emergency line ("Emergency? Call 911").
- [ ] **Coverage and cost for visitors are stated correctly.** Out-of-province and international
      visitors may not be MSP-covered. That's **Needs Daniel**: what visitors pay, and whether they can
      book.
- [ ] The QR goes to a page that works on a phone, for a visitor. It's checked on staging, not by
      booking on live.
- [ ] A print-ready PDF (at 11×20 with the border) and a PNG preview.

## Needs Daniel / Ani
- **Daniel:**
  - Can out-of-province and international visitors book? At what cost (private pay)?
  - The approved wording of the claims.
- **Ani:** the final approval before the PDF goes to the vendor.

## Output
`marketing/creative/whistler-bus-card/`, containing the PDF, a PNG preview, and a short rationale.

## Log
- 2026-09-30: created.
