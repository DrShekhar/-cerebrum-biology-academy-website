import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Mylapore'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mylapore | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Mylapore Chennai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Mylapore',
    'biology tuition Mylapore',
    'NEET classes Mylapore Chennai',
    'best NEET tutor Mylapore',
    'medical entrance coaching Mylapore',
    'NEET preparation Chennai',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Mylapore | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Mylapore Chennai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-mylapore-chennai`,
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
    title: 'Best NEET Coaching in Mylapore | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Mylapore Chennai. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-mylapore-chennai`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Mylapore?', a: 'Yes! Our online NEET coaching is specifically designed for South Chennai students. With AIIMS faculty, 98% success rate, and personalized attention, students in Mylapore achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for Mylapore students?', a: 'We offer flexible morning, afternoon, and evening batches so Mylapore students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. Mylapore students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Mylapore?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. Mylapore students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Mylapore students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Chennai classroom coaching centers.' },
  { q: 'Which medical colleges can Mylapore students target?', a: 'With strong NEET scores, Mylapore students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why Mylapore students choose Cerebrum.' },
]

export default function NEETCoachingMylaporePage() {
  return (
    <>
      <LocalitySchema
        locality="Mylapore"
        slug="neet-coaching-mylapore-chennai"
        pageTitle="Best NEET Coaching in Mylapore"
        pageDescription="Join #1 NEET coaching in Mylapore Chennai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "13.0339", lng: "80.2676" }} faqs={faqs} />
      <PageContent />
    </>
  )
}