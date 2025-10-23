'use client'

import React from 'react'
import { useABTestVariant } from './ABTestProvider'
import { Button } from '@/components/ui/Button'
import {
  ArrowRightIcon,
  ClockIcon,
  StarIcon,
  PlayIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

interface ABTestHeroProps {
  onCtaClick?: () => void
  className?: string
}

export function ABTestHero({ onCtaClick, className = '' }: ABTestHeroProps) {
  const { variant, config, trackClick, trackConversion } = useABTestVariant('hero_section')

  // Enhanced default config with better conversion copy
  const defaultConfig = {
    headline: 'Score 330+ in NEET Biology',
    subtitle: "Join India's Top Biology Faculty",
    subtext: 'Master Biology with Shekhar Sir - 98% Students Qualify NEET',
    ctaText: 'Book FREE Demo Class',
    ctaColor: 'bg-gradient-to-r from-green-500 to-green-600',
  }

  const heroConfig = config || defaultConfig

  const handleCtaClick = () => {
    trackClick('cta_button')
    trackConversion('demo_booking')
    onCtaClick?.()
  }

  const handlePhoneClick = () => {
    trackClick('phone_cta')
    window.open('tel:+918826444334', '_self')
  }

  const isUrgencyVariant = variant === 'urgency_variant'

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 ${className}`}
    >
      {/* Enhanced background with brain pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,200,255,0.1),transparent)]"></div>
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm0 0c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            {/* Urgency Badge */}
            {isUrgencyVariant && (
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
                <ClockIcon className="h-4 w-4" />
                <span>Only 50 Seats Left - Hurry!</span>
              </div>
            )}

            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>
              <span>4.9/5 ★ Rated by 2,847 Students</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="text-green-600">{heroConfig.headline}</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700">
                {heroConfig.subtitle}
              </span>
            </h1>

            {/* Enhanced Subtext with Value Prop */}
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl mx-auto lg:mx-0">
              {heroConfig.subtext}
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Live Interactive Classes</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">24/7 Doubt Resolution</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">NEET-Focused Curriculum</span>
              </div>
            </div>

            {/* Enhanced CTA Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-6">
              <Button
                onClick={handleCtaClick}
                className={`${heroConfig.ctaColor} hover:scale-105 transition-all duration-300 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl group`}
                size="lg"
              >
                <PlayIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {heroConfig.ctaText}
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={handlePhoneClick}
                variant="outline"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                size="lg"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                Call Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="text-sm text-gray-500 text-center lg:text-left">
              <p>✓ 100% Money Back Guarantee • ✓ Free Demo Class • ✓ No Hidden Charges</p>
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="relative">
            {/* Success Statistics Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">NEET Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">vs 23% National Average</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">330+</div>
                <div className="text-sm text-gray-600">Avg Biology Score</div>
                <div className="text-xs text-gray-500 mt-1">Out of 360 marks</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                <div className="text-sm text-gray-600">Students Enrolled</div>
                <div className="text-xs text-gray-500 mt-1">Across India & Abroad</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">AIIMS Selections</div>
                <div className="text-xs text-gray-500 mt-1">Last 3 years</div>
              </div>
            </div>

            {/* Featured Student Quote */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-2xl text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-lg">A</span>
                </div>
                <div>
                  <div className="font-semibold">Ananya Sharma</div>
                  <div className="text-sm opacity-90">AIIMS Delhi, Rank 47</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                "Shekhar Sir's teaching made Biology so easy! Scored 355/360 in NEET 2024. The doubt
                resolution was amazing - available 24/7!"
              </p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid key={i} className="h-4 w-4 text-yellow-300" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
          Hero Test: {variant || 'control'} ({heroConfig.headline.substring(0, 20)}...)
        </div>
      )}
    </div>
  )
}
