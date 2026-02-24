import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Lahore'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET & MDCAT Coaching in Lahore | 98% Success Rate',
  description: 'Join #1 NEET and MDCAT coaching for Indian and Pakistani students in Lahore. Expert AIIMS faculty, proven 98% success rate, 695/720 top score.',
  keywords: [
    'NEET coaching Lahore',
    'MDCAT coaching Lahore',
    'biology tuition Lahore',
    'NEET and MDCAT together',
    'Indian NEET coaching Pakistan',
    'online NEET preparation Lahore',
  ],
  openGraph: {
    title: 'Best NEET & MDCAT Coaching in Lahore | 98% Success Rate',
    description: 'Join #1 NEET and MDCAT coaching for Lahore students. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-lahore-pakistan`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET & MDCAT Coaching in Lahore | 98% Success Rate',
    description: 'Join #1 NEET and MDCAT coaching for Lahore students. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-lahore-pakistan` },
}

const faqs = [
  { q: 'Can Lahore students prepare for both NEET and MDCAT?', a: 'Yes! Our coaching covers both Indian NEET and Pakistan MDCAT biology. The overlapping content gives Lahore students dual preparation advantage.' },
  { q: 'What are class timings for Lahore students?', a: 'Pakistan Standard Time (UTC+5) is just 30 minutes behind IST. Classes are perfectly timed for Lahore students.' },
  { q: 'Which schools in Lahore do you support?', a: 'Lahore Grammar School, Aitchison College, Beaconhouse, City School, Lahore American School, and all O-Level/A-Level/Matric schools.' },
  { q: 'How does NEET coaching help MDCAT students?', a: 'NEET and MDCAT share significant biology overlap. Our structured coaching covers both patterns for competitive edge.' },
  { q: 'What is the fee for Lahore students?', a: 'NEET coaching at \u20b924,000-\u20b948,000/year (approx PKR 85,000-170,000). Premium coaching at fraction of India relocation cost.' },
  { q: 'Is WhatsApp support available 24/7?', a: 'Yes! Instant WhatsApp doubt clearing on 918826444334. Faculty responds within minutes with video calls for complex topics.' },
  { q: 'Why is Cerebrum better than local Lahore coaching?', a: 'AIIMS faculty, NEET-specific curriculum, 695/720 top score, 98% success rate—unmatched by any local coaching in Lahore.' },
  { q: 'How do I start from Lahore?', a: 'WhatsApp 918826444334 for a free demo class. We create personalized study plans for NEET/MDCAT preparation.' },
]

export default function NEETCoachingLahorePage() {
  return (
    <>
      <LocalitySchema locality="Lahore" slug="neet-coaching-lahore-pakistan" pageTitle="Best NEET & MDCAT Coaching in Lahore" pageDescription="Expert NEET and MDCAT coaching for students in Lahore with 98% success rate." pageType="coaching" coordinates={{ lat: "31.5204", lng: "74.3587" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
