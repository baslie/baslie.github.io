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
    'site.title': 'Роман Пуртов — маркетолог, дизайнер и веб-разработчик',
    'site.metaDescription':
      'Маркетолог, UX/UI дизайнер и веб-разработчик из Томска. Делаю лендинги и сайты на чистом коде — от дизайна до деплоя',
    'profile.name': 'Роман Пуртов',
    'profile.mainDescription1': `Делаю сайты, мобильные приложения, <a href="https://github.com/baslie" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">сложные IT-системы</a>. В душе — <a href="/articles/berloga" class="inline-link">маркетолог</a> из тайги (Томск, МСК+4).<br><br>Берусь за всё, за что берусь.`,

    'portfolio.title': 'Портфолио',
    'portfolio.description': 'Сайты на Тильде',
    'resume.title': 'Резюме',
    'resume.description': 'Интернет-маркетолог',
    'resume.updated': 'обновлено 05.03.26',

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
    'vc.title': 'Роман Пуртов',
    'vc.description': 'Личный блог на vc.ru',
    'tomskWalk.title': 'Томская Прогулка',
    'tomskWalk.description': 'Гуляем с друзьями и не только',

    'contacts.modalTitle': 'Мои контакты',

    'article.back': 'На главную',
    'articles.heading': 'Кейсы и статьи',
    'badge.article': 'статья',
    'badge.case': 'кейс',
    'tech.label': 'Технологии',
    'copy.tooltip': 'Скопировано!',

    'footer.name': 'Пуртов Роман Григорьевич (самозанятый)',
    'footer.inn': 'ИНН 702406781541',

    'lang.toggleText': 'EN',
    'lang.toggleLabel': 'Switch to English',
    'nav.home': 'На главную',
    'nav.theme': 'Переключить тему',

    '404.title': '404 — Страница не найдена',
    '404.heading': 'Страница не найдена',
    '404.description': 'Такой страницы нет. Вернитесь на главную.',
    '404.back': 'На главную',
  },
  en: {
    'site.title': 'Roman Purtov — Marketer, Designer & Web Developer',
    'site.metaDescription':
      'Marketer, UX/UI Designer and Web Developer from Tomsk. Building landing pages and websites with clean code — from design to deploy',
    'profile.name': 'Roman Purtov',
    'profile.mainDescription1': `I make websites, mobile apps and <a href="https://github.com/baslie" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">complex IT systems</a>. At heart, I'm a <a href="/en/articles/berloga" class="inline-link">marketer</a> from the Siberian taiga (Tomsk, UTC+7).<br><br>I deliver on everything I commit to.`,

    'portfolio.title': 'Portfolio',
    'portfolio.description': 'Tilda websites',
    'resume.title': 'Resume',
    'resume.description': 'Internet Marketer',
    'resume.updated': 'updated 05.03.26',

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
    'vc.title': 'Roman Purtov',
    'vc.description': 'Personal blog on vc.ru',
    'tomskWalk.title': 'Tomsk Walk',
    'tomskWalk.description': 'Walking with friends and more',

    'contacts.modalTitle': 'My Contacts',

    'article.back': 'Back to home',
    'articles.heading': 'Case Studies & Articles',
    'badge.article': 'article',
    'badge.case': 'case',
    'tech.label': 'Technologies',
    'copy.tooltip': 'Copied!',

    'footer.name': 'Roman G. Purtov (self-employed)',
    'footer.inn': 'TIN 702406781541',

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
