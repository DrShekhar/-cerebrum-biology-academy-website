import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Sanskriti School'
const city = 'Chanakyapuri, Delhi'
const slug = 'neet-coaching-sanskriti-school'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: `Specialized coaching for ${school} students`,
  locality: city,
})

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students`,
  description: `Specialized NEET Biology coaching for ${school} students in ${city}. Expert faculty, 98% success rate, personalized batches. Book free demo!`,
  keywords: [
    'NEET coaching Sanskriti School',
    'biology tuition Sanskriti students',
    'NEET preparation Chanakyapuri Delhi',
    'NEET classes for Sanskriti School',
    'NEET biology coaching Chanakyapuri',
    'CBSE NEET coaching Delhi',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students`,
    description: `Specialized NEET Biology coaching for ${school} students in ${city}. Expert faculty, 98% success rate, personalized batches.`,
    url: `${BASE_URL}/${slug}`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching for ${school} Students`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Coaching for ${school} Students`,
    description: `Specialized NEET Biology coaching for ${school} students in ${city}.`,
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/${slug}`,
  },
}

const faqs = [
  { q: 'Do you offer specialized NEET coaching for Sanskriti School students?', a: 'Yes! Our online NEET coaching is tailored for Sanskriti School students in Delhi. We understand the school curriculum and bridge it with NEET NCERT requirements. AIIMS faculty, 98% success rate.' },
  { q: 'How do Sanskriti School students balance school and NEET prep?', a: 'Our flexible batch timings (morning, afternoon, evening) are designed around Sanskriti School school hours. Weekend revision sessions and recorded lectures ensure no conflict with school commitments.' },
  { q: 'What results have Sanskriti School students achieved?', a: 'Students from premium Delhi schools consistently score 650+ in NEET with our coaching. Our structured approach complements the strong academic foundation from schools like Sanskriti School.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Sanskriti School students get unlimited doubt clearing sessions.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Premium coaching at fraction of Delhi classroom center costs.' },
  { q: 'How is Cerebrum different from local coaching centers near Sanskriti School?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), personalized mentoring, 695/720 top score, and 98% success rate. No commute needed from Chanakyapuri.' },
  { q: 'Do you cover both CBSE board and NEET syllabus?', a: 'Yes! Our curriculum is 100% NCERT-based which covers both CBSE board exams and NEET. Sanskriti School students benefit from our dual-focus approach.' },
  { q: 'Can I attend a free demo class?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology firsthand.' },
]

export default function SchoolPage() {
  return (
    <>
      <LocalitySchema
        locality={city}
        slug={slug}
        pageTitle={`NEET Coaching for ${school} Students`}
        pageDescription={`Specialized NEET Biology coaching for ${school} students in ${city}. Expert faculty, 98% success rate, personalized batches.`}
        pageType="coaching"
      coordinates={{ lat: "28.5697", lng: "77.1661" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
