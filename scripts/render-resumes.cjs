const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const siteRoot = path.resolve(__dirname, '..');
const resumeDir = path.join(siteRoot, 'resume');
const previewDir = path.resolve(siteRoot, '..', 'outputs', 'resume');
const css = fs.readFileSync(path.join(resumeDir, 'resume.css'), 'utf8');

const contacts = [
  { label: '@kotosrol', href: 'https://t.me/kotosrol', primary: true },
  { label: 'krixkotosrol@gmail.com', href: 'mailto:krixkotosrol@gmail.com' },
  { label: 'github.com/kotosrol', href: 'https://github.com/kotosrol' },
  { label: 'Портфолио', href: 'https://kotosrol.github.io/alex-portfolio-site/' },
  { label: 'Санкт-Петербург · 5/2' },
];

const education = [
  {
    title: 'Программирование на языке Python',
    detail: '<strong>СПбГУАП · 252 часа</strong><br>Квалификация «Программист», 2024–2025',
  },
  {
    title: 'Электроэнергетика и электротехника',
    detail: '<strong>СПбГУАП · бакалавриат</strong><br>Дипломный проект электроснабжения ЖК, 2026',
  },
  {
    title: 'Инженерные достижения',
    detail: 'Победитель зимней школы ИТМО; призёр RoboSchool по 5 трекам, 2026',
  },
];

const experience = [
  {
    title: 'Частная практика',
    meta: '2019 — настоящее время',
    text: 'Работа с клиентами, 3‑НДФЛ, документами и персональными данными: сбор сведений, выявление противоречий, контроль сроков и понятное сопровождение до результата.',
  },
  {
    title: 'Россети Ленэнерго',
    meta: 'Июль — август 2024',
    text: 'Официальная работа электромонтёром по эксплуатации распределительных сетей 2 разряда на подстанции в составе оперативного персонала.',
  },
];

const variants = [
  {
    id: 'universal',
    file: 'alexander-khalturin-automation-developer',
    label: 'AUTOMATION DEVELOPER / PYTHON · AI',
    role: 'Разработчик систем автоматизации',
    promise: 'Превращаю ручные операции и разрозненные требования в проверяемые Python‑инструменты, которыми сможет пользоваться команда.',
    summary: 'Начинаю с процесса: разговариваю с участниками, фиксирую роли, данные, исключения и критерии результата. Затем собираю рабочий контур с Python, API и AI‑инструментами, проверяю критические сценарии и готовлю понятную передачу пользователям. Ищу первую роль в разработке и автоматизации, где важны не только код, но и полезный результат для бизнеса.',
    focus: ['Анализ процесса и требований', 'Python, API и бизнес‑логика', 'Проверка сценариев и данных', 'Внедрение и инструкции'],
    skills: ['Python', 'FastAPI', 'SQLite', 'REST / JSON', 'pytest', 'Playwright', 'LLM / Codex', 'Git / CI'],
    projects: [
      {
        title: 'Telegram Store Reconstruction',
        meta: 'AI‑ASSISTED · PUBLIC',
        text: 'Сформулировал требования к клиентскому пути: корзина без перезагрузки, отдельные каталог, заказы и профиль, понятные статусы и отслеживание. Проверил live‑интерфейс и критические сценарии.',
        proof: 'FastAPI + SQLite · идемпотентный checkout · 33 проверки',
      },
      {
        title: 'Операторский MVP 3‑НДФЛ',
        meta: 'AI‑ASSISTED · PRIVATE',
        text: 'Разложил документный процесс на этапы, задал проверки комплектности и противоречий, границы работы с персональными данными и обязательное ручное подтверждение; проверил два реальных результата.',
        proof: 'Fail‑closed document flow · 206 автоматических проверок',
      },
      {
        title: '2D CAD Automation',
        meta: 'AI‑ASSISTED · PUBLIC DEMO',
        text: 'Формализовал требования к повторяющимся 2D‑листам, запускал AutoCAD‑контур, сравнивал результат с ожиданиями и отклонял дефектные версии.',
        proof: 'JSON → DXF/DWG → machine QA · 33 теста · 19/19 проверок',
      },
    ],
    note: 'Целевые вакансии: разработка внутренних инструментов, автоматизация бизнес‑процессов, техническое внедрение AI и стажёрские задачи системного анализа.',
  },
];

