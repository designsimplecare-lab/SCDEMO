# Earnings: one-screen summary

**Status:** built in the prototype (`simplecare-physician-portal-v2.html`, screen `#earnings`), 6 Oct 2026. Ani approved the build on 6 Oct. Batch C follow-ups (Today / This week, same-weekday comparison, Visits | Earnings by weekday, drawers behind the numbers) built 7 Oct, waiting for Ani.
**Source:** Daniel, call 5 Oct 2026. He wants to see at a high level how much he makes: "this month, this week, this day". He thinks in MSP pay periods (MSP pays twice a month). He wants totals at 2 weeks, month, quarter, 6 months and a year. He wants volume by weekday ("why is Tuesday slow?"); income tracks volume one for one. Private pay is a separate world. Earnings is a separate page from Claims.

> **Every figure on this screen is generated demo data.** None of it is Daniel's real income. The repo is public, so real figures never go here.

## The screen, top to bottom
The sidebar item is **Earnings**, placed right after Claims. Its icon is the Mage bars glyph the chart already uses.

1. **Header.** "Earnings", with one quiet line under it.
2. **Summary strip.** This is the same slim strip as Claims: one white bar, with sections divided by thin lines.

   | Section | What the number means |
   |---|---|
   | **Last MSP payment** | The total MSP paid on the most recent payment date on or before today (Tue 29 Sep). It covers all of the doctor's claims in that pay period. |
   | **Next payment** | About how much MSP will pay on the next payment date (Thu 15 Oct). It is the billed value of claims already submitted by that period's close-off (Fri 2 Oct). It says "About" because MSP can still reject or adjust some of them. |
   | **Today · This week · This month** | A small segmented control inside the section (default **This month**). The billed MSP value of visits in that span, by **visit (service) date**, with the visit count and the dates. Compared with the **same weekdays one period back**, with an up or down arrow and a % (Batch C, below). |
   | **Private pay this month** | Private payments collected this month, plus the payment links still outstanding. |

3. **MSP payments chart.** This is the one strong chart.
   - It shows vertical bars by payment date for the last 12 months.
   - A segmented control switches the grouping: **Pay period | Month | Quarter | Year**. Every grouping is by **payment date**.
   - The next payment is drawn **hatched**, labelled "Expected", and shown in the legend.
   - A totals line shows the average per pay period, month or quarter (the Year view has no average, because both years are partial), the last 6 months and the last 12 months. Together with the bars, that covers Daniel's 2 weeks, month, quarter, 6 months and year.
   - Hover or focus shows a tooltip with the amount, the period or date, and the number of claims.
   - Keyboard: the bars are one Tab stop. The arrow keys move between bars, and Home and End jump to the ends.
   - A visually hidden table holds the same numbers for screen readers.
