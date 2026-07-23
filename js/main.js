// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// On-this-page rail: built from the page's own sections, with a table-of-contents
// fallback for article pages (their H2s). Highlights the section you're reading.
(function buildPageRail() {
  const rail = document.getElementById('pageRail');
  if (!rail) return;

  let items = [];
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  if (sections.length >= 2) {
    items = sections.map((sec) => {
      const eyebrow = sec.querySelector('.eyebrow');
      const heading = sec.querySelector('h2, h3');
      const label = (eyebrow && eyebrow.textContent.trim()) ||
                    (heading && heading.textContent.trim()) || sec.id;
      return { id: sec.id, label, el: sec };
    });
  } else {
    const heads = Array.from(document.querySelectorAll('.article-body h2'));
    if (heads.length >= 2) {
      items = heads.map((h, i) => {
        if (!h.id) {
          const slug = h.textContent.trim().toLowerCase()
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          h.id = slug || ('section-' + i);
        }
        return { id: h.id, label: h.textContent.trim(), el: h };
      });
    }
  }

  if (items.length < 2) return; // nothing worth a rail; stays empty and hidden

  const title = document.createElement('p');
  title.className = 'rail-title';
  title.textContent = 'On this page';

  const ul = document.createElement('ul');
  items.forEach((it) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + it.id;
    a.textContent = it.label;
    a.dataset.target = it.id;
    li.appendChild(a);
    ul.appendChild(li);
  });

  rail.appendChild(title);
  rail.appendChild(ul);

  const links = Array.from(rail.querySelectorAll('a'));
  const setActive = (id) => {
    links.forEach((a) => a.classList.toggle('is-active', a.dataset.target === id));
  };

  if ('IntersectionObserver' in window) {
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const current = items.find((it) => visible.has(it.id));
        if (current) setActive(current.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    items.forEach((it) => observer.observe(it.el));
  }

  links.forEach((a) => a.addEventListener('click', () => setActive(a.dataset.target)));
})();

// Reveal-on-scroll, skipped entirely for reduced-motion users
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
