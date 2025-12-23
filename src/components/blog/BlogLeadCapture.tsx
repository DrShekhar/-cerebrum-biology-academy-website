'use client'

import { useState } from 'react'
import { CheckCircle, Phone, ArrowRight, GraduationCap } from 'lucide-react'

interface BlogLeadCaptureProps {
  articleSlug: string
  articleTitle: string
  chapterName?: string
}

export function BlogLeadCapture({ articleSlug, articleTitle }: BlogLeadCaptureProps) {
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/blog/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          source: 'blog_bottom_cta',
          articleSlug,
          articleTitle,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="my-8 p-5 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center gap-3 text-green-700">
          <CheckCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="font-semibold">Thank you for your interest!</p>
            <p className="text-sm text-green-600">
              Our counselor will contact you within 24 hours to discuss your college admission
              strategy.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3">
        <div className="flex items-center gap-2 text-white">
          <GraduationCap className="w-5 h-5" />
          <span className="font-semibold">Get Into Your Dream Medical College</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-700 text-sm mb-4">
          <strong className="text-gray-900">Cerebrum Biology Academy</strong> has helped{' '}
          <span className="text-blue-600 font-semibold">2,500+ students</span> secure admissions in
          top medical colleges with our expert guidance on:
        </p>

        <ul className="space-y-2 mb-5 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Personalized college selection based on your NEET score</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>State & All India counselling strategy</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Management/NRI quota admission guidance</span>
          </li>
        </ul>

        {/* Compact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter mobile number"
              required
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              style={{ fontSize: '16px' }}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !phone}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Get Free Counselling
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {error && <p className="mt-2 text-red-600 text-xs">{error}</p>}

        <p className="mt-3 text-xs text-gray-500 text-center">
          Free consultation • No spam • Expert guidance from AIIMS alumni
        </p>
      </div>
    </div>
  )
}
