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
  Leaf,
  Beaker,
  Atom,
  Star,
  Rocket,
  Trophy,
  Sun,
  Moon,
} from 'lucide-react'

// NEET 2026 Exam Date - May 3, 2026, 2:00 PM IST
const NEET_2026_DATE = new Date('2026-05-03T14:00:00+05:30')
const NEET_2025_DATE = new Date('2025-05-04T14:00:00+05:30')

// Important Dates
const IMPORTANT_DATES = [
  {
    event: 'Registration Opens',
    date: 'Feb 7, 2026',
    icon: FileText,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    event: 'Registration Closes',
    date: 'Mar 7, 2026',
    icon: Clock,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    event: 'Correction Window',
    date: 'Mar 10-15, 2026',
    icon: FileText,
    color: 'from-violet-500 to-purple-500',
  },
  {
    event: 'Admit Card Release',
    date: 'Apr 30, 2026',
    icon: Award,
    color: 'from-purple-500 to-fuchsia-500',
  },
  {
    event: 'NEET 2026 Exam',
    date: 'May 3, 2026',
    icon: Star,
    color: 'from-amber-500 to-orange-500',
  },
  {
    event: 'Answer Key Release',
    date: 'May 10, 2026',
    icon: CheckCircle,
    color: 'from-orange-500 to-red-500',
  },
  {
    event: 'Result Declaration',
    date: 'June 5, 2026',
    icon: Trophy,
    color: 'from-green-500 to-green-600',
  },
  {
    event: 'Counselling Begins',
    date: 'July 2026',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
  },
]

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
  {
    quote:
      'Focus on weak areas in the morning when your mind is fresh. Revise strong topics at night.',
    author: 'Aman Kumar, AIR 15',
    year: '2024',
  },
]

// Preparation Phases
const PHASES = [
  {
    name: 'Foundation',
    minDays: 180,
    color: 'blue',
    tip: 'Focus on building strong concepts from NCERT. Complete syllabus coverage.',
  },
  {
    name: 'Consolidation',
    minDays: 90,
    color: 'purple',
    tip: 'Solve topic-wise questions. Identify and work on weak areas.',
  },
  {
    name: 'Revision',
    minDays: 30,
    color: 'orange',
    tip: 'Intensive revision. Focus on high-weightage topics and formulas.',
  },
  {
    name: 'Final Sprint',
    minDays: 0,
    color: 'red',
    tip: 'Mock tests daily. Light revision. Focus on time management and accuracy.',
  },
]

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
}

