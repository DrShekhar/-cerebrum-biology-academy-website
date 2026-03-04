'use client'

import Link from 'next/link'
import {
  PainPointsSection,
  BenefitsSection,
  MiniTestimonials,
  SEOFAQSection,
  ToolsCTASection,
} from '@/components/seo-landing'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import {
  Phone,
  MessageCircle,
  Clock,
  Award,
  GraduationCap,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Zap,
} from 'lucide-react'

const WA_NUMBER = CONTACT_INFO.whatsapp.number
const PHONE = CONTACT_INFO.phone.primary

function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

const painPoints = {
  title: 'Struggling with Last-Minute Biology Preparation?',
  points: [
    {
      icon: 'clock' as const,
      question: 'Only weeks left and too many chapters to cover?',
      solution:
        'Our crash courses condense the entire syllabus into focused 15-45 day programs with priority-based chapter coverage.',
    },
    {
      icon: 'shuffle' as const,
      question: 'Confused between Board and NEET preparation strategy?',
      solution:
        'Choose a dedicated Board-only track (15 days) or comprehensive NEET track (30-45 days) designed for different goals.',
    },
    {
      icon: 'target' as const,
      question: 'Scoring low in Biology mock tests despite studying?',
      solution:
        'Daily tests with instant feedback, MCQ drills, and exam-pattern practice papers improve scores rapidly.',
    },
    {
      icon: 'help-circle' as const,
      question: 'No mentor to clear doubts and guide revision?',
      solution:
        'AIIMS-trained faculty available for doubt-clearing via WhatsApp, plus structured revision plans every day.',
    },
  ],
}

const benefits = {
  title: 'Why Students Choose Our Crash Courses',
  subtitle: 'Intensive, focused, and result-oriented programs designed for last-minute preparation',
  items: [
    {
      icon: 'graduation-cap' as const,
      title: 'AIIMS-Trained Faculty',
      description:
        'Learn from Dr. Shekhar C Singh with 15+ years of experience coaching NEET toppers and AIIMS selections.',
    },
    {
      icon: 'users' as const,
      title: 'Small Batch (15-20)',
      description:
        'Limited seats ensure personal attention, real-time doubt clearing, and better learning outcomes.',
    },
    {
      icon: 'bar-chart' as const,
      title: 'Daily Tests & Analysis',
      description:
        'Chapter-wise and full-length mock tests daily with detailed performance analysis and weak-area focus.',
    },
    {
      icon: 'message-circle' as const,
      title: 'WhatsApp Doubt Support',
      description:
        'Get biology doubts resolved instantly via dedicated WhatsApp group with faculty access round the clock.',
    },
    {
      icon: 'zap' as const,
      title: 'Intensive Daily Sessions',
      description:
        '4-6 hours of focused teaching daily covering high-weightage topics, shortcuts, and exam strategies.',
    },
    {
      icon: 'award' as const,
      title: 'Proven Results (98% Success)',
      description:
        '1,50,000+ students coached with 98% NEET qualification rate and 67+ AIIMS selections.',
    },
  ],
}

const toolsCTA = {
  title: 'Free Practice Tools for Crash Course Students',
  tools: [
    {
      name: 'NEET MCQ Practice',
      description: 'Chapter-wise MCQs with instant answers and explanations',
      link: '/mcq-practice',
      icon: 'mcq' as const,
    },
    {
      name: 'NEET Rank Predictor',
      description: 'Estimate your rank based on expected NEET 2026 score',
      link: '/neet-rank-predictor',
      icon: 'rank' as const,
    },
    {
      name: 'Medical College Predictor',
      description: 'Find which colleges you can get based on your NEET rank',
      link: '/neet-college-predictor',
      icon: 'college' as const,
    },
  ],
}

const testimonials = [
  {
    name: 'Priya Sharma',
    achievement: 'CBSE Board 2025 — 95% in Biology',
    quote:
      'I joined the 15-day Board crash course with barely 2 weeks left. Dr. Shekhar covered every important topic systematically. I scored 95% in Biology!',
    score: '95%',
  },
  {
    name: 'Arjun Mehta',
    achievement: 'NEET 2025 — 650/720',
    quote:
      'The NEET crash course was a game-changer. Daily MCQ practice and doubt-clearing sessions helped me jump from 450 to 650 in just 45 days.',
    score: '650/720',
  },
  {
    name: 'Sneha Gupta',
    achievement: 'NEET 2025 — AIIMS Selection',
    quote:
      'Best decision was joining the crash course after my coaching ended. The focused approach and small batch made all the difference. Got into AIIMS!',
    score: 'AIIMS',
  },
]

