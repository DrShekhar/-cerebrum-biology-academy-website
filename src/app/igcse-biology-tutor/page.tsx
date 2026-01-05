'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

export default function IGCSEBiologyTutorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between IGCSE and GCSE Biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IGCSE (International GCSE) is designed for international students and follows syllabi from Cambridge or Edexcel. GCSE is for UK students with boards like AQA and OCR. Both cover similar topics but IGCSE has a more international focus.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I achieve an A* in IGCSE Biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To achieve A* (90%+), focus on past paper practice, understand exam command words, master practical skills, create detailed revision notes, and practice application questions. Our tutors provide targeted training for top grades.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you teach all IGCSE Biology exam boards?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we cover Cambridge IGCSE (0610/0970), Edexcel IGCSE (4BI1), AQA GCSE (8461), and OCR GCSE (J247). Our tutors are experienced with all major exam boards.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I take IGCSE Biology tuition from outside the UK?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Our online IGCSE Biology tuition is available worldwide. We have students from UAE, Singapore, India, and other countries. Classes are scheduled to match your timezone.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for IGCSE Biology tutoring?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our IGCSE Biology tuition starts at $25/hour for group batches and $50/hour for 1-on-1 sessions. We offer package discounts and free demo classes for all new students.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much time do I need to prepare for IGCSE Biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ideally, start preparation 12-18 months before exams. However, intensive 6-month courses are available for dedicated students. Regular practice and consistent effort are key to success.',
        },
      },
    ],
  }

  const examBoards = [
    {
      name: 'Cambridge IGCSE',
      code: '0610 / 0970',
      icon: '🎓',
      features: [
        'Core & Extended',
        'Practical Skills',
        'Theory Papers',
        'Alternative to Practical',
      ],
      gradient: 'from-blue-500 to-green-600',
    },
    {
      name: 'Edexcel IGCSE',
      code: '4BI1',
      icon: '📘',
      features: ['Paper 1B & 2B', 'International Focus', 'Controlled Assessment', 'Science Award'],
      gradient: 'from-green-600 to-blue-600',
    },
    {
      name: 'AQA GCSE',
      code: '8461',
      icon: '🧬',
      features: ['Foundation & Higher', 'Combined Science', 'Required Practicals', 'Trilogy'],
      gradient: 'from-blue-600 to-green-700',
    },
    {
      name: 'OCR GCSE',
      code: 'J247',
      icon: '🔬',
      features: ['Gateway Science', 'Practical Endorsement', 'Synoptic Assessment', 'A & B'],
      gradient: 'from-green-600 to-cyan-700',
    },
  ]

  const syllabusTopics = [
    {
      title: 'Cell Biology & Organisation',
      icon: '🧫',
      topics: ['Cell structure', 'Cell division', 'Stem cells', 'Organisation', 'Enzymes'],
    },
    {
      title: 'Transport in Organisms',
      icon: '💓',
      topics: [
        'Blood circulation',
        'Heart anatomy',
        'Transpiration',
        'Translocation',
        'Gas exchange',
      ],
    },
    {
      title: 'Coordination & Response',
      icon: '🧠',
      topics: ['Nervous system', 'Hormones', 'Homeostasis', 'Eye structure', 'Reflex actions'],
    },
    {
      title: 'Reproduction & Inheritance',
      icon: '🧬',
      topics: ['Sexual reproduction', 'Asexual reproduction', 'Genetics', 'DNA', 'Variation'],
    },
    {
      title: 'Ecology & Environment',
      icon: '🌍',
      topics: ['Ecosystems', 'Food chains', 'Carbon cycle', 'Human impact', 'Conservation'],
    },
    {
      title: 'Human Physiology',
      icon: '🫁',
      topics: ['Digestion', 'Respiration', 'Excretion', 'Nutrition', 'Disease'],
    },
  ]

  const gradeBoundaries = [
    {
      grade: 'A*',
      percentage: '90%+',
      color: 'from-amber-400 to-yellow-500',
      tips: 'Perfect understanding, application skills',
    },
    {
      grade: 'A',
      percentage: '80-89%',
      color: 'from-green-400 to-green-600',
      tips: 'Strong knowledge, good exam technique',
    },
    {
      grade: 'B',
      percentage: '70-79%',
      color: 'from-blue-400 to-blue-500',
      tips: 'Solid understanding, consistent practice',
    },
    {
      grade: 'C',
      percentage: '60-69%',
      color: 'from-purple-400 to-indigo-500',
      tips: 'Core concepts clear, needs more practice',
    },
    {
      grade: 'D',
      percentage: '50-59%',
      color: 'from-pink-400 to-rose-500',
      tips: 'Basic knowledge, requires focused revision',
    },
  ]

  const features = [
    {
      title: 'Past Paper Practice',
      description:
        'Extensive practice with past papers from all exam boards with detailed solutions',
      icon: '📝',
    },
    {
      title: 'Exam Technique Training',
      description:
        'Master command words, time management, and scoring strategies for maximum marks',
      icon: '🎯',
    },
    {
      title: '1-on-1 & Batch Options',
      description:
        'Choose individual tutoring or join small batches based on your learning preference',
      icon: '👥',
    },
    {
      title: 'Flexible Scheduling',
      description: 'Classes available in all timezones - perfect for international students',
      icon: '🌐',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-700 py-20 text-white">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container relative mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-center"
            >
              <span className="mb-4 inline-block rounded-full bg-white/20 px-6 py-2 text-sm font-medium backdrop-blur-sm">
                Cambridge, Edexcel, AQA, OCR Specialist
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                IGCSE & GCSE Biology Tutor
                <span className="mt-2 block text-cyan-200">Expert Online Tutoring</span>
              </h1>
              <p className="mb-8 text-lg text-cyan-100 md:text-xl">
                Achieve A*/A grades with personalized IGCSE and GCSE Biology tuition from
                Cambridge-experienced tutors. Comprehensive coverage of all exam boards with proven
                results.
              </p>

              <div className="mb-10 grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-md">
                  <div className="text-3xl font-bold md:text-4xl">500+</div>
                  <div className="text-sm text-cyan-200">IGCSE Students</div>
                </div>
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-md">
                  <div className="text-3xl font-bold md:text-4xl">95%</div>
                  <div className="text-sm text-cyan-200">A*/A Grade Rate</div>
                </div>
                <div className="rounded-xl bg-white/10 p-6 backdrop-blur-md">
                  <div className="text-3xl font-bold md:text-4xl">8+</div>
                  <div className="text-sm text-cyan-200">Years Experience</div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="rounded-xl bg-white px-8 py-4 text-center font-semibold text-cyan-700 shadow-xl transition hover:bg-blue-50 hover:shadow-2xl"
                >
                  Book Free Demo Class
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'igcse-biology-hero',
                      message: 'Hi, I want IGCSE Biology tutoring',
                      campaign: 'igcse-biology-tutor',
                    })
                  }}
                  className="rounded-xl border-2 border-white bg-white/10 px-8 py-4 text-center font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 cursor-pointer"
                >
                  WhatsApp: +91 88264 44334
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Exam Boards Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                All IGCSE & GCSE Exam Boards Covered
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Expert tutoring for all major international and UK exam boards
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {examBoards.map((board, index) => (
                <motion.div
                  key={board.code}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl bg-gradient-to-br ${board.gradient} p-6 text-white shadow-xl`}
                >
                  <div className="mb-4 text-5xl">{board.icon}</div>
                  <h3 className="mb-2 text-xl font-bold">{board.name}</h3>
                  <p className="mb-4 text-sm opacity-90">Code: {board.code}</p>
                  <ul className="space-y-2">
                    {board.features.map((feature) => (
                      <li key={feature} className="flex items-start text-sm">
                        <span className="mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Syllabus Topics Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Complete IGCSE Biology Syllabus Coverage
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Master every topic with our comprehensive curriculum
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {syllabusTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-cyan-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg transition hover:shadow-xl"
                >
                  <div className="mb-4 text-4xl">{topic.icon}</div>
                  <h3 className="mb-4 text-xl font-bold text-gray-900">{topic.title}</h3>
                  <ul className="space-y-2">
                    {topic.topics.map((item) => (
                      <li key={item} className="flex items-start text-gray-600">
                        <span className="mr-2 text-blue-600">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Grade Boundaries Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                IGCSE Biology Grade Boundaries
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Understand what it takes to achieve your target grade
              </p>
            </motion.div>

            <div className="mx-auto max-w-4xl space-y-4">
              {gradeBoundaries.map((grade, index) => (
                <motion.div
                  key={grade.grade}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden rounded-xl shadow-lg"
                >
                  <div className={`bg-gradient-to-r ${grade.color} p-6 text-white`}>
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                      <div>
                        <div className="mb-1 text-3xl font-bold">Grade {grade.grade}</div>
                        <div className="text-xl opacity-90">{grade.percentage}</div>
                      </div>
                      <div className="mt-4 text-sm opacity-90 md:mt-0 md:text-right">
                        <span className="font-medium">Key Focus:</span> {grade.tips}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 rounded-2xl bg-gradient-to-r from-cyan-100 to-green-100 p-8"
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Tips for Achieving Top Grades
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Practice past papers from last 5 years',
                  'Master exam command words (Explain, Describe, Suggest)',
                  'Create detailed revision notes with diagrams',
                  'Focus on application questions, not just recall',
                  'Time yourself during practice papers',
                  'Review mark schemes to understand examiner expectations',
                ].map((tip) => (
                  <div key={tip} className="flex items-start">
                    <svg
                      className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Why Choose Our IGCSE Biology Tutoring?
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Comprehensive support designed for international students
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl bg-white p-6 shadow-lg transition hover:shadow-xl"
                >
                  <div className="mb-4 text-5xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Common questions about IGCSE Biology tutoring
              </p>
            </motion.div>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-gray-200 bg-white shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left transition hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{faq.name}</h3>
                    <svg
                      className={`h-6 w-6 flex-shrink-0 text-blue-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="border-t border-gray-100 p-6 pt-4">
                      <p className="text-gray-600">{faq.acceptedAnswer.text}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Explore Other Programs
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Comprehensive biology tutoring for all international curricula
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: '/international-biology-tutor',
                  title: 'International Biology Tutor',
                  desc: 'All international boards',
                  icon: '🌏',
                },
                {
                  href: '/biology-tutor-online',
                  title: 'Online Biology Tutor',
                  desc: 'Live online classes',
                  icon: '💻',
                },
                {
                  href: '/best-biology-teacher-online',
                  title: 'Best Biology Teacher',
                  desc: 'Expert educators',
                  icon: '⭐',
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group rounded-2xl border border-cyan-100 bg-white p-6 shadow-md transition hover:border-blue-300 hover:shadow-xl"
                >
                  <div className="mb-3 text-4xl">{link.icon}</div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-cyan-700">
                    {link.title}
                  </h3>
                  <p className="text-gray-600">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-700 py-20 text-white">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container relative mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Ready to Ace Your IGCSE Biology Exams?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-cyan-100">
                Join hundreds of students achieving A*/A grades with our expert IGCSE Biology
                tutoring
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/demo"
                  className="rounded-xl bg-white px-8 py-4 font-semibold text-cyan-700 shadow-xl transition hover:bg-blue-50"
                >
                  Book Free Demo Class
                </Link>
                <button
                  onClick={async () => {
                    await trackAndOpenWhatsApp({
                      source: 'igcse-biology-cta',
                      message: 'Hi, I want IGCSE Biology tutoring',
                      campaign: 'igcse-biology-tutor',
                    })
                  }}
                  className="rounded-xl border-2 border-white bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 cursor-pointer"
                >
                  WhatsApp: +91 88264 44334
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
