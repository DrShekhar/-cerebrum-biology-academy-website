import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'London'

export const metadata: Metadata = {
  title: 'NEET Coaching in London, UK | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students across London — Harrow, Southall, Wembley, Ilford. A-Level to NEET bridge. Free demo available.',
  openGraph: {
    title: 'NEET Coaching in London, UK — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in London. A-Level friendly, GMT/BST live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-london-uk`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-london-uk.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in London — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in London, UK',
    description: 'Online NEET Biology coaching for London students. Book free demo.',
    creator: '@cerebrumacademy',
    images: [`${BASE_URL}/og-neet-coaching-london-uk.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-london-uk`,
    languages: {
      'en-GB': `${BASE_URL}/neet-coaching-london-uk`,
      'en-IN': `${BASE_URL}/neet-coaching-london-uk`,
    },
  },
}

export const londonFaqs = [
  {
    q: 'Can I use a NEET score to apply to UK medical schools?',
    a: 'No. UK medical schools (UCAS) use A-Levels plus UCAT or BMAT for admissions — NEET is not part of the UK med-school process. NEET is the Indian medical entrance exam, used for MBBS/BDS admissions in India, including the 15% NRI quota at eligible Indian medical colleges.',
  },
  {
    q: 'What are the class timings for London students?',
    a: 'Live classes typically run 4:00–6:30 PM GMT / 5:00–7:30 PM BST (after UK school hours). Every session is recorded, so students on A-Level exam schedules or travel can catch up within hours.',
  },
  {
    q: 'Can I prepare for NEET while doing A-Levels or IGCSE?',
    a: 'Yes. Many London students run A-Level Biology and NEET prep in parallel — the concepts overlap significantly. Our Biology curriculum is NCERT-aligned and adds the NEET-specific depth beyond A-Level syllabus. We work around your school exam calendar.',
  },
  {
    q: 'What is the realistic pathway from NEET to working in the NHS?',
    a: 'The pathway is multi-step, not direct: (1) qualify NEET-UG and complete an MBBS degree in India (typically 5.5 years), (2) return to the UK, (3) pass the UKMLA (UK Medical Licensing Assessment) to register with the GMC, (4) apply for UK Foundation training to enter NHS practice. NEET alone does not lead to NHS — it opens the Indian MBBS route, which is one option to eventually practise in the UK.',
  },
  {
    q: 'Which London schools do you support?',
    a: 'We support Indian-origin students from London schools in the Harrow, Ealing, Brent, Redbridge and Barnet boroughs — including Nower Hill High, Queensbury, Villiers High, Preston Manor, Queen Elizabeth’s Boys, Ilford County, Seven Kings, and state selective and comprehensive schools with strong Indian-origin communities. Also IB Diploma and A-Level students from any London school are welcome.',
  },
  {
    q: 'What does NEET coaching cost for London students?',
    a: 'Online batches start at roughly £55/year and go up to ~£460/year, depending on the level of support. EMI plans are available. The pricing section below shows the current tiers.',
  },
  {
    q: 'Do you help with the NRI quota for Indian MBBS admissions?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your school, family, or licensed consultants.',
  },
  {
    q: 'How do I book a free demo class from London?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-london-uk"
        pageTitle="NEET Coaching in London, UK"
        pageDescription="Online NEET Biology coaching for Indian-origin students in London. A-Level to NEET bridge, GMT/BST live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '51.5074', lng: '-0.1278' }}
        faqs={londonFaqs}
      />
      <PageContent />
    </>
  )
}
