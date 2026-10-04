import type { Article } from './_types';

const siteLinkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`;

const bodyRu = `<p>«Не&nbsp;пиши голосовое!»&nbsp;&mdash; Android-приложение, которое переводит речь в&nbsp;текст прямо на&nbsp;телефоне. Свои надиктовки, присланные голосовые, лекции и&nbsp;даже видео. Интернет нужен один раз, чтобы скачать модель распознавания. Дальше приложение работает без связи, без аккаунта и&nbsp;подписки, а&nbsp;записи не&nbsp;покидают устройство.</p>

<img src="/images/articles/negolosom/screenshot.jpg" alt="Птица-талисман и два экрана приложения «Не пиши голосовое!»: лента заметок с тегами и раскрытая расшифровка" loading="lazy">
<p class="img-caption"><em>Лента заметок с&nbsp;тегами и&nbsp;расшифровка целиком</em></p>

<a class="article-site-link" href="https://negolosom.ru" rel="noopener noreferrer" target="_blank">
    ${siteLinkIcon}
    negolosom.ru
</a>

<h2>Зачем</h2>

<p>Я&nbsp;часто наговариваю себе заметки на&nbsp;прогулках. В&nbsp;лесу рядом с&nbsp;домом связь ловит примерно никак, а&nbsp;мысли приходят как раз там. Раньше записывал их&nbsp;на&nbsp;обычный диктофон и&nbsp;разбирал уже дома. Хотелось, чтобы заметка сразу становилась текстом, причём без интернета. Предыстория&nbsp;&mdash; в&nbsp;<a href="https://vc.ru/life/2882180-oflajn-rasshifrovshchik-golosovykh-soobshcheniy-dlya-android" rel="noopener noreferrer" target="_blank">статье на&nbsp;vc.ru</a>.</p>

<h2>Как устроено</h2>

<p>Речь распознаёт нейросеть на&nbsp;самом телефоне. Русский считает GigaAM&nbsp;v3, открытая модель Сбера: по&nbsp;<a href="https://github.com/salute-developers/GigaAM/blob/main/evaluation.md" rel="nofollow noopener noreferrer" target="_blank">замерам разработчика</a> она в&nbsp;среднем ошибается в&nbsp;8,3&nbsp;% слов. Ещё 15&nbsp;языков&nbsp;&mdash; Whisper small. Приложение занимает 30&nbsp;МБ, модель для русского&nbsp;&mdash; 214&nbsp;МБ. Нужен Android&nbsp;7 или новее.</p>

<p>На&nbsp;главном экране одна красная кнопка: держите и&nbsp;говорите. Чужое голосовое можно переслать в&nbsp;приложение через «Поделиться». Готовый текст копируется, отправляется или сохраняется файлом.</p>

<h2>Как развивалось</h2>

<p>Первую версию собрал за&nbsp;2&nbsp;дня на&nbsp;React Native и&nbsp;в&nbsp;апреле выпустил в&nbsp;RuStore. В&nbsp;мае переписал приложение на&nbsp;нативный Kotlin. После этого записи на&nbsp;<span class="whitespace-nowrap">30&ndash;40&nbsp;минут</span> стали расшифровываться целиком, а&nbsp;распознавание продолжается в&nbsp;фоне.</p>

<p>С&nbsp;тех пор обновление выходит каждые пару недель, всего их&nbsp;18. Добавились импорт аудио и&nbsp;видео, поиск по&nbsp;расшифровкам, теги, запись из&nbsp;«шторки» без открытия приложения, дозапись в&nbsp;ту&nbsp;же заметку, субтитры .srt и&nbsp;выгрузка всех записей ZIP-архивом. На&nbsp;длинных записях приложение ставит распознавание на&nbsp;паузу, пока перегретый телефон остывает.</p>

<h2>Что получилось</h2>

<p>Приложение бесплатное: без подписки и&nbsp;встроенных покупок, разработку окупает один рекламный баннер. В&nbsp;RuStore у&nbsp;него рейтинг 4,9 и&nbsp;больше тысячи скачиваний. Скачать можно в&nbsp;<a href="https://www.rustore.ru/catalog/app/com.baslie.negolosom" rel="noopener noreferrer" target="_blank">RuStore</a>, а&nbsp;тем, у&nbsp;кого его нет,&nbsp;&mdash; <a href="https://github.com/baslie/negolosom-releases/releases/latest/download/negolosom.apk" rel="noopener noreferrer">APK с&nbsp;GitHub</a>.</p>

