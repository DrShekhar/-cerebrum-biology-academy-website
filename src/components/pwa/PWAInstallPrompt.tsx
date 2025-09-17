'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Smartphone, Star, Zap, Clock, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import pwaService from '@/lib/pwa/pwaService'

interface PWAInstallPromptProps {
  className?: string
  showDelay?: number
  position?: 'bottom-center' | 'top-center' | 'center'
}

export function PWAInstallPrompt({
  className = '',
  showDelay = 30000, // Show after 30 seconds
  position = 'bottom-center',
}: PWAInstallPromptProps) {
  const [canInstall, setCanInstall] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for PWA events
    const handleInstallable = () => {
      setCanInstall(true)
      // Show prompt after delay for engaged users
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, showDelay)

      return () => clearTimeout(timer)
    }

    const handleInstalled = () => {
      setIsInstalled(true)
      setIsVisible(false)
      setCanInstall(false)
    }

    window.addEventListener('pwa-installable', handleInstallable)
    window.addEventListener('pwa-installed', handleInstalled)

    // Check initial state
    if (pwaService.canInstall()) {
      setCanInstall(true)
    }

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable)
      window.removeEventListener('pwa-installed', handleInstalled)
    }
  }, [showDelay])

  const handleInstall = async () => {
    setIsInstalling(true)

    try {
      const success = await pwaService.installPWA()

      if (success) {
        setIsVisible(false)
        setCanInstall(false)

        // Track installation
        if (window.gtag) {
          window.gtag('event', 'pwa_install_prompt_accepted', {
            event_category: 'PWA',
            event_label: 'Install Prompt',
          })
        }
      }
    } catch (error) {
      console.error('PWA installation failed:', error)
    } finally {
      setIsInstalling(false)
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)

    // Track dismissal
    if (window.gtag) {
      window.gtag('event', 'pwa_install_prompt_dismissed', {
        event_category: 'PWA',
        event_label: 'Install Prompt',
      })
    }

    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-center':
        return 'bottom-6 left-1/2 transform -translate-x-1/2'
      case 'top-center':
        return 'top-6 left-1/2 transform -translate-x-1/2'
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      default:
        return 'bottom-6 left-1/2 transform -translate-x-1/2'
    }
  }

  // Don't show if not installable, already installed, or dismissed
  if (!canInstall || isInstalled || sessionStorage.getItem('pwa-install-dismissed')) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleDismiss}
          />

          {/* Install Prompt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className={`fixed ${getPositionClasses()} z-50 max-w-md w-full mx-4 ${className}`}
          >
            <Card className="border-2 border-primary/20 shadow-2xl bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Install Our App</CardTitle>
                      <Badge className="bg-green-100 text-green-800 border-green-200 mt-1">
                        <Star className="w-3 h-3 mr-1" />
                        Recommended
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Get the full Cerebrum Biology Academy experience with our app for faster access
                  and offline features.
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Zap className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">Instant loading</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700">Offline access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700">Study reminders</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Download className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-700">No app store</span>
                  </div>
                </div>

                {/* App Preview */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-primary">NEET Biology App</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Access courses, mock tests, and study materials directly from your home screen.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button
                    onClick={handleInstall}
                    disabled={isInstalling}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {isInstalling ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Installing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Install App
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleDismiss}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Maybe Later
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center space-x-4 pt-2 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span>No tracking</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Success message component for post-installation
export function PWAInstallSuccess() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleInstalled = () => {
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 5000)
    }

    window.addEventListener('pwa-installed', handleInstalled)
    return () => window.removeEventListener('pwa-installed', handleInstalled)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Card className="border-2 border-green-200 bg-green-50 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">App Installed Successfully!</h3>
                  <p className="text-sm text-green-700">
                    Cerebrum Biology Academy is now available on your home screen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
