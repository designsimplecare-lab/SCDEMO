# Earnings: one-screen summary

**Status:** built in the prototype (`simplecare-physician-portal-v2.html`, screen `#earnings`), 6 Oct 2026. Ani approved the build on 6 Oct.
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
   | **This month so far** | The billed MSP value of visits from the 1st of the month to today, by **service date**. It is compared with the same days last month (1 to 3 Sep), with an up or down arrow and a %. |
   | **Private pay this month** | Private payments collected this month, plus the payment links still outstanding. |

3. **MSP payments chart.** This is the one strong chart.
   - It shows vertical bars by payment date for the last 12 months.
   - A segmented control switches the grouping: **Pay period | Month | Quarter | Year**. Every grouping is by **payment date**.
   - The next payment is drawn **hatched**, labelled "Expected", and shown in the legend.
   - A totals line shows the average per pay period, month or quarter (the Year view has no average, because both years are partial), the last 6 months and the last 12 months. Together with the bars, that covers Daniel's 2 weeks, month, quarter, 6 months and year.
   - Hover or focus shows a tooltip with the amount, the period or date, and the number of claims.
   - Keyboard: the bars are one Tab stop. The arrow keys move between bars, and Home and End jump to the ends.
   - A visually hidden table holds the same numbers for screen readers.
4. **Visits by weekday.**
   - Shows the average visits per weekday, Mon to Sun, over the last 8 weeks, counting only days the practice was open. A statutory holiday is not a "slow day".
   - The slowest weekday (Mon to Fri) is called out in one sentence: "Tuesday is your slowest day: 21 visits on average, 32% below your weekday average of 30."
   - The slowest bar is brand blue, and the other bars are grey.
5. **Money at risk.** This is the only place where red appears, and only on the icons.
   - **Rejected by MSP:** the count and the dollars not paid. It uses the same list and sum as the Claims strip: `t23Rej()`, where an adjusted claim counts its unpaid difference. "Open in Claims" opens Claims on the Rejected by MSP tab.
   - **Near the 90-day limit:** claims in Needs submission with 10 days or fewer left (`t23DaysLeft`, `T23_AMBER`). "Open in Claims" opens the Needs submission tab, which is sorted fewest days first, so these claims are on top.
6. **Private pay.** This section is kept apart from MSP. It shows:
   - collected this month
   - outstanding payment links (the same two links and $140 as Claims, under Private pay)
   - one line for last month
   - a link to Claims, under Private pay

**The Assistant** answers "how much did I make this month" (or "earnings", "next payment" and similar) with the strip's numbers and an **Open Earnings** button. Home is unchanged.

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

## Open questions
**For Dev (Samin, Sai, Dev)**
1. **The real remittance source.** Can we read MSP payments per payment date from the Teleplan remittance (the paid, adjusted and refused lines), or do we need to calculate them from claim states? How quickly after the payment date is it available?
2. **The expected payment.** Is "the billed value of claims submitted by close-off" good enough, or can Teleplan acknowledgements give a better estimate?
3. **History depth.** How far back can we load? The Year view needs at least one full calendar year to be useful; today it shows two partial years.
4. **Private pay data.** Where do card-on-file charges and payment-link payments live (the payment provider or our own record)? Do refunds and failed charges show?

**For Daniel (via Ani)**
5. **What "this month" counts.** The prototype uses the **service date** (the work done this month). The alternative is the **payment date** (money received this month), which shows $0 until 15 Oct. Which does he mean?
6. **"Same point last month" is skewed by the weekday mix.** 1 to 3 Oct is Thu to Sat, while 1 to 3 Sep is Tue to Thu, so it shows a 17% drop that is mostly the calendar. Would he rather compare the same weekdays, or the last 7 days against the 7 before?
7. **"This week" and "this day".** He mentioned both. They are not on the screen yet, to keep it calm. Add them to the strip, or let the Assistant answer them?
8. **Weekday average.** Should it include holidays as zero days? The prototype excludes them.
9. **Does Earnings count his own claims only** (solo), or the practice's? This matters once there are more physicians.
10. **Fee codes and amounts** are demo values (OQ-24), so every dollar figure scales with them.
