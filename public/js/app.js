/* ========================================
   Configuration
   ======================================== */
const CONFIG = {
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
   Theme Manager
   ======================================== */
const THEME_KEY = 'theme';
const THEME_COLOR = { light: '#222222', dark: '#0F0F0F' };
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function storedTheme() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch (e) {
        return null;
    }
}

/** Ручной выбор важнее системной настройки; без выбора идём за системой. */
function resolveTheme() {
    const stored = storedTheme();
    if (stored === 'dark' || stored === 'light') return stored;
    return prefersDark.matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    const root = document.documentElement;

    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLOR[theme]);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', String(isDark));
}

function initTheme() {
    applyTheme(resolveTheme());

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = resolveTheme() === 'dark' ? 'light' : 'dark';
            try {
                // Выбор совпал с системой — снимаем оверрайд и снова следуем за ней.
                if ((next === 'dark') === prefersDark.matches) localStorage.removeItem(THEME_KEY);
                else localStorage.setItem(THEME_KEY, next);
            } catch (e) {}
            applyTheme(next);
        });
    }

    prefersDark.addEventListener('change', () => {
        if (!storedTheme()) applyTheme(prefersDark.matches ? 'dark' : 'light');
    });
}

/* ========================================
   Background Video
   ======================================== */
function initBackgroundVideo() {
    const video = document.getElementById('background-video');
    if (!video) return;

    // WCAG 2.2.2: зацикленное видео на весь экран — это движение дольше 5 секунд.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.removeAttribute('autoplay');
        video.pause();
        return;
    }

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
        if (window.matchMedia('(hover: none)').matches) return;
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
   Copy to Clipboard
   ======================================== */

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
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

function showCopyTooltip(element) {
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = document.body.dataset.copiedText || 'Copied!';

    const rect = element.getBoundingClientRect();
    tooltip.style.cssText = `position:fixed;left:${rect.left + rect.width / 2}px;top:${rect.top - 10}px;transform:translate(-50%,-100%)`;
    document.body.appendChild(tooltip);

    requestAnimationFrame(() => tooltip.classList.add('copy-tooltip--visible'));

    setTimeout(() => {
        tooltip.classList.add('copy-tooltip--hiding');
        setTimeout(() => tooltip.remove(), 300);
    }, 1500);
}

function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const value = button.getAttribute('data-copy');
            if (!value) return;

            const success = await copyToClipboard(value);
            if (success) showCopyTooltip(button);
        });
    });
}

/* ========================================
   Profile Image Toggle (Mobile)
   ======================================== */
function initProfileImageToggle() {
    const wrapper = document.querySelector('.profile-image-wrapper');
    if (!wrapper) return;

    let isHoverImage = false;

    wrapper.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;

        // На десктопе картинку меняет CSS-ховер
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (hasHover) return;

        isHoverImage = !isHoverImage;

        const defaultImg = wrapper.querySelector('.profile-image--default');
        const hoverImg = wrapper.querySelector('.profile-image--hover');

        if (defaultImg && hoverImg) {
            defaultImg.style.opacity = isHoverImage ? '0' : '1';
            hoverImg.style.opacity = isHoverImage ? '1' : '0';
        }
    });
}

/* ========================================
   Feed Filters
   ======================================== */
const FILTER_KEY = 'feed-filter';

