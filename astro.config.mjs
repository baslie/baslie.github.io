import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const EXCLUDED_PREFIXES = ['/archive/', '/glavred-calls/', '/helpa-research/'];

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
    '/offer': '/offer/1',
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
        } else if (url.pathname.startsWith('/offer/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (
          url.pathname.startsWith('/articles/') ||
          url.pathname.startsWith('/en/articles/')
        ) {
          item.priority = 0.8;
          item.changefreq = 'yearly';
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
