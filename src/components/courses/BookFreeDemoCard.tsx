'use client'

import { Play, Phone, MessageCircle, CheckCircle } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface BookFreeDemoCardProps {
  courseName?: string
  source?: string
}

export function BookFreeDemoCard({
  courseName = 'NEET Biology',
  source = 'course-hero-form',
}: BookFreeDemoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Play className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-bold text-gray-900">Book Free Demo Class</h3>
      </div>
      <p className="text-sm text-gray-600 mb-5">
        Experience a live class with Dr. Shekhar. No fee, no commitment.
      </p>

      <div className="space-y-3 mb-4">
        <button
          type="button"
          onClick={() =>
            trackAndOpenWhatsApp({
              source,
              message: `Hi! I want to book a free demo class for ${courseName}. Please share the schedule.`,
              campaign: 'demo-form-hero',
            })
          }
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-all min-h-[48px] touch-manipulation shadow-lg shadow-green-500/25"
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp Us Now
        </button>

        <a
          href="tel:+918826444334"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all min-h-[48px] touch-manipulation shadow-lg shadow-blue-500/25"
        >
          <Phone className="w-5 h-5" />
          Call: {CONTACT_INFO.phone.display.primary}
        </a>
      </div>

      <div className="space-y-2">
        {['500+ demos conducted', 'Avg reply: 2 mins', 'AIIMS Faculty'].map((text) => (
          <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
