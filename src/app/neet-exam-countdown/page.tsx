import type { Metadata } from 'next'
import { Calendar, Clock, FileText, Star, Trophy, CheckCircle, Award, GraduationCap } from 'lucide-react'
import { CountdownClient } from './CountdownClient'

export const metadata: Metadata = {
  title: 'NEET 2026 Exam Countdown Timer | Days Left for NEET',
  description:
    'Live countdown to NEET 2026 exam. Track days, hours, minutes left. Get study planner, important dates, and preparation tips from NEET toppers.',
  keywords:
    'NEET 2026 countdown, NEET exam date, days left for NEET, NEET timer, NEET preparation countdown',
}

// NEET Exam Dates - First Sunday of May each year
const NEET_EXAM_DATES: Record<number, Date> = {
  2026: new Date('2026-05-03T14:00:00+05:30'),
  2027: new Date('2027-05-02T14:00:00+05:30'),
  2028: new Date('2028-05-07T14:00:00+05:30'),
  2029: new Date('2029-05-06T14:00:00+05:30'),
}

// Important Dates (static, can be server rendered)
const getImportantDates = (year: number) => {
  const examDate = NEET_EXAM_DATES[year]
  const examDay = examDate.getDate()
  const examMonth = examDate.toLocaleDateString('en-US', { month: 'short' })

  return [
    { event: 'Registration Opens', date: `Feb 7, ${year}`, color: 'bg-blue-500' },
    { event: 'Registration Closes', date: `Mar 7, ${year}`, color: 'bg-amber-500' },
    { event: 'Correction Window', date: `Mar 10-15, ${year}`, color: 'bg-blue-500' },
    { event: 'Admit Card Release', date: `Apr 30, ${year}`, color: 'bg-green-500' },
    { event: `NEET ${year} Exam`, date: `${examMonth} ${examDay}, ${year}`, color: 'bg-red-500', isExam: true },
    { event: 'Answer Key Release', date: `May 10, ${year}`, color: 'bg-amber-500' },
    { event: 'Result Declaration', date: `June 5, ${year}`, color: 'bg-green-500' },
    { event: 'Counselling Begins', date: `July ${year}`, color: 'bg-blue-500' },
  ]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Registration Opens': FileText,
  'Registration Closes': Clock,
  'Correction Window': FileText,
  'Admit Card Release': Award,
  'Answer Key Release': CheckCircle,
  'Result Declaration': Trophy,
  'Counselling Begins': GraduationCap,
}

export default function NEETExamCountdownPage() {
  const defaultYear = 2026
  const importantDates = getImportantDates(defaultYear)
  const examDateStr = NEET_EXAM_DATES[defaultYear].toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      {/* Structured Data - Server rendered */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'NEET 2026 Exam Countdown Timer',
            description: 'Live countdown to NEET 2026 exam with study planner and preparation tips.',
            url: 'https://cerebrumbiologyacademy.com/neet-exam-countdown',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section - SERVER RENDERED for fast LCP */}
        <section
          className="bg-white border-b border-gray-100 py-12 md:py-16"
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Breadcrumb - Server rendered */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
              <a href="/" className="hover:text-blue-500">Home</a>
              <span>/</span>
              <a href="/neet-tools" className="hover:text-blue-500">NEET Tools</a>
              <span>/</span>
              <span className="text-gray-800">Exam Countdown</span>
            </nav>

            <div className="text-center">
              {/* Live Badge - Server rendered */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-4 py-2 text-sm font-medium text-gray-800">
                  <Calendar className="h-4 w-4 text-red-500" />
                  <span>NEET 2026</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-sm font-medium text-green-700">Live Countdown</span>
                </div>
              </div>

              {/* H1 - LCP CRITICAL - Server rendered with inline styles */}
              <h1
                className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl"
                style={{
                  color: '#111827',
                  fontWeight: 700,
                  fontSize: 'clamp(1.875rem, 5vw, 3rem)',
                  lineHeight: 1.2,
                }}
              >
                NEET 2026 Exam Countdown
              </h1>
              <p
                className="mx-auto mb-8 max-w-xl text-gray-600"
                style={{ color: '#4b5563' }}
              >
                Every second counts. Track your journey to becoming a doctor.
              </p>

              {/* Exam Info - Server rendered */}
              <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 rounded-full bg-gray-50 border border-gray-200 px-3 py-1.5 text-sm text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{examDateStr}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gray-50 border border-gray-200 px-3 py-1.5 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>2:00 PM - 5:20 PM</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-gray-50 border border-gray-200 px-3 py-1.5 text-sm text-gray-600">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span>Pen & Paper Mode</span>
                </div>
              </div>
            </div>

            {/* CLIENT COMPONENT - Countdown Timer (interactive) */}
            <CountdownClient />
          </div>
        </section>

        {/* Important Dates - SERVER RENDERED */}
        <section className="py-8 px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Important Dates</h2>
              <p className="mt-1 text-sm text-gray-500">
                Tentative dates. Official dates announced by NTA.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {importantDates.map((item) => {
                const Icon = item.event.includes('NEET') ? Star : (iconMap[item.event] || FileText)
                return (
                  <div
                    key={item.event}
                    className={`rounded-2xl bg-white border p-4 transition-all hover:shadow-md ${
                      item.isExam ? 'border-red-200 bg-red-50' : 'border-gray-100 shadow-sm'
                    }`}
                  >
                    <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className={`font-semibold ${item.isExam ? 'text-red-600' : 'text-gray-900'}`}>
                      {item.event}
                    </h3>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quick Stats - SERVER RENDERED */}
        <section className="py-8 px-4 sm:px-6 bg-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">NEET Exam Pattern</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '180', label: 'Questions', sub: '45 per subject', color: 'text-red-500' },
                { value: '720', label: 'Total Marks', sub: '+4 per correct', color: 'text-blue-500' },
                { value: '3:20', label: 'Duration', sub: '3 hours 20 min', color: 'text-amber-500' },
                { value: '-1', label: 'Negative', sub: 'per wrong', color: 'text-gray-500' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-gray-50 p-4 text-center">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - SERVER RENDERED */}
        <section className="py-12 px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-blue-500 p-8 text-center text-white">
              <h2 className="mb-2 text-2xl font-bold">Start Your NEET 2026 Journey</h2>
              <p className="mb-6 text-blue-100">
                Every day counts. Begin your preparation with Cerebrum Biology Academy.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <GraduationCap className="h-4 w-4" />
                  Join Our Course
                </a>
                <a
                  href="/neet-tools"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Explore Tools
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
