'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { SEOLandingContent } from '@/data/seo-landing/types'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'

interface SEOFAQSectionProps {
  faqs: SEOLandingContent['faqs']
  title?: string
}

export function SEOFAQSection({ faqs, title = 'Frequently Asked Questions' }: SEOFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <HelpCircle className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Find answers to common questions about our courses and teaching methodology
          </p>
        </motion.div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              {/* H3 wrapper for voice search and AI crawler optimization */}
              <h3 className="m-0">
                <button
                  id={`faq-question-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="pr-4 text-lg font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </h3>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                      <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA below FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 rounded-2xl bg-indigo-500 p-8 text-center"
        >
          <p className="text-lg text-white/90">Still have questions?</p>
          <p className="mt-2 text-2xl font-bold text-white">Talk to our academic counselor</p>
          <a
            href={getPhoneLink()}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            Call Now: {getDisplayPhone()}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