function renderContacts() {
  return contacts.map((contact) => {
    const className = contact.primary ? ' class="primary-contact"' : '';
    if (contact.href) return `<a${className} href="${contact.href}">${contact.label}</a>`;
    return `<span>${contact.label}</span>`;
  }).join('');
}

function renderVariant(variant) {
  const focus = variant.focus.map((item) => `<li>${item}</li>`).join('');
  const skills = variant.skills.map((item) => `<span>${item}</span>`).join('');
  const projects = variant.projects.map((project, index) => `
    <article class="project">
      <span class="project-index">0${index + 1}</span>
      <div>
        <div class="project-head"><h3>${project.title}</h3><span class="project-meta">${project.meta}</span></div>
        <p>${project.text}</p>
        <p class="project-proof">${project.proof}</p>
      </div>
    </article>`).join('');
  const edu = education.map((item) => `<div class="edu-item"><b>${item.title}</b><span>${item.detail}</span></div>`).join('');
  const jobs = experience.map((item) => `<article class="experience-card"><b>${item.title}</b><small>${item.meta}</small><p>${item.text}</p></article>`).join('');

  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Одностраничное резюме Александра Халтурина — ${variant.role}">
  <title>Александр Халтурин — ${variant.role}</title>
  <style>${css}</style>
</head>
<body>
  <main class="resume variant-${variant.id}">
    <header class="resume-head">
      <div class="head-kicker"><span>${variant.label}</span><span>CV / 2026</span></div>
      <div class="head-main">
        <div><h1>Александр<br>Халтурин</h1><p class="role">${variant.role}</p></div>
        <p class="promise">${variant.promise}</p>
      </div>
      <div class="contact-row">${renderContacts()}</div>
    </header>
    <div class="resume-body">
      <aside class="resume-aside">
        <section class="section"><h2 class="section-label">Фокус</h2><ul class="focus-list">${focus}</ul></section>
        <section class="section"><h2 class="section-label">Проектная практика</h2><div class="skill-cloud">${skills}</div></section>
        <section class="section"><h2 class="section-label">Образование</h2>${edu}</section>
        <p class="aside-note"><b>English:</b> Intermediate<br><b>Формат:</b> полная занятость, 5/2<br><b>Город:</b> Санкт‑Петербург</p>
      </aside>
      <div class="resume-main">
        <section class="section"><h2 class="section-label">Профиль</h2><p class="summary">${variant.summary}</p></section>
        <section class="section"><h2 class="section-label">Ключевые проекты</h2><div class="projects">${projects}</div></section>
        <section class="section"><h2 class="section-label">Рабочий контекст</h2><div class="experience-grid">${jobs}</div></section>
        <p class="attribution"><b>Прозрачная атрибуция.</b> Публичные реконструкции выполнены в AI‑assisted контуре: моя роль — предметная постановка, требования, запуск проверок и приёмка результата; реализация Codex не выдаётся за полностью самостоятельный код. ${variant.note}</p>
      </div>
    </div>
    <footer class="resume-footer">kotosrol.github.io/alex-portfolio-site</footer>
  </main>
</body>
</html>`;
}

async function main() {
  fs.mkdirSync(resumeDir, { recursive: true });
  fs.mkdirSync(previewDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const results = [];

  for (const variant of variants) {
    const htmlPath = path.join(resumeDir, `${variant.file}.html`);
    const pdfPath = path.join(resumeDir, `${variant.file}.pdf`);
    const previewPath = path.join(previewDir, `${variant.file}.png`);
    fs.writeFileSync(htmlPath, renderVariant(variant), 'utf8');

    const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
    await page.emulateMedia({ media: 'print' });
    const metrics = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      bodyWidth: document.body.getBoundingClientRect().width,
      bodyHeight: document.body.getBoundingClientRect().height,
      overflow: document.documentElement.scrollHeight > document.body.getBoundingClientRect().height + 1,
    }));
    await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await page.screenshot({ path: previewPath, fullPage: true });
    await page.close();
    results.push({ variant: variant.id, htmlPath, pdfPath, previewPath, metrics });
  }

  await browser.close();
  fs.writeFileSync(path.join(previewDir, 'resume-render-report.json'), `${JSON.stringify(results, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
