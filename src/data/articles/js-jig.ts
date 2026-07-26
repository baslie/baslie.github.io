import type { Article } from './_types';

export const jsJig: Article = {
  id: 'js-jig',
  slug: 'js-jig',
  badge: 'case',
  image: '/images/articles/js-jig/cover.jpg',
  sourceIcon: '/images/favicon.svg',
  sourceName: 'roman-purtow.ru',
  datePublished: '2026-07-24',
  isSimple: true,
  tech: 'HTML5, CSS, Vanilla JS, PHP 8.5, Laravel 13, Filament 5, MySQL 8, Ozon Pay (Ozon Acquiring API), Docker, GitHub Actions, Beget',
  siteUrl: 'https://js-jig.ru',
  siteDisplay: 'js-jig.ru',
  screenshotUrl: '/images/articles/js-jig/screenshot.jpg',
  screenshotFramed: true,
  ru: {
    title: 'JS JIG — интернет-магазин производителя рыболовной фурнитуры — Роман Пуртов',
    ogTitle: 'JS JIG — интернет-магазин производителя рыболовной фурнитуры',
    description:
      'Интернет-магазин производителя рыболовной фурнитуры JS JIG из Ростова-на-Дону: витрина без сборки на чистом HTML, CSS и JS, корзина, оплата через Ozon Pay и админка на Laravel + Filament, которая обновляет статику прямо на сервере.',
    ogDescription:
      'Интернет-магазин производителя рыболовной фурнитуры JS JIG из Ростова-на-Дону: витрина без сборки на чистом HTML, CSS и JS, корзина, оплата через Ozon Pay и админка на Laravel + Filament, которая обновляет статику прямо на сервере.',
    h1: 'JS JIG — интернет-магазин производителя рыболовной фурнитуры',
    metaLine: 'Пуртов Роман &middot; 24 июля 2026',
    body: 'Этот проект принёс Сергей Капустин&nbsp;— классный дизайнер, с&nbsp;которым мы легко сработались. Сайт делали для JS&nbsp;JIG, производителя рыболовной фурнитуры из&nbsp;Ростова-на-Дону: джиг-головки Barbarian и&nbsp;«Коготь», грузы штопор и&nbsp;капля. Четыре товара и&nbsp;149&nbsp;вариантов по&nbsp;размерам и&nbsp;весам. Сергей задизайнил магазин и&nbsp;собирался переносить макет на&nbsp;Тильду. Я&nbsp;отговорил: с&nbsp;таким каталогом и&nbsp;онлайн-оплатой конструктор быстро упрётся в&nbsp;потолок. Договорились просто: дизайн его, код мой.\n\nВитрина&nbsp;— чистые HTML, CSS и&nbsp;JavaScript, без&nbsp;сборки и&nbsp;фреймворков. Из&nbsp;макета в&nbsp;код переехали фирменный шрифт Euclid Circular&nbsp;B, вертикальная бегущая строка Jig for Sports вдоль левого края и&nbsp;красные пилюли навигации. Корзина живёт в&nbsp;попапе на&nbsp;нативном &lt;dialog&gt; и&nbsp;хранится в&nbsp;localStorage, поэтому счётчик одинаковый во&nbsp;всех вкладках. Карточка при&nbsp;добавлении улетает в&nbsp;корзину анимацией, но&nbsp;уважает prefers-reduced-motion. Фотографии отдаются в&nbsp;webp с&nbsp;ретина-версиями и&nbsp;фолбэком.\n\nОплата идёт через Ozon Pay Checkout: банковская карта, СБП, Ozon Карта. Готового SDK у&nbsp;Ozon нет, адаптер к&nbsp;эквайринговому API написал с&nbsp;нуля: подписи запросов, вебхуки, чеки. Два правила безопасности зашиты в&nbsp;тесты: сумму заказа считает только сервер по&nbsp;прайсу из&nbsp;базы, а&nbsp;факт оплаты подтверждается только прямым запросом статуса&nbsp;— вебхуку на&nbsp;слово не&nbsp;верим. Чек покупателю выбивает Озон Банк, своя онлайн-касса магазину не&nbsp;нужна. Если вебхук потерялся, планировщик раз в&nbsp;десять минут сам догоняет статусы заказов.\n\nАдминку собрал на&nbsp;Laravel и&nbsp;Filament. Клиент сам правит цены и&nbsp;наличие, переставляет товары перетаскиванием, редактирует тексты страниц, загружает фотографии и&nbsp;выгружает заказы в&nbsp;CSV. Главная архитектурная идея: панель патчит статику прямо на&nbsp;сервере. После кнопки «Обновить витрину» Laravel перегенерирует файл с&nbsp;товарами, а&nbsp;из&nbsp;одного загруженного PNG панель делает сразу три оптимизированных изображения. Посетитель при&nbsp;этом всегда видит быстрые статические страницы, без&nbsp;базы и&nbsp;рендера.\n\nБэкенд писал по&nbsp;TDD: сначала тест, потом код. В&nbsp;итоге 453&nbsp;теста, строк в&nbsp;тестах больше, чем в&nbsp;самом коде. Деплой одной кнопкой из&nbsp;GitHub Actions: прогон тестов в&nbsp;Docker против настоящего MySQL, выгрузка на&nbsp;Beget, смоук-проверки и&nbsp;откат заменой одного файла, если что-то пошло не&nbsp;так. От&nbsp;первого коммита до&nbsp;боевых платежей прошло две недели.',
    screenshotAlt: 'Скриншот главной страницы интернет-магазина JS JIG',
    dateLabel: '24 июля 2026',
  },
  en: {
    title: 'JS JIG — Online Store for a Fishing Tackle Manufacturer — Roman Purtov',
    ogTitle: 'JS JIG — Online Store for a Fishing Tackle Manufacturer',
    description:
      'An online store for JS JIG, a fishing tackle manufacturer from Rostov-on-Don: a no-build HTML/CSS/JS storefront, a cart, Ozon Pay payments, and a Laravel + Filament admin panel that updates the static files right on the server.',
    ogDescription:
      'An online store for JS JIG, a fishing tackle manufacturer from Rostov-on-Don: a no-build HTML/CSS/JS storefront, a cart, Ozon Pay payments, and a Laravel + Filament admin panel that updates the static files right on the server.',
    h1: 'JS JIG — Online Store for a Fishing Tackle Manufacturer',
    metaLine: 'Roman Purtov &middot; July 24, 2026',
    body: 'This project came from Sergey Kapustin&nbsp;— a&nbsp;great designer who is easy to&nbsp;work with. The site is for JS&nbsp;JIG, a&nbsp;fishing tackle manufacturer from Rostov-on-Don: Barbarian and Kogot jig heads, screw-in and quick-release drop weights. Four products and 149&nbsp;size-and-weight variants. Sergey designed the store and was about to&nbsp;move the mockup to&nbsp;Tilda. I&nbsp;talked him out of&nbsp;it: with a&nbsp;catalog like this and online payments, a&nbsp;site builder quickly hits its ceiling. The deal was simple: his design, my&nbsp;code.\n\nThe storefront is plain HTML, CSS, and JavaScript with no&nbsp;build step or&nbsp;frameworks. The brand font Euclid Circular&nbsp;B, the vertical Jig for Sports ticker along the left edge, and the red pill navigation all made it from the mockup into code. The cart lives in&nbsp;a&nbsp;popup built on&nbsp;the native &lt;dialog&gt; element and is stored in&nbsp;localStorage, so&nbsp;the counter stays in&nbsp;sync across tabs. When you add an&nbsp;item, the card flies into the cart with an&nbsp;animation&nbsp;— and respects prefers-reduced-motion. Photos are served as&nbsp;webp with retina versions and a&nbsp;fallback.\n\nPayments run through Ozon Pay Checkout: bank card, SBP instant payments, Ozon Card. Ozon ships no&nbsp;ready-made SDK, so&nbsp;I&nbsp;wrote the acquiring API adapter from scratch: request signatures, webhooks, receipts. Two security rules are baked into the tests: the order total is calculated only by&nbsp;the server from the price list in&nbsp;the database, and a&nbsp;payment counts as&nbsp;confirmed only after a&nbsp;direct status request&nbsp;— the webhook is never taken at&nbsp;its word. Receipts go&nbsp;out from Ozon Bank, so&nbsp;the store needs no&nbsp;online cash register of&nbsp;its own. If a&nbsp;webhook gets lost, a&nbsp;scheduler catches up&nbsp;on&nbsp;order statuses every ten minutes.\n\nThe admin panel runs on&nbsp;Laravel and Filament. The client edits prices and stock, reorders products by&nbsp;dragging, updates page texts, uploads photos, and exports orders to&nbsp;CSV. The key architectural idea: the panel patches the static files right on&nbsp;the server. Hitting “Update storefront” makes Laravel regenerate the products file, and a&nbsp;single uploaded PNG turns into three optimized images. The visitor always gets fast static pages, with no&nbsp;database and no&nbsp;rendering behind them.\n\nI&nbsp;wrote the backend TDD-style: test first, then code. The result is 453&nbsp;tests, with more lines of&nbsp;tests than of&nbsp;production code. Deployment is one button in&nbsp;GitHub Actions: tests run in&nbsp;Docker against a&nbsp;real MySQL, files sync to&nbsp;Beget hosting, smoke checks fire, and rollback is a&nbsp;single file swap if anything goes wrong. It&nbsp;took two weeks from the first commit to&nbsp;live payments.',
    screenshotAlt: 'JS JIG online store home page screenshot',
    dateLabel: 'July 24, 2026',
  },
};
