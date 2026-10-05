# Инструкции для Claude Code

---

## RULE: Сборка (Astro)

Пайплайн: `src/**/*.astro` + `src/styles/input.css` → Astro build → `dist/`

**Команды:**
```bash
npm run dev      # Dev-сервер с HMR
npm run build    # Продакшн-сборка в dist/
npm run preview  # Превью продакшн-билда
npm run og       # Пересобрать og-картинки кейсов (после замены cover.jpg)
```

**Структура:**
- `src/components/` — Astro-компоненты (ArticleCard, CardProfile, CornerNav и др.)
- `src/layouts/` — layouts (Base, Article)
- `src/pages/` — страницы (index.astro, articles/*.astro)
- `src/data/articles/` — данные карточек: `<slug>.ts` на кейс, внешние статьи в `index.ts`
- `src/styles/input.css` — исходный Tailwind CSS
- `public/` — статические ассеты (images, videos, js/app.js, CNAME и др.)
- `scripts/build-og-images.mjs` — генератор og.jpg 1200×630 из cover.jpg

**Важно:**
- `dist/` — результат сборки, **не коммитится** (в .gitignore)
- `og.jpg` каждого кейса коммитится: соцсетям нужна картинка 1.91:1, обложки бывают 4:3
- `title` держим ≤60 символов, `description` ≤160 — иначе обрезается в выдаче
- CSS обрабатывается через `@tailwindcss/vite` плагин автоматически
- Деплой через GitHub Actions → GitHub Pages из `dist/`

---

## RULE: SEO и разметка (seo-geo-tools)

- Сайт подключён к тулкиту `C:\Users\Roman\Desktop\seo-geo-tools` как проект `roman-purtow`
  (Вебмастер, IndexNow). Команды CLI запускать из каталога тулкита: `uv run seo-geo ... --project roman-purtow`.
  Изменения в тулките коммитятся и пушатся в его собственный репозиторий.
- `public/it8wtjeZdY9fPUl7uSBc2ptekgUiayVf.txt` — ключ IndexNow, не удалять.
- После деплоя заметных правок: `/seo-geo:publish` (IndexNow и переобход в Яндексе).
- JSON-LD собирается только в `src/data/schema.ts` (Person, WebSite, граф статьи и страницы).
  Узлы связаны через `@id`, поэтому разметку не писать руками в страницах. `sameAs` берётся из `src/data/vcard.ts`.

---

## RULE: Обложки карточек (cover.jpg)

Все обложки ленты «Кейсы и статьи» сгенерированы одной серией. Стиль `scene`: фотореалистичный
натюрморт по теме проекта с устройством, на экране которого интерфейс. Формат 1600×900, 16:9,
без текста. Генерация живёт **не здесь**, а в движке `C:\Users\Roman\Desktop\royal-techno-engine`
(команда `rt previews`, раздел «Обложки карточек» в скилле `royal-techno`).

- Новый кейс: сначала положи в `public/images/articles/<slug>/cover.jpg` скриншот первого
  экрана. Затем через скилл `royal-techno` сделай обложку в стиле серии. `rt previews apply`
  сама заменит `cover.jpg` и запустит `npm run og`.
- Не подкладывай вместо обложки сырой скриншот: он выбьется из серии.
- Исходные скриншоты, на которых построены обложки, лежат в движке в `previews/originals/`.

---

## RULE: Тексты и редактура (redaktura-skills)

В `.claude/skills/` лежит набор redaktura-skills (Сарычева, Архипов; CC BY 4.0) — источник, версия и порядок обновления в `.claude/skills/REDAKTURA-SKILLS.md`.

| Задача | Скилл |
|---|---|
| Голос, словарь, правила площадок | `/redpolitika` → `.agents/redpolitika.md` |
| Статья или лонгрид с нуля | `/statya` |
| Правка готового текста | `/redaktura` |
| Пост в соцсети | `/post` |
| Лендинг, текст о себе, промо | `/promo` |
| Тексты интерфейса | `/ux-copy` |

**Важно:**
- Перед любым текстом читать `.agents/redpolitika.md` — там голос Романа и исключения для площадок (например, блог RuStore).
- В этом репозитории для русских текстов redaktura-skills приоритетнее глобального `baslie-humanizer-ru` — у них пересекаются триггеры.
- Факты, цифры и истории не выдумывать: дыры помечать и спрашивать Романа.
- Каждую текстовку согласовывать с Романом до финала.
- Черновики для внешних площадок — в `drafts/<площадка>/<тема>/` (вне `src/` и `public/`, на сайт не попадают).
- Уже опубликованные статьи сайта не переписываем без отдельной задачи.
