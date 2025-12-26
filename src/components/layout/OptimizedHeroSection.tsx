'use client'

import React, { useEffect, useState, useRef, memo } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumButton } from '@/components/ui/PremiumDesignSystem'
import {
  Trophy,
  Star,
  Play,
  Clock,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'

interface OptimizedHeroSectionProps {
  className?: string
  videoUrl?: string
  showVideo?: boolean
}

// Simple CSS animation instead of framer-motion for particles
const FloatingParticle = memo(
  ({
    size,
    left,
    top,
    delay,
  }: {
    delay: number
    duration: number
    size: number
    left: string
    top: string
  }) => (
    <div
      className="absolute rounded-full bg-white/20 animate-float"
      style={{
        width: size,
        height: size,
        left,
        top,
        animationDelay: `${delay}s`,
      }}
    />
  )
)
FloatingParticle.displayName = 'FloatingParticle'

// Static counter for SSR - animates on client only
const AnimatedCounter = memo(({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(value) // Start with final value for SSR
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return
    setHasAnimated(true)

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const duration = 1500 // Faster animation
    const steps = 30 // Fewer steps
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
  }, [value, hasAnimated])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
})
AnimatedCounter.displayName = 'AnimatedCounter'

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
      className={`relative min-h-screen bg-gradient-to-br bg-indigo-900 overflow-hidden -mt-16 lg:-mt-20 ${className}`}
    >
      {/* Video Background (if provided) - lazy load */}
      {showVideo && videoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-30' : 'opacity-0'}`}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-purple-900/60 to-blue-900/80" />
        </div>
      )}

      {/* Background - CSS only, no external image for faster LCP */}
      <div className="absolute inset-0">
        {/* CSS gradient orbs - no JS animation for performance */}
        <div className="hidden md:block absolute top-1/4 left-[16%] w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="hidden md:block absolute bottom-1/4 right-[16%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

        {/* Floating Particles - CSS animation only */}
        <FloatingParticle delay={0} duration={4} size={6} left="10%" top="20%" />
        <FloatingParticle delay={0.5} duration={5} size={4} left="20%" top="60%" />
        <FloatingParticle delay={1} duration={6} size={8} left="80%" top="30%" />
        <FloatingParticle delay={1.5} duration={4.5} size={5} left="70%" top="70%" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-20 flex items-center min-h-screen">
        <div className="w-full animate-fade-in-up">
          {/* Badge - LCP critical, render immediately */}
          <div className="inline-flex items-center bg-green-600/20 backdrop-blur-sm border border-green-300/30 px-4 py-2 rounded-full mb-6">
            <Trophy className="w-5 h-5 mr-2 text-green-300" />
            <span className="text-green-100 font-medium text-xs xs:text-sm md:text-base">
              #1 {t('heroTitle')} • {t('heroSubtitle')}
            </span>
          </div>

          {/* H1 - LCP critical element */}
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xs:mb-6 leading-tight text-white break-words">
            <span className="text-yellow-300">{t('heroTitle')}</span>
            <br />
            <span className="text-green-300">{t('heroSubtitle')}</span>
          </h1>

          {/* H2 for additional location keywords - SEO optimized */}
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-yellow-200">
            {t('locations')}
          </h2>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 xs:mb-8 max-w-3xl">
            <span className="text-yellow-300 font-bold">{t('topperHighlight')}</span> •{t('stats')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 mb-8 xs:mb-12">
            {/* Primary CTA */}
            <div className="transform hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <PremiumButton
                variant="medical"
                size="lg"
                onClick={() => router.push('/demo-booking')}
                className="bg-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl shadow-xl hover:shadow-green-500/30 transition-all duration-300 group text-sm xs:text-base md:text-lg border border-green-400/30"
              >
                <Play className="h-5 xs:h-6 w-5 xs:w-6 group-hover:scale-110 transition-transform" />
                {t('bookDemo')}
              </PremiumButton>
            </div>

            {/* Secondary CTA */}
            <div className="transform hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <PremiumButton
                variant="luxury"
                size="lg"
                onClick={() => router.push('/success-stories')}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg group"
              >
                <Star className="h-5 xs:h-6 w-5 xs:w-6 group-hover:text-yellow-300 transition-colors" />
                {t('seeSuccessStories')}
              </PremiumButton>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mb-6 xs:mb-8">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-green-400/30 hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                <AnimatedCounter value="695" />
              </div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('sadhnasScore')}</div>
              <div className="text-xs text-green-300 mt-0.5">{t('percentile100')}</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-400/30 hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 group-hover:scale-110 transition-transform">
                <AnimatedCounter value="98" suffix="%" />
              </div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('successRate')}</div>
              <div className="text-xs text-yellow-300 mt-0.5">{t('neetQualified')}</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 hover:-translate-y-1 transition-all duration-300 group cursor-default">
              <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                <AnimatedCounter value="2500" suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('students')}</div>
              <div className="text-xs text-purple-300 mt-0.5">{t('andCounting')}</div>
            </div>
          </div>

          {/* Urgency Banner */}
          <div className="inline-flex items-center bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg">
            <Clock className="w-4 xs:w-5 h-4 xs:h-5 mr-2 text-red-300 flex-shrink-0" />
            <span className="text-red-100 text-xs xs:text-sm sm:text-base">
              {t('nextBatchStarting')}: <span className="font-bold">January 15, 2026</span> •{' '}
              {t('onlySeatsLeft')}
            </span>
          </div>

          {/* Early Bird */}
          <div className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-yellow-200">
              <Sparkles className="w-4 xs:w-5 h-4 xs:h-5 animate-pulse" />
              <span className="text-xs xs:text-sm sm:text-base">
                {t('earlyBirdDiscount').replace('{days}', timeLeft.days.toString())}
              </span>
            </div>
            <a
              href="/neet-2026-preparation"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-xs xs:text-sm font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            >
              <GraduationCap className="w-4 h-4" />
              NEET 2026
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