function initFeedFilters() {
    const bar = document.querySelector('.feed-filters');
    const grid = document.getElementById('articles-grid');
    if (!bar || !grid) return;

    const cards = Array.from(grid.querySelectorAll('.article-card'));
    const status = document.getElementById('feed-status');
    const subtitle = document.querySelector('[data-feed-subtitle]');

    /** 'one' | 'few' | 'many' — как в pluralSuffix() на сервере */
    function pluralKey(n) {
        const rule = new Intl.PluralRules(document.documentElement.lang || 'ru').select(n);
        return rule === 'one' ? 'One' : rule === 'few' ? 'Few' : 'Many';
    }

    function announce(shown) {
        if (!status) return;
        const template = bar.dataset['status' + pluralKey(shown)];
        if (template) status.textContent = template.replace('{n}', String(shown));
    }

    /** Число в плашке под заголовком всегда равно числу видимых карточек */
    function retitle(shown) {
        if (!subtitle) return;
        const template = subtitle.dataset.template;
        const word = subtitle.dataset['word' + pluralKey(shown)];
        if (!template || !word) return;
        subtitle.textContent = template.replace('{n}', shown + '\u00A0' + word);
    }

    function apply(value, persist) {
        let shown = 0;

        for (const card of cards) {
            const match = value === 'all' || card.dataset.badge === value;
            card.toggleAttribute('hidden', !match);
            if (match) shown++;
        }

        bar.querySelectorAll('[data-filter]').forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.filter === value));
        });

        if (persist) {
            try {
                sessionStorage.setItem(FILTER_KEY, value);
            } catch (e) {}
        }

        announce(shown);
        retitle(shown);
        // Masonry пересобирает раскладку по этому событию
        document.dispatchEvent(new CustomEvent('feed:changed'));
    }

    bar.addEventListener('click', (e) => {
        const button = e.target.closest('[data-filter]');
        if (button) apply(button.dataset.filter, true);
    });

    // Возврат со страницы кейса не должен сбрасывать выбор
    let saved = null;
    try {
        saved = sessionStorage.getItem(FILTER_KEY);
    } catch (e) {}
    if (saved && saved !== 'all') apply(saved, false);
}

/* ========================================
   Masonry Layout
   ======================================== */
function initMasonry() {
    const grid = document.querySelector('.articles-grid');
    if (!grid) return;

    function layout() {
        const style = getComputedStyle(grid);
        const columns = style.gridTemplateColumns.split(' ').length;
        const all = Array.from(grid.children);

        for (const item of all) {
            item.style.gridRowEnd = '';
            item.style.gridColumn = '';
            item.style.gridRowStart = '';
        }

        if (columns < 2) {
            grid.style.gridAutoRows = '';
            grid.style.alignItems = '';
            return;
        }

        const rowHeight = 10;
        const gap = parseFloat(style.rowGap) || parseFloat(style.gap) || 0;

        grid.style.gridAutoRows = 'auto';
        grid.style.alignItems = 'start';
        grid.offsetHeight;

        // Скрытые фильтром карточки не участвуют в раскладке
        const items = all.filter(item => !item.hasAttribute('hidden'));
        const spans = items.map(item =>
            Math.ceil((item.getBoundingClientRect().height + gap) / (rowHeight + gap))
        );

        grid.style.gridAutoRows = rowHeight + 'px';
        grid.style.alignItems = '';

        // Каждая карточка уходит в самую короткую колонку: порядок в DOM
        // остаётся хронологическим, а колонки не расходятся по высоте.
        const colHeight = new Array(columns).fill(0);
        const colNextRow = new Array(columns).fill(1);

        items.forEach((item, i) => {
            const col = colHeight.indexOf(Math.min(...colHeight));
            item.style.gridColumn = col + 1;
            item.style.gridRowStart = colNextRow[col];
            item.style.gridRowEnd = 'span ' + spans[i];
            colNextRow[col] += spans[i];
            colHeight[col] += spans[i];
        });
    }

    let scheduled = false;
    function relayout() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            layout();
        });
    }

    // Высота карточки известна до загрузки обложки: у картинки задан
    // aspect-ratio, место зарезервировано. Ждать картинки нельзя —
    // с lazy-загрузкой нижние так и не дождутся.
    relayout();

    grid.querySelectorAll('img').forEach(img => {
        if (img.complete) return;
        img.addEventListener('load', relayout);
        img.addEventListener('error', relayout);
    });

    document.addEventListener('feed:changed', relayout);

    // Мобильные браузеры шлют resize при показе адресной строки
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        relayout();
    });
}

/* ========================================
   Main Initialization
   ======================================== */
function init() {
    initTheme();
    initBackgroundVideo();
    initLenis();
    initYandexMetrika();
    initCopyButtons();
    initProfileImageToggle();
    // Фильтры до masonry: восстановленный выбор должен попасть в первый расчёт
    initFeedFilters();
    initMasonry();
}

document.addEventListener('DOMContentLoaded', init);
