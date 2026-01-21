'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { usePathname } from 'next/navigation'
import { Calendar, Phone, MessageCircle, X, ChevronUp, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { trackAndOpenWhatsApp, getContextAwareMessage, getUTMParams } from '@/lib/whatsapp/tracking'
import { getPhoneLink } from '@/lib/constants/contactInfo'

// High-converting CTA copy with social proof
const CTA_COPY = {
  desktop: {
    primary: 'Talk to AIIMS Expert',
    secondary: 'Avg reply: 2 mins',
    badge: '500+ selections',
  },
  mobile: {
    primary: 'Ask Dr. Shekhar',
    badge: '2 min reply',
  },
}

export const FloatingCTA = memo(function FloatingCTA() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const rafRef = useRef<number | null>(null)
  const lastScrollRef = useRef(0)

  const handleScroll = useCallback(() => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY

      if (Math.abs(scrollTop - lastScrollRef.current) < 10) {
        rafRef.current = null
        return
      }
      lastScrollRef.current = scrollTop

      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      const progress = scrollTop / (docHeight - windowHeight)
      const newScrollProgress = Math.min(progress * 100, 100)

      setScrollProgress(newScrollProgress)
      setShowScrollTop(scrollTop > windowHeight * 0.3)

      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll])

  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setIsExpanded(false), 10000)
      return () => clearTimeout(timer)
    }
  }, [isExpanded])

  // Secondary actions for expanded menu
  const secondaryActions = [
    {
      icon: Phone,
      label: 'Call Now',
      href: getPhoneLink(),
      color: 'bg-blue-600 hover:bg-blue-700',
      action: 'call',
    },
  ]

  const handleWhatsAppClick = async (e: React.MouseEvent, source: string) => {
    e.preventDefault()

    // Track with gtag
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'floating_cta_click', {
        event_category: 'engagement',
        event_label: 'whatsapp',
      })
    }

    // Use context-aware message based on current page
    await trackAndOpenWhatsApp({
      source,
      message: getContextAwareMessage(pathname || undefined),
      campaign: 'floating-cta',
    })
  }

  const handleSecondaryClick = (action: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'floating_cta_click', {
        event_category: 'engagement',
        event_label: action,
      })
    }
    setIsExpanded(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Hide on blog pages - they have their own BlogWhatsAppQuery component
  const isBlogPage = pathname?.startsWith('/blog/')

  if (isBlogPage) return null

  return (
    <>
      {/* ===== MOBILE: Direct WhatsApp Button (Single Tap!) ===== */}
      {/* Always visible, no scroll requirement, direct WhatsApp access */}
      <div className="fixed bottom-20 sm:bottom-24 left-3 sm:left-4 z-[60] lg:hidden">
        {/* Secondary Actions (Call, Book Demo) - only when expanded */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-fadeInUp">
            {secondaryActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div
                  key={action.action}
                  className="animate-fadeInRight"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link
                    href={action.href}
                    onClick={() => handleSecondaryClick(action.action)}
                    className={`flex items-center justify-center gap-2 w-[140px] py-3 rounded-xl text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[48px] touch-manipulation ${action.color}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="whitespace-nowrap text-sm">{action.label}</span>
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* Main WhatsApp Button - DIRECT LINK (single tap!) */}
        <div className="flex flex-col items-end gap-2">
          {/* Expand/Collapse for secondary actions */}
          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="w-10 h-10 bg-gray-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:bg-gray-700"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Primary WhatsApp Button - Enhanced with label */}
          <div className="flex flex-col items-center">
            <button
              onClick={(e) => handleWhatsAppClick(e, 'mobile-floating-cta')}
              aria-label="Chat on WhatsApp"
              className="relative w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 min-h-[48px] min-w-[48px] touch-manipulation animate-bounce-subtle"
            >
              {/* WhatsApp Icon */}
              <MessageCircle className="w-7 h-7" />

              {/* Notification dot - aria-hidden to exclude from accessible name */}
              <span
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-[10px] font-bold text-white">1</span>
              </span>
            </button>
            {/* CTA Label with social proof */}
            <span className="mt-1 px-2 py-0.5 bg-white/95 rounded text-[10px] font-semibold text-gray-800 shadow-sm whitespace-nowrap">
              {CTA_COPY.mobile.badge}
            </span>
          </div>

          {/* More Options Toggle */}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-8 h-8 bg-gray-500 rounded-full shadow-md flex items-center justify-center text-white text-xs font-medium transition-all duration-300 hover:bg-gray-600"
              aria-label="+1 more contact option"
            >
              <span aria-hidden="true">+1</span>
            </button>
          )}
        </div>
      </div>

      {/* ===== DESKTOP: Sticky WhatsApp Button ===== */}
      {/* Always visible on desktop - bottom right corner */}
      <div className="hidden lg:flex fixed bottom-8 right-8 z-[70] flex-col items-end gap-3">
        {/* Secondary Actions - shown when expanded */}
        {isExpanded && (
          <div className="flex flex-col gap-2 animate-fadeInUp">
            {secondaryActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.action}
                  href={action.href}
                  onClick={() => handleSecondaryClick(action.action)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-full text-white font-medium shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${action.color}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{action.label}</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Main Desktop WhatsApp Button with Label */}
        <div className="flex items-center gap-3">
          {/* Expand toggle */}
          {isExpanded ? (
            <button
              onClick={() => setIsExpanded(false)}
              className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsExpanded(true)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-full shadow-lg text-white text-sm font-medium transition-all duration-300"
              aria-label="More options"
            >
              More
            </button>
          )}

          {/* Primary WhatsApp CTA - Enhanced with social proof */}
          <button
            onClick={(e) => handleWhatsAppClick(e, 'desktop-floating-cta')}
            className="group flex items-center gap-3 px-6 py-4 bg-[#25D366] hover:bg-[#20BD5A] rounded-2xl shadow-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            aria-label={`${CTA_COPY.desktop.primary} on WhatsApp`}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="whitespace-nowrap font-bold">{CTA_COPY.desktop.primary}</span>
              </div>
              <div className="flex items-center gap-2 text-xs opacity-90 mt-0.5">
                <Clock className="w-3 h-3" />
                <span>{CTA_COPY.desktop.secondary}</span>
                <span className="mx-1">•</span>
                <Users className="w-3 h-3" />
                <span>{CTA_COPY.desktop.badge}</span>
              </div>
            </div>

            {/* Notification indicator */}
            <span className="relative flex h-3 w-3 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Scroll to Top - positioned on LEFT side */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden lg:flex fixed bottom-8 left-8 z-[60] w-12 h-12 bg-gray-700 hover:bg-gray-800 rounded-full shadow-lg items-center justify-center text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 animate-scaleIn"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  )
})
