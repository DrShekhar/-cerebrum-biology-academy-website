import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = "Bishop's School, Pune"

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students`,
  description: `Specialized NEET Biology coaching for ${school} (Camp area, Pune) students. ICSE/ISC curriculum to NEET bridge with proven success.`,
  keywords: [
    'NEET coaching Bishops School Pune',
    'ICSE to NEET bridge',
    'Pune NEET coaching',
    'Camp area NEET preparation',
    'ICSE NEET preparation',
    'prestigious Pune school NEET',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students`,
    description: `Expert NEET coaching for ${school} students with ICSE/ISC excellence bridge.`,
    url: `${BASE_URL}/neet-coaching-bishops-school-pune`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bishops-school-pune`,
  },
}

const faqs = [
  { q: 'Do you offer specialized NEET coaching for Bishops School students?', a: 'Yes! Our online NEET coaching is tailored for Bishops School students in Pune. We understand the school curriculum and bridge it with NEET NCERT requirements. AIIMS faculty, 98% success rate.' },
  { q: 'How do Bishops School students balance school and NEET prep?', a: 'Our flexible batch timings (morning, afternoon, evening) are designed around Bishops School school hours. Weekend revision sessions and recorded lectures ensure no conflict with school commitments.' },
  { q: 'What results have Bishops School students achieved?', a: 'Students from premium Pune schools consistently score 650+ in NEET with our coaching. Our structured approach complements the strong academic foundation from schools like Bishops School.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Bishops School students get unlimited doubt clearing sessions.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Premium coaching at fraction of Pune classroom center costs.' },
  { q: 'How is Cerebrum different from local coaching centers near Bishops School?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), personalized mentoring, 695/720 top score, and 98% success rate. No commute needed from Camp.' },
  { q: 'Do you cover both CBSE board and NEET syllabus?', a: 'Yes! Our curriculum is 100% NCERT-based which covers both CBSE board exams and NEET. Bishops School students benefit from our dual-focus approach.' },
  { q: 'Can I attend a free demo class?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology firsthand.' },
]

export default function BishopsSchoolPunePage() {
  return (
    <>
      <LocalitySchema locality="Pune" slug="neet-coaching-bishops-school-pune" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for ${school} (Camp, Pune) students with ICSE/ISC-to-NEET bridge program.`} pageType="coaching" coordinates={{ lat: "18.5308", lng: "73.8787" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
