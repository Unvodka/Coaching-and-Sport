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
      // SW served by next-pwa — still needs correct headers
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
  dest: "public",           // SW output location
  cacheOnFrontEndNav: true, // cache pages as user navigates
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,     // reload stale content when back online
  swcMinify: true,
  disable: process.env.NODE_ENV === "development", // disable in dev to avoid noise
  workboxOptions: {
    disableDevLogs: true,
    // Pre-cache the portal shell routes on first SW install
    additionalManifestEntries: [
      { url: "/portal", revision: null },
      { url: "/portal/weight", revision: null },
      { url: "/portal/workouts", revision: null },
      { url: "/portal/recipes", revision: null },
      { url: "/portal/journal", revision: null },
      { url: "/portal/profile", revision: null },
      { url: "/offline", revision: null },
    ],
    // Don't cache Supabase, Stripe or API calls
    runtimeCaching: [
      {
        // Next.js static assets — cache-first, 1 year
        urlPattern: /^\/_next\/static\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "next-static",
          expiration: { maxEntries: 200, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
      {
        // Images — cache-first, 30 days
        urlPattern: /^https:\/\/coach-bluewave\.com\/images\/.*/i,
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
      {
        // Portal pages — network-first, 24h stale fallback
        urlPattern: /^https:\/\/coach-bluewave\.com\/portal.*/i,
        handler: "NetworkFirst",
        options: {
          cacheName: "portal-pages",
          networkTimeoutSeconds: 10,
          expiration: { maxEntries: 30, maxAgeSeconds: 24 * 60 * 60 },
        },
      },
      {
        // Google Fonts
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "google-fonts",
          expiration: { maxEntries: 10, maxAgeSeconds: 365 * 24 * 60 * 60 },
        },
      },
    ],
  },
})(nextConfig);
