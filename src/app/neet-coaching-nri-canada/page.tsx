import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'NEET Coaching for Canada NRI Students',
  subtitle: 'Toronto | Vancouver | Brampton | Surrey',
})

export const metadata: Metadata = {
  title: 'NEET Coaching for Canadian NRI Students | Toronto, Vancouver | Cerebrum',
  description:
    'Best NEET Biology coaching for Indo-Canadian students. Live online classes at EST/PST friendly timings. AIIMS faculty, provincial curriculum bridge, NRI quota guidance. 98% success rate.',
  keywords: [
    'NEET coaching Canada',
    'NEET classes Indo-Canadians',
    'NEET coaching Toronto',
    'NEET coaching Vancouver',
    'NEET coaching Brampton',
    'Biology coaching NRI Canada',
    'NEET online classes Canada',
    'Indian medical admission Canadian students',
    'MBBS India for Canadian students',
    'NRI quota Canada NEET',
  ],
  openGraph: {
    title: 'NEET Coaching for Canadian NRI Students | Cerebrum Biology Academy',
    description:
      'Top NEET Biology coaching for Indo-Canadian students. EST/PST friendly timings, provincial curriculum bridge, NRI quota expertise.',
    url: `${BASE_URL}/neet-coaching-nri-canada`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching for Canadian NRI Students - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching for Canadian NRI Students | 98% Success Rate',
    description:
      'Expert NEET coaching for Indo-Canadians. EST/PST timings, provincial curriculum bridge.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nri-canada`,
  },
}

const faqs = [
  { q: 'Can Canadian citizens appear for NEET?', a: 'Yes! Canadian citizens and PIOs (Persons of Indian Origin) can appear for NEET and seek admission in Indian medical colleges under NRI or general quota.' },
  { q: 'What are the class timings for Canadian students?', a: 'Morning classes 6:30-10:30 AM EST (before school). Pacific time students join at 3:30-7:30 AM PST. Weekend daytime batches also available. All classes recorded for flexible viewing.' },
  { q: 'Where do Canadian students write NEET exam?', a: 'NEET exam centers are not yet available in Canada. Canadian students need to travel to India for the exam. We assist with travel planning and recommend arriving 2 weeks early.' },
  { q: 'Is Indian MBBS recognized in Canada?', a: 'Indian MBBS graduates can practice in Canada after clearing MCCQE (Medical Council of Canada Qualifying Examination) exams and completing residency. Many Indian-origin Canadian doctors took this path.' },
  { q: 'Why choose Indian MBBS over Canadian medical school?', a: 'Canadian medical schools have 3-5% acceptance rate, making entry extremely competitive. Indian MBBS through NEET offers a more accessible, affordable path (CAD 30-80K total vs CAD 15-25K/year in Canada).' },
  { q: 'Do you offer bridge courses for Ontario/BC curriculum?', a: 'Yes! We provide comprehensive bridge courses for Ontario, BC, and Alberta biology curricula to NCERT-based NEET preparation. Our faculty understands provincial curriculum differences.' },
  { q: 'How does NRI quota work for Canadian students?', a: 'Canadian PIOs can apply under NRI quota with reserved seats (15%) in private and deemed medical colleges. We provide complete documentation guidance and counseling support.' },
  { q: 'What is the fee structure for Canadian students?', a: 'Foundation (Class 11): Rs 75,000/year, Comprehensive (Class 12): Rs 72,000/year, Dropper Batch: Rs 85,000/year. EMI options available. Fraction of Canadian med school costs.' },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - Canada',
  description: 'Premier NEET Biology coaching for Indo-Canadian students. Live online classes at EST/PST friendly timings with AIIMS faculty.',
  url: `${BASE_URL}/neet-coaching-nri-canada`,
  telephone: '+91-8826444334',
  areaServed: { '@type': 'Country', name: 'Canada' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '35',
    bestRating: '5',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function NEETCoachingNRICanadaPage() {
  return (
    <>
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
