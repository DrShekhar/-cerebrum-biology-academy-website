'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, Send, CheckCircle, AlertCircle, Loader2, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react'

interface FeedbackState {
  rating: number
  feedback: string
  wouldRecommend: boolean | null
  topicsLiked: string[]
  improvementSuggestions: string
}

const TOPIC_OPTIONS = [
  'Teaching Quality',
  'Content Clarity',
  'Interactive Sessions',
  'Doubt Resolution',
  'Study Materials',
  'Time Management',
  'Exam Focus',
  'Faculty Knowledge',
]

export default function DemoFeedbackPage() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')
  const token = searchParams.get('token')

  const [state, setState] = useState<'loading' | 'form' | 'submitting' | 'success' | 'error' | 'expired' | 'invalid'>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [bookingInfo, setBookingInfo] = useState<{ studentName?: string } | null>(null)

  const [feedback, setFeedback] = useState<FeedbackState>({
    rating: 0,
    feedback: '',
    wouldRecommend: null,
    topicsLiked: [],
    improvementSuggestions: '',
  })

  // Validate token on mount
  useEffect(() => {
    if (!bookingId || !token) {
      setState('invalid')
      setErrorMessage('Invalid feedback link. Please check your email for the correct link.')
      return
    }

    // Just set to form state - token will be validated on submit
    setState('form')
  }, [bookingId, token])

  const handleRatingClick = (rating: number) => {
    setFeedback((prev) => ({ ...prev, rating }))
  }

  const handleTopicToggle = (topic: string) => {
    setFeedback((prev) => ({
      ...prev,
      topicsLiked: prev.topicsLiked.includes(topic)
        ? prev.topicsLiked.filter((t) => t !== topic)
        : [...prev.topicsLiked, topic],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (feedback.rating === 0) {
      setErrorMessage('Please select a rating')
      return
    }

    setState('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/demo-booking/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          token,
          rating: feedback.rating,
          feedback: feedback.feedback || undefined,
          wouldRecommend: feedback.wouldRecommend ?? undefined,
          topicsLiked: feedback.topicsLiked.length > 0 ? feedback.topicsLiked : undefined,
          improvementSuggestions: feedback.improvementSuggestions || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 410) {
          setState('expired')
          setErrorMessage(data.error || 'This feedback link has expired.')
        } else if (response.status === 401) {
          setState('invalid')
          setErrorMessage('Invalid feedback token. Please use the link from your email.')
        } else if (response.status === 400 && data.error?.includes('already been submitted')) {
          setState('success')
        } else {
          setState('error')
          setErrorMessage(data.error || 'Failed to submit feedback. Please try again.')
        }
        return
      }

      setState('success')
    } catch (error) {
      setState('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  // Loading state
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#4a5d4a] animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading feedback form...</p>
        </div>
      </div>
    )
  }

  // Invalid/Expired states
  if (state === 'invalid' || state === 'expired') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">
              {state === 'expired' ? 'Link Expired' : 'Invalid Link'}
            </h1>
            <p className="text-slate-600 mb-6">{errorMessage}</p>
            <div className="space-y-3">
              <a
                href="https://wa.me/918826444334?text=Hi%2C%20I%20need%20help%20with%20my%20demo%20feedback%20link"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Contact Support on WhatsApp
              </a>
              <Link
                href="/"
                className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Success state
  if (state === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h1>
            <p className="text-slate-600 mb-6">
              Your feedback has been submitted successfully. We truly appreciate you taking the time to help us improve.
            </p>
            {feedback.rating >= 4 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 text-sm">
                  We&apos;re thrilled you enjoyed your demo! Would you consider sharing your experience with others?
                </p>
                <a
                  href="https://g.page/r/CerebrumBiologyAcademy/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-amber-700 font-medium hover:underline"
                >
                  Leave a Google Review →
                </a>
              </div>
            )}
            <div className="space-y-3">
              <Link
                href="/courses"
                className="block w-full py-3 px-4 bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-medium rounded-lg transition-colors"
              >
                Explore Our Courses
              </Link>
              <Link
                href="/"
                className="block w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Submission Failed</h1>
            <p className="text-slate-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setState('form')}
              className="w-full py-3 px-4 bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Form state
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4a5d4a] to-[#5a6d5a] p-6 text-white">
            <h1 className="text-2xl font-bold">How was your Demo Class?</h1>
            <p className="text-green-100 mt-1">
              Your feedback helps us improve our teaching quality
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Error message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Rating */}
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-3">
                Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="p-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= feedback.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-slate-500 mt-2">
                {feedback.rating === 0 && 'Click to rate'}
                {feedback.rating === 1 && 'Poor'}
                {feedback.rating === 2 && 'Fair'}
                {feedback.rating === 3 && 'Good'}
                {feedback.rating === 4 && 'Very Good'}
                {feedback.rating === 5 && 'Excellent!'}
              </p>
            </div>

            {/* Would Recommend */}
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-3">
                Would you recommend us to others?
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setFeedback((prev) => ({ ...prev, wouldRecommend: true }))}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-colors ${
                    feedback.wouldRecommend === true
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-slate-200 hover:border-green-300'
                  }`}
                >
                  <ThumbsUp className="w-5 h-5" />
                  Yes, definitely!
                </button>
                <button
                  type="button"
                  onClick={() => setFeedback((prev) => ({ ...prev, wouldRecommend: false }))}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-colors ${
                    feedback.wouldRecommend === false
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-slate-200 hover:border-red-300'
                  }`}
                >
                  <ThumbsDown className="w-5 h-5" />
                  Not really
                </button>
              </div>
            </div>

            {/* Topics Liked */}
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-3">
                What did you like most? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {TOPIC_OPTIONS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleTopicToggle(topic)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      feedback.topicsLiked.includes(topic)
                        ? 'bg-[#4a5d4a] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Feedback */}
            <div>
              <label htmlFor="feedback" className="block text-lg font-semibold text-slate-800 mb-3">
                Share your experience
              </label>
              <textarea
                id="feedback"
                value={feedback.feedback}
                onChange={(e) => setFeedback((prev) => ({ ...prev, feedback: e.target.value }))}
                placeholder="Tell us what you liked or what could be improved..."
                rows={4}
                maxLength={2000}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent resize-none"
              />
              <p className="text-right text-xs text-slate-400 mt-1">
                {feedback.feedback.length}/2000
              </p>
            </div>

            {/* Improvement Suggestions */}
            <div>
              <label htmlFor="suggestions" className="block text-lg font-semibold text-slate-800 mb-3">
                Any suggestions for improvement?
              </label>
              <textarea
                id="suggestions"
                value={feedback.improvementSuggestions}
                onChange={(e) => setFeedback((prev) => ({ ...prev, improvementSuggestions: e.target.value }))}
                placeholder="How can we make our demo classes better?"
                rows={3}
                maxLength={1000}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#4a5d4a] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state === 'submitting' || feedback.rating === 0}
              className="w-full py-4 px-6 bg-[#4a5d4a] hover:bg-[#3d4d3d] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {state === 'submitting' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Your feedback is confidential and helps us improve our services.
        </p>
      </div>
    </div>
  )
}
