// PWA Service for Cerebrum Biology Academy
// Handles installation, notifications, offline storage, and app-like features

export interface PWAInstallPrompt {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export interface NotificationPayload {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  url?: string
  type?: 'class-reminder' | 'test-reminder' | 'study-reminder' | 'announcement'
  data?: any
}

export interface OfflineFormData {
  id: string
  type: 'contact' | 'demo-booking' | 'enrollment'
  data: any
  timestamp: number
}

class PWAService {
  private deferredPrompt: PWAInstallPrompt | null = null
  private isInstalled = false
  private notificationPermission: NotificationPermission = 'default'

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize()
    }
  }

  private initialize() {
    // Check if app is installed
    this.checkInstallStatus()

    // Listen for beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e as any
      this.dispatchEvent('pwa-installable', { canInstall: true })
    })

    // Listen for app installed
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true
      this.deferredPrompt = null
      this.dispatchEvent('pwa-installed', { installed: true })

      // Track installation
      if (window.gtag) {
        window.gtag('event', 'pwa_install', {
          event_category: 'PWA',
          event_label: 'App Installed',
        })
      }
    })

    // Check notification permission
    if ('Notification' in window) {
      this.notificationPermission = Notification.permission
    }

    // Register service worker
    this.registerServiceWorker()

    // Setup background sync
    this.setupBackgroundSync()

    // Setup periodic background sync for study reminders
    this.setupPeriodicSync()
  }

  // Service Worker Registration
  private async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        })

        console.log('[PWA] Service Worker registered:', registration.scope)

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.dispatchEvent('pwa-update-available', { registration })
              }
            })
          }
        })

        return registration
      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error)
      }
    }
  }

  // PWA Installation
  async installPWA(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.warn('[PWA] Install prompt not available')
      return false
    }

    try {
      await this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt')
        this.deferredPrompt = null
        return true
      } else {
        console.log('[PWA] User dismissed the install prompt')
        return false
      }
    } catch (error) {
      console.error('[PWA] Install prompt error:', error)
      return false
    }
  }

  // Check if PWA can be installed
  canInstall(): boolean {
    return !!this.deferredPrompt && !this.isInstalled
  }

  // Check if app is already installed
  private checkInstallStatus() {
    // Check for display mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      (window.navigator as any).standalone
    ) {
      this.isInstalled = true
    }

    // Check for PWA launch
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('utm_source') === 'pwa') {
      this.isInstalled = true
    }
  }

  // Notification Management
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('[PWA] Notifications not supported')
      return 'denied'
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    const permission = await Notification.requestPermission()
    this.notificationPermission = permission

    if (permission === 'granted') {
      console.log('[PWA] Notification permission granted')
      await this.setupPushSubscription()
    }

    return permission
  }

  // Setup push notifications
  private async setupPushSubscription() {
    try {
      const registration = await navigator.serviceWorker.ready

      if (!registration.pushManager) {
        console.warn('[PWA] Push messaging not supported')
        return
      }

      // Check for existing subscription
      let subscription = await registration.pushManager.getSubscription()

      if (!subscription) {
        // Create new subscription
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        if (vapidPublicKey) {
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey),
          })
        }
      }

      if (subscription) {
        // Send subscription to server
        await this.sendSubscriptionToServer(subscription)
        console.log('[PWA] Push subscription setup complete')
      }
    } catch (error) {
      console.error('[PWA] Push subscription setup failed:', error)
    }
  }

  // Send push subscription to server
  private async sendSubscriptionToServer(subscription: PushSubscription) {
    try {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      })
    } catch (error) {
      console.error('[PWA] Failed to send subscription to server:', error)
    }
  }

  // Schedule local notification
  scheduleNotification(payload: NotificationPayload, delay: number = 0) {
    if (this.notificationPermission !== 'granted') {
      console.warn('[PWA] Notification permission not granted')
      return
    }

    setTimeout(() => {
      this.showNotification(payload)
    }, delay)
  }

  // Show local notification
  private showNotification(payload: NotificationPayload) {
    const options: NotificationOptions = {
      body: payload.body,
      icon: payload.icon || '/icons/icon-192x192.png',
      badge: payload.badge || '/icons/badge-72x72.png',
      tag: payload.tag || 'default',
      data: {
        url: payload.url || '/',
        type: payload.type || 'announcement',
        ...payload.data,
      },
      requireInteraction: payload.type === 'class-reminder',
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'open',
          title: 'Open App',
        },
        {
          action: 'close',
          title: 'Close',
        },
      ],
    }

    new Notification(payload.title, options)
  }

  // Study Reminders
  setupStudyReminders(preferences: {
    morningTime?: string
    eveningTime?: string
    enabled: boolean
  }) {
    if (!preferences.enabled || this.notificationPermission !== 'granted') {
      return
    }

    // Schedule daily study reminders
    this.scheduleRecurringNotification(
      {
        title: 'Morning Biology Revision 🌅',
        body: 'Start your day with NEET Biology concepts!',
        type: 'study-reminder',
        url: '/study-materials',
      },
      preferences.morningTime || '08:00'
    )

    this.scheduleRecurringNotification(
      {
        title: 'Evening Practice Session 🌆',
        body: 'Time for mock tests and revision!',
        type: 'study-reminder',
        url: '/mock-tests',
      },
      preferences.eveningTime || '19:00'
    )
  }

  // Schedule recurring notifications
  private scheduleRecurringNotification(payload: NotificationPayload, time: string) {
    const [hours, minutes] = time.split(':').map(Number)
    const now = new Date()
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    const delay = scheduledTime.getTime() - now.getTime()

    setTimeout(() => {
      this.showNotification(payload)
      // Schedule for next day
      this.scheduleRecurringNotification(payload, time)
    }, delay)
  }

  // Offline Storage Management
  async storeOfflineData(data: OfflineFormData): Promise<void> {
    try {
      const db = await this.openOfflineDB()
      const transaction = db.transaction(['forms'], 'readwrite')
      const store = transaction.objectStore('forms')

      await store.add(data)
      console.log('[PWA] Data stored offline:', data.type)

      // Register background sync
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready
        if (registration.sync) {
          await registration.sync.register(`${data.type}-sync`)
        }
      }
    } catch (error) {
      console.error('[PWA] Failed to store offline data:', error)
    }
  }

  // Open IndexedDB for offline storage
  private openOfflineDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('CerebrumOfflineDB', 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = () => {
        const db = request.result

        if (!db.objectStoreNames.contains('forms')) {
          const formStore = db.createObjectStore('forms', { keyPath: 'id' })
          formStore.createIndex('type', 'type', { unique: false })
          formStore.createIndex('timestamp', 'timestamp', { unique: false })
        }

        if (!db.objectStoreNames.contains('cache')) {
          const cacheStore = db.createObjectStore('cache', { keyPath: 'key' })
          cacheStore.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
    })
  }

  // Background Sync Setup
  private async setupBackgroundSync() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready

      if (registration.sync) {
        console.log('[PWA] Background sync supported')

        // Register sync events
        window.addEventListener('online', async () => {
          try {
            await registration.sync.register('contact-form-sync')
            await registration.sync.register('demo-booking-sync')
            await registration.sync.register('enrollment-sync')
          } catch (error) {
            console.error('[PWA] Background sync registration failed:', error)
          }
        })
      }
    }
  }

  // Periodic Background Sync for study reminders
  private async setupPeriodicSync() {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready

      if ('periodicSync' in registration) {
        try {
          await (registration as any).periodicSync.register('study-reminder', {
            minInterval: 24 * 60 * 60 * 1000, // 24 hours
          })
          console.log('[PWA] Periodic sync registered for study reminders')
        } catch (error) {
          console.log('[PWA] Periodic sync not available or failed:', error)
        }
      }
    }
  }

  // App Update Management
  async updateApp(): Promise<void> {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready

      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    }
  }

  // Share API
  async shareContent(data: {
    title: string
    text: string
    url?: string
    files?: File[]
  }): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share(data)
        return true
      } catch (error) {
        console.log('[PWA] Share cancelled or failed:', error)
        return false
      }
    }

    // Fallback to clipboard
    if (navigator.clipboard && data.url) {
      try {
        await navigator.clipboard.writeText(data.url)
        return true
      } catch (error) {
        console.error('[PWA] Clipboard write failed:', error)
        return false
      }
    }

    return false
  }

  // Utility Functions
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
  }

  private dispatchEvent(eventName: string, detail: any) {
    const event = new CustomEvent(eventName, { detail })
    window.dispatchEvent(event)
  }

  // Connection Status
  isOnline(): boolean {
    return navigator.onLine
  }

  // Network Information
  getNetworkInfo() {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection

    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
      }
    }

    return null
  }

  // Performance Monitoring
  reportPerformance(metric: string, value: number, labels?: Record<string, string>) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PERFORMANCE_MEASURE',
        metric,
        value,
        labels,
        timestamp: Date.now(),
      })
    }
  }
}

// Singleton instance
export const pwaService = new PWAService()

// Export for use in components
export default pwaService
