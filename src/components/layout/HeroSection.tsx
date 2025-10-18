'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Phone, Calendar, Star, Users, BookOpen, Trophy, User, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DemoBookingModal, DemoBookingData } from '@/components/admin/DemoBookingModal'
import { getHeroVariant, trackABTestEvent, type HeroVariant } from '@/lib/ab-testing/heroVariants'

export function HeroSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [heroVariant, setHeroVariant] = useState<HeroVariant | null>(null)

  // Initialize A/B test variant on client side
  useEffect(() => {
    const variant = getHeroVariant()
    setHeroVariant(variant)

    // Track variant view
    trackABTestEvent(variant.id, 'variant_view', { page: 'homepage' })
  }, [])

  const stats = [
    { icon: BookOpen, label: '10k+', subtitle: 'NEET Questions Solved' },
    { icon: Users, label: '50+', subtitle: 'Expert Faculty' },
    { icon: Trophy, label: '94.2%', subtitle: 'Success Rate' },
  ]

  const handleBookDemo = () => {
    setIsDemoModalOpen(true)

    // Track A/B test conversion
    if (heroVariant) {
      trackABTestEvent(heroVariant.id, 'demo_booking_click', {
        cta_text: heroVariant.primaryCTA,
      })
    }
  }

  const handleDemoSubmit = async (data: DemoBookingData) => {
    try {
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': generateSessionId(),
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Demo booking failed')
      }

      const result = await response.json()
      // Demo booking successful - no sensitive data logged

      // Track the conversion event
      trackDemoBooking(data)
    } catch (error) {
      console.error('Demo booking error:', error)
      throw error
    }
  }

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const trackDemoBooking = (data: DemoBookingData) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking', {
        event_category: 'engagement',
        event_label: data.courseInterest.join(','),
        value: 1,
      })
    }
  }

  const handleCallNow = () => {
    window.location.href = 'tel:+918826444334'

    // Track A/B test conversion
    if (heroVariant) {
      trackABTestEvent(heroVariant.id, 'phone_call_click', {
        cta_text: heroVariant.secondaryCTA,
      })
    }
  }

  return (
    <section
      className="min-h-screen bg-navy-50 px-4 py-12"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand Positioning Banner */}
            <motion.div
              className="inline-flex items-center bg-navy-50 border border-navy-200 rounded-full px-6 py-3 mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                🏆 Cerebrum Biology Academy - India's #1 NEET Biology Coaching
              </span>
            </motion.div>

            <div className="space-y-4">
              {/* A/B Test Hero Headlines */}
              {heroVariant ? (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {heroVariant.headline.main}{' '}
                    <span className="text-blue-600 relative">
                      {heroVariant.headline.highlight1}
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                        viewBox="0 0 100 12"
                        fill="currentColor"
                      >
                        <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                      </svg>
                    </span>{' '}
                    {heroVariant.id === 'outcome_focused' && (
                      <span className="text-emerald-600">{heroVariant.headline.highlight2}</span>
                    )}
                    {heroVariant.id === 'urgency_social_proof' && (
                      <span className="text-navy-600">{heroVariant.headline.highlight2}</span>
                    )}
                    {heroVariant.id === 'guarantee_focused' && (
                      <span className="text-emerald-600 font-extrabold">
                        {heroVariant.headline.highlight2}
                      </span>
                    )}
                    {heroVariant.id === 'control' && (
                      <span className="text-navy-600">{heroVariant.headline.highlight2}</span>
                    )}
                  </h1>

                  {/* Urgency indicator for specific variants */}
                  {heroVariant.id === 'urgency_social_proof' && (
                    <motion.div
                      className="inline-flex items-center bg-red-50 border border-red-200 rounded-full px-4 py-2 text-red-700 font-medium text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                    >
                      <Zap className="w-4 h-4 mr-2 text-red-500" />
                      Limited Time: November Batch Filling Fast
                    </motion.div>
                  )}

                  <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                    {heroVariant.subtext}
                  </p>
                </>
              ) : (
                // Fallback content while loading
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    From{' '}
                    <span className="text-blue-600 relative">
                      NEET Dreams
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-3 text-blue-200"
                        viewBox="0 0 100 12"
                        fill="currentColor"
                      >
                        <path d="M0,8 Q50,0 100,8 L100,12 L0,12 Z" />
                      </svg>
                    </span>{' '}
                    to <span className="text-navy-600">Medical College Reality</span>
                  </h1>

                  <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                    Join 2,847 students who secured medical seats with our proven 94.2% success
                    methodology. Transform your NEET preparation with personalized coaching from
                    AIIMS faculty.
                  </p>
                </>
              )}
            </div>

            {/* Enhanced CTA Section with Urgency */}
            <div className="space-y-4">
              {/* Urgency Banner */}
              <motion.div
                className="inline-flex items-center bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-full px-4 py-2 text-red-700 font-medium text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                <span>⏰ Limited Seats: November Batch Filling Fast - Only 12 Spots Left!</span>
              </motion.div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant={
                    heroVariant?.id === 'outcome_focused' || heroVariant?.id === 'guarantee_focused'
                      ? 'success_cta'
                      : heroVariant?.id === 'urgency_social_proof'
                        ? 'urgency_cta'
                        : 'demo_cta'
                  }
                  size="xl"
                  onClick={handleBookDemo}
                  className="group mobile-cta touch-animation haptic-feedback ripple-effect min-h-[56px] px-8 py-4 rounded-2xl gpu-accelerated relative overflow-hidden"
                  style={{ boxShadow: 'var(--shadow-premium)' }}
                >
                  <div className="relative z-10 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    {heroVariant?.primaryCTA || 'Book Free Demo Class'}
                  </div>
                  {/* Subtle animation overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Button>

                <Button
                  variant="phone_cta"
                  size="xl"
                  className="group mobile-secondary-btn touch-animation haptic-feedback min-h-[56px] px-6 py-4 rounded-2xl gpu-accelerated"
                  onClick={handleCallNow}
                  style={{ boxShadow: 'var(--shadow-soft)' }}
                >
                  <Phone className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  {heroVariant?.secondaryCTA || 'Call Now: +91 88264 44334'}
                </Button>
              </div>

              {/* Risk Reversal */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  💯 <span className="font-semibold text-green-600">100% Risk-Free</span> • No
                  Payment Required for Demo •
                  <span className="font-semibold text-blue-600">330+ Score Guarantee</span>
                </p>
              </div>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="space-y-6 pt-6">
              {/* Real-time Social Proof Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-teal-50 border border-teal-200 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    <span className="text-emerald-600 font-semibold">Rahul from Delhi</span> just
                    enrolled in our Class 12th Biology course
                  </span>
                  <div className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                    2 min ago
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center bg-teal-50 border border-teal-100 text-teal-700 px-5 py-3 rounded-full text-sm shadow-sm backdrop-blur-sm">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span className="font-semibold">94.2% Success Rate</span>
                </div>
                <div className="flex items-center bg-navy-50 border border-navy-100 text-navy-700 px-5 py-3 rounded-full text-sm shadow-sm backdrop-blur-sm">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">2,847+ Cerebrum Medical Seats</span>
                </div>
                <div className="flex items-center bg-teal-50 border border-teal-100 text-teal-700 px-5 py-3 rounded-full text-sm shadow-sm backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span className="font-semibold">247 AIIMS Selections</span>
                </div>
              </div>

              {/* Enhanced Student Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex -space-x-2 mr-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-teal-600 border-2 border-white flex items-center justify-center"
                      >
                        <User className="w-4 h-4 text-white" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">2,847+</div>
                    <div className="text-xs text-gray-600">Success Stories</div>
                  </div>
                </div>

                <div className="flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex text-yellow-400 mr-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">4.9/5</div>
                    <div className="text-xs text-gray-600">Student Rating</div>
                  </div>
                </div>

                <div className="flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">94.2%</div>
                    <div className="text-xs text-gray-600">NEET Success</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual & Stats */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Hero Illustration Placeholder */}
            <div className="relative">
              <div className="w-full h-96 bg-navy-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-navy-800/20"></div>
                <div className="relative z-10 text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <BookOpen className="w-16 h-16" />
                  </div>
                  <p className="text-lg font-medium">NEET Biology Mastery</p>
                  <p className="text-sm opacity-80">With Expert Faculty</p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <Users className="w-10 h-10 text-green-300" />
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 text-center border border-white/50 hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                  style={{ boxShadow: 'var(--shadow-premium)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">{stat.label}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Demo Booking Modal */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSubmit={handleDemoSubmit}
      />
    </section>
  )
}
