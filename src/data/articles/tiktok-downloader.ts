import type { Article } from './_types';

export const tiktokDownloader: Article = {
  id: 'tiktok-downloader',
  slug: 'tiktok-downloader',
  badge: 'case',
  image: '/images/articles/tiktok-downloader/cover.jpg',
  sourceIcon: '/images/favicon.svg',
  sourceName: 'roman-purtow.ru',
  datePublished: '2026-05-16',
  isSimple: true,
  tech: 'Kotlin, Jetpack Compose (Material 3), Android 8.0+, yt-dlp через youtubedl-android, FFmpeg, Python (встроены в APK), Storage Access Framework, Foreground Service, AppMetrica, RuStore',
  siteUrl: 'https://www.rustore.ru/catalog/app/com.baslie.tiktokdownloader',
  siteDisplay: 'TikTok Downloader в RuStore',
  screenshotUrl: '/images/articles/tiktok-downloader/screenshot.jpg',
  ru: {
    title: 'TikTok Downloader — Android-приложение для скачивания видео из TikTok — Роман Пуртов',
    ogTitle: 'TikTok Downloader — Android-приложение для скачивания видео из TikTok',
    description:
      'Выпустил в RuStore Android-приложение TikTok Downloader: скачивает видео без водяных знаков, до Full HD, аудио в MP3. Бесплатно, без рекламы и подписок.',
    ogDescription:
      'Выпустил в RuStore Android-приложение TikTok Downloader: скачивает видео без водяных знаков, до Full HD, аудио в MP3. Бесплатно, без рекламы и подписок.',
    h1: 'TikTok Downloader — Android-приложение для скачивания видео без&nbsp;водяных знаков',
    metaLine: 'Пуртов Роман &middot; 16 мая 2026',
    body: 'Выпустил в&nbsp;RuStore Android-приложение TikTok Downloader. Скачивает видео из&nbsp;тиктока без&nbsp;водяных знаков, в&nbsp;максимальном качестве, а&nbsp;ещё умеет выдёргивать звук в&nbsp;MP3. На&nbsp;РуСторе таких уже десяток с&nbsp;гаком, конкуренция плотная. Только у&nbsp;большинства оценки в&nbsp;районе тройки и&nbsp;сыроватый UX, а&nbsp;хороших по&nbsp;пальцам одной руки. Даже те, что хороши, мне по&nbsp;ощущениям не&nbsp;зашли, так что собрал своё.</p><p>Нативный Android: Kotlin&nbsp;и&nbsp;Jetpack Compose с&nbsp;Material 3. Под&nbsp;капотом упакован yt-dlp, а&nbsp;вместе с&nbsp;ним прямо в&nbsp;APK живут Python&nbsp;и&nbsp;FFmpeg, всё через библиотеку youtubedl-android. Парсер обновляется сам при&nbsp;первом запуске, так что версия приложения не&nbsp;завязана на&nbsp;то, как часто TikTok ломает свой API.</p><p>Папку сохранения пользователь выбирает сам через Storage Access Framework, скачка идёт в&nbsp;фоновом сервисе с&nbsp;видимым уведомлением о&nbsp;прогрессе. Ссылку приложение подхватывает из&nbsp;буфера обмена или из&nbsp;системного «Поделиться». Без&nbsp;рекламы (пока), без&nbsp;подписок, без&nbsp;покупок.</p><p>Следующий на&nbsp;очереди&nbsp;— такой&nbsp;же скачивальщик для&nbsp;соцсети, которую нельзя называть.',
    screenshotAlt: 'Обложка приложения TikTok Downloader',
    dateLabel: '16 мая 2026',
  },
  en: {
    title: 'TikTok Downloader — Android App for Downloading TikTok Videos — Roman Purtov',
    ogTitle: 'TikTok Downloader — Android App for Downloading TikTok Videos',
    description:
      'Shipped TikTok Downloader to RuStore: an Android app that grabs TikTok videos without watermarks, up to Full HD, plus audio as MP3. Free, no ads, no subscriptions.',
    ogDescription:
      'Shipped TikTok Downloader to RuStore: an Android app that grabs TikTok videos without watermarks, up to Full HD, plus audio as MP3. Free, no ads, no subscriptions.',
    h1: 'TikTok Downloader — Android App for Downloading TikTok Videos Without Watermarks',
    metaLine: 'Roman Purtov &middot; May 16, 2026',
    body: 'Shipped TikTok Downloader to&nbsp;RuStore&nbsp;— an&nbsp;Android app that pulls TikTok videos without watermarks, up&nbsp;to&nbsp;Full HD, and can rip the audio as&nbsp;MP3. There are already a&nbsp;dozen-plus apps like this on&nbsp;RuStore, so&nbsp;competition is&nbsp;tight. The catch: most sit around three stars with a&nbsp;half-baked UX, and the actually good ones you can count on&nbsp;one hand. Even those didn&rsquo;t click for me, so&nbsp;I&nbsp;built my&nbsp;own.</p><p>Native Android: Kotlin with Jetpack Compose and Material 3. Under the hood&nbsp;— yt-dlp, and shipped right inside the APK alongside it are Python and FFmpeg, all via the youtubedl-android library. The parser updates itself on&nbsp;first launch, so&nbsp;the app version isn&rsquo;t tied to&nbsp;how often TikTok breaks its API.</p><p>The save folder is&nbsp;picked by&nbsp;the user via the Storage Access Framework; the download runs in&nbsp;a&nbsp;foreground service with a&nbsp;visible progress notification. The app picks up&nbsp;links from the clipboard or&nbsp;from the system &laquo;Share&raquo; sheet. No&nbsp;ads (yet), no&nbsp;subscriptions, no&nbsp;in-app purchases.</p><p>App is&nbsp;only available in&nbsp;RuStore, the Russian Android marketplace. Next up&nbsp;is&nbsp;the same kind of&nbsp;downloader for that other social network you&rsquo;re not allowed to&nbsp;name.',
    screenshotAlt: 'TikTok Downloader app cover',
    dateLabel: 'May 16, 2026',
  },
};
