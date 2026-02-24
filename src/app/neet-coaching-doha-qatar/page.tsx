import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Doha'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Doha | 98% Success Rate',
  description: 'Join #1 NEET coaching for Indian students in Doha. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Serving DPS Doha and international schools.',
  keywords: [
    'NEET coaching Doha',
    'biology tuition Doha',
    'NEET classes Doha',
    'best NEET tutor Doha',
    'Indian NEET coaching Qatar',
    'online NEET preparation Doha',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Doha | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Doha. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-doha-qatar`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Doha | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Doha. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-doha-qatar` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Doha?', a: 'Yes! Our online NEET coaching is specifically designed for Doha students. With AIIMS faculty, 98% success rate, and personalized attention, students in Doha achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Doha students?', a: 'We offer flexible morning, afternoon, and evening batches so Doha students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Doha students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Doha?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Doha students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Doha students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Qatar classroom coaching.' },
  { q: 'Which medical colleges can Doha students target?', a: 'With strong NEET scores, Doha students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingDohaPage() {
  return (
    <>
      <LocalitySchema locality="Doha" slug="neet-coaching-doha-qatar" pageTitle="Best NEET Coaching in Doha" pageDescription="Expert NEET coaching for Indian students in Doha serving DPS Doha and international schools." pageType="coaching" coordinates={{ lat: "25.2854", lng: "51.5310" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
