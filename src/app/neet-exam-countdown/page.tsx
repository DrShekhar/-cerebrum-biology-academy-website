'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Target,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Share2,
  Flame,
  Quote,
  Building2,
  Calculator,
  GraduationCap,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Timer,
  Zap,
  Brain,
  Beaker,
  Atom,
  Leaf,
} from 'lucide-react'

// NEET 2026 Exam Date - May 3, 2026, 2:00 PM IST
const NEET_2026_DATE = new Date('2026-05-03T14:00:00+05:30')
const NEET_2025_DATE = new Date('2025-05-04T14:00:00+05:30') // For progress calculation

// Important Dates
const IMPORTANT_DATES = [
  { event: 'Registration Opens', date: 'Feb 7, 2026', status: 'upcoming' },
  { event: 'Registration Closes', date: 'Mar 7, 2026', status: 'upcoming' },
  { event: 'Correction Window', date: 'Mar 10-15, 2026', status: 'upcoming' },
  { event: 'Admit Card Release', date: 'Apr 30, 2026', status: 'upcoming' },
  { event: 'NEET 2026 Exam', date: 'May 3, 2026', status: 'upcoming' },
  { event: 'Answer Key Release', date: 'May 10, 2026', status: 'upcoming' },
  { event: 'Result Declaration', date: 'June 5, 2026', status: 'upcoming' },
  { event: 'Counselling Begins', date: 'July 2026', status: 'upcoming' },
]

// Topper Quotes
const TOPPER_QUOTES = [
  {
    quote: 'NCERT is your Bible. Read it line by line, word by word. 90% of NEET comes from NCERT.',
    author: 'Tanishka, AIR 1',
    year: '2024',
  },
  {
    quote: 'Consistency beats intensity. 6 hours of focused study daily is better than 12 hours once a week.',
    author: 'Akanksha Singh, AIR 2',
    year: '2023',
  },
  {
    quote: 'Solve previous year questions religiously. Patterns repeat, concepts remain the same.',
    author: 'Karthik Nair, AIR 8',
    year: '2024',
  },
  {
    quote: 'Biology is about understanding, not memorizing. Visualize processes, draw diagrams.',
    author: 'Mrinal Kutteri, AIR 1',
    year: '2021',
  },
  {
    quote: 'Take mock tests seriously. Analyze every mistake. Your errors are your best teachers.',
    author: 'Soyeb Aftab, AIR 1',
    year: '2020',
  },
  {
    quote: 'Focus on weak areas in the morning when your mind is fresh. Revise strong topics at night.',
    author: 'Aman Kumar, AIR 15',
    year: '2024',
  },
]

