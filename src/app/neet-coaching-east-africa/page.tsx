import { Metadata } from 'next'
import PageContent from './PageContent'
import Script from 'next/script'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching for East Africa Students | Kenya, Tanzania, Uganda | Cerebrum',
  description:
    'Best NEET Biology coaching for Indian students in East Africa. Nairobi, Dar es Salaam, Kampala, Mombasa. AIIMS faculty, EAT timezone classes, NRI quota guidance. 98% success rate.',
  keywords: [
    'NEET coaching East Africa',
    'NEET coaching Kenya',
    'NEET coaching Tanzania',
    'NEET coaching Uganda',
    'NEET coaching Nairobi',
    'Indian students East Africa NEET',
    'NEET online classes Africa',
    'NRI NEET coaching Africa',
  ],
  openGraph: {
    title: 'NEET Coaching for East Africa Students | Cerebrum Biology Academy',
    description: 'Top NEET coaching for Indian students in Kenya, Tanzania, Uganda. EAT timezone classes, 98% success rate.',
    url: `${BASE_URL}/neet-coaching-east-africa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-east-africa` },
}

const faqs = [
  { q: 'Do you offer NEET coaching for Indian students in Kenya?', a: 'Yes! We serve 100+ Indian families in Nairobi, Mombasa and across Kenya. Our online classes are scheduled at EAT (East Africa Time, UTC+3) friendly timings.' },
  { q: 'Can students from Tanzania join NEET coaching?', a: 'Absolutely! Students from Dar es Salaam, Arusha and across Tanzania can join. Same timezone as Kenya (EAT), so identical class timings work perfectly.' },
  { q: 'Where do East African students write NEET exam?', a: 'Students need to travel to India for the exam. We assist with travel planning and documentation. Many families combine it with an India visit.' },
  { q: 'What curriculum do you follow for East African students?', a: 'Our curriculum is 100% NCERT-based, the official NEET syllabus. We provide bridge courses for IGCSE, Cambridge, and local board students.' },
  { q: 'What are the class timings for East Africa?', a: 'Classes from 4:30-8:30 PM EAT (same as 5:00-9:00 PM IST). Weekend batches also available. All classes recorded.' },
  { q: 'Is Indian MBBS affordable for East African Indian families?', a: 'Yes! Indian MBBS costs Rs 5-25 lakh total in government colleges. Much more affordable than medical education in UK, US or private African universities.' },
  { q: 'Do you help with NRI quota admissions?', a: 'Yes, we provide complete NRI quota admission guidance including documentation, counseling support, and college selection for East African students.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation: Rs 75,000/year, Comprehensive: Rs 72,000/year, Dropper: Rs 85,000/year. EMI available. WhatsApp +91-8826444334 for details.' },
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

export default function NEETCoachingEastAfricaPage() {
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageContent />
    </>
  )
}
