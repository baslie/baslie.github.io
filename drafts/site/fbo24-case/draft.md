# Кейс: FBO Центр — черновик

## Бриф
- Читатель: потенциальный заказчик на roman-purtow.ru, у которого уже есть свой дизайн и нужен человек, который аккуратно соберёт по нему сайт.
- Полезное действие: увидеть, что дизайн заказчика переносится в код без потерь, а сайт потом обновляется без ручной возни.
- Площадка и формат: карточка-кейс сайта, 2 коротких абзаца (как DHIRA). Технических подробностей о деплое не даём — по просьбе Романа.
- Фактура: репозиторий `fbo24-ru` (README, CLAUDE.md, deploy.yml), история деплоев в GitHub Actions (прогон ~20 секунд).
- Дизайн — Артур, владелец сервиса. Код и шлифовка — Роман.
- Не упоминаем: аккаунт и сервер Beget, получателей заявок, личные контакты.

## Мета

- title: FBO Центр — подготовка грузов для Ozon — Роман Пуртов
- ogTitle: FBO Центр — сайт подготовки грузов для Ozon
- description: Сайт FBO Центра, который готовит грузы для складов Ozon: дизайн владельца сервиса, перенесённый в код до мелочей, и автодеплой на Beget.

## Текст (ru)

Сайт для FBO Центра из Лобни: сервис маркирует, упаковывает и паллетирует товары и везёт поставки на склады Ozon в Москве и области. Дизайн придумал Артур, владелец сервиса, а я перенёс его в код и довёл детали: вёрстка держится на любой ширине от 320 до 1920 пикселей, логотип Ozon в заголовке стоит ровно по средней линии строчных букв, у иконок нет лишних полей.

Сайт живёт на Beget. Правки выходят на него сами: достаточно сохранить изменения в репозитории, и через полминуты они уже на сайте.

## Text (en)

- title: FBO Center — Cargo Prep for Ozon — Roman Purtov
- ogTitle: FBO Center — Website for an Ozon Cargo Prep Service
- description: A website for FBO Center, which prepares cargo for Ozon warehouses: the owner's own design, carried into code down to the details, plus auto-deploy to Beget.

A website for FBO Center from Lobnya: the service labels, packs and palletizes goods and delivers shipments to Ozon warehouses in Moscow and the region. The design is by Artur, the owner of the service; I carried it into code and polished the details: the layout holds at any width from 320 to 1920 pixels, the Ozon logo in the headline sits exactly on the x-height midline, and the icons have no stray padding.

The site is hosted on Beget. Changes go live on their own: once they're saved to the repository, they're on the site within half a minute.
