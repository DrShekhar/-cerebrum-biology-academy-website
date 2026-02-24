import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Edexcel to NEET Biology Bridge',
  description: 'Specialized bridge course for Edexcel Biology students (IGCSE/A-Level) preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate.',
  openGraph: {
    title: 'Edexcel to NEET Biology Bridge',
    description: 'Specialized bridge course for Edexcel Biology students (IGCSE/A-Level) preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate.',
    url: `${BASE_URL}/edexcel-to-neet-biology-preparation`,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edexcel to NEET Biology Bridge',
    description: 'Specialized bridge course for Edexcel Biology students (IGCSE/A-Level) preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate.',
  },
  alternates: {
    canonical: `${BASE_URL}/edexcel-to-neet-biology-preparation`,
  },
}

const faqs = [
  { q: 'Can Edexcel to NEET students prepare for NEET?', a: 'Yes! Our bridge course fills curriculum gaps comprehensively.' },
  { q: 'What topics need focus?', a: 'Key gap areas in NEET syllabus' },
  { q: 'What is your success rate?', a: '98% of students achieve 650+ scores' },
  { q: 'How long is the program?', a: 'Typically 5-10 months depending on your background' },
  { q: 'Do you support international students?', a: 'Yes! We have students from multiple countries with online access' },
  { q: 'What is the pricing?', a: 'Plans start from Rs 32000. Contact via WhatsApp for custom pricing' },
]

export default function Page() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="edexcel-to-neet-biology-preparation"
        pageTitle="Edexcel to NEET Biology Bridge"
        pageDescription="Specialized bridge course for Edexcel Biology students (IGCSE/A-Level) preparing for NEET. Expert faculty, comprehensive gap analysis, proven 98% conversion rate."
        pageType="coaching"
        faqs={faqs}
      />
      <PageContent />
    </>
  )
}
