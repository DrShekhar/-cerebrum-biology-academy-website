'use client'

import React, { useState } from 'react'
import { X, Check, Star, Award, TrendingUp, AlertTriangle } from 'lucide-react'
import { type Course } from '@/data/courseData'

interface CourseComparisonProps {
  courses: Course[]
  onClose: () => void
}

interface ComparisonMetric {
  label: string
  getValue: (course: Course) => string | number
  format?: (value: any) => string
  type: 'text' | 'number' | 'percentage' | 'currency' | 'feature'
  highlight?: boolean
}

const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    label: 'Course Price',
    getValue: (course) => course.currentPrice,
    format: (value) => `₹${(value / 1000).toFixed(0)}K`,
    type: 'currency',
    highlight: true,
  },
  {
    label: 'Original Price',
    getValue: (course) => course.originalPrice,
    format: (value) => `₹${(value / 1000).toFixed(0)}K`,
    type: 'currency',
  },
  {
    label: 'Success Rate',
    getValue: (course) => course.successRate,
    format: (value) => `${value}%`,
    type: 'percentage',
    highlight: true,
  },
  {
    label: 'Batch Size',
    getValue: (course) => course.batchSize,
    format: (value) => `${value} students`,
    type: 'number',
  },
  {
    label: 'Duration',
    getValue: (course) => course.duration,
    type: 'text',
  },
  {
    label: 'Total Enrolled',
    getValue: (course) => course.enrollmentCount,
    format: (value) => `${value.toLocaleString()}`,
    type: 'number',
  },
  {
    label: 'EMI Starting From',
    getValue: (course) => course.installmentOptions[0]?.monthlyAmount || course.currentPrice,
    format: (value) => `₹${(value / 1000).toFixed(1)}K/month`,
    type: 'currency',
  },
  {
    label: 'Course Rating',
    getValue: (course) => course.rating || 4.8,
    format: (value) => `${value}/5.0`,
    type: 'number',
  },
]

