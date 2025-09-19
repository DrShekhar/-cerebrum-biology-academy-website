// Service Worker for Cerebrum Biology Academy
// Optimized for Indian mobile networks and offline learning

const CACHE_NAME = 'cerebrum-biology-v1';
const OFFLINE_URL = '/offline';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/offline',
  '/courses',
  '/claudechat',
  '/_next/static/css/app.css',
  '/_next/static/js/app.js',
];

// Additional resources to cache on demand
const CACHE_STRATEGIES = {
  // Static assets - Cache First
  STATIC: [
    /\/_next\/static\//,
    /\.(?:js|css|woff2?|png|jpg|jpeg|gif|svg|ico)$/,
  ],

  // API routes - Network First
  API: [
    /\/api\//,
  ],

  // Pages - Stale While Revalidate
  PAGES: [
    /^\/(?!api|_next|static)/,
  ],
};

// Network-aware caching durations (in milliseconds)
const CACHE_DURATIONS = {
  FAST_NETWORK: 24 * 60 * 60 * 1000, // 24 hours
  SLOW_NETWORK: 7 * 24 * 60 * 60 * 1000, // 7 days
  OFFLINE_FALLBACK: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Detect network quality
function getNetworkQuality() {
  if ('connection' in navigator) {
    const connection = navigator.connection;
    const effectiveType = connection.effectiveType;

    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'slow';
    } else if (effectiveType === '3g') {
      return 'medium';
    }
  }
  return 'fast';
}

// Get appropriate cache duration based on network
function getCacheDuration() {
  const networkQuality = getNetworkQuality();

  switch (networkQuality) {
    case 'slow':
      return CACHE_DURATIONS.SLOW_NETWORK;
    case 'medium':
      return CACHE_DURATIONS.FAST_NETWORK;
    default:
      return CACHE_DURATIONS.FAST_NETWORK;
  }
}

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker installing for Cerebrum Biology Academy');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Failed to cache critical resources:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activated');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  // Determine caching strategy based on request
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request));
  } else if (isAPIRequest(url)) {
    event.respondWith(networkFirstStrategy(request));
  } else if (isPageRequest(url)) {
    event.respondWith(staleWhileRevalidateStrategy(request));
  } else {
    event.respondWith(networkOnlyStrategy(request));
  }
});

// Helper functions to categorize requests
function isStaticAsset(url) {
  return CACHE_STRATEGIES.STATIC.some(pattern => pattern.test(url.pathname));
}

function isAPIRequest(url) {
  return CACHE_STRATEGIES.API.some(pattern => pattern.test(url.pathname));
}

function isPageRequest(url) {
  return CACHE_STRATEGIES.PAGES.some(pattern => pattern.test(url.pathname));
}

// Cache First Strategy - for static assets
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      // Check if cache is still valid
      const cacheTime = new Date(cachedResponse.headers.get('sw-cache-time') || 0).getTime();
      const now = Date.now();
      const cacheDuration = getCacheDuration();

      if (now - cacheTime < cacheDuration) {
        return cachedResponse;
      }
    }

    // Fetch from network and update cache
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      const responseToCache = networkResponse.clone();

      // Add timestamp to track cache age
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-time', new Date().toISOString());

      const responseWithTimestamp = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers,
      });

      await cache.put(request, responseWithTimestamp);
    }

    return networkResponse;
  } catch (error) {
    console.log('🌐 Network failed, serving from cache:', request.url);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline fallback for pages
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }

    throw error;
  }
}

// Network First Strategy - for API requests
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful API responses for offline access
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      const responseToCache = networkResponse.clone();

      // Add timestamp for cache invalidation
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-time', new Date().toISOString());

      const responseWithTimestamp = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers,
      });

      await cache.put(request, responseWithTimestamp);
    }

    return networkResponse;
  } catch (error) {
    console.log('📡 API network failed, checking cache:', request.url);

    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      // Add offline indicator header
      const headers = new Headers(cachedResponse.headers);
      headers.set('x-served-from', 'cache');

      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: headers,
      });
    }

    throw error;
  }
}

// Stale While Revalidate Strategy - for pages
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  // Fetch from network in background
  const networkResponsePromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();

      // Add timestamp
      const headers = new Headers(responseToCache.headers);
      headers.set('sw-cache-time', new Date().toISOString());

      const responseWithTimestamp = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers,
      });

      cache.put(request, responseWithTimestamp);
    }
    return networkResponse;
  }).catch((error) => {
    console.log('🌐 Network failed for page:', request.url);
    return null;
  });

  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }

  // Otherwise wait for network
  try {
    const networkResponse = await networkResponsePromise;
    if (networkResponse) {
      return networkResponse;
    }
  } catch (error) {
    // Network failed, no cache available
  }

  // Return offline page for navigation requests
  if (request.mode === 'navigate') {
    return caches.match(OFFLINE_URL);
  }

  // Throw error for other requests
  throw new Error('Request failed and no cache available');
}

// Network Only Strategy - for uncacheable requests
async function networkOnlyStrategy(request) {
  return fetch(request);
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  console.log('🔄 Performing background sync');

  // Sync offline form submissions, user progress, etc.
  try {
    // Get offline data from IndexedDB
    const offlineData = await getOfflineData();

    if (offlineData.length > 0) {
      console.log(`📤 Syncing ${offlineData.length} offline items`);

      for (const item of offlineData) {
        try {
          await syncOfflineItem(item);
          await removeOfflineItem(item.id);
        } catch (error) {
          console.error('❌ Failed to sync item:', error);
        }
      }
    }
  } catch (error) {
    console.error('🔄 Background sync failed:', error);
  }
}

// Placeholder functions for offline data management
async function getOfflineData() {
  // Implement IndexedDB or localStorage logic
  return [];
}

async function syncOfflineItem(item) {
  // Implement API sync logic
  console.log('Syncing offline item:', item);
}

async function removeOfflineItem(id) {
  // Remove from offline storage
  console.log('Removing offline item:', id);
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('📬 Push notification received');

  const options = {
    body: 'नया Biology lesson उपलब्ध है!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: 'cerebrum-notification',
    data: {
      url: '/courses'
    },
    actions: [
      {
        action: 'open',
        title: 'खोलें',
        icon: '/action-open.png'
      },
      {
        action: 'dismiss',
        title: 'बंद करें',
        icon: '/action-dismiss.png'
      }
    ]
  };

  if (event.data) {
    try {
      const payload = event.data.json();
      options.body = payload.body || options.body;
      options.data.url = payload.url || options.data.url;
    } catch (error) {
      console.error('Failed to parse push payload:', error);
    }
  }

  event.waitUntil(
    self.registration.showNotification('Cerebrum Biology Academy', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification clicked');

  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // Open a new window/tab
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    event.ports[0].postMessage({
      cacheSize: getCacheSize(),
      networkQuality: getNetworkQuality(),
    });
  }
});

async function getCacheSize() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    return requests.length;
  } catch (error) {
    return 0;
  }
}

console.log('🚀 Cerebrum Biology Academy Service Worker loaded successfully');
console.log('📱 Optimized for Indian mobile networks and offline learning');