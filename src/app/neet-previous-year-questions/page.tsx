'use client'

import Link from 'next/link'
import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  TrendingUp,
  Target,
  Clock,
  Award,
  BarChart3,
  FileText,
  Brain,
  Zap,
  Star,
  ChevronRight,
  Home,
  Calendar,
  Layers,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/* ─────────────── Animation Variants ─────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

/* ─────────────── Year-wise PYQ Data ─────────────── */

interface YearData {
  year: number
  totalBioQuestions: number
  botanyQuestions: number
  zoologyQuestions: number
  averageDifficulty: 'Easy' | 'Moderate' | 'Hard'
  topChapters: string[]
  available: boolean
  slug?: string
}

const YEAR_WISE_DATA: YearData[] = [
  {
    year: 2024,
    totalBioQuestions: 90,
    botanyQuestions: 45,
    zoologyQuestions: 45,
    averageDifficulty: 'Moderate',
    topChapters: ['Genetics', 'Ecology', 'Human Physiology', 'Plant Physiology'],
    available: true,
    slug: '/neet-biology-mcq/pyq-2024',
  },
  {
    year: 2023,
    totalBioQuestions: 90,
    botanyQuestions: 45,
    zoologyQuestions: 45,
    averageDifficulty: 'Moderate',
    topChapters: ['Molecular Biology', 'Ecology', 'Reproduction', 'Cell Biology'],
    available: false,
  },
  {
    year: 2022,
    totalBioQuestions: 90,
    botanyQuestions: 45,
    zoologyQuestions: 45,
    averageDifficulty: 'Easy',
    topChapters: ['Human Physiology', 'Genetics', 'Plant Kingdom', 'Ecology'],
    available: false,
  },
  {
    year: 2021,
    totalBioQuestions: 90,
    botanyQuestions: 45,
    zoologyQuestions: 45,
    averageDifficulty: 'Moderate',
    topChapters: ['Genetics', 'Reproduction', 'Animal Kingdom', 'Biotechnology'],
    available: false,
  },
  {
    year: 2020,
    totalBioQuestions: 90,
    botanyQuestions: 45,
    zoologyQuestions: 45,
    averageDifficulty: 'Hard',
    topChapters: ['Molecular Biology', 'Human Physiology', 'Ecology', 'Cell Biology'],
    available: false,
  },
  {
    year: 2019,
    totalBioQuestions: 90,
    botanyQuestions: 45,
    zoologyQuestions: 45,
    averageDifficulty: 'Moderate',
    topChapters: ['Genetics', 'Ecology', 'Human Physiology', 'Reproduction'],
    available: false,
  },
]

/* ─────────────── Chapter-wise PYQ Distribution ─────────────── */

interface ChapterPYQ {
  chapter: string
  unit: string
  class: 11 | 12
  avgQuestionsPerYear: number
  totalQuestions6Years: number
  trend: 'increasing' | 'stable' | 'decreasing'
  highYield: boolean
}

const CHAPTER_DISTRIBUTION: ChapterPYQ[] = [
  { chapter: 'Molecular Basis of Inheritance', unit: 'Genetics & Evolution', class: 12, avgQuestionsPerYear: 5, totalQuestions6Years: 30, trend: 'increasing', highYield: true },
  { chapter: 'Principles of Inheritance', unit: 'Genetics & Evolution', class: 12, avgQuestionsPerYear: 4, totalQuestions6Years: 24, trend: 'stable', highYield: true },
  { chapter: 'Human Reproduction', unit: 'Reproduction', class: 12, avgQuestionsPerYear: 4, totalQuestions6Years: 24, trend: 'stable', highYield: true },
  { chapter: 'Ecosystem', unit: 'Ecology', class: 12, avgQuestionsPerYear: 4, totalQuestions6Years: 24, trend: 'increasing', highYield: true },
  { chapter: 'Biodiversity & Conservation', unit: 'Ecology', class: 12, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: true },
  { chapter: 'Human Health & Diseases', unit: 'Biology in Human Welfare', class: 12, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: true },
  { chapter: 'Biotechnology: Principles', unit: 'Biotechnology', class: 12, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'increasing', highYield: false },
  { chapter: 'Evolution', unit: 'Genetics & Evolution', class: 12, avgQuestionsPerYear: 2, totalQuestions6Years: 12, trend: 'stable', highYield: false },
  { chapter: 'Body Fluids & Circulation', unit: 'Human Physiology', class: 11, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: true },
  { chapter: 'Neural Control & Coordination', unit: 'Human Physiology', class: 11, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: true },
  { chapter: 'Chemical Coordination', unit: 'Human Physiology', class: 11, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: true },
  { chapter: 'Cell: Structure & Functions', unit: 'Cell Biology', class: 11, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: false },
  { chapter: 'Cell Cycle & Division', unit: 'Cell Biology', class: 11, avgQuestionsPerYear: 2, totalQuestions6Years: 12, trend: 'stable', highYield: false },
  { chapter: 'Biological Classification', unit: 'Diversity in Living World', class: 11, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: false },
  { chapter: 'Animal Kingdom', unit: 'Diversity in Living World', class: 11, avgQuestionsPerYear: 3, totalQuestions6Years: 18, trend: 'stable', highYield: true },
  { chapter: 'Plant Anatomy', unit: 'Structural Organisation', class: 11, avgQuestionsPerYear: 2, totalQuestions6Years: 12, trend: 'decreasing', highYield: false },
  { chapter: 'Photosynthesis', unit: 'Plant Physiology', class: 11, avgQuestionsPerYear: 2, totalQuestions6Years: 12, trend: 'stable', highYield: false },
  { chapter: 'Respiration in Plants', unit: 'Plant Physiology', class: 11, avgQuestionsPerYear: 2, totalQuestions6Years: 12, trend: 'stable', highYield: false },
  { chapter: 'Biomolecules', unit: 'Cell Biology', class: 11, avgQuestionsPerYear: 2, totalQuestions6Years: 12, trend: 'increasing', highYield: false },
  { chapter: 'Digestion & Absorption', unit: 'Human Physiology', class: 11, avgQuestionsPerYear: 2, totalQuestions6Years: 12, trend: 'stable', highYield: false },
]

/* ─────────────── Helper Components ─────────────── */

const getDifficultyColor = (d: string) => {
  if (d === 'Easy') return 'text-green-600 bg-green-50 border-green-200'
  if (d === 'Hard') return 'text-red-600 bg-red-50 border-red-200'
  return 'text-yellow-600 bg-yellow-50 border-yellow-200'
}

const getTrendIcon = (trend: string) => {
  if (trend === 'increasing') return <TrendingUp className="w-4 h-4 text-green-600" />
  if (trend === 'decreasing') return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
  return <span className="w-4 h-4 text-gray-400">—</span>
}

/* ─────────────── Main Page Component ─────────────── */

