'use client'

import { motion } from 'framer-motion'
import { CourseProgram, CourseSeries } from '@/types/courseSystem'
import { formatPrice, calculateSavings, getFeatureMatrix } from '@/utils/courseUtils'
import { Button } from '@/components/ui/Button'
import {
  Check,
  X,
  Star,
  Award,
  Target,
  Zap,
  Crown,
  Users,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

interface TierComparisonProps {
  course: CourseProgram
  onSelectTier?: (tier: CourseSeries) => void
  selectedTier?: CourseSeries
  className?: string
}

const tierConfigs = {
  pinnacle: {
    name: 'Pinnacle',
    subtitle: 'Maximum Success',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    icon: Crown,
    badge: 'PREMIUM',
    badgeColor: 'bg-amber-500 text-white',
    recommended: true,
  },
  ascent: {
    name: 'Ascent',
    subtitle: 'Balanced Excellence',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    icon: Target,
    badge: 'POPULAR',
    badgeColor: 'bg-blue-500 text-white',
    recommended: false,
  },
  pursuit: {
    name: 'Pursuit',
    subtitle: 'Great Value',
    color: 'bg-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    icon: Zap,
    badge: 'VALUE',
    badgeColor: 'bg-green-600 text-white',
    recommended: false,
  },
}

export function TierComparison({
  course,
  onSelectTier,
  selectedTier,
  className = '',
}: TierComparisonProps) {
  const featureMatrix = getFeatureMatrix()
  const tiers = Object.keys(course.tiers) as CourseSeries[]

  const handleSelectTier = (tier: CourseSeries) => {
    onSelectTier?.(tier)
  }

  const getFeatureValue = (tier: CourseSeries, feature: string): boolean => {
    const tierFeatures = course.tiers[tier].features
    const featureKey = feature.toLowerCase().replace(/\s+/g, '') as keyof typeof tierFeatures

    // Map feature names to actual feature keys
    const featureMap: Record<string, keyof typeof tierFeatures> = {
      liveinteractiveclasses: 'liveClasses',
      recordedvideolectures: 'recordedVideos',
      personalmentoring: 'personalMentoring',
      doubtclearingsessions: 'doubtSessions',
      printedstudymaterials: 'printedMaterials',
      'digitalnotes&worksheets': 'digitalNotes',
      testseries: 'testSeries',
      performancetracking: 'performanceTracking',
      allindiaranking: 'allIndiaRanking',
      parentcounseling: 'parentCounseling',
      careerguidance: 'careerGuidance',
    }

    const mappedKey = featureMap[featureKey] || featureKey
    return tierFeatures[mappedKey as keyof typeof tierFeatures] || false
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Course Tiers</h2>
        <p className="text-lg text-gray-600">
          Choose the perfect tier for your learning needs and budget
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Tier Headers */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
          {/* Features Column Header */}
          <div className="hidden lg:block p-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Features & Benefits</h3>
            <p className="text-sm text-gray-600">Compare what's included in each tier</p>
          </div>

          {/* Tier Headers */}
          {tiers.map((tier) => {
            const config = tierConfigs[tier]
            const tierDetails = course.tiers[tier]
            const savings = calculateSavings(course.id, tier)
            const Icon = config.icon

            return (
              <motion.div
                key={tier}
                className={`
                  relative p-6 border-b border-gray-200 ${config.bgColor} 
                  ${selectedTier === tier ? 'ring-2 ring-blue-500 ring-inset' : ''}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: tiers.indexOf(tier) * 0.1 }}
              >
                {/* Recommended Badge */}
                {config.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold flex items-center">
                      <Sparkles className="w-3 h-3 mr-1" />
                      RECOMMENDED
                    </div>
                  </div>
                )}

                {/* Tier Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`${config.badgeColor} px-3 py-1 rounded-full text-xs font-bold`}>
                    {config.badge}
                  </div>
                  <Icon className={`w-8 h-8 ${config.textColor}`} />
                </div>

                {/* Tier Name & Subtitle */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{config.name}</h3>
                  <p className={`text-sm ${config.textColor} font-medium`}>{config.subtitle}</p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {formatPrice(tierDetails.price)}
                  </div>
                  {savings && (
                    <div className="text-sm text-green-600 font-medium">
                      Save {formatPrice(savings.savings)} (5% off one-time)
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mt-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    {tierDetails.batchSize} students max
                  </div>
                </div>

                {/* Quick Benefits */}
                <div className="mb-6">
                  <div className="space-y-2">
                    {tierDetails.additionalBenefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => handleSelectTier(tier)}
                  className={`
                    w-full transition-all duration-300
                    ${
                      selectedTier === tier
                        ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                        : `bg-gradient-to-r ${config.color} text-white hover:opacity-90`
                    }
                  `}
                  size="lg"
                >
                  {selectedTier === tier ? 'Selected' : 'Choose Plan'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {featureMatrix.map((featureItem, idx) => (
              <motion.div
                key={featureItem.feature}
                className={`grid grid-cols-1 lg:grid-cols-4 gap-0 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                {/* Feature Name */}
                <div className="p-4 lg:p-6 border-b border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-1">{featureItem.feature}</h4>
                  <p className="text-sm text-gray-600">{featureItem.description}</p>
                </div>

                {/* Feature Availability for Each Tier */}
                {tiers.map((tier) => {
                  const hasFeature = getFeatureValue(tier, featureItem.feature)
                  const config = tierConfigs[tier]

                  return (
                    <div
                      key={`${featureItem.feature}-${tier}`}
                      className="p-4 lg:p-6 border-b border-gray-100 flex items-center justify-center"
                    >
                      {hasFeature ? (
                        <div className="flex items-center">
                          <div
                            className={`
                            w-6 h-6 rounded-full flex items-center justify-center
                            ${config.badgeColor}
                          `}
                          >
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-900 lg:hidden">
                            Included
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <X className="w-4 h-4 text-gray-500" />
                          </div>
                          <span className="ml-2 text-sm text-gray-500 lg:hidden">Not included</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-4">
              Join thousands of students who have achieved NEET success with our proven curriculum
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Book Free Demo Class
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Download Curriculum
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
