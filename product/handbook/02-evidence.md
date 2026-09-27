# Where the knowledge lives — and how much to trust it

Use the most trusted source that answers the question. When sources conflict, say so; don't pick
one quietly. `product-manager` keeps a list of known contradictions in `product/open-questions.md`.

| Trust | Source | What it is |
|---|---|---|
| **1. Highest** | `private/*.md` (local only, confidential) and `from-daniel/*.md` | Daniel's own words: meeting notes and written answers. **His exact words are the spec.** Meeting summaries leave out decisions, so read the full text. |
| **2** | `shadowing/*.md` | Real recorded consults in the current production system. They show observed behaviour, what was said, and the friction. |
| **3** | `product/decisions.md` | The dated decision log, including reversed decisions. |
| **4** | `product/use-cases.md`, `requirements.md`, `open-questions.md` | The PM's catalogue, traced to sources. Shows status: built, partly built, not built. |
| **5** | `research/patient-entry-flows/` | Ani's current designs for how patients arrive and reach a doctor. |
| **6** | The prototypes (`*.html`) | What is actually built. Code comments often quote the decision behind a feature. They are demo data, not real patients. |
| **7** | `product/reports/`, `marketing/reports/` | Agent reports: useful analysis, but only as good as their sources. |
| **8** | Root research files: `simplecare-competitor-research.md`, `simplecare-stakeholder-interview-analysis.md`, `healthcare-ux-design-reference.md`, `physician-portal-ia-redesign.md` | Earlier research, which may be dated. |
| **9** | The web: simplecare.ca, competitors, official BC and Health Canada pages | Cite the URL and the date you checked. Official government pages beat blogs. |

## Going to the source
- **Prototype behaviour.** Grep the HTML; don't read a 9,000-line file end to end.
- **What changed and when.** `git log --oneline`.
- **Live prototypes:** https://designsimplecare-lab.github.io/SCDEMO/ (build stamp bottom-left).
- **Local preview:** `cd /Users/aniharutyunyan/Desktop/SCDEMO && python3 -m http.server 8765`.
- **Recordings:** frames are extracted with `swift <scratchpad>/shadow1/frames.swift <video> <dir> <step>`.
  They stay in the scratchpad.
