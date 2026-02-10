import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Salt Lake'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Salt Lake Kolkata | Premium Coaching | Cerebrum',
  description:
    'Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Perfect for Sector V IT families. Personalized batches & doubt clearing. Book free demo!',
  keywords: [
    'NEET coaching Salt Lake',
    'biology tuition Salt Lake Kolkata',
    'NEET classes Salt Lake',
    'best NEET tutor Salt Lake',
    'medical entrance Sector V',
    'NEET preparation Kolkata gated community',
    'Salt Lake Sector V NEET coaching',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Salt Lake Kolkata | Premium Coaching | Cerebrum',
    description:
      'Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-salt-lake-kolkata`,
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
    title: 'Best NEET Coaching in Salt Lake Kolkata | Premium Coaching',
    description:
      'Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-salt-lake-kolkata`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Salt Lake?', a: 'Yes! Our online NEET coaching is specifically designed for East Kolkata students. With AIIMS faculty, 98% success rate, and personalized attention, students in Salt Lake achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for Salt Lake students?', a: 'We offer flexible morning, afternoon, and evening batches so Salt Lake students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. Salt Lake students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Salt Lake?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. Salt Lake students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Salt Lake students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Kolkata classroom coaching centers.' },
  { q: 'Which medical colleges can Salt Lake students target?', a: 'With strong NEET scores, Salt Lake students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why Salt Lake students choose Cerebrum.' },
]

export default function NEETCoachingSaltLakeKolkataPage() {
  return (
    <>
      <LocalitySchema
        locality="Salt Lake"
        slug="neet-coaching-salt-lake-kolkata"
        pageTitle="Best NEET Coaching in Salt Lake"
        pageDescription="Join #1 NEET coaching in Salt Lake, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "22.5806", lng: "88.4115" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
