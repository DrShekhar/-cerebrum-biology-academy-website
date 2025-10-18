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

  // Clean, professional theme like Ministry of Education card
  const tierColors = {
    pinnacle: 'from-navy-50 to-navy-100',
    ascent: 'from-teal-50 to-teal-100',
    pursuit: 'from-gold-50 to-gold-100',
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
      {/* Course Header - Clean Ministry style */}
      <div className="p-5 text-center">
        {/* Course Icon - like Ministry badge */}
        <div
          className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${tierColors[activeTier]} rounded-full flex items-center justify-center`}
        >
          <div className="text-2xl">{getClassEmoji(course.targetClass)}</div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              Class {course.targetClass}
            </span>
            {course.isPopular && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                ⭐ Popular
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{course.description}</p>
        </div>

        {/* Course Stats - Clean Ministry style */}
        <div className="grid grid-cols-3 gap-3 text-center mb-5">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-gray-900">{course.duration}</div>
            <div className="text-sm text-gray-700">Duration</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-gray-900">{course.teachingHours}h</div>
            <div className="text-sm text-gray-700">Per Week</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-lg font-bold text-gray-900">{tierInfo?.batchSize || 25}</div>
            <div className="text-sm text-gray-700">Batch Size</div>
          </div>
        </div>

        {/* Verification Badge - like Ministry card */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-1 text-green-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-green-700">NEET Focused</span>
          </div>
        </div>
      </div>

      {/* Tier Selection */}
      <div className="p-4 sm:p-5">
        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
          {pricing.tiers.map((tierOption) => (
            <button
              key={tierOption.series}
              onClick={() => setActiveTier(tierOption.series)}
              className={`flex-1 py-1.5 px-2 text-sm font-medium rounded-md transition-all ${
                activeTier === tierOption.series
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tierNames[tierOption.series]}
            </button>
          ))}
        </div>

        {/* Pricing - Clean Ministry style */}
        <div className="mb-5 text-center bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {tierPricing?.formattedPrice || formatPrice(pricing.minPrice)}
          </div>
          <div className="text-gray-700 text-sm mb-1">
            {formatCurrency(tierPricing?.price || pricing.minPrice)} per year
          </div>
          <div className="text-xs text-blue-600 font-medium">0% EMI available</div>
        </div>

        {/* Key Features - Clean style */}
        <div className="mb-3">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Features:</h4>
          <div className="space-y-1">
            {tierInfo?.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700">
                <span className="text-green-600 mr-1 font-bold">✓</span>
                {highlight}
              </div>
            )) ||
              course.learningOutcomes.slice(0, 3).map((highlight: string, index: number) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <span className="text-green-600 mr-1 font-bold">✓</span>
                  {highlight}
                </div>
              ))}
            {(tierInfo?.highlights.length || course.learningOutcomes.length) > 3 && (
              <div className="text-xs text-blue-600 font-medium">
                +{(tierInfo?.highlights.length || course.learningOutcomes.length) - 3} more features
              </div>
            )}
          </div>
        </div>

        {/* Competitive Advantage - Clean style */}
        <div className="mb-2 bg-blue-50 border border-blue-200 rounded-lg p-1.5">
          <div className="text-xs text-blue-700 font-semibold mb-0.5">💰 Best Value Guarantee</div>
          <div className="text-sm text-blue-700">
            Starting ₹12K lower than competitors • Up to 25% scholarships
          </div>
        </div>

        {/* Action Buttons - Clean Ministry style */}
        <div className="space-y-1.5">
          <div className="flex space-x-1.5">
            <Link
              href={`/courses/${course.id}`}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 sm:py-2.5 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors text-sm"
            >
              View Details
            </Link>
            <Link
              href={`/enrollments?course=${course.id}&tier=${activeTier}`}
              className="flex-1 bg-blue-600 text-white py-2 sm:py-2.5 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors text-sm"
            >
              Enroll Now
            </Link>
          </div>
          <button
            onClick={() => setShowDemoModal(true)}
            className="w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
          >
            Book Free Demo Class
          </button>
        </div>

        {/* Learning Modes - Clean style */}
        <div className="mt-3 flex justify-center space-x-3 text-sm text-gray-600">
          {course.learningMode.map((mode, index) => (
            <span key={index} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1"></span>
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
