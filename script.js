const projectData = {
  lunacare: {
    kicker: "Health · Conversational UX",
    title: "LunaCare",
    body: "A menstrual wellness experience that reduces cognitive load with guided interaction and soft-friction onboarding.",
    role: "UX Designer & Researcher",
    link: "lunacare-case-study.html",
    outcome: "Built a calmer path into sensitive health information with progressive disclosure and clearer conversation prompts.",
    notes: [
      {
        title: "Problem",
        copy: "Many health apps become clinical too early. LunaCare was framed to feel supportive before it felt technical."
      },
      {
        title: "Design Move",
        copy: "I prioritized guided choices, paced education blocks, and softer language patterns to reduce user hesitation."
      },
      {
        title: "Result",
        copy: "The experience became easier to enter, especially for younger users who found existing products intimidating."
      }
    ]
  },
  femcare: {
    kicker: "Community · Service Design",
    title: "FemCare 2.0",
    body: "A peer-support platform reworked around emotional safety, resource clarity, and navigational simplicity.",
    role: "Lead UX Designer",
    link: "femcare-community-case-study.html",
    outcome: "Restructured the platform so support, education, and participation felt easier to trust and easier to find.",
    notes: [
      {
        title: "Problem",
        copy: "The community experience needed more than content. It needed a safer emotional rhythm and clearer navigation."
      },
      {
        title: "Design Move",
        copy: "I reworked the IA, simplified primary journeys, and designed the interface around reassurance rather than density."
      },
      {
        title: "Result",
        copy: "The platform felt more navigable and more human, with less friction between curiosity and action."
      }
    ]
  },
  grievance: {
    kicker: "Civic Tech · Redesign",
    title: "Grievance Portal",
    body: "A dense government workflow translated into a clearer, step-led, accessible complaint journey.",
    role: "UX Designer",
    link: "",
    outcome: "Turned a complex process into a more legible flow with clearer progress, better sequencing, and stronger accessibility.",
    notes: [
      {
        title: "Problem",
        copy: "The original grievance flow was admin-first, not citizen-first. Users had to decode process logic on their own."
      },
      {
        title: "Design Move",
        copy: "I converted the flow into stepwise chunks, added progress context, and reduced the amount of uncertainty on each screen."
      },
      {
        title: "Result",
        copy: "The redesigned journey felt less punishing and more understandable across devices and user skill levels."
      }
    ]
  }
};

const lensData = {
  research: {
    label: "Research Lens",
    title: "How do users behave when confidence is low?",
    copy: "I map hesitation points, trust breakdowns, and the moments where language needs to do as much work as layout."
  },
  systems: {
    label: "Systems Lens",
    title: "What happens when a service is structurally overwhelming?",
    copy: "I turn dense ecosystems into navigable layers, using sequence, visibility, and component logic to keep users oriented."
  },
  story: {
    label: "Story Lens",
    title: "What should the interface make people feel before it asks them to act?",
    copy: "I use interaction pacing, visual warmth, and microcopy to shape trust before asking for effort or disclosure."
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

  document.querySelectorAll("a, button, .project-tile, .lab-tab").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  document.querySelectorAll("input, textarea").forEach((element) => {
    element.addEventListener("mouseenter", () => document.body.classList.add("cursor-hidden"));
    element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hidden"));
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
    tile.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveProject(tile.dataset.project);
        openCase(tile.dataset.project);
      }
    });
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
