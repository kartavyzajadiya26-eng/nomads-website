# Nomads Cafe x Art — website

Static site for Nomads, the garden art cafe in Dumas, Surat. Plain HTML, CSS and JavaScript, no build step.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page: hero, story, coffee, pizza and pasta, full menu, weekend breakfast, art studio, garden, book a table, visit |
| `styles.css` | All styling. Colours and fonts are CSS variables at the top of the file |
| `script.js` | Mobile menu, menu tabs, "open now" badge (India time), copy address, WhatsApp booking form |
| `menu-data.js` | Menu data, **generated** from `menu.md`. Don't edit by hand |
| `scripts/build-menu.py` | Regenerates `menu-data.js`: `python3 scripts/build-menu.py` |
| `assets/img/` | Photos. **Currently cut from Instagram and Google Maps screenshots: placeholders only** |
| `CLAUDE.md`, `project-brief.md`, `menu.md` | Guide for Claude, saved cafe facts, transcribed menu |

## Run it

Open `index.html` in a browser, or serve the folder: `python3 -m http.server 8000`.

## Update the menu

Edit `menu.md` (keep the table format), then run `python3 scripts/build-menu.py`.

## Before going live

- Replace every file in `assets/img/` with the owner's original photos (same file names, or update `index.html`).
- Replace the SVG logo in `index.html` (the `nomads-mark` symbol) with the real logo file.
- Confirm menu prices with the owner. Three are marked "tbc" on the site.
- Add the owner's email address to the Visit section (phone and WhatsApp are already in).
- Host it on Netlify, Vercel or GitHub Pages (drag-and-drop the folder works on Netlify).
