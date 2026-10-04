# Кейс: DHIRA в Томске — черновик

## Бриф
- Читатель: потенциальный заказчик на roman-purtow.ru, которому нужен сайт под событие.
- Полезное действие: увидеть, как решена задача «одна страница: всё о концерте + связь с организатором».
- Площадка и формат: карточка-кейс сайта, 5 абзацев, первое лицо, как у соседних кейсов.
- Фактура: сам сайт (`mantrayoga-tomsk-ru`), README, JSON-LD.
- Не упоминаем: срок разработки, макет в Pencil, сайт-донор, личные имена организаторов.

## Мета

- title: DHIRA в Томске — лендинг мантра-концерта — Роман Пуртов
- ogTitle: DHIRA в Томске — лендинг мантра-концерта
- description: Лендинг мантра-концерта DHIRA в Томске для Mantra Yoga Tomsk: всё о вечере на одной странице, а билет — через мессенджер или звонок организатору.

## Текст (ru)

Mantra Yoga Tomsk привозят в Томск DHIRA — вокалиста и исполнителя мантр, который ведёт в Москве свою школу Mantra Wave. Концерт пройдёт 23 октября в развлекательном центре «Факел», в зале «Этюд». Организаторам нужна была одна страница: открыл ссылку и сразу понял, что это за вечер, когда и где он пройдёт, сколько стоит билет и как его купить.

Главный читатель такой страницы — человек, который ни разу не был на мантра-концерте. Поэтому сразу после первого экрана идёт блок «Что будет в зале» с тремя ответами для новичка: музыка звучит вживую, мантры простые и подпевать не обязательно, быть йогом или вокалистом не нужно. Дальше — исполнитель: колода фотографий и четыре факта биографии, от «поёт мантры с 10 лет» до полугода в киртан-академии Маяпура. Потом два фрагмента с прошлых концертов на Rutube и фотографии из зала.

Онлайн-оплаты на сайте нет: организаторы продают билеты сами, в переписке и по телефону. Поэтому вся страница ведёт к одному действию — написать или позвонить. Блок «Билеты» свёрстан как настоящий входной билет с перфорацией и корешком, на корешке цены и четыре кнопки: MAX, Telegram, WhatsApp и телефон. На смартфоне контакты всегда под рукой: после первого экрана в углу появляется круглая кнопка, которая раскрывается веером, а внизу едет панель с датой, ценой и кнопкой «Купить билет». Панель прячется, когда человек и так смотрит на билет. В конце — карта с залом на втором этаже и кнопка маршрута в Яндекс Картах.

Визуально страница собрана как сценическая афиша. Тёмные экраны чередуются с бумажными, поверх лежит плёночное зерно, разделы подписаны моноширинными метками с номерами. На первом экране портрет DHIRA вырезан и стоит поверх огромного вордмарка, так что часть букв уходит ему за спину. Палитра — чернильно-чёрный, бумажный, оранжевый и маджента. Заголовки набраны Unbounded, текст — Onest, метки — JetBrains Mono. Наклонные таблички «Пой», «Дыши», «Слушай» подписаны на санскрите: деванагари и латинской транслитерацией. Все шрифты обрезаны до символов, которые встречаются на странице, и лежат на своём хостинге.

Под капотом чистые HTML, CSS и JavaScript без сборки, библиотеки лежат в репозитории, без CDN. За движение отвечает GSAP со ScrollTrigger: заголовки появляются построчно, у первого экрана три слоя параллакса, а билет на десктопе выпрямляется, пока к нему скроллишь. Плавный скролл даёт Lenis, бегущую ленту фотографий — Embla, колоду исполнителя можно листать свайпом. Если в системе включено ограничение анимации, параллакс и автопрокрутка выключаются. Ролики Rutube загружаются только после нажатия на play. Ранний билет стоит 1000 ₽ до 10 октября, а 11-го все цены на странице сами переключатся на 1500 ₽ по томскому времени, править сайт вручную не придётся. Поисковикам отдаётся разметка MusicEvent с местом, исполнителем и двумя ценами. Вёрстку и поведение страницы проверяют тесты на Playwright.

## Text (en)

- title: DHIRA in Tomsk — Mantra Concert Landing Page — Roman Purtov
- ogTitle: DHIRA in Tomsk — Landing Page for a Mantra Concert
- description: A landing page for DHIRA's mantra concert in Tomsk for Mantra Yoga Tomsk: the whole evening on one page, tickets via a messenger or a call to the organizer.

Mantra Yoga Tomsk are bringing DHIRA to Tomsk — a vocalist and mantra singer who runs his own mantra school, Mantra Wave, in Moscow. The concert takes place on October 23 at the Fakel entertainment center, in the Etude hall. The organizers needed a single page: open the link and instantly see what the evening is, when and where it happens, how much a ticket costs, and how to buy one.

The main reader of a page like this has never been to a mantra concert. So right after the first screen comes a “What happens in the hall” block with three answers for a newcomer: the music is live, the mantras are simple and singing along is optional, and you don't have to be a yogi or a singer. Next comes the performer: a deck of photos and four facts from his bio, from “has sung mantras since age 10” to six months at the kirtan academy in Mayapur. Then two clips from past concerts on Rutube and photos from the hall.

There is no online payment on the site: the organizers sell tickets themselves, over chat and by phone. So the whole page leads to one action — write or call. The Tickets block is laid out as a real admission ticket with a perforation and a stub; the stub holds the prices and four buttons: MAX, Telegram, WhatsApp, and phone. On a smartphone the contacts are always at hand: after the first screen a round button appears in the corner and fans out, and a bar with the date, price, and a “Buy a ticket” button rides along at the bottom. The bar hides when the visitor is already looking at the ticket. At the end there is a map with the hall on the second floor and a route button for Yandex Maps.

Visually the page is built like a stage poster. Dark screens alternate with paper ones, film grain lies on top, and sections are tagged with numbered monospace labels. On the first screen DHIRA's portrait is cut out and placed over a huge wordmark, so some of the letters disappear behind him. The palette is ink black, paper, orange, and magenta. Headings are set in Unbounded, body text in Onest, labels in JetBrains Mono. The tilted “Sing”, “Breathe”, “Listen” plaques carry Sanskrit captions in Devanagari and Latin transliteration. Every font is subset to the characters actually used on the page and self-hosted.

Under the hood it is plain HTML, CSS, and JavaScript with no build step; the libraries live in the repository, not on a CDN. Motion comes from GSAP with ScrollTrigger: headings reveal line by line, the first screen has three parallax layers, and on desktop the ticket straightens out as you scroll toward it. Lenis handles smooth scrolling, Embla runs the photo strip, and the performer's deck can be swiped. If the system asks for reduced motion, parallax and auto-scroll switch off. Rutube videos load only after you press play. The early-bird ticket costs 1,000 ₽ until October 10, and on the 11th every price on the page switches to 1,500 ₽ on its own, on Tomsk time, so nobody has to edit the site by hand. Search engines get MusicEvent markup with the venue, the performer, and both prices. Playwright tests check the layout and the page's behavior.

## Что ещё нужно узнать
- https на mantrayoga-tomsk.ru на 2026-10-04 ещё не работал (сертификат GitHub Pages не выпущен): ссылка в кейсе на https, проверить после выпуска сертификата.
