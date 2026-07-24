import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'
import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Sharjah'
const city = NRI_INTERNATIONAL_CITIES['sharjah-uae']!

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Sharjah Indian students',
  locality: `${locality}, UAE`,
})

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Sharjah, UAE | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for ~700K Indian-origin Class 11-12 students in Sharjah (UAE's third-largest Indian community). Al Nahda / Al Majaz / Al Qasimia / Al Khan / Muweilah neighbourhoods. Schools we serve: DPS Sharjah, GEMS Millennium School, Indian School Al Khaleej, New Indian Model School, Sharjah Indian School. GST 4-6:30 PM batch (after-school slot). Sharjah NTA NEET exam centre (also serves Ajman/UAQ/Fujairah/RAK). NRI quota for AIIMS / JIPMER / Manipal. 98% success rate.`,
  keywords: [
    'NEET coaching Sharjah',
    'NEET coaching Sharjah UAE',
    'online NEET coaching Sharjah',
    'NEET tutor Sharjah',
    'DPS Sharjah NEET',
    'Delhi Private School Sharjah NEET',
    'GEMS Millennium School Sharjah NEET',
    'Indian School Al Khaleej NEET',
    'New Indian Model School Sharjah NEET',
    'NRI quota AIIMS Sharjah',
    'biology tutor Sharjah',
    'Al Nahda Sharjah NEET',
    'Al Majaz NEET',
    'Sharjah NEET exam centre',
    ...city.indianSchools.slice(0, 6).map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: 'NEET Coaching in Sharjah, UAE — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Sharjah. Timezone-friendly live classes; Sharjah exam centre on site.',
    url: `${BASE_URL}/neet-coaching-sharjah-uae`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in Sharjah - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Sharjah, UAE',
    description: 'Online NEET Biology coaching for Sharjah students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-sharjah-uae`,
    languages: {
      'en-AE': `${BASE_URL}/neet-coaching-sharjah-uae`,
      'en-IN': `${BASE_URL}/neet-coaching-sharjah-uae`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Sharjah?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in the UAE. Classes run on GST (UTC+4) — after Sharjah school hours — and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Sharjah students?',
    a: 'Live weekday classes run 4:00–6:30 PM GST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Do you provide WhatsApp support for doubt clearing?',
    a: 'Yes — a WhatsApp line for enrolled students: +91-8826444334. Typical replies come within the same session.',
  },
  {
    q: 'Which schools in Sharjah do you support?',
    a: 'We support Indian-curriculum students from Delhi Private School Sharjah (DPS), Our Own English High School Sharjah (GEMS), Indian School Sharjah (ISS), Scholars Indian School, Habitat School Al Jurf, ASPAM Indian International, and all CBSE/ICSE/IB schools in Sharjah.',
  },
  {
    q: 'Is NEET exam conducted in Sharjah?',
    a: 'Yes. Sharjah is one of the 14 official NTA overseas NEET exam centres. Dubai and Abu Dhabi are the other UAE centres. We help enrolled students select the right city during registration.',
  },
  {
    q: 'What makes Cerebrum different from other coaching?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for UAE students.',
  },
  {
    q: 'What is the fee for NEET coaching?',
    a: 'Online batches start at roughly AED 280/year and go up to ~AED 2,250/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you help with NRI quota MBBS admissions in India?',
    a: 'Yes — on the academic and procedural side. We explain which Indian colleges offer NRI seats, typical NEET cut-offs, and the admission timeline. We do not provide visa, immigration, or legal documentation services — those are handled by your family or licensed consultants.',
  },
  {
    q: 'Can I attend a free demo class?',
    a: 'Yes. WhatsApp +91-8826444334 or use the demo booking link on this page. A free demo runs 45–60 minutes with an AIIMS-led Biology faculty member.',
  },
]

export default async function NEETCoachingSharjahPage() {
  return (
    <>
      <LocalitySchema
        country="AE"
        locality="Sharjah"
        slug="neet-coaching-sharjah-uae"
        pageTitle="Best NEET Coaching in Sharjah"
        pageDescription="Expert NEET coaching for Indian students in Sharjah UAE with 98% success rate and timezone-friendly classes."
        pageType="coaching"
        coordinates={{ lat: '25.3462', lng: '55.4211' }}
        faqs={faqs}
        skipCourseList
      />
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
