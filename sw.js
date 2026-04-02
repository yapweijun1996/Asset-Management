// Service Worker with auto-update strategy
const CACHE_VERSION = 'assetOS-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;

// Assets to precache (shell)
const PRECACHE_URLS = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.json'
];

// Install: precache shell assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()) // Activate immediately
  );
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim()) // Take control of all pages immediately
  );
});

// Fetch: Network-first for HTML/JS/CSS (always get latest), cache-first for fonts/images
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and external API requests
  if (event.request.method !== 'GET') return;
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('fonts.gstatic.com')) return;

  // Google Fonts: cache-first (they rarely change)
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => cache.put(event.request, clone));
          return response;
        });
      })
    );
    return;
  }

  // App assets (HTML, JS, CSS): Network-first for auto-update
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache the latest version
        const clone = response.clone();
        caches.open(STATIC_CACHE).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        // Offline fallback: serve from cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback to index.html for SPA navigation
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// Listen for skip-waiting message from app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
