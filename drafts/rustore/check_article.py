"""Проверка статьи для блога RuStore по чек-листу drafts/rustore/REQUIREMENTS.md."""
import re, sys
path = sys.argv[1]
t = open(path, encoding='utf-8').read()
head = re.search(r'<!-- ШАПКА -->(.*?)<!-- /ШАПКА -->', t, re.S).group(1)
body = t.split('<!-- /ШАПКА -->')[1]
title = re.search(r'Тайтл: (.*)', head).group(1).strip()
desc = re.search(r'Дескрипшен: (.*)', head).group(1).strip()
h1 = re.search(r'^# (.*)', body, re.M).group(1).strip()
paras = [p for p in body.split('\n\n') if p.strip()]
intro = next(p for p in paras if not p.startswith('#'))
# «чистый» текст: без разметки, плейсхолдеров картинок и URL
clean = re.sub(r'\[Изображение:[^\n]*\]', '', body)
clean = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', clean)
clean = re.sub(r'^#+ ', '', clean, flags=re.M)
clean = re.sub(r'\n{2,}', '\n', clean).strip()
ok = lambda c: 'OK ' if c else 'FAIL'
print(ok(len(title) <= 70), f'тайтл {len(title)}/70')
print(ok(len(desc) <= 170), f'дескрипшен {len(desc)}/170')
print(ok(title != h1), 'тайтл отличается от названия')
print(ok(desc not in intro), 'дескрипшен отличается от вводки')
print(ok(len(clean) <= 10000), f'объём {len(clean)} знаков с пробелами (обзор ≤10000), без пробелов {len(re.sub(r"\s", "", clean))}')
h2 = re.findall(r'^## (.*)', body, re.M)
sections = [h for h in h2 if 'вопрос' not in h.lower()]
print(ok(len(sections) >= 3), f'разделов {len(sections)}')
faq = body.split('## Часто задаваемые вопросы')[1]
qs = re.split(r'^### ', faq, flags=re.M)[1:]
print(ok(5 <= len(qs) <= 10), f'FAQ вопросов {len(qs)}')
for q in qs:
    name, ans = q.split('\n', 1)
    n = len(ans.strip())
    if n > 500: print('FAIL', f'ответ {n}>500: {name}')
print('     макс. ответ FAQ', max(len(q.split('\n',1)[1].strip()) for q in qs))
links = re.findall(r'\]\((https?://[^)]+)\)', body)
bad = [l for l in links if not l.startswith('https://www.rustore.ru/')]
print(ok(not bad), f'ссылок {len(links)}, внешних {bad}')
ctx = [m for m in re.findall(r'\[([^\]]+)\]\((https?://[^)]+)\)', body) if not m[0].startswith('Скачать')]
print(ok(1 <= len(ctx) <= 3), f'контекстных ссылок {len(ctx)}: ' + '; '.join(f'«{a}» ({len(a.split())} сл.)' for a,_ in ctx))
print(ok('Скачать «Не пиши голосовое!» в RuStore' in body), 'строка «Скачать … в RuStore»')
stop = ['скачайте','установите сейчас','github','apk','negolosom.ru','реклам','лучш','топ ','не имеет аналогов','является','данный','осуществля','это про','тебе','вайбкод','поток','Google Play','App Store']
low = clean.lower()
for w in stop:
    if re.search(r'(?<![а-яё])' + re.escape(w.lower()), low): print('WARN', f'найдено «{w}»')
imgs = re.findall(r'\[Изображение: (\S+)', body)
print(ok(len(imgs) <= 10), f'изображений {len(imgs)}: {imgs}')
