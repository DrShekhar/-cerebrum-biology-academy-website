import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Doha'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Doha Indian students',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'NEET Coaching in Doha, Qatar | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian students in Doha. AIIMS-led faculty, AST-friendly live classes, Doha NEET exam centre. Book free demo.',
  openGraph: {
    title: 'NEET Coaching in Doha, Qatar — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Doha. AST live classes; Doha exam centre on site.',
    url: `${BASE_URL}/neet-coaching-doha-qatar`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_QA',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Doha, Qatar',
    description: 'Online NEET Biology coaching for Doha students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-doha-qatar`,
    languages: {
      'en-QA': `${BASE_URL}/neet-coaching-doha-qatar`,
      'en-IN': `${BASE_URL}/neet-coaching-doha-qatar`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Doha?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in Qatar. Classes run on AST (UTC+3) — after Doha school hours — and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Doha students?',
    a: 'Live weekday classes run 5:00–7:30 PM AST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Is NEET exam conducted in Doha?',
    a: 'Yes. Doha is one of the 14 official NTA overseas NEET exam centres. Qatar-based candidates can sit NEET-UG locally without travelling to India or another GCC country.',
  },
  {
    q: 'Which schools in Doha do you support?',
    a: "MES Indian School Doha (~9k+ students), DPS Modern Indian School Doha, Bhavan's Public School Qatar, Ideal Indian School, Birla Public School, and all Indian-curriculum schools across Doha.",
  },
  {
    q: 'What makes Cerebrum different from local coaching in Doha?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for Qatar students.',
  },
  {
    q: 'What is the NEET coaching fee for Doha students?',
    a: 'Online batches start at roughly QAR 290/year and go up to ~QAR 2,300/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Which medical colleges can Doha students target?',
    a: 'Qualified NEET scorers can apply to Indian government medical colleges (via all-India quota) or NRI quota seats at eligible private medical colleges. Cut-offs vary by college and year.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services.',
  },
  {
    q: 'Can I attend a free demo class before enrolling?',
    a: 'Yes. WhatsApp +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default function NEETCoachingDohaPage() {
  return (
    <>
      <LocalitySchema
        locality="Doha"
        slug="neet-coaching-doha-qatar"
        pageTitle="Best NEET Coaching in Doha"
        pageDescription="Expert NEET coaching for Indian students in Doha serving DPS Doha and international schools."
        pageType="coaching"
        coordinates={{ lat: '25.2854', lng: '51.5310' }}
        faqs={faqs}
      />
      <PageContent />
    </>
  )
}
