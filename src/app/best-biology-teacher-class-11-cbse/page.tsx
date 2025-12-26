'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  MessageCircle,
  Play,
  ArrowRight,
  Dna,
  Leaf,
  Bug,
  Microscope,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class11Syllabus = [
  {
    unit: 'Unit 1',
    title: 'Diversity of Living Organisms',
    topics: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'],
    neetWeight: '12%',
    icon: Bug,
  },
  {
    unit: 'Unit 2',
    title: 'Structural Organisation',
    topics: [
      'Morphology of Flowering Plants',
      'Anatomy of Flowering Plants',
      'Structural Organisation in Animals',
    ],
    neetWeight: '8%',
    icon: Leaf,
  },
  {
    unit: 'Unit 3',
    title: 'Cell Structure and Function',
    topics: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Division'],
    neetWeight: '15%',
    icon: Microscope,
  },
  {
    unit: 'Unit 4',
    title: 'Plant Physiology',
    topics: [
      'Transport in Plants',
      'Mineral Nutrition',
      'Photosynthesis',
      'Respiration in Plants',
      'Plant Growth and Development',
    ],
    neetWeight: '14%',
    icon: Leaf,
  },
  {
    unit: 'Unit 5',
    title: 'Human Physiology',
    topics: [
      'Digestion and Absorption',
      'Breathing and Exchange of Gases',
      'Body Fluids and Circulation',
      'Excretory Products',
      'Locomotion and Movement',
      'Neural Control',
      'Chemical Coordination',
    ],
    neetWeight: '11%',
    icon: Brain,
  },
]

const faqs = [
  {
    question: 'Why is Class 11 Biology important for NEET?',
    answer:
      'Class 11 Biology covers approximately 60% of the NEET syllabus. Topics like Cell Biology, Plant Physiology, and Human Physiology form the foundation for Class 12 and directly appear in NEET. A strong Class 11 base is essential for NEET success.',
  },
  {
    question: 'How is CBSE Class 11 Biology taught at Cerebrum?',
    answer:
      'We follow NCERT thoroughly while adding depth for NEET preparation. Our AIIMS-trained faculty uses visual learning with diagrams and models. Each chapter includes board-style and NEET-style questions for comprehensive preparation.',
  },
  {
    question: 'Can I prepare for both boards and NEET simultaneously?',
    answer:
      'Absolutely! Our integrated approach covers CBSE board requirements while building NEET foundation. The same NCERT content serves both purposes - we just add extra practice for competitive exam patterns.',
  },
  {
    question: 'What is the fee for Class 11 CBSE Biology coaching?',
    answer:
      'Our Class 11 CBSE Biology coaching starts from Rs 24,000/year with flexible EMI options. This includes board preparation, NEET foundation, study materials, and unlimited doubt sessions.',
  },
]

export default function BestBiologyTeacherClass11CBSEPage() {
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
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-yellow-300" />
              CBSE Class 11 Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Teacher</span> for Class 11 CBSE
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Complete NCERT Coverage | NEET Foundation | 60% NEET Syllabus
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 11 is the foundation year for NEET. Our AIIMS-trained faculty ensures you master
              NCERT while building competitive exam skills. Don&apos;t let Class 11 become your weak
              point in NEET!
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

              <Link href="/courses/class-11">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Dna className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">60%</div>
                <div className="text-sm opacity-80">NEET Syllabus</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-80">Units Covered</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Pass Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm opacity-80">Per Batch</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Syllabus Section */}
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
              Class 11 CBSE Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete NCERT coverage with NEET weightage analysis
            </p>
          </motion.div>

          <div className="space-y-6">
            {class11Syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                      <unit.icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-sm text-blue-600 font-semibold">{unit.unit}</span>
                      <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                    </div>
                  </div>
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    NEET Weight: {unit.neetWeight}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {unit.topics.map((topic) => (
                    <span
                      key={topic}
                      className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Class 11 Matters */}
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
              Why Class 11 Foundation Matters
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">60% NEET Syllabus Coverage</h3>
                  <p className="text-gray-600">
                    Class 11 topics directly contribute to 60% of NEET Biology questions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Foundation for Class 12</h3>
                  <p className="text-gray-600">
                    Topics like Cell Biology and Physiology are prerequisites for Class 12 chapters
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">High-Scoring Topics</h3>
                  <p className="text-gray-600">
                    Plant Physiology and Human Physiology are among highest scoring NEET topics
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Early Start Advantage</h3>
                  <p className="text-gray-600">
                    Students who start NEET prep in Class 11 have 2x better chances of selection
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-blue-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>AIIMS-trained expert faculty</span>
                </li>
                <li className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Complete NCERT coverage</span>
                </li>
                <li className="flex items-center gap-3">
                  <Microscope className="w-5 h-5 text-blue-600" />
                  <span>Visual learning with diagrams</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <span>24/7 doubt resolution</span>
                </li>
                <li className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span>Board + NEET dual preparation</span>
                </li>
              </ul>
            </motion.div>
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
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-start">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your NEET Journey Today</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build a strong Class 11 foundation. Book your free demo!
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
                  className="border-white text-white hover:bg-white hover:text-blue-600"
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
              href="/best-biology-teacher-class-12-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 CBSE Biology
            </Link>
            <Link
              href="/biology-teacher"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Teacher
            </Link>
            <Link
              href="/best-biology-teacher-for-neet"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best Teacher for NEET
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
