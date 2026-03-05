'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, ChevronUp, Clock, Users } from 'lucide-react'
import {
  trackAndOpenWhatsApp,
  getContextAwareMessage,
  openDesktopWhatsAppModal,
  buildWhatsAppUrl,
} from '@/lib/whatsapp/tracking'
import { getPhoneLink } from '@/lib/constants/contactInfo'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'

// High-converting CTA copy with social proof
const CTA_COPY = {
  desktop: {
    primary: 'Talk to AIIMS Expert',
    secondary: 'Avg reply: 2 mins',
    badge: '67+ AIIMS selections',
  },
  mobile: {
    callLabel: 'Call Now',
    whatsappLabel: 'WhatsApp',
  },
}

// Previously skipped /locations/, /courses/, /compare/ — but not all have local bars.
// Now FloatingCTA's mobile bar shows universally for consistent UX.

export const FloatingCTA = memo(function FloatingCTA() {
  const pathname = usePathname()
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

  // Hide on blog pages - they have their own BlogWhatsAppQuery component
  const isBlogPage = pathname?.startsWith('/blog/')
  if (isBlogPage) return null

  // Mobile sticky bar: Call with single conversion tracking (avoids double-counting)
  const handleCallClick = () => {
    trackPhoneCallConversion('global-sticky-bar-call')
  }

  const handleMobileWhatsAppClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'sticky_cta_click', {
        event_category: 'conversion',
        event_label: 'whatsapp',
        page_path: pathname,
      })
    }
    await trackAndOpenWhatsApp({
      source: 'global-sticky-bar',
      message: getContextAwareMessage(pathname || undefined),
      campaign: 'global-sticky-bar',
    })
  }

  const handleDesktopWhatsAppClick = (e: React.MouseEvent, source: string) => {
    e.preventDefault()
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'floating_cta_click', {
        event_category: 'engagement',
        event_label: 'whatsapp_qr_modal',
        page_path: pathname,
      })
    }
    const message = getContextAwareMessage(pathname || undefined)
    const whatsappUrl = buildWhatsAppUrl(message, source)
    openDesktopWhatsAppModal(whatsappUrl, message, source)
  }

  const handleDesktopCallClick = () => {
    trackPhoneCallConversion('floating-cta-call')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ===== MOBILE: Full-width Sticky CTA Bar (Above MobileBottomNav) ===== */}
      {/* Prominent Call + WhatsApp bar on all mobile pages */}
      <div className="fixed left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[55] lg:hidden" style={{ bottom: 'var(--mobile-nav-safe-height, 64px)' }}>
          <div className="flex p-2 gap-2 max-w-lg mx-auto">
            <a
              href={getPhoneLink()}
              onClick={handleCallClick}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors active:scale-95 touch-manipulation min-h-[48px]"
              aria-label="Call Dr. Shekhar now"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{CTA_COPY.mobile.callLabel}</span>
            </a>
            <button
              onClick={handleMobileWhatsAppClick}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-semibold text-sm transition-colors active:scale-95 touch-manipulation min-h-[48px]"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span>{CTA_COPY.mobile.whatsappLabel}</span>
            </button>
          </div>
        </div>

      {/* ===== DESKTOP: Call + WhatsApp Buttons ===== */}
      {/* Always visible on desktop - bottom right corner */}
      <div className="hidden lg:flex fixed bottom-8 right-8 z-[70] flex-col items-end gap-3">
        {/* Desktop Call Button */}
        <a
          href={getPhoneLink()}
          onClick={handleDesktopCallClick}
          className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          aria-label="Call Dr. Shekhar"
        >
          <Phone className="w-5 h-5" />
          <span className="whitespace-nowrap text-sm">Call Now</span>
        </a>

        {/* Desktop WhatsApp Button */}
        <button
          onClick={(e) => handleDesktopWhatsAppClick(e, 'desktop-floating-cta')}
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
        </button>
      </div>

      {/* Desktop Scroll to Top - positioned on LEFT side, above ARIA Sales Agent */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden lg:flex fixed bottom-24 left-8 z-[60] w-12 h-12 bg-gray-700 hover:bg-gray-800 rounded-full shadow-lg items-center justify-center text-white hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 animate-scaleIn"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  )
})
