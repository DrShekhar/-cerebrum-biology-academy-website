'use client'

import Script from 'next/script'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
  pageTitle: string
}

export function FAQSchema({ faqs, pageTitle }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: pageTitle,
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
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  )
}

// Helper function to extract FAQs from blog content
export function extractFAQsFromContent(content: string): FAQItem[] {
  const faqs: FAQItem[] = []

  // Pattern 1: Look for FAQ section with Q: A: format
  const faqSectionMatch = content.match(
    /##?\s*(?:FAQ|Frequently Asked Questions|FAQs)[^#]*(?=##|$)/is
  )
  if (faqSectionMatch) {
    const faqSection = faqSectionMatch[0]
    const qaPattern =
      /(?:\*\*Q[:\.]?\s*|Q[:\.]?\s*)(.+?)(?:\*\*)?[\n\r]+(?:\*\*A[:\.]?\s*|A[:\.]?\s*)(.+?)(?=(?:\*\*Q[:\.]?\s*|Q[:\.]?\s*)|$)/gis
    let match
    while ((match = qaPattern.exec(faqSection)) !== null) {
      faqs.push({
        question: match[1].trim().replace(/\*\*/g, ''),
        answer: match[2]
          .trim()
          .replace(/\*\*/g, '')
          .replace(/[\n\r]+/g, ' '),
      })
    }
  }

  // Pattern 2: Look for ### questions followed by answers
  const questionPattern = /###\s*(.+?\?)\s*[\n\r]+([^#]+?)(?=###|##|$)/g
  let match
  while ((match = questionPattern.exec(content)) !== null) {
    const question = match[1].trim()
    const answer = match[2]
      .trim()
      .replace(/[\n\r]+/g, ' ')
      .slice(0, 500)
    if (question.length > 10 && answer.length > 20) {
      faqs.push({ question, answer })
    }
  }

  // Return unique FAQs (first 10)
  const uniqueFaqs = faqs.filter(
    (faq, index, self) => index === self.findIndex((f) => f.question === faq.question)
  )

  return uniqueFaqs.slice(0, 10)
}

// Generate common NEET Biology FAQs based on article topic
export function generateTopicFAQs(title: string, category: string, tags: string[]): FAQItem[] {
  const faqs: FAQItem[] = []

  // Add topic-specific FAQs based on category
  if (category === 'neet-preparation' || tags.includes('NEET 2025') || tags.includes('NEET 2026')) {
    faqs.push({
      question: 'How many questions come from Biology in NEET?',
      answer:
        'NEET has 90 Biology questions (45 Botany + 45 Zoology) worth 360 marks, making up 50% of the total NEET score.',
    })
    faqs.push({
      question: 'Is NCERT enough for NEET Biology?',
      answer:
        'Yes, NCERT is sufficient for 95% of NEET Biology questions. Focus on reading NCERT thoroughly 3-4 times before using any reference book.',
    })
  }

  if (category === 'chapter-guides' || category === 'biology-concepts') {
    faqs.push({
      question: 'What is the weightage of this chapter in NEET?',
      answer:
        'Chapter weightage varies each year. On average, Human Physiology has the highest weightage (20%), followed by Genetics (18%) and Ecology (12%).',
    })
  }

  if (tags.includes('Study Tips') || category === 'study-tips') {
    faqs.push({
      question: 'How many hours should I study Biology daily for NEET?',
      answer:
        'For effective NEET preparation, dedicate 3-4 hours daily to Biology. Quality of study matters more than quantity. Include active recall and practice questions.',
    })
  }

  return faqs.slice(0, 5)
}
