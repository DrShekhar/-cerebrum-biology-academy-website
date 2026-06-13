import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Riyadh'
const city = NRI_INTERNATIONAL_CITIES['riyadh-saudi-arabia']!

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Riyadh Indian students',
  locality: locality,
})

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Riyadh, Saudi Arabia | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Riyadh's 800K+ Indian-origin Class 11-12 students (Saudi Arabia's largest Indian concentration). Al Olaya / Al Malaz / Diplomatic Quarter / Al Rabwa / Al Khaleej. Flagship feeder: International Indian School Riyadh (IISR) with 13,000+ students — one of the world's largest schools. Also Bharatiya Vidya Bhavan Riyadh, Indian Embassy School, Al Yasmin International. AST 3-5:30 PM batch (after-IISR-dismissal slot). Ramadan schedule adjustments. Riyadh NTA NEET exam centre. NRI quota for AIIMS / JIPMER / Manipal. 98% success rate.`,
  keywords: [
    'NEET coaching Riyadh',
    'NEET coaching Saudi Arabia',
    'online NEET coaching Riyadh',
    'NEET tutor Riyadh',
    'International Indian School Riyadh NEET',
    'IISR NEET',
    'Bharatiya Vidya Bhavan Riyadh NEET',
    'Indian Embassy School Riyadh NEET',
    'NRI quota AIIMS Riyadh',
    'biology tutor Riyadh',
    'Al Olaya NEET',
    'Al Malaz NEET',
    'Riyadh NEET exam centre',
    'Ramadan NEET schedule Riyadh',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: 'NEET Coaching in Riyadh, Saudi Arabia — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Riyadh. AST live classes; Riyadh exam centre on site.',
    url: `${BASE_URL}/neet-coaching-riyadh-saudi-arabia`,
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
    title: 'NEET Coaching in Riyadh, Saudi Arabia',
    description: 'Online NEET Biology coaching for Riyadh students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-riyadh-saudi-arabia`,
    languages: {
      'en-SA': `${BASE_URL}/neet-coaching-riyadh-saudi-arabia`,
      'en-IN': `${BASE_URL}/neet-coaching-riyadh-saudi-arabia`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Riyadh?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in Saudi Arabia. Classes run on AST (UTC+3) — after school hours — and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Riyadh students?',
    a: 'Live weekday classes run 5:00–7:30 PM AST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Is NEET exam conducted in Riyadh?',
    a: 'Yes. Riyadh is one of the 14 official NTA overseas NEET exam centres. We help enrolled students plan registration and exam-day logistics.',
  },
  {
    q: 'Which schools in Riyadh do you support?',
    a: 'We support CBSE students from International Indian School Riyadh (IISR, ~5k students), Al Yasmin International School, Manarat Riyadh International School, Delhi Private School Riyadh, and other Indian-curriculum schools across Riyadh.',
  },
  {
    q: 'What makes Cerebrum different from other NEET coaching?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for Saudi students.',
  },
  {
    q: 'What is the fee for NEET coaching?',
    a: 'Online batches start at roughly SAR 290/year and go up to ~SAR 2,300/year, depending on the level of support. EMI plans are available.',
  },
  {
    q: 'Do you cover both Class 11 and Class 12 NEET syllabus?',
    a: 'Yes. Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) batches. All aligned with the latest NTA NEET pattern.',
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

export default async function NEETCoachingRiyadhPage() {
  return (
    <>
      <LocalitySchema
        country="SA"
        locality="Riyadh"
        slug="neet-coaching-riyadh-saudi-arabia"
        pageTitle="Best NEET Coaching in Riyadh"
        pageDescription="Expert NEET coaching for Indian students in Riyadh with 98% success rate and timezone-friendly online classes."
        pageType="coaching"
        coordinates={{ lat: '24.7136', lng: '46.6753' }}
        faqs={faqs}
        skipCourseList
      />
      <PageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
