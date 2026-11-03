(function () {
  'use strict';
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const links = Array.from(document.querySelectorAll('[data-section-link]'));
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  function updateButton() {
    if (!button) return;
    const dark = root.getAttribute('data-theme') === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  if (button) {
    updateButton();
    button.addEventListener('click', function () {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('pc-theme', next); } catch (e) {}
      updateButton();
    });
  }

  function setActive(id) {
    links.forEach(function (link) {
      const active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      const visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      setActive(visible[0].target.id);
    }, { rootMargin: '-22% 0px -60% 0px', threshold: 0 });
    sections.forEach(function (section) { observer.observe(section); });
  }
  links.forEach(function (link) {
    link.addEventListener('click', function () { setActive(link.hash.slice(1)); });
  });
})();
