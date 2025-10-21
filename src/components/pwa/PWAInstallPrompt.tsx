'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running in standalone mode
    const isInStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    setIsStandalone(isInStandaloneMode)

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Don't show prompt if already installed
    if (isInStandaloneMode) {
      return
    }

    // Check if user previously dismissed the prompt
    const dismissedDate = localStorage.getItem('pwa-install-dismissed')
    if (dismissedDate) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24)

      // Only show again after 7 days
      if (daysSinceDismissed < 7) {
        return
      }
    }

    // Listen for beforeinstallprompt event (Android/Desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      const event = e as BeforeInstallPromptEvent
      setDeferredPrompt(event)

      // Show prompt after 3 seconds (don't interrupt user immediately)
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // For iOS, show manual instructions after a delay
    if (iOS && !isInStandaloneMode) {
      setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    // Show the install prompt
    await deferredPrompt.prompt()

    // Wait for user choice
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === 'accepted') {
      console.log('✅ User accepted the install prompt')
    } else {
      console.log('❌ User dismissed the install prompt')
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  const handleRemindLater = () => {
    setShowPrompt(false)
    // Don't save to localStorage so it can show again later
  }

  // Don't show anything if already installed or shouldn't show
  if (isStandalone || !showPrompt) {
    return null
  }

  // iOS-specific install instructions
  if (isIOS && !deferredPrompt) {
    return (
      <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white border-2 border-blue-600 rounded-lg shadow-2xl p-4 z-50 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Install Cerebrum Biology App</h3>
            <p className="text-sm text-gray-600 mb-3">
              Get instant access to offline learning, mock tests, and AI tutor on your home screen!
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-700 font-medium mb-2">📱 How to install on iPhone:</p>
              <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                <li>
                  Tap the <strong>Share</strong> button{' '}
                  <span className="inline-block">
                    <svg className="w-3 h-3 inline" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 5l-1.42 1.42-1.59-1.59V16h-1.98V4.83L9.42 6.42 8 5l4-4 4 4zm4 5v11c0 1.1-.9 2-2 2H6c-1.11 0-2-.9-2-2V10c0-1.11.89-2 2-2h3v2H6v11h12V10h-3V8h3c1.1 0 2 .89 2 2z" />
                    </svg>
                  </span>
                </li>
                <li>
                  Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong>
                </li>
                <li>
                  Tap <strong>Add</strong> to confirm
                </li>
              </ol>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleDismiss}
                className="flex-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Not Now
              </button>
              <button
                onClick={handleRemindLater}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
              >
                Got It!
              </button>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  // Android/Desktop install prompt
  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-2xl p-4 z-50 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-white mb-1">Install Our App</h3>
          <p className="text-sm text-blue-100 mb-3">
            Get offline access to NEET Biology mock tests, AI tutor, and study materials!
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleDismiss}
              className="flex-1 px-3 py-2 text-sm text-white hover:text-blue-100 font-medium transition-colors"
            >
              Not Now
            </button>
            <button
              onClick={handleInstallClick}
              className="flex-1 px-3 py-2 text-sm bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors shadow-lg"
            >
              Install App
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-blue-200 hover:text-white"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
