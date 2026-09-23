# redaktura-skills (сторонний набор)

Папки `redpolitika`, `redaktura`, `statya`, `post`, `promo`, `ux-copy` — копия набора
[N1arko/redaktura-skills](https://github.com/N1arko/redaktura-skills).

- **Авторы:** Людмила Сарычева ([gladlax.ru](https://gladlax.ru)), Никита Архипов ([niar42.com](https://niar42.com))
- **Лицензия:** CC BY 4.0 — полный текст в `REDAKTURA-SKILLS-LICENSE`
- **Версия:** commit `d1ebaff4fb8b97f939826a1cac284c10303be6f1` (2026-08-10), плагин 0.4.0

Файлы скопированы без изменений. Локальные правки сюда не вносим: настройки голоса
проекта живут в `.agents/redpolitika.md`, а не в скиллах.

## Как обновить

Папки должны лежать рядом: `statya`, `post`, `promo`, `ux-copy` читают
`../redaktura/references/*`.

```bash
git clone https://github.com/N1arko/redaktura-skills.git /tmp/rs
for d in redpolitika redaktura statya post promo ux-copy; do
  rm -rf ".claude/skills/$d" && cp -R "/tmp/rs/$d" .claude/skills/
done
cp /tmp/rs/LICENSE .claude/skills/REDAKTURA-SKILLS-LICENSE
```

После обновления поменять commit-хэш выше.
