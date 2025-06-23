const CACHE_NAME = 'rp-cache-v1';
const urlsToCache = [
  '/index2.html',
  '/styles/all.css',
  '/images/bg.jpg',
  '/videos/bg.mp4',
  '/images/roman.jpg',
  '/images/favicon.png',
  '/images/apple-touch-icon.png',
  '/images/icons/icon-192.png',
  '/images/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
