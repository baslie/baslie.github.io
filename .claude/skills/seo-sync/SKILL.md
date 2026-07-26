---
name: seo-sync
description: Синхронизирует public/llms.txt и public/llms-full.txt со статьями из src/data/articles/. Sitemap руками не редактируется — его генерирует @astrojs/sitemap при сборке. Запускать при добавлении/удалении статей или страниц. Триггеры: «обнови SEO-файлы», «синхронизируй llms.txt», «обнови llms», «seo sync», «обнови мета-файлы», «добавь статью в sitemap».
user_invocable: true
---

# SEO Sync — процедура синхронизации SEO-файлов

Синхронизирует `public/llms.txt` и `public/llms-full.txt` с актуальным списком статей и проверяет, что sitemap и robots.txt не требуют ручных правок.

**Базовый URL:** `https://roman-purtow.ru`

---

## Как устроено SEO в проекте

| Файл | Кто управляет | Правится руками? |
|---|---|---|
| `dist/sitemap-index.xml`, `dist/sitemap-0.xml` | `@astrojs/sitemap` при `npm run build` | Нет. Файла `public/sitemap.xml` не существует — **не создавать** |
| `public/robots.txt` | Статический файл: секция AI-ботов (Allow), `Sitemap: …/sitemap-index.xml` | Только при добавлении нового AI-бота или смене домена. Disallow-правил нет |
| `public/llms.txt` | Секция `## Статьи` — вручную по шагу 2 | Да |
| `public/llms-full.txt` | Секции `## Статьи (полный текст)` и `## Статьи на vc.ru (внешние)` — вручную по шагу 3 | Да |

Источник данных о статьях: `src/data/articles/{slug}.ts`, реестр — `src/data/articles/index.ts` (массив `articles` — внутренние статьи, `externalArticleCards` — внешние публикации на vc.ru). Страницы рендерятся динамическими роутами `src/pages/articles/[slug].astro` и `src/pages/en/articles/[slug].astro` — отдельных `.astro`-файлов на статью нет, поэтому **новая статья попадает в sitemap автоматически**: `astro.config.mjs` импортирует `articles` и проставляет `lastmod` из `dateModified || datePublished`.

Скрытие разделов от индексации делается **исключением из sitemap** через `EXCLUDED_PREFIXES` в `astro.config.mjs` (сейчас: `/archive/`, `/glavred-calls/`, `/helpa-research/`), а не через Disallow в robots.txt.

---

## Шаг 1: Сбор данных

1. Прочитать `src/data/articles/index.ts` — состав `articles` и `externalArticleCards`.
2. Для каждой внутренней статьи из её файла `src/data/articles/{slug}.ts` взять: `slug`, `datePublished`, `siteUrl`, `tech`, `ru.ogTitle`, `ru.description`, `ru.dateLabel`, `ru.body`.

---

## Шаг 2: `public/llms.txt` — секция `## Статьи`

Обновить **только** секцию `## Статьи` (остальной файл не трогать). Одна строка на статью, внутренние и внешние вперемешку, сортировка по `datePublished` по убыванию:

- Внутренние: `- [{ru.ogTitle}](https://roman-purtow.ru/articles/{slug}) ({ru.dateLabel}, roman-purtow.ru)`
- Внешние: `- [{ru.title}](externalHref) ({ru.dateLabel}, vc.ru)`

В заголовках заменить HTML-сущности на обычные символы (`&nbsp;` → пробел, `&mdash;` → «—» и т. п.).

---

## Шаг 3: `public/llms-full.txt`

**Секция `## Статьи (полный текст)`** — блок на каждую внутреннюю статью, разделитель `---`, сортировка по `datePublished` по убыванию:

```
### {ru.ogTitle}

- **URL:** https://roman-purtow.ru/articles/{slug}
- **Дата:** {ru.dateLabel}
- **Описание:** {ru.description}
- **Сайт проекта:** {siteUrl}
- **Технологии:** {tech}

{ru.body обычным текстом: без HTML-сущностей и тегов — `&nbsp;` → пробел, `</p><p>` → новый абзац; допустимо сокращать до одного ёмкого абзаца}
```

**Секция `## Статьи на vc.ru (внешние)`** — в конце файла, короткие блоки: заголовок + URL + дата.

---

## Шаг 4: robots.txt и sitemap — только проверка

1. В `public/robots.txt` ничего не менять (если не добавлялся новый AI-бот и не менялся домен).
2. Если появился новый скрытый раздел — добавить его префикс в `EXCLUDED_PREFIXES` в `astro.config.mjs`.

---

## Шаг 5: Проверка

1. Запустить `npm run build`.
2. Убедиться: `dist/llms.txt` и `dist/llms-full.txt` содержат новые записи, `dist/sitemap-0.xml` содержит URL новых статей (RU и EN версии).
3. Сообщить итог: сколько записей в llms.txt, сколько блоков в llms-full.txt.

---

## Ключевые файлы

| Файл | Роль |
|---|---|
| `src/data/articles/index.ts` | Реестр статей: `articles` + `externalArticleCards` |
| `src/data/articles/{slug}.ts` | Данные одной статьи (мета, тексты RU/EN) |
| `astro.config.mjs` | Конфиг sitemap: `EXCLUDED_PREFIXES`, `lastmod` статей |
| `public/robots.txt` | Статический, ссылается на `sitemap-index.xml` |
| `public/llms.txt` | Обновляется секция «## Статьи» |
| `public/llms-full.txt` | Обновляются секции статей (полный текст + внешние) |