const faqs = [
  {
    question: 'What is the difference between the Board Crash Course and NEET Crash Course?',
    answer:
      'The Board Crash Course (15 days, Rs 15,000) focuses exclusively on CBSE Class 12 Biology board exam preparation with NCERT-based revision. The NEET Crash Course (30-45 days, Rs 30,000) covers the complete NEET Biology syllabus including Class 11 and 12 topics with advanced MCQ practice and competitive exam strategies.',
  },
  {
    question: 'When do the crash course batches start in 2026?',
    answer:
      'New batches for both courses start in March 2026. The Board Crash Course runs for 15 days and the NEET Crash Course for 30-45 days. Contact us on WhatsApp for exact batch dates and seat availability.',
  },
  {
    question: 'Who teaches the Biology crash course?',
    answer:
      'Dr. Shekhar C Singh, an AIIMS-trained biology expert with 15+ years of experience, personally teaches all crash course batches. He has coached 1,50,000+ students with 67+ AIIMS selections.',
  },
  {
    question: 'Is the crash course available online?',
    answer:
      'Yes, both the Board and NEET crash courses are conducted online via live interactive classes. You can attend from anywhere in India. All sessions are also recorded for revision.',
  },
  {
    question: 'How many students are in each crash course batch?',
    answer:
      'Each batch is limited to 15-20 students to ensure personal attention, real-time doubt clearing, and effective learning. Seats fill quickly, so early enrollment is recommended.',
  },
  {
    question: 'What study materials are provided in the crash course?',
    answer:
      'Students receive comprehensive notes, chapter-wise MCQ sets, previous year question papers, daily practice tests, and access to our online MCQ practice platform with 19,000+ questions.',
  },
  {
    question: 'Can I join the NEET crash course if I am a dropper/repeater?',
    answer:
      'Absolutely! The NEET Crash Course is ideal for droppers who need focused revision and intensive practice. Many of our successful students joined as droppers and improved their scores by 100-200 marks.',
  },
  {
    question: 'What is the fee for the crash courses and are there any discounts?',
    answer:
      'The Board Crash Course fee is Rs 15,000 (15 days) and NEET Crash Course fee is Rs 30,000 (30-45 days). Early bird and sibling discounts may be available. Contact us on WhatsApp for current offers.',
  },
  {
    question: 'How do I enroll in the crash course?',
    answer:
      'Simply send us a WhatsApp message at +91 88264 44334 with your name, class, and preferred course (Board/NEET). Our team will guide you through the enrollment process and share batch details.',
  },
]

const comparisonData = [
  { feature: 'Duration', board: '15 Days', neet: '30-45 Days' },
  { feature: 'Target Exam', board: 'CBSE Class 12 Board', neet: 'NEET 2026' },
  { feature: 'Daily Hours', board: '4 Hours', neet: '5-6 Hours' },
  { feature: 'Practice Questions', board: '2,000+', neet: '5,000+' },
  { feature: 'Course Fee', board: 'Rs 15,000', neet: 'Rs 30,000' },
  { feature: 'Batch Size', board: '15-20 Students', neet: '15-20 Students' },
  { feature: 'Mock Tests', board: '5 Full-Length', neet: '15+ Full-Length' },
  { feature: 'Syllabus', board: 'Class 12 NCERT', neet: 'Class 11 + 12 Complete' },
]