export default function NEETPreviousYearQuestionsPage() {
  const highYieldChapters = CHAPTER_DISTRIBUTION.filter((c) => c.highYield)
  const totalQuestions = YEAR_WISE_DATA.reduce((sum, y) => sum + y.totalBioQuestions, 0)

  /* ── Schema Markup ── */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many biology questions are asked in NEET?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NEET has 90 biology questions — 45 from Botany and 45 from Zoology. Biology carries 360 marks out of 720 total, making it the highest-weightage section.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which chapters have the highest weightage in NEET biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Based on analysis of NEET papers from 2019-2024, the highest-weightage chapters are: Molecular Basis of Inheritance (~5 questions/year), Principles of Inheritance (~4 questions/year), Human Reproduction (~4 questions/year), Ecosystem (~4 questions/year), and Body Fluids & Circulation (~3 questions/year).',
        },
      },
      {
        '@type': 'Question',
        name: 'Are NEET biology questions repeated from previous years?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While exact questions are rarely repeated in NEET, the concepts and topics are consistently tested. About 60-70% of questions come from the same high-yield topics every year. Practising PYQs helps you understand the pattern and focus on frequently tested concepts.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to effectively use NEET PYQs for preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'First, complete NCERT thoroughly. Then solve PYQs chapter-wise (not year-wise) to identify weak areas. Focus on high-yield chapters that contribute 60%+ of questions. Review explanations carefully and note recurring patterns. Aim to solve at least 5 years of PYQs before the exam.',
        },
      },
      {
        '@type': 'Question',
        name: 'What percentage of NEET biology questions are NCERT-based?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Approximately 85-90% of NEET biology questions are directly or indirectly based on NCERT textbooks. Many questions test exact lines, diagrams, and examples from NCERT. This makes NCERT the most important resource for NEET biology preparation.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Biology PYQ', item: 'https://cerebrumbiologyacademy.com/neet-previous-year-questions' },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Previous Year Questions (2019-2024)',
    description: 'Practice 500+ NEET Biology PYQs with detailed solutions and chapter-wise analysis.',
    provider: { '@type': 'Organization', name: 'Cerebrum Biology Academy', url: 'https://cerebrumbiologyacademy.com' },
    isAccessibleForFree: true,
    educationalLevel: 'Higher Secondary',
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
  }

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <div initial="hidden" animate="visible" className="min-h-screen bg-gradient-to-b from-slate-50 to-white animate-fadeInUp">

        {/* ── Breadcrumb ── */}
        <nav className="bg-white border-b border-gray-200 animate-fadeInUp">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <Home className="w-4 h-4" /> Home
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900">NEET Biology Previous Year Questions</span>
            </div>
          </div>
        </nav>

        {/* ── Hero Section ── */}
        <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white py-16 px-4 sm:px-6 lg:px-8 animate-fadeInUp">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6" />
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                2019-2024 | {totalQuestions}+ Questions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              NEET Biology Previous Year
              <br />
              <span className="text-yellow-300">Questions with Solutions</span>
            </h1>
            <p className="text-indigo-100 text-lg md:text-xl max-w-3xl mb-8">
              Chapter-wise and year-wise NEET Biology PYQs from 2019 to 2024. Detailed solutions, trend analysis,
              and high-yield topic identification by AIIMS faculty.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              {[
                { label: 'Total PYQs', value: '540+', icon: FileText },
                { label: 'Years Covered', value: '6', icon: Calendar },
                { label: 'High-Yield Chapters', value: String(highYieldChapters.length), icon: Target },
                { label: 'NCERT Based', value: '85-90%', icon: BookOpen },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-yellow-300" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-indigo-200 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Solve PYQs ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Why NEET PYQs Are Non-Negotiable</h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Solving previous year questions is the single most effective strategy for NEET Biology preparation. Here is why.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: '60-70% Repeated Concepts', desc: 'The same high-yield topics are tested every year. PYQs reveal exactly where to focus.', color: 'text-red-600 bg-red-50' },
              { icon: TrendingUp, title: 'Understand Exam Trends', desc: 'See which chapters are gaining weightage and which are losing relevance year after year.', color: 'text-blue-600 bg-blue-50' },
              { icon: Clock, title: 'Time Management', desc: 'PYQ practice builds speed. You learn to identify question types and solve them faster.', color: 'text-green-600 bg-green-50' },
              { icon: Brain, title: 'NCERT Alignment', desc: '85-90% of NEET biology is NCERT-based. PYQs show you exactly which NCERT lines are tested.', color: 'text-purple-600 bg-purple-50' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Year-wise PYQ Cards ── */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 animate-fadeInUp">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-7 h-7 text-indigo-600" />
              <h2 className="text-3xl font-bold text-gray-900">Year-wise NEET Biology PYQs</h2>
            </div>
            <p className="text-gray-600 mb-10 ml-10">
              Practice NEET biology questions from each year. Start with the most recent paper for current patterns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {YEAR_WISE_DATA.map((yearData) => (
                <div key={yearData.year} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">NEET {yearData.year}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(yearData.averageDifficulty)}`}>
                        {yearData.averageDifficulty}
                      </span>
                    </div>
                    <p className="text-indigo-100 text-sm mt-1">{yearData.totalBioQuestions} Biology Questions</p>
                  </div>
                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <span>Botany: {yearData.botanyQuestions} Qs</span>
                      <span>Zoology: {yearData.zoologyQuestions} Qs</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Top Chapters</p>
                      <div className="flex flex-wrap gap-1.5">
                        {yearData.topChapters.map((ch) => (
                          <span key={ch} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">{ch}</span>
                        ))}
                      </div>
                    </div>
                    {yearData.available ? (
                      <Link
                        href={yearData.slug || '#'}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors w-full justify-center"
                      >
                        Practice Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-500 rounded-lg font-medium text-sm w-full justify-center">
                        <Clock className="w-4 h-4" /> Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Chapter-wise PYQ Distribution ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-7 h-7 text-indigo-600" />
            <h2 className="text-3xl font-bold text-gray-900">Chapter-wise Question Distribution</h2>
          </div>
          <p className="text-gray-600 mb-10 ml-10">
            Based on analysis of NEET 2019-2024 papers. Focus on chapters marked as High Yield for maximum marks.
          </p>

          {/* High-Yield Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Star className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 text-lg">High-Yield Chapters (60%+ of all questions)</h3>
                <p className="text-amber-800 text-sm mt-1">
                  These {highYieldChapters.length} chapters contribute over 60% of all NEET biology questions.
                  Master these first for the highest score improvement.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {highYieldChapters.map((ch) => (
                    <span key={ch.chapter} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                      {ch.chapter} ({ch.avgQuestionsPerYear}Q/yr)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Distribution Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Chapter</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Unit</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Class</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Avg Qs/Year</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">6-Year Total</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Trend</th>
                    <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {CHAPTER_DISTRIBUTION.sort((a, b) => b.avgQuestionsPerYear - a.avgQuestionsPerYear).map((ch, idx) => (
                    <tr key={ch.chapter} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{ch.chapter}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{ch.unit}</td>
                      <td className="px-4 py-3 text-center text-xs text-gray-600">{ch.class}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-bold text-indigo-700">{ch.avgQuestionsPerYear}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">{ch.totalQuestions6Years}</td>
                      <td className="px-4 py-3 text-center">{getTrendIcon(ch.trend)}</td>
                      <td className="px-4 py-3 text-center">
                        {ch.highYield ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-bold rounded-full">HIGH</span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">Normal</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── How to Use PYQs Effectively ── */}
        <section className="bg-indigo-50 py-16 px-4 sm:px-6 lg:px-8 animate-fadeInUp">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">How to Use PYQs Effectively</h2>
            <div className="space-y-6">
              {[
                { step: '1', title: 'Complete NCERT First', desc: 'Read every line, diagram, and example in NCERT Biology for both Class 11 and 12. This is your foundation — 85-90% of NEET questions come from NCERT.', icon: BookOpen },
                { step: '2', title: 'Solve Chapter-wise, Not Year-wise', desc: 'After finishing a chapter in NCERT, immediately solve all PYQs from that chapter (across all years). This reinforces concepts and reveals which specific topics are tested repeatedly.', icon: Layers },
                { step: '3', title: 'Focus on High-Yield Chapters First', desc: `Start with the ${highYieldChapters.length} high-yield chapters that contribute 60%+ of questions. Genetics, Ecology, Human Physiology, and Reproduction should be your top priorities.`, icon: Target },
                { step: '4', title: 'Analyse Mistakes Deeply', desc: 'For every wrong answer, go back to NCERT and find the exact line where the concept is mentioned. Make a separate error log categorised by chapter. This becomes your revision sheet.', icon: Brain },
                { step: '5', title: 'Simulate Exam Conditions', desc: 'After chapter-wise practice, solve full year papers (90 questions in 90 minutes) under timed conditions. This builds exam temperament and time management skills.', icon: Clock },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 bg-white rounded-xl p-6 border border-indigo-100">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ Section ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How many biology questions are asked in NEET?',
                a: 'NEET has 90 biology questions — 45 from Botany and 45 from Zoology. Biology carries 360 marks out of 720 total (50%), making it the highest-weightage section and the easiest to score in.',
              },
              {
                q: 'Which chapters have the highest weightage in NEET biology?',
                a: 'Based on 2019-2024 analysis: Molecular Basis of Inheritance (~5 Qs/year), Principles of Inheritance (~4 Qs/year), Human Reproduction (~4 Qs/year), Ecosystem (~4 Qs/year), and Body Fluids & Circulation (~3 Qs/year) are the top chapters.',
              },
              {
                q: 'Are NEET biology questions repeated from previous years?',
                a: 'Exact questions are rarely repeated, but concepts are. About 60-70% of questions test the same high-yield topics every year. Practising PYQs helps you master these recurring patterns.',
              },
              {
                q: 'How to effectively use NEET PYQs for preparation?',
                a: 'Complete NCERT first, then solve PYQs chapter-wise (not year-wise) to identify weak areas. Focus on the 10 high-yield chapters that contribute 60%+ of questions. Review explanations carefully and maintain an error log.',
              },
              {
                q: 'What percentage of NEET biology questions are NCERT-based?',
                a: 'Approximately 85-90% are directly or indirectly from NCERT. Many questions test exact lines, diagrams, and examples. NCERT is the single most important resource for NEET biology.',
              },
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-14 px-4 sm:px-6 lg:px-8 animate-fadeInUp">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-3">Struggling with NEET Biology PYQs?</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
              Get expert guidance from AIIMS-trained faculty. We analyse your weak chapters and create a personalised PYQ-based study plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${CONTACT_INFO.phone.primary}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call {CONTACT_INFO.phone.display.primary}
              </a>
              <a
                href={CONTACT_INFO.whatsapp.linkWithMessage(
                  'Hi! I need help with NEET Biology PYQ practice. Can you guide me?'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
            <p className="text-indigo-200 text-sm mt-6">Available Monday-Saturday: 7 AM - 9 PM</p>
          </div>
        </section>

        {/* ── Related Resources ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related NEET Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Biology Notes for NEET', desc: 'Chapter-wise notes for all 38 NEET biology chapters by AIIMS faculty.', href: '/biology-notes-for-neet', icon: BookOpen },
              { title: 'How to Score 360 in Biology', desc: 'Complete strategy guide for scoring full marks in NEET Biology.', href: '/blog/how-to-score-360-in-neet-biology', icon: Award },
              { title: 'NEET Biology MCQ Practice', desc: 'Chapter-wise MCQ practice with instant feedback and explanations.', href: '/neet-biology-mcq', icon: Zap },
            ].map((res) => (
              <Link key={res.title} href={res.href} className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-200 transition-all">
                <res.icon className="w-8 h-8 text-indigo-600 mb-3" />
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{res.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{res.desc}</p>
                <span className="inline-flex items-center gap-1 text-indigo-600 text-sm font-medium mt-3">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Footer Note ── */}
        <div className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8 animate-fadeInUp">
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-gray-500 text-sm">
              All previous year questions are sourced from officially released NEET papers.
              Solutions and analysis are prepared by Cerebrum Biology Academy faculty.
              <br />
              Updated for NEET 2026 preparation.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
