import type { Article } from './_types';

export const glazamiSchaefer: Article = {
  id: 'glazami-schaefer',
  slug: 'glazami-schaefer',
  badge: 'case',
  image: '/images/articles/glazami-schaefer/cover.jpg',
  sourceIcon: '/images/favicon.svg',
  sourceName: 'roman-purtow.ru',
  datePublished: '2026-07-05',
  isSimple: true,
  tech: 'HTML5, CSS (дизайн-токены), Vanilla JS, Motion, GLightbox, PHP / PHPMailer, SQLite, Typograf, GitHub Actions, Beget',
  siteUrl: 'https://glazami-schaefer.ru',
  siteDisplay: 'glazami-schaefer.ru',
  screenshotUrl: '/images/articles/glazami-schaefer/screenshot.jpg',
  screenshotFramed: true,
  ru: {
    title: 'Глазами Шефер — сайт бренда оптометриста — Роман Пуртов',
    ogTitle: 'Глазами Шефер — сайт персонального бренда оптометриста',
    description:
      'Сайт персонального бренда оптометриста Татьяны Шефер: лендинг с тремя треками аудитории, биография-лонгрид из девяти глав и PHP-форма заявок.',
    ogDescription:
      'Сайт персонального бренда оптометриста Татьяны Шефер: лендинг с тремя треками аудитории, биография-лонгрид из девяти глав и PHP-форма заявок.',
    h1: 'Глазами Шефер — сайт персонального бренда оптометриста',
    metaLine: 'Пуртов Роман &middot; 5 июля 2026',
    body: 'За&nbsp;плечами Татьяны Шефер шестнадцать лет в&nbsp;оптике: академия Fielmann AG, управление салонами в&nbsp;Гамбурге, обучение сотен коллег по&nbsp;Северной Германии, затем Москва и&nbsp;научный проект «Здоровое зрение». Сегодня она консультирует салоны оптики, специалистов и&nbsp;производства. Для&nbsp;этой практики я&nbsp;собрал сайт персонального бренда: лендинг и&nbsp;биографию-лонгрид.\n\nДизайн собран вокруг идеи немецкой точности. Тёмная зелень, шампань-золото, тонкие линии-разделители как в&nbsp;бухгалтерской книге, острые углы, едва заметное плёночное зерно. Внутри это небольшая дизайн-система: около полусотни CSS-токенов, весь внешний вид меняется в&nbsp;одном месте.\n\nЛендинг сразу спрашивает посетителя, кто он. Владелец салона, оптометрист и&nbsp;производитель уходят в&nbsp;отдельные треки: узнаваемые боли, форматы сотрудничества, кейс с&nbsp;цифрами «было&nbsp;→&nbsp;стало». FAQ отвечает на&nbsp;18 неудобных вопросов, от&nbsp;«звёздной болезни» сотрудников до&nbsp;конкуренции с&nbsp;сетевиками, и&nbsp;продублирован разметкой FAQPage для&nbsp;поисковиков.\n\nБиография&nbsp;— вторая страница, девять глав: от&nbsp;академии Fielmann в&nbsp;старом замке города Плён до&nbsp;золотой медали РАН за&nbsp;программу защиты зрения. Рядом с&nbsp;текстом едет оглавление, внутри глав 11&nbsp;фотографий и&nbsp;врезки с&nbsp;фактами.\n\nРаботали короткими итерациями: Татьяна присылала скриншоты с&nbsp;пометками, я&nbsp;выпускал новую версию. За&nbsp;две недели лендинг прошёл 50&nbsp;итераций, биография ещё&nbsp;14; каждая заморожена в&nbsp;архиве репозитория, а&nbsp;решения записаны в&nbsp;журнале версий.\n\nПод&nbsp;капотом чистые HTML, CSS и&nbsp;JavaScript: ни&nbsp;фреймворков, ни&nbsp;сборки. Заявки принимает PHP-обработчик с&nbsp;ловушкой для&nbsp;ботов, лимитом запросов на&nbsp;SQLite и&nbsp;письмом по&nbsp;SMTP, в&nbsp;которое попадают UTM-метки источника. Под&nbsp;152-ФЗ сделаны страница политики, cookie-плашка и&nbsp;обязательный чекбокс согласия. Деплой&nbsp;— один git push: GitHub Actions собирает рабочий набор и&nbsp;заливает его на&nbsp;хостинг.',
    screenshotAlt: 'Скриншот сайта Глазами Шефер',
    dateLabel: '5 июля 2026',
  },
  en: {
    title: 'Glazami Schaefer — Optometrist Brand Website — Roman Purtov',
    ogTitle: 'Glazami Schaefer — Personal Brand Website for an Optometrist',
    description:
      'A personal-brand site for optometrist Tatyana Schaefer: a landing page with three audience tracks, a nine-chapter longread biography and a PHP form.',
    ogDescription:
      'A personal-brand site for optometrist Tatyana Schaefer: a landing page with three audience tracks, a nine-chapter longread biography and a PHP form.',
    h1: 'Glazami Schaefer — Personal Brand Website for an Optometrist',
    metaLine: 'Roman Purtov &middot; July 5, 2026',
    body: 'Tatyana Schaefer spent sixteen years in&nbsp;optics: the Fielmann AG academy, managing stores in&nbsp;Hamburg, training hundreds of&nbsp;colleagues across Northern Germany, then Moscow and the “Healthy Vision” research project. Today she consults optical stores, eye-care specialists, and manufacturers. For that practice I&nbsp;built a&nbsp;personal-brand site: a&nbsp;landing page and a&nbsp;longread biography.\n\nThe design is built around the idea of&nbsp;German precision. Deep green, champagne gold, thin ledger-style hairlines, sharp corners, a&nbsp;barely visible film grain. Under the hood it is a&nbsp;small design system: about fifty CSS tokens, so the whole look changes in&nbsp;one place.\n\nThe landing page starts by&nbsp;asking the visitor who they are. A&nbsp;store owner, an&nbsp;optometrist, and a&nbsp;manufacturer each get a&nbsp;separate track: familiar pains, formats of&nbsp;cooperation, a&nbsp;before-and-after case with numbers. The FAQ answers 18&nbsp;uncomfortable questions, from staff “star fever” to&nbsp;competing with retail chains, and is mirrored in&nbsp;FAQPage markup for search engines.\n\nThe biography is the second page, nine chapters: from the Fielmann academy in&nbsp;an&nbsp;old castle in&nbsp;Plön to&nbsp;a&nbsp;gold medal of&nbsp;the Russian Academy of&nbsp;Sciences for a&nbsp;vision-protection program. A&nbsp;table of&nbsp;contents travels alongside the text; inside the chapters there are 11&nbsp;photos and fact insets.\n\nWe worked in&nbsp;short iterations: Tatyana sent screenshots with notes, I&nbsp;shipped a&nbsp;new version. In&nbsp;two weeks the landing page went through 50&nbsp;iterations and the biography through 14&nbsp;more; each one is frozen in&nbsp;the repository archive, and the reasoning lives in&nbsp;a&nbsp;version journal.\n\nUnder the hood it’s plain HTML, CSS, and JavaScript: no&nbsp;frameworks, no&nbsp;build step. Submissions go through a&nbsp;PHP handler with a&nbsp;bot trap, an&nbsp;SQLite rate limit, and an&nbsp;SMTP email that carries the visitor’s UTM tags. For the Russian personal-data law there is a&nbsp;policy page, a&nbsp;cookie notice, and a&nbsp;mandatory consent checkbox. Deployment is a&nbsp;single git push: GitHub Actions assembles the production set and syncs it to&nbsp;the hosting.',
    screenshotAlt: 'Glazami Schaefer website screenshot',
    dateLabel: 'July 5, 2026',
  },
};
