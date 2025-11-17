'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { Calendar, Phone, MessageCircle, X, ChevronUp, GripVertical } from 'lucide-react'
import Link from 'next/link'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Draggable state for mobile floating button
  const [mobilePosition, setMobilePosition] = useState({ x: 0, y: 0 })
  const mobileConstraintsRef = useRef(null)

  // Draggable state for desktop scroll-to-top button
  const [desktopPosition, setDesktopPosition] = useState({ x: 0, y: 0 })
  const desktopConstraintsRef = useRef(null)

  // Show floating CTA after user scrolls past hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      // Show after scrolling past first screen
      setIsVisible(scrollTop > windowHeight * 0.5)

      // Calculate scroll progress for progress ring
      const progress = scrollTop / (docHeight - windowHeight)
      setScrollProgress(Math.min(progress * 100, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-collapse after 10 seconds when expanded
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsExpanded(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  const actions = [
    {
      icon: Calendar,
      label: 'Book Demo',
      href: '/demo-booking',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: 'book-demo',
    },
    {
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+919311946297',
      color: 'bg-green-500 hover:bg-green-600',
      action: 'call',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/919311946297?text=Hi!%20I%20want%20to%20know%20more%20about%20NEET%20Biology%20courses.',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: 'whatsapp',
      external: true,
    },
  ]

  const handleActionClick = (action: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'floating_cta_click', {
        event_category: 'engagement',
        event_label: action,
      })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <>
      {/* Drag constraints container */}
      <div ref={mobileConstraintsRef} className="fixed inset-0 pointer-events-none z-[69]" />
      <div ref={desktopConstraintsRef} className="fixed inset-0 pointer-events-none z-[59]" />

      {/* Mobile Floating CTA - Now Draggable */}
      <motion.div
        drag
        dragConstraints={mobileConstraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={(e, info) => {
          setMobilePosition({ x: info.point.x, y: info.point.y })
        }}
        initial={{ x: window.innerWidth - 80, y: window.innerHeight - 180 }}
        className="fixed z-[70] lg:hidden pointer-events-auto"
        style={{ touchAction: 'none' }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className="absolute bottom-16 right-0 space-y-3 pointer-events-auto"
            >
              {actions.map((action, index) => {
                const Icon = action.icon
                const Component = action.external ? 'a' : Link
                const linkProps = action.external
                  ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: action.href }

                return (
                  <motion.div
                    key={action.action}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Component
                      {...linkProps}
                      onClick={() => handleActionClick(action.action)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[48px] touch-manipulation ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="whitespace-nowrap">{action.label}</span>
                    </Component>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button with Drag Handle */}
        <div className="relative">
          {/* Drag handle indicator */}
          <div className="absolute -top-1 -left-1 bg-white rounded-full p-1 shadow-md pointer-events-none">
            <GripVertical className="w-3 h-3 text-gray-400" />
          </div>

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
            className="relative w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-2xl min-h-[56px] touch-manipulation pointer-events-auto"
          >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-14 h-14 transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="white"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>

            {/* Icon */}
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Calendar className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulse Animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></div>
          </motion.button>
        </div>
      </motion.div>

      {/* Desktop Scroll to Top - Now Draggable */}
      <motion.div
        drag
        dragConstraints={desktopConstraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={(e, info) => {
          setDesktopPosition({ x: info.point.x, y: info.point.y })
        }}
        initial={{ x: window.innerWidth - 100, y: window.innerHeight - 100 }}
        animate={{ opacity: scrollProgress > 20 ? 1 : 0, scale: scrollProgress > 20 ? 1 : 0 }}
        className="hidden lg:block fixed z-[60] pointer-events-auto"
        style={{ touchAction: 'none' }}
      >
        <div className="relative">
          {/* Drag handle indicator */}
          <div className="absolute -top-1 -left-1 bg-white rounded-full p-1 shadow-md pointer-events-none">
            <GripVertical className="w-3 h-3 text-gray-400" />
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              scrollToTop()
            }}
            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 pointer-events-auto"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Fixed Bottom CTA Bar for Mobile - Hidden when course-specific CTA is present */}
      <div className="fixed bottom-0 left-0 right-0 z-[50] lg:hidden bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-3 divide-x divide-gray-200">
          {actions.map((action) => {
            const Icon = action.icon
            const Component = action.external ? 'a' : Link
            const linkProps = action.external
              ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
              : { href: action.href }

            return (
              <Component
                key={action.action}
                {...linkProps}
                onClick={() => handleActionClick(action.action)}
                className="flex flex-col items-center justify-center py-3 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors min-h-[60px] touch-manipulation"
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{action.label}</span>
              </Component>
            )
          })}
        </div>
      </div>

      {/* Spacer for fixed bottom bar */}
      <div className="h-16 lg:hidden"></div>
    </>
  )
}