4. **By weekday** (was "Visits by weekday").
   - A **Visits | Earnings** switch (the chart's segmented control). Visits: the average visits per weekday, Mon to Sun, over the last 8 weeks. Earnings: the average billed per weekday (MSP + private + the demo claims of that day, billed value) over the same days. Both count only days the practice was open. A statutory holiday is not a "slow day".
   - The slowest weekday (Mon to Fri) for the chosen metric is called out in one sentence: "Tuesday is your slowest day: 21 visits on average, 32% below your weekday average of 30." / "Tuesday is your slowest day: $910 billed on average, 32% below your weekday average of $1,331."
   - The slowest bar is brand blue, and the other bars are grey.
   - Each bar is a button (one Tab stop, arrow keys, Home and End) that opens the visits behind it.
5. **Money at risk.** This is the only place where red appears, and only on the icons.
   - **Rejected by MSP:** the count and the dollars not paid. It uses the same list and sum as the Claims strip: `t23Rej()`, where an adjusted claim counts its unpaid difference. "Open in Claims" opens Claims on the Rejected by MSP tab.
   - **Near the 90-day limit:** claims in Needs submission with 10 days or fewer left (`t23DaysLeft`, `T23_AMBER`). "Open in Claims" opens the Needs submission tab, which is sorted fewest days first, so these claims are on top.
6. **Private pay.** This section is kept apart from MSP. It shows:
   - collected this month
   - outstanding payment links (the same two links and $140 as Claims, under Private pay)
   - one line for last month
   - a link to Claims, under Private pay

7. **The numbers behind a number** (Batch C). See below.

**The Assistant** answers "how much did I make this month" (or "earnings", "next payment" and similar) with the strip's numbers and an **Open Earnings** button. Home shows no earnings: its start-of-day card carries only the "Claims near deadline" count (see `home-summary.md`).

## Data assumptions (prototype)
- **Today** is the portal's demo today, **Sat 3 Oct 2026** (`T23_TODAY`), everywhere.
- **The history is generated** with a seeded generator (`ernRng(20261003)`), so it is identical on every load.
  - It runs from 18 Sep 2025, the day after the close-off that feeds the first payment in the window (15 Oct 2025), to today.
  - **Visits:** about 34 on Mon, 21 on Tue, 33 on Wed, 32 on Thu and 30 on Fri, with up to ±4 of noise. The practice grows about 8% over the year. Saturdays have 0 to 8 visits, and Sundays are closed.
  - **Closed days:** BC statutory holidays, 29 to 31 Dec 2025, and a holiday week from 20 to 24 Jul 2026 (the low 14 Aug payment).
  - **Fees:** the five age-based `T23_FEES` demo amounts ($30 to $35). The mix is mostly the 2 to 49 band.
  - **Private pay:** a private visit ($100) on about 16% of weekdays, and a form ($40) on about 5%, up to 27 Sep. From 28 Sep onward, the private items in Claims are the whole record, so this month matches Claims.
- **Pay periods.** A claim is submitted on the day of the visit (the end-of-day batch). It is paid on the payment date of the first close-off on or after that day.
  - The 2026 close-off and payment pairs are the real MSP schedule (`T23_MSP_2026`, gov.bc.ca).
  - **The 2025 pairs are approximated:** payments around the 15th and the month end, with close-off 10 to 12 days before. This is noted in the code.
  - Today's visits go out in tonight's batch, after the 2 Oct close-off, so they are not in the 15 Oct figure.
- **Consistency with Claims.** I chose to show the **doctor's total for each payment date** (all his claims), not only the handful of demo claims in Claims.
  - The demo claims are treated as a subset of that total:
    - The two claims Claims shows as paid on 29 Sep (adjusted $25 and paid $30) are inside the 29 Sep payment.
    - The submitted claim (28 Sep) is inside the 15 Oct expected payment.
    - Rejected, held, appeal and not-yet-submitted claims are not paid.
  - So Claims' "Paid this cycle · 2 · $55.00" is a **slice** of Earnings' "Last MSP payment · $9,464", not the same number.
  - Money at risk and private pay read `CLAIMS` directly, so their numbers match Claims exactly. Money at risk keeps Claims' cents format for that reason.
- **No generated rejections.** Rejections in the history are treated as resolved. The only rejections shown are the ones in Claims.

## Design notes
- These are the existing portal tokens and components: the Claims strip pattern, the Claims segmented control pattern, `.box` and `.btn.xs`, and Mage icons via `ICONS` and `paintPd`. Light mode only.
- The chart follows the dataviz method: one series in brand blue, with "Expected" as a lighter step of the same hue plus a 45° hatch.
  - The palette was checked with the validator (single slot passes; the paid-to-expected ordinal ramp passes).
  - Marks: bars 24px or less, a 4px rounded data end, square at the baseline, and a 2px surface gap between paid and expected in a stacked bar.
  - Gridlines are solid hairlines. Direct labelling is sparse: only "Expected" on the chart, and values on the 7 weekday bars.
  - The hit area is the whole column. The tooltip never gates a value, because the hidden table holds every value.
- All text is 14px or larger, including the axis labels.

## Batch C (lead brief, 6 Oct 2026)
Built in the prototype; Ani to approve.

**1a. Today and This week.** The third strip section carries a small segmented control, **Today | This week | This month**, default This month. It does not add a fifth section, so the strip stays calm. All three are counted by visit date from the same seeded history as everything else (`ernBilled`), so Today sits inside This week and the drawers reconcile with the strip. "This week" is Monday to today.

**1b. A fairer comparison.** Each span is compared with the same weekdays one period back, and the label says so:
| Span | Demo dates (today Sat 3 Oct) | Compared with | Label |
|---|---|---|---|
| Today | Sat 3 Oct | Sat 26 Sep | "vs the same day last week" |
| This week | Mon 28 Sep – Sat 3 Oct | Mon 21 – Sat 26 Sep | "vs the same days last week" |
| This month | Thu 1 – Sat 3 Oct | Thu 3 – Sat 5 Sep (4 weeks back) | "vs the same days last month" |

The month comparison goes back 4 weeks, or 5 weeks from the 29th on, so the comparison stays in last month and keeps the weekday mix. The compared dates and amount are in the tooltip and at the top of the drawer. With the demo data, This month now reads up 2% (the old calendar comparison said down 19%). With no visits in the compared span (a Sunday), it says "no visits on the same day last week" instead of a %.

**1c. Weekday card.** Visits | Earnings, as in section 4. The sentence follows the metric.

**1d. The numbers behind a number.** Every figure that stands for a list opens it in a side drawer (the shared drawer pattern: focus moves in, Tab stays inside, Escape or the backdrop closes it, focus goes back to the number or bar):
- Strip: Last MSP payment, Next payment, the Today/This week/This month figure, Private pay this month.
- MSP payments chart: every bar, in all four groupings (Enter, Space or a click; the tooltip says "Click to see the claims").
- By weekday: every bar (the visits on those days, MSP and private).

The drawer shows a one-line total (count · amount, the same figure that opened it) and a compact table: **date, patient, fee code, amount, status**, newest first, 100 rows at a time ("Show 100 more"). The fee code's name is its tooltip. Status reads "Paid 29 Sep", "Sent — waiting for MSP", "Goes in tonight's batch", or the claim's own Claims status. Rows that are demo claims in Claims show the patient as a link that opens that claim in Claims. Generated history rows get generated first names and initials (no real people). Money at risk keeps its "Open in Claims" buttons, and the totals line (average, 6 and 12 months) is not clickable: a year of claims is a list nobody reads.

**Proof.** Every drawer total equals its figure (checked for every payment, every bucket in all four groupings, the three spans and private pay). Headless Chrome 1440 × 900 and 1280 × 800, `?nologin=1`: console clean, no text under 14 px (strip, chart, weekday card, drawer), no horizontal scroll. Screenshots (local): `product/reports/shots/batchC-earnings.png`, `batchC-earnings-drawer.png`.

### Decisions (Batch C)
- D1. The span switch lives inside the third strip section (not a fifth section), default This month.
- D2. Comparisons use the same weekdays (1 or 4 weeks back, 5 from the 29th), not the same dates.
- D3. Weekday earnings are billed value (MSP and private), the same base as the weekday visits.
- D4. Drawers list claims for payment figures (by payment date) and visits for visit-date figures, so each list adds up to its number.

## Open questions
**For Dev (Samin, Sai, Dev)**
1. **The real remittance source.** Can we read MSP payments per payment date from the Teleplan remittance (the paid, adjusted and refused lines), or do we need to calculate them from claim states? How quickly after the payment date is it available?
2. **The expected payment.** Is "the billed value of claims submitted by close-off" good enough, or can Teleplan acknowledgements give a better estimate?
3. **History depth.** How far back can we load? The Year view needs at least one full calendar year to be useful; today it shows two partial years.
4. **Private pay data.** Where do card-on-file charges and payment-link payments live (the payment provider or our own record)? Do refunds and failed charges show?

**For Daniel (via Ani)**
5. **Visit date or payment date.** Today, This week and This month use the **visit (service) date** (the work done). The alternative is the **payment date** (money received), which shows $0 until 15 Oct. The chart already uses payment dates. Is that split right?
6. **The comparison** (built, Batch C). Same weekdays one period back ("vs the same days last month"). Is that what he wants, or the last 7 days against the 7 before?
7. **Today and This week** (built, Batch C) as a switch inside the strip. Is the default This month right?
8. **Weekday average.** Should it include holidays as zero days? The prototype excludes them.
9. **Does Earnings count his own claims only** (solo), or the practice's? This matters once there are more physicians.
10. **Fee codes and amounts** are demo values (OQ-24), so every dollar figure scales with them.
11. **Net or gross.** Every figure is gross (billed or paid by MSP). Does he want it net of the clinic's share or fees? (Any split is confidential: it would stay out of the repo.)
12. **Per doctor or per payee.** MSP pays a payee number, which can be a clinic rather than the doctor. Should Earnings show what was billed under his practitioner number, or what reached his payee?
13. **Who can see Earnings.** Only him, or also Japneet (physician assistant) and the billing agent? The prototype assumes only the doctor. The drawers show patient names next to amounts.
