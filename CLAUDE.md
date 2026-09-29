# CLAUDE.md — Nomads Cafe Website

This file is the prompt guide for Claude (or any AI assistant) working on the Nomads website.
Read it fully before writing or changing anything. The saved facts about the cafe live in
[`project-brief.md`](./project-brief.md); read that too, and keep it up to date.

---

## 1. What we are building

A website for **Nomads Cafe x Art** (Instagram [@nomadsxart](https://instagram.com/nomadsxart)), a garden
art cafe in **Surat**. Tagline: **"More Than An Eatery"**. It is an Italian-style cafe that serves:

- **Italian bread**: fresh-baked loaves such as focaccia, ciabatta, and similar.
- **Italian cuisine**: 12" hand-tossed pizzas, pasta, garlic bread, tiramisu. The full menu also covers breakfast, Indian, Asian and more (see `menu.md`).
- **A wide range of coffee**: espresso-based drinks and specialty coffee as a signature offering.
- **Extras**: weekend all-day breakfast, an art studio and exhibition space for local brands, events and music.

The real place is a lush garden: terracotta brick walls, a lotus pond, wooden decks, arched windows
and lots of plants. It calls itself "Surat's only art cafe". The website must feel like *that place*.

The site should make someone nearby want to walk in, and make it easy to find the menu,
opening hours, location, and contact details.

## 2. Audience

- Locals looking for coffee, breakfast, lunch, or a relaxed place to sit.
- Food lovers searching for authentic Italian bread and dishes.
- Mostly mobile visitors (Google Maps and Instagram traffic), so **design mobile-first**.

## 3. Pages / sections (default plan)

A single-page site with anchored sections to start. Split into pages later only if the
content grows.

1. **Hero**: cafe name, tagline, strong photo, buttons for "View Menu" and "Find Us".
2. **About / Our Story**: "More Than An Eatery". Garden cafe, Italian food, art.
3. **Menu**: built from [`menu.md`](./menu.md), the real transcribed menu. Lead with **Coffee** and **Italian (Pizzas, Pasta, garlic bread, tiramisu)**, then show the rest honestly as tabs or accordions: Drinks · All Day Breakfast · Modern European · Indian · Asian · Desserts. Show prices as ₹ with a note "prices exclude GST". Mark ★ favourites. Keep the menu data in one JSON/JS object generated from `menu.md` so updates are a single edit.
4. **Weekend Breakfast**: all-day breakfast every Saturday and Sunday, reserve or walk in.
5. **Art & Studio**: exhibition space for local brands, art events, "What is art to you?".
6. **Gallery / The Garden**: lotus pond, brick walls, arched windows, food and coffee.
7. **Visit Us**: hours, address (Dumas Village Rd, Sultanabad, Dumas, Surat, Gujarat 394550), Google Maps embed, linktr.ee/nomadsxart.
8. **Footer**: Instagram, Linktree, sister restaurant Varso House (@varso.house).

## 4. Tone and copy

- Warm, welcoming, relaxed. It should feel like an Italian neighbourhood cafe, not a luxury restaurant.
- Short sentences. A sprinkle of Italian words (Benvenuti, Buongiorno, Dolce) is welcome, but keep it readable.
- The name "Nomads" suggests travel and wandering. Lean into "a place to stop, sit, and stay a while".

## 5. Visual style (based on the owner's inspiration)

Reference: the **BrewMetrics** case study by The Ash Design on Dribbble. The 10 screenshots are
in `assets/inspiration/brewmetrics-01.png` to `-10.png`. Copy the *look*, not the content: that
site sells coffee analytics, and Nomads is a warm Italian cafe.

**Brand identity (from the real cafe; this wins over the inspiration)**
- **Logo:** a red circle with a cream arched "N" (arch lines like a window or doorway), with small "CAFE" and "xART" text on top and "NOMADS" below. Reference crop: `assets/photos/logo-from-screenshot.png` (low-res; get the original file from the owner). Until then, recreate it as SVG or use the crop only in previews.
- The arch shape from the logo and the cafe's arched windows is a great recurring motif: arched image masks, arched section dividers.
- The Instagram's own posts mix bold condensed headlines with handwritten "postcard" notes. A handwritten accent font (e.g. Caveat) may be used *sparingly* for small notes.

**Colours** (CSS variables in `:root`; BrewMetrics structure, Nomads colours):

| Token | Hex (approx.) | Use |
|---|---|---|
| `--cream` | `#F5EDD8` | main background; also the logo's "N" colour |
| `--nomads-red` | `#B3312C` | logo red: primary buttons, key accents, italic accent words |
| `--espresso` | `#231815` | dark sections, hero overlays, footer |
| `--terracotta` | `#C1673F` | brick-wall warmth: secondary accents, tags |
| `--garden` | `#2F4A2B` | deep leaf green: alternate dark sections, badges |
| `--caramel` | `#B8844B` | eyebrow labels, small details (from the inspiration) |
| `--ink` | `#1E1A17` | body text on cream |
| `--muted` | `#8A7F76` | secondary text, form labels |

**Typography**
- Headings: bold, clean sans-serif (e.g. Inter Tight or Manrope, weight 600 to 700).
- **Signature move:** inside a heading, one key phrase is set in *italic Nomads red* (or caramel on dark backgrounds). For example: "Fresh bread, *real Italian* coffee." or "Two worlds, *one table*."
- Big hero and banner headlines are **ALL CAPS, white, bold, centred** over dark photos. For example: "BENVENUTI A NOMADS" or "THE ART OF ITALIAN COFFEE".
- **Eyebrow labels:** small uppercase caramel text with letter-spacing, sitting above each section heading (e.g. "OUR STORY", "WHY NOMADS", "FROM THE OVEN").
- Body copy is small, centred or left-aligned, with generous line-height and muted grey for secondary paragraphs.

**Layout and components**
- **Nav:** logo on the left, a filled red CTA ("View Menu" or "Order Now") and a burger icon on the right on mobile. On desktop, show links plus the CTA.
- **Hero:** full-bleed photo of the garden (lotus pond, brick cafe under trees) or coffee with a dark overlay and centred uppercase white headline plus a one-line subtitle.
- **Alternating sections:** cream then espresso then cream. Dark sections use white text with caramel accents.
- **Photo cards:** rounded corners (~16px), image on top with heading and text below; sometimes a small dark stat or info chip overlaid on the photo (e.g. "Baked daily since [YEAR]", "20+ coffees").
- **Buttons:** filled Nomads red with cream text and small radius; secondary is an outlined button.
- **Forms** (contact or reservation): minimal. Uppercase muted labels with thin underline inputs, no boxes.
- Lots of whitespace, restrained and premium. Mobile-first; the inspiration is shown mainly on phones.

**Adapting to Nomads**
- Replace the data widgets (charts, audit logs, revenue stats) with menu highlights, coffee lists, bread of the day and opening hours cards.
- Use the real cafe's garden, brick and food imagery. Current references are Instagram screenshots in `assets/photos/`. They are for **reference only, not for production**, so ask the owner for full-resolution originals.
- Feel: BrewMetrics' clean premium layout plus Nomads' earthy garden-and-art warmth.

## 6. Tech defaults

- Plain **HTML + CSS + a little vanilla JS** to start: fast, easy to host anywhere (Netlify, GitHub Pages, Vercel).
- Files: `index.html`, `styles.css`, `script.js`, and an `assets/` folder.
- Define colours and fonts as CSS variables in `:root` so the theme can be swapped quickly.
- Responsive with no horizontal scroll at phone width. Accessible: alt text on every image, good contrast, semantic HTML.
- Optimise images (WebP where possible, lazy-loading).

## 7. Rules for working on this project

1. **Never invent real business facts.** Address, phone, hours, prices, owner names, and menu items stay as clearly marked placeholders (e.g. `[ADDRESS]`, `[PRICE]`) until the owner provides them.
2. **Use real cafe photos.** The screenshots in `assets/photos/` are low-res references; use labelled placeholders sized for them until the owner sends originals.
3. **Keep `project-brief.md` as the source of truth.** When the user shares new info (menu, photos, colours, inspiration), update the brief first, then the site.
4. Move fast. The user prefers quick progress and minimal back-and-forth, so pick sensible defaults and state what you picked.
5. Keep changes small and easy to review. Don't rewrite the whole site for a small update.

## 8. Folder layout

```
nomads/
├── CLAUDE.md            ← this guide
├── project-brief.md     ← saved facts about the cafe and site
├── assets/
│   ├── inspiration/     ← design references from the owner
│   └── photos/          ← real cafe photos
└── site/                ← website code (created when building starts)
```
