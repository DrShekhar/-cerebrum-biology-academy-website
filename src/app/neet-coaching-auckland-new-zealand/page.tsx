import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Auckland'

export const metadata: Metadata = {
  title: 'NEET Coaching in Auckland, New Zealand | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students in Auckland — Papatoetoe, Mount Roskill, Sandringham. NCEA + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-auckland-new-zealand`,
    languages: {
      'en-NZ': `${BASE_URL}/neet-coaching-auckland-new-zealand`,
      'en-IN': `${BASE_URL}/neet-coaching-auckland-new-zealand`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Auckland, New Zealand — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in Auckland. NCEA Level 2/3 friendly, NZST live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-auckland-new-zealand`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_NZ',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-auckland-new-zealand.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Auckland — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Auckland, New Zealand',
    description: 'Online NEET Biology coaching for Auckland students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-auckland-new-zealand.jpg`],
  },
}

export const aucklandFaqs = [
  {
    q: 'Can NEET help me get into a NZ medical school?',
    a: 'No. NZ medical schools (Auckland, Otago) use a first-year "Health Sciences" or "Biomedical Sciences" pathway + UMAT/UCAT. NEET is the Indian medical entrance exam — Indian-origin NZ students typically take NEET to access the 15% NRI quota at Indian medical colleges.',
  },
  {
    q: 'What are the class timings for Auckland students?',
    a: 'Live weekday classes run 2:30–5:00 PM NZST (3:30–6:00 PM NZDT). Weekend batches also run 12:30–3:30 PM NZST. All sessions are recorded.',
  },
  {
    q: 'Can I prepare for NEET while doing NCEA Level 2 / 3?',
    a: 'Yes. NCEA Level 2 and 3 Biology overlap with NEET on cell biology, genetics, ecology and some physiology. Our curriculum is NCERT-aligned and adds the NEET-specific depth. Many Auckland students run both in parallel.',
  },
  {
    q: 'Which Auckland schools do you support?',
    a: "Indian-origin students from Auckland Grammar, Epsom Girls Grammar, Macleans College, Pakuranga College, Auckland Girls Grammar, Mount Roskill Grammar, Papatoetoe High, Onehunga High, and schools across Sandringham, Mount Roskill, Papatoetoe, Te Atatu and Auckland's Indian-community suburbs.",
  },
  {
    q: 'Is there a NEET exam centre in New Zealand?',
    a: 'No. The NTA does not operate a NEET exam centre in New Zealand. Auckland students typically fly from AKL to Singapore or Kuala Lumpur (official NEET centres) or to India to sit NEET-UG. We help students plan registration and travel.',
  },
  {
    q: 'What does NEET coaching cost for Auckland students?',
    a: 'Online batches start at roughly NZD 110/year and go up to ~NZD 900/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you help with visas or the NRI quota process?',
    a: 'On the NRI quota academic side, yes — we explain eligibility, typical cut-offs, and broad admission timelines. On visa, immigration, or legal documentation, no — those are handled by your family or licensed consultants.',
  },
  {
    q: 'How do I book a free demo class from Auckland?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-auckland-new-zealand"
        pageTitle="NEET Coaching in Auckland, New Zealand"
        pageDescription="Online NEET Biology coaching for Indian-origin students in Auckland. NCEA L2/L3 + NEET dual prep, NZST live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '-36.8485', lng: '174.7633' }}
        faqs={aucklandFaqs}
      />
      <PageContent faqs={aucklandFaqs} />
    </>
  )
}
