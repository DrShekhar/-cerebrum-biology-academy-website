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
  Sparkles,
  Brain,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const class9Syllabus = [
  'The Fundamental Unit of Life (Cell)',
  'Tissues',
  'Diversity in Living Organisms',
  'Why Do We Fall Ill',
  'Natural Resources',
  'Improvement in Food Resources',
]

const class10Syllabus = [
  'Life Processes',
  'Control and Coordination',
  'How Do Organisms Reproduce',
  'Heredity and Evolution',
  'Our Environment',
  'Management of Natural Resources',
]

const benefits = [
  {
    icon: Brain,
    title: 'Strong Foundation',
    description: 'Build concepts that will help in Class 11, 12 and NEET',
  },
  {
    icon: Target,
    title: 'Board + NEET Focus',
    description: 'Excel in boards while preparing for future NEET',
  },
  {
    icon: Sparkles,
    title: 'Interest Building',
    description: 'Develop genuine interest in biology through interactive learning',
  },
  {
    icon: Microscope,
    title: 'Practical Approach',
    description: 'Real-life examples and diagram-based teaching',
  },
]

const programDetails = [
  {
    class: 'Class 9',
    title: 'Foundation Biology',
    description: 'Build strong basics for future NEET preparation',
    duration: '2 hours/week',
    fee: '₹15,000/year',
    topics: class9Syllabus,
  },
  {
    class: 'Class 10',
    title: 'Pre-Foundation Biology',
    description: 'NCERT mastery with NEET orientation',
    duration: '3 hours/week',
    fee: '₹18,000/year',
    topics: class10Syllabus,
  },
]

const faqs = [
  {
    question: 'Should my child start NEET preparation from Class 9?',
    answer:
      'Starting early gives a significant advantage. Class 9-10 foundation helps build strong basics, reduces Class 11-12 pressure, and allows more time for practice. Many NEET toppers started preparation from Class 9.',
  },
  {
    question: 'Will this help in school exams too?',
    answer:
      'Absolutely! Our foundation course is designed to help students excel in school exams while building NEET concepts. We follow NCERT thoroughly, which is the base for both boards and NEET.',
  },
  {
    question: 'What is the difference between Class 9 and Class 10 program?',
    answer:
      'Class 9 focuses on introducing biology concepts and building interest. Class 10 goes deeper with NEET-oriented teaching, especially for chapters like Heredity, Life Processes, and Reproduction which directly connect to NEET syllabus.',
  },
  {
    question: 'How many hours per week should a Class 9/10 student study biology?',
    answer:
      'We recommend 4-5 hours weekly for Class 9 and 6-7 hours for Class 10. This includes 2-3 hours of classes and 2-4 hours of self-study and practice.',
  },
  {
    question: 'Is online coaching suitable for Class 9-10 students?',
    answer:
      'Yes! Our online classes are interactive with live teaching, instant doubt solving, and engaging content. Parents can monitor progress, and recorded lectures help with revision.',
  },
]

export default function BiologyClass910Page() {
  const handleDemoBooking = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'demo_booking_class910', {
        event_category: 'conversion',
        event_label: 'biology_class_9_10',
        value: 1,
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />

        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-200" />
              Early NEET Foundation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Best <span className="text-yellow-200">Biology Tuition for Class 9 &amp; 10</span>
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4">Start Early, Win Big in NEET</h2>

            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-4xl mx-auto">
              Build a strong biology foundation for future NEET success. Expert teachers,
              interactive classes, and NCERT-focused learning. Excel in boards while preparing for
              medical entrance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-white text-orange-600 hover:bg-yellow-100 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <a href="tel:+918826444334">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 88264 44334
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { label: 'Class 9 Fee', value: '₹15,000' },
                { label: 'Class 10 Fee', value: '₹18,000' },
                { label: 'Batch Size', value: '15-20' },
                { label: 'Success Rate', value: '95%' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
                >
                  <div className="text-xl md:text-2xl font-bold text-yellow-200">{item.value}</div>
                  <div className="text-xs md:text-sm opacity-90">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Start Early */}
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
              Why Start Biology Preparation from Class 9-10?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Early starters have a 3x higher success rate in NEET
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center border border-amber-100"
              >
                <benefit.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
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
              Class 9 &amp; Class 10 Biology Programs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programDetails.map((program, index) => (
              <motion.div
                key={program.class}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6">
                  <div className="text-sm font-medium opacity-90">{program.class}</div>
                  <div className="text-2xl font-bold">{program.title}</div>
                  <div className="text-sm opacity-90 mt-2">{program.description}</div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-gray-700 mb-3">
                      NCERT Chapters Covered:
                    </div>
                    <ul className="space-y-2">
                      {program.topics.map((topic) => (
                        <li key={topic} className="flex items-start text-gray-600 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-500">{program.duration}</div>
                      <div className="text-2xl font-bold text-orange-600">{program.fee}</div>
                    </div>
                    <Link href="/demo-booking">
                      <Button className="bg-orange-600 hover:bg-orange-700">Enroll Now</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Your Child Gets</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Live interactive classes',
              'Complete NCERT notes',
              'Chapter-wise tests',
              'Recorded lectures access',
              'Doubt clearing sessions',
              'Progress reports for parents',
              'Fun biology activities',
              'Monthly parent meetings',
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
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
              Class 9 &amp; 10 Biology - FAQs
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
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Give Your Child the Head Start They Deserve
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Early NEET preparation = Higher success rate. Book a free demo today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo-booking">
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={handleDemoBooking}
                  className="bg-white text-orange-600 hover:bg-yellow-100 font-bold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
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
            name: 'Class 9 & 10 Foundation Biology',
            description: 'Early NEET foundation biology tuition for Class 9 and 10 students.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            hasCourseInstance: [
              {
                '@type': 'CourseInstance',
                name: 'Class 9 Foundation',
                offers: { '@type': 'Offer', price: '15000', priceCurrency: 'INR' },
              },
              {
                '@type': 'CourseInstance',
                name: 'Class 10 Pre-Foundation',
                offers: { '@type': 'Offer', price: '18000', priceCurrency: 'INR' },
              },
            ],
          }),
        }}
      />
    </div>
  )
}
