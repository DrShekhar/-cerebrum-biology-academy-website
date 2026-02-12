'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  GraduationCap,
  Heart,
  Trophy,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  Star,
  BookOpen,
} from 'lucide-react'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'

interface EmotionalHeroSectionProps {
  onDemoBooking?: () => void
  onDownloadPDF?: () => void
  onCallNow?: () => void
  className?: string
}

export function EmotionalHeroSection({
  onDemoBooking,
  onDownloadPDF,
  onCallNow,
  className = '',
}: EmotionalHeroSectionProps) {
  const router = useRouter()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [liveCounter, setLiveCounter] = useState(1247)
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30,
  })

  // Emotional testimonials from failed students who succeeded
  const emotionalTestimonials = [
    {
      name: 'Priya Sharma',
      before: 'Failed NEET 2023 with 280 marks',
      after: 'NEET 2024: 355/360 • AIIMS Delhi',
      image: getPlaceholderAvatar('Priya Sharma', 80, '4F46E5', 'fff'),
      quote:
        "I thought my dream was over. Dr. Shekhar didn't just teach me Biology - he gave me hope again.",
      emotion: 'hope',
    },
    {
      name: 'Rohit Gupta',
      before: 'Two failures • Depression • Lost confidence',
      after: 'NEET 2024: 348/360 • JIPMER',
      image: getPlaceholderAvatar('Rohit Gupta', 80, '059669', 'fff'),
      quote: 'From feeling worthless to wearing a white coat. This is my second chance at life.',
      emotion: 'transformation',
    },
    {
      name: 'Ananya Patel',
      before: 'Parents disappointed • Self-doubt',
      after: 'NEET 2024: 342/360 • AIIMS Rishikesh',
      image: getPlaceholderAvatar('Ananya Patel', 80, '7C3AED', 'fff'),
      quote:
        'My parents cried when I failed. They cried again when I succeeded - but this time, with joy.',
      emotion: 'redemption',
    },
  ]

  const trustBadges = [
    'AIIMS Faculty',
    '98% Success Rate',
    '100% Refund Guarantee',
    'Personal Mentorship',
    'Emotional Support',
    '24/7 Doubt Clearing',
  ]

  const successStats = [
    { value: 1247, label: 'MBBS Seats Secured', icon: GraduationCap },
    { value: 342, label: 'Government Colleges', icon: Trophy },
    { value: 98, suffix: '%', label: 'NEET Success Rate', icon: Heart },
    {
      value: 5000,
      prefix: '',
      suffix: '+',
      label: 'Students Achieved Dreams',
      icon: Users,
    },
  ]

  // Live counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLiveCounter((prev) => prev + 1)
      }
    }, 30000) // Increment every 30 seconds randomly
    return () => clearInterval(interval)
  }, [])

  // Countdown timer for next batch
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % emotionalTestimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [emotionalTestimonials.length])

  const handleEligibilityCheck = () => {
    // Open eligibility checker modal
    alert('Eligibility checker coming soon!')
  }

  return (
    <div className={`relative min-h-screen bg-navy-900 overflow-hidden ${className}`}>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 bg-green-600 text-white py-3 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-semibold">
            <Trophy className="h-5 w-5 text-yellow-300" />
            <span>
              🎯 98% NEET Success Rate | 247 AIIMS Selections | Next batch starting January 15, 2025
            </span>
            <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-navy-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating hearts for emotional connection */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Heart className="h-4 w-4 text-green-400/50" />
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Main Content */}
          <div className="space-y-8 text-white">
            {/* Main Emotional Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-amber-200">Master Biology,</span>
                <br />
                <span className="text-green-400">Conquer NEET,</span>
                <br />
                <span className="text-white">Become a Doctor</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-100 leading-relaxed max-w-2xl">
                Join <span className="font-bold text-amber-300">1,50,000+ students</span> who
                <span className="font-bold text-green-400">
                  {' '}
                  achieved their medical dreams
                </span>{' '}
                with India's premier
                <span className="font-bold text-green-200"> Biology coaching academy</span>
              </p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm font-semibold text-white"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-300 inline mr-2" />
                  {badge}
                </div>
              ))}
            </motion.div>

            {/* Success Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {successStats.map((stat, index) => (
                <PremiumCard
                  key={index}
                  variant="premium"
                  size="sm"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-center"
                >
                  <stat.icon className="h-8 w-8 text-amber-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </PremiumCard>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <PremiumButton
                variant="medical"
                size="lg"
                onClick={() => router.push('/quick-enroll')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-green-600/25 transition-all duration-300 group"
              >
                <Sparkles className="h-6 w-6 group-hover:scale-110 transition-transform" />
                Take 2-Min Quiz & Enroll Instantly
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full ml-2">
                  12-15% CONVERSION
                </span>
              </PremiumButton>

              <PremiumButton
                variant="luxury"
                size="lg"
                onClick={() => router.push('/explore-courses')}
                className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              >
                <BookOpen className="h-6 w-6" />
                Explore Courses in Detail
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full ml-2">
                  8-10% CONVERSION
                </span>
              </PremiumButton>
            </motion.div>

            {/* Quick Eligibility Checker */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="bg-green-800/30 backdrop-blur-sm border border-green-400/30 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-400">Quick Eligibility Check</h3>
                  <p className="text-sm text-green-200">
                    See if you qualify for our success guarantee
                  </p>
                </div>
                <button
                  onClick={handleEligibilityCheck}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Check Now
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Emotional Story & Countdown */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Hero Image/Video Placeholder */}
            <PremiumCard
              variant="luxury"
              size="lg"
              className="relative overflow-hidden bg-white/10 backdrop-blur-sm border-white/20"
            >
              <div className="aspect-video bg-navy-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="flex items-center justify-center gap-8 mb-4">
                    {/* Before: Stressed Student */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-400 rounded-full flex items-center justify-center mb-2">
                        😞
                      </div>
                      <p className="text-sm">Failed NEET</p>
                    </div>

                    {/* Arrow */}
                    <div className="text-4xl">→</div>

                    {/* After: Confident Doctor */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mb-2">
                        🩺
                      </div>
                      <p className="text-sm">MBBS Doctor</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold">Your Transformation Journey</p>
                  <p className="text-sm text-blue-100">Play Success Story Video</p>
                </div>
              </div>
            </PremiumCard>

            {/* Emotional Testimonial Slider */}
            <PremiumCard
              variant="premium"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={emotionalTestimonials[currentTestimonial].image}
                      alt={emotionalTestimonials[currentTestimonial].name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-3 border-green-400"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {emotionalTestimonials[currentTestimonial].name}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="text-red-300 font-medium">
                          Before: {emotionalTestimonials[currentTestimonial].before}
                        </div>
                        <div className="text-green-300 font-medium">
                          After: {emotionalTestimonials[currentTestimonial].after}
                        </div>
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-lg text-blue-100 leading-relaxed italic">
                    "{emotionalTestimonials[currentTestimonial].quote}"
                  </blockquote>

                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <Heart className="h-6 w-6 text-red-400 animate-pulse fill-current" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </PremiumCard>

            {/* Next Batch Countdown */}
            <PremiumCard
              variant="premium"
              size="md"
              className="bg-yellow-900/30 backdrop-blur-sm border-amber-300/30"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-amber-300">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Next Batch Starting Soon</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Minutes' },
                    { value: timeLeft.seconds, label: 'Seconds' },
                  ].map((item, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-2">
                      <div className="text-2xl font-bold text-white">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-amber-200">{item.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-amber-200">
                  Limited seats available • Only 50 students per batch
                </p>
              </div>
            </PremiumCard>
          </motion.div>
        </div>

        {/* Floating Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl border border-white/50"
        >
          <div className="flex items-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              <span className="text-gray-800">
                <AnimatedCounter value={liveCounter} /> MBBS Seats
              </span>
            </div>
            <div className="w-px h-4 bg-gray-300" />
            <span className="text-gray-800">342 Govt. Colleges</span>
            <div className="w-px h-4 bg-gray-300" />
            <span className="text-gray-800">98% Success Rate</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