export default function CrashCoursePageContent() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            New Batches Starting March 2026
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Biology Crash Course 2026 — <span className="text-yellow-400">Board Exams & NEET</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            Intensive 15-day Board Exam prep and 30-45 day NEET crash course by AIIMS faculty.
            Limited seats, online batches, guaranteed results.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={waLink('Hi! I want to know about the Biology Crash Course 2026.')}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-3.5 text-lg font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: '2 Courses', icon: BookOpen },
              { label: '15-45 Days', icon: Clock },
              { label: '98% Success', icon: Award },
              { label: 'AIIMS Faculty', icon: GraduationCap },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                <stat.icon className="mx-auto mb-1 h-5 w-5 text-yellow-400" />
                <p className="text-sm font-semibold text-white">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <PainPointsSection painPoints={painPoints} />

      {/* Course Comparison Cards */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-900">Choose Your Crash Course</h2>
            <p className="text-lg text-slate-600">
              Two focused programs for two different goals — pick the one that fits your exam
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Board Crash Course Card */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Board Crash Course</h3>
                  <span className="rounded-full bg-blue-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-100">
                    Starting Soon
                  </span>
                </div>
                <p className="mt-1 text-sm text-blue-100">CBSE Class 12 Biology Board Exam</p>
              </div>
              <div className="p-6">
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">Rs 15,000</span>
                  <span className="text-slate-500">/ 15 days</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {[
                    '15-day intensive program',
                    'Complete Class 12 NCERT coverage',
                    '4 hours daily live sessions',
                    '2,000+ practice questions',
                    '5 full-length mock tests',
                    'Board exam pattern focus',
                    'Daily doubt clearing',
                    'Recorded sessions for revision',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink('Hi! I want to join the Board Exam Crash Course (15 days).')}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enroll via WhatsApp
                </a>
              </div>
            </div>

            {/* NEET Crash Course Card */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">NEET Crash Course</h3>
                  <span className="rounded-full bg-yellow-400/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-900">
                    Most Popular
                  </span>
                </div>
                <p className="mt-1 text-sm text-purple-100">Complete NEET 2026 Biology</p>
              </div>
              <div className="p-6">
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">Rs 30,000</span>
                  <span className="text-slate-500">/ 30-45 days</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {[
                    '30-45 day comprehensive program',
                    'Class 11 + 12 complete syllabus',
                    '5-6 hours daily live sessions',
                    '5,000+ practice questions',
                    '15+ full-length mock tests',
                    'NEET exam pattern & strategy',
                    'Daily doubt clearing + WhatsApp',
                    'Previous year paper analysis',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink('Hi! I want to join the NEET Crash Course 2026 (30-45 days).')}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enroll via WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Not sure which course is right for you?{' '}
              <a
                href={waLink('Hi! I need help choosing between Board and NEET Crash Course.')}
                className="font-semibold text-green-600 underline hover:text-green-700"
              >
                Ask us on WhatsApp
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Quick Comparison</h2>

          {/* Desktop Table */}
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 sm:block">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                    Board Course
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                    NEET Course
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-6 py-3.5 text-sm font-medium text-slate-700">
                      {row.feature}
                    </td>
                    <td className="px-6 py-3.5 text-center text-sm text-slate-600">{row.board}</td>
                    <td className="px-6 py-3.5 text-center text-sm text-slate-600">{row.neet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 sm:hidden">
            {comparisonData.map((row) => (
              <div key={row.feature} className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {row.feature}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-blue-50 px-3 py-2 text-center">
                    <p className="text-xs text-blue-600">Board</p>
                    <p className="text-sm font-semibold text-slate-800">{row.board}</p>
                  </div>
                  <div className="rounded-md bg-purple-50 px-3 py-2 text-center">
                    <p className="text-xs text-purple-600">NEET</p>
                    <p className="text-sm font-semibold text-slate-800">{row.neet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <BenefitsSection benefits={benefits} />

      {/* Tools CTA */}
      <ToolsCTASection toolsCTA={toolsCTA} />

      {/* Testimonials */}
      <MiniTestimonials testimonials={testimonials} />

      {/* FAQs */}
      <SEOFAQSection faqs={faqs} title="Crash Course — Frequently Asked Questions" />

      {/* Related Pages */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
            Explore More Courses & Resources
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'NEET Biology Coaching',
                href: '/neet-biology-coaching',
                desc: 'Full-year NEET Biology program',
              },
              {
                title: 'NEET Coaching South Delhi',
                href: '/neet-coaching-south-delhi',
                desc: 'Classes near South Extension',
              },
              {
                title: 'MCQ Practice',
                href: '/mcq-practice',
                desc: '19,000+ Biology MCQs free',
              },
              {
                title: 'NEET Rank Predictor',
                href: '/neet-rank-predictor',
                desc: 'Check your expected rank',
              },
              {
                title: 'NEET Coaching Gurugram',
                href: '/neet-coaching-gurugram',
                desc: 'Biology coaching in Gurugram',
              },
              {
                title: 'Biology Blog',
                href: '/blog',
                desc: 'Tips, strategies & updates',
              },
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
              >
                <p className="font-semibold text-slate-800 group-hover:text-blue-600">
                  {page.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">{page.desc}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-sm font-medium text-yellow-400">
            <Zap className="h-4 w-4" />
            Limited Seats — Batches Filling Fast!
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Start Your Crash Course Today
          </h2>
          <p className="mb-3 text-lg text-slate-300">
            Join 1,50,000+ students who transformed their Biology scores with Cerebrum Academy.
          </p>
          <p className="mb-8 text-sm font-medium text-yellow-400">Next batch: March 10, 2026</p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={waLink('Hi! I want to enroll in the Crash Course. Please share details.')}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3.5 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-5 w-5" />
              Enroll on WhatsApp
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-3.5 text-lg font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Phone className="h-5 w-5" />
              Call +91 88264 44334
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
