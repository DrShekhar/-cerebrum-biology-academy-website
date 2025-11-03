'use client'

import Link from 'next/link'
import { CourseProgram, CourseSeries } from '@/types/courseSystem'
import { PaymentOptionsDisplay } from './PaymentOptionsDisplay'
import { DemoClassModal } from './DemoClassModal'
import { useState } from 'react'

interface CourseCardProps {
  course: CourseProgram
  selectedTier?: CourseSeries
}

export function CourseCard({ course, selectedTier = 'ascent' }: CourseCardProps) {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [activeTier, setActiveTier] = useState<CourseSeries>(selectedTier)

  const tierDetails = course.tiers[activeTier]
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

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
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Course Header */}
      <div
        className={`bg-gradient-to-r ${tierColors[activeTier]} p-5 sm:p-6 text-white relative overflow-hidden`}
      >
        <div className="absolute top-2 right-2 text-xl sm:text-2xl opacity-20">
          {getClassEmoji(course.targetClass)}
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-white/20 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                Class {course.targetClass}
              </span>
              {course.isPopular && (
                <span className="bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                  POPULAR
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">{course.name}</h3>
            <p className="text-xs sm:text-sm opacity-90 line-clamp-2">{course.description}</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-bold">{course.duration}</div>
            <div className="text-xs opacity-75">Duration</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">{course.teachingHours}h</div>
            <div className="text-xs opacity-75">Per Week</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold">{tierDetails.batchSize}</div>
            <div className="text-xs opacity-75">Batch Size</div>
          </div>
        </div>
      </div>

      {/* Tier Selection */}
      <div className="p-5 sm:p-6">
        <div className="flex mb-6">
          {(Object.keys(course.tiers) as CourseSeries[]).map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-lg transition-all ${
                activeTier === tier
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tierNames[tier]}
            </button>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-5 sm:mb-6 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {formatCurrency(tierDetails.payment.oneTime.discountedAmount)}
          </div>
          <div className="text-xs sm:text-sm text-gray-500 line-through">
            {formatCurrency(tierDetails.payment.oneTime.amount)}
          </div>
          <div className="text-xs sm:text-sm text-green-600 font-medium">
            Save {formatCurrency(tierDetails.payment.oneTime.discount)} (5% off)
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-5 sm:mb-6">
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Key Features:</h4>
          <div className="space-y-2">
            {tierDetails.additionalBenefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-start text-xs sm:text-sm text-gray-700">
                <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
            {tierDetails.additionalBenefits.length > 3 && (
              <div className="text-xs sm:text-sm text-blue-600">
                +{tierDetails.additionalBenefits.length - 3} more features
              </div>
            )}
          </div>
        </div>

        {/* Payment Options Toggle */}
        <button
          onClick={() => setShowPaymentDetails(!showPaymentDetails)}
          className="w-full mb-4 py-2 sm:py-3 px-4 bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors min-h-[44px]"
        >
          {showPaymentDetails ? 'Hide Payment Options' : 'View Payment Options'}
        </button>

        {showPaymentDetails && (
          <div className="mb-6">
            <PaymentOptionsDisplay paymentOptions={tierDetails.payment} tier={activeTier} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/courses/${course.id}`}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold text-center hover:bg-gray-300 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
            >
              View Details
            </Link>
            <Link
              href={`/enrollments?course=${course.id}&tier=${activeTier}`}
              className={`flex-1 bg-gradient-to-r ${tierColors[activeTier]} text-white py-3 rounded-xl font-semibold text-center hover:opacity-90 transition-opacity text-sm sm:text-base min-h-[44px] flex items-center justify-center`}
            >
              Enroll Now
            </Link>
          </div>
          <button
            onClick={() => setShowDemoModal(true)}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base min-h-[44px]"
          >
            Book Free Demo Class
          </button>
        </div>

        {/* Learning Modes */}
        <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs text-gray-500">
          {course.learningMode.map((mode, index) => (
            <span key={index} className="flex items-center">
              <span className="w-2 h-2 bg-gray-300 rounded-full mr-1 flex-shrink-0"></span>
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
