# Инструкции для Claude Code

---

## RULE: Сборка (Astro)

Пайплайн: `src/**/*.astro` + `src/styles/input.css` → Astro build → `dist/`

**Команды:**
```bash
npm run dev      # Dev-сервер с HMR
npm run build    # Продакшн-сборка в dist/
npm run preview  # Превью продакшн-билда
```

**Структура:**
- `src/components/` — Astro-компоненты (BentoCard, CardProfile, CornerNav и др.)
- `src/layouts/` — layouts (Base, Article)
- `src/pages/` — страницы (index.astro, articles/*.astro)
- `src/data/cards.ts` — данные карточек
- `src/styles/input.css` — исходный Tailwind CSS
- `public/` — статические ассеты (images, videos, js/app.js, CNAME и др.)

**Важно:**
- `dist/` — результат сборки, **не коммитится** (в .gitignore)
- CSS обрабатывается через `@tailwindcss/vite` плагин автоматически
- Деплой через GitHub Actions → GitHub Pages из `dist/`
