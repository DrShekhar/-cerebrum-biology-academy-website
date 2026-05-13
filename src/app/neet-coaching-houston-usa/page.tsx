import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Houston'

export const metadata: Metadata = {
  title: 'NEET Coaching in Houston, USA | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian-American students in Houston, Sugar Land, Pearland, Katy. AP Biology + NEET dual prep. Free demo available.',
  openGraph: {
    title: 'NEET Coaching in Houston, USA — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian-American students in Houston metro. AP Biology friendly, CST/CDT live classes, NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-houston-usa`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-houston-usa.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Houston — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Houston, USA',
    description: 'Online NEET Biology coaching for Houston metro. Book free demo.',
    creator: '@cerebrumacademy',
    images: [`${BASE_URL}/og-neet-coaching-houston-usa.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-houston-usa`,
    languages: {
      'en-US': `${BASE_URL}/neet-coaching-houston-usa`,
      'en-IN': `${BASE_URL}/neet-coaching-houston-usa`,
    },
  },
}

export const houstonFaqs = [
  {
    q: 'Can NEET help me get into a US medical school?',
    a: 'No. US medical schools use MCAT + a US undergraduate (pre-med) degree. NEET is the Indian medical entrance exam. Indian-American students typically take NEET to access the 15% NRI quota at Indian medical colleges — a common path for families preferring a direct-to-MBBS route at a lower cost than US med school.',
  },
  {
    q: 'What are the class timings for Houston students?',
    a: 'Live classes run in IST that is friendly to CST: weekday classes at 9:30–12:00 AM CST (8:00–10:30 PM IST) or weekend batches 8:00–11:00 AM CST. Every session is recorded, so any missed class can be caught up within hours.',
  },
  {
    q: 'Can I prepare for NEET while taking AP Biology?',
    a: 'Yes — AP Biology and NEET Biology overlap significantly (cell biology, genetics, physiology, ecology). NEET goes deeper on human physiology and adds NCERT-specific depth. Students running AP Bio and NEET prep in parallel typically find both easier.',
  },
  {
    q: 'Which Houston-area schools do you support?',
    a: 'We support Indian-American students from Houston public magnets (Bellaire HS, DeBakey HSHP, Carnegie Vanguard) and high-Indian-density suburban schools in Sugar Land (Stephen F. Austin, Clements, Dulles, Travis) and Katy/Pearland. Any US high school curriculum is fine — NEET is NCERT-based.',
  },
  {
    q: 'Do you help with the NRI quota for Indian MBBS admissions?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed consultants.',
  },
  {
    q: 'What does NEET coaching cost for Houston students?',
    a: 'Annual NRI tuition ranges roughly $4,800–$6,000 in the USA across Foundation / Comprehensive / Dropper tiers — see the regional pricing tiers below for the current USD amount plus a $/month equivalent. EMI plans available.',
  },
  {
    q: 'Where does NEET actually get taken from the US?',
    a: 'There is no NEET exam centre inside the United States. Most US candidates fly to Dubai or India to sit NEET-UG. We help enrolled students plan NEET registration, exam-city selection, and travel.',
  },
  {
    q: 'How do I book a free demo from Houston?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default async function Page() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-houston-usa"
        pageTitle="NEET Coaching in Houston, USA"
        pageDescription="Online NEET Biology coaching for Indian-American students in Houston metro. AP Biology + NEET dual prep, CST/CDT live classes, NRI quota MBBS guidance."
        pageType="coaching"
        coordinates={{ lat: '29.7604', lng: '-95.3698' }}
        faqs={houstonFaqs}
        skipCourseList
      />
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
