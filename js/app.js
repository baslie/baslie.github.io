/* ========================================
   Configuration
   ======================================== */
const CONFIG = {
    CAREER_START_DATE: '2022-01-20',
    TIMEZONE: 'Asia/Tomsk',
    DEFAULT_LANG: 'ru',
    YANDEX_METRIKA_ID: 99831486,
    LENIS: {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: true,
        autoResize: true
    }
};

/* ========================================
   Time Utilities
   ======================================== */

/**
 * Calculate time since a given date
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {{years: number, months: number, days: number}}
 */
function calculateTimeSince(dateString) {
    const startDate = new Date(dateString);
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: CONFIG.TIMEZONE }));

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

/**
 * Get Russian declension for a number
 * @param {number} num - The number
 * @param {string} one - Form for 1 (год)
 * @param {string} two - Form for 2-4 (года)
 * @param {string} five - Form for 5+ (лет)
 * @returns {string}
 */
function getDeclension(num, one, two, five) {
    const lastTwo = num % 100;
    if (lastTwo >= 11 && lastTwo <= 19) return five;
    const lastDigit = num % 10;
    if (lastDigit === 1) return one;
    if (lastDigit >= 2 && lastDigit <= 4) return two;
    return five;
}

/**
 * Format time duration in specified language
 * @param {{years: number, months: number, days: number}} timeData
 * @param {string} lang - 'ru' or 'en'
 * @returns {string}
 */
function formatTime(timeData, lang) {
    const { years, months, days } = timeData;
    const parts = [];

    const rules = {
        ru: {
            year: (n) => getDeclension(n, 'год', 'года', 'лет'),
            month: (n) => getDeclension(n, 'месяц', 'месяца', 'месяцев'),
            day: (n) => getDeclension(n, 'день', 'дня', 'дней'),
            zero: '0\u00A0дней',
            and: ' и\u00A0',
            lastAnd: ' и\u00A0'
        },
        en: {
            year: (n) => n === 1 ? 'year' : 'years',
            month: (n) => n === 1 ? 'month' : 'months',
            day: (n) => n === 1 ? 'day' : 'days',
            zero: '0\u00A0days',
            and: ' and\u00A0',
            lastAnd: ', and\u00A0'
        }
    };

    const r = rules[lang];

    if (years > 0) parts.push(`${years}\u00A0${r.year(years)}`);
    if (months > 0) parts.push(`${months}\u00A0${r.month(months)}`);
    if (days > 0) parts.push(`${days}\u00A0${r.day(days)}`);

    if (parts.length === 0) return r.zero;
    if (parts.length === 1) return parts[0];
    if (parts.length === 2) return parts.join(r.and);
    return parts.slice(0, -1).join(', ') + r.lastAnd + parts[parts.length - 1];
}

// Calculate time since career start
const timeSince = calculateTimeSince(CONFIG.CAREER_START_DATE);
const timeStringRu = formatTime(timeSince, 'ru');
const timeStringEn = formatTime(timeSince, 'en');

/* ========================================
   Translations
   ======================================== */
