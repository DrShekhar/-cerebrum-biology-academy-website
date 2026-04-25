import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Boston'

export const metadata: Metadata = {
  title: 'NEET Coaching in Boston, USA | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students in Greater Boston — Lexington, Burlington, Westford, Acton, Andover. AP Biology + NEET dual prep.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-boston-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-boston-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-boston-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Boston, USA — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in Greater Boston. AP Bio friendly, EST/EDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-boston-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-boston-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Boston — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Boston, USA',
    description: 'Online NEET Biology coaching for Greater Boston. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-boston-usa.jpg`],
  },
}

export const bostonFaqs = [
  {
    q: 'Can NEET help me get into a US medical school?',
    a: 'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students in Greater Boston typically take NEET to access the 15% NRI quota at Indian medical colleges — a direct-to-MBBS path at lower cost than US med school.',
  },
  {
    q: 'What are the class timings for Boston students?',
    a: 'Live weekday classes run 10:30 AM–1:00 PM EST (11:30 AM–2:00 PM EDT). Weekend batches also run 9:00 AM–12:00 PM EST. All sessions are recorded.',
  },
  {
    q: 'Can I prepare for NEET while taking AP Biology?',
    a: 'Yes — AP Bio and NEET Bio overlap on cell biology, genetics, physiology, and ecology. NEET adds depth on human physiology and NCERT-specific content. Students running AP Bio and NEET prep in parallel typically find both easier.',
  },
  {
    q: 'Which Greater Boston schools do you support?',
    a: 'Indian-American students from Lexington HS, Acton-Boxborough Regional HS, Westford Academy, Andover HS, Shrewsbury HS, Burlington HS, Chelmsford HS, Boxborough, and other suburbs with strong Indian-American populations. Boston Latin and Boston Latin Academy students also welcome.',
  },
  {
    q: 'Is the Boston tech / pharma community supportive of NEET prep?',
    a: 'Yes. Greater Boston has a strong Indian-American community centred on the Route 128/495 tech and pharma belt (Cambridge, Burlington, Lexington, Westford). Our WhatsApp parent community connects enrolled families.',
  },
  {
    q: 'Where does NEET actually get taken from the US?',
    a: 'There is no NEET exam centre inside the United States. Most Boston candidates fly from BOS to Dubai (official NEET centre) or to India. We help enrolled students plan registration, exam-city selection, and travel.',
  },
  {
    q: 'What does NEET coaching cost for Boston students?',
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
        slug="neet-coaching-boston-usa"
        pageTitle="NEET Coaching in Boston, USA"
        pageDescription="Online NEET Biology coaching for Indian-American students in Greater Boston. AP Biology + NEET dual prep, EST/EDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '42.3601', lng: '-71.0589' }}
        faqs={bostonFaqs}
      />
      <PageContent faqs={bostonFaqs} />
    </>
  )
}
