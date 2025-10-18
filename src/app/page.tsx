import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cerebrum Biology Academy',
  description: 'NEET Biology Coaching',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Clean, Professional */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              India's Premier NEET Biology Academy
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
              Harvard-level education meets medical excellence. 94.2% NEET qualification rate with
              personalized mentorship.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
              >
                Explore Courses
              </Link>
              <Link
                href="/demo"
                className="bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-300 hover:border-slate-400 font-semibold px-8 py-4 rounded-md transition-all duration-200"
              >
                Book Free Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators - Clean Stats */}
      <section className="py-16 bg-white border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-teal-600 mb-2">94.2%</div>
              <div className="text-slate-600 font-medium">NEET Qualification Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-600 mb-2">2,847+</div>
              <div className="text-slate-600 font-medium">Medical College Selections</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-teal-600 mb-2">10,000+</div>
              <div className="text-slate-600 font-medium">Students Mentored</div>
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
                icon: '👨‍⚕️',
              },
              {
                title: 'Personalized Learning',
                description: 'AI-powered adaptive testing and 24/7 doubt clearing',
                icon: '🎯',
              },
              {
                title: 'Proven Results',
                description: '94.2% qualification rate, 2,847+ medical college selections',
                icon: '🏆',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
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
