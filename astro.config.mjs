import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const EXCLUDED_PREFIXES = ['/archive/', '/glavred-calls/', '/helpa-research/'];

export default defineConfig({
  site: 'https://roman-purtow.ru',
  redirects: {
    '/offer': '/offer/1',
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page);
        return !EXCLUDED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
      },
      serialize: (item) => {
        const url = new URL(item.url);
        if (url.pathname === '/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else if (url.pathname.startsWith('/offer/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (url.pathname.startsWith('/articles/')) {
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
