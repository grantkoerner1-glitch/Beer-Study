const tapData = [
  { name: "Three Birds", brewery: "Burial Beer Co.", style: "Hazy IPA", abv: "7.0%", category: "hoppy" },
  { name: "Post Shift", brewery: "Ponysaurus", style: "West Coast IPA", abv: "6.5%", category: "hoppy" },
  { name: "Clean Slate", brewery: "Resident Culture", style: "Pilsner", abv: "5.1%", category: "crisp" },
  { name: "Crisp Theory", brewery: "Little City", style: "Rice Lager", abv: "4.8%", category: "crisp" },
  { name: "Night Desk", brewery: "Fonta Flora", style: "Porter", abv: "6.2%", category: "dark" },
  { name: "Bookend", brewery: "Haw River", style: "Brown Ale", abv: "5.7%", category: "dark" },
  { name: "Meyer Drift", brewery: "Fun Guys", style: "Sour Ale", abv: "5.2%", category: "wild" },
  { name: "Sunroom Blend", brewery: "Casita", style: "Farmhouse Ale", abv: "6.0%", category: "wild" },
  { name: "Autumn Orchard", brewery: "Botanist & Barrel", style: "Dry Cider", abv: "6.1%", category: "other" },
  { name: "Hill House Red", brewery: "Weekly Selection", style: "Natural Red Blend", abv: "Varies", category: "other" },
  { name: "Trailhead", brewery: "Athletic", style: "N/A IPA", abv: "<0.5%", category: "other" }
];

const drinksMenuData = {
  "Draft Beer": [
    "Burial — Three Birds Hazy IPA (7.0%)",
    "Ponysaurus — Post Shift West Coast IPA (6.5%)",
    "Resident Culture — Clean Slate Pilsner (5.1%)",
    "Fonta Flora — Night Desk Porter (6.2%)",
    "Casita — Sunroom Blend Farmhouse Ale (6.0%)",
    "Rotating Guest Tap — Seasonal Sour / Wild (varies)"
  ],
  "Bottles & Cans": [
    "Guinness Pub Can",
    "Modelo Especial",
    "Pisgah Pale Ale",
    "Steel String Double IPA",
    "Sierra Nevada Trail Pass N/A IPA",
    "PBR Tallboy"
  ],
  Wine: [
    "Rosé by the glass",
    "Pinot Noir by the glass",
    "Sauvignon Blanc by the glass",
    "Sparkling Cava bottle",
    "House Red / White rotating picks"
  ],
  "Cider / Non-alcoholic": [
    "Botanist & Barrel Dry Cider",
    "Athletic N/A IPA",
    "Ginger Beer",
    "Root Beer",
    "Seasonal sparkling hop water"
  ]
};

const tapGrid = document.getElementById("tapGrid");
const filterButtons = document.querySelectorAll(".chip");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const bootRoomMenu = document.getElementById("bootRoomMenu");
const drinksMenu = document.getElementById("drinksMenu");

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderTaps(filter = "all") {
  if (!tapGrid) return;

  const taps = filter === "all" ? tapData : tapData.filter((tap) => tap.category === filter);

  tapGrid.innerHTML = taps
    .map(
      (tap) => `
      <article class="tap-card">
        <p class="tap-style">${escapeHTML(tap.style)}</p>
        <h3>${escapeHTML(tap.name)}</h3>
        <p class="tap-meta">${escapeHTML(tap.brewery)} • ${escapeHTML(tap.abv)}</p>
      </article>
    `
    )
    .join("");
}

async function renderBootRoomMenu() {
  if (!bootRoomMenu) return;

  const preferredOrder = [
    "Apps",
    "Burgers",
    "Classics",
    "Salads & Bowls",
    "Specials",
    "Sides",
    "Desserts",
    "Brunch Starters & Sides",
    "Brunch Entrées",
    "Kids",
    "NA Beverages"
  ];

  try {
    const response = await fetch("menu-data.json");
    if (!response.ok) throw new Error("Menu source unavailable");

    const data = await response.json();
    const foodOnly = data.filter((item) => !["Cans", "Wine"].includes(item.category));

    const grouped = foodOnly.reduce((accumulator, item) => {
      accumulator[item.category] ??= [];
      accumulator[item.category].push(item);
      return accumulator;
    }, {});

    const orderedCategories = Object.keys(grouped).sort((a, b) => {
      const aIndex = preferredOrder.indexOf(a);
      const bIndex = preferredOrder.indexOf(b);
      if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    bootRoomMenu.innerHTML = orderedCategories
      .map(
        (category) => `
        <section class="menu-category-card">
          <h3>${escapeHTML(category)}</h3>
          ${grouped[category]
            .map(
              (item) => `
              <div class="menu-item">
                <span>
                  ${escapeHTML(item.name)}
                  ${item.status ? `<span class="status">(${escapeHTML(item.status)})</span>` : ""}
                </span>
                <span class="price">${escapeHTML(item.price)}</span>
              </div>
            `
            )
            .join("")}
        </section>
      `
      )
      .join("");
  } catch (error) {
    bootRoomMenu.innerHTML =
      "<p>We could not load the full Boot Room food menu right now. Please ask our team for today's full list.</p>";
  }
}

function renderDrinksMenu() {
  if (!drinksMenu) return;

  drinksMenu.innerHTML = Object.entries(drinksMenuData)
    .map(
      ([category, items]) => `
        <section class="menu-category-card">
          <h3>${escapeHTML(category)}</h3>
          ${items
            .map(
              (item) => `
                <div class="menu-item">
                  <span>${escapeHTML(item)}</span>
                </div>
              `
            )
            .join("")}
        </section>
      `
    )
    .join("");
}

function setupFilters() {
  if (!filterButtons.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((chip) => {
        chip.classList.remove("active");
        chip.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      renderTaps(button.dataset.filter);
    });
  });
}

function setupMobileNav() {
  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  [...siteNav.querySelectorAll("a")].forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupSmoothScroll() {
  const header = document.querySelector(".site-header");
  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      const offset = header ? header.offsetHeight + 12 : 0;
      const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", targetId);
    });
  });
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function setFooterYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
}

renderTaps();
setupFilters();
renderBootRoomMenu();
renderDrinksMenu();
setupMobileNav();
setupSmoothScroll();
setupRevealAnimations();
setFooterYear();
