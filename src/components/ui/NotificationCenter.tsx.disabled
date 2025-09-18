'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy,
  Users,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
} from 'lucide-react'
import { getRandomSuccessStory } from '@/data/studentSuccessData'

interface NotificationItem {
  id: string
  type: 'success' | 'activity' | 'enrollment' | 'achievement'
  title: string
  message: string
  location?: string
  timestamp: string
  icon: React.ReactNode
  color: string
}

interface NotificationCenterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  autoPlay?: boolean
  interval?: number // seconds
  maxWidth?: string
}

export function NotificationCenter({
  position = 'top-right',
  autoPlay = true,
  interval = 8,
  maxWidth = '320px',
}: NotificationCenterProps) {
  const [currentNotification, setCurrentNotification] = useState<NotificationItem | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [notificationQueue] = useState<NotificationItem[]>([])

  // Generate notification data
  const generateNotifications = (): NotificationItem[] => {
    const notifications: NotificationItem[] = []

    // Success stories
    for (let i = 0; i < 5; i++) {
      const story = getRandomSuccessStory()
      notifications.push({
        id: `success-${i}`,
        type: 'success',
        title: 'NEET Success',
        message: story.message,
        location: story.student.location,
        timestamp: 'Just now',
        icon: <Trophy className="w-4 h-4" />,
        color: 'from-green-500 to-emerald-600',
      })
    }

    // Live activity
    const activities = [
      {
        title: 'Live Enrollment',
        message: 'Radha Tiwari from Machilipatnam requesting AIIMS Preparation Batch demo',
        location: 'Machilipatnam',
        icon: <Users className="w-4 h-4" />,
        color: 'from-blue-500 to-indigo-600',
      },
      {
        title: 'Active Viewers',
        message: '46 students currently viewing course materials',
        location: 'Online',
        icon: <TrendingUp className="w-4 h-4" />,
        color: 'from-purple-500 to-violet-600',
      },
      {
        title: 'Demo Bookings',
        message: '9 free demo classes booked in the last hour',
        location: 'All Centers',
        icon: <Calendar className="w-4 h-4" />,
        color: 'from-orange-500 to-amber-600',
      },
      {
        title: "Today's Enrollments",
        message: '28 new students joined NEET Biology courses today',
        location: 'Multiple Cities',
        icon: <BookOpen className="w-4 h-4" />,
        color: 'from-teal-500 to-cyan-600',
      },
    ]

    activities.forEach((activity, index) => {
      notifications.push({
        id: `activity-${index}`,
        type: 'activity',
        title: activity.title,
        message: activity.message,
        location: activity.location,
        timestamp: 'Live',
        icon: activity.icon,
        color: activity.color,
      })
    })

    return notifications
  }

  useEffect(() => {
    if (!autoPlay) return

    const notifications = generateNotifications()
    let currentIndex = 0

    // Show first notification after 2 seconds
    const startTimer = setTimeout(() => {
      setIsVisible(true)
      setCurrentNotification(notifications[0])
      currentIndex = 1
    }, 2000)

    // Cycle through notifications
    const cycleTimer = setInterval(() => {
      if (currentIndex >= notifications.length) {
        currentIndex = 0
      }
      setCurrentNotification(notifications[currentIndex])
      currentIndex++
    }, interval * 1000)

    return () => {
      clearTimeout(startTimer)
      clearInterval(cycleTimer)
    }
  }, [autoPlay, interval])

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-6 right-6'
      case 'top-left':
        return 'top-6 left-6'
      case 'bottom-right':
        return 'bottom-6 right-6'
      case 'bottom-left':
        return 'bottom-6 left-6'
      default:
        return 'top-6 right-6'
    }
  }

  if (!isVisible || !currentNotification) return null

  return (
    <div className={`fixed ${getPositionClasses()} z-40`} style={{ maxWidth }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNotification.id}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative"
        >
          {/* TV Screen Frame */}
          <div className="bg-gray-900 p-2 rounded-xl shadow-2xl border border-gray-700">
            {/* Screen Header */}
            <div className="flex items-center justify-between mb-2 px-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-400 font-mono">LIVE</div>
            </div>

            {/* Screen Content */}
            <div
              className={`bg-gradient-to-r ${currentNotification.color} p-4 rounded-lg text-white relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute -top-2 -right-2 w-16 h-16 border border-white/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-white/10 rounded-full"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {currentNotification.icon}
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {currentNotification.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{currentNotification.timestamp}</span>
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm font-medium leading-relaxed mb-2">
                  {currentNotification.message}
                </p>

                {/* Location & Brand */}
                <div className="flex items-center justify-between">
                  {currentNotification.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs opacity-90">{currentNotification.location}</span>
                    </div>
                  )}
                  <div className="text-xs font-semibold opacity-90">Cerebrum Student</div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 w-full">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: interval, ease: 'linear' }}
                  className="h-0.5 bg-white/30"
                />
              </div>
            </div>

            {/* Screen Reflection */}
            <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* TV Stand */}
          <div className="flex justify-center mt-1">
            <div className="w-8 h-2 bg-gray-800 rounded-b-lg"></div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Simplified hook for easy integration
export function useNotificationCenter() {
  const [isEnabled, setIsEnabled] = useState(true)

  const disable = () => setIsEnabled(false)
  const enable = () => setIsEnabled(true)

  return { isEnabled, disable, enable }
}
