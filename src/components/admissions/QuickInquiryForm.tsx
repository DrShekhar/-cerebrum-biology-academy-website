'use client'

import { Phone, MessageCircle } from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

interface QuickInquiryFormProps {
  onSuccess?: () => void
  variant?: 'hero' | 'sidebar' | 'modal'
  preselectedCourse?: string
}

export function QuickInquiryForm({ variant = 'hero' }: QuickInquiryFormProps) {
  const isHero = variant === 'hero'

  return (
    <div
      className={`${isHero ? 'bg-white/10 backdrop-blur-sm' : 'bg-white shadow-xl'} rounded-2xl p-6`}
    >
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${isHero ? 'text-white' : 'text-gray-900'} mb-1`}>
          Get Free Counseling
        </h3>
        <p className={`text-sm ${isHero ? 'text-blue-100' : 'text-gray-600'}`}>
          Connect instantly — no forms needed!
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() =>
            trackAndOpenWhatsApp({
              source: 'quick-inquiry-form',
              message: WHATSAPP_MESSAGES.enquiry,
              campaign: 'quick-inquiry',
            })
          }
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold min-h-[48px] touch-manipulation transition-all ${
            isHero
              ? 'bg-white text-green-700 hover:bg-gray-100'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Us Now
        </button>

        <a
          href="tel:+918826444334"
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold min-h-[48px] touch-manipulation transition-all ${
            isHero
              ? 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Phone className="w-5 h-5" />
          Call: +91 88264 44334
        </a>
      </div>
    </div>
  )
}
