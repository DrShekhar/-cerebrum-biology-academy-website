'use client'

import { Phone, MessageSquare } from 'lucide-react'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
} from '@/lib/analytics/googleAdsConversions'

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
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion(phoneNumber)
    window.open(`tel:${phoneNumber}`, '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion(source)
    await trackAndOpenWhatsApp({
      source: source,
      message: 'Hi! I want to know more about NEET Biology coaching.',
      campaign: 'sticky-bar',
    })
  }

  return (
    <>
      {/* Mobile Sticky Bar - Only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 safe-area-inset-bottom">
        <div className="flex p-2 space-x-2">
          <button
            onClick={handleCallNow}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </button>
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
