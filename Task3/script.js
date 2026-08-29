const layers = [...document.querySelectorAll("[data-speed]")];
const cursor = document.querySelector(".cursor-glow");

let currentY = window.scrollY;
let targetY = currentY;
let ticking = false;

function animate() {
  currentY += (targetY - currentY) * 0.09;

  layers.forEach(layer => {
    const speed = parseFloat(layer.dataset.speed);
    const rect = layer.parentElement.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = window.innerHeight / 2 - sectionCenter;

    layer.style.transform = `translate3d(0, ${distance * speed}px, 0)`;
  });

  ticking = false;
  requestAnimationFrame(animate);
}

window.addEventListener("scroll", () => {
  targetY = window.scrollY;
  if (!ticking) ticking = true;
});

animate();

window.addEventListener("mousemove", e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll(".round-cta, .primary").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const navLinks = document.querySelectorAll(".nav nav a");
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute("href") === `#${entry.target.id}` ? "var(--accent)" : "";
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => sectionObserver.observe(section));
