import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Salmiya'

export const metadata: Metadata = {
  title: 'NEET Coaching in Salmiya, Kuwait | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian students in Salmiya, Kuwait. AST-friendly live classes, Kuwait City NEET exam centre. Class 9–12 + droppers.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-salmiya-kuwait`,
    languages: {
      'en-KW': `${BASE_URL}/neet-coaching-salmiya-kuwait`,
      'en-IN': `${BASE_URL}/neet-coaching-salmiya-kuwait`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Salmiya, Kuwait — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Salmiya. Kuwait City exam centre, AST live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-salmiya-kuwait`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_KW',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-salmiya-kuwait.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Salmiya — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Salmiya, Kuwait',
    description: 'Online NEET Biology coaching for Salmiya students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-salmiya-kuwait.jpg`],
  },
}

export const salmiyaFaqs = [
  {
    q: 'Is online NEET coaching effective for Salmiya students?',
    a: 'Yes. Live classes run on AST (UTC+3) — after Kuwait school hours — and every session is recorded. Salmiya has one of the densest Indian communities in Kuwait, so our programme fits well.',
  },
  {
    q: 'What are the class timings for Salmiya students?',
    a: 'Live weekday classes run 5:00–7:30 PM AST. Weekend doubt-clearing 10:00 AM–12:30 PM AST. All sessions recorded.',
  },
  {
    q: 'Where is the nearest NEET exam centre?',
    a: 'The official NTA centre for Kuwait is in Kuwait City — roughly 10 km from Salmiya. Public transport and quick drive time from Salmiya residential areas.',
  },
  {
    q: 'Which schools in Salmiya / Kuwait do you support?',
    a: "Indian Central School (ICSK — including ICSK Salmiya Senior branch), Indian Community School Kuwait (both branches), Carmel School, Bhavan's SIS Kuwait, Don Bosco School and all CBSE/ICSE-affiliated schools across Kuwait.",
  },
  {
    q: 'What does NEET coaching cost for Salmiya students?',
    a: 'Online batches start at roughly KWD 22/year and go up to ~KWD 180/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services.',
  },
  {
    q: 'Can I start NEET prep in Grade 9 or 10 from Salmiya?',
    a: 'Yes — Grades 9–10 foundation batches build NCERT-aligned core concepts. Early starters typically find NEET Biology much easier by Class 12.',
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
        slug="neet-coaching-salmiya-kuwait"
        pageTitle="NEET Coaching in Salmiya, Kuwait"
        pageDescription="Online NEET Biology coaching for Indian students in Salmiya, Kuwait. AST-friendly live classes, Kuwait City NEET exam centre, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '29.3326', lng: '48.0775' }}
        faqs={salmiyaFaqs}
        skipCourseList
      />
      <PageContent faqs={salmiyaFaqs} />
      <NEETNRIPricingTiers />
    </>
  )
}
