import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'New Town Rajarhat'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in New Town Rajarhat Kolkata | IT Hub',
  description:
    'Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for Eco Park & Action Area families. Book free demo!',
  keywords: [
    'NEET coaching New Town',
    'biology tuition Rajarhat Kolkata',
    'NEET classes New Town Rajarhat',
    'best NEET tutor Eco Park',
    'medical entrance Action Area',
    'NEET preparation New Town Kolkata',
  ],
  openGraph: {
    title: 'Best NEET Coaching in New Town Rajarhat Kolkata | IT Hub',
    description:
      'Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-new-town-kolkata`,
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
    title: 'Best NEET Coaching in New Town Rajarhat Kolkata | IT Hub',
    description:
      'Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-new-town-kolkata`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in New Town?', a: 'Yes! Our online NEET coaching is specifically designed for East Kolkata students. With AIIMS faculty, 98% success rate, and personalized attention, students in New Town achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for New Town students?', a: 'We offer flexible morning, afternoon, and evening batches so New Town students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. New Town students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in New Town?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. New Town students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for New Town students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Kolkata classroom coaching centers.' },
  { q: 'Which medical colleges can New Town students target?', a: 'With strong NEET scores, New Town students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why New Town students choose Cerebrum.' },
]

export default function NEETCoachingNewTownKolkataPage() {
  return (
    <>
      <LocalitySchema
        locality="New Town Rajarhat"
        slug="neet-coaching-new-town-kolkata"
        pageTitle="Best NEET Coaching in New Town Rajarhat"
        pageDescription="Join #1 NEET coaching in New Town Rajarhat, Kolkata. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "22.5923", lng: "88.4832" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