const translations = {
    ru: {
        title: 'Роман Пуртов. Маркетолог\u00A0&\u00A0UX-UI дизайнер из\u00A0тайги.',
        metaDescription: 'Маркетолог и\u00A0UX-UI дизайнер из\u00A0тайги (Томск, МСК+4). Agentic Engineer (ex\u00A0vibe-coder). Делаю сайты и\u00A0пишу к\u00A0ним код\u00A0🌲',
        name: 'Роман Пуртов',
        mainDescription1: `<a href="https://telegra.ph/Kak-zapuskalas-Berloga-i-kak-zarabatyvalis-milliony-04-12" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">Маркетолог</a>\u00A0&\u00A0UX-UI дизайнер из\u00A0тайги (Томск,\u00A0МСК+4). <a href="https://github.com/baslie" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">Agentic Engineer</a> (ex\u00A0vibe-coder).`,
        mainDescription2: `${timeStringRu} делаю <a href="https://experts.tilda.cc/roman-purtow" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">сайты</a><br>и\u00A0пишу к\u00A0ним <a href="https://github.com/baslie/code-snippets" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">код</a>\u00A0🌲`,
        portfolio_title: 'Портфолио',
        portfolio_description: 'Сайты на Тильде',
        resume_title: 'Моё резюме',
        resume_description: 'Интернет-маркетолог',
        resume_updated: 'обновлено 06.02.26',
        phone_title: 'Телефон',
        phone_description: '+7 952 679-77-76',
        email_title: 'Почта',
        email_description: 'rytrycon@gmail.com',
        telegram_title: 'Telegram',
        telegram_description: '@roman_purtow',
        max_title: 'MAX',
        max_description: '+7 952 679-77-76',
        instagram_title: 'Instagram',
        instagram_description: '@roman.purtow',
        vk_title: 'ВКонтакте',
        vk_description: '@roman_purtow',
        youtube_title: 'YouTube',
        youtube_description: '@roman-purtow',
        github_title: 'GitHub',
        github_description: '@baslie',
        blog_link_title: 'Пурточка вещает',
        blog_link_description: 'Telegram-канал',
        vc_title: 'Роман Пуртов',
        vc_description: 'Личный блог на vc.ru',
        tomsk_walk_title: 'Томская Прогулка',
        tomsk_walk_description: 'Гуляем с\u00A0друзьями и\u00A0не\u00A0только'
    },
    en: {
        title: 'Roman Purtov. Marketer\u00A0&\u00A0UX-UI Designer from the\u00A0Taiga.',
        metaDescription: 'Marketer\u00A0&\u00A0UX-UI Designer from Siberian taiga (Tomsk, UTC+7). Agentic Engineer (ex\u00A0vibe-coder). Building websites and writing code\u00A0🌲',
        name: 'Roman Purtov',
        mainDescription1: `<a href="https://telegra.ph/Kak-zapuskalas-Berloga-i-kak-zarabatyvalis-milliony-04-12" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">Marketer</a>\u00A0&\u00A0UX-UI Designer from Siberian taiga (Tomsk,\u00A0UTC+7). <a href="https://github.com/baslie" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">Agentic Engineer</a> (ex\u00A0vibe-coder).`,
        mainDescription2: `Building <a href="https://experts.tilda.cc/roman-purtow" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">websites</a> and writing <a href="https://github.com/baslie/code-snippets" target="_blank" rel="nofollow noopener noreferrer" class="inline-link">code</a> for them for ${timeStringEn}\u00A0🌲`,
        portfolio_title: 'Portfolio',
        portfolio_description: 'Tilda websites',
        resume_title: 'My Resume',
        resume_description: 'Internet Marketer',
        resume_updated: 'updated 06.02.26',
        phone_title: 'Phone',
        phone_description: '+7 952 679-77-76',
        email_title: 'Email',
        email_description: 'rytrycon@gmail.com',
        telegram_title: 'Telegram',
        telegram_description: '@roman_purtow',
        max_title: 'MAX',
        max_description: '+7 952 679-77-76',
        instagram_title: 'Instagram',
        instagram_description: '@roman.purtow',
        vk_title: 'VK',
        vk_description: '@roman_purtow',
        youtube_title: 'YouTube',
        youtube_description: '@roman-purtow',
        github_title: 'GitHub',
        github_description: '@baslie',
        blog_link_title: 'Purtochka Speaks',
        blog_link_description: 'Telegram Channel',
        vc_title: 'Roman Purtov',
        vc_description: 'Personal blog on vc.ru',
        tomsk_walk_title: 'Tomsk Walk',
        tomsk_walk_description: 'Walking with friends and\u00A0more'
    }
};

/* ========================================
   Language Manager
   ======================================== */
let currentLang = localStorage.getItem('lang') ||
    (navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en');

function updateLanguage(lang) {
    document.documentElement.lang = lang;
    const t = translations[lang];
    document.title = t.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', t.metaDescription);
    }

    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.metaDescription);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', t.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', t.metaDescription);

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

function updateLangToggleText() {
    const langToggleText = document.getElementById('lang-toggle-text');
    if (langToggleText) {
        langToggleText.innerText = currentLang === 'ru' ? 'EN' : 'RU';
    }
}

function initLanguage() {
    updateLanguage(currentLang);
    updateLangToggleText();

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ru' ? 'en' : 'ru';
            localStorage.setItem('lang', currentLang);
            updateLanguage(currentLang);
            updateLangToggleText();
        });
    }
}

/* ========================================
   Theme Manager
   ======================================== */
const SVG_MOON = '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
const SVG_SUN = '<svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';

