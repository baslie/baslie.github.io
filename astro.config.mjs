import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  redirects: {
    '/offer': '/offer/1',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
