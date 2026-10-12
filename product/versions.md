# Versions of the physician portal

There is **one main file**, `simplecare-physician-portal-v2.html` (Ani, 3 Oct 2026: no v3 files). Each
time a big round of updates starts, the last deployed build is **frozen** as a backup, so nothing is
ever lost and the main link can keep moving.

| Frozen backup | Build | Git tag | What it was |
|---|---|---|---|
| `simplecare-physician-portal-2026-10-08-frozen.html` | 2026-10-08 11:00 | `portal-build-2026-10-08-1100` | Before Daniel's 11 Oct chart feedback: one-page encounter, Cedar, billing and Earnings as built through 8 Oct |

Open a frozen backup at `https://designsimplecare-lab.github.io/SCDEMO/<file name>`. To restore one:
copy it over the main file, or `git checkout <tag> -- simplecare-physician-portal-v2.html`.
Frozen files are never edited.
