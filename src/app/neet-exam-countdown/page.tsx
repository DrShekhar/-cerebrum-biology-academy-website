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
  Timer,
  Leaf,
  Beaker,
  Atom,
  Star,
  Rocket,
  Trophy,
} from 'lucide-react'

// NEET Exam Dates - First Sunday of May each year, 2:00 PM IST
const NEET_EXAM_DATES: Record<number, Date> = {
  2026: new Date('2026-05-03T14:00:00+05:30'),
  2027: new Date('2027-05-02T14:00:00+05:30'),
  2028: new Date('2028-05-07T14:00:00+05:30'),
  2029: new Date('2029-05-06T14:00:00+05:30'),
}

const AVAILABLE_YEARS = [2026, 2027, 2028, 2029]

const getDefaultYear = (): number => {
  const now = new Date()
  for (const year of AVAILABLE_YEARS) {
    if (NEET_EXAM_DATES[year].getTime() > now.getTime()) {
      return year
    }
  }
  return AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1]
}

// Important Dates with solid colors
const getImportantDates = (year: number) => {
  const examDate = NEET_EXAM_DATES[year]
  const examDay = examDate.getDate()
  const examMonth = examDate.toLocaleDateString('en-US', { month: 'short' })

  return [
    { event: 'Registration Opens', date: `Feb 7, ${year}`, icon: FileText, color: 'bg-blue-500' },
    { event: 'Registration Closes', date: `Mar 7, ${year}`, icon: Clock, color: 'bg-amber-500' },
    {
      event: 'Correction Window',
      date: `Mar 10-15, ${year}`,
      icon: FileText,
      color: 'bg-blue-500',
    },
    { event: 'Admit Card Release', date: `Apr 30, ${year}`, icon: Award, color: 'bg-green-500' },
    {
      event: `NEET ${year} Exam`,
      date: `${examMonth} ${examDay}, ${year}`,
      icon: Star,
      color: 'bg-red-500',
    },
    {
      event: 'Answer Key Release',
      date: `May 10, ${year}`,
      icon: CheckCircle,
      color: 'bg-amber-500',
    },
    { event: 'Result Declaration', date: `June 5, ${year}`, icon: Trophy, color: 'bg-green-500' },
    {
      event: 'Counselling Begins',
      date: `July ${year}`,
      icon: GraduationCap,
      color: 'bg-blue-500',
    },
  ]
}

