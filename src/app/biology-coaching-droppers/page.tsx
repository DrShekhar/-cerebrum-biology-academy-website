'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  GraduationCap,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Phone,
  ArrowRight,
  Clock,
  Award,
  Play,
  Target,
  Microscope,
  RefreshCw,
  TrendingUp,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const dropperProgram = [
  {
    phase: 'Phase 1: Gap Analysis',
    duration: 'Week 1-2',
    description: 'Identify weak areas through diagnostic tests',
    activities: ['Diagnostic test', 'Strength mapping', 'Custom study plan', 'Priority chapters'],
  },
  {
    phase: 'Phase 2: Complete Revision',
    duration: 'Month 1-6',
    description: 'NCERT line-by-line revision with NEET focus',
    activities: ['Class 11 revision', 'Class 12 revision', 'Chapter-wise tests', 'Doubt sessions'],
  },
  {
    phase: 'Phase 3: Problem Practice',
    duration: 'Month 7-9',
    description: 'Intensive MCQ practice and PYQ solving',
    activities: ['10 years PYQ', 'Topic-wise MCQs', 'Error analysis', 'Speed building'],
  },
  {
    phase: 'Phase 4: Mock Tests',
    duration: 'Month 10-12',
    description: 'Full-length tests and exam simulation',
    activities: ['Weekly full tests', 'AIIMS pattern', 'Performance review', 'Final revision'],
  },
]

const programFeatures = [
  {
    icon: RefreshCw,
    title: 'Complete Revision',
    description: 'Class 11 + 12 NCERT line-by-line',
  },
  {
    icon: Target,
    title: 'Gap Analysis',
    description: 'Identify and fix weak areas',
  },
  {
    icon: FileText,
    title: '100+ Mock Tests',
    description: 'Full-length NEET pattern tests',
  },
  {
    icon: TrendingUp,
    title: 'Score Improvement',
    description: 'Guaranteed 100+ marks increase',
  },
]

const courseDetails = {
  duration: '12 months intensive',
  classesPerWeek: '6 classes (12 hours/week)',
  batchSize: '15-20 students',
  fee: '₹48,000/year',
  includes: [
    'Complete Class 11 + 12 revision',
    'NCERT line-by-line notes',
    '100+ full mock tests',
    '10 years PYQ solved',
    'Daily doubt sessions',
    'Personal mentor support',
    'Weekly performance tracking',
    'Parent meetings every month',
  ],
}

const successStories = [
  { name: 'Rahul S.', improvement: '+150 marks', from: '520', to: '670', college: 'Govt Medical' },
  { name: 'Priya M.', improvement: '+120 marks', from: '550', to: '670', college: 'AIIMS' },
  { name: 'Ankit K.', improvement: '+180 marks', from: '480', to: '660', college: 'MAMC Delhi' },
]

const faqs = [
  {
    question: 'Is dropping a year for NEET worth it?',
    answer:
      'Yes, if you have genuine potential and are willing to work hard. Many AIIMS toppers are droppers. With proper guidance and focused preparation, you can significantly improve your score.',
  },
  {
    question: 'How much can I improve in biology as a dropper?',
    answer:
      'Our droppers typically improve by 100-150 marks in biology alone. With complete NCERT revision, extensive practice, and expert guidance, significant improvement is achievable.',
  },
  {
    question: 'What is the daily schedule for dropper batch?',
    answer:
      'We recommend 8-10 hours daily study. Our schedule includes: 4 hours classes, 3 hours self-study, 2 hours practice, 1 hour revision. Weekends have full mock tests.',
  },
  {
    question: 'Do you provide hostel or stay facilities?',
    answer:
      'We offer online coaching, so you can study from home with all facilities - live classes, doubt support, study materials, and mock tests. This saves hostel costs and commute time.',
  },
  {
    question: 'How is the dropper batch different from regular batch?',
    answer:
      'Dropper batch is more intensive with: 12 hours/week classes (vs 8 hours), complete revision of both years, more mock tests (100+ vs 50), and personal mentorship for gap analysis.',
  },
]

export default function BiologyDroppersPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_droppers', {
        event_category: 'conversion',
        event_label: 'biology_droppers',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-rose-800 to-pink-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <RefreshCw className="w-5 h-5 mr-2 text-yellow-300" />
              NEET 2025 Dropper Batch
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Biology Coaching for NEET Droppers</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Turn Your Gap Year Into Success Year
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Intensive biology coaching for NEET repeaters. Complete revision, gap analysis, 100+
              mock tests. Our droppers improve by 100-150 marks on average. AIIMS faculty guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+919876543210">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-red-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-9876543210
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Duration', value: '12 Months' },
                { label: 'Classes/Week', value: '12 Hours' },
                { label: 'Mock Tests', value: '100+' },
                { label: 'Avg Improvement', value: '+150' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <div className="text-xl md:text-2xl font-bold text-yellow-300">{item.value}</div>
                  <div className="text-xs md:text-sm opacity-80">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Phases */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              12-Month Dropper Program Structure
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Systematic approach to maximize your NEET score
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dropperProgram.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500"
              >
                <div className="text-sm text-red-600 font-semibold mb-1">{phase.duration}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{phase.phase}</h3>
                <p className="text-gray-600 text-sm mb-4">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.activities.map((activity) => (
                    <li key={activity} className="flex items-center text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dropper Success Stories
            </h2>
            <p className="text-lg text-gray-600">Real improvements from our dropper students</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-bold text-gray-900">{story.name}</div>
                    <div className="text-red-600 font-semibold">{story.college}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-500">Before</div>
                    <div className="text-xl font-bold text-gray-600">{story.from}</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{story.improvement}</div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500">After</div>
                    <div className="text-xl font-bold text-green-600">{story.to}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-red-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
              >
                <feature.icon className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NEET Dropper Coaching - FAQs
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Make Your Gap Year Count</h2>
            <p className="text-xl mb-8 opacity-90">
              Join our dropper batch and improve by 100+ marks. Book free counseling today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Counseling
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-red-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'NEET Dropper Biology Coaching',
            description:
              'Intensive biology coaching for NEET droppers with complete revision and 100+ mock tests.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            offers: {
              '@type': 'Offer',
              price: '48000',
              priceCurrency: 'INR',
            },
          }),
        }}
      />
    </div>
  )
}
