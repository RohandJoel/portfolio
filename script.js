// ── PAGE ROUTING ──
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNav(page);
    setTimeout(triggerReveal, 80);
  }
}

function showCase(project) {
  showPage('case-' + project);
}

function updateNav(page) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.page === page) a.classList.add('active');
  });
  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
}

// ── FILTER ──
function filterProjects(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#projects-all .project-card').forEach(card => {
    if (tag === 'all') {
      card.style.display = '';
    } else {
      const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
      card.style.display = tags.includes(tag) ? '' : 'none';
    }
  });
}

// ── SCROLL REVEAL ──
function triggerReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.page.active .reveal').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });
}

// ── STICKY NAV ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── CASE STUDY NAV ──
function setCaseNav(el) {
  document.querySelectorAll('.case-nav-link').forEach(l => l.classList.remove('active'));
  el.classList.add('active');
}

// Highlight case nav on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('.page.active .case-section[id]');
  if (!sections.length) return;
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll('.case-nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

// ── MOBILE MENU ──
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ── CONTACT ──
function handleContact() {
  alert('Thank you! This is a portfolio demo. Please email rohanojoel33@gmail.com directly.');
}

// ── INIT ──
function setupCustomCursor() {
  const supportsCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!supportsCustomCursor) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  document.body.append(ring, dot);

  const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPosition = { ...pointer };
  let isVisible = false;

  const updateCursor = () => {
    ringPosition.x += (pointer.x - ringPosition.x) * 0.18;
    ringPosition.y += (pointer.y - ringPosition.y) * 0.18;

    dot.style.left = `${pointer.x}px`;
    dot.style.top = `${pointer.y}px`;
    ring.style.left = `${ringPosition.x}px`;
    ring.style.top = `${ringPosition.y}px`;

    requestAnimationFrame(updateCursor);
  };

  const setCursorVisibility = (visible) => {
    if (visible === isVisible) return;
    isVisible = visible;
    document.body.classList.toggle('cursor-ready', visible);
  };

  document.addEventListener('mousemove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    setCursorVisibility(true);
  });

  document.addEventListener('mouseleave', () => {
    setCursorVisibility(false);
  });

  document.addEventListener('mouseenter', () => {
    setCursorVisibility(true);
  });

  document.querySelectorAll('a, button, .project-card, .screen-mock, .filter-btn, .nav-logo, .nav-menu, .case-back').forEach((element) => {
    element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.querySelectorAll('input, textarea, select, [contenteditable="true"]').forEach((element) => {
    element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hidden'));
    element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hidden'));
  });

  updateCursor();
}
document.addEventListener('DOMContentLoaded', () => {
  setupCustomCursor();
  triggerReveal();
  // Intercept nav link clicks
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(a.dataset.page);
    });
  });
});

