# Daniel's feedback: the chart's left column, "This visit", Call and Chart, and the bus ad — 12 Oct 2026

Source: WhatsApp from Dr. Daniel Pannozzo to Ani, about 12:12–12:23 AM on 12 Oct 2026, with screenshots of
the chart (demo patients only). Quotes are verbatim. The order of the screenshots in the chat isn't
always the order he wrote them, so some readings below are the lead's; where unsure it says so.

## The chart

**This visit: remove all of it** (on the screenshot with Phone/Callback, Location, ID verified, Consent,
Others present)
> "we can remove all of this"

This goes further than his 11 Oct message (location, others present and ID verified only). It now
includes Consent and the phone and callback line.

**Call and Chart** (on the patient card with Allergies, Call and Chart)
> "We would know this information - i like the call chart function - we need to make that front and center."

The lead's reading: the system already knows the visit details, so the block isn't needed; and the **Call**
and **Chart** buttons should be the most prominent actions on the page.

**The left "Patient summary" list** (History, Pending, Care team, Previous visits)
> "Call it Past Medical History (PMHx) is the clinical term - and remove care team - i don't care about
> that. Previous visits i don't care about that here."
> "The AI can try its best to synthesie a clinical context that suits the visit."
> "The Doctor will always want to look at past visits and it shouldn't be buried at the bottom"
> "But I very much like this direction."
> "Alright I am done for the today."

The lead's reading:
- **Rename History to "Past Medical History (PMHx)".**
- **Remove Care team** (family doctor, MOA, pharmacy) from the list.
- **Remove Previous visits from the left list.** But the doctor always wants past visits, and they
  must not be buried at the bottom. So past visits move into the **Review area**, within Cedar's key
  clinical findings, with the visits that relate to today's concern first.
- Cedar builds a clinical context that suits the visit (the direction he likes).

## The Whistler bus ad
Daniel reacted to the ad concept Ani showed him (the lead's assumption: the T-018 bus card): "It's
cute." and "Yes. It is fun." Ani said she didn't want to overdo it or make it childish. His remaining
messages are about Whistler's visitors being international; neutral point: **patients booking from
the bus ad may be visitors from outside Canada.** This bears on the open question of whether visitors
and out-of-province patients can book (see `from-daniel/2026-09-30-moa-pairing-and-bus-ads.md`).

## What changed in v2
See the commit that follows this file (the lead builds it today).

## Flags
- **Consent for recording:** with the This visit block gone, consent is asked only when the doctor
  starts Cedar's listening and consent is not on file (the 8 Oct behaviour). Confirm that is enough
  with `clinical-safety` and `privacy-security`.
- **Pharmacy:** Care team held the patient's pharmacy. Prescribing still needs it, so it stays on the
  Prescribe card.
- **Callback number:** removed from the chart. Dropped calls rely on the Call button.
