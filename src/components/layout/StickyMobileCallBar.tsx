'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, X } from 'lucide-react'

/**
 * StickyMobileCallBar — Always-visible Call + WhatsApp bar on mobile
 * This is the #1 conversion fix. Parents see Call/WhatsApp at ALL times.
 * Shows on mobile only (md:hidden). Desktop uses FloatingCTA.
 */
export function StickyMobileCallBar() {
  const [dismissed, setDismissed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if dismissed this session
    if (typeof window !== 'undefined') {
      const wasDismissed = sessionStorage.getItem('sticky-call-dismissed')
      if (wasDismissed) {
        setDismissed(true)
        return
      }
    }
    // Show after 2 seconds to not hurt LCP
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('sticky-call-dismissed', '1')
  }

  const handleCall = () => {
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'click_call', {
        event_category: 'conversion',
        event_label: 'sticky_mobile_bar',
        value: 1,
      })
    }
    window.location.href = 'tel:+918826444334'
  }

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'click_whatsapp', {
        event_category: 'conversion',
        event_label: 'sticky_mobile_bar',
        value: 1,
      })
    }
    const msg = encodeURIComponent(
      'Hi! I want to know about NEET Biology coaching at Cerebrum Academy. Please share details about batches, fees, and demo class.'
    )
    window.open(`https://wa.me/918826444334?text=${msg}`, '_blank')
  }

  if (dismissed || !isVisible) return null

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the bar */}
      <div className="h-16 md:hidden" aria-hidden="true" />

      {/* The actual sticky bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden"
        role="complementary"
        aria-label="Contact options"
      >
        {/* Gradient shadow above bar */}
        <div className="h-3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        <div className="bg-white border-t-2 border-blue-600 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-8 right-3 bg-gray-800/80 text-white rounded-full p-1 shadow-md"
            aria-label="Close contact bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-stretch">
            {/* Call Now Button - 50% width */}
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold text-sm transition-colors"
              aria-label="Call Cerebrum Academy now"
            >
              <Phone className="w-5 h-5" fill="currentColor" />
              <span>Call Now</span>
            </button>

            {/* WhatsApp Button - 50% width */}
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] active:bg-[#1DA851] text-white font-bold text-sm transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" fill="currentColor" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Trust line */}
          <div className="bg-blue-50 text-center py-1 text-[10px] text-blue-800 font-medium">
            AIIMS Faculty &bull; 98% Success &bull; 67+ AIIMS Selections &bull; Free Demo
          </div>
        </div>
      </div>
    </>
  )
}

export default StickyMobileCallBar
