import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { articles } from './src/data/articles/index';

// /offer/ — рекламная воронка: по прямой ссылке открывается, в поиск не попадает
const EXCLUDED_PREFIXES = ['/archive/', '/glavred-calls/', '/helpa-research/', '/offer/'];

const articleLastmod = new Map(
  articles.map((a) => [a.slug, a.dateModified || a.datePublished]),
);
// Главная — лента кейсов, поэтому она меняется вместе с самым свежим из них
const homeLastmod = [...articleLastmod.values()].sort().at(-1);

export default defineConfig({
  site: 'https://roman-purtow.ru',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  redirects: {
    '/offer': '/offer/1/',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: { ru: 'ru-RU', en: 'en-US' },
      },
      filter: (page) => {
        const url = new URL(page);
        return !EXCLUDED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
      },
      serialize: (item) => {
        const url = new URL(item.url);
        if (url.pathname === '/' || url.pathname === '/en/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
          item.lastmod = homeLastmod;
        } else if (
          url.pathname.startsWith('/articles/') ||
          url.pathname.startsWith('/en/articles/')
        ) {
          item.priority = 0.8;
          item.changefreq = 'yearly';
          const slug = url.pathname.replace(/^\/(en\/)?articles\//, '').replace(/\/$/, '');
          const lastmod = articleLastmod.get(slug);
          if (lastmod) {
            item.lastmod = lastmod;
          }
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
