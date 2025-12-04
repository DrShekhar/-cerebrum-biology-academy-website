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
  Leaf,
  Bug,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const class11Syllabus = [
  {
    unit: 'Unit 1: Diversity of Living Organisms',
    chapters: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'],
    weightage: '14%',
    questions: '7-8 Questions',
  },
  {
    unit: 'Unit 2: Structural Organisation',
    chapters: [
      'Morphology of Flowering Plants',
      'Anatomy of Flowering Plants',
      'Structural Organisation in Animals',
    ],
    weightage: '5%',
    questions: '2-3 Questions',
  },
  {
    unit: 'Unit 3: Cell Structure & Function',
    chapters: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'],
    weightage: '9%',
    questions: '5-6 Questions',
  },
  {
    unit: 'Unit 4: Plant Physiology',
    chapters: [
      'Transport in Plants',
      'Mineral Nutrition',
      'Photosynthesis',
      'Respiration',
      'Plant Growth',
    ],
    weightage: '6%',
    questions: '3-4 Questions',
  },
  {
    unit: 'Unit 5: Human Physiology',
    chapters: [
      'Digestion and Absorption',
      'Breathing and Exchange of Gases',
      'Body Fluids and Circulation',
      'Excretory Products',
      'Locomotion and Movement',
      'Neural Control',
      'Chemical Coordination',
    ],
    weightage: '12%',
    questions: '6-7 Questions',
  },
]

const programFeatures = [
  {
    icon: BookOpen,
    title: 'Complete NCERT Coverage',
    description: 'Line-by-line NCERT with NEET-level explanations',
  },
  {
    icon: Microscope,
    title: 'Diagram Mastery',
    description: 'All diagrams with labeling practice for NEET',
  },
  {
    icon: Target,
    title: 'Weekly Chapter Tests',
    description: 'NEET pattern MCQs after every chapter',
  },
  {
    icon: Clock,
    title: '24/7 Doubt Support',
    description: 'WhatsApp doubt clearing with faculty',
  },
]

const courseDetails = {
  duration: '10 months (June - March)',
  classesPerWeek: '3 classes (6 hours/week)',
  batchSize: '15-20 students',
  fee: '₹36,000/year',
  includes: [
    'Complete NCERT notes',
    'Chapter-wise test series',
    'Previous year questions',
    'Recorded lectures access',
    'WhatsApp doubt support',
    'Monthly parent meetings',
  ],
}

const faqs = [
  {
    question: 'Why is Class 11 biology important for NEET?',
    answer:
      'Class 11 biology forms the foundation for NEET. Topics like Cell Biology, Plant & Animal Kingdom, and Human Physiology contribute around 46% of NEET questions. Strong Class 11 preparation is crucial for NEET success.',
  },
  {
    question: 'What is the syllabus for Class 11 NEET biology?',
    answer:
      'Class 11 NEET biology includes: Diversity of Living Organisms (14%), Cell Structure (9%), Human Physiology (12%), Plant Physiology (6%), and Structural Organisation (5%). We cover all chapters with NEET-level depth.',
  },
  {
    question: 'How many hours should I study biology in Class 11?',
    answer:
      'For NEET aspirants, we recommend 2-3 hours daily for biology in Class 11. Our coaching provides 6 hours/week of classes plus self-study materials and regular tests.',
  },
  {
    question: 'Can I join in the middle of the year?',
    answer:
      'Yes! We offer catch-up batches and recorded lectures for students joining mid-year. Our faculty provides extra sessions to cover missed topics.',
  },
  {
    question: 'Is online Class 11 biology coaching effective?',
    answer:
      'Yes! Our online coaching has the same success rate as offline. Live classes, screen-shared diagrams, instant doubt solving, and recorded lectures make online learning very effective.',
  },
]

export default function BiologyClass11Page() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class11', {
        event_category: 'conversion',
        event_label: 'biology_class_11',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white py-20 overflow-hidden">
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
              <GraduationCap className="w-5 h-5 mr-2 text-yellow-300" />
              Class 11 NEET Biology Foundation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Class 11 Biology Coaching</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Build Your NEET Foundation with Expert AIIMS Faculty
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Comprehensive Class 11 biology coaching covering complete NCERT + NEET level
              preparation. Cell Biology, Plant Kingdom, Human Physiology &amp; more.
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
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91-9876543210
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Duration', value: '10 Months' },
                { label: 'Classes/Week', value: '6 Hours' },
                { label: 'Batch Size', value: '15-20' },
                { label: 'Fee', value: '₹36,000' },
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

      {/* Syllabus Section */}
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
              Class 11 NEET Biology Syllabus
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete NCERT coverage with NEET weightage analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class11Syllabus.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">{unit.unit}</h3>
                  <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {unit.weightage}
                  </span>
                </div>
                <ul className="space-y-2 mb-4">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
                <div className="text-sm text-purple-600 font-medium">{unit.questions} in NEET</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              What You Get in Class 11 Biology Coaching
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 text-center border border-purple-100"
              >
                <feature.icon className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 md:py-20 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Course Includes</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {courseDetails.includes.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Class 11 Biology Coaching - FAQs
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
                className="bg-gray-50 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Your Class 11 NEET Biology Journey
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Build a strong foundation for NEET 2026. Book your free demo today!
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
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-purple-700"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  View All Courses
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
            name: 'Class 11 NEET Biology Coaching',
            description:
              'Comprehensive Class 11 biology coaching for NEET preparation with AIIMS faculty.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'blended',
              duration: 'P10M',
            },
            offers: {
              '@type': 'Offer',
              price: '36000',
              priceCurrency: 'INR',
            },
          }),
        }}
      />
    </div>
  )
}
