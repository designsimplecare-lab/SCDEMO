# Daniel on flagging abnormal ECGs and results — 30 Sep 2026

Source: a 5-minute screen recording from Dr. Daniel Pannozzo to Ani, "How to Flag Critical Abnormal
ECG Results". He is reviewing the v2 chart (demo patient Gloria McDonald, build 2026-09-28). On
screen: the Critical troponin card, the line "Also in today for Gloria: 12-lead ECG — Abnormal ECG:
atrial fibrillation · left anterior divisional block · nonspecific repolarization abnormality", and
Recent results (Troponin I Critical, CK High, Ferritin Low). The recording stays local; it is not
committed. Quotes are from the transcript Ani pasted, with profanity starred.

## What he said
**The abnormal ECG gets its own card, the same as the critical card.**
> "this should be like boom and then boom, like, just like in the exact same."
> "But that would be a card that is equivalent to this card, right?"

**Say "abnormal ECG", and keep the ECG machine's reading off the screen.**
> "the issue with an ECG is yes, the their s\*\*\*\*\* f\*\*\*\*\*\* ECG reader will flag it as abnormal, but
> that's not as objective or reliable."
> "I would just say abnormal ECG, right? Because you wouldn't want to bias the doctor."
> "a lot of physicians, including myself, You don't necessarily look at what the AI so on the ECG
> printout"
> "that's the source document, right? It's on there. But that's not something that we should tell
> the doctor. We just have to flag it as abnormal."

**Some ECG findings will count as critical, and he will define which.**
> "We'll have our own protocols. Like, if the ECG is saying, you know, STEMI or AFib, or then we'll
> note that."
> "the abnormal ECG, left anterior division block, nonspecific repolarization, abnormality. No,
> abnormal. Now, AFib is important."
> "That's also a critical ECG, but I know I haven't clarified what constitutes critical as far as
> ECG. Are concerned. … I'll get that done."

**Three levels of flag.**
- Critical, which is red:
  > "the critical is, hey, this is very wrong. This is what it is. This is why it's wrong. You've got
  > to do something."
- High, which also carries an exclamation mark:
  > "critical and high, I would even argue, is like almost the same category … both of them should
  > be with an exclamation mark at least, even if you didn't want to call it critical. Just high."
- Everything else abnormal is yellow, and the doctor clears it:
  > "yellow is fine as abnormal, like unless it's critical."
  > "you can mark it as. is outside the reference range. And that's just yellow. And all it means is
  > that the doctor has to look at it and clear it."

**Show whether a yellow flag has been cleared.** Pointing at CK's yellow "High":
> "See the little yellow s\*\*\* here you got going on? That's good. But, you know, did the doctor like
> clear this or what do we do?"

He confirmed the critical troponin card as it is: "this is a critical result. Absolutely, it is
perfect."

## What changed in v2 (built 30 Sep, build 2026-09-30 20:05)
- **Chart:** an abnormal result that isn't Critical or High now has its own yellow card under the
  critical one: "Abnormal ECG · 12-lead ECG · In-clinic · received Today, 7:55 AM · Not cleared ·
  Review result". The "Also in today" line no longer carries it.
- **"Abnormal ECG" everywhere except the tracing:** the chart, the inbox row, the review screen and
  the AI summary all say only "Abnormal ECG". The machine's reading stays on the source document.
- **Recent results:** Critical and High carry an exclamation mark. Every flagged value says "Not
  cleared" (a link to the result) or "Cleared". In this demo, "cleared" means its result is signed off.

## Needs Daniel
- Which ECG findings are critical. He named STEMI and AFib as examples, and he is writing the
  protocol. Until then the demo ECG (AFib) shows as **Abnormal ECG** in yellow. When the list exists,
  a critical ECG becomes a red card that names the finding.
- Is "clear" the same act as signing off the result, or a lighter acknowledgement? The demo treats
  them as the same.

## Follow-ups for the team
- `clinical-safety`: review this change. It touches how critical and abnormal results show. The
  hazard log needs the three flag levels, and the ECG reading rule.
- `product-manager`: add the decisions and the two open questions to the spec documents.
- **Manoj (T-020):** the Home redesign keeps Critical and High in "Needs your attention". Yellow
  results belong on the chart and in the inbox, not on Home.

## Follow-up, 3 Oct 2026
The written **ECG Critical Result Requirements v2.0** arrived (bulletin B-006). It answers the first "Needs Daniel" item. There is one priority, CRITICAL ECG, triggered only by specific printed findings or a source critical flag, and the matched phrase is shown verbatim. "Abnormal ECG" alone, and plain AF without a critical flag, are **not** critical. So the demo ECG stays a yellow "Abnormal ECG" card, as built. Physician Chart View v2.5 groups related items (the ECG and CK) under the critical troponin, with Critical, To do and Info tiers. That reshaping belongs to T-021.
