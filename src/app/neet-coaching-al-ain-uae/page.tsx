import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Al Ain'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Al Ain Indian students',
  locality: `${locality}, UAE`,
})

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Ain, UAE | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Al Ain students. Abu Dhabi NEET exam centre 140 km away. GST-friendly live classes, AIIMS-led faculty. Book free demo.',
  openGraph: {
    title: 'NEET Coaching in Al Ain, UAE — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Al Ain. Timezone-friendly live classes; Abu Dhabi exam centre support.',
    url: `${BASE_URL}/neet-coaching-al-ain-uae`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Al Ain — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Al Ain, UAE',
    description: 'Online NEET Biology coaching for Al Ain students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-al-ain-uae`,
    languages: {
      'en-AE': `${BASE_URL}/neet-coaching-al-ain-uae`,
      'en-IN': `${BASE_URL}/neet-coaching-al-ain-uae`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Al Ain?',
    a: 'Yes. Our online NEET Biology batches are designed for Indian expat students in the UAE. Live classes run on GST (UTC+4), so Al Ain students attend after school hours, and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Al Ain students?',
    a: 'Live classes typically run 4:00–6:30 PM GST, with weekend doubt-clearing sessions. All classes are recorded so students who miss a session due to school or travel can catch up the same day.',
  },
  {
    q: 'Where is the nearest NEET exam centre for Al Ain students?',
    a: 'The closest official NTA NEET exam centre for Al Ain residents is Abu Dhabi — roughly 140 km and 1.5 hours by road. Dubai and Sharjah are the other UAE centres. We help students with the NEET city selection during registration and plan exam-day travel.',
  },
  {
    q: 'Which schools in Al Ain do you support?',
    a: 'We support Indian-curriculum students from Al Ain Indian School and students on the CBSE, ICSE, and IB boards from other Al Ain schools. Students who commute to Abu Dhabi Indian School or schools in neighbouring emirates also join our batches.',
  },
  {
    q: 'What does NEET coaching cost for Al Ain students?',
    a: 'Our online batches start at approximately AED 280/year (Elixir plan) and go up to ~AED 2,250/year (Intensive plan), depending on the level of support. EMI plans are available. Exact pricing in AED is shown on our pricing section below.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'Yes — for academic preparation and guidance on the NRI quota pathway in Indian medical colleges. We help you understand which colleges offer NRI seats, typical NEET scores required, and the broad admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your school, family, or licensed consultants.',
  },
  {
    q: 'Can I start NEET prep in Grade 9 or 10 from Al Ain?',
    a: 'Yes — Grades 9–10 foundation batches build NCERT-aligned core concepts in Biology before the intensive Class 11–12 syllabus. Early starters typically find NEET Biology much easier by Class 12.',
  },
  {
    q: 'How do I book a free demo class?',
    a: 'WhatsApp us on +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with Dr. Shekhar C Singh or a senior Biology faculty member.',
  },
]

export default function NEETCoachingAlAinPage() {
  return (
    <>
      <LocalitySchema
        locality={locality}
        slug="neet-coaching-al-ain-uae"
        pageTitle="NEET Coaching in Al Ain, UAE"
        pageDescription="Online NEET Biology coaching for Indian students in Al Ain, UAE. Timezone-friendly live classes, Abu Dhabi exam centre support, NRI quota guidance."
        pageType="coaching"
        coordinates={{ lat: '24.2075', lng: '55.7447' }}
        faqs={faqs}
      />
      <PageContent faqs={faqs} />
    </>
  )
}
