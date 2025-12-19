'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  Trophy,
  Clock,
  CheckCircle,
  Star,
  Video,
  Phone,
  Target,
  Award,
  BookOpen,
  BarChart,
  FileText,
  Zap,
} from 'lucide-react'

const neetBiologyStats = [
  { label: 'Total Questions', value: '90', desc: 'Biology questions in NEET' },
  { label: 'Total Marks', value: '360', desc: '50% of NEET total score' },
  { label: 'Class 11 Share', value: '60%', desc: 'Questions from Class 11' },
  { label: 'Class 12 Share', value: '40%', desc: 'Questions from Class 12' },
]

const topicWeightage = [
  { topic: 'Human Physiology', marks: 72, percentage: '20%', class: '11', color: 'bg-blue-500' },
  {
    topic: 'Genetics & Evolution',
    marks: 65,
    percentage: '18%',
    class: '12',
    color: 'bg-purple-500',
  },
  { topic: 'Plant Physiology', marks: 43, percentage: '12%', class: '11', color: 'bg-green-500' },
  {
    topic: 'Ecology & Environment',
    marks: 43,
    percentage: '12%',
    class: '12',
    color: 'bg-emerald-500',
  },
  { topic: 'Reproduction', marks: 43, percentage: '12%', class: '12', color: 'bg-pink-500' },
  { topic: 'Cell Biology', marks: 36, percentage: '10%', class: '11', color: 'bg-orange-500' },
  {
    topic: 'Diversity in Living World',
    marks: 29,
    percentage: '8%',
    class: '11',
    color: 'bg-cyan-500',
  },
  { topic: 'Biotechnology', marks: 29, percentage: '8%', class: '12', color: 'bg-indigo-500' },
]

const neetResults = [
  { year: '2024', selections: 450, topAir: 'AIR 234', state: '15 State Toppers' },
  { year: '2023', selections: 520, topAir: 'AIR 156', state: '18 State Toppers' },
  { year: '2022', selections: 480, topAir: 'AIR 189', state: '12 State Toppers' },
  { year: '2021', selections: 410, topAir: 'AIR 267', state: '10 State Toppers' },
]

const batchOptions = [
  {
    name: 'Target Batch',
    target: 'Serious NEET Aspirants',
    features: [
      'Complete syllabus in 10 months',
      'Daily 3-hour classes',
      '15,000+ MCQs',
      'Weekly tests',
    ],
    color: 'border-purple-500',
  },
  {
    name: 'Regular Batch',
    target: 'Class 11/12 Students',
    features: [
      'Board + NEET integrated',
      '2-hour daily classes',
      'Monthly mock tests',
      'Doubt sessions',
    ],
    color: 'border-blue-500',
  },
  {
    name: 'Crash Course',
    target: 'Droppers / Revision',
    features: ['4-month intensive', 'High-yield topics focus', 'PYQ mastery', 'Daily tests'],
    color: 'border-orange-500',
  },
]

const faqs = [
  {
    question: 'Who is the best online biology teacher for NEET?',
    answer:
      'The best online biology teacher for NEET should have medical background, deep understanding of NEET pattern, and proven results. At Cerebrum, our AIIMS-trained faculty with 2,500+ NEET selections and 98% success rate is considered among the best NEET biology teachers online.',
  },
  {
    question: 'How important is biology in NEET?',
    answer:
      'Biology is the most important subject in NEET, carrying 360 marks (90 questions) - 50% of the total score. A good biology score can significantly boost your overall NEET rank. Our students typically score 340+ in biology.',
  },
  {
    question: 'What topics should I focus on for NEET Biology?',
    answer:
      'High-weightage topics include: Human Physiology (20%), Genetics & Evolution (18%), Plant Physiology (12%), Ecology (12%), and Reproduction (12%). Our teaching prioritizes these topics while ensuring complete syllabus coverage.',
  },
  {
    question: 'Can I crack NEET with online biology coaching?',
    answer:
      'Absolutely! Our online NEET biology students have achieved same results as offline batches - 2,500+ selections including 50+ in top 1000 AIR. Online coaching offers advantages like recorded lectures, flexible timing, and unlimited revision.',
  },
  {
    question: 'How many hours should I study biology for NEET daily?',
    answer:
      'We recommend 3-4 hours daily for NEET biology: 2 hours for new topics, 1 hour for revision, and 1 hour for MCQ practice. Our structured schedule and daily assignments ensure optimal preparation.',
  },
]

export default function BestOnlineBiologyTeacherNEETPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                <Target className="mr-1 inline h-4 w-4" />
                NEET 2026/2026 Preparation
              </span>
              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                Best Online Biology Teacher for NEET
              </h1>
              <p className="mb-8 text-xl text-purple-100">
                Master NEET Biology with India&apos;s best online biology teacher. 90 questions, 360
                marks, 50% of NEET - biology decides your rank. 2,500+ NEET selections, 98% success
                rate!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo"
                  className="rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 shadow-lg transition hover:bg-purple-50"
                >
                  Start NEET Prep
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  View Results
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                  alt="NEET Biology preparation online"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-white/95 p-3 text-center backdrop-blur">
                      <p className="text-2xl font-bold text-purple-600">90</p>
                      <p className="text-xs text-gray-600">Questions</p>
                    </div>
                    <div className="rounded-lg bg-white/95 p-3 text-center backdrop-blur">
                      <p className="text-2xl font-bold text-purple-600">360</p>
                      <p className="text-xs text-gray-600">Marks</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* NEET Biology Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {neetBiologyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <div className="text-3xl font-bold text-purple-600">{stat.value}</div>
                <div className="font-medium text-gray-900">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topic Weightage */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">NEET Biology Topic Weightage</h2>
            <p className="text-lg text-gray-600">
              Our teaching focuses on high-weightage topics for maximum marks
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {topicWeightage.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="overflow-hidden rounded-lg bg-white shadow-lg"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-full ${topic.color} flex items-center justify-center text-white text-sm font-bold`}
                      >
                        {topic.percentage}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{topic.topic}</h3>
                        <p className="text-sm text-gray-500">
                          Class {topic.class} | ~{topic.marks} marks
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
                        {topic.percentage}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100">
                    <div className={`h-full ${topic.color}`} style={{ width: topic.percentage }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our NEET Biology Results</h2>
            <p className="text-lg text-gray-600">Consistent results year after year</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {neetResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <div className="mb-4 text-center">
                  <span className="rounded-full bg-purple-100 px-4 py-2 text-lg font-bold text-purple-600">
                    NEET {result.year}
                  </span>
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-3xl font-bold text-gray-900">{result.selections}+</p>
                  <p className="text-sm text-gray-500">Selections</p>
                  <p className="font-semibold text-emerald-600">{result.topAir}</p>
                  <p className="text-sm text-gray-500">{result.state}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Options */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Choose Your NEET Batch</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {batchOptions.map((batch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl border-t-4 bg-white p-6 shadow-lg ${batch.color}`}
              >
                <h3 className="mb-2 text-2xl font-bold text-gray-900">{batch.name}</h3>
                <p className="mb-4 text-purple-600">{batch.target}</p>
                <ul className="space-y-2">
                  {batch.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className="mt-6 block rounded-lg bg-purple-600 py-2 text-center font-semibold text-white transition hover:bg-purple-700"
                >
                  Join Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NRI Students */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <Zap className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-4 text-3xl font-bold">NRI Students Preparing for NEET?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-indigo-100">
              Join hundreds of NRI students from UAE, USA, UK, Singapore, and Australia who are
              preparing for NEET with India&apos;s best online biology teacher. Flexible timings,
              weekend batches, recorded access.
            </p>
            <Link
              href="/neet-coaching-overseas"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 transition hover:bg-purple-50"
            >
              Learn More for NRI Students
            </Link>
          </motion.div>
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
              href="/online-biology-classes"
              className="rounded-lg bg-teal-100 px-4 py-2 text-teal-700 transition hover:bg-teal-200"
            >
              Online Biology Classes
            </Link>
            <Link
              href="/best-biology-teacher-online"
              className="rounded-lg bg-emerald-100 px-4 py-2 text-emerald-700 transition hover:bg-emerald-200"
            >
              Best Biology Teacher Online
            </Link>
            <Link
              href="/biology-tutor-online"
              className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700 transition hover:bg-blue-200"
            >
              Biology Tutor Online
            </Link>
            <Link
              href="/neet-biology-mcq"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              NEET Biology MCQ Practice
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Start Your NEET Biology Journey</h2>
            <p className="mb-8 text-xl text-purple-100">
              360 marks await. Master biology with the best online teacher for NEET!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-purple-600 shadow-lg transition hover:bg-purple-50"
              >
                Book Free NEET Demo
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
