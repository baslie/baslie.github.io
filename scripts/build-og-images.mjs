/**
 * Собирает og.jpg 1200×630 для каждого кейса из его cover.jpg.
 *
 * Обложки у кейсов разных пропорций (от 4:3 до 16:9), а twitter:card заявлен
 * summary_large_image — соцсети режут такую картинку по своему усмотрению.
 * Поэтому обложка вписывается в кадр целиком, а поля заполняются размытой
 * увеличенной версией её же.
 *
 * Запуск: node scripts/build-og-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ARTICLES_DIR = 'public/images/articles';
const DATA_DIR = 'src/data/articles';
const WIDTH = 1200;
const HEIGHT = 630;

// Только папки, за которыми стоит реальный кейс: в public/images/articles
// лежат ещё и остатки от снятых с публикации статей.
const slugs = fs
  .readdirSync(ARTICLES_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter(
    (slug) =>
      fs.existsSync(path.join(ARTICLES_DIR, slug, 'cover.jpg')) &&
      fs.existsSync(path.join(DATA_DIR, `${slug}.ts`)),
  );

let built = 0;
for (const slug of slugs) {
  const cover = path.join(ARTICLES_DIR, slug, 'cover.jpg');
  const target = path.join(ARTICLES_DIR, slug, 'og.jpg');

  // Фон: обложка, растянутая на весь кадр, размытая и притемнённая.
  const background = await sharp(cover)
    .resize(WIDTH, HEIGHT, { fit: 'cover' })
    .blur(40)
    .modulate({ brightness: 0.75 })
    .toBuffer();

  // Передний план: обложка целиком, ничего не обрезается.
  const foreground = await sharp(cover)
    .resize(WIDTH, HEIGHT, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();

  await sharp(background)
    .composite([{ input: foreground, gravity: 'center' }])
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(target);

  const { size } = fs.statSync(target);
  console.log(`${slug.padEnd(32)} og.jpg  ${(size / 1024).toFixed(0)} КБ`);
  built++;
}

console.log(`\nСобрано: ${built}`);
