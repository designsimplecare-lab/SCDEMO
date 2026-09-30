# Bulletin B-002 — Chat is 1:1 with the paired MOA (30 Sep 2026)

**Who must read it:** every agent, and especially `ux-designer`, `moa`, `doctor`, `content-designer`,
`tech-lead` and `qa-engineer`.

**Source:** `from-daniel/2026-09-30-moa-pairing-and-bus-ads.md` §1.

## What changed
- **The doctor's chat is with one person:** the MOA paired with them for the current call window.
  "On our system it shows to the Docs 1:1 pairing."
- **An MOA may support up to about 5 doctors.** The doctor doesn't see that.
- **The pairing can change between call windows.**
- **There is no ticket queue.** A doctor never submits a request into a queue.

## What this overrides
- The v2 chat panel's **list of threads** (several MOAs plus Office Admin). The target is a single
  conversation with the paired MOA, named, with presence showing.
- Any design where the doctor picks a recipient for chat, or where requests pool in a shared queue.
- **Tasks are unchanged:** they still travel doctor → MOA (rule 12). Chat and tasks stay separate.

## Self-check
- *The doctor's paired MOA changes at 2 PM. What does the chat show?*
  - The new paired MOA for the new window, named.
  - How the earlier conversation carries over is **Needs Daniel**.
