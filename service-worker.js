const CACHE_NAME = 'rp-cache-v2';
const urlsToCache = [
  'index.html',
  'styles/all.css',
  'images/bg.jpg',
  'videos/bg.mp4',
  'images/roman.jpg',
  'images/favicon.jpg',
  'images/apple-touch-icon.jpg',
  'images/icons/icon-192.jpg',
  'images/icons/icon-512.jpg'
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
