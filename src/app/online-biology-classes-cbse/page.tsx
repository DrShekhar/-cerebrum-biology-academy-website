'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Trophy,
  CheckCircle,
  Star,
  Phone,
  BookOpen,
  GraduationCap,
  Play,
  Target,
  FileText,
  BarChart3,
} from 'lucide-react'
import { getBoardBySlug } from '@/lib/onlineClasses/boardData'

const board = getBoardBySlug('cbse')!

const faqs = [
  {
    question: 'Is NCERT enough for NEET Biology?',
    answer:
      'Yes, 100% of NEET Biology questions are from NCERT. Our online classes focus exclusively on NCERT line-by-line analysis. We cover every diagram, example, and concept from NCERT Class 11 and 12 Biology textbooks. CBSE students have an advantage because they already study NCERT in school.',
  },
  {
    question: 'How do CBSE online biology classes help with NEET?',
    answer:
      'Our CBSE online biology classes integrate board preparation with NEET from day one. Every chapter is taught with NEET weightage in mind. For example, Cell Biology (8% NEET weightage) is covered in more depth than lower-weightage topics. You prepare for both CBSE boards and NEET simultaneously.',
  },
  {
    question: 'What is the fee for CBSE online biology classes?',
    answer:
      'Our CBSE online biology classes cost ₹35,000 to ₹60,000 annually, including live classes, 500+ recorded lectures, NCERT notes, test series, and doubt support. This is significantly lower than offline coaching which costs ₹80,000 to ₹1,50,000.',
  },
  {
    question: 'Do you cover CBSE board exam preparation too?',
    answer:
      'Yes! Since NEET syllabus is entirely from NCERT, preparing for NEET automatically prepares you for CBSE boards. We also provide specific board exam preparation including previous year board questions, sample papers, and marking scheme guidance.',
  },
  {
    question: 'How are NCERT diagrams covered in online classes?',
    answer:
      'NCERT diagrams are crucial for NEET. We have dedicated sessions for diagram mastery where students learn to draw, label, and understand every NCERT diagram. Our digital whiteboard allows detailed diagram explanation that students can revisit through recordings.',
  },
]

export default function OnlineBiologyClassesCBSEPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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

      {/* Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Online Biology Classes for CBSE Students',
            description: 'NCERT-focused online biology classes for CBSE students preparing for NEET',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            courseMode: 'online',
            educationalLevel: 'High School',
            teaches: 'CBSE Biology, NEET Biology',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <BookOpen className="h-4 w-4" />
              {board.studentCount} CBSE Students Enrolled
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Online Biology Classes for CBSE Students
            </h1>
            <p className="mb-8 text-xl text-blue-100">{board.heroSubtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/demo-booking"
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black shadow-lg transition hover:bg-yellow-400"
              >
                <Play className="h-5 w-5" />
                Book Free Demo Class
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Call: +91 88264 44334
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: board.studentCount, label: 'CBSE Students' },
              { icon: Trophy, value: '98%', label: 'Success Rate' },
              { icon: Target, value: '100%', label: 'NCERT Coverage' },
              { icon: Star, value: '4.9/5', label: 'Student Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Alignment */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-6 py-3 text-green-800">
              <Target className="h-5 w-5" />
              <span className="font-semibold">CBSE + NEET Perfect Alignment</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Why CBSE Students Have an Advantage</h2>
            <p className="text-lg text-gray-700">{board.neetAlignment}</p>
          </motion.div>
        </div>
      </section>

      {/* Syllabus Focus */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our CBSE Biology Approach</h2>
            <p className="text-lg text-gray-600">NCERT-focused teaching for NEET success</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {board.syllabusFocus.map((focus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-lg"
              >
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                <p className="text-gray-700">{focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Weightage */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              NCERT Chapters with NEET Weightage
            </h2>
            <p className="text-lg text-gray-600">We teach every chapter with its NEET importance in mind</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {board.chapters.map((classData, classIndex) => (
              <motion.div
                key={classIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: classIndex * 0.2 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-600">
                  <GraduationCap className="h-6 w-6" />
                  {classData.class}
                </h3>
                <div className="space-y-2">
                  {classData.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm"
                    >
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">CBSE-Specific Features</h2>
            <p className="text-lg text-gray-600">What makes our CBSE online classes special</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {board.uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-blue-50 p-6 shadow-lg"
              >
                <FileText className="mb-4 h-10 w-10 text-blue-600" />
                <p className="font-medium text-gray-800">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">FAQs for CBSE Students</h2>
          </motion.div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore More Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/online-biology-classes-icse"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              ICSE Online Classes
            </Link>
            <Link
              href="/online-biology-classes"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              All Online Classes
            </Link>
            <Link
              href="/biology-tutor-class-11-cbse"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              Class 11 CBSE Tutor
            </Link>
            <Link
              href="/biology-tutor-class-12-cbse"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Class 12 CBSE Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">
              Join {board.studentCount} CBSE Students Learning Online
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              NCERT-focused biology classes for CBSE boards and NEET
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo-booking"
                className="flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-3 font-semibold text-black shadow-lg transition hover:bg-yellow-400"
              >
                <Play className="h-5 w-5" />
                Book Free Demo Class
              </Link>
              <a
                href="tel:+918826444334"
                className="flex items-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold transition hover:bg-white/10"
              >
                <Phone className="h-5 w-5" />
                Call: +91 88264 44334
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
