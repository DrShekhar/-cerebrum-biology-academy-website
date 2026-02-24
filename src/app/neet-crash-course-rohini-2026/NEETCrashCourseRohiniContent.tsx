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
  Clock,
  Calendar,
  Zap,
  Train,
  Award,
  FileText,
  MessageCircle,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoTestimonialsSection } from '@/components/testimonials/VideoTestimonialsSection'
import { NEETToolsWidget } from '@/components/seo/NEETToolsWidget'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { LazyYouTubeEmbed } from '@/components/performance/LazyYouTubeEmbed'

interface FAQ {
  question: string
  answer: string
}

const programHighlights = [
  {
    icon: Clock,
    title: 'Daily 4-Hour Classes',
    description: '2 hours concept revision + 1 hour MCQ practice + 1 hour doubt clearing',
  },
  {
    icon: FileText,
    title: '100+ Mock Tests',
    description: 'Full-length NEET pattern tests with detailed analysis and ranking',
  },
  {
    icon: MessageCircle,
    title: 'Daily Doubt Sessions',
    description: 'One-on-one doubt clearing with expert faculty every day',
  },
  {
    icon: BookOpen,
    title: '5000+ MCQs',
    description: 'Chapter-wise and full syllabus practice questions with solutions',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Maximum 25 students per batch for personalized attention',
  },
  {
    icon: TrendingUp,
    title: '80-120 Marks Improvement',
    description: 'Proven track record of significant score improvement',
  },
]

const batchSchedule = [
  {
    batch: 'Morning Batch',
    time: '7:00 AM - 11:00 AM',
    ideal: 'Ideal for droppers and serious aspirants',
  },
  {
    batch: 'Evening Batch',
    time: '4:00 PM - 8:00 PM',
    ideal: 'Ideal for 12th appearing students',
  },
  {
    batch: 'Weekend Batch',
    time: 'Sat-Sun: 9:00 AM - 5:00 PM',
    ideal: 'For students with weekday commitments',
  },
]

const dailySchedule = [
  { time: '7:00 - 9:00', activity: 'Concept Revision', description: 'NCERT + High-Yield Topics' },
  { time: '9:15 - 10:15', activity: 'MCQ Practice', description: '50+ questions daily' },
  { time: '10:30 - 11:00', activity: 'Doubt Clearing', description: 'One-on-one with faculty' },
]

const monthlyPlan = [
  {
    month: 'Month 1-2',
    focus: 'Cell Biology, Biomolecules, Plant Physiology',
    tests: '20 Chapter Tests',
  },
  {
    month: 'Month 3-4',
    focus: 'Human Physiology, Reproduction, Genetics',
    tests: '25 Chapter Tests + 10 Full Mock',
  },
  {
    month: 'Month 5-6',
    focus: 'Ecology, Evolution, Full Revision + Mocks',
    tests: '45 Full Mock Tests',
  },
]

const successStories = [
  {
    name: 'Sadhna Sirin',
    score: '695/720',
    achievement: 'Delhi-NCR Topper NEET 2023',
    image: 'SS',
    youtubeId: 'bk6wQCh6b9w',
  },
  {
    name: 'Nishita',
    score: 'Medical College',
    achievement: '6-Month Intensive Program',
    image: 'N',
    youtubeId: 't5F8RBuHITM',
  },
  {
    name: 'Abhisek',
    score: 'AFMC Selection',
    achievement: 'Armed Forces Medical College',
    image: 'A',
    youtubeId: 'NfhkGqOQXzk',
  },
]

const targetAudience = [
  {
    title: 'NEET Droppers',
    description:
      'Students who have appeared for NEET before and want to significantly improve their score',
    benefits: [
      'Previous attempt analysis',
      'Personalized improvement plan',
      'Focus on weak areas',
      'Mock test strategy',
    ],
  },
  {
    title: '12th Appearing Students',
    description:
      'Students currently in Class 12 who need intensive last-minute NEET preparation',
    benefits: [
      'Board + NEET integration',
      'Quick revision techniques',
      'High-yield topic focus',
      'Time management skills',
    ],
  },
]

const freeTools = [
  { name: 'NEET Rank Predictor', href: '/neet-rank-predictor', description: 'Predict your rank from marks' },
  { name: 'NEET College Predictor', href: '/neet-college-predictor', description: 'Find colleges you can get' },
  { name: 'NEET Biology MCQ', href: '/neet-biology-mcq', description: '10,000+ practice questions' },
]

