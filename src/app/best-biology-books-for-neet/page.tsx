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
  Medal,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { BookStackIllustration } from '@/components/illustrations/SEOIllustrations'

const books = [
  {
    rank: 1,
    name: 'NCERT Biology (Class 11 & 12)',
    author: 'NCERT',
    description: 'The bible for NEET Biology. 80% questions come directly from NCERT.',
    rating: 5,
    difficulty: 'Foundation',
    mustHave: true,
    amazon11: 'https://www.amazon.in/Biology-Textbook-Class-11-2024-25/dp/8195334792',
    amazon12: 'https://www.amazon.in/Biology-Textbook-Class-XII-2024-25/dp/8195334806',
    internalLink: '/ncert-biology-class-11',
    color: 'emerald',
    badge: 'Essential',
  },
  {
    rank: 2,
    name: 'NCERT Fingertips Biology',
    author: 'MTG Editorial',
    description: 'MCQ practice with NCERT line references. Best for revision.',
    rating: 4.5,
    difficulty: 'Intermediate',
    mustHave: true,
    amazonLink: 'https://www.amazon.in/Objective-NCERT-Fingertips-Biology-NEET/dp/9355556837',
    internalLink: '/ncert-fingertips-biology',
    color: 'orange',
    badge: 'Best for MCQ',
  },
  {
    rank: 3,
    name: "Trueman's Elementary Biology",
    author: 'K.N. Bhatia & M.P. Tyagi',
    description: 'Detailed theory with 5000+ MCQs. Great for deep understanding.',
    rating: 4.5,
    difficulty: 'Advanced',
    mustHave: false,
    amazonLink: 'https://www.amazon.in/Truemans-Elementary-Biology-NEET-1/dp/818720218X',
    internalLink: '/trueman-biology-for-neet',
    color: 'red',
    badge: 'Deep Theory',
  },
  {
    rank: 4,
    name: 'MTG Objective Biology',
    author: 'MTG Editorial',
    description: 'Advanced MCQs and previous year papers for extensive practice.',
    rating: 4.3,
    difficulty: 'Advanced',
    mustHave: false,
    amazonLink: 'https://www.amazon.in/MTG-Objective-NCERT-Biology-NEET/dp/9355556829',
    internalLink: '/mtg-biology-for-neet',
    color: 'purple',
    badge: 'Advanced MCQ',
  },
  {
    rank: 5,
    name: 'Errorless Biology',
    author: 'Universal Self Scorer',
    description: 'Large question bank with topic-wise MCQs and solutions.',
    rating: 4.2,
    difficulty: 'Intermediate',
    mustHave: false,
    amazonLink: 'https://www.amazon.in/Errorless-Biology-Neet-2024-Volumes/dp/B0CKJ35K5P',
    internalLink: '/errorless-biology-for-neet',
    color: 'blue',
    badge: 'Question Bank',
  },
  {
    rank: 6,
    name: 'Pradeep Biology',
    author: 'Pradeep Publications',
    description: 'Detailed explanations with diagrams. Good for CBSE + NEET.',
    rating: 4.0,
    difficulty: 'Intermediate',
    mustHave: false,
    amazonLink: 'https://www.amazon.in/Pradeeps-New-Course-Biology-Class/dp/9352835344',
    color: 'teal',
    badge: 'Boards + NEET',
  },
]

const studyPlan = [
  {
    phase: 'Phase 1: Foundation',
    duration: 'First 6 months',
    books: ['NCERT Class 11', 'NCERT Class 12'],
    focus: 'Read NCERT line by line. Understand every concept thoroughly.',
  },
  {
    phase: 'Phase 2: Practice',
    duration: 'Next 4 months',
    books: ['NCERT Fingertips', 'Previous Year Papers'],
    focus: 'Solve MCQs. Mark mistakes and revise from NCERT.',
  },
  {
    phase: 'Phase 3: Advanced',
    duration: 'Last 2 months',
    books: ["Trueman's", 'Mock Tests'],
    focus: 'Deep dive into weak topics. Take full-length mock tests.',
  },
]

