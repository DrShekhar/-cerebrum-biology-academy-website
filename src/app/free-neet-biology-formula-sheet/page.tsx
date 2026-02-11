import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Formulas & Equations | One-Page Sheet | Free PDF | Cerebrum',
  description: 'Download free NEET Biology formula sheet. All important equations, ratios, values in one page. Genetics ratios, Hardy-Weinberg, enzyme kinetics. AIIMS faculty.',
  keywords: ['NEET biology formulas', 'NEET biology equations', 'genetics ratios NEET', 'Hardy Weinberg equation', 'biology formula sheet NEET'],
  openGraph: {
    title: 'NEET Biology Formulas & Equations | One-Page Sheet | Free PDF | Cerebrum',
    description: 'Download free NEET Biology formula sheet. All important equations, ratios, values in one page. Genetics ratios, Hardy-Weinberg, enzyme kinetics. AIIMS faculty.',
    url: `${BASE_URL}/free-neet-biology-formula-sheet`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Formula Sheet',
    description: 'Download free NEET Biology formula sheet. All important equations, ratios, values in one page. Genetics ratios, Hardy-We',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-formula-sheet` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology formula sheet really free?',
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

export default function FreeNeetBiologyFormulaSheetPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
