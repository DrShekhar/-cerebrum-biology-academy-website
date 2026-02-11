import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Pattaya'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${Pattaya}, Thailand`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Pattaya Thailand | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching for Indian students in Pattaya Thailand. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Timezone-friendly online classes. Book free demo!',
  keywords: [
    'NEET coaching Pattaya',
    'biology tuition Pattaya',
    'NEET classes Pattaya Thailand',
    'best NEET tutor Pattaya',
    'Indian NEET coaching Thailand',
    'online NEET preparation Pattaya',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Pattaya Thailand | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Pattaya. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-pattaya-thailand`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in Pattaya - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Pattaya Thailand | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Pattaya. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-pattaya-thailand` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Pattaya?', a: 'Yes! Our online NEET coaching is specifically designed for Indian expat students. With 98% success rate and timezone-friendly classes, students in Pattaya achieve excellent results.' },
  { q: 'What are the class timings for Pattaya students?', a: 'Classes are scheduled at 5:30 PM - 9:30 PM ICT considering Thailand timezone to ensure students attend live sessions comfortably.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Absolutely! Instant WhatsApp support available 24/7 on +91-8826444334. Our AIIMS faculty responds within minutes.' },
  { q: 'Which schools in Pattaya do you support?', a: 'We support students from Garden International School, International School Eastern Seaboard and all CBSE/ICSE/IB affiliated institutions in Pattaya.' },
  { q: 'Is NEET exam conducted in Pattaya?', a: 'Students from Pattaya need to travel to India for the NEET exam. We assist with travel planning and logistics.' },
  { q: 'What makes Cerebrum different from other coaching?', a: 'AIIMS-qualified faculty, 10-15 student batches, 695/720 top score, 98% success rate, and timezone-friendly online classes specifically for expat students.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 75,000/year, Comprehensive (Class 12): Rs 72,000/year, Dropper: Rs 85,000/year. EMI available. Much affordable than local coaching.' },
  { q: 'Can I attend a free demo class?', a: 'Yes! WhatsApp us at +91-8826444334 to book your free demo class and experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingPattayaPage() {
  return (
    <>
      <LocalitySchema locality="Pattaya" slug="neet-coaching-pattaya-thailand" pageTitle="Best NEET Coaching in Pattaya" pageDescription="Expert NEET coaching for Indian students in Pattaya Thailand with 98% success rate and timezone-friendly classes." pageType="coaching" coordinates={{ lat: "12.9236", lng: "100.8825" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
