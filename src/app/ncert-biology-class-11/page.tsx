'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Microscope,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { BookStackIllustration } from '@/components/illustrations/SEOIllustrations'

const chapters = [
  {
    unit: 'Unit I: Diversity in Living World',
    neetWeight: '14%',
    color: 'emerald',
    chapters: [
      { name: 'The Living World', questions: 2 },
      { name: 'Biological Classification', questions: 4 },
      { name: 'Plant Kingdom', questions: 6 },
      { name: 'Animal Kingdom', questions: 8 },
    ],
  },
  {
    unit: 'Unit II: Structural Organisation',
    neetWeight: '5%',
    color: 'blue',
    chapters: [
      { name: 'Morphology of Flowering Plants', questions: 3 },
      { name: 'Anatomy of Flowering Plants', questions: 3 },
      { name: 'Structural Organisation in Animals', questions: 2 },
    ],
  },
  {
    unit: 'Unit III: Cell Structure & Function',
    neetWeight: '9%',
    color: 'purple',
    chapters: [
      { name: 'Cell: The Unit of Life', questions: 5 },
      { name: 'Biomolecules', questions: 5 },
      { name: 'Cell Cycle and Cell Division', questions: 4 },
    ],
  },
  {
    unit: 'Unit IV: Plant Physiology',
    neetWeight: '12%',
    color: 'teal',
    chapters: [
      { name: 'Transport in Plants', questions: 3 },
      { name: 'Mineral Nutrition', questions: 3 },
      { name: 'Photosynthesis in Higher Plants', questions: 5 },
      { name: 'Respiration in Plants', questions: 3 },
      { name: 'Plant Growth and Development', questions: 3 },
    ],
  },
  {
    unit: 'Unit V: Human Physiology',
    neetWeight: '20%',
    color: 'rose',
    chapters: [
      { name: 'Digestion and Absorption', questions: 4 },
      { name: 'Breathing and Exchange of Gases', questions: 3 },
      { name: 'Body Fluids and Circulation', questions: 5 },
      { name: 'Excretory Products and their Elimination', questions: 4 },
      { name: 'Locomotion and Movement', questions: 3 },
      { name: 'Neural Control and Coordination', questions: 5 },
      { name: 'Chemical Coordination and Integration', questions: 4 },
    ],
  },
]

