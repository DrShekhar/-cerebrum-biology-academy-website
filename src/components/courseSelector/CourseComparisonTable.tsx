'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  X,
  Crown,
  Target,
  Gem,
  Users,
  Clock,
  BookOpen,
  Award,
  Calculator,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

interface ComparisonFeature {
  category: string
  feature: string
  pinnacle: boolean | string | number
  ascent: boolean | string | number
  pursuit: boolean | string | number
  description?: string
}

interface CourseComparisonTableProps {
  selectedSeries?: string[]
  onSeriesSelect?: (series: string) => void
  className?: string
}

const COMPARISON_DATA: ComparisonFeature[] = [
  // Batch & Teaching
  {
    category: 'Batch & Teaching',
    feature: 'Batch Size',
    pinnacle: '10-12 students',
    ascent: '20-25 students',
    pursuit: '25-30 students',
    description: 'Maximum students per batch for personalized attention',
  },
  {
    category: 'Batch & Teaching',
    feature: 'Faculty Type',
    pinnacle: 'AIIMS/Top Medical College',
    ascent: 'Experienced NEET Experts',
    pursuit: 'Qualified Biology Teachers',
    description: 'Educational background and expertise of teaching faculty',
  },
  {
    category: 'Batch & Teaching',
    feature: 'Personal Mentor',
    pinnacle: true,
    ascent: 'Group Mentoring',
    pursuit: false,
    description: 'Dedicated mentor for individual guidance and support',
  },
  {
    category: 'Batch & Teaching',
    feature: 'Weekly Study Hours',
    pinnacle: '15-18 hours',
    ascent: '10-12 hours',
    pursuit: '6-8 hours',
    description: 'Recommended weekly study commitment for optimal results',
  },

  // Course Content
  {
    category: 'Course Content',
    feature: 'NEET Syllabus Coverage',
    pinnacle: '100% Complete',
    ascent: '95% Core + Advanced',
    pursuit: '85% Essential Topics',
    description: 'Percentage of NEET syllabus covered in the course',
  },
  {
    category: 'Course Content',
    feature: 'Live Classes',
    pinnacle: 300,
    ascent: 250,
    pursuit: 200,
    description: 'Total number of live interactive classes',
  },
  {
    category: 'Course Content',
    feature: 'Recorded Lectures',
    pinnacle: 500,
    ascent: 400,
    pursuit: 300,
    description: 'Hours of recorded video lectures for revision',
  },
  {
    category: 'Course Content',
    feature: 'Printed Study Material',
    pinnacle: true,
    ascent: 'Digital + Some Printed',
    pursuit: 'Digital Only',
    description: 'Physical books and printed materials provided',
  },

  // Assessment & Testing
  {
    category: 'Assessment & Testing',
    feature: 'Mock Tests',
    pinnacle: 50,
    ascent: 35,
    pursuit: 25,
    description: 'Full-length NEET simulation tests with analysis',
  },
  {
    category: 'Assessment & Testing',
    feature: 'Weekly Tests',
    pinnacle: true,
    ascent: true,
    pursuit: 'Bi-weekly',
    description: 'Regular assessment frequency for progress tracking',
  },
  {
    category: 'Assessment & Testing',
    feature: 'Personalized Analysis',
    pinnacle: true,
    ascent: 'Detailed Reports',
    pursuit: 'Basic Reports',
    description: 'Individual performance analysis and improvement suggestions',
  },
  {
    category: 'Assessment & Testing',
    feature: 'Rank Prediction',
    pinnacle: true,
    ascent: true,
    pursuit: false,
    description: 'AI-powered NEET rank prediction based on performance',
  },

  // Support & Guidance
  {
    category: 'Support & Guidance',
    feature: 'Doubt Clearing',
    pinnacle: '1-on-1 Sessions',
    ascent: 'Group + WhatsApp',
    pursuit: 'WhatsApp Support',
    description: 'Method and frequency of doubt resolution support',
  },
  {
    category: 'Support & Guidance',
    feature: 'Parent Counseling',
    pinnacle: true,
    ascent: 'Monthly Updates',
    pursuit: false,
    description: 'Regular communication and guidance for parents',
  },
  {
    category: 'Support & Guidance',
    feature: 'Career Guidance',
    pinnacle: 'Comprehensive',
    ascent: 'Medical College Selection',
    pursuit: 'Basic Information',
    description: 'Career counseling and medical college admission guidance',
  },
  {
    category: 'Support & Guidance',
    feature: 'Success Guarantee',
    pinnacle: 'Money-back if not improved',
    ascent: 'Repeat course free',
    pursuit: false,
    description: 'Guarantee policies and student protection measures',
  },

  // Technology & Features
  {
    category: 'Technology & Features',
    feature: 'Mobile App',
    pinnacle: true,
    ascent: true,
    pursuit: true,
    description: 'Dedicated mobile application for learning on-the-go',
  },
  {
    category: 'Technology & Features',
    feature: 'Offline Access',
    pinnacle: true,
    ascent: 'Limited',
    pursuit: false,
    description: 'Ability to download and access content without internet',
  },
  {
    category: 'Technology & Features',
    feature: 'Live Class Recording',
    pinnacle: true,
    ascent: true,
    pursuit: 'Major Topics Only',
    description: 'Recording of live sessions for later review',
  },
  {
    category: 'Technology & Features',
    feature: 'Progress Analytics',
    pinnacle: 'Advanced Dashboard',
    ascent: 'Standard Reports',
    pursuit: 'Basic Tracking',
    description: 'Detailed analytics and progress tracking features',
  },
]

