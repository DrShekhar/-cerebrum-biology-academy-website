import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Dubai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, UAE`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dubai UAE | 98% Success Rate',
  description:
    'Join #1 NEET coaching for Indian students in Dubai UAE. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Timezone-friendly online classes. Book free demo!',
  keywords: [
    'NEET coaching Dubai',
    'biology tuition Dubai',
    'NEET classes Dubai UAE',
    'best NEET tutor Dubai',
    'Indian NEET coaching UAE',
    'online NEET preparation Dubai',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Dubai UAE | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Dubai. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-dubai-uae`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in Dubai - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Dubai UAE | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Dubai. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-dubai-uae` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Dubai?', a: 'Yes! Our online NEET coaching is specifically designed for Indian expat students. With 98% success rate and timezone-friendly classes, students in Dubai achieve excellent results.' },
  { q: 'What are the class timings for Dubai students?', a: 'Classes are scheduled at 2:30 PM - 6:30 PM GST considering UAE timezone to ensure students attend live sessions comfortably.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Absolutely! Instant WhatsApp support available 24/7 on +91-8826444334. Our AIIMS faculty responds within minutes.' },
  { q: 'Which schools in Dubai do you support?', a: 'We support students from GEMS, DPS Dubai, Indian High School, Our Own English, Delhi Private School and all CBSE/ICSE/IB affiliated institutions in Dubai.' },
  { q: 'Is NEET exam conducted in Dubai?', a: 'Yes, NEET exam can be taken at the Dubai center. NTA conducts NEET in UAE for Indian students.' },
  { q: 'What makes Cerebrum different from other coaching?', a: 'AIIMS-qualified faculty, 10-15 student batches, 695/720 top score, 98% success rate, and timezone-friendly online classes specifically for expat students.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 75,000/year, Comprehensive (Class 12): Rs 72,000/year, Dropper: Rs 85,000/year. EMI available. Much affordable than local coaching.' },
  { q: 'Can I attend a free demo class?', a: 'Yes! WhatsApp us at +91-8826444334 to book your free demo class and experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingDubaiPage() {
  return (
    <>
      <LocalitySchema locality="Dubai" slug="neet-coaching-dubai-uae" pageTitle="Best NEET Coaching in Dubai" pageDescription="Expert NEET coaching for Indian students in Dubai UAE with 98% success rate and timezone-friendly classes." pageType="coaching" coordinates={{ lat: "25.2048", lng: "55.2708" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
