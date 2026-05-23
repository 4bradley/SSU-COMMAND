/* ═══════════════════════════════════════════════════════
   SSU Command — Service Worker  (sw.js)
   Cache-first strategy for offline support
═══════════════════════════════════════════════════════ */

const CACHE_NAME    = 'ssu-command-v1';
const CACHE_VERSION = '1.0.0';

/* Assets to pre-cache on install */
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

/* ── Install: pre-cache core assets ── */
self.addEventListener('install', function(event) {
  console.log('[SSU-SW] Installing v' + CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_URLS.map(function(url) {
        return new Request(url, { mode: 'no-cors' });
      })).catch(function(err) {
        console.warn('[SSU-SW] Pre-cache partial failure (non-fatal):', err);
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', function(event) {
  console.log('[SSU-SW] Activating v' + CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) {
            console.log('[SSU-SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* ── Fetch: cache-first, then network ── */
self.addEventListener('fetch', function(event) {
  /* Skip non-GET and chrome-extension requests */
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) {
        /* Serve from cache; update in background */
        fetchAndCache(event.request);
        return cached;
      }
      /* Not cached — go to network */
      return fetchAndCache(event.request).catch(function() {
        /* Offline fallback for navigation */
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

function fetchAndCache(request) {
  return fetch(request).then(function(response) {
    if (!response || response.status !== 200) return response;
    /* Only cache same-origin and CDN responses */
    var clone = response.clone();
    caches.open(CACHE_NAME).then(function(cache) {
      try { cache.put(request, clone); } catch(e) {}
    });
    return response;
  });
}

/* ── Message: force update ── */
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
