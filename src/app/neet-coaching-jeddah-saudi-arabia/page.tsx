import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Jeddah'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Jeddah Indian students',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'NEET Coaching in Jeddah, Saudi Arabia | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian students in Jeddah. AIIMS-led faculty, AST-friendly live classes, GCC NEET exam centres. Book free demo.',
  openGraph: {
    title: 'NEET Coaching in Jeddah, Saudi Arabia — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Jeddah. AST live classes; Riyadh/GCC exam centres.',
    url: `${BASE_URL}/neet-coaching-jeddah-saudi-arabia`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_SA',
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
    title: 'NEET Coaching in Jeddah, Saudi Arabia',
    description: 'Online NEET Biology coaching for Jeddah students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-jeddah-saudi-arabia`,
    languages: {
      'en-SA': `${BASE_URL}/neet-coaching-jeddah-saudi-arabia`,
      'en-IN': `${BASE_URL}/neet-coaching-jeddah-saudi-arabia`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for Jeddah students?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in Saudi Arabia. Classes run on AST (UTC+3) — after school hours — and every session is recorded for revision.',
  },
  {
    q: 'What are class timings for Jeddah students?',
    a: 'Live weekday classes run 5:00–7:30 PM AST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Where does a Jeddah student sit NEET-UG?',
    a: 'The nearest official NTA centre is Riyadh (~950 km by road, short flight). NEET centre allocation is managed by the NTA and can change year to year; other GCC cities (Dubai, Sharjah, Abu Dhabi, Doha, Kuwait City, Muscat, Manama) are also available as options during registration.',
  },
  {
    q: 'Which schools in Jeddah do you support?',
    a: 'International Indian School Jeddah (IISJ, ~7k+ students), Jeddah Knowledge International, Indian Educational School Jeddah, Al Wurood International, and other CBSE-affiliated schools.',
  },
  {
    q: 'What makes Cerebrum different from other coaching?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for Saudi students.',
  },
  {
    q: 'What is the fee structure for Jeddah students?',
    a: 'Online batches start at roughly SAR 290/year (Elixir plan) and go up to ~SAR 2,300/year (Intensive plan), depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you cover Class 11 and 12 NEET syllabus?',
    a: 'Yes — Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) batches. All aligned with the latest NEET pattern.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services.',
  },
  {
    q: 'How can I book a free demo class from Jeddah?',
    a: 'WhatsApp +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default function NEETCoachingJeddahPage() {
  return (
    <>
      <LocalitySchema
        locality="Jeddah"
        slug="neet-coaching-jeddah-saudi-arabia"
        pageTitle="Best NEET Coaching in Jeddah"
        pageDescription="Expert NEET coaching for Indian students in Jeddah with 98% success rate and timezone-friendly online classes."
        pageType="coaching"
        coordinates={{ lat: '21.4858', lng: '39.1925' }}
        faqs={faqs}
      />
      <PageContent />
    </>
  )
}
