// Cerebrum Biology Academy Service Worker
// Provides offline functionality, caching, and background sync for NEET students

const CACHE_NAME = 'cerebrum-biology-v1.2.0'
const STATIC_CACHE = 'cerebrum-static-v1.2.0'
const DYNAMIC_CACHE = 'cerebrum-dynamic-v1.2.0'
const IMAGE_CACHE = 'cerebrum-images-v1.2.0'

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Core CSS and JS will be added dynamically
]

// Routes to cache for offline access
const CACHE_ROUTES = [
  '/',
  '/courses',
  '/mock-tests',
  '/study-materials',
  '/video-lectures',
  '/faculty',
  '/testimonials',
  '/contact',
  '/class-11',
  '/class-12',
  '/dropper'
]

// Routes that should always be fetched from network (dynamic content)
const NETWORK_FIRST_ROUTES = [
  '/api/',
  '/admin/',
  '/auth/',
  '/enrollments',
  '/analytics'
]

// Image extensions to cache
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico']

self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...')

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      }),

      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...')

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE &&
                cacheName !== DYNAMIC_CACHE &&
                cacheName !== IMAGE_CACHE &&
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),

      // Take control of all clients
      self.clients.claim()
    ])
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const { url, method } = request

  // Only handle GET requests
  if (method !== 'GET') return

  // Handle different types of requests
  if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(request))
  } else if (isNetworkFirstRoute(url)) {
    event.respondWith(handleNetworkFirst(request))
  } else if (isCacheableRoute(url)) {
    event.respondWith(handleCacheFirst(request))
  } else {
    event.respondWith(handleStaleWhileRevalidate(request))
  }
})

// Handle image requests with long-term caching
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(IMAGE_CACHE)
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log('[SW] Image request failed:', error)
    // Return a fallback image or placeholder
    return new Response('', { status: 200, statusText: 'OK' })
  }
}

// Handle API and dynamic routes (network first)
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request)

    // Cache successful responses for offline fallback
    if (networkResponse.ok && !request.url.includes('/api/auth/')) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log('[SW] Network first failed, trying cache:', error)
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline')
    }

    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' })
  }
}

// Handle static content (cache first)
async function handleCacheFirst(request) {
  try {
    const cache = await caches.open(STATIC_CACHE)
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      // Update cache in background
      updateCacheInBackground(request, cache)
      return cachedResponse
    }

    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log('[SW] Cache first failed:', error)
    return caches.match('/offline')
  }
}

// Handle dynamic content (stale while revalidate)
async function handleStaleWhileRevalidate(request) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const cachedResponse = await cache.match(request)

    const networkResponsePromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone())
      }
      return response
    }).catch(() => null)

    return cachedResponse || await networkResponsePromise || await caches.match('/offline')
  } catch (error) {
    console.log('[SW] Stale while revalidate failed:', error)
    return caches.match('/offline')
  }
}

// Background cache update
function updateCacheInBackground(request, cache) {
  fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response)
    }
  }).catch(() => {
    // Silent fail for background updates
  })
}

// Utility functions
function isImageRequest(url) {
  return IMAGE_EXTENSIONS.some(ext => url.includes(ext))
}

function isNetworkFirstRoute(url) {
  return NETWORK_FIRST_ROUTES.some(route => url.includes(route))
}

function isCacheableRoute(url) {
  try {
    const urlObj = new URL(url)
    return CACHE_ROUTES.some(route => {
      return urlObj.pathname === route || urlObj.pathname.startsWith(route + '/')
    })
  } catch {
    return false
  }
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag)

  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms())
  } else if (event.tag === 'demo-booking-sync') {
    event.waitUntil(syncDemoBookings())
  } else if (event.tag === 'enrollment-sync') {
    event.waitUntil(syncEnrollments())
  }
})

