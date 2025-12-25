'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  GraduationCap,
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  BookOpen,
  Calendar,
  Phone,
  Video,
  Leaf,
} from 'lucide-react'

const batchTypes = [
  {
    name: 'Regular Batch',
    duration: '12 months',
    schedule: 'Mon-Fri, 6 AM / 4 PM / 7 PM',
    features: ['Complete Botany Coverage', 'Weekly Tests', 'Doubt Sessions', 'Study Material'],
  },
  {
    name: 'Crash Course',
    duration: '3-4 months',
    schedule: 'Daily Classes',
    features: ['Intensive Revision', 'High-Yield Topics', 'Mock Tests', 'Quick Doubt Resolution'],
  },
  {
    name: 'Dropper Batch',
    duration: '10 months',
    schedule: 'Mon-Sat',
    features: ['Advanced Teaching', 'Focus on Weak Areas', 'Extensive Practice', 'Mentor Support'],
  },
]

const botanyTopics = [
  { name: 'Plant Physiology', chapters: 5, weightage: '12%' },
  { name: 'Ecology & Environment', chapters: 4, weightage: '12%' },
  { name: 'Cell Biology', chapters: 3, weightage: '10%' },
  { name: 'Plant Kingdom', chapters: 2, weightage: '6%' },
  { name: 'Molecular Biology', chapters: 3, weightage: '6%' },
  { name: 'Plant Morphology', chapters: 2, weightage: '3%' },
]

const faqs = [
  {
    question: 'What topics are covered in botany classes?',
    answer:
      'Our botany classes cover all NEET topics: Plant Physiology (5 chapters), Ecology & Environment, Cell Biology, Plant Kingdom, Molecular Biology, and Plant Morphology.',
  },
  {
    question: 'What are the batch timings for botany classes?',
    answer:
      'We offer flexible timings: 6 AM batch for early risers, 4 PM batch for school-goers, and 7 PM batch for those preferring evening classes. Weekend batches also available.',
  },
  {
    question: 'Is study material provided in botany classes?',
    answer:
      'Yes, comprehensive study material including NCERT-based notes, plant diagrams, ecological flowcharts, and practice MCQs are provided with all botany batches.',
  },
  {
    question: 'Are online botany classes available?',
    answer:
      'Yes! We offer both online and offline botany classes. Online classes are live, interactive sessions with the same expert faculty teaching our offline batches.',
  },
]

export default function BotanyClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
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
      <section className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-green-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Calendar className="mr-1 inline h-4 w-4" />
              Multiple Batch Timings Available
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Botany Classes for NEET 2026
            </h1>
            <p className="mb-8 text-xl text-cyan-100">
              Join expert-led botany batches covering 45% of NEET Biology. Regular, Crash Course &
              Dropper batches available in offline and online formats.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-cyan-600 shadow-lg transition hover:bg-cyan-50"
              >
                Book Free Demo
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Enquire Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Batch Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Botany Batch Options</h2>
            <p className="text-lg text-gray-600">Choose the batch that suits your preparation</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {batchTypes.map((batch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 text-2xl font-bold text-cyan-600">{batch.name}</h3>
                <div className="mb-4 text-gray-600">
                  <p>
                    <Clock className="mr-2 inline h-4 w-4" />
                    Duration: {batch.duration}
                  </p>
                  <p>
                    <Calendar className="mr-2 inline h-4 w-4" />
                    {batch.schedule}
                  </p>
                </div>
                <ul className="space-y-2">
                  {batch.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-cyan-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '2,500+', label: 'NEET Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students Taught' },
              { icon: Star, value: '98%', label: 'Success Rate' },
              { icon: Video, value: 'Online + Offline', label: 'Class Modes' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-cyan-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Botany Class Syllabus</h2>
            <p className="text-lg text-gray-600">Complete NEET botany coverage in our classes</p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="grid gap-4 md:grid-cols-2">
                {botanyTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">{topic.name}</h4>
                      <p className="text-sm text-gray-600">{topic.chapters} chapters</p>
                    </div>
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-semibold text-cyan-700">
                      {topic.weightage}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              What&apos;s Included in Our Botany Classes
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: 'Expert Faculty',
                desc: 'AIIMS-trained teachers with 15+ years of NEET teaching experience.',
              },
              {
                icon: BookOpen,
                title: 'Study Material',
                desc: 'Comprehensive NCERT-based notes, plant diagrams, and practice questions.',
              },
              {
                icon: Leaf,
                title: 'Visual Learning',
                desc: 'Detailed plant diagrams, life cycles, and ecological flowcharts.',
              },
              {
                icon: Users,
                title: 'Doubt Sessions',
                desc: 'Dedicated doubt clearing sessions and one-on-one mentoring.',
              },
              {
                icon: Video,
                title: 'Recorded Classes',
                desc: 'Access to recorded lectures for revision and missed classes.',
              },
              {
                icon: Star,
                title: 'Progress Tracking',
                desc: 'Regular progress reports and performance analytics.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <feature.icon className="mb-4 h-10 w-10 text-cyan-600" />
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
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

      {/* Internal Links */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore More Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/botany-teacher"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Botany Teacher
            </Link>
            <Link
              href="/best-botany-teacher-for-neet"
              className="rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700 transition hover:bg-emerald-200"
            >
              Best Botany Teacher for NEET
            </Link>
            <Link
              href="/zoology-classes"
              className="rounded-lg bg-teal-100 px-4 py-2 text-teal-700 transition hover:bg-teal-200"
            >
              Zoology Classes
            </Link>
            <Link
              href="/biology-classes"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              Biology Classes
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-cyan-600 to-green-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Enroll in Botany Classes Today</h2>
            <p className="mb-8 text-xl text-cyan-100">
              New batches starting soon - secure your seat for NEET 2026!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-cyan-600 shadow-lg transition hover:bg-cyan-50"
              >
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
