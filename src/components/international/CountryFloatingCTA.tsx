'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { getCountryWhatsAppMessage } from '@/lib/international/whatsapp-messages'

interface CountryFloatingCTAProps {
  country: string
  showAfterScroll?: number
  pulseAnimation?: boolean
}

export function CountryFloatingCTA({
  country,
  showAfterScroll = 200,
  pulseAnimation = true,
}: CountryFloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll])

  const handleClick = async () => {
    await trackAndOpenWhatsApp({
      source: `floating-cta-${country}`,
      message: getCountryWhatsAppMessage(country, 'default'),
      campaign: `country-floating-${country}`,
      buttonText: 'Floating WhatsApp Button',
    })
  }

  const handleButtonClick = () => {
    if (isExpanded) {
      handleClick()
    } else {
      setIsExpanded(true)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded tooltip */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-64 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <p className="text-slate-800 font-medium mb-2">Need help?</p>
          <p className="text-slate-600 text-sm mb-3">
            Chat with us on WhatsApp for instant support.
          </p>
          <button
            onClick={handleClick}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Start Chat
          </button>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleButtonClick}
        className={cn(
          'w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl',
          'flex items-center justify-center text-white',
          'transition-all duration-200 hover:scale-110',
          'focus:outline-none focus:ring-4 focus:ring-green-500/30',
          pulseAnimation && !isExpanded && 'animate-pulse'
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Notification badge (ping animation) */}
      {!isExpanded && (
        <>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
        </>
      )}
    </div>
  )
}

export default CountryFloatingCTA
