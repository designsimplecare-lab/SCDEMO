# Chart copy audit, 7 Oct (Gloria's chart, all four tabs)

Read from the rendered chart. Each line: what repeats → what to do. Applies to every chart, not only Gloria's.

## The same fact shown several times
- **"Chest pressure" appears 6 times:** Today card Reason ("Follow up — chest pressure noted"), Intake summary, "What they flagged: “Chest pressure”" + "Patient's words. Reported this morning", the "Flagged at intake" chip, the Note tab AI suggestion, and the Chart timeline ("Intake flag — Follow up — chest pressure noted · Patient flagged concerning symptoms in pre-visit intake"). → Today card: one line (intake summary) + a "Flagged" chip whose tooltip holds the patient's words. Drop "Reason for visit"/"Intake summary"/"What they flagged" labels. Timeline: "Intake · flagged" one line.
- **The critical result shows 3 ways on Review:** Review tab badge "2", Needs attention chip "2 to review", and the critical bar above the card. → Drop the "2 to review" chip; hide the critical bar on the Review tab (the card is right there); keep it on Note/Orders/Chart.
- **Status repeated next to its own button:** "Stage: Not reviewed" + "Review result"; "Stage: Not cleared" + "Review ECG". → Drop the Stage text; the button says it.
- **"Overdue" twice:** Pending header chip "1 overdue" and the item's own "Overdue" chip, plus "Due Aug 20 · Not drawn". → Item: "Due Aug 20 · overdue". Header chip stays.
- **Lipid panel contradiction:** Pending says "Lipid panel and HbA1c · overdue"; Relevant investigations says "No lipid panel and no prior ECG on file." → Remove the investigations line (Pending already covers it).
- **HbA1c twice:** Relevant investigations and Chart → Results. Fine as context, but drop "High, ref <7.0, LifeLabs" → "7.1 % ↑ · Mar 12".
- **"Ongoing | Ongoing"** on each medication in the Chart timeline. → Once.
- **"Low" tag + "below reference range"**, **"Normal" tag + "Within normal limits"** in the timeline. → Tag only.
- **Family doctor = the signed-in doctor** ("Dr. D. Pannozzo"). → Hide when it's you (or "You").
- **"Chart" button** on the patient card duplicates the Chart tab. → Remove it (keep only Call).

## Titles that repeat the tab name
- "Today's note" (Note tab), "Orders and actions" (Orders tab), "Chart" heading (Chart tab), "Needs attention" shown twice on Review. → Remove; the selected tab is the title.
- Page title "Patient chart" + crumb "Home · Open visit · today · In queue". → Crumb: "← Home · In queue".

## Helper text the design already says
- "— open the source" after every Pending and investigation item (6×). → Make the row clickable; drop the text.
- "AI suggestion · not in your note until you accept" + "From today's intake". → "AI · from intake" with Accept / Reject (the rule is kept by the buttons).
- "Suggested: 786.5 · Chest pain · From the booking reason" and "Add diagnosis · ICD-9, for the claim". → "Suggested: 786.5 Chest pain · Use" and "Add diagnosis".
- "Is anyone else on the call?" under "Others present". → Drop (the label + No one / Someone say it).
- "Last known: Coquitlam, BC on Jun 25". → "Last: Coquitlam · Jun 25".
- Orders row descriptions ("Renew or start a medication", "Lab work or imaging", "To a specialist or service", "Ask your MOA to do something", "To the patient portal"). → Drop, or 2 words max.
- "Signed off by Dr. Pannozzo · read-only" (Documents). → "Signed · Jun 25".
- "Received Today, 7:50 AM" → "7:50 AM". "Reference <0.04" → "ref <0.04". "Info: Also out of range: CK 210 U/L" → "Also CK 210 U/L ↑".
- "Patient-reported, home cuff · Sep 22, 4 readings since Jun 25" → "Home cuff · 4 readings · Sep 22".
- Timeline: "Joined the live queue · Window 8:00–10:00 · status In queue" → "In queue · 8:00–10:00". Dates in the current year drop the year ("Jun 25", not "Jun 25, 2026").
- Allergies "No known drug allergies" → "NKDA".

## Keep
- Safety wording (911 safety-netting in notes, critical labels for screen readers), consent text, the 90-day "How we count this" (as an ⓘ), screen-reader-only labels like ", not done".

## Chart tab sections

**Results**
- "From Eagle Ridge (direct)" / "From LifeLabs (direct)" on every row → lab name only ("Eagle Ridge"), "(direct)" into the tooltip.
- "Not cleared" under the name and the status chip next to the value → once.
- "Before: 6.9 on Dec 4, 2025 (uploaded by patient)" → "Before 6.9 · Dec 4 2025 · patient upload".
- The **lab Orders block** lives inside Results with its own subtitle ("What was ordered and where each test stands.") and long requisition lines ("Requisition · Delivered electronically · Valid until · Feb 2, 2027 · Collection window Aug 2 – Aug 16", "Requisition held by the patient. Simple Care cannot confirm laboratory receipt.", "Not delivered to the laboratory — no requisition exists", "Requisition lapsed — a new requisition is required before collection"). → Drop the subtitle; one status line per order ("Sent · valid to Feb 2" / "With patient · receipt unconfirmed" / "Not sent" / "Expired — new requisition needed"); per-test chips only where they differ from the order's status. Consider moving the order tracker to the Orders tab.
- "Unmapped in this delivery · Magnesium — not an ordered item on this order" → "Extra: Magnesium (not ordered)".
- "Weight and BP · Reported by patient" + "4 readings since Jun 25" → "Home readings".

