import React from 'react'
import { motion } from 'framer-motion'
import { Star, Award, Users, CheckCircle } from 'lucide-react'
import { getCoursePricing, formatPrice, formatCurrency } from '@/lib/utils/pricing'
import { courseTiers } from '@/data/courseSystemData'
import type { CourseSeries } from '@/types/courseSystem'
import { Button } from './Button'

interface PricingDisplayProps {
  courseId: string
  className?: string
  showTiers?: boolean
  highlightTier?: CourseSeries
  showCompetitiveAdvantage?: boolean
  onEnrollClick?: (tier?: CourseSeries) => void
}

interface TierCardProps {
  tier: any
  pricing: any
  isPopular?: boolean
  onEnrollClick?: (tier: CourseSeries) => void
}

function TierCard({ tier, pricing, isPopular, onEnrollClick }: TierCardProps) {
  const tierInfo = courseTiers.find((t) => t.series === tier.series)
  const tierPricing = pricing.tiers.find((p: any) => p.series === tier.series)

  if (!tierInfo || !tierPricing) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl shadow-lg border-2 p-6 ${
        isPopular ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
            <Star className="w-4 h-4 mr-1 fill-current" />
            Most Popular
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tierInfo.name}</h3>
        <p className="text-gray-600 mb-4">{tierInfo.description}</p>

        <div className="mb-4">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-600 mb-2">
            {tierPricing.formattedPrice}
          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            {formatCurrency(tierPricing.price)} per year
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{tierInfo.batchSize} students/batch</span>
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-1" />
            <span>Premium features</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        {tierInfo.highlights.slice(0, 6).map((highlight: string) => (
          <div
            key={`highlight-${highlight.slice(0, 25).replace(/\s+/g, '-').toLowerCase()}`}
            className="flex items-start"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{highlight}</span>
          </div>
        ))}
      </div>

      <Button
        className={`w-full ${
          isPopular ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-800 hover:bg-gray-900'
        }`}
        onClick={() => onEnrollClick?.(tier.series)}
      >
        Enroll in {tierInfo.name}
      </Button>

      {isPopular && (
        <div className="mt-4 text-center text-sm text-primary-600 font-medium">
          ✨ Best value for money
        </div>
      )}
    </motion.div>
  )
}

export function PricingDisplay({
  courseId,
  className = '',
  showTiers = false,
  highlightTier = 'ascent',
  showCompetitiveAdvantage = false,
  onEnrollClick,
}: PricingDisplayProps) {
  const pricing = getCoursePricing(courseId)

  if (showTiers) {
    return (
      <div className={`${className}`}>
        {showCompetitiveAdvantage && (
          <div className="text-center mb-12">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800">Competitive Advantage</h3>
              </div>
              <p className="text-green-700">
                Starting at <span className="font-bold">{pricing.formattedMinPrice}</span> vs
                competitors' ₹60K+ • Up to 25% scholarships • 0% EMI options
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricing.tiers.map((tier) => {
            const tierData = courseTiers.find((t) => t.series === tier.series)
            return tierData ? (
              <TierCard
                key={tier.series}
                tier={tier}
                pricing={pricing}
                isPopular={tier.series === highlightTier}
                onEnrollClick={onEnrollClick}
              />
            ) : null
          })}
        </div>
      </div>
    )
  }

  // Simple pricing display
  return (
    <div className={`${className}`}>
      <div className="text-center bg-white rounded-2xl shadow-lg p-8">
        <div className="text-4xl font-bold text-primary-600 mb-4">{pricing.priceRange}</div>
        <p className="text-gray-600 mb-6">Choose from {pricing.tiers.length} different tiers</p>

        {showCompetitiveAdvantage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-5 h-5 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Best Value</span>
            </div>
            <p className="text-sm text-green-700">
              Starting {formatPrice(60000 - pricing.minPrice)} lower than competitors
            </p>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-600 mb-8">
          <div>• Flexible EMI options available</div>
          <div>• Up to 25% scholarship discounts</div>
          <div>• 30-day money-back guarantee</div>
        </div>

        <Button className="w-full" onClick={() => onEnrollClick?.()}>
          View Pricing Plans
        </Button>
      </div>
    </div>
  )
}

export default PricingDisplay
