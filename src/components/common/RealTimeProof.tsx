'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, MapPin, BookOpen, Trophy, Clock } from 'lucide-react'

interface ProofNotification {
  id: string
  type: 'enrollment' | 'success' | 'demo' | 'achievement'
  name: string
  location: string
  action: string
  course?: string
  timestamp: Date
  icon: any
  color: string
}

export function RealTimeProof() {
  const [notifications, setNotifications] = useState<ProofNotification[]>([])
  const [currentNotification, setCurrentNotification] = useState<ProofNotification | null>(null)

  // Sample data - in real implementation, this would come from your backend
  const sampleNotifications: Omit<ProofNotification, 'id' | 'timestamp'>[] = [
    {
      type: 'enrollment',
      name: 'Rahul Sharma',
      location: 'Delhi',
      action: 'enrolled in Class 12th Biology',
      course: 'Class 12th Biology',
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      type: 'success',
      name: 'Priya Patel',
      location: 'Mumbai',
      action: 'got admission in AIIMS Delhi',
      icon: Trophy,
      color: 'bg-emerald-500',
    },
    {
      type: 'demo',
      name: 'Amit Kumar',
      location: 'Bangalore',
      action: 'booked a free demo class',
      course: 'NEET Dropper',
      icon: User,
      color: 'bg-purple-500',
    },
    {
      type: 'achievement',
      name: 'Sneha Singh',
      location: 'Kolkata',
      action: 'scored 680/720 in NEET',
      icon: Trophy,
      color: 'bg-orange-500',
    },
    {
      type: 'enrollment',
      name: 'Arjun Reddy',
      location: 'Hyderabad',
      action: 'joined Foundation Course',
      course: 'Foundation Course',
      icon: BookOpen,
      color: 'bg-indigo-500',
    },
    {
      type: 'success',
      name: 'Kavya Krishnan',
      location: 'Chennai',
      action: 'secured MBBS seat in JIPMER',
      icon: Trophy,
      color: 'bg-green-500',
    },
  ]

  // Generate random notifications
  useEffect(() => {
    const generateNotification = () => {
      const randomNotif =
        sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)]
      const notification: ProofNotification = {
        ...randomNotif,
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(Date.now() - Math.random() * 300000), // Random time within last 5 minutes
      }
      return notification
    }

    // Initial notifications
    const initialNotifications = Array.from({ length: 3 }, () => generateNotification())
    setNotifications(initialNotifications)
    setCurrentNotification(initialNotifications[0])

    // Generate new notifications every 8-15 seconds
    const interval = setInterval(
      () => {
        const newNotification = generateNotification()
        setNotifications((prev) => [newNotification, ...prev].slice(0, 10)) // Keep only last 10
        setCurrentNotification(newNotification)
      },
      Math.random() * 7000 + 8000
    ) // 8-15 seconds

    return () => clearInterval(interval)
  }, [])

  // Auto-cycle through notifications every 6 seconds
  useEffect(() => {
    if (notifications.length === 0) return

    const interval = setInterval(() => {
      setCurrentNotification((prev) => {
        const currentIndex = notifications.findIndex((n) => n.id === prev?.id)
        const nextIndex = (currentIndex + 1) % notifications.length
        return notifications[nextIndex]
      })
    }, 6000)

    return () => clearInterval(interval)
  }, [notifications])

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    return '1d ago'
  }

  if (!currentNotification) return null

  const Icon = currentNotification.icon

  return (
    <div className="fixed bottom-6 left-6 z-30 max-w-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNotification.id}
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 p-4 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-start space-x-3">
            {/* Avatar/Icon */}
            <div
              className={`w-10 h-10 ${currentNotification.color} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">
                  {currentNotification.name}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {currentNotification.location}
                </div>
              </div>

              <p className="text-sm text-gray-700 leading-tight">{currentNotification.action}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatTimeAgo(currentNotification.timestamp)}
                </div>

                {/* Live indicator */}
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden"
            initial={{ width: '100%' }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 6, ease: 'linear' }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Notification count indicator */}
      {notifications.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
        >
          {notifications.length}
        </motion.div>
      )}
    </div>
  )
}
