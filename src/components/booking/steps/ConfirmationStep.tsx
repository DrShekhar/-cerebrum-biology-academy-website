'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle,
  Gift,
  Zap,
  Check,
  ArrowLeft,
} from 'lucide-react'

interface ConfirmationStepProps {
  bookingData: {
    studentName: string
    email: string
    phone: string
    courseInterest: string[]
  }
  formattedSelectedDate: string
  selectedTime: string
  onCourseInterestToggle: (course: string) => void
  onPrevStep: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

const COURSE_OPTIONS = [
  { id: 'neet-biology', label: 'Complete NEET Biology' },
  { id: 'class-11-biology', label: 'Class 11th Biology' },
  { id: 'class-12-biology', label: 'Class 12th Biology' },
  { id: 'crash-course', label: 'Crash Course' },
  { id: 'doubt-clearing', label: 'Doubt Clearing' },
  { id: 'test-series', label: 'Test Series' },
]

export function ConfirmationStep({
  bookingData,
  formattedSelectedDate,
  selectedTime,
  onCourseInterestToggle,
  onPrevStep,
  onSubmit,
  isSubmitting,
}: ConfirmationStepProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Your Demo Booking</h3>

      {/* Booking Summary */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-4">Booking Summary</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Student Name:</span>
            <span className="font-medium">{bookingData.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{bookingData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span className="font-medium">{bookingData.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">
              {formattedSelectedDate} at {selectedTime}
            </span>
          </div>
        </div>
      </div>

      {/* Course Interest Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <BookOpen className="w-4 h-4 inline mr-2" />
          What are you interested in? (Select 1-3)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COURSE_OPTIONS.map((course) => (
            <button
              key={course.id}
              type="button"
              onClick={() => onCourseInterestToggle(course.id)}
              disabled={
                !bookingData.courseInterest.includes(course.id) &&
                bookingData.courseInterest.length >= 3
              }
              className={`p-3 rounded-lg border-2 text-left transition-all min-h-[44px] touch-manipulation ${
                bookingData.courseInterest.includes(course.id)
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    bookingData.courseInterest.includes(course.id)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}
                >
                  {bookingData.courseInterest.includes(course.id) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className="font-medium text-sm">{course.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* What You'll Get */}
      <div className="bg-green-50 rounded-lg p-6">
        <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          What You&apos;ll Get in Your Free Demo
        </h4>
        <ul className="space-y-2 text-sm text-green-800">
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            45-minute personalized NEET Biology session
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Free study material and chapter notes
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            NEET strategy and preparation roadmap
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Personalized feedback and guidance
          </li>
        </ul>
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h5 className="font-medium text-yellow-900">Important Notes:</h5>
            <ul className="text-sm text-yellow-800 mt-1 space-y-1">
              <li>• Zoom link will be sent 30 minutes before the session</li>
              <li>• Please ensure stable internet connection</li>
              <li>• No payment required - this demo is completely free</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 left-0 right-0 z-20 bg-white border-t shadow-lg md:shadow-none md:static md:mt-8">
        <div className="flex justify-between items-center p-4 md:px-0 md:pt-6">
          <button
            onClick={onPrevStep}
            className="flex items-center gap-2 px-4 md:px-6 py-3.5 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 min-h-[44px] touch-manipulation font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Back</span>
          </button>

          <button
            onClick={onSubmit}
            disabled={isSubmitting || bookingData.courseInterest.length === 0}
            className="flex items-center gap-2 px-6 md:px-8 py-3.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] touch-manipulation shadow-lg shadow-green-600/20 hover:shadow-green-600/30 font-medium"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Booking...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Confirm Booking</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
