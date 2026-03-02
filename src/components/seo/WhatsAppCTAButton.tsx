'use client'

import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO, getPhoneLink } from '@/lib/constants/contactInfo'
import { MessageCircle, Phone } from 'lucide-react'

interface WhatsAppCTAButtonProps {
  source: string
  message: string
  campaign: string
  label: string
  className?: string
  showCallFallback?: boolean
}

export function WhatsAppCTAButton({
  source,
  message,
  campaign,
  label,
  className,
  showCallFallback = false,
}: WhatsAppCTAButtonProps) {
  return (
    <div>
      <button
        onClick={async () => {
          await trackAndOpenWhatsApp({
            source,
            message,
            campaign,
          })
        }}
        className={className}
      >
        <MessageCircle className="mr-2 h-5 w-5" />
        {label}
      </button>
      {showCallFallback && (
        <a
          href={getPhoneLink()}
          className="flex items-center justify-center gap-1.5 mt-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Phone className="h-4 w-4" />
          <span>Or call: {CONTACT_INFO.phone.display.primary}</span>
        </a>
      )}
    </div>
  )
}
