'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  TrendingUp,
  Clock,
  BookOpen,
  MapPin,
  Zap,
  UserPlus,
  CheckCircle2,
} from 'lucide-react'
import { getRandomSuccessStory, successStats } from '@/data/studentSuccessData'
import { usePopupCoordinator } from '@/lib/ui/popupCoordinator'

interface EnrollmentNotification {
  id: string
  type: 'enrollment' | 'demo_booking' | 'course_start' | 'batch_filling' | 'limited_seats'
  message: string
  studentName?: string
  location?: string
  course: string
  timestamp: Date
  urgency: 'low' | 'medium' | 'high'
  seatsLeft?: number
  batchCapacity?: number
}

// Course enrollment data
const courseData = [
  {
    name: 'NEET 2026 Biology Mastery',
    capacity: 150,
    enrolled: 127,
    type: 'comprehensive',
  },
  {
    name: 'Class 12 Board + NEET',
    capacity: 200,
    enrolled: 156,
    type: 'dual_prep',
  },
  {
    name: 'NEET Dropper Intensive',
    capacity: 100,
    enrolled: 84,
    type: 'intensive',
  },
  {
    name: 'Class 11 Foundation',
    capacity: 180,
    enrolled: 142,
    type: 'foundation',
  },
  {
    name: 'AIIMS Preparation Batch',
    capacity: 80,
    enrolled: 67,
    type: 'premium',
  },
]

const enrollmentTemplates = {
  enrollment: [
    '{name} from {location} just enrolled in {course}',
    'New enrollment: {name} ({location}) joined {course}',
    '{name} from {location} secured their seat in {course}',
    'Welcome {name} from {location} to {course}!',
  ],
  demo_booking: [
    '{name} from {location} booked a demo for {course}',
    'Demo scheduled: {name} ({location}) - {course}',
    '{name} from {location} requesting {course} demo',
    'Live demo booked by {name} from {location}',
  ],
  course_start: [
    '{course} batch starting in 2 days - {enrolled}/{capacity} enrolled',
    'Alert: {course} begins soon - Only {seatsLeft} seats remaining',
    '{course} new batch starting - Join {enrolled}+ students',
  ],
  batch_filling: [
    '🔥 {course} filling fast - Only {seatsLeft} seats left!',
    '⚡ {seatsLeft} seats remaining in {course}',
    'Hurry! {course} - {seatsLeft}/{capacity} seats available',
    'Limited seats: {course} has {seatsLeft} spots left',
  ],
  limited_seats: [
    '⚠️ Last {seatsLeft} seats in {course}',
    'Final call: {seatsLeft} seats left in {course}',
    'Almost full: {course} - Only {seatsLeft} seats remaining!',
  ],
}

interface LiveEnrollmentNotificationsProps {
  showDuration?: number // Duration in minutes
  notificationInterval?: number // Interval in seconds
  maxVisible?: number
  useCoordination?: boolean // Enable popup coordination
}

