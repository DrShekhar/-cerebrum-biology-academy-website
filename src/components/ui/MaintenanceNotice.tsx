'use client'

import { useState, useEffect } from 'react'
import { X, AlertCircle, Settings } from 'lucide-react'

interface MaintenanceNoticeProps {
  autoHideDuration?: number // Auto-hide after X seconds (0 = never auto-hide)
  showCloseButton?: boolean
}

export function MaintenanceNotice({
  autoHideDuration = 6, // Auto-hide after 6 seconds
  showCloseButton = true,
}: MaintenanceNoticeProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // Show notice after small delay and handle auto-hide
  useEffect(() => {
    if (isDismissed) return

    // Check if user has already dismissed this notice in this session
    const hasSeenNotice = sessionStorage.getItem('maintenance-notice-dismissed')
    if (hasSeenNotice) {
      return
    }

    // Show after 1 second
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    // Auto-hide after specified duration (in seconds)
    let hideTimer: NodeJS.Timeout
    if (autoHideDuration > 0) {
      hideTimer = setTimeout(
        () => {
          setIsVisible(false)
        },
        (autoHideDuration + 1) * 1000
      ) // +1 to account for show delay
    }

    return () => {
      clearTimeout(showTimer)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [autoHideDuration, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    // Remember dismissal for this session
    sessionStorage.setItem('maintenance-notice-dismissed', 'true')
  }

  if (!isVisible || isDismissed) return null

  return (
<div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fadeInUp"
        onClick={handleDismiss}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeInUp"
        >
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 opacity-20 animate-pulse" />

          {/* Content */}
          <div className="relative bg-white rounded-2xl p-6 sm:p-8">
            {/* Close Button */}
            {showCloseButton && (
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 group"
                aria-label="Close maintenance notice"
              >
                <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
              </button>
            )}

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <div
                   className="animate-fadeInUp">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-md opacity-50 animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
              Site Under Maintenance
            </h3>

            {/* Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Some features or pages may not be working as expected. We're working to bring
                    everything back online soon.
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <p className="text-center text-sm text-gray-500">Thank you for your patience!</p>

            {/* Auto-dismiss indicator */}
            {autoHideDuration > 0 && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-1 bg-gradient-to-r from-yellow-400 to-orange-500 animate-fadeInUp"
                  />
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Auto-closing in {autoHideDuration} seconds
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
)
}
