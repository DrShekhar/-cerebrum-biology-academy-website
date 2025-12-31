'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  X,
  Check,
  Crown,
  Target,
  Gem,
  Users,
  Clock,
  BookOpen,
  Calculator,
  TrendingUp,
  Award,
  DollarSign,
  BarChart3,
  PieChart,
  Star,
  Zap,
  Shield,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react'

// Types
interface CourseData {
  id: string
  seriesId: 'pinnacle' | 'ascent' | 'pursuit'
  planId: 'A' | 'B' | 'C'
  name: string
  price: number
  originalPrice?: number
  duration: string
  batchSize: number
  weeklyHours: number
  totalHours: number
  features: {
    liveClasses: number
    recordedLectures: number
    mockTests: number
    studyMaterial: string[]
    mentoring: string
    personalMentor: boolean
    testSeries: boolean
    parentCounseling: boolean
    careerGuidance: boolean
    mobileApp: boolean
    offlineAccess: boolean
    doubtClearing: string
  }
  successRate: number
  averageRank: string
}

interface StudentProfile {
  currentClass: string
  academicGoals: string
  previousScore?: number
  studyHours: number
  budget: number
}

interface ComparisonMatrixProps {
  availableCourses?: CourseData[]
  studentProfile?: StudentProfile
  onCourseSelect?: (courses: CourseData[]) => void
  className?: string
}

// Mock course data
const MOCK_COURSES: CourseData[] = [
  {
    id: 'pinnacle-a',
    seriesId: 'pinnacle',
    planId: 'A',
    name: 'Pinnacle Comprehensive',
    price: 150000,
    originalPrice: 180000,
    duration: '24 months',
    batchSize: 12,
    weeklyHours: 18,
    totalHours: 1872,
    features: {
      liveClasses: 300,
      recordedLectures: 500,
      mockTests: 50,
      studyMaterial: ['Printed Books', 'Digital Notes', 'Previous Years', 'Practice Sheets'],
      mentoring: 'Personal 1-on-1',
      personalMentor: true,
      testSeries: true,
      parentCounseling: true,
      careerGuidance: true,
      mobileApp: true,
      offlineAccess: true,
      doubtClearing: '1-on-1 Sessions',
    },
    successRate: 98.5,
    averageRank: '500',
  },
  {
    id: 'ascent-b',
    seriesId: 'ascent',
    planId: 'B',
    name: 'Ascent Focused',
    price: 76000,
    originalPrice: 85000,
    duration: '20 months',
    batchSize: 25,
    weeklyHours: 12,
    totalHours: 960,
    features: {
      liveClasses: 250,
      recordedLectures: 400,
      mockTests: 35,
      studyMaterial: ['Digital Notes', 'Previous Years', 'Practice Sheets'],
      mentoring: 'Group Sessions',
      personalMentor: false,
      testSeries: true,
      parentCounseling: true,
      careerGuidance: true,
      mobileApp: true,
      offlineAccess: false,
      doubtClearing: 'Group + WhatsApp',
    },
    successRate: 94.2,
    averageRank: '2000',
  },
  {
    id: 'pursuit-c',
    seriesId: 'pursuit',
    planId: 'C',
    name: 'Pursuit Foundation',
    price: 48000,
    duration: '18 months',
    batchSize: 35,
    weeklyHours: 8,
    totalHours: 576,
    features: {
      liveClasses: 200,
      recordedLectures: 300,
      mockTests: 25,
      studyMaterial: ['Digital Notes', 'Basic Practice'],
      mentoring: 'Monthly Sessions',
      personalMentor: false,
      testSeries: true,
      parentCounseling: false,
      careerGuidance: false,
      mobileApp: true,
      offlineAccess: false,
      doubtClearing: 'Online Support',
    },
    successRate: 89.7,
    averageRank: '5000',
  },
]

