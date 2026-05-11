import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'New York'

export const metadata: Metadata = {
  title: 'NEET Coaching in New York, USA | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students across NYC, NJ (Edison, Jersey City) and Long Island. AP Biology + NEET dual prep. Free demo.',
  openGraph: {
    title: 'NEET Coaching in New York, USA — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in NY/NJ. AP Biology friendly, EST/EDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-new-york-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-new-york-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in New York — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in New York, USA',
    description: 'Online NEET Biology coaching for NY/NJ students. Book free demo.',
    creator: '@cerebrumacademy',
    images: [`${BASE_URL}/og-neet-coaching-new-york-usa.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-new-york-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-new-york-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-new-york-usa`,
    },
  },
}

export const nyFaqs = [
  {
    q: 'Can NEET help me get into a US medical school?',
    a: 'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students typically take NEET to access the 15% NRI quota at Indian medical colleges — a common path for those who prefer a direct-to-MBBS route at a lower cost than US med school.',
  },
  {
    q: 'What are the class timings for NY/NJ students?',
    a: 'Live classes run 8:00–10:30 PM IST, which is 10:30 AM–1:00 PM EST (or 11:30 AM–2:00 PM EDT). Weekend batches also run 9:00 AM–12:00 PM EST. All sessions are recorded for on-demand revision.',
  },
  {
    q: 'Can I prepare for NEET while taking AP Biology?',
    a: 'Yes — AP Biology and NEET Biology overlap significantly (cell biology, genetics, physiology, ecology). NEET goes deeper on human physiology and adds NCERT-specific depth. Students running AP Bio and NEET prep in parallel typically find both easier because the fundamentals are shared.',
  },
  {
    q: 'Which NY/NJ schools do you support?',
    a: 'We support Indian-American students from NYC specialized high schools (Stuyvesant, Bronx Science, Brooklyn Tech) and high-Indian-density schools in NJ (Edison HS, John P. Stevens, South Brunswick, West Windsor-Plainsboro) and Long Island. Students on any US high school curriculum are welcome — the NEET syllabus is NCERT-based.',
  },
  {
    q: 'Do you help with the NRI quota for Indian MBBS admissions?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed consultants.',
  },
  {
    q: 'What does NEET coaching cost for NY students?',
    a: 'Annual NRI tuition ranges roughly $4,800–$6,000 in the USA across Foundation / Comprehensive / Dropper tiers — see the regional pricing tiers below for the current USD amount plus a $/month equivalent. EMI plans available.',
  },
  {
    q: 'Where does NEET actually get taken from the US?',
    a: 'There is no NEET exam centre inside the United States. Most US candidates fly to Dubai or India to sit NEET-UG. We help enrolled students plan NEET registration, exam-city selection, and travel timing.',
  },
  {
    q: 'How do I book a free demo from NY or NJ?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default async function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-new-york-usa"
        pageTitle="NEET Coaching in New York, USA"
        pageDescription="Online NEET Biology coaching for Indian-American students in NY and NJ. AP Biology + NEET dual prep, EST/EDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '40.7128', lng: '-74.0060' }}
        faqs={nyFaqs}
      />
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
