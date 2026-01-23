'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClassLevel, CourseProgram } from '@/types/courseSystem'
import { coursePrograms } from '@/data/courseSystemData'
import { getSeriesForClass, Series } from '@/data/seriesData'
import { ClassFilterNav } from './ClassFilterNav'
import { CourseCard } from './CourseCard'
import { DemoClassModal } from './DemoClassModal'
import { Search, BookOpen, Users, Award, Sparkles, Star, Crown, Target, Gem } from 'lucide-react'
import Link from 'next/link'

interface FixedCourseSelectorProps {
  onCourseSelect?: (course: CourseProgram, tier: string) => void
  className?: string
}

// Enhanced Series Card Component
function EnhancedSeriesCard({
  series,
  classLevel,
  onBookDemo,
}: {
  series: Series
  classLevel: string
  onBookDemo: () => void
}) {
  const [selectedPlan, setSelectedPlan] = useState(series.plans[1]?.id || 'B') // Default to Plan B

  const getSeriesIcon = (seriesId: string) => {
    switch (seriesId) {
      case 'pinnacle':
        return Crown
      case 'ascent':
        return Target
      case 'pursuit':
        return Gem
      default:
        return Star
    }
  }

  const getSeriesTheme = (seriesId: string) => {
    switch (seriesId) {
      case 'pinnacle':
        return {
          gradient: 'from-purple-500 to-indigo-600',
          bgCard: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-900',
          accent: 'text-purple-600',
          primary: '#8b5cf6', // Purple from image
        }
      case 'ascent':
        return {
          gradient: 'bg-green-600',
          bgCard: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-900',
          accent: 'text-green-600',
          primary: '#10b981', // Green from image
        }
      case 'pursuit':
        return {
          gradient: 'from-blue-500 to-blue-600',
          bgCard: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          accent: 'text-blue-600',
          primary: '#3b82f6', // Blue from image
        }
      default:
        return {
          gradient: 'from-gray-600 to-gray-800',
          bgCard: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-900',
          accent: 'text-gray-600',
        }
    }
  }

  const theme = getSeriesTheme(series.id)
  const IconComponent = getSeriesIcon(series.id)
  const selectedPlanData = series.plans.find((p) => p.id === selectedPlan) || series.plans[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${theme.border}`}
    >
      {/* Header */}
      <div
        className={`bg-gradient-to-r ${theme.gradient} text-white p-6 text-center relative overflow-hidden`}
      >
        {/* Most Popular Badge */}
        {series.id === 'ascent' && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-20 animate-pulse">
            🔥 Most Popular
          </div>
        )}

        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{series.name} Series</h3>
          <p className="text-white/90 text-sm">{series.description}</p>

          {/* Starting Price Preview */}
          <div className="mt-3 text-white/80 text-sm">
            Starting from{' '}
            <span className="text-xl font-bold text-white">
              ₹{Math.min(...series.plans.map((p) => p.price)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Series Info */}
      <div className="p-6">
        {/* Social Proof & Key Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className={`${theme.bgCard} rounded-lg p-3 text-center`}>
            <div className={`text-lg font-bold ${theme.text}`}>{series.batchSize}</div>
            <div className="text-xs text-gray-600">Batch Size</div>
          </div>
          <div className={`${theme.bgCard} rounded-lg p-3 text-center`}>
            <div className={`text-lg font-bold ${theme.text}`}>{series.weeklyHours}h</div>
            <div className="text-xs text-gray-600">Per Week</div>
          </div>
          <div className={`${theme.bgCard} rounded-lg p-3 text-center`}>
            <div className={`text-lg font-bold text-green-600`}>94.2%</div>
            <div className="text-xs text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Recent Enrollment Social Proof */}
        <div className="text-center mb-4 text-sm text-gray-600">
          🔥 <span className="font-semibold text-green-600">47 students</span> enrolled this week •{' '}
          <span className="font-semibold text-orange-600">Only 8 seats left!</span>
        </div>

        {/* Plan Selection */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Choose Your Plan:</h4>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {series.plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                aria-label={`Select ${plan.name} plan for ${series.name} series`}
                aria-pressed={selectedPlan === plan.id}
                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all min-h-[44px] ${
                  selectedPlan === plan.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Plan {plan.id}
                {plan.popular && <span className="ml-1 text-orange-500">⭐ Popular</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Plan Details */}
        {selectedPlanData && (
          <motion.div
            key={selectedPlan}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${theme.bgCard} border ${theme.border} rounded-xl p-4 mb-6`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h5 className={`font-bold ${theme.text}`}>{selectedPlanData.name} Plan</h5>
                <p className="text-sm text-gray-600">{selectedPlanData.description}</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${theme.text}`}>
                  ₹{selectedPlanData.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">{selectedPlanData.duration}</div>
              </div>
            </div>

            <div className="space-y-2">
              {selectedPlanData.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <span className="text-green-600 mr-2">✓</span>
                  {feature}
                </div>
              ))}
              {selectedPlanData.features.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{selectedPlanData.features.length - 3} more features
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Action Buttons - Prioritized CTA */}
        <div className="space-y-3">
          <button
            onClick={onBookDemo}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[52px]"
            aria-label={`Book free demo class for ${series.name} series ${selectedPlan} plan - no cost, immediate access`}
          >
            🎯 Book FREE Demo → See Results!
          </button>
          <div className="flex space-x-2">
            <Link
              href={`/courses/${series.id}?class=${classLevel}`}
              className="flex-1 bg-white text-gray-700 py-3 rounded-lg font-medium text-center hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-colors border-2 border-gray-300 min-h-[44px] flex items-center justify-center"
              aria-label={`View complete curriculum and faculty details for ${series.name} series`}
            >
              📋 Full Details
            </Link>
            <Link
              href={`/enrollments?class=${classLevel}&series=${series.id}&plan=${selectedPlan}`}
              className={`flex-1 bg-gradient-to-r ${theme.gradient} text-white py-3 rounded-lg font-semibold text-center hover:opacity-90 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-opacity min-h-[44px] flex items-center justify-center`}
              aria-label={`Secure enrollment in ${series.name} series ${selectedPlan} plan - limited seats available`}
            >
              ⚡ Secure My Seat
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function FixedCourseSelector({ onCourseSelect, className = '' }: FixedCourseSelectorProps) {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseProgram | null>(null)

  // Calculate course counts for each class
  const courseCounts = useMemo(() => {
    const counts: Record<ClassLevel, number> = {
      '9th': 0,
      '10th': 0,
      '11th': 0,
      '12th': 0,
      Dropper: 0,
      '2-Year': 0,
    }

    coursePrograms.forEach((course) => {
      counts[course.targetClass]++
    })

    return counts
  }, [])

  // Filter courses based on selected class and search query
  const filteredCourses = useMemo(() => {
    let filtered = coursePrograms

    if (selectedClass !== 'all') {
      filtered = filtered.filter((course) => course.targetClass === selectedClass)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.targetClass.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }, [selectedClass, searchQuery])

  const handleBookDemo = (course: CourseProgram) => {
    setSelectedCourse(course)
    setShowDemoModal(true)
  }

  // Get series data for the selected class
  const seriesData = selectedClass !== 'all' ? getSeriesForClass(selectedClass) : []

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 ${className}`}
    >
      {/* Hero Section */}
      <section className="bg-indigo-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Find Your Perfect
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                {' '}
                NEET Biology{' '}
              </span>
              Course
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto mb-8 px-4">
              Join 10,000+ successful students with our AI-powered course matching and expert
              faculty guidance.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <BookOpen className="w-8 h-8 text-blue-300 mx-auto mb-2" />
              <div className="text-3xl font-bold">{coursePrograms.length}+</div>
              <div className="text-blue-100">Expert Courses</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <Users className="w-8 h-8 text-green-300 mx-auto mb-2" />
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-blue-100">Active Students</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <Award className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-3xl font-bold">94.2%</div>
              <div className="text-blue-100">NEET Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <Sparkles className="w-8 h-8 text-purple-300 mx-auto mb-2" />
              <div className="text-3xl font-bold">₹25L+</div>
              <div className="text-blue-100">Scholarships Given</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Course</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our class-wise course offerings with flexible pricing tiers and payment
                options
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="max-w-lg mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search NEET Biology courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 md:py-4 bg-white border-2 border-gray-300 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-600 shadow-lg text-base md:text-lg font-medium"
                  aria-label="Search NEET Biology courses by class level or series type"
                />
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 min-h-[44px] flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Class Filter Navigation */}
            <ClassFilterNav
              selectedClass={selectedClass}
              onClassSelect={setSelectedClass}
              courseCounts={courseCounts}
            />
          </motion.div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 text-center"
          >
            <p className="text-gray-600">
              {selectedClass !== 'all' ? (
                <>
                  Showing <span className="font-semibold text-blue-600">3 course series</span> for{' '}
                  <span className="font-semibold">Class {selectedClass}</span>
                  <br />
                  <span className="text-sm">
                    Choose your series, then select from Plan A, B, or C
                  </span>
                </>
              ) : (
                <>
                  Showing{' '}
                  <span className="font-semibold text-blue-600">{filteredCourses.length}</span>{' '}
                  course
                  {filteredCourses.length !== 1 ? 's' : ''}
                  {searchQuery && (
                    <span>
                      {' '}
                      matching "<span className="font-semibold">{searchQuery}</span>"
                    </span>
                  )}
                </>
              )}
            </p>
          </motion.div>

          {/* Course Grid */}
          <AnimatePresence mode="wait">
            {selectedClass !== 'all' ? (
              // Show Series Cards when specific class is selected
              seriesData.length > 0 ? (
                <motion.div
                  key={`series-${selectedClass}`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-3 gap-8"
                >
                  {seriesData.map((series, index) => (
                    <motion.div
                      key={series.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <EnhancedSeriesCard
                        series={series}
                        classLevel={selectedClass}
                        onBookDemo={() => {
                          // Create a mock course for demo booking
                          const mockCourse: Partial<CourseProgram> = {
                            id: `${series.id}-${selectedClass}`,
                            name: `${series.name} - Class ${selectedClass}`,
                            targetClass: selectedClass as ClassLevel,
                            isFeatured: series.id === 'ascent',
                            isPopular: series.id === 'ascent',
                          }
                          setSelectedCourse(mockCourse as CourseProgram)
                          setShowDemoModal(true)
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key={`no-series-${selectedClass}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Series Found</h3>
                  <p className="text-gray-600">
                    No series data available for Class {selectedClass}
                  </p>
                </motion.div>
              )
            ) : filteredCourses.length > 0 ? (
              // Show Course Cards when 'all' is selected
              <motion.div
                key="all-courses"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-courses"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Courses Found</h3>
                <p className="text-gray-600 mb-8">
                  {searchQuery
                    ? `No courses match your search "${searchQuery}"`
                    : `No courses available for the selected filters`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedClass('all')
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center bg-indigo-500 rounded-3xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their medical dreams with our
              expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const demoCourse =
                    filteredCourses.find((course) => course.isFeatured || course.isPopular) ||
                    filteredCourses[0]
                  if (demoCourse) {
                    handleBookDemo(demoCourse)
                  }
                }}
                className="bg-white text-blue-600 px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
                disabled={filteredCourses.length === 0}
              >
                Book FREE Demo
              </button>
              <button className="bg-blue-500 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-blue-400 transition-colors text-sm sm:text-base">
                Talk to Expert
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Class Modal */}
      {showDemoModal && selectedCourse && (
        <DemoClassModal
          course={selectedCourse}
          onClose={() => {
            setShowDemoModal(false)
            setSelectedCourse(null)
          }}
        />
      )}
    </div>
  )
}
