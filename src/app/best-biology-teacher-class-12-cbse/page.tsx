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
  Heart,
  Microscope,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class12Syllabus = [
  {
    unit: 'Unit 6',
    title: 'Reproduction',
    topics: [
      'Reproduction in Organisms',
      'Sexual Reproduction in Flowering Plants',
      'Human Reproduction',
      'Reproductive Health',
    ],
    neetWeight: '12%',
    icon: Heart,
    highlight: true,
  },
  {
    unit: 'Unit 7',
    title: 'Genetics & Evolution',
    topics: ['Principles of Inheritance', 'Molecular Basis of Inheritance', 'Evolution'],
    neetWeight: '18%',
    icon: Dna,
    highlight: true,
  },
  {
    unit: 'Unit 8',
    title: 'Biology & Human Welfare',
    topics: [
      'Human Health and Disease',
      'Strategies for Food Production',
      'Microbes in Human Welfare',
    ],
    neetWeight: '10%',
    icon: Heart,
    highlight: false,
  },
  {
    unit: 'Unit 9',
    title: 'Biotechnology',
    topics: ['Biotechnology: Principles and Processes', 'Biotechnology and Its Applications'],
    neetWeight: '8%',
    icon: Microscope,
    highlight: true,
  },
  {
    unit: 'Unit 10',
    title: 'Ecology',
    topics: [
      'Organisms and Populations',
      'Ecosystem',
      'Biodiversity and Conservation',
      'Environmental Issues',
    ],
    neetWeight: '12%',
    icon: Leaf,
    highlight: false,
  },
]

const faqs = [
  {
    question: 'How to balance Class 12 boards and NEET preparation?',
    answer:
      'Our integrated curriculum covers both simultaneously. NCERT is the key - master it for boards and NEET. We add competitive practice after completing each chapter. Most topics overlap, so efficient planning helps you excel in both.',
  },
  {
    question: 'Which Class 12 chapters are most important for NEET?',
    answer:
      'Genetics and Evolution (18% weightage), Reproduction (12%), and Ecology (12%) are highest scoring. Biotechnology also carries significant weight. Our teaching prioritizes these high-yield topics.',
  },
  {
    question: 'Is Class 12 Biology harder than Class 11?',
    answer:
      'Class 12 Biology has more conceptual depth, especially in Genetics and Biotechnology. However, topics like Ecology and Reproduction are more factual. With proper guidance, Class 12 can be highly scoring.',
  },
  {
    question: 'When should I complete Class 12 syllabus for NEET?',
    answer:
      'Ideally by December of Class 12. This gives you 4-5 months for revision and mock tests. Our structured schedule ensures timely completion with adequate revision time.',
  },
]

export default function BestBiologyTeacherClass12CBSEPage() {
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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">
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
              CBSE Class 12 Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Best <span className="text-yellow-300">Biology Teacher</span> for Class 12 CBSE
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Board Excellence + NEET Success | Genetics & Biotechnology Experts
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 12 is the decisive year. Our AIIMS-trained faculty ensures you ace both boards
              and NEET with focused preparation on high-weightage topics like Genetics,
              Reproduction, and Biotechnology.
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

              <Link href="/courses/class-12">
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
                <div className="text-2xl font-bold">40%</div>
                <div className="text-sm opacity-80">NEET Syllabus</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">Dual</div>
                <div className="text-sm opacity-80">Board + NEET</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-80">Success Rate</div>
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
              Class 12 CBSE Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-weightage topics highlighted for NEET preparation
            </p>
          </motion.div>

          <div className="space-y-6">
            {class12Syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl p-8 shadow-lg ${
                  unit.highlight ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center ${
                        unit.highlight ? 'bg-blue-200' : 'bg-gray-100'
                      }`}
                    >
                      <unit.icon
                        className={`w-7 h-7 ${unit.highlight ? 'text-blue-600' : 'text-gray-600'}`}
                      />
                    </div>
                    <div>
                      <span
                        className={`text-sm font-semibold ${
                          unit.highlight ? 'text-blue-600' : 'text-gray-500'
                        }`}
                      >
                        {unit.unit}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">{unit.title}</h3>
                    </div>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      unit.highlight ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    NEET Weight: {unit.neetWeight}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {unit.topics.map((topic) => (
                    <span
                      key={topic}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        unit.highlight ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                      }`}
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

      {/* Critical Year Section */}
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
              Why Class 12 is the Decisive Year
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8"
            >
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Board Exams</h3>
              <p className="text-gray-600">
                Class 12 boards determine your academic record. Many medical colleges consider board
                percentages for admission and scholarships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8"
            >
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">NEET Attempt</h3>
              <p className="text-gray-600">
                Your first serious NEET attempt. Class 12 topics like Genetics contribute 18% to
                NEET - highest among all topics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8"
            >
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Career Foundation</h3>
              <p className="text-gray-600">
                Class 12 performance opens doors to top medical colleges. Many students crack NEET
                in their first attempt with proper Class 12 preparation.
              </p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Excel in Boards and Crack NEET</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Make Class 12 count. Book your free demo today!
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
              href="/best-biology-teacher-class-11-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 CBSE Biology
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
