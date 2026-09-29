# Nomads — Project Brief

Saved facts about the cafe and the website. This is the source of truth for every session.
Update it whenever the owner shares new information. Anything in `[BRACKETS]` is still unknown:
do not invent it.

_Last updated: 2026-09-29 (live on GitHub Pages; code-review fixes)_

---

## Business

| Field | Value |
|---|---|
| Name | **Nomads** (styled "Nomads Cafe x Art") |
| Type | Italian-style garden art cafe ("Surat's only art cafe") |
| Serves | Italian bread, Italian cuisine, a wide range of coffee, weekend all-day breakfast |
| Tagline | **More Than An Eatery** |
| Owner / contact person | [OWNER NAME] |
| Address | Dumas Village Rd, Sultanabad, Dumas, Surat, Gujarat 394550, India |
| Phone | **+91 94087 69918** (WhatsApp) |
| Email | [EMAIL] |
| Opening hours | Mon to Sat 12:00pm to 11:30pm · Sun 9:00am to 11:00pm |
| Social media | Instagram [@nomadsxart](https://instagram.com/nomadsxart) (18.3K followers) · Threads @nomadsxart · [linktr.ee/nomadsxart](https://linktr.ee/nomadsxart) · [GOOGLE MAPS LINK] |
| Delivery / ordering | [YES/NO, which platforms] |
| Reservations | Yes, at least for weekend breakfast. **Bookings run through WhatsApp: +91 94087 69918** (the site's Book section builds the message) |
| Sister restaurant | Varso House (@varso.house) |
| Also offers | Art studio and exhibition space for local brands, events, music |
| Instagram highlights | Events · Monsoon · Ras Nu Jaman · Edible · Music · Art · Nature |

## Menu

Full transcribed menu with prices: **[`menu.md`](./menu.md)** (source photos in `assets/menu/`).
Current edition is "Issue No. 13" (Sep 2026). Prices are in ₹ and exclude GST. **[NEED: owner to confirm prices, plus a clean PDF of the menu if one exists]**

Menu sections: Caffeinated (espresso, manual brew, cold brew) · Teas · Hot/Cold Chocolate · Milkshakes · Juices ·
House Specials · Everyday Classics · All Day Breakfast (South and North Indian, sourdoughs and bagels, acai bowls, pancakes) ·
Pizzas (12", ₹935 to ₹1105) · Modern European (salads, pasta, appetizers) · Indian · Asian (starters, soups, sushi, noodles, rice and curries) · Desserts.

Italian highlights: 10 hand-tossed pizzas (Margherita, Sei Formaggi, Truffle Mushroom…), 7 pastas (Aglio e Olio, Pomodoro, Alla Rose…), garlic bread, tiramisu, Shakerato, Italian Junglebird.
Coffee highlights: espresso bar, V60 pour over, barrel-aged cold brew, Cherry Old Fashioned, Sour Cola Fizz.

## Website

- **Who it's for:** the cafe owner of Nomads; built by kartavyz.
- **Goal:** attract walk-in customers and show the menu, hours, and location clearly.
- **Structure (default):** one-page site with Hero, About, Menu, Gallery, Visit Us, Footer.
- **Tech (default):** HTML + CSS + vanilla JS.
- **Domain / hosting:** GitHub Pages at https://kartavyzajadiya26-eng.github.io/nomads-website/ (public repo github.com/kartavyzajadiya26-eng/nomads-website). Custom domain [TBD].
- **Status:** a preview is live on GitHub Pages. Before announcing it to customers: owner's original photos and logo, confirmed prices, then add tooltips as the last step (owner's request, 2026-09-29). See README "Before going live".

## Design inspiration

Received 2026-09-29: 10 screenshots of the **BrewMetrics** website case study (The Ash Design, Dribbble).
Saved as `assets/inspiration/brewmetrics-01.png` to `brewmetrics-10.png`. Full style rules are in `CLAUDE.md` section 5.

| # | What to take from it |
|---|---|
| Colours | Cream background, dark espresso-brown sections, caramel/tan accent |
| Headlines | Bold sans-serif with one *italic caramel* accent phrase; ALL-CAPS white headlines on dark photo banners |
| Eyebrows | Small uppercase caramel labels above every heading |
| Hero | Full-bleed dark espresso-machine photo, centred text |
| Cards | Rounded photo cards, small dark info chips overlaid |
| Nav | Logo left, filled caramel CTA plus burger menu (mobile) |
| Forms | Minimal underline inputs with uppercase labels |
| Feel | Premium, calm, lots of whitespace, mobile-first |

Not taken: the data, analytics and "get a quote" content. Nomads is a cafe, not a consultancy.

## Logo

- Red circle, cream arched "N" with arch lines, small "CAFE" / "xART" at top, "NOMADS" below.
- Reference crop: `assets/photos/logo-from-screenshot.png` (low-res). **[NEED: original logo file, SVG or high-res PNG]**

## Cafe photos

Received 2026-09-29 as Instagram screenshots (reference only, low-res). **[NEED: original high-res photos]**

| File | Shows | Use on site |
|---|---|---|
| `assets/photos/instagram-01-profile.png` | Profile, bio, hours, logo, highlights; lotus pond, studio rail, flowers | Facts, logo, Art section |
| `assets/photos/instagram-02-grid.png` | Brick wall with art poster, arched window to garden, girl on wooden deck by pond, food postcard, weekend breakfast poster | Hero, About, Art, Breakfast |
| `assets/photos/instagram-03-grid.png` | Postcard ("coffee, cute corners, homegrown brands, photobooth"), breakfast poster, map of spaces, brick cottage in greenery, pancakes, arched entrance path | Gallery, Breakfast, Visit Us |

The place: terracotta brick cottage under big trees, lotus/lily pond, wooden decks, arched windows and doors, picnic benches, plants everywhere, art on the walls.

## Decisions log

- 2026-09-29: Code review fixes: only website files are published (`_config.yml` excludes CLAUDE.md, the brief, menu.md, README, scripts/, screenshots/); sections stay visible without JavaScript; booking date uses the visitor's local date; Lenis loads with an integrity hash; opening hours live in one `HOURS` list in `script.js`. Note: the files under `assets/photos/`, `assets/inspiration/` and `assets/menu/` mentioned in this brief are not on disk; the site uses crops in `assets/img/`.
- 2026-09-29: Project put on git and pushed to a public GitHub repo; site published with GitHub Pages from the main branch. Every push to main redeploys it.
- 2026-09-29: Added slide-in animations (text from the left, photos from the right, lists staggered) and Lenis smooth scrolling loaded from jsDelivr. Both switch off for visitors who prefer reduced motion.
- 2026-09-29: Owner asked to remove the "View Menu" and WhatsApp buttons from the header. The header now has only the logo, the nav links and the burger on mobile. The "Message us on WhatsApp" button in Book a table uses the green WhatsApp logo.
- 2026-09-29: Owner asked for tooltips to show text on the site, to be added as the last task of the project.
- 2026-09-29: Menu transcribed to menu.md from Google Maps photos; Sep 2026 prices win over May 2026. The real menu is multi-cuisine; the site leads with Italian and coffee but shows the full menu.
- 2026-09-29: Added real identity from Instagram (@nomadsxart). Colours now blend the logo red, cream, terracotta and garden green into the BrewMetrics layout. Added Weekend Breakfast and Art & Studio sections.
- 2026-09-29: Adopted BrewMetrics-style look (cream, espresso, caramel; italic accent headings; dark photo hero). Replaces the earlier default palette.
- 2026-09-29: Owner gave the WhatsApp number +91 94087 69918. Added a "Book a table" section at the end of the page: a small form that composes a pre-filled WhatsApp message (name, date, time, guests, occasion, notes) and opens wa.me. Number lives in one place, `WHATSAPP` in `script.js`.
- 2026-09-29: Project started. Default warm Italian style (espresso brown, cream, terracotta, olive), mobile-first single page, plain HTML/CSS/JS. To be revised when inspiration and photos arrive.
