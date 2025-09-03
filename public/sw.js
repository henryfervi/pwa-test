const CACHE_NAME = 'my-pwa-cache-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE_URLS = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // navegaciones (requests HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        // actualiza cache con la página navegada
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
        return networkResponse;
      }).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // para otros recursos: cache-first con fallback a network
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // guarda en cache los archivos obtenidos
        return caches.open(CACHE_NAME).then(cache => {
          try { cache.put(event.request, response.clone()); } catch (e) {}
          return response;
        });
      }).catch(() => {
        // si falla (p.ej. imagen en offline), podrías devolver una imagen placeholder
      });
    })
  );
});