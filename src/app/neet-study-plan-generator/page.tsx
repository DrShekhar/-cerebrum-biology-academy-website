'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  BookOpen,
  Target,
  Download,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Phone,
} from 'lucide-react'

interface StudyPlan {
  weekNumber: number
  topic: string
  subject: string
  hoursPerDay: number
  priority: 'High' | 'Medium' | 'Low'
  tasks: string[]
}

interface UserInput {
  currentClass: string
  monthsRemaining: number
  hoursPerDay: number
  weakSubjects: string[]
  targetScore: number
}

const biologyChapters = [
  { name: 'Cell Biology', weightage: 9, class: 11 },
  { name: 'Biomolecules', weightage: 6, class: 11 },
  { name: 'Cell Division', weightage: 5, class: 11 },
  { name: 'Plant Kingdom', weightage: 5, class: 11 },
  { name: 'Animal Kingdom', weightage: 5, class: 11 },
  { name: 'Plant Morphology', weightage: 4, class: 11 },
  { name: 'Animal Tissues', weightage: 3, class: 11 },
  { name: 'Digestion & Absorption', weightage: 5, class: 11 },
  { name: 'Breathing & Gas Exchange', weightage: 4, class: 11 },
  { name: 'Body Fluids & Circulation', weightage: 5, class: 11 },
  { name: 'Excretion', weightage: 4, class: 11 },
  { name: 'Neural Control', weightage: 6, class: 11 },
  { name: 'Locomotion & Movement', weightage: 4, class: 11 },
  { name: 'Chemical Coordination', weightage: 4, class: 11 },
  { name: 'Reproduction in Organisms', weightage: 3, class: 12 },
  { name: 'Human Reproduction', weightage: 6, class: 12 },
  { name: 'Reproductive Health', weightage: 3, class: 12 },
  { name: 'Genetics', weightage: 10, class: 12 },
  { name: 'Molecular Basis of Inheritance', weightage: 8, class: 12 },
  { name: 'Evolution', weightage: 4, class: 12 },
  { name: 'Human Health & Disease', weightage: 5, class: 12 },
  { name: 'Biotechnology Principles', weightage: 4, class: 12 },
  { name: 'Biotechnology Applications', weightage: 3, class: 12 },
  { name: 'Organisms & Populations', weightage: 4, class: 12 },
  { name: 'Ecosystem', weightage: 4, class: 12 },
  { name: 'Biodiversity & Conservation', weightage: 3, class: 12 },
  { name: 'Environmental Issues', weightage: 2, class: 12 },
]