const successStats = [
  { stat: '695', label: 'Topper Score (Sadhna Sirin)' },
  { stat: '82%', label: 'Students Clear NEET' },
  { stat: '100+', label: 'Mock Tests Included' },
  { stat: '120+', label: 'Avg Marks Improvement' },
]

export default function NEETCrashCourseRohiniContent({ faqs }: { faqs: FAQ[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleWhatsApp = () => {
    trackAndOpenWhatsApp({
      source: 'neet-crash-course-rohini-2026',
      message:
        'Hi! I want to join NEET 2026 crash course at Rohini center. Please share the batch details and fee structure.',
      campaign: 'crash-course-rohini-2026',
    })
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
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
              <Link href="/neet-coaching-rohini" className="text-gray-600 hover:text-teal-600">
                NEET Coaching Rohini
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              <span className="text-teal-700 font-medium">Crash Course 2026</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div
            className="max-w-4xl animate-fadeInUp"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              6-Month Intensive for NEET 2026 | Limited Seats
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              NEET Crash Course
              <span className="block text-yellow-300 mt-2">Rohini 2026</span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              6-month intensive program at DC Chauk, Rohini. Daily 4-hour classes, 100+ mock tests,
              expert faculty. For droppers and 12th appearing students targeting NEET 2026.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-white">
                <Calendar className="w-5 h-5 text-yellow-300" />
                <span>6 Months Intensive</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-white">
                <FileText className="w-5 h-5 text-yellow-300" />
                <span>100+ Mock Tests</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-white">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span>80-120 Marks Improvement</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 inline-block">
              <p className="text-white text-lg">
                Dropper Batch Fee:{' '}
                <span className="text-yellow-300 font-bold text-2xl">Rs 85,500/year</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-white text-red-600 hover:bg-yellow-100 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-semibold animate-fadeInUp"
              >
                <Phone className="w-5 h-5" />
                WhatsApp: 88264-44334
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {successStats.map((item, index) => (
              <div
                key={item.label}
                className="text-center animate-fadeInUp"
              >
                <p className="text-3xl md:text-4xl font-bold text-red-600">{item.stat}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Who Should Join?</h2>
            <p className="text-xl text-slate-600">
              Designed for serious NEET 2026 aspirants who need intensive preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {targetAudience.map((audience, index) => (
              <div
                key={audience.title}
                className="bg-white rounded-2xl p-8 shadow-xl animate-fadeInUp"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  {index === 0 ? (
                    <TrendingUp className="w-8 h-8 text-white" />
                  ) : (
                    <Award className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{audience.title}</h3>
                <p className="text-slate-600 mb-6">{audience.description}</p>
                <ul className="space-y-3">
                  {audience.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What You Get in 6 Months
            </h2>
            <p className="text-xl text-slate-600">Complete NEET preparation package</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programHighlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeInUp"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <highlight.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{highlight.title}</h3>
                <p className="text-slate-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Schedule */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Batch Timings & Schedule</h2>
            <p className="text-xl text-slate-300">Choose the batch that suits your schedule</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {batchSchedule.map((batch, index) => (
              <div
                key={batch.batch}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-fadeInUp"
              >
                <h3 className="text-xl font-bold mb-2">{batch.batch}</h3>
                <p className="text-2xl text-yellow-400 font-bold mb-3">{batch.time}</p>
                <p className="text-slate-300 text-sm">{batch.ideal}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Daily Schedule (Morning Batch)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {dailySchedule.map((item, index) => (
                <div
                  key={item.time}
                  className="flex items-start gap-4 animate-fadeInUp"
                >
                  <div className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap">
                    {item.time}
                  </div>
                  <div>
                    <h4 className="font-bold">{item.activity}</h4>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6-Month Plan */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              6-Month Syllabus Plan
            </h2>
            <p className="text-xl text-slate-600">Structured coverage of complete NEET Biology</p>
          </div>

          <div className="space-y-6">
            {monthlyPlan.map((phase, index) => (
              <div
                key={phase.month}
                className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 md:p-8 text-white animate-fadeInUp"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="md:w-1/4">
                    <span className="inline-block bg-white text-red-600 px-4 py-2 rounded-full text-sm font-bold">
                      {phase.month}
                    </span>
                  </div>
                  <div className="md:w-2/4">
                    <h3 className="text-xl font-bold mb-2">Focus Areas</h3>
                    <p className="text-orange-100">{phase.focus}</p>
                  </div>
                  <div className="md:w-1/4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Target className="w-5 h-5 text-yellow-300" />
                      <span className="font-bold">{phase.tests}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free NEET Tools */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FREE NEET Tools</h2>
            <p className="text-xl text-teal-100">
              Use our AI-powered tools to boost your preparation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {freeTools.map((tool, index) => (
              <div
                key={tool.name}
               className="animate-fadeInUp">
                <Link
                  href={tool.href}
                  className="block bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-teal-100 mb-4">{tool.description}</p>
                  <span className="text-yellow-300 font-semibold flex items-center gap-2">
                    Try Now Free <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="text-center mb-12 animate-fadeInUp"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
            <p className="text-xl text-slate-600">
              Students who achieved their dream with our crash course
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={story.name}
                className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeInUp"
              >
                <LazyYouTubeEmbed
                  videoId={story.youtubeId}
                  title={`${story.name} NEET Success Story`}
                  playButtonSize="md"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {story.image}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{story.name}</h3>
                      <p className="text-red-600 font-semibold">{story.score}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{story.achievement}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-center mt-8 animate-fadeInUp"
          >
            <a
              href="https://www.youtube.com/@cerebrumbiologyacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Play className="w-5 h-5" />
              Watch More Success Stories
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonialsSection />

      {/* Fee & Enrollment */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl p-8 text-white animate-fadeInUp"
            >
              <h2 className="text-2xl font-bold mb-6">Fee Structure</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span>Course</span>
                  <span className="font-semibold">6-Month Crash Course</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span>Duration</span>
                  <span className="font-semibold">Dec 2025 - May 2026</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span>Dropper Batch Fee</span>
                  <span className="font-bold text-yellow-300 text-xl">Rs 85,500/year</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/20">
                  <span>Batch Size</span>
                  <span className="font-semibold">Max 25 students</span>
                </div>
                <div className="flex justify-between py-3">
                  <span>EMI Available</span>
                  <span className="font-semibold">Yes (3-6 months)</span>
                </div>
              </div>
              <p className="mt-6 text-sm text-orange-100">
                * Fee includes study material, 100+ mock tests, and digital platform access
              </p>
            </div>

            <div
              className="bg-slate-900 rounded-2xl p-8 text-white animate-fadeInUp"
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold">Rohini Center Location</h2>
              </div>
              <p className="text-slate-300 mb-4">
                <strong className="text-white">Address:</strong>{' '}
                {CONTACT_INFO.centers.rohini.streetAddress},{' '}
                {CONTACT_INFO.centers.rohini.addressLocality}
              </p>
              <div className="bg-red-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Train className="w-6 h-6 text-red-400" />
                  <div>
                    <p className="font-bold">Metro Connectivity</p>
                    <p className="text-sm text-slate-300">
                      2 min walk from Rohini West Metro (Red Line)
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                <strong className="text-white">Nearby Areas:</strong> Sector 9, DC Chauk, Pitampura,
                Shalimar Bagh, Prashant Vihar
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
                <a href={CONTACT_INFO.centers.rohini.mapUrl} target="_blank" rel="noopener">
                  <Button className="bg-yellow-500 text-slate-900 hover:bg-yellow-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Tools Widget */}
      <NEETToolsWidget
        title="Free NEET Preparation Tools"
        subtitle="Boost your preparation with AI-powered tools"
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
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
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

      {/* Related Pages */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Pages</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link
              href="/neet-coaching-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">NEET Coaching Rohini</h3>
              <p className="text-sm text-gray-600">All programs at Rohini</p>
            </Link>
            <Link
              href="/neet-coaching-dc-chowk-rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">DC Chauk Center</h3>
              <p className="text-sm text-gray-600">Center details & facilities</p>
            </Link>
            <Link
              href="/locations/rohini"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Rohini Location</h3>
              <p className="text-sm text-gray-600">How to reach</p>
            </Link>
            <Link
              href="/demo-booking"
              className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-teal-600">Book Demo</h3>
              <p className="text-sm text-gray-600">Free trial class</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your NEET 2026 Success Starts Here!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our 6-month intensive crash course at Rohini and improve by 80-120 marks
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo-booking">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-red-600 hover:bg-yellow-100 font-bold"
              >
                <Play className="w-5 h-5 mr-2" />
                Book Free Demo
              </Button>
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-bold animate-fadeInUp"
            >
              <Phone className="w-5 h-5" />
              WhatsApp: 88264-44334
            </button>
          </div>
          <p className="mt-6 text-sm text-white/80">
            Limited seats available. Batch starting December 2025.
          </p>
        </div>
      </section>
    </main>
  )
}
