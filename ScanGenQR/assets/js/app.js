/**
 * ScanGenQR - PWA Application
 * Основной файл приложения с общими функциями, PWA поддержкой и роутингом
 */

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let deferredPrompt = null;
let isOnline = navigator.onLine;

// ===== PWA ФУНКЦИОНАЛЬНОСТЬ =====

/**
 * Регистрация Service Worker
 */
async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('./assets/js/sw.js');
            console.log('ServiceWorker зарегистрирован:', registration);
            
            // Проверка обновлений
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showToast('Доступно обновление приложения', 'info', () => {
                            window.location.reload();
                        });
                    }
                });
            });
        } catch (error) {
            console.error('Ошибка регистрации ServiceWorker:', error);
        }
    }
}

/**
 * Обработка события установки PWA
 */
function handlePWAInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallBanner();
    });

    // Обработка успешной установки
    window.addEventListener('appinstalled', () => {
        hideInstallBanner();
        showToast('Приложение успешно установлено!', 'success');
        deferredPrompt = null;
    });
}

/**
 * Показать баннер установки PWA
 */
function showInstallBanner() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
        banner.classList.remove('hidden');
        banner.classList.add('animate-scale-in');
    }
}

/**
 * Скрыть баннер установки PWA
 */
function hideInstallBanner() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
}

/**
 * Установить PWA приложение
 */
async function installPWA() {
    if (deferredPrompt) {
        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('Пользователь согласился установить PWA');
            } else {
                console.log('Пользователь отклонил установку PWA');
            }
            
            deferredPrompt = null;
            hideInstallBanner();
        } catch (error) {
            console.error('Ошибка установки PWA:', error);
        }
    }
}

// ===== УПРАВЛЕНИЕ ТЕМОЙ =====

/**
 * Инициализация темы приложения
 */
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    
    // Получение сохраненной темы или системной предпочтения
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemPreference;
    
    // Применение темы
    applyTheme(currentTheme);
    updateThemeIcons(currentTheme, lightIcon, darkIcon);
    
    // Обработчик переключения темы
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            
            applyTheme(newTheme);
            updateThemeIcons(newTheme, lightIcon, darkIcon);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Отслеживание изменений системной темы
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
            updateThemeIcons(newTheme, lightIcon, darkIcon);
        }
    });
}

/**
 * Применить тему
 */
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Обновление meta тега theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        metaThemeColor.setAttribute('content', theme === 'dark' ? '#111827' : '#ffffff');
    }
}

/**
 * Обновить иконки переключателя темы
 */
