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
