import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Sharjah'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${Sharjah}, UAE`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Sharjah UAE | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching for Indian students in Sharjah UAE. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Timezone-friendly online classes. Book free demo!',
  keywords: [
    'NEET coaching Sharjah',
    'biology tuition Sharjah',
    'NEET classes Sharjah UAE',
    'best NEET tutor Sharjah',
    'Indian NEET coaching UAE',
    'online NEET preparation Sharjah',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Sharjah UAE | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Sharjah. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-sharjah-uae`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in Sharjah - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Sharjah UAE | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Sharjah. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-sharjah-uae` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Sharjah?', a: 'Yes! Our online NEET coaching is specifically designed for Indian expat students. With 98% success rate and timezone-friendly classes, students in Sharjah achieve excellent results.' },
  { q: 'What are the class timings for Sharjah students?', a: 'Classes are scheduled at 2:30 PM - 6:30 PM GST considering UAE timezone to ensure students attend live sessions comfortably.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Absolutely! Instant WhatsApp support available 24/7 on +91-8826444334. Our AIIMS faculty responds within minutes.' },
  { q: 'Which schools in Sharjah do you support?', a: 'We support students from Indian School Sharjah, DPS Sharjah, Our Own English Sharjah, Scholars Indian School and all CBSE/ICSE/IB affiliated institutions in Sharjah.' },
  { q: 'Is NEET exam conducted in Sharjah?', a: 'Yes, NEET exam can be taken at the Sharjah center. NTA conducts NEET in UAE for Indian students.' },
  { q: 'What makes Cerebrum different from other coaching?', a: 'AIIMS-qualified faculty, 10-15 student batches, 695/720 top score, 98% success rate, and timezone-friendly online classes specifically for expat students.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 75,000/year, Comprehensive (Class 12): Rs 72,000/year, Dropper: Rs 85,000/year. EMI available. Much affordable than local coaching.' },
  { q: 'Can I attend a free demo class?', a: 'Yes! WhatsApp us at +91-8826444334 to book your free demo class and experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingSharjahPage() {
  return (
    <>
      <LocalitySchema locality="Sharjah" slug="neet-coaching-sharjah-uae" pageTitle="Best NEET Coaching in Sharjah" pageDescription="Expert NEET coaching for Indian students in Sharjah UAE with 98% success rate and timezone-friendly classes." pageType="coaching" coordinates={{ lat: "25.3462", lng: "55.4211" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
