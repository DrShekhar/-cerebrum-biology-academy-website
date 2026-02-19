'use client'

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

interface FAQ {
  question: string
  answer: string
}

const programHighlights = [
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
    title: 'Score Improvement',
    description: 'Average improvement of 100-150 marks in second attempt',
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

const successStories = [
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

export default function NEETDropperBatchContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'dropper-batch-2025-faridabad',
      message:
        'Hi! I am interested in NEET Dropper Batch 2025-26 in Faridabad. Please share details about the program.',
      campaign: 'dropper-batch-2025-faridabad',
    })
  }

  return (
    <main className="min-h-screen bg-white">
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
              <Link href="/neet-coaching-faridabad" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Faridabad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Dropper Batch 2025-26</span>
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
              NEET Dropper Batch 2025-26
              <span className="block text-yellow-400 mt-2">in Faridabad</span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl">
              Your second attempt is your best attempt. Join our specialized dropper program
              designed to help you improve by 100-150 marks. Previous attempt analysis +
              personalized strategy.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>+100-150 Marks</span>
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
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Counseling
                </Button>
              </Link>
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

      {/* Why Dropper Batch */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Our Dropper Batch Works
            </h2>
            <p className="text-xl text-slate-600">
              Specialized program for NEET repeaters with proven results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programHighlights.map((item, index) => (
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
              Structured approach to maximize your second attempt
            </p>
          </div>

          <div className="space-y-6">
            {improvementPlan.map((phase, index) => (
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
            <h2 className="text-3xl font-bold mb-4">Dropper Success Stories</h2>
            <p className="text-green-100">Real improvements from our previous dropper batches</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
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
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Program Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Course</span>
                  <span className="font-semibold">Dropper/Repeater Batch</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Duration</span>
                  <span className="font-semibold">1 Year (July 2025 - May 2026)</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Fee Range</span>
                  <span className="font-semibold text-green-600">₹90,000 - ₹1,56,000</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Tiers</span>
                  <span className="font-semibold">Pursuit | Ascent | Pinnacle ZA</span>
                </div>
                <div className="flex justify-between py-3 border-b">
                  <span className="text-slate-600">Batch Size</span>
                  <span className="font-semibold">10-40 students (by tier)</span>
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
              <Link href="/demo-booking" className="block mt-6">
                <Button className="w-full bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                  Book Free Counseling
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 text-white animate-fadeInUp">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold">Our Faridabad Center</h2>
              </div>
              <p className="text-slate-300 mb-4">
                <strong className="text-white">Address:</strong>{' '}
                {CONTACT_INFO.location.faridabad.streetAddress},{' '}
                {CONTACT_INFO.location.faridabad.addressLocality}
              </p>
              <p className="text-slate-300 mb-4">
                <strong className="text-white">Landmark:</strong> Near Bata Chowk Metro (5 min walk)
              </p>
              <p className="text-slate-300 mb-6">
                <strong className="text-white">Metro:</strong> Bata Chowk Metro (5 min walk)
              </p>
              <div className="flex gap-4">
                <a href={`tel:${CONTACT_INFO.phone.primary}`}>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-slate-900"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={CONTACT_INFO.location.faridabad.mapUrl} target="_blank" rel="noopener">
                  <Button className="bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    Directions
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
        subtitle="Analyze your previous attempt with our AI-powered tools"
      />

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
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
            <Link
              href="/one-year-dropper-course-faridabad"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">One Year Dropper Course</h3>
              <p className="text-sm text-gray-600">Intensive program</p>
            </Link>
            <Link
              href="/neet-coaching-faridabad"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Faridabad</h3>
              <p className="text-sm text-gray-600">All NEET programs</p>
            </Link>
            <Link
              href="/locations/faridabad"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Faridabad Center</h3>
              <p className="text-sm text-gray-600">Center details</p>
            </Link>
            <Link
              href="/demo-booking"
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Book Demo</h3>
              <p className="text-sm text-gray-600">Free counseling</p>
            </Link>
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
            Join NEET Dropper Batch 2025-26 and improve by 100-150 marks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Counseling
              </Button>
            </Link>
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
