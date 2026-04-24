'use client'

import { Star, TrendingUp, ExternalLink, MapPin } from 'lucide-react'

interface GoogleReviewsWidgetProps {
  variant?: 'full' | 'compact' | 'banner'
  className?: string
}

const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/Cerebrum+Biology+Academy'
const OVERALL_RATING = 5.0
const TOTAL_REVIEWS = 38

function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  }
  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : star === Math.ceil(rating) && rating % 1 !== 0
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

function GoogleLogo({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export function GoogleReviewsWidget({
  variant = 'full',
  className = '',
}: GoogleReviewsWidgetProps) {
  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-yellow-50 to-amber-50 py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <GoogleLogo />
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <StarRating rating={OVERALL_RATING} size="md" />
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-gray-900">{OVERALL_RATING}/5</span> on Google •{' '}
                  <span className="font-semibold">{TOTAL_REVIEWS} reviews</span>
                </p>
              </div>
            </div>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-lg"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Google Reviews
            </a>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <GoogleLogo className="w-7 h-7" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Google Reviews</div>
              <div className="flex items-center space-x-1">
                <StarRating rating={OVERALL_RATING} size="sm" />
                <span className="text-sm text-gray-600 ml-2">
                  {OVERALL_RATING} ({TOTAL_REVIEWS})
                </span>
              </div>
            </div>
          </div>
        </div>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Read all {TOTAL_REVIEWS} reviews on Google →
        </a>
      </div>
    )
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center animate-fade-in-up">
          <div className="inline-flex items-center bg-yellow-100 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="w-4 h-4 mr-2 fill-yellow-700" />
            Google Reviews
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What Our Students Say
          </h2>

          <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4 border border-gray-100">
              <GoogleLogo className="w-12 h-12" />
            </div>

            <div className="text-5xl font-bold text-gray-900 mb-2">{OVERALL_RATING}/5</div>

            <div className="flex items-center justify-center mb-3">
              <StarRating rating={OVERALL_RATING} size="lg" />
            </div>

            <p className="text-lg text-gray-600 mb-6">
              Based on{' '}
              <span className="font-semibold">{TOTAL_REVIEWS} verified Google reviews</span>
            </p>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View All Reviews on Google
            </a>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              <span>Rated #1 NEET Biology Coaching</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-blue-600" />
              <span>4 Centers in Delhi-NCR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
