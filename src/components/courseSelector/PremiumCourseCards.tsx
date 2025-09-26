'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Award, Clock, Users, Target, BookOpen, Zap } from 'lucide-react'

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
  pricing: {
    pinnacle: number
    ascent: number
    pursuit: number
  }
  features: string[]
  moreFeatures: number
  guarantee: {
    title: string
    description: string
  }
  icon: string
}

const courseData: CourseCard[] = [
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
    pricing: {
      pinnacle: 41000,
      ascent: 41000,
      pursuit: 58000,
    },
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
    icon: '🌱',
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
    pricing: {
      pinnacle: 41000,
      ascent: 41000,
      pursuit: 58000,
    },
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
    icon: '🌿',
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
    pricing: {
      pinnacle: 58000,
      ascent: 58000,
      pursuit: 75000,
    },
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
    icon: '🎯',
  },
]

const PricingTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: 'pinnacle' | 'ascent' | 'pursuit'
  onTabChange: (tab: 'pinnacle' | 'ascent' | 'pursuit') => void
}) => {
  const tabs = [
    { id: 'pinnacle', label: 'Pinnacle' },
    { id: 'ascent', label: 'Ascent' },
    { id: 'pursuit', label: 'Pursuit' },
  ]

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as 'pinnacle' | 'ascent' | 'pursuit')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            activeTab === tab.id
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

const CourseCard = ({
  course,
  pricingTier,
}: {
  course: CourseCard
  pricingTier: 'pinnacle' | 'ascent' | 'pursuit'
}) => {
  const price = course.pricing[pricingTier]
  const perYearPrice = Math.round(price * 0.85) // Assuming some discount for annual payment

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      {/* Popular Badge */}
      {course.isPopular && (
        <div className="absolute top-4 right-4">
          <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </span>
        </div>
      )}

      {/* Course Icon and Level */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
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

      {/* Pricing Tabs */}
      <div className="flex bg-gray-50 rounded-lg p-1 mb-4">
        <div className="flex-1 text-center py-2 bg-white rounded-md shadow-sm">
          <span className="text-xs text-gray-500">Pinnacle</span>
        </div>
        <div className="flex-1 text-center py-2">
          <span className="text-xs text-gray-500">Ascent</span>
        </div>
        <div className="flex-1 text-center py-2">
          <span className="text-xs text-gray-500">Pursuit</span>
        </div>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900">₹{(price / 1000).toFixed(0)}K</div>
        <div className="text-sm text-gray-500">₹{perYearPrice.toLocaleString()} per year</div>
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

export default function PremiumCourseCards() {
  const [activePricingTier, setActivePricingTier] = useState<'pinnacle' | 'ascent' | 'pursuit'>(
    'pinnacle'
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Perfect Course</h2>
        <p className="text-gray-600 mb-6">Showing {courseData.length} courses</p>

        {/* Global Pricing Tabs */}
        <PricingTabs activeTab={activePricingTier} onTabChange={setActivePricingTier} />
      </div>

      {/* Course Cards Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {courseData.map((course) => (
          <CourseCard key={course.id} course={course} pricingTier={activePricingTier} />
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
