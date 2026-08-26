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
    id: 'ai',
    file: 'alexander-khalturin-ai-automation',
    label: 'AI AUTOMATION / PRIMARY',
    role: 'Специалист по AI‑автоматизации бизнес‑процессов / Junior Python Developer',
    promise: 'Превращаю ручной процесс в понятный цифровой контур — от разговора с участниками до тестов, инструкций и приёмки.',
    summary: 'Разбираю процесс вместе с его участниками, фиксирую роли, данные, исключения и критерии результата. Собираю с Python и LLM проверяемый прототип, в котором критические действия остаются под контролем человека, а ошибки видны до передачи пользователям.',
    focus: ['Сбор и формализация требований', 'Процесс → API → данные → QA', 'Human‑in‑the‑loop и fail‑closed', 'Инструкции и передача результата'],
    skills: ['Python', 'FastAPI', 'SQLite', 'API / JSON', 'pytest', 'Playwright', 'LLM / Codex', 'GitHub Actions'],
    projects: [
      {
        title: 'Telegram Store Reconstruction',
        meta: 'AI‑ASSISTED · PUBLIC',
        text: 'Сформулировал требования к полному клиентскому пути: корзина без перезагрузки, раздельные каталог/заказы/профиль, статусы и отслеживание. Принял live‑интерфейс и критические сценарии.',
        proof: 'FastAPI + SQLite · идемпотентный checkout · 33 теста',
      },
      {
        title: 'Операторский MVP 3‑НДФЛ',
        meta: 'AI‑ASSISTED · PRIVATE',
        text: 'Как владелец предметной области задал проверки комплектности и противоречий, privacy‑границы и ручное подтверждение результата; проверил два реальных сценария.',
        proof: 'Fail‑closed document flow · 206 тестов',
      },
      {
        title: '2D CAD Automation',
        meta: 'AI‑ASSISTED · PUBLIC DEMO',
        text: 'Задавал требования к листам, запускал AutoCAD‑контур, сравнивал результат с ожиданиями и отклонял дефектные версии.',
        proof: 'JSON → DXF/DWG → machine QA · 33 теста · 19/19 checks',
      },
    ],
    note: 'Ищу команду, где автоматизация начинается с реального процесса и заканчивается проверяемым внедрением, а не демонстрацией ради демонстрации.',
  },
  {
    id: 'backend',
    file: 'alexander-khalturin-python-backend',
    label: 'PYTHON BACKEND / JUNIOR',
    role: 'Junior Python Backend Developer / Automation Engineer',
    promise: 'Связываю прикладной сценарий, API, данные и тесты — и довожу прототип до воспроизводимого результата.',
    summary: 'Прошёл 252‑часовую профессиональную переподготовку по Python и развиваю backend‑практику на прикладных проектах. Проверяю критические пути, повторные запросы, состояния и ошибки; стремлюсь оставлять после работы понятные команды запуска и диагностику.',
    focus: ['Python и объектная модель', 'Backend‑логика и состояния', 'Валидация, миграции, идемпотентность', 'Unit / integration / browser QA'],
    skills: ['Python', 'FastAPI', 'Pydantic', 'SQLite', 'REST / JSON', 'pytest', 'Playwright', 'Git / CI'],
    projects: [
      {
        title: 'Telegram Store Reconstruction',
        meta: 'AI‑ASSISTED · PUBLIC',
        text: 'Продуктовая постановка и приёмка Mini App с разделением domain/service/repository, Telegram initData HMAC, пользовательской историей заказов и state machine доставки.',
        proof: '33 unit/integration tests · browser QA · console errors: 0',
      },
      {
        title: '2D CAD Automation',
        meta: 'AI‑ASSISTED · PUBLIC DEMO',
        text: 'Практика Python‑конвейера для структурированных данных и файлов: геометрия, DXF/SVG/DWG, отчётность, регрессионные проверки и CI.',
        proof: '33 теста · 19/19 machine‑QA checks · GitHub Actions',
      },
      {
        title: 'Итоговая работа по Python',
        meta: 'УЧЕБНЫЙ ПРОЕКТ · 2025',
        text: 'Защищённая тема профессиональной переподготовки — Telegram‑бот онлайн‑магазина с поддержкой покупок и редактирования карточек товаров.',
        proof: 'Квалификация «Программист» · 252 часа обучения',
      },
    ],
    note: 'Ищу junior‑роль с code review и реальными задачами, где можно усиливать самостоятельную backend‑разработку на базе уже собранной проектной практики.',
  },
  {
    id: 'cad',
    file: 'alexander-khalturin-cad-automation',
    label: 'PYTHON / 2D CAD AUTOMATION',
    role: 'Python / 2D CAD Automation Developer',
    promise: 'Формализую повторяющуюся инженерную работу и превращаю её в воспроизводимый конвейер с машинной и визуальной проверкой.',
    summary: 'Соединяю Python‑автоматизацию с инженерной подготовкой по электроэнергетике. В дипломном контуре участвовал в постановке и приёмке специализированного pipeline для 2D‑листов: данные управляют геометрией, файлы пакетно доходят до DWG, а дефекты фиксируются до выпуска.',
    focus: ['Автоматизация выпуска 2D‑листов', 'Структурированные данные → геометрия', 'Пакетная обработка DXF / DWG', 'Machine QA + визуальная приёмка'],
    skills: ['Python', 'AutoCAD', 'DXF / DWG', 'PowerShell', 'AutoLISP', 'CSV / JSON', 'SVG previews', 'unittest / CI'],
    projects: [
      {
        title: '2D CAD Automation Pipeline',
        meta: 'AI‑ASSISTED · PUBLIC DEMO',
        text: 'Определял состав листов и элементов, запускал AutoCAD‑контур, фиксировал визуальные дефекты и требовал воспроизводимой проверки вместо ручного исправления каждого файла.',
        proof: 'JSON → geometry → DXF/SVG/DWG → QA · 33 теста · 19/19',
      },
      {
        title: 'Электроснабжение жилого комплекса',
        meta: 'ДИПЛОМНЫЙ ПРОЕКТ · 2026',
        text: 'Учебный комплексный проект: расчёты, однолинейные схемы и техническая документация. Именно повторяемость 2D‑листов стала предметом специализированной автоматизации.',
        proof: 'Направление 13.03.02 · AutoCAD · инженерная документация',
      },
      {
        title: 'Telegram Store Reconstruction',
        meta: 'AI‑ASSISTED · PUBLIC',
        text: 'Перенёс тот же подход на цифровой продукт: требования, состояния, API, хранение данных, тесты и пользовательская приёмка.',
        proof: 'FastAPI + SQLite · 33 теста · browser QA',
      },
    ],
    note: 'Ищу инженерную команду, где Python помогает сокращать ручную работу с чертежами и данными, а результат проверяется до передачи проектировщику.',
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
