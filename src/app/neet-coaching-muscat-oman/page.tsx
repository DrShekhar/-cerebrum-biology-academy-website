import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Muscat'
const city = NRI_INTERNATIONAL_CITIES['muscat-oman']!

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Muscat Indian students',
  locality: locality,
})

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Muscat, Oman | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for ~700K Indian-origin Class 11-12 students in Oman (16% of population). Muscat (Ruwi, Mutrah, Wadi Kabir, Al Khoud, Bousher, Al Ghubra, Qurum). Schools we serve: Indian School Muscat (Wadi Kabir), Indian School Al Ghubra, Indian School Al Wadi Al Kabir, Indian School Bousher. GST 4-6:30 PM batch (after-school slot). Muscat NTA NEET exam centre on-site. NRI quota for AIIMS / JIPMER / Manipal. 98% success rate.`,
  keywords: [
    'NEET coaching Muscat',
    'NEET coaching Oman',
    'online NEET coaching Muscat',
    'NEET tutor Muscat',
    'Indian School Muscat NEET',
    'Indian School Wadi Kabir NEET',
    'Indian School Al Ghubra NEET',
    'Indian School AWK NEET',
    'Indian School Bousher NEET',
    'NRI quota AIIMS Muscat',
    'biology tutor Muscat',
    'Ruwi NEET coaching',
    'Wadi Kabir NEET coaching',
    'Al Ghubra NEET',
    'Muscat NEET exam centre',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: 'NEET Coaching in Muscat, Oman — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Muscat. GST live classes; Muscat exam centre on site.',
    url: `${BASE_URL}/neet-coaching-muscat-oman`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_OM',
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
    title: 'NEET Coaching in Muscat, Oman',
    description: 'Online NEET Biology coaching for Muscat students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-muscat-oman`,
    languages: {
      'en-OM': `${BASE_URL}/neet-coaching-muscat-oman`,
      'en-IN': `${BASE_URL}/neet-coaching-muscat-oman`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Muscat?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in Oman. Classes run on GST (UTC+4) — after Muscat school hours — and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Muscat students?',
    a: 'Live weekday classes run 4:00–6:30 PM GST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Is NEET exam conducted in Muscat?',
    a: 'Yes. Muscat is one of the 14 official NTA overseas NEET exam centres. Oman-based candidates can sit NEET-UG locally without travelling to India or another GCC country.',
  },
  {
    q: 'Which schools in Muscat do you support?',
    a: 'We support CBSE students from Indian School Muscat (ISM, 7k+), Indian School Al Ghubra, Indian School Darsait, Indian School Al Maabela, and all 21 schools in the Indian Schools in Oman network.',
  },
  {
    q: 'What makes Cerebrum different from local coaching in Muscat?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for Oman students.',
  },
  {
    q: 'What is the NEET coaching fee for Muscat students?',
    a: 'Online batches start at roughly OMR 25/year and go up to ~OMR 185/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Which medical colleges can Muscat students target?',
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

export default async function NEETCoachingMuscatPage() {
  return (
    <>
      <LocalitySchema
        country="OM"
        locality="Muscat"
        slug="neet-coaching-muscat-oman"
        pageTitle="Best NEET Coaching in Muscat"
        pageDescription="Expert NEET coaching for Indian students in Muscat serving Indian schools in Oman."
        pageType="coaching"
        coordinates={{ lat: '23.5880', lng: '58.3829' }}
        faqs={faqs}
        skipCourseList
      />
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
