import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Omicron Sector'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Omicron Sector, Greater Noida | 98% Success Rate',
  description:
    'Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Pari Chowk hub coaching. Book free demo!',
  keywords: [
    'NEET coaching Omicron Sector',
    'NEET coaching Greater Noida',
    'biology tuition Omicron Noida',
    'NEET classes Pari Chowk',
    'best NEET tutor Greater Noida',
    'medical entrance Omicron',
    'NEET preparation Knowledge Park',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Omicron Sector, Greater Noida | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-omicron-noida`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Omicron Sector, Greater Noida | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-omicron-noida`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Omicron?', a: 'Yes! Our online NEET coaching is specifically designed for Noida students. With AIIMS faculty, 98% success rate, and personalized attention, students in Omicron achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Omicron students?', a: 'We offer flexible morning, afternoon, and evening batches so Omicron students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Omicron students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Omicron?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Omicron students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Omicron students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Noida classroom coaching.' },
  { q: 'Which medical colleges can Omicron students target?', a: 'With strong NEET scores, Omicron students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingOmicronPage() {
  return (
    <>
      <LocalitySchema
        locality="Omicron Sector"
        slug="neet-coaching-omicron-noida"
        pageTitle="Best NEET Coaching in Omicron Sector, Greater Noida"
        pageDescription="Join #1 NEET coaching in Omicron Sector, Greater Noida. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "28.5689", lng: "77.3429" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
