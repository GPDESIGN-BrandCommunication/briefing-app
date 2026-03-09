const CACHE_NAME = 'briefing-app-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - Network first, then cache
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // For API calls, use network first with cache fallback
    if (event.request.url.includes('newsapi') || event.request.url.includes('openweathermap')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
    } else {
        // For app files, use cache first, then network
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
                .catch(() => {
                    return caches.match('/index.html');
                })
        );
    }
});
