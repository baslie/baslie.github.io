export interface ArticleData {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  date: string;
  dateISO: string;
  sourceIcon: string;
  sourceName: string;
  badge: 'article' | 'case';
}

export const articles: ArticleData[] = [
  {
    id: 'nutrilegal',
    title: 'Нутрилигал — сайт консалтинговой компании по\u00A0регистрации продукции',
    description: 'Консалтинговая компания, которая помогает с\u00A0государственной регистрацией продукции: БАД, спортивное питание, получение СГР — от\u00A0рецептуры до\u00A0свидетельства.',
    href: '/articles/nutrilegal',
    image: '/images/articles/nutrilegal/cover.jpg',
    date: '28 февраля 2026',
    dateISO: '2026-02-28',
    sourceIcon: '/images/favicon.svg',
    sourceName: 'roman-purtow.ru',
    badge: 'case',
  },
  {
    id: 'sandwich-ehomestroy',
    title: 'ЭкоHomeСтрой — лендинг строительной компании',
    description: 'Лендинг для компании «ЭкоHomeСтрой» — строительство быстровозводимых зданий из\u00A0сэндвич-панелей в\u00A0Москве и\u00A0Московской области.',
    href: '/articles/sandwich-ehomestroy',
    image: '/images/articles/sandwich-ehomestroy/cover.jpg',
    date: '30 декабря 2025',
    dateISO: '2025-12-30',
    sourceIcon: '/images/favicon.svg',
    sourceName: 'roman-purtow.ru',
    badge: 'case',
  },
  {
    id: 'autotagmate',
    title: 'Расширение для Chrome для структурирования промптов',
    description: 'Опубликовал AutoTagMate — бесплатное расширение для Chrome для автозакрытия тегов. Удобно использовать в том же ChatGPT, Claude AI и проч., чтобы выделять части промпта отдельными «тегами».',
    href: 'https://vc.ru/chatgpt/1841565-rasshirenie-dlya-chrome-dlya-strukturirovaniya-promptov',
    image: '/images/articles/autotagmate/cover.png',
    date: '2 марта 2025',
    dateISO: '2025-03-02',
    sourceIcon: '/images/vc-icon.svg',
    sourceName: 'vc.ru',
    badge: 'article',
  },
  {
    id: 'voice-to-text',
    title: '— Говорите, говорите, я вас внематочно слухаю!',
    description: 'В коммуникации удобство собеседника важно — факт 100%-й. Поэтому, если мои голосовые в Телеге длятся больше минуты, то перед отправкой собеседнику прогоняю их через нейросеть. Вот как я это делаю.',
    href: 'https://vc.ru/life/1822431-govorite-govorite-ya-vas-vnematochno-sluhayu',
    image: '/images/articles/voice-to-text/cover.jpg',
    date: '19 февраля 2025',
    dateISO: '2025-02-19',
    sourceIcon: '/images/vc-icon.svg',
    sourceName: 'vc.ru',
    badge: 'article',
  },
  {
    id: 'berloga',
    title: 'Как запускалась «Берлога» и как зарабатывались миллионы?',
    description: 'Речь пойдёт о проекте, идея которого закралась мне в голову несколько лет назад. Сейчас это уже компания с 30 людьми в штате, оборотом 7-12 млн в месяц, выстроенным клиентским сервисом и довольно неплохим ассортиментом премиальных эко-продуктов.',
    href: '/articles/berloga',
    image: '/images/articles/berloga/cover.jpg',
    date: '12 апреля 2022',
    dateISO: '2022-04-12',
    sourceIcon: '/images/favicon.svg',
    sourceName: 'roman-purtow.ru',
    badge: 'case',
  },
];
