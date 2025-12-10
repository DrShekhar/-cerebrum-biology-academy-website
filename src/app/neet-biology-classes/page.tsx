'use client'

import { motion } from 'framer-motion'
import {
  Leaf,
  Users,
  Trophy,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  Video,
  MessageCircle,
  Play,
  ArrowRight,
  Microscope,
  Heart,
  Brain,
  Dna,
  FlaskConical,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const biologyTopics = [
  {
    icon: Leaf,
    title: 'Botany',
    chapters: ['Plant Physiology', 'Plant Morphology', 'Plant Reproduction', 'Ecology'],
    marks: '~90 marks',
  },
  {
    icon: Heart,
    title: 'Zoology',
    chapters: ['Human Physiology', 'Animal Kingdom', 'Human Reproduction', 'Genetics'],
    marks: '~90 marks',
  },
  {
    icon: Dna,
    title: 'Genetics & Evolution',
    chapters: ['Molecular Basis', 'Principles of Inheritance', 'Evolution'],
    marks: '~50 marks',
  },
  {
    icon: FlaskConical,
    title: 'Biotechnology',
    chapters: ['Principles & Processes', 'Applications', 'Microbes'],
    marks: '~30 marks',
  },
]

const whyBiology = [
  {
    icon: Trophy,
    title: 'Highest Weightage',
    description: 'Biology carries 360 marks out of 720 - exactly 50% of NEET score.',
  },
  {
    icon: BookOpen,
    title: 'NCERT is Sufficient',
    description: '95% questions come directly from NCERT textbooks - master it!',
  },
  {
    icon: Brain,
    title: 'Scoring Subject',
    description: 'Easier to score high in Biology compared to Physics and Chemistry.',
  },
  {
    icon: Award,
    title: 'Medical Foundation',
    description: 'Strong biology knowledge is essential for your medical career.',
  },
]

const classHighlights = [
  {
    icon: Microscope,
    title: 'AIIMS Trained Faculty',
    description: 'Learn Biology from doctors trained at AIIMS with 15+ years experience.',
  },
  {
    icon: Video,
    title: 'Live Interactive Classes',
    description: 'Daily 2-hour Biology sessions with instant doubt resolution.',
  },
  {
    icon: BookOpen,
    title: 'NCERT Deep Dive',
    description: 'Line-by-line NCERT analysis with important points highlighted.',
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Maximum 10-15 students for personalized attention.',
  },
  {
    icon: Clock,
    title: 'Chapter-wise Tests',
    description: 'Weekly tests after each chapter with detailed analysis.',
  },
  {
    icon: MessageCircle,
    title: 'Doubt Sessions',
    description: 'Daily Biology doubt clearing sessions + 24/7 WhatsApp support.',
  },
]

const syllabusCoverage = {
  class11: [
    'Diversity in Living World',
    'Structural Organisation in Animals and Plants',
    'Cell Structure and Function',
    'Plant Physiology',
    'Human Physiology',
  ],
  class12: [
    'Reproduction',
    'Genetics and Evolution',
    'Biology and Human Welfare',
    'Biotechnology and Its Applications',
    'Ecology and Environment',
  ],
}

const successMetrics = [
  { label: 'Biology Success', value: '98%', icon: Trophy },
  { label: 'NCERT Coverage', value: '100%', icon: BookOpen },
  { label: 'Biology Marks', value: '360', icon: Star },
  { label: 'Years Experience', value: '15+', icon: Award },
]

const faqs = [
  {
    question: 'How to score 360/360 in NEET Biology?',
    answer:
      'To score full marks in NEET Biology: 1) Read NCERT line by line - 95% questions come from NCERT, 2) Focus on diagrams and flowcharts, 3) Practice previous year questions, 4) Master Assertion-Reason type questions, 5) Revise regularly - biology needs multiple revisions. Our course covers all these aspects systematically.',
  },
  {
    question: 'What is the best course for Biology students for NEET?',
    answer:
      'The best Biology course for NEET should include: NCERT-based teaching, chapter-wise notes, diagram practice, previous year analysis, and regular testing. Cerebrum Biology Academy specializes in NEET Biology with AIIMS-trained faculty who have helped thousands score 300+ in Biology.',
  },
  {
    question: 'Is NCERT enough for NEET Biology?',
    answer:
      'Yes, NCERT is sufficient for 95% of NEET Biology questions. However, you need to read it thoroughly - every line, diagram, and example. Our classes help you understand NCERT deeply and identify the important points that frequently appear in NEET.',
  },
  {
    question: 'Which topics are most important in NEET Biology?',
    answer:
      'High-weightage Biology topics: Human Physiology (8-10 questions), Plant Physiology (6-8 questions), Genetics (6-8 questions), Ecology (5-6 questions), Human Reproduction (4-5 questions), and Cell Biology (4-5 questions). We give extra focus to these topics.',
  },
  {
    question: 'Do you teach Botany and Zoology separately?',
    answer:
      'We have specialized faculty for both - Botany expert for plant-related topics and Zoology expert for animal/human biology. This ensures in-depth coverage of both sections. Total 360 marks are split equally between Botany (180) and Zoology (180).',
  },
]

export default function NeetBiologyClassesPage() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_biology', {
        event_category: 'conversion',
        event_label: 'neet_biology_classes_page',
        value: 1,
      })
    }
  }

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
      <section className="relative bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Leaf className="w-5 h-5 mr-2 text-yellow-300" />
              Specialized Biology Coaching | 360/720 Marks
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">NEET Biology Classes</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Best Course for Biology Students | AIIMS Faculty | 98% Success Rate
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-3xl mx-auto">
              Master NEET Biology with India&apos;s best Biology coaching. AIIMS-trained faculty,
              NCERT-focused curriculum, and specialized Botany & Zoology experts. Biology is 50% of
              NEET - master it to crack NEET!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Free Biology Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-green-700"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Biology Course
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <metric.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-80">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Biology Matters */}
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
              Why Biology is Key to NEET Success
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Biology carries 50% weightage in NEET - master it to secure your medical seat
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyBiology.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Biology Topics */}
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
              NEET Biology Topics We Cover
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {biologyTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <topic.icon className="w-10 h-10 text-green-600" />
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {topic.marks}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h3>
                <ul className="space-y-2">
                  {topic.chapters.map((chapter) => (
                    <li key={chapter} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {chapter}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Coverage */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete NCERT Biology Syllabus Coverage
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Class 11 Biology</h3>
              <ul className="space-y-3">
                {syllabusCoverage.class11.map((unit, index) => (
                  <li key={unit} className="flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {unit}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Class 12 Biology</h3>
              <ul className="space-y-3">
                {syllabusCoverage.class12.map((unit, index) => (
                  <li key={unit} className="flex items-center">
                    <span className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </span>
                    {unit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Class Highlights */}
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
              What Makes Our Biology Classes Special
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <highlight.icon className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
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
              FAQs - NEET Biology Classes
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
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join Our NEET Biology Classes Today
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Master Biology and score 300+ in NEET. AIIMS faculty, NCERT focus, 98% success!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-yellow-500 text-black hover:bg-yellow-400"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Free Biology Demo Class
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

            <div className="grid md:grid-cols-4 gap-6 max-w-3xl mx-auto text-sm">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>360 Marks</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AIIMS Faculty</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>100% NCERT</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>98% Success</span>
              </div>
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
              href="/best-neet-coaching"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              Best NEET Coaching
            </Link>
            <Link
              href="/neet-coaching-centre"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Centre
            </Link>
            <Link
              href="/neet-coaching-institute"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Coaching Institute
            </Link>
            <Link
              href="/neet-classes"
              className="bg-white px-6 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              NEET Classes
            </Link>
            <Link
              href="/neet-preparation"
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
