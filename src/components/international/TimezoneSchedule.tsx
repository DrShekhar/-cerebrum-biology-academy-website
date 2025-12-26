'use client'

import React, { useState, useEffect } from 'react'
import { TimezoneService, ClassSchedule, TimezoneInfo } from '@/lib/international/timezoneService'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'
import { Clock, Globe, Users, Calendar } from 'lucide-react'

interface TimezoneScheduleProps {
  onScheduleSelect?: (schedule: ClassSchedule) => void
  className?: string
}

export function TimezoneSchedule({ onScheduleSelect, className = '' }: TimezoneScheduleProps) {
  const { preferences, updatePreferences, trackBehavior } = usePersonalization()
  const [userTimezone, setUserTimezone] = useState<string>('Asia/Kolkata')
  const [timezoneInfo, setTimezoneInfo] = useState<TimezoneInfo | null>(null)
  const [recommendedSchedules, setRecommendedSchedules] = useState<ClassSchedule[]>([])
  const [selectedSchedule, setSelectedSchedule] = useState<ClassSchedule | null>(null)
  const [showTimezoneSelector, setShowTimezoneSelector] = useState(false)

  useEffect(() => {
    // Auto-detect user timezone
    const detectedTimezone = TimezoneService.getUserTimezone()
    setUserTimezone(detectedTimezone)

    // Update preferences with timezone
    updatePreferences({
      location: {
        ...preferences.location,
        timezone: detectedTimezone,
      },
    })
  }, [])

  useEffect(() => {
    if (userTimezone) {
      const tzInfo = TimezoneService.getTimezoneInfo(userTimezone)
      setTimezoneInfo(tzInfo)

      const schedules = TimezoneService.getRecommendedSchedules(userTimezone)
      setRecommendedSchedules(schedules)
    }
  }, [userTimezone])

  const handleTimezoneChange = (timezone: string) => {
    setUserTimezone(timezone)
    setShowTimezoneSelector(false)

    updatePreferences({
      location: {
        ...preferences.location,
        timezone,
      },
    })

    trackBehavior('timezone_changed', { timezone })
  }

  const handleScheduleSelect = (schedule: ClassSchedule) => {
    setSelectedSchedule(schedule)
    onScheduleSelect?.(schedule)

    trackBehavior('schedule_selected', {
      scheduleId: schedule.id,
      timezone: schedule.timezone,
      instructor: schedule.instructor,
    })
  }

  const getScheduleInUserTimezone = (schedule: ClassSchedule) => {
    if (schedule.timezone === userTimezone) return schedule
    return TimezoneService.convertScheduleToTimezone(schedule, userTimezone)
  }

  const getAvailabilityStatus = () => {
    if (!timezoneInfo) return null

    if (timezoneInfo.isBusinessHour) {
      return {
        status: 'available',
        message: 'Our support team is available now!',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
      }
    }

    return {
      status: 'unavailable',
      message: `Next available: ${timezoneInfo.nextBusinessHour}`,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    }
  }

  const studyTimeInfo = TimezoneService.isOptimalStudyTime(userTimezone)
  const availabilityStatus = getAvailabilityStatus()

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Timezone Info Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Timezone</h3>
              <p className="text-sm text-gray-600">Optimized schedules for your location</p>
            </div>
          </div>
          <button
            onClick={() => setShowTimezoneSelector(!showTimezoneSelector)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Change
          </button>
        </div>

        {timezoneInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">
                  {TimezoneService.getLocalTime(userTimezone)}
                </div>
                <div className="text-sm text-gray-500">Current Time</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">{timezoneInfo.offset}</div>
                <div className="text-sm text-gray-500">{timezoneInfo.country}</div>
              </div>
            </div>

            {availabilityStatus && (
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg ${availabilityStatus.bgColor} ${availabilityStatus.borderColor} border`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${availabilityStatus.status === 'available' ? 'bg-green-600' : 'bg-amber-500'}`}
                ></div>
                <div>
                  <div className={`font-medium ${availabilityStatus.color}`}>
                    {availabilityStatus.status === 'available' ? 'Available Now' : 'Offline'}
                  </div>
                  <div className="text-xs text-gray-600">{availabilityStatus.message}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Study Time Optimization */}
        {studyTimeInfo && (
          <div
            className={`mt-4 p-3 rounded-lg ${
              studyTimeInfo.isOptimal
                ? 'bg-green-50 border border-green-200'
                : 'bg-blue-50 border border-blue-200'
            }`}
          >
            <div
              className={`text-sm font-medium ${studyTimeInfo.isOptimal ? 'text-green-800' : 'text-blue-800'}`}
            >
              {studyTimeInfo.isOptimal ? '🎯 Optimal Study Time!' : '💡 Study Time Tip'}
            </div>
            <div
              className={`text-xs mt-1 ${studyTimeInfo.isOptimal ? 'text-green-700' : 'text-blue-700'}`}
            >
              {studyTimeInfo.reason}
              {studyTimeInfo.nextOptimalTime &&
                ` Next optimal time: ${studyTimeInfo.nextOptimalTime}`}
            </div>
          </div>
        )}
      </div>

      {/* Timezone Selector */}
      {showTimezoneSelector && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Your Timezone</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {TimezoneService.getTimezoneSelectOptions().map((option) => (
              <button
                key={option.value}
                onClick={() => handleTimezoneChange(option.value)}
                className={`text-left p-3 rounded-lg border transition-colors ${
                  option.value === userTimezone
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-gray-500">{option.region}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Class Schedules */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recommended Class Schedules</h3>
            <p className="text-sm text-gray-600">Classes optimized for your timezone</p>
          </div>
        </div>

        {recommendedSchedules.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No schedules available for your timezone</p>
            <p className="text-sm text-gray-400 mt-1">All classes are recorded for later viewing</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendedSchedules.map((schedule) => {
              const userTzSchedule = getScheduleInUserTimezone(schedule)
              const isSelected = selectedSchedule?.id === schedule.id

              return (
                <div
                  key={schedule.id}
                  className={`border rounded-xl p-5 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => handleScheduleSelect(schedule)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{schedule.name}</h4>
                      <p className="text-sm text-gray-600">{schedule.instructor}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {schedule.isRecording && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Recorded
                        </span>
                      )}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          schedule.level === 'foundation'
                            ? 'bg-green-100 text-green-800'
                            : schedule.level === 'intermediate'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {schedule.level}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {userTzSchedule.startTime} - {userTzSchedule.endTime}
                      </span>
                      {schedule.timezone !== userTimezone && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          Converted from {schedule.timezone.split('/')[1]}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{schedule.days.join(', ')}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        {schedule.enrolled}/{schedule.capacity} students
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(schedule.enrolled / schedule.capacity) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">
                        Language:{' '}
                        {schedule.language === 'mixed' ? 'Hindi + English' : schedule.language}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        schedule.enrolled < schedule.capacity ? 'text-green-600' : 'text-amber-600'
                      }`}
                    >
                      {schedule.enrolled < schedule.capacity
                        ? 'Seats Available'
                        : 'Waitlist Available'}
                    </span>

                    {isSelected && (
                      <span className="text-blue-600 text-sm font-medium">Selected ✓</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* All Classes Recorded Message */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Can't attend live?</strong> All classes are recorded and available within 2
            hours. Access your recordings anytime in the student portal.
          </p>
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Hours (Your Time)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(TimezoneService.getBusinessHours(userTimezone).days).map(
            ([day, hours]) => (
              <div key={day} className="text-center">
                <div className="font-medium text-gray-900 capitalize">{day.slice(0, 3)}</div>
                <div className={`text-sm ${hours.isOpen ? 'text-gray-600' : 'text-red-600'}`}>
                  {hours.isOpen ? `${hours.open} - ${hours.close}` : 'Closed'}
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          24/7 support available via WhatsApp: +91 88264 44334
        </div>
      </div>
    </div>
  )
}
