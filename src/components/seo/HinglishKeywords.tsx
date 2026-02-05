'use client'

import { useEffect } from 'react'

/**
 * Hinglish Keywords for Long-Tail SEO Targeting
 * These are common search queries in Hinglish (Hindi + English mix) that
 * Indian students use when searching for NEET coaching.
 */

export const HINGLISH_KEYWORDS = {
  // Primary NEET Preparation Terms
  primary: [
    'NEET ki taiyari',
    'NEET ki taiyari kaise kare',
    'NEET preparation tips in Hindi',
    'Biology ki padhai',
    'Biology padhne ka tarika',
    'NEET Biology notes Hindi mein',
  ],

  // Coaching Related
  coaching: [
    'best NEET coaching Gurugram mein',
    'sabse accha Biology coaching',
    'NEET coaching fees kitni hai',
    'online NEET classes Hindi mein',
    'Biology teacher near me',
    'NEET dropper batch kahan join kare',
  ],

  // Study Material
  studyMaterial: [
    'NEET Biology notes PDF',
    'NCERT Biology Hindi mein',
    'Biology question bank',
    'previous year NEET questions',
    'Biology MCQ practice',
    'NEET mock test free',
  ],

  // Results & Success
  success: [
    'NEET mein top kaise kare',
    'NEET 600+ marks kaise laye',
    'Biology mein full marks',
    'NEET topper tips',
    'medical college admission process',
    'AIIMS mein admission kaise le',
  ],

  // Location Based
  location: [
    'Delhi NCR mein NEET coaching',
    'Gurugram Biology coaching',
    'online NEET coaching India',
    'NEET coaching South Delhi',
    'Rohini mein Biology classes',
  ],

  // Question Format
  questions: [
    'kya NEET Biology mushkil hai',
    'NEET ke liye kitne ghante padhe',
    'Biology weak hai kya karu',
    'NCERT kaafi hai NEET ke liye',
    'coaching zaruri hai kya NEET ke liye',
  ],
}

// Structured data for Hinglish FAQs
export const HINGLISH_FAQS = [
  {
    question: 'NEET ki taiyari kaise kare?',
    questionEn: 'How to prepare for NEET?',
    answer:
      'NEET ki taiyari ke liye NCERT books complete karein, daily 6-8 hours padhai karein, mock tests dein, aur ek acche coaching join karein. Biology mein 360/360 possible hai agar systematic preparation ho.',
  },
  {
    question: 'NEET coaching fees kitni hai?',
    questionEn: 'What is the NEET coaching fee?',
    answer:
      'Cerebrum Biology Academy mein NEET coaching fees ₹75,000 se ₹1,50,000 tak hai depending on course duration. EMI facility available hai aur merit-based scholarship bhi milti hai.',
  },
  {
    question: 'Kya online NEET coaching effective hai?',
    questionEn: 'Is online NEET coaching effective?',
    answer:
      'Haan, online NEET coaching bahut effective hai. Live interactive classes, recorded lectures, aur instant doubt resolution ke saath ghar baithe quality education milti hai.',
  },
  {
    question: 'Biology mein 360/360 kaise laye?',
    questionEn: 'How to score 360/360 in Biology?',
    answer:
      'Biology mein full marks ke liye NCERT line-by-line padho, diagrams practice karo, previous year questions solve karo, aur specialized Biology coaching join karo jaise Cerebrum.',
  },
  {
    question: 'NEET dropper batch kab join kare?',
    questionEn: 'When to join NEET dropper batch?',
    answer:
      'NEET result ke turant baad dropper batch join karna best hai. April-May mein batches start hote hain. Early joining se poora syllabus cover hota hai.',
  },
]

// Component to inject Hinglish keywords as hidden meta content
export function HinglishKeywordsSchema() {
  useEffect(() => {
    // Add Hinglish keywords to page for SEO
    const allKeywords = [
      ...HINGLISH_KEYWORDS.primary,
      ...HINGLISH_KEYWORDS.coaching,
      ...HINGLISH_KEYWORDS.studyMaterial,
      ...HINGLISH_KEYWORDS.success,
      ...HINGLISH_KEYWORDS.location,
    ]

    // This helps search engines understand the multilingual nature of the content
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      const existingKeywords = metaKeywords.getAttribute('content') || ''
      const newKeywords = existingKeywords + ', ' + allKeywords.slice(0, 10).join(', ')
      metaKeywords.setAttribute('content', newKeywords)
    }
  }, [])

  return null
}

// Hinglish FAQ Section Component
interface HinglishFAQSectionProps {
  showEnglish?: boolean
  maxItems?: number
}

export function HinglishFAQSection({ showEnglish = true, maxItems = 5 }: HinglishFAQSectionProps) {
  const faqs = HINGLISH_FAQS.slice(0, maxItems)

  const faqSchema = {
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
    <section className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          अक्सर पूछे जाने वाले प्रश्न
        </h2>
        <p className="text-gray-600 mb-8">Frequently Asked Questions (Hinglish mein)</p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                <div>
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  {showEnglish && (
                    <p className="text-sm text-gray-500 mt-1">{faq.questionEn}</p>
                  )}
                </div>
                <span className="text-gray-500 group-open:rotate-180 transition-transform ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HinglishFAQSection