function updateThemeIcons(theme, lightIcon, darkIcon) {
    if (lightIcon && darkIcon) {
        if (theme === 'dark') {
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    }
}

// ===== СИСТЕМА УВЕДОМЛЕНИЙ =====

/**
 * Показать всплывающее уведомление
 */
function showToast(message, type = 'info', action = null) {
    const toast = createToastElement(message, type, action);
    document.body.appendChild(toast);
    
    // Показать уведомление с анимацией
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Автоматически скрыть через 5 секунд
    setTimeout(() => {
        hideToast(toast);
    }, 5000);
    
    return toast;
}

/**
 * Создать элемент уведомления
 */
function createToastElement(message, type, action) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconMap = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const colorMap = {
        success: 'text-green-600',
        error: 'text-red-600',
        warning: 'text-yellow-600',
        info: 'text-blue-600'
    };
    
    toast.innerHTML = `
        <div class="p-4">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <span class="${colorMap[type]} text-xl font-bold">${iconMap[type]}</span>
                </div>
                <div class="ml-3 w-0 flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                        ${message}
                    </p>
                    ${action ? `
                        <div class="mt-2">
                            <button onclick="action()" class="text-sm ${colorMap[type]} hover:underline">
                                Обновить
                            </button>
                        </div>
                    ` : ''}
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                    <button onclick="hideToast(this.closest('.toast'))" class="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <span class="sr-only">Закрыть</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return toast;
}

/**
 * Скрыть уведомление
 */
function hideToast(toast) {
    if (toast && toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// ===== УТИЛИТЫ РАБОТЫ С ДАННЫМИ =====

/**
 * Сохранить данные в localStorage
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
        return false;
    }
}

/**
 * Загрузить данные из localStorage
 */
function loadFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        return defaultValue;
    }
}

/**
 * Очистить данные из localStorage
 */
function clearStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Ошибка очистки localStorage:', error);
        return false;
    }
}

// ===== УТИЛИТЫ КОПИРОВАНИЯ =====

/**
 * Копировать текст в буфер обмена
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        }
    } catch (error) {
        console.error('Ошибка копирования в буфер обмена:', error);
        return false;
    }
}

// ===== ВАЛИДАЦИЯ =====

/**
 * Валидация URL
 */
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Валидация email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Валидация телефона
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Экранирование HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== РОУТИНГ =====

/**
 * Простой SPA роутер
 */
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        
        // Обработка изменений URL
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
        
        // Обработка ссылок
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="./"]') || e.target.closest('a[href^="./"]')) {
                e.preventDefault();
                const link = e.target.matches('a') ? e.target : e.target.closest('a');
                this.navigateTo(link.getAttribute('href'));
            }
        });
    }
    
    /**
     * Добавить маршрут
     */
    addRoute(path, handler) {
        this.routes.set(path, handler);
    }
    
    /**
     * Навигация к маршруту
     */
    navigateTo(path) {
        const basePath = this.getBasePath();
        let fullPath = path;
        
        // Если путь относительный, добавляем базовый путь
        if (path.startsWith('./')) {
            const relativePath = path.substring(2);
            fullPath = basePath + '/' + relativePath;
        } else if (path === '/') {
            fullPath = basePath || '/';
        }
        
        if (this.currentRoute !== fullPath) {
            history.pushState(null, '', fullPath);
            this.handleRoute();
        }
    }
    
    /**
     * Обработка текущего маршрута
     */
    async handleRoute() {
        const path = window.location.pathname;
        this.currentRoute = path;
        
        // Определяем базовый путь для GitHub Pages
        const basePath = this.getBasePath();
        const relativePath = this.getRelativePath(path, basePath);
        
        // Обновление навигации
        this.updateNavigation(relativePath);
        
        // Проверяем маршруты с учетом базового пути
        const routeKey = this.findMatchingRoute(relativePath);
        
        if (routeKey && this.routes.has(routeKey)) {
            try {
                await this.routes.get(routeKey)();
            } catch (error) {
                console.error('Ошибка маршрута:', error);
                this.showError('Ошибка загрузки страницы');
            }
        } else {
            this.show404();
        }
    }
    
    /**
     * Получить базовый путь приложения
     */
    getBasePath() {
        const pathParts = window.location.pathname.split('/');
        // Если мы в подпапке (например, /ScanGenQR/), базовый путь будет /ScanGenQR
        if (pathParts.length > 2 && pathParts[1]) {
            return '/' + pathParts[1];
        }
        return '';
    }
    
    /**
     * Получить относительный путь от базового
     */
    getRelativePath(fullPath, basePath) {
        if (basePath && fullPath.startsWith(basePath)) {
            return fullPath.substring(basePath.length) || '/';
        }
        return fullPath;
    }
    
    /**
     * Найти подходящий маршрут
     */
    findMatchingRoute(relativePath) {
        // Нормализуем путь
        if (relativePath === '/' || relativePath === '') {
            return '/';
        }
        if (relativePath.includes('/generator')) {
            return './generator/';
        }
        if (relativePath.includes('/scanner')) {
            return './scanner/';
        }
        return null;
    }
    
    /**
     * Обновление навигации
     */
    updateNavigation(path) {
        // Обновление breadcrumbs
        const breadcrumbsContainer = document.querySelector('nav ol');
        if (breadcrumbsContainer) {
            this.updateBreadcrumbs(breadcrumbsContainer, path);
        }
        
        // Обновление заголовка
        this.updatePageTitle(path);
    }
    
    /**
     * Обновление breadcrumbs
     */
    updateBreadcrumbs(container, path) {
        const pathMap = {
            './': 'Главная',
            './generator/': 'Генератор',
            './scanner/': 'Сканер'
        };
        
        const pathParts = path.split('/').filter(part => part);
        let currentPath = '';
        
        container.innerHTML = '';
        
        // Главная страница
        const homeItem = document.createElement('li');
        homeItem.innerHTML = `
            <a href="./" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                Главная
            </a>
        `;
        container.appendChild(homeItem);
        
        // Остальные части пути
        pathParts.forEach((part, index) => {
            currentPath += '/' + part;
            const isLast = index === pathParts.length - 1;
            
            const item = document.createElement('li');
            item.className = 'flex items-center space-x-2';
            
            if (isLast) {
                item.innerHTML = `
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-gray-900 dark:text-white font-medium">${pathMap[currentPath] || part}</span>
                `;
            } else {
                item.innerHTML = `
                    <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <a href="${currentPath}" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        ${pathMap[currentPath] || part}
                    </a>
                `;
            }
            
            container.appendChild(item);
        });
    }
    
    /**
     * Обновление заголовка страницы
     */
    updatePageTitle(path) {
        const titleMap = {
            './': 'ScanGenQR - QR Code Generator & Scanner',
            './generator/': 'Генератор QR-кодов - ScanGenQR',
            './scanner/': 'Сканер QR-кодов - ScanGenQR'
        };
        
        document.title = titleMap[path] || 'ScanGenQR';
    }
    
    /**
     * Показать ошибку 404
     */
    show404() {
        document.querySelector('main').innerHTML = `
            <div class="text-center py-20">
                <div class="mb-8">
                    <h1 class="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
                    <h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Страница не найдена</h2>
                    <p class="text-gray-600 dark:text-gray-400 mb-8">Запрашиваемая страница не существует или была перемещена.</p>
                </div>
                <button onclick="navigateTo('./')" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                    Вернуться на главную
                </button>
            </div>
        `;
    }
    
    /**
     * Показать ошибку
     */
    showError(message) {
        showToast(message, 'error');
    }
}

// ===== УТИЛИТЫ ЗАГРУЗКИ КОНТЕНТА =====

/**
 * Загрузить HTML контент
 */
async function loadPageContent(url) {
    try {
        // Если URL относительный, используем его как есть
        // Браузер автоматически разрешит его относительно текущего URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('Ошибка загрузки контента:', error);
        throw error;
    }
}

/**
 * Показать индикатор загрузки
 */
function showLoading(container) {
    if (container) {
        container.innerHTML = `
            <div class="flex items-center justify-center py-20">
                <div class="text-center">
                    <div class="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p class="text-gray-600 dark:text-gray-400">Загрузка...</p>
                </div>
            </div>
        `;
    }
}

// ===== ОБРАБОТКА СОСТОЯНИЯ СЕТИ =====

/**
 * Обработка изменений сетевого состояния
 */
function handleNetworkState() {
    window.addEventListener('online', () => {
        isOnline = true;
        showToast('Соединение с интернетом восстановлено', 'success');
    });
    
    window.addEventListener('offline', () => {
        isOnline = false;
        showToast('Нет соединения с интернетом. Приложение работает в офлайн режиме.', 'warning');
    });
}

// ===== ГЛОБАЛЬНЫЕ ФУНКЦИИ =====

/**
 * Глобальная функция навигации
 */
function navigateTo(path) {
    if (window.router) {
        window.router.navigateTo(path);
    }
}

/**
 * Инициализация роутера
 */
function initializeRouter() {
    window.router = new Router();
    
    // Добавление маршрутов
    window.router.addRoute('/', async () => {
        // Главная страница уже загружена
        const main = document.querySelector('main');
        if (!main.innerHTML.includes('Добро пожаловать')) {
            window.location.reload();
        }
    });
    
    // Добавляем базовый маршрут для случаев, когда есть базовый путь
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    if (basePath !== '/') {
        window.router.addRoute(basePath, async () => {
            const main = document.querySelector('main');
            if (!main.innerHTML.includes('Добро пожаловать')) {
                window.location.reload();
            }
        });
    }
    
    window.router.addRoute('./generator/', async () => {
        try {
            const content = await loadPageContent('./generator/index.html');
            document.querySelector('main').innerHTML = content;
            
            // Инициализация генератора
            if (typeof initializeGenerator === 'function') {
                await initializeGenerator();
            }
        } catch (error) {
            showToast('Ошибка загрузки генератора', 'error');
        }
    });
    
    window.router.addRoute('./scanner/', async () => {
        try {
            const content = await loadPageContent('./scanner/index.html');
            document.querySelector('main').innerHTML = content;
            
            // Инициализация сканера
            if (typeof initializeScanner === 'function') {
                await initializeScanner();
            }
        } catch (error) {
            showToast('Ошибка загрузки сканера', 'error');
        }
    });
    
    // Обработка текущего маршрута
    window.router.handleRoute();
}

// ===== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ =====

/**
 * Инициализация приложения
 */
async function initializeApp() {
    try {
        // Инициализация PWA
        await registerServiceWorker();
        handlePWAInstall();
        
        // Инициализация UI
        initializeTheme();
        handleNetworkState();
        
        // Инициализация роутера
        initializeRouter();
        
        // Инициализация обработчиков событий
        initializeEventHandlers();
        
        console.log('ScanGenQR приложение инициализировано');
    } catch (error) {
        console.error('Ошибка инициализации приложения:', error);
        showToast('Ошибка инициализации приложения', 'error');
    }
}

/**
 * Инициализация обработчиков событий
 */
function initializeEventHandlers() {
    // PWA установка
    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', installPWA);
    }
    
    // Закрытие баннера установки
    const dismissBtn = document.getElementById('pwa-dismiss-btn');
    if (dismissBtn) {
        dismissBtn.addEventListener('click', hideInstallBanner);
    }
    
    // Обработка ошибок
    window.addEventListener('error', (e) => {
        console.error('Глобальная ошибка:', e.error);
        showToast('Произошла ошибка в приложении', 'error');
    });
    
    // Обработка необработанных промисов
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Необработанное отклонение промиса:', e.reason);
        showToast('Ошибка выполнения операции', 'error');
    });
}

// ===== ЗАПУСК ПРИЛОЖЕНИЯ =====

// Инициализация при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
