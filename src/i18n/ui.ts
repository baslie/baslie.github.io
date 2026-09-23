export const defaultLang = 'ru' as const;
export const locales = ['ru', 'en'] as const;
export type Lang = (typeof locales)[number];

export const languages: Record<Lang, string> = {
  ru: 'Русский',
  en: 'English',
};

export const ogLocale: Record<Lang, string> = {
  ru: 'ru_RU',
  en: 'en_US',
};

export const htmlLang: Record<Lang, string> = {
  ru: 'ru-RU',
  en: 'en-US',
};

export const ui = {
  ru: {
    'site.title': 'Роман\u00A0Пуртов — маркетолог, дизайнер и\u00A0веб-разработчик',
    'site.metaDescription':
      'Маркетолог, UX/UI дизайнер и веб-разработчик из Томска. Делаю лендинги и сайты на чистом коде — от дизайна до деплоя',
    'profile.name': 'Роман\u00A0Пуртов',
    // \u00A0 — неразрывный пробел: предлоги и союзы не остаются висеть в конце строки
    'profile.about': `Делаю сайты, мобильные приложения и\u00A0<a href="https://github.com/baslie" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">сложные IT-системы</a>. В\u00A0душе\u00A0— <a href="/articles/berloga" class="inline-link">маркетолог</a> из\u00A0тайги. Томск, МСК+4.`,
    'profile.joke': 'Берусь за\u00A0всё, за\u00A0что берусь.',

    'vcard.contactsLabel': 'СВЯЗАТЬСЯ',
    'vcard.socialLabel': 'СОЦСЕТИ',
    'vcard.moreLabel': 'ЕЩЁ',
    'link.portfolio': 'Портфолио на\u00A0Тильде',
    'link.resume': 'Резюме',
    'link.progulka': 'Томская Прогулка',
    'link.blog': 'Пурточка вещает',

    'feed.subtitle': '{n} о\u00A0том, что я\u00A0когда-либо делал. Так-то кейсов, конечно, больше 🙂',
    'feed.materials.one': 'материал',
    'feed.materials.few': 'материала',
    'feed.materials.many': 'материалов',
    'filter.label': 'Фильтр материалов',
    'filter.all': 'Все',
    'filter.case': 'Кейсы',
    'filter.article': 'Статьи',
    'filter.status.one': 'Показан {n}\u00A0материал',
    'filter.status.few': 'Показано {n}\u00A0материала',
    'filter.status.many': 'Показано {n}\u00A0материалов',
    'copy.label': 'Скопировать',

    'portfolio.title': 'Портфолио',
    'portfolio.description': 'Сайты на\u00A0Тильде',
    'resume.title': 'Резюме',
    'resume.description': 'Интернет-маркетолог',
    'resume.updated': 'обновлено\u00A005.03.26',

    'phone.title': 'Телефон',
    'phone.description': '+7 952 679-77-76',
    'email.title': 'Почта',
    'email.description': 'rytrycon@gmail.com',
    'telegram.title': 'Telegram',
    'telegram.description': '@roman_purtow',
    'max.title': 'MAX',
    'max.description': '+7 952 679-77-76',
    'threads.title': 'Threads',
    'threads.description': '@roman.purtow',
    'instagram.title': 'Instagram',
    'instagram.description': '@roman.purtow',
    'vk.title': 'ВКонтакте',
    'vk.description': '@roman_purtow',
    'youtube.title': 'YouTube',
    'youtube.description': '@roman-purtow',
    'github.title': 'GitHub',
    'github.description': '@baslie',
    'blog.title': 'Пурточка вещает',
    'blog.description': 'Telegram-канал',
    'tomskWalk.title': 'Томская Прогулка',
    'tomskWalk.description': 'Гуляем с\u00A0друзьями',


    'article.back': 'На\u00A0главную',
    'articles.heading': 'Кейсы и\u00A0статьи',
    'badge.article': 'статья',
    'badge.case': 'кейс',
    'tech.label': 'Технологии',
    'copy.tooltip': 'Скопировано!',

    'footer.name': 'Пуртов Роман Григорьевич (самозанятый)',
    'footer.inn': 'ИНН\u00A0702406781541',

    'lang.toggleText': 'EN',
    'lang.toggleLabel': 'Switch to English',
    'nav.home': 'На\u00A0главную',
    'nav.theme': 'Переключить тему',

    '404.title': '404 — Страница не найдена',
    '404.heading': 'Страница не найдена',
    '404.description': 'Такой страницы нет. Вернитесь на главную.',
    '404.back': 'На главную',
  },
  en: {
    'site.title': 'Roman\u00A0Purtov — Marketer, Designer & Web Developer',
    'site.metaDescription':
      'Marketer, UX/UI Designer and Web Developer from Tomsk. Building landing pages and websites with clean code — from design to deploy',
    'profile.name': 'Roman\u00A0Purtov',
    'profile.about': `I make websites, mobile apps and\u00A0<a href="https://github.com/baslie" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">complex IT systems</a>. At heart, I'm a\u00A0<a href="/en/articles/berloga" class="inline-link">marketer</a> from the Siberian taiga. Tomsk, UTC+7.`,
    'profile.joke': 'I deliver on\u00A0everything I\u00A0commit to.',

    'vcard.contactsLabel': 'GET IN TOUCH',
    'vcard.socialLabel': 'SOCIAL',
    'vcard.moreLabel': 'MORE',
    'link.portfolio': 'Portfolio on\u00A0Tilda',
    'link.resume': 'Resume',
    'link.progulka': 'Tomsk Walk',
    'link.blog': 'Purtochka Speaks',

    'feed.subtitle': '{n} about things I’ve ever done. There are more cases, of course 🙂',
    'feed.materials.one': 'material',
    'feed.materials.few': 'materials',
    'feed.materials.many': 'materials',
    'filter.label': 'Filter materials',
    'filter.all': 'All',
    'filter.case': 'Cases',
    'filter.article': 'Articles',
    'filter.status.one': 'Showing {n}\u00A0material',
    'filter.status.few': 'Showing {n}\u00A0materials',
    'filter.status.many': 'Showing {n}\u00A0materials',
    'copy.label': 'Copy',

    'portfolio.title': 'Portfolio',
    'portfolio.description': 'Tilda websites',
    'resume.title': 'Resume',
    'resume.description': 'Internet Marketer',
    'resume.updated': 'updated\u00A005.03.26',

    'phone.title': 'Phone',
    'phone.description': '+7 952 679-77-76',
    'email.title': 'Email',
    'email.description': 'rytrycon@gmail.com',
    'telegram.title': 'Telegram',
    'telegram.description': '@roman_purtow',
    'max.title': 'MAX',
    'max.description': '+7 952 679-77-76',
    'threads.title': 'Threads',
    'threads.description': '@roman.purtow',
    'instagram.title': 'Instagram',
    'instagram.description': '@roman.purtow',
    'vk.title': 'VK',
    'vk.description': '@roman_purtow',
    'youtube.title': 'YouTube',
    'youtube.description': '@roman-purtow',
    'github.title': 'GitHub',
    'github.description': '@baslie',
    'blog.title': 'Purtochka Speaks',
    'blog.description': 'Telegram Channel',
    'tomskWalk.title': 'Tomsk Walk',
    'tomskWalk.description': 'Walking with friends',


    'article.back': 'Back to home',
    'articles.heading': 'Case Studies & Articles',
    'badge.article': 'article',
    'badge.case': 'case',
    'tech.label': 'Technologies',
    'copy.tooltip': 'Copied!',

    'footer.name': 'Roman G.\u00A0Purtov (self-employed)',
    'footer.inn': 'TIN\u00A0702406781541',

    'lang.toggleText': 'RU',
    'lang.toggleLabel': 'Переключить на русский',
    'nav.home': 'Home',
    'nav.theme': 'Toggle theme',

    '404.title': '404 — Page Not Found',
    '404.heading': 'Page not found',
    '404.description': 'This page does not exist. Return to the home page.',
    '404.back': 'Back to home',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type TranslationKey = keyof (typeof ui)['ru'];
