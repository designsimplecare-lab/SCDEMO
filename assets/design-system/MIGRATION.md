# Moving the portal onto the design system

Ani, 6 Nov 2026: the whole portal should look and feel like the design system
in Storybook: its tables, menus, tabs, buttons, inputs, avatars, tooltips, top
bar and navigation. Nothing stays hand-built. This is the map from what the
page draws today to what replaces it. `node assets/design-system/check.mjs
simplecare-physician-portal-v2.html` gives the live counts; open `demo.html` and
Storybook side by side for the target look.

How to replace each piece:
- **Tag**: an `<sc-*>` tag in the markup.
- **`SC.html('Name' …)`**: generated markup, for anything the page builds in script.
- **`SC.icon`**: icons.

## Small pieces

| Today (count) | Replace with | Notes |
| --- | --- | --- |
| `.btn` (241) | `<sc-button>` | `.btn` → `variant="secondary-main"`; `.btn.dark` / `.primary` → `variant="primary"`; `.btn.crit` → add `intent="destructive"`; `.btn.xs` → `size="small"`; icon-only → `label="…"`; toggles → `pressed="true\|false"` |
| `.al-btn` (4), `.qf-btn` (1), `.sidebar-collapse-btn`, `.theme-btn` | `<sc-button variant="tertiary-main">`; filter buttons → `SC.html('FilterButton' …)`; theme → `<sc-toggle>` (Light / Dark) | |
| `.status-pill` (In queue ▾), `.bill-pill` (10) | `SC.html('Chip', { endIcon: 'arrow-dropdown-down' }, …)` that opens a `MenuList`; static ones → `<sc-tag>` | |
| `.tm-chip` `.v2-chip` `.op-chip` `.ai-chip` `.rp-chip` `.pc-chip` `.cs-chip` `.ps-chip` `.auto-chip` (≈35) | `<sc-chip>` (pick one / pick many with `multi-select`) | Rows of them (`.op-pills`, `.rp-chips`…) → `SC.html('ChipGroup' …)` |
| `.pc-pill` `.op-pill` `.vd-pill` `.cw-pill` `.sd-pill` `.ctl-pill` | `<sc-tag>` when it's a label, `<sc-chip>` when it's clickable | |
| `.ai-tag` `.rm-tag` `.doc-tag` `.cs-tag` `.sm-tag` `.ps-tag` `.addon-tag` (≈22) | `<sc-tag color="…">` | AI → `color="purple" start-icon="ai"`; clinical states → `SC.html('ClinicalTag' …)`; countdowns → `CountdownTag` |
| `.q-avatar` `.mini-av` `.vc-av` `.vd-av` `.pc-avatar` `.cl-av` `.chat-av` `.chat-thread-avatar` `.chat-head-av` `.pf-photo` | `<sc-avatar>` | 16 → `size="x-small"`, 24 → `small`, 32 → `medium`, 40 → `large`, 48+ → `x-large`; presence → `badge="online\|on-call\|away\|busy"` |
| `.chat-badge`, nav counts | `<sc-badge count="…">` | Counts inside tabs are plain text after the label (`Review 2`) |
| `.v2-badge` | plain text count, as the chart tabs already do | |
| 85 inline `<svg>` and the `ICONS` map | `SC.icon('name', { size })` | Names in `SC.iconNames` |
| Text inputs, search fields | `<sc-input>`, `<sc-search>` | Read `el.value`; `input` and `change` fire |
| Checkboxes, switches | `<sc-checkbox>`, `<sc-switch>` | |

## Big pieces: build with `SC.html`

| Today | Replace with |
| --- | --- |
| Day sheet `.q-table`, Inbox rows, Claims and Earnings tables, Tasks | `Table` › `TableHeader` / `TableBody` › `TableRow` › `TableCell` › `TableCellContent`. Name column `strong` + `secondary`; actions `revealOnHover`; `density="compact"` for one-line lists |
| Every tab row (`.work-tabs` `.ix-tabs` `.cs-tabs` `.t23-tabs` `.v2-tabs` `.rp-tabs` `.pc-tabs` `.vd-tabs` `.nd-tabs`…) | `Tabs` › `TabList` › `Tab`. Always flush on the page, outside and above the card it switches; never inside a card |
| Menus and popovers (`.q-statusmenu` `.profile-dropdown` `.nav-flyout` `.qf-menu` `.cs-ins-menu` `.cs-pop` `.v2-finpop`) | `MenuList` › `MenuSection` › `MenuItem` (`startIcon`, `description`, `selection`) |
| Tooltips (`.v2-tip` `.ern-tip`, `title=""` on icon buttons) | `Tooltip` |
| Sheets and drawers (`.op-sheet` `.rx-sheet` `.tm-overlay` `.ao-overlay`) | `Dialog` / `Drawer` (+ `Overlay`) |
| Top bar (search, safe mode, theme, AI, profile) | `TopBar` parts: `ProfileMenu`, `ShiftMenu`, `<sc-search>`, `<sc-button variant="tertiary-main">` icon buttons |
| Left navigation `.sidebar` / `.nav-btn` | `MainNavigation` (`NavGroup`, `NavItem`, `NavSeparator`) |
| Toasts | `Snack` |
| Empty states | `Empty` |
| Loading | `Skeleton`, `SkeletonCellContent` |
| Earnings charts | `Chart` |

`SC.html` renders any component in the library: see Storybook for each one's props.
The markup is static, so the page adds behaviour as it does today (open a menu,
sort a table, switch a tab). If a screen needs a component or variant the
library doesn't have (a table group-header row, the "next patient" accent bar),
ask in the design system repo first. Don't build it by hand.

## Leave as they are

Printed documents that must look like paper (`.doc-sheet`, `#rx-panel .rp-paper`
and their serif/typewriter fonts): mark the rules `/* sc-allow: printed form */`.

## Order

1. Home (top bar, left navigation, Needs your attention, day sheet)
2. Inbox
3. Patient chart (the rest of it)
4. Claims
5. Earnings
6. Tasks
7. Chat, MOA, sheets and overlays

Per screen: swap the pieces, check light and dark, run `check.mjs --baseline`,
lower the baseline, fetch, commit.
