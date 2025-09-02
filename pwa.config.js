module.exports = {
  runtimeCaching: [
    {
      urlPattern: /^\/$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "start-url",
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 24 * 60 * 60, // 1 día
        },
      },
    },
    {
      urlPattern: /^\/.*$/i, // todas las páginas
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: { cacheName: "google-fonts" },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: { maxEntries: 100 },
      },
    },
    {
      urlPattern: /\.(?:js|css)$/i,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "static-resources" },
    },
  ],
};
