'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  Star,
  Trophy,
  MapPin,
  Clock,
  Users,
  Award,
  MessageCircle,
  X,
  UserCheck,
  Target,
} from 'lucide-react'

interface SocialProofEvent {
  id: string
  type: 'enrollment' | 'achievement' | 'review' | 'consultation' | 'success' | 'milestone'
  message: string
  location?: string
  timeAgo: string
  studentName?: string
  courseInfo?: {
    name: string
    series: string
  }
  achievementData?: {
    score?: number
    rank?: number
    improvement?: number
  }
  rating?: number
  credibility: 'high' | 'medium' | 'low'
  priority: number
}

interface SocialProofNotificationsProps {
  courseId?: string
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  autoHide?: boolean
  hideDelay?: number
  maxVisible?: number
  showTypes?: SocialProofEvent['type'][]
}

const SocialProofNotifications: React.FC<SocialProofNotificationsProps> = ({
  courseId,
  position = 'bottom-left',
  autoHide = true,
  hideDelay = 5000,
  maxVisible = 1,
  showTypes = ['enrollment', 'achievement', 'review', 'consultation', 'success'],
}) => {
  const [visibleEvents, setVisibleEvents] = useState<SocialProofEvent[]>([])
  const [eventQueue, setEventQueue] = useState<SocialProofEvent[]>([])

  // Mock social proof events
  const generateMockEvents = useCallback((): SocialProofEvent[] => {
    const locations = [
      'Mumbai',
      'Delhi',
      'Kota',
      'Hyderabad',
      'Bangalore',
      'Chennai',
      'Pune',
      'Indore',
      'Lucknow',
      'Patna',
      'Jaipur',
      'Bhubaneswar',
      'Kanpur',
      'Nagpur',
      'Agra',
      'Chandigarh',
    ]

    const studentNames = [
      'Priya S.',
      'Rahul K.',
      'Ananya M.',
      'Arjun P.',
      'Sneha R.',
      'Karthik V.',
      'Meera J.',
      'Vikram T.',
      'Pooja D.',
      'Siddharth L.',
      'Kavya N.',
      'Aadit B.',
      'Rhea A.',
      'Ishaan G.',
      'Tanya H.',
      'Rohan S.',
      'Diya P.',
      'Arnav M.',
    ]

    const courses = [
      { name: 'Ascent Series', series: 'ascent' },
      { name: 'Pinnacle Series', series: 'pinnacle' },
      { name: 'Pursuit Series', series: 'pursuit' },
    ]

    const timeOptions = [
      '2 min ago',
      '5 min ago',
      '12 min ago',
      '25 min ago',
      '1 hr ago',
      '2 hrs ago',
    ]

    const events: SocialProofEvent[] = [
      // Enrollment events
      {
        id: 'enroll-1',
        type: 'enrollment',
        message: `${studentNames[Math.floor(Math.random() * studentNames.length)]} just enrolled from ${locations[Math.floor(Math.random() * locations.length)]}`,
        location: locations[Math.floor(Math.random() * locations.length)],
        timeAgo: timeOptions[Math.floor(Math.random() * timeOptions.length)],
        studentName: studentNames[Math.floor(Math.random() * studentNames.length)],
        courseInfo: courses[Math.floor(Math.random() * courses.length)],
        credibility: 'high',
        priority: 8,
      },
      {
        id: 'enroll-2',
        type: 'enrollment',
        message: `3 students from ${locations[Math.floor(Math.random() * locations.length)]} enrolled in the last hour`,
        location: locations[Math.floor(Math.random() * locations.length)],
        timeAgo: '1 hr ago',
        credibility: 'high',
        priority: 7,
      },

      // Achievement events
      {
        id: 'achieve-1',
        type: 'achievement',
        message: `${studentNames[Math.floor(Math.random() * studentNames.length)]} scored 650+ in NEET practice test`,
        timeAgo: timeOptions[Math.floor(Math.random() * timeOptions.length)],
        achievementData: {
          score: 650 + Math.floor(Math.random() * 70),
          improvement: 80 + Math.floor(Math.random() * 40),
        },
        credibility: 'high',
        priority: 9,
      },
      {
        id: 'achieve-2',
        type: 'achievement',
        message: `${studentNames[Math.floor(Math.random() * studentNames.length)]} achieved AIR 247 in NEET 2024`,
        timeAgo: '3 hrs ago',
        achievementData: {
          rank: 247,
          score: 685,
        },
        credibility: 'high',
        priority: 10,
      },

      // Review events
      {
        id: 'review-1',
        type: 'review',
        message: `${studentNames[Math.floor(Math.random() * studentNames.length)]} rated us 5 stars: "Excellent Biology coaching!"`,
        timeAgo: timeOptions[Math.floor(Math.random() * timeOptions.length)],
        rating: 5,
        credibility: 'medium',
        priority: 6,
      },
      {
        id: 'review-2',
        type: 'review',
        message: `"The faculty is amazing and concepts are crystal clear" - ${studentNames[Math.floor(Math.random() * studentNames.length)]}`,
        timeAgo: timeOptions[Math.floor(Math.random() * timeOptions.length)],
        rating: 5,
        credibility: 'medium',
        priority: 5,
      },

      // Consultation events
      {
        id: 'consult-1',
        type: 'consultation',
        message: `${studentNames[Math.floor(Math.random() * studentNames.length)]} booked free counseling session`,
        timeAgo: timeOptions[Math.floor(Math.random() * timeOptions.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        credibility: 'medium',
        priority: 4,
      },

      // Success stories
      {
        id: 'success-1',
        type: 'success',
        message: `${studentNames[Math.floor(Math.random() * studentNames.length)]} got admission to AIIMS Delhi after our coaching`,
        timeAgo: '5 hrs ago',
        achievementData: {
          rank: 45,
          score: 710,
        },
        credibility: 'high',
        priority: 10,
      },

      // Milestone events
      {
        id: 'milestone-1',
        type: 'milestone',
        message: '10,000+ students successfully qualified NEET with Cerebrum',
        timeAgo: 'Today',
        credibility: 'high',
        priority: 8,
      },
    ]

    return events.filter((event) => showTypes.includes(event.type))
  }, [showTypes])

  // Initialize events and set up rotation
  useEffect(() => {
    const events = generateMockEvents()
    setEventQueue(events.sort((a, b) => b.priority - a.priority))

    // Show first event after a short delay
    const initialTimeout = setTimeout(() => {
      showNextEvent(events)
    }, 2000)

    return () => clearTimeout(initialTimeout)
  }, [])

  const showNextEvent = useCallback(
    (events: SocialProofEvent[]) => {
      if (events.length === 0) return

      const nextEvent = events[Math.floor(Math.random() * Math.min(5, events.length))]

      setVisibleEvents((prev) => {
        const newVisible = [nextEvent, ...prev.slice(0, maxVisible - 1)]
        return newVisible
      })

      if (autoHide) {
        setTimeout(() => {
          setVisibleEvents((prev) => prev.filter((event) => event.id !== nextEvent.id))
        }, hideDelay)
      }
    },
    [autoHide, hideDelay, maxVisible]
  )

  // Set up rotation timer
  useEffect(() => {
    if (eventQueue.length === 0) return

    const interval = setInterval(
      () => {
        showNextEvent(eventQueue)
      },
      8000 + Math.random() * 4000
    ) // 8-12 seconds

    return () => clearInterval(interval)
  }, [eventQueue, showNextEvent])

  const dismissEvent = (eventId: string) => {
    setVisibleEvents((prev) => prev.filter((event) => event.id !== eventId))
  }

  const getEventIcon = (type: SocialProofEvent['type']) => {
    switch (type) {
      case 'enrollment':
        return <UserCheck className="w-4 h-4" />
      case 'achievement':
        return <Trophy className="w-4 h-4" />
      case 'review':
        return <Star className="w-4 h-4" />
      case 'consultation':
        return <MessageCircle className="w-4 h-4" />
      case 'success':
        return <Award className="w-4 h-4" />
      case 'milestone':
        return <Target className="w-4 h-4" />
      default:
        return <CheckCircle className="w-4 h-4" />
    }
  }

  const getEventColor = (type: SocialProofEvent['type'], credibility: string) => {
    const baseColors = {
      enrollment: 'emerald',
      achievement: 'yellow',
      review: 'blue',
      consultation: 'purple',
      success: 'green',
      milestone: 'orange',
    }

    const color = baseColors[type] || 'gray'
    const intensity = credibility === 'high' ? '600' : credibility === 'medium' ? '500' : '400'

    return {
      bg: `bg-${color}-50`,
      border: `border-${color}-200`,
      text: `text-${color}-800`,
      icon: `text-${color}-${intensity}`,
      accent: `bg-${color}-${intensity}`,
    }
  }

  const getPositionClasses = () => {
    const base = 'fixed z-50 max-w-sm'

    switch (position) {
      case 'bottom-left':
        return `${base} bottom-4 left-4`
      case 'bottom-right':
        return `${base} bottom-4 right-4`
      case 'top-left':
        return `${base} top-4 left-4`
      case 'top-right':
        return `${base} top-4 right-4`
      default:
        return `${base} bottom-4 left-4`
    }
  }

  const formatMessage = (event: SocialProofEvent) => {
    // Add dynamic elements to make messages more engaging
    if (event.type === 'achievement' && event.achievementData) {
      if (event.achievementData.rank) {
        return `🎉 ${event.studentName || 'A student'} achieved AIR ${event.achievementData.rank}!`
      }
      if (event.achievementData.score) {
        return `📈 ${event.studentName || 'A student'} scored ${event.achievementData.score}/720 in practice test!`
      }
    }

    if (event.type === 'enrollment' && event.courseInfo) {
      return `✅ ${event.studentName || 'Someone'} just enrolled in ${event.courseInfo.name}!`
    }

    return event.message
  }

  return (
    <div className={getPositionClasses()}>
      <AnimatePresence>
        {visibleEvents.map((event, index) => {
          const colors = getEventColor(event.type, event.credibility)

          return (
            <motion.div
              key={event.id}
              initial={{
                opacity: 0,
                x: position.includes('right') ? 100 : -100,
                y: position.includes('top') ? -20 : 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                x: position.includes('right') ? 100 : -100,
                scale: 0.8,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: index * 0.1,
              }}
              className={`
                mb-3 p-4 rounded-xl border-2 shadow-lg backdrop-blur-sm
                ${colors.bg} ${colors.border}
                hover:shadow-xl transition-shadow duration-300
              `}
              style={{ marginBottom: index === 0 ? 0 : 12 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className={`p-2 rounded-lg bg-white ${colors.icon} flex-shrink-0`}
                  whileHover={{ rotate: 5 }}
                >
                  {getEventIcon(event.type)}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${colors.text} leading-relaxed`}>
                    {formatMessage(event)}
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    {event.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{event.timeAgo}</span>
                    </div>

                    {event.rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: event.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    )}

                    {event.credibility === 'high' && (
                      <motion.div
                        className={`w-2 h-2 rounded-full ${colors.accent}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                </div>

                <button
                  onClick={() => dismissEvent(event.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar for credibility */}
              {event.credibility === 'high' && (
                <motion.div
                  className="mt-3 h-1 bg-white rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className={`h-full ${colors.accent}`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: hideDelay / 1000, ease: 'linear' }}
                  />
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Overall stats overlay */}
      {visibleEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-2 text-green-700">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">
              10,000+ students successfully qualified NEET
            </span>
          </div>
          <div className="text-xs text-green-600 mt-1">
            98% qualification rate • Join them today!
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SocialProofNotifications
