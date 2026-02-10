'use client'

import { useEffect, useState } from 'react'
import {
  MessageCircle,
  Phone,
  Clock,
  CheckCircle,
  MapPin,
  User,
  GraduationCap,
  Send,
  Monitor,
  Smartphone,
} from 'lucide-react'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const CENTERS = [
  'South Extension, New Delhi',
  'Rohini, New Delhi',
  'Green Park, New Delhi',
  'Gurugram, Haryana',
  'Faridabad, Haryana',
  'Noida, Uttar Pradesh',
  'Online (Live Classes)',
]

const CLASS_OPTIONS = ['Class 11', 'Class 12', 'Dropper / Repeater', 'Foundation (Class 9-10)']

export default function BookFreeDemoPage() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    classLevel: '',
    center: '',
    preferredDay: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [redirected, setRedirected] = useState(false)

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isSmallScreen = window.innerWidth < 768
      return mobileRegex.test(userAgent) || isSmallScreen
    }
    setIsMobile(checkMobile())
  }, [])

  // Auto-redirect for mobile users
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
        window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer')
      }, 3000)

      return () => {
        clearInterval(timer)
        clearTimeout(redirectTimer)
      }
    }
  }, [isMobile])

  const getWhatsAppUrl = (data?: typeof formData) => {
    if (data && data.name) {
      const message = `Hi! I want to book a FREE Demo Class for NEET Biology.\n\nMy details:\n• Name: ${data.name}\n• Phone: ${data.phone}\n• Class: ${data.classLevel}\n• Preferred Center: ${data.center}\n• Preferred Day: ${data.preferredDay || 'Any'}\n\nPlease confirm my demo slot!`
      return CONTACT_INFO.whatsapp.linkWithMessage(message)
    }
    return 'https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20Demo%20Class%20for%20NEET%20Biology.%0A%0AMy%20details%3A%0A%E2%80%A2%20Name%3A%20%0A%E2%80%A2%20Class%3A%20(11th%2F12th%2FDropper)%0A%E2%80%A2%20Preferred%20Day%3A%20%0A%E2%80%A2%20Preferred%20Time%3A%20%0A%0APlease%20confirm%20my%20demo%20slot!'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open WhatsApp with filled details
    const url = getWhatsAppUrl(formData)
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Loading state while detecting device
  if (isMobile === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // =============================================
  // MOBILE VIEW: WhatsApp redirect (existing flow)
  // =============================================
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
              <p className="text-green-700 font-medium">WhatsApp opened in new tab!</p>
            </div>
          )}

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Open WhatsApp Now</span>
          </a>

          <p className="text-sm text-gray-500">
            Or call us directly:{' '}
            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="text-blue-600 font-medium hover:underline"
            >
              {CONTACT_INFO.phone.display.primary}
            </a>
          </p>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // =============================================
  // DESKTOP VIEW: Inline form with WhatsApp option
  // =============================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Book Your <span className="text-green-600">Free Demo Class</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience our teaching methodology first-hand. Fill in your details and our team will
            confirm your slot within 5 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Form (3 cols) */}
          <div className="md:col-span-3">
            {!submitted ? (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Your Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Class Level */}
                  <div>
                    <label
                      htmlFor="classLevel"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Class / Level <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="classLevel"
                        required
                        value={formData.classLevel}
                        onChange={(e) => handleInputChange('classLevel', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition appearance-none bg-white"
                      >
                        <option value="">Select your class</option>
                        {CLASS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Center */}
                  <div>
                    <label
                      htmlFor="center"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Preferred Center <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="center"
                        required
                        value={formData.center}
                        onChange={(e) => handleInputChange('center', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition appearance-none bg-white"
                      >
                        <option value="">Select a center</option>
                        {CENTERS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Day */}
                  <div>
                    <label
                      htmlFor="preferredDay"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Preferred Day (optional)
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="preferredDay"
                        value={formData.preferredDay}
                        onChange={(e) => handleInputChange('preferredDay', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition appearance-none bg-white"
                      >
                        <option value="">Any day works for me</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                  >
                    <Send className="w-5 h-5" />
                    Book My Free Demo via WhatsApp
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Your details will be sent via WhatsApp for instant confirmation. We typically
                    respond within 5 minutes during business hours.
                  </p>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Booking Request Sent!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your demo class request has been sent via WhatsApp. Our team will confirm your slot
                  within 5 minutes.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Name:</strong> {formData.name}
                    <br />
                    <strong>Phone:</strong> {formData.phone}
                    <br />
                    <strong>Class:</strong> {formData.classLevel}
                    <br />
                    <strong>Center:</strong> {formData.center}
                    {formData.preferredDay && (
                      <>
                        <br />
                        <strong>Preferred Day:</strong> {formData.preferredDay}
                      </>
                    )}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Did not receive confirmation? Call us directly:
                </p>
                <a
                  href={`tel:${CONTACT_INFO.phone.primary}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {CONTACT_INFO.phone.display.primary}
                </a>
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                    &larr; Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right: Info sidebar (2 cols) */}
          <div className="md:col-span-2 space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Why Choose Cerebrum?</h3>
              <div className="space-y-3">
                {[
                  { icon: CheckCircle, text: 'AIIMS Faculty-led teaching' },
                  { icon: CheckCircle, text: '94% NEET selection rate' },
                  { icon: CheckCircle, text: 'Small batch sizes (max 30 students)' },
                  { icon: CheckCircle, text: 'Daily doubt-clearing sessions' },
                  { icon: CheckCircle, text: '6 centers across Delhi NCR' },
                  { icon: CheckCircle, text: 'Online + Offline hybrid option' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Prefer to Connect Directly?</h3>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-xl p-3 mb-3 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium text-sm">Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone.primary}`}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 mb-3 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium text-sm">Call {CONTACT_INFO.phone.display.primary}</span>
              </a>

              <p className="text-xs text-gray-600 mt-2">
                Available Mon-Sat, 8 AM - 8 PM IST
              </p>
            </div>

            {/* Device info */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Desktop Detected</span>
              </div>
              <p className="text-xs text-blue-700">
                We detected you&apos;re on a desktop. Fill out the form for a seamless booking
                experience, or use WhatsApp/call buttons on the right.
              </p>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
