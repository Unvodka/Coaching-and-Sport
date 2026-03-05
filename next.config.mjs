import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
    minimumCacheTTL: 2592000,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withPWA({
  dest: "public",
  // Do NOT cache navigations aggressively — auth middleware must always run
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    // Only precache static assets (hashed filenames = safe forever).
    // Never precache HTML pages — they are auth-dependent and must
    // go through middleware on every request.
    additionalManifestEntries: [],
    runtimeCaching: [
      {
        // Homepage and auth routes — network-only, NEVER cache.
        // Middleware must run on every request to handle auth redirects.
        urlPattern: /^https:\/\/coach-bluewave\.com(\/|\/auth\/.*)$/i,
        handler: "NetworkOnly",
      },
      {
        // Portal pages — network-first, 1h stale fallback.
        // Short TTL so code updates reach users quickly.
        urlPattern: /^https:\/\/coach-bluewave\.com\/portal.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "portal-pages-v2",
          networkTimeoutSeconds: 8,
          expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 }, // 1 hour
        },
      },
      {
        // Next.js static assets — cache-first, 1 year (hashed filenames).
        urlPattern: /^\/_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "next-static-v2",
          expiration: { maxEntries: 200, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
      {
        // Images — cache-first, 30 days.
        urlPattern: /^https:\/\/coach-bluewave\.com\/images\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "images-v2",
          expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      {
        // Google Fonts — stale-while-revalidate.
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "google-fonts-v2",
          expiration: { maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
    ],
  },
})(nextConfig);
