'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ThumbsUp, TrendingUp, ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'

interface GoogleReview {
  id: string
  authorName: string
  authorPhoto?: string
  rating: number
  text: string
  date: string
  verified: boolean
}

const sampleReviews: GoogleReview[] = [
  {
    id: '1',
    authorName: 'Priya Sharma',
    rating: 5,
    text: 'Dr. Shekhar Sir is an exceptional teacher. His teaching methods helped me score 680 in NEET. The biology concepts became so clear under his guidance. Highly recommend Cerebrum!',
    date: '2 weeks ago',
    verified: true,
  },
  {
    id: '2',
    authorName: 'Rahul Verma',
    rating: 5,
    text: 'Best NEET Biology coaching in Delhi-NCR. The faculty is experienced and the study material is excellent. Worth every penny!',
    date: '1 month ago',
    verified: true,
  },
  {
    id: '3',
    authorName: 'Ananya Gupta',
    rating: 5,
    text: 'Joined for Class 12 NEET prep. The personalized attention and doubt clearing sessions are amazing. Got admission in government medical college!',
    date: '2 months ago',
    verified: true,
  },
  {
    id: '4',
    authorName: 'Karan Singh',
    rating: 5,
    text: "Dr. Shekhar's teaching style is unique and effective. He makes even the difficult topics easy to understand. 98% success rate is genuine!",
    date: '3 months ago',
    verified: true,
  },
]

interface GoogleReviewsWidgetProps {
  variant?: 'full' | 'compact' | 'banner'
  showAll?: boolean
  maxReviews?: number
  className?: string
}

export function GoogleReviewsWidget({
  variant = 'full',
  showAll = false,
  maxReviews = 4,
  className = '',
}: GoogleReviewsWidgetProps) {
  const displayReviews = showAll ? sampleReviews : sampleReviews.slice(0, maxReviews)
  const overallRating = 4.9
  const totalReviews = 500

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-yellow-50 to-amber-50 py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-10 h-10">
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
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(overallRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : star === Math.ceil(overallRating)
                            ? 'fill-yellow-200 text-yellow-400'
                            : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-gray-900">{overallRating}/5</span> on Google •{' '}
                  <span className="font-semibold">{totalReviews}+ reviews</span>
                </p>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/Cerebrum+Biology+Academy"
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7">
                <path
                  fill="white"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">Google Reviews</div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(overallRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  {overallRating} ({totalReviews}+)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {displayReviews.slice(0, 2).map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {review.authorName[0]}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-gray-900">{review.authorName}</div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{review.text}</p>
            </div>
          ))}
        </div>

        <a
          href="https://www.google.com/maps/place/Cerebrum+Biology+Academy"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block text-center text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Read all {totalReviews}+ reviews →
        </a>
      </div>
    )
  }

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 mr-2 fill-yellow-600" />
            Verified Google Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= Math.floor(overallRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : star === Math.ceil(overallRating)
                        ? 'fill-yellow-200 text-yellow-400'
                        : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">{overallRating}/5</span>
          </div>
          <p className="text-lg text-gray-600">
            Based on <span className="font-semibold">{totalReviews}+ verified Google reviews</span>
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {review.authorName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{review.authorName}</h4>
                    {review.verified && (
                      <div className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-blue-100 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed pl-6">{review.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="https://www.google.com/maps/place/Cerebrum+Biology+Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg hover:shadow-xl"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            View All {totalReviews}+ Google Reviews
          </a>

          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-green-600" />
              <span>Rated #1 NEET Biology Coaching</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-blue-600" />
              <span>3 Locations in Delhi-NCR</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
