const projectData = {
  lunacare: {
    kicker: "Health · Conversational UX",
    title: "LunaCare",
    body: "A calm menstrual health website with learning, tools, and support.",
    role: "UX Designer & Researcher",
    link: "lunacare-case-study.html",
    visuals: [
      "assets/images/lunacare/lunacare-hero.png",
      "assets/images/lunacare/lunacare-chatbot.png",
      "assets/images/lunacare/lunacare-calendar.png"
    ],
    outcome: "Clear learning paths, softer visuals, and easier access to help.",
    notes: [
      { title: "Goal", copy: "Make menstrual health feel easier to learn and less scary to explore." },
      { title: "UX Move", copy: "Use simple paths, visual warmth, and quick support options." },
      { title: "Result", copy: "The product feels calmer and easier to enter." }
    ]
  },
  femcare: {
    kicker: "Community · Service Design",
    title: "FemCare 2.0",
    body: "A safer community space for asking, reading, saving, and sharing.",
    role: "Lead UX Designer",
    link: "femcare-community-case-study.html",
    visuals: [
      "assets/images/community/community-home-hero.png",
      "assets/images/community/community-discussions-top.png",
      "assets/images/community/community-resources.png"
    ],
    outcome: "A warmer and simpler community experience with lower social pressure.",
    notes: [
      { title: "Goal", copy: "Help users ask personal questions with less fear." },
      { title: "UX Move", copy: "Add anonymous posting, clear categories, and side support content." },
      { title: "Result", copy: "The platform feels safer, clearer, and easier to use." }
    ]
  },
  grievance: {
    kicker: "Civic Tech · Redesign",
    title: "Grievance Portal",
    body: "A service flow redesign that made a hard process easier to understand.",
    role: "UX Designer",
    link: "",
    visuals: [],
    outcome: "A complex admin flow became easier to follow.",
    notes: [
      { title: "Goal", copy: "Make a hard public-service flow easier to understand." },
      { title: "UX Move", copy: "Break the journey into smaller, clearer steps." },
      { title: "Result", copy: "Users can move through the process with less confusion." }
    ]
  }
};

const lensData = {
  research: {
    label: "Research Lens",
    title: "What does the user feel here?",
    copy: "I look for fear, doubt, trust, and mental effort."
  },
  systems: {
    label: "Systems Lens",
    title: "How can the flow be simpler?",
    copy: "I break big systems into smaller and clearer steps."
  },
  story: {
    label: "Story Lens",
    title: "How can the product feel more human?",
    copy: "I use tone, pacing, and visuals to make the experience feel safe and easy."
  }
};

function setActiveProject(projectKey) {
  const data = projectData[projectKey];
  if (!data) return;

  document.querySelectorAll(".project-tile").forEach((tile) => {
    tile.classList.toggle("active", tile.dataset.project === projectKey);
  });

  document.getElementById("previewKicker").textContent = data.kicker;
  document.getElementById("previewTitle").textContent = data.title;
  document.getElementById("previewBody").textContent = data.body;
  document.getElementById("previewRole").textContent = data.role;

  const previewPanels = document.querySelectorAll("#previewPanels div");
  previewPanels.forEach((panel, index) => {
    const visual = data.visuals?.[index];
    panel.style.backgroundImage = visual
      ? `linear-gradient(140deg, rgba(24, 21, 18, 0.06), rgba(24, 21, 18, 0.02)), url("${visual}")`
      : "linear-gradient(140deg, rgba(24, 21, 18, 0.06), rgba(24, 21, 18, 0.01)), var(--surface)";
    panel.style.backgroundSize = visual ? "cover" : "";
    panel.style.backgroundPosition = visual ? "center" : "";
  });

  const openProject = document.getElementById("openProject");
  openProject.dataset.project = projectKey;
  openProject.setAttribute("href", data.link || "#");
  openProject.textContent = data.link ? "Read Case Study" : "Open Case Note";
}

function buildCaseNotes(notes) {
  return notes
    .map(
      (note) => `
        <article class="case-note">
          <h3>${note.title}</h3>
          <p>${note.copy}</p>
        </article>
      `
    )
    .join("");
}

function openCase(projectKey) {
  const data = projectData[projectKey];
  const modal = document.getElementById("caseModal");
  if (!data || !modal) return;

  document.getElementById("caseKicker").textContent = data.kicker;
  document.getElementById("caseTitle").textContent = data.title;
  document.getElementById("caseSummary").textContent = data.body;
  document.getElementById("caseRole").textContent = data.role;
  document.getElementById("caseOutcome").textContent = data.outcome;
  document.getElementById("caseNotes").innerHTML = buildCaseNotes(data.notes);

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCase() {
  const modal = document.getElementById("caseModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function setLens(lensKey) {
  const lens = lensData[lensKey];
  if (!lens) return;

  document.querySelectorAll(".lab-tab").forEach((button) => {
    button.classList.toggle("active", button.dataset.lens === lensKey);
  });

  document.getElementById("lensContent").innerHTML = `
    <p class="lab-label">${lens.label}</p>
    <h3>${lens.title}</h3>
    <p>${lens.copy}</p>
  `;
}

function toggleMobileNav() {
  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const isOpen = mobileNav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
}

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
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function setupStickyHeader() {
  const topbar = document.getElementById("topbar");
  window.addEventListener("scroll", () => {
    topbar.classList.toggle("scrolled", window.scrollY > 12);
  });
}

function setupCustomCursor() {
  const supportsCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!supportsCustomCursor) return;

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

  document.querySelectorAll("a, button, .project-tile, .lab-tab, .signal-card, .manifesto-card, .evidence-card, .about-card").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  animate();
}

function setupMagneticButtons() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "";
    });
  });
}

function setupEvents() {
  document.querySelectorAll(".project-tile").forEach((tile) => {
    const handler = () => setActiveProject(tile.dataset.project);
    tile.addEventListener("mouseenter", handler);
    tile.addEventListener("focus", handler);
    tile.addEventListener("click", handler);
  });

  document.getElementById("openProject").addEventListener("click", (event) => {
    const projectKey = event.currentTarget.dataset.project || "lunacare";
    const data = projectData[projectKey];
    if (data?.link) return;
    event.preventDefault();
    openCase(projectKey);
  });

  document.getElementById("closeCase").addEventListener("click", closeCase);
  document.querySelectorAll("[data-close-modal='true']").forEach((element) => {
    element.addEventListener("click", closeCase);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCase();
  });

  document.querySelectorAll(".lab-tab").forEach((button) => {
    button.addEventListener("click", () => setLens(button.dataset.lens));
  });

  document.getElementById("navToggle").addEventListener("click", toggleMobileNav);

  document.querySelectorAll(".mobile-nav a, .desktop-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("mobileNav").classList.remove("open");
      document.getElementById("navToggle").setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveProject("lunacare");
  setLens("research");
  setupReveal();
  setupStickyHeader();
  setupCustomCursor();
  setupMagneticButtons();
  setupEvents();
});
