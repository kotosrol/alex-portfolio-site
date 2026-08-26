const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = $('[data-header]');
const progress = $('[data-scroll-progress]');
const menuToggle = $('[data-menu-toggle]');
const nav = $('[data-nav]');

function closeMenu() {
  nav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const open = !nav?.classList.contains('is-open');
  nav?.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

$$('[data-nav] a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

function updateChrome() {
  header?.classList.toggle('is-scrolled', window.scrollY > 28);
  if (progress) {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = available > 0 ? Math.min(1, window.scrollY / available) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  }
}

updateChrome();
window.addEventListener('scroll', updateChrome, { passive: true });

const revealNodes = $$('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
  revealNodes.forEach((node) => revealObserver.observe(node));
}

const runtimeCopy = {
  requirements: ['Контекст от тех, кто делает работу', 'Собираю текущий процесс у владельца, пользователей и смежных участников; фиксирую боли, ручные шаги и критерии полезного результата.'],
  python: ['Правила превращаются в рабочую логику', 'Роли, состояния, API и данные отражают реальный процесс, поэтому систему можно проверять и развивать без переделки всего контура.'],
  automation: ['Рутина становится управляемым сценарием', 'Повторяющиеся операции, файлы и интеграции проходят один наблюдаемый поток с понятными входами, статусами и результатами.'],
  tests: ['Критические сценарии защищены', 'Проверяю плохие данные, повторные запросы, переходы состояний и сбои — то, что особенно дорого исправлять уже после запуска.'],
  review: ['Команда видит результат до финала', 'Показываю рабочие версии по ходу задачи и собираю обратную связь, пока уточнения можно внести быстро и без дорогой переработки.'],
  handoff: ['Систему можно использовать и поддерживать', 'Готовлю инструкции пользователям, операторские чек‑листы, диагностику, восстановление после сбоев, известные ограничения и план развития.'],
};

function selectRuntimeStep(button) {
  const key = button.dataset.runtimeStep;
  const content = runtimeCopy[key];
  if (!content) return;
  $$('[data-runtime-step]').forEach((node) => {
    const active = node === button;
    node.classList.toggle('is-active', active);
    node.setAttribute('aria-pressed', String(active));
  });
  $('[data-runtime-title]').textContent = content[0];
  $('[data-runtime-copy]').textContent = content[1];
}

$$('[data-runtime-step]').forEach((button) => button.addEventListener('click', () => selectRuntimeStep(button)));

$$('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    $$('[data-filter]').forEach((node) => {
      const active = node === button;
      node.classList.toggle('is-active', active);
      node.setAttribute('aria-pressed', String(active));
    });
    $$('[data-category]').forEach((card) => {
      const categories = (card.dataset.category || '').split(/\s+/);
      const visible = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !visible);
      card.setAttribute('aria-hidden', String(!visible));
    });
  });
});

const navLinks = $$('.site-nav a[href^="#"]');
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window && navSections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });
  navSections.forEach((section) => navObserver.observe(section));
}

if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  const glow = $('[data-cursor-glow]');
  window.addEventListener('pointermove', (event) => {
    if (!glow) return;
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });

  $$('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${y * -2.5}deg) rotateY(${x * 3}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

const counterNodes = $$('[data-counter]');
if (!reducedMotion && 'IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const target = Number(node.dataset.counter);
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const ratio = Math.min(1, (now - start) / duration);
        node.textContent = String(Math.round(target * (1 - ((1 - ratio) ** 3))));
        if (ratio < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(node);
    });
  }, { threshold: 0.8 });
  counterNodes.forEach((node) => counterObserver.observe(node));
}
