import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'La Martiniere'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} (Kolkata & Lucknow) students. ISC curriculum to NEET bridge with proven success.`,
  keywords: [
    'NEET coaching La Martiniere',
    'La Martiniere Kolkata NEET',
    'La Martiniere Lucknow NEET',
    'ISC to NEET bridge',
    'colonial heritage school NEET',
    'prestigious ISC coaching',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} students with ISC curriculum excellence bridge.`,
    url: `${BASE_URL}/neet-coaching-la-martiniere`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-la-martiniere`,
  },
}

const faqs = [
  { q: 'Do you offer specialized NEET coaching for La Martiniere students?', a: 'Yes! Our online NEET coaching is tailored for La Martiniere students in Lucknow. We understand the school curriculum and bridge it with NEET NCERT requirements. AIIMS faculty, 98% success rate.' },
  { q: 'How do La Martiniere students balance school and NEET prep?', a: 'Our flexible batch timings (morning, afternoon, evening) are designed around La Martiniere school hours. Weekend revision sessions and recorded lectures ensure no conflict with school commitments.' },
  { q: 'What results have La Martiniere students achieved?', a: 'Students from premium Lucknow schools consistently score 650+ in NEET with our coaching. Our structured approach complements the strong academic foundation from schools like La Martiniere.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. La Martiniere students get unlimited doubt clearing sessions.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Premium coaching at fraction of Lucknow classroom center costs.' },
  { q: 'How is Cerebrum different from local coaching centers near La Martiniere?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), personalized mentoring, 695/720 top score, and 98% success rate. No commute needed from Hazratganj.' },
  { q: 'Do you cover both CBSE board and NEET syllabus?', a: 'Yes! Our curriculum is 100% NCERT-based which covers both CBSE board exams and NEET. La Martiniere students benefit from our dual-focus approach.' },
  { q: 'Can I attend a free demo class?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology firsthand.' },
]

export default function LaMartinierePage() {
  return (
    <>
      <LocalitySchema locality="Kolkata" slug="neet-coaching-la-martiniere" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for prestigious ${school} (Kolkata/Lucknow) students with ISC-to-NEET bridge program.`} pageType="coaching" coordinates={{ lat: "26.8522", lng: "80.9406" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
