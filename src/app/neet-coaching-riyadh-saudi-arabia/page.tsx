import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Riyadh'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Riyadh | 98% Success Rate',
  description: 'Join #1 NEET coaching for Indian students in Riyadh. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Timezone-friendly online classes.',
  keywords: [
    'NEET coaching Riyadh',
    'biology tuition Riyadh',
    'NEET classes Riyadh',
    'best NEET tutor Riyadh',
    'Indian NEET coaching Saudi Arabia',
    'online NEET preparation Riyadh',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Riyadh | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Riyadh. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-riyadh-saudi-arabia`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Riyadh | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Riyadh. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-riyadh-saudi-arabia` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Riyadh?', a: 'Yes! Our online NEET coaching is specifically designed for Indian expat students. With 98% success rate and timezone-friendly classes, students in Riyadh achieve excellent results.' },
  { q: 'What are the class timings for Riyadh students?', a: 'Classes are scheduled considering Saudi Arabia timezone (AST, UTC+3) to ensure students attend live sessions comfortably without conflicts with school hours.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Absolutely! Instant WhatsApp support is available 24/7 on 918826444334. Our faculty responds within minutes for biology and chemistry doubts.' },
  { q: 'Which schools in Riyadh do you support?', a: 'We support students from International Indian School Riyadh, Indian School Riyadh, Indian Embassy School, DPS Riyadh, and all CBSE-affiliated institutions.' },
  { q: 'What makes Cerebrum different from other NEET coaching?', a: 'AIIMS-qualified faculty, personalized attention, 695/720 top score, 98% success rate, and timezone-friendly online classes specifically for expat students.' },
  { q: 'How does the fee compare with Kota coaching?', a: 'Cerebrum offers premium coaching at \u20b924,000-\u20b948,000/year. No relocation, no hostel fees—direct AIIMS faculty access from Riyadh.' },
  { q: 'Do you cover both Class 11 and Class 12 NEET syllabus?', a: 'Yes, Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Yes! WhatsApp us at 918826444334 to book your free demo class and experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingRiyadhPage() {
  return (
    <>
      <LocalitySchema locality="Riyadh" slug="neet-coaching-riyadh-saudi-arabia" pageTitle="Best NEET Coaching in Riyadh" pageDescription="Expert NEET coaching for Indian students in Riyadh with 98% success rate and timezone-friendly online classes." pageType="coaching" coordinates={{ lat: "24.7136", lng: "46.6753" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
