'use client'

/**
 * DropperBatchTemplate
 *
 * Shared, props-driven UI for city-specific NEET dropper batch landing pages.
 * Used by /neet-dropper-batch-{mumbai,bangalore,hyderabad,pune,chennai,kolkata,kota,...}.
 *
 * Existing per-city pages (Faridabad/Noida/Ghaziabad/Gurugram) keep their bespoke
 * Content files — those are ranking pages we don't touch. Only NEW cities use this.
 */

import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Users,
  Target,
  TrendingUp,
  Star,
  RefreshCw,
  BarChart3,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { useForeignPrice, formatINR } from '@/components/ui/DualCurrencyPrice'

interface FAQ {
  question: string
  answer: string
}

interface SuccessStory {
  name: string
  improvement: string
  before: number
  after: number
  college: string
}

export interface DropperBatchTemplateProps {
  cityName: string
  citySlug: string
  // For "served via online classes from {nearestCenter}" — optional
  nearestCenterName?: string
  // Mode label for hero ("online" / "offline" / "hybrid")
  modeLabel?: string
  // Optional override of success stories
  successStories?: SuccessStory[]
  // Per-city differentiation paragraph — covers local NEET ecosystem,
  // coaching competition, student profile. Reduces template-clone signals.
  cityContext?: string
  faqs: FAQ[]
}

const defaultProgramHighlights = [
  {
    title: 'Previous Attempt Analysis',
    description: 'Detailed analysis of your NEET attempt to identify weak areas',
    icon: BarChart3,
  },
  {
    title: 'Personalized Strategy',
    description: 'Custom study plan based on your current level and target score',
    icon: Target,
  },
  {
    title: 'Intensive Practice',
    description: '5000+ questions with detailed solutions and analysis',
    icon: BookOpen,
  },
  {
    title: 'Small Batch',
    description: 'Maximum 20 students per batch for focused attention',
    icon: Users,
  },
  {
    title: 'Daily Tests',
    description: 'Regular testing to track progress and build exam temperament',
    icon: RefreshCw,
  },
  {
    title: 'Score Improvement Track Record',
    description:
      'Many of our droppers improve by 100+ marks vs their first attempt — outcomes vary by starting score, discipline, and target.',
    icon: TrendingUp,
  },
]

const improvementPlan = [
  {
    phase: 'Phase 1: Foundation Reset',
    duration: 'July - October',
    description: 'Re-learn concepts from scratch, fill gaps, build strong base',
    activities: ['Concept clarity sessions', 'NCERT line-by-line', 'Previous mistakes analysis'],
  },
  {
    phase: 'Phase 2: Practice Intensive',
    duration: 'November - February',
    description: 'Massive question practice, topic-wise tests, weak area focus',
    activities: ['5000+ questions', 'Weekly full tests', 'Error correction'],
  },
  {
    phase: 'Phase 3: Revision & Mock',
    duration: 'March - May',
    description: 'Full syllabus revision, mock tests, exam strategy',
    activities: ['30+ mock tests', 'Time management', 'Last month strategy'],
  },
]

const defaultSuccessStories: SuccessStory[] = [
  {
    name: 'Rahul S.',
    improvement: '+180 marks',
    before: 420,
    after: 600,
    college: 'Govt. Medical College',
  },
  {
    name: 'Priya K.',
    improvement: '+145 marks',
    before: 480,
    after: 625,
    college: 'Safdarjung Hospital',
  },
  { name: 'Amit R.', improvement: '+120 marks', before: 510, after: 630, college: 'MAMC Delhi' },
]

