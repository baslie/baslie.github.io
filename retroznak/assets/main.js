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

    // Пауза при наведении (только для десктопа)
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

    // Клавиатурная навигация
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