'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Clock,
  Target,
  Calendar,
  Brain,
  Lightbulb,
  TrendingUp,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const coachingFeatures = [
  {
    icon: Brain,
    title: 'Expert AIIMS Faculty',
    description: 'Learn from doctors who cleared AIIMS and have 15+ years of teaching experience.',
  },
  {
    icon: Target,
    title: 'Result-Oriented Approach',
    description: 'Focused coaching designed to maximize scores in both NEET and board exams.',
  },
  {
    icon: Users,
    title: 'Small Batch Coaching',
    description: 'Limited batches of 15-20 students ensuring personalized attention for everyone.',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Material',
    description:
      'In-house developed study materials, DPPs, and test series aligned with latest patterns.',
  },
  {
    icon: Video,
    title: 'Hybrid Learning',
    description: 'Choose between online and offline coaching modes based on your preference.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Regular assessments with detailed analytics to track improvement areas.',
  },
]

const coachingPrograms = [
  {
    title: 'Foundation Program',
    classes: 'Class 11',
    duration: '1 Year',
    features: [
      'Complete NCERT coverage',
      'NEET foundation building',
      'Weekly tests',
      'Doubt sessions',
    ],
    status: 'Enrolling',
  },
  {
    title: 'Advanced Program',
    classes: 'Class 12',
    duration: '1 Year',
    features: ['Board + NEET combined', 'Previous year analysis', 'Mock tests', 'Revision batches'],
    status: 'Enrolling',
  },
  {
    title: 'Dropper Batch',
    classes: '12th Pass',
    duration: '10 Months',
    features: ['Intensive coaching', 'Daily classes', 'Full syllabus revision', 'Test series'],
    status: 'Limited Seats',
  },
  {
    title: 'Crash Course',
    classes: 'All',
    duration: '3-4 Months',
    features: ['Quick revision', 'High-yield topics', 'Mock tests', 'Last-minute tips'],
    status: 'Starting Soon',
  },
]

const credentials = [
  { label: 'AIIMS Alumni', value: 'Faculty' },
  { label: 'Teaching Experience', value: '15+ Years' },
  { label: 'Students Coached', value: '10,000+' },
  { label: 'NEET Selections', value: '2,500+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Average Improvement', value: '40%' },
]

const faqs = [
  {
    question: 'What is the difference between coaching and regular tuition?',
    answer:
      'Coaching provides a structured, comprehensive program with scheduled classes, regular tests, study materials, and performance tracking. It follows a complete curriculum designed to prepare students thoroughly for competitive exams like NEET along with board exams.',
  },
  {
    question: 'Is online coaching as effective as offline coaching?',
    answer:
      'Yes! Our online coaching uses interactive live classes with real-time doubt solving, digital whiteboard, and recorded sessions for revision. Many students prefer online for convenience while achieving excellent results.',
  },
  {
    question: 'What is included in the coaching fee?',
    answer:
      'The coaching fee includes live/offline classes, comprehensive study materials, DPPs, test series, doubt resolution sessions, recorded lectures access, and performance reports. No hidden charges.',
  },
  {
    question: 'Can I join mid-session?',
    answer:
      'Yes, we accommodate mid-session joiners. Extra classes are provided to help you catch up with the batch. We also have recorded lectures of previous sessions available.',
  },
]

export default function BiologyCoachingPage() {
  return (
    <div className="min-h-screen">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Award className="w-5 h-5 mr-2 text-yellow-300" />
              Premier Biology Coaching
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Coaching</span> for NEET & Boards
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              AIIMS-Trained Faculty | Structured Programs | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Join India&apos;s most result-oriented biology coaching institute. Our comprehensive
              programs are designed by AIIMS doctors to help you crack NEET while excelling in board
              exams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-emerald-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Coaching Programs
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {credentials.map((cred) => (
                <div key={cred.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold text-yellow-300">{cred.value}</div>
                  <div className="text-xs opacity-80">{cred.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Coaching */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Biology Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A coaching institute built on experience, expertise, and exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coachingFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Coaching Programs
            </h2>
            <p className="text-xl text-gray-600">
              Choose the program that fits your preparation needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coachingPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full">
                    {program.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">For:</span> {program.classes}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Duration:</span> {program.duration}
                </div>
                <ul className="space-y-2">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-emerald-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/demo-booking">
              <Button variant="primary" size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Free Counseling
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Coaching Package
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Live Interactive Classes',
              'Recorded Lecture Access',
              'Comprehensive Study Notes',
              'Daily Practice Problems',
              'Weekly Tests & Analysis',
              'Full-Length Mock Tests',
              '24/7 Doubt Resolution',
              'Performance Reports',
              'Parent-Teacher Meetings',
              'Career Counseling',
              'Motivational Sessions',
              'NEET Strategy Workshops',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-emerald-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Begin Your NEET Journey with Expert Coaching
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join the coaching institute that has transformed thousands of NEET aspirants into
              medical students!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-emerald-600"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Explore More</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Classes
            </Link>
            <Link
              href="/biology-tuition-near-me"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tuition Near Me
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology Classes
            </Link>
            <Link
              href="/biology-neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
