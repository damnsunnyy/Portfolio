(() => {
  const intro = document.querySelector('#intro-screen');
  const enter = document.querySelector('#enter-button');
  const counter = document.querySelector('#load-count');
  const cursor = document.querySelector('.custom-cursor');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let loaded = false;

  // A deliberate, skippable opening sequence inspired by the reference's enter transition.
  let count = 0;
  const countTimer = window.setInterval(() => {
    if (!loaded && count < 92) count += Math.ceil((92 - count) / 12) || 1;
    if (loaded && count < 100) count += 2;
    count = Math.min(count, loaded ? 100 : 92);
    counter.textContent = String(count).padStart(3, '0');
    if (count === 100) window.clearInterval(countTimer);
  }, 45);
  window.addEventListener('scene-ready', () => { loaded = true; }, { once: true });
  window.setTimeout(() => { loaded = true; }, 5000);

  enter.addEventListener('click', () => {
    intro.classList.add('intro-out');
    document.body.classList.add('experience-entered');
    window.setTimeout(() => intro.remove(), 1150);
  });

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
  window.addEventListener('portfolio-filter-tech', (event) => {
    const tech = event.detail?.tech;
    if (!techFilters.some((button) => button.dataset.tech === tech)) return;
    activeTech = tech;
    activeCategory = 'all';
    applyFilters();
    document.querySelector('#work').scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  });

  const themeToggle = document.querySelector('#theme-toggle');
  const setTheme = (light) => {
    document.body.classList.toggle('light-theme', light);
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.textContent = light ? '☾' : '☼';
  };
  try { setTheme(localStorage.getItem('portfolio-theme') === 'light'); } catch { setTheme(false); }
  themeToggle?.addEventListener('click', () => {
    const light = !document.body.classList.contains('light-theme');
    setTheme(light);
    try { localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); } catch { /* theme still works for this visit */ }
  });
  cards.forEach((card) => {
    const visual = card.querySelector('.project-visual');
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      visual.style.setProperty('--tiltX', `${x * 8}deg`);
      visual.style.setProperty('--tiltY', `${-y * 8}deg`);
      visual.style.setProperty('--moveX', `${x * 17}px`);
      visual.style.setProperty('--moveY', `${y * 17}px`);
    }, { passive: true });
    card.addEventListener('pointerleave', () => {
      ['--tiltX','--tiltY','--moveX','--moveY'].forEach((property) => visual.style.removeProperty(property));
    }, { passive: true });
  });

  const motionButton = document.querySelector('#motion-toggle');
  motionButton?.addEventListener('click', () => {
    const paused = motionButton.getAttribute('aria-pressed') === 'true';
    motionButton.setAttribute('aria-pressed', String(!paused));
    motionButton.setAttribute('aria-label', paused ? 'Pause 3D animation' : 'Resume 3D animation');
    motionButton.innerHTML = paused ? '<span>Ⅱ</span> MOTION ON' : '<span>▶</span> MOTION PAUSED';
    window.dispatchEvent(new CustomEvent('scene-motion', { detail: { paused: !paused } }));
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

  // Lightweight magnetic cursor and hover label for desktop pointers.
  if (cursor && matchMedia('(pointer:fine)').matches) {
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf;
    const tick = () => {
      x += (tx - x) * .24; y += (ty - y) * .24;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('pointermove', (event) => {
      tx = event.clientX; ty = event.clientY;
      cursor.classList.add('cursor-visible');
      const target = event.target.closest('a,button,[data-cursor]');
      cursor.classList.toggle('cursor-hover', Boolean(target));
      cursor.querySelector('span').textContent = target?.dataset.cursor || '';
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('cursor-visible'));
    window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
  }

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
