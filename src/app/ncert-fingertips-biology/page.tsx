'use client'

import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Target,
  Award,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Star,
  Fingerprint,
  FileText,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { BookStackIllustration } from '@/components/illustrations/SEOIllustrations'

const bookFeatures = [
  {
    icon: Fingerprint,
    title: 'NCERT Line Reference',
    description: 'Every question has page number and line reference to NCERT textbook',
  },
  {
    icon: Target,
    title: '4500+ MCQs',
    description: 'Chapter-wise MCQs covering entire Class 11 & 12 syllabus',
  },
  {
    icon: FileText,
    title: 'Previous Year Papers',
    description: 'Last 10 years NEET questions with detailed solutions',
  },
  {
    icon: Zap,
    title: 'Quick Revision',
    description: 'Summary points and flowcharts for last-minute revision',
  },
]

const chapters = [
  { name: 'The Living World', mcqs: 120 },
  { name: 'Biological Classification', mcqs: 180 },
  { name: 'Plant Kingdom', mcqs: 220 },
  { name: 'Animal Kingdom', mcqs: 280 },
  { name: 'Morphology of Flowering Plants', mcqs: 150 },
  { name: 'Anatomy of Flowering Plants', mcqs: 140 },
  { name: 'Cell: The Unit of Life', mcqs: 200 },
  { name: 'Biomolecules', mcqs: 180 },
  { name: 'Cell Cycle and Cell Division', mcqs: 160 },
  { name: 'Human Physiology (All Chapters)', mcqs: 800 },
  { name: 'Genetics & Evolution', mcqs: 500 },
  { name: 'Ecology & Environment', mcqs: 350 },
]

const faqs = [
  {
    question: 'What is NCERT Fingertips Biology?',
    answer:
      'NCERT Fingertips Biology is a comprehensive MCQ practice book by MTG that contains 4500+ questions from NCERT Class 11 and 12 Biology. Its unique feature is that every question has a page number and line reference to the NCERT textbook, making it easy to verify answers.',
  },
  {
    question: 'Is NCERT Fingertips enough for NEET Biology?',
    answer:
      'NCERT Fingertips is an excellent supplement for NCERT textbooks. It helps you practice MCQs and identify which NCERT lines are important. For complete preparation, combine it with NCERT reading and previous year papers. About 80% of NEET Biology can be covered with NCERT + Fingertips.',
  },
  {
    question: 'Which is better - NCERT Fingertips or MTG Objective Biology?',
    answer:
      'Both are from MTG but serve different purposes. NCERT Fingertips is strictly NCERT-based with line references - perfect for beginners. MTG Objective Biology has more advanced questions and is better for students who have completed NCERT and want extra practice.',
  },
  {
    question: 'How to use NCERT Fingertips effectively for NEET?',
    answer:
      'First read the NCERT chapter thoroughly. Then solve Fingertips MCQs. For wrong answers, go back to the exact NCERT line using the reference given. Mark difficult questions and revise them before exams. This builds strong NCERT fundamentals.',
  },
]

export default function NCERTFingertipsBiologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
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
                <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                <span className="text-sm font-medium">Best Seller for NEET</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                NCERT Fingertips
                <span className="block text-yellow-200">Biology for NEET</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-lg">
                The ultimate MCQ practice book with NCERT line references. 4500+ questions to master
                every concept from Class 11 & 12.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">4500+</div>
                  <div className="text-sm text-white/80">MCQs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">38</div>
                  <div className="text-sm text-white/80">Chapters</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">10</div>
                  <div className="text-sm text-white/80">Years PYQ</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.amazon.in/Objective-NCERT-Fingertips-Biology-NEET/dp/9355556837"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Button className="bg-white text-orange-600 hover:bg-white/90 font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy on Amazon
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button className="bg-orange-600/20 border border-white/30 hover:bg-orange-600/30 text-white font-semibold px-6 py-3 rounded-xl">
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

      {/* Book Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why NCERT Fingertips?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The most trusted MCQ book for NEET Biology preparation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {bookFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Details */}
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
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-full md:w-40 h-52 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                    <div className="text-center text-white">
                      <Fingerprint className="w-12 h-12 mx-auto mb-2" />
                      <div className="font-bold text-sm">NCERT</div>
                      <div className="text-xs">Fingertips</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Objective NCERT at Your Fingertips - Biology
                      </h2>
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                        Bestseller
                      </span>
                    </div>
                    <p className="text-gray-500 mb-4">by MTG Editorial Board</p>
                    <p className="text-gray-600 mb-4">
                      The most recommended book for NEET Biology MCQ practice. Contains chapter-wise
                      MCQs with NCERT page and line references, previous year NEET questions, and
                      assertion-reasoning questions.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="font-semibold text-orange-700">Publisher</div>
                        <div className="text-sm text-gray-600">MTG</div>
                      </div>
                      <div className="text-center p-3 bg-amber-50 rounded-lg">
                        <div className="font-semibold text-yellow-700">Edition</div>
                        <div className="text-sm text-gray-600">2024-25</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="font-semibold text-yellow-700">Pages</div>
                        <div className="text-sm text-gray-600">~700</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="font-semibold text-orange-700">Rating</div>
                        <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                          4.5 <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                    </div>
                    <Link
                      href="https://www.amazon.in/Objective-NCERT-Fingertips-Biology-NEET/dp/9355556837"
                      target="_blank" rel="noopener noreferrer"
                    >
                      <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
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

      {/* Chapter-wise MCQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chapter-wise MCQ Count
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Practice targeted MCQs from each chapter
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {chapters.map((chapter, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span className="text-gray-700 text-sm">{chapter.name}</span>
                </div>
                <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {chapter.mcqs}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Use NCERT Fingertips Effectively
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  step: '1',
                  title: 'Read NCERT Chapter',
                  description:
                    'First complete reading the NCERT chapter thoroughly. Underline important lines.',
                },
                {
                  step: '2',
                  title: 'Solve Fingertips MCQs',
                  description:
                    'Attempt all MCQs from that chapter. Time yourself - aim for 1 minute per MCQ.',
                },
                {
                  step: '3',
                  title: 'Check with NCERT Reference',
                  description:
                    'For wrong answers, use the page/line reference to go back to exact NCERT source.',
                },
                {
                  step: '4',
                  title: 'Mark & Revise',
                  description: 'Star difficult questions. Revise them weekly and before exams.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Complete Your Collection
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'NCERT Class 11',
                href: '/ncert-biology-class-11',
                color: 'bg-green-600',
              },
              {
                title: 'NCERT Class 12',
                href: '/ncert-biology-class-12',
                color: 'from-purple-500 to-violet-500',
              },
              {
                title: 'Trueman Biology',
                href: '/trueman-biology-for-neet',
                color: 'bg-red-600',
              },
              {
                title: 'MTG Biology',
                href: '/mtg-biology-for-neet',
                color: 'blue-600',
              },
            ].map((book, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={book.href}>
                  <div
                    className={`bg-gradient-to-br ${book.color} rounded-xl p-5 text-white text-center hover:shadow-lg transition-shadow`}
                  >
                    <BookOpen className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-semibold">{book.title}</span>
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
                    <ChevronUp className="w-5 h-5 text-orange-600 flex-shrink-0" />
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

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help with NCERT Biology?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join Cerebrum Academy for expert NCERT guidance and NEET preparation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button className="bg-white text-orange-600 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="tel:+918826444334">
                <Button className="bg-orange-600/20 border border-white/30 hover:bg-orange-600/30 text-white font-semibold px-8 py-3 rounded-xl">
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
