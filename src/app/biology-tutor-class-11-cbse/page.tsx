'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Target,
  Brain,
  Microscope,
  Dna,
  Leaf,
  Heart,
  Medal,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class11Syllabus = [
  {
    unit: 'Unit 1',
    title: 'Diversity in the Living World',
    chapters: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'],
    weightage: '14%',
    icon: Leaf,
  },
  {
    unit: 'Unit 2',
    title: 'Structural Organisation',
    chapters: [
      'Morphology of Flowering Plants',
      'Anatomy of Flowering Plants',
      'Structural Organisation in Animals',
    ],
    weightage: '5%',
    icon: Microscope,
  },
  {
    unit: 'Unit 3',
    title: 'Cell: Structure and Function',
    chapters: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'],
    weightage: '9%',
    icon: Dna,
  },
  {
    unit: 'Unit 4',
    title: 'Plant Physiology',
    chapters: [
      'Transport in Plants',
      'Mineral Nutrition',
      'Photosynthesis',
      'Respiration in Plants',
      'Plant Growth and Development',
    ],
    weightage: '6%',
    icon: Leaf,
  },
  {
    unit: 'Unit 5',
    title: 'Human Physiology',
    chapters: [
      'Digestion and Absorption',
      'Breathing and Exchange of Gases',
      'Body Fluids and Circulation',
      'Excretory Products',
      'Locomotion and Movement',
      'Neural Control',
      'Chemical Coordination',
    ],
    weightage: '20%',
    icon: Heart,
  },
]

const features = [
  {
    icon: Award,
    title: 'AIIMS Trained Faculty',
    description:
      'Learn from Dr. Shekhar Singh and faculty trained at premier medical institutions.',
  },
  {
    icon: BookOpen,
    title: 'NCERT Focus',
    description: 'Complete NCERT coverage with additional NEET-oriented questions and concepts.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: '10-15 students per batch for personalized attention and peer learning.',
  },
  {
    icon: Target,
    title: 'NEET Foundation',
    description:
      'Build strong concepts from Class 11 itself. 60% of NEET syllabus is from Class 11.',
  },
  {
    icon: Video,
    title: 'Live Classes',
    description: 'Interactive live sessions with instant doubt resolution.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'WhatsApp doubt support anytime. Never get stuck on a concept.',
  },
]

const faqs = [
  {
    question: 'Why is Class 11 Biology important for NEET?',
    answer:
      '60% of NEET Biology syllabus comes from Class 11. Topics like Human Physiology, Plant Kingdom, and Animal Kingdom carry significant weightage. A strong Class 11 foundation is essential for NEET success.',
  },
  {
    question: 'What makes your Class 11 CBSE biology coaching different?',
    answer:
      "We don't just teach for board exams - we build NEET foundation from day one. Our AIIMS-trained faculty ensures conceptual clarity, and small batches provide personalized attention. We cover NCERT thoroughly while adding competitive exam perspective.",
  },
  {
    question: 'Is NCERT enough for Class 11 CBSE?',
    answer:
      'For board exams, NCERT is sufficient. But for NEET, you need additional practice with MCQs and conceptual questions. Our coaching covers NCERT completely while preparing you for competitive exams.',
  },
  {
    question: 'Do you offer both online and offline classes for Class 11?',
    answer:
      'Yes! We offer offline classes at our 4 centers in Delhi NCR and live online classes for students across India. Both modes have the same faculty and curriculum.',
  },
  {
    question: 'What is the fee for Class 11 CBSE biology coaching?',
    answer:
      'Our Class 11 biology coaching fees start from Rs 24,000 per year. We offer flexible payment options and merit scholarships. Contact us for detailed fee structure.',
  },
]

export default function BiologyTutorClass11CBSEPage() {
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
      <section className="relative bg-indigo-900 text-white py-20 overflow-hidden">
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
              Class 11 CBSE Biology
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Class 11 CBSE</span> Biology Tutor
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Build Your NEET Foundation | 60% Syllabus from Class 11
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Don&apos;t wait for Class 12 to start NEET preparation. 60% of NEET Biology comes from
              Class 11. Start strong with AIIMS-trained faculty and build concepts that last.
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
                  View Class 11 Course
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
                <Users className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">10-15</div>
                <div className="text-sm opacity-80">Students/Batch</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-80">NCERT Coverage</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">60%</div>
                <div className="text-sm opacity-80">NEET Weightage</div>
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
              Complete NCERT coverage with NEET-oriented approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class11Syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <unit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {unit.weightage} NEET
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{unit.unit}</h3>
                <p className="text-blue-600 font-medium mb-3">{unit.title}</p>
                <ul className="space-y-1">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="text-sm text-gray-600 flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                      {chapter}
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              What You Get in Class 11 Coaching
            </h2>
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
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
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
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey from Class 11
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build strong foundation now. Don&apos;t wait for Class 12!
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
              href="/biology-tutor-class-12-cbse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 12 CBSE Biology
            </Link>
            <Link
              href="/biology-tutor-class-11-icse"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 ICSE Biology
            </Link>
            <Link
              href="/biology-tutor"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tutor
            </Link>
            <Link
              href="/courses/class-11"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Class 11 Course Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
