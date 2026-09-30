# Bulletin B-002 — Chat is 1:1 with the paired MOA (30 Sep 2026)

**Who must read it:** every agent, and especially `ux-designer`, `moa`, `doctor`, `content-designer`,
`tech-lead` and `qa-engineer`.

**Source:** `from-daniel/2026-09-30-moa-pairing-and-bus-ads.md` §1.

## What changed
- **The doctor's chat is with one person:** the MOA paired with them for the current call window.
  "On our system it shows to the Docs 1:1 pairing."
- **It's one-way round:** an MOA can have up to 5 doctors, but a doctor has just **one** MOA (Ani, 30 Sep).
  - **Doctor's side (physician portal):** one conversation, with their MOA only.
  - **MOA's side (MOA portal):** a conversation for each of their doctors, up to 5.
- **The pairing can change between call windows.**
- **There is no ticket queue.** A doctor never submits a request into a queue.

## What this overrides
- The v2 chat panel's **list of threads** (several MOAs plus Office Admin). The target is a single
  conversation with the paired MOA, named, with presence showing.
- Any design where the doctor picks a recipient for chat, or where requests pool in a shared queue.
- **Tasks are unchanged:** they still travel doctor → MOA (rule 12). Chat and tasks stay separate.

## Built in v2 (30 Sep)
- **The floating chat** opens straight into the one conversation with the paired MOA (demo: Dolly, "Your MOA
  this window"). There's no thread list and no back button.
- **Smart suggestions** appear as quick-question chips above the message box. When the MOA's last message
  is a question, they offer a reply ("Yes, go ahead", "Not yet"). Otherwise they fit the screen: on a
  chart, "Call Gloria to rebook" or "Did Gloria's fax go through?"; on Home, "Running 10 min late" or
  "Who's next?". A tap fills the box. Nothing sends by itself.

## Self-check
- *The doctor's paired MOA changes at 2 PM. What does the chat show?*
  - The new paired MOA for the new window, named.
  - How the earlier conversation carries over is **Needs Daniel**.
