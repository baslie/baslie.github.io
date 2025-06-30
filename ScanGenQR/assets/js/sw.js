/**
 * ScanGenQR Service Worker
 * Обеспечивает кэширование ресурсов и офлайн функциональность
 */

const CACHE_NAME = 'scangenqr-v1.0.0';
const CACHE_STRATEGY_VERSION = '1.0.0';

// Ресурсы для кэширования (Cache First стратегия)
const STATIC_CACHE_RESOURCES = [
    './',
    './index.html',
    './generator/',
    './generator/index.html',
    './scanner/',
    './scanner/index.html',
    './manifest.json',
    './assets/css/styles.css',
    './assets/js/app.js',
    './assets/js/generator.js',
    './assets/js/scanner.js',
    // CDN ресурсы для офлайн работы
    'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
    'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js',
    'https://unpkg.com/qr-scanner@1.4.2/qr-scanner.min.js'
];

// Ресурсы для динамического кэширования (Network First стратегия)
const DYNAMIC_CACHE_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
    /\.(?:js|css)$/,
    /\/assets\//
];

// Время жизни кэша (в миллисекундах)
const CACHE_EXPIRATION = {
    static: 7 * 24 * 60 * 60 * 1000, // 7 дней
    dynamic: 3 * 24 * 60 * 60 * 1000, // 3 дня
    api: 60 * 60 * 1000 // 1 час
};

// ===== ОБРАБОТЧИКИ СОБЫТИЙ SERVICE WORKER =====

/**
 * Установка Service Worker
 */
self.addEventListener('install', (event) => {
    console.log('Service Worker: Установка', CACHE_NAME);
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Кэширование статических ресурсов');
                // Кэширование критически важных ресурсов
                const criticalResources = STATIC_CACHE_RESOURCES.filter(resource => 
                    !resource.startsWith('https://') // Исключаем внешние CDN ресурсы при установке
                );
                return cache.addAll(criticalResources);
            })
            .then(() => {
                console.log('Service Worker: Статические ресурсы кэшированы');
                // Принудительная активация нового Service Worker
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Ошибка кэширования при установке:', error);
            })
    );
});

/**
 * Активация Service Worker
 */
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Активация', CACHE_NAME);
    
    event.waitUntil(
        Promise.all([
            // Очистка старых кэшей
            cleanupOldCaches(),
            // Контроль всех клиентов
            self.clients.claim(),
            // Предварительное кэширование CDN ресурсов
            precacheCDNResources()
        ])
    );
});

/**
 * Перехват сетевых запросов
 */
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Игнорируем запросы, которые не нужно кэшировать
    if (shouldSkipRequest(request)) {
        return;
    }
    
    // Определяем стратегию кэширования в зависимости от типа ресурса
    if (isStaticResource(request)) {
        event.respondWith(cacheFirstStrategy(request));
    } else if (isDynamicResource(request)) {
        event.respondWith(networkFirstStrategy(request));
    } else {
        event.respondWith(staleWhileRevalidateStrategy(request));
    }
});

/**
 * Обработка сообщений от клиентов
 */
self.addEventListener('message', (event) => {
    const { type, payload } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'GET_VERSION':
            event.ports[0].postMessage({
                version: CACHE_STRATEGY_VERSION,
                cacheName: CACHE_NAME
            });
            break;
            
        case 'CLEAR_CACHE':
            clearSpecificCache(payload.cacheName)
                .then(() => event.ports[0].postMessage({ success: true }))
                .catch((error) => event.ports[0].postMessage({ success: false, error }));
            break;
            
        case 'FORCE_UPDATE':
            forceUpdateCache()
                .then(() => event.ports[0].postMessage({ success: true }))
                .catch((error) => event.ports[0].postMessage({ success: false, error }));
            break;
    }
});

// ===== СТРАТЕГИИ КЭШИРОВАНИЯ =====

/**
 * Cache First стратегия - для статических ресурсов
 */
async function cacheFirstStrategy(request) {
    try {
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse && !isCacheExpired(cachedResponse)) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            const responseToCache = networkResponse.clone();
            
            // Добавляем метку времени для отслеживания срока действия
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cache-timestamp', Date.now().toString());
            
            const modifiedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
            });
            
            await cache.put(request, modifiedResponse);
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('Cache First: Сетевая ошибка, возвращаем кэш:', error);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Возвращаем офлайн страницу для HTML запросов
        if (request.destination === 'document') {
            return getOfflinePage();
        }
        
        throw error;
    }
}

/**
 * Network First стратегия - для динамических ресурсов
 */
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            const responseToCache = networkResponse.clone();
            
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cache-timestamp', Date.now().toString());
            
            const modifiedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
            });
            
            await cache.put(request, modifiedResponse);
        }
        
        return networkResponse;
    } catch (error) {
        console.warn('Network First: Сетевая ошибка, проверяем кэш:', error);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        throw error;
    }
}

/**
 * Stale While Revalidate стратегия - для API запросов
 */
async function staleWhileRevalidateStrategy(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            
            const headers = new Headers(responseToCache.headers);
            headers.set('sw-cache-timestamp', Date.now().toString());
            
            const modifiedResponse = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: headers
            });
            
            cache.put(request, modifiedResponse);
        }
        return networkResponse;
    }).catch((error) => {
        console.warn('Stale While Revalidate: Сетевая ошибка:', error);
        return null;
    });
    
    return cachedResponse || fetchPromise;
}

// ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====

/**
 * Проверка, нужно ли пропустить запрос
 */
