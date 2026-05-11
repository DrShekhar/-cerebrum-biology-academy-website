import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Birmingham'

export const metadata: Metadata = {
  title: 'NEET Coaching in Birmingham, UK | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students in Birmingham — Handsworth, Smethwick, Edgbaston. A-Level + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-birmingham-uk`,
    languages: {
      'en-GB': `${BASE_URL}/neet-coaching-birmingham-uk`,
      'en-IN': `${BASE_URL}/neet-coaching-birmingham-uk`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Birmingham, UK — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in Birmingham. A-Level friendly, GMT/BST live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-birmingham-uk`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-birmingham-uk.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Birmingham — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Birmingham, UK',
    description: 'Online NEET Biology coaching for Birmingham students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-birmingham-uk.jpg`],
  },
}

export const birminghamFaqs = [
  {
    q: 'Can NEET help me get into a UK medical school?',
    a: 'No. UK medical schools (UCAS) use A-Levels plus UCAT or BMAT for admissions — NEET is not part of the UK med-school process. NEET is the Indian medical entrance exam, used for MBBS/BDS admissions in India, including the 15% NRI quota.',
  },
  {
    q: 'What are the class timings for Birmingham students?',
    a: 'Live classes typically run 4:00–6:30 PM GMT (5:00–7:30 PM BST) — after UK school hours. Every session is recorded.',
  },
  {
    q: 'Can I prepare for NEET while doing A-Levels or BTEC?',
    a: 'Yes. A-Level Biology and NEET Biology overlap significantly. Our curriculum is NCERT-aligned and adds the NEET-specific depth. Many Birmingham students run both in parallel.',
  },
  {
    q: 'Which Birmingham schools do you support?',
    a: 'We support Indian-origin students from King Edward VI grammar schools, Handsworth Grammar School, Aston Manor Academy, Broadway Academy, Heartlands Academy, Small Heath Leadership Academy, and state schools across Handsworth, Smethwick, Aston, Sparkhill, Edgbaston and Harborne.',
  },
  {
    q: 'Is there a NEET exam centre near Birmingham?',
    a: 'No. The NTA does not operate a NEET exam centre in the UK. The nearest overseas centres are Dubai, Abu Dhabi, Sharjah, Doha and Manama — most UK candidates fly to one of these, or to India, to sit NEET-UG.',
  },
  {
    q: 'What does NEET coaching cost for Birmingham students?',
    a: 'Online batches start at roughly £55/year and go up to ~£460/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'What is the realistic pathway from NEET to working in the NHS?',
    a: 'It is multi-step: (1) qualify NEET-UG and complete an MBBS degree in India, (2) return to the UK, (3) pass the UKMLA to register with the GMC, (4) apply for UK Foundation training to enter NHS practice. NEET alone does not lead to NHS — it opens the Indian MBBS route.',
  },
  {
    q: 'Do you help with visas or the NRI quota process?',
    a: 'On the NRI quota academic side, yes. On visa, immigration, or legal documentation, no — those are handled by your family or licensed consultants.',
  },
]

export default async function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-birmingham-uk"
        pageTitle="NEET Coaching in Birmingham, UK"
        pageDescription="Online NEET Biology coaching for Indian-origin students in Birmingham. A-Level to NEET bridge, GMT/BST live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '52.4862', lng: '-1.8904' }}
        faqs={birminghamFaqs}
      />
      <PageContent faqs={birminghamFaqs} />
      <NEETNRIPricingTiers />
    </>
  )
}
