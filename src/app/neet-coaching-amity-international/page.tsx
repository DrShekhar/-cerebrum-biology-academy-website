import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Amity International School'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
  description: `Specialized NEET Biology coaching for ${school} students across multiple campuses. Expert CBSE to NEET preparation with proven success.`,
  keywords: [
    'NEET coaching Amity International School',
    'Amity NEET preparation',
    'CBSE NEET coaching',
    'Amity International School biology',
    'large batch NEET coaching',
    'competitive NEET preparation',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students | Cerebrum Biology Academy`,
    description: `Expert NEET coaching for ${school} with CBSE curriculum expertise.`,
    url: `${BASE_URL}/neet-coaching-amity-international`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-amity-international`,
  },
}

const faqs = [
  { q: 'Do you offer specialized NEET coaching for Amity International students?', a: 'Yes! Our online NEET coaching is tailored for Amity International students in Delhi. We understand the school curriculum and bridge it with NEET NCERT requirements. AIIMS faculty, 98% success rate.' },
  { q: 'How do Amity International students balance school and NEET prep?', a: 'Our flexible batch timings (morning, afternoon, evening) are designed around Amity International school hours. Weekend revision sessions and recorded lectures ensure no conflict with school commitments.' },
  { q: 'What results have Amity International students achieved?', a: 'Students from premium Delhi schools consistently score 650+ in NEET with our coaching. Our structured approach complements the strong academic foundation from schools like Amity International.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Amity International students get unlimited doubt clearing sessions.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Premium coaching at fraction of Delhi classroom center costs.' },
  { q: 'How is Cerebrum different from local coaching centers near Amity International?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), personalized mentoring, 695/720 top score, and 98% success rate. No commute needed from Saket.' },
  { q: 'Do you cover both CBSE board and NEET syllabus?', a: 'Yes! Our curriculum is 100% NCERT-based which covers both CBSE board exams and NEET. Amity International students benefit from our dual-focus approach.' },
  { q: 'Can I attend a free demo class?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology firsthand.' },
]

export default function AmityInternationalPage() {
  return (
    <>
      <LocalitySchema locality="India" slug="neet-coaching-amity-international" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for ${school} students across all campuses with proven competitive NEET preparation success.`} pageType="coaching" coordinates={{ lat: "28.5449", lng: "77.2672" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
