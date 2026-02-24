import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'A-Level to NEET Biology Bridge',
  subtitle: 'Cambridge A-Level to NEET specialist coaching',
})

export const metadata: Metadata = {
  title: 'A-Level to NEET Biology | Bridge Course for A-Level Students',
  description:
    'Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice, dedicated faculty from top medical colleges.',
  keywords: [
    'A-Level to NEET',
    'A-Level Biology NEET coaching',
    'Cambridge A-Level NEET',
    'A-Level students NEET',
    'bridge course A-Level',
    'advanced level NEET',
  ],
  openGraph: {
    title: 'A-Level to NEET Biology | Bridge Course for A-Level Students',
    description:
      'Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice, dedicated faculty from top medical colleges.',
    url: `${BASE_URL}/a-level-to-neet-biology-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'A-Level to NEET Biology Bridge Course - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-Level to NEET Biology | Bridge Course for A-Level Students',
    description:
      'Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/a-level-to-neet-biology-preparation`,
  },
}

const faqs = [
  { q: 'Can A-Level Biology students prepare for NEET?', a: 'Yes! A-Level Biology has significant overlap with NEET (about 55-65%). Our bridge course fills gaps in Plant Biology, Indian-specific ecology, NCERT terminology, and exam technique.' },
  { q: 'What topics are different between A-Level and NEET Biology?', a: 'Key gaps: detailed Plant Morphology and Anatomy, Animal Husbandry, Indian Biotechnology context, Environmental Issues (Indian perspective), and specific NCERT diagram labeling.' },
  { q: 'Is A-Level Biology harder than NEET?', a: 'A-Level goes deeper in some topics (biochemistry, molecular biology) but NEET covers broader topics and requires extensive NCERT-specific factual recall. Different challenge types.' },
  { q: 'How long does A-Level to NEET bridging take?', a: 'Typically 4-8 months depending on your A-Level grade. A/A* students bridge faster (4-5 months). B/C students need 6-8 months. Year-long programs available for thorough preparation.' },
  { q: 'Do you help A-Level students from the UK prepare for NEET?', a: 'Yes! We serve A-Level students from UK, Singapore, UAE, and other countries. Timezone-friendly online batches and recorded lectures make preparation seamless.' },
  { q: 'What is the fee for A-Level to NEET bridge course?', a: 'Bridge course at Rs 36,000/year. Includes gap analysis, NCERT modules, mock test series, and AIIMS faculty mentoring. International payment options and EMI available.' },
  { q: 'Which exam boards do you support for A-Level?', a: 'We support all major boards: Cambridge (CIE), Edexcel (Pearson), AQA, and OCR. Our bridge course is designed to cover gaps from any A-Level specification.' },
  { q: 'What NEET scores do A-Level students typically achieve?', a: 'A-Level students with our bridge program score 630-680 in NEET. Their strong conceptual foundation from A-Level is an advantage when combined with NCERT mastery.' },
]

export default function ALevelToNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="a-level-to-neet-biology-preparation"
        pageTitle="A-Level to NEET Biology Bridge Course"
        pageDescription="Expert A-Level to NEET bridge program. Targeted gap analysis, NEET-specific practice, dedicated faculty from top medical colleges."
        pageType="coaching"
      faqs={faqs} />
      <PageContent />
    </>
  )
}
