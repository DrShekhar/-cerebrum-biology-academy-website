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
  Dna,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const class12Syllabus = [
  {
    unit: 'Unit 6: Reproduction',
    chapters: [
      'Reproduction in Organisms',
      'Sexual Reproduction in Flowering Plants',
      'Human Reproduction',
      'Reproductive Health',
    ],
    weightage: '12%',
    questions: '7-8 Questions',
  },
  {
    unit: 'Unit 7: Genetics & Evolution',
    chapters: ['Principles of Inheritance', 'Molecular Basis of Inheritance', 'Evolution'],
    weightage: '18%',
    questions: '10-12 Questions',
  },
  {
    unit: 'Unit 8: Biology in Human Welfare',
    chapters: ['Human Health and Disease', 'Microbes in Human Welfare'],
    weightage: '8%',
    questions: '4-5 Questions',
  },
  {
    unit: 'Unit 9: Biotechnology',
    chapters: ['Biotechnology: Principles & Processes', 'Biotechnology & Its Applications'],
    weightage: '6%',
    questions: '3-4 Questions',
  },
  {
    unit: 'Unit 10: Ecology & Environment',
    chapters: [
      'Organisms and Populations',
      'Ecosystem',
      'Biodiversity and Conservation',
      'Environmental Issues',
    ],
    weightage: '10%',
    questions: '5-6 Questions',
  },
]

const programFeatures = [
  {
    icon: Dna,
    title: 'Genetics Mastery',
    description: 'Complete genetics with problem-solving',
  },
  {
    icon: Microscope,
    title: 'NCERT Line-by-Line',
    description: 'Every line covered for NEET',
  },
  {
    icon: Target,
    title: 'Mock Test Series',
    description: 'Full-length NEET pattern tests',
  },
  {
    icon: Clock,
    title: 'PYQ Analysis',
    description: '10 years previous questions solved',
  },
]

const courseDetails = {
  duration: '10 months (June - March)',
  classesPerWeek: '4 classes (8 hours/week)',
  batchSize: '15-20 students',
  fee: '₹42,000/year',
  includes: [
    'Complete NCERT notes with annotations',
    'Genetics problem workbook',
    'Mock test series (50+ tests)',
    'Previous 10 years NEET papers',
    'Recorded lectures access',
    '24/7 WhatsApp doubt support',
  ],
}

const faqs = [
  {
    question: 'How important is Class 12 biology for NEET?',
    answer:
      'Class 12 biology contributes about 54% of NEET questions. Genetics alone is 18%, Reproduction 12%, and Ecology 10%. Strong Class 12 preparation is crucial for cracking NEET.',
  },
  {
    question: 'Which is the most important chapter in Class 12 for NEET?',
    answer:
      'Molecular Basis of Inheritance (Genetics) is the most important chapter with 8-10 questions. Human Reproduction, Ecology, and Biotechnology are also high-weightage chapters.',
  },
  {
    question: 'How to prepare genetics for NEET?',
    answer:
      'We focus on: 1) Understanding concepts thoroughly, 2) Solving Mendelian problems, 3) Practicing pedigree analysis, 4) Memorizing molecular biology facts. Our genetics workbook has 500+ problems.',
  },
  {
    question: 'Can I prepare for NEET 2026 in Class 12?',
    answer:
      'Yes! With focused preparation and our expert guidance, you can crack NEET in one year. We cover complete syllabus with revision and provide extensive practice through test series.',
  },
]

export default function BiologyClass12Page() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class12', {
        event_category: 'conversion',
        event_label: 'biology_class_12',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 via-cyan-800 to-blue-900 text-white py-20 overflow-hidden">
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
              Class 12 NEET Biology - Final Year
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-300">Class 12 Biology Coaching</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">
              Master Genetics, Reproduction &amp; Ecology for NEET 2026
            </h2>

            <p className="text-lg md:text-xl opacity-80 mb-8 max-w-4xl mx-auto">
              Comprehensive Class 12 biology coaching with complete NCERT + advanced NEET prep. 54%
              of NEET comes from Class 12. Expert AIIMS faculty, intensive test series.
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

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-teal-900"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'NEET Weightage', value: '54%' },
                { label: 'Classes/Week', value: '8 Hours' },
                { label: 'Mock Tests', value: '50+' },
                { label: 'Fee', value: '₹42,000' },
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
              Class 12 NEET Biology Syllabus
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              54% of NEET questions come from Class 12 - Master every chapter
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {class12Syllabus.map((unit, index) => (
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
                  <span className="bg-teal-100 text-teal-700 text-sm font-semibold px-3 py-1 rounded-full">
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
                <div className="text-sm text-teal-600 font-medium">{unit.questions} in NEET</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 text-center border border-teal-100"
              >
                <feature.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Class 12 Biology Coaching - FAQs
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
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Crack NEET 2026 with Class 12 Biology Mastery
            </h2>
            <p className="text-xl mb-8 opacity-90">
              54% of NEET is Class 12. Start your preparation today!
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
                  className="border-white text-white hover:bg-white hover:text-teal-700"
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
            name: 'Class 12 NEET Biology Coaching',
            description:
              'Comprehensive Class 12 biology coaching for NEET. Genetics, Reproduction, Ecology, Biotechnology.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            offers: {
              '@type': 'Offer',
              price: '42000',
              priceCurrency: 'INR',
            },
          }),
        }}
      />
    </div>
  )
}
