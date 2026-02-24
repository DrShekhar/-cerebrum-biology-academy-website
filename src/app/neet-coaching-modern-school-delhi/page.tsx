import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Modern School, Delhi'

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students`,
  description: `Specialized NEET Biology coaching for ${school} (Barakhamba Road) students. Leverage prestigious CBSE foundation for medical entrance excellence.`,
  keywords: [
    'NEET coaching Modern School Delhi',
    'Barakhamba Road NEET',
    'Modern School Noida NEET',
    'prestigious school NEET coaching',
    'Delhi CBSE NEET preparation',
    'top school biology coaching',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students`,
    description: `Expert NEET coaching for ${school} students with proven science excellence track record.`,
    url: `${BASE_URL}/neet-coaching-modern-school-delhi`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-modern-school-delhi`,
  },
}

const faqs = [
  { q: 'Do you offer specialized NEET coaching for Modern School students?', a: 'Yes! Our online NEET coaching is tailored for Modern School students in Delhi. We understand the school curriculum and bridge it with NEET NCERT requirements. AIIMS faculty, 98% success rate.' },
  { q: 'How do Modern School students balance school and NEET prep?', a: 'Our flexible batch timings (morning, afternoon, evening) are designed around Modern School school hours. Weekend revision sessions and recorded lectures ensure no conflict with school commitments.' },
  { q: 'What results have Modern School students achieved?', a: 'Students from premium Delhi schools consistently score 650+ in NEET with our coaching. Our structured approach complements the strong academic foundation from schools like Modern School.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Modern School students get unlimited doubt clearing sessions.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Premium coaching at fraction of Delhi classroom center costs.' },
  { q: 'How is Cerebrum different from local coaching centers near Modern School?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), personalized mentoring, 695/720 top score, and 98% success rate. No commute needed from Barakhamba Road.' },
  { q: 'Do you cover both CBSE board and NEET syllabus?', a: 'Yes! Our curriculum is 100% NCERT-based which covers both CBSE board exams and NEET. Modern School students benefit from our dual-focus approach.' },
  { q: 'Can I attend a free demo class?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology firsthand.' },
]

export default function ModernSchoolDelhiPage() {
  return (
    <>
      <LocalitySchema locality="Delhi" slug="neet-coaching-modern-school-delhi" pageTitle={`NEET Coaching for ${school} Students`} pageDescription={`Expert NEET coaching for prestigious ${school} students with strong science tradition and CBSE excellence.`} pageType="coaching" coordinates={{ lat: "28.5828", lng: "77.2260" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
