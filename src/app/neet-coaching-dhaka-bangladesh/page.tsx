import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Dhaka'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dhaka | 98% Success Rate',
  description: 'Join #1 NEET coaching for Indian students in Dhaka. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Specialized for medical entrance prep.',
  keywords: [
    'NEET coaching Dhaka',
    'biology tuition Dhaka',
    'NEET classes Dhaka',
    'medical entrance coaching Dhaka',
    'Indian NEET coaching Bangladesh',
    'online NEET preparation Dhaka',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Dhaka | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Dhaka. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-dhaka-bangladesh`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Dhaka | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Dhaka. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-dhaka-bangladesh` },
}

const faqs = [
  { q: 'Can students from Dhaka prepare for Indian NEET?', a: 'Absolutely! Many Bangladeshi students with Indian connections or CBSE background appear for NEET. Our online coaching provides top-tier preparation from Dhaka.' },
  { q: 'What are class timings for Dhaka students?', a: 'Bangladesh Standard Time (UTC+6) is only 30 minutes ahead of IST, making timing extremely convenient for Dhaka students.' },
  { q: 'Do you support CBSE students in Dhaka?', a: 'Yes! We support Delhi Public School Dhaka, Indian High Commission School, Scholastica, and all CBSE/international schools in Dhaka.' },
  { q: 'How does Cerebrum help with NEET from Bangladesh?', a: 'AIIMS faculty provides structured Biology coaching online—live classes, daily practice, WhatsApp support, and regular mock tests from Dhaka.' },
  { q: 'What is the fee for Dhaka students?', a: 'NEET coaching at \u20b924,000-\u20b948,000/year (approx 29,000-58,000 BDT). Much cheaper than relocating to India for coaching.' },
  { q: 'Is WhatsApp support available for Dhaka students?', a: 'Yes! 24/7 WhatsApp doubt clearing on 918826444334. Faculty responds within minutes for all biology doubts.' },
  { q: 'How is this better than coaching in Dhaka?', a: 'Unlike local coaching, Cerebrum offers AIIMS faculty, NEET-specific NTA-aligned curriculum, 695/720 top score record, and 98% success rate.' },
  { q: 'Can I get a free demo class from Dhaka?', a: 'Yes! Book via WhatsApp at 918826444334. Experience live AIIMS faculty teaching before any commitment.' },
]

export default function NEETCoachingDhakaPage() {
  return (
    <>
      <LocalitySchema locality="Dhaka" slug="neet-coaching-dhaka-bangladesh" pageTitle="Best NEET Coaching in Dhaka" pageDescription="Expert NEET coaching for Indian students in Dhaka with 98% success rate and medical entrance focus." pageType="coaching" coordinates={{ lat: "23.8103", lng: "90.4125" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
