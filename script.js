const tapData = [
  { name: "Static Bloom", brewery: "Hopfly", style: "Hazy IPA", abv: "7.0%", category: "hoppy" },
  { name: "Slow Current", brewery: "Burial Beer Co.", style: "West Coast IPA", abv: "6.8%", category: "hoppy" },
  { name: "Table Salt", brewery: "Little City", style: "Gose", abv: "4.6%", category: "wild" },
  { name: "Yuzu Rice Lager", brewery: "Ponysaurus", style: "Rice Lager", abv: "4.9%", category: "crisp" },
  { name: "Daylight Pils", brewery: "Resident Culture", style: "German Pils", abv: "5.1%", category: "crisp" },
  { name: "Shadow Theory", brewery: "Fonta Flora", style: "Porter", abv: "6.3%", category: "dark" },
  { name: "Forest Velvet", brewery: "Haw River", style: "Brown Ale", abv: "5.8%", category: "dark" },
  { name: "Rosewater Dream", brewery: "Little Animals", style: "Saison", abv: "5.7%", category: "wild" },
  { name: "Orchard Bloom", brewery: "Botanist & Barrel", style: "Dry Cider", abv: "6.1%", category: "other" },
  { name: "House Red Flight", brewery: "Rotating Selection", style: "Natural Wine", abv: "Varies", category: "other" },
  { name: "Zero Gravity", brewery: "Athletic Brewing", style: "N/A Hoppy", abv: "<0.5%", category: "other" }
];

const tapGrid = document.getElementById("tapGrid");
const heroTapPreview = document.getElementById("heroTapPreview");
const filterButtons = document.querySelectorAll(".chip");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function renderTaps(filter = "all") {
  const taps = filter === "all" ? tapData : tapData.filter((item) => item.category === filter);

  tapGrid.innerHTML = taps
    .map(
      (tap) => `
      <article class="tap-card">
        <p class="tap-style">${tap.style}</p>
        <h3>${tap.name}</h3>
        <p class="tap-meta">${tap.brewery} • ${tap.abv}</p>
      </article>`
    )
    .join("");
}

function renderHeroPreview() {
  heroTapPreview.innerHTML = tapData
    .slice(0, 4)
    .map((tap) => `<li><strong>${tap.name}</strong><br /><small>${tap.style} • ${tap.brewery}</small></li>`)
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    renderTaps(button.dataset.filter);
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

[...document.querySelectorAll(".site-nav a")].forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
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
  { threshold: 0.14 }
);

[...document.querySelectorAll(".reveal")].forEach((el) => revealObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

renderTaps();
renderHeroPreview();
