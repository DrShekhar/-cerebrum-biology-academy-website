import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Salalah'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Salalah Indian students',
  locality: `${locality}, Oman`,
})

export const metadata: Metadata = {
  title: 'NEET Coaching in Salalah, Oman | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian students in Salalah, Oman. GST-friendly live classes, Muscat exam centre support, Class 9–12 and droppers.',
  openGraph: {
    title: 'NEET Coaching in Salalah, Oman — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Salalah. Timezone-friendly live classes; Muscat exam centre support.',
    url: `${BASE_URL}/neet-coaching-salalah-oman`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_OM',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Salalah — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Salalah, Oman',
    description: 'Online NEET Biology coaching for Salalah students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-salalah-oman`,
    languages: {
      'en-OM': `${BASE_URL}/neet-coaching-salalah-oman`,
      'en-IN': `${BASE_URL}/neet-coaching-salalah-oman`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for Salalah students?',
    a: 'Yes. Our live online NEET Biology batches are built for Indian students across the Gulf, including Salalah. Classes run in GST (UTC+4), so Salalah students attend after school hours, and all sessions are recorded for revision.',
  },
  {
    q: 'What are the class timings for Salalah students?',
    a: 'Live classes typically run 4:00–6:30 PM GST. Weekend doubt-clearing sessions are offered in addition. Every live class is recorded and available within a few hours of the session.',
  },
  {
    q: 'Where is the nearest NEET exam centre for Salalah students?',
    a: "Oman's NEET exam centre is in Muscat — roughly 1,000 km from Salalah. Most Salalah students fly to Muscat for NEET-UG. We help students plan registration, travel, and the exam-day schedule. Centre allocation is managed by the NTA and published each year.",
  },
  {
    q: 'Which schools in Salalah do you support?',
    a: 'We support Indian School Salalah students primarily, and also CBSE, ICSE, and IB students from other Salalah schools. Our Biology curriculum aligns with NCERT so it fits any Indian-board student regardless of school.',
  },
  {
    q: 'What does NEET coaching cost for Salalah students?',
    a: 'Online batches start at roughly OMR 25/year and go up to OMR 185/year, depending on the level of support. EMI plans are available. The pricing section below shows the current tiers.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'We guide students on the academic and procedural side of the 15% NRI quota at eligible Indian medical colleges — which colleges, typical NEET scores, and broad admission timeline. We do not provide visa, immigration, or legal services.',
  },
  {
    q: 'Does the khareef (monsoon) season affect Salalah classes?',
    a: 'No. Classes are fully online, so the khareef season and any local disruption to Salalah does not interrupt Biology prep. Recordings cover any live session missed due to travel.',
  },
  {
    q: 'Can I start in Grade 9 or 10 from Salalah?',
    a: 'Yes — our Grade 9–10 foundation batches build NCERT-aligned core concepts in Biology. Starting early makes the Class 11–12 NEET syllabus significantly easier.',
  },
]

export default function NEETCoachingSalalahPage() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-salalah-oman"
        pageTitle="NEET Coaching in Salalah, Oman"
        pageDescription="Online NEET Biology coaching for Indian students in Salalah, Oman. Live GST-friendly classes, Muscat exam centre support, NRI quota guidance."
        pageType="coaching"
        coordinates={{ lat: '17.0151', lng: '54.0924' }}
        faqs={faqs}
      />
      <PageContent faqs={faqs} />
    </>
  )
}