const faqs = [
  {
    question: 'Is NCERT Biology Class 11 sufficient for NEET?',
    answer:
      'NCERT Biology Class 11 forms the foundation for NEET preparation. About 60% of NEET biology questions come directly from Class 11 NCERT. However, for thorough preparation, you should also practice from reference books like NCERT Fingertips and previous year papers.',
  },
  {
    question: 'How to study Class 11 Biology for NEET effectively?',
    answer:
      'Start by reading NCERT thoroughly, line by line. Make notes of important points, diagrams, and definitions. Practice MCQs from each chapter. Focus on high-weightage units like Human Physiology (20%) and Diversity in Living World (14%).',
  },
  {
    question: 'Which Class 11 Biology chapters are most important for NEET?',
    answer:
      'Human Physiology (20% weightage), Animal Kingdom (8%), Plant Kingdom (6%), Cell Biology (9%), and Plant Physiology (12%) are the most important chapters. These alone contribute over 55% of biology questions in NEET.',
  },
  {
    question: 'How many questions come from Class 11 Biology in NEET?',
    answer:
      'Out of 100 biology questions in NEET, approximately 40-45 questions come from Class 11 Biology NCERT. This makes Class 11 syllabus equally important as Class 12 for NEET preparation.',
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  emerald: {
    bg: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-200',
    light: 'bg-green-50',
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200',
    light: 'bg-blue-50',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-200',
    light: 'bg-purple-50',
  },
  teal: {
    bg: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-200',
    light: 'bg-green-50',
  },
  rose: {
    bg: 'bg-rose-500',
    text: 'text-rose-600',
    border: 'border-rose-200',
    light: 'bg-rose-50',
  },
}

export default function NCERTBiologyClass11Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-600 to-cyan-700 text-white overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
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
                <span className="block text-blue-300">Class 11</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Master the foundation of NEET Biology with complete Class 11 NCERT coverage. 60% of
                NEET questions come from these chapters.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">22</div>
                  <div className="text-sm text-white/80">Chapters</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">60%</div>
                  <div className="text-sm text-white/80">NEET Weight</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm text-white/80">Units</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.amazon.in/Biology-Textbook-Class-11-2024-25/dp/8195334792"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-white text-green-700 hover:bg-white/90 font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy on Amazon
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button className="bg-green-600/20 border border-white/30 hover:bg-green-600/30 text-white font-semibold px-6 py-3 rounded-xl">
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

      {/* Book Info Section */}
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
                  <div className="w-32 h-40 bg-green-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      NCERT Biology Textbook for Class 11
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Official NCERT textbook prescribed by CBSE for Class 11 Science stream.
                      Essential for NEET, AIIMS, and board examination preparation.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-700">Publisher</div>
                        <div className="text-sm text-gray-600">NCERT</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-700">Edition</div>
                        <div className="text-sm text-gray-600">2024-25</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-cyan-700">Language</div>
                        <div className="text-sm text-gray-600">English</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-semibold text-blue-700">Pages</div>
                        <div className="text-sm text-gray-600">~320</div>
                      </div>
                    </div>
                    <Link
                      href="https://www.amazon.in/Biology-Textbook-Class-11-2024-25/dp/8195334792"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-green-600 hover:from-green-700 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">
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
              Complete syllabus with NEET weightage and expected questions from each unit
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
                        <span className="text-white font-bold">{idx + 1}</span>
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

      {/* Why Study at Cerebrum */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Study Class 11 Biology at Cerebrum?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AIIMS-trained faculty ensures you master every concept from NCERT
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Microscope,
                title: 'NCERT Line-by-Line',
                description: 'Every line of NCERT is explained with examples',
                color: 'emerald',
              },
              {
                icon: Target,
                title: 'NEET-Focused',
                description: 'High-weightage chapters get extra attention',
                color: 'teal',
              },
              {
                icon: Award,
                title: 'AIIMS Faculty',
                description: 'Learn from doctors who cracked AIIMS themselves',
                color: 'cyan',
              },
              {
                icon: GraduationCap,
                title: '1,50,000+ Students',
                description: 'Successfully guided to medical colleges',
                color: 'blue',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recommended Reference Books
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complete your Class 11 preparation with these essential reference books
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: 'NCERT Fingertips Biology',
                description: 'MCQ practice with NCERT line reference',
                link: '/ncert-fingertips-biology',
                color: 'from-orange-500 to-amber-500',
              },
              {
                title: 'Trueman Biology Vol 1',
                description: 'Detailed theory and practice questions',
                link: '/trueman-biology-for-neet',
                color: 'bg-red-600',
              },
              {
                title: 'MTG Biology for NEET',
                description: 'Topic-wise MCQs and previous papers',
                link: '/mtg-biology-for-neet',
                color: 'from-purple-500 to-violet-500',
              },
            ].map((book, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={book.link}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-100 h-full group">
                    <div
                      className={`w-16 h-20 bg-gradient-to-br ${book.color} rounded-lg mb-4 flex items-center justify-center`}
                    >
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{book.description}</p>
                  </div>
                </Link>
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
                    <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-green-600 via-green-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your NEET Journey Today</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join Cerebrum Biology Academy and get expert guidance on Class 11 NCERT Biology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button className="bg-white text-green-700 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="tel:+918826444334">
                <Button className="bg-green-600/20 border border-white/30 hover:bg-green-600/30 text-white font-semibold px-8 py-3 rounded-xl">
                  Call +91 88264 44334
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schema Markup */}
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
    </main>
  )
}
