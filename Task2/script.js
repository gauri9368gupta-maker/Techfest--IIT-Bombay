const loader = document.getElementById("loader");
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hide"), 900));

const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(btn.dataset.scroll)?.scrollIntoView({behavior:"smooth"});
  });
});

const scene = document.getElementById("scene");
const core = document.getElementById("core");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (scene) {
    scene.style.transform = `translateY(calc(-45% + ${Math.min(y * .12, 100)}px)) rotateZ(${y * .015}deg)`;
  }
});

document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(700px) rotateX(${-y*7}deg) rotateY(${x*7}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

const interactive = document.getElementById("interactiveCore");
window.addEventListener("mousemove", e => {
  if (!interactive) return;
  const x = (e.clientX/window.innerWidth-.5)*2;
  const y = (e.clientY/window.innerHeight-.5)*2;
  interactive.style.transform = `translate(${x*18}px,${y*18}px) rotateX(${y*-7}deg) rotateY(${x*9}deg)`;
});

interactive?.addEventListener("click", () => {
  interactive.classList.toggle("charged");
  document.querySelectorAll(".energy").forEach((el,i) => {
    el.style.borderColor = interactive.classList.contains("charged") ? "#c8ff36" : "";
    el.style.animationDuration = interactive.classList.contains("charged") ? `${4+i*1.5}s` : "";
  });
});

document.getElementById("pass").addEventListener("click", e => {
  e.currentTarget.textContent = "PASS RESERVED ✓";
  document.getElementById("success").classList.add("show");
});
