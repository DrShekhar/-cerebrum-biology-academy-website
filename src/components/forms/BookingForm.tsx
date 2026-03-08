'use client'

import { Phone, PhoneCall, MessageSquare, CheckCircle } from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { trackPhoneCall } from '@/lib/ads/googleAdsConversion'

const PRIMARY_CALL_NUMBER = '8826444334'
const PRIMARY_CALL_LINK = 'tel:+918826444334'

interface BookingFormProps {
  type?: 'demo' | 'inquiry' | 'callback'
  onSubmit?: (data: any) => void
}

export function BookingForm({ type = 'demo' }: BookingFormProps) {
  const handleCallClick = () => {
    trackPhoneCall('booking-form-cta', 100)
  }

  const getMessage = () => {
    switch (type) {
      case 'demo':
        return WHATSAPP_MESSAGES.demo
      case 'callback':
        return WHATSAPP_MESSAGES.callback
      case 'inquiry':
      default:
        return WHATSAPP_MESSAGES.enquiry
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'demo':
        return 'Book Your Free Demo Class'
      case 'callback':
        return 'Talk to Our Experts'
      case 'inquiry':
      default:
        return 'Course Inquiry'
    }
  }

  const getDescription = () => {
    switch (type) {
      case 'demo':
        return 'Experience our teaching methodology firsthand. Connect with us to schedule a free demo class.'
      case 'callback':
        return 'Our expert counselors are available to discuss your NEET preparation journey.'
      case 'inquiry':
      default:
        return 'Get detailed information about our courses, faculty, and admission process.'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto animate-fadeInUp">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <PhoneCall className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{getTitle()}</h3>
        <p className="text-gray-600">{getDescription()}</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() =>
            trackAndOpenWhatsApp({
              source: `booking-form-${type}`,
              message: getMessage(),
              campaign: 'booking-form',
            })
          }
          className="w-full flex items-center justify-center gap-3 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-green-500/25"
        >
          <MessageSquare className="w-6 h-6" />
          WhatsApp Us Now
        </button>

        <a
          href={PRIMARY_CALL_LINK}
          onClick={handleCallClick}
          className="flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
        >
          <Phone className="w-6 h-6" />
          Call Now: {PRIMARY_CALL_NUMBER}
        </a>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
        {[
          'AIIMS Faculty with 15+ years experience',
          'Small batches — max 15 students',
          '98% NEET success rate',
          'Free counseling session included',
        ].map((item) => (
          <div key={item} className="flex items-center text-sm text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