export function CourseComparison({ courses, onClose }: CourseComparisonProps) {
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([])

  const toggleFeatureExpansion = (courseId: string) => {
    setExpandedFeatures((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    )
  }

  const getBestValue = (metric: ComparisonMetric): string | null => {
    if (courses.length < 2) return null

    const values = courses.map((course) => metric.getValue(course))

    switch (metric.type) {
      case 'currency':
        return courses[values.indexOf(Math.min(...(values as number[])))]?.id || null
      case 'percentage':
      case 'number':
        return courses[values.indexOf(Math.max(...(values as number[])))]?.id || null
      default:
        return null
    }
  }

  const calculateSavings = (course: Course) => {
    return course.originalPrice - course.currentPrice
  }

  const getRecommendationScore = (course: Course): number => {
    let score = 0
    score += course.successRate * 0.4
    score += (course.enrollmentCount / 10000) * 30
    score += ((course.originalPrice - course.currentPrice) / course.originalPrice) * 20
    score += (course.features.length / 15) * 10
    return Math.round(score)
  }

  const topRecommendation = courses.reduce((best, current) =>
    getRecommendationScore(current) > getRecommendationScore(best) ? current : best
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden animate-fadeInUp"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6" />
              <div>
                <h2 className="text-2xl font-bold">Course Comparison</h2>
                <p className="text-green-100 mt-1">Compare {courses.length} courses side by side</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Recommendation Banner */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Award className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-orange-900 mb-1">AI Recommendation</h3>
                <p className="text-orange-800">
                  Based on success rate, value for money, and features, we recommend{' '}
                  <span className="font-bold">{topRecommendation.name}</span> for the best overall
                  experience.
                </p>
                <div className="mt-2 text-sm text-orange-700">
                  Score: {getRecommendationScore(topRecommendation)}/100 • Success Rate:{' '}
                  {topRecommendation.successRate}% • Value: ₹
                  {(calculateSavings(topRecommendation) / 1000).toFixed(0)}K savings
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900 bg-gray-50 sticky left-0 z-10 min-w-[200px]">
                    Features
                  </th>
                  {courses.map((course) => (
                    <th
                      key={course.id}
                      className={`text-center p-4 font-semibold min-w-[250px] ${
                        course.id === topRecommendation.id
                          ? 'bg-green-50 text-green-900 border-2 border-green-200'
                          : 'bg-gray-50 text-gray-900'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="font-bold text-lg">{course.name}</div>
                        <div className="text-sm opacity-75">{course.series} Series</div>
                        {course.id === topRecommendation.id && (
                          <div className="text-xs bg-green-600 text-white px-2 py-1 rounded-full inline-block">
                            ⭐ RECOMMENDED
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Key Metrics */}
                {COMPARISON_METRICS.map((metric, index) => {
                  const bestValueCourseId = getBestValue(metric)

                  return (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 ${metric.highlight ? 'bg-blue-25' : ''}`}
                    >
                      <td
                        className={`p-4 font-medium text-gray-900 bg-gray-50 sticky left-0 z-10 ${
                          metric.highlight ? 'bg-blue-50' : ''
                        }`}
                      >
                        {metric.label}
                        {metric.highlight && (
                          <Star className="inline h-4 w-4 text-yellow-500 ml-1" />
                        )}
                      </td>
                      {courses.map((course) => {
                        const value = metric.getValue(course)
                        const formattedValue = metric.format
                          ? metric.format(value)
                          : value.toString()
                        const isBest = bestValueCourseId === course.id

                        return (
                          <td
                            key={course.id}
                            className={`p-4 text-center ${
                              course.id === topRecommendation.id ? 'bg-green-25' : ''
                            } ${isBest ? 'font-bold text-green-600' : 'text-gray-700'}`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              {formattedValue}
                              {isBest && <Check className="h-4 w-4 text-green-600" />}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}

                {/* Savings Row */}
                <tr className="border-b border-gray-100 bg-green-25">
                  <td className="p-4 font-medium text-gray-900 bg-green-50 sticky left-0 z-10">
                    Total Savings
                    <TrendingUp className="inline h-4 w-4 text-green-600 ml-1" />
                  </td>
                  {courses.map((course) => {
                    const savings = calculateSavings(course)
                    const savingsPercentage = Math.round((savings / course.originalPrice) * 100)

                    return (
                      <td
                        key={course.id}
                        className={`p-4 text-center ${
                          course.id === topRecommendation.id ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="text-green-600 font-bold">
                          ₹{(savings / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-green-600">({savingsPercentage}% off)</div>
                      </td>
                    )
                  })}
                </tr>

                {/* Course Features */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">
                    Key Features
                  </td>
                  {courses.map((course) => (
                    <td
                      key={course.id}
                      className={`p-4 ${course.id === topRecommendation.id ? 'bg-green-25' : ''}`}
                    >
                      <div className="space-y-1">
                        {course.features
                          .slice(0, expandedFeatures.includes(course.id) ? undefined : 5)
                          .map((feature, idx) => (
                            <div key={idx} className="text-sm text-gray-700 flex items-start gap-1">
                              <Check className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}

                        {course.features.length > 5 && (
                          <button
                            onClick={() => toggleFeatureExpansion(course.id)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            {expandedFeatures.includes(course.id)
                              ? 'Show Less'
                              : `+${course.features.length - 5} more features`}
                          </button>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Payment Options */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900 bg-gray-50 sticky left-0 z-10">
                    Payment Options
                  </td>
                  {courses.map((course) => (
                    <td
                      key={course.id}
                      className={`p-4 ${course.id === topRecommendation.id ? 'bg-green-25' : ''}`}
                    >
                      <div className="space-y-2 text-sm">
                        <div className="font-medium text-gray-900">
                          One-time: ₹{(course.currentPrice / 1000).toFixed(0)}K
                        </div>
                        {course.installmentOptions.slice(0, 2).map((option, idx) => (
                          <div key={idx} className="text-gray-600">
                            {option.duration}mo: ₹{(option.monthlyAmount / 1000).toFixed(1)}K/mo
                          </div>
                        ))}
                        {course.installmentOptions.length > 2 && (
                          <div className="text-blue-600 text-xs">
                            +{course.installmentOptions.length - 2} more options
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`p-4 rounded-xl border-2 ${
                  course.id === topRecommendation.id
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-center mb-3">
                  <h4 className="font-bold text-gray-900">{course.name}</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{(course.currentPrice / 1000).toFixed(0)}K
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      course.id === topRecommendation.id
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {course.id === topRecommendation.id ? 'Enroll Now (Recommended)' : 'Enroll Now'}
                  </button>

                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>

                  <button className="w-full text-blue-600 hover:text-blue-700 py-1 text-sm font-medium">
                    Calculate EMI
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Notes */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Comparison Notes</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Success rates are based on NEET 2024 results from our students</li>
                  <li>• All courses include live classes, recorded sessions, and doubt clearing</li>
                  <li>• EMI options are subject to approval and documentation</li>
                  <li>• Prices shown are current promotional rates, subject to change</li>
                  <li>• All courses come with a 7-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