<p><strong>Технологии:</strong> Kotlin, Jetpack Compose, Material&nbsp;3, Hilt, Room, Kotlin Coroutines, sherpa-onnx&nbsp;1.13.2, GigaAM&nbsp;v3, Whisper small, Silero VAD, AppMetrica&nbsp;8.5.1, Рекламная сеть Яндекса.</p>`;

const bodyEn = `<p>«Ne&nbsp;pishi golosovoe!» («Don&rsquo;t send voice notes!») is&nbsp;an&nbsp;Android app that turns speech into text right on&nbsp;the phone. Your own dictations, voice messages people send you, lectures, even videos. The internet is&nbsp;needed once, to&nbsp;download the speech recognition model. After that the app works offline, with no&nbsp;account and no&nbsp;subscription, and recordings never leave the device.</p>

<img src="/images/articles/negolosom/screenshot.jpg" alt="The bird mascot and two screens of the «Ne pishi golosovoe!» app: a tagged notes feed and an open transcript" loading="lazy">
<p class="img-caption"><em>A&nbsp;tagged notes feed and a&nbsp;full transcript</em></p>

<a class="article-site-link" href="https://negolosom.ru" rel="noopener noreferrer" target="_blank">
    ${siteLinkIcon}
    negolosom.ru
</a>

<h2>Why</h2>

<p>I&nbsp;often dictate notes to&nbsp;myself on&nbsp;walks. In&nbsp;the forest near my&nbsp;home there&rsquo;s next to&nbsp;no&nbsp;signal, and that&rsquo;s exactly where ideas show up. I&nbsp;used to&nbsp;record them on&nbsp;a&nbsp;regular voice recorder and sort through them at&nbsp;home. I&nbsp;wanted a&nbsp;note to&nbsp;become text straight away, and without the internet. The backstory is&nbsp;in&nbsp;<a href="https://vc.ru/life/2882180-oflajn-rasshifrovshchik-golosovykh-soobshcheniy-dlya-android" rel="noopener noreferrer" target="_blank">my&nbsp;article on&nbsp;vc.ru</a> (in&nbsp;Russian).</p>

<h2>How it&nbsp;works</h2>

<p>A&nbsp;neural network recognises speech on&nbsp;the phone itself. Russian is&nbsp;handled by&nbsp;GigaAM&nbsp;v3, an&nbsp;open model from Sber: according to&nbsp;the <a href="https://github.com/salute-developers/GigaAM/blob/main/evaluation.md" rel="nofollow noopener noreferrer" target="_blank">developer&rsquo;s benchmarks</a>, it&nbsp;gets 8.3% of&nbsp;words wrong on&nbsp;average. Another 15&nbsp;languages run on&nbsp;Whisper small. The app takes 30&nbsp;MB, the Russian model another 214&nbsp;MB. Android&nbsp;7 or&nbsp;newer is&nbsp;required.</p>

<p>The main screen has a&nbsp;single red button: hold it&nbsp;and speak. A&nbsp;voice message from a&nbsp;messenger can be&nbsp;sent to&nbsp;the app via «Share». The finished text can be&nbsp;copied, shared, or&nbsp;saved as&nbsp;a&nbsp;file.</p>

<h2>How it&nbsp;evolved</h2>

<p>I&nbsp;built the first version in&nbsp;2&nbsp;days on&nbsp;React Native and released it&nbsp;on&nbsp;RuStore in&nbsp;April. In&nbsp;May I&nbsp;rewrote the app in&nbsp;native Kotlin. After that, <span class="whitespace-nowrap">30&ndash;40&nbsp;minute</span> recordings started getting transcribed in&nbsp;full, and recognition keeps running in&nbsp;the background.</p>

<p>Since then an&nbsp;update ships every couple of&nbsp;weeks, 18&nbsp;so&nbsp;far. They added audio and video import, search across transcripts, tags, recording from the quick settings panel without opening the app, appending to&nbsp;an&nbsp;existing note, .srt subtitles, and exporting all recordings as&nbsp;a&nbsp;ZIP archive. On&nbsp;long recordings the app pauses recognition while an&nbsp;overheated phone cools down.</p>

