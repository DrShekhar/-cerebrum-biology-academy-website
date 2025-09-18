'use client'

import React from 'react'
import { useABTestVariant } from './ABTestProvider'
import { Button } from '@/components/ui/Button'
import { ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'

interface ABTestHeroProps {
  onCtaClick?: () => void
  className?: string
}

export function ABTestHero({ onCtaClick, className = '' }: ABTestHeroProps) {
  const { variant, config, trackClick, trackConversion } = useABTestVariant('hero_section')

  // Fallback to control if no variant assigned
  const defaultConfig = {
    headline: "Master NEET Biology with India's Top Faculty",
    subtext: 'Join 10,000+ students who achieved 330+ in Biology',
    ctaText: 'Book Free Demo Class',
    ctaColor: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
  }

  const heroConfig = config || defaultConfig

  const handleCtaClick = () => {
    trackClick('cta_button')
    trackConversion('demo_booking')
    onCtaClick?.()
  }

  const isUrgencyVariant = variant === 'urgency_variant'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          {/* Urgency Badge for urgency variant */}
          {isUrgencyVariant && (
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <ClockIcon className="h-4 w-4" />
              <span>Limited Time Offer - Enrollment Closing Soon!</span>
            </div>
          )}

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 ${
              isUrgencyVariant ? 'text-red-900' : ''
            }`}
          >
            {heroConfig.headline}
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto ${
              isUrgencyVariant ? 'text-red-700 font-medium' : ''
            }`}
          >
            {heroConfig.subtext}
          </p>

          {/* Success Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>94.2% NEET Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>10,000+ Students Enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>15+ Years Experience</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleCtaClick}
              className={`${heroConfig.ctaColor} hover:scale-105 transition-all duration-300 text-white font-semibold py-4 px-8 rounded-lg text-lg shadow-lg ${
                isUrgencyVariant ? 'animate-pulse shadow-red-500/25' : 'shadow-yellow-500/25'
              }`}
              size="lg"
            >
              {heroConfig.ctaText}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>

            {/* Secondary CTA for urgency variant */}
            {isUrgencyVariant && (
              <button
                onClick={() => trackClick('secondary_cta')}
                className="text-red-600 font-medium hover:text-red-700 transition-colors"
              >
                View Available Seats →
              </button>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">330+</div>
              <div className="text-sm text-gray-600">Avg Biology Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">250+</div>
              <div className="text-sm text-gray-600">AIR Under 100</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">AIIMS Selections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1000+</div>
              <div className="text-sm text-gray-600">Govt Medical Seats</div>
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
