'use client'

import React, { useState, useEffect } from 'react'
import { useABTestVariant } from './ABTestProvider'
import { EnrollmentCTA } from './ABTestCTA'
import {
  Check,
  Clock,
  ShieldCheck,
  Star,
  Trophy,
} from 'lucide-react'

interface PricingTier {
  id: string
  name: string
  originalPrice: number
  features: string[]
  popular?: boolean
  guarantee?: string
}

interface ABTestPricingProps {
  tiers: PricingTier[]
  onEnroll?: (tierId: string) => void
  className?: string
}

export function ABTestPricing({ tiers, onEnroll, className = '' }: ABTestPricingProps) {
  const { variant, config, trackClick } = useABTestVariant('pricing_strategy')
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 30 })

  // Default configuration
  const defaultConfig = {
    showOriginalPrice: true,
    discountPercentage: 20,
    urgencyTimer: false,
    guaranteeBadge: false,
    guaranteeText: '100% Money Back Guarantee',
  }

  const pricingConfig = config || defaultConfig

  // Countdown timer effect for urgency variant
  useEffect(() => {
    if (!pricingConfig.urgencyTimer) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 23, minutes: 59, seconds: 59 } // Reset
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [pricingConfig.urgencyTimer])

  const calculateDiscountedPrice = (originalPrice: number) => {
    return originalPrice * (1 - pricingConfig.discountPercentage / 100)
  }

  const handleEnrollClick = (tierId: string) => {
    trackClick(`enroll_${tierId}`)
    onEnroll?.(tierId)
  }

  return (
    <div className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Success Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful NEET aspirants with our proven methodology
          </p>

          {/* Urgency Timer */}
          {pricingConfig.urgencyTimer && (
            <div className="mt-6 inline-flex items-center gap-4 bg-red-50 border border-red-200 rounded-lg px-6 py-3">
              <Clock className="h-5 w-5 text-red-600" />
              <span className="text-red-800 font-medium">Limited Time Offer Ends In:</span>
              <div className="flex gap-2 font-mono text-red-900 font-bold">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
          )}

          {/* Guarantee Badge */}
          {pricingConfig.guaranteeBadge && (
            <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                {pricingConfig.guaranteeText || '100% Money Back Guarantee'}
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => {
            const discountedPrice = calculateDiscountedPrice(tier.originalPrice)
            const savings = tier.originalPrice - discountedPrice

            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                  tier.popular
                    ? 'border-yellow-400 transform scale-105'
                    : 'border-gray-200 hover:border-yellow-400'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Course Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>

                  {/* Pricing */}
                  <div className="mb-6">
                    {pricingConfig.showOriginalPrice && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-500 line-through text-lg">
                          ₹{tier.originalPrice.toLocaleString()}
                        </span>
                        {pricingConfig.discountPercentage > 0 && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                            {pricingConfig.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                    )}

                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{discountedPrice.toLocaleString()}
                    </div>

                    {savings > 0 && (
                      <div className="text-green-600 font-medium text-sm">
                        You save ₹{savings.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Guarantee for guarantee variant */}
                  {pricingConfig.guaranteeBadge && tier.guarantee && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-medium">{tier.guarantee}</span>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <EnrollmentCTA className="w-full" onEnroll={() => handleEnrollClick(tier.id)} />

                  {/* EMI Option */}
                  <div className="mt-4 text-center text-sm text-gray-500">
                    EMI starting ₹{Math.round(discountedPrice / 12).toLocaleString()}/month
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">2,500+</div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">330+</div>
            <div className="text-sm text-gray-600">Avg Score</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>

        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs z-50">
            Pricing Test: {variant || 'control'} (Discount: {pricingConfig.discountPercentage}%)
          </div>
        )}
      </div>
    </div>
  )
}