const SERIES_INFO = {
  pinnacle: {
    name: 'Pinnacle',
    icon: Crown,
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-900',
    accent: 'text-purple-600',
    description: 'Premium elite coaching with maximum personalization',
    priceRange: '₹98K - ₹1.5L',
    successRate: '98.5%',
  },
  ascent: {
    name: 'Ascent',
    icon: Target,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-900',
    accent: 'text-blue-600',
    description: 'Most popular choice with proven track record',
    priceRange: '₹58K - ₹98K',
    successRate: '94.2%',
  },
  pursuit: {
    name: 'Pursuit',
    icon: Gem,
    color: 'green',
    gradient: 'bg-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-900',
    accent: 'text-green-600',
    description: 'Affordable excellence with complete coverage',
    priceRange: '₹48K - ₹78K',
    successRate: '89.7%',
  },
}

function SeriesHeader({ seriesId }: { seriesId: string }) {
  const series = SERIES_INFO[seriesId as keyof typeof SERIES_INFO]
  const IconComponent = series.icon

  return (
    <div className={`${series.bg} ${series.border} border-2 rounded-xl p-4 h-full`}>
      <div className="text-center">
        <div
          className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-r ${series.gradient} rounded-full flex items-center justify-center`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <h3 className={`text-lg font-bold ${series.text} mb-1`}>{series.name} Series</h3>
        <p className="text-sm text-gray-600 mb-3">{series.description}</p>
        <div className="space-y-2">
          <div className={`text-sm font-semibold ${series.accent}`}>{series.priceRange}</div>
          <div className="flex items-center justify-center text-sm">
            <Award className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600 font-semibold">{series.successRate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureValue({
  value,
  seriesId,
  isSelected = false,
}: {
  value: boolean | string | number
  seriesId: string
  isSelected?: boolean
}) {
  const series = SERIES_INFO[seriesId as keyof typeof SERIES_INFO]

  if (typeof value === 'boolean') {
    return value ? (
      <Check className={`w-5 h-5 ${isSelected ? 'text-green-600' : series.accent} mx-auto`} />
    ) : (
      <X className="w-5 h-5 text-gray-400 mx-auto" />
    )
  }

  if (typeof value === 'number') {
    return (
      <span className={`font-semibold ${isSelected ? 'text-gray-900' : series.text}`}>
        {value.toLocaleString()}
      </span>
    )
  }

  return (
    <span className={`text-sm ${isSelected ? 'text-gray-900' : series.text} font-medium`}>
      {value}
    </span>
  )
}

export default function CourseComparisonTable({
  selectedSeries = ['ascent'],
  onSeriesSelect,
  className = '',
}: CourseComparisonTableProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Batch & Teaching'])
  const [showMobileComparison, setShowMobileComparison] = useState(false)

  const categories = [...new Set(COMPARISON_DATA.map((item) => item.category))]

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const handleSeriesToggle = (seriesId: string) => {
    onSeriesSelect?.(seriesId)
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-indigo-500 text-white p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Series Comparison</h2>
          <p className="text-blue-100">
            Compare features across all three series to make the best choice
          </p>
        </div>

        {/* Mobile Series Selector */}
        <div className="md:hidden mt-4">
          <button
            onClick={() => setShowMobileComparison(!showMobileComparison)}
            className="w-full bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center"
          >
            <span className="mr-2">Compare Series</span>
            {showMobileComparison ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Series Headers */}
        <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200">
          <div className="font-semibold text-gray-900">Features</div>
          {Object.entries(SERIES_INFO).map(([seriesId, series]) => (
            <div key={seriesId}>
              <SeriesHeader seriesId={seriesId} />
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="divide-y divide-gray-100">
          {categories.map((category) => (
            <div key={category}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-900">{category}</h3>
                {expandedCategories.includes(category) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Category Features */}
              <AnimatePresence>
                {expandedCategories.includes(category) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {COMPARISON_DATA.filter((item) => item.category === category).map(
                      (feature, index) => (
                        <div
                          key={feature.feature}
                          className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{feature.feature}</span>
                            {feature.description && (
                              <span className="text-sm text-gray-500 mt-1">
                                {feature.description}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-center">
                            <FeatureValue
                              value={feature.pinnacle}
                              seriesId="pinnacle"
                              isSelected={selectedSeries.includes('pinnacle')}
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <FeatureValue
                              value={feature.ascent}
                              seriesId="ascent"
                              isSelected={selectedSeries.includes('ascent')}
                            />
                          </div>
                          <div className="flex items-center justify-center">
                            <FeatureValue
                              value={feature.pursuit}
                              seriesId="pursuit"
                              isSelected={selectedSeries.includes('pursuit')}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <AnimatePresence>
          {showMobileComparison && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {/* Series Selection */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Select Series to Compare</h3>
                <div className="space-y-2">
                  {Object.entries(SERIES_INFO).map(([seriesId, series]) => {
                    const IconComponent = series.icon
                    const isSelected = selectedSeries.includes(seriesId)

                    return (
                      <button
                        key={seriesId}
                        onClick={() => handleSeriesToggle(seriesId)}
                        className={`w-full p-3 rounded-lg border-2 transition-all flex items-center ${
                          isSelected
                            ? `${series.border} ${series.bg} ${series.text}`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 mr-3 ${isSelected ? series.accent : 'text-gray-400'}`}
                        />
                        <div className="flex-grow text-left">
                          <div className="font-semibold">{series.name} Series</div>
                          <div className="text-sm opacity-75">{series.priceRange}</div>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-green-600" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Feature Comparison */}
              {selectedSeries.length > 0 && (
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Feature Comparison</h3>

                  {categories.map((category) => (
                    <div key={category} className="mb-6">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full text-left mb-3 flex items-center justify-between"
                      >
                        <h4 className="font-semibold text-gray-800">{category}</h4>
                        {expandedCategories.includes(category) ? (
                          <ChevronUp className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedCategories.includes(category) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-3 overflow-hidden"
                          >
                            {COMPARISON_DATA.filter((item) => item.category === category).map(
                              (feature) => (
                                <div key={feature.feature} className="bg-gray-50 rounded-lg p-3">
                                  <h5 className="font-medium text-gray-900 mb-2">
                                    {feature.feature}
                                  </h5>
                                  {feature.description && (
                                    <p className="text-sm text-gray-600 mb-3">
                                      {feature.description}
                                    </p>
                                  )}

                                  <div className="space-y-2">
                                    {selectedSeries.map((seriesId) => {
                                      const series =
                                        SERIES_INFO[seriesId as keyof typeof SERIES_INFO]
                                      const featureValue = feature[
                                        seriesId as keyof typeof feature
                                      ] as boolean | string | number

                                      return (
                                        <div
                                          key={seriesId}
                                          className="flex items-center justify-between"
                                        >
                                          <span className={`text-sm font-medium ${series.text}`}>
                                            {series.name}
                                          </span>
                                          <div className="flex items-center">
                                            <FeatureValue
                                              value={featureValue}
                                              seriesId={seriesId}
                                              isSelected={true}
                                            />
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Call to Action */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Need help choosing the right series? Get personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              🎯 Get Smart Recommendation
            </button>
            <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              📞 Talk to Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
