'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, UserCheck, BookOpen, Trophy, TrendingUp, Users, Play } from 'lucide-react'

interface Activity {
  id: string
  type: 'enrollment' | 'demo' | 'success' | 'online'
  message: string
  location: string
  time: string
  icon: any
  color: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'enrollment',
    message: 'Rajesh K. from Delhi enrolled in NEET Dropper Program',
    location: 'Rohini Center',
    time: '2 minutes ago',
    icon: UserCheck,
    color: 'bg-green-600',
  },
  {
    id: '2',
    type: 'demo',
    message: 'Priya S. booked a free demo class',
    location: 'Online',
    time: '5 minutes ago',
    icon: Play,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: '3',
    type: 'success',
    message: 'Karan M. scored 675/720 in NEET mock test',
    location: 'Gurugram Center',
    time: '12 minutes ago',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: '4',
    type: 'enrollment',
    message: 'Ananya G. enrolled in Class 12th NEET',
    location: 'South Delhi',
    time: '18 minutes ago',
    icon: BookOpen,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: '5',
    type: 'online',
    message: '127 students currently studying online',
    location: 'Live Sessions',
    time: 'now',
    icon: Users,
    color: 'bg-green-600',
  },
  {
    id: '6',
    type: 'demo',
    message: 'Sahil P. watched Biology concept video',
    location: 'Online',
    time: '22 minutes ago',
    icon: Play,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: '7',
    type: 'enrollment',
    message: 'Neha R. from Noida enrolled in Foundation Course',
    location: 'Rohini Center',
    time: '28 minutes ago',
    icon: UserCheck,
    color: 'bg-green-600',
  },
  {
    id: '8',
    type: 'success',
    message: 'Aditya V. completed 50 practice questions',
    location: 'Gurugram Center',
    time: '32 minutes ago',
    icon: TrendingUp,
    color: 'from-yellow-500 to-amber-500',
  },
]

interface LiveActivityFeedProps {
  variant?: 'floating' | 'inline' | 'sidebar'
  autoRotate?: boolean
  rotationInterval?: number
  showCloseButton?: boolean
  className?: string
}

export function LiveActivityFeed({
  variant = 'floating',
  autoRotate = true,
  rotationInterval = 5000,
  showCloseButton = true,
  className = '',
}: LiveActivityFeedProps) {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(true)

  // Track tab visibility to pause interval when tab is hidden (saves CPU)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Memoized rotation handler
  const rotateActivity = useCallback(() => {
    setCurrentActivityIndex((prev) => (prev + 1) % activities.length)
  }, [])

  // Auto-rotate interval - pauses when tab hidden or user hovering
  useEffect(() => {
    if (!autoRotate || isPaused || !isTabVisible) return

    const interval = setInterval(rotateActivity, rotationInterval)

    return () => clearInterval(interval)
  }, [autoRotate, isPaused, isTabVisible, rotationInterval, rotateActivity])

  if (!isVisible) return null

  const currentActivity = activities[currentActivityIndex]

  if (variant === 'floating') {
    return (
{isVisible && (
          <div
            className={`fixed bottom-6 left-6 z-40 ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm backdrop-blur-lg">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${currentActivity.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}
                >
                  <currentActivity.icon className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-snug">
                    {currentActivity.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{currentActivity.location}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{currentActivity.time}</span>
                  </div>
                </div>

                {showCloseButton && (
                  <button
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center justify-center space-x-1 mt-3">
                {activities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentActivityIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentActivityIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Live Pulse Indicator */}
              <div className="flex items-center justify-center mt-2">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-600 rounded-full animate-ping opacity-75" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Live Activity</span>
                </div>
              </div>
            </div>
          </div>
        )}
)
  }

  if (variant === 'sidebar') {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <div className="relative mr-2">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 bg-green-600 rounded-full animate-ping opacity-75" />
            </div>
            Live Activity
          </h3>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.slice(0, 6).map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors animate-fadeInUp"
            >
              <div
                className={`w-8 h-8 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <activity.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 leading-snug">{activity.message}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{activity.location}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Inline variant
  return (
    <div className={`bg-gray-50 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 bg-green-600 rounded-full animate-ping opacity-75" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Live Student Activity</h3>
        </div>
        <div className="text-sm text-gray-600">{activities.length}+ recent activities</div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {activities.slice(0, 4).map((activity, index) => (
          <div
            key={activity.id}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow animate-fadeInUp"
          >
            <div className="flex items-start space-x-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-md`}
              >
                <activity.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 leading-snug mb-1">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{activity.location}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="text-center bg-white rounded-xl p-3 shadow-sm">
          <div className="text-xl sm:text-2xl font-bold text-green-600">127</div>
          <div className="text-xs text-gray-600">Students Online</div>
        </div>
        <div className="text-center bg-white rounded-xl p-3 shadow-sm">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">23</div>
          <div className="text-xs text-gray-600">Demo Bookings Today</div>
        </div>
        <div className="text-center bg-white rounded-xl p-3 shadow-sm">
          <div className="text-xl sm:text-2xl font-bold text-purple-600">8</div>
          <div className="text-xs text-gray-600">New Enrollments</div>
        </div>
      </div>
    </div>
  )
}
