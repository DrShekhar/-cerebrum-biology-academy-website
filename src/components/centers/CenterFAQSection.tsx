/**
 * CenterFAQSection - Location-specific FAQ component with FAQPage schema
 *
 * Renders center-specific frequently asked questions with:
 * - Accordion UI for expand/collapse
 * - FAQPage structured data for Google rich results
 * - WhatsApp CTA for unanswered questions
 */

import { getCenterFAQs } from '@/data/faqs/center-specific-faqs'
import { FAQSchema } from '@/components/seo/FAQSchema'

interface CenterFAQSectionProps {
  centerId: string
  className?: string
}

export default function CenterFAQSection({ centerId, className = '' }: CenterFAQSectionProps) {
  const centerData = getCenterFAQs(centerId)

  if (!centerData) {
    return null
  }

  const schemaQuestions = centerData.faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }))

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions — {centerData.centerName}
          </h2>
          <p className="text-gray-600">
            Common questions from {centerData.city} students about our NEET Biology coaching at{' '}
            {centerData.centerName}
          </p>
        </div>

        <div className="space-y-4">
          {centerData.faqs.map((faq, index) => (
            <details
              key={`center-faq-${centerId}-${index}`}
              className="group bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              {...(index === 0 ? { open: true } : {})}
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold text-gray-900 pr-8 text-lg">{faq.question}</h3>
                <span className="text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions about our {centerData.city} center?
          </p>
          <a
            href="https://wa.me/918826444334?text=Hi%2C%20I%20have%20a%20question%20about%20NEET%20Biology%20coaching%20at%20your%20center"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>

      <FAQSchema
        questions={schemaQuestions}
        pageUrl={`https://cerebrumbiologyacademy.com/centers/${centerId}`}
      />
    </section>
  )
}
