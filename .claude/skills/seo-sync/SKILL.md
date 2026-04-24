---
name: seo-sync
description: Синхронизирует public/sitemap.xml, public/robots.txt и public/llms.txt с реальным содержимым сайта. Запускать при добавлении/удалении страниц или статей. Триггеры: «обнови sitemap», «обнови SEO-файлы», «синхронизируй llms.txt», «добавь статью в sitemap», «seo sync», «обнови мета-файлы».
user_invocable: true
---

# SEO Sync — процедура синхронизации SEO-файлов

Синхронизирует `public/sitemap.xml`, `public/robots.txt` и `public/llms.txt` с актуальным содержимым сайта.

**Базовый URL:** `https://roman-purtow.ru`

---

## Шаг 1: Сбор данных

1. Прочитать `src/data/articles.ts` — массив `articles` со всеми статьями (title, href, date, dateISO, sourceName).
2. Просканировать `src/pages/` через glob (`src/pages/**/*.astro`) — определить все существующие страницы.
3. Классифицировать:
   - **Публичные**: `index.astro` + `articles/*.astro`
   - **Скрытые**: `offer/*.astro` + любые другие директории в `src/pages/`, не входящие в `articles/`
4. Прочитать текущий `public/robots.txt` — сохранить существующие Disallow-правила для `/glavred-calls/` и `/helpa-research/` (исторические пути, закрытые по решению пользователя, не имеют соответствующих страниц в `src/pages/`).

---

## Шаг 2: Генерация `public/sitemap.xml`

Перезаписать файл полностью. Формат:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://roman-purtow.ru/</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- Для каждой статьи из src/pages/articles/*.astro -->
  <url>
    <loc>https://roman-purtow.ru/articles/{slug}/</loc>
    <lastmod>YYYY-MM-DD</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

Правила:
- `lastmod` — текущая дата в формате `YYYY-MM-DD`
- Статьи сортировать по имени файла (алфавитно)
- **Не включать** страницы из `offer/` и других скрытых директорий

---

## Шаг 3: Генерация `public/robots.txt`

Перезаписать файл полностью. Формат:

```
User-agent: *
Allow: /
Disallow: /glavred-calls/
Disallow: /helpa-research/
Disallow: /offer/
```

Правила:
- `Disallow:` для каждой скрытой директории в `src/pages/` (всё кроме `articles/`): например `/offer/`
- **Всегда сохранять** исторические Disallow: `/glavred-calls/`, `/helpa-research/`
- Если обнаружены новые скрытые директории (помимо `offer/`), добавить Disallow и для них
- Завершить пустой строкой и строкой `Sitemap: https://roman-purtow.ru/sitemap.xml`

---

## Шаг 4: Обновление `public/llms.txt`

**Не перезаписывать весь файл** — обновить только секцию `## Статьи`.

1. Прочитать `public/llms.txt`.
2. Из `src/data/articles.ts` собрать полный список статей **в порядке массива**.
3. Формат каждой записи:
   - Внешние (href начинается с `https://`): `- [title](href) (date, sourceName)`
   - Внутренние (href начинается с `/`): `- [title](https://roman-purtow.ru{href}) (date, sourceName)`
4. В title заменить `\u00A0` (неразрывный пробел) на обычный пробел.
5. Заменить содержимое от `## Статьи\n\n` до конца файла (или до следующей секции `## `).

---

## Шаг 5: Проверка

1. Запустить `npm run build`.
2. Убедиться, что `dist/sitemap.xml`, `dist/robots.txt`, `dist/llms.txt` существуют и содержат актуальные данные.
3. Сообщить пользователю итог: сколько статей в sitemap, сколько Disallow-правил в robots.txt, сколько записей в llms.txt.

---

## Ключевые файлы

| Файл | Роль |
|---|---|
| `src/data/articles.ts` | Массив всех статей с title, href, date, dateISO, sourceName |
| `src/pages/**/*.astro` | Все страницы сайта (glob-сканирование) |
| `public/sitemap.xml` | Целевой файл — перезаписывается полностью |
| `public/robots.txt` | Целевой файл — перезаписывается полностью |
| `public/llms.txt` | Целевой файл — обновляется только секция «Статьи» |
