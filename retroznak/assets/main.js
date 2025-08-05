// ********************
// Swiper-слайдер
// ********************

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('#mainSlider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 600,
        // autoplay: {
        //     delay: 4000,
        //     disableOnInteraction: false,
        //     pauseOnMouseEnter: true,
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        lazy: false,
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
        },
        a11y: {
            enabled: true,
            prevSlideMessage: 'Предыдущий слайд',
            nextSlideMessage: 'Следующий слайд',
        }
    });

    const sliderContainer = document.querySelector('#mainSlider');
    if (window.matchMedia('(hover: hover)').matches) {
        sliderContainer.addEventListener('mouseenter', () => {
            if (swiper.autoplay && swiper.autoplay.running) {
                swiper.autoplay.stop();
            }
        });

        sliderContainer.addEventListener('mouseleave', () => {
            if (swiper.autoplay && !swiper.autoplay.running) {
                swiper.autoplay.start();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (!sliderContainer.contains(document.activeElement)) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                swiper.slidePrev();
                break;
            case 'ArrowRight':
                e.preventDefault();
                swiper.slideNext();
                break;
        }
    });
});

// ********************
// Cookies
// ********************

const TEXTS = {
    cookieAccepted: 'cookiesAccepted',
    cookieValue: 'true',
    buttonText: 'ОК'
};

document.addEventListener('DOMContentLoaded', function() {
    const cookiesWrap = document.getElementById('cookies-accept');
    const acceptButton = document.getElementById('cookie-accept-btn');

    if (!cookiesWrap) {
        return;
    }

    try {
        const isLocalStorageAvailable = (() => {
            try {
                const test = '__localStorage_test__';
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        })();

        if (isLocalStorageAvailable && localStorage.getItem(TEXTS.cookieAccepted) === TEXTS.cookieValue) {
            return;
        }

        cookiesWrap.classList.remove('hidden');
        setTimeout(() => {
            cookiesWrap.classList.add('cookie-enter');
        }, 100);

        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                try {
                    if (isLocalStorageAvailable) {
                        localStorage.setItem(TEXTS.cookieAccepted, TEXTS.cookieValue);
                    }

                    cookiesWrap.classList.remove('cookie-enter');
                    cookiesWrap.classList.add('cookie-exit');

                    setTimeout(() => {
                        cookiesWrap.classList.add('hidden');
                        cookiesWrap.classList.remove('cookie-exit');
                    }, 800);
                } catch (e) {
                    return;
                }
            });

            acceptButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    acceptButton.click();
                }
            });
        } else {
            return;
        }
    } catch (error) {
        return;
    }
});

const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            const cookiesWrap = document.getElementById('cookies-accept');
            if (cookiesWrap && !cookiesWrap.hasAttribute('data-initialized')) {
                cookiesWrap.setAttribute('data-initialized', 'true');
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// ********************
// Лайтбокс для изображений
// ********************

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImage || !lightboxClose || !lightboxOverlay) {
        return;
    }

    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(imageSrc, imageAlt = '', images = [], index = 0) {
        currentImages = images;
        currentIndex = index;

        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;

        if (currentImages.length > 1) {
            lightboxCounter.textContent = `${currentIndex + 1} из ${currentImages.length}`;
            lightboxCounter.style.display = 'block';
            lightboxPrev.classList.remove('hidden');
            lightboxNext.classList.remove('hidden');
        } else {
            lightboxCounter.style.display = 'none';
            lightboxPrev.classList.add('hidden');
            lightboxNext.classList.add('hidden');
        }

        lightbox.classList.remove('hidden');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImage.src = '';
            currentImages = [];
            currentIndex = 0;
        }, 300);
        document.body.style.overflow = '';
    }

    function switchImage(direction) {
        if (currentImages.length <= 1) return;

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % currentImages.length;
        } else {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        }

        const newImage = currentImages[currentIndex];
        lightboxImage.src = newImage.src;
        lightboxImage.alt = newImage.alt || '';
        lightboxCounter.textContent = `${currentIndex + 1} из ${currentImages.length}`;
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            switchImage('prev');
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            switchImage('next');
        });
    }

    // Универсальная функция для обработки кликов/тапов по изображениям
    function handleImageInteraction(e) {
        const clickedImg = e.target.closest('img');
        if (!clickedImg) return;

        // Игнорируем клики на элементах управления слайдера
        if (e.target.closest('.swiper-button-next') ||
            e.target.closest('.swiper-button-prev') ||
            e.target.closest('.swiper-pagination')) {
            return;
        }

        // Предотвращаем двойное срабатывание
        e.preventDefault();
        e.stopPropagation();

        // Обработка изображений в слайдере
        if (clickedImg.closest('.swiper-slide')) {
            const swiperContainer = clickedImg.closest('.swiper');
            const swiperImages = swiperContainer.querySelectorAll('.swiper-slide img');
            const swiperImagesArray = Array.from(swiperImages).map(img => ({
                src: img.src,
                alt: img.alt || 'Изображение из слайдера'
            }));

            const index = Array.from(swiperImages).indexOf(clickedImg);
            openLightbox(clickedImg.src, clickedImg.alt || 'Изображение из слайдера', swiperImagesArray, index);
            return;
        }

        // Обработка других изображений
        if (clickedImg.closest('.single-image') ||
            clickedImg.closest('.space-y-6') ||
            clickedImg.closest('.masonry-item')) {

            clickedImg.style.cursor = 'pointer';

            if (clickedImg.closest('.masonry-item')) {
                const masonryImages = document.querySelectorAll('.masonry-item img');
                const masonryImagesArray = Array.from(masonryImages).map(img => ({
                    src: img.src,
                    alt: img.alt || 'Фото клиента'
                }));
                const index = Array.from(masonryImages).indexOf(clickedImg);
                openLightbox(clickedImg.src, clickedImg.alt || 'Фото клиента', masonryImagesArray, index);
            } else {
                openLightbox(clickedImg.src, clickedImg.alt || 'Изображение');
            }
        }
    }

    function initializeLightbox() {
        // Обработчик для десктопных устройств
        document.addEventListener('click', handleImageInteraction);

        // Обработчик для мобильных устройств
        document.addEventListener('touchend', function(e) {
            // Проверяем, что это был именно тап, а не скролл
            if (e.changedTouches.length === 1) {
                // Небольшая задержка для предотвращения конфликтов
                setTimeout(() => {
                    handleImageInteraction(e);
                }, 10);
            }
        });

        // Добавляем стили для курсора
        const style = document.createElement('style');
        style.textContent = `
            .swiper-slide img,
            .single-image img,
            .space-y-6 img,
            .masonry-item img {
                cursor: pointer !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Обработчики для закрытия лайтбокса
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);

    // Обработчик клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                switchImage('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                switchImage('next');
                break;
        }
    });

    // Инициализация лайтбокса с небольшой задержкой
    setTimeout(initializeLightbox, 100);
});