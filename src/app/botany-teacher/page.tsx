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
  Award,
  Phone,
  Leaf,
} from 'lucide-react'

const botanyTopics = [
  { name: 'Plant Physiology', questions: '10-12', percentage: '12%', color: 'bg-green-600' },
  { name: 'Ecology & Environment', questions: '10-12', percentage: '12%', color: 'bg-green-600' },
  { name: 'Plant Kingdom', questions: '5-6', percentage: '6%', color: 'bg-green-600' },
  { name: 'Cell Biology', questions: '8-10', percentage: '10%', color: 'bg-lime-500' },
  { name: 'Molecular Biology', questions: '5-6', percentage: '6%', color: 'bg-cyan-500' },
  { name: 'Plant Morphology', questions: '2-3', percentage: '3%', color: 'bg-blue-500' },
]

const faqs = [
  {
    question: 'What is the weightage of Botany in NEET?',
    answer:
      'Botany accounts for approximately 45-50% of NEET Biology questions, which translates to 40-45 questions and 160-180 marks out of the total 360 marks in Biology.',
  },
  {
    question: 'Which botany topics are most important for NEET?',
    answer:
      'Plant Physiology (12%), Ecology (12%), Cell Biology (10%), and Plant Kingdom (6%) are the most important botany topics, together contributing about 40% of Biology marks.',
  },
  {
    question: 'Do you provide specialized botany coaching?',
    answer:
      'Yes, our AIIMS-trained faculty provides specialized focus on botany topics with detailed diagrams, flowcharts, and NCERT-based explanations essential for NEET.',
  },
  {
    question: 'How is botany teaching different at Cerebrum Biology Academy?',
    answer:
      'Our botany teaching emphasizes visual learning with detailed plant diagrams, process flowcharts, and ecological concepts. We follow NCERT line-by-line with previous year question integration.',
  },
]

export default function BotanyTeacherPage() {
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
              <Leaf className="mr-1 inline h-4 w-4" />
              45% of NEET Biology = Botany
            </span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Best Botany Teacher for NEET
            </h1>
            <p className="mb-8 text-xl text-green-100">
              Master Plant Physiology, Ecology, Cell Biology & Plant Kingdom with AIIMS-trained
              faculty. Expert teaching methodology for 40-45 questions in NEET.
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

      {/* Stats Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Trophy, value: '2,500+', label: 'NEET Selections' },
              { icon: Users, value: '1,50,000+', label: 'Students Taught' },
              { icon: Star, value: '98%', label: 'Success Rate' },
              { icon: Clock, value: '15+', label: 'Years Experience' },
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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">NEET Botany Topic Weightage</h2>
            <p className="text-lg text-gray-600">
              Our expert teachers focus on high-yield botany topics
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

      {/* Why Choose Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Choose Our Botany Faculty</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: 'AIIMS-Trained Expert',
                desc: 'Faculty with deep understanding of plant biology and its applications in medicine.',
              },
              {
                icon: BookOpen,
                title: 'NCERT-Focused',
                desc: 'Complete NCERT coverage with line-by-line explanation for NEET botany.',
              },
              {
                icon: Target,
                title: 'High-Yield Focus',
                desc: 'Strategic focus on Plant Physiology (12%) and Ecology (12%) for maximum marks.',
              },
              {
                icon: Award,
                title: 'Diagram Mastery',
                desc: 'Detailed plant diagrams, life cycles, and process flowcharts for visual learning.',
              },
              {
                icon: Users,
                title: 'Batch Learning',
                desc: 'Structured batch system with peer learning and doubt sessions.',
              },
              {
                icon: CheckCircle,
                title: 'Previous Year Focus',
                desc: 'Analysis of 10+ years of NEET botany questions for pattern recognition.',
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
      <section className="bg-gray-50 py-16">
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
            Explore More Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/best-botany-teacher-for-neet"
              className="rounded-lg bg-green-100 px-4 py-2 text-green-700 transition hover:bg-green-200"
            >
              Best Botany Teacher for NEET
            </Link>
            <Link
              href="/botany-classes"
              className="rounded-lg bg-cyan-100 px-4 py-2 text-cyan-700 transition hover:bg-cyan-200"
            >
              Botany Classes
            </Link>
            <Link
              href="/zoology-teacher"
              className="rounded-lg bg-indigo-100 px-4 py-2 text-indigo-700 transition hover:bg-indigo-200"
            >
              Zoology Teacher
            </Link>
            <Link
              href="/biology-teacher"
              className="rounded-lg bg-purple-100 px-4 py-2 text-purple-700 transition hover:bg-purple-200"
            >
              Biology Teacher
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="mb-4 text-3xl font-bold">Ready to Master Botany?</h2>
            <p className="mb-8 text-xl text-green-100">
              Join our expert-led botany classes and score 160+ in NEET Biology
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
