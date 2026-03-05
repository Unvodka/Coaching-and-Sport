// Coach Bluewave — Service Worker v3
// Deliberately minimal: only caches immutable static assets.
// HTML pages, auth routes, and API calls are ALWAYS network-only.

const CACHE = "bluewave-static-v3";

const NEVER_CACHE = [
  "/",
  "/portal",
  "/auth/",
  "/api/",
  "/offline",
];

function shouldSkip(url) {
  const path = new URL(url).pathname;
  return NEVER_CACHE.some((p) => path === p || path.startsWith(p));
}

// Install — no precaching, activate immediately
self.addEventListener("install", () => self.skipWaiting());

// Activate — delete old caches, take control
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  const url = request.url;

  // Only handle GET requests from the same origin
  if (request.method !== "GET") return;
  if (!url.startsWith(self.location.origin)) return;

  // Never intercept HTML pages or auth/api routes
  if (shouldSkip(url)) return;

  const path = new URL(url).pathname;

  // Cache-first ONLY for hashed static assets (safe forever)
  if (path.startsWith("/_next/static/") || path.match(/\.(png|jpg|jpeg|webp|avif|svg|ico|woff2)$/)) {
    e.respondWith(
      caches.match(request).then(
        (cached) => cached || fetch(request).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(request, clone));
          }
          return res;
        })
      )
    );
  }
  // Everything else — pure network, SW steps aside
});
