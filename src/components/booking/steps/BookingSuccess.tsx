'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import {
  Calendar,
  Clock,
  Video,
  CheckCircle,
  MessageSquare,
  BookOpen,
  Target,
  Award,
} from 'lucide-react'
import { CalendarActions } from '../CalendarActions'
import { ReferralShare } from '../ReferralShare'

interface BookingData {
  studentName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  zoomMeetingId?: string
  zoomJoinUrl?: string
  zoomPassword?: string
}

interface BookingSuccessProps {
  bookingData: BookingData
  selectedDate: Date | undefined
  selectedTime: string
  selectedDemoType: 'FREE' | 'PREMIUM'
  bookingId: string
}

export function BookingSuccess({
  bookingData,
  selectedDate,
  selectedTime,
  selectedDemoType,
  bookingId,
}: BookingSuccessProps) {
  const formattedSelectedDate = selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Booked Successfully! 🎉</h2>

        <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="font-semibold text-blue-900 mb-3">Your Demo Details:</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{formattedSelectedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{selectedTime}</span>
            </div>

            {/* Zoom Meeting Details - Enhanced Display */}
            {bookingData.zoomJoinUrl ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">Zoom Meeting Ready!</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Join Link:</span>
                    <a
                      href={bookingData.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline truncate max-w-[200px]"
                    >
                      {bookingData.zoomJoinUrl}
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(bookingData.zoomJoinUrl || '')
                        alert('Link copied to clipboard!')
                      }}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  {bookingData.zoomMeetingId && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Meeting ID:</span>
                      <span className="font-mono">{bookingData.zoomMeetingId}</span>
                    </div>
                  )}
                  {bookingData.zoomPassword && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Password:</span>
                      <span className="font-mono font-semibold">{bookingData.zoomPassword}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-600">
                <Video className="w-4 h-4" />
                <span>Zoom link will be sent 30 minutes before class</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>WhatsApp confirmation sent to {bookingData.phone}</span>
            </div>
          </div>
        </div>

        {/* Calendar Actions */}
        <div className="mb-6">
          <CalendarActions
            bookingData={{
              studentName: bookingData.studentName,
              email: bookingData.email,
              phone: bookingData.phone,
              preferredDate: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
              preferredTime: selectedTime,
              zoomJoinUrl: bookingData.zoomJoinUrl || '',
              zoomPassword: bookingData.zoomPassword || '',
              demoType: selectedDemoType,
            }}
          />
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 text-left border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Your Next Steps:
          </h4>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                1
              </span>
              <span>Check WhatsApp for confirmation and Zoom details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                2
              </span>
              <span>Add the session to your calendar using the button above</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                3
              </span>
              <span>Prepare your doubts and questions for the session</span>
            </li>
          </ol>
        </div>

        {/* Share & Get Free Materials */}
        <div className="mb-6">
          <ReferralShare userName={bookingData.studentName} userEmail={bookingData.email} />
        </div>

        {/* Explore More */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/practice"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Start Practice Tests
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all"
          >
            <Award className="w-4 h-4" />
            View Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
