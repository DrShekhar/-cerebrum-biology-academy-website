'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, ChevronUp, Clock, Users } from 'lucide-react'
import {
  getContextAwareMessage,
  openDesktopWhatsAppModal,
  buildWhatsAppUrl,
} from '@/lib/whatsapp/tracking'
import { getPhoneLink } from '@/lib/constants/contactInfo'
import { trackPhoneCall, trackWhatsAppLead } from '@/lib/ads/googleAdsConversion'

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

  const handleCallClick = () => {
    trackPhoneCall('global-sticky-bar-call', 100)
  }

  const mobileWhatsAppHref = buildWhatsAppUrl(
    getContextAwareMessage(pathname || undefined),
    'global-sticky-bar'
  )

  const handleMobileWhatsAppClick = () => {
    trackWhatsAppLead('global-sticky-bar', 50)
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
    trackPhoneCall('floating-cta-call', 100)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* ===== MOBILE: Full-width Sticky CTA Bar (Above MobileBottomNav) ===== */}
      {/* Prominent Call + WhatsApp bar on all mobile pages */}
      <div
        className="fixed left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[55] hidden"
        style={{ bottom: 'var(--mobile-nav-safe-height, 64px)' }}
      >
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
          <a
            href={mobileWhatsAppHref}
            onClick={handleMobileWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl font-semibold text-sm transition-colors active:scale-95 touch-manipulation min-h-[48px]"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
            <span>{CTA_COPY.mobile.whatsappLabel}</span>
          </a>
        </div>
      </div>

      {/* ===== DESKTOP/TABLET: Compact Circle Buttons ===== */}
      {/* Positioned higher on tablets (bottom-32) to avoid overlapping page CTAs */}
      <div className="hidden lg:flex fixed bottom-32 xl:bottom-8 right-4 xl:right-8 z-[70] flex-col items-end gap-3">
        {/* Desktop Call Button — small circle */}
        <a
          href={getPhoneLink()}
          onClick={handleDesktopCallClick}
          className="group relative flex items-center justify-center w-12 h-12 xl:w-14 xl:h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-xl outline-none focus:ring-0"
          aria-label="Call Dr. Shekhar"
        >
          <Phone className="w-5 h-5 xl:w-6 xl:h-6" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Call Now
          </span>
        </a>

        {/* Desktop WhatsApp Button — small circle */}
        <button
          onClick={(e) => handleDesktopWhatsAppClick(e, 'desktop-floating-cta')}
          className="group relative flex items-center justify-center w-12 h-12 xl:w-14 xl:h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-xl outline-none focus:ring-0"
          aria-label={`${CTA_COPY.desktop.primary} on WhatsApp`}
        >
          <MessageCircle className="w-5 h-5 xl:w-6 xl:h-6" />
          <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat on WhatsApp
          </span>
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
