import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Bahrain'
const city = NRI_INTERNATIONAL_CITIES['bahrain']!

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Bahrain Indian students',
  locality: `Manama, ${locality}`,
})

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Bahrain (Manama) | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for ~350K Indian-origin Class 11-12 students in Bahrain (25% of population). Manama, Muharraq, Riffa, Saar, Janabiyah. Schools we serve: Indian School Bahrain (ISB), New Indian School Bahrain, Asian School Bahrain. AST 3-5:30 PM batch (after-school slot). Manama NTA NEET exam centre on-site. NRI quota for AIIMS / JIPMER / Manipal / KMC. 98% success rate.`,
  keywords: [
    'NEET coaching Bahrain',
    'NEET coaching Manama',
    'online NEET coaching Bahrain',
    'NEET tutor Bahrain',
    'Indian School Bahrain NEET',
    'ISB NEET',
    'New Indian School Bahrain NEET',
    'Asian School Bahrain NEET',
    'NRI quota AIIMS Bahrain',
    'biology tutor Manama',
    'Manama NEET exam centre',
    'Bahrain Malayali Tamil Punjabi NEET',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
  openGraph: {
    title: 'NEET Coaching in Bahrain (Manama) — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Bahrain. AST live classes; Manama exam centre on site.',
    url: `${BASE_URL}/neet-coaching-bahrain`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_BH',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in Bahrain - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Bahrain (Manama)',
    description: 'Online NEET Biology coaching for Bahrain students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bahrain`,
    languages: {
      'en-BH': `${BASE_URL}/neet-coaching-bahrain`,
      'en-IN': `${BASE_URL}/neet-coaching-bahrain`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Bahrain?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in Bahrain. Classes run on AST (UTC+3) — after Bahrain school hours — and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Bahrain students?',
    a: 'Live weekday classes run 4:00–6:30 PM AST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Is NEET exam conducted in Bahrain?',
    a: 'Yes. Manama is one of the 14 official NTA overseas NEET exam centres. Bahrain-based candidates can sit NEET-UG locally without travelling to India or another GCC country.',
  },
  {
    q: 'Which schools in Bahrain do you support?',
    a: 'We support CBSE and ICSE students from Indian School Bahrain (ISB, 12k+ students — one of the largest Indian schools in the Gulf), New Indian School, Asian School Bahrain, Bahrain Indian School, and all Indian-curriculum schools across Manama and Riffa.',
  },
  {
    q: 'What makes Cerebrum different from other coaching?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for Bahrain students.',
  },
  {
    q: 'What is the fee for NEET coaching?',
    a: 'Online batches start at roughly BHD 28/year and go up to ~BHD 225/year, depending on the level of support. EMI plans are available.',
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

export default function NEETCoachingBahrainPage() {
  return (
    <>
      <LocalitySchema
        country="BH"
        locality="Bahrain"
        slug="neet-coaching-bahrain"
        pageTitle="Best NEET Coaching in Bahrain"
        pageDescription="Expert NEET coaching for Indian students in Bahrain Bahrain with 98% success rate and timezone-friendly classes."
        pageType="coaching"
        coordinates={{ lat: '26.0667', lng: '50.5577' }}
        faqs={faqs}
      />
      <PageContent />
    </>
  )
}
