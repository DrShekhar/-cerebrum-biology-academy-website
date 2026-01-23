'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Dna,
  Leaf,
  Microscope,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { BookStackIllustration } from '@/components/illustrations/SEOIllustrations'

const chapters = [
  {
    unit: 'Unit VI: Reproduction',
    neetWeight: '12%',
    color: 'rose',
    chapters: [
      { name: 'Reproduction in Organisms', questions: 2 },
      { name: 'Sexual Reproduction in Flowering Plants', questions: 5 },
      { name: 'Human Reproduction', questions: 6 },
      { name: 'Reproductive Health', questions: 3 },
    ],
  },
  {
    unit: 'Unit VII: Genetics & Evolution',
    neetWeight: '18%',
    color: 'purple',
    chapters: [
      { name: 'Principles of Inheritance & Variation', questions: 10 },
      { name: 'Molecular Basis of Inheritance', questions: 8 },
      { name: 'Evolution', questions: 4 },
    ],
  },
  {
    unit: 'Unit VIII: Biology in Human Welfare',
    neetWeight: '8%',
    color: 'blue',
    chapters: [
      { name: 'Human Health and Disease', questions: 6 },
      { name: 'Strategies for Enhancement in Food Production', questions: 3 },
      { name: 'Microbes in Human Welfare', questions: 3 },
    ],
  },
  {
    unit: 'Unit IX: Biotechnology',
    neetWeight: '6%',
    color: 'teal',
    chapters: [
      { name: 'Biotechnology: Principles & Processes', questions: 4 },
      { name: 'Biotechnology and its Applications', questions: 3 },
    ],
  },
  {
    unit: 'Unit X: Ecology',
    neetWeight: '12%',
    color: 'emerald',
    chapters: [
      { name: 'Organisms and Populations', questions: 4 },
      { name: 'Ecosystem', questions: 5 },
      { name: 'Biodiversity and Conservation', questions: 4 },
      { name: 'Environmental Issues', questions: 3 },
    ],
  },
]

