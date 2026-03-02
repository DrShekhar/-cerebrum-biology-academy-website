'use client'

import { Phone, MessageSquare } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { trackPhoneCallConversion } from '@/lib/analytics/googleAdsConversions'

interface MobilePhoneStickyBarProps {
  phoneNumber?: string
  source?: string
  showWhatsApp?: boolean
}

export function MobilePhoneStickyBar({
  phoneNumber = '+918826444334',
  source = 'sticky-bar',
  showWhatsApp = true,
}: MobilePhoneStickyBarProps) {
  const handleCallNow = () => {
    trackPhoneCallConversion(source)
  }

  const handleWhatsApp = async () => {
    await trackAndOpenWhatsApp({
      source: source,
      message: 'Hi! I want to know more about NEET Biology coaching.',
      campaign: 'sticky-bar',
    })
  }

  return (
    <>
      {/* Mobile Sticky Bar - Positioned above MobileBottomNav (64px) */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t shadow-lg z-[55] safe-area-inset-bottom">
        <div className="flex p-2 space-x-2">
          <a
            href={`tel:${phoneNumber}`}
            onClick={handleCallNow}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            aria-label={`Call ${phoneNumber}`}
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </a>
          {showWhatsApp && (
            <button
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
          )}
        </div>
      </div>

      {/* Spacer for mobile fixed bar */}
      <div className="h-16 md:hidden" />
    </>
  )
}
