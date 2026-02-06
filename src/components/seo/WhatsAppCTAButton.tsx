'use client'

import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { MessageCircle } from 'lucide-react'

interface WhatsAppCTAButtonProps {
  source: string
  message: string
  campaign: string
  label: string
  className?: string
}

export function WhatsAppCTAButton({
  source,
  message,
  campaign,
  label,
  className,
}: WhatsAppCTAButtonProps) {
  return (
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
  )
}
