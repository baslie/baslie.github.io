import { defaultLang, ui, type Lang, type TranslationKey } from './ui';

export const SITE = 'https://roman-purtow.ru';

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

function normalizePath(pathname: string): string {
  if (!pathname.startsWith('/')) pathname = '/' + pathname;
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  return pathname;
}

export function getLangFromPath(pathname: string): Lang {
  const p = normalizePath(pathname);
  if (p === '/en' || p.startsWith('/en/')) return 'en';
  return 'ru';
}

export function getAlternateUrl(pathname: string, targetLang: Lang): string {
  const p = normalizePath(pathname);
  const isEn = p === '/en' || p.startsWith('/en/');

  if (targetLang === 'en') {
    if (isEn) return ensureTrailingSlash(p);
    if (p === '/' || p === '') return '/en/';
    return '/en' + p;
  }

  if (!isEn) return p === '' ? '/' : ensureTrailingSlash(p);
  if (p === '/en') return '/';
  return p.replace(/^\/en/, '');
}

function ensureTrailingSlash(p: string): string {
  if (p === '/') return '/';
  return p;
}

export function hasEnglishVersion(pathname: string): boolean {
  const p = normalizePath(pathname);
  if (p === '/') return true;
  if (p.startsWith('/articles/')) return true;
  if (p === '/en' || p.startsWith('/en/')) return true;
  return false;
}

export function absoluteUrl(pathname: string): string {
  const p = pathname.startsWith('/') ? pathname : '/' + pathname;
  return SITE + p;
}

export interface AlternateLinks {
  ru: string;
  en: string;
  xDefault: string;
}

export function getCanonicalAndAlternates(pathname: string): {
  canonical: string;
  alternates: AlternateLinks;
} {
  const ruPath = getAlternateUrl(pathname, 'ru');
  const enPath = getAlternateUrl(pathname, 'en');
  const currentLang = getLangFromPath(pathname);
  const canonicalPath = currentLang === 'en' ? enPath : ruPath;

  return {
    canonical: absoluteUrl(canonicalPath),
    alternates: {
      ru: absoluteUrl(ruPath),
      en: absoluteUrl(enPath),
      xDefault: absoluteUrl(ruPath),
    },
  };
}
