'use client'

import React, { useEffect, useState } from 'react'
import { useIndianMobileOptimizations } from '@/lib/mobile/indianMobileOptimizations'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, BookOpen, Play, MessageCircle, Clock } from 'lucide-react'

interface TouchAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  color: string
  priority: 'high' | 'medium' | 'low'
  hindi?: string
}

interface EnhancedTouchInterfaceProps {
  onDemoBooking?: () => void
  onCallNow?: () => void
  onChatOpen?: () => void
  className?: string
}

export function EnhancedTouchInterface({
  onDemoBooking,
  onCallNow,
  onChatOpen,
  className = '',
}: EnhancedTouchInterfaceProps) {
  const { isSlowNetwork, shouldReduceAnimations, deviceInfo } = useIndianMobileOptimizations()
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [showHindi, setShowHindi] = useState(false)

  // Detect if user might prefer Hindi
  useEffect(() => {
    const lang = navigator.language || navigator.languages?.[0] || ''
    setShowHindi(lang.includes('hi') || lang.includes('IN'))
  }, [])

  const touchActions: TouchAction[] = [
    {
      id: 'demo',
      label: 'Free Demo',
      hindi: 'फ्री डेमो',
      icon: Play,
      action: () => onDemoBooking?.(),
      color: 'bg-green-600',
      priority: 'high',
    },
    {
      id: 'call',
      label: 'Call Now',
      hindi: 'कॉल करें',
      icon: Phone,
      action: () => onCallNow?.(),
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      priority: 'high',
    },
    {
      id: 'courses',
      label: 'View Courses',
      hindi: 'कोर्सेज देखें',
      icon: BookOpen,
      action: () => {
        const coursesElement = document.querySelector('#courses')
        const offsetTop = coursesElement instanceof HTMLElement ? coursesElement.offsetTop : 800
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        })
      },
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      priority: 'medium',
    },
    {
      id: 'chat',
      label: 'Ask Doubts',
      hindi: 'डाउट पूछें',
      icon: MessageCircle,
      action: () => onChatOpen?.(),
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      priority: 'medium',
    },
  ]

  const handleTouchStart = (actionId: string) => {
    setActiveAction(actionId)
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  const handleTouchEnd = () => {
    setActiveAction(null)
  }

  const handleAction = (action: TouchAction) => {
    // Track interaction
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'mobile_touch_action', {
        action_id: action.id,
        action_label: action.label,
        device_info: deviceInfo,
        network_slow: isSlowNetwork,
      })
    }

    action.action()
  }

  // Simplified animations for slow devices
  const animationConfig = shouldReduceAnimations
    ? { duration: 0.1, ease: 'linear' as const }
    : { duration: 0.3, ease: 'easeOut' as const }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}>
      {/* Enhanced mobile CTA bar */}
      <div className="bg-white border-t-2 border-gray-100 shadow-xl">
        {/* Quick Stats Bar for Trust Building */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 border-b">
          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium">
                {showHindi ? '98% सफलता दर' : '98% Success Rate'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-600" />
              <span className="text-blue-700 font-medium">
                {showHindi ? '24/7 सपोर्ट' : '24/7 Support'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {touchActions
            .filter((action) => action.priority === 'high')
            .map((action) => (
              <motion.button
                key={action.id}
                onTouchStart={() => handleTouchStart(action.id)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={() => handleTouchStart(action.id)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                onClick={() => handleAction(action)}
                className={`
                ${action.color}
                text-white font-bold py-4 px-6 rounded-xl
                flex items-center justify-center gap-3
                shadow-lg active:shadow-md
                transform transition-all duration-150
                ${activeAction === action.id ? 'scale-95' : 'scale-100'}
                ${isSlowNetwork ? '' : 'hover:scale-105'}
                min-h-[64px] touch-manipulation
                focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${action.id === 'demo' ? 'focus:ring-green-300' : 'focus:ring-blue-300'}
              `}
                whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
                transition={animationConfig}
              >
                <action.icon className="h-6 w-6 flex-shrink-0" />
                <div className="text-center">
                  <div className="text-base font-bold">
                    {showHindi && action.hindi ? action.hindi : action.label}
                  </div>
                  {action.id === 'demo' && (
                    <div className="text-xs opacity-90">
                      {showHindi ? 'बिल्कुल फ्री!' : 'Absolutely Free!'}
                    </div>
                  )}
                </div>
              </motion.button>
            ))}
        </div>

        {/* Secondary Actions - Collapsible */}
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={animationConfig}
            className="border-t border-gray-100"
          >
            <div className="grid grid-cols-2 gap-2 p-3">
              {touchActions
                .filter((action) => action.priority === 'medium')
                .map((action) => (
                  <motion.button
                    key={action.id}
                    onTouchStart={() => handleTouchStart(action.id)}
                    onTouchEnd={handleTouchEnd}
                    onClick={() => handleAction(action)}
                    className={`
                    ${action.color}
                    text-white font-semibold py-3 px-4 rounded-lg
                    flex items-center justify-center gap-2
                    shadow-md active:shadow-sm
                    transform transition-all duration-150
                    ${activeAction === action.id ? 'scale-95' : 'scale-100'}
                    min-h-[48px] touch-manipulation
                    text-sm
                  `}
                    whileTap={shouldReduceAnimations ? {} : { scale: 0.95 }}
                    transition={animationConfig}
                  >
                    <action.icon className="h-4 w-4" />
                    <span>{showHindi && action.hindi ? action.hindi : action.label}</span>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Safe area padding for newer iPhones */}
        <div className="h-2" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </div>

      {/* Floating Success Stories Ticker for Trust Building */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, ...animationConfig }}
          className="absolute bottom-full left-4 right-4 mb-2"
        >
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 px-4 py-2 rounded-lg shadow-lg">
            <div className="text-xs font-medium text-center">
              {showHindi
                ? '🎉 राहुल शर्मा ने NEET में 355/360 स्कोर किया - AIIMS दिल्ली में एडमिशन!'
                : '🎉 Rahul Sharma scored 355/360 in NEET - Admitted to AIIMS Delhi!'}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Hook for managing mobile touch interactions
export function useMobileTouchOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [touchDevice, setTouchDevice] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Add touch-friendly global styles
  useEffect(() => {
    if (touchDevice) {
      const style = document.createElement('style')
      style.textContent = `
        /* Enhanced touch targets for Indian users */
        .touch-target {
          min-height: 44px;
          min-width: 44px;
        }

        /* Improved button spacing for thumb navigation */
        .mobile-button-group > * + * {
          margin-left: 12px;
        }

        /* Optimized input fields for mobile keyboards */
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        textarea {
          font-size: 16px !important; /* Prevent zoom on iOS */
          padding: 12px !important;
          border-radius: 8px !important;
        }

        /* Better focus visibility for accessibility */
        button:focus,
        input:focus,
        select:focus,
        textarea:focus {
          outline: 3px solid rgba(59, 130, 246, 0.5) !important;
          outline-offset: 2px !important;
        }

        /* Improved tap highlighting */
        .mobile-cta {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          user-select: none;
        }
      `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [touchDevice])

  return { isMobile, touchDevice }
}
