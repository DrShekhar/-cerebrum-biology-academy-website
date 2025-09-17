'use client'

import Link from 'next/link'
import { CourseProgram, CourseSeries } from '@/types/courseSystem'
import { getCoursePricing, formatPrice, formatCurrency } from '@/lib/utils/pricing'
import { courseTiers } from '@/data/courseSystemData'
import { PaymentOptionsDisplay } from './PaymentOptionsDisplay'
import { DemoClassModal } from './DemoClassModal'
import { useState } from 'react'
import { Star, Users, Clock, Award } from 'lucide-react'

interface CourseCardProps {
  course: CourseProgram
  selectedTier?: CourseSeries
}

export function CourseCard({ course, selectedTier = 'ascent' }: CourseCardProps) {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [activeTier, setActiveTier] = useState<CourseSeries>(selectedTier)

  // Get pricing information using the centralized system
  const pricing = getCoursePricing(course.id)
  const tierInfo = courseTiers.find((t) => t.series === activeTier)
  const tierPricing = pricing.tiers.find((t) => t.series === activeTier)

  const tierColors = {
    pinnacle: 'from-purple-600 to-pink-600',
    ascent: 'from-blue-600 to-indigo-600',
    pursuit: 'from-green-600 to-teal-600',
  }

  const tierNames = {
    pinnacle: 'Pinnacle',
    ascent: 'Ascent',
    pursuit: 'Pursuit',
  }

  // Use centralized formatting functions

  const getClassEmoji = (targetClass: string) => {
    switch (targetClass) {
      case '9th':
        return '🌱'
      case '10th':
        return '🌿'
      case '11th':
        return '🎯'
      case '12th':
        return '🏆'
      case 'Dropper':
        return '💪'
      default:
        return '📚'
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Course Header */}
      <div
        className={`bg-gradient-to-r ${tierColors[activeTier]} p-6 text-white relative overflow-hidden`}
      >
        <div className="absolute top-2 right-2 text-2xl opacity-20">
          {getClassEmoji(course.targetClass)}
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                Class {course.targetClass}
              </span>
              {course.isPopular && (
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{course.name}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{course.description}</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{course.duration}</div>
            <div className="text-xs opacity-75">Duration</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{course.teachingHours}h</div>
            <div className="text-xs opacity-75">Per Week</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{tierInfo?.batchSize || 25}</div>
            <div className="text-xs opacity-75">Batch Size</div>
          </div>
        </div>
      </div>

      {/* Tier Selection */}
      <div className="p-6">
        <div className="flex mb-6">
          {pricing.tiers.map((tierOption) => (
            <button
              key={tierOption.series}
              onClick={() => setActiveTier(tierOption.series)}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all ${
                activeTier === tierOption.series
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tierNames[tierOption.series]}
            </button>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {tierPricing?.formattedPrice || formatPrice(pricing.minPrice)}
          </div>
          <div className="text-sm text-gray-500">
            {formatCurrency(tierPricing?.price || pricing.minPrice)} per year
          </div>
          <div className="text-sm text-green-600 font-medium">0% EMI available</div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
          <div className="space-y-2">
            {tierInfo?.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                {highlight}
              </div>
            )) ||
              course.highlights.slice(0, 3).map((highlight, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  {highlight}
                </div>
              ))}
            {(tierInfo?.highlights.length || course.highlights.length) > 3 && (
              <div className="text-sm text-blue-600">
                +{(tierInfo?.highlights.length || course.highlights.length) - 3} more features
              </div>
            )}
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm text-green-800 font-medium mb-2">💰 Best Value Guarantee</div>
          <div className="text-xs text-green-700">
            Starting ₹12K lower than competitors • Up to 25% scholarships
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex space-x-3">
            <Link
              href={`/courses/${course.id}`}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold text-center hover:bg-gray-300 transition-colors"
            >
              View Details
            </Link>
            <Link
              href={`/enrollments?course=${course.id}&tier=${activeTier}`}
              className={`flex-1 bg-gradient-to-r ${tierColors[activeTier]} text-white py-3 rounded-xl font-semibold text-center hover:opacity-90 transition-opacity`}
            >
              Enroll Now
            </Link>
          </div>
          <button
            onClick={() => setShowDemoModal(true)}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Book Free Demo Class
          </button>
        </div>

        {/* Learning Modes */}
        <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-500">
          {course.learningMode.map((mode, index) => (
            <span key={index} className="flex items-center">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-1"></span>
              {mode}
            </span>
          ))}
        </div>
      </div>

      {/* Demo Class Modal */}
      {showDemoModal && <DemoClassModal course={course} onClose={() => setShowDemoModal(false)} />}
    </div>
  )
}
