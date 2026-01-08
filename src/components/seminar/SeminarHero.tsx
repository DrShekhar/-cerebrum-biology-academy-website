'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Star } from 'lucide-react'
import {
  SEMINAR_CONFIG,
  getNextSeminarDate,
  formatSeminarDate,
} from '@/lib/seminar/config'
import { SeminarCountdown } from './SeminarCountdown'

interface SeminarHeroProps {
  /** Number of registered parents (from database) */
  registeredCount?: number
  /** Average rating */
  rating?: number
  /** Number of reviews */
  reviewCount?: number
  /** Callback when register button is clicked */
  onRegisterClick?: () => void
}

export function SeminarHero({
  registeredCount = 0,
  rating = 4.9,
  reviewCount = 500,
  onRegisterClick,
}: SeminarHeroProps) {
  const [nextDate, setNextDate] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setNextDate(getNextSeminarDate())
  }, [])

  const handleRegisterClick = () => {
    if (onRegisterClick) {
      onRegisterClick()
    } else {
      // Scroll to registration form
      document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🎓</span>
            <span>NEET 2025-26 Parents Exclusive</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {SEMINAR_CONFIG.title}
          </h1>

          {/* Hindi Subheadline */}
          <p className="text-xl md:text-2xl text-yellow-400 font-semibold mb-4">
            "क्या आपके बच्चे में NEET क्रैक करने की क्षमता है?"
          </p>

          {/* English Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            {SEMINAR_CONFIG.description}
          </p>

          {/* Session Details */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-slate-300 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              <span>Every Friday</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span>8:00 PM IST</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">⏱️</span>
              <span>{SEMINAR_CONFIG.duration} Minutes</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <p className="text-sm text-slate-400 mb-3">NEXT SESSION STARTS IN:</p>
            <SeminarCountdown targetDate={nextDate || undefined} size="lg" />
            {mounted && nextDate && (
              <p className="text-sm text-slate-400 mt-3">
                📅 {formatSeminarDate(nextDate)}
              </p>
            )}
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white font-semibold">
                {registeredCount > 0 ? registeredCount.toLocaleString() : '200+'}
              </span>
              <span className="text-slate-300">Parents Registered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-semibold">{rating}/5</span>
              <span className="text-slate-300">({reviewCount}+ reviews)</span>
            </div>
          </div>

          {/* Urgency + CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
              <span className="text-2xl">🪑</span>
              <span className="font-semibold">
                Only {SEMINAR_CONFIG.maxSeatsPerSession} Seats Per Session
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-slate-300">Registration Fee:</span>
              <span className="text-2xl md:text-3xl font-bold text-green-400">
                {SEMINAR_CONFIG.pricing.currencySymbol}
                {SEMINAR_CONFIG.pricing.standard}
              </span>
              <span className="text-slate-500 line-through">
                {SEMINAR_CONFIG.pricing.currencySymbol}499
              </span>
            </div>

            <button
              onClick={handleRegisterClick}
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold text-lg md:text-xl py-4 px-8 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-yellow-400/30"
            >
              🎯 Register Now - Book Your Seat
            </button>

            <p className="mt-4 text-sm text-slate-400">
              ✅ Recording sent to all registrants • ✅ Live Q&A included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeminarHero
