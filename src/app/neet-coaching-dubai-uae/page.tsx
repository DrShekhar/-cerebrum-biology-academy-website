import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Dubai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes for Dubai Indian students',
  locality: `${locality}, UAE`,
})

export const metadata: Metadata = {
  title: 'NEET Coaching in Dubai, UAE | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian students in Dubai. AIIMS-led faculty, GST-friendly live classes, Dubai NEET exam centre. Class 9–12 + droppers. Book free demo.',
  openGraph: {
    title: 'NEET Coaching in Dubai, UAE — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Dubai. Timezone-friendly live classes; Dubai exam centre on site.',
    url: `${BASE_URL}/neet-coaching-dubai-uae`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in Dubai - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Dubai, UAE',
    description: 'Online NEET Biology coaching for Dubai students. Book free demo.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-dubai-uae`,
    languages: {
      'en-AE': `${BASE_URL}/neet-coaching-dubai-uae`,
      'en-IN': `${BASE_URL}/neet-coaching-dubai-uae`,
    },
  },
}

const faqs = [
  {
    q: 'Is online NEET coaching effective for students in Dubai?',
    a: 'Yes. Our live online NEET Biology batches are designed for Indian expat students in the UAE. Classes run on GST (UTC+4) — so Dubai students attend after school — and every session is recorded for revision.',
  },
  {
    q: 'What are the class timings for Dubai students?',
    a: 'Live weekday classes run 4:00–6:30 PM GST. Weekend doubt-clearing sessions are available on Saturday/Sunday. All sessions recorded.',
  },
  {
    q: 'Do you provide WhatsApp support for doubt clearing?',
    a: 'Yes — a WhatsApp line for enrolled students: +91-8826444334. Response times vary by day/time but typical replies are within the same session.',
  },
  {
    q: 'Which schools in Dubai do you support?',
    a: 'We support Indian-curriculum students from Indian High School Dubai, GEMS Our Own English High School, Delhi Private School Dubai, Gulf Indian High School, JSS International, DPS Dubai, Springdales, and all CBSE/ICSE/IB schools in Dubai.',
  },
  {
    q: 'Is NEET exam conducted in Dubai?',
    a: 'Yes. Dubai is one of the 14 official NTA overseas NEET exam centres. Sharjah and Abu Dhabi are the other UAE centres. We help enrolled students select the right city during registration.',
  },
  {
    q: 'What makes Cerebrum different from other coaching?',
    a: 'AIIMS-led Biology faculty (Dr. Shekhar C Singh, AIIMS alum), small live batches with recorded sessions, NCERT-aligned curriculum, and local-timezone class timings for UAE students.',
  },
  {
    q: 'What is the fee for NEET coaching?',
    a: 'Online batches start at roughly AED 280/year (Elixir plan) and go up to ~AED 2,250/year (Intensive plan), depending on the level of support. EMI plans are available. The pricing section below shows the current tiers.',
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

export default function NEETCoachingDubaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Dubai"
        slug="neet-coaching-dubai-uae"
        pageTitle="Best NEET Coaching in Dubai"
        pageDescription="Expert NEET coaching for Indian students in Dubai UAE with 98% success rate and timezone-friendly classes."
        pageType="coaching"
        coordinates={{ lat: '25.2048', lng: '55.2708' }}
        faqs={faqs}
      />
      <PageContent />
    </>
  )
}
