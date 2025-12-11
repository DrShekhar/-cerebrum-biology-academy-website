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
  Target,
  Brain,
  FileText,
  Clock,
  Laptop,
  Wifi,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const onlineFeatures = [
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time sessions with whiteboard, screen sharing, and instant interaction.',
  },
  {
    icon: FileText,
    title: 'Recorded Lectures',
    description: 'Access recorded sessions anytime. Revise at your own pace, unlimited views.',
  },
  {
    icon: Brain,
    title: 'Online Mock Tests',
    description: 'NTSE-pattern tests with instant results and detailed analysis.',
  },
  {
    icon: Laptop,
    title: 'Learn From Anywhere',
    description: 'Study from home across India. No travel, no compromise on quality.',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Clearing Sessions',
    description: 'Dedicated doubt sessions and WhatsApp support for quick resolution.',
  },
  {
    icon: Target,
    title: 'Performance Analytics',
    description: 'Track progress with detailed reports. Identify weak areas and improve.',
  },
]

const ntseSyllabus = {
  mat: [
    'Verbal Reasoning',
    'Non-Verbal Reasoning',
    'Analogy',
    'Series Completion',
    'Coding-Decoding',
    'Blood Relations',
    'Puzzle Test',
    'Direction Sense',
  ],
  sat: [
    'Physics (Motion, Force, Energy)',
    'Chemistry (Matter, Atoms, Reactions)',
    'Biology (Life Processes, Heredity)',
    'Mathematics (Algebra, Geometry)',
    'Social Science (History, Civics, Geography)',
  ],
}

const studyPlan = [
  {
    phase: 'Foundation Phase',
    duration: 'Months 1-3',
    description: 'Complete syllabus coverage with concept building',
    color: 'bg-sky-100 text-sky-700',
  },
  {
    phase: 'Practice Phase',
    duration: 'Months 4-6',
    description: 'MCQ practice, problem-solving speed, mock tests',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    phase: 'Final Revision',
    duration: 'Months 7-8',
    description: 'Full-length tests, revision, strategy refinement',
    color: 'bg-indigo-100 text-indigo-700',
  },
]

const faqs = [
  {
    question: 'What is NTSE and why should I prepare for it?',
    answer:
      'NTSE (National Talent Search Examination) is a prestigious scholarship exam for Class 10 students. Clearing NTSE provides Rs 1.25 lakh per year scholarship till PhD, recognition on academic profile, and strong preparation base for future competitive exams.',
  },
  {
    question: 'Are online NTSE classes as effective as offline classes?',
    answer:
      'Yes! Our online classes have same faculty, curriculum, and results as offline. Live interaction, recorded lectures, and online tests make learning effective. Many NTSE scholars have prepared entirely online with us.',
  },
  {
    question: 'What is the complete NTSE syllabus?',
    answer:
      'NTSE has two parts: MAT (Mental Ability Test) covering reasoning and aptitude, and SAT (Scholastic Aptitude Test) covering Science, Maths, and Social Science from Class 9-10 NCERT. We cover both comprehensively.',
  },
  {
    question: 'Do you provide study material and mock tests for online students?',
    answer:
      'Yes! All online students receive digital study material, chapter-wise MCQs, previous year papers, and access to 20+ mock tests on our online platform. Same quality as offline materials.',
  },
  {
    question: 'When should I start NTSE preparation?',
    answer:
      'Ideally, start in Class 9 for thorough preparation. However, focused preparation in Class 10 (starting early in the academic year) is also effective. Earlier you start, more time for practice and revision.',
  },
]

export default function NTSEOnlineClassesPage() {
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
      <section className="relative bg-gradient-to-br from-sky-900 via-blue-800 to-cyan-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Wifi className="w-5 h-5 mr-2 text-sky-300" />
              NTSE Online Classes
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-sky-300">NTSE Online</span> Classes
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Live Interactive Classes | Study From Home | Same Quality as Offline
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Prepare for NTSE from anywhere in India with our live online classes. Same expert
              faculty, same proven curriculum, same results. No compromise on quality - just
              convenience added!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-sky-400 text-black hover:bg-sky-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/ntse-coaching">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-sky-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View NTSE Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Video className="w-8 h-8 mx-auto mb-2 text-sky-300" />
                <div className="text-2xl font-bold">Live</div>
                <div className="text-sm opacity-80">Interactive Classes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FileText className="w-8 h-8 mx-auto mb-2 text-sky-300" />
                <div className="text-2xl font-bold">Recorded</div>
                <div className="text-sm opacity-80">Lecture Access</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-sky-300" />
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm opacity-80">Mock Tests</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-sky-300" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-80">Selection Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Online Features Section */}
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
              Online Learning Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for effective NTSE preparation from home
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {onlineFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-sky-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NTSE Syllabus Section */}
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
              Complete NTSE Syllabus Coverage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MAT + SAT comprehensive preparation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-8 border border-sky-100"
            >
              <Brain className="w-12 h-12 text-sky-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">MAT (Mental Ability Test)</h3>
              <ul className="space-y-2">
                {ntseSyllabus.mat.map((topic) => (
                  <li key={topic} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100"
            >
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                SAT (Scholastic Aptitude Test)
              </h3>
              <ul className="space-y-2">
                {ntseSyllabus.sat.map((topic) => (
                  <li key={topic} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    {topic}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Study Plan Section */}
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
              8-Month Study Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured preparation timeline for NTSE success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {studyPlan.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg relative"
              >
                <div className="absolute -top-4 left-6">
                  <span className={`${phase.color} px-4 py-2 rounded-full text-sm font-semibold`}>
                    {phase.duration}
                  </span>
                </div>
                <Calendar className="w-10 h-10 text-sky-600 mb-4 mt-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{phase.phase}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-white">
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
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-sky-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NTSE Journey Online Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Same quality, same results - from the comfort of your home!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  className="bg-sky-400 text-black hover:bg-sky-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo
                </Button>
              </Link>

              <Link href="/enrollment">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-sky-600"
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
              href="/ntse-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NTSE Coaching
            </Link>
            <Link
              href="/ntse-biology-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NTSE Biology Preparation
            </Link>
            <Link
              href="/online-neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Online NEET Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