// Sync contact form submissions
async function syncContactForms() {
  try {
    const formData = await getStoredData('contact-forms')

    for (const form of formData) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form.data)
        })

        if (response.ok) {
          await removeStoredData('contact-forms', form.id)
          console.log('[SW] Contact form synced successfully')
        }
      } catch (error) {
        console.log('[SW] Failed to sync contact form:', error)
      }
    }
  } catch (error) {
    console.log('[SW] Contact form sync failed:', error)
  }
}

// Sync demo bookings
async function syncDemoBookings() {
  try {
    const bookingData = await getStoredData('demo-bookings')

    for (const booking of bookingData) {
      try {
        const response = await fetch('/api/demo/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(booking.data)
        })

        if (response.ok) {
          await removeStoredData('demo-bookings', booking.id)
          console.log('[SW] Demo booking synced successfully')
        }
      } catch (error) {
        console.log('[SW] Failed to sync demo booking:', error)
      }
    }
  } catch (error) {
    console.log('[SW] Demo booking sync failed:', error)
  }
}

// Sync enrollment data
async function syncEnrollments() {
  try {
    const enrollmentData = await getStoredData('enrollments')

    for (const enrollment of enrollmentData) {
      try {
        const response = await fetch('/api/enrollments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enrollment.data)
        })

        if (response.ok) {
          await removeStoredData('enrollments', enrollment.id)
          console.log('[SW] Enrollment synced successfully')
        }
      } catch (error) {
        console.log('[SW] Failed to sync enrollment:', error)
      }
    }
  } catch (error) {
    console.log('[SW] Enrollment sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('[SW] Push notification received')

  const options = {
    badge: '/icons/badge-72x72.png',
    icon: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/action-close.png'
      }
    ]
  }

  if (event.data) {
    try {
      const payload = event.data.json()

      // Customize notification based on type
      if (payload.type === 'class-reminder') {
        options.title = 'Live Class Starting Soon!'
        options.body = `Your ${payload.subject} class starts in ${payload.time} minutes`
        options.data.url = '/courses/live-classes'
        options.tag = 'class-reminder'
      } else if (payload.type === 'test-reminder') {
        options.title = 'Mock Test Available'
        options.body = `New ${payload.subject} mock test is now available`
        options.data.url = '/mock-tests'
        options.tag = 'test-reminder'
      } else if (payload.type === 'study-reminder') {
        options.title = 'Study Reminder'
        options.body = payload.message || 'Time for your daily biology revision!'
        options.data.url = '/study-materials'
        options.tag = 'study-reminder'
      } else {
        options.title = payload.title || 'Cerebrum Biology Academy'
        options.body = payload.body || 'New update available'
        options.data.url = payload.url || '/'
      }
    } catch (error) {
      console.log('[SW] Error parsing push payload:', error)
      options.title = 'Cerebrum Biology Academy'
      options.body = 'New notification'
    }
  } else {
    options.title = 'Cerebrum Biology Academy'
    options.body = 'Stay focused on your NEET preparation!'
  }

  event.waitUntil(
    self.registration.showNotification(options.title, options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification clicked:', event.action)

  event.notification.close()

  if (event.action === 'close') {
    return
  }

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      // Check if app is already open
      for (const client of clients) {
        if (client.url.includes(urlToOpen.split('?')[0]) && 'focus' in client) {
          return client.focus()
        }
      }

      // Open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Utility functions for IndexedDB operations
async function getStoredData(storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CerebrumOfflineDB', 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], 'readonly')
      const store = transaction.objectStore(storeName)
      const getAllRequest = store.getAll()

      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' })
      }
    }
  })
}

async function removeStoredData(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CerebrumOfflineDB', 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], 'readwrite')
      const store = transaction.objectStore(storeName)
      const deleteRequest = store.delete(id)

      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_MEASURE') {
    // Log performance metrics
    console.log('[SW] Performance measure:', event.data)
  }
})

console.log('[SW] Service worker script loaded successfully')