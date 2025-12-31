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
  MapPin,
  Globe,
  GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const statesSupported = [
  { name: 'Maharashtra', board: 'Maharashtra State Board', language: 'English Medium' },
  { name: 'Karnataka', board: 'Karnataka PUC', language: 'English Medium' },
  { name: 'Tamil Nadu', board: 'TN State Board', language: 'English Medium' },
  { name: 'Andhra Pradesh', board: 'AP Board', language: 'English Medium' },
  { name: 'Telangana', board: 'TS Board', language: 'English Medium' },
  { name: 'Kerala', board: 'Kerala State Board', language: 'English Medium' },
  { name: 'West Bengal', board: 'WBCHSE', language: 'English Medium' },
  { name: 'Uttar Pradesh', board: 'UP Board', language: 'English Medium' },
  { name: 'Rajasthan', board: 'RBSE', language: 'English Medium' },
  { name: 'Gujarat', board: 'GSEB', language: 'English Medium' },
  { name: 'Madhya Pradesh', board: 'MP Board', language: 'English Medium' },
  { name: 'Bihar', board: 'BSEB', language: 'English Medium' },
]

const classesOffered = [
  {
    class: 'Class 9 Foundation',
    description: 'Build strong biology basics from Class 9',
    focus: 'Foundation + Conceptual Clarity',
    icon: GraduationCap,
  },
  {
    class: 'Class 10 Foundation',
    description: 'Board exam preparation with competitive edge',
    focus: 'Board Exam + Foundation',
    icon: BookOpen,
  },
  {
    class: 'Class 11',
    description: '60% NEET syllabus covered in Class 11',
    focus: 'Board + NEET Foundation',
    icon: Target,
  },
  {
    class: 'Class 12',
    description: 'Final year board and NEET preparation',
    focus: 'Board + NEET Intensive',
    icon: Trophy,
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description: 'Expert guidance from faculty with medical entrance expertise.',
  },
  {
    icon: BookOpen,
    title: 'NCERT-Aligned Teaching',
    description: 'State Board + NCERT integration for NEET preparation.',
  },
  {
    icon: Globe,
    title: 'Pan-India Coverage',
    description: 'Online classes available for students from any state.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students for personalized attention.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Real-time teaching with instant doubt resolution.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'WhatsApp doubt support anytime.',
  },
]

const faqs = [
  {
    question: 'Can State Board students crack NEET?',
    answer:
      'Absolutely! NEET is based on NCERT syllabus. Many State Boards have NCERT-aligned curriculum. State Board students from Tamil Nadu, Maharashtra, Karnataka, and other states have cracked NEET with top ranks. The key is to supplement board preparation with NCERT study.',
  },
  {
    question: 'Which State Boards do you support?',
    answer:
      'We support all English medium State Boards whose syllabus is aligned with NCERT/CBSE. This includes Maharashtra, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Kerala, West Bengal, UP, Rajasthan, Gujarat, MP, Bihar, and others.',
  },
  {
    question: 'Is State Board + NEET preparation possible together?',
    answer:
      'Yes! Since most State Board syllabi overlap with NCERT, simultaneous preparation is possible. Our coaching covers your board syllabus while adding NCERT topics and NEET-pattern questions.',
  },
  {
    question: 'Do you teach in regional languages?',
    answer:
      'Our classes are conducted in English as NEET exam is in English/Hindi. We support English medium State Board students. Teaching in English also helps students develop the vocabulary needed for medical studies.',
  },
  {
    question: 'What classes do you offer for State Board students?',
    answer:
      'We offer biology coaching from Class 9 to Class 12. Class 9-10 focuses on foundation building. Class 11-12 focuses on board exams plus NEET preparation.',
  },
]

export default function BiologyTutorStateBoardsPage() {
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
      <section className="relative bg-gradient-to-br from-yellow-900 via-orange-800 to-red-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <MapPin className="w-5 h-5 mr-2 text-yellow-300" />
              All State Boards | English Medium
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">State Board</span> Biology Tutor
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Class 9-12 | NCERT-Aligned | Board + NEET Preparation
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              State Board student? No problem! Our NCERT-aligned coaching prepares you for both
              board exams and NEET. Expert faculty, comprehensive study material, and proven
              results.
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
                  className="border-white text-white hover:bg-white hover:text-yellow-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Courses
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">12+</div>
                <div className="text-sm opacity-80">States Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">9-12</div>
                <div className="text-sm opacity-80">Classes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Globe className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">Online</div>
                <div className="text-sm opacity-80">Pan India</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* States Covered */}
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
              State Boards We Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              English medium students from these boards can join our coaching
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {statesSupported.map((state, index) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 shadow-lg text-center"
              >
                <h3 className="font-bold text-gray-900">{state.name}</h3>
                <p className="text-sm text-gray-600">{state.board}</p>
                <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {state.language}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            Don&apos;t see your board?{' '}
            <Link href="/contact" className="text-yellow-600 hover:underline">
              Contact us
            </Link>{' '}
            - we support all NCERT-aligned English medium boards.
          </p>
        </div>
      </section>

      {/* Classes Offered */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Classes We Offer</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classesOffered.map((item, index) => (
              <motion.div
                key={item.class}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-amber-50 rounded-xl p-6 text-center"
              >
                <item.icon className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.class}</h3>
                <p className="text-gray-600 mb-3">{item.description}</p>
                <span className="inline-block bg-amber-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.focus}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">What You Get</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <feature.icon className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">FAQs</h2>
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
                  <MessageCircle className="w-6 h-6 mr-3 text-yellow-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              State Board Student? We&apos;ve Got You Covered!
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert coaching for board exams + NEET. Book your free demo today!
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
                  className="border-white text-white hover:bg-white hover:text-yellow-600"
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
              href="/biology-tutor-class-11-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 CBSE
            </Link>
            <Link
              href="/biology-tutor-class-12-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 CBSE
            </Link>
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
            <Link
              href="/neet-biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Biology
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
