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


export default function NEETCoachingColomboPage() {
  return (
    <>
      <LocalitySchema locality="Colombo" slug="neet-coaching-colombo-sri-lanka" pageTitle="Best NEET Coaching in Colombo" pageDescription="Expert NEET coaching for Indian students in Colombo with A/L to NEET transition support." pageType="coaching" coordinates={{ lat: "6.9271", lng: "79.8612" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
