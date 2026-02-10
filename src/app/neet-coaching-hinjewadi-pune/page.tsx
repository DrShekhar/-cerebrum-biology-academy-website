import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Hinjewadi'
const city = 'Pune'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Hinjewadi Pune | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty, 98% success rate. Rajiv Gandhi Infotech Park, IT professionals. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Hinjewadi',
    'biology tuition Hinjewadi',
    'NEET classes Pune',
    'best NEET tutor IT Park',
    'medical entrance Hinjewadi',
    'NEET preparation Pune',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Hinjewadi Pune | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-hinjewadi-pune`,
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
    title: 'Best NEET Coaching in Hinjewadi Pune | 98% Success Rate',
    description: 'Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-hinjewadi-pune`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Hinjewadi?', a: 'Yes! Our online NEET coaching is specifically designed for West Pune students. With AIIMS faculty, 98% success rate, and personalized attention, students in Hinjewadi achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for Hinjewadi students?', a: 'We offer flexible morning, afternoon, and evening batches so Hinjewadi students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. Hinjewadi students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Hinjewadi?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. Hinjewadi students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Hinjewadi students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Pune classroom coaching centers.' },
  { q: 'Which medical colleges can Hinjewadi students target?', a: 'With strong NEET scores, Hinjewadi students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why Hinjewadi students choose Cerebrum.' },
]

export default function NEETCoachingHinjewadiPunePage() {
  return (
    <>
      <LocalitySchema
        locality="Hinjewadi"
        slug="neet-coaching-hinjewadi-pune"
        pageTitle="Best NEET Coaching in Hinjewadi"
        pageDescription="Join #1 NEET coaching in Hinjewadi, Pune. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "18.5912", lng: "73.7390" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
