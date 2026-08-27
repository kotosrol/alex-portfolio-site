const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlFiles = [
  'index.html',
  'projects/telegram-store-reconstruction.html',
  'projects/cad-automation-pipeline.html',
  'projects/3ndfl-operator-mvp.html',
  'projects/power-supply-diploma.html',
];
const failures = [];

for (const relativeFile of htmlFiles) {
  const absoluteFile = path.join(root, relativeFile);
  const html = fs.readFileSync(absoluteFile, 'utf8');

  if ((html.match(/<h1\b/gi) || []).length !== 1) failures.push(`${relativeFile}: expected one h1`);
  if ((html.match(/<main\b/gi) || []).length !== 1) failures.push(`${relativeFile}: expected one main`);
  if (!/<html\s+lang="ru"/i.test(html)) failures.push(`${relativeFile}: missing lang=ru`);
  if (!/<meta\s+name="description"/i.test(html)) failures.push(`${relativeFile}: missing description`);
  if (/v=5/.test(html)) failures.push(`${relativeFile}: stale asset cache key`);

  const references = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    if (/^(?:#|https?:|mailto:|tel:|data:)/i.test(reference)) continue;
    const cleanReference = reference.split('#')[0].split('?')[0];
    if (!cleanReference) continue;
    const target = path.resolve(path.dirname(absoluteFile), cleanReference);
    if (!fs.existsSync(target)) failures.push(`${relativeFile}: missing ${reference}`);
  }
}

const main = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const required of [
  'Разработчик систем автоматизации · Python / AI',
  'Превращаю ручные процессы',
  'Разобраться вместе с пользователями',
  'Telegram Store Reconstruction',
  '2D CAD Automation Pipeline',
  'Операторский MVP подготовки 3‑НДФЛ',
]) {
  if (!main.includes(required)) failures.push(`index.html: missing required copy: ${required}`);
}

if (!main.includes('resume/alexander-khalturin-automation-developer.pdf')) {
  failures.push('index.html: missing universal PDF resume link');
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL: ${failure}`));
  process.exit(1);
}

console.log(`OK: ${htmlFiles.length} pages and their local references verified`);