// Topper Quotes
const TOPPER_QUOTES = [
  {
    quote: 'NCERT is your Bible. Read it line by line, word by word. 90% of NEET comes from NCERT.',
    author: 'Tanishka, AIR 1',
    year: '2024',
  },
  {
    quote:
      'Consistency beats intensity. 6 hours of focused study daily is better than 12 hours once a week.',
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
]

// Preparation Phases
const PHASES = [
  {
    name: 'Foundation',
    minDays: 180,
    tip: 'Focus on building strong concepts from NCERT. Complete syllabus coverage.',
  },
  {
    name: 'Consolidation',
    minDays: 90,
    tip: 'Solve topic-wise questions. Identify and work on weak areas.',
  },
  {
    name: 'Revision',
    minDays: 30,
    tip: 'Intensive revision. Focus on high-weightage topics and formulas.',
  },
  {
    name: 'Final Sprint',
    minDays: 0,
    tip: 'Mock tests daily. Light revision. Focus on time management.',
  },
]

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

export default function NEETExamCountdownPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  })
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(6)
  const [targetScore, setTargetScore] = useState(650)
  const [category, setCategory] = useState('General')
  const [streak, setStreak] = useState(0)
  const [studiedToday, setStudiedToday] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(getDefaultYear())
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)

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
    const savedYear = localStorage.getItem('neetCountdownYear')
    if (savedYear) {
      const year = parseInt(savedYear)
      if (AVAILABLE_YEARS.includes(year)) setSelectedYear(year)
    }

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

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % TOPPER_QUOTES.length)
    }, 10000)

    return () => clearInterval(quoteInterval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    setTimeLeft(calculateTimeLeft())
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  const changeYear = (year: number) => {
    setSelectedYear(year)
    setIsYearDropdownOpen(false)
    localStorage.setItem('neetCountdownYear', year.toString())
  }

  const markStudied = () => {
    const today = new Date().toDateString()
    const newStreak = streak + 1
    setStreak(newStreak)
    setStudiedToday(true)
    localStorage.setItem('neetStreak', newStreak.toString())
    localStorage.setItem('neetLastStudyDate', today)
  }

  const totalStudyHours = timeLeft.days * studyHoursPerDay
  const biologyHours = Math.round(totalStudyHours * 0.5)
  const physicsHours = Math.round(totalStudyHours * 0.25)
  const chemistryHours = Math.round(totalStudyHours * 0.25)

  const getPreviousYearDate = () => {
    const prevYear = selectedYear - 1
    if (NEET_EXAM_DATES[prevYear]) return NEET_EXAM_DATES[prevYear]
    return new Date(NEET_EXAM_DATES[selectedYear].getTime() - 365 * 24 * 60 * 60 * 1000)
  }

  const totalPrepDays = Math.floor(
    (NEET_EXAM_DATES[selectedYear].getTime() - getPreviousYearDate().getTime()) /
      (1000 * 60 * 60 * 24)
  )
  const daysPassed = totalPrepDays - timeLeft.days
  const progressPercent = Math.min(100, Math.max(0, Math.round((daysPassed / totalPrepDays) * 100)))

  const getCurrentPhase = () => {
    for (const phase of PHASES) {
      if (timeLeft.days >= phase.minDays) return phase
    }
    return PHASES[PHASES.length - 1]
  }

  const currentPhase = getCurrentPhase()

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

  const isExamOver = timeLeft.total <= 0

  const examDate = NEET_EXAM_DATES[selectedYear]
  const examDateStr = examDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const faqs = [
    {
      q: `When is NEET ${selectedYear} exam date?`,
      a: `NEET ${selectedYear} is expected on ${examDateStr} (first Sunday of May), 2:00 PM to 5:20 PM.`,
    },
    {
      q: `What is the NEET ${selectedYear} exam pattern?`,
      a: `200 questions (180 to attempt): Physics (45), Chemistry (45), Biology (90). +4 correct, -1 wrong. Total: 720 marks.`,
    },
    {
      q: 'How many hours should I study daily?',
      a: 'Ideally 6-8 hours of focused study daily. Quality matters more than quantity. Consistency is key.',
    },
    {
      q: `Is NCERT enough for NEET ${selectedYear}?`,
      a: 'NCERT covers 90%+ of NEET Biology. For Physics and Chemistry, NCERT is essential plus practice books.',
    },
  ]

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="mt-4 text-gray-600">Loading countdown...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: `NEET ${selectedYear} Exam Countdown Timer`,
            description: `Live countdown to NEET ${selectedYear} exam with study planner and preparation tips.`,
            url: 'https://www.cerebrumbiologyacademy.com/neet-exam-countdown',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      {/* Toast */}
      {showToast && (
        <div className="fixed right-4 top-20 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-white shadow-lg">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Copied to clipboard!</span>
        </div>
      )}

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-gray-100 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-500">
                Home
              </Link>
              <span>/</span>
              <Link href="/neet-tools" className="hover:text-blue-500">
                NEET Tools
              </Link>
              <span>/</span>
              <span className="text-gray-800">Exam Countdown</span>
            </nav>

            <div className="text-center">
              {/* Year Selector + Live Badge */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                {/* Year Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    className="flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-red-100 transition-colors"
                  >
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span>NEET {selectedYear}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isYearDropdownOpen && (
                    <div className="absolute left-1/2 top-full z-50 mt-2 w-36 -translate-x-1/2 rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden">
                      {AVAILABLE_YEARS.map((year) => (
                        <button
                          key={year}
                          onClick={() => changeYear(year)}
                          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                            selectedYear === year
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>NEET {year}</span>
                          {selectedYear === year && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-sm font-medium text-green-700">Live Countdown</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                NEET {selectedYear} Exam Countdown
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-gray-600">
                Every second counts. Track your journey to becoming a doctor.
              </p>

              {/* Countdown Cards */}
              <div className="mx-auto mb-8 grid max-w-3xl grid-cols-4 gap-3 md:gap-4">
                {[
                  { value: timeLeft.days, label: 'Days', color: 'bg-red-500' },
                  { value: timeLeft.hours, label: 'Hours', color: 'bg-blue-500' },
                  { value: timeLeft.minutes, label: 'Minutes', color: 'bg-amber-500' },
                  { value: timeLeft.seconds, label: 'Seconds', color: 'bg-green-500' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 md:p-6"
                  >
                    <div
                      className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${item.color} md:h-12 md:w-12`}
                    >
                      <Timer className="h-5 w-5 text-white md:h-6 md:w-6" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 md:text-sm">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Exam Info */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                {[
                  {
                    icon: Calendar,
                    text: NEET_EXAM_DATES[selectedYear].toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }),
                  },
                  { icon: Clock, text: '2:00 PM - 5:20 PM' },
                  { icon: FileText, text: 'Pen & Paper Mode' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-full bg-gray-50 border border-gray-200 px-3 py-1.5 text-sm text-gray-600"
                  >
                    <item.icon className="h-4 w-4 text-gray-400" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Share Button */}
              <button
                onClick={shareCountdown}
                className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-600 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share Countdown
              </button>
            </div>
          </div>
        </section>

        {/* Phase Indicator */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Phase</p>
                    <h3 className="text-xl font-bold text-gray-900">{currentPhase.name}</h3>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 md:text-right md:max-w-xs">
                  {currentPhase.tip}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs font-medium text-gray-400">
                  {PHASES.map((phase) => (
                    <span
                      key={phase.name}
                      className={phase.name === currentPhase.name ? 'text-gray-900' : ''}
                    >
                      {phase.name}
                    </span>
                  ))}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-1000"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{progressPercent}%</span> of your
                  NEET journey completed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Important Dates</h2>
              <p className="mt-1 flex items-center justify-center gap-1 text-sm text-gray-500">
                <AlertCircle className="h-4 w-4" />
                Tentative dates. Official dates announced by NTA.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {getImportantDates(selectedYear).map((item) => {
                const Icon = item.icon
                const isExam = item.event === `NEET ${selectedYear} Exam`
                return (
                  <div
                    key={item.event}
                    className={`rounded-2xl bg-white border p-4 transition-all hover:shadow-md ${
                      isExam ? 'border-red-200 bg-red-50' : 'border-gray-100 shadow-sm'
                    }`}
                  >
                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className={`font-semibold ${isExam ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.event}
                    </h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Study Calculator + Quick Stats */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Study Calculator */}
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
                    <Calculator className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Study Calculator</h3>
                    <p className="text-sm text-gray-500">Plan your preparation hours</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Hours per day: {studyHoursPerDay}h
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    value={studyHoursPerDay}
                    onChange={(e) => setStudyHoursPerDay(parseInt(e.target.value))}
                    className="w-full h-2 rounded-full bg-gray-200 accent-blue-500"
                  />
                </div>

                <div className="space-y-3 rounded-xl bg-gray-50 p-4">
                  {isExamOver ? (
                    <div className="text-center py-4">
                      <Award className="mx-auto mb-2 h-10 w-10 text-green-500" />
                      <p className="font-bold text-gray-900">NEET {selectedYear} Completed!</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                        <span className="text-gray-600">Total Hours</span>
                        <span className="text-2xl font-bold text-blue-500">
                          {totalStudyHours.toLocaleString()}h
                        </span>
                      </div>
                      {[
                        {
                          subject: 'Biology',
                          hours: biologyHours,
                          color: 'bg-green-500',
                          icon: Leaf,
                        },
                        {
                          subject: 'Physics',
                          hours: physicsHours,
                          color: 'bg-blue-500',
                          icon: Atom,
                        },
                        {
                          subject: 'Chemistry',
                          hours: chemistryHours,
                          color: 'bg-amber-500',
                          icon: Beaker,
                        },
                      ].map((item) => (
                        <div key={item.subject} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-7 w-7 items-center justify-center rounded-lg ${item.color}`}
                            >
                              <item.icon className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-sm text-gray-600">{item.subject}</span>
                          </div>
                          <span className="font-medium text-gray-900">{item.hours}h</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Quick Stats</h3>
                    <p className="text-sm text-gray-500">Exam pattern at a glance</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      value: '180',
                      label: 'Questions',
                      sub: '45 per subject',
                      color: 'text-red-500',
                    },
                    {
                      value: '720',
                      label: 'Total Marks',
                      sub: '+4 per correct',
                      color: 'text-blue-500',
                    },
                    {
                      value: '3:20',
                      label: 'Duration',
                      sub: '3 hours 20 min',
                      color: 'text-amber-500',
                    },
                    { value: '-1', label: 'Negative', sub: 'per wrong', color: 'text-gray-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-gray-50 p-3 text-center">
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Subject Distribution */}
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    Question Distribution
                  </h4>
                  <div className="space-y-2">
                    {[
                      { subject: 'Biology', questions: 90, percent: 50, color: 'bg-green-500' },
                      { subject: 'Physics', questions: 45, percent: 25, color: 'bg-blue-500' },
                      { subject: 'Chemistry', questions: 45, percent: 25, color: 'bg-amber-500' },
                    ].map((item) => (
                      <div key={item.subject}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-gray-600">{item.subject}</span>
                          <span className="font-medium text-gray-900">{item.questions} Q</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target + Streak */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Target Score */}
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Your Target</h3>
                    <p className="text-sm text-gray-500">Set your goal</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Target Score
                    </label>
                    <div className="flex gap-2">
                      {[600, 650, 700].map((score) => (
                        <button
                          key={score}
                          onClick={() => setTargetScore(score)}
                          className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                            targetScore === score
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
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
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-gray-900 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      {['General', 'EWS', 'OBC-NCL', 'SC', 'ST'].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                    <div className="flex items-center gap-2 text-green-700">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">Expected Rank</span>
                    </div>
                    <p className="mt-1 text-xl font-bold text-green-600">
                      {getRecommendedCutoff()}
                    </p>
                    <p className="text-xs text-green-600/70">
                      With {targetScore}+ in {category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Streak Tracker */}
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500">
                    <Flame className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Study Streak</h3>
                    <p className="text-sm text-gray-500">Build consistency</p>
                  </div>
                </div>

                <div className="mb-6 text-center">
                  <div className="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full bg-amber-500">
                    <Flame className="h-6 w-6 text-white" />
                    <div className="text-3xl font-bold text-white">{streak}</div>
                    <div className="text-xs text-white/80">days</div>
                  </div>
                </div>

                {studiedToday ? (
                  <div className="rounded-xl bg-green-50 border border-green-100 p-4 text-center">
                    <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
                    <p className="font-semibold text-green-700">You studied today!</p>
                    <p className="text-sm text-green-600/70">Come back tomorrow</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="mb-3 text-sm text-gray-500">Did you study today?</p>
                    <button
                      onClick={markStudied}
                      className="w-full rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white hover:bg-amber-600 transition-colors"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Flame className="h-4 w-4" />
                        Yes, I Studied Today!
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Topper Quote */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 text-center">
              <Quote className="mx-auto mb-4 h-8 w-8 text-blue-200" />
              <blockquote className="mb-4 text-lg font-medium text-gray-900 md:text-xl">
                &ldquo;{TOPPER_QUOTES[currentQuote].quote}&rdquo;
              </blockquote>
              <cite className="text-sm text-blue-500">
                — {TOPPER_QUOTES[currentQuote].author}, NEET {TOPPER_QUOTES[currentQuote].year}
              </cite>
              <div className="mt-6 flex justify-center gap-2">
                {TOPPER_QUOTES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuote(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentQuote ? 'w-6 bg-blue-500' : 'w-2 bg-gray-200 hover:bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* More Tools */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">More NEET Tools</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  href: '/neet-college-predictor',
                  icon: Building2,
                  title: 'College Predictor',
                  desc: 'Find colleges based on your rank',
                  color: 'bg-blue-500',
                },
                {
                  href: '/neet-rank-predictor',
                  icon: TrendingUp,
                  title: 'Rank Predictor',
                  desc: 'Predict your All India Rank',
                  color: 'bg-amber-500',
                },
                {
                  href: '/neet-study-plan-generator',
                  icon: BookOpen,
                  title: 'Study Plan',
                  desc: 'Personalized study schedule',
                  color: 'bg-green-500',
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl bg-white border border-gray-100 shadow-sm p-5 transition-all hover:shadow-md hover:border-blue-200"
                >
                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${tool.color} transition-transform group-hover:scale-110`}
                  >
                    <tool.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-500">
                    {tool.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{tool.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-500">
                    Try Now{' '}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-gray-900">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {expandedFaq === idx && (
                    <div className="border-t border-gray-100 px-4 pb-4 pt-2">
                      <p className="text-sm text-gray-600">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-blue-500 p-8 text-center text-white">
              <Rocket className="mx-auto mb-4 h-12 w-12" />
              <h2 className="mb-2 text-2xl font-bold">Start Your NEET {selectedYear} Journey</h2>
              <p className="mb-6 text-blue-100">
                Every day counts. Begin your preparation with Cerebrum Biology Academy.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <GraduationCap className="h-4 w-4" />
                  Join Our Course
                </Link>
                <Link
                  href="/neet-tools"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Explore Tools
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
