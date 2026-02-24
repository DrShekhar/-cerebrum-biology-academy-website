import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = "St. Columba's School"
const city = 'New Delhi'
const slug = 'neet-coaching-st-columbas-school'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: `Specialized coaching for ${school} students`,
  locality: city,
})

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students`,
  description: `Specialized NEET Biology coaching for ${school} students in ${city}. Expert faculty, 98% success rate, personalized batches. Book free demo!`,
  keywords: [
    'NEET coaching St Columbas School',
    'biology tuition St Columbas students',
    'NEET preparation New Delhi St Columba',
    'NEET classes for St Columbas School',
    'NEET biology coaching Ashoka Road',
    'CBSE NEET coaching Delhi boys school',
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
  { q: 'Do you offer specialized NEET coaching for St. Columbas School students?', a: 'Yes! Our online NEET coaching is tailored for St. Columbas School students in Delhi. We understand the school curriculum and bridge it with NEET NCERT requirements. AIIMS faculty, 98% success rate.' },
  { q: 'How do St. Columbas School students balance school and NEET prep?', a: 'Our flexible batch timings (morning, afternoon, evening) are designed around St. Columbas School school hours. Weekend revision sessions and recorded lectures ensure no conflict with school commitments.' },
  { q: 'What results have St. Columbas School students achieved?', a: 'Students from premium Delhi schools consistently score 650+ in NEET with our coaching. Our structured approach complements the strong academic foundation from schools like St. Columbas School.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. St. Columbas School students get unlimited doubt clearing sessions.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Premium coaching at fraction of Delhi classroom center costs.' },
  { q: 'How is Cerebrum different from local coaching centers near St. Columbas School?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), personalized mentoring, 695/720 top score, and 98% success rate. No commute needed from Connaught Place.' },
  { q: 'Do you cover both CBSE board and NEET syllabus?', a: 'Yes! Our curriculum is 100% NCERT-based which covers both CBSE board exams and NEET. St. Columbas School students benefit from our dual-focus approach.' },
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
      coordinates={{ lat: "28.6254", lng: "77.2188" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