// Preparation Phases
const PHASES = [
  { name: 'Foundation', minDays: 180, color: 'blue', tip: 'Focus on building strong concepts from NCERT. Complete syllabus coverage.' },
  { name: 'Consolidation', minDays: 90, color: 'purple', tip: 'Solve topic-wise questions. Identify and work on weak areas.' },
  { name: 'Revision', minDays: 30, color: 'orange', tip: 'Intensive revision. Focus on high-weightage topics and formulas.' },
  { name: 'Final Sprint', minDays: 0, color: 'red', tip: 'Mock tests daily. Light revision. Focus on time management and accuracy.' },
]

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export default function NEETExamCountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 })
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(6)
  const [targetScore, setTargetScore] = useState(650)
  const [category, setCategory] = useState('General')
  const [streak, setStreak] = useState(0)
  const [lastStudyDate, setLastStudyDate] = useState<string | null>(null)
  const [studiedToday, setStudiedToday] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  // Calculate time left
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date()
    const difference = NEET_2026_DATE.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    }
  }, [])

  // Load streak from localStorage
  useEffect(() => {
    setMounted(true)
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
        setLastStudyDate(savedLastDate)
      } else if (lastDate.toDateString() === yesterday.toDateString()) {
        setStreak(parseInt(savedStreak))
        setLastStudyDate(savedLastDate)
      } else {
        // Streak broken
        setStreak(0)
        localStorage.setItem('neetStreak', '0')
      }
    }

    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % TOPPER_QUOTES.length)
    }, 10000)

    return () => clearInterval(quoteInterval)
  }, [])

  // Update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  // Mark as studied today
  const markStudied = () => {
    const today = new Date().toDateString()
    const newStreak = streak + 1
    setStreak(newStreak)
    setStudiedToday(true)
    setLastStudyDate(today)
    localStorage.setItem('neetStreak', newStreak.toString())
    localStorage.setItem('neetLastStudyDate', today)
  }

  // Calculate study metrics
  const totalStudyHours = timeLeft.days * studyHoursPerDay
  const biologyHours = Math.round(totalStudyHours * 0.5) // 50% for Biology (90 questions)
  const physicsHours = Math.round(totalStudyHours * 0.25) // 25% for Physics (45 questions)
  const chemistryHours = Math.round(totalStudyHours * 0.25) // 25% for Chemistry (45 questions)

  // Calculate preparation progress
  const totalPrepDays = Math.floor((NEET_2026_DATE.getTime() - NEET_2025_DATE.getTime()) / (1000 * 60 * 60 * 24))
  const daysPassed = totalPrepDays - timeLeft.days
  const progressPercent = Math.min(100, Math.max(0, Math.round((daysPassed / totalPrepDays) * 100)))

  // Get current phase
  const getCurrentPhase = () => {
    for (const phase of PHASES) {
      if (timeLeft.days >= phase.minDays) {
        return phase
      }
    }
    return PHASES[PHASES.length - 1]
  }

  const currentPhase = getCurrentPhase()

  // Get recommended cutoff based on target and category
  const getRecommendedCutoff = () => {
    const cutoffs: Record<string, Record<number, string>> = {
      General: { 600: 'Top 50,000', 650: 'Top 15,000', 700: 'Top 1,000' },
      'OBC-NCL': { 600: 'Top 70,000', 650: 'Top 25,000', 700: 'Top 3,000' },
      SC: { 600: 'Top 1,00,000', 650: 'Top 50,000', 700: 'Top 10,000' },
      ST: { 600: 'Top 1,20,000', 650: 'Top 70,000', 700: 'Top 20,000' },
      EWS: { 600: 'Top 60,000', 650: 'Top 20,000', 700: 'Top 2,000' },
    }
    return cutoffs[category]?.[targetScore] || 'Top 50,000'
  }

  // Toast state for share feedback
  const [showToast, setShowToast] = useState(false)

  // Share function
  const shareCountdown = () => {
    const text = `Only ${timeLeft.days} days left for NEET 2026! I'm preparing with Cerebrum Biology Academy. Check your countdown: cerebrumbiologyacademy.com/neet-exam-countdown`
    if (navigator.share) {
      navigator.share({ title: 'NEET 2026 Countdown', text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  // Check if exam day or past
  const isExamDay = timeLeft.days === 0 && timeLeft.hours <= 24
  const isExamOver = timeLeft.total <= 0

  // FAQ Data
  const faqs = [
    {
      q: 'When is NEET 2026 exam date?',
      a: 'NEET 2026 is expected to be held on May 3, 2026 (first Sunday of May), from 2:00 PM to 5:20 PM. The official date will be confirmed by NTA in their notification.',
    },
    {
      q: 'What is the NEET 2026 exam pattern?',
      a: 'NEET 2026 will have 200 questions (180 to attempt) from Physics (45), Chemistry (45), and Biology (90). Each correct answer gives +4 marks, wrong answer -1 mark. Total marks: 720.',
    },
    {
      q: 'How many hours should I study daily for NEET?',
      a: 'Ideally 6-8 hours of focused study daily. Quality matters more than quantity. Include breaks using the Pomodoro technique. Consistency is key.',
    },
    {
      q: 'Is NCERT enough for NEET 2026?',
      a: 'NCERT covers 90%+ of NEET Biology syllabus. For Physics and Chemistry, NCERT is essential but you may need additional practice from reference books like HC Verma, MS Chouhan.',
    },
    {
      q: 'When will NEET 2026 registration start?',
      a: 'NEET 2026 registration is expected to start in the first week of February 2026. The window usually remains open for about one month.',
    },
  ]

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading countdown...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'NEET 2026 Exam Countdown Timer',
            description:
              'Live countdown to NEET 2026 exam with study planner, progress tracker, and preparation tips. Track days left for NEET UG 2026.',
            url: 'https://www.cerebrumbiologyacademy.com/neet-exam-countdown',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-pulse rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Countdown copied to clipboard!</span>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50">
        {/* Hero Section - Main Countdown */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 pb-16 pt-12 text-white md:pb-24 md:pt-20">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 animate-pulse rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 animate-pulse rounded-full bg-white/5" style={{ animationDelay: '1s' }} />
            <div className="absolute right-1/4 top-1/3 h-32 w-32 animate-bounce rounded-full bg-white/5" style={{ animationDelay: '2s', animationDuration: '3s' }} />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-indigo-200">
              <Link href="/" className="hover:text-white hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/neet-tools" className="hover:text-white hover:underline">NEET Tools</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Exam Countdown</span>
            </nav>

            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Timer className="h-4 w-4" />
                Live Countdown to NEET 2026
              </div>

              <h1 className="mb-6 text-3xl font-bold md:text-5xl lg:text-6xl">
                NEET 2026 Exam Countdown
              </h1>

              {/* Main Countdown Display */}
              <div className="mx-auto mb-8 grid max-w-4xl grid-cols-4 gap-3 md:gap-6">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm md:p-6">
                    <div className="text-4xl font-bold tabular-nums md:text-6xl lg:text-7xl">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="mt-1 text-sm font-medium text-indigo-200 md:text-base">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Exam Date Info */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <Calendar className="h-4 w-4" />
                  <span>May 3, 2026</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <Clock className="h-4 w-4" />
                  <span>2:00 PM - 5:20 PM</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                  <FileText className="h-4 w-4" />
                  <span>Pen & Paper Mode</span>
                </div>
              </div>

              {/* Share Button */}
              <button
                onClick={shareCountdown}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50 hover:shadow-lg"
              >
                <Share2 className="h-5 w-5" />
                Share Countdown
              </button>
            </div>
          </div>
        </section>

        {/* Preparation Phase Indicator */}
        <section className="relative -mt-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className={`rounded-2xl bg-gradient-to-r ${
              currentPhase.color === 'blue' ? 'from-blue-500 to-blue-600' :
              currentPhase.color === 'purple' ? 'from-purple-500 to-purple-600' :
              currentPhase.color === 'orange' ? 'from-orange-500 to-orange-600' :
              'from-red-500 to-red-600'
            } p-6 text-white shadow-xl`}>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                    <Zap className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">Current Preparation Phase</p>
                    <h3 className="text-2xl font-bold">{currentPhase.name} Phase</h3>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="max-w-md text-sm text-white/90">{currentPhase.tip}</p>
                </div>
              </div>

              {/* Phase Progress */}
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  {PHASES.map((phase, idx) => (
                    <span key={phase.name} className={phase.name === currentPhase.name ? 'font-bold' : 'text-white/60'}>
                      {phase.name}
                    </span>
                  ))}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-sm text-white/80">
                  {progressPercent}% of preparation journey completed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates Timeline */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              NEET 2026 Important Dates
            </h2>
            <p className="mb-8 text-center text-sm text-gray-500">
              <AlertCircle className="mr-1 inline-block h-4 w-4" />
              Tentative dates based on previous years. Official dates will be announced by NTA.
            </p>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-blue-500 md:left-1/2 md:block" />

              <div className="space-y-4 md:space-y-0">
                {IMPORTANT_DATES.map((item, idx) => (
                  <div key={item.event} className={`relative flex items-center gap-4 md:justify-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md md:w-5/12 ${item.event === 'NEET 2026 Exam' ? 'border-indigo-300 bg-indigo-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.event === 'NEET 2026 Exam' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${item.event === 'NEET 2026 Exam' ? 'text-indigo-900' : 'text-gray-900'}`}>
                            {item.event}
                          </h3>
                          <p className="text-sm text-gray-600">{item.date}</p>
                        </div>
                      </div>
                    </div>
                    {/* Timeline Dot */}
                    <div className={`absolute left-4 hidden h-4 w-4 rounded-full border-4 border-white md:left-1/2 md:block md:-translate-x-1/2 ${item.event === 'NEET 2026 Exam' ? 'bg-indigo-600' : 'bg-purple-500'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Study Calculator + Quick Stats */}
        <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Study Time Calculator */}
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Study Time Calculator</h3>
                    <p className="text-sm text-gray-600">Plan your preparation hours</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Hours you can study per day
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="2"
                      max="12"
                      value={studyHoursPerDay}
                      onChange={(e) => setStudyHoursPerDay(parseInt(e.target.value))}
                      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-200 accent-blue-600"
                      aria-label="Study hours per day"
                      aria-valuemin={2}
                      aria-valuemax={12}
                      aria-valuenow={studyHoursPerDay}
                    />
                    <span className="w-16 rounded-lg bg-blue-600 px-3 py-2 text-center font-bold text-white">
                      {studyHoursPerDay}h
                    </span>
                  </div>
                </div>

                <div className="space-y-3 rounded-xl bg-white p-4">
                  {isExamOver ? (
                    <div className="text-center py-4">
                      <Award className="mx-auto h-12 w-12 text-green-600 mb-2" />
                      <p className="text-xl font-bold text-gray-900">NEET 2026 Completed!</p>
                      <p className="text-sm text-gray-600">Hope you did your best!</p>
                    </div>
                  ) : isExamDay ? (
                    <div className="text-center py-4">
                      <Sparkles className="mx-auto h-12 w-12 text-indigo-600 mb-2 animate-pulse" />
                      <p className="text-xl font-bold text-gray-900">Exam Day!</p>
                      <p className="text-sm text-gray-600">All the best! You&apos;ve prepared well.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <span className="font-medium text-gray-700">Total Hours Remaining</span>
                        <span className="text-2xl font-bold text-blue-600">{totalStudyHours.toLocaleString()}h</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-600" />
                          <span className="text-gray-600">Biology (50%)</span>
                        </div>
                        <span className="font-semibold text-green-600">{biologyHours}h</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <Atom className="h-5 w-5 text-purple-600" />
                          <span className="text-gray-600">Physics (25%)</span>
                        </div>
                        <span className="font-semibold text-purple-600">{physicsHours}h</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <Beaker className="h-5 w-5 text-orange-600" />
                          <span className="text-gray-600">Chemistry (25%)</span>
                        </div>
                        <span className="font-semibold text-orange-600">{chemistryHours}h</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">NEET 2026 Quick Stats</h3>
                    <p className="text-sm text-gray-600">Exam pattern at a glance</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-purple-600">180</div>
                    <div className="text-sm text-gray-600">Total Questions</div>
                    <div className="mt-1 text-xs text-gray-400">(45 per subject)</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-purple-600">720</div>
                    <div className="text-sm text-gray-600">Total Marks</div>
                    <div className="mt-1 text-xs text-gray-400">(+4 per correct)</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-purple-600">3:20</div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="mt-1 text-xs text-gray-400">(3 hours 20 min)</div>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-red-500">-1</div>
                    <div className="text-sm text-gray-600">Negative Marking</div>
                    <div className="mt-1 text-xs text-gray-400">(per wrong answer)</div>
                  </div>
                </div>

                {/* Subject Distribution */}
                <div className="mt-6 rounded-xl bg-white p-4 shadow-sm">
                  <h4 className="mb-3 font-semibold text-gray-800">Question Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        Biology (Botany + Zoology)
                      </span>
                      <span className="font-semibold">90 Q (360 marks)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                        Physics
                      </span>
                      <span className="font-semibold">45 Q (180 marks)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="h-3 w-3 rounded-full bg-orange-500"></span>
                        Chemistry
                      </span>
                      <span className="font-semibold">45 Q (180 marks)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personalization + Streak Tracker */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Personalization */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Your Target</h3>
                    <p className="text-sm text-gray-600">Set your goal and track progress</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Target Score</label>
                    <div className="flex gap-2">
                      {[600, 650, 700].map((score) => (
                        <button
                          key={score}
                          onClick={() => setTargetScore(score)}
                          className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-all ${
                            targetScore === score
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {score}+
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    >
                      <option value="General">General</option>
                      <option value="EWS">EWS</option>
                      <option value="OBC-NCL">OBC-NCL</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>

                  <div className="rounded-xl bg-green-50 p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <Award className="h-5 w-5" />
                      <span className="font-semibold">Expected Rank Range</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-green-600">{getRecommendedCutoff()}</p>
                    <p className="mt-1 text-sm text-green-700">
                      With {targetScore}+ marks in {category} category
                    </p>
                  </div>
                </div>
              </div>

              {/* Daily Streak Tracker */}
              <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-orange-50 to-red-50 p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600 text-white">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Study Streak</h3>
                    <p className="text-sm text-gray-600">Build consistency, build success</p>
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <div className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
                    <div>
                      <Flame className="mx-auto h-8 w-8" />
                      <div className="text-4xl font-bold">{streak}</div>
                      <div className="text-xs">day streak</div>
                    </div>
                  </div>
                </div>

                {studiedToday ? (
                  <div className="rounded-xl bg-green-100 p-4 text-center">
                    <CheckCircle className="mx-auto h-8 w-8 text-green-600" />
                    <p className="mt-2 font-semibold text-green-800">Great job! You studied today!</p>
                    <p className="text-sm text-green-600">Come back tomorrow to extend your streak</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="mb-4 text-gray-600">Did you study today?</p>
                    <button
                      onClick={markStudied}
                      className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 font-semibold text-white transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-lg"
                    >
                      Yes, I Studied Today!
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Topper Quote */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto mb-4 h-12 w-12 text-white/50" />
            <blockquote className="mb-4 text-xl font-medium md:text-2xl">
              &ldquo;{TOPPER_QUOTES[currentQuote].quote}&rdquo;
            </blockquote>
            <cite className="text-indigo-200">
              — {TOPPER_QUOTES[currentQuote].author}, NEET {TOPPER_QUOTES[currentQuote].year}
            </cite>
            <div className="mt-6 flex justify-center gap-2">
              {TOPPER_QUOTES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentQuote(idx)}
                  className={`h-2 w-2 rounded-full transition-all ${idx === currentQuote ? 'w-6 bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tool Integration */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              More NEET Tools
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600">
              Complete your preparation with our other free tools
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/neet-college-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                  College Predictor
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Find medical colleges based on your expected rank. 470+ colleges database.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Try Now <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/neet-rank-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-orange-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600">
                  Rank Predictor
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Predict your All India Rank based on expected score with accuracy.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600">
                  Try Now <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <Link
                href="/neet-study-plan-generator"
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-green-600">
                  Study Plan Generator
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Get personalized week-by-week study schedule for NEET Biology.
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                  Try Now <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFaq === idx && (
                    <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Start Your NEET 2026 Journey Today</h2>
            <p className="mb-8 text-lg text-indigo-100">
              Every day counts. Begin your preparation with Cerebrum Biology Academy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-indigo-600 transition-all hover:bg-indigo-50 hover:shadow-lg"
              >
                <GraduationCap className="h-5 w-5" />
                Join Our Course
              </Link>
              <Link
                href="/neet-tools"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white/10"
              >
                Explore All Tools
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