function shouldSkipRequest(request) {
    const url = new URL(request.url);
    
    // Пропускаем запросы к Service Worker
    if (url.pathname.includes('sw.js')) {
        return true;
    }
    
    // Пропускаем non-GET запросы
    if (request.method !== 'GET') {
        return true;
    }
    
    // Пропускаем запросы с определенными заголовками
    if (request.headers.get('cache-control') === 'no-cache') {
        return true;
    }
    
    return false;
}

/**
 * Проверка, является ли ресурс статическим
 */
function isStaticResource(request) {
    const url = new URL(request.url);
    
    // Статические файлы
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/)) {
        return true;
    }
    
    // HTML страницы
    if (url.pathname === '/' || url.pathname.includes('.html')) {
        return true;
    }
    
    // Манифест
    if (url.pathname.includes('manifest.json')) {
        return true;
    }
    
    return false;
}

/**
 * Проверка, является ли ресурс динамическим
 */
function isDynamicResource(request) {
    const url = new URL(request.url);
    
    return DYNAMIC_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
}

/**
 * Проверка срока действия кэша
 */
function isCacheExpired(response) {
    const cacheTimestamp = response.headers.get('sw-cache-timestamp');
    
    if (!cacheTimestamp) {
        return false; // Если нет метки времени, считаем кэш валидным
    }
    
    const cacheAge = Date.now() - parseInt(cacheTimestamp);
    const maxAge = CACHE_EXPIRATION.static; // По умолчанию используем время для статических ресурсов
    
    return cacheAge > maxAge;
}

/**
 * Очистка старых кэшей
 */
async function cleanupOldCaches() {
    try {
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME && cacheName.startsWith('scangenqr-'))
            .map(cacheName => {
                console.log('Service Worker: Удаление старого кэша:', cacheName);
                return caches.delete(cacheName);
            });
        
        await Promise.all(deletePromises);
        console.log('Service Worker: Старые кэши очищены');
    } catch (error) {
        console.error('Service Worker: Ошибка очистки кэшей:', error);
    }
}

/**
 * Предварительное кэширование CDN ресурсов
 */
async function precacheCDNResources() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const cdnResources = STATIC_CACHE_RESOURCES.filter(resource => 
            resource.startsWith('https://')
        );
        
        for (const resource of cdnResources) {
            try {
                const response = await fetch(resource);
                if (response.ok) {
                    await cache.put(resource, response);
                    console.log('Service Worker: CDN ресурс кэширован:', resource);
                }
            } catch (error) {
                console.warn('Service Worker: Не удалось кэшировать CDN ресурс:', resource, error);
            }
        }
    } catch (error) {
        console.error('Service Worker: Ошибка предварительного кэширования CDN:', error);
    }
}

/**
 * Получение офлайн страницы
 */
async function getOfflinePage() {
    return new Response(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ScanGenQR - Офлайн</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                .container {
                    max-width: 500px;
                    padding: 2rem;
                }
                .icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                h1 {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    font-weight: 300;
                }
                p {
                    font-size: 1.1rem;
                    margin-bottom: 2rem;
                    opacity: 0.9;
                    line-height: 1.6;
                }
                .button {
                    background: rgba(255, 255, 255, 0.2);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                }
                .button:hover {
                    background: rgba(255, 255, 255, 0.3);
                    border-color: rgba(255, 255, 255, 0.5);
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="icon">📱</div>
                <h1>ScanGenQR Офлайн</h1>
                <p>
                    Нет подключения к интернету, но не волнуйтесь! 
                    ScanGenQR работает офлайн благодаря PWA технологиям.
                </p>
                <p>
                    Основные функции генерации и сканирования QR-кодов 
                    доступны без интернета.
                </p>
                <a href="./" class="button" onclick="window.location.reload()">
                    Попробовать снова
                </a>
            </div>
        </body>
        </html>
    `, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        }
    });
}

/**
 * Очистка конкретного кэша
 */
async function clearSpecificCache(cacheName) {
    try {
        const success = await caches.delete(cacheName || CACHE_NAME);
        console.log('Service Worker: Кэш очищен:', cacheName || CACHE_NAME);
        return success;
    } catch (error) {
        console.error('Service Worker: Ошибка очистки кэша:', error);
        throw error;
    }
}

/**
 * Принудительное обновление кэша
 */
async function forceUpdateCache() {
    try {
        await clearSpecificCache(CACHE_NAME);
        const cache = await caches.open(CACHE_NAME);
        
        const updatePromises = STATIC_CACHE_RESOURCES.map(async (resource) => {
            try {
                const response = await fetch(resource, { cache: 'no-cache' });
                if (response.ok) {
                    await cache.put(resource, response);
                }
            } catch (error) {
                console.warn('Service Worker: Ошибка обновления ресурса:', resource, error);
            }
        });
        
        await Promise.all(updatePromises);
        console.log('Service Worker: Кэш принудительно обновлен');
    } catch (error) {
        console.error('Service Worker: Ошибка принудительного обновления кэша:', error);
        throw error;
    }
}

// ===== ДОПОЛНИТЕЛЬНЫЕ УТИЛИТЫ =====

/**
 * Логирование статистики кэша
 */
async function logCacheStats() {
    try {
        const cache = await caches.open(CACHE_NAME);
        const keys = await cache.keys();
        
        console.group('Service Worker: Статистика кэша');
        console.log('Название кэша:', CACHE_NAME);
        console.log('Количество кэшированных ресурсов:', keys.length);
        console.log('Ресурсы:', keys.map(request => request.url));
        console.groupEnd();
    } catch (error) {
        console.error('Service Worker: Ошибка получения статистики кэша:', error);
    }
}

// Логирование статистики при активации (только для разработки)
if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1') {
    self.addEventListener('activate', () => {
        setTimeout(logCacheStats, 1000);
    });
}
