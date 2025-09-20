'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircleIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ClockIcon,
  StarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

// Trust Elements Configuration
export const TrustInjections = {
  nearPriceDisplay: () => <TrustNearPrice />,

  nearEnrollButton: () => <SocialProofNearCTA />,

  onExitIntent: () => <ExitIntentOffer />,

  // Additional trust elements
  securityBadges: () => <SecurityBadges />,

  recentActivity: () => <RecentActivityFeed />,

  guaranteeBanner: () => <GuaranteeBanner />,
}

// Trust elements near price display
function TrustNearPrice() {
  const trustPoints = [
    {
      icon: CheckCircleIcon,
      text: 'No hidden charges',
      color: 'text-emerald-600',
    },
    {
      icon: CreditCardIcon,
      text: 'EMI available',
      color: 'text-blue-600',
    },
    {
      icon: ShieldCheckIcon,
      text: 'Refund guarantee',
      color: 'text-purple-600',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="trust-near-price mt-4 space-y-2"
    >
      {trustPoints.map((point, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          className="flex items-center space-x-2 text-sm"
        >
          <point.icon className={`w-4 h-4 ${point.color}`} />
          <span className="text-slate-700 font-medium">{point.text}</span>
        </motion.div>
      ))}

      {/* Payment Security */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="flex items-center space-x-2 pt-2 border-t border-slate-100"
      >
        <div className="flex space-x-1">
          <img src="/icons/razorpay.svg" alt="Razorpay" className="h-4" />
          <img src="/icons/ssl.svg" alt="SSL" className="h-4" />
          <img src="/icons/upi.svg" alt="UPI" className="h-4" />
        </div>
        <span className="text-xs text-slate-500">Secure payment via Razorpay</span>
      </motion.div>
    </motion.div>
  )
}

// Social proof near enrollment button
function SocialProofNearCTA() {
  const [enrollmentCount, setEnrollmentCount] = useState(247)

  useEffect(() => {
    // Simulate real-time enrollment updates
    const interval = setInterval(() => {
      setEnrollmentCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="social-proof bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-3 mb-4"
    >
      <div className="flex items-center space-x-3">
        {/* Avatar Stack */}
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.img
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              src={`/images/avatars/student-${i}.jpg`}
              alt="Student"
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
            />
          ))}
          <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold shadow-sm">
            +
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <motion.p
            key={enrollmentCount}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-slate-800"
          >
            <span className="text-emerald-600">{enrollmentCount}</span> students enrolled this week
          </motion.p>
          <p className="text-xs text-slate-600">Join thousands of successful NEET aspirants</p>
        </div>

        {/* Trust Badge */}
        <div className="flex items-center space-x-1">
          <StarIcon className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold text-slate-700">4.9</span>
        </div>
      </div>
    </motion.div>
  )
}

// Exit intent offer
function ExitIntentOffer() {
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Detect exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isVisible, timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="exit-offer bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-orange-500 mx-auto mb-4" />

            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Wait! Get 50% off on diagnostic test
            </h3>

            <p className="text-slate-600 mb-4">
              Don't miss out on this exclusive offer for new students
            </p>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <ClockIcon className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-semibold">
                  Offer expires in: {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Benefits */}
            <div className="text-left mb-6 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-700">Complete NEET Biology assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-700">Personalized study plan</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-700">Free counseling session</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                // Track exit intent conversion
                window.gtag?.('event', 'exit_intent_conversion', {
                  event_category: 'Conversion',
                  event_label: 'Diagnostic Test Offer',
                  value: 50,
                })
                setIsVisible(false)
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg"
            >
              Claim 50% OFF Now
            </button>

            <p className="text-xs text-slate-500 mt-2">*Valid for first-time users only</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Security badges for trust
function SecurityBadges() {
  const badges = [
    { icon: '/icons/ssl-secure.svg', alt: 'SSL Secure' },
    { icon: '/icons/data-protection.svg', alt: 'Data Protection' },
    { icon: '/icons/verified.svg', alt: 'Verified' },
    { icon: '/icons/trusted.svg', alt: 'Trusted' },
  ]

  return (
    <div className="flex items-center justify-center space-x-4 py-3 border-t border-slate-100">
      {badges.map((badge, index) => (
        <motion.img
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          src={badge.icon}
          alt={badge.alt}
          className="h-6 grayscale hover:grayscale-0 transition-all duration-200"
        />
      ))}
    </div>
  )
}

// Recent activity feed
function RecentActivityFeed() {
  const [activities, setActivities] = useState([
    {
      name: 'Priya S.',
      action: 'enrolled in NEET Biology Premium',
      time: '2 minutes ago',
      location: 'Mumbai',
    },
    {
      name: 'Rahul K.',
      action: 'completed diagnostic test',
      time: '5 minutes ago',
      location: 'Delhi',
    },
    { name: 'Sneha M.', action: 'booked demo class', time: '8 minutes ago', location: 'Bangalore' },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = {
        name: `${['Amit', 'Priya', 'Rohit', 'Sakshi', 'Vikram'][Math.floor(Math.random() * 5)]} ${['S', 'K', 'M', 'P', 'R'][Math.floor(Math.random() * 5)]}.`,
        action: [
          'enrolled in NEET Biology Premium',
          'completed diagnostic test',
          'booked demo class',
        ][Math.floor(Math.random() * 3)],
        time: 'Just now',
        location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'][
          Math.floor(Math.random() * 5)
        ],
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 2)])
    }, 15000) // Add new activity every 15 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
      <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
        Live Activity
      </h4>

      <div className="space-y-2">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={`${activity.name}-${activity.time}-${index}`}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center space-x-2 text-xs"
            >
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <UserGroupIcon className="w-3 h-3 text-emerald-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-slate-700">{activity.name}</span>
                <span className="text-slate-600"> {activity.action}</span>
                <div className="text-slate-500">
                  {activity.time} • {activity.location}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Guarantee banner
function GuaranteeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg p-4 mb-4"
    >
      <div className="flex items-center space-x-3">
        <ShieldCheckIcon className="w-8 h-8 flex-shrink-0" />
        <div>
          <h4 className="font-semibold">100% Score Improvement Guarantee</h4>
          <p className="text-sm opacity-90">
            If you don't improve your NEET Biology score, get 100% refund*
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Trust injection hook for easy integration
export function useTrustInjection(position: string) {
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Show trust elements after a short delay for better UX
    const timer = setTimeout(() => setShouldShow(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const getTrustElement = () => {
    if (!shouldShow) return null

    switch (position) {
      case 'near-price':
        return <TrustNearPrice />
      case 'near-enroll':
        return <SocialProofNearCTA />
      case 'security':
        return <SecurityBadges />
      case 'activity':
        return <RecentActivityFeed />
      case 'guarantee':
        return <GuaranteeBanner />
      default:
        return null
    }
  }

  return getTrustElement()
}

// Trust injection wrapper component
interface TrustWrapperProps {
  position: 'near-price' | 'near-enroll' | 'security' | 'activity' | 'guarantee'
  children?: React.ReactNode
  className?: string
}

export function TrustWrapper({ position, children, className = '' }: TrustWrapperProps) {
  const trustElement = useTrustInjection(position)

  return (
    <div className={className}>
      {children}
      {trustElement}
    </div>
  )
}

export default TrustInjections
