# Роман Пуртов — маркетолог и продюсер

<img src="https://baslie.github.io/images/roman.jpg" alt="Роман Пуртов" width="120" height="120" style="border-radius: 50%;" />

Одностраничный сайт, или _«сайт-визитка»_. Здесь представлены ссылки на портфолио, резюме, контакты, социальные сети, блог и проекты — аналог Taplink, но с рядом современных возможностей и динамических функций.

---

## Основные возможности

- **Динамический перевод (RU/EN):**  
  Переключение языков реализовано с помощью JavaScript. Тексты на странице, мета-теги и атрибут `<html lang="...">` обновляются автоматически без изменения URL. Язык по умолчанию определяется настройками браузера.

- **Тёмная/светлая тема:**  
  Удобное переключение между светлым и тёмным режимами с анимацией. Выбранная тема сохраняется в `localStorage` и применяется при последующих посещениях.

- **Динамический фон:**  
  При загрузке сайта происходит обращение к API Unsplash, которое подбирает случайное изображение в жанре «лес, лесные массивы». Это позволяет сделать фон уникальным при каждом посещении.

- **Динамический счётчик дней:**  
  В описании Романа динамически рассчитывается количество дней с определенной даты, что отражает активность по созданию сайтов и написанию кода.

- **Анимации и preload:**  
  Плавное появление карточек (fade-in) и предзагрузка градиентов для эффектного отображения hover-эффектов. Также реализована загрузочная оверлей-анимация для улучшения восприятия при переключениях и загрузке фонового изображения.

- **Адаптивный дизайн:**  
  Сайт корректно отображается на различных устройствах благодаря современным методикам вёрстки и использованию CSS (с элементами Tailwind CSS).

---

## Технологии

- **HTML5** — структурная разметка сайта.
- **CSS3** — стилизация, анимации и адаптивный дизайн (с элементами [Tailwind CSS](https://tailwindcss.com/)).
- **JavaScript** — динамический перевод, переключение темы, загрузочный оверлей, динамический фон, расчёт дней с начала активности, а также интеграция аналитики.
- **Font Awesome** — использование иконок для визуального оформления.
- **Unsplash API** — получение случайного фонового изображения.

---

## Запуск проекта

1. **Клонирование репозитория:**

    ```bash
    git clone https://github.com/baslie/baslie.github.io.git
    ```

2. **Запуск сайта:**

    Перейдите в директорию проекта и откройте файл `index.html` в вашем браузере (можно использовать локальный HTTP-сервер для корректного отображения всех функций).

---

## Дополнительная информация

- **Локальное сохранение настроек:**  
  Выбранный язык и тема сохраняются в `localStorage`, что обеспечивает постоянство настроек между сессиями.

- **SEO-оптимизация:**  
  Помимо обновления мета-тегов при переключении языка, сайт корректно формирует атрибут `lang` для HTML, что способствует лучшей индексации.

- **Производительность:**  
  Реализована предзагрузка градиентов для карточек и оптимизирована загрузка фонового изображения, что улучшает отзывчивость сайта.

---

## Контакты

Если у вас возникли вопросы, предложения или замечания, вы можете связаться со мной:

- **Телефон:** +7 952 679-77-76
- **Почта:** [rytrycon@gmail.com](mailto:rytrycon@gmail.com)
- **Telegram:** [@roman_purtow](https://t.me/roman_purtow)
- **WhatsApp:** [+7 952 679-77-76](https://wa.me/79526797776)
- **Instagram:** [@roman.purtow](https://instagram.com/roman.purtow)
- **ВКонтакте:** [@roman.purtow](https://vk.com/roman.purtow)
- **YouTube:** [@roman-purtow](https://www.youtube.com/@roman-purtow)
- **GitHub:** [@baslie](https://github.com/baslie)
