'use client'

import { useEffect, useState, useRef, memo } from 'react'
import { Star, Clock, Sparkles, GraduationCap, MessageCircle } from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

const STATIC_STRINGS = {
  sadhnasScore: "Sadhna's Score",
  percentile100: '100 Percentile',
  successRate: 'Success Rate',
  neetQualified: 'NEET Qualified',
  students: 'Students',
  andCounting: 'and Counting',
  nextBatchStarting: 'Next Batch Starting',
  earlyBirdDiscount: 'Early Bird: Save ₹5,000 (ends in {days} days)',
}

function useI18nLazy() {
  const t = (key: string) => STATIC_STRINGS[key as keyof typeof STATIC_STRINGS] || key
  return { t }
}

const TARGET_DATE = new Date('2026-05-04T00:00:00').getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownDisplay = memo(function CountdownDisplay({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
    <div
      className="flex items-center space-x-1 xs:space-x-2 font-mono"
      style={{ willChange: 'contents' }}
    >
      <div className="bg-white/20 px-2 py-1 rounded text-center">
        <span className="text-white font-bold text-sm xs:text-base">{timeLeft.days}</span>
        <span className="text-red-200 text-xs ml-0.5">d</span>
      </div>
      <span className="text-red-200">:</span>
      <div className="bg-white/20 px-2 py-1 rounded text-center">
        <span className="text-white font-bold text-sm xs:text-base">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-red-200 text-xs ml-0.5">h</span>
      </div>
      <span className="text-red-200">:</span>
      <div className="bg-white/20 px-2 py-1 rounded text-center">
        <span className="text-white font-bold text-sm xs:text-base">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-red-200 text-xs ml-0.5">m</span>
      </div>
      <span className="text-red-200">:</span>
      <div className="bg-white/20 px-2 py-1 rounded text-center min-w-[40px]">
        <span className="text-white font-bold text-sm xs:text-base">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-red-200 text-xs ml-0.5">s</span>
      </div>
    </div>
  )
})

function useCountdown(targetTime: number): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const now = Date.now()
    const difference = targetTime - now
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  })

  const rafIdRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    const updateCountdown = (timestamp: number) => {
      if (timestamp - lastUpdateRef.current >= 1000 || lastUpdateRef.current === 0) {
        lastUpdateRef.current = timestamp

        const now = Date.now()
        const difference = targetTime - now

        if (difference > 0) {
          const newTimeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          }

          setTimeLeft((prev) => {
            if (
              prev.days !== newTimeLeft.days ||
              prev.hours !== newTimeLeft.hours ||
              prev.minutes !== newTimeLeft.minutes ||
              prev.seconds !== newTimeLeft.seconds
            ) {
              return newTimeLeft
            }
            return prev
          })
        }
      }

      rafIdRef.current = requestAnimationFrame(updateCountdown)
    }

    rafIdRef.current = requestAnimationFrame(updateCountdown)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [targetTime])

  return timeLeft
}

export function HeroClientInteractive() {
  const { t } = useI18nLazy()
  const timeLeft = useCountdown(TARGET_DATE)

  return (
    <>
      <div
        className="flex flex-col sm:flex-row space-y-3 xs:space-y-4 sm:space-y-0 sm:space-x-4 mb-4 animate-fade-in-up"
        style={{ animationDelay: '0.3s' }}
      >
        <button
          onClick={() =>
            trackAndOpenWhatsApp({
              source: 'hero-cta-secondary',
              message: WHATSAPP_MESSAGES.enquiry,
              campaign: 'homepage-hero',
            })
          }
          className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#25D366]/20 text-white font-bold py-3 xs:py-4 px-5 xs:px-6 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg border-2 border-[#25D366] hover:border-[#20BD5A] hover:scale-[1.02] active:scale-[0.98] group"
        >
          <MessageCircle className="h-5 xs:h-6 w-5 xs:w-6 text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="text-[#25D366]">Chat on WhatsApp</span>
        </button>

        <a
          href="/success-stories"
          className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 xs:py-4 px-5 xs:px-6 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg border border-white/30 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <Star className="h-5 xs:h-6 w-5 xs:w-6 group-hover:text-yellow-300 transition-colors flex-shrink-0" />
          Success Stories
        </a>
      </div>

      <div
        className="flex items-center space-x-2 mb-8 xs:mb-12 animate-fade-in-up"
        style={{ animationDelay: '0.35s' }}
      >
        <div className="flex -space-x-2">
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">
            R
          </div>
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">
            +
          </div>
        </div>
        <span className="text-blue-100 text-xs xs:text-sm">
          <span className="text-green-300 font-semibold">127+ students</span> booked demos this week
        </span>
      </div>

      <div
        className="grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mb-6 xs:mb-8 animate-fade-in-up"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-green-400/30 hover:-translate-y-1 transition-all duration-300 group cursor-default">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 group-hover:scale-110 transition-transform">
            695
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('sadhnasScore')}</div>
          <div className="text-xs text-green-300 mt-0.5">{t('percentile100')}</div>
        </div>
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-yellow-400/30 hover:-translate-y-1 transition-all duration-300 group cursor-default">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 group-hover:scale-110 transition-transform">
            98%
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('successRate')}</div>
          <div className="text-xs text-yellow-300 mt-0.5">{t('neetQualified')}</div>
        </div>
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10 hover:bg-white/10 hover:border-purple-400/30 hover:-translate-y-1 transition-all duration-300 group cursor-default">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
            2500+
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('students')}</div>
          <div className="text-xs text-purple-300 mt-0.5">{t('andCounting')}</div>
        </div>
      </div>

      <div
        className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg animate-fade-in-up animate-pulse-slow"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="flex items-center">
          <Clock className="w-4 xs:w-5 h-4 xs:h-5 mr-2 text-red-300 flex-shrink-0" />
          <span className="text-red-100 text-xs xs:text-sm sm:text-base">
            {t('nextBatchStarting')}:
          </span>
        </div>
        <CountdownDisplay timeLeft={timeLeft} />
        <span className="text-yellow-300 font-bold text-xs xs:text-sm animate-pulse">
          • Only 12 seats left!
        </span>
      </div>

      <div
        className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-up"
        style={{ animationDelay: '0.6s' }}
      >
        <div className="flex items-center space-x-2 text-yellow-200">
          <Sparkles className="w-4 xs:w-5 h-4 xs:h-5 animate-pulse" />
          <span className="text-xs xs:text-sm sm:text-base">
            {t('earlyBirdDiscount').replace('{days}', timeLeft.days.toString())}
          </span>
        </div>
        <a
          href="/neet-2026-preparation"
          className="inline-flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white text-xs xs:text-sm font-bold px-4 py-2.5 min-h-[40px] rounded-full shadow-lg hover:shadow-orange-600/30 transition-all duration-300"
        >
          <GraduationCap className="w-4 h-4" />
          NEET 2026
        </a>
      </div>
    </>
  )
}
