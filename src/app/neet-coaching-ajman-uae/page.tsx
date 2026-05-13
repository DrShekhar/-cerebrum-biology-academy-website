import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Ajman'

export const metadata: Metadata = {
  title: 'NEET Coaching in Ajman, UAE | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian students in Ajman. GST-friendly live classes, Sharjah/Dubai NEET exam centre support. Class 9–12 + droppers.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-ajman-uae`,
    languages: {
      'en-AE': `${BASE_URL}/neet-coaching-ajman-uae`,
      'en-IN': `${BASE_URL}/neet-coaching-ajman-uae`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Ajman, UAE — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Ajman. Timezone-friendly live classes; Sharjah/Dubai exam centre support.',
    url: `${BASE_URL}/neet-coaching-ajman-uae`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-ajman-uae.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Ajman — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Ajman, UAE',
    description: 'Online NEET Biology coaching for Ajman students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-ajman-uae.jpg`],
  },
}

export const ajmanFaqs = [
  {
    q: 'Is online NEET coaching effective for Ajman students?',
    a: 'Yes. Live classes run on GST (UTC+4) — after Ajman school hours — and every session is recorded for revision. Students living in Ajman who commute to Sharjah or Dubai schools also attend the same batches.',
  },
  {
    q: 'What are the class timings for Ajman students?',
    a: 'Live weekday classes run 4:00–6:30 PM GST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions are recorded.',
  },
  {
    q: 'Where is the nearest NEET exam centre?',
    a: 'Ajman residents typically sit NEET-UG in Sharjah (~25 km), Dubai (~35 km) or Abu Dhabi. All three are official NTA centres in the UAE. We help students pick the right centre during registration.',
  },
  {
    q: 'Which Ajman-area schools do you support?',
    a: 'We support Indian-curriculum students from Ajman Indian School, Habitat School Al Jurf, Delhi Private School Sharjah (for Ajman commuters) and all CBSE, ICSE and IB students across Ajman and Sharjah.',
  },
  {
    q: 'What does NEET coaching cost for Ajman students?',
    a: 'Online batches start at roughly AED 280/year and go up to ~AED 2,250/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services.',
  },
  {
    q: 'Can I start NEET prep in Grade 9 or 10 from Ajman?',
    a: 'Yes — Grades 9–10 foundation batches build NCERT-aligned core concepts in Biology. Early starters typically find NEET Biology much easier by Class 12.',
  },
  {
    q: 'How do I book a free demo class?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default async function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-ajman-uae"
        pageTitle="NEET Coaching in Ajman, UAE"
        pageDescription="Online NEET Biology coaching for Indian students in Ajman, UAE. GST-friendly live classes, Sharjah/Dubai exam centre support, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '25.4052', lng: '55.5136' }}
        faqs={ajmanFaqs}
        skipCourseList
      />
      <PageContent faqs={ajmanFaqs} />
      <NEETNRIPricingTiers />
    </>
  )
}
