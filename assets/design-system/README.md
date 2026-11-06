# SimpleCare design system in the portal

`simplecare-physician-portal-v2.html` takes its colours, font and control shapes
from the SimpleCare design system (the `Simple - master` repo) through two files
linked at the end of its `<head>`:

| File | What | Edit? |
| --- | --- | --- |
| `simplecare-tokens.css`, `fonts/` | Every design-system token as a CSS variable (light, and dark under `[data-theme="dark"]`), plus Lato, the SimpleCare typeface | No: exported. In the design system repo run `npm run export:css -- "<path to SCDEMO>/assets/design-system"` |
| `portal-bridge.css` | Points the portal's variables (`--ink`, `--paper`, `--accent`, …) at those tokens, plus a few Slack-like details (8px buttons, rounded-square avatars, navy menu highlight) | Yes, to change which token a portal variable uses |

When adding to the portal: use the portal variables (`var(--ink)`, `var(--accent)`,
`var(--line)`, …) or the tokens directly (`var(--color-navy-900)`), never a hex
value, so new screens follow the brand and dark mode.
