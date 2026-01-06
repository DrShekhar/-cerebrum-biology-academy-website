'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type CountryConfig, formatPrice } from '@/lib/international/countries'

interface CountryFAQProps {
  country: CountryConfig
}

interface FAQItem {
  question: string
  answer: string
}

function getFAQsForCountry(country: CountryConfig): FAQItem[] {
  const primaryExam = country.examSystems[0]
  const secondaryExam = country.examSystems[1] || country.examSystems[0]

  return [
    {
      question: `How do online biology tutoring sessions work for ${country.name} students?`,
      answer: `Our live online sessions are conducted via Zoom or Google Meet at times convenient for your ${country.timezoneAbbr} timezone. Each session is interactive with whiteboard sharing, screen sharing, and real-time doubt solving. Sessions are recorded so you can review them later.`,
    },
    {
      question: `Do your tutors have experience with ${primaryExam}?`,
      answer: `Yes! Our tutors are specifically trained in ${country.name} exam systems including ${country.examSystems.slice(0, 3).join(', ')}. They understand the syllabus, marking schemes, and common question patterns to help you maximize your score.`,
    },
    {
      question: `What are the pricing options in ${country.currency.code}?`,
      answer: `We offer two options: Small Group sessions (3-5 students) at ${formatPrice(country.pricing.smallGroup, country.currency)}/hour and One-on-One sessions ranging from ${formatPrice(country.pricing.oneOnOneMin, country.currency)} to ${formatPrice(country.pricing.oneOnOneMax, country.currency)}/hour depending on the tutor's experience and your specific needs.`,
    },
    {
      question: `Can I get a free trial class before committing?`,
      answer: `Absolutely! We offer a free 30-minute demo class where you can meet your potential tutor, discuss your goals, and experience our teaching style. There's no obligation to continue after the demo.`,
    },
    {
      question: `How flexible is the scheduling for ${country.timezoneAbbr} timezone?`,
      answer: `Very flexible! We have tutors available during morning, afternoon, and evening slots compatible with ${country.timezoneAbbr}. You can reschedule sessions with 24-hour notice, and we accommodate exam period schedule changes.`,
    },
    {
      question: `Do you provide study materials for ${secondaryExam}?`,
      answer: `Yes, we provide comprehensive study materials including topic notes, practice questions, past paper solutions, and revision guides specifically tailored for ${secondaryExam}. All materials are included in your tutoring package.`,
    },
    {
      question: `How do I pay and is it secure?`,
      answer: `We accept all major payment methods including credit/debit cards, PayPal, and bank transfers in ${country.currency.code}. All payments are processed through secure, encrypted gateways. You can pay per session or choose monthly packages for better rates.`,
    },
    {
      question: `What if I'm not satisfied with my tutor?`,
      answer: `Your satisfaction is guaranteed. If you're not happy with your tutor after the first paid session, we'll match you with a different tutor at no extra cost. We want to ensure you have the best learning experience.`,
    },
  ]
}

export function CountryFAQ({ country }: CountryFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const faqs = getFAQsForCountry(country)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12">
          Common questions from {country.name} students and parents
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <div className="p-6 pt-0 text-slate-600">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CountryFAQ
