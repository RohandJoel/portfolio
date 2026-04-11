function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupTopbar() {
  const topbar = document.getElementById("caseTopbar");
  if (!topbar) return;

  window.addEventListener("scroll", () => {
    topbar.classList.toggle("scrolled", window.scrollY > 12);
  });
}

function setupCustomCursor() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.append(dot);

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const dotPosition = { ...pointer };
  let isVisible = false;

  const animate = () => {
    dotPosition.x += (pointer.x - dotPosition.x) * 0.28;
    dotPosition.y += (pointer.y - dotPosition.y) * 0.28;
    dot.style.left = `${dotPosition.x}px`;
    dot.style.top = `${dotPosition.y}px`;
    requestAnimationFrame(animate);
  };

  const setVisibility = (visible) => {
    if (isVisible === visible) return;
    isVisible = visible;
    document.body.classList.toggle("cursor-ready", visible);
  };

  document.addEventListener("mousemove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    setVisibility(true);
  });

  document.addEventListener("mouseenter", () => setVisibility(true));
  document.addEventListener("mouseleave", () => setVisibility(false));

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  animate();
}

document.addEventListener("DOMContentLoaded", () => {
  setupReveal();
  setupTopbar();
  setupCustomCursor();
});
