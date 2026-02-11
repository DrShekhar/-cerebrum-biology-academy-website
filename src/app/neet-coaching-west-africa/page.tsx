import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching for West Africa Students | Nigeria, Ghana | Cerebrum',
  description:
    'Best NEET Biology coaching for Indian students in West Africa. Lagos, Accra, Abuja. AIIMS faculty, WAT timezone classes, NRI quota guidance. 98% success rate.',
  keywords: [
    'NEET coaching West Africa',
    'NEET coaching Nigeria',
    'NEET coaching Ghana',
    'NEET coaching Lagos',
    'Indian students West Africa NEET',
    'NEET online classes Nigeria',
    'NRI NEET coaching Nigeria',
  ],
  openGraph: {
    title: 'NEET Coaching for West Africa Students | Cerebrum Biology Academy',
    description: 'Top NEET coaching for Indian students in Nigeria, Ghana. WAT timezone classes, 98% success rate.',
    url: `${BASE_URL}/neet-coaching-west-africa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-west-africa` },
}

const faqs = [
  { q: 'Do you offer NEET coaching for Indian students in Nigeria?', a: 'Yes! We serve Indian families in Lagos, Abuja, Port Harcourt and across Nigeria. Online classes scheduled at WAT (West Africa Time) friendly timings.' },
  { q: 'Can students from Ghana join?', a: 'Absolutely! Students from Accra, Tema, Kumasi can join. Ghana uses GMT, so class timings are adjusted accordingly.' },
  { q: 'What curriculum bridge do you offer?', a: 'We bridge IGCSE, Cambridge, WAEC and local board curricula to NCERT-based NEET preparation. Our faculty understands the gaps.' },
  { q: 'Where do West African students write NEET?', a: 'Students travel to India for the exam. We assist with planning and recommend arriving 2 weeks early for adjustment.' },
  { q: 'What are the class timings for West Africa?', a: 'Nigeria (WAT, UTC+1): 11:30 AM-3:30 PM. Ghana (GMT): 10:30 AM-2:30 PM. Weekend batches also available.' },
  { q: 'Is Indian MBBS a good option for West African students?', a: 'Yes! Indian MBBS is affordable, WHO-recognized, and offers world-class clinical training. Much more accessible than UK/US options.' },
  { q: 'Do you provide NRI quota guidance?', a: 'Complete NRI quota admission guidance including documentation, counseling, and college selection for West African Indian students.' },
  { q: 'What is the fee?', a: 'Foundation: Rs 75,000/year, Comprehensive: Rs 72,000/year, Dropper: Rs 85,000/year. EMI available. WhatsApp +91-8826444334.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function NEETCoachingWestAfricaPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
