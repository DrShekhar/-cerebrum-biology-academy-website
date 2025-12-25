'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  Video,
  Phone,
  BookOpen,
  Target,
  Award,
  FileText,
  BarChart,
} from 'lucide-react'

const courseModules = [
  { name: 'Physics', chapters: 30, hours: '150+', color: 'bg-orange-500' },
  { name: 'Chemistry', chapters: 30, hours: '150+', color: 'bg-purple-500' },
  { name: 'Biology', chapters: 38, hours: '200+', color: 'bg-green-500' },
]

const courseIncludes = [
  { icon: Video, title: '500+ Video Lectures', desc: 'HD quality recorded lectures' },
  { icon: FileText, title: 'Study Material', desc: 'Comprehensive PDF notes' },
  { icon: Target, title: '10,000+ MCQs', desc: 'Topic-wise practice questions' },
  { icon: BarChart, title: 'Mock Tests', desc: 'Full-length NEET mock exams' },
  { icon: BookOpen, title: 'Previous Years', desc: '15+ years PYQ solutions' },
  { icon: Award, title: 'Certificate', desc: 'Course completion certificate' },
]

const courseTypes = [
  {
    name: 'Foundation Course',
    duration: '2 Years',
    target: 'Class 11 Students',
    features: [
      'Complete 11th & 12th syllabus',
      'Strong foundation building',
      'Board + NEET combined',
    ],
  },
  {
    name: 'Regular Course',
    duration: '1 Year',
    target: 'Class 12 Students',
    features: ['Complete NEET syllabus', 'Test series included', 'Doubt support'],
  },
  {
    name: 'Crash Course',
    duration: '3-4 Months',
    target: 'Droppers',
    features: ['Intensive revision', 'High-yield topics', 'Maximum practice'],
  },
]

const faqs = [
  {
    question: 'What is included in the NEET online course?',
    answer:
      'Our NEET online course includes 500+ video lectures, comprehensive study material, 10,000+ practice MCQs, mock tests, previous year solutions, doubt support, and a completion certificate.',
  },
  {
    question: 'How long is the NEET online course?',
    answer:
      'We offer multiple course durations: 2-year Foundation Course for Class 11, 1-year Regular Course for Class 12, and 3-4 month Crash Course for intensive revision.',
  },
  {
    question: 'Is the course self-paced or scheduled?',
    answer:
      'Our NEET online course combines both - live scheduled classes for new topics and self-paced recorded lectures for revision. You get the best of both worlds.',
  },
  {
    question: 'Do I get doubt support in the online course?',
    answer:
      'Yes, you get dedicated doubt support through live doubt sessions, chat support, and can schedule one-on-one sessions with faculty for complex queries.',
  },
]

export default function NeetOnlineCoursePage() {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <BookOpen className="mr-1 inline h-4 w-4" />
              Complete NEET Preparation
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">NEET Online Course</h1>
            <p className="mb-8 text-xl text-purple-100">
              Comprehensive NEET online course with 500+ video lectures, practice tests, and
              complete study material. Join 1,50,000+ students with 98% success rate!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 shadow-lg transition hover:bg-purple-50"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View Curriculum
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '98%', label: 'Success Rate' },
              { icon: Users, value: '1,50,000+', label: 'Students' },
              { icon: Video, value: '500+', label: 'Video Hours' },
              { icon: Star, value: '4.9/5', label: 'Course Rating' },
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

      {/* Course Modules */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Course Coverage</h2>
            <p className="text-lg text-gray-600">
              Complete NEET syllabus in one comprehensive course
            </p>
          </motion.div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-6 md:grid-cols-3">
              {courseModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl bg-white p-6 shadow-lg"
                >
                  <div className={`mb-4 h-2 w-full rounded-full ${module.color}`} />
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{module.name}</h3>
                  <p className="text-gray-600">{module.chapters} Chapters</p>
                  <p className="text-sm text-gray-500">{module.hours} Hours of Content</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Choose Your Course</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {courseTypes.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 text-2xl font-bold text-purple-600">{course.name}</h3>
                <div className="mb-4 text-gray-600">
                  <p>
                    <Clock className="mr-2 inline h-4 w-4" />
                    Duration: {course.duration}
                  </p>
                  <p>
                    <Users className="mr-2 inline h-4 w-4" />
                    For: {course.target}
                  </p>
                </div>
                <ul className="space-y-2">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">What&apos;s Included</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courseIncludes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-lg"
              >
                <item.icon className="h-10 w-10 flex-shrink-0 text-purple-600" />
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
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
              href="/online-neet-coaching"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              Online NEET Coaching
            </Link>
            <Link
              href="/neet-online-classes"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              NEET Online Classes
            </Link>
            <Link
              href="/neet-online"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              NEET Online
            </Link>
            <Link
              href="/neet-preparation"
              className="rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700 transition hover:bg-emerald-200"
            >
              NEET Preparation
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Enroll in NEET Online Course</h2>
            <p className="mb-8 text-xl text-purple-100">
              Start your journey to medical college today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 shadow-lg transition hover:bg-purple-50"
              >
                Start Free Trial
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
