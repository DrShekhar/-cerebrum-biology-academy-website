import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology PYQ Analysis 2015-2025 | Free PDF | Cerebrum',
  description: 'Download free NEET Biology Previous Year Question analysis (2015-2025). Topic-wise breakdown, repeated questions, difficulty trends. AIIMS faculty analysis.',
  keywords: ['NEET biology previous year questions', 'NEET PYQ analysis', 'NEET biology repeated questions', 'NEET biology trend analysis', 'NEET 2025 question paper analysis'],
  openGraph: {
    title: 'NEET Biology PYQ Analysis 2015-2025 | Free PDF | Cerebrum',
    description: 'Download free NEET Biology Previous Year Question analysis (2015-2025). Topic-wise breakdown, repeated questions, difficulty trends. AIIMS faculty analysis.',
    url: `${BASE_URL}/free-neet-biology-pyq-analysis`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology PYQ Analysis 2015-2025',
    description: 'Download free NEET Biology Previous Year Question analysis (2015-2025). Topic-wise breakdown, repeated questions, diffic',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-pyq-analysis` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology pyq analysis 2015-2025 really free?',
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

export default function FreeNeetBiologyPyqAnalysisPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
