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
  Target,
  Phone,
  TrendingUp,
  Leaf,
} from 'lucide-react'

const botanyTopics = [
  { name: 'Plant Physiology', questions: '10-12', percentage: '12%', color: 'bg-green-600' },
  { name: 'Ecology & Environment', questions: '10-12', percentage: '12%', color: 'bg-green-600' },
  { name: 'Cell Biology', questions: '8-10', percentage: '10%', color: 'bg-green-600' },
  { name: 'Plant Kingdom', questions: '5-6', percentage: '6%', color: 'bg-lime-500' },
  { name: 'Molecular Biology', questions: '5-6', percentage: '6%', color: 'bg-blue-500' },
  { name: 'Plant Morphology', questions: '2-3', percentage: '3%', color: 'bg-blue-500' },
]

const achievements = [
  { year: '2024', students: '350+', toppers: '50+ below 5000 AIR' },
  { year: '2023', students: '320+', toppers: '45+ below 5000 AIR' },
  { year: '2022', students: '280+', toppers: '40+ below 5000 AIR' },
]

const faqs = [
  {
    question: 'Who is the best botany teacher for NEET?',
    answer:
      'The best botany teacher for NEET should have NCERT expertise, visual teaching methodology, and proven track record. Our AIIMS-trained faculty has helped 1,50,000+ students crack NEET with strong botany scores.',
  },
  {
    question: 'Why is botany important for NEET?',
    answer:
      'Botany accounts for 45% of NEET Biology (40-45 questions, 160-180 marks). Plant Physiology and Ecology together contribute 24% of Biology marks, making expert botany teaching crucial for NEET success.',
  },
  {
    question: 'What makes your botany teaching best for NEET?',
    answer:
      'Our teaching combines visual diagrams, ecological flowcharts, NCERT line-by-line coverage, 10+ years of previous year analysis, and batch learning with peer support.',
  },
  {
    question: 'How can expert botany teaching improve my NEET score?',
    answer:
      'Expert botany teaching can help you score 70-80 marks in Plant Physiology and Ecology combined. With Cell Biology and other topics, you can secure 150+ marks just from botany section.',
  },
]

export default function BestBotanyTeacherForNeetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Trophy className="mr-1 inline h-4 w-4" />
              67+ AIIMS Selections | 98% Success Rate
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Best Botany Teacher for NEET
            </h1>
            <p className="mb-8 text-xl text-green-100">
              AIIMS-trained expert faculty with proven track record. Master Plant Physiology,
              Ecology, Cell Biology & Plant Kingdom to score 150+ in NEET Botany.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-green-600 shadow-lg transition hover:bg-green-50"
              >
                Book Free Demo
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Proven NEET Results</h2>
            <p className="text-lg text-gray-600">Our students consistently excel in NEET Biology</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <div className="mb-2 text-4xl font-bold text-green-600">{item.year}</div>
                <div className="mb-1 text-2xl font-semibold text-gray-900">
                  {item.students} Selected
                </div>
                <div className="text-gray-600">{item.toppers}</div>
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
              { icon: Trophy, value: '67+', label: 'AIIMS Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students Taught' },
              { icon: Star, value: '98%', label: 'Success Rate' },
              { icon: Clock, value: '15+', label: 'Years Teaching NEET' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEET Botany Breakdown */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">NEET Botany Topic Weightage</h2>
            <p className="text-lg text-gray-600">
              Our expert teaching focuses on high-scoring botany topics
            </p>
          </motion.div>

          <div className="mx-auto max-w-4xl">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              {botanyTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="mb-2 flex justify-between">
                    <span className="font-medium text-gray-900">{topic.name}</span>
                    <span className="text-gray-600">
                      {topic.questions} Qs ({topic.percentage})
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: topic.percentage }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full ${topic.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Best */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Why We&apos;re the Best for NEET Botany
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: 'AIIMS-Trained Expert',
                desc: 'Deep understanding of plant biology with medical application perspective.',
              },
              {
                icon: TrendingUp,
                title: 'Proven Track Record',
                desc: '67+ AIIMS selections with consistent 98% success rate year after year.',
              },
              {
                icon: BookOpen,
                title: 'NCERT Mastery',
                desc: 'Line-by-line NCERT coverage - the foundation of NEET Biology.',
              },
              {
                icon: Leaf,
                title: 'Visual Teaching',
                desc: 'Detailed plant diagrams, life cycles, and ecological flowcharts.',
              },
              {
                icon: Target,
                title: 'Strategic Focus',
                desc: 'Special emphasis on Plant Physiology (12%) and Ecology (12%).',
              },
              {
                icon: CheckCircle,
                title: 'PYQ Analysis',
                desc: '10+ years of previous year question analysis for pattern recognition.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-white p-6 shadow-lg"
              >
                <feature.icon className="mb-4 h-10 w-10 text-green-600" />
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
              href="/botany-teacher-near-me"
              className="rounded-lg bg-lime-100 px-4 py-2 text-lime-700 transition hover:bg-lime-200"
            >
              Botany Teacher Near Me
            </Link>
            <Link
              href="/botany-classes"
              className="rounded-lg bg-cyan-100 px-4 py-2 text-cyan-700 transition hover:bg-cyan-200"
            >
              Botany Classes
            </Link>
            <Link
              href="/best-zoology-teacher-for-neet"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Best Zoology Teacher for NEET
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Learn from the Best Botany Teacher</h2>
            <p className="mb-8 text-xl text-green-100">
              Join 1,50,000+ students who achieved NEET success with our expert botany teaching
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/demo"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-green-600 shadow-lg transition hover:bg-green-50"
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
