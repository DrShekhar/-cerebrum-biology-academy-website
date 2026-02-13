'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, MessageSquare, CheckCircle2, Users, Trophy, Clock, Star } from 'lucide-react'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import {
  trackWhatsAppConversion,
  trackPhoneCallConversion,
  trackLeadFormConversion,
} from '@/lib/analytics/googleAdsConversions'

export default function NEETDemoLandingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'neet-biology',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    ConversionTracker.initialize()
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'ad-landing',
      variantId: 'neet-demo',
      pageType: 'google-ads-landing',
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    trackLeadFormConversion('neet-demo-landing')
    ConversionTracker.trackLeadGeneration('neet-demo-form', formData)

    try {
      const response = await fetch('/api/leads/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'google-ads-landing',
          landingPage: '/lp/neet-demo',
          timestamp: new Date().toISOString(),
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          gclid: new URLSearchParams(window.location.search).get('gclid'),
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        router.push('/thank-you?form=demo-booking&source=google-ads')
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    trackPhoneCallConversion('+918826444334')
    window.open('tel:+918826444334', '_self')
  }

  const handleWhatsApp = async () => {
    ConversionTracker.trackWhatsAppClick()
    trackWhatsAppConversion('neet-demo-landing')
    await trackAndOpenWhatsApp({
      source: 'google-ads-landing',
      message: 'Hi! I want to book a free NEET Biology demo class.',
      campaign: 'google-ads-demo',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Above the Fold - Phone Number Prominent */}
      <div className="bg-green-600 py-3">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
          <a
            href="tel:+918826444334"
            onClick={handleCallNow}
            className="flex items-center space-x-3 text-white font-bold text-lg hover:text-green-100 transition-colors"
          >
            <Phone className="w-5 h-5 animate-pulse" />
            <span>Call Now: +91 88264 44334</span>
            <span className="bg-white/20 px-2 py-1 rounded text-sm">FREE Counseling</span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Value Proposition */}
          <div className="text-white space-y-6 animate-fadeInUp"
          >
            <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">#1 NEET Biology Coaching</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-yellow-400">Free Demo Class</span>
              <br />
              NEET Biology by AIIMS Faculty
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Experience our teaching methodology before you enroll.
              <span className="text-white font-semibold"> 90% of our students clear NEET.</span>
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">2341+</div>
                <div className="text-xs sm:text-sm text-gray-400">Students Selected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">90%</div>
                <div className="text-xs sm:text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">15</div>
                <div className="text-xs sm:text-sm text-gray-400">Max Batch Size</div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {['AS', 'PP', 'RK', 'SK'][i - 1]}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold text-white">847 students</span> enrolled this month
              </div>
            </div>
          </div>

          {/* Right Side - Simple Lead Form */}
          <div className="animate-fadeInUp">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Book Your FREE Demo Class
                </h2>
                <p className="text-gray-600 mt-2">Limited seats available</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="WhatsApp Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-lg font-bold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 shadow-lg shadow-green-500/25 disabled:opacity-50"
                >
                  {isSubmitting ? 'Booking...' : 'Book Free Demo Now'}
                </button>
              </form>

              {/* Quick Contact Options */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-500 text-sm mb-4">Or connect instantly</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCallNow}
                    className="flex items-center justify-center space-x-2 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now</span>
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center space-x-2 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-xl transition-colors font-medium"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>No Spam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Strip */}
      <div className="bg-slate-800/50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { icon: Users, label: 'Small Batches', value: 'Max 15 Students' },
              { icon: Trophy, label: 'AIIMS Faculty', value: 'Expert Teachers' },
              { icon: Clock, label: 'Flexible Timing', value: 'Morning & Evening' },
              { icon: Star, label: 'Success Rate', value: '90% Selection' },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <item.icon className="w-8 h-8 mx-auto text-yellow-400" />
                <div className="text-sm text-gray-400">{item.label}</div>
                <div className="font-bold">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-50">
        <div className="flex space-x-3">
          <button
            onClick={handleCallNow}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-xl font-medium"
          >
            <Phone className="w-5 h-5" />
            <span>Call</span>
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-xl font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Mobile padding for fixed bottom bar */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}