// iOS-style Theme Toggle Component
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed right-4 top-20 z-50 flex h-8 w-16 items-center rounded-full p-1 shadow-lg transition-all duration-300 md:right-6 md:top-24 md:h-9 md:w-[72px] ${
        isDark
          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-violet-500/30'
          : 'bg-gradient-to-r from-amber-400 to-orange-400 shadow-amber-400/30'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Track icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun
          className={`h-4 w-4 transition-opacity duration-300 md:h-5 md:w-5 ${
            isDark ? 'text-white/40' : 'text-white opacity-0'
          }`}
        />
        <Moon
          className={`h-4 w-4 transition-opacity duration-300 md:h-5 md:w-5 ${
            isDark ? 'text-white opacity-0' : 'text-white/40'
          }`}
        />
      </div>
      {/* Sliding knob */}
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 md:h-7 md:w-7 ${
          isDark ? 'translate-x-8 md:translate-x-9' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-violet-600 md:h-4 md:w-4" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500 md:h-4 md:w-4" />
        )}
      </div>
    </button>
  )
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
  const [lastStudyDate, setLastStudyDate] = useState<string | null>(null)
  const [studiedToday, setStudiedToday] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date()
    const difference = NEET_2026_DATE.getTime() - now.getTime()
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      total: difference,
    }
  }, [])

  useEffect(() => {
    setMounted(true)

    // Load theme preference
    const savedTheme = localStorage.getItem('neetCountdownTheme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
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
        setLastStudyDate(savedLastDate)
      } else if (lastDate.toDateString() === yesterday.toDateString()) {
        setStreak(parseInt(savedStreak))
        setLastStudyDate(savedLastDate)
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

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('neetCountdownTheme', newTheme ? 'dark' : 'light')
  }

  const markStudied = () => {
    const today = new Date().toDateString()
    const newStreak = streak + 1
    setStreak(newStreak)
    setStudiedToday(true)
    setLastStudyDate(today)
    localStorage.setItem('neetStreak', newStreak.toString())
    localStorage.setItem('neetLastStudyDate', today)
  }

  const totalStudyHours = timeLeft.days * studyHoursPerDay
  const biologyHours = Math.round(totalStudyHours * 0.5)
  const physicsHours = Math.round(totalStudyHours * 0.25)
  const chemistryHours = Math.round(totalStudyHours * 0.25)

  const totalPrepDays = Math.floor(
    (NEET_2026_DATE.getTime() - NEET_2025_DATE.getTime()) / (1000 * 60 * 60 * 24)
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
    const text = `Only ${timeLeft.days} days left for NEET 2026! I'm preparing with Cerebrum Biology Academy. Check your countdown: cerebrumbiologyacademy.com/neet-exam-countdown`
    if (navigator.share) {
      navigator.share({ title: 'NEET 2026 Countdown', text, url: window.location.href })
    } else {
      navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  const isExamDay = timeLeft.days === 0 && timeLeft.hours <= 24
  const isExamOver = timeLeft.total <= 0

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

  // Theme-specific classes
  const theme = {
    // Backgrounds
    pageBg: isDarkMode ? 'bg-[#0a0a1a]' : 'bg-gradient-to-br from-slate-50 via-white to-blue-50',
    cardBg: isDarkMode ? 'bg-white/5' : 'bg-white/70',
    cardInnerBg: isDarkMode ? 'bg-[#0f0f24]/80' : 'bg-white/90',
    cardBorder: isDarkMode ? 'border-white/10' : 'border-gray-200/50',
    cardHoverBorder: isDarkMode ? 'hover:border-violet-500/30' : 'hover:border-violet-400/50',

    // Text
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-violet-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-violet-400' : 'text-gray-500',
    textAccent: isDarkMode ? 'text-violet-400' : 'text-violet-600',

    // Gradients
    gradientText: isDarkMode
      ? 'bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400'
      : 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600',
    gradientBg: isDarkMode
      ? 'from-violet-600/20 via-indigo-600/20 to-violet-600/20'
      : 'from-violet-100 via-purple-50 to-indigo-100',

    // Buttons
    buttonPrimary: isDarkMode
      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/25 hover:shadow-violet-500/30'
      : 'bg-gradient-to-r from-violet-500 to-indigo-500 shadow-violet-400/30 hover:shadow-violet-400/40',
    buttonSecondary: isDarkMode
      ? 'border-violet-500/50 text-violet-300 hover:border-violet-500 hover:bg-violet-500/10'
      : 'border-violet-400 text-violet-600 hover:border-violet-500 hover:bg-violet-50',

    // Progress bars
    progressBg: isDarkMode ? 'bg-violet-900/50' : 'bg-violet-100',

    // Inputs
    inputBg: isDarkMode ? 'bg-white/5' : 'bg-white',
    inputBorder: isDarkMode ? 'border-white/10' : 'border-gray-200',
    inputFocus: isDarkMode ? 'focus:border-violet-500' : 'focus:border-violet-400',

    // Overlays
    overlayGradient: isDarkMode
      ? 'from-violet-900/20 via-transparent to-transparent'
      : 'from-violet-200/30 via-transparent to-transparent',
    gridPattern: isDarkMode
      ? 'bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)]'
      : 'bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]',
  }

  if (!mounted) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${isDarkMode ? 'bg-[#0a0a1a]' : 'bg-white'}`}
      >
        <div className="text-center">
          <div className="relative mx-auto h-20 w-20">
            <div className="absolute inset-0 animate-ping rounded-full bg-violet-500/30" />
            <div className="absolute inset-2 animate-spin rounded-full border-4 border-transparent border-t-violet-500" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600" />
          </div>
          <p
            className={`mt-6 text-lg font-medium ${isDarkMode ? 'text-violet-300' : 'text-violet-600'}`}
          >
            Loading countdown...
          </p>
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
            name: 'NEET 2026 Exam Countdown Timer',
            description:
              'Live countdown to NEET 2026 exam with study planner, progress tracker, and preparation tips.',
            url: 'https://www.cerebrumbiologyacademy.com/neet-exam-countdown',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />

      {/* Toast */}
      {showToast && (
        <div className="fixed right-4 top-20 z-50 animate-bounce rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white shadow-2xl shadow-green-500/25">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-6 w-6" />
            <span className="font-semibold">Copied to clipboard!</span>
          </div>
        </div>
      )}

      <main
        className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${theme.pageBg}`}
      >
        {/* Animated Background */}
        <div className="pointer-events-none fixed inset-0">
          <div
            className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${theme.overlayGradient}`}
          />
          <div
            className={`absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] ${isDarkMode ? 'from-indigo-900/20 via-transparent to-transparent' : 'from-blue-200/30 via-transparent to-transparent'}`}
          />
          <div
            className={`absolute -left-40 top-0 h-[500px] w-[500px] animate-pulse rounded-full blur-[120px] ${isDarkMode ? 'bg-violet-600/10' : 'bg-violet-300/20'}`}
          />
          <div
            className={`absolute -right-40 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full blur-[100px] ${isDarkMode ? 'bg-indigo-600/10' : 'bg-blue-300/20'}`}
            style={{ animationDelay: '1s' }}
          />
          <div
            className={`absolute -bottom-40 left-1/3 h-[600px] w-[600px] animate-pulse rounded-full blur-[140px] ${isDarkMode ? 'bg-fuchsia-600/10' : 'bg-purple-300/20'}`}
            style={{ animationDelay: '2s' }}
          />
          {/* Grid Pattern */}
          <div className={`absolute inset-0 ${theme.gridPattern} bg-[size:60px_60px]`} />
        </div>

        {/* Hero Section */}
        <section className="relative pb-20 pt-8 md:pb-32 md:pt-12">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className={`mb-8 flex items-center gap-2 text-sm ${theme.textMuted}`}>
              <Link
                href="/"
                className={`transition-colors ${isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}`}
              >
                Home
              </Link>
              <span className={isDarkMode ? 'text-violet-600' : 'text-violet-300'}>/</span>
              <Link
                href="/neet-tools"
                className={`transition-colors ${isDarkMode ? 'hover:text-violet-300' : 'hover:text-violet-600'}`}
              >
                NEET Tools
              </Link>
              <span className={isDarkMode ? 'text-violet-600' : 'text-violet-300'}>/</span>
              <span className={theme.textAccent}>Exam Countdown</span>
            </nav>

            <div className="text-center">
              {/* Badge */}
              <div
                className={`mb-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 backdrop-blur-sm ${isDarkMode ? 'border-violet-500/30 bg-violet-500/10' : 'border-violet-200 bg-violet-50/80'}`}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className={`text-sm font-medium ${theme.textAccent}`}>
                  Live Countdown to NEET 2026
                </span>
              </div>

              {/* Title */}
              <h1
                className={`mb-4 text-4xl font-black tracking-tight md:text-6xl lg:text-7xl ${theme.textPrimary}`}
              >
                <span
                  className={`bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-white via-violet-200 to-white' : 'bg-gradient-to-r from-gray-900 via-violet-800 to-gray-900'}`}
                >
                  NEET 2026
                </span>
                <br />
                <span className={`bg-clip-text text-transparent ${theme.gradientText}`}>
                  Exam Countdown
                </span>
              </h1>

              <p className={`mx-auto mb-10 max-w-2xl text-lg ${theme.textSecondary}`}>
                Every second counts. Track your journey to becoming a doctor.
              </p>

              {/* Main Countdown */}
              <div className="mx-auto mb-10 grid max-w-4xl grid-cols-4 gap-3 md:gap-5">
                {[
                  { value: timeLeft.days, label: 'Days', color: 'from-violet-500 to-indigo-500' },
                  { value: timeLeft.hours, label: 'Hours', color: 'from-indigo-500 to-blue-500' },
                  {
                    value: timeLeft.minutes,
                    label: 'Minutes',
                    color: 'from-blue-500 to-violet-500',
                  },
                  {
                    value: timeLeft.seconds,
                    label: 'Seconds',
                    color: 'from-fuchsia-500 to-violet-500',
                  },
                ].map((item, idx) => (
                  <div key={item.label} className="group relative">
                    {/* Glow Effect */}
                    <div
                      className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${item.color} blur-lg transition-all duration-500 ${isDarkMode ? 'opacity-50 group-hover:opacity-75' : 'opacity-30 group-hover:opacity-50'}`}
                    />

                    <div
                      className={`relative overflow-hidden rounded-2xl border p-4 backdrop-blur-xl md:rounded-3xl md:p-6 ${theme.cardBorder} ${theme.cardBg}`}
                    >
                      {/* Inner Glow */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} ${isDarkMode ? 'opacity-10' : 'opacity-5'}`}
                      />

                      <div className="relative">
                        <div
                          className={`bg-gradient-to-r ${item.color} bg-clip-text text-5xl font-black tabular-nums text-transparent md:text-7xl lg:text-8xl`}
                        >
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div
                          className={`mt-2 text-xs font-semibold uppercase tracking-widest md:text-sm ${theme.textAccent}`}
                        >
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Exam Info Pills */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: Calendar, text: 'May 3, 2026' },
                  { icon: Clock, text: '2:00 PM - 5:20 PM' },
                  { icon: FileText, text: 'Pen & Paper Mode' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm ${isDarkMode ? 'border-violet-500/20 bg-violet-500/10 text-violet-300' : 'border-violet-200 bg-violet-50/80 text-violet-700'}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Share Button */}
              <button
                onClick={shareCountdown}
                className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl ${theme.buttonPrimary}`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
                <Share2 className="relative h-5 w-5" />
                <span className="relative">Share Countdown</span>
              </button>
            </div>
          </div>
        </section>

        {/* Phase Indicator */}
        <section className="relative -mt-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div
              className={`relative overflow-hidden rounded-3xl border bg-gradient-to-r p-1 backdrop-blur-xl ${isDarkMode ? 'border-white/10 from-violet-600/20 via-indigo-600/20 to-violet-600/20' : 'border-violet-200/50 from-violet-100 via-purple-50 to-indigo-100'}`}
            >
              <div className={`rounded-[22px] p-6 md:p-8 ${theme.cardInnerBg}`}>
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping rounded-2xl bg-amber-500/30" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30">
                        <Zap className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${theme.textAccent}`}>Current Phase</p>
                      <h3 className={`text-2xl font-bold md:text-3xl ${theme.textPrimary}`}>
                        {currentPhase.name}
                      </h3>
                    </div>
                  </div>
                  <p className={`max-w-md text-center md:text-right ${theme.textSecondary}`}>
                    {currentPhase.tip}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mt-8">
                  <div
                    className={`mb-3 flex justify-between text-xs font-medium ${theme.textMuted}`}
                  >
                    {PHASES.map((phase) => (
                      <span
                        key={phase.name}
                        className={phase.name === currentPhase.name ? theme.textPrimary : ''}
                      >
                        {phase.name}
                      </span>
                    ))}
                  </div>
                  <div className={`h-3 overflow-hidden rounded-full ${theme.progressBg}`}>
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 transition-all duration-1000"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className={`mt-3 text-center text-sm ${theme.textMuted}`}>
                    <span className={`font-bold ${theme.textPrimary}`}>{progressPercent}%</span> of
                    your NEET journey completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className={`mb-3 text-3xl font-bold md:text-4xl ${theme.textPrimary}`}>
                Important{' '}
                <span className={`bg-clip-text text-transparent ${theme.gradientText}`}>Dates</span>
              </h2>
              <p className={`flex items-center justify-center gap-2 text-sm ${theme.textMuted}`}>
                <AlertCircle className="h-4 w-4" />
                Tentative dates based on previous years. Official dates will be announced by NTA.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {IMPORTANT_DATES.map((item, idx) => {
                const Icon = item.icon
                const isExam = item.event === 'NEET 2026 Exam'
                return (
                  <div
                    key={item.event}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-105 ${
                      isExam
                        ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/20 to-orange-500/20'
                        : `${theme.cardBorder} ${theme.cardBg} ${theme.cardHoverBorder}`
                    }`}
                  >
                    {isExam && (
                      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/20 blur-2xl" />
                    )}
                    <div className="relative p-5">
                      <div
                        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3
                        className={`mb-1 font-semibold ${isExam ? 'text-amber-500' : theme.textPrimary}`}
                      >
                        {item.event}
                      </h3>
                      <p className={`text-sm ${theme.textMuted}`}>{item.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Study Calculator + Quick Stats */}
        <section className="relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Study Calculator */}
              <div
                className={`group relative overflow-hidden rounded-3xl border p-1 backdrop-blur-xl transition-all ${theme.cardBorder} ${theme.cardBg} ${theme.cardHoverBorder}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 transition-opacity group-hover:opacity-100`}
                />
                <div className={`relative rounded-[22px] p-6 md:p-8 ${theme.cardInnerBg}`}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                      <Calculator className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Study Calculator</h3>
                      <p className={`text-sm ${theme.textMuted}`}>Plan your preparation hours</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className={`mb-3 block text-sm font-medium ${theme.textSecondary}`}>
                      Hours you can study per day
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="2"
                        max="12"
                        value={studyHoursPerDay}
                        onChange={(e) => setStudyHoursPerDay(parseInt(e.target.value))}
                        className={`h-2 w-full cursor-pointer appearance-none rounded-full accent-blue-500 ${theme.progressBg} [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-indigo-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-500/50`}
                        aria-label="Study hours per day"
                        aria-valuemin={2}
                        aria-valuemax={12}
                        aria-valuenow={studyHoursPerDay}
                      />
                      <span className="w-16 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-2 text-center font-bold text-white shadow-lg shadow-blue-500/25">
                        {studyHoursPerDay}h
                      </span>
                    </div>
                  </div>

                  <div
                    className={`space-y-3 rounded-2xl border p-5 ${theme.cardBorder} ${theme.cardBg}`}
                  >
                    {isExamOver ? (
                      <div className="py-6 text-center">
                        <Award className="mx-auto mb-3 h-14 w-14 text-green-500" />
                        <p className={`text-xl font-bold ${theme.textPrimary}`}>
                          NEET 2026 Completed!
                        </p>
                        <p className={theme.textMuted}>Hope you did your best!</p>
                      </div>
                    ) : isExamDay ? (
                      <div className="py-6 text-center">
                        <Sparkles className="mx-auto mb-3 h-14 w-14 animate-pulse text-amber-500" />
                        <p className={`text-xl font-bold ${theme.textPrimary}`}>Exam Day!</p>
                        <p className={theme.textMuted}>All the best! You&apos;ve prepared well.</p>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`flex items-center justify-between border-b pb-4 ${theme.cardBorder}`}
                        >
                          <span className={`font-medium ${theme.textSecondary}`}>
                            Total Hours Remaining
                          </span>
                          <span className="text-3xl font-bold text-blue-500">
                            {totalStudyHours.toLocaleString()}h
                          </span>
                        </div>
                        {[
                          {
                            subject: 'Biology',
                            hours: biologyHours,
                            percent: '50%',
                            color: 'from-green-500 to-green-600',
                            icon: Leaf,
                          },
                          {
                            subject: 'Physics',
                            hours: physicsHours,
                            percent: '25%',
                            color: 'from-violet-500 to-purple-600',
                            icon: Atom,
                          },
                          {
                            subject: 'Chemistry',
                            hours: chemistryHours,
                            percent: '25%',
                            color: 'from-orange-500 to-amber-600',
                            icon: Beaker,
                          },
                        ].map((item) => (
                          <div
                            key={item.subject}
                            className="flex items-center justify-between py-2"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r ${item.color}`}
                              >
                                <item.icon className="h-4 w-4 text-white" />
                              </div>
                              <span className={theme.textSecondary}>
                                {item.subject} ({item.percent})
                              </span>
                            </div>
                            <span className={`font-semibold ${theme.textPrimary}`}>
                              {item.hours}h
                            </span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div
                className={`group relative overflow-hidden rounded-3xl border p-1 backdrop-blur-xl transition-all ${theme.cardBorder} ${theme.cardBg} ${theme.cardHoverBorder}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 to-violet-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className={`relative rounded-[22px] p-6 md:p-8 ${theme.cardInnerBg}`}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/25">
                      <Target className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Quick Stats</h3>
                      <p className={`text-sm ${theme.textMuted}`}>Exam pattern at a glance</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        value: '180',
                        label: 'Total Questions',
                        sub: '45 per subject',
                        color: 'from-violet-500 to-indigo-500',
                      },
                      {
                        value: '720',
                        label: 'Total Marks',
                        sub: '+4 per correct',
                        color: 'from-indigo-500 to-blue-500',
                      },
                      {
                        value: '3:20',
                        label: 'Duration',
                        sub: '3 hours 20 min',
                        color: 'from-blue-500 to-violet-500',
                      },
                      {
                        value: '-1',
                        label: 'Negative Marking',
                        sub: 'per wrong answer',
                        color: 'from-red-500 to-orange-500',
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-2xl border p-4 text-center transition-all ${theme.cardBorder} ${theme.cardBg} hover:bg-opacity-80`}
                      >
                        <div
                          className={`bg-gradient-to-r ${stat.color} bg-clip-text text-3xl font-bold text-transparent`}
                        >
                          {stat.value}
                        </div>
                        <div className={`mt-1 text-sm font-medium ${theme.textSecondary}`}>
                          {stat.label}
                        </div>
                        <div className={`text-xs ${theme.textMuted}`}>({stat.sub})</div>
                      </div>
                    ))}
                  </div>

                  {/* Subject Distribution */}
                  <div
                    className={`mt-6 rounded-2xl border p-5 ${theme.cardBorder} ${theme.cardBg}`}
                  >
                    <h4 className={`mb-4 font-semibold ${theme.textPrimary}`}>
                      Question Distribution
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          subject: 'Biology',
                          questions: 90,
                          marks: 360,
                          percent: 50,
                          color: 'bg-green-500',
                        },
                        {
                          subject: 'Physics',
                          questions: 45,
                          marks: 180,
                          percent: 25,
                          color: 'bg-violet-500',
                        },
                        {
                          subject: 'Chemistry',
                          questions: 45,
                          marks: 180,
                          percent: 25,
                          color: 'bg-orange-500',
                        },
                      ].map((item) => (
                        <div key={item.subject}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <span className={theme.textSecondary}>{item.subject}</span>
                            <span className={`font-medium ${theme.textPrimary}`}>
                              {item.questions} Q ({item.marks} marks)
                            </span>
                          </div>
                          <div className={`h-2 overflow-hidden rounded-full ${theme.progressBg}`}>
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
          </div>
        </section>

        {/* Target + Streak */}
        <section className="relative px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Target Score */}
              <div
                className={`relative overflow-hidden rounded-3xl border p-1 backdrop-blur-xl ${theme.cardBorder} ${theme.cardBg}`}
              >
                <div className={`rounded-[22px] p-6 md:p-8 ${theme.cardInnerBg}`}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/25">
                      <Trophy className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Your Target</h3>
                      <p className={`text-sm ${theme.textMuted}`}>
                        Set your goal and track progress
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={`mb-3 block text-sm font-medium ${theme.textSecondary}`}>
                        Target Score
                      </label>
                      <div className="flex gap-3">
                        {[600, 650, 700].map((score) => (
                          <button
                            key={score}
                            onClick={() => setTargetScore(score)}
                            className={`flex-1 rounded-xl px-4 py-3 font-bold transition-all ${
                              targetScore === score
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25'
                                : `border ${theme.cardBorder} ${theme.cardBg} ${theme.textSecondary} hover:bg-opacity-80`
                            }`}
                          >
                            {score}+
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`mb-3 block text-sm font-medium ${theme.textSecondary}`}>
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${theme.inputBg} ${theme.inputBorder} ${theme.textPrimary} ${theme.inputFocus}`}
                      >
                        <option
                          value="General"
                          className={isDarkMode ? 'bg-[#0f0f24]' : 'bg-white'}
                        >
                          General
                        </option>
                        <option value="EWS" className={isDarkMode ? 'bg-[#0f0f24]' : 'bg-white'}>
                          EWS
                        </option>
                        <option
                          value="OBC-NCL"
                          className={isDarkMode ? 'bg-[#0f0f24]' : 'bg-white'}
                        >
                          OBC-NCL
                        </option>
                        <option value="SC" className={isDarkMode ? 'bg-[#0f0f24]' : 'bg-white'}>
                          SC
                        </option>
                        <option value="ST" className={isDarkMode ? 'bg-[#0f0f24]' : 'bg-white'}>
                          ST
                        </option>
                      </select>
                    </div>

                    <div
                      className={`rounded-2xl p-5 ${isDarkMode ? 'bg-gradient-to-r from-green-500/20 to-green-600/20' : 'bg-gradient-to-r from-green-50 to-green-100'}`}
                    >
                      <div className="flex items-center gap-2 text-green-500">
                        <Award className="h-5 w-5" />
                        <span className="font-semibold">Expected Rank Range</span>
                      </div>
                      <p className="mt-2 text-3xl font-bold text-green-500">
                        {getRecommendedCutoff()}
                      </p>
                      <p
                        className={`mt-1 text-sm ${isDarkMode ? 'text-green-400/70' : 'text-green-600/70'}`}
                      >
                        With {targetScore}+ marks in {category} category
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Streak Tracker */}
              <div
                className={`relative overflow-hidden rounded-3xl border p-1 backdrop-blur-xl ${theme.cardBorder} ${theme.cardBg}`}
              >
                <div
                  className={`absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br blur-3xl ${isDarkMode ? 'from-orange-500/20 to-red-500/20' : 'from-orange-200/50 to-red-200/50'}`}
                />
                <div className={`relative rounded-[22px] p-6 md:p-8 ${theme.cardInnerBg}`}>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25">
                      <Flame className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme.textPrimary}`}>Study Streak</h3>
                      <p className={`text-sm ${theme.textMuted}`}>
                        Build consistency, build success
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 text-center">
                    <div className="relative mx-auto h-36 w-36">
                      {/* Outer Ring */}
                      <div
                        className={`absolute inset-0 animate-spin rounded-full border-4 ${isDarkMode ? 'border-orange-500/20' : 'border-orange-300/30'}`}
                        style={{ animationDuration: '8s' }}
                      />
                      <div
                        className={`absolute inset-2 rounded-full border-2 border-dashed ${isDarkMode ? 'border-orange-500/30' : 'border-orange-400/40'}`}
                      />
                      {/* Inner Circle */}
                      <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-xl shadow-orange-500/30">
                        <Flame className="h-8 w-8 text-white" />
                        <div className="text-4xl font-black text-white">{streak}</div>
                        <div className="text-xs font-medium text-white/80">day streak</div>
                      </div>
                    </div>
                  </div>

                  {studiedToday ? (
                    <div
                      className={`rounded-2xl p-5 text-center ${isDarkMode ? 'bg-gradient-to-r from-green-500/20 to-green-600/20' : 'bg-gradient-to-r from-green-50 to-green-100'}`}
                    >
                      <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
                      <p className="mt-3 text-lg font-bold text-green-500">
                        Great job! You studied today!
                      </p>
                      <p
                        className={`text-sm ${isDarkMode ? 'text-green-400/70' : 'text-green-600/70'}`}
                      >
                        Come back tomorrow to extend your streak
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className={`mb-4 ${theme.textMuted}`}>Did you study today?</p>
                      <button
                        onClick={markStudied}
                        className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="relative flex items-center justify-center gap-2">
                          <Flame className="h-5 w-5" />
                          Yes, I Studied Today!
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topper Quote */}
        <section className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div
              className={`relative overflow-hidden rounded-3xl border bg-gradient-to-r p-1 backdrop-blur-xl ${isDarkMode ? 'border-white/10 from-violet-600/20 via-fuchsia-600/20 to-indigo-600/20' : 'border-violet-200/50 from-violet-100 via-purple-50 to-indigo-100'}`}
            >
              <div className={`rounded-[22px] p-8 text-center md:p-12 ${theme.cardInnerBg}`}>
                <Quote
                  className={`mx-auto mb-6 h-12 w-12 ${isDarkMode ? 'text-violet-500/50' : 'text-violet-400/50'}`}
                />
                <blockquote
                  className={`mb-6 text-xl font-medium md:text-2xl lg:text-3xl ${theme.textPrimary}`}
                >
                  &ldquo;{TOPPER_QUOTES[currentQuote].quote}&rdquo;
                </blockquote>
                <cite className={theme.textAccent}>
                  — {TOPPER_QUOTES[currentQuote].author}, NEET {TOPPER_QUOTES[currentQuote].year}
                </cite>
                <div className="mt-8 flex justify-center gap-2">
                  {TOPPER_QUOTES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuote(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentQuote
                          ? 'w-8 bg-gradient-to-r from-violet-500 to-fuchsia-500'
                          : `w-2 ${isDarkMode ? 'bg-violet-700 hover:bg-violet-600' : 'bg-violet-200 hover:bg-violet-300'}`
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More Tools */}
        <section className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className={`mb-3 text-3xl font-bold md:text-4xl ${theme.textPrimary}`}>
                More{' '}
                <span className={`bg-clip-text text-transparent ${theme.gradientText}`}>
                  NEET Tools
                </span>
              </h2>
              <p className={theme.textMuted}>Complete your preparation with our free tools</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  href: '/neet-college-predictor',
                  icon: Building2,
                  title: 'College Predictor',
                  desc: 'Find medical colleges based on your expected rank. 470+ colleges database.',
                  color: 'from-blue-500 to-indigo-500',
                },
                {
                  href: '/neet-rank-predictor',
                  icon: TrendingUp,
                  title: 'Rank Predictor',
                  desc: 'Predict your All India Rank based on expected score with accuracy.',
                  color: 'from-orange-500 to-amber-500',
                },
                {
                  href: '/neet-study-plan-generator',
                  icon: BookOpen,
                  title: 'Study Plan Generator',
                  desc: 'Get personalized week-by-week study schedule for NEET Biology.',
                  color: 'from-green-500 to-green-600',
                },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group relative overflow-hidden rounded-2xl border p-6 transition-all ${theme.cardBorder} ${theme.cardBg} ${theme.cardHoverBorder}`}
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${tool.color} shadow-lg transition-transform group-hover:scale-110`}
                  >
                    <tool.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3
                    className={`mb-2 text-lg font-bold transition-colors ${theme.textPrimary} group-hover:text-violet-500`}
                  >
                    {tool.title}
                  </h3>
                  <p className={`mb-4 text-sm ${theme.textMuted}`}>{tool.desc}</p>
                  <span
                    className={`inline-flex items-center gap-1 bg-gradient-to-r ${tool.color} bg-clip-text text-sm font-semibold text-transparent`}
                  >
                    Try Now{' '}
                    <ArrowRight
                      className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${theme.textAccent}`}
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className={`mb-10 text-center text-3xl font-bold md:text-4xl ${theme.textPrimary}`}>
              Frequently Asked{' '}
              <span className={`bg-clip-text text-transparent ${theme.gradientText}`}>
                Questions
              </span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className={`overflow-hidden rounded-2xl border backdrop-blur-sm transition-all ${theme.cardBorder} ${theme.cardBg} ${theme.cardHoverBorder}`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className={`font-semibold ${theme.textPrimary}`}>{faq.q}</span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-transform ${isDarkMode ? 'bg-violet-500/20' : 'bg-violet-100'} ${expandedFaq === idx ? 'rotate-180' : ''}`}
                    >
                      <ChevronDown className={`h-5 w-5 ${theme.textAccent}`} />
                    </div>
                  </button>
                  {expandedFaq === idx && (
                    <div className={`border-t px-5 pb-5 pt-3 ${theme.cardBorder}`}>
                      <p className={theme.textSecondary}>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div
              className={`relative overflow-hidden rounded-3xl border bg-gradient-to-r p-1 ${isDarkMode ? 'border-violet-500/30 from-violet-600/30 via-fuchsia-600/30 to-indigo-600/30' : 'border-violet-300 from-violet-200 via-purple-100 to-indigo-200'}`}
            >
              <div
                className={`rounded-[22px] px-8 py-16 text-center backdrop-blur-xl ${theme.cardInnerBg}`}
              >
                <Rocket className={`mx-auto mb-6 h-16 w-16 ${theme.textAccent}`} />
                <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${theme.textPrimary}`}>
                  Start Your NEET 2026 Journey
                </h2>
                <p className={`mb-8 text-lg ${theme.textSecondary}`}>
                  Every day counts. Begin your preparation with Cerebrum Biology Academy.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className={`group relative overflow-hidden rounded-full px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl ${theme.buttonPrimary}`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Join Our Course
                    </span>
                  </Link>
                  <Link
                    href="/neet-tools"
                    className={`rounded-full border px-8 py-4 font-semibold transition-all ${theme.buttonSecondary}`}
                  >
                    <span className="flex items-center gap-2">
                      Explore All Tools
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
