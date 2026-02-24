import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Study Planner 2026 | Daily Schedule | Free PDF',
  description: 'Download free NEET Biology 12-month study planner. Day-by-day schedule, chapter allocation, revision cycles. Designed by AIIMS toppers for NEET 2026.',
  keywords: ['NEET biology study planner', 'NEET 2026 timetable', 'NEET study schedule', 'NEET daily routine', 'NEET preparation plan biology'],
  openGraph: {
    title: 'NEET Biology Study Planner 2026 | Daily Schedule | Free PDF',
    description: 'Download free NEET Biology 12-month study planner. Day-by-day schedule, chapter allocation, revision cycles. Designed by AIIMS toppers for NEET 2026.',
    url: `${BASE_URL}/free-neet-biology-study-planner`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Study Planner 2026',
    description: 'Download free NEET Biology 12-month study planner. Day-by-day schedule, chapter allocation, revision cycles. Designed by',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-study-planner` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology study planner 2026 really free?',
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

export default function FreeNeetBiologyStudyPlannerPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
