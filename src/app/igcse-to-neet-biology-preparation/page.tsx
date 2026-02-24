import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'IGCSE to NEET Biology Bridge',
  subtitle: 'Cambridge curriculum to Indian medical entrance',
})

export const metadata: Metadata = {
  title: 'IGCSE to NEET Biology | Bridge Course for IGCSE Students',
  description:
    'Seamless IGCSE to NEET transition with our specialized bridge course. Fill syllabus gaps, master NEET patterns, join 1,50,000+ successful students.',
  keywords: [
    'IGCSE to NEET',
    'IGCSE Biology NEET preparation',
    'Cambridge to NEET',
    'IGCSE students NEET coaching',
    'bridge course IGCSE',
    'international curriculum NEET',
  ],
  openGraph: {
    title: 'IGCSE to NEET Biology | Bridge Course for IGCSE Students',
    description:
      'Seamless IGCSE to NEET transition with our specialized bridge course. Fill syllabus gaps, master NEET patterns, join 1,50,000+ successful students.',
    url: `${BASE_URL}/igcse-to-neet-biology-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'IGCSE to NEET Biology Bridge Course - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IGCSE to NEET Biology | Bridge Course for IGCSE Students',
    description:
      'Seamless IGCSE to NEET transition with our specialized bridge course. 1,50,000+ successful students.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/igcse-to-neet-biology-preparation`,
  },
}

const faqs = [
  { q: 'Can IGCSE Biology students prepare for NEET?', a: 'Yes! IGCSE Biology covers about 50% of NEET syllabus. Our bridge course comprehensively fills gaps in Plant Biology, Indian ecology, NCERT terminology, and competitive exam patterns.' },
  { q: 'What are the major differences between IGCSE and NEET Biology?', a: 'NEET requires deeper coverage of: Plant Anatomy and Morphology, Biotechnology, Environmental Issues, Human Reproduction details, and specific NCERT diagrams and terminology not covered in IGCSE.' },
  { q: 'How long does the IGCSE to NEET bridge course take?', a: 'Typically 6-9 months for comprehensive bridging. Students transitioning from IGCSE to Indian Class 12 should start early. Year-long intensive programs also available.' },
  { q: 'Is IGCSE harder or easier than NEET Biology?', a: 'IGCSE focuses on application and understanding while NEET requires extensive factual recall and NCERT-specific content. Different skill sets are needed. Our course bridges both approaches.' },
  { q: 'Do you accept IGCSE students from international schools in India?', a: 'Yes! Many students from IGCSE schools in India (Bangalore, Mumbai, Delhi, Hyderabad) transition to NEET preparation. We understand both systems thoroughly.' },
  { q: 'What is the fee for IGCSE to NEET bridge course?', a: 'Bridge course at Rs 36,000/year. Includes gap analysis, NCERT mastery modules, 100+ mock tests, and AIIMS faculty mentoring. EMI options available.' },
  { q: 'Can IGCSE students from abroad join your coaching?', a: 'Absolutely! Our online format serves IGCSE students globally. Timezone-friendly batches for UAE, Singapore, UK, and other regions. All materials accessible digitally.' },
  { q: 'What results have IGCSE students achieved in NEET?', a: 'IGCSE students with our bridge program have scored 620-680 in NEET. Key to success is early start and consistent NCERT practice alongside our structured modules.' },
]

export default function IGCSEToNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="igcse-to-neet-biology-preparation"
        pageTitle="IGCSE to NEET Biology Bridge Course"
        pageDescription="Seamless IGCSE to NEET transition with our specialized bridge course. Fill syllabus gaps, master NEET patterns, join 1,50,000+ successful students."
        pageType="coaching"
      faqs={faqs} />
      <PageContent />
    </>
  )
}
