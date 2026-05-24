import type { Article, ArticleCardData } from './_types';
import type { Lang } from '../../i18n/ui';

import { aloemero } from './aloemero';
import { berloga } from './berloga';
import { academyProfmasterstvaWidget } from './academy-profmasterstva-widget';
import { derevyannieGryadki } from './derevyannie-gryadki';
import { ehomestroy } from './ehomestroy';
import { koreaMotors } from './korea-motors';
import { mikeVinogradov } from './mike-vinogradov';
import { negolosom } from './negolosom';
import { nutrilegal } from './nutrilegal';
import { retroznak } from './retroznak';
import { sandwichEhomestroy } from './sandwich-ehomestroy';
import { tiktokDownloader } from './tiktok-downloader';
import { truedogage } from './truedogage';

export type { Article, ArticleI18n, ArticleCardData } from './_types';

export const articles: Article[] = [
  tiktokDownloader,
  aloemero,
  berloga,
  academyProfmasterstvaWidget,
  derevyannieGryadki,
  ehomestroy,
  koreaMotors,
  mikeVinogradov,
  negolosom,
  nutrilegal,
  retroznak,
  sandwichEhomestroy,
  truedogage,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}

export const externalArticleCards: ArticleCardData[] = [
  {
    id: 'voice-to-text-offline',
    badge: 'article',
    image: '/images/articles/voice-to-text-offline/cover.jpg',
    sourceIcon: '/images/vc-icon.svg',
    sourceName: 'vc.ru',
    datePublished: '2026-04-23',
    isExternal: true,
    externalHref:
      'https://vc.ru/life/2882180-oflajn-rasshifrovshchik-golosovykh-soobshcheniy-dlya-android',
    ru: {
      title: 'За 2 дня навайбкодил офлайн-расшифровщик голосовых под Android',
      description: 'Вроде работает. Ниже поделюсь предысторией.',
      dateLabel: '23 апреля 2026',
    },
    en: {
      title: 'Vibe-Coded an Offline Voice Message Transcriber for Android in 2 Days',
      description: 'Seems to work. Below I’ll share the backstory.',
      dateLabel: 'April 23, 2026',
    },
  },
  {
    id: 'autotagmate',
    badge: 'article',
    image: '/images/articles/autotagmate/cover.png',
    sourceIcon: '/images/vc-icon.svg',
    sourceName: 'vc.ru',
    datePublished: '2025-03-02',
    isExternal: true,
    externalHref:
      'https://vc.ru/chatgpt/1841565-rasshirenie-dlya-chrome-dlya-strukturirovaniya-promptov',
    ru: {
      title: 'Расширение для Chrome для структурирования промптов',
      description:
        'Опубликовал AutoTagMate — бесплатное расширение для Chrome для автозакрытия тегов. Удобно использовать в том же ChatGPT, Claude AI и проч., чтобы выделять части промпта отдельными «тегами».',
      dateLabel: '2 марта 2025',
    },
    en: {
      title: 'Chrome Extension for Structuring Prompts',
      description:
        'Published AutoTagMate — a free Chrome extension for auto-closing tags. Handy for ChatGPT, Claude AI, etc., to wrap parts of your prompt in separate "tags".',
      dateLabel: 'March 2, 2025',
    },
  },
  {
    id: 'voice-to-text',
    badge: 'article',
    image: '/images/articles/voice-to-text/cover.jpg',
    sourceIcon: '/images/vc-icon.svg',
    sourceName: 'vc.ru',
    datePublished: '2025-02-19',
    isExternal: true,
    externalHref: 'https://vc.ru/life/1822431-govorite-govorite-ya-vas-vnematochno-sluhayu',
    ru: {
      title: '— Говорите, говорите, я вас внематочно слухаю!',
      description:
        'В коммуникации удобство собеседника важно — факт 100%-й. Поэтому, если мои голосовые в Телеге длятся больше минуты, то перед отправкой собеседнику прогоняю их через нейросеть.',
      dateLabel: '19 февраля 2025',
    },
    en: {
      title: 'Speak, Speak, I’m Listening!',
      description:
        'Convenience matters in communication — 100% fact. So when my voice messages on Telegram go over a minute, I run them through AI before sending. Here’s how.',
      dateLabel: 'February 19, 2025',
    },
  },
];

function articleToCard(article: Article): ArticleCardData {
  return {
    id: article.id,
    badge: article.badge,
    image: article.image,
    sourceIcon: article.sourceIcon,
    sourceName: article.sourceName,
    datePublished: article.datePublished,
    isExternal: false,
    ru: {
      title: article.ru.ogTitle,
      description: article.ru.description,
      dateLabel: article.ru.dateLabel,
    },
    en: {
      title: article.en.ogTitle,
      description: article.en.description,
      dateLabel: article.en.dateLabel,
    },
  };
}

export function getArticleCards(_lang: Lang): ArticleCardData[] {
  const all = [...articles.map(articleToCard), ...externalArticleCards];
  return all.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}
