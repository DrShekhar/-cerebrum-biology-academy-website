'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

export interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  subtitle?: string
  faqs: FAQ[]
  schemaMarkup?: boolean
}

export function FAQSection({
  title = 'Frequently Asked Questions',
  subtitle = 'Got questions? We have answers.',
  faqs,
  schemaMarkup = true,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Generate JSON-LD schema markup for SEO
  const generateSchemaMarkup = () => {
    if (!schemaMarkup) return null

    const schemaData = {
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
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    )
  }

  return (
    <>
      {generateSchemaMarkup()}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex rounded-full bg-purple-100 p-3"
            >
              <HelpCircle className="h-8 w-8 text-purple-700" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg text-slate-600"
            >
              {subtitle}
            </motion.p>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="pr-8 text-lg font-semibold text-slate-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-6 w-6 flex-shrink-0 text-slate-400 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-slate-100 px-6 py-5">
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center"
          >
            <p className="text-lg text-slate-700">
              Still have questions?{' '}
              <a href="tel:918826444334" className="font-semibold text-purple-700 hover:underline">
                Call us at +91-88264-44334
              </a>{' '}
              or{' '}
              <a href="#demo-form" className="font-semibold text-purple-700 hover:underline">
                book a free demo
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
