import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Colombo'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Colombo | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Colombo. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. A/L to NEET transition support.',
  keywords: [
    'NEET coaching Colombo',
    'biology tuition Colombo',
    'NEET classes Colombo',
    'best NEET tutor Colombo',
    'Indian NEET coaching Sri Lanka',
    'A/L to NEET preparation',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Colombo | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Colombo. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-colombo-sri-lanka`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Colombo | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Colombo. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-colombo-sri-lanka` },
}

const faqs = [
  { q: 'Can Sri Lankan students appear for Indian NEET?', a: 'Yes! Students from Sri Lanka with CBSE, Cambridge A/L, or local board background can appear for NEET. Our coaching prepares students for Indian NEET pattern.' },
  { q: 'What are class timings for Colombo students?', a: 'Sri Lanka is IST+0:30, making timing extremely convenient. Live classes align perfectly for Colombo students.' },
  { q: 'Which schools in Colombo do you support?', a: 'Indian High Commission School, Colombo International School, Royal College, Ladies College, and all CBSE/Cambridge schools in Sri Lanka.' },
  { q: 'How does online NEET coaching work from Colombo?', a: 'Live interactive classes with AIIMS faculty, structured syllabus, daily practice, WhatsApp support, and weekly mock tests accessible from Colombo.' },
  { q: 'What is the fee for Colombo students?', a: 'NEET coaching at \u20b924,000-\u20b948,000/year (approx LKR 85,000-170,000). Far more affordable than traveling to India.' },
  { q: 'Do you help with A/L to NEET transition?', a: 'Yes! We help students transitioning from Cambridge A-Levels or Sri Lankan A/L Biology to NEET format with our bridge curriculum.' },
  { q: 'Is Cerebrum better than local coaching in Colombo?', a: 'Cerebrum provides AIIMS faculty directly to Colombo students—695/720 top score and 98% success rate unmatched by local coaching.' },
  { q: 'How do I start NEET preparation from Colombo?', a: 'WhatsApp 918826444334 for a free demo class. We assess your level and recommend the right NEET course.' },
]

const faqs = [
  { q: 'Is online NEET coaching effective for students in Colombo?', a: 'Yes! Our online NEET coaching is specifically designed for Colombo students. With AIIMS faculty, 98% success rate, and personalized attention, students in Colombo achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Colombo students?', a: 'We offer flexible morning, afternoon, and evening batches so Colombo students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Colombo students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Colombo?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Colombo students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Colombo students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Sri Lanka classroom coaching.' },
  { q: 'Which medical colleges can Colombo students target?', a: 'With strong NEET scores, Colombo students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingColomboPage() {
  return (
    <>
      <LocalitySchema locality="Colombo" slug="neet-coaching-colombo-sri-lanka" pageTitle="Best NEET Coaching in Colombo" pageDescription="Expert NEET coaching for Indian students in Colombo with A/L to NEET transition support." pageType="coaching" coordinates={{ lat: "6.9271", lng: "79.8612" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
