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
  BookMarked,
  FileText,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import { BookStackIllustration } from '@/components/illustrations/SEOIllustrations'

const volumes = [
  {
    title: 'Volume 1 - Class 11',
    topics: [
      'Diversity in Living World',
      'Structural Organization',
      'Cell Structure & Function',
      'Plant Physiology',
      'Human Physiology',
    ],
    pages: '~650',
    color: 'red',
  },
  {
    title: 'Volume 2 - Class 12',
    topics: [
      'Reproduction',
      'Genetics & Evolution',
      'Biology in Human Welfare',
      'Biotechnology',
      'Ecology',
    ],
    pages: '~550',
    color: 'rose',
  },
]

const features = [
  {
    icon: BookMarked,
    title: 'Detailed Explanation',
    description: 'In-depth theory going beyond NCERT with examples and diagrams',
  },
  {
    icon: FileText,
    title: 'MCQ Bank',
    description: '5000+ MCQs including NEET, AIIMS, and JIPMER previous year questions',
  },
  {
    icon: Layers,
    title: 'Two Volumes',
    description: 'Separate books for Class 11 and Class 12 syllabus',
  },
  {
    icon: Target,
    title: 'NEET Pattern',
    description: 'Questions designed as per latest NEET examination pattern',
  },
]

const faqs = [
  {
    question: "What is Trueman's Elementary Biology?",
    answer:
      "Trueman's Elementary Biology is a comprehensive reference book for NEET Biology preparation by K.N. Bhatia and M.P. Tyagi. It comes in 2 volumes - Volume 1 covers Class 11 and Volume 2 covers Class 12 syllabus. Known for detailed explanations and extensive MCQ practice.",
  },
  {
    question: 'Is Trueman Biology sufficient for NEET?',
    answer:
      'Trueman Biology is excellent for detailed understanding and MCQ practice. However, NCERT should always be your primary source as NEET questions are mostly NCERT-based. Use Trueman as a supplement for deeper understanding and additional practice.',
  },
  {
    question: "Trueman's vs NCERT Fingertips - which is better?",
    answer:
      "NCERT Fingertips is strictly NCERT-based with line references - ideal for NCERT revision. Trueman's provides more detailed theory and advanced MCQs beyond NCERT. Best approach: Use Fingertips for NCERT-based questions and Trueman's for deeper concepts.",
  },
  {
    question: 'How to study from Trueman Biology for NEET?',
    answer:
      'First complete NCERT thoroughly. Then use Trueman for topics that need deeper explanation. Focus on diagrams and flowcharts. Solve the MCQs chapter-wise and analyze your mistakes. Use it especially for Human Physiology and Genetics.',
  },
]

export default function TruemanBiologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl"
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
                <span className="text-sm font-medium">Trusted by NEET Toppers</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Trueman Biology
                <span className="block text-rose-200">for NEET 2026</span>
              </h1>

              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Comprehensive biology reference with detailed theory and 5000+ MCQs. The go-to book
                for in-depth NEET Biology preparation.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">2</div>
                  <div className="text-sm text-white/80">Volumes</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">5000+</div>
                  <div className="text-sm text-white/80">MCQs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                  <div className="text-3xl font-bold">1200</div>
                  <div className="text-sm text-white/80">Pages</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.amazon.in/Truemans-Elementary-Biology-NEET-1/dp/818720218X"
                  target="_blank"
                >
                  <Button className="bg-white text-red-600 hover:bg-white/90 font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Vol 1 on Amazon
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
                <Link
                  href="https://www.amazon.in/Truemans-Elementary-Biology-Vol-NEET/dp/8187223316"
                  target="_blank"
                >
                  <Button className="bg-red-600/20 border border-white/30 hover:bg-red-600/30 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
                    Buy Vol 2
                    <ExternalLink className="w-4 h-4" />
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

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Trueman Biology?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 hover:border-red-300 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Two Volumes for Complete Coverage
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {volumes.map((vol, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div
                  className={`bg-gradient-to-r from-${vol.color}-500 to-${vol.color === 'red' ? 'rose' : 'pink'}-500 p-6 text-white`}
                >
                  <h3 className="text-xl font-bold mb-2">{vol.title}</h3>
                  <p className="text-white/80 text-sm">{vol.pages} pages</p>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Topics Covered:</h4>
                  <ul className="space-y-2">
                    {vol.topics.map((topic, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-red-500" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={
                      idx === 0
                        ? 'https://www.amazon.in/Truemans-Elementary-Biology-NEET-1/dp/818720218X'
                        : 'https://www.amazon.in/Truemans-Elementary-Biology-Vol-NEET/dp/8187223316'
                    }
                    target="_blank"
                    className="mt-6 block"
                  >
                    <Button className="w-full bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 rounded-xl flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Buy on Amazon
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trueman vs Other Biology Books
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-red-500 to-rose-500 text-white">
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-center">Trueman</th>
                  <th className="px-6 py-4 text-center">NCERT</th>
                  <th className="px-6 py-4 text-center">Fingertips</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Theory Depth', 'Detailed', 'Standard', 'Summary'],
                  ['MCQs', '5000+', 'None', '4500+'],
                  ['PYQ Coverage', 'Yes', 'No', 'Yes'],
                  ['Diagrams', 'Extensive', 'Good', 'Few'],
                  ['Best For', 'Deep Learning', 'Foundation', 'Quick Revision'],
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row[0]}</td>
                    <td className="px-6 py-4 text-center text-red-600 font-medium">{row[1]}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row[2]}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related Books */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-rose-50">
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
                color: 'from-emerald-500 to-teal-500',
              },
              {
                title: 'NCERT Class 12',
                href: '/ncert-biology-class-12',
                color: 'from-purple-500 to-violet-500',
              },
              {
                title: 'NCERT Fingertips',
                href: '/ncert-fingertips-biology',
                color: 'from-orange-500 to-amber-500',
              },
              {
                title: 'Best Biology Books',
                href: '/best-biology-books-for-neet',
                color: 'from-blue-500 to-indigo-500',
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
      <section className="py-16">
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
                    <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Expert NEET Guidance?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Join Cerebrum Academy for comprehensive Biology coaching by AIIMS-trained faculty
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/demo">
                <Button className="bg-white text-red-600 hover:bg-white/90 font-semibold px-8 py-3 rounded-xl">
                  Book Free Demo Class
                </Button>
              </Link>
              <Link href="tel:+918826444334">
                <Button className="bg-red-600/20 border border-white/30 hover:bg-red-600/30 text-white font-semibold px-8 py-3 rounded-xl">
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
