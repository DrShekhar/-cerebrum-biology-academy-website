import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Edison, NJ'

export const metadata: Metadata = {
  title: 'NEET Coaching in Edison, NJ | Online Biology Classes for Indian-American Students',
  description:
    'Online NEET Biology coaching for Indian-American students in Edison, Iselin, Woodbridge, Piscataway, South Brunswick. AP Biology + NEET dual prep.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-edison-nj-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-edison-nj-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-edison-nj-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Edison, NJ — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in Edison NJ and Middlesex County. AP Bio + NEET dual prep, EST/EDT live classes.',
    url: `${BASE_URL}/neet-coaching-edison-nj-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-edison-nj-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Edison NJ — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Edison, NJ',
    description: 'Online NEET Biology coaching for Edison NJ students. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-edison-nj-usa.jpg`],
  },
}

export const edisonFaqs = [
  {
    q: 'Can NEET help me get into a US medical school?',
    a: 'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students in Edison typically take NEET to access the 15% NRI quota at Indian medical colleges — a common path for families who prefer a direct-to-MBBS route at lower cost than US med school.',
  },
  {
    q: 'What are the class timings for Edison students?',
    a: "Live weekday classes run 10:30 AM–1:00 PM EST (11:30 AM–2:00 PM EDT). Weekend batches also run 9:00 AM–12:00 PM EST. All sessions are recorded, so AP/SAT exam weeks don't disrupt NEET prep.",
  },
  {
    q: 'Can I prepare for NEET while taking AP Biology?',
    a: 'Yes. AP Bio and NEET Bio overlap on cell biology, genetics, physiology, and ecology. NEET adds depth on human physiology and NCERT-specific content. Running both in parallel is efficient — the fundamentals transfer either way.',
  },
  {
    q: 'Which Middlesex/Middlesex-adjacent schools do you support?',
    a: 'We support students from Edison HS, John P. Stevens HS (Edison), JFK Memorial HS (Iselin), Woodbridge HS, Colonia HS, Piscataway HS, South Brunswick HS, East Brunswick HS, Monroe Township HS, North Brunswick HS, Metuchen HS and all schools across Middlesex County with strong Indian-American populations.',
  },
  {
    q: 'Is Oak Tree Road close enough to make coaching local?',
    a: "All our classes are live online, so physical proximity doesn't matter — students from Oak Tree Road (Iselin), downtown Edison, and the broader Middlesex/Somerset area join the same live batches. We route Edison-specific study groups via the parents' WhatsApp community.",
  },
  {
    q: 'Where does NEET actually get taken from the US?',
    a: 'There is no NEET exam centre inside the United States. Most US candidates fly from JFK/EWR to Dubai (official NEET centre) or to India. We help enrolled students plan NEET registration, exam-city selection, and travel.',
  },
  {
    q: 'What does NEET coaching cost for Edison students?',
    a: 'Annual NRI tuition ranges roughly $4,800–$6,000 in the USA across Foundation / Comprehensive / Dropper tiers — see the regional pricing tiers below for the current USD amount plus a $/month equivalent. EMI plans available.',
  },
  {
    q: 'Do you help with visas or the NRI quota process?',
    a: 'On the NRI quota academic side, yes — we explain eligibility, typical cut-offs, and broad admission timelines. On visa, immigration, or legal documentation, no — those are handled by your family or licensed consultants.',
  },
]

export default async function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-edison-nj-usa"
        pageTitle="NEET Coaching in Edison, NJ"
        pageDescription="Online NEET Biology coaching for Indian-American students in Edison, NJ and Middlesex County. AP Biology + NEET dual prep, EST/EDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '40.5187', lng: '-74.4121' }}
        faqs={edisonFaqs}
        skipCourseList
      />
      <PageContent faqs={edisonFaqs} />
      <NEETNRIPricingTiers />
    </>
  )
}
