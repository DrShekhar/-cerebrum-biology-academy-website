import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'C-Scheme'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in C-Scheme Jaipur | Tier 1 Premium | Cerebrum',
  description:
    'Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for industrialist families. Book free demo!',
  keywords: [
    'NEET coaching C-Scheme',
    'biology tuition C-Scheme Jaipur',
    'NEET classes C-Scheme',
    'best NEET tutor MI Road',
    'medical entrance C-Scheme',
    'NEET preparation Tier 1 premium Jaipur',
  ],
  openGraph: {
    title: 'Best NEET Coaching in C-Scheme Jaipur | Tier 1 Premium | Cerebrum',
    description:
      'Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-c-scheme-jaipur`,
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
    title: 'Best NEET Coaching in C-Scheme Jaipur | Tier 1 Premium',
    description:
      'Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-c-scheme-jaipur`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in C-Scheme?', a: 'Yes! Our online NEET coaching is specifically designed for Central Jaipur students. With AIIMS faculty, 98% success rate, and personalized attention, students in C-Scheme achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for C-Scheme students?', a: 'We offer flexible morning, afternoon, and evening batches so C-Scheme students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. C-Scheme students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in C-Scheme?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. C-Scheme students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for C-Scheme students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Jaipur classroom coaching centers.' },
  { q: 'Which medical colleges can C-Scheme students target?', a: 'With strong NEET scores, C-Scheme students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why C-Scheme students choose Cerebrum.' },
]

export default function NEETCoachingCSchemeJaipurPage() {
  return (
    <>
      <LocalitySchema
        locality="C-Scheme"
        slug="neet-coaching-c-scheme-jaipur"
        pageTitle="Best NEET Coaching in C-Scheme"
        pageDescription="Join #1 NEET coaching in C-Scheme, Jaipur. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "26.9074", lng: "75.7873" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
