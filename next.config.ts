import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,

  fallbacks: {
    document: "/_offline", // o "~offline" en App Router :contentReference[oaicite:3]{index=3}
  },

  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.mode === "navigate",
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
        },
      },
      {
        urlPattern: /\.(?:js|css)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-js-css",
          expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|ico|webp|woff2?)$/i,
        handler: "CacheFirst",
        options: {
          cacheName: "static-media",
          expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: /\/api\/.*$/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          networkTimeoutSeconds: 10,
          expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 },
        },
      },
    ],

    // Puedes habilitar para incluir también las configuraciones por defecto
  },
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
