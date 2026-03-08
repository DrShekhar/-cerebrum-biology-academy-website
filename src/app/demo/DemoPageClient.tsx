'use client'

import {
  MessageCircle,
  Phone,
  CheckCircle,
  Calendar,
  Users,
  Star,
  GraduationCap,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export default function DemoPageClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Book Your <span className="text-green-600">Free Demo Class</span>
          </h1>
          <p className="text-lg text-gray-600">
            Experience our AIIMS faculty-led teaching methodology before you enroll
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fadeInUp">
          <div className="space-y-4 mb-8">
            <button
              type="button"
              onClick={() =>
                trackAndOpenWhatsApp({
                  source: 'demo-page',
                  message:
                    'Hi! I want to book a FREE Demo Class for NEET Biology. Please confirm my demo slot!',
                  campaign: 'demo-booking',
                })
              }
              className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-500/25 transition-all min-h-[56px] touch-manipulation"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp Us Now
            </button>

            <a
              href="tel:+918826444334"
              className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/25 transition-all min-h-[56px] touch-manipulation"
            >
              <Phone className="w-6 h-6" />
              Call: +91 88264 44334
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { icon: Star, label: '98% Success Rate' },
              { icon: Users, label: 'Max 15 Students' },
              { icon: GraduationCap, label: 'AIIMS Faculty' },
              { icon: Calendar, label: 'Flexible Timing' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 text-sm"
              >
                <Icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{label}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200 space-y-3">
            <h3 className="font-semibold text-gray-900 mb-3">What You Get in Demo:</h3>
            {[
              'Live 1-hour interactive session with AIIMS faculty',
              'NEET Biology concept explanation with exam focus',
              'Personalized preparation strategy',
              'Free study materials and notes',
              'Course roadmap for your goals',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-700">
            <span className="font-medium">
              Courses from <span className="text-gray-900 font-semibold">Rs 45,000</span>
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>EMI in 3 installments</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>Free demo class included</span>
          </div>
          <a
            href="/pricing"
            className="text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap hover:underline"
          >
            View all pricing →
          </a>
        </div>
      </div>
    </div>
  )
}
