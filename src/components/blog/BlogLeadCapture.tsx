'use client'

import { useState } from 'react'
import { CheckCircle, Phone, ArrowRight, GraduationCap, Sparkles, Star } from 'lucide-react'

interface BlogLeadCaptureProps {
  articleSlug: string
  articleTitle: string
  chapterName?: string
  category?: string
}

// Content configuration based on category
const getContentConfig = (category?: string) => {
  const isOlympiad = category === 'olympiad'

  if (isOlympiad) {
    return {
      badge: '500+ Olympiad Achievers',
      heading: 'Excel at Biology Olympiad',
      subheading: 'Expert coaching from',
      highlight: 'National & International Olympiad medalists',
      benefits: ['USABO/IBO Prep', 'Research Guidance', 'University Applications'],
      buttonText: 'Get Olympiad Guidance',
      bgColor: 'bg-[#3d4d3d]',
      accentColor: 'bg-green-400/20',
      thankYouMessage: 'Our Olympiad specialist will contact you within 24 hours.',
    }
  }

  return {
    badge: '2,500+ Students Placed',
    heading: 'Get Into Your Dream Medical College',
    subheading: 'Expert guidance from',
    highlight: 'AIIMS alumni',
    benefits: ['College Selection', 'Counselling Strategy', 'NRI/Management Quota'],
    buttonText: 'Get Free Counselling',
    bgColor: 'bg-indigo-600',
    accentColor: 'bg-purple-400/20',
    thankYouMessage:
      'Our counselor will contact you within 24 hours to discuss your college admission strategy.',
  }
}

export function BlogLeadCapture({ articleSlug, articleTitle, category }: BlogLeadCaptureProps) {
  const config = getContentConfig(category)
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validatePhone = (value: string): boolean => {
    const cleanPhone = value.replace(/[\s\-\+]/g, '')
    const indianPhoneRegex = /^(91)?[6-9]\d{9}$/
    return indianPhoneRegex.test(cleanPhone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validatePhone(phone)) {
      setError('Please enter a valid Indian mobile number (with or without +91)')
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
      <div className="my-8 p-6 bg-green-50 border border-green-200 rounded-2xl shadow-lg animate-fade-in">
        <div className="flex items-center gap-4 text-green-700">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-lg">Thank you for your interest!</p>
            <p className="text-green-600">{config.thankYouMessage}</p>
          </div>
        </div>
      </div>
    )
  }

  const isOlympiad = category === 'olympiad'

  return (
    <div className="my-10 relative overflow-hidden rounded-2xl shadow-xl">
      {/* Premium gradient background */}
      <div className={`absolute inset-0 ${isOlympiad ? 'bg-[#3d4d3d]' : 'bg-indigo-600'}`} />

      {/* Animated decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
      <div
        className={`absolute bottom-0 left-0 w-48 h-48 ${isOlympiad ? 'bg-green-400/20' : 'bg-purple-400/20'} rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl animate-pulse`}
      />
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-yellow-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Header with badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400/90 text-yellow-900 rounded-full text-xs font-bold">
            <Star className="w-3 h-3 fill-yellow-900" />
            {config.badge}
          </div>
        </div>

        {/* Main heading */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {config.heading}
            </h3>
            <p className={`text-sm mt-1 ${isOlympiad ? 'text-green-100' : 'text-blue-100'}`}>
              {config.subheading}{' '}
              <span className="text-yellow-300 font-semibold">{config.highlight}</span>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {config.benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2"
            >
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-white text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d+\-\s]/g, '').slice(0, 15))}
              placeholder="Enter your mobile number"
              required
              className="w-full pl-12 pr-4 py-3.5 text-base bg-white rounded-xl border-2 border-transparent focus:border-yellow-400 focus:ring-0 focus:outline-none shadow-lg placeholder:text-gray-400"
              style={{ fontSize: '16px' }}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !phone}
            className={`px-6 py-3.5 font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] group ${
              isOlympiad
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                {config.buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-red-300 text-sm bg-red-500/20 px-4 py-2 rounded-lg">{error}</p>
        )}

        {/* Trust indicators */}
        <p className="mt-4 text-center text-blue-200 text-xs">
          Free consultation • No spam • Your data is secure
        </p>
      </div>
    </div>
  )
}