// Series theme helper
function getSeriesTheme(seriesId: string) {
  const themes = {
    pinnacle: {
      gradient: 'from-purple-500 to-indigo-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-900',
      accent: 'text-purple-600',
      icon: Crown,
    },
    ascent: {
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      accent: 'text-blue-600',
      icon: Target,
    },
    pursuit: {
      gradient: 'bg-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      accent: 'text-green-600',
      icon: Gem,
    },
  }
  return themes[seriesId as keyof typeof themes] || themes.ascent
}

// Fee Structure Visualization Component
function FeeStructureChart({ course }: { course: CourseData }) {
  const theme = getSeriesTheme(course.seriesId)

  const breakdown = {
    tuitionFee: course.price * 0.7,
    studyMaterial: course.price * 0.15,
    testSeries: course.price * 0.1,
    technology: course.price * 0.05,
  }

  return (
    <div className={`${theme.bg} rounded-lg p-4 border ${theme.border}`}>
      <div className="flex items-center mb-3">
        <PieChart className={`w-4 h-4 ${theme.accent} mr-2`} />
        <h4 className={`font-semibold ${theme.text} text-sm`}>Fee Breakdown</h4>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Tuition Fee (70%)</span>
          <span className="font-semibold">₹{breakdown.tuitionFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Study Material (15%)</span>
          <span className="font-semibold">₹{breakdown.studyMaterial.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Test Series (10%)</span>
          <span className="font-semibold">₹{breakdown.testSeries.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Technology (5%)</span>
          <span className="font-semibold">₹{breakdown.technology.toLocaleString()}</span>
        </div>
      </div>

      {/* Visual bar */}
      <div className="mt-3 h-6 bg-gray-200 rounded-full overflow-hidden flex">
        <div className="bg-blue-500 flex-1" style={{ flex: 0.7 }} />
        <div className="bg-green-600 flex-1" style={{ flex: 0.15 }} />
        <div className="bg-yellow-500 flex-1" style={{ flex: 0.1 }} />
        <div className="bg-red-500 flex-1" style={{ flex: 0.05 }} />
      </div>
    </div>
  )
}

// Teaching Hours Graph Component
function TeachingHoursGraph({ courses }: { courses: CourseData[] }) {
  const maxHours = Math.max(...courses.map((c) => c.totalHours))

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-4 h-4 text-blue-600 mr-2" />
        <h4 className="font-semibold text-gray-900 text-sm">Teaching Hours Comparison</h4>
      </div>

      <div className="space-y-3">
        {courses.map((course, index) => {
          const theme = getSeriesTheme(course.seriesId)
          const percentage = (course.totalHours / maxHours) * 100

          return (
            <div key={course.id} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className={`font-medium ${theme.text}`}>{course.name}</span>
                <span className="font-semibold text-gray-900">{course.totalHours}h</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${theme.gradient}`}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{course.weeklyHours}h/week</span>
                <span>{course.duration}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Batch Size Indicator Component
function BatchSizeIndicator({ course }: { course: CourseData }) {
  const theme = getSeriesTheme(course.seriesId)

  const getBatchSizeCategory = (size: number) => {
    if (size <= 15)
      return { label: 'Small', color: 'text-green-600', description: 'High Personal Attention' }
    if (size <= 25)
      return { label: 'Medium', color: 'text-blue-600', description: 'Balanced Learning' }
    return { label: 'Large', color: 'text-orange-600', description: 'Cost Effective' }
  }

  const category = getBatchSizeCategory(course.batchSize)

  return (
    <div className={`${theme.bg} rounded-lg p-3 border ${theme.border}`}>
      <div className="flex items-center justify-between mb-2">
        <Users className={`w-4 h-4 ${theme.accent}`} />
        <span className={`text-xs font-semibold ${category.color}`}>{category.label} Batch</span>
      </div>
      <div className="text-center">
        <div className={`text-xl font-bold ${theme.text}`}>{course.batchSize}</div>
        <div className="text-xs text-gray-600">Students per batch</div>
        <div className="text-xs text-gray-500 mt-1">{category.description}</div>
      </div>
    </div>
  )
}

// Feature Checklist Component
function FeatureChecklist({ course }: { course: CourseData }) {
  const theme = getSeriesTheme(course.seriesId)

  const featureList = [
    { key: 'testSeries', label: 'Test Series', value: course.features.testSeries },
    { key: 'personalMentor', label: 'Personal Mentor', value: course.features.personalMentor },
    {
      key: 'parentCounseling',
      label: 'Parent Counseling',
      value: course.features.parentCounseling,
    },
    { key: 'careerGuidance', label: 'Career Guidance', value: course.features.careerGuidance },
    { key: 'mobileApp', label: 'Mobile App', value: course.features.mobileApp },
    { key: 'offlineAccess', label: 'Offline Access', value: course.features.offlineAccess },
  ]

  const availableFeatures = featureList.filter((f) => f.value).length
  const totalFeatures = featureList.length

  return (
    <div className={`${theme.bg} rounded-lg p-4 border ${theme.border}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className={`font-semibold ${theme.text} text-sm`}>Features</h4>
        <span className={`text-xs ${theme.accent} font-semibold`}>
          {availableFeatures}/{totalFeatures}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {featureList.map((feature) => (
          <div key={feature.key} className="flex items-center">
            {feature.value ? (
              <Check className="w-3 h-3 text-green-600 mr-1" />
            ) : (
              <X className="w-3 h-3 text-gray-400 mr-1" />
            )}
            <span className={feature.value ? 'text-gray-900' : 'text-gray-500'}>
              {feature.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <div className="flex text-xs text-gray-600 mb-1">
          <BookOpen className="w-3 h-3 mr-1" />
          <span>Study Materials: {course.features.studyMaterial.join(', ')}</span>
        </div>
        <div className="flex text-xs text-gray-600">
          <Clock className="w-3 h-3 mr-1" />
          <span>Doubt Clearing: {course.features.doubtClearing}</span>
        </div>
      </div>
    </div>
  )
}

// ROI Calculator Component
function ROICalculator({ course }: { course: CourseData }) {
  const theme = getSeriesTheme(course.seriesId)

  const costPerHour = Math.round(course.price / course.totalHours)
  const costPerClass = Math.round(course.price / course.features.liveClasses)
  const costPerTest = Math.round(course.price / course.features.mockTests)

  const getRatingColor = (value: number, type: 'hour' | 'class' | 'test') => {
    const thresholds = {
      hour: { excellent: 100, good: 150, average: 200 },
      class: { excellent: 500, good: 750, average: 1000 },
      test: { excellent: 2000, good: 3000, average: 4000 },
    }

    const threshold = thresholds[type]
    if (value <= threshold.excellent) return 'text-green-600'
    if (value <= threshold.good) return 'text-blue-600'
    if (value <= threshold.average) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className={`${theme.bg} rounded-lg p-4 border ${theme.border}`}>
      <div className="flex items-center mb-3">
        <Calculator className={`w-4 h-4 ${theme.accent} mr-2`} />
        <h4 className={`font-semibold ${theme.text} text-sm`}>ROI Analysis</h4>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Cost per Hour</span>
          <span className={`font-bold ${getRatingColor(costPerHour, 'hour')}`}>₹{costPerHour}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Cost per Class</span>
          <span className={`font-bold ${getRatingColor(costPerClass, 'class')}`}>
            ₹{costPerClass}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Cost per Test</span>
          <span className={`font-bold ${getRatingColor(costPerTest, 'test')}`}>₹{costPerTest}</span>
        </div>
      </div>

      {/* Value Rating */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Value Rating</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  (costPerHour <= 100 && star <= 5) ||
                  (costPerHour <= 150 && star <= 4) ||
                  (costPerHour <= 200 && star <= 3) ||
                  (costPerHour <= 250 && star <= 2) ||
                  star <= 1
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Success Probability Indicator Component
function SuccessProbabilityIndicator({
  course,
  studentProfile,
}: {
  course: CourseData
  studentProfile?: StudentProfile
}) {
  const theme = getSeriesTheme(course.seriesId)

  const calculateProbability = () => {
    let baseScore = course.successRate

    if (studentProfile) {
      // Adjust based on student profile
      if (course.weeklyHours <= studentProfile.studyHours) {
        baseScore += 5
      } else if (course.weeklyHours > studentProfile.studyHours * 1.5) {
        baseScore -= 10
      }

      if (course.price <= studentProfile.budget) {
        baseScore += 3
      } else if (course.price > studentProfile.budget * 1.2) {
        baseScore -= 5
      }

      // Class-specific adjustments
      if (studentProfile.currentClass === 'Dropper' && course.seriesId === 'pinnacle') {
        baseScore += 5
      }
    }

    return Math.min(Math.max(baseScore, 0), 100)
  }

  const probability = calculateProbability()

  const getProbabilityCategory = (prob: number) => {
    if (prob >= 95) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (prob >= 85) return { label: 'Very Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (prob >= 75) return { label: 'Good', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { label: 'Moderate', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const category = getProbabilityCategory(probability)

  return (
    <div className={`${theme.bg} rounded-lg p-4 border ${theme.border}`}>
      <div className="flex items-center mb-3">
        <TrendingUp className={`w-4 h-4 ${theme.accent} mr-2`} />
        <h4 className={`font-semibold ${theme.text} text-sm`}>Success Probability</h4>
      </div>

      <div className="text-center mb-3">
        <div className={`text-2xl font-bold ${category.color}`}>{probability.toFixed(1)}%</div>
        <div
          className={`text-xs px-2 py-1 rounded-full ${category.bg} ${category.color} font-medium inline-block`}
        >
          {category.label}
        </div>
      </div>

      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Base Success Rate</span>
          <span>{course.successRate}%</span>
        </div>
        <div className="flex justify-between">
          <span>Average NEET Rank</span>
          <span>#{course.averageRank}</span>
        </div>
        {studentProfile && (
          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs text-gray-500">*Adjusted for your profile</div>
          </div>
        )}
      </div>
    </div>
  )
}

// Course Selection Component
function CourseSelector({
  availableCourses,
  selectedCourses,
  onCourseSelect,
}: {
  availableCourses: CourseData[]
  selectedCourses: CourseData[]
  onCourseSelect: (course: CourseData) => void
}) {
  const [showSelector, setShowSelector] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
      >
        <div className="text-center">
          <Plus className="w-6 h-6 mx-auto mb-2" />
          <span className="text-sm font-medium">Add Course to Compare</span>
        </div>
      </button>

      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-64 overflow-y-auto"
          >
            {availableCourses
              .filter((course) => !selectedCourses.find((sc) => sc.id === course.id))
              .map((course) => {
                const theme = getSeriesTheme(course.seriesId)
                const IconComponent = theme.icon

                return (
                  <button
                    key={course.id}
                    onClick={() => {
                      onCourseSelect(course)
                      setShowSelector(false)
                    }}
                    className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.gradient} flex items-center justify-center mr-3`}
                    >
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium text-gray-900 text-sm">{course.name}</div>
                      <div className="text-xs text-gray-600">
                        ₹{course.price.toLocaleString()} • {course.duration}
                      </div>
                    </div>
                  </button>
                )
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Comparison Matrix Component
export default function InteractiveComparisonMatrix({
  availableCourses = MOCK_COURSES,
  studentProfile,
  onCourseSelect,
  className = '',
}: ComparisonMatrixProps) {
  const [selectedCourses, setSelectedCourses] = useState<CourseData[]>([MOCK_COURSES[1]]) // Start with Ascent
  const [activeSection, setActiveSection] = useState<string>('overview')

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'features', label: 'Features', icon: Check },
    { id: 'roi', label: 'ROI & Value', icon: Calculator },
    { id: 'success', label: 'Success Metrics', icon: TrendingUp },
  ]

  const handleAddCourse = (course: CourseData) => {
    if (selectedCourses.length < 3 && !selectedCourses.find((c) => c.id === course.id)) {
      const newCourses = [...selectedCourses, course]
      setSelectedCourses(newCourses)
      onCourseSelect?.(newCourses)
    }
  }

  const handleRemoveCourse = (courseId: string) => {
    const newCourses = selectedCourses.filter((c) => c.id !== courseId)
    setSelectedCourses(newCourses)
    onCourseSelect?.(newCourses)
  }

  const canAddMore = selectedCourses.length < 3

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-indigo-500 text-white p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Interactive Course Comparison</h2>
          <p className="text-blue-100">
            Compare up to 3 courses side-by-side to make the best decision
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mt-6">
          <div className="flex bg-white/20 rounded-lg p-1">
            {sections.map((section) => {
              const IconComponent = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-white text-blue-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{section.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="p-6">
        <div
          className={`grid gap-6 ${selectedCourses.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : selectedCourses.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
        >
          {/* Selected Course Cards */}
          {selectedCourses.map((course, index) => {
            const theme = getSeriesTheme(course.seriesId)
            const IconComponent = theme.icon

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden"
              >
                {/* Course Header */}
                <div className={`bg-gradient-to-r ${theme.gradient} text-white p-4 relative`}>
                  <button
                    onClick={() => handleRemoveCourse(course.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>

                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <div className="mt-2">
                      <div className="text-2xl font-bold">₹{course.price.toLocaleString()}</div>
                      {course.originalPrice && (
                        <div className="text-sm text-white/80 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-4 space-y-4">
                  {activeSection === 'overview' && (
                    <>
                      <FeeStructureChart course={course} />
                      <BatchSizeIndicator course={course} />
                    </>
                  )}

                  {activeSection === 'features' && <FeatureChecklist course={course} />}

                  {activeSection === 'roi' && <ROICalculator course={course} />}

                  {activeSection === 'success' && (
                    <SuccessProbabilityIndicator course={course} studentProfile={studentProfile} />
                  )}
                </div>

                {/* Action Button */}
                <div className="p-4 border-t border-gray-100">
                  <button
                    className={`w-full bg-gradient-to-r ${theme.gradient} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                  >
                    Select This Course
                  </button>
                </div>
              </motion.div>
            )
          })}

          {/* Add Course Card */}
          {canAddMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: selectedCourses.length * 0.1 }}
            >
              <CourseSelector
                availableCourses={availableCourses}
                selectedCourses={selectedCourses}
                onCourseSelect={handleAddCourse}
              />
            </motion.div>
          )}
        </div>

        {/* Teaching Hours Comparison (when multiple courses selected) */}
        {selectedCourses.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <TeachingHoursGraph courses={selectedCourses} />
          </motion.div>
        )}

        {/* Summary Statistics */}
        {selectedCourses.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              Quick Comparison Summary
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900 mb-1">Most Affordable</div>
                <div className="text-green-600 font-bold">
                  {
                    selectedCourses.reduce((min, course) =>
                      course.price < min.price ? course : min
                    ).name
                  }
                </div>
                <div className="text-gray-600">
                  ₹{Math.min(...selectedCourses.map((c) => c.price)).toLocaleString()}
                </div>
              </div>

              <div className="text-center">
                <div className="font-semibold text-gray-900 mb-1">Best Value (₹/hour)</div>
                <div className="text-blue-600 font-bold">
                  {
                    selectedCourses.reduce((best, course) =>
                      course.price / course.totalHours < best.price / best.totalHours
                        ? course
                        : best
                    ).name
                  }
                </div>
                <div className="text-gray-600">
                  ₹{Math.min(...selectedCourses.map((c) => Math.round(c.price / c.totalHours)))}
                </div>
              </div>

              <div className="text-center">
                <div className="font-semibold text-gray-900 mb-1">Highest Success Rate</div>
                <div className="text-purple-600 font-bold">
                  {
                    selectedCourses.reduce((best, course) =>
                      course.successRate > best.successRate ? course : best
                    ).name
                  }
                </div>
                <div className="text-gray-600">
                  {Math.max(...selectedCourses.map((c) => c.successRate))}%
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Ready to make your choice? Get personalized guidance from our experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              📞 Talk to Counselor
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              🎯 Book FREE Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