const faqs = [
  {
    question: 'Is NCERT sufficient for NEET Biology?',
    answer:
      'NCERT is the foundation - about 80% of NEET Biology questions are from NCERT. However, for competitive edge, supplement with MCQ practice books like NCERT Fingertips. Many NEET toppers recommend: NCERT + Fingertips + Previous Year Papers.',
  },
  {
    question: 'What is the best book for NEET Biology MCQ practice?',
    answer:
      'NCERT Fingertips is widely considered the best for MCQ practice as it has NCERT line references. For advanced practice, MTG Objective Biology and Errorless Biology offer extensive question banks.',
  },
  {
    question: 'Should I read Trueman Biology for NEET?',
    answer:
      "Trueman's is excellent for detailed understanding but not essential. Use it only for topics you find difficult in NCERT. For most students, NCERT + Fingertips + PYQs is sufficient.",
  },
  {
    question: 'How many books should I study for NEET Biology?',
    answer:
      'Quality over quantity. Must-have: NCERT (both classes) + one MCQ book (Fingertips recommended). Optional: Reference book for difficult topics. Avoid using too many books - it creates confusion.',
  },
  {
    question: 'What order should I study these books in?',
    answer:
      'Start with NCERT for concept building. Once you complete a chapter in NCERT, solve MCQs from Fingertips. Save advanced books like Trueman for difficult topics only. Always finish NCERT first.',
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; light: string }> = {
  emerald: {
    bg: 'bg-green-600',
    text: 'text-green-600',
    border: 'border-green-200',
    light: 'bg-green-50',
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-200',
    light: 'bg-orange-50',
  },
  red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-200', light: 'bg-red-50' },
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
}

export default function BestBiologyBooksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-indigo-600 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
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
                <Medal className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Complete Guide 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Best Biology Books
                <span className="block text-indigo-200">for NEET 2026</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Comprehensive guide to the best NEET Biology books. Expert recommendations from
                AIIMS-trained faculty with Amazon links.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">6</div>
                  <div className="text-sm text-white/80">Top Books</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-sm text-white/80">Must-Have</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Coverage</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="#books">
                  <Button className="bg-white text-blue-700 hover:bg-white/90 font-semibold px-6 py-3 rounded-xl">
                    View Book List
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button className="bg-blue-500/20 border border-white/30 hover:bg-blue-500/30 text-white font-semibold px-6 py-3 rounded-xl">
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

      {/* Quick Summary */}
      <section className="py-8 bg-gradient-to-r from-green-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700">
              <span className="font-bold text-green-600">Pro Tip:</span> For most students, just{' '}
              <span className="font-semibold">NCERT + NCERT Fingertips + Previous Year Papers</span>{' '}
              is enough to score 340+ in NEET Biology.
            </p>
          </div>
        </div>
      </section>

      {/* Book Rankings */}
      <section id="books" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top 6 Biology Books for NEET
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ranked by importance and usefulness for NEET 2026 preparation
            </p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {books.map((book, idx) => {
              const colors = colorMap[book.color]
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg border ${colors.border} overflow-hidden hover:shadow-xl transition-shadow`}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Rank Badge */}
                    <div
                      className={`${colors.bg} w-full md:w-24 p-4 flex md:flex-col items-center justify-center text-white`}
                    >
                      <span className="text-sm uppercase font-medium mr-2 md:mr-0">Rank</span>
                      <span className="text-4xl font-bold">#{book.rank}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900">{book.name}</h3>
                            {book.mustHave && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                Must Have
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">by {book.author}</p>
                        </div>
                        <span
                          className={`${colors.light} ${colors.text} px-3 py-1 rounded-full text-sm font-semibold`}
                        >
                          {book.badge}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{book.description}</p>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(book.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : i < book.rating
                                    ? 'text-yellow-400 fill-yellow-400 opacity-50'
                                    : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">{book.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Difficulty: <span className="font-medium">{book.difficulty}</span>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-4">
                        {book.amazon11 && (
                          <Link href={book.amazon11} target="_blank">
                            <Button
                              size="sm"
                              className={`${colors.bg} text-white hover:opacity-90 rounded-lg flex items-center gap-1`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Class 11
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>
                        )}
                        {book.amazon12 && (
                          <Link href={book.amazon12} target="_blank">
                            <Button
                              size="sm"
                              className={`${colors.bg} text-white hover:opacity-90 rounded-lg flex items-center gap-1`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Class 12
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>
                        )}
                        {book.amazonLink && (
                          <Link href={book.amazonLink} target="_blank">
                            <Button
                              size="sm"
                              className={`${colors.bg} text-white hover:opacity-90 rounded-lg flex items-center gap-1`}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Buy on Amazon
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>
                        )}
                        {book.internalLink && (
                          <Link href={book.internalLink}>
                            <Button
                              size="sm"
                              variant="outline"
                              className={`${colors.text} border ${colors.border} hover:${colors.light} rounded-lg`}
                            >
                              Learn More
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Study Plan */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recommended Study Plan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              How to use these books effectively for NEET 2026
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {studyPlan.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{phase.phase}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{phase.duration}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Books to use:</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.books.map((book, bIdx) => (
                      <span
                        key={bIdx}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                      >
                        {book}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{phase.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Tips from AIIMS Faculty
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Target,
                title: 'Focus on NCERT First',
                tip: "Complete NCERT before touching any other book. 80% of NEET comes from NCERT. Don't skip the small print!",
              },
              {
                icon: TrendingUp,
                title: 'Quality Over Quantity',
                tip: "Don't collect too many books. Master 2-3 books thoroughly rather than skimming through 10 books.",
              },
              {
                icon: Award,
                title: 'Solve Previous Year Papers',
                tip: 'Last 10 years NEET papers are more important than any reference book. Analyze your mistakes carefully.',
              },
              {
                icon: Users,
                title: 'Join Expert Coaching',
                tip: 'Books alone cannot replace guided learning. Expert faculty can explain concepts that books cannot.',
              },
            ].map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-blue-100"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <tip.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.tip}</p>
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
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
      <section className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Books + Expert Guidance = Success
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join Cerebrum Academy for comprehensive NEET preparation with AIIMS-trained faculty
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button className="bg-white text-blue-700 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="tel:+918826444334">
                <Button className="bg-blue-500/20 border border-white/30 hover:bg-blue-500/30 text-white font-semibold px-8 py-3 rounded-xl">
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
