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
  AlertTriangle,
} from 'lucide-react'
import { getBoardBySlug } from '@/lib/onlineClasses/boardData'

const board = getBoardBySlug('icse')!

const faqs = [
  {
    question: 'Can ICSE students crack NEET?',
    answer:
      'Absolutely! ICSE students have excellent fundamentals. The challenge is that NEET syllabus is 100% NCERT-based, while ICSE follows Selina Publishers. Our ICSE → NCERT bridge modules ensure you cover all NEET-specific topics that are not in ISC syllabus. Many NEET toppers are from ICSE background.',
  },
  {
    question: 'What is the syllabus gap between ICSE and NEET?',
    answer:
      'ICSE/ISC covers approximately 70% of NEET Biology syllabus. The 30% gap includes specific NCERT topics like detailed plant anatomy, certain ecological concepts, and biotechnology applications. Our bridge modules specifically target these gaps with focused sessions.',
  },
  {
    question: 'How do ICSE online biology classes help with NEET?',
    answer:
      'Our ICSE online biology classes map Selina Publishers content to NCERT requirements. We provide ICSE → NCERT terminology guides (since the same concepts have different names), additional chapter coverage for NCERT-only topics, and NEET-style MCQ practice from day one.',
  },
  {
    question: 'What is the fee for ICSE online biology classes?',
    answer:
      'Our ICSE online biology classes cost ₹40,000 to ₹65,000 annually, including live classes, NCERT bridge modules, ISC + NEET integrated notes, test series, and personalized doubt support. This includes the additional NCERT gap coverage that ICSE students need.',
  },
  {
    question: 'Do you help with ISC board exams too?',
    answer:
      'Yes! We provide comprehensive ISC Biology preparation alongside NEET. Since ISC syllabus overlaps significantly with NEET, students preparing for NEET are well-prepared for ISC boards. We also cover ISC-specific topics and exam patterns.',
  },
]

export default function OnlineBiologyClassesICSEPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
            name: 'Online Biology Classes for ICSE/ISC Students',
            description: 'NCERT bridge modules for ICSE students preparing for NEET',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            courseMode: 'online',
            educationalLevel: 'High School',
            teaches: 'ICSE Biology, ISC Biology, NEET Biology',
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-white">
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
              {board.studentCount} ICSE/ISC Students Enrolled
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Online Biology Classes for ICSE Students
            </h1>
            <p className="mb-8 text-xl text-purple-100">{board.heroSubtitle}</p>
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
              { icon: Users, value: board.studentCount, label: 'ICSE Students' },
              { icon: Trophy, value: '96%', label: 'Success Rate' },
              { icon: Target, value: '30%', label: 'Gap Bridge Modules' },
              { icon: Star, value: '4.9/5', label: 'Student Rating' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Gap Alert */}
      <section className="bg-amber-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <AlertTriangle className="h-8 w-8 text-amber-600" />
              <h2 className="text-3xl font-bold text-gray-900">The ICSE-NEET Gap</h2>
            </div>
            <p className="mb-8 text-center text-lg text-gray-700">{board.neetAlignment}</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-600">
                  <span className="text-xl">❌</span> What ICSE Misses
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• NCERT-specific plant anatomy details</li>
                  <li>• Certain ecological concepts & terminology</li>
                  <li>• Specific biotechnology applications</li>
                  <li>• NCERT diagram styles and labeling</li>
                </ul>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-600">
                  <span className="text-xl">✅</span> Our Bridge Solution
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Dedicated NCERT gap modules</li>
                  <li>• Selina → NCERT terminology mapping</li>
                  <li>• NCERT diagram practice sessions</li>
                  <li>• NEET-style MCQ from day one</li>
                </ul>
              </div>
            </div>
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
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our ICSE → NEET Approach</h2>
            <p className="text-lg text-gray-600">Bridging the gap between ICSE and NCERT</p>
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

      {/* Gap Topics */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              ICSE + NCERT Gap Topics We Cover
            </h2>
            <p className="text-lg text-gray-600">Extra NCERT content that ICSE/ISC doesn&apos;t teach</p>
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
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-purple-600">
                  <GraduationCap className="h-6 w-6" />
                  {classData.class}
                </h3>
                <div className="space-y-2">
                  {classData.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm"
                    >
                      <BarChart3 className="h-4 w-4 text-purple-600" />
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
            <h2 className="mb-4 text-3xl font-bold text-gray-900">ICSE-Specific Features</h2>
            <p className="text-lg text-gray-600">What makes our ICSE online classes special</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {board.uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-purple-50 p-6 shadow-lg"
              >
                <FileText className="mb-4 h-10 w-10 text-purple-600" />
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
            <h2 className="mb-4 text-3xl font-bold text-gray-900">FAQs for ICSE Students</h2>
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
              href="/online-biology-classes-cbse"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              CBSE Online Classes
            </Link>
            <Link
              href="/online-biology-classes"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              All Online Classes
            </Link>
            <Link
              href="/biology-tutor-class-11-icse"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              Class 11 ISC Tutor
            </Link>
            <Link
              href="/biology-tutor-class-12-icse"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Class 12 ISC Tutor
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">
              Join {board.studentCount} ICSE Students Bridging to NEET
            </h2>
            <p className="mb-8 text-xl text-purple-100">
              ICSE → NCERT bridge modules for guaranteed NEET success
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
