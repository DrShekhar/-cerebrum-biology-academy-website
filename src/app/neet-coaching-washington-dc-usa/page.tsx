import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Washington DC'

export const metadata: Metadata = {
  title: 'NEET Coaching in Washington DC | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students in DC, NoVA (Fairfax, Loudoun) and MoCo Maryland. AP Biology + NEET dual prep. Free demo.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-washington-dc-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-washington-dc-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-washington-dc-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Washington DC — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in DC metro (DMV). AP Bio friendly, EST/EDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-washington-dc-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-washington-dc-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Washington DC — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Washington DC',
    description: 'Online NEET Biology coaching for DC metro students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-washington-dc-usa.jpg`],
  },
}

export const dcFaqs = [
  {
    q: 'Can NEET help me get into a US medical school?',
    a: 'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students in the DC area typically take NEET to access the 15% NRI quota at Indian medical colleges — a direct-to-MBBS path at lower cost than US med school.',
  },
  {
    q: 'What are the class timings for DC / NoVA / MoCo students?',
    a: 'Live weekday classes run 10:30 AM–1:00 PM EST (11:30 AM–2:00 PM EDT). Weekend batches also run 9:00 AM–12:00 PM EST. All sessions are recorded.',
  },
  {
    q: 'Can I prepare for NEET while taking AP Biology?',
    a: 'Yes — AP Bio and NEET Bio overlap on cell biology, genetics, physiology, and ecology. NEET adds depth on human physiology and NCERT-specific content. Students running AP Bio and NEET prep in parallel typically find both easier.',
  },
  {
    q: 'Which DMV schools do you support?',
    a: 'Fairfax County (TJHSST, Langley, Oakton, Chantilly, Centreville, Westfield), Loudoun County (Academies of Loudoun, Stone Bridge, Independence, Lightridge), Montgomery County MD (Richard Montgomery, Winston Churchill, Walt Whitman, Walter Johnson, Poolesville HS) and PG County schools with strong Indian-American populations.',
  },
  {
    q: 'Is NoVA / MoCo a good Indian-American community for NEET prep?',
    a: 'Yes — the DMV has one of the highest-income, highest-education Indian-American populations in the US. We run city-specific parent WhatsApp groups and peer study circles.',
  },
  {
    q: 'Where does NEET actually get taken from the US?',
    a: 'There is no NEET exam centre inside the United States. Most DC candidates fly from IAD/DCA/BWI to Dubai (official NEET centre) or to India. We help enrolled students plan registration, exam-city selection, and travel.',
  },
  {
    q: 'What does NEET coaching cost for DC-area students?',
    a: 'Online batches start at roughly $70/year (Elixir plan) and go up to ~$575/year (Intensive plan), depending on the level of support. EMI plans are available. See the pricing section below for current tiers.',
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
        slug="neet-coaching-washington-dc-usa"
        pageTitle="NEET Coaching in Washington DC"
        pageDescription="Online NEET Biology coaching for Indian-American students in DC, NoVA and MoCo. AP Biology + NEET dual prep, EST/EDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '38.9072', lng: '-77.0369' }}
        faqs={dcFaqs}
      />
      <PageContent faqs={dcFaqs} />
    </>
  )
}
