import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Bahrain'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, Bahrain`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Bahrain Bahrain | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching for Indian students in Bahrain Bahrain. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Timezone-friendly online classes. Book free demo!',
  keywords: [
    'NEET coaching Bahrain',
    'biology tuition Bahrain',
    'NEET classes Bahrain Bahrain',
    'best NEET tutor Bahrain',
    'Indian NEET coaching Bahrain',
    'online NEET preparation Bahrain',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Bahrain Bahrain | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Bahrain. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-bahrain`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in Bahrain - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Bahrain Bahrain | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Bahrain. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-bahrain` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Bahrain?', a: 'Yes! Our online NEET coaching is specifically designed for Indian expat students. With 98% success rate and timezone-friendly classes, students in Bahrain achieve excellent results.' },
  { q: 'What are the class timings for Bahrain students?', a: 'Classes are scheduled at 3:30 PM - 7:30 PM AST considering Bahrain timezone to ensure students attend live sessions comfortably.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Absolutely! Instant WhatsApp support available 24/7 on +91-8826444334. Our AIIMS faculty responds within minutes.' },
  { q: 'Which schools in Bahrain do you support?', a: 'We support students from Indian School Bahrain, New Indian School, Asian School Bahrain and all CBSE/ICSE/IB affiliated institutions in Bahrain.' },
  { q: 'Is NEET exam conducted in Bahrain?', a: 'Yes, NEET exam can be taken at the Bahrain center. NTA conducts NEET in Bahrain for Indian students.' },
  { q: 'What makes Cerebrum different from other coaching?', a: 'AIIMS-qualified faculty, 10-15 student batches, 695/720 top score, 98% success rate, and timezone-friendly online classes specifically for expat students.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 75,000/year, Comprehensive (Class 12): Rs 72,000/year, Dropper: Rs 85,000/year. EMI available. Much affordable than local coaching.' },
  { q: 'Can I attend a free demo class?', a: 'Yes! WhatsApp us at +91-8826444334 to book your free demo class and experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingBahrainPage() {
  return (
    <>
      <LocalitySchema locality="Bahrain" slug="neet-coaching-bahrain" pageTitle="Best NEET Coaching in Bahrain" pageDescription="Expert NEET coaching for Indian students in Bahrain Bahrain with 98% success rate and timezone-friendly classes." pageType="coaching" coordinates={{ lat: "26.0667", lng: "50.5577" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
