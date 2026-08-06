# Незавершённый деплой

**Статус: прод отстаёт от `main`.** Коммит `067b700` («Уложить title и description в лимиты выдачи, добавить og-картинки») не выложен на roman-purtow.ru.

Быстрая проверка, выложилось ли: `https://roman-purtow.ru/images/articles/aloemero/og.jpg` — сейчас отдаёт **404**, после успешного деплоя должен отдавать **200**.

## Что делать

```bash
# 1. Убедиться, что Actions и Pages в статусе operational
curl -s https://www.githubstatus.com/api/v2/summary.json

# 2. Запустить деплой
gh workflow run deploy.yml --ref main

# 3. Проследить за раном
gh run watch $(gh run list --workflow=deploy.yml --limit 1 --json databaseId --jq '.[0].databaseId') --exit-status

# 4. Подтвердить на проде
curl -o /dev/null -w '%{http_code}\n' https://roman-purtow.ru/images/articles/aloemero/og.jpg
```

После успешного деплоя этот файл можно удалить. Пока он существует, Claude Code проверяет его в начале каждой сессии — см. правило в `CLAUDE.md`.

## Почему упало (6 августа 2026)

Причина не в коде — инцидент на стороне GitHub. Два открытых инцидента на githubstatus.com:

- «Incident with Pages — Deployment Lag», 15:03 UTC, статус `investigating`
- «Incident with Actions», 15:22 UTC, статус `investigating`

Джоба `build` проходила зелёной (29 с на CI, 1.3 с локально), падала только `deploy`:

- раны `31104932355` и `31107012618` — `deployment_queued` → таймаут 10 минут
- повторный запуск — `Failed to resolve action download info. Error: Service Unavailable`

Исключено как причина: `.github/workflows/deploy.yml` не менялся и корректен, права в workflow выставлены, артефакт вырос незначительно (39.7 → 41 МБ).
