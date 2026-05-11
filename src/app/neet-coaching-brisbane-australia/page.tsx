import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Brisbane'

export const metadata: Metadata = {
  title: 'NEET Coaching in Brisbane, Australia | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-origin students in Brisbane — Sunnybank, Calamvale, Runcorn. Queensland Year 11-12 + NEET dual prep.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-brisbane-australia`,
    languages: {
      'en-AU': `${BASE_URL}/neet-coaching-brisbane-australia`,
      'en-IN': `${BASE_URL}/neet-coaching-brisbane-australia`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Brisbane, Australia — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-origin students in Brisbane. Queensland ATAR-friendly, AEST live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-brisbane-australia`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-brisbane-australia.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Brisbane — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Brisbane, Australia',
    description: 'Online NEET Biology coaching for Brisbane students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-brisbane-australia.jpg`],
  },
}

export const brisbaneFaqs = [
  {
    q: 'Can NEET help me get into an Australian medical school?',
    a: 'No. Australian medical schools use UCAT + ATAR (undergraduate) or GAMSAT (graduate) plus interview. NEET is the Indian medical entrance exam — Indian-origin students in Brisbane typically take NEET to access the 15% NRI quota at Indian medical colleges.',
  },
  {
    q: 'What are the class timings for Brisbane students?',
    a: 'Live weekday classes run 12:30–3:00 PM AEST. Weekend batches also run 10:30 AM–1:30 PM AEST. All sessions are recorded for on-demand revision.',
  },
  {
    q: 'Can I prepare for NEET while doing Queensland Biology (Year 11-12)?',
    a: 'Yes. Queensland Biology in Years 11-12 overlaps significantly with NEET Biology. Our curriculum is NCERT-aligned and adds NEET-specific depth. Many Brisbane students run both in parallel.',
  },
  {
    q: 'Which Brisbane schools do you support?',
    a: "Indian-origin students from Brisbane State High School, Kelvin Grove State College, Indooroopilly State High, Mansfield SHS, Mount Gravatt SHS, Sunnybank SHS, Runcorn SHS, and schools across Sunnybank, Calamvale, MacGregor, Runcorn and Brisbane's southeast Indian corridor.",
  },
  {
    q: 'Is there a NEET exam centre in Australia?',
    a: 'No. The NTA does not operate a NEET exam centre in Australia. Brisbane students typically fly from BNE to Singapore or Kuala Lumpur (official NEET centres) or to India to sit NEET-UG. We help students plan registration and travel.',
  },
  {
    q: 'What does NEET coaching cost for Brisbane students?',
    a: 'Online batches start at roughly AUD 100/year and go up to ~AUD 860/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you help with visas or the NRI quota process?',
    a: 'On the NRI quota academic side, yes. On visa, immigration, or legal documentation, no — those are handled by your family or licensed consultants.',
  },
  {
    q: 'How do I book a free demo class from Brisbane?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default async function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-brisbane-australia"
        pageTitle="NEET Coaching in Brisbane, Australia"
        pageDescription="Online NEET Biology coaching for Indian-origin students in Brisbane. Queensland Year 11-12 + NEET dual prep, AEST live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '-27.4698', lng: '153.0251' }}
        faqs={brisbaneFaqs}
      />
      <PageContent faqs={brisbaneFaqs} />
      <NEETNRIPricingTiers />
    </>
  )
}
