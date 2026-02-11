import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'CBSE Abroad NEET Preparation',
  subtitle: 'Online NEET coaching for NRI students worldwide',
})

export const metadata: Metadata = {
  title: 'CBSE Abroad Students NEET Preparation | Online NEET Coaching | Cerebrum Academy',
  description:
    'Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, comprehensive preparation, 98% success rate.',
  keywords: [
    'CBSE abroad NEET',
    'NRI NEET preparation',
    'CBSE international NEET coaching',
    'online NEET for abroad students',
    'NEET coaching overseas',
    'international NEET students',
  ],
  openGraph: {
    title: 'CBSE Abroad Students NEET Preparation | Online NEET Coaching | Cerebrum Academy',
    description:
      'Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, comprehensive preparation, 98% success rate.',
    url: `${BASE_URL}/cbse-abroad-neet-preparation`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'CBSE Abroad Students NEET Preparation - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CBSE Abroad Students NEET Preparation | Online NEET Coaching',
    description:
      'Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, 98% success rate.',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/cbse-abroad-neet-preparation`,
  },
}

const faqs = [
  { q: 'Can CBSE students studying abroad appear for NEET?', a: 'Yes! Indian citizens studying in CBSE-affiliated schools abroad are eligible for NEET. We help students from Gulf countries, Southeast Asia, Africa, and other regions prepare effectively.' },
  { q: 'How do you handle timezone differences for CBSE abroad students?', a: 'We offer multiple batch timings to cover all major timezone zones: Gulf (UTC+3/4), Southeast Asia (UTC+5:30-8), Africa (UTC+0-3). Recorded lectures available for catch-up.' },
  { q: 'Which countries do your CBSE abroad students come from?', a: 'We serve students from UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain, Singapore, Thailand, Kenya, Nigeria, Egypt, and many more countries with CBSE schools.' },
  { q: 'Is the CBSE curriculum abroad different for NEET?', a: 'CBSE curriculum is standardized globally, so NEET syllabus coverage is the same. However, abroad students may miss competitive exposure. Our coaching bridges this gap with mock tests and competition practice.' },
  { q: 'Do you provide study material for CBSE abroad students?', a: 'Yes! Complete digital study material, NCERT solutions, mock test series, previous year papers, and recorded lectures accessible from anywhere in the world.' },
  { q: 'What is the fee for CBSE abroad NEET coaching?', a: 'Same as India pricing: Foundation Rs 24,000/year, Comprehensive Rs 36,000/year, Intensive Rs 48,000/year. Payment in INR or equivalent currency. EMI available.' },
  { q: 'When should CBSE abroad students start NEET preparation?', a: 'Ideally from Class 11 with our Foundation course. Class 12 students should start immediately with Comprehensive course. Droppers can join our Intensive year-long program.' },
  { q: 'How do CBSE abroad students attend doubt clearing sessions?', a: 'WhatsApp support 24/7 on +91-8826444334, live post-class doubt sessions, scheduled one-on-one mentoring, and recorded explanations. Works across all timezones.' },
]

export default function CBSEAbroadNEETPage() {
  return (
    <>
      <LocalitySchema
        locality="Online"
        slug="cbse-abroad-neet-preparation"
        pageTitle="CBSE Abroad Students NEET Preparation"
        pageDescription="Expert NEET coaching for CBSE students studying abroad. Timezone-friendly classes, comprehensive preparation, 98% success rate."
        pageType="coaching"
      faqs={faqs} />
      <PageContent />
    </>
  )
}
