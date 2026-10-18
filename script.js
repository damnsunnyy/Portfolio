(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveals use one observer and remove themselves once their entrance has played.
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.project-card,.principle,.manifesto-main,.contact h2').forEach((el) => reveal.observe(el));

  // Category and technology filters stay in sync across the stack and project grid.
  const filters = [...document.querySelectorAll('.filter-button')];
  const techFilters = [...document.querySelectorAll('.stack-card')];
  const cards = [...document.querySelectorAll('.project-card')];
  const grid = document.querySelector('.project-grid');
  let activeCategory = 'all';
  let activeTech = '';
  const applyFilters = () => {
    filters.forEach((item) => {
      const active = item.dataset.filter === activeCategory;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    techFilters.forEach((item) => item.setAttribute('aria-pressed', String(item.dataset.tech === activeTech)));
    grid.classList.toggle('is-filtered', activeCategory !== 'all' || Boolean(activeTech));
    cards.forEach((card) => {
      const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      const matchesTech = !activeTech || (card.dataset.techs || '').split(',').includes(activeTech);
      const visible = matchesCategory && matchesTech;
      card.hidden = !visible;
      card.classList.toggle('in-view', visible);
    });
  };
  filters.forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    activeTech = '';
    applyFilters();
  }));
  techFilters.forEach((button) => button.addEventListener('click', () => {
    activeTech = activeTech === button.dataset.tech ? '' : button.dataset.tech;
    activeCategory = 'all';
    applyFilters();
  }));

  // Let each technology tile catch the pointer with a soft, bounded 3D tilt.
  techFilters.forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch' || reduceMotion) return;
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      button.style.setProperty('--pointer-x', String(Math.round(x * 100)) + '%');
      button.style.setProperty('--pointer-y', String(Math.round(y * 100)) + '%');
      button.style.setProperty('--tilt-x', ((x - .5) * 3).toFixed(2) + 'deg');
      button.style.setProperty('--tilt-y', ((.5 - y) * 3).toFixed(2) + 'deg');
    });
    const resetPointer = () => {
      button.style.removeProperty('--pointer-x');
      button.style.removeProperty('--pointer-y');
      button.style.removeProperty('--tilt-x');
      button.style.removeProperty('--tilt-y');
    };
    button.addEventListener('pointerleave', resetPointer);
    button.addEventListener('pointercancel', resetPointer);
  });
  window.addEventListener('portfolio-filter-tech', (event) => {
    const tech = event.detail?.tech;
    if (!techFilters.some((button) => button.dataset.tech === tech)) return;
    activeTech = tech;
    activeCategory = 'all';
    applyFilters();
    document.querySelector('#work').scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  });
  window.addEventListener('portfolio-clear-filters', () => {
    activeTech = '';
    activeCategory = 'all';
    applyFilters();
  });


  const progressLine = document.querySelector('.scroll-progress span');
  let scrollQueued = false;
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progressLine.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) { requestAnimationFrame(updateScroll); scrollQueued = true; }
  }, { passive: true });

  const navItems = [...document.querySelectorAll('.main-nav a')];
  const sectionWatcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => item.classList.toggle('nav-active', item.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  navItems.forEach((item) => { const section = document.querySelector(item.hash); if (section) sectionWatcher.observe(section); });

  // In-page navigation gets a gentle, native, reduced-motion-aware glide.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
    });
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();
