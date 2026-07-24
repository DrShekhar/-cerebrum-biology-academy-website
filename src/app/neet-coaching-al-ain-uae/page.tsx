import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Al Ain'
const city = NRI_INTERNATIONAL_CITIES['al-ain-uae']!

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Al Ain Indian students',
  locality: `${locality}, UAE`,
})

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Al Ain, UAE | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for ~100K Indian-origin Class 11-12 students in Al Ain (UAE's "Garden City", Abu Dhabi emirate inland oasis). Schools we serve: Our Own English High School (OOEHS) Al Ain, Al Ain Indian School (AIS), GEMS Wellington Academy, Choithram's Indian School, Glendale International School. GST 4-6:30 PM batch (after-school slot). Abu Dhabi NTA NEET exam centre (1.5-hour drive). NRI quota for AIIMS / JIPMER / Manipal. 98% success rate.`,
  keywords: [
    'NEET coaching Al Ain',
    'NEET coaching Al Ain UAE',
    'online NEET coaching Al Ain',
    'NEET tutor Al Ain',
    'Our Own English High School Al Ain NEET',
    'OOEHS Al Ain NEET',
    'Al Ain Indian School NEET',
    'AIS Al Ain NEET',
    'GEMS Wellington Al Ain NEET',
    'Choithram Indian School Al Ain NEET',
    'NRI quota AIIMS Al Ain',
    'biology tutor Al Ain',
    'Al Ain Garden City NEET',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
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
    a: 'Our online batches start at approximately AED 280/year and go up to ~AED 2,250/year, depending on the level of support. EMI plans are available. Exact pricing in AED is shown on our pricing section below.',
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

export default async function NEETCoachingAlAinPage() {
  return (
    <>
      <LocalitySchema
        country="AE"
        locality={locality}
        slug="neet-coaching-al-ain-uae"
        pageTitle="NEET Coaching in Al Ain, UAE"
        pageDescription="Online NEET Biology coaching for Indian students in Al Ain, UAE. Timezone-friendly live classes, Abu Dhabi exam centre support, NRI quota guidance."
        pageType="coaching"
        coordinates={{ lat: '24.2075', lng: '55.7447' }}
        faqs={faqs}
        skipCourseList
      />
      <PageContent faqs={faqs} />
      <NEETNRIPricingTiers />
    </>
  )
}
