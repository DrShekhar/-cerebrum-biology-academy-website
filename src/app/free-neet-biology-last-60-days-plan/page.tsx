import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Last 60 Days Plan | Day-wise Strategy | Free PDF | Cerebrum',
  description: 'Download free NEET Biology last 60 days revision plan. Day-wise strategy, mock test schedule, high-yield topics focus. Maximize your score in final stretch.',
  keywords: ['NEET last 60 days plan', 'NEET biology revision plan', 'NEET final preparation strategy', 'NEET last month preparation', 'NEET biology crash course plan'],
  openGraph: {
    title: 'NEET Biology Last 60 Days Plan | Day-wise Strategy | Free PDF | Cerebrum',
    description: 'Download free NEET Biology last 60 days revision plan. Day-wise strategy, mock test schedule, high-yield topics focus. Maximize your score in final stretch.',
    url: `${BASE_URL}/free-neet-biology-last-60-days-plan`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Last 60 Days Plan',
    description: 'Download free NEET Biology last 60 days revision plan. Day-wise strategy, mock test schedule, high-yield topics focus. M',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-last-60-days-plan` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology last 60 days plan really free?',
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

export default function FreeNeetBiologyLast60DaysPlanPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
