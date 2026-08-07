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
