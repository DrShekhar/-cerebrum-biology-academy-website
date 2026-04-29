import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Calgary'

export const metadata: Metadata = {
  title: 'NEET Coaching in Calgary, Canada | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students in Calgary, Martindale, Saddle Ridge. Alberta Grade 11-12 + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-calgary-canada`,
    languages: {
      'en-CA': `${BASE_URL}/neet-coaching-calgary-canada`,
      'en-IN': `${BASE_URL}/neet-coaching-calgary-canada`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Calgary, Canada — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in Calgary. Alberta Gr 11-12 friendly, MST/MDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-calgary-canada`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-calgary-canada.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Calgary — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Calgary, Canada',
    description: 'Online NEET Biology coaching for Calgary students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-calgary-canada.jpg`],
  },
}

export const calgaryFaqs = [
  {
    q: 'Can NEET help me get into a Canadian medical school?',
    a: 'No. Canadian medical schools use provincial admission systems (e.g. OMSAS, ACMC) with MCAT and an undergraduate degree. NEET is the Indian medical entrance exam — Calgary students typically take NEET to access the 15% NRI quota at Indian medical colleges.',
  },
  {
    q: 'What are the class timings for Calgary students?',
    a: 'Live weekday classes run 8:30–11:00 AM MST (9:30 AM–12:00 PM MDT). Weekend batches also run 7:00–10:00 AM MST. All sessions recorded.',
  },
  {
    q: 'Can I prepare for NEET while doing Alberta Biology 20/30?',
    a: 'Yes. Alberta Biology 20 and 30 (Grades 11-12) cover many NEET topics. Our curriculum is NCERT-aligned and adds the NEET-specific depth beyond Alberta curriculum. Many Calgary students run both in parallel.',
  },
  {
    q: 'Which Calgary schools do you support?',
    a: "Indian-origin students from Nelson Mandela HS, Lester B. Pearson HS, Sir John A. Macdonald Jr HS, Crescent Heights HS, Ernest Manning HS, Western Canada HS, and schools across Martindale, Saddle Ridge, Falconridge, Castleridge and Calgary's NE Indian-community corridors.",
  },
  {
    q: 'Is there a NEET exam centre in Canada?',
    a: 'No. The NTA does not operate a NEET exam centre in Canada. Calgary students typically fly from YYC to Dubai (official NEET centre) or to India to sit NEET-UG. We help students plan registration and travel.',
  },
  {
    q: 'What does NEET coaching cost for Calgary students?',
    a: 'Online batches start at roughly CAD 95/year and go up to ~CAD 790/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you help with visas or the NRI quota process?',
    a: 'On the NRI quota academic side, yes. On visa, immigration, or legal documentation, no — those are handled by your family or licensed consultants.',
  },
  {
    q: 'How do I book a free demo class from Calgary?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-calgary-canada"
        pageTitle="NEET Coaching in Calgary, Canada"
        pageDescription="Online NEET Biology coaching for Indian-origin students in Calgary. Alberta Gr 11-12 + NEET dual prep, MST/MDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '51.0447', lng: '-114.0719' }}
        faqs={calgaryFaqs}
      />
      <PageContent faqs={calgaryFaqs} />
    </>
  )
}
