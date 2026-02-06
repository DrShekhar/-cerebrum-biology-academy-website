'use client'

import { useEffect, useState, memo } from 'react'
// PERFORMANCE: Inline SVGs instead of lucide-react to reduce JS bundle (~50KB)
const StarIcon = () => (
  <svg className="h-5 xs:h-6 w-5 xs:w-6 group-hover:text-yellow-300 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 xs:w-5 h-4 xs:h-5 mr-2 text-red-300 flex-shrink-0"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 xs:w-5 h-4 xs:h-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)
const GraduationCapIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
)
const MessageCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-5 xs:h-6 w-5 xs:w-6 text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)
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
    <div className="flex items-center space-x-1 xs:space-x-2 font-mono">
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

  // PERFORMANCE: Update every 60s instead of 1s to reduce re-renders and INP
  // Seconds display removed — showing d:h:m is sufficient for a multi-day countdown
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now()
      const difference = targetTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: 0,
        })
      }
    }

    const intervalId = setInterval(updateCountdown, 60000)
    return () => clearInterval(intervalId)
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
          <MessageCircleIcon className="h-5 xs:h-6 w-5 xs:w-6 text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0" />
          <span className="text-[#25D366]">Chat on WhatsApp</span>
        </button>

        <a
          href="/success-stories"
          className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 xs:py-4 px-5 xs:px-6 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg border border-white/30 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98] group"
        >
          <StarIcon />
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
        <div className="text-center bg-white/5 rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
            695
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('sadhnasScore')}</div>
          <div className="text-xs text-green-300 mt-0.5">{t('percentile100')}</div>
        </div>
        <div className="text-center bg-white/5 rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
            98%
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('successRate')}</div>
          <div className="text-xs text-yellow-300 mt-0.5">{t('neetQualified')}</div>
        </div>
        <div className="text-center bg-white/5 rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">
            2500+
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">{t('students')}</div>
          <div className="text-xs text-purple-300 mt-0.5">{t('andCounting')}</div>
        </div>
      </div>

      <div
        className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 bg-red-500/20 border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg animate-fade-in-up"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="flex items-center">
          <ClockIcon />
          <span className="text-red-100 text-xs xs:text-sm sm:text-base">
            {t('nextBatchStarting')}:
          </span>
        </div>
        <CountdownDisplay timeLeft={timeLeft} />
        <span className="text-yellow-300 font-bold text-xs xs:text-sm">• Only 12 seats left!</span>
      </div>

      <div
        className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-up"
        style={{ animationDelay: '0.6s' }}
      >
        <div className="flex items-center space-x-2 text-yellow-200">
          <SparklesIcon className="w-4 xs:w-5 h-4 xs:h-5" />
          <span className="text-xs xs:text-sm sm:text-base">
            {t('earlyBirdDiscount').replace('{days}', timeLeft.days.toString())}
          </span>
        </div>
        <a
          href="/neet-2026-preparation"
          className="inline-flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white text-xs xs:text-sm font-bold px-4 py-2.5 min-h-[40px] rounded-full shadow-lg hover:shadow-orange-600/30 transition-all duration-300"
        >
          <GraduationCapIcon className="w-4 h-4" />
          NEET 2026
        </a>
      </div>
    </>
  )
}
