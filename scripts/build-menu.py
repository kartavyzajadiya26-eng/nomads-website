"""Regenerate menu-data.js from menu.md. Run: python3 scripts/build-menu.py"""
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
md = (root / "menu.md").read_text()

# Which top-level menu heading goes under which tab on the site
TABS = [
    ("coffee", "Coffee", ["Caffeinated (Coffee)"]),
    ("italian", "Pizza & Pasta", ["Pizzas (hand-tossed 12\")", "Modern European"]),
    ("breakfast", "All Day Breakfast", ["All Day Breakfast"]),
    ("drinks", "Drinks", ["Teas", "Hot / Cold Chocolate", "Milkshakes", "Juices", "House Specials (mocktails)", "Everyday Classics"]),
    ("indian", "Indian", ["Indian"]),
    ("asian", "Asian", ["Asian"]),
    ("desserts", "Desserts", ["Desserts"]),
]

sections, h2, h3 = {}, None, None
for line in md.splitlines():
    if line.startswith("## "):
        h2, h3 = line[3:].strip(), None
    elif line.startswith("### "):
        h3 = line[4:].strip()
    elif line.startswith("| ") and h2 and not line.startswith("| Item") and not line.startswith("|---"):
        cells = [c.strip() for c in line.strip("|").split("|")]
        if len(cells) < 2:
            continue
        name, price = cells[0], cells[1]
        fav = name.startswith("★")
        name = name.lstrip("★ ").strip()
        m = re.match(r"(.*?)\s*\((.*)\)$", name)
        desc = ""
        if m:
            name, desc = m.group(1), m.group(2)
        group = sections.setdefault(h2, {})
        group.setdefault(h3 or "", []).append(
            {"name": name, "desc": desc, "price": price, "fav": fav, "check": "?" in price}
        )

out = []
for tid, label, heads in TABS:
    groups = []
    for h in heads:
        for sub, items in sections.get(h, {}).items():
            title = sub or re.sub(r"\s*\(.*\)$", "", h)
            groups.append({"title": title, "items": items})
    out.append({"id": tid, "label": label, "groups": groups})

(root / "menu-data.js").write_text(
    "// Generated from menu.md by scripts/build-menu.py. Edit menu.md, then re-run the script.\n"
    "window.NOMADS_MENU = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n"
)
print({t["label"]: sum(len(g["items"]) for g in t["groups"]) for t in out})
