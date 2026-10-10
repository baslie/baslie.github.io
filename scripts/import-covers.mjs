/**
 * Забирает новые обложки из covers-incoming/ и кладёт их в кейсы как cover.jpg 1600×900.
 *
 * Картинки туда кладёт движок генерации (`rt previews apply`) как есть, в полном
 * размере: ужимать их — дело сайта, у движка своих зависимостей нет. Имя файла —
 * slug кейса (`covers-incoming/<slug>.jpg`). Обработанный файл удаляется.
 *
 * Запуск: npm run covers (затем сам пересобирает og.jpg)
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const INCOMING_DIR = 'covers-incoming';
const ARTICLES_DIR = 'public/images/articles';
const WIDTH = 1600;
const HEIGHT = 900;
const QUALITY = 82;
const IMAGE = /\.(jpe?g|png|webp)$/i;

const files = fs.existsSync(INCOMING_DIR)
  ? fs.readdirSync(INCOMING_DIR).filter((f) => IMAGE.test(f))
  : [];

let imported = 0;
for (const file of files) {
  const slug = path.parse(file).name;
  const dir = path.join(ARTICLES_DIR, slug);
  if (!fs.existsSync(dir)) {
    console.warn(`${slug.padEnd(32)} пропущен: нет папки ${dir}`);
    continue;
  }

  const source = path.join(INCOMING_DIR, file);
  const target = path.join(dir, 'cover.jpg');
  await sharp(source)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(target);
  fs.unlinkSync(source);

  const { size } = fs.statSync(target);
  console.log(`${slug.padEnd(32)} cover.jpg  ${(size / 1024).toFixed(0)} КБ`);
  imported++;
}

console.log(`\nОбложек: ${imported}`);
