import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'Karnataka PUC Biology Coaching',
  subtitle: 'Expert coaching with 94.2% success rate',
  locality: 'Bangalore',
})

export const metadata: Metadata = {
  title: 'Best Karnataka PUC Biology Coaching Online | 94.2% Success Rate | Cerebrum',
  description: 'Expert online biology coaching for Karnataka PUC students preparing for NEET. AIIMS faculty, 94.2% success rate, small batches (10-15). Join 1,400+ students across Karnataka cities like Bangalore, Mysore, Mangalore.',
  keywords: [
    'Karnataka PUC biology coaching',
    'PUC biology tuition online',
    'KSEEB biology coaching',
    'Karnataka NEET preparation',
    'PUC biology classes Bangalore',
    'online biology tuition Karnataka',
    'PUC board exam coaching',
    'NEET coaching for PUC students',
  ],
  openGraph: {
    title: 'Best Karnataka PUC Biology Coaching Online | 94.2% Success Rate',
    description: 'Expert online biology coaching for Karnataka PUC students. AIIMS faculty, small batches, NEET focus. Join 1,400+ students!',
    url: `${BASE_URL}/karnataka-puc-biology-coaching`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: 'Karnataka PUC Biology Coaching - Cerebrum Biology Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Karnataka PUC Biology Coaching Online | 94.2% Success Rate',
    description: 'Expert online biology coaching for Karnataka PUC students preparing for NEET. AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/karnataka-puc-biology-coaching` },
}

const faqs = [
  { q: 'Is Karnataka PUC Biology syllabus aligned with NEET?', a: 'Karnataka PUC (KSEEB) Biology syllabus is approximately 75-80% aligned with NEET. Gaps exist in Biotechnology Applications, Ecology details, and some Genetics topics. Our coaching bridges these gaps with NCERT integration.' },
  { q: 'Which cities in Karnataka do you serve?', a: 'We serve students from all Karnataka cities including Bangalore, Mysore, Mangalore, Hubli-Dharwad, Belgaum, Gulbarga, Davangere, Shimoga, and more through our online live classes accessible from anywhere in Karnataka.' },
  { q: 'What is the fee for PUC Biology + NEET coaching?', a: 'Our comprehensive PUC + NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. This includes board exam preparation, NEET coaching, study materials, and unlimited doubt sessions with EMI options available.' },
  { q: 'How do you cover the gap between PUC and NEET syllabus?', a: 'We follow an integrated approach: Cover all PUC syllabus for board scoring while adding NCERT-specific topics. Special modules for Biotechnology Applications, detailed Ecology, and advanced Genetics ensure complete NEET preparation.' },
  { q: 'Which medical colleges can Karnataka students target?', a: 'With strong NEET scores, Karnataka students can target Bangalore Medical College, Mysore Medical College, Kasturba Medical College Manipal, St. Johns Medical College, plus AIIMS, JIPMER, and other all-India institutes.' },
  { q: 'Do you offer coaching in Kannada medium?', a: 'We focus on English medium students whose syllabus aligns with CBSE/NCERT. Our teaching is in English to ensure NEET readiness. Students from English medium PUC colleges benefit most from our program.' },
  { q: 'What is the success rate for Karnataka PUC students?', a: 'Our success rate for PUC Biology students is 94.2% with an average score of 358/720 in NEET. We have 52+ PUC toppers in the last two years across all Karnataka districts.' },
  { q: 'Can I join mid-year if I start coaching later?', a: 'Yes! We have batch starts every month. Our curriculum is designed to accommodate mid-year joiners with accelerated sessions to cover missed topics. Contact us to discuss your timeline.' },
]

export default function KarnatakaPUCBiologyCoachingPage() {
  return (
    <>
      <LocalitySchema locality="Bangalore" slug="karnataka-puc-biology-coaching" pageTitle="Best Karnataka PUC Biology Coaching Online" pageDescription="Expert online biology coaching for Karnataka PUC students preparing for NEET with AIIMS faculty and 94.2% success rate." pageType="coaching" coordinates={{ lat: "12.9716", lng: "77.5946" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
