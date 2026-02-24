import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Cairo'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Cairo | 98% Success Rate',
  description: 'Join #1 NEET coaching for Indian students in Cairo. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Serving Indian schools in Egypt.',
  keywords: [
    'NEET coaching Cairo',
    'biology tuition Cairo',
    'NEET classes Cairo',
    'best NEET tutor Cairo',
    'Indian NEET coaching Egypt',
    'online NEET preparation Cairo',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Cairo | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Cairo. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-cairo-egypt`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Cairo | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Cairo. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-cairo-egypt` },
}

const faqs = [
  { q: 'Can Indian students in Cairo prepare for NEET?', a: 'Yes! Many Indian families in Cairo need NEET coaching. Our online classes are timezone-friendly with AIIMS faculty access for Cairo students.' },
  { q: 'What are class timings for Cairo students?', a: 'Egypt is UTC+2, just 3.5 hours behind IST. Classes scheduled at convenient evening times for Cairo students after school.' },
  { q: 'Which Indian schools in Cairo do you support?', a: 'Delhi Public School Cairo, Bharatiya Vidya Bhavan, Modern Indian School, Future International, and all CBSE schools in Egypt.' },
  { q: 'How does online NEET coaching work from Cairo?', a: 'Live interactive classes with AIIMS faculty via video. Includes structured curriculum, daily practice, WhatsApp support, and weekly assessments.' },
  { q: 'What is the fee for students in Cairo?', a: 'NEET coaching at \u20b924,000-\u20b948,000/year (approx EGP 14,000-28,000). No need to relocate to India for quality coaching.' },
  { q: 'Do you support Egyptian board to NEET transition?', a: 'Yes! We help students from Thanaweya Amma or IGCSE background transition to NEET with our bridge curriculum.' },
  { q: 'Why choose Cerebrum over Kota coaching from Cairo?', a: 'Same AIIMS faculty and results (695/720 top score) as Kota—but online from Cairo without relocation cost and stress.' },
  { q: 'How can I book a free demo from Cairo?', a: 'WhatsApp 918826444334 to book your free demo class. Experience our teaching before enrolling.' },
]

export default function NEETCoachingCairoPage() {
  return (
    <>
      <LocalitySchema locality="Cairo" slug="neet-coaching-cairo-egypt" pageTitle="Best NEET Coaching in Cairo" pageDescription="Expert NEET coaching for Indian students in Cairo serving Indian schools with 98% success rate." pageType="coaching" coordinates={{ lat: "30.0444", lng: "31.2357" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
