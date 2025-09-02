const CACHE_NAME = "mi-app-cache-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",             // homepage
        "/favicon.ico", 
        "/_next/webpack-hmr" // recursos fijos
        // agrega imágenes u otros assets fijos si quieres
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  // Para navegación y assets
  event.respondWith(
    caches.match(event.request).then((cachedResp) => {
      if (cachedResp) {
        // ⚡ Devuelve lo que está cacheado
        return cachedResp;
      }
      // Si no está cacheado, intenta red
      return fetch(event.request)
        .then((response) => {
          // Guarda en cache para la próxima
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          // Si no hay red y no está cacheado, devuelve algo neutro
          return new Response(
            "<h1>Sin conexión y recurso no cacheado</h1>",
            { headers: { "Content-Type": "text/html" } }
          );
        });
    })
  );
});
