'use client'

import React, { useState, useEffect } from 'react'
import {
  X,
  Plus,
  Star,
  Crown,
  TrendingUp,
  Clock,
  DollarSign,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react'
import { type Course } from '@/data/courseData'

interface CourseComparisonTableProps {
  courses: Course[]
  onRemoveCourse?: (courseId: string) => void
  onAddCourse?: () => void
  maxCourses?: number
  className?: string
}

interface ComparisonFeature {
  category: string
  icon: React.ReactNode
  features: {
    label: string
    getValue: (course: Course) => string | number | boolean
    format?: (value: any) => string
    highlight?: boolean
    description?: string
  }[]
}

// Harvard-level educational feature categorization
const COMPARISON_FEATURES: ComparisonFeature[] = [
  {
    category: 'Investment & Payment',
    icon: <DollarSign className="h-5 w-5" />,
    features: [
      {
        label: 'Course Fee',
        getValue: (course) => course.currentPrice,
        format: (value) => `₹${(value / 1000).toFixed(0)}K`,
        highlight: true,
        description: 'Total course investment',
      },
      {
        label: 'Original Price',
        getValue: (course) => course.originalPrice,
        format: (value) => `₹${(value / 1000).toFixed(0)}K`,
        description: 'Before discount pricing',
      },
      {
        label: 'You Save',
        getValue: (course) => course.originalPrice - course.currentPrice,
        format: (value) => `₹${(value / 1000).toFixed(0)}K`,
        highlight: true,
        description: 'Total savings amount',
      },
      {
        label: 'EMI Starting',
        getValue: (course) => course.installmentOptions[0]?.monthlyAmount || course.currentPrice,
        format: (value) => `₹${(value / 1000).toFixed(1)}K/mo`,
        description: 'Minimum monthly payment',
      },
    ],
  },
  {
    category: 'Class Structure',
    icon: <Clock className="h-5 w-5" />,
    features: [
      {
        label: 'Course Duration',
        getValue: (course) => course.duration,
        highlight: true,
        description: 'Total program length',
      },
      {
        label: 'Weekly Hours',
        getValue: (course) => course.weeklyHours,
        description: 'Class hours per week',
      },
      {
        label: 'Batch Size',
        getValue: (course) => course.batchSize,
        format: (value) => `${value} students`,
        highlight: true,
        description: 'Maximum students per batch',
      },
      {
        label: 'Target Classes',
        getValue: (course) => course.targetClass.join(', '),
        description: 'Suitable for these classes',
      },
    ],
  },
  {
    category: 'Academic Excellence',
    icon: <Award className="h-5 w-5" />,
    features: [
      {
        label: 'Success Rate',
        getValue: (course) => course.successRate,
        format: (value) => `${value}%`,
        highlight: true,
        description: 'NEET qualification rate',
      },
      {
        label: 'Students Enrolled',
        getValue: (course) => course.enrollmentCount,
        format: (value) => value.toLocaleString(),
        description: 'Total successful enrollments',
      },
      {
        label: 'Course Rating',
        getValue: (course) => course.rating || 4.9,
        format: (value) => `${value}/5.0 ⭐`,
        description: 'Student satisfaction rating',
      },
      {
        label: 'Series Level',
        getValue: (course) => course.series,
        highlight: true,
        description: 'Academic tier and focus',
      },
    ],
  },
  {
    category: 'Learning Resources',
    icon: <BookOpen className="h-5 w-5" />,
    features: [
      {
        label: 'Total Features',
        getValue: (course) => course.features.length,
        format: (value) => `${value} features`,
        highlight: true,
        description: 'Complete feature count',
      },
      {
        label: 'Live Classes',
        getValue: (course) => course.features.some((f) => f.toLowerCase().includes('live')),
        format: (value) => (value ? 'Included' : 'Not Available'),
        description: 'Real-time interactive sessions',
      },
      {
        label: 'Recorded Classes',
        getValue: (course) => course.features.some((f) => f.toLowerCase().includes('recorded')),
        format: (value) => (value ? 'Included' : 'Not Available'),
        description: 'On-demand video content',
      },
      {
        label: 'Test Series',
        getValue: (course) => course.features.some((f) => f.toLowerCase().includes('test')),
        format: (value) => (value ? 'Included' : 'Not Available'),
        description: 'Practice and mock tests',
      },
      {
        label: 'Study Materials',
        getValue: (course) =>
          course.features.some(
            (f) => f.toLowerCase().includes('notes') || f.toLowerCase().includes('material')
          ),
        format: (value) => (value ? 'Included' : 'Not Available'),
        description: 'Physical and digital resources',
      },
    ],
  },
]

// Silicon Valley design system for course series
const getSeriesDesign = (series: string) => {
  const designs = {
    Foundation: {
      color: 'bg-green-600',
      badge: '🌱 Foundation',
      gradient: 'from-green-50 to-green-50',
    },
    Pursuit: { color: 'bg-blue-500', badge: '🎯 Pursuit', gradient: 'from-blue-50 to-sky-50' },
    Ascent: { color: 'bg-purple-500', badge: '🚀 Ascent', gradient: 'from-purple-50 to-violet-50' },
    Pinnacle: {
      color: 'bg-amber-500',
      badge: '👑 Pinnacle',
      gradient: 'from-amber-50 to-yellow-50',
    },
    Intensive: { color: 'bg-red-500', badge: '🔥 Intensive', gradient: 'bg-red-50' },
  }
  return designs[series as keyof typeof designs] || designs.Pursuit
}

// Harvard-level recommendation algorithm
const getRecommendationLevel = (course: Course, allCourses: Course[]) => {
  const enrollmentPercentile =
    (course.enrollmentCount / Math.max(...allCourses.map((c) => c.enrollmentCount))) * 100
  const successRank =
    allCourses.sort((a, b) => b.successRate - a.successRate).findIndex((c) => c.id === course.id) +
    1
  const valueScore = ((course.originalPrice - course.currentPrice) / course.originalPrice) * 100

  if (successRank === 1 || enrollmentPercentile > 80) return 'most-popular'
  if (valueScore > 15 && course.successRate > 90) return 'best-value'
  if (course.series === 'Pinnacle') return 'premium'
  return 'standard'
}

export function CourseComparisonTable({
  courses,
  onRemoveCourse,
  onAddCourse,
  maxCourses = 4,
  className = '',
}: CourseComparisonTableProps) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Investment & Payment'])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    )
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const getBestValue = (feature: any, courses: Course[]) => {
    const values = courses.map((course) => feature.getValue(course))

    if (typeof values[0] === 'number') {
      const minValue = Math.min(...(values as number[]))
      const maxValue = Math.max(...(values as number[]))

      // For price-related features, lower is better
      if (
        feature.label.toLowerCase().includes('fee') ||
        feature.label.toLowerCase().includes('price')
      ) {
        return courses.find((c) => feature.getValue(c) === minValue)?.id
      }
      // For performance metrics, higher is better
      return courses.find((c) => feature.getValue(c) === maxValue)?.id
    }

    return null
  }

  if (isMobile) {
    // Mobile Accordion View
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Course Comparison</h3>
          {courses.length < maxCourses && onAddCourse && (
            <button
              onClick={onAddCourse}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </button>
          )}
        </div>

        {courses.map((course, courseIndex) => {
          const design = getSeriesDesign(course.series)
          const recommendationLevel = getRecommendationLevel(course, courses)

          return (
            <div
              key={course.id}
              className={`bg-gradient-to-br ${design.gradient} border border-gray-200 rounded-2xl overflow-hidden`}
            >
              {/* Course Header */}
              <div className="bg-white/80 backdrop-blur-sm p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`${design.color} text-white px-3 py-1 rounded-full text-sm font-bold`}
                      >
                        {design.badge}
                      </span>
                      {recommendationLevel === 'most-popular' && (
                        <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          Most Popular
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h4>
                    <p className="text-gray-600 text-sm">{course.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => toggleCourseSelection(course.id)}
                      className="w-5 h-5 text-blue-600 rounded border-gray-300"
                    />
                    {onRemoveCourse && (
                      <button
                        onClick={() => onRemoveCourse(course.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{(course.currentPrice / 1000).toFixed(0)}K
                    </div>
                    <div className="text-gray-600 text-sm">Course Fee</div>
                  </div>
                  <div className="bg-white/60 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{course.successRate}%</div>
                    <div className="text-gray-600 text-sm">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Feature Categories */}
              <div className="divide-y divide-gray-200">
                {COMPARISON_FEATURES.map((category) => (
                  <div key={category.category}>
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="w-full flex items-center justify-between p-4 bg-white/60 hover:bg-white/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <span className="font-semibold text-gray-900">{category.category}</span>
                      </div>
                      {expandedCategories.includes(category.category) ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
{expandedCategories.includes(category.category) && (
                        <div
                          className="overflow-hidden animate-fadeInUp"
                        >
                          <div className="p-4 space-y-3 bg-white/40">
                            {category.features.map((feature) => {
                              const value = feature.getValue(course)
                              const formattedValue = feature.format
                                ? feature.format(value)
                                : String(value)

                              return (
                                <div
                                  key={feature.label}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-gray-700 text-sm">{feature.label}</span>
                                  <span
                                    className={`font-medium text-sm ${
                                      feature.highlight
                                        ? 'text-gray-900 font-bold'
                                        : 'text-gray-600'
                                    }`}
                                  >
                                    {formattedValue}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
</div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Desktop Table View
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-indigo-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6" />
            <div>
              <h3 className="text-xl font-bold">Course Comparison</h3>
              <p className="text-blue-100 text-sm">
                Compare up to {maxCourses} courses side by side
              </p>
            </div>
          </div>
          {courses.length < maxCourses && onAddCourse && (
            <button
              onClick={onAddCourse}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Sticky Header Row */}
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-900 min-w-[200px] bg-gray-50">
                Features
              </th>
              {courses.map((course) => {
                const design = getSeriesDesign(course.series)
                const recommendationLevel = getRecommendationLevel(course, courses)

                return (
                  <th
                    key={course.id}
                    className="text-center p-4 font-semibold min-w-[200px] relative bg-gray-50"
                  >
                    <div className="space-y-3">
                      {/* Course Header */}
                      <div className="flex items-center justify-between">
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course.id)}
                          onChange={() => toggleCourseSelection(course.id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        {onRemoveCourse && (
                          <button
                            onClick={() => onRemoveCourse(course.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {/* Series Badge */}
                      <div
                        className={`${design.color} text-white px-3 py-1 rounded-full text-xs font-bold inline-block`}
                      >
                        {design.badge}
                      </div>

                      {/* Recommendation Badge */}
                      {recommendationLevel === 'most-popular' && (
                        <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          Most Popular
                        </div>
                      )}

                      {/* Course Name */}
                      <div className="text-gray-900 font-bold text-lg">{course.name}</div>
                      <div className="text-gray-600 text-sm">{course.series} Series</div>
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {COMPARISON_FEATURES.map((category, categoryIndex) => (
              <React.Fragment key={category.category}>
                {/* Category Header */}
                <tr className="bg-gray-100">
                  <td colSpan={courses.length + 1} className="p-4">
                    <div className="flex items-center gap-3 font-bold text-gray-900">
                      {category.icon}
                      <span>{category.category}</span>
                    </div>
                  </td>
                </tr>

                {/* Category Features */}
                {category.features.map((feature, featureIndex) => {
                  const bestValueCourseId = getBestValue(feature, courses)

                  return (
                    <tr
                      key={feature.label}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${
                        feature.highlight ? 'bg-blue-25' : ''
                      }`}
                    >
                      <td
                        className={`p-4 font-medium text-gray-900 ${
                          feature.highlight ? 'bg-blue-50' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{feature.label}</span>
                          {feature.highlight && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                        {feature.description && (
                          <div className="text-xs text-gray-500 mt-1">{feature.description}</div>
                        )}
                      </td>

                      {courses.map((course) => {
                        const value = feature.getValue(course)
                        const formattedValue = feature.format
                          ? feature.format(value)
                          : String(value)
                        const isBest = bestValueCourseId === course.id
                        const design = getSeriesDesign(course.series)

                        return (
                          <td
                            key={course.id}
                            className={`p-4 text-center ${isBest ? 'bg-green-50' : ''}`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <span
                                className={`${
                                  isBest
                                    ? 'font-bold text-green-700'
                                    : feature.highlight
                                      ? 'font-semibold text-gray-900'
                                      : 'text-gray-700'
                                }`}
                              >
                                {formattedValue}
                              </span>
                              {isBest && <Sparkles className="h-4 w-4 text-green-600" />}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Bar */}
      {selectedCourses.length > 0 && (
        <div
          className="bg-blue-50 border-t border-blue-200 p-4 animate-fadeInUp"
        >
          <div className="flex items-center justify-between">
            <div className="text-blue-800 font-medium">
              {selectedCourses.length} course(s) selected for detailed comparison
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Compare Selected
              </button>
              <button
                onClick={() => setSelectedCourses([])}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
