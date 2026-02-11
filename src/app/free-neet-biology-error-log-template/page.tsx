import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Error Log Template | Track Mistakes | Free PDF | Cerebrum',
  description: 'Download free NEET Biology error log template. Track and eliminate repeated mistakes. Used by 680+ scorers. Printable mistake tracker by AIIMS faculty.',
  keywords: ['NEET mistake tracker', 'NEET error log', 'NEET biology mistake analysis', 'track NEET mistakes', 'NEET wrong answer analysis'],
  openGraph: {
    title: 'NEET Biology Error Log Template | Track Mistakes | Free PDF | Cerebrum',
    description: 'Download free NEET Biology error log template. Track and eliminate repeated mistakes. Used by 680+ scorers. Printable mistake tracker by AIIMS faculty.',
    url: `${BASE_URL}/free-neet-biology-error-log-template`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Error Log Template',
    description: 'Download free NEET Biology error log template. Track and eliminate repeated mistakes. Used by 680+ scorers. Printable mi',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-error-log-template` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology error log template really free?',
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

export default function FreeNeetBiologyErrorLogTemplatePage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
