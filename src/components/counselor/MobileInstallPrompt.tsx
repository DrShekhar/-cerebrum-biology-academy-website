'use client'

import { useState, useEffect } from 'react'
import { X, Download, Smartphone } from 'lucide-react'
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function MobileInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      setIsInstalled(true)
      return
    }

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem('installPromptDismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
      if (daysSinceDismissed < 7) {
        // Don't show again for 7 days
        return
      }
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after 30 seconds of usage
      setTimeout(() => {
        setShowPrompt(true)
      }, 30000)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('installPromptDismissed', Date.now().toString())
  }

  if (isInstalled || !showPrompt) return null

  return (
{showPrompt && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-fadeInUp"
            onClick={handleDismiss}
          />

          {/* Prompt Card */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl animate-fadeInUp"
          >
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="flex items-center justify-center mb-4">
                <div className="bg-indigo-100 rounded-full p-4">
                  <Smartphone className="w-8 h-8 text-indigo-600" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                Install Counselor CRM
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 text-center mb-6">
                Get instant access to your leads, tasks, and notifications. Works offline and feels
                like a native app!
              </p>

              {/* Features */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Quick access from your home screen</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Works offline for seamless productivity</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Push notifications for important updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>Faster than the web version</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDismiss}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                >
                  Not Now
                </button>
                <button
                  onClick={handleInstallClick}
                  className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install
                </button>
              </div>

              {/* Privacy note */}
              <p className="text-xs text-gray-500 text-center mt-4">
                This app will use ~5MB of storage on your device
              </p>
            </div>
          </div>
        </>
      )}
)
}
