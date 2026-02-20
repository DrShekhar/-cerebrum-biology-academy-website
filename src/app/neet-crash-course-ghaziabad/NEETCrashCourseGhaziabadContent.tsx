'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle,
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Play,
  Home,
  Target,
  Clock,
  BookOpen,
  Zap,
  Calendar,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface FAQ {
  question: string
  answer: string
}

const courseHighlights = [
  {
    icon: Clock,
    title: '45 Days Intensive',
    description: '6 hours daily, complete syllabus coverage',
  },
  {
    icon: BookOpen,
    title: '1000+ Questions',
    description: 'High-yield MCQs and previous years',
  },
  { icon: Target, title: '15 Mock Tests', description: 'Full-length NEET pattern tests' },
  {
    icon: TrendingUp,
    title: '75 Marks Avg Improvement',
    description: 'Proven track record of success',
  },
]

const dailySchedule = [
  {
    time: '9:00 - 11:00',
    activity: 'Concept Revision (Botany)',
    description: '2 chapters covered daily',
  },
  {
    time: '11:15 - 13:15',
    activity: 'Concept Revision (Zoology)',
    description: '2 chapters covered daily',
  },
  { time: '14:00 - 15:00', activity: 'MCQ Practice', description: '100+ questions daily' },
  { time: '15:15 - 16:00', activity: 'Doubt Clearing', description: 'One-on-one with faculty' },
  { time: '16:00 - 17:00', activity: 'Daily Test', description: 'Chapter-wise assessment' },
]

const weeklyPlan = [
  { week: 'Week 1-2', focus: 'Cell Biology, Biomolecules, Plant Physiology', questions: 250 },
  { week: 'Week 3-4', focus: 'Human Physiology, Reproduction', questions: 300 },
  { week: 'Week 5-6', focus: 'Genetics, Evolution, Ecology', questions: 300 },
  { week: 'Week 6-7', focus: 'Full Syllabus Revision + Mock Tests', questions: 150 },
]

const successStats = [
  { stat: '75+', label: 'Average Marks Improvement' },
  { stat: '78%', label: 'Clear NEET Cutoff' },
  { stat: '1000+', label: 'Questions Practiced' },
  { stat: '15', label: 'Full Mock Tests' },
]

export default function NEETCrashCourseGhaziabadContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-crash-course-ghaziabad',
      message:
        'Hi! I am interested in the NEET Biology crash course in Ghaziabad. Please share the next batch dates and fee details.',
      campaign: 'crash-course-ghaziabad',
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
              <Link href="/neet-coaching-ghaziabad" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Ghaziabad
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Crash Course</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-orange-600 to-red-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-4xl animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Limited Seats - Next Batch Starting Soon
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              45-Day NEET
              <span className="block text-yellow-400 mt-2">Crash Course in Ghaziabad</span>
            </h1>

            <p className="text-xl text-slate-200 mb-8 max-w-3xl">
              Complete Biology revision in 45 days. 1000+ questions, 15 mock tests, daily doubt
              clearing. Average improvement: 75 marks. Accessible from Ghaziabad via Blue Line Metro
              to Sector 62.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span>45 Days Intensive</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <Target className="w-5 h-5 text-yellow-400" />
                <span>1000+ Questions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span>75+ Marks Improvement</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 inline-block">
              <p className="text-white text-lg">
                Starting from{' '}
                <span className="text-yellow-400 font-bold text-2xl">&#8377;25,000</span> (45 days)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-slate-900 hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-semibold border border-white/30 animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                Get Next Batch Dates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successStats.map((item) => (
              <div key={item.label} className="text-center animate-fadeInUp">
                <p className="text-3xl md:text-4xl font-bold text-orange-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What You Get in 45 Days
            </h2>
            <p className="text-xl text-slate-600">
              Complete preparation package for last-minute revision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{highlight.title}</h3>
                <p className="text-slate-600 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Daily Schedule</h2>
            <p className="text-xl text-slate-600">Intensive 6-hour daily program</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {dailySchedule.map((item) => (
              <div
                key={item.time}
                className="flex items-start gap-4 py-4 border-b border-gray-100 animate-fadeInUp"
              >
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                  {item.time}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{item.activity}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Plan */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">45-Day Syllabus Plan</h2>
            <p className="text-xl text-orange-100">Structured coverage of complete NEET Biology</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyPlan.map((week) => (
              <div
                key={week.week}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold mb-2">{week.week}</h3>
                <p className="text-orange-100 text-sm mb-4">{week.focus}</p>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm">{week.questions}+ Questions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Crash Course Packages
            </h2>
            <p className="text-xl text-slate-600">Choose the duration that fits your preparation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
              <h3 className="text-xl font-bold text-slate-900 mb-2">30-Day Intensive</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">&#8377;18,000</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Complete syllabus revision
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  600+ MCQ practice
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  10 mock tests
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Study material
                </li>
              </ul>
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 bg-gray-100 text-slate-700 rounded-xl font-semibold hover:bg-gray-200 animate-fadeInUp"
              >
                Get Details
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg ring-2 ring-orange-500 relative animate-fadeInUp">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">45-Day Complete</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">&#8377;25,000</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Complete syllabus + revision
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  1000+ MCQ practice
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  15 mock tests
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Daily doubt clearing
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Previous year analysis
                </li>
              </ul>
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 animate-fadeInUp"
              >
                Enroll Now
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg animate-fadeInUp">
              <h3 className="text-xl font-bold text-slate-900 mb-2">60-Day Premium</h3>
              <p className="text-3xl font-bold text-orange-600 mb-4">&#8377;35,000</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Deep concept building
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  1500+ MCQ practice
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  20 mock tests
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  1-on-1 mentorship
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Weak area focus
                </li>
              </ul>
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 bg-gray-100 text-slate-700 rounded-xl font-semibold hover:bg-gray-200 animate-fadeInUp"
              >
                Get Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Join the Next Batch
                </h2>
                <p className="text-slate-600 mb-6">
                  Limited seats available. New batches start every 2 weeks. Book your seat today for
                  the upcoming intensive crash course.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    B-45, Sector 62, Noida — Sector 62 Metro Station (Blue Line)
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    Next batch starts within 2 weeks
                  </p>
                </div>
                <div className="flex gap-4">
                  <a href="tel:+919953643938">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                  <button onClick={handleWhatsApp} className="animate-fadeInUp">
                    <Button>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Seat
                    </Button>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-lg mb-4">Why Crash Course Works</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Focused revision, no distractions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    High-yield topics prioritized
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Daily testing builds exam stamina
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Expert doubt clearing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoTestimonialsSection />
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Use our AI-powered tools to boost your preparation"
      />

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/neet-test-series-ghaziabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Test Series</h3>
              <p className="text-sm text-gray-600">50+ mock tests</p>
            </Link>
            <Link
              href="/neet-dropper-batch-ghaziabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">Dropper Batch</h3>
              <p className="text-sm text-gray-600">1-year program</p>
            </Link>
            <Link
              href="/neet-coaching-ghaziabad"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Hub</h3>
              <p className="text-sm text-gray-600">All programs</p>
            </Link>
            <Link href="/demo-booking" className="bg-gray-50 p-4 rounded-xl hover:shadow-md">
              <h3 className="font-semibold text-teal-600">Book Demo</h3>
              <p className="text-sm text-gray-600">Free counseling</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Don&apos;t Wait - NEET is Coming!</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our 45-day crash course and improve by 75+ marks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <a href="tel:+919953643938">
              <Button
                variant="outline"
                size="xl"
                className="border-white text-white hover:bg-white hover:text-orange-600"
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
