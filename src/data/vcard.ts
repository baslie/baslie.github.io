import type { IconName } from './icons';
import type { TranslationKey } from '../i18n/ui';

/** Строка контакта: подпись сверху, значение снизу, кнопка копирования справа. */
export interface VCardContact {
  type: string;
  href: string;
  icon: IconName;
  labelKey: TranslationKey;
  valueKey: TranslationKey;
  /** Что кладём в буфер — без tel:/mailto: */
  copy: string;
}

export interface VCardSocial {
  type: string;
  href: string;
  icon: IconName;
  labelKey: TranslationKey;
}

export interface VCardLink {
  type: string;
  href: string;
  icon: IconName;
  labelKey: TranslationKey;
  /** Показывается при наведении — там, где есть курсор */
  hintKey: TranslationKey;
}

export const vcardContacts: VCardContact[] = [
  {
    type: 'telegram',
    href: 'https://t.me/roman_purtow',
    icon: 'telegram',
    labelKey: 'telegram.title',
    valueKey: 'telegram.description',
    copy: '@roman_purtow',
  },
  {
    type: 'mail',
    href: 'mailto:rytrycon@gmail.com',
    icon: 'mail',
    labelKey: 'email.title',
    valueKey: 'email.description',
    copy: 'rytrycon@gmail.com',
  },
  {
    type: 'phone',
    href: 'tel:+79526797776',
    icon: 'phone',
    labelKey: 'phone.title',
    valueKey: 'phone.description',
    copy: '+7 952 679-77-76',
  },
];

export const vcardSocials: VCardSocial[] = [
  { type: 'github', href: 'https://github.com/baslie', icon: 'github', labelKey: 'github.title' },
  { type: 'youtube', href: 'https://www.youtube.com/@roman-purtow', icon: 'youtube', labelKey: 'youtube.title' },
  { type: 'instagram', href: 'https://instagram.com/roman.purtow', icon: 'instagram', labelKey: 'instagram.title' },
  { type: 'threads', href: 'https://www.threads.com/@roman.purtow', icon: 'threads', labelKey: 'threads.title' },
  { type: 'vk', href: 'https://vk.com/roman_purtow', icon: 'vk', labelKey: 'vk.title' },
  { type: 'max', href: 'https://max.ru/u/f9LHodD0cOLZogeP1J-Ng0ZKPflLiTQQTDGVkS9WbDT82Up2fxhxm9GxuQU', icon: 'max', labelKey: 'max.title' },
];

export const vcardLinks: VCardLink[] = [
  { type: 'portfolio', href: 'https://experts.tilda.cc/roman-purtow', icon: 'portfolio', labelKey: 'link.portfolio', hintKey: 'portfolio.description' },
  {
    type: 'resume',
    href: 'https://drive.google.com/drive/folders/12dIbY-UeM19LdSKmtvPeecExkNq2hgUx?usp=sharing',
    icon: 'resume',
    labelKey: 'link.resume',
    hintKey: 'resume.description',
  },
  { type: 'progulka', href: 'https://vk.com/tomsk_progulka', icon: 'progulka', labelKey: 'link.progulka', hintKey: 'tomskWalk.description' },
  { type: 'blog', href: 'https://t.me/purtochka_live', icon: 'blog', labelKey: 'link.blog', hintKey: 'blog.description' },
];
