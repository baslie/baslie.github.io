# Инструкции для Claude Code

---

## RULE: Сборка стилей

Пайплайн: `styles/input.css` → Tailwind CLI → `styles/main.css`

**Команда сборки:**
```bash
npm run build:css
```

**Когда запускать:**
- После любых изменений в `styles/input.css`
- При добавлении или изменении Tailwind-классов в HTML-файлах

**Важно:**
- `styles/main.css` — скомпилированный файл, **нельзя редактировать вручную**
- `main.css` коммитится в git, т.к. GitHub Pages не компилирует стили

