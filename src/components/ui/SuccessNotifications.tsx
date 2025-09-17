'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X, Trophy, Star, MapPin, Calendar, TrendingUp } from 'lucide-react'
import { getRandomSuccessStory, successStats } from '@/data/studentSuccessData'
import { usePopupCoordinator } from '@/lib/ui/popupCoordinator'

interface SuccessNotification {
  id: string
  message: string
  timestamp: Date
  student: {
    name: string
    location: string
    college: string
    score?: number
    rank?: number
    course: string
  }
  type: 'success' | 'admission' | 'score' | 'rank'
}

interface SuccessNotificationsProps {
  maxNotifications?: number
  displayDuration?: number // Duration in minutes to show notifications
  notificationInterval?: number // Interval between notifications in seconds
  useCoordination?: boolean // Enable popup coordination
}

export function SuccessNotifications({
  maxNotifications = 10,
  displayDuration = 5, // Show for 5 minutes after page load
  notificationInterval = 8, // New notification every 8 seconds
  useCoordination = false, // Popup coordination disabled by default
}: SuccessNotificationsProps) {
  const [notifications, setNotifications] = useState<SuccessNotification[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const popupCoordinator = usePopupCoordinator()
  const [coordinationActive, setCoordinationActive] = useState(false)

  // Coordination effect
  useEffect(() => {
    if (!useCoordination) {
      setCoordinationActive(true)
      return
    }

    // Check if we can show notifications through coordinator
    const checkCoordination = () => {
      if (popupCoordinator.canShowPopup('success_notifications')) {
        if (popupCoordinator.showPopup('success_notifications')) {
          setCoordinationActive(true)
        }
      }
    }

    // Delay coordination check to avoid immediate conflicts
    const coordinationTimer = setTimeout(checkCoordination, 3000)
    return () => clearTimeout(coordinationTimer)
  }, [useCoordination, popupCoordinator])

  useEffect(() => {
    if (!coordinationActive) return

    // Only show notifications during initial page load and for limited time
    const startDelay = setTimeout(() => {
      setIsVisible(true)
      setHasStarted(true)
    }, 2000) // Start 2 seconds after page load

    // Hide notifications after specified duration
    const hideTimer = setTimeout(
      () => {
        setIsVisible(false)
        // Clear all notifications after fade out
        setTimeout(() => setNotifications([]), 1000)
      },
      displayDuration * 60 * 1000
    ) // Convert minutes to milliseconds

    return () => {
      clearTimeout(startDelay)
      clearTimeout(hideTimer)
      if (useCoordination) {
        popupCoordinator.hidePopup('success_notifications')
      }
    }
  }, [displayDuration, coordinationActive, useCoordination, popupCoordinator])

  useEffect(() => {
    if (!hasStarted || !isVisible || !coordinationActive) return

    // Generate initial notification immediately
    addNewNotification()

    // Set up interval for new notifications
    const interval = setInterval(() => {
      if (notifications.length < maxNotifications) {
        addNewNotification()
      }
    }, notificationInterval * 1000)

    return () => clearInterval(interval)
  }, [hasStarted, isVisible, notifications.length, maxNotifications, notificationInterval])

  const addNewNotification = () => {
    const successStory = getRandomSuccessStory()
    const types: Array<'success' | 'admission' | 'score' | 'rank'> = [
      'success',
      'admission',
      'score',
      'rank',
    ]

    const newNotification: SuccessNotification = {
      id: Math.random().toString(36).substr(2, 9),
      message: successStory.message,
      timestamp: successStory.timestamp,
      student: successStory.student,
      type: types[Math.floor(Math.random() * types.length)],
    }

    setNotifications((prev) => {
      const updated = [newNotification, ...prev].slice(0, maxNotifications)
      return updated
    })

    // Auto-remove notification after 12 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
    }, 12000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rank':
        return <Trophy className="w-5 h-5 text-yellow-600" />
      case 'score':
        return <Star className="w-5 h-5 text-purple-600" />
      case 'admission':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <CheckCircle className="w-5 h-5 text-blue-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'rank':
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
      case 'score':
        return 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200'
      case 'admission':
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
      default:
        return 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
    }
  }

  if (!isVisible || notifications.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {/* Live Stats Counter */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-lg shadow-lg"
      >
        <div className="flex items-center mb-2">
          <TrendingUp className="w-5 h-5 mr-2" />
          <span className="font-semibold text-sm">Live Success Updates</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="font-bold text-lg">{successStats.totalSelections.toLocaleString()}</div>
            <div className="opacity-90">Total Selections</div>
          </div>
          <div>
            <div className="font-bold text-lg">{successStats.successRate}%</div>
            <div className="opacity-90">Success Rate</div>
          </div>
        </div>
      </motion.div>

      {/* Success Notifications */}
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: { delay: index * 0.1 },
            }}
            exit={{
              opacity: 0,
              x: 100,
              scale: 0.8,
              transition: { duration: 0.3 },
            }}
            className={`relative bg-white rounded-lg shadow-lg border-l-4 p-4 ${getNotificationColor(notification.type)}`}
            style={{ maxWidth: '320px' }}
          >
            {/* Close Button */}
            <button
              onClick={() => removeNotification(notification.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Notification Content */}
            <div className="pr-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-relaxed">
                    {notification.message}
                  </p>

                  {/* Additional Details */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{notification.student.location}</span>
                      {notification.student.score && (
                        <>
                          <span className="mx-2">•</span>
                          <Star className="w-3 h-3 mr-1" />
                          <span>Score: {notification.student.score}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Just now</span>
                      <span className="mx-2">•</span>
                      <span className="text-green-600 font-medium">Cerebrum Student</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pulse animation for new notifications */}
            <div
              className="absolute inset-0 rounded-lg bg-blue-200 opacity-20 animate-pulse pointer-events-none"
              style={{ animation: 'pulse 2s ease-in-out' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Cerebrum Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <p className="text-xs text-gray-500">
          Powered by <span className="font-semibold text-purple-600">Cerebrum Biology Academy</span>
        </p>
      </motion.div>
    </div>
  )
}

// Hook for managing success notifications state
export function useSuccessNotifications() {
  const [isActive, setIsActive] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    // Track when notifications are shown
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'success_notifications_viewed', {
        event_category: 'engagement',
        event_label: 'real_time_success_feed',
        value: 1,
      })
    }
  }, [])

  const startNotifications = () => {
    setIsActive(true)
  }

  const stopNotifications = () => {
    setIsActive(false)
  }

  const incrementCount = () => {
    setNotificationCount((prev) => prev + 1)
  }

  return {
    isActive,
    notificationCount,
    startNotifications,
    stopNotifications,
    incrementCount,
  }
}

