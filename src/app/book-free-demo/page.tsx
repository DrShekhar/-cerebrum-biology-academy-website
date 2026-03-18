'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, Phone, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export default function BookFreeDemoPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [countdown, setCountdown] = useState(3)
  const [redirected, setRedirected] = useState(false)

  const whatsAppUrl =
    'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20Demo%20Class%20for%20NEET%20Biology.%20Please%20confirm%20my%20demo%20slot!'

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isSmallScreen = window.innerWidth < 768
      return mobileRegex.test(userAgent) || isSmallScreen
    }
    setIsMobile(checkMobile())
  }, [])

  useEffect(() => {
    if (isMobile === true) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      const redirectTimer = setTimeout(() => {
        setRedirected(true)
        window.location.href = whatsAppUrl
      }, 3000)

      return () => {
        clearInterval(timer)
        clearTimeout(redirectTimer)
      }
    }
  }, [isMobile, whatsAppUrl])

  if (isMobile === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Book Your Free Demo</h1>
          <p className="text-gray-600 mb-6">
            Connect with us on WhatsApp for instant booking confirmation
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Instant response within 5 minutes</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Choose your preferred day & time</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Direct line to our counselors</span>
            </div>
          </div>

          {!redirected ? (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Redirecting to WhatsApp in...</p>
              <div className="text-4xl font-bold text-green-600">{countdown}</div>
            </div>
          ) : (
            <div className="mb-6 p-3 bg-green-50 rounded-lg">
              <p className="text-green-700 font-medium">WhatsApp opened!</p>
            </div>
          )}

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg mb-4"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Open WhatsApp Now</span>
          </a>

          <a
            href="tel:+918826444334"
            className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg mb-4"
          >
            <Phone className="w-5 h-5" />
            Call: +91 88264 44334
          </a>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Book Your <span className="text-green-600">Free Demo Class</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our teaching methodology first-hand. Connect with us instantly for booking
            confirmation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Connect With Us</h2>

            <div className="space-y-4 mb-8">
              <button
                type="button"
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'book-free-demo-page',
                    message:
                      'Hi! I want to book a FREE Demo Class for NEET Biology. Please confirm my demo slot!',
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

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                Instant response on WhatsApp
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Clock className="w-4 h-4 flex-shrink-0" />
                Available Mon-Sat, 8 AM - 9 PM
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Why Choose Cerebrum?</h3>
            <div className="space-y-3">
              {[
                'AIIMS Faculty-led teaching',
                '98% NEET selection rate (680+ students)',
                'Small batch sizes (max 15 students)',
                'Daily doubt-clearing sessions',
                '4 centers: South Ext, Rohini, Gurugram, Faridabad',
                'Online + Offline hybrid option',
              ].map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
