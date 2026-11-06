# SimpleCare design system in the portal

Everything a page shows (colour, type, icons, buttons, tags, avatars, tables,
tabs, menus) comes from the SimpleCare design system, the `Simple - master`
repo. Nothing is redrawn by hand. Everything in this folder is exported from
that repo, except `portal-bridge.css`, `baseline.json` and this README:

```bash
# in the design system repo
npm run export:html -- "<path to SCDEMO>/assets/design-system"
```

`demo.html` in this folder shows every piece live. Open it next to the portal.

## Load it

Put these four lines last in the page's `<head>`, after its own `<style>`, in this order:

```html
<link rel="stylesheet" href="assets/design-system/simplecare-tokens.css">
<link rel="stylesheet" href="assets/design-system/portal-bridge.css">   <!-- portal only -->
<link rel="stylesheet" href="assets/design-system/simplecare-ui.css">
<script src="assets/design-system/simplecare-icons.js"></script>
<script src="assets/design-system/simplecare-ui.js" defer></script>
```

| File | What |
| --- | --- |
| `simplecare-tokens.css`, `fonts/` | Every token as a CSS variable: light, and dark under `[data-theme="dark"]`. Lato. |
| `portal-bridge.css` | Points the portal's own variables (`--ink`, `--paper`, `--accent`…) at the tokens. **The only file here to edit by hand.** |
| `simplecare-icons.js` | `SC.icon(name, { size, variant, label })`: every icon as an `<svg>` string. |
| `simplecare-ui.js`, `.css` | The `<sc-*>` tags and `SC.html()`, rendered by the real React components. |
| `check.mjs` | Lists anything the page still draws by hand. |
| `demo.html` | The reference. |

## Use it

**Icons.** `SC.icon('search', { size: 20 })` returns the design-system icon. Icon
names are listed in `SC.iconNames` and on the demo page. To move the portal's
`ICONS` map over, point each entry at a design-system icon:
`ICONS.search = SC.icon('search', { size: 20 })`.

**Simple components: tags.** These are the real components, each in a shadow
root so page CSS can't bend them:

```html
<sc-button variant="primary" start-icon="add">New patient</sc-button>
<sc-button variant="tertiary-main" start-icon="search" label="Search"></sc-button>   <!-- icon only: label = accessible name -->
<sc-avatar name="Gloria McDonald" src="…jpg" size="medium" badge="online"></sc-avatar>
<sc-tag color="success" start-icon="check-circle">Verified</sc-tag>                 <!-- neutral success error warning information purple lime orange pink teal -->
<sc-badge status="online"></sc-badge>   <sc-badge count="13"></sc-badge>
<sc-chip selected>8:00–10:00</sc-chip>
<sc-checkbox label="Select all"></sc-checkbox>   <sc-switch label="Safe mode" checked></sc-switch>
```

Attributes are the component props in kebab-case (see Storybook). `click`
bubbles as usual. Checkbox, switch and chip fire `change`; read `.checked` or
`.selected`, or set them from script.

**Bigger pieces: `SC.html`.** Use it for tables, tabs, menus and tooltips the page
builds in script. It returns the components' exact markup; `simplecare-ui.css`
styles it. The page adds behaviour (sorting, opening menus):

```js
SC.html('Table', { 'aria-label': 'Day sheet' },
  ['TableHeader', {}, ['TableHeaderRow', {}, ['TableHead', {}, 'Patient'], ['TableHead', {}, 'Health card']]],
  ['TableBody', {}, ...rows.map((r) => ['TableRow', {},
    ['TableCell', {}, ['TableCellContent', { strong: true, label: r.name, secondary: r.detail }]],
    ['TableCell', {}, ['TableCellContent', { type: 'tags' }, ['Tag', { color: 'success' }, 'Verified']]],
  ])]);
SC.html('Tabs', { defaultValue: 'review' }, ['TabList', { 'aria-label': 'This visit' },
  ['Tab', { value: 'review', startIcon: 'file' }, 'Review'], ['Tab', { value: 'note', startIcon: 'edit' }, 'Note']]);
```

A child is text (escaped), a nested component `[name, props, ...children]`, or
`SC.raw(html)` for HTML the page already has. Available components: Avatar,
AvatarCircle, Badge, BadgeCount, Button, Checkbox, Chip, ClinicalTag,
CountdownTag, Icon, Menu, MenuItem, MenuItemActions, MenuList, MenuSection,
Switch, Tab, TabList, TabPanel, Tabs, Table and its parts, Tag, Tooltip. To add
a component, ask in the design system repo.

**Colours, type, corners** for the page's own layout, which isn't a component:
use the portal variables (`var(--ink)`, `var(--accent)`, `var(--line)`…) or the
tokens (`var(--color-navy-900)`, `var(--radius-control)`, `var(--shadow-card)`).
Never write a hex value, a font name or a px radius.

## Check it

```bash
node assets/design-system/check.mjs simplecare-physician-portal-v2.html               # summary + top 15 of each
node assets/design-system/check.mjs simplecare-physician-portal-v2.html --screen inbox
node assets/design-system/check.mjs simplecare-physician-portal-v2.html --all
node assets/design-system/check.mjs simplecare-physician-portal-v2.html --baseline assets/design-system/baseline.json
```

It lists hard-coded colours (with the variable to use instead), fonts, px
radii, inline `<svg>` icons and hand-built buttons, tags, chips, badges and
avatars, by screen and line. `--baseline` fails if any count went up, so run it
before committing. Lower `baseline.json` (`--write-baseline`) as counts drop.
Mark a CSS rule that must stay as it is (a printed form) with
`/* sc-allow: why */`.

## Rules

- The design-system links stay last in `<head>`. Fetch before committing this page.
- Colour, type, corners and how a component looks change in the design system repo, then re-export.
  Screens, layout and behaviour change in the portal.
