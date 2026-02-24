import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Baner'
const city = 'Pune'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Baner Pune | 98% Success Rate',
  description:
    'Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty, 98% success rate. Balewadi, premium residential, IT professionals. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Baner',
    'biology tuition Baner',
    'NEET classes Balewadi',
    'best NEET tutor Baner',
    'medical entrance Baner',
    'NEET preparation Baner Pune',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Baner Pune | 98% Success Rate',
    description: 'Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-baner-pune`,
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
    title: 'Best NEET Coaching in Baner Pune | 98% Success Rate',
    description: 'Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-baner-pune`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Baner?', a: 'Yes! Our online NEET coaching is specifically designed for West Pune students. With AIIMS faculty, 98% success rate, and personalized attention, students in Baner achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Baner students?', a: 'We offer flexible morning, afternoon, and evening batches so Baner students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Baner students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Baner?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Baner students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Baner students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Pune classroom coaching.' },
  { q: 'Which medical colleges can Baner students target?', a: 'With strong NEET scores, Baner students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingBanerPunePage() {
  return (
    <>
      <LocalitySchema
        locality="Baner"
        slug="neet-coaching-baner-pune"
        pageTitle="Best NEET Coaching in Baner"
        pageDescription="Join #1 NEET coaching in Baner, Pune. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "18.5590", lng: "73.7868" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
