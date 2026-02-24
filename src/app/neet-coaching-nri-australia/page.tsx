import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'NEET Coaching for Australia NRI Students',
  subtitle: 'Sydney | Melbourne | Brisbane | Perth',
})

export const metadata: Metadata = {
  title: 'NEET Coaching for Australian NRI Students | Sydney, Melbourne',
  description:
    'Best NEET Biology coaching for Indian-Australian students. Live online classes at AEST friendly timings. AIIMS faculty, HSC/VCE curriculum bridge, NRI quota guidance. 98% success rate.',
  keywords: [
    'NEET coaching Australia',
    'NEET classes Indian Australians',
    'NEET coaching Sydney',
    'NEET coaching Melbourne',
    'NEET coaching Brisbane',
    'Biology coaching NRI Australia',
    'NEET online classes Australia',
    'Indian medical admission Australian students',
    'MBBS India for Australian students',
    'NRI quota Australia NEET',
  ],
  openGraph: {
    title: 'NEET Coaching for Australian NRI Students',
    description:
      'Top NEET Biology coaching for Indian-Australian students. AEST friendly timings, HSC/VCE bridge courses, NRI quota expertise.',
    url: `${BASE_URL}/neet-coaching-nri-australia`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching for Australian NRI Students - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching for Australian NRI Students | 98% Success Rate',
    description:
      'Expert NEET coaching for Indian-Australians. AEST friendly timings, HSC/VCE bridge.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nri-australia`,
  },
}

const faqs = [
  { q: 'Can Australian citizens appear for NEET?', a: 'Yes! Australian citizens and PIOs can appear for NEET and seek admission in Indian medical colleges under NRI or general quota.' },
  { q: 'What are the class timings for Australian students?', a: 'Late evening classes 9:30 PM-1:30 AM AEST or weekend daytime batches. Perth students (AWST) get earlier timings. All classes recorded for flexible viewing.' },
  { q: 'Where do Australian students write NEET exam?', a: 'NEET exam centers are not yet available in Australia. Students need to travel to India. We assist with travel planning and recommend arriving 2 weeks early.' },
  { q: 'Is Indian MBBS recognized in Australia?', a: 'Indian MBBS is recognized by AMC (Australian Medical Council). Graduates can practice in Australia after clearing AMC examinations and completing internship.' },
  { q: 'Why choose Indian MBBS over Australian medical school?', a: 'Australian medical schools charge AUD 60K+ per year with fierce competition. Indian MBBS costs AUD 30-80K total, offering an accessible and affordable pathway.' },
  { q: 'Do you offer HSC/VCE to NCERT bridge courses?', a: 'Yes! Comprehensive bridge courses for NSW HSC Biology, VIC VCE Biology, and QLD Senior Biology to NCERT-based NEET preparation.' },
  { q: 'How does NRI quota work for Australian students?', a: 'Australian PIOs can apply under NRI quota with 15% reserved seats in private medical colleges. We provide complete documentation and counseling guidance.' },
  { q: 'What is the fee structure for Australian students?', a: 'Foundation (Class 11): Rs 75,000/year, Comprehensive (Class 12): Rs 72,000/year, Dropper Batch: Rs 85,000/year. EMI options available.' },
]

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Cerebrum Biology Academy - Australia',
  description: 'Premier NEET Biology coaching for Indian-Australian students with AEST friendly timings and AIIMS faculty.',
  url: `${BASE_URL}/neet-coaching-nri-australia`,
  telephone: '+91-8826444334',
  areaServed: { '@type': 'Country', name: 'Australia' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '25',
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

export default function NEETCoachingNRIAustraliaPage() {
  return (
    <>
      <Script id="org-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
