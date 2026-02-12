'use client'

import { motion } from 'framer-motion'
import {
  Users,
  CheckCircle,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  GraduationCap,
  Target,
  FileText,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class12Syllabus = [
  {
    unit: 'Unit 6: Reproduction',
    chapters: [
      'Reproduction in Organisms',
      'Sexual Reproduction in Plants',
      'Human Reproduction',
      'Reproductive Health',
    ],
    neetWeightage: '12%',
    color: 'bg-rose-100 border-rose-300',
  },
  {
    unit: 'Unit 7: Genetics & Evolution',
    chapters: ['Principles of Inheritance', 'Molecular Basis of Inheritance', 'Evolution'],
    neetWeightage: '18%',
    color: 'bg-purple-100 border-purple-300',
  },
  {
    unit: 'Unit 8: Biology in Human Welfare',
    chapters: [
      'Human Health and Diseases',
      'Strategies for Food Enhancement',
      'Microbes in Human Welfare',
    ],
    neetWeightage: '8%',
    color: 'bg-blue-100 border-blue-300',
  },
  {
    unit: 'Unit 9: Biotechnology',
    chapters: ['Biotechnology: Principles & Processes', 'Biotechnology and Its Applications'],
    neetWeightage: '10%',
    color: 'bg-green-100 border-green-400',
  },
  {
    unit: 'Unit 10: Ecology',
    chapters: [
      'Organisms and Populations',
      'Ecosystem',
      'Biodiversity and Conservation',
      'Environmental Issues',
    ],
    neetWeightage: '12%',
    color: 'bg-green-100 border-green-300',
  },
]

const tuitionFeatures = [
  {
    icon: Target,
    title: 'Dual Focus: Boards + NEET',
    description:
      'Optimized curriculum that prepares you for both board exams and NEET simultaneously.',
  },
  {
    icon: TrendingUp,
    title: 'High-Weightage Topics',
    description:
      'Genetics & Evolution alone carries 18% weightage in NEET. We ensure mastery of these crucial topics.',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description: 'Limited to 15-20 students per batch for maximum personalized attention.',
  },
  {
    icon: BookOpen,
    title: 'Complete NCERT Mastery',
    description:
      'Every line of NCERT covered with NEET-level depth and previous year question integration.',
  },
  {
    icon: Video,
    title: 'Revision-Focused Learning',
    description:
      'Quick revision sessions, recorded lectures, and chapter summaries for effective retention.',
  },
  {
    icon: FileText,
    title: 'Mock Tests & Analysis',
    description:
      'Full-length mock tests with detailed performance analysis and improvement strategies.',
  },
]

const credentials = [
  { label: 'AIIMS Alumni', value: 'Faculty' },
  { label: 'Experience', value: '15+ Years' },
  { label: 'Students', value: '10,000+' },
  { label: 'AIIMS Selections', value: '67+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Class 12 Focus', value: '40% NEET' },
]

const faqs = [
  {
    question: 'How do you balance board and NEET preparation in Class 12?',
    answer:
      'Our curriculum is designed for dual success. We cover NCERT thoroughly for boards while adding NEET-level depth. Board exams are in Feb-March, giving us time to focus on NEET-specific preparation post-boards. We maintain a strategic timeline throughout the year.',
  },
  {
    question: 'Which Class 12 topics are most important for NEET?',
    answer:
      'Genetics & Evolution (18%), Reproduction (12%), and Ecology (12%) are the highest-weightage topics. We give extra attention to these while ensuring complete syllabus coverage. Biotechnology and Human Welfare chapters are also crucial.',
  },
  {
    question: 'Do you provide revision courses closer to NEET?',
    answer:
      'Yes! We have dedicated revision batches and crash courses. After board exams, we run intensive NEET-focused revision covering both Class 11 and 12 with emphasis on high-yield topics and mock tests.',
  },
  {
    question: 'What study materials are provided for Class 12?',
    answer:
      'You receive: comprehensive chapter notes, NCERT line-by-line analysis, topic-wise NEET PYQs (last 10 years), full-length mock tests, quick revision sheets, and recorded lecture access for unlimited revision.',
  },
]

export default function BiologyTuitionClass12Page() {
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
      <section className="relative bg-gradient-to-br from-rose-900 via-pink-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              Class 12 Biology Tuition
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tuition for <span className="text-yellow-300">Class 12</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Ace Boards + Crack NEET | 40% NEET Syllabus in Class 12
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 12 is the decisive year. Balance board preparation with NEET excellence. Our
              expert faculty helps you score 95%+ in boards while being NEET-ready!
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
                  className="border-white text-white hover:bg-white hover:text-rose-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
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

      {/* Class 12 Syllabus with NEET Weightage */}
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
              Class 12 Biology Syllabus & NEET Weightage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Genetics alone has 18% weightage! Master these high-yield topics for NEET success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class12Syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl p-6 border-2 ${unit.color}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{unit.unit}</h3>
                  <span className="bg-rose-600 text-white text-xs px-3 py-1 rounded-full">
                    NEET: {unit.neetWeightage}
                  </span>
                </div>
                <ul className="space-y-2">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-rose-600 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Class 12 Tuition */}
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
              Why Choose Our Class 12 Biology Tuition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic preparation for both boards and NEET
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tuitionFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Class 12 Package
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Live Interactive Classes',
              'Recorded Lecture Access',
              'Complete NCERT Notes',
              'Chapter-wise Tests',
              'Full Mock Tests',
              'NEET PYQs (10 Years)',
              '24/7 Doubt Support',
              'Performance Analysis',
              'Board Exam Focus',
              'NEET Strategy Sessions',
              'Quick Revision Sheets',
              'Post-Board Crash Course',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-rose-600 mr-3 flex-shrink-0" />
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
                  <MessageCircle className="w-6 h-6 mr-3 text-rose-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Make Class 12 Count - Ace Both Boards & NEET
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Strategic preparation for dual success. Book a free demo class today!
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
                  className="border-white text-white hover:bg-white hover:text-rose-600"
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
              href="/biology-tuition-class-11"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tuition Class 11
            </Link>
            <Link
              href="/biology-neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
            </Link>
            <Link
              href="/biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Classes
            </Link>
            <Link
              href="/biology-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Coaching
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
