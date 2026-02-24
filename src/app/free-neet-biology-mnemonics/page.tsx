import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Mnemonics 2026 | 200+ Memory Tricks | Free PDF',
  description: 'Download 200+ NEET Biology mnemonics and memory tricks. Easy memorization for taxonomy, classification, body systems. Created by AIIMS doctors.',
  keywords: ['NEET biology mnemonics', 'biology memory tricks NEET', 'NEET biology shortcuts', 'mnemonics for NEET preparation', 'biology tricks and tips'],
  openGraph: {
    title: 'NEET Biology Mnemonics 2026 | 200+ Memory Tricks | Free PDF',
    description: 'Download 200+ NEET Biology mnemonics and memory tricks. Easy memorization for taxonomy, classification, body systems. Created by AIIMS doctors.',
    url: `${BASE_URL}/free-neet-biology-mnemonics`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Mnemonics PDF',
    description: 'Download 200+ NEET Biology mnemonics and memory tricks. Easy memorization for taxonomy, classification, body systems. Cr',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-mnemonics` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology mnemonics pdf really free?',
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

export default function FreeNeetBiologyMnemonicsPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
