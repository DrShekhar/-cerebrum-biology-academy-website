'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Award } from 'lucide-react'

interface CourseCard {
  id: string
  title: string
  description: string
  classLevel: string
  duration: string
  hoursPerWeek: string
  batchSize: string
  isPopular?: boolean
  isNEETFocused?: boolean
  series: 'pinnacle' | 'ascent' | 'pursuit'
  price: number
  perYearPrice: number
  features: string[]
  moreFeatures: number
  guarantee: {
    title: string
    description: string
  }
  icon: React.ReactNode
  iconBg: string
  seriesBadge: {
    color: string
    bgColor: string
  }
}

const generateCourseData = () => {
  const baseCourses = [
    {
      id: 'class-9',
      title: 'Class 9th Foundation Biology',
      description:
        'Strong foundation in biology concepts to prepare for advanced NEET studies. Focus on building conceptual clarity and scientific temperament.',
      classLevel: 'Class 9th',
      duration: '1 year',
      hoursPerWeek: '6h',
      batchSize: '20',
      isPopular: true,
      isNEETFocused: true,
      pricing: { pinnacle: 41000, ascent: 41000, pursuit: 58000 },
      features: [
        'Optimal batch size (20 students)',
        'Regular doubt clearing sessions',
        'Comprehensive test series',
      ],
      moreFeatures: 5,
      guarantee: {
        title: 'Best Value Guarantee',
        description: 'Starting ₹12K lower than competitors • Up to 25% scholarships',
      },
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
            fill="currentColor"
          />
          <path
            d="M12 20L10.91 15.74L4 15L10.91 14.26L12 8L13.09 14.26L20 15L13.09 15.74L12 20Z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
      ),
      iconBg: 'bg-green-100',
    },
    {
      id: 'class-10',
      title: 'Class 10th Foundation Biology',
      description:
        'Advanced foundation course building upon Class 9th concepts. Prepares students for Class 11th NEET courses with strong conceptual base.',
      classLevel: 'Class 10th',
      duration: '1 year',
      hoursPerWeek: '8h',
      batchSize: '20',
      isNEETFocused: true,
      pricing: { pinnacle: 41000, ascent: 41000, pursuit: 58000 },
      features: [
        'Optimal batch size (20 students)',
        'Regular doubt clearing sessions',
        'Comprehensive test series',
      ],
      moreFeatures: 5,
      guarantee: {
        title: 'Best Value Guarantee',
        description: 'Starting ₹12K lower than competitors • Up to 25% scholarships',
      },
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path d="M12 2L15 9H21L16 14L18 22L12 18L6 22L8 14L3 9H9L12 2Z" fill="currentColor" />
        </svg>
      ),
      iconBg: 'bg-green-100',
    },
    {
      id: 'class-11',
      title: 'Class 11th NEET Comprehensive',
      description:
        'Complete NEET preparation for Class 11th students. Covers entire syllabus with intensive practice and conceptual mastery.',
      classLevel: 'Class 11th',
      duration: '2 years',
      hoursPerWeek: '12h',
      batchSize: '20',
      isPopular: true,
      isNEETFocused: true,
      pricing: { pinnacle: 58000, ascent: 58000, pursuit: 75000 },
      features: [
        'Optimal batch size (20 students)',
        'Regular doubt clearing sessions',
        'Comprehensive test series',
      ],
      moreFeatures: 5,
      guarantee: {
        title: 'Best Value Guarantee',
        description: 'Starting ₹12K lower than competitors • Up to 25% scholarships',
      },
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="12" cy="12" r="2" fill="white" />
        </svg>
      ),
      iconBg: 'bg-green-100',
    },
    {
      id: 'class-12',
      title: 'Class 12th NEET Final',
      description:
        'Intensive final year NEET preparation with board exam coordination. Critical preparation for NEET success.',
      classLevel: 'Class 12th',
      duration: '1 year',
      hoursPerWeek: '15h',
      batchSize: '20',
      isNEETFocused: true,
      pricing: { pinnacle: 68000, ascent: 68000, pursuit: 85000 },
      features: [
        'Optimal batch size (20 students)',
        'Regular doubt clearing sessions',
        'Comprehensive test series',
      ],
      moreFeatures: 5,
      guarantee: {
        title: 'Best Value Guarantee',
        description: 'Starting ₹12K lower than competitors • Up to 25% scholarships',
      },
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path
            d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"
            fill="currentColor"
          />
        </svg>
      ),
      iconBg: 'bg-green-100',
    },
    {
      id: 'dropper',
      title: 'NEET Dropper Program',
      description:
        'Comprehensive revision and intensive preparation for NEET repeat aspirants. Complete XI & XII revision with advanced strategy.',
      classLevel: 'Dropper',
      duration: '1 year',
      hoursPerWeek: '18h',
      batchSize: '20',
      isNEETFocused: true,
      pricing: { pinnacle: 85000, ascent: 85000, pursuit: 95000 },
      features: [
        'Optimal batch size (20 students)',
        'Regular doubt clearing sessions',
        'Comprehensive test series',
      ],
      moreFeatures: 5,
      guarantee: {
        title: 'Best Value Guarantee',
        description: 'Starting ₹12K lower than competitors • Up to 25% scholarships',
      },
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <path
            d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z"
            fill="currentColor"
          />
          <circle cx="12" cy="18" r="3" fill="currentColor" />
        </svg>
      ),
      iconBg: 'bg-green-100',
    },
  ]

  const seriesConfig = [
    {
      series: 'pinnacle' as const,
      batchSize: '12',
      features: [
        'Max 12 students per batch',
        'Premium personalized attention',
        'Advanced test series',
        'Expert mentorship',
      ],
      seriesBadge: { color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    },
    {
      series: 'ascent' as const,
      batchSize: '16',
      features: [
        'Max 16 students per batch',
        'Quality focused teaching',
        'Regular assessments',
        'Doubt clearing sessions',
      ],
      seriesBadge: { color: 'text-purple-600', bgColor: 'bg-purple-100' },
    },
    {
      series: 'pursuit' as const,
      batchSize: '25',
      features: [
        'Max 25 students per batch',
        'Affordable quality education',
        'Comprehensive coverage',
        'Regular practice tests',
      ],
      seriesBadge: { color: 'text-blue-600', bgColor: 'bg-blue-100' },
    },
  ]

  const courseData: CourseCard[] = []

  baseCourses.forEach((course) => {
    seriesConfig.forEach((config) => {
      courseData.push({
        ...course,
        id: `${course.id}-${config.series}`,
        series: config.series,
        price: course.pricing[config.series],
        perYearPrice: Math.round(course.pricing[config.series] * 0.9),
        batchSize: config.batchSize,
        features: config.features,
        seriesBadge: config.seriesBadge,
      })
    })
  })

  return courseData
}

