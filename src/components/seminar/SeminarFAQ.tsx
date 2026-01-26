'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SEMINAR_FAQS } from '@/lib/seminar/config'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

export function SeminarFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleWhatsAppClick = () => {
    trackAndOpenWhatsApp({
      source: 'seminar_faq',
      message: WHATSAPP_MESSAGES.seminarFAQ,
      buttonText: 'Ask on WhatsApp',
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-green-600 font-semibold mb-2">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Got Questions? We've Got Answers
          </h2>
        </div>

        <div className="space-y-4">
          {SEMINAR_FAQS.map((faq, index) => (
            <div key={index} className="bg-slate-50 rounded-xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-10 text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
          <p className="text-slate-900 font-semibold mb-2">Still have questions?</p>
          <p className="text-slate-600 mb-4">
            Send us a message on WhatsApp and we'll respond within 2 minutes.
          </p>
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <span>💬</span>
            <span>Ask on WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default SeminarFAQ
