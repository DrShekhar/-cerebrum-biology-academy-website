'use client'

import { useState, useEffect, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface PWAStatus {
  isInstalled: boolean
  isInstallable: boolean
  isOnline: boolean
  isUpdateAvailable: boolean
  isOfflineReady: boolean
  swRegistration: ServiceWorkerRegistration | null
}

interface UsePWAReturn extends PWAStatus {
  installPWA: () => Promise<boolean>
  updatePWA: () => Promise<void>
  clearCache: () => Promise<void>
  getCacheStatus: () => Promise<{ cacheSize: number; networkQuality: string } | null>
}

export function usePWA(): UsePWAReturn {
  const [status, setStatus] = useState<PWAStatus>({
    isInstalled: false,
    isInstallable: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isUpdateAvailable: false,
    isOfflineReady: false,
    swRegistration: null,
  })

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isIosStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone
      setStatus((prev) => ({ ...prev, isInstalled: isStandalone || !!isIosStandalone }))
    }

    checkInstalled()

    const handleOnline = () => setStatus((prev) => ({ ...prev, isOnline: true }))
    const handleOffline = () => setStatus((prev) => ({ ...prev, isOnline: false }))

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setStatus((prev) => ({ ...prev, isInstallable: true }))
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setStatus((prev) => ({ ...prev, isInstalled: true, isInstallable: false }))
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          setStatus((prev) => ({
            ...prev,
            swRegistration: registration,
            isOfflineReady: true,
          }))

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setStatus((prev) => ({ ...prev, isUpdateAvailable: true }))
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error)
        })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const installPWA = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false
    }

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setDeferredPrompt(null)
      setStatus((prev) => ({ ...prev, isInstallable: false }))
      return true
    }

    return false
  }, [deferredPrompt])

  const updatePWA = useCallback(async (): Promise<void> => {
    const { swRegistration } = status

    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }, [status])

  const clearCache = useCallback(async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!navigator.serviceWorker.controller) {
        reject(new Error('No service worker controller'))
        return
      }

      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = (event) => {
        if (event.data?.type === 'CACHE_CLEARED') {
          resolve()
        } else {
          reject(new Error('Failed to clear cache'))
        }
      }

      navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' }, [
        messageChannel.port2,
      ])
    })
  }, [])

  const getCacheStatus = useCallback(async (): Promise<{
    cacheSize: number
    networkQuality: string
  } | null> => {
    return new Promise((resolve) => {
      if (!navigator.serviceWorker.controller) {
        resolve(null)
        return
      }

      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = (event) => {
        resolve(event.data)
      }

      navigator.serviceWorker.controller.postMessage({ type: 'GET_CACHE_STATUS' }, [
        messageChannel.port2,
      ])

      setTimeout(() => resolve(null), 5000)
    })
  }, [])

  return {
    ...status,
    installPWA,
    updatePWA,
    clearCache,
    getCacheStatus,
  }
}

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

export function useServiceWorkerMessage() {
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null)

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    const handleMessage = (event: MessageEvent) => {
      setLastMessage(event)
    }

    navigator.serviceWorker.addEventListener('message', handleMessage)

    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage)
    }
  }, [])

  const sendMessage = useCallback((message: unknown) => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message)
    }
  }, [])

  return { lastMessage, sendMessage }
}

export function useOfflineQueue() {
  const { sendMessage, lastMessage } = useServiceWorkerMessage()
  const [pendingActions, setPendingActions] = useState<number>(0)

  useEffect(() => {
    if (lastMessage?.data?.type === 'ACTION_QUEUED') {
      setPendingActions((prev) => prev + 1)
    } else if (lastMessage?.data?.type === 'SYNC_COMPLETE') {
      setPendingActions(0)
    }
  }, [lastMessage])

  const queueAction = useCallback(
    (action: {
      type: string
      url: string
      method?: string
      body?: unknown
      headers?: Record<string, string>
    }) => {
      sendMessage({ type: 'QUEUE_ACTION', action })
    },
    [sendMessage]
  )

  return { queueAction, pendingActions }
}
