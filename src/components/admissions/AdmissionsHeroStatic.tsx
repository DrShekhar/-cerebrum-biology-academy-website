import { Award, Trophy, Download, Phone } from 'lucide-react'
import Link from 'next/link'

/**
 * Static Hero Component for Admissions Page
 *
 * This is a SERVER component - renders immediately without waiting for JS.
 * Uses CSS animations instead of Framer Motion to ensure fast LCP.
 *
 * Performance Optimizations:
 * - No 'use client' directive = server-rendered HTML
 * - CSS animations instead of JS animations
 * - Critical content renders in initial HTML payload
 */
export function AdmissionsHeroStatic() {
  return (
    <section className="bg-indigo-500 text-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Hero Content with CSS animations */}
          <div className="text-center lg:text-left">
            {/* Badge - animate with CSS */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 animate-fade-in-up">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">2,847+ Students Enrolled</span>
            </div>

            {/* Main Heading - Critical LCP element, no JS required */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Start Your NEET Journey Today
            </h1>

            {/* Subheading - Part of LCP */}
            <p
              className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Join India&apos;s top Biology coaching with AIIMS trained faculty. Get personalized
              guidance and crack NEET with confidence.
            </p>

            {/* Trust Badges */}
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">AIIMS Trained Faculty</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium">94% Success Rate</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <Link
                href="/brochure/cerebrum-admissions-brochure.pdf"
                download="Cerebrum-Biology-Academy-Admissions-Brochure.pdf"
                className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Brochure
              </Link>
              <a
                href="#application-form"
                className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 mr-2" />
                Full Application
              </a>
            </div>
          </div>

          {/* Right Column - Placeholder for QuickInquiryForm (loaded by client component) */}
          <div className="lg:pl-8" id="hero-form-placeholder">
            {/* QuickInquiryForm will be hydrated here by client component */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fade-in-right">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Inquiry</h3>
                <p className="text-gray-600 mb-4">Get a callback within 30 minutes</p>
                {/* Skeleton form fields for immediate visual */}
                <div className="space-y-4">
                  <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-12 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-12 bg-indigo-100 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
