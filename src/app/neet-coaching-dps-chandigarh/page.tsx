import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const school = 'Delhi Public School, Chandigarh'
const city = 'Chandigarh'
const slug = 'neet-coaching-dps-chandigarh'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: `Specialized coaching for ${school} students`,
  locality: city,
})

export const metadata: Metadata = {
  title: `NEET Coaching for ${school} Students`,
  description: `Specialized NEET Biology coaching for ${school} students in ${city}. Competitive batches, 98% success rate. Book free demo!`,
  keywords: [
    'NEET coaching DPS Chandigarh',
    'biology tuition DPS Sector 40',
    'NEET preparation Delhi Public School Chandigarh',
    'NEET classes DPS Chandigarh',
    'competitive NEET coaching Chandigarh',
  ],
  openGraph: {
    title: `NEET Coaching for ${school} Students`,
    description: `Specialized NEET Biology coaching for ${school} students in ${city}. Competitive batches, 98% success rate.`,
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
  { q: 'Do you offer specialized NEET coaching for DPS Chandigarh students?', a: 'Yes! Our online NEET coaching is tailored for DPS Chandigarh students in Chandigarh. We understand the school curriculum and bridge it with NEET NCERT requirements. AIIMS faculty, 98% success rate.' },
  { q: 'How do DPS Chandigarh students balance school and NEET prep?', a: 'Our flexible batch timings (morning, afternoon, evening) are designed around DPS Chandigarh school hours. Weekend revision sessions and recorded lectures ensure no conflict with school commitments.' },
  { q: 'What results have DPS Chandigarh students achieved?', a: 'Students from premium Chandigarh schools consistently score 650+ in NEET with our coaching. Our structured approach complements the strong academic foundation from schools like DPS Chandigarh.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. DPS Chandigarh students get unlimited doubt clearing sessions.' },
  { q: 'What is the fee for NEET coaching?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Premium coaching at fraction of Chandigarh classroom center costs.' },
  { q: 'How is Cerebrum different from local coaching centers near DPS Chandigarh?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), personalized mentoring, 695/720 top score, and 98% success rate. No commute needed from Sector 40.' },
  { q: 'Do you cover both CBSE board and NEET syllabus?', a: 'Yes! Our curriculum is 100% NCERT-based which covers both CBSE board exams and NEET. DPS Chandigarh students benefit from our dual-focus approach.' },
  { q: 'Can I attend a free demo class?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology firsthand.' },
]

export default function SchoolPage() {
  return (
    <>
      <LocalitySchema
        locality={city}
        slug={slug}
        pageTitle={`NEET Coaching for ${school} Students`}
        pageDescription={`Specialized NEET Biology coaching for ${school} students in ${city}. Competitive batches, 98% success rate.`}
        pageType="coaching"
      coordinates={{ lat: "30.7194", lng: "76.7678" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
