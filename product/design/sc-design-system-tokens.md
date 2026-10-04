# SC – Design System: tokens for building in code

The source of truth is the Figma library "SC – Design System"
(https://www.figma.com/design/XoYpGAbbNZUHkKwWDT56g3/SC---Design-System). The lead read these values
from its variables on 3 Oct 2026, for agents that can't open Figma. If a value here and Figma
disagree, Figma wins: tell the lead.

## Type
- **Family: Lato** (Google Fonts: Regular 400, SemiBold 600, Bold 700, Black 900).
- **Text styles:**
  - Headings: 48/64, 36/48, 28/36, 24/32, 20/28, 18/24, all Black.
  - Subtitle: 16/20 and 14/18, SemiBold.
  - Emphasis: 16/20 and 14/18, Bold.
  - Body: 16/20 and 14/18, Regular.
- **SimpleCare floor:** nothing a physician reads is under 14 px, so don't use the 12 px or smaller
  styles. Patient text is 16 px minimum on phones.

## Colour: Mapped variables (Light | Dark)
| Token | Light | Dark |
|---|---|---|
| text/default/heading, body | #000000 | #DDE0E6 |
| text/default/caption | #3F444E | #828894 |
| surface/default/lightest (page, panels) | #FFFFFF | #000000 |
| surface/default/4x-light | #F7F8FA | #000000 |
| surface/default/3x-light | #EDEFF2 | #1E2128 |
| surface/default/2x-light (lines) | #DDE0E6 | #292D35 |
| surface/default/x-light | #C2C7D0 | #343841 |
| surface/default/neutral | #6B7280 | #6B7280 |
| surface/widget/default (cards) | #FFFFFF | #1E2128 |
| surface/popover/default | #FFFFFF | #1E2128 |
| **surface/primary/default** (primary buttons) | **#2C438A** | **#5C71B9** |
| surface/primary/hovered / pressed | #24366E / #1B2952 | #8496CE / #3B52A0 |
| surface/secondary-main/default (soft fill) | #EEF1F9 | #0C1226 |
| surface/secondary-main/hovered | #D5DCF0 | #131C39 |
| surface/tab-main-navigation/selected-default | #24366E | #ADBBE0 |
| surface/tab-main-navigation/hovered | #DDE0E6 | #1E2128 |
| surface/error-default/default (critical) | #D64545 | #D64545 |
| surface/error-default/faint | #F7EBF0 | #140606 |
| text/error-default/default | #3D1313 | #F0A8A8 |
| surface/warning-default/default (to do, stale) | #D99118 | #D99118 |
| surface/warning-default/faint | #F8F4EC | #170F01 |
| text/warning-default/default | #462D04 | #F9DBA8 |
| surface/success-default/default | #29CB97 | #29CB97 |
| surface/success-default/faint | #E8F7F4 | #03100B |
| text/success-default/default | #0B2E23 | #8EEBC9 |
| surface/info-default/default | #3B52A0 | #3B52A0 |
| surface/info-default/faint | #EEF1F9 | #060910 |
| surface/tag/default/neutral | #EDEFF2 | #6B7280 at 8% |
| surface/tag/default/success, error, warning, information | #E8F7F4, #F7EBF0, #F8F4EC, #EEF1F9 | the base colour at 8% |
| surface/table-cell/default-odd / even | #F7F8FA / #FFFFFF | #1E2128 / #000000 |
| surface/tooltip/default | #0C1226 | #0C1226 |
| Brand cover navy | #1B2952 | |

## Spacing and shape
- **gaps-&-margins:** 2, 4, 8, 12, 16, 20, 24.
- **border-radius:** 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56.
- **Elevation:** styles 0 to 3 (use soft shadows; the lead didn't extract the exact values).

## Components in the library
Avatar, Badge, Button, Breadcrumbs, Checkbox, Chip, Date Input and Picker, Dialog, Drawer, Dropdown,
Empty, Filter, Input, Logo, Line Separator, Menu, Overlay, Popup, Radio, Password Input, Paragraph
Input, Progress, Scroll, Search, Slider, Snack, Stepper, Switch, Main Navigation, Tab, Table, Tag,
Time Input and Picker, Toggle, Tooltip and Widget. Mobile-specific ones exist for iOS and Android.

In code, mirror their names and states (default, hovered, pressed, disabled, selected).

## SimpleCare rules on top
- Red is for critical only.
- Buttons are 44 px with an icon.
- Sentence case; never uppercase names.
- Mage Icons (or the library's Icon page).
- Every colour state also has a word or symbol.
- WCAG 2.2 AA in both modes.
