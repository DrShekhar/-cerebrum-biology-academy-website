'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, GraduationCap, CheckCircle, Users, Trophy } from 'lucide-react'
import Link from 'next/link'

const WHATSAPP_ENROLL_URL =
  'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20ENROLL%20in%20NEET%20Biology%20Coaching.%0A%0AMy%20details%3A%0A%E2%80%A2%20Name%3A%20%0A%E2%80%A2%20Class%3A%20(11th%2F12th%2FDropper)%0A%E2%80%A2%20Board%3A%20(CBSE%2FICSE%2FState)%0A%E2%80%A2%20City%3A%20%0A%0APlease%20share%20course%20details%20and%20fee%20structure!'

export default function QuickEnrollPage() {
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
      window.open(WHATSAPP_ENROLL_URL, '_blank', 'noopener,noreferrer')
    }, 3000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-blue-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Quick Enroll</h1>
        <p className="text-gray-600 mb-6">
          Start your NEET Biology journey with Cerebrum Academy
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-green-50 rounded-xl p-3">
            <Trophy className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">98%</div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-3">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">67+</div>
            <div className="text-xs text-gray-500">Selections</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3">
            <GraduationCap className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">15+</div>
            <div className="text-xs text-gray-500">Years Exp</div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">Get complete fee structure & EMI options</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">Know about scholarship opportunities</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">Choose from multiple batch timings</span>
          </div>
        </div>

        {!redirected ? (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Redirecting to WhatsApp in...</p>
            <div className="text-4xl font-bold text-blue-600">{countdown}</div>
          </div>
        ) : (
          <div className="mb-6 p-3 bg-green-50 rounded-lg">
            <p className="text-green-700 font-medium">WhatsApp opened in new tab!</p>
          </div>
        )}

        <a
          href={WHATSAPP_ENROLL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Enroll via WhatsApp</span>
        </a>

        <p className="text-sm text-gray-500">
          Or call us directly:{' '}
          <a href="tel:+918826444334" className="text-blue-600 font-medium hover:underline">
            +91 88264 44334
          </a>
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link href="/courses" className="text-sm text-gray-500 hover:text-gray-700">
            ← View All Courses
          </Link>
        </div>
      </div>
    </div>
  )
}
