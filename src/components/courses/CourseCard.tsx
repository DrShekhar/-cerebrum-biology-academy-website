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

  // Premium black-gold theme for all course cards
  const tierColors = {
    pinnacle: 'from-black via-gray-900 to-black',
    ascent: 'from-black via-gray-900 to-black',
    pursuit: 'from-black via-gray-900 to-black',
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
              <span className="bg-gray-800/80 border border-yellow-400/30 px-3 py-1 rounded-full text-sm font-semibold text-white">
                Class {course.targetClass}
              </span>
              {course.isPopular && (
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-black border-2 border-yellow-300 shadow-lg">
                  POPULAR
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2">{course.name}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{course.description}</p>
          </div>
        </div>

        {/* Course Stats - Premium design */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/50 border border-yellow-400/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-400">{course.duration}</div>
            <div className="text-xs text-gray-300">Duration</div>
          </div>
          <div className="bg-gray-800/50 border border-yellow-400/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-400">{course.teachingHours}h</div>
            <div className="text-xs text-gray-300">Per Week</div>
          </div>
          <div className="bg-gray-800/50 border border-yellow-400/30 rounded-lg p-3">
            <div className="text-2xl font-bold text-yellow-400">{tierInfo?.batchSize || 25}</div>
            <div className="text-xs text-gray-300">Batch Size</div>
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
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
              }`}
            >
              {tierNames[tierOption.series]}
            </button>
          ))}
        </div>

        {/* Pricing - Premium gold design */}
        <div className="mb-6 text-center bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-black p-4 rounded-xl shadow-lg">
          <div className="text-3xl font-black mb-1">
            {tierPricing?.formattedPrice || formatPrice(pricing.minPrice)}
          </div>
          <div className="text-sm font-semibold">
            {formatCurrency(tierPricing?.price || pricing.minPrice)} per year
          </div>
          <div className="text-sm font-bold">0% EMI available</div>
        </div>

        {/* Key Features - Premium theme */}
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">Key Features:</h4>
          <div className="space-y-2">
            {tierInfo?.highlights.slice(0, 3).map((highlight, index) => (
              <div key={index} className="flex items-center text-sm text-gray-200">
                <span className="text-yellow-400 mr-2 font-bold">✓</span>
                {highlight}
              </div>
            )) ||
              course.learningOutcomes.slice(0, 3).map((highlight: string, index: number) => (
                <div key={index} className="flex items-center text-sm text-gray-200">
                  <span className="text-yellow-400 mr-2 font-bold">✓</span>
                  {highlight}
                </div>
              ))}
            {(tierInfo?.highlights.length || course.learningOutcomes.length) > 3 && (
              <div className="text-sm text-yellow-400 font-medium">
                +{(tierInfo?.highlights.length || course.learningOutcomes.length) - 3} more features
              </div>
            )}
          </div>
        </div>

        {/* Competitive Advantage - Premium theme */}
        <div className="mb-6 bg-gray-800/60 border border-yellow-400/40 rounded-lg p-4">
          <div className="text-sm text-yellow-400 font-bold mb-2">💰 Best Value Guarantee</div>
          <div className="text-xs text-gray-200">
            Starting ₹12K lower than competitors • Up to 25% scholarships
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex space-x-3">
            <Link
              href={`/courses/${course.id}`}
              className="flex-1 bg-gray-700 border border-gray-600 text-gray-200 py-3 rounded-xl font-semibold text-center hover:bg-gray-600 transition-colors"
            >
              View Details
            </Link>
            <Link
              href={`/enrollments?course=${course.id}&tier=${activeTier}`}
              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-xl font-bold text-center hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg"
            >
              Enroll Now
            </Link>
          </div>
          <button
            onClick={() => setShowDemoModal(true)}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg border-2 border-yellow-300"
          >
            Book Free Demo Class
          </button>
        </div>

        {/* Learning Modes - Premium theme */}
        <div className="mt-4 flex justify-center space-x-4 text-xs text-gray-300">
          {course.learningMode.map((mode, index) => (
            <span key={index} className="flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>
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
