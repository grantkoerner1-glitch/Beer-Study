const tapData = [
  {
    name: "Slow Current",
    brewery: "Burial Beer Co.",
    style: "West Coast IPA",
    abv: "6.8%",
    category: "hoppy"
  },
  {
    name: "Yuzu Rice Lager",
    brewery: "Ponysaurus",
    style: "Lager",
    abv: "4.9%",
    category: "crisp"
  },
  {
    name: "Shadow Theory",
    brewery: "Fonta Flora",
    style: "Porter",
    abv: "6.3%",
    category: "dark"
  },
  {
    name: "Rosewater Dream",
    brewery: "Little Animals",
    style: "Saison",
    abv: "5.7%",
    category: "funky"
  },
  {
    name: "Orchard Bloom",
    brewery: "Botanist & Barrel",
    style: "Dry Cider",
    abv: "6.1%",
    category: "other"
  },
  {
    name: "Daylight Pils",
    brewery: "Resident Culture",
    style: "German Pils",
    abv: "5.1%",
    category: "crisp"
  },
  {
    name: "Forest Velvet",
    brewery: "Haw River",
    style: "Brown Ale",
    abv: "5.8%",
    category: "dark"
  },
  {
    name: "Static Bloom",
    brewery: "Hopfly",
    style: "Hazy IPA",
    abv: "7.0%",
    category: "hoppy"
  }
];

const tapGrid = document.getElementById("tapGrid");
const filterButtons = document.querySelectorAll(".chip");
const heroTapPreview = document.getElementById("heroTapPreview");

function renderTaps(filter = "all") {
  const filtered = filter === "all" ? tapData : tapData.filter((tap) => tap.category === filter);

  tapGrid.innerHTML = filtered
    .map(
      (tap) => `
      <article class="tap-card">
        <p class="tap-style">${tap.style}</p>
        <h3>${tap.name}</h3>
        <p class="tap-meta">${tap.brewery} · ${tap.abv}</p>
      </article>
    `
    )
    .join("");
}

function renderHeroPreview() {
  heroTapPreview.innerHTML = tapData
    .slice(0, 3)
    .map((tap) => `<li>${tap.name} · ${tap.style}</li>`)
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderTaps(button.dataset.filter);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();

renderTaps();
renderHeroPreview();
