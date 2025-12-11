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
  Clock,
  Target,
  Calendar,
  Brain,
  Lightbulb,
  Award,
  FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const class11Syllabus = [
  {
    unit: 'Unit 1: Diversity of Living Organisms',
    chapters: ['The Living World', 'Biological Classification', 'Plant Kingdom', 'Animal Kingdom'],
    neetWeightage: '14%',
    color: 'bg-blue-100 border-blue-300',
  },
  {
    unit: 'Unit 2: Structural Organisation',
    chapters: [
      'Morphology of Flowering Plants',
      'Anatomy of Flowering Plants',
      'Structural Organisation in Animals',
    ],
    neetWeightage: '5%',
    color: 'bg-green-100 border-green-300',
  },
  {
    unit: 'Unit 3: Cell Structure & Function',
    chapters: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Cell Division'],
    neetWeightage: '15%',
    color: 'bg-purple-100 border-purple-300',
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
    neetWeightage: '12%',
    color: 'bg-emerald-100 border-emerald-300',
  },
  {
    unit: 'Unit 5: Human Physiology',
    chapters: [
      'Digestion',
      'Breathing',
      'Body Fluids',
      'Excretion',
      'Locomotion',
      'Neural Control',
      'Chemical Coordination',
    ],
    neetWeightage: '14%',
    color: 'bg-rose-100 border-rose-300',
  },
]

const tuitionFeatures = [
  {
    icon: Brain,
    title: 'Strong Foundation Building',
    description:
      'Class 11 covers 60% of NEET syllabus. We build strong conceptual foundations from day one.',
  },
  {
    icon: Target,
    title: 'NEET-Oriented Teaching',
    description:
      'Every topic taught with NEET perspective. Previous year questions integrated throughout.',
  },
  {
    icon: Users,
    title: 'Small Batch Size',
    description:
      'Limited to 15-20 students per batch ensuring personalized attention for each student.',
  },
  {
    icon: BookOpen,
    title: 'Complete NCERT Coverage',
    description:
      'Line-by-line NCERT coverage with additional reference material for competitive edge.',
  },
  {
    icon: Video,
    title: 'Live + Recorded Classes',
    description: 'Live interactive sessions with recorded access for revision anytime, anywhere.',
  },
  {
    icon: FileText,
    title: 'Weekly Tests & DPPs',
    description: 'Regular chapter-wise tests and Daily Practice Problems to reinforce learning.',
  },
]

const credentials = [
  { label: 'AIIMS Alumni', value: 'Faculty' },
  { label: 'Experience', value: '15+ Years' },
  { label: 'Students', value: '10,000+' },
  { label: 'NEET Selections', value: '2,500+' },
  { label: 'Success Rate', value: '98%' },
  { label: 'Class 11 Foundation', value: '60% NEET' },
]

const faqs = [
  {
    question: 'Why is Class 11 biology important for NEET?',
    answer:
      'Class 11 biology covers approximately 60% of NEET syllabus! Topics like Cell Biology, Plant Physiology, Human Physiology, and Diversity form the core foundation. Students who build strong basics in Class 11 perform significantly better in NEET.',
  },
  {
    question: 'What is the batch schedule for Class 11 biology?',
    answer:
      'We offer multiple batch timings: Evening batches (5-7 PM on Mon/Wed/Fri), Weekend batches (Sat/Sun 9 AM-1 PM). You can choose based on your school schedule.',
  },
  {
    question: 'Do you cover boards and NEET together?',
    answer:
      'Yes! Our curriculum is designed for dual preparation. We cover NCERT thoroughly for boards while adding NEET-level depth, previous year questions, and competitive problem-solving throughout.',
  },
  {
    question: 'What study materials are provided?',
    answer:
      'You receive: detailed chapter notes, NCERT summary sheets, Daily Practice Problems (DPPs), chapter-wise test series, previous year NEET questions sorted by chapter, and recorded lecture access.',
  },
]

export default function BiologyTuitionClass11Page() {
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
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white py-20 overflow-hidden">
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
              Class 11 Biology Tuition
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Biology Tuition for <span className="text-yellow-300">Class 11</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Build Your NEET Foundation | 60% NEET Syllabus in Class 11
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Class 11 is the most crucial year for NEET aspirants. Our expert-led tuition ensures
              you build rock-solid foundations while excelling in board exams. Start your medical
              journey right!
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
                  className="border-white text-white hover:bg-white hover:text-blue-900"
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

      {/* Class 11 Syllabus with NEET Weightage */}
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
              Class 11 Biology Syllabus & NEET Weightage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              60% of NEET questions come from Class 11 syllabus. Master these topics early!
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
                className={`rounded-xl p-6 border-2 ${unit.color}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{unit.unit}</h3>
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    NEET: {unit.neetWeightage}
                  </span>
                </div>
                <ul className="space-y-2">
                  {unit.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Class 11 Tuition */}
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
              Why Choose Our Class 11 Biology Tuition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your NEET preparation the right way with expert guidance
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
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Complete Class 11 Package
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Live Interactive Classes',
              'Recorded Lecture Access',
              'Complete NCERT Notes',
              'Chapter-wise Tests',
              'Daily Practice Problems',
              'NEET PYQs by Chapter',
              '24/7 Doubt Support',
              'Progress Reports',
              'Board Exam Preparation',
              'NEET Foundation',
              'Parent Updates',
              'Motivational Sessions',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Start Your NEET Journey in Class 11
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Build the foundation that makes NEET success easier. Book a free demo today!
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
              href="/biology-tuition-class-12"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Tuition Class 12
            </Link>
            <Link
              href="/biology-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Biology Classes
            </Link>
            <Link
              href="/biology-neet-preparation"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Preparation
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
