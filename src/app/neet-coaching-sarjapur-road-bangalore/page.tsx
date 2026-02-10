import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Sarjapur Road'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Sarjapur Road | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Sarjapur Road',
    'biology tuition Sarjapur Road',
    'NEET classes Sarjapur Road Bangalore',
    'best NEET tutor Sarjapur Road',
    'medical entrance coaching Sarjapur Road',
    'NEET preparation East Bangalore',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Sarjapur Road | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-sarjapur-road-bangalore`,
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
    title: 'Best NEET Coaching in Sarjapur Road | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-sarjapur-road-bangalore`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Sarjapur Road?', a: 'Yes! Our online NEET coaching is specifically designed for Southeast Bangalore students. With AIIMS faculty, 98% success rate, and personalized attention, students in Sarjapur Road achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for Sarjapur Road students?', a: 'We offer flexible morning, afternoon, and evening batches so Sarjapur Road students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. Sarjapur Road students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Sarjapur Road?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. Sarjapur Road students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Sarjapur Road students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Bangalore classroom coaching centers.' },
  { q: 'Which medical colleges can Sarjapur Road students target?', a: 'With strong NEET scores, Sarjapur Road students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why Sarjapur Road students choose Cerebrum.' },
]

export default function NEETCoachingSarjapurRoadPage() {
  return (
    <>
      <LocalitySchema
        locality="Sarjapur Road"
        slug="neet-coaching-sarjapur-road-bangalore"
        pageTitle="Best NEET Coaching in Sarjapur Road"
        pageDescription="Join #1 NEET coaching in Sarjapur Road Bangalore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "12.9102", lng: "77.6846" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
