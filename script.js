(function () {
  const MENU = window.NOMADS_MENU || [];

  // ---------- Mobile nav ----------
  const burger = document.getElementById("burger");
  const links = document.getElementById("nav-links");
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    burger.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    links.classList.toggle("open", !open);
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      burger.setAttribute("aria-expanded", "false");
      links.classList.remove("open");
    }
  });

  // ---------- Helpers ----------
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const priceHTML = (item) => {
    const p = item.price.replace("?", "").trim();
    const shown = /^\d/.test(p) ? "₹" + p : p.startsWith("+") ? "+₹" + p.slice(1) : p;
    return `<span class="price">${esc(shown)}${item.check ? '<span class="tbc">tbc</span>' : ""}</span>`;
  };
  const itemHTML = (item, cls) => `
    <li class="${cls}">
      <span class="d-name">${item.fav ? '<span class="star" aria-label="House favourite">★</span> ' : ""}${esc(item.name)}</span>
      ${priceHTML(item)}
      ${item.desc ? `<span class="d-desc">${esc(item.desc)}</span>` : ""}
    </li>`;
  const find = (tabId, groupTitle, names) => {
    const tab = MENU.find((t) => t.id === tabId);
    if (!tab) return [];
    const items = tab.groups.filter((g) => !groupTitle || g.title === groupTitle).flatMap((g) => g.items);
    return names.map((n) => items.find((i) => i.name.startsWith(n))).filter(Boolean);
  };

  // ---------- Scroll reveal ----------
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); revealObserver.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // ---------- Coffee picks ----------
  const coffeeCards = [
    { title: "Espresso bar", items: find("coffee", "Espresso based", ["Espresso", "Cappuccino", "Flat White", "Cortado", "Shakerato"]) },
    { title: "Cold brew", items: find("coffee", "Cold brew", ["Cold Brew", "Barrel Aged Cold Brew", "Vietnamese", "Cherry Old Fashioned", "Sour Cola Fizz"]) },
    { title: "Slow and sweet", items: find("coffee", null, ["V60 Pour Over", "Frappe: Classic", "Orange Zest Mocha Latte", "Espresso Martini"]) },
  ];
  document.getElementById("coffee-picks").innerHTML = coffeeCards
    .map((c) => `<article class="coffee-card"><h3>${esc(c.title)}</h3><ul>${c.items
      .map((i) => `<li><span>${i.fav ? '<span class="star">★</span> ' : ""}${esc(i.name.replace("Frappe: ", "Frappe, "))}</span>${priceHTML(i)}</li>`)
      .join("")}</ul></article>`)
    .join("");

  // ---------- Italian picks ----------
  document.getElementById("italian-picks").innerHTML = find("italian", null, [
    "Margherita", "Sei Formaggi", "Truffle Mushroom", "Aglio e Olio Spaghetti", "Smoky Paprika Penne",
  ]).map((i) => itemHTML(i, "")).join("");

  // ---------- Breakfast picks ----------
  document.getElementById("breakfast-picks").innerHTML = find("breakfast", null, [
    "Benne Masala", "Chole with Goan Poi Bread", "Red Pepper Pesto Toast", "Cacao Crunch Acai Bowl", "Pancakes",
  ]).map((i) => itemHTML(i, "")).join("");

  // ---------- Full menu tabs ----------
  const tabsEl = document.getElementById("menu-tabs");
  const panel = document.getElementById("menu-panel");
  function showTab(id, focus) {
    const tab = MENU.find((t) => t.id === id) || MENU[0];
    if (!tab) return;
    tabsEl.querySelectorAll(".tab").forEach((b) => {
      const on = b.dataset.id === tab.id;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    panel.setAttribute("aria-labelledby", "tab-" + tab.id);
    panel.innerHTML = tab.groups
      .map((g) => `<section class="menu-group"><h3>${esc(g.title)}</h3><ul style="list-style:none;margin:0;padding:0">${g.items
        .map((i) => itemHTML(i, "menu-item"))
        .join("")}</ul></section>`)
      .join("");
    try { localStorage.setItem("nomads-tab", tab.id); } catch (e) {}
  }
  tabsEl.innerHTML = MENU.map(
    (t) => `<button class="tab" role="tab" type="button" id="tab-${t.id}" data-id="${t.id}" aria-controls="menu-panel">${esc(t.label)}</button>`
  ).join("");
  tabsEl.addEventListener("click", (e) => {
    const b = e.target.closest(".tab");
    if (b) showTab(b.dataset.id);
  });
  tabsEl.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const ids = MENU.map((t) => t.id);
    const cur = ids.indexOf(tabsEl.querySelector('[aria-selected="true"]').dataset.id);
    const next = ids[(cur + (e.key === "ArrowRight" ? 1 : -1) + ids.length) % ids.length];
    showTab(next, true);
  });
  document.querySelectorAll("[data-tab]").forEach((a) =>
    a.addEventListener("click", () => showTab(a.dataset.tab))
  );
  let saved = null;
  try { saved = localStorage.getItem("nomads-tab"); } catch (e) {}
  showTab(saved || "coffee");

  // ---------- Open now (cafe is in India, IST) ----------
  function istNow() {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
  }
  // Opening hours: the one place to edit. Days: 0 = Sunday. Times in minutes after midnight.
  const HOURS = [
    { label: "Monday to Saturday", days: [1, 2, 3, 4, 5, 6], open: 12 * 60, close: 23 * 60 + 30 },
    { label: "Sunday", days: [0], open: 9 * 60, close: 23 * 60 },
  ];
  const fmtTime = (m) => {
    const h = Math.floor(m / 60) % 24;
    return `${h % 12 || 12}:${String(m % 60).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
  };
  const span = (h) => `${fmtTime(h.open)} to ${fmtTime(h.close)}`;

  const t = istNow();
  const day = t.getDay();
  const mins = t.getHours() * 60 + t.getMinutes();
  const today = HOURS.find((h) => h.days.includes(day));
  const isOpen = !!today && mins >= today.open && mins < today.close;
  document.getElementById("open-status").innerHTML =
    `<span class="open-dot${isOpen ? "" : " closed"}"></span>` +
    (isOpen ? "Open now" : "Closed now") +
    (today ? ` &middot; today ${span(today)}` : "");

  // Rebuild the hours table rows from HOURS (the HTML rows are the no-JS fallback)
  const hoursBody = document.querySelector(".hours tbody");
  hoursBody.querySelectorAll("tr[data-days]").forEach((tr) => tr.remove());
  hoursBody.insertAdjacentHTML("afterbegin", HOURS.map((h) =>
    `<tr${h === today ? ' class="today"' : ""}><th scope="row">${esc(h.label)}</th><td>${span(h)}</td></tr>`
  ).join(""));

  // ---------- Copy address ----------
  const copyBtn = document.getElementById("copy-address");
  copyBtn.addEventListener("click", () => {
    const text = "Nomads Cafe x Art, Dumas Village Rd, Sultanabad, Dumas, Surat, Gujarat 394550";
    const done = () => { copyBtn.textContent = "Address copied"; setTimeout(() => (copyBtn.textContent = "Copy address"), 2000); };
    const fallback = () => {
      const r = document.createRange();
      r.selectNodeContents(document.getElementById("address-text"));
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      copyBtn.textContent = "Address selected";
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
    else fallback();
  });

  // ---------- WhatsApp booking ----------
  // Cafe WhatsApp number: country code + number, digits only
  const WHATSAPP = "919408769918";
  const waLink = (msg) => "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  const GREETING = "Hi Nomads, I would like to book a table.";

  const form = document.getElementById("book-form");
  const hint = document.getElementById("book-hint");
  const dateEl = document.getElementById("bf-date");
  const timeEl = document.getElementById("bf-time");

  // sensible defaults: tomorrow, 8pm
  // local date as YYYY-MM-DD (toISOString is UTC, which is a day behind in India after midnight)
  const localISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const now = new Date();
  dateEl.min = localISO(now);
  dateEl.value = localISO(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
  timeEl.value = "20:00";

  document.getElementById("wa-direct").href = waLink(GREETING);
  document.querySelectorAll("[data-wa-link]").forEach((a) => (a.href = waLink(GREETING)));

  const prettyDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  };
  const prettyTime = (t) => {
    const [h, m] = t.split(":").map(Number);
    const ap = h >= 12 ? "pm" : "am";
    const hh = h % 12 === 0 ? 12 : h % 12;
    return hh + ":" + String(m).padStart(2, "0") + " " + ap;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    hint.classList.remove("error");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    if (!name) {
      hint.classList.add("error");
      hint.textContent = "Please add your name first.";
      document.getElementById("bf-name").focus();
      return;
    }
    const lines = [
      GREETING,
      "",
      "Name: " + name,
      "Date: " + (data.get("date") ? prettyDate(data.get("date")) : "flexible"),
      "Time: " + (data.get("time") ? prettyTime(data.get("time")) : "flexible"),
      "Guests: " + data.get("guests"),
      "Occasion: " + data.get("occasion"),
    ];
    const notes = String(data.get("notes") || "").trim();
    if (notes) lines.push("Notes: " + notes);
    lines.push("", "Sent from the Nomads website.");

    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    hint.textContent = "WhatsApp is opening with your booking. Send the message to confirm.";
  });

  // ---------- Slide-in animations ----------
  // Text slides in from the left, photos from the right; lists rise one after another.
  const slide = (selector, dir) => document.querySelectorAll(selector).forEach((el) => {
    el.dataset.slide = dir;
    el.style.setProperty("--i", [...el.parentElement.children].indexOf(el));
  });
  const grids = ".story-grid, .italian-grid, .breakfast-grid, .art-grid, .visit-grid, .book-grid";
  slide(".hero-content > *", "up");
  slide(".section-head > *, .tabs", "up");
  slide(grids.split(",").map((g) => g + " > :first-child").join(","), "left");
  slide(grids.split(",").map((g) => g + " > :last-child").join(","), "right");
  slide(".coffee-card, .gallery figure, .facts li", "up");
  requestAnimationFrame(() => requestAnimationFrame(() => document.querySelector(".hero").classList.add("is-visible")));

  // ---------- Smooth scrolling (Lenis) ----------
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.Lenis && !reduceMotion) {
    const lenis = new Lenis({ duration: 1.3, easing: (t) => 1 - Math.pow(1 - t, 4) });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // In-page links glide to their section, leaving room for the sticky header
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      const hash = a && a.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const target = hash === "#top" ? 0 : document.querySelector(hash);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.6 });
      history.pushState(null, "", hash);
    });
  }
})();
