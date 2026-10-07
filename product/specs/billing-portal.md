# Billing portal: one-screen summary

**Status:** built in the prototype (`simplecare-billing-portal.html`), 6 Oct 2026. It is waiting for Ani's review.
**Source:** Daniel, call 5 Oct 2026. Rejections are handled by a **billing agent**, a role separate from the MOA ("can be the same person"). The doctor is always ultimately responsible. It is full service. Dev answers, 6 Oct 2026 (items 01, 02, 03, 04 and 11) supply the codes, the states, the deadlines, the history events and the pay calendar.
**Who:** Japneet, signed in as the billing agent, working on Dr. Daniel Pannozzo's MSP claims.

> All patients, claims and amounts are made-up data for the prototype. There are no PHNs and no dates of birth. The patients match the physician portal's Claims where the two overlap (Nadia, Behdis, Andrey, Grace, Owen, Carol-Anne, Frank). Today in the prototype is Tue 6 Oct 2026.

## Shell
- It uses the same look as the physician portal: its tokens, system font, Mage icons, slim summary strip, underline tabs with count badges, side drawers from the right, and sentence case. It is light only.
- The header reads "SimpleCare · Billing", with Japneet (billing agent) in the profile pill. A top-bar pill shows the next close-off: **Tue 20 Oct, 7 PM · paid Fri 30 Oct**.
- The sidebar has **Work queue** (with a red count of refused claims) and **Remittance**.

## 1. Work queue (default)
**Strip:** Refused — fix & resend (count, $ not paid) · Held by MSP (count, $, "don't resend") · Waiting on the doctor (count, next answer-by date) · Resent this cycle (count, $, paid date). Each section opens its tab.

| Tab | What a card shows | Actions |
|---|---|---|
| **Refused** (sorted by fewest days left) | Patient, visit date, fee code, diagnosis, amount; the MSP code(s) with a plain meaning and where MSP refused it; **days left to resend** (90 days from the date MSP refused it); who fixes it ("You fix it" / "Doctor decides" / "Doctor answered") | **Fix and resend** (patient details, price or note; then resend with code X) · **Ask the doctor** · **Mark closed — not paid** · Details |
| **Held by MSP** | The hold (BH) and the statement it came on. Banner: "MSP will decide on a later statement. Don't resend." | Details only. There is no resend. |
| **Waiting on the doctor** | The question or write-off sent, its text, and the answer-by date (amber on the due day) | Send a reminder · Details |
| **Resent** | Resent date with code X, the note, and which statement MSP answers on (from the close-off it made) | Details |

## 2. Remittance
- It shows the latest MSP statement (paid **Tue 29 Sep**, for claims sent by the Thu 17 Sep close-off).
- Next to it: next statement **Thu 15 Oct** (Fri 2 Oct close-off), and next close-off **Tue 20 Oct**, paid **Fri 30 Oct**.
- **Strip:** Paid as billed · Paid differently · Refused or paid $0 · Held by MSP.
- **Reconcile view:** tabs **Needs attention** · **Matched** · **All lines**. Each line shows patient, visit, fee code, billed, paid, what MSP said (code and plain meaning), and **where the claim is now** in SimpleCare (in your queue, held, closed, paid under another code), with the next action.

## 3. Claim drawer
- It shows the state, the days-left chip, what MSP said (code, meaning, who fixes it, how, and MSP's own words one click away), how the deadline is counted, and the claim (doctor, fee code from age, diagnosis, time, amount, billed name, note).
- **History**, newest first, uses Dev's event types: created · edited (old → new) · blocked by a check · name check sent / answered · sent to MSP · refused + code · held · paid · paid differently · resent with a note · closed. It adds: question to the doctor, doctor's answer, reminder, write-off sent for approval, and coverage checked.

## Rules built in
1. **Only real codes.** Fee codes 13x37 and 13x38 use MSP's fees (MSP fee file, 1 Jul 2026). Explanatory codes come from MSP's list (1 Jul 2026), each with a plain meaning, who fixes it and how. **YY** is never shown alone: the reason is the next code ("YY · VN").
2. **Resend window:** 90 days from the date MSP refused the claim (the next-day refusal before review, or the statement). The last day is shown, and "How we count this" explains it. 10 days or fewer is amber, 5 or fewer is strong amber, and 2 or fewer is red (the only red).
3. **Every resend uses code X and a note.** An empty note blocks the resend: MSP refuses a code X claim without a note (YY · YA). The visit date never changes.
4. **The billing agent can't change coding.** Fee code, diagnosis and times are the doctor's (BI, VN, CF, ED, and HC disputes). For these, the only route is **Ask the doctor**, with an answer-by date. The doctor's answer brings the claim back to Refused, marked "Doctor answered", ready to resend.
5. **The billing agent fixes** identity and claim data: name (AM, AQ, against MSP's name-check answer), price (BJ, re-priced to MSP's fee), the missing note (YA), and coverage (AF, checked with MSP first).
6. **Write-offs need the doctor's approval.** "Mark closed — not paid" needs a reason (and a note for Other). It goes to the doctor, and the claim closes only when he approves.
7. **Held means wait.** There is no resend on a held claim.
8. **Pay calendar is data,** MSP's published 2026 close-off and payment dates, never calculated.

## Open questions for Daniel
1. **Who is the billing agent?** Clinic staff (Japneet, as in the prototype), or an outside billing agency? This decides sign-in, what patient data they see, and whether one agent works for several doctors (the portal would need a doctor filter).
2. **Write-off approval.** Should every "closed — not paid" need his approval, or only some? For example, should a confirmed duplicate (HX) or a claim past 90 days (BV) close without approval? Should approval have a dollar threshold, and should there be a monthly summary instead of one approval per claim?
3. **Fix the same claim, or create a new linked claim?** Today the prototype corrects and resends the **same** claim and keeps one history. The alternative is a new claim linked to the refused one. This decides how history, reporting and the 90-day count work (Dev item 04, question 1).
4. **Doctor-decided codes.** Is the split right? The doctor decides BI, VN, CF, ED and HC disputes. The billing agent fixes AM, AQ, BJ, YA and AF.
5. **Answer-by time.** Is 2 business days the right default for a question to the doctor? What should happen when it passes: a reminder, an alert on his Home, or both?

## Not in this version
- Private pay (it stays in the physician portal's Claims, under Private pay).
- A claims search and the closed-claims list.
- More than one doctor.
- Statement-level adjustments (none on the 29 Sep statement).
- MSP lines that match no claim.
