'use client'

import { useState } from 'react'
import { Play, Phone, CheckCircle, Loader2 } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface BookFreeDemoCardProps {
  courseName?: string
  source?: string
}

export function BookFreeDemoCard({ courseName = 'NEET Biology', source = 'course-hero-form' }: BookFreeDemoCardProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return

    setLoading(true)

    // Track form submission
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_form_submit', {
        event_category: 'conversion',
        event_label: source,
        course_name: courseName,
      })
    }

    // Submit to demo booking API
    try {
      await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          course: courseName,
          source,
          type: 'quick-demo-form',
        }),
      })
    } catch {
      // Fail silently — WhatsApp fallback below ensures contact
    }

    // Open WhatsApp with pre-filled message
    await trackAndOpenWhatsApp({
      source,
      message: `Hi, I am ${name.trim()}. I want to book a free demo class for ${courseName}. My number is ${phone.trim()}.`,
      campaign: 'demo-form-hero',
    })

    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-green-800 mb-1">Demo Class Booked!</h3>
        <p className="text-sm text-green-700">
          Our team will call you shortly to confirm the schedule.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <Play className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-bold text-gray-900">Book Free Demo Class</h3>
      </div>
      <p className="text-sm text-gray-600 mb-5">
        Experience a live class with Dr. Shekhar. No fee, no commitment.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          pattern="[0-9]{10}"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {loading ? 'Booking...' : 'Book Free Demo'}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-500">
        <Phone className="w-3 h-3" />
        <span>Or call directly: {CONTACT_INFO.phone.display.primary}</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 text-xs text-gray-400">
        <span>500+ demos conducted</span>
        <span>·</span>
        <span>Avg reply: 2 mins</span>
      </div>
    </div>
  )
}
