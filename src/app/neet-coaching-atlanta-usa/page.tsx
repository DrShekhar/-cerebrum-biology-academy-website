import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Atlanta'

export const metadata: Metadata = {
  title: 'NEET Coaching in Atlanta, USA | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students in Atlanta, Johns Creek, Alpharetta, Duluth, Suwanee. AP Biology + NEET dual prep. Free demo available.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-atlanta-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-atlanta-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-atlanta-usa`,
    },
  },
  openGraph: {
    title: 'NEET Coaching in Atlanta, USA — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in Atlanta metro. AP Bio friendly, EST/EDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-atlanta-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-atlanta-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Atlanta — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Atlanta, USA',
    description: 'Online NEET Biology coaching for Atlanta metro. Book free demo.',
    images: [`${BASE_URL}/og-neet-coaching-atlanta-usa.jpg`],
  },
}

export const atlantaFaqs = [
  {
    q: 'Can NEET help me get into a US medical school?',
    a: 'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students in Atlanta typically take NEET to access the 15% NRI quota at Indian medical colleges — a direct-to-MBBS path at lower cost than US med school.',
  },
  {
    q: 'What are the class timings for Atlanta students?',
    a: 'Live weekday classes run 10:30 AM–1:00 PM EST (11:30 AM–2:00 PM EDT). Weekend batches also run 9:00 AM–12:00 PM EST. All sessions are recorded.',
  },
  {
    q: 'Can I prepare for NEET while taking AP Biology?',
    a: 'Yes — AP Bio and NEET Bio overlap on cell biology, genetics, physiology, and ecology. NEET goes deeper on human physiology and NCERT-specific content. Students running AP Bio and NEET prep in parallel typically find both easier.',
  },
  {
    q: 'Which Atlanta-area schools do you support?',
    a: 'Indian-American students from North Fulton schools (Alpharetta HS, Milton HS, Chattahoochee HS, Northview HS in Johns Creek) and Forsyth / Gwinnett schools (Lambert HS, South Forsyth, Mill Creek HS, Collins Hill HS, Duluth HS). Any Georgia public school curriculum is fine — NEET is NCERT-based.',
  },
  {
    q: 'Is the Johns Creek / Alpharetta community big enough for study groups?',
    a: 'Yes. North Fulton has one of the densest Indian-American concentrations in the Southeast. Johns Creek alone is ~25% Asian. We run city-specific parent WhatsApp groups and peer study circles.',
  },
  {
    q: 'Where does NEET actually get taken from the US?',
    a: 'There is no NEET exam centre inside the United States. Most Atlanta candidates fly from ATL to Dubai (official NEET centre) or to India. We help enrolled students plan registration, exam-city selection, and travel.',
  },
  {
    q: 'What does NEET coaching cost for Atlanta students?',
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
        slug="neet-coaching-atlanta-usa"
        pageTitle="NEET Coaching in Atlanta, USA"
        pageDescription="Online NEET Biology coaching for Indian-American students in Atlanta metro. AP Biology + NEET dual prep, EST/EDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '33.7490', lng: '-84.3880' }}
        faqs={atlantaFaqs}
      />
      <PageContent faqs={atlantaFaqs} />
    </>
  )
}