export default function DropperBatchTemplate({
  cityName,
  citySlug,
  nearestCenterName,
  modeLabel = 'online',
  successStories = defaultSuccessStories,
  cityContext,
  faqs,
}: DropperBatchTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Geo-aware fee range. Foreign visitors (US-based parents of Indian-
  // origin droppers are a real cohort) see local currency primary with
  // INR as secondary context. Indian visitors see INR-only.
  const lowFx = useForeignPrice(70000)
  const highFx = useForeignPrice(156000)
  const feeRangeINR = `${formatINR(70000)} – ${formatINR(156000)}`
  const feeRangeForeign =
    lowFx && highFx
      ? `${lowFx.symbol}${lowFx.amount.toLocaleString('en-US')} – ${highFx.symbol}${highFx.amount.toLocaleString('en-US')} ${highFx.code}`
      : null

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: `dropper-batch-${citySlug}`,
      message: `Hi! I am interested in NEET Dropper Batch 2026-27 in ${cityName}. Please share details about the program, fees, and demo class.`,
      campaign: `dropper-batch-${citySlug}`,
    })
  }

  const counsellingHref = `https://wa.me/${CONTACT_INFO.whatsapp.number}?text=${encodeURIComponent(
    `Hi! I want to book FREE counseling for NEET Dropper Batch 2026-27 in ${cityName}. Please share available timings.`
  )}`

  const pageUrl = `https://cerebrumbiologyacademy.com/neet-dropper-batch-${citySlug}`

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `NEET Dropper Batch 2026-27 ${cityName}`,
    description: `Intensive 1-year NEET Biology repeater programme for ${cityName} students. AIIMS-trained faculty, previous-attempt analysis, 100-150 mark improvement target.`,
    url: pageUrl,
    inLanguage: 'en-IN',
    educationalLevel: 'NEET-UG Dropper/Repeater',
    provider: { '@type': 'EducationalOrganization', '@id': 'https://cerebrumbiologyacademy.com/#organization', name: 'Cerebrum Biology Academy' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: `NEET ${cityName}`, item: `https://cerebrumbiologyacademy.com/neet-coaching-${citySlug}` },
      { '@type': 'ListItem', position: 3, name: 'Dropper Batch', item: pageUrl },
    ],
  }

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <nav className="bg-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li>
              <Link href="/" className="text-gray-600 hover:text-teal-600">
                <Home className="w-4 h-4" />
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <Link href="/dropper" className="text-gray-600 hover:text-teal-600">
                NEET Dropper Program
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">{cityName} Dropper Batch 2026-27</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <RefreshCw className="w-4 h-4" />
              Batch Starting July 2025
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Dropper Batch 2026-27
              <span className="block text-yellow-400 mt-2">in {cityName}</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Your second attempt is your best attempt. Join our specialised dropper programme for{' '}
              {cityName} students — designed to help motivated droppers reliably add 100+ marks over
              their first attempt. Previous-attempt analysis + personalised strategy, delivered{' '}
              {modeLabel}
              {nearestCenterName
                ? ` (with optional offline access at our ${nearestCenterName} centre)`
                : ''}
              .
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>Target: +100 Marks</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Users className="w-5 h-5 text-yellow-400" />
                <span>Max 20 Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Star className="w-5 h-5 text-orange-400" />
                <span>78% Success Rate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={counsellingHref} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Counselling
                </Button>
              </a>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                WhatsApp: +91-88264-44334
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* City-specific context (additive — only renders if prop provided) */}
      {cityContext && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Dropper coaching for {cityName} — what to know
            </h2>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {cityContext}
            </p>
          </div>
        </section>
      )}

      {/* Why Dropper Batch */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Our Dropper Batch Works for {cityName} Students
            </h2>
            <p className="text-xl text-slate-600">
              Specialised programme for NEET repeaters with proven results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultProgramHighlights.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Phase Plan */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your 1-Year Improvement Plan
            </h2>
            <p className="text-xl text-slate-600">
              Structured approach to maximise your second attempt
            </p>
          </div>

          <div className="space-y-6">
            {improvementPlan.map((phase) => (
              <div
                key={phase.phase}
                className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-6 md:p-8 text-white animate-fadeInUp"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-1/4">
                    <span className="inline-block bg-yellow-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-2">
                      {phase.duration}
                    </span>
                    <h3 className="text-xl font-bold">{phase.phase}</h3>
                  </div>
                  <div className="md:w-3/4">
                    <p className="text-slate-300 mb-4">{phase.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {phase.activities.map((activity) => (
                        <span
                          key={activity}
                          className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-br from-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-bold mb-4">Dropper Improvement Examples</h2>
            <p className="text-green-100">
              Illustrative score-improvement profiles from past dropper cohorts. Names anonymised /
              shortened for privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story) => (
              <div
                key={story.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-slate-900 font-bold text-lg">{story.improvement}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                <p className="text-green-100 mb-4">
                  <span className="line-through">{story.before}</span> →{' '}
                  <span className="text-yellow-300 font-bold">{story.after}</span>
                </p>
                <p className="text-sm text-green-200">Admitted to {story.college}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl animate-fadeInUp">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Programme Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Course</span>
                  <span className="font-semibold">Dropper / Repeater Batch</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold">1 Year (Jul 2025 – May 2026)</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Mode</span>
                  <span className="font-semibold capitalize">{modeLabel}</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Fee Range</span>
                  <span className="font-semibold text-green-600">
                    {feeRangeForeign ?? feeRangeINR}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Tiers</span>
                  <span className="font-semibold">Pursuit | Ascent | Pinnacle ZA</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Batch Size</span>
                  <span className="font-semibold">10–40 students (by tier)</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Tests</span>
                  <span className="font-semibold">Daily + Weekly + 50 Mocks</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-slate-600">Target</span>
                  <span className="font-semibold text-yellow-600">NEET 2026</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 italic">
                Fee depends on your goal, current level, and the work needed to reliably achieve
                your target score.
              </p>
              <a
                href={counsellingHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-6"
              >
                <Button className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                  Book Free Counselling
                </Button>
              </a>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 text-white animate-fadeInUp">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold">{cityName} Dropper Coaching — How It Works</h2>
              </div>
              <p className="text-slate-300 mb-4">
                We don't run a brick-and-mortar centre in {cityName}. Instead, our dropper batch is
                delivered via live online classes from our Delhi NCR faculty — the same teaching
                team and curriculum used at our offline centres.
              </p>
              <p className="text-slate-300 mb-4">
                <strong className="text-white">What you get in {cityName}:</strong>
              </p>
              <ul className="text-slate-300 space-y-2 mb-6">
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> Live
                  interactive Biology classes (recorded if you miss one)
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> 1-on-1
                  mentor calls + previous-attempt analysis
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> Printed
                  study material + test booklets shipped to {cityName}
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> Weekly
                  mock tests with detailed analysis
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /> Optional
                  offline immersion week at our Delhi NCR centre
                </li>
              </ul>
              <div className="flex gap-4 flex-wrap">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-slate-900"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={counsellingHref} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                    <Play className="w-4 h-4 mr-2" />
                    Book Free Demo
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Analyse your previous attempt with our AI-powered tools"
      />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions — {cityName} Dropper Batch
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/dropper" className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md">
              <h3 className="font-semibold text-teal-600">One-Year Dropper Course</h3>
              <p className="text-sm text-gray-600">Intensive programme</p>
            </Link>
            <Link
              href="/courses/neet-dropper"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Dropper Course</h3>
              <p className="text-sm text-gray-600">Full course details</p>
            </Link>
            <Link
              href="/success-stories"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Success Stories</h3>
              <p className="text-sm text-gray-600">Real dropper wins</p>
            </Link>
            <a
              href={counsellingHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Book Demo</h3>
              <p className="text-sm text-gray-600">Free counselling</p>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Second Attempt is Your Best Attempt
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join NEET Dropper Batch 2026-27 from {cityName} — most students who follow the programme
            add 100+ marks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={counsellingHref} target="_blank" rel="noopener noreferrer">
              <Button
                variant="secondary"
                size="xl"
                className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Counselling
              </Button>
            </a>
            <a href={`tel:${CONTACT_INFO.phone.primary}`}>
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
