import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology NCERT Notes | Chapter-wise Summary | Free PDF | Cerebrum',
  description: 'Download free NEET Biology NCERT chapter-wise quick revision notes. Concise summaries of all 38 chapters. Perfect for last-minute revision. By AIIMS faculty.',
  keywords: ['NEET biology NCERT notes', 'NCERT biology summary', 'NEET revision notes', 'chapter wise biology notes NEET', 'NCERT quick revision biology'],
  openGraph: {
    title: 'NEET Biology NCERT Notes | Chapter-wise Summary | Free PDF | Cerebrum',
    description: 'Download free NEET Biology NCERT chapter-wise quick revision notes. Concise summaries of all 38 chapters. Perfect for last-minute revision. By AIIMS faculty.',
    url: `${BASE_URL}/free-neet-biology-ncert-notes`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology NCERT Quick Notes',
    description: 'Download free NEET Biology NCERT chapter-wise quick revision notes. Concise summaries of all 38 chapters. Perfect for la',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-ncert-notes` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology ncert quick notes really free?',
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

export default function FreeNeetBiologyNcertNotesPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
