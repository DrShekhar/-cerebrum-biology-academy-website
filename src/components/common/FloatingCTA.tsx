'use client'

import { useState, useEffect } from 'react'
import { Calendar, Phone, MessageCircle, X, ChevronUp } from 'lucide-react'
import Link from 'next/link'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showFloatingButton, setShowFloatingButton] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      setIsVisible(scrollTop > windowHeight * 0.5)

      const progress = scrollTop / (docHeight - windowHeight)
      setScrollProgress(Math.min(progress * 100, 100))

      // Hide floating button near bottom of page to reduce clutter
      // Show it only in the middle portion of the page
      const nearBottom = scrollTop > docHeight - windowHeight * 1.5
      setShowFloatingButton(!nearBottom && scrollTop > windowHeight * 0.3)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 10000)
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
      href: 'tel:+918826444334',
      color: 'bg-green-500 hover:bg-green-600',
      action: 'call',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20know%20more%20about%20NEET%20Biology%20courses.',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      action: 'whatsapp',
      external: true,
    },
  ]

  const handleActionClick = (action: string) => {
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
      {/* Mobile Floating CTA - Only show when not near bottom and scrolled past hero */}
      {showFloatingButton && (
        <div className="fixed bottom-24 right-4 z-[70] lg:hidden">
          {/* Expanded Actions - positioned higher to avoid bottom bar overlap */}
          {isExpanded && (
            <div className="absolute bottom-16 right-0 space-y-3 animate-fadeInUp">
              {actions.map((action, index) => {
                const Icon = action.icon
                const Component = action.external ? 'a' : Link
                const linkProps = action.external
                  ? { href: action.href, target: '_blank', rel: 'noopener noreferrer' }
                  : { href: action.href }

                return (
                  <div
                    key={action.action}
                    className="animate-fadeInRight"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Component
                      {...linkProps}
                      onClick={() => {
                        handleActionClick(action.action)
                        setIsExpanded(false)
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[48px] touch-manipulation ${action.color}`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="whitespace-nowrap">{action.label}</span>
                    </Component>
                  </div>
                )
              })}
            </div>
          )}

          {/* Main Floating Button - smaller and less intrusive */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 min-h-[48px] min-w-[48px] touch-manipulation"
          >
            {/* Progress Ring - smaller */}
            <svg className="absolute inset-0 w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="white"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                className="transition-all duration-300"
              />
            </svg>

            {/* Icon */}
            <span className="transition-transform duration-200">
              {isExpanded ? <X className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
            </span>
          </button>
        </div>
      )}

      {/* Desktop Scroll to Top - positioned on LEFT side to avoid CTA clutter */}
      {scrollProgress > 20 && (
        <button
          onClick={scrollToTop}
          className="hidden lg:flex fixed bottom-8 left-8 z-[60] w-12 h-12 bg-gray-700 hover:bg-gray-800 rounded-full shadow-lg items-center justify-center text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 animate-scaleIn"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/*
        Mobile Bottom CTA Bar REMOVED - EnhancedTouchInterface handles this
        Consolidating CTAs improves mobile UX by reducing visual clutter
        The EnhancedTouchInterface provides better touch-optimized CTAs
      */}
    </>
  )
}
