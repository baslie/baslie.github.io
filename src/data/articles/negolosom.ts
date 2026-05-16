import type { Article } from './_types';

export const negolosom: Article = {
  id: 'negolosom',
  slug: 'negolosom',
  badge: 'case',
  image: '/images/articles/negolosom/cover.jpg',
  sourceIcon: '/images/favicon.svg',
  sourceName: 'roman-purtow.ru',
  datePublished: '2026-04-22',
  isSimple: true,
  tech: 'Expo SDK 54, React Native 0.81 (New Architecture), TypeScript, Zustand, Reanimated v4, sherpa-onnx, GigaAM v3, AppMetrica',
  siteUrl: 'https://negolosom.ru',
  siteDisplay: 'negolosom.ru',
  screenshotUrl: '/images/articles/negolosom/screenshot.jpg',
  ru: {
    title: 'Не пиши голосовое! — мобильное приложение с локальным распознаванием речи — Роман Пуртов',
    ogTitle: 'Не пиши голосовое! — мобильное приложение с локальным распознаванием речи',
    description:
      'За 2 дня собрал и выпустил в RuStore Android-приложение: записывает голосовые и расшифровывает их в текст прямо на телефоне — без облака, без интернета, на русском.',
    ogDescription:
      'За 2 дня собрал и выпустил в RuStore Android-приложение: записывает голосовые и расшифровывает их в текст прямо на телефоне — без облака, без интернета, на русском.',
    h1: 'Не пиши голосовое! — мобильное приложение с локальным распознаванием речи',
    metaLine: 'Пуртов Роман &middot; 22 апреля 2026',
    body: 'За&nbsp;два дня собрал и&nbsp;выпустил в&nbsp;RuStore Android-приложение «Не&nbsp;пиши голосовое!». Наговорил в&nbsp;микрофон, получил расшифровку. Всё прямо на&nbsp;телефоне: ни&nbsp;облака, ни&nbsp;аккаунта, ни&nbsp;интернета. Голосовые часто содержат чувствительные вещи, и&nbsp;отправлять их&nbsp;на&nbsp;чужие серверы — так себе идея.</p><p>Стек такой: Expo SDK&nbsp;54, React Native&nbsp;0.81 с&nbsp;New Architecture, запись в&nbsp;16&nbsp;kHz mono WAV через @siteed/audio-studio, движок sherpa-onnx, модель GigaAM&nbsp;v3 от&nbsp;Сбера (NeMo CTC, INT8). На&nbsp;русском она в&nbsp;2,5&nbsp;раза точнее Whisper-large-v3. Модель скачивается один раз, весит около 320&nbsp;мб, дальше работает офлайн. Длинные записи режу на&nbsp;чанки, всё короче 250&nbsp;мс отбрасываю как шум.</p><p>Интерфейс минимальный: один главный экран со&nbsp;списком заметок и&nbsp;плавающей кнопкой записи. Волнограмма отрисовывается в&nbsp;реальном времени, пульсация и&nbsp;свечение играют в&nbsp;такт громкости, свайп влево удаляет, темы светлая и&nbsp;тёмная.</p><p>Лендинг negolosom.ru собрал на&nbsp;скорую руку: одностраничник с&nbsp;кнопками в&nbsp;RuStore и&nbsp;к&nbsp;контактам.',
    screenshotAlt: 'Лендинг приложения «Не пиши голосовое!»',
    dateLabel: '22 апреля 2026',
  },
  en: {
    title: '«Ne pishi golosovoe!» — Mobile App with On-Device Speech Recognition — Roman Purtov',
    ogTitle: '«Ne pishi golosovoe!» — Mobile App with On-Device Speech Recognition',
    description:
      'Shipped an Android app to RuStore in two days: records voice notes and transcribes them on the device — no cloud, no internet, Russian-language speech.',
    ogDescription:
      'Shipped an Android app to RuStore in two days: records voice notes and transcribes them on the device — no cloud, no internet, Russian-language speech.',
    h1: '«Ne pishi golosovoe!» — Mobile App with On-Device Speech Recognition',
    metaLine: 'Roman Purtov &middot; April 22, 2026',
    body: 'Shipped an&nbsp;Android app «Ne pishi golosovoe!» («Don&rsquo;t send voice notes!») to&nbsp;RuStore in&nbsp;two days. Speak into the mic, get a&nbsp;transcript. All on&nbsp;the device: no&nbsp;cloud, no&nbsp;account, no&nbsp;internet. Voice notes often carry sensitive stuff, and pushing them off to&nbsp;someone else&rsquo;s servers is&nbsp;a&nbsp;bad default.</p><p>The stack: Expo SDK&nbsp;54, React Native&nbsp;0.81 with the New Architecture, 16&nbsp;kHz mono WAV recording via @siteed/audio-studio, sherpa-onnx engine, Sber&rsquo;s GigaAM&nbsp;v3 (NeMo CTC, INT8). On&nbsp;Russian it&rsquo;s about 2.5&times; more accurate than Whisper-large-v3. The model downloads once, weighs around 320&nbsp;MB, then runs offline. I&nbsp;slice long recordings into chunks and drop anything under 250&nbsp;ms as&nbsp;noise.</p><p>The UI is&nbsp;minimal: one main screen with a&nbsp;list of&nbsp;notes and a&nbsp;floating record button. A&nbsp;real-time waveform, pulse and glow animations in&nbsp;sync with loudness, swipe-left deletes, light and dark themes.</p><p>Put the negolosom.ru landing together in&nbsp;a&nbsp;sitting: a&nbsp;one-pager with buttons to&nbsp;RuStore and contacts.',
    screenshotAlt: '«Ne pishi golosovoe!» app landing',
    dateLabel: 'April 22, 2026',
  },
};
