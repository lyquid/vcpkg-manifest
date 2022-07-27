const CACHE_NAME = 'vcpkg-manifest-cache-v1';

const urlsToCache = [
  '/',
  '/libraries'
];

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      // console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  this.skipWaiting()
});

this.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => {
    if (response) { return response; }
    return fetch(event.request);
  }));
});
