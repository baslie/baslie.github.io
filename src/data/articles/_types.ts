export interface ArticleI18n {
  title: string;
  ogTitle: string;
  description: string;
  ogDescription: string;
  h1: string;
  metaLine: string;
  body: string;
  screenshotAlt: string;
  dateLabel: string;
}

export interface Article {
  id: string;
  slug: string;
  badge: 'case' | 'article';
  image: string;
  sourceIcon: string;
  sourceName: string;
  datePublished: string;
  dateModified?: string;
  isSimple: boolean;
  tech?: string;
  siteUrl?: string;
  siteDisplay?: string;
  screenshotUrl?: string;
  ru: ArticleI18n;
  en: ArticleI18n;
}

export interface ArticleCardData {
  id: string;
  badge: 'case' | 'article';
  image: string;
  sourceIcon: string;
  sourceName: string;
  datePublished: string;
  isExternal: boolean;
  externalHref?: string;
  ru: { title: string; description: string; dateLabel: string };
  en: { title: string; description: string; dateLabel: string };
}
