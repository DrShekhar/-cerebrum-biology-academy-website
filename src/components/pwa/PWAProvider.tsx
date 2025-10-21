'use client'

import { useEffect } from 'react'
import { PWAInstallPrompt } from './PWAInstallPrompt'

export function PWAProvider() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const registerServiceWorker = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          })

          console.log('✅ Service Worker registered successfully:', registration.scope)

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available, prompt user to refresh
                  console.log('🔄 New service worker available, please refresh')

                  // Optional: Show update notification
                  if (confirm('New version available! Click OK to update and reload the page.')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' })
                    window.location.reload()
                  }
                }
              })
            }
          })

          // Check for updates every hour
          setInterval(
            () => {
              registration.update()
            },
            60 * 60 * 1000
          )
        } catch (error) {
          console.error('❌ Service Worker registration failed:', error)
        }
      }

      // Register service worker after page load to not block critical resources
      if (document.readyState === 'complete') {
        registerServiceWorker()
      } else {
        window.addEventListener('load', registerServiceWorker)
      }

      // Request notification permission for push notifications
      if ('Notification' in window && Notification.permission === 'default') {
        // Don't auto-request, let user trigger it
        console.log('📬 Push notifications available (permission not yet requested)')
      }
    } else {
      console.log('⚠️ Service Worker not supported in this browser')
    }
  }, [])

  return <PWAInstallPrompt />
}
