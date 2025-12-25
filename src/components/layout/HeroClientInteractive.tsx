'use client'

import { useEffect, useState, memo } from 'react'
import {
  Play,
  Star,
  Clock,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'

const AnimatedCounter = memo(({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (hasAnimated) return
    setHasAnimated(true)

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const duration = 1500
    const steps = 30
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

export function HeroClientInteractive() {
  const { t } = useI18n()

  const [timeLeft, setTimeLeft] = useState({
    days: 82,
    hours: 15,
    minutes: 42,
    seconds: 30,
  })

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
    <>
      {/* CTAs - Using <a> tags (work before JS loads), animated after LCP */}
      <div
        className="flex flex-col sm:flex-row gap-3 xs:gap-4 mb-8 xs:mb-12 animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        <a
          href="/demo-booking"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-sm xs:text-base md:text-lg border border-green-400/30 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Play className="h-5 xs:h-6 w-5 xs:w-6 group-hover:scale-110 transition-transform" />
          {t('bookDemo')}
        </a>

        <a
          href="/success-stories"
          className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Star className="h-5 xs:h-6 w-5 xs:w-6 group-hover:text-yellow-300 transition-colors" />
          {t('seeSuccessStories')}
        </a>
      </div>

      {/* Stats Grid with Animated Counters - delayed animation */}
      <div
        className="grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mb-6 xs:mb-8 animate-fade-in-up"
        style={{ animationDelay: '0.4s' }}
      >
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

      {/* Urgency Banner - delayed animation */}
      <div
        className="inline-flex items-center bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg animate-fade-in-up"
        style={{ animationDelay: '0.5s' }}
      >
        <Clock className="w-4 xs:w-5 h-4 xs:h-5 mr-2 text-red-300 flex-shrink-0" />
        <span className="text-red-100 text-xs xs:text-sm sm:text-base">
          {t('nextBatchStarting')}: <span className="font-bold">January 15, 2026</span> •{' '}
          {t('onlySeatsLeft')}
        </span>
      </div>

      {/* Early Bird - delayed animation */}
      <div
        className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up"
        style={{ animationDelay: '0.6s' }}
      >
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
    </>
  )
}
