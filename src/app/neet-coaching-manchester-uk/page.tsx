import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Manchester'

export const metadata: Metadata = {
  title: 'NEET Coaching in Manchester, UK | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students in Manchester, Bolton, Rochdale, Stockport. A-Level + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-manchester-uk`,
    languages: {
      'en-GB': `${BASE_URL}/neet-coaching-manchester-uk`,
      'en-IN': `${BASE_URL}/neet-coaching-manchester-uk`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Manchester, UK — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in Greater Manchester. A-Level friendly, GMT/BST live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-manchester-uk`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-manchester-uk.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Manchester — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Manchester, UK',
    description: 'Online NEET Biology coaching for Manchester students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-manchester-uk.jpg`],
  },
}

export const manchesterFaqs = [
  {
    q: 'Can NEET help me get into a UK medical school?',
    a: 'No. UK medical schools (UCAS) use A-Levels plus UCAT or BMAT — NEET is not part of the UK med-school process. NEET is the Indian medical entrance exam, used for MBBS/BDS admissions in India, including the 15% NRI quota.',
  },
  {
    q: 'What are the class timings for Manchester students?',
    a: 'Live classes typically run 4:00–6:30 PM GMT (5:00–7:30 PM BST) — after UK school hours. Every session is recorded.',
  },
  {
    q: 'Can I prepare for NEET while doing A-Levels?',
    a: 'Yes. A-Level Biology and NEET Biology overlap significantly. Our curriculum is NCERT-aligned and adds the NEET-specific depth. Many Manchester students run both in parallel.',
  },
  {
    q: 'Which Manchester schools do you support?',
    a: 'Indian-origin students from Manchester Grammar, Withington Girls, Parrs Wood HS, Manchester Academy, Abraham Moss Community School, Loreto High School, King David HS, and state schools across Longsight, Cheetham Hill, Rusholme, Whalley Range and Greater Manchester boroughs (Bolton, Rochdale, Stockport, Trafford).',
  },
  {
    q: 'Is there a NEET exam centre near Manchester?',
    a: 'No. The NTA does not operate a NEET exam centre in the UK. Most UK candidates fly to Dubai, Abu Dhabi, Sharjah, Doha or Manama (Gulf centres) or to India to sit NEET-UG.',
  },
  {
    q: 'What does NEET coaching cost for Manchester students?',
    a: 'Online batches start at roughly £55/year (Elixir plan) and go up to ~£460/year (Intensive plan), depending on the level of support. EMI plans are available.',
  },
  {
    q: 'What is the realistic pathway from NEET to working in the NHS?',
    a: 'It is multi-step: (1) qualify NEET-UG and complete an MBBS degree in India, (2) return to the UK, (3) pass the UKMLA to register with the GMC, (4) apply for UK Foundation training for NHS practice.',
  },
  {
    q: 'Do you help with visas or the NRI quota process?',
    a: 'On the NRI quota academic side, yes — we explain eligibility, typical cut-offs, and broad timelines. On visa, immigration, or legal documentation, no — those are handled by your family or licensed consultants.',
  },
]

export default function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-manchester-uk"
        pageTitle="NEET Coaching in Manchester, UK"
        pageDescription="Online NEET Biology coaching for Indian-origin students in Greater Manchester. A-Level to NEET bridge, GMT/BST live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '53.4808', lng: '-2.2426' }}
        faqs={manchesterFaqs}
      />
      <PageContent faqs={manchesterFaqs} />
    </>
  )
}
