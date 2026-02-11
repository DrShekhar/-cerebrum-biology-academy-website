import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'IB to NEET Biology Bridge',
  subtitle: 'Specialized coaching for IB students',
})

export const metadata: Metadata = {
  title: 'IB to NEET Biology | Bridge Course for IB Students | Cerebrum Academy',
  description:
    'Specialized bridge course for IB Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 95% conversion rate.',
  keywords: [
    'IB to NEET',
    'IB Biology NEET preparation',
    'IB students NEET coaching',
    'IB curriculum to NEET',
    'bridge course IB NEET',
    'IB HL SL NEET',
  ],
  openGraph: {
    title: 'IB to NEET Biology | Bridge Course for IB Students | Cerebrum Academy',
    description:
      'Specialized bridge course for IB Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 95% conversion rate.',
    url: `${BASE_URL}/ib-to-neet-biology-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'IB to NEET Biology Bridge Course - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB to NEET Biology | Bridge Course for IB Students',
    description:
      'Specialized bridge course for IB Biology students preparing for NEET. 95% conversion rate.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/ib-to-neet-biology-preparation`,
  },
}

const faqs = [
  { q: 'Can IB Biology students prepare for NEET?', a: 'Yes! IB HL Biology covers about 60% of NEET syllabus. Our bridge course fills the gaps in topics like Plant Physiology, Indian-specific ecology, and NCERT-specific concepts.' },
  { q: 'What topics are missing in IB that NEET requires?', a: 'Key gaps include: Plant Anatomy and Morphology, Animal Husbandry, Biotechnology (Indian context), Environmental Issues, and detailed NCERT diagrams and terminology.' },
  { q: 'Is IB SL Biology sufficient for NEET?', a: 'IB SL covers about 40% of NEET syllabus. SL students need more bridging than HL students. Our course has separate tracks for HL and SL to ensure both reach NEET readiness.' },
  { q: 'How long does the IB to NEET bridge course take?', a: 'For HL students: 4-6 months intensive. For SL students: 6-9 months. We also offer year-long programs for thorough preparation. All courses include NCERT mastery modules.' },
  { q: 'Do you help with NEET registration for IB students?', a: 'Yes! We guide IB students through NTA registration, document requirements, and eligibility criteria. Many IB students are unaware they can appear for NEET.' },
  { q: 'What is the fee for IB to NEET bridge course?', a: 'Bridge course starts at Rs 36,000/year. Includes gap analysis, NCERT modules, mock tests, and AIIMS faculty mentoring. EMI options available.' },
  { q: 'Can IB students from international schools join?', a: 'Absolutely! We have students from IB schools across India and overseas. Online format makes it accessible for students in any country, with timezone-friendly scheduling.' },
  { q: 'What results have IB students achieved?', a: 'Our IB students have consistently scored 650+ in NEET with our bridge program. 95% conversion rate from IB to successful NEET qualification.' },
]

export default function IBToNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="ib-to-neet-biology-preparation"
        pageTitle="IB to NEET Biology Bridge Course"
        pageDescription="Specialized bridge course for IB Biology students preparing for NEET. Expert faculty, comprehensive gap analysis, proven 95% conversion rate."
        pageType="coaching"
      faqs={faqs} />
      <PageContent />
    </>
  )
}
