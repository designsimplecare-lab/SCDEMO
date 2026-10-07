# Home: start-of-day card

**Status:** built in the prototype (`simplecare-physician-portal-v2.html`, screen `#today`, `#hsd`), 7 Oct 2026 (Batch C, part 2). Waiting for Ani.
**Source:** lead brief, 6 Oct 2026: "one calm card at the top of Home (above Needs attention), not a dashboard". Daniel's rule (5 Oct, `billing-redesign.md`): Home is clinical; the only billing on Home is the near-deadline claim.

## The card
One slim strip (the Claims and Earnings strip pattern) between the greeting and **Needs your attention**. Four sections, each one button:

| Section | Shows | Source (same as its own screen) | Opens |
|---|---|---|---|
| **Visits today** | N booked · N done · N in queue, then the window line ("Next window 10–2 PM", "Now in the 10–2 PM window", "Next window tomorrow 8 AM") | `QUEUE_DATA`. In queue = not done and not a no-show, the Live queue count (`updateWorkCounts`). Window from `BC_WINDOWS` on the BC clock, like the top-bar pill | Scrolls to the Live queue (today) and puts focus on its heading |
| **Critical results** | N not reviewed, and the first patient's name | `INBOX_ITEMS` still received with `labTier` critical: the critical rows of Needs attention (`renderCriticals`) | The first one's review (`openReview`), in Needs attention's order. With none: the Inbox |
| **Claims near deadline** | N with 5 days or fewer left | `t23StaleList()`, the Needs attention claim row (`T23_STALE_HOME`, threshold Needs Daniel) | Claims, MSP, Needs submission (sorted fewest days first) |
| **Inbox** | N to review, plus "N unread messages" when the MOA chat has any | `INBOX_ITEMS` received (the Inbox's Needs review count); `chatUnreadTotal()` (the chat badge) | The Inbox on Needs review. The messages link (its own button) opens the MOA chat |

- Colour sits on icons only. The critical icon is red only when a critical result is not reviewed (otherwise a grey tick); the deadline clock is amber only when the count is above 0. All numbers and words are ink. Text is 14 px or larger.
- **All clear.** When nothing is in the queue, nothing critical, no claim near its deadline, nothing to review and no unread messages, the card is one line: "All clear for now" and the window line.
- The card re-renders whenever a count it reads changes (criticals, the claim row, the queue, the Inbox, the chat) and when Home opens; the window line refreshes every minute. Focus on a section survives a re-render.
- Below 1100 px the four sections wrap two by two.

## Proof
Headless Chrome 1440 × 900 and 1280 × 800, `?nologin=1` (also with the clock pinned to 10:30 AM Vancouver): the card reads 8 booked · 1 done · 6 in queue (Live queue 6), 1 critical (Needs attention: 1 critical row), 1 claim (Needs attention: 1 claim row; Claims Needs submission with 5 days or fewer: 1), Inbox 16 (Inbox Needs review 16) and 2 unread messages (chat badge 2). Each section lands on the right place; reviewing the critical result turns that section to "0 · none waiting"; clearing everything shows "All clear for now". Console clean, no text under 14 px, no horizontal scroll. Screenshot (local): `product/reports/shots/batchC-home.png` (+ `-1280`).

## Open points
- **Needs Ani:** the card repeats what Needs attention lists (the critical result and the claim) as counts. Keep both, or let the card replace the attention rows' counts later?
- **Needs Ani:** the MOA's unread messages sit inside the Inbox section as a second link (the brief said "Messages/Inbox"). Separate section instead?
- **Needs Daniel:** the 5-day threshold for "near deadline" (same as the Needs attention row).
