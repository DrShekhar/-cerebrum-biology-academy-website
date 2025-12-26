'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Calculator,
  Star,
  Users,
  Clock,
  Award,
  ChevronDown,
  CheckCircle,
} from 'lucide-react'
import {
  courses,
  getSeriesInfo,
  getBadgeInfo,
  type Course,
  type InstallmentOption,
} from '@/data/courseData'
import { PaymentCalculator } from './PaymentCalculator'
import { CourseComparison } from './CourseComparison'

// Helper function for calculating recommendation scores
const calculateRecommendationScore = (course: Course, allCourses: Course[]): number => {
  let score = 0

  // Success rate weight (40%)
  score += course.successRate * 0.4

  // Enrollment popularity weight (30%)
  const maxEnrollment = Math.max(...allCourses.map((c) => c.enrollmentCount))
  score += (course.enrollmentCount / maxEnrollment) * 30

  // Value for money weight (20%)
  const valueScore = (course.originalPrice - course.currentPrice) / course.originalPrice
  score += valueScore * 20

  // Features count weight (10%)
  score += (course.features.length / 15) * 10

  return score
}

interface FilterState {
  series: string[]
  priceRange: [number, number]
  batchSize: string[]
  duration: string[]
  searchQuery: string
}

interface SortOption {
  value: string
  label: string
}

const SORT_OPTIONS: SortOption[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'success-rate', label: 'Success Rate' },
  { value: 'popularity', label: 'Most Popular' },
]

const PRICE_RANGES = [
  { label: 'Under ₹1L', min: 0, max: 100000 },
  { label: '₹1L - ₹2L', min: 100000, max: 200000 },
  { label: '₹2L - ₹3L', min: 200000, max: 300000 },
  { label: '₹3L+', min: 300000, max: Infinity },
]

export function SmartCourseCatalog() {
  const [filters, setFilters] = useState<FilterState>({
    series: [],
    priceRange: [0, 600000],
    batchSize: [],
    duration: [],
    searchQuery: '',
  })
  const [sortBy, setSortBy] = useState('recommended')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showCalculator, setShowCalculator] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [expandedFilters, setExpandedFilters] = useState(false)

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        const searchableText =
          `${course.name} ${course.description} ${course.features.join(' ')}`.toLowerCase()
        if (!searchableText.includes(query)) return false
      }

      // Series filter
      if (filters.series.length > 0 && !filters.series.includes(course.series)) {
        return false
      }

      // Price range filter
      if (
        course.originalPrice < filters.priceRange[0] ||
        course.originalPrice > filters.priceRange[1]
      ) {
        return false
      }

      // Batch size filter
      if (filters.batchSize.length > 0) {
        const matchesBatchSize = filters.batchSize.some((size) => {
          if (size === 'small' && course.batchSize <= 15) return true
          if (size === 'medium' && course.batchSize > 15 && course.batchSize <= 30) return true
          if (size === 'large' && course.batchSize > 30) return true
          return false
        })
        if (!matchesBatchSize) return false
      }

      return true
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.originalPrice - b.originalPrice
        case 'price-high':
          return b.originalPrice - a.originalPrice
        case 'success-rate':
          return b.successRate - a.successRate
        case 'popularity':
          return b.enrollmentCount - a.enrollmentCount
        case 'recommended':
        default:
          // Custom recommendation algorithm
          const scoreA = calculateRecommendationScore(a, courses)
          const scoreB = calculateRecommendationScore(b, courses)
          return scoreB - scoreA
      }
    })

    return filtered
  }, [filters, sortBy])

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses(
      (prev) =>
        prev.includes(courseId)
          ? prev.filter((id) => id !== courseId)
          : [...prev, courseId].slice(-3) // Max 3 courses for comparison
    )
  }

  const clearFilters = () => {
    setFilters({
      series: [],
      priceRange: [0, 600000],
      batchSize: [],
      duration: [],
      searchQuery: '',
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Course Catalog</h1>
              <p className="text-gray-600 mt-1">
                Discover your path to NEET success with AI-powered recommendations
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCalculator(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Calculator className="h-4 w-4" />
                Payment Calculator
              </button>

              {selectedCourses.length > 1 && (
                <button
                  onClick={() => setShowComparison(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Compare ({selectedCourses.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={filters.searchQuery}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Series Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Course Series</h4>
                <div className="space-y-2">
                  {['Foundation', 'Pursuit', 'Ascent', 'Pinnacle', 'Intensive'].map((series) => (
                    <label key={series} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.series.includes(series)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters((prev) => ({ ...prev, series: [...prev.series, series] }))
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              series: prev.series.filter((s) => s !== series),
                            }))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{series}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, priceRange: [range.min, range.max] }))
                      }
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                          ? 'bg-blue-100 text-blue-800'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Batch Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Batch Size</h4>
                <div className="space-y-2">
                  {[
                    { value: 'small', label: 'Small (≤15 students)' },
                    { value: 'medium', label: 'Medium (16-30 students)' },
                    { value: 'large', label: 'Large (30+ students)' },
                  ].map((size) => (
                    <label key={size.value} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.batchSize.includes(size.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters((prev) => ({
                              ...prev,
                              batchSize: [...prev.batchSize, size.value],
                            }))
                          } else {
                            setFilters((prev) => ({
                              ...prev,
                              batchSize: prev.batchSize.filter((s) => s !== size.value),
                            }))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{size.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and View Options */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {filteredAndSortedCourses.length} courses found
                </span>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredAndSortedCourses.map((course, index) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    isSelected={selectedCourses.includes(course.id)}
                    onToggleSelection={toggleCourseSelection}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredAndSortedCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCalculator && (
        <PaymentCalculator courses={courses} onClose={() => setShowCalculator(false)} />
      )}

      {showComparison && selectedCourses.length > 1 && (
        <CourseComparison
          courses={courses.filter((c) => selectedCourses.includes(c.id))}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  )
}

interface CourseCardProps {
  course: Course
  index: number
  isSelected: boolean
  onToggleSelection: (courseId: string) => void
}

function CourseCard({ course, index, isSelected, onToggleSelection }: CourseCardProps) {
  const seriesInfo = getSeriesInfo(course.series)
  const badgeInfo = getBadgeInfo(course.badge)
  const savings = course.originalPrice - course.currentPrice
  const savingsPercentage = Math.round((savings / course.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`bg-white rounded-xl shadow-sm border-2 transition-all hover:shadow-lg group ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-200'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Course Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${seriesInfo.color}`}>
            {course.series}
          </div>
          <button
            onClick={() => onToggleSelection(course.id)}
            className={`transition-colors ${
              isSelected ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            <CheckCircle className="h-5 w-5" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {course.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-gray-600">{course.successRate}% Success</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">{course.batchSize} students</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-gray-600">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-600">{course.enrollmentCount} enrolled</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{(course.currentPrice / 1000).toFixed(0)}K
            </span>
            {savings > 0 && (
              <span className="text-lg text-gray-500 line-through">
                ₹{(course.originalPrice / 1000).toFixed(0)}K
              </span>
            )}
            {savingsPercentage > 0 && (
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {savingsPercentage}% OFF
              </span>
            )}
          </div>
          {course.installmentOptions.length > 0 && (
            <p className="text-sm text-gray-600">
              EMI from ₹{(course.installmentOptions[0].monthlyAmount / 1000).toFixed(1)}K/month
            </p>
          )}
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {course.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {course.features.length > 3 && (
              <span className="text-xs text-gray-500">+{course.features.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Enroll Now
          </button>
          <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  )
}
