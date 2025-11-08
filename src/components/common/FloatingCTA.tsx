'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Phone, MessageCircle, X, ChevronUp } from 'lucide-react'
import Link from 'next/link'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

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
      href: '/support/demo',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: 'book-demo',
    },
    {
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+918826444334',
      color: 'bg-green-500 hover:bg-green-600',
      action: 'call',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/918826444334?text=Hi! I want to know more about NEET Biology courses.',
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
      {/* Mobile Floating CTA */}
      <div className="fixed bottom-28 right-4 z-[70] lg:hidden">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              className="absolute bottom-16 right-0 space-y-3"
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

        {/* Main Floating Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white transition-all duration-300 hover:shadow-2xl min-h-[56px] touch-manipulation"
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

      {/* Desktop Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: scrollProgress > 20 ? 1 : 0, scale: scrollProgress > 20 ? 1 : 0 }}
        onClick={scrollToTop}
        className="hidden lg:block fixed bottom-8 right-8 z-[60] w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>

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
