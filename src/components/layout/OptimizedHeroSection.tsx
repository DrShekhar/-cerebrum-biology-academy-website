'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { PremiumButton } from '@/components/ui/PremiumDesignSystem'
import {
  TrophyIcon,
  StarIcon,
  PlayIcon,
  ClockIcon,
  SparklesIcon,
  CheckBadgeIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline'
import { useI18n } from '@/contexts/I18nContext'

interface OptimizedHeroSectionProps {
  className?: string
  videoUrl?: string
  showVideo?: boolean
}

const FloatingParticle = ({
  delay,
  duration,
  size,
  left,
  top,
}: {
  delay: number
  duration: number
  size: number
  left: string
  top: string
}) => (
  <motion.div
    className="absolute rounded-full bg-white/20"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current).toString())
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

export function OptimizedHeroSection({
  className = '',
  videoUrl,
  showVideo = false,
}: OptimizedHeroSectionProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  const [timeLeft, setTimeLeft] = useState({
    days: 82,
    hours: 15,
    minutes: 42,
    seconds: 30,
  })
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const targetDate = new Date('2026-01-15T00:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 overflow-hidden -mt-16 lg:-mt-20 ${className}`}
    >
      {/* Video Background (if provided) */}
      {showVideo && videoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-30' : 'opacity-0'}`}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-purple-900/60 to-blue-900/80" />
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=1440&h=756&fit=crop&auto=format)',
          }}
        />

        {/* Animated Gradient Orbs - hidden on mobile for performance */}
        <motion.div
          className="hidden md:block absolute top-1/4 left-1/6 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="hidden md:block absolute bottom-1/4 right-1/6 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating Particles */}
        <FloatingParticle delay={0} duration={4} size={6} left="10%" top="20%" />
        <FloatingParticle delay={0.5} duration={5} size={4} left="20%" top="60%" />
        <FloatingParticle delay={1} duration={6} size={8} left="80%" top="30%" />
        <FloatingParticle delay={1.5} duration={4.5} size={5} left="70%" top="70%" />
        <FloatingParticle delay={2} duration={5.5} size={7} left="40%" top="15%" />
        <FloatingParticle delay={2.5} duration={4} size={4} left="60%" top="80%" />
        <FloatingParticle delay={3} duration={6} size={6} left="90%" top="50%" />
        <FloatingParticle delay={0.3} duration={5} size={5} left="5%" top="45%" />
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
              #1 {t('heroTitle')} • {t('heroSubtitle')}
            </span>
          </motion.div>

          <motion.h1
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xs:mb-6 leading-tight text-white break-words"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-yellow-300">{t('heroTitle')}</span>
            <br />
            <span className="text-green-300">{t('heroSubtitle')}</span>
          </motion.h1>

          {/* H2 for additional location keywords - SEO optimized */}
          <motion.h2
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-yellow-200"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('locations')}
          </motion.h2>

          <motion.p
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 xs:mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-yellow-300 font-bold">{t('topperHighlight')}</span> •{t('stats')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 xs:gap-4 mb-8 xs:mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Primary CTA */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <PremiumButton
                variant="medical"
                size="lg"
                onClick={() => router.push('/demo-booking')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl shadow-xl hover:shadow-green-500/30 transition-all duration-300 group text-sm xs:text-base md:text-lg border border-green-400/30"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <PlayIcon className="h-5 xs:h-6 w-5 xs:w-6 group-hover:scale-110 transition-transform" />
                </motion.div>
                {t('bookDemo')}
              </PremiumButton>
            </motion.div>

            {/* Secondary CTA */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <PremiumButton
                variant="luxury"
                size="lg"
                onClick={() => router.push('/success-stories')}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg group"
              >
                <StarIcon className="h-5 xs:h-6 w-5 xs:w-6 group-hover:text-yellow-300 transition-colors" />
                {t('seeSuccessStories')}
              </PremiumButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mb-6 xs:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-green-400/30 transition-all duration-300 group cursor-default"
              whileHover={{ y: -5 }}
            >
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                <AnimatedCounter value="695" />
              </div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('sadhnasScore')}</div>
              <div className="text-[10px] xs:text-xs text-green-300 mt-0.5">
                {t('percentile100')}
              </div>
            </motion.div>
            <motion.div
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-400/30 transition-all duration-300 group cursor-default"
              whileHover={{ y: -5 }}
            >
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 group-hover:scale-110 transition-transform">
                <AnimatedCounter value="98" suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('successRate')}</div>
              <div className="text-[10px] xs:text-xs text-yellow-300 mt-0.5">
                {t('neetQualified')}
              </div>
            </motion.div>
            <motion.div
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 group cursor-default"
              whileHover={{ y: -5 }}
            >
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                <AnimatedCounter value="2500" suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('students')}</div>
              <div className="text-[10px] xs:text-xs text-purple-300 mt-0.5">
                {t('andCounting')}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="inline-flex items-center bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <ClockIcon className="w-4 xs:w-5 h-4 xs:h-5 mr-2 text-red-300 flex-shrink-0" />
            <span className="text-red-100 text-xs xs:text-sm sm:text-base">
              {t('nextBatchStarting')}: <span className="font-bold">January 15, 2026</span> •{' '}
              {t('onlySeatsLeft')}
            </span>
          </motion.div>

          <motion.div
            className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="flex items-center gap-2 text-yellow-200">
              <SparklesIcon className="w-4 xs:w-5 h-4 xs:h-5 animate-pulse" />
              <span className="text-xs xs:text-sm sm:text-base">
                {t('earlyBirdDiscount').replace('{days}', timeLeft.days.toString())}
              </span>
            </div>
            <a
              href="/neet-2026-preparation"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs xs:text-sm font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 animate-pulse"
            >
              <AcademicCapIcon className="w-4 h-4" />
              NEET 2026
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