export default function StudyPlanGeneratorPage() {
  const [currentClass, setCurrentClass] = useState('11')
  const [monthsRemaining, setMonthsRemaining] = useState('12')
  const [hoursPerDay, setHoursPerDay] = useState('4')
  const [weakSubjects, setWeakSubjects] = useState<string[]>([])
  const [targetScore, setTargetScore] = useState('320')
  const [studyPlan, setStudyPlan] = useState<StudyPlan[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [planDownloaded, setPlanDownloaded] = useState(false)

  const generateStudyPlan = () => {
    const months = parseInt(monthsRemaining)
    const hours = parseInt(hoursPerDay)
    const classNum = parseInt(currentClass)

    const chaptersToStudy = biologyChapters.filter((ch) => {
      if (classNum === 11) return true
      return ch.class === 12
    })

    const sortedChapters = [...chaptersToStudy].sort((a, b) => {
      const aWeak = weakSubjects.includes(a.name) ? 10 : 0
      const bWeak = weakSubjects.includes(b.name) ? 10 : 0
      return b.weightage + bWeak - (a.weightage + aWeak)
    })

    const totalWeeks = months * 4
    const chaptersPerWeek = Math.ceil(sortedChapters.length / (totalWeeks * 0.7))

    const plan: StudyPlan[] = []
    let weekNum = 1

    for (let i = 0; i < sortedChapters.length; i += chaptersPerWeek) {
      const weekChapters = sortedChapters.slice(i, i + chaptersPerWeek)

      weekChapters.forEach((chapter) => {
        const isWeak = weakSubjects.includes(chapter.name)
        plan.push({
          weekNumber: weekNum,
          topic: chapter.name,
          subject: 'Biology',
          hoursPerDay: Math.min(hours, isWeak ? 3 : 2),
          priority: chapter.weightage >= 6 ? 'High' : chapter.weightage >= 4 ? 'Medium' : 'Low',
          tasks: [
            `Read NCERT chapter thoroughly`,
            `Make notes with diagrams`,
            `Solve NCERT exercises`,
            `Practice 20 MCQs from this topic`,
            isWeak ? `Extra revision - this is your weak area` : `Quick revision after 3 days`,
          ],
        })
      })
      weekNum++
    }

    const revisionWeeks = Math.floor(totalWeeks * 0.2)
    for (let i = 0; i < revisionWeeks; i++) {
      plan.push({
        weekNumber: weekNum + i,
        topic: 'Full Syllabus Revision + Mock Tests',
        subject: 'Biology',
        hoursPerDay: hours,
        priority: 'High',
        tasks: [
          'Revise high-weightage chapters',
          'Solve 1 full-length mock test',
          'Analyze mistakes and weak areas',
          'Practice previous year questions',
          'Focus on difficult concepts',
        ],
      })
    }

    setStudyPlan(plan)
    setShowResults(true)
  }

  const handleDownload = async () => {
    if (!planDownloaded) {
      setShowLeadForm(true)
      return
    }
    downloadPlan()
  }

  const downloadPlan = () => {
    let content = `NEET BIOLOGY STUDY PLAN\n`
    content += `Generated by Cerebrum Biology Academy\n`
    content += `=`.repeat(50) + `\n\n`
    content += `Your Details:\n`
    content += `- Current Class: ${currentClass}\n`
    content += `- Months Remaining: ${monthsRemaining}\n`
    content += `- Study Hours/Day: ${hoursPerDay}\n`
    content += `- Target Score: ${targetScore}/360\n`
    content += `- Weak Areas: ${weakSubjects.length > 0 ? weakSubjects.join(', ') : 'None specified'}\n\n`
    content += `=`.repeat(50) + `\n\n`

    studyPlan.forEach((week) => {
      content += `WEEK ${week.weekNumber}: ${week.topic}\n`
      content += `-`.repeat(40) + `\n`
      content += `Priority: ${week.priority}\n`
      content += `Daily Hours: ${week.hoursPerDay}\n`
      content += `Tasks:\n`
      week.tasks.forEach((task, i) => {
        content += `  ${i + 1}. ${task}\n`
      })
      content += `\n`
    })

    content += `\n` + `=`.repeat(50) + `\n`
    content += `\nFor personalized guidance and expert coaching:\n`
    content += `Visit: www.cerebrumbiologyacademy.com\n`
    content += `Call: +91-88264-44334\n`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'NEET_Biology_Study_Plan.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleLeadSubmit = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }

    setIsSubmitting(true)
    try {
      await fetch('/api/blog/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          source: 'blog_sidebar',
          articleSlug: 'neet-study-plan-generator',
          articleTitle: 'Study Plan Generator Download',
        }),
      })
      setPlanDownloaded(true)
      setShowLeadForm(false)
      downloadPlan()
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleWeakSubject = (subject: string) => {
    setWeakSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
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
            name: 'NEET Study Plan Generator 2026',
            description:
              'Free personalized NEET Biology study plan generator. Get week-by-week schedule based on your preparation time and weak areas.',
            url: 'https://cerebrumbiologyacademy.com/neet-study-plan-generator',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 pt-16 pb-24 text-white md:pt-24 md:pb-32">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET Study Plan Generator</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              NEET Biology Study Plan Generator 2026
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-green-100 md:text-xl">
              Get a personalized week-by-week study schedule based on your available time, current
              class, and weak areas. Optimized for maximum Biology score.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Week-by-Week Plan</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Target className="h-5 w-5" />
                <span className="font-semibold">NCERT-Focused</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">AI-Optimized</span>
              </div>
            </div>
          </div>
        </section>

        {/* Generator Section */}
        <section className="-mt-16 md:-mt-20 relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Create Your Study Plan</h2>
                  <p className="text-gray-600">
                    Enter your details to generate a personalized schedule
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Current Class
                      </label>
                      <select
                        value={currentClass}
                        onChange={(e) => setCurrentClass(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="11">Class 11 (2-year plan)</option>
                        <option value="12">Class 12 (1-year plan)</option>
                        <option value="dropper">Dropper/Repeater</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Months Until NEET
                      </label>
                      <select
                        value={monthsRemaining}
                        onChange={(e) => setMonthsRemaining(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                        <option value="9">9 Months</option>
                        <option value="12">12 Months</option>
                        <option value="18">18 Months</option>
                        <option value="24">24 Months</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Study Hours Per Day (Biology)
                      </label>
                      <select
                        value={hoursPerDay}
                        onChange={(e) => setHoursPerDay(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="2">2 Hours</option>
                        <option value="3">3 Hours</option>
                        <option value="4">4 Hours</option>
                        <option value="5">5 Hours</option>
                        <option value="6">6+ Hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Target Biology Score
                      </label>
                      <select
                        value={targetScore}
                        onChange={(e) => setTargetScore(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                      >
                        <option value="280">280+ (Good)</option>
                        <option value="300">300+ (Very Good)</option>
                        <option value="320">320+ (Excellent)</option>
                        <option value="340">340+ (AIIMS Level)</option>
                        <option value="350">350+ (Top 100 AIR)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Select Your Weak Topics (optional)
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {[
                        'Genetics',
                        'Human Physiology',
                        'Plant Physiology',
                        'Cell Biology',
                        'Ecology',
                        'Biotechnology',
                        'Animal Kingdom',
                        'Plant Kingdom',
                        'Reproduction',
                      ].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => toggleWeakSubject(topic)}
                          className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                            weakSubjects.includes(topic)
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-green-300'
                          }`}
                        >
                          {weakSubjects.includes(topic) && (
                            <CheckCircle className="mr-1 inline h-4 w-4" />
                          )}
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={generateStudyPlan}
                    className="w-full rounded-lg bg-green-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:from-green-700 hover:to-green-700"
                  >
                    Generate My Study Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {showResults && studyPlan.length > 0 && (
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Your Personalized Study Plan
                    </h2>
                    <p className="text-gray-600">
                      {studyPlan.length} weeks of structured preparation
                    </p>
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    <Download className="h-5 w-5" />
                    Download Plan
                  </button>
                </div>

                {/* Lead Form Modal */}
                {showLeadForm && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6">
                      <h3 className="mb-4 text-xl font-bold text-gray-900">
                        Get Your Free Study Plan
                      </h3>
                      <p className="mb-4 text-gray-600">
                        Enter your phone number to download the personalized study plan
                      </p>
                      <div className="mb-4">
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) =>
                              setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                            }
                            placeholder="Enter 10-digit mobile number"
                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowLeadForm(false)}
                          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleLeadSubmit}
                          disabled={isSubmitting}
                          className="flex-1 rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          {isSubmitting ? 'Processing...' : 'Download Now'}
                        </button>
                      </div>
                      <p className="mt-3 text-center text-xs text-gray-500">
                        We will send additional study tips via WhatsApp
                      </p>
                    </div>
                  </div>
                )}

                {/* Summary Cards */}
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                  <div className="rounded-xl bg-green-50 p-4 text-center">
                    <p className="text-3xl font-bold text-green-600">{studyPlan.length}</p>
                    <p className="text-sm text-green-800">Weeks Total</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 text-center">
                    <p className="text-3xl font-bold text-blue-600">
                      {studyPlan.filter((p) => p.priority === 'High').length}
                    </p>
                    <p className="text-sm text-blue-800">High Priority Topics</p>
                  </div>
                  <div className="rounded-xl bg-orange-50 p-4 text-center">
                    <p className="text-3xl font-bold text-orange-600">{hoursPerDay}</p>
                    <p className="text-sm text-orange-800">Hours/Day</p>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-4 text-center">
                    <p className="text-3xl font-bold text-purple-600">{targetScore}+</p>
                    <p className="text-sm text-purple-800">Target Score</p>
                  </div>
                </div>

                {/* Week-by-Week Plan */}
                <div className="space-y-4">
                  {studyPlan.slice(0, 12).map((week, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                    >
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                              Week {week.weekNumber}
                            </span>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                week.priority === 'High'
                                  ? 'bg-red-100 text-red-800'
                                  : week.priority === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {week.priority} Priority
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{week.topic}</h3>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
                          <Clock className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            {week.hoursPerDay} hrs/day
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {week.tasks.map((task, taskIndex) => (
                          <div
                            key={taskIndex}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {studyPlan.length > 12 && (
                    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                      <p className="text-gray-600">
                        + {studyPlan.length - 12} more weeks in your complete plan
                      </p>
                      <button
                        onClick={handleDownload}
                        className="mt-3 inline-flex items-center gap-2 text-green-600 hover:underline"
                      >
                        <Download className="h-4 w-4" />
                        Download full plan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tips Section */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Study Plan Tips for NEET Biology
            </h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {[
                {
                  icon: BookOpen,
                  title: 'NCERT First',
                  desc: '90% questions come directly from NCERT. Read every line, including examples and diagrams.',
                },
                {
                  icon: Target,
                  title: 'Focus on High-Yield',
                  desc: 'Human Physiology, Genetics, and Plant Physiology contribute 50%+ of Biology questions.',
                },
                {
                  icon: Clock,
                  title: 'Consistent Daily Study',
                  desc: '3-4 hours of focused study daily is better than 8-hour cramming sessions.',
                },
                {
                  icon: AlertCircle,
                  title: 'Regular Revision',
                  desc: 'Revise each chapter within 3 days of completion. Use spaced repetition for best retention.',
                },
              ].map((tip, index) => (
                <div key={index} className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <tip.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mb-2 font-semibold text-gray-900">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-700">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Need Expert Guidance for Your Preparation?
                  </h2>
                  <p className="mb-6 text-green-100">
                    Join Cerebrum Biology Academy for personalized coaching with AIIMS expert
                    faculty.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span>Personalized study plan tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span>Weekly progress assessments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-300" />
                      <span>Doubt clearing sessions</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-green-600 transition-colors hover:bg-green-50"
                  >
                    Book Free Demo Class
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[300px] bg-gradient-to-br from-green-600/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
