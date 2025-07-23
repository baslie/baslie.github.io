// Конфигурация Tailwind CSS
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'heading': ['Literata', 'serif'],
                'body': ['Fira Sans', 'sans-serif'],
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
            },
            animation: {
                'slideup': 'slideup 1s cubic-bezier(0.4, 0, 0.2, 1)',
            },
            keyframes: {
                slideup: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0px)' }
                }
            }
        }
    }
}

// Обработка cookies уведомления
document.addEventListener('DOMContentLoaded', function () {
    const cookiesWrap = document.getElementById('cookies_accept');

    if (localStorage.getItem('cookiesAccepted') === 'true') {
        if (cookiesWrap) {
            cookiesWrap.style.display = 'none';
        }
        return;
    }

    if (cookiesWrap) {
        setTimeout(() => {
            cookiesWrap.classList.remove('translate-y-full');
        }, 100);

        const acceptButton = cookiesWrap.querySelector('button');
        if (acceptButton) {
            acceptButton.addEventListener('click', function () {
                localStorage.setItem('cookiesAccepted', 'true');
                cookiesWrap.classList.add('translate-y-full');
                setTimeout(() => {
                    cookiesWrap.style.display = 'none';
                }, 800);
            });
        }
    }
});
