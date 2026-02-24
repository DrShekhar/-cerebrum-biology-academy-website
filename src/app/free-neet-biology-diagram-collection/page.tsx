import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Diagrams 2026 | 150+ Important Diagrams | Free PDF',
  description: 'Download 150+ important NEET Biology diagrams. NCERT diagrams with labels, flowcharts, cycles. Must-know diagrams for NEET 2026. By AIIMS faculty.',
  keywords: ['NEET biology diagrams', 'important diagrams NEET', 'NCERT biology diagrams', 'biology flowcharts NEET', 'labeled diagrams NEET biology'],
  openGraph: {
    title: 'NEET Biology Diagrams 2026 | 150+ Important Diagrams | Free PDF',
    description: 'Download 150+ important NEET Biology diagrams. NCERT diagrams with labels, flowcharts, cycles. Must-know diagrams for NEET 2026. By AIIMS faculty.',
    url: `${BASE_URL}/free-neet-biology-diagram-collection`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Important Diagrams',
    description: 'Download 150+ important NEET Biology diagrams. NCERT diagrams with labels, flowcharts, cycles. Must-know diagrams for NE',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-diagram-collection` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology important diagrams really free?',
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

export default function FreeNeetBiologyDiagramCollectionPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
