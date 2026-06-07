import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Kuwait City'
const city = NRI_INTERNATIONAL_CITIES['kuwait-city']!

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Kuwait City Indian students',
  locality: `${locality}, Kuwait`,
})

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Kuwait City | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for ~1M Indian-origin Class 11-12 students in Kuwait (largest Gulf Indian community at 21% of population). Salmiya, Hawalli, Farwaniya, Mahboula, Mangaf, Abbasiya. Feeder schools: Indian Community School Kuwait (ICSK), Indian Public School (IPS), Gulf Indian School. AST 3-5:30 PM batch. Kuwait City NTA NEET exam centre on-site. NRI quota for AIIMS / JIPMER / Manipal. 98% success rate.`,
  keywords: [
    'NEET coaching Kuwait',
    'NEET coaching Kuwait City',
    'online NEET coaching Kuwait',
    'NEET tutor Kuwait City',
    'Indian Community School Kuwait NEET',
    'ICSK NEET',
    'Indian Public School Kuwait NEET',
    'IPS Kuwait NEET',
    'Gulf Indian School Kuwait NEET',
    'NRI quota AIIMS Kuwait',
    'biology tutor Kuwait',
    'Salmiya NEET coaching',
    'Hawalli NEET coaching',
    'Kuwait NEET exam centre',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: 'NEET Coaching in Kuwait City — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Kuwait City. AST live classes; Kuwait City exam centre on site.',
    url: `${BASE_URL}/neet-coaching-kuwait-city`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_KW',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in Kuwait City - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Kuwait City',
    description: 'Online NEET Biology coaching for Kuwait City students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-kuwait-city`,
    languages: {
      'en-KW': `${BASE_URL}/neet-coaching-kuwait-city`,
      'en-IN': `${BASE_URL}/neet-coaching-kuwait-city`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Kuwait City?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in Kuwait. Classes run on AST (UTC+3) — after Kuwait school hours — and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Kuwait City students?',
    a: 'Live weekday classes run 5:00–7:30 PM AST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Is NEET exam conducted in Kuwait City?',
    a: 'Yes. Kuwait City is one of the 14 official NTA overseas NEET exam centres. Kuwait-based candidates can sit NEET-UG locally without travelling to India or another GCC country.',
  },
  {
    q: 'Which schools in Kuwait City do you support?',
    a: "We support CBSE and ICSE students from Indian Central School (ICSK Khaitan / ICSK Salmiya Senior), Indian Community School Kuwait, Carmel School, Don Bosco English School, Bhavan's SIS Kuwait, Jabriya Indian School, United Indian School and all Indian-curriculum schools across Kuwait.",
  },
  {
    q: 'What makes Cerebrum different from other coaching?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for Kuwait students.',
  },
  {
    q: 'What is the fee for NEET coaching?',
    a: 'Online batches start at roughly KWD 22/year and go up to ~KWD 180/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services.',
  },
  {
    q: 'Can I attend a free demo class?',
    a: 'Yes. WhatsApp +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default function NEETCoachingKuwaitCityPage() {
  return (
    <>
      <LocalitySchema
        locality="Kuwait City"
        slug="neet-coaching-kuwait-city"
        pageTitle="Best NEET Coaching in Kuwait City"
        pageDescription="Expert NEET coaching for Indian students in Kuwait City Kuwait with 98% success rate and timezone-friendly classes."
        pageType="coaching"
        coordinates={{ lat: '29.3759', lng: '47.9774' }}
        faqs={faqs}
      />
      <PageContent />
    </>
  )
}
