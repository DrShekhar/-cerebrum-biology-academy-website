'use client'

import { Phone, MessageCircle, CheckCircle, Calendar } from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

interface DemoBookingFormProps {
  onSuccess?: (bookingData: any) => void
  className?: string
}

export function DemoBookingForm({ className = '' }: DemoBookingFormProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden ${className}`}
    >
      <div className="bg-indigo-500 p-4 sm:p-6">
        <div className="flex items-center gap-3 text-white">
          <Calendar className="w-8 h-8" />
          <div>
            <h3 className="text-xl sm:text-2xl font-bold">Book Your Free Demo Class</h3>
            <p className="text-indigo-100 text-sm sm:text-base">
              Connect with us instantly — no forms needed!
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="space-y-4 mb-6">
          <button
            type="button"
            onClick={() =>
              trackAndOpenWhatsApp({
                source: 'demo-booking-form',
                message: WHATSAPP_MESSAGES.demo,
                campaign: 'demo-booking',
              })
            }
            className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-green-500/25 min-h-[56px] touch-manipulation"
          >
            <MessageCircle className="w-6 h-6" />
            WhatsApp Us Now
          </button>

          <a
            href="tel:+918826444334"
            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-blue-500/25 min-h-[56px] touch-manipulation"
          >
            <Phone className="w-6 h-6" />
            Call: +91 88264 44334
          </a>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">What You'll Get in Demo Class:</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Live 1-on-1 session with AIIMS faculty
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Cell Biology concept explanation with NEET focus
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Personalized NEET preparation strategy
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Doubt resolution and study tips
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
              Course roadmap for your goals
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
