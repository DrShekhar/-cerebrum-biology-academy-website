'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Phone, Calendar, Star, Users, BookOpen, Trophy, User } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DemoBookingModal, DemoBookingData } from '@/components/admin/DemoBookingModal'

export function HeroSection() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  const stats = [
    { icon: BookOpen, label: '10k+', subtitle: 'NEET Questions Solved' },
    { icon: Users, label: '50+', subtitle: 'Expert Faculty' },
    { icon: Trophy, label: '94.2%', subtitle: 'Success Rate' },
  ]

  const handleBookDemo = () => {
    setIsDemoModalOpen(true)
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
  }

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-indigo-100 px-4 py-12"
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
            <div className="space-y-4">
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
                to <span className="text-indigo-600">Medical College Reality</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Join 2,847 students who secured medical seats with our proven 94.2% success
                methodology. Transform your NEET preparation with personalized coaching from AIIMS
                faculty.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="xl"
                onClick={handleBookDemo}
                className="group min-h-[56px] px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                style={{ boxShadow: 'var(--shadow-premium)' }}
              >
                <Calendar className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Book Free Demo Class
              </Button>

              <Button
                variant="secondary_cta"
                size="xl"
                className="group min-h-[56px] px-6 py-4 rounded-2xl font-medium text-lg border-2 border-emerald-200 bg-white/95 backdrop-blur-sm hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1 text-emerald-700"
                style={{ boxShadow: 'var(--shadow-soft)' }}
              >
                <Trophy className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                View Success Stories
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="space-y-6 pt-6">
              {/* Real-time Social Proof Banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border border-emerald-200 rounded-2xl p-4 shadow-sm"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    <span className="text-emerald-600 font-semibold">Rahul from Delhi</span> just
                    enrolled in Class 12th Biology
                  </span>
                  <div className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                    2 min ago
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Trust Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 px-5 py-3 rounded-full text-sm border border-emerald-200 shadow-sm backdrop-blur-sm">
                  <Trophy className="w-5 h-5 mr-2" />
                  <span className="font-semibold">94.2% Success Rate</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-5 py-3 rounded-full text-sm border border-blue-200 shadow-sm backdrop-blur-sm">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-semibold">2,847+ Medical Seats Secured</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-5 py-3 rounded-full text-sm border border-purple-200 shadow-sm backdrop-blur-sm">
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
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center"
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
              <div className="w-full h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-indigo-400/20"></div>
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
