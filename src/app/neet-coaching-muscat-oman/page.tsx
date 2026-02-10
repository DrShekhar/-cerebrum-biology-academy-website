import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Muscat'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Muscat | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Muscat. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Serving Indian schools in Oman.',
  keywords: [
    'NEET coaching Muscat',
    'biology tuition Muscat',
    'NEET classes Muscat',
    'best NEET tutor Muscat',
    'Indian NEET coaching Oman',
    'online NEET preparation Muscat',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Muscat | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Muscat. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-muscat-oman`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Muscat | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Muscat. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-muscat-oman` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Muscat?', a: 'Yes! Our online NEET coaching is specifically designed for Muscat students. With AIIMS faculty, 98% success rate, and personalized attention, students in Muscat achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Muscat students?', a: 'We offer flexible morning, afternoon, and evening batches so Muscat students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Muscat students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Muscat?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Muscat students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Muscat students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Oman classroom coaching.' },
  { q: 'Which medical colleges can Muscat students target?', a: 'With strong NEET scores, Muscat students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingMuscatPage() {
  return (
    <>
      <LocalitySchema locality="Muscat" slug="neet-coaching-muscat-oman" pageTitle="Best NEET Coaching in Muscat" pageDescription="Expert NEET coaching for Indian students in Muscat serving Indian schools in Oman." pageType="coaching" coordinates={{ lat: "23.5880", lng: "58.3829" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
