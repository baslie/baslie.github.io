// Общие узлы Schema.org. Главная, статьи и запасной блок в Base собирают граф
// из одних и тех же кусков, чтобы Person и WebSite не расходились между страницами.
import { SITE } from '../i18n/utils';
import { htmlLang, ui, type Lang } from '../i18n/ui';
import { vcardSocials, vcardLinks, vcardContacts } from './vcard';
import type { Article } from './articles';

export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;
export const PHOTO_ID = `${SITE}/#photo`;

/** Снять теги и раскодировать сущности: внутри ld+json браузер их не раскрывает. */
export function plainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&rsquo;/g, '’')
    .replace(/&hellip;/g, '…')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&')
    .replace(/[\s ]+/g, ' ')
    .trim();
}

/** Дата кейса → ISO 8601 с поясом Томска, иначе краулер толкует её по своему поясу. */
export const isoDate = (d: string) => `${d}T00:00:00+07:00`;

// Профили берём из визитки: что видно на главной, то и связываем с сущностью.
// MAX не берём: ссылка-приглашение, а не публичный профиль.
const sameAs = [
  ...vcardSocials.filter((s) => s.type !== 'max').map((s) => s.href),
  'https://t.me/roman_purtow',
  ...vcardLinks.filter((l) => l.type === 'portfolio').map((l) => l.href),
];

// Почта и телефон видны в визитке на главной — берём оттуда же
const contact = (type: string) => vcardContacts.find((c) => c.type === type)?.copy;

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Роман Пуртов',
    alternateName: 'Roman Purtov',
    url: `${SITE}/`,
    inLanguage: [htmlLang.ru, htmlLang.en],
    publisher: { '@id': PERSON_ID },
  };
}

export function personNode(lang: Lang) {
  const ru = lang === 'ru';
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Роман Пуртов',
    alternateName: 'Roman Purtov',
    url: `${SITE}/`,
    image: {
      '@type': 'ImageObject',
      '@id': PHOTO_ID,
      url: `${SITE}/images/roman.webp`,
      width: 600,
      height: 600,
    },
    jobTitle: ru
      ? 'Маркетолог, UX/UI дизайнер и веб-разработчик'
      : 'Marketer, UX/UI Designer & Web Developer',
    description: ui[lang]['site.metaDescription'],
    knowsAbout: ru
      ? ['Веб-разработка', 'UX/UI дизайн', 'Интернет-маркетинг', 'Agentic Engineering']
      : ['Web development', 'UX/UI design', 'Internet marketing', 'Agentic Engineering'],
    email: contact('mail'),
    telephone: contact('phone'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: ru ? 'Томск' : 'Tomsk',
      addressCountry: 'RU',
    },
    sameAs,
  };
}

/** Граф для страниц без своей разметки: 404, архив, офферы, privacy. */
export function pageGraph(lang: Lang, canonical: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(lang),
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: plainText(title),
        inLanguage: htmlLang[lang],
        isPartOf: { '@id': WEBSITE_ID },
      },
    ],
  };
}

export function homeGraph(lang: Lang, canonical: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: plainText(title),
        inLanguage: htmlLang[lang],
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
        primaryImageOfPage: { '@id': PHOTO_ID },
      },
      personNode(lang),
    ],
  };
}

export function articleGraph(article: Article, lang: Lang, canonical: string) {
  const l = article[lang];
  const cover = `${SITE}${article.image}`;
  // og.jpg собирает scripts/build-og-images.mjs, размер у него всегда 1200×630.
  // У обложек пропорции бывают разные, поэтому размеры им не пишем.
  const og = cover.replace(/\/cover\.jpg$/, '/og.jpg');
  const homePath = lang === 'en' ? '/en/' : '/';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(lang),
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: plainText(l.ogTitle),
        inLanguage: htmlLang[lang],
        isPartOf: { '@id': WEBSITE_ID },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
      },
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: plainText(l.ogTitle),
        description: plainText(l.ogDescription),
        image: [cover, { '@type': 'ImageObject', url: og, width: 1200, height: 630 }],
        url: canonical,
        inLanguage: htmlLang[lang],
        datePublished: isoDate(article.datePublished),
        dateModified: isoDate(article.dateModified || article.datePublished),
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
        mainEntityOfPage: { '@id': `${canonical}#webpage` },
        isPartOf: { '@id': WEBSITE_ID },
        // Что описывает кейс: своё приложение — из данных кейса, иначе сайт клиента
        ...(article.schemaAbout
          ? { about: { ...article.schemaAbout, author: { '@id': PERSON_ID } } }
          : article.siteUrl
            ? { about: { '@type': 'WebSite', name: article.siteDisplay, url: article.siteUrl } }
            : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Главная', item: `${SITE}${homePath}` },
          { '@type': 'ListItem', position: 2, name: plainText(l.h1), item: canonical },
        ],
      },
    ],
  };
}

