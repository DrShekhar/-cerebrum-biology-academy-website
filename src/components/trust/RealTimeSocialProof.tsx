'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, BookOpen, Award, Clock, MapPin, Star } from 'lucide-react'
import { useTranslations } from '@/lib/i18n/translations'

interface SocialProofEvent {
  id: string
  type: 'enrollment' | 'completion' | 'achievement' | 'demo_booking'
  studentName: string
  location: string
  course?: string
  achievement?: string
  timestamp: Date
  verified: boolean
}

// Simulated real-time events (in production, this would come from your backend)
const generateSocialProofEvents = (): SocialProofEvent[] => [
  {
    id: '1',
    type: 'enrollment',
    studentName: 'Priya Sharma',
    location: 'Delhi',
    course: 'NEET 2026 Complete',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    verified: true,
  },
  {
    id: '2',
    type: 'achievement',
    studentName: 'Rahul Kumar',
    location: 'Mumbai',
    achievement: 'Scored 350/360 in Biology',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    verified: true,
  },
  {
    id: '3',
    type: 'demo_booking',
    studentName: 'Sneha Patel',
    location: 'Ahmedabad',
    timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    verified: true,
  },
  {
    id: '4',
    type: 'completion',
    studentName: 'Arjun Singh',
    location: 'Jaipur',
    course: 'Class 12 Biology',
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    verified: true,
  },
  {
    id: '5',
    type: 'achievement',
    studentName: 'Ananya Reddy',
    location: 'Hyderabad',
    achievement: 'AIR 45 in NEET 2024',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    verified: true,
  },
]

export function RealTimeSocialProof() {
  const [events, setEvents] = useState<SocialProofEvent[]>([])
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { t, language } = useTranslations()

  // Initialize events
  useEffect(() => {
    setEvents(generateSocialProofEvents())
  }, [])

  // Cycle through events
  useEffect(() => {
    if (events.length === 0) return

    const showEvent = () => {
      setIsVisible(true)
      setTimeout(() => setIsVisible(false), 4000) // Show for 4 seconds
    }

    const cycleEvents = () => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length)
      showEvent()
    }

    // Show first event after 3 seconds
    const initialTimer = setTimeout(showEvent, 3000)

    // Then cycle every 8 seconds
    const interval = setInterval(cycleEvents, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [events])

  if (!events.length || !isVisible) return null

  const currentEvent = events[currentEventIndex]

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return BookOpen
      case 'achievement':
        return Award
      case 'completion':
        return Star
      case 'demo_booking':
        return Users
      default:
        return Users
    }
  }

  const getEventMessage = (event: SocialProofEvent) => {
    const timeAgo = Math.floor((Date.now() - event.timestamp.getTime()) / (1000 * 60))
    const timeText = language === 'hi' ? `${timeAgo} मिनट पहले` : `${timeAgo} min ago`

    switch (event.type) {
      case 'enrollment':
        return language === 'hi'
          ? `${event.studentName} ने ${event.course} में दाखिला लिया`
          : `${event.studentName} enrolled in ${event.course}`

      case 'achievement':
        return language === 'hi'
          ? `${event.studentName} ने ${event.achievement} हासिल किया`
          : `${event.studentName} achieved ${event.achievement}`

      case 'completion':
        return language === 'hi'
          ? `${event.studentName} ने ${event.course} पूरा किया`
          : `${event.studentName} completed ${event.course}`

      case 'demo_booking':
        return language === 'hi'
          ? `${event.studentName} ने डेमो क्लास बुक की`
          : `${event.studentName} booked a demo class`

      default:
        return `${event.studentName} joined Cerebrum Academy`
    }
  }

  const EventIcon = getEventIcon(currentEvent.type)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          duration: 0.5,
        }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-40"
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 backdrop-blur-sm bg-opacity-95">
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <EventIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getEventMessage(currentEvent)}
                </p>
                {currentEvent.verified && (
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>{currentEvent.location}</span>
                <span>•</span>
                <Clock className="w-3 h-3" />
                <span>
                  {Math.floor((Date.now() - currentEvent.timestamp.getTime()) / (1000 * 60))}{' '}
                  {language === 'hi' ? 'मिनट पहले' : 'min ago'}
                </span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <motion.div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Live stats counter component
export function LiveStatsCounter() {
  const [stats, setStats] = useState({
    enrolledToday: 127,
    currentLiveStudents: 2847,
    totalQualified: 9632,
  })

  const { language } = useTranslations()

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        enrolledToday: prev.enrolledToday + Math.floor(Math.random() * 3),
        currentLiveStudents: prev.currentLiveStudents + Math.floor(Math.random() * 5) - 2,
        totalQualified: prev.totalQualified + Math.floor(Math.random() * 2),
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const statsData = [
    {
      value: stats.enrolledToday,
      label: language === 'hi' ? 'आज नामांकित' : 'Enrolled Today',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      value: stats.currentLiveStudents,
      label: language === 'hi' ? 'लाइव छात्र' : 'Live Students',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      value: stats.totalQualified,
      label: language === 'hi' ? 'NEET उत्तीर्ण' : 'NEET Qualified',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
        <h3 className="text-lg font-semibold text-gray-900">
          {language === 'hi' ? 'लाइव आंकड़े' : 'Live Stats'}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-lg p-4 text-center`}
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
            <motion.div
              key={stat.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className={`text-2xl font-bold ${stat.color} mb-1`}
            >
              {stat.value.toLocaleString()}
            </motion.div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Recently joined students ticker
export function RecentJoinsTicket() {
  const recentStudents = [
    { name: 'Amit Kumar', location: 'Delhi', time: '2 min ago' },
    { name: 'Priya Singh', location: 'Mumbai', time: '5 min ago' },
    { name: 'Rohit Sharma', location: 'Bangalore', time: '8 min ago' },
    { name: 'Sneha Patel', location: 'Ahmedabad', time: '12 min ago' },
    { name: 'Raj Malhotra', location: 'Pune', time: '15 min ago' },
  ]

  const { language } = useTranslations()

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center space-x-2 mb-3">
        <Users className="w-5 h-5 text-green-600" />
        <h4 className="font-semibold text-green-800">
          {language === 'hi' ? 'हाल ही में शामिल हुए' : 'Recently Joined'}
        </h4>
      </div>

      <div className="space-y-2">
        {recentStudents.slice(0, 3).map((student, index) => (
          <motion.div
            key={student.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-600 rounded-full" />
              <span className="font-medium text-gray-900">{student.name}</span>
              <span className="text-gray-500">from {student.location}</span>
            </div>
            <span className="text-xs text-gray-400">{student.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
