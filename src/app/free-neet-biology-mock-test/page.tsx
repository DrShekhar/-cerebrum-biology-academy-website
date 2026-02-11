import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Mock Test 2026 | Free Online | 90 Questions | Cerebrum',
  description: 'Take free NEET Biology mock test with 90 questions. NTA pattern, detailed solutions, performance analysis. Test your NEET readiness. By AIIMS faculty.',
  keywords: ['NEET biology mock test', 'free NEET test online', 'NEET practice test biology', 'NEET 2026 mock test', 'biology test series NEET'],
  openGraph: {
    title: 'NEET Biology Mock Test 2026 | Free Online | 90 Questions | Cerebrum',
    description: 'Take free NEET Biology mock test with 90 questions. NTA pattern, detailed solutions, performance analysis. Test your NEET readiness. By AIIMS faculty.',
    url: `${BASE_URL}/free-neet-biology-mock-test`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Mock Test 2026',
    description: 'Take free NEET Biology mock test with 90 questions. NTA pattern, detailed solutions, performance analysis. Test your NEE',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-mock-test` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology mock test 2026 really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, 100% free! Just WhatsApp us at +91-8826444334 and we will send it to you instantly. No hidden charges.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who created this resource?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Created by Dr. Shekhar and the AIIMS-trained faculty at Cerebrum Biology Academy with 98% NEET success rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this updated for NEET 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! This resource is fully updated for NEET 2026 based on the latest NTA pattern and syllabus.',
      },
    },
  ],
}

export default function FreeNeetBiologyMockTestPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
