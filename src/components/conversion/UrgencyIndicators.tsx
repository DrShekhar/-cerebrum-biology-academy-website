'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Users,
  TrendingUp,
  Zap,
  AlertTriangle,
  Timer,
  UserCheck,
  Eye,
  Calendar,
  CheckCircle,
  Flame,
  Target,
} from 'lucide-react'

interface UrgencyData {
  seatsRemaining: number
  totalSeats: number
  recentEnrollments: number
  timeRemaining: {
    hours: number
    minutes: number
    seconds: number
  }
  currentViewers: number
  recentActions: Array<{
    type: 'enrollment' | 'viewing' | 'consultation'
    location: string
    timeAgo: string
  }>
  specialOfferExpiry?: Date
  batchStartDate: Date
}

interface UrgencyIndicatorProps {
  courseId: string
  courseName: string
  variant?: 'subtle' | 'prominent' | 'aggressive'
  position?: 'top' | 'bottom' | 'inline'
  showMultiple?: boolean
}

const UrgencyIndicators: React.FC<UrgencyIndicatorProps> = ({
  courseId,
  courseName,
  variant = 'prominent',
  position = 'top',
  showMultiple = true,
}) => {
  const [urgencyData, setUrgencyData] = useState<UrgencyData | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [visibleIndicators, setVisibleIndicators] = useState<string[]>([])

  // Mock urgency data - in real implementation, this would come from API
  const mockUrgencyData: UrgencyData = useMemo(() => {
    const seatsRemaining = Math.floor(Math.random() * 15) + 3 // 3-18 seats
    const totalSeats = seatsRemaining + Math.floor(Math.random() * 20) + 30 // Total 33-68 seats
    const recentEnrollments = Math.floor(Math.random() * 5) + 1 // 1-5 recent enrollments
    const currentViewers = Math.floor(Math.random() * 8) + 2 // 2-10 viewers

    const now = new Date()
    const offerExpiry = new Date(now.getTime() + 4 * 60 * 60 * 1000) // 4 hours from now
    const batchStart = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000) // 15 days from now

    const timeUntilExpiry = offerExpiry.getTime() - now.getTime()
    const hours = Math.floor(timeUntilExpiry / (1000 * 60 * 60))
    const minutes = Math.floor((timeUntilExpiry % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeUntilExpiry % (1000 * 60)) / 1000)

    const locations = [
      'Mumbai',
      'Delhi',
      'Kota',
      'Hyderabad',
      'Bangalore',
      'Chennai',
      'Pune',
      'Indore',
    ]
    const recentActions = Array.from({ length: 5 }, (_, i) => ({
      type: ['enrollment', 'viewing', 'consultation'][Math.floor(Math.random() * 3)] as any,
      location: locations[Math.floor(Math.random() * locations.length)],
      timeAgo: [
        `${Math.floor(Math.random() * 30) + 1} min ago`,
        `${Math.floor(Math.random() * 2) + 1} hr ago`,
      ][Math.floor(Math.random() * 2)],
    }))

    return {
      seatsRemaining,
      totalSeats,
      recentEnrollments,
      timeRemaining: { hours, minutes, seconds },
      currentViewers,
      recentActions,
      specialOfferExpiry: offerExpiry,
      batchStartDate: batchStart,
    }
  }, [courseId])

  useEffect(() => {
    setUrgencyData(mockUrgencyData)
  }, [mockUrgencyData])

  // Update current time every second for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Rotate visible indicators based on variant
  useEffect(() => {
    if (!showMultiple) {
      setVisibleIndicators(['seats'])
      return
    }

    const allIndicators = ['seats', 'timer', 'viewers', 'social-proof', 'batch-start']

    if (variant === 'aggressive') {
      setVisibleIndicators(allIndicators)
    } else if (variant === 'prominent') {
      setVisibleIndicators(['seats', 'timer', 'viewers'])
    } else {
      setVisibleIndicators(['seats', 'timer'])
    }

    // Rotate indicators every 8 seconds for engagement
    const rotationInterval = setInterval(() => {
      setVisibleIndicators((prev) => {
        const available = allIndicators.filter(
          (ind) => variant === 'aggressive' || allIndicators.indexOf(ind) < 3
        )
        const current = prev[0]
        const currentIndex = available.indexOf(current)
        const nextIndex = (currentIndex + 1) % available.length
        return [available[nextIndex]]
      })
    }, 8000)

    return () => clearInterval(rotationInterval)
  }, [variant, showMultiple])

  if (!urgencyData) return null

  const getUrgencyLevel = (
    seatsRemaining: number,
    total: number
  ): 'low' | 'medium' | 'high' | 'critical' => {
    const percentage = (seatsRemaining / total) * 100
    if (percentage <= 10) return 'critical'
    if (percentage <= 25) return 'high'
    if (percentage <= 50) return 'medium'
    return 'low'
  }

  const urgencyLevel = getUrgencyLevel(urgencyData.seatsRemaining, urgencyData.totalSeats)

  const getUrgencyColors = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          bg: 'bg-red-50 border-red-200',
          text: 'text-red-800',
          accent: 'text-red-600',
          pulse: 'bg-red-500',
        }
      case 'high':
        return {
          bg: 'bg-orange-50 border-orange-200',
          text: 'text-orange-800',
          accent: 'text-orange-600',
          pulse: 'bg-orange-500',
        }
      case 'medium':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          text: 'text-yellow-800',
          accent: 'text-yellow-600',
          pulse: 'bg-yellow-500',
        }
      default:
        return {
          bg: 'bg-green-50 border-green-200',
          text: 'text-green-700',
          accent: 'text-green-600',
          pulse: 'bg-green-600',
        }
    }
  }

  const colors = getUrgencyColors(urgencyLevel)

  const formatTimeRemaining = () => {
    if (!urgencyData.specialOfferExpiry) return ''

    const now = currentTime.getTime()
    const expiry = urgencyData.specialOfferExpiry.getTime()
    const diff = expiry - now

    if (diff <= 0) return 'Expired'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const SeatsIndicator = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex items-center gap-3 p-4 rounded-xl border-2 ${colors.bg} relative overflow-hidden`}
    >
      {urgencyLevel === 'critical' && (
        <motion.div
          className={`absolute inset-0 ${colors.pulse} opacity-10`}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className={`p-2 rounded-lg bg-white ${colors.text}`}>
        <Users className="w-5 h-5" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className={`font-bold text-lg ${colors.accent}`}>{urgencyData.seatsRemaining}</span>
          <span className={`text-sm ${colors.text}`}>seats remaining</span>
          {urgencyLevel === 'critical' && (
            <Flame className={`w-4 h-4 ${colors.accent} animate-pulse`} />
          )}
        </div>
        <div className={`text-xs ${colors.text} opacity-75`}>
          {urgencyData.recentEnrollments} enrolled in last 24 hours
        </div>
      </div>

      <div className="w-12 h-2 bg-white rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colors.pulse}`}
          initial={{ width: 0 }}
          animate={{
            width: `${100 - (urgencyData.seatsRemaining / urgencyData.totalSeats) * 100}%`,
          }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )

  const TimerIndicator = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl"
    >
      <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
        <Timer className="w-5 h-5" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-purple-800">Special Offer Ends In:</span>
        </div>
        <div className="font-mono text-xl font-bold text-purple-600">{formatTimeRemaining()}</div>
      </div>

      <motion.div
        className="w-3 h-3 bg-purple-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.div>
  )

  const ViewersIndicator = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg"
    >
      <Eye className="w-4 h-4 text-blue-600" />
      <span className="text-sm text-blue-800">
        <span className="font-semibold">{urgencyData.currentViewers}</span> others viewing this
        course
      </span>
      <motion.div
        className="flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: Math.min(urgencyData.currentViewers, 5) }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </motion.div>
  )

  const SocialProofIndicator = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="p-3 bg-green-50 border border-green-200 rounded-lg"
    >
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-800">Recent Activity</span>
      </div>

      <div className="space-y-1">
        {urgencyData.recentActions.slice(0, 2).map((action, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 text-xs text-green-700"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <UserCheck className="w-3 h-3" />
            <span>
              Someone from {action.location}{' '}
              {action.type === 'enrollment'
                ? 'enrolled'
                : action.type === 'consultation'
                  ? 'booked consultation'
                  : 'viewed'}{' '}
              {action.timeAgo}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  const BatchStartIndicator = () => {
    const daysUntilStart = Math.ceil(
      (urgencyData.batchStartDate.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24)
    )

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
      >
        <Calendar className="w-4 h-4 text-yellow-600" />
        <div className="text-sm text-yellow-800">
          <span className="font-medium">Batch starts in {daysUntilStart} days</span>
          <span className="text-xs block opacity-75">
            {urgencyData.batchStartDate.toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </motion.div>
    )
  }

  const renderIndicator = (type: string) => {
    switch (type) {
      case 'seats':
        return <SeatsIndicator key="seats" />
      case 'timer':
        return <TimerIndicator key="timer" />
      case 'viewers':
        return <ViewersIndicator key="viewers" />
      case 'social-proof':
        return <SocialProofIndicator key="social-proof" />
      case 'batch-start':
        return <BatchStartIndicator key="batch-start" />
      default:
        return null
    }
  }

  const containerClass = `space-y-3 ${
    position === 'top' ? 'mb-6' : position === 'bottom' ? 'mt-6' : 'my-4'
  }`

  return (
    <div className={containerClass}>
      <AnimatePresence mode="wait">
        {showMultiple ? (
          <div className="space-y-3">{visibleIndicators.map((type) => renderIndicator(type))}</div>
        ) : (
          visibleIndicators.map((type) => renderIndicator(type))
        )}
      </AnimatePresence>

      {/* Floating urgency badge for critical situations */}
      {urgencyLevel === 'critical' && variant === 'aggressive' && (
        <motion.div
          className="fixed top-4 right-4 z-50 p-3 bg-red-500 text-white rounded-full shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-bold">ONLY {urgencyData.seatsRemaining} LEFT!</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default UrgencyIndicators