**Medications**
- Count mismatch: the left panel says **Medications 3**, the Chart section says **Medications 2**. → Make them match (the third is the not-yet-started bisoprolol; show it as "Recommended, not started" in one place).

**Problems**
- **Internal note visible:** "Clinical threads (status, treatment, monitoring, last decision, next step) come in delivery step 3." → Remove (it's a build note).
- "Ongoing conditions · Open list" → "Problems".
- "2 suggested updates waiting on you" → "2 updates to review".

**Care plan**
- Title "Care plan — what are we doing?" → "Care plan" (the tab already says it).
- Footer paragraph "Everything outstanding here also appears in Care Plan Tracking, so nothing depends on this chart being reopened. Completed items stay on file and remain auditable." → Remove.
- Each item has a sentence + a source line + "Why this is theirs/ours" → keep one short line ("Cardiology books it; report comes to us"), source as a small link, drop "Why this is …".
- **Bug:** missing space "Due Sep 12, 2026Why this is theirs".
- "SPEC" / "GP" uppercase tags → "Specialist" / "Ours" in sentence case, or icons.
- Summary "6 outstanding · 4 ours to do · 2 with a specialist · 1 overdue" → "4 ours · 2 specialist · 1 overdue".
- The same 4 cardiology items appear in **Care plan, Consults and the left panel's Pending** → Care plan is the home; Consults shows the letter quotes only; Pending links to Care plan.

**Consults**
- "· owner: specialist / owner: you" on every line → small tag.
- "3 recommendations not yet in your plan · Review them in the care plan" duplicates the Care plan banner → one link "Review 3 in Care plan".

**Documents**
- "Intake · today" repeats the Review tab's Today card word for word → keep, but it's the archive copy; no other change.
- "Signed off by Dr. Pannozzo · read-only" → "Signed · Jun 25".

**Messages**
- "Your MOA this window" → "Dolly".

## Ani, 7 Oct: a separate section for doctors (overrides "hide family doctor when it's you")
- Move "Family doctor" out of the patient card into its own **Care team** row in the left panel's Patient summary (same accordion pattern, with a count): Family doctor (Dr. D. Pannozzo — "you" tag when it's the signed-in doctor), specialists from the chart (Cardiology · Dr. M. Ferreira, St. Paul's; Internal medicine · Dr. A. Whyte), MOA (Dolly), pharmacy (from the Rx data). Each line: role · name · place, compact; a phone/fax only where the data has it.
- The patient card keeps only identity + allergies + Call.

## Ani, 7 Oct: the lab "Orders" tracker inside Chart → Results feels out of style
- Move it out of Results into the **Orders tab** as a section "Lab orders" (Orders = things the doctor ordered; Results = what came back).
- Restyle to the current system: one compact row per order (name · ordered date · one status chip · collection window as quiet text), expandable to show its tests; no coloured label boxes ("Requisition / Valid until / Collection" tiles), no letter-spaced bold labels, no big "2 of 4 received" block (→ small "2/4 received" chip).
- One status per order in plain words: "Sent to lab", "With patient · receipt unconfirmed", "Not sent — resend", "Expired — new requisition". Per-test chips only when a test differs; "Awaiting review" repeated on every test → one line "4 results to review" with a link to Review.
- "Unmapped in this delivery · Magnesium — not an ordered item on this order" → quiet line "Also received: Magnesium (not ordered)".
- Remove the subtitle "What was ordered and where each test stands." and "Requisition held by the patient. Simple Care cannot confirm laboratory receipt."

## Ani, 7 Oct: claim drawer (Grace Lin, "Paid $38.61 of $41.42") — same problem, apply to every claim drawer
- "$38.61 of $41.42" appears 4 times (title, Amount row, MSP response line, first History entry); "13437 / HC / paid under 13437" 3 times; "86 days left" twice (header chip and MSP response).
- → Title = the state only ("Paid less than billed"); the header chip keeps days left; ONE summary block at top: "$38.61 paid of $41.42 · MSP paid as 13437 (HC)" + one action line ("Accept or dispute by Mon 28 Dec").
- "What it means / Who fixes it / How" three-row table → one plain sentence ("MSP paid it under 13437. Accept, or dispute if 13537 was right.") with "MSP's words" and "How we count this" behind ⓘ.
- Coding block: drop "Set from age · 52" (age-based is the rule; show only if overridden); diagnosis full text truncates to one line with tooltip.
- "Visit · Open the 10 Sep visit (read-only)" section → a single link in the header ("Open visit").
- History: newest first, one line each ("29 Sep · MSP paid $38.61 (HC)"), who/time as quiet second text; don't repeat what the summary already says in the first entry.
- Claims list rows: the long reason sentence ("Paid under the fee code shown (MSP changed the code)…", "Looks correctly billed: you can ask MSP to reassess, with a note") → code + 3–6 word meaning; the detail lives in the drawer.

## Scope (Ani, 7 Oct): the WHOLE product, every menu
Home, Inbox, Claims (all tabs, rows, drawers, coding drawer, code check), Earnings (subtitles, strip, chart notes, drawers), Tasks, Assistant, profile menu, shortcuts drawer, sign-off popover, chart (all tabs + left panel), toasts, empty states. Same rules: say it once, no subtitles that restate the title, labels 1–3 words, helper text only behind ⓘ where truly needed, organise so the most important line is first.
