# assets

## dr-pannozzo.jpg

The physician portrait shown in the top bar. Drop a JPG here with exactly
that filename and it replaces the "DP" initials automatically — no code
change needed. If the file is absent the initials stay, so the prototype
never shows a broken image.

A square crop around the face works best; the tile is 42px with
`object-fit: cover`, so any aspect ratio will fill it without distorting,
but a portrait crop will lose the sides.
