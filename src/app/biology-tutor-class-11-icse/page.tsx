'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  CheckCircle,
  Award,
  BookOpen,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Dna,
  Leaf,
  Heart,
  Microscope,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const icseSyllabus = [
  {
    unit: 'Section A',
    title: 'Basic Biology',
    topics: ['Cell Theory', 'Cell Cycle', 'Genetics', 'Absorption by Roots', 'Transpiration'],
    icon: Microscope,
  },
  {
    unit: 'Section B',
    title: 'Plant Physiology',
    topics: ['Photosynthesis', 'Chemical Coordination in Plants', 'Ecosystem'],
    icon: Leaf,
  },
  {
    unit: 'Section C',
    title: 'Human Anatomy',
    topics: ['Circulatory System', 'Excretory System', 'Nervous System', 'Endocrine System'],
    icon: Heart,
  },
  {
    unit: 'Section D',
    title: 'Reproduction',
    topics: ['Reproduction in Plants', 'Human Reproductive System'],
    icon: Dna,
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Learn from experts who understand both ICSE pattern and competitive exam requirements.',
  },
  {
    icon: BookOpen,
    title: 'ISC + NCERT Integration',
    description: 'Complete ISC syllabus with NCERT supplement for NEET preparation.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch for personalized attention.',
  },
  {
    icon: Target,
    title: 'Competitive Exam Focus',
    description: 'Build foundation for NEET/medical entrances alongside board prep.',
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
    question: 'Is ICSE Biology different from CBSE for NEET?',
    answer:
      "The core concepts are similar, but ICSE has slightly different syllabus organization. For NEET, you'll need to supplement with NCERT. Our coaching covers ISC syllabus completely while adding NCERT topics essential for NEET.",
  },
  {
    question: 'Can ICSE students crack NEET?',
    answer:
      "Absolutely! Many NEET toppers come from ICSE background. The key is to supplement ICSE preparation with NCERT study. Our coaching ensures you're prepared for both ISC boards and NEET.",
  },
  {
    question: 'Do you provide ISC-specific study material?',
    answer:
      'Yes, we provide study material aligned with ISC syllabus. Additionally, we provide NCERT-based notes for NEET preparation, ensuring comprehensive coverage.',
  },
  {
    question: 'What is the fee for Class 11 ICSE biology coaching?',
    answer:
      'Our fees start from Rs 24,000 per year. We offer flexible payment options and merit scholarships. Contact us for detailed fee structure.',
  },
]

export default function BiologyTutorClass11ICSEPage() {
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
      <section className="relative bg-gradient-to-br from-green-800 via-cyan-800 to-blue-900 text-white py-20 overflow-hidden">
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
              Class 11 ICSE Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Class 11 ICSE</span> Biology Tutor
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              ISC Syllabus + NEET Foundation | Expert ICSE Coaching
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              ICSE students have unique needs. Our coaching covers ISC syllabus thoroughly while
              building NEET foundation with NCERT integration. AIIMS-trained faculty ensures you
              excel in both.
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
                  className="border-white text-white hover:bg-white hover:text-green-800"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Course Details
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
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">ISC</div>
                <div className="text-sm opacity-80">Complete Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Target className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">NCERT</div>
                <div className="text-sm opacity-80">Integration</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">10-15</div>
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
              ICSE Class 11 Biology Syllabus
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete ISC syllabus coverage with NCERT integration for competitive exams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {icseSyllabus.map((section, index) => (
              <motion.div
                key={section.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <section.icon className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{section.unit}</h3>
                    <p className="text-green-600 font-medium">{section.title}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {section.topics.map((topic) => (
                    <li key={topic} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
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
                className="bg-gray-50 rounded-xl p-8"
              >
                <feature.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
                  <MessageCircle className="w-6 h-6 mr-3 text-green-600 flex-shrink-0 mt-1" />
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start Your ICSE Biology Journey</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert coaching tailored for ICSE students. Book your free demo today!
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
                  className="border-white text-white hover:bg-white hover:text-green-600"
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
              href="/biology-tutor-class-12-icse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 ICSE Biology
            </Link>
            <Link
              href="/biology-tutor-class-11-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 CBSE Biology
            </Link>
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
