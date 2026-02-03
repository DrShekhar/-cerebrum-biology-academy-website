'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, Phone, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const WHATSAPP_DEMO_URL =
  'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20Demo%20Class%20for%20NEET%20Biology.%0A%0AMy%20details%3A%0A%E2%80%A2%20Name%3A%20%0A%E2%80%A2%20Class%3A%20(11th%2F12th%2FDropper)%0A%E2%80%A2%20Preferred%20Day%3A%20%0A%E2%80%A2%20Preferred%20Time%3A%20%0A%0APlease%20confirm%20my%20demo%20slot!'

export default function BookFreeDemoPage() {
  const [countdown, setCountdown] = useState(3)
  const [redirected, setRedirected] = useState(false)

  useEffect(() => {
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
      window.open(WHATSAPP_DEMO_URL, '_blank', 'noopener,noreferrer')
    }, 3000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirectTimer)
    }
  }, [])

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
            <p className="text-green-700 font-medium">WhatsApp opened in new tab!</p>
          </div>
        )}

        <a
          href={WHATSAPP_DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Open WhatsApp Now</span>
        </a>

        <p className="text-sm text-gray-500">
          Or call us directly:{' '}
          <a href="tel:+918826444334" className="text-blue-600 font-medium hover:underline">
            +91 88264 44334
          </a>
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
