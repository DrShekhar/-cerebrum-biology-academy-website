import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Leicester'
const city = NRI_INTERNATIONAL_CITIES['leicester-uk']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Leicester Indian Class 11-12 students — UK's most Indian city per-capita (~33% Indian-origin, 140K residents). Belgrave, Rushey Mead, Spinney Hills, Stoneygate concentration. Feeder schools: Leicester Grammar, Loughborough Grammar, Loughborough High, Stoneygate School, Ratcliffe College. A-Level Biology to NCERT bridge. GMT 12-2:30 PM batch. NRI quota + UK MBBS analysis. 98% qualification rate.`,
  keywords: [
    'NEET coaching Leicester',
    'NEET coaching UK',
    'NEET coaching Belgrave',
    'NEET coaching Rushey Mead',
    'NEET coaching Spinney Hills',
    'NEET coaching Stoneygate',
    'NEET coaching Loughborough',
    'online NEET coaching Leicester',
    'NEET tutor Leicester',
    'A-Level to NEET bridge',
    'Leicester Grammar NEET',
    'Loughborough Grammar NEET',
    'UK MBBS vs Indian MBBS',
    'NRI quota AIIMS Leicester',
    'biology tutor Leicester',
    'University Leicester Med vs NEET',
    'De Montfort vs NEET',
    'Nottingham Medicine vs NEET',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-leicester-uk`,
    languages: {
      'en-GB': `${BASE_URL}/neet-coaching-leicester-uk`,
      'en-IN': `${BASE_URL}/neet-coaching-leicester-uk`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Leicester, UK — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in Leicester. A-Level friendly, GMT/BST live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-leicester-uk`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-leicester-uk.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Leicester — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Leicester, UK',
    description: 'Online NEET Biology coaching for Leicester students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-leicester-uk.jpg`],
  },
}

export const leicesterFaqs = [
  {
    q: 'Can NEET help me get into a UK medical school?',
    a: 'No. UK medical schools (UCAS) use A-Levels plus UCAT or BMAT for admissions — NEET is not part of the UK med-school process. NEET is the Indian medical entrance exam, used for MBBS/BDS admissions in India, including the 15% NRI quota at eligible Indian medical colleges.',
  },
  {
    q: 'What are the class timings for Leicester students?',
    a: 'Live classes typically run 4:00–6:30 PM GMT (5:00–7:30 PM BST) — after Leicester school hours. Every session is recorded, so students on A-Level exam schedules or travel can catch up within hours.',
  },
  {
    q: 'Can I prepare for NEET while doing A-Levels or BTEC?',
    a: 'Yes. A-Level Biology and NEET Biology overlap significantly. Our curriculum is NCERT-aligned and adds the NEET-specific depth beyond A-Level syllabus. Many Leicester students run both in parallel — the concepts transfer either way.',
  },
  {
    q: 'Which Leicester schools do you support?',
    a: "We support Indian-origin students from Leicester schools with strong Indian communities including Rushey Mead Academy, Judgemeadow Community College, Beaumont Leys School, Wyggeston and Queen Elizabeth I College, Gateway College, Sir Jonathan North Girls' College, and state schools across Belgrave, Spinney Hills, Rushey Mead and the wider city. IB Diploma and A-Level students from any Leicester school are welcome.",
  },
  {
    q: 'Is there a NEET exam centre near Leicester?',
    a: 'No. The NTA does not operate a NEET exam centre in the UK. The nearest overseas centres are Dubai, Abu Dhabi, Sharjah and Doha — most UK candidates fly to one of these, or to India, to sit NEET-UG. We help students plan registration and exam travel.',
  },
  {
    q: 'What does NEET coaching cost for Leicester students?',
    a: 'Online batches start at roughly £55/year and go up to ~£460/year, depending on the level of support. EMI plans are available. See the pricing section below for current tiers.',
  },
  {
    q: 'What is the realistic pathway from NEET to working in the NHS?',
    a: 'It is multi-step: (1) qualify NEET-UG and complete an MBBS degree in India (typically 5.5 years), (2) return to the UK, (3) pass the UKMLA to register with the GMC, (4) apply for UK Foundation training to enter NHS practice. NEET alone does not lead to NHS — it opens the Indian MBBS route, which is one option to eventually practise in the UK.',
  },
  {
    q: 'Do you help with the NRI quota for Indian MBBS admissions?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed consultants.',
  },
]

export default async function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-leicester-uk"
        pageTitle="NEET Coaching in Leicester, UK"
        pageDescription="Online NEET Biology coaching for Indian-origin students in Leicester. A-Level to NEET bridge, GMT/BST live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '52.6369', lng: '-1.1398' }}
        faqs={leicesterFaqs}
        skipCourseList
      />
      <PageContent faqs={leicesterFaqs} />
      <NEETNRIPricingTiers />
    </>
  )
}
