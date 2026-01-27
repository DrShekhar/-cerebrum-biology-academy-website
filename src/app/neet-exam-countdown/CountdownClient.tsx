'use client'

import { useState, useEffect, useCallback } from 'react'
import { Share2, CheckCircle, Flame } from 'lucide-react'
import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-dm-sans',
})

const NEET_EXAM_DATES: Record<number, Date> = {
  2026: new Date('2026-05-03T14:00:00+05:30'),
  2027: new Date('2027-05-02T14:00:00+05:30'),
  2028: new Date('2028-05-07T14:00:00+05:30'),
  2029: new Date('2029-05-06T14:00:00+05:30'),
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export function CountdownClient() {
  const [selectedYear] = useState(2026)
  const [showToast, setShowToast] = useState(false)
  const [streak, setStreak] = useState(0)
  const [studiedToday, setStudiedToday] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date()
    const targetDate = NEET_EXAM_DATES[selectedYear]
    const difference = targetDate.getTime() - now.getTime()
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    }
  }, [selectedYear])

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft())

    // Load streak from localStorage
    const savedStreak = localStorage.getItem('neetStreak')
    const savedLastDate = localStorage.getItem('neetLastStudyDate')
    const today = new Date().toDateString()

    if (savedStreak && savedLastDate) {
      const lastDate = new Date(savedLastDate)
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      if (savedLastDate === today) {
        setStreak(parseInt(savedStreak))
        setStudiedToday(true)
      } else if (lastDate.toDateString() === yesterday.toDateString()) {
        setStreak(parseInt(savedStreak))
      } else {
        setStreak(0)
        localStorage.setItem('neetStreak', '0')
      }
    }
  }, [calculateTimeLeft])

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const markStudied = () => {
    const today = new Date().toDateString()
    const newStreak = streak + 1
    setStreak(newStreak)
    setStudiedToday(true)
    localStorage.setItem('neetStreak', newStreak.toString())
    localStorage.setItem('neetLastStudyDate', today)
  }

  const shareCountdown = () => {
    const text = `Only ${timeLeft.days} days left for NEET ${selectedYear}! Check your countdown: cerebrumbiologyacademy.com/neet-exam-countdown`
    if (navigator.share) {
      navigator.share({ title: `NEET ${selectedYear} Countdown`, text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  // Server-side placeholder values (will be replaced on client)
  const displayTime = mounted ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="fixed right-4 top-20 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-white shadow-lg">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Copied to clipboard!</span>
        </div>
      )}

      {/* Countdown Cards */}
      <div className="mx-auto mb-8 grid max-w-3xl grid-cols-4 gap-2 sm:gap-4">
        {[
          { value: displayTime.days, label: 'Days', color: 'text-red-500', borderColor: 'border-t-red-500' },
          { value: displayTime.hours, label: 'Hours', color: 'text-blue-500', borderColor: 'border-t-blue-500' },
          { value: displayTime.minutes, label: 'Minutes', color: 'text-amber-500', borderColor: 'border-t-amber-500' },
          { value: displayTime.seconds, label: 'Seconds', color: 'text-green-500', borderColor: 'border-t-green-500' },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl bg-white border border-gray-100 shadow-sm px-2 py-4 sm:p-4 md:p-6 border-t-4 ${item.borderColor}`}
          >
            <div
              className={`${dmSans.className} text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl tabular-nums`}
            >
              {item.value.toString().padStart(2, '0')}
            </div>
            <div className={`mt-1 text-xs font-semibold uppercase tracking-wide ${item.color} md:text-sm`}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={shareCountdown}
          className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-600 transition-colors"
        >
          <Share2 className="h-4 w-4" />
          Share Countdown
        </button>

        {/* Study Streak Button */}
        {studiedToday ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 text-sm font-medium text-green-700">
            <CheckCircle className="h-4 w-4" />
            Studied Today! ({streak} day streak)
          </div>
        ) : (
          <button
            onClick={markStudied}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-amber-600 transition-colors"
          >
            <Flame className="h-4 w-4" />
            Mark Today as Studied ({streak} days)
          </button>
        )}
      </div>
    </>
  )
}
