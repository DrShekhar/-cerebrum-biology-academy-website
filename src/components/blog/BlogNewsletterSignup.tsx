'use client'

import { useState } from 'react'
import { Mail, CheckCircle, ArrowRight, BookOpen } from 'lucide-react'

interface BlogNewsletterSignupProps {
  articleSlug?: string
  category?: string
}

/**
 * Email-first newsletter signup component for blog pages.
 * Captures email addresses for weekly NEET Biology tips newsletter.
 * Complements the existing phone-based lead capture flow.
 */
export function BlogNewsletterSignup({ articleSlug, category }: BlogNewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/blog/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: '',
          source: 'blog_newsletter',
          articleSlug: articleSlug || 'unknown',
          articleTitle: `Newsletter signup from ${category || 'blog'}`,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="my-10 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
        <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
          <CheckCircle className="w-6 h-6" />
          <span className="font-bold text-lg">You&apos;re subscribed!</span>
        </div>
        <p className="text-green-600 text-sm">
          Check your inbox for weekly NEET Biology tips from Dr. Shekhar.
        </p>
      </div>
    )
  }

  return (
    <div className="my-10 p-6 sm:p-8 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl">
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex p-3 bg-indigo-100 rounded-xl">
          <BookOpen className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            Get Weekly NEET Biology Tips
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Join 1,50,000+ students receiving free chapter summaries, mnemonics, and exam strategies
            every week from AIIMS faculty.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3 text-sm bg-white text-gray-900 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none placeholder:text-gray-400"
                style={{ fontSize: '16px' }}
              />
            </div>
            <button
              type="submit"
              disabled={submitting || !email}
              className="px-5 py-3 font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {submitting ? (
                'Subscribing...'
              ) : (
                <>
                  Subscribe Free
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {error && (
            <p className="mt-2 text-red-500 text-sm">{error}</p>
          )}

          <p className="mt-3 text-xs text-gray-400">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </div>
  )
}
