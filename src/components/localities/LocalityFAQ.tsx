'use client'

import { useState } from 'react'
import { Locality } from '@/data/localities'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface LocalityFAQProps {
  locality: Locality
}

export default function LocalityFAQ({ locality }: LocalityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions - {locality.displayName}
          </h2>
          <p className="text-gray-600">
            Common questions from {locality.displayName} students about our NEET Biology coaching
          </p>
        </div>

        <div className="space-y-4">
          {locality.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions about our {locality.displayName} coaching?
          </p>
          <a
            href={`https://wa.me/918826444334?text=Hi, I have a question about NEET Biology coaching in ${locality.displayName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
