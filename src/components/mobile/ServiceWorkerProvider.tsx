'use client'

import { useEffect, useState } from 'react'
import { useMobileOptimization } from '@/lib/performance/mobileOptimization'

interface ServiceWorkerProviderProps {
  children: React.ReactNode
}

export default function ServiceWorkerProvider({ children }: ServiceWorkerProviderProps) {
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const { isDataSaverMode, isLowEndDevice } = useMobileOptimization()

  useEffect(() => {
    // Disable service worker in development to prevent caching issues
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
      registerServiceWorker()
    }

    // PWA Install prompt handling
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // Handle app installed
    window.addEventListener('appinstalled', () => {
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
      console.log('📱 Cerebrum Biology Academy PWA installed!')
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })

      setSwRegistration(registration)

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setIsUpdateAvailable(true)
            }
          })
        }
      })

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATED') {
          setIsUpdateAvailable(true)
        }
      })

      // Initial registration successful
      console.log('🚀 Service Worker registered successfully')

      // Activate immediately for development
      if (process.env.NODE_ENV === 'development') {
        navigator.serviceWorker.ready.then((registration) => {
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          }
        })
      }
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  }

  const handleUpdateApp = () => {
    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
      setIsUpdateAvailable(false)
      window.location.reload()
    }
  }

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('📱 User accepted the install prompt')
      } else {
        console.log('📱 User dismissed the install prompt')
      }

      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  const handleDismissInstall = () => {
    setShowInstallPrompt(false)
    // Don't show again for this session
    sessionStorage.setItem('dismissedInstallPrompt', 'true')
  }

  // Don't show install prompt if dismissed in this session
  const shouldShowInstallPrompt =
    showInstallPrompt && !sessionStorage.getItem('dismissedInstallPrompt')

  return (
    <>
      {children}

      {/* Update Available Notification */}
      {isUpdateAvailable && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-3 z-50 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2">🔄</span>
            <span className="text-sm">
              {isDataSaverMode ? 'अपडेट उपलब्ध' : 'New version available'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleUpdateApp}
              className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium"
            >
              {isDataSaverMode ? 'अपडेट' : 'Update'}
            </button>
            <button
              onClick={() => setIsUpdateAvailable(false)}
              className="text-white opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Install App Prompt */}
      {shouldShowInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 max-w-sm mx-auto">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📱</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">
                ऐप इंस्टॉल करें • Install App
              </h3>
              <p className="text-gray-600 text-xs mb-3">
                {isDataSaverMode
                  ? 'तेज़ एक्सेस के लिए होम स्क्रीन पर जोड़ें'
                  : 'Add to home screen for faster access and offline learning'}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={handleInstallApp}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex-1"
                >
                  इंस्टॉल • Install
                </button>
                <button
                  onClick={handleDismissInstall}
                  className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium"
                >
                  बाद में • Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Network Status Indicator */}
      <NetworkStatusIndicator />
    </>
  )
}

// Network status component
function NetworkStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [networkSpeed, setNetworkSpeed] = useState<string>('unknown')

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    const updateNetworkInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        setNetworkSpeed(connection.effectiveType || 'unknown')
      }
    }

    setIsOnline(navigator.onLine)
    updateNetworkInfo()

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      connection.addEventListener('change', updateNetworkInfo)
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      if ('connection' in navigator) {
        const connection = (navigator as any).connection
        connection.removeEventListener('change', updateNetworkInfo)
      }
    }
  }, [])

  if (isOnline && networkSpeed !== 'slow-2g' && networkSpeed !== '2g') {
    return null // Don't show indicator for good connections
  }

  return (
    <div
      className={`fixed top-4 right-4 px-3 py-2 rounded-lg text-xs font-medium z-40 ${
        !isOnline ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
      }`}
    >
      <div className="flex items-center space-x-1">
        <span>{!isOnline ? '📵' : '🐌'}</span>
        <span>{!isOnline ? 'ऑफलाइन • Offline' : `${networkSpeed.toUpperCase()} नेटवर्क`}</span>
      </div>
    </div>
  )
}

// Hook for service worker functionality
export function useServiceWorker() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [cacheStatus, setCacheStatus] = useState<{
    cacheSize: number
    networkQuality: string
  } | null>(null)

  useEffect(() => {
    // Check if app is installed (running in standalone mode)
    setIsInstalled(window.matchMedia('(display-mode: standalone)').matches)

    // Get cache status from service worker
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (event) => {
        setCacheStatus(event.data)
      }

      navigator.serviceWorker.controller.postMessage({ type: 'GET_CACHE_STATUS' }, [
        messageChannel.port2,
      ])
    }
  }, [])

  const clearCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map((name) => caches.delete(name)))
      console.log('🗑️ All caches cleared')
    }
  }

  return {
    isInstalled,
    cacheStatus,
    clearCache,
  }
}
