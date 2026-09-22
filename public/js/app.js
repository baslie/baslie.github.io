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
   Copy on Badge Click
   ======================================== */

function extractCopyData(href) {
    if (href.startsWith('tel:')) return href.replace('tel:', '');
    if (href.startsWith('mailto:')) return href.replace('mailto:', '');
    return href;
}

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
            if (success) showCopyTooltip(badge);
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
        if (e.target.closest('a')) return;

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
   Masonry Layout
   ======================================== */
function initMasonry() {
    const grid = document.querySelector('.articles-grid');
    if (!grid) return;

    function layout() {
        const style = getComputedStyle(grid);
        const columns = style.gridTemplateColumns.split(' ').length;
        if (columns < 2) {
            grid.style.gridAutoRows = '';
            grid.style.alignItems = '';
            for (const item of grid.children) {
                item.style.gridRowEnd = '';
                item.style.gridColumn = '';
                item.style.gridRowStart = '';
            }
            return;
        }
        const rowHeight = 10;
        const gap = parseFloat(style.rowGap) || parseFloat(style.gap) || 0;

        grid.style.gridAutoRows = 'auto';
        grid.style.alignItems = 'start';
        for (const item of grid.children) {
            item.style.gridRowEnd = '';
            item.style.gridColumn = '';
            item.style.gridRowStart = '';
        }
        grid.offsetHeight;

        const spans = [];
        for (const item of grid.children) {
            const height = item.getBoundingClientRect().height;
            spans.push(Math.ceil((height + gap) / (rowHeight + gap)));
        }

        grid.style.gridAutoRows = rowHeight + 'px';
        grid.style.alignItems = '';
        const colNextRow = new Array(columns).fill(1);
        Array.from(grid.children).forEach((item, i) => {
            const col = i % columns;
            item.style.gridColumn = col + 1;
            item.style.gridRowStart = colNextRow[col];
            item.style.gridRowEnd = 'span ' + spans[i];
            colNextRow[col] += spans[i];
        });
    }

    const images = grid.querySelectorAll('img');
    let loaded = 0;
    const total = images.length;

    function onImageReady() {
        loaded++;
        if (loaded >= total) layout();
    }

    images.forEach(img => {
        if (img.complete) onImageReady();
        else {
            img.addEventListener('load', onImageReady);
            img.addEventListener('error', onImageReady);
        }
    });

    if (total === 0) layout();

    window.addEventListener('resize', layout);
}

/* ========================================
   Main Initialization
   ======================================== */
function init() {
    initTheme();
    initBackgroundVideo();
    initLenis();
    initYandexMetrika();
    initCopyOnBadgeClick();
    initProfileImageToggle();
    initMasonry();
}

document.addEventListener('DOMContentLoaded', init);
