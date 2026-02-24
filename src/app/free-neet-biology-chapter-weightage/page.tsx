import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Biology Chapter Weightage 2026 | Free PDF Download',
  description: 'Download free NEET Biology chapter-wise weightage analysis for 2026. Know which chapters carry maximum marks. Based on 10-year PYQ analysis by AIIMS faculty.',
  keywords: ['NEET biology chapter weightage', 'NEET 2026 important chapters', 'NEET biology marks distribution', 'chapter wise weightage NEET biology', 'NEET high yield chapters'],
  openGraph: {
    title: 'NEET Biology Chapter Weightage 2026 | Free PDF Download',
    description: 'Download free NEET Biology chapter-wise weightage analysis for 2026. Know which chapters carry maximum marks. Based on 10-year PYQ analysis by AIIMS faculty.',
    url: `${BASE_URL}/free-neet-biology-chapter-weightage`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology Chapter-wise Weightage 2026',
    description: 'Download free NEET Biology chapter-wise weightage analysis for 2026. Know which chapters carry maximum marks. Based on 1',
  },
  alternates: { canonical: `${BASE_URL}/free-neet-biology-chapter-weightage` },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this neet biology chapter-wise weightage 2026 really free?',
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

export default function FreeNeetBiologyChapterWeightagePage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
