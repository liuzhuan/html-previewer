const CACHE_NAME = 'v1';
const urlsToCache = ['./', './index.html', './dist/main.BSYX7B_0.js'];

self.addEventListener('install', (event) => {
  const preCache = async () => {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(urlsToCache);
  };

  event.waitUntil(preCache());
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  const clearOldCaches = async () => {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    );
  };

  event.waitUntil(clearOldCaches());
});

self.addEventListener('fetch', (event) => {
  const cacheFirst = async () => {
    const resp = await caches.match(event.request);
    if (resp) return resp;

    const serverResp = await fetch(event.request);
    if (!serverResp.ok) throw new Error('fetch failed', event.request);

    const cache = await caches.open(CACHE_NAME);
    cache.put(event.request, serverResp.clone());
    return serverResp;
  };

  event.respondWith(cacheFirst());
});
