'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MaintenancePopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 300)
  }, [])

  useEffect(() => {
    // Show popup after page is fully loaded
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (isVisible && !isExiting) {
      // Auto-dismiss after 5 seconds
      const dismissTimer = setTimeout(() => {
        handleClose()
      }, 5000)

      return () => clearTimeout(dismissTimer)
    }
  }, [isVisible, isExiting, handleClose])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50',
        'w-[95px] min-h-[75px] p-2',
        'bg-gradient-to-br from-amber-50 to-orange-50',
        'border border-amber-300 rounded-lg shadow-lg',
        'transform transition-all duration-300 ease-out',
        isExiting ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100'
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className={cn(
          'absolute top-1 right-1',
          'w-8 h-8 rounded-full',
          'bg-amber-500 hover:bg-yellow-600',
          'flex items-center justify-center',
          'text-white shadow-md',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-amber-400'
        )}
        aria-label="Close maintenance notice"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Icon */}
      <div className="flex justify-center mb-1">
        <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center animate-pulse">
          <Wrench className="w-3.5 h-3.5 text-yellow-600" />
        </div>
      </div>

      {/* Message */}
      <p className="text-[8px] leading-tight text-yellow-800 text-center font-medium">
        Site under maintenance. Some features may not work.
      </p>

      {/* Progress bar */}
      <div className="mt-1.5 h-0.5 bg-amber-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-amber-500 rounded-full"
          style={{
            animation: 'maintenance-countdown 5s linear forwards',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes maintenance-countdown {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}
