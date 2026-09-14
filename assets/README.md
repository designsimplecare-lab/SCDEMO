# assets

## dr-pannozzo.jpg

The physician portrait shown in the top bar. Drop a JPG here with exactly
that filename and it replaces the "DP" initials automatically — no code
change needed. If the file is absent the initials stay, so the prototype
never shows a broken image.

A square crop centred on the face works best; the tile is a 42px circle
with `object-fit: cover`, so any aspect ratio fills it without
distorting, but a tall portrait will lose the sides.