export function LiveEnrollmentNotifications({
  showDuration = 8, // Show for 8 minutes
  notificationInterval = 12, // New notification every 12 seconds
  maxVisible = 5,
  useCoordination = false, // Popup coordination disabled by default
}: LiveEnrollmentNotificationsProps) {
  const [notifications, setNotifications] = useState<EnrollmentNotification[]>([])
  const [isActive, setIsActive] = useState(false)
  const [coordinationActive, setCoordinationActive] = useState(false)
  const popupCoordinator = usePopupCoordinator()
  const [enrollmentStats, setEnrollmentStats] = useState({
    todayEnrollments: 23,
    activeViewers: 47,
    lastHourBookings: 8,
  })

  // Coordination effect
  useEffect(() => {
    if (!useCoordination) {
      setCoordinationActive(true)
      return
    }

    // Check coordination after other popups have had chance to show
    const coordinationTimer = setTimeout(() => {
      if (popupCoordinator.canShowPopup('live_enrollment')) {
        if (popupCoordinator.showPopup('live_enrollment')) {
          setCoordinationActive(true)
        }
      }
    }, 5000) // 5 second delay to avoid conflicts

    return () => clearTimeout(coordinationTimer)
  }, [useCoordination, popupCoordinator])

  useEffect(() => {
    if (!coordinationActive) return

    // Start notifications after 3 seconds
    const startTimer = setTimeout(() => {
      setIsActive(true)
      generateInitialNotification()
    }, 3000)

    // Stop after specified duration
    const stopTimer = setTimeout(
      () => {
        setIsActive(false)
        setNotifications([])
      },
      showDuration * 60 * 1000
    )

    return () => {
      clearTimeout(startTimer)
      clearTimeout(stopTimer)
    }
  }, [showDuration])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      generateNotification()
      updateStats()
    }, notificationInterval * 1000)

    return () => clearInterval(interval)
  }, [isActive, notificationInterval])

  const generateNotification = () => {
    const types: Array<
      'enrollment' | 'demo_booking' | 'course_start' | 'batch_filling' | 'limited_seats'
    > = ['enrollment', 'demo_booking', 'course_start', 'batch_filling', 'limited_seats']

    const type = types[Math.floor(Math.random() * types.length)]
    const course = courseData[Math.floor(Math.random() * courseData.length)]
    const successStory = getRandomSuccessStory()

    let message = ''
    let urgency: 'low' | 'medium' | 'high' = 'low'
    const seatsLeft = course.capacity - course.enrolled

    // Adjust for realistic urgency
    if (seatsLeft < 10) urgency = 'high'
    else if (seatsLeft < 25) urgency = 'medium'

    const templates = enrollmentTemplates[type]
    const template = templates[Math.floor(Math.random() * templates.length)]

    switch (type) {
      case 'enrollment':
      case 'demo_booking':
        message = template
          .replace('{name}', successStory.student.name)
          .replace('{location}', successStory.student.location)
          .replace('{course}', course.name)
        break
      case 'course_start':
      case 'batch_filling':
      case 'limited_seats':
        message = template
          .replace('{course}', course.name)
          .replace('{enrolled}', course.enrolled.toString())
          .replace('{capacity}', course.capacity.toString())
          .replace('{seatsLeft}', seatsLeft.toString())
        break
    }

    const notification: EnrollmentNotification = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      studentName: ['enrollment', 'demo_booking'].includes(type)
        ? successStory.student.name
        : undefined,
      location: ['enrollment', 'demo_booking'].includes(type)
        ? successStory.student.location
        : undefined,
      course: course.name,
      timestamp: new Date(),
      urgency,
      seatsLeft: ['course_start', 'batch_filling', 'limited_seats'].includes(type)
        ? seatsLeft
        : undefined,
      batchCapacity: course.capacity,
    }

    setNotifications((prev) => {
      const updated = [notification, ...prev].slice(0, maxVisible)
      return updated
    })

    // Auto-remove after 15 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
    }, 15000)
  }

  const generateInitialNotification = () => {
    // Generate first notification immediately
    generateNotification()
  }

  const updateStats = () => {
    setEnrollmentStats((prev) => ({
      todayEnrollments: prev.todayEnrollments + Math.floor(Math.random() * 2),
      activeViewers: Math.max(30, prev.activeViewers + Math.floor(Math.random() * 10) - 5),
      lastHourBookings: prev.lastHourBookings + (Math.random() > 0.7 ? 1 : 0),
    }))
  }

  const getNotificationStyle = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-gradient-to-r bg-red-50 border-l-red-500 shadow-red-100'
      case 'medium':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-l-yellow-500 shadow-yellow-100'
      default:
        return 'bg-gray-50 border-l-blue-500 shadow-blue-100'
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <UserPlus className="w-4 h-4 text-green-600" />
      case 'demo_booking':
        return <BookOpen className="w-4 h-4 text-blue-600" />
      case 'course_start':
        return <Clock className="w-4 h-4 text-orange-600" />
      case 'batch_filling':
      case 'limited_seats':
        return <Zap className="w-4 h-4 text-red-600" />
      default:
        return <Users className="w-4 h-4 text-gray-600" />
    }
  }

  if (!isActive) return null

  return (
    <div className="fixed top-24 left-4 z-40 space-y-3 max-w-xs">
      {/* Live Activity Counter */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-lg shadow-lg"
      >
        <div className="flex items-center mb-2">
          <TrendingUp className="w-4 h-4 mr-2" />
          <span className="font-semibold text-sm">Live Activity</span>
        </div>
        <div className="grid grid-cols-1 gap-1 text-xs">
          <div className="flex justify-between">
            <span>Today's Enrollments:</span>
            <span className="font-bold">{enrollmentStats.todayEnrollments}</span>
          </div>
          <div className="flex justify-between">
            <span>Active Viewers:</span>
            <span className="font-bold">{enrollmentStats.activeViewers}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Hour Demos:</span>
            <span className="font-bold">{enrollmentStats.lastHourBookings}</span>
          </div>
        </div>
      </motion.div>

      {/* Enrollment Notifications */}
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: { delay: index * 0.1 },
            }}
            exit={{
              opacity: 0,
              x: -100,
              scale: 0.8,
              transition: { duration: 0.3 },
            }}
            className={`bg-white rounded-lg shadow-lg border-l-4 p-3 ${getNotificationStyle(notification.urgency)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-relaxed">
                  {notification.message}
                </p>

                {notification.seatsLeft && notification.urgency === 'high' && (
                  <div className="mt-1 flex items-center text-xs text-red-600 font-medium">
                    <Zap className="w-3 h-3 mr-1" />
                    <span>Urgent: Only {notification.seatsLeft} left!</span>
                  </div>
                )}

                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Just now</span>
                  <span className="mx-2">•</span>
                  <span className="text-purple-600 font-medium">Cerebrum</span>
                </div>
              </div>
            </div>

            {/* Urgency pulse for high priority */}
            {notification.urgency === 'high' && (
              <div className="absolute inset-0 rounded-lg bg-red-200 opacity-20 animate-pulse pointer-events-none" />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Call to Action for High Urgency */}
      {notifications.some((n) => n.urgency === 'high') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-600 text-white p-3 rounded-lg shadow-lg text-center"
        >
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-4 h-4 mr-1" />
            <span className="font-bold text-sm">Limited Seats Alert!</span>
          </div>
          <p className="text-xs opacity-90 mb-2">Multiple batches filling fast</p>
          <button className="bg-white text-red-600 px-3 py-1 rounded-full text-xs font-semibold hover:bg-gray-100 transition-colors">
            Secure Your Seat Now
          </button>
        </motion.div>
      )}
    </div>
  )
}

// Hook for tracking enrollment interactions
export function useEnrollmentTracking() {
  const trackEnrollmentView = (course: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'enrollment_notification_viewed', {
        event_category: 'engagement',
        event_label: course,
        value: 1,
      })
    }
  }

  const trackUrgencyClick = (course: string, seatsLeft: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'urgency_cta_clicked', {
        event_category: 'conversion',
        event_label: `${course}_${seatsLeft}_seats`,
        value: 1,
      })
    }
  }

  return { trackEnrollmentView, trackUrgencyClick }
}
