'use client'

import { useEffect } from 'react'
import { Star, ExternalLink, Heart, MessageSquare, Phone } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

// BreadcrumbList Schema for improved SERP display and CTR
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cerebrumbiologyacademy.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Reviews',
      item: 'https://cerebrumbiologyacademy.com/reviews',
    },
  ],
}

export default function ReviewsPage() {
  // Google Business Profile review link - UPDATE THIS with your actual GBP review link
  const GOOGLE_REVIEW_LINK = 'https://g.page/r/cerebrum-biology-academy/review'

  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'reviews-page',
      variantId: 'default',
      pageType: 'review-collection',
    })
  }, [])

  const handleGoogleReviewClick = () => {
    ConversionTracker.trackConversion('review_click', 1, {
      platform: 'google',
      source: 'reviews-page',
    })

    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'review_intent', {
        event_category: 'engagement',
        event_label: 'google_review',
        value: 1,
      })
    }

    window.open(GOOGLE_REVIEW_LINK, '_blank')
  }

  const handleWhatsAppFeedback = async () => {
    await trackAndOpenWhatsApp({
      source: 'reviews-page',
      campaign: 'reviews',
      message: 'Hi! I want to share my feedback about Cerebrum Biology Academy.',
    })
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
           className="animate-fadeInUp">
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-10 h-10 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">Your Feedback Matters!</h1>

            <p className="text-xl text-gray-300 mb-2">
              Help future NEET aspirants make the right choice
            </p>

            <p className="text-gray-400">Share your experience at Cerebrum Biology Academy</p>
          </div>
        </div>
      </div>

      {/* Main CTA Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fadeInUp"
        >
          {/* Google Review CTA */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 bg-blue-50 rounded-full px-4 py-2 mb-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
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
              <span className="text-blue-700 font-medium">Google Reviews</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Leave a Google Review
            </h2>

            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Your Google review helps other students and parents find quality NEET coaching. It
              takes less than 2 minutes!
            </p>

            <button
              onClick={handleGoogleReviewClick}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              <Star className="w-6 h-6" />
              <span>Write a Google Review</span>
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-10">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-gray-500 text-sm">or share via</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Alternative Options */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleWhatsAppFeedback}
              className="flex items-center justify-center space-x-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-green-600" />
              <span className="text-green-700 font-medium">Share via WhatsApp</span>
            </button>

            <a
              href={`tel:${CONTACT_INFO.phone.primary}`}
              className="flex items-center justify-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
            >
              <Phone className="w-6 h-6 text-blue-600" />
              <span className="text-blue-700 font-medium">Call & Share Feedback</span>
            </a>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div
         className="animate-fadeInUp">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            What to Include in Your Review
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📚',
                title: 'Teaching Quality',
                description: 'How were the classes? Did the faculty explain concepts clearly?',
              },
              {
                icon: '👥',
                title: 'Batch Size & Attention',
                description: 'Did you get personal attention? How was doubt clearing?',
              },
              {
                icon: '📈',
                title: 'Your Results',
                description: 'How much did your score improve? Any achievements?',
              },
            ].map((tip, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2">{tip.title}</h4>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thank You Message */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Thank You for Being Part of Our Journey!
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            Your feedback helps us improve and helps future NEET aspirants make informed decisions.
            We truly appreciate you taking the time to share your experience.
          </p>
        </div>
      </div>

      {/* Current Rating Display */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-5xl font-bold text-gray-900">4.8</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-yellow-200'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-600">Based on 247+ Google Reviews</p>
          <p className="text-sm text-gray-500 mt-2">
            Join hundreds of satisfied students who shared their experience
          </p>
        </div>
      </div>
      </div>
    </>
  )
}
