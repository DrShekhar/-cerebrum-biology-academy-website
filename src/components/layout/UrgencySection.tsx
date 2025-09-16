'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Users, AlertCircle, TrendingUp, Star, Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [recentEnrollments, setRecentEnrollments] = useState(0)

  // Countdown to next batch (30 days from now)
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 30)
    targetDate.setHours(23, 59, 59, 999)

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate recent enrollments counter
  useEffect(() => {
    const startCount = 23
    let currentCount = startCount

    const interval = setInterval(() => {
      currentCount += Math.random() > 0.7 ? 1 : 0
      setRecentEnrollments(currentCount)
    }, 15000) // Update every 15 seconds

    setRecentEnrollments(startCount)
    return () => clearInterval(interval)
  }, [])

  const urgencyFactors = [
    {
      icon: Clock,
      title: 'Limited Batch Size',
      description: 'Only 25 seats per batch for personalized attention',
      remaining: '7 seats left',
      color: 'text-red-500 bg-red-50 border-red-200',
    },
    {
      icon: TrendingUp,
      title: 'Early Bird Pricing',
      description: 'Save ₹15,000 on course fees for early enrollments',
      remaining: '₹15,000 discount',
      color: 'text-orange-500 bg-orange-50 border-orange-200',
    },
    {
      icon: Star,
      title: 'Bonus Materials',
      description: 'Free NEET previous papers + exclusive study resources',
      remaining: 'Worth ₹5,000',
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200',
    },
  ]

  const batchInfo = {
    nextBatchDate: 'November 1st, 2024',
    totalSeats: 25,
    filledSeats: 18,
    remainingSeats: 7,
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      key={value}
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      className="bg-white rounded-xl p-4 shadow-lg border-2 border-red-200 text-center min-w-[80px]"
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-red-600"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">{label}</div>
    </motion.div>
  )

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-t-4 border-red-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgent Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-6 mb-12 shadow-xl"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <AlertCircle className="w-8 h-8 animate-pulse" />
            <h2 className="text-2xl md:text-3xl font-bold">🔥 Limited Time Opportunity!</h2>
            <AlertCircle className="w-8 h-8 animate-pulse" />
          </div>

          <div className="text-center">
            <p className="text-lg md:text-xl mb-4">Next NEET Biology Intensive Batch starts in:</p>

            {/* Countdown Timer */}
            <div className="flex justify-center space-x-4 mb-4">
              <TimeBlock value={timeLeft.days} label="Days" />
              <div className="flex items-center text-3xl font-bold text-white">:</div>
              <TimeBlock value={timeLeft.hours} label="Hours" />
              <div className="flex items-center text-3xl font-bold text-white">:</div>
              <TimeBlock value={timeLeft.minutes} label="Minutes" />
              <div className="flex items-center text-3xl font-bold text-white">:</div>
              <TimeBlock value={timeLeft.seconds} label="Seconds" />
            </div>

            <p className="text-red-100 text-lg">
              Only{' '}
              <span className="font-bold text-white">
                {batchInfo.remainingSeats} seats remaining
              </span>{' '}
              out of {batchInfo.totalSeats}
            </p>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Urgency Factors */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Why You Need to Act <span className="text-red-600">Right Now</span>
            </h3>

            <div className="space-y-6">
              {urgencyFactors.map((factor, index) => {
                const Icon = factor.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center border-2 ${factor.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{factor.title}</h4>
                        <p className="text-gray-600 mb-3">{factor.description}</p>
                        <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {factor.remaining}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Live Activity & Seats Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Seats Visualization */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Batch Enrollment Status
              </h4>

              {/* Seat Grid Visualization */}
              <div className="grid grid-cols-5 gap-3 mb-6">
                {Array.from({ length: batchInfo.totalSeats }, (_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 ${
                      index < batchInfo.filledSeats
                        ? 'bg-red-500 border-red-600 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                  </motion.div>
                ))}
              </div>

              <div className="text-center space-y-2">
                <p className="text-lg">
                  <span className="font-bold text-red-600">
                    {batchInfo.filledSeats}/{batchInfo.totalSeats}
                  </span>{' '}
                  seats filled
                </p>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(batchInfo.filledSeats / batchInfo.totalSeats) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600">Only {batchInfo.remainingSeats} seats left!</p>
              </div>
            </div>

            {/* Live Enrollment Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold text-gray-900">Live Enrollment Activity</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Live</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-700">
                    <span className="font-semibold">Priya M.</span> from Mumbai just enrolled
                  </span>
                  <span className="text-green-600 text-xs">2 min ago</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-blue-700">
                    <span className="font-semibold">Rahul K.</span> from Delhi secured early bird
                    pricing
                  </span>
                  <span className="text-blue-600 text-xs">5 min ago</span>
                </div>

                <div className="text-center text-gray-600">
                  <motion.span
                    key={recentEnrollments}
                    initial={{ scale: 1.2, color: '#ef4444' }}
                    animate={{ scale: 1, color: '#6b7280' }}
                    className="font-semibold"
                  >
                    {recentEnrollments} students enrolled today
                  </motion.span>
                </div>
              </div>
            </div>

            {/* Urgent CTA */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/support/demo"
                className="block w-full bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Zap className="w-6 h-6" />
                  <span className="text-xl font-bold">Secure Your Seat NOW</span>
                  <Zap className="w-6 h-6" />
                </div>
                <p className="text-red-100 mb-3">
                  Get instant access + early bird discount before seats run out
                </p>
                <div className="flex items-center justify-center space-x-2 text-lg font-semibold">
                  <span>Book Free Demo & Reserve Seat</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
