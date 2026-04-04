const tapData = [
  { name: "Three Birds", brewery: "Burial Beer Co.", style: "Hazy IPA", abv: "7.0%", category: "hoppy" },
  { name: "Post Shift", brewery: "Ponysaurus", style: "West Coast IPA", abv: "6.5%", category: "hoppy" },
  { name: "Clean Slate", brewery: "Resident Culture", style: "Pilsner", abv: "5.1%", category: "crisp" },
  { name: "Crisp Theory", brewery: "Little City", style: "Rice Lager", abv: "4.8%", category: "crisp" },
  { name: "Night Desk", brewery: "Fonta Flora", style: "Porter", abv: "6.2%", category: "dark" },
  { name: "Bookend", brewery: "Haw River", style: "Brown Ale", abv: "5.7%", category: "dark" },
  { name: "Meyer Drift", brewery: "Fun Guys", style: "Sour Ale", abv: "5.2%", category: "wild" },
  { name: "Sunroom Blend", brewery: "Casita", style: "Farmhouse Ale", abv: "6.0%", category: "wild" },
  { name: "Cider Rotation", brewery: "Botanist & Barrel", style: "Dry Cider", abv: "Varies", category: "other" },
  { name: "Glasses of Red", brewery: "Weekly Selection", style: "Natural Wine", abv: "Varies", category: "other" },
  { name: "Trailhead", brewery: "Athletic", style: "N/A IPA", abv: "<0.5%", category: "other" }
];

const tapGrid = document.getElementById("tapGrid");
const filterButtons = document.querySelectorAll(".chip");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

function renderTaps(filter = "all") {
  const taps = filter === "all" ? tapData : tapData.filter((tap) => tap.category === filter);

  tapGrid.innerHTML = taps
    .map(
      (tap) => `
      <article class="tap-card">
        <p class="tap-style">${tap.style}</p>
        <h3>${tap.name}</h3>
        <p class="tap-meta">${tap.brewery} • ${tap.abv}</p>
      </article>
    `
    )
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
  { threshold: 0.12 }
);

[...document.querySelectorAll(".reveal")].forEach((el) => revealObserver.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
renderTaps();