function setTheme(isDark) {
    const themeToggle = document.getElementById('theme-toggle');

    if (isDark) {
        document.documentElement.classList.add('dark');
        if (themeToggle) {
            themeToggle.innerHTML = SVG_SUN;
        }
    } else {
        document.documentElement.classList.remove('dark');
        if (themeToggle) {
            themeToggle.innerHTML = SVG_MOON;
        }
    }
}

function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark';
    setTheme(isDark);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            setTheme(isDark);
        });
    }
}

/* ========================================
   Background Video
   ======================================== */
function initBackgroundVideo() {
    const video = document.getElementById('background-video');
    if (!video) return;

    video.play().catch(e => console.log('Autoplay blocked:', e));

    document.addEventListener('click', () => {
        if (video.paused) {
            video.play().catch(() => {});
        }
    }, { once: true });
}

/* ========================================
   Lenis Smooth Scroll
   ======================================== */
function initLenis() {
    if (typeof Lenis !== 'undefined') {
        new Lenis(CONFIG.LENIS);
    }
}

/* ========================================
   Yandex Metrika
   ======================================== */
function initYandexMetrika() {
    (function(m, e, t, r, i, k, a) {
        m[i] = m[i] || function() { (m[i].a = m[i].a || []).push(arguments); };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) return;
        }
        k = e.createElement(t);
        a = e.getElementsByTagName(t)[0];
        k.async = 1;
        k.src = r;
        a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(CONFIG.YANDEX_METRIKA_ID, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
}


/* ========================================
   Copy on Badge Click
   ======================================== */

/**
 * Extract data for copying from href
 * @param {string} href - URL from href attribute
 * @returns {string} - Text to copy
 */
function extractCopyData(href) {
    if (href.startsWith('tel:')) return href.replace('tel:', '');
    if (href.startsWith('mailto:')) return href.replace('mailto:', '');
    return href;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(ta);
            return true;
        } catch {
            document.body.removeChild(ta);
            return false;
        }
    }
}

/**
 * Show "Copied" tooltip near element
 * @param {HTMLElement} element - Element to show tooltip near
 * @param {string} lang - Current language ('ru' or 'en')
 */
function showCopyTooltip(element, lang) {
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = lang === 'ru' ? 'Скопировано!' : 'Copied!';

    const rect = element.getBoundingClientRect();
    tooltip.style.cssText = `position:fixed;left:${rect.left + rect.width / 2}px;top:${rect.top - 10}px;transform:translate(-50%,-100%)`;
    document.body.appendChild(tooltip);

    requestAnimationFrame(() => tooltip.classList.add('copy-tooltip--visible'));

    setTimeout(() => {
        tooltip.classList.add('copy-tooltip--hiding');
        setTimeout(() => tooltip.remove(), 300);
    }, 1500);
}

/**
 * Initialize copy on badge click functionality
 */
function initCopyOnBadgeClick() {
    document.querySelectorAll('.category-badge').forEach(badge => {
        badge.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const card = badge.closest('.bento-card');
            if (!card) return;

            const href = card.getAttribute('href');
            if (!href) return;

            const success = await copyToClipboard(extractCopyData(href));
            if (success) showCopyTooltip(badge, currentLang);
        });
    });
}

/* ========================================
   Profile Image Toggle (Mobile)
   ======================================== */
function initProfileImageToggle() {
    const profileCard = document.querySelector('.card-profile');
    if (!profileCard) return;

    let isHoverImage = false;

    profileCard.addEventListener('click', (e) => {
        // Не переключаем если кликнули по ссылке
        if (e.target.closest('a')) return;

        // Проверяем, поддерживает ли устройство hover
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (hasHover) return;

        isHoverImage = !isHoverImage;

        const defaultImg = profileCard.querySelector('.profile-image--default');
        const hoverImg = profileCard.querySelector('.profile-image--hover');

        if (defaultImg && hoverImg) {
            defaultImg.style.opacity = isHoverImage ? '0' : '1';
            hoverImg.style.opacity = isHoverImage ? '1' : '0';
        }
    });
}

/* ========================================
   Main Initialization
   ======================================== */
function init() {
    initLanguage();
    initTheme();
    initBackgroundVideo();
    initLenis();
    initYandexMetrika();
    initCopyOnBadgeClick();
    initProfileImageToggle();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
