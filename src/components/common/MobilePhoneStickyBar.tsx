'use client'

import { Phone, MessageSquare } from 'lucide-react'
import { buildWhatsAppUrl } from '@/lib/whatsapp/tracking'
import { trackPhoneCall, trackWhatsAppLead } from '@/lib/ads/googleAdsConversion'

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
    trackPhoneCall(source, 100)
  }

  const whatsappHref = buildWhatsAppUrl(
    'Hi! I want to know more about NEET Biology coaching.',
    source
  )

  const handleWhatsApp = () => {
    trackWhatsAppLead(source, 50)
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
            <a
              href={whatsappHref}
              onClick={handleWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Spacer for mobile fixed bar */}
      <div className="h-16 md:hidden" />
    </>
  )
}
