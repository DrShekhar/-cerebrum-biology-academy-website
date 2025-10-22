import { Metadata } from 'next'
import Link from 'next/link'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { GraduationCap, Target, Trophy } from 'lucide-react'

// Build timestamp: 2025-10-19T20:00:00Z - Cache invalidation
export const metadata: Metadata = {
  title: 'Cerebrum Biology Academy',
  description: 'NEET Biology Coaching',
}

export default function HomePage() {
  const batchStartDate = new Date('2025-10-28T09:00:00')

  return (
    <>
      {/* Hero Section - Clean, Professional */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Urgency Banner */}
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg shadow-sm">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⏰</span>
                <div className="flex-1">
                  <p className="font-semibold text-red-800 mb-2">
                    Limited Time Offer - Batch Starting Soon!
                  </p>
                  <p className="text-red-700 mb-3">
                    Next batch starting in <span className="font-bold">7 days</span> | Only{' '}
                    <span className="font-bold text-red-900">147 seats</span> remaining!
                  </p>
                  <CountdownTimer
                    targetDate={batchStartDate}
                    className="justify-center"
                    showIcon={false}
                  />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              India's Premier NEET Biology Academy
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Harvard-level education meets medical excellence. 94.2% NEET qualification rate with
              personalized mentorship.
            </p>

            {/* Social Proof Stats - Above Fold */}
            <div className="grid grid-cols-3 gap-4 mb-8 bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600">94.2%</div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">
                  NEET Qualification
                </div>
              </div>
              <div className="text-center border-l border-r border-slate-200">
                <div className="text-3xl md:text-4xl font-bold text-teal-600">2,847+</div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">
                  Medical Selections
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-600">10,000+</div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">
                  Students Enrolled
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-xs md:text-sm font-medium text-slate-700">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-xs md:text-sm font-medium text-slate-700">AIIMS Faculty</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-xs md:text-sm font-medium text-slate-700">24/7 Support</span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Claim Your NEET Success - 147 Seats Left!
              </Link>
              <Link
                href="/demo"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-2 border-orange-600 font-semibold px-8 py-4 rounded-md transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Book FREE Demo (Worth ₹2000) - Today Only!
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Success Stories - Social Proof */}
      <section className="py-16 bg-white border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Recent Success Stories</h2>
            <p className="text-slate-600">Real students, Real results from this month</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  P
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Priya Sharma</div>
                  <div className="text-sm text-slate-600">AIIMS Delhi</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-700 mb-2">685/720</div>
              <p className="text-sm text-slate-700 italic">
                "Best decision of my life. Faculty support is exceptional!"
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  R
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Rahul Kumar</div>
                  <div className="text-sm text-slate-600">JIPMER</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-700 mb-2">648/720</div>
              <p className="text-sm text-slate-700 italic">
                "Personalized attention made all the difference."
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  A
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Ananya Patel</div>
                  <div className="text-sm text-slate-600">AFMC Pune</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-700 mb-2">672/720</div>
              <p className="text-sm text-slate-700 italic">
                "Biology concepts were never this clear before!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features - Card Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Cerebrum Biology Academy?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive NEET preparation with proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Faculty',
                description: 'Learn from AIIMS graduates and medical professionals',
                icon: GraduationCap,
                color: 'text-blue-600',
              },
              {
                title: 'Personalized Learning',
                description: 'AI-powered adaptive testing and 24/7 doubt clearing',
                icon: Target,
                color: 'text-teal-600',
              },
              {
                title: 'Proven Results',
                description: '94.2% qualification rate, 2,847+ medical college selections',
                icon: Trophy,
                color: 'text-amber-600',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <feature.icon className={`w-12 h-12 mb-4 ${feature.color}`} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Final Push */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your NEET Journey?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join 10,000+ students achieving their medical college dreams
          </p>
          <Link
            href="/demo"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Book Your Free Demo Class
          </Link>
        </div>
      </section>
    </>
  )
}
