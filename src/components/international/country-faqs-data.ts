/**
 * Country FAQ data — pure function, usable by server + client.
 *
 * Extracted from src/components/international/CountryFAQ.tsx so server
 * components (e.g., /international/[country]/page.tsx) can import the
 * data without dragging in the `'use client'` boundary.
 */

import { type CountryConfig, formatPrice } from '@/lib/international/countries'

export interface FAQItem {
  question: string
  answer: string
}

export function getFAQsForCountry(country: CountryConfig): FAQItem[] {
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