// Mini success ticker for mobile devices
interface SuccessTickerProps {
  useCoordination?: boolean
}

export function SuccessTicker({ useCoordination = false }: SuccessTickerProps) {
  const [currentStory, setCurrentStory] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [coordinationActive, setCoordinationActive] = useState(false)
  const popupCoordinator = usePopupCoordinator()

  // Coordination effect
  useEffect(() => {
    if (!useCoordination) {
      setCoordinationActive(true)
      return
    }

    // Mobile ticker gets priority on mobile
    const isMobile = window.innerWidth <= 768
    if (isMobile && popupCoordinator.canShowPopup('mobile_ticker')) {
      if (popupCoordinator.showPopup('mobile_ticker')) {
        setCoordinationActive(true)
      }
    }
  }, [useCoordination, popupCoordinator])

  useEffect(() => {
    if (!coordinationActive) return

    // Show ticker only on mobile for first 3 minutes
    const startTimer = setTimeout(() => setIsVisible(true), 3000)
    const endTimer = setTimeout(() => {
      setIsVisible(false)
      if (useCoordination) {
        popupCoordinator.hidePopup('mobile_ticker')
      }
    }, 180000) // 3 minutes

    return () => {
      clearTimeout(startTimer)
      clearTimeout(endTimer)
    }
  }, [coordinationActive, useCoordination, popupCoordinator])

  useEffect(() => {
    if (!isVisible || !coordinationActive) return

    const updateStory = () => {
      const story = getRandomSuccessStory()
      setCurrentStory(story.message)
    }

    updateStory()
    const interval = setInterval(updateStory, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible || !currentStory) return null

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-lg shadow-lg"
      >
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
          <p className="text-sm font-medium truncate">{currentStory}</p>
        </div>
      </motion.div>
    </div>
  )
}