<h2>The result</h2>

<p>The app is&nbsp;free: no&nbsp;subscription and no&nbsp;in-app purchases, development is&nbsp;covered by&nbsp;a&nbsp;single ad&nbsp;banner. On&nbsp;RuStore it&nbsp;has a&nbsp;4.9 rating and over a&nbsp;thousand downloads. You can get it&nbsp;on&nbsp;<a href="https://www.rustore.ru/catalog/app/com.baslie.negolosom" rel="noopener noreferrer" target="_blank">RuStore</a>, or, if&nbsp;you don&rsquo;t have it, as&nbsp;an&nbsp;<a href="https://github.com/baslie/negolosom-releases/releases/latest/download/negolosom.apk" rel="noopener noreferrer">APK from GitHub</a>.</p>

<p><strong>Tech:</strong> Kotlin, Jetpack Compose, Material&nbsp;3, Hilt, Room, Kotlin Coroutines, sherpa-onnx&nbsp;1.13.2, GigaAM&nbsp;v3, Whisper small, Silero VAD, AppMetrica&nbsp;8.5.1, Yandex Advertising Network.</p>`;

export const negolosom: Article = {
  id: 'negolosom',
  slug: 'negolosom',
  badge: 'case',
  image: '/images/articles/negolosom/cover.jpg',
  sourceIcon: '/images/favicon.svg',
  sourceName: 'roman-purtow.ru',
  datePublished: '2026-04-22',
  dateModified: '2026-10-04',
  isSimple: false,
  tech: 'Kotlin, Jetpack Compose, Material 3, Hilt, Room, Kotlin Coroutines, sherpa-onnx 1.13.2, GigaAM v3, Whisper small, Silero VAD, AppMetrica 8.5.1, Рекламная сеть Яндекса',
  siteUrl: 'https://negolosom.ru',
  siteDisplay: 'negolosom.ru',
  screenshotUrl: '/images/articles/negolosom/screenshot.jpg',
  ru: {
    title: '«Не пиши голосовое!» — голос в текст офлайн — Роман Пуртов',
    ogTitle: '«Не пиши голосовое!» — приложение для расшифровки речи прямо на телефоне',
    description:
      'Android-приложение переводит голос в текст прямо на телефоне: офлайн, без аккаунта и подписки. 16 языков, 18 выпусков, рейтинг 4,9 в RuStore.',
    ogDescription:
      'Android-приложение переводит голос в текст прямо на телефоне: офлайн, без аккаунта и подписки. 16 языков, 18 выпусков, рейтинг 4,9 в RuStore.',
    h1: '«Не&nbsp;пиши голосовое!»&nbsp;&mdash; приложение для расшифровки речи прямо на&nbsp;телефоне',
    metaLine: 'Пуртов Роман &middot; 22 апреля 2026 &middot; обновлено 4 октября 2026',
    body: bodyRu,
    screenshotAlt: 'Птица-талисман и два экрана приложения «Не пиши голосовое!»',
    dateLabel: '22 апреля 2026',
  },
  en: {
    title: '«Ne pishi golosovoe!» — Offline Voice to Text — Roman Purtov',
    ogTitle: '«Ne pishi golosovoe!» — an App That Transcribes Speech Right on the Phone',
    description:
      'Android app that turns voice into text right on the phone: offline, no account, no subscription. 16 languages, 18 releases, 4.9 rating on RuStore.',
    ogDescription:
      'Android app that turns voice into text right on the phone: offline, no account, no subscription. 16 languages, 18 releases, 4.9 rating on RuStore.',
    h1: '«Ne&nbsp;pishi golosovoe!»&nbsp;&mdash; an&nbsp;App That Transcribes Speech Right on&nbsp;the Phone',
    metaLine: 'Roman Purtov &middot; April 22, 2026 &middot; updated October 4, 2026',
    body: bodyEn,
    screenshotAlt: 'The bird mascot and two screens of the «Ne pishi golosovoe!» app',
    dateLabel: 'April 22, 2026',
  },
};