const courseData = generateCourseData()

const CourseCard = ({ course }: { course: CourseCard }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      {/* Series Badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`${course.seriesBadge.bgColor} ${course.seriesBadge.color} text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 capitalize`}
        >
          <Award className="w-3 h-3 fill-current" />
          {course.series}
        </span>
      </div>

      {/* Popular Badge */}
      {course.isPopular && (
        <div className="absolute top-4 left-4">
          <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </span>
        </div>
      )}

      {/* Course Icon and Level */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-16 h-16 ${course.iconBg} rounded-full flex items-center justify-center text-green-600`}
        >
          {course.icon}
        </div>
        <div>
          <span className="text-sm text-gray-600">{course.classLevel}</span>
          {course.isPopular && (
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-blue-500 fill-current" />
              <span className="text-xs text-blue-600 font-medium">Popular</span>
            </div>
          )}
        </div>
      </div>

      {/* Course Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>

      {/* Course Description */}
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">{course.description}</p>

      {/* Course Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{course.duration}</div>
          <div className="text-xs text-gray-500">Duration</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{course.hoursPerWeek}</div>
          <div className="text-xs text-gray-500">Per Week</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{course.batchSize}</div>
          <div className="text-xs text-gray-500">Batch Size</div>
        </div>
      </div>

      {/* NEET Focused Badge */}
      {course.isNEETFocused && (
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-green-600 text-sm font-medium">NEET Focused</span>
        </div>
      )}

      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900">₹{(course.price / 1000).toFixed(0)}K</div>
        <div className="text-sm text-gray-500">
          ₹{course.perYearPrice.toLocaleString()} per year
        </div>
        <div className="text-sm text-blue-600 font-medium mt-1">0% EMI available</div>
      </div>

      {/* Key Features */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
        <ul className="space-y-2">
          {course.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <button className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-700">
          +{course.moreFeatures} more features
        </button>
      </div>

      {/* Guarantee */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-900">{course.guarantee.title}</span>
        </div>
        <p className="text-xs text-blue-700">{course.guarantee.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            View Details
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Enroll Now
          </button>
        </div>
        <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          Book Free Demo Class
        </button>
      </div>

      {/* Learning Modes */}
      <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Online</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-xs text-gray-600">Offline</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Hybrid</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ElegantCourseCards() {
  const [selectedClass, setSelectedClass] = useState<string>('all')

  const classLevels = [
    { value: 'all', label: 'All Classes' },
    { value: 'Class 9th', label: 'Class 9th' },
    { value: 'Class 10th', label: 'Class 10th' },
    { value: 'Class 11th', label: 'Class 11th' },
    { value: 'Class 12th', label: 'Class 12th' },
    { value: 'Dropper', label: 'Droppers' },
  ]

  const filteredCourses =
    selectedClass === 'all'
      ? courseData
      : courseData.filter((course) => course.classLevel === selectedClass)

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Course</h2>
        <p className="text-gray-600 mb-6">Showing {filteredCourses.length} courses</p>

        {/* Class Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {classLevels.map((cls) => (
            <button
              key={cls.value}
              onClick={() => setSelectedClass(cls.value)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedClass === cls.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cls.label}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Not sure which course is right for you?
        </h3>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
          Take Our Course Recommendation Quiz
        </button>
      </div>
    </div>
  )
}