const faqs = [
  {
    question: 'Is Class 12 Biology more important than Class 11 for NEET?',
    answer:
      'Both classes are equally important. Class 12 contributes about 40% of NEET biology questions with high-weightage topics like Genetics (18%), Reproduction (12%), and Ecology (12%). The questions from Class 12 are often more conceptual and application-based.',
  },
  {
    question: 'Which Class 12 chapters have highest NEET weightage?',
    answer:
      'Genetics & Evolution (18%) is the most important unit, followed by Reproduction (12%) and Ecology (12%). The chapter "Principles of Inheritance and Variation" alone can have 8-10 questions in NEET.',
  },
  {
    question: 'How to prepare Class 12 Biology along with boards?',
    answer:
      'Read NCERT thoroughly for both boards and NEET. Focus on diagrams, flowcharts, and definitions. Practice MCQs alongside board preparation. Topics like Genetics, Reproduction, and Ecology are equally important for both exams.',
  },
  {
    question: 'Can I skip some chapters in Class 12 for NEET?',
    answer:
      'No chapter should be skipped as NEET asks questions from every chapter. However, prioritize high-weightage chapters like Genetics (10 Qs), Human Reproduction (6 Qs), and Ecosystem (5 Qs) while ensuring basic coverage of all topics.',
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  rose: {
    bg: 'bg-rose-500',
    text: 'text-rose-600',
    border: 'border-rose-200',
    light: 'bg-rose-50',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-200',
    light: 'bg-purple-50',
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200',
    light: 'bg-blue-50',
  },
  teal: {
    bg: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-200',
    light: 'bg-green-50',
  },
  emerald: {
    bg: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-200',
    light: 'bg-green-50',
  },
}

export default function NCERTBiologyClass12Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">NCERT Textbook Series</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                NCERT Biology
                <span className="block text-violet-300">Class 12</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Master high-scoring chapters like Genetics (18%) and Reproduction (12%). Class 12
                NCERT is crucial for cracking NEET.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">16</div>
                  <div className="text-sm text-white/80">Chapters</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">40%</div>
                  <div className="text-sm text-white/80">NEET Weight</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm text-white/80">Units</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.amazon.in/Biology-Textbook-Class-XII-2024-25/dp/8195334806"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Button className="bg-white text-purple-700 hover:bg-white/90 font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy on Amazon
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button className="bg-purple-500/20 border border-white/30 hover:bg-purple-500/30 text-white font-semibold px-6 py-3 rounded-xl">
                    Book Free Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <BookStackIllustration className="w-full max-w-md mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-start gap-6">
                  <div className="w-32 h-40 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <Dna className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      NCERT Biology Textbook for Class 12
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Official NCERT textbook covering Genetics, Evolution, Biotechnology, Ecology,
                      and more. Contains 40% of NEET Biology syllabus.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="font-semibold text-purple-700">Publisher</div>
                        <div className="text-sm text-gray-600">NCERT</div>
                      </div>
                      <div className="text-center p-3 bg-violet-50 rounded-lg">
                        <div className="font-semibold text-violet-700">Edition</div>
                        <div className="text-sm text-gray-600">2024-25</div>
                      </div>
                      <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <div className="font-semibold text-indigo-700">Language</div>
                        <div className="text-sm text-gray-600">English</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-blue-700">Pages</div>
                        <div className="text-sm text-gray-600">~290</div>
                      </div>
                    </div>
                    <Link
                      href="https://www.amazon.in/Biology-Textbook-Class-XII-2024-25/dp/8195334806"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Buy from Amazon India
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter Breakdown */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unit-wise Chapter Breakdown
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete Class 12 syllabus with NEET weightage analysis
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {chapters.map((unit, idx) => {
              const colors = colorMap[unit.color]
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-white rounded-2xl shadow-md border ${colors.border} overflow-hidden`}
                >
                  <div className={`${colors.light} p-5 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}
                      >
                        <span className="text-white font-bold">{idx + 6}</span>
                      </div>
                      <h3 className="font-bold text-gray-900">{unit.unit}</h3>
                    </div>
                    <div
                      className={`${colors.bg} text-white px-4 py-1.5 rounded-full text-sm font-semibold`}
                    >
                      {unit.neetWeight} NEET
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="grid md:grid-cols-2 gap-3">
                      {unit.chapters.map((chapter, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className={`w-4 h-4 ${colors.text}`} />
                            <span className="text-gray-700 text-sm">{chapter.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{chapter.questions} Qs</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* High-scoring Topics */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-violet-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              High-Scoring Topics in Class 12
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Genetics & Inheritance',
                weight: '18%',
                topics: [
                  'Mendelian Genetics',
                  'Chromosomal Disorders',
                  'DNA Replication',
                  'Gene Expression',
                ],
                icon: Dna,
                color: 'purple',
              },
              {
                title: 'Reproduction',
                weight: '12%',
                topics: [
                  'Human Reproduction',
                  'Gametogenesis',
                  'Embryonic Development',
                  'Reproductive Health',
                ],
                icon: Microscope,
                color: 'rose',
              },
              {
                title: 'Ecology',
                weight: '12%',
                topics: [
                  'Ecosystems',
                  'Biodiversity',
                  'Population Ecology',
                  'Environmental Issues',
                ],
                icon: Leaf,
                color: 'emerald',
              },
            ].map((topic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div
                  className={`w-14 h-14 bg-${topic.color}-100 rounded-xl flex items-center justify-center mb-4`}
                >
                  <topic.icon className={`w-7 h-7 text-${topic.color}-600`} />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{topic.title}</h3>
                  <span
                    className={`bg-${topic.color}-100 text-${topic.color}-700 px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {topic.weight}
                  </span>
                </div>
                <ul className="space-y-2">
                  {topic.topics.map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className={`w-4 h-4 text-${topic.color}-500`} />
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Continue Your Preparation
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Class 11 NCERT',
                href: '/ncert-biology-class-11',
                color: 'bg-green-600',
              },
              {
                title: 'NCERT Fingertips',
                href: '/ncert-fingertips-biology',
                color: 'from-orange-500 to-amber-500',
              },
              {
                title: 'Trueman Biology',
                href: '/trueman-biology-for-neet',
                color: 'bg-red-600',
              },
              {
                title: 'Best Books for NEET',
                href: '/best-biology-books-for-neet',
                color: 'blue-600',
              },
            ].map((link, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={link.href}>
                  <div
                    className={`bg-gradient-to-br ${link.color} rounded-xl p-5 text-white text-center hover:shadow-lg transition-shadow`}
                  >
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-semibold">{link.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Master Class 12 Biology with Expert Guidance
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join Cerebrum Biology Academy for comprehensive NCERT coverage and NEET preparation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button className="bg-white text-purple-700 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="tel:+918826444334">
                <Button className="bg-purple-500/20 border border-white/30 hover:bg-purple-500/30 text-white font-semibold px-8 py-3 rounded-xl">
                  Call +91 88264 44334
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </main>
  )
}
