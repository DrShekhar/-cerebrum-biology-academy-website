'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PremiumButton } from '@/components/ui/PremiumDesignSystem'
import {
  TrophyIcon,
  StarIcon,
  PlayIcon,
  ClockIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

interface OptimizedHeroSectionProps {
  className?: string
}

export function OptimizedHeroSection({ className = '' }: OptimizedHeroSectionProps) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({
    days: 82,
    hours: 15,
    minutes: 42,
    seconds: 30,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let newSeconds = prev.seconds - 1
        let newMinutes = prev.minutes
        let newHours = prev.hours
        let newDays = prev.days

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }
        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }
        if (newHours < 0) {
          newHours = 23
          newDays -= 1
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 overflow-hidden -mt-16 lg:-mt-20 ${className}`}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1440&h=756&fit=crop&auto=format)',
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-20 flex items-center min-h-screen">
        <div className="w-full">
          <motion.div
            className="inline-flex items-center bg-green-500/20 backdrop-blur-sm border border-green-300/30 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TrophyIcon className="w-5 h-5 mr-2 text-green-300" />
            <span className="text-green-100 font-medium text-xs xs:text-sm md:text-base">
              #1 NEET Biology Coaching in India
            </span>
          </motion.div>

          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 xs:mb-6 leading-tight text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-yellow-300">Sadhna Scored 695</span> in NEET 2023
            <br />
            <span className="text-green-300">100 Percentile</span> in Biology
            <br />
            <span className="text-white">You're Next.</span>
          </motion.h1>

          <motion.p
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 xs:mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            98% Success Rate • 2,500+ Students Mentored • Founded by Dr. Shekhar C Singh (AIIMS New
            Delhi)
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 xs:gap-4 mb-8 xs:mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <PremiumButton
              variant="medical"
              size="lg"
              onClick={() => router.push('/success-stories')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 group text-sm xs:text-base md:text-lg"
            >
              <StarIcon className="h-6 w-6 group-hover:scale-110 transition-transform" />
              See Their Success Stories
            </PremiumButton>

            <PremiumButton
              variant="luxury"
              size="lg"
              onClick={() => router.push('/demo')}
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg"
            >
              <PlayIcon className="h-5 xs:h-6 w-5 xs:w-6" />
              Try Free Demo Class
            </PremiumButton>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mb-6 xs:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
                695
              </div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-blue-200 mt-1">
                Sadhna's Score
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
                98%
              </div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-blue-200 mt-1">
                Success Rate
              </div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">
                2,500+
              </div>
              <div className="text-[10px] xs:text-xs sm:text-sm text-blue-200 mt-1">Students</div>
            </div>
          </motion.div>

          <motion.div
            className="inline-flex items-center bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <ClockIcon className="w-4 xs:w-5 h-4 xs:h-5 mr-2 text-red-300 flex-shrink-0" />
            <span className="text-red-100 text-xs xs:text-sm sm:text-base">
              Next Batch Starting: <span className="font-bold">January 15, 2025</span> • Only 50
              Seats Left
            </span>
          </motion.div>

          <motion.div
            className="mt-6 xs:mt-8 flex items-center gap-2 text-yellow-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <SparklesIcon className="w-4 xs:w-5 h-4 xs:h-5 animate-pulse" />
            <span className="text-xs xs:text-sm sm:text-base">
              Join in the next {timeLeft.days} days and get 15% early bird discount
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
