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
- `src/components/` — Astro-компоненты (BentoCard, CardProfile, CornerNav и др.)
- `src/layouts/` — layouts (Base, Article)
- `src/pages/` — страницы (index.astro, articles/*.astro)
- `src/data/cards.ts` — данные карточек
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
