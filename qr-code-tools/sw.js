const CACHE_NAME = 'qr-code-tools-v1';
const CACHE_DURATION = 31536000; // 1 год в секундах

const STATIC_RESOURCES = [
    'assets/images/qr-code-tools-logo.svg',
    'assets/images/photo.svg',
    'assets/images/qr-result.svg',
    'assets/images/upload.svg',
    'assets/images/og-image.jpg',
    'assets/images/twitter-image.jpg',
    'assets/images/screenshot.jpg',
    'assets/icons/icon-72.png',
    'assets/icons/icon-96.png',
    'assets/icons/icon-128.png',
    'assets/icons/icon-144.png',
    'assets/icons/icon-152.png',
    'assets/icons/icon-192.png',
    'assets/icons/icon-384.png',
    'assets/icons/icon-512.png',
    'assets/icons/maskable-icon-192.png',
    'assets/icons/maskable-icon-512.png',
    'favicon.ico',
    'favicon-32x32.png',
    'favicon-16x16.png',
    'apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_RESOURCES);
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Кэшируем только статические ресурсы с нашего домена
    if (STATIC_RESOURCES.some(resource => url.pathname.includes(resource))) {
        event.respondWith(
            caches.match(request)
                .then((response) => {
                    if (response) {
                        // Проверяем, не устарел ли кэш (более года)
                        const cachedDate = new Date(response.headers.get('date'));
                        const now = new Date();
                        const ageInSeconds = (now - cachedDate) / 1000;
                        
                        if (ageInSeconds < CACHE_DURATION) {
                            return response;
                        }
                    }
                    
                    // Загружаем с сервера и кэшируем
                    return fetch(request)
                        .then((response) => {
                            if (response.status === 200) {
                                const responseClone = response.clone();
                                caches.open(CACHE_NAME)
                                    .then((cache) => {
                                        cache.put(request, responseClone);
                                    });
                            }
                            return response;
                        });
                })
        );
    }
});
