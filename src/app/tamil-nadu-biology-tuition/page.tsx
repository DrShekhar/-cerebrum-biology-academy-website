import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'Tamil Nadu Biology Tuition',
  subtitle: 'Expert coaching with 98% success rate',
  locality: 'Chennai',
})

export const metadata: Metadata = {
  title: 'Best Tamil Nadu Biology Tuition Online | 98% Success Rate',
  description: 'Expert online biology tuition for Tamil Nadu State Board students preparing for NEET. AIIMS faculty, 98% success rate, small batches (10-15). Join 1,500+ students across Chennai, Coimbatore, Madurai, Vellore.',
  keywords: [
    'Tamil Nadu biology tuition',
    'Samacheer Kalvi biology coaching',
    'TN state board biology classes',
    'NEET preparation Tamil Nadu',
    'biology tuition Chennai',
    'online biology coaching Tamil Nadu',
    'TN board exam coaching',
    'NEET coaching for TN students',
  ],
  openGraph: {
    title: 'Best Tamil Nadu Biology Tuition Online | 98% Success Rate',
    description: 'Expert online biology tuition for Tamil Nadu State Board students preparing for NEET. AIIMS faculty, small batches, NEET focus. Join 1,500+ students!',
    url: `${BASE_URL}/tamil-nadu-biology-tuition`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: 'Tamil Nadu Biology Tuition - Cerebrum Biology Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Tamil Nadu Biology Tuition Online | 98% Success Rate',
    description: 'Expert online biology tuition for Tamil Nadu State Board students preparing for NEET. AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/tamil-nadu-biology-tuition` },
}

const faqs = [
  { q: 'Is Tamil Nadu State Board Biology syllabus aligned with NEET?', a: 'Tamil Nadu State Board Biology syllabus is approximately 70-75% aligned with NEET. The TN board follows Samacheer Kalvi curriculum with good coverage but gaps exist in Biotechnology Applications, detailed Ecology, and some Genetics topics. Our coaching bridges these gaps with NCERT integration.' },
  { q: 'Which cities in Tamil Nadu do you serve?', a: 'We serve students from all Tamil Nadu cities including Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tirunelveli, Erode, Vellore, and more through our online live classes accessible from anywhere in Tamil Nadu.' },
  { q: 'What is the fee for TN Board Biology + NEET coaching?', a: 'Our comprehensive TN Board + NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. This includes board exam preparation, NEET coaching, study materials, and unlimited doubt sessions with EMI options available.' },
  { q: 'Which medical colleges can Tamil Nadu students target?', a: 'With strong NEET scores, TN students can target Madras Medical College, Stanley Medical College, Kilpauk Medical College, Coimbatore Medical College, CMC Vellore, plus AIIMS, JIPMER Puducherry, and other all-India institutes.' },
  { q: 'Do you teach in Tamil medium?', a: 'We focus on English medium students whose syllabus aligns with CBSE/NCERT. Our teaching is in English to ensure NEET readiness. Students from English medium schools or those comfortable with English benefit most.' },
  { q: 'How do you cover the gap between TN Board and NEET syllabus?', a: 'We follow an integrated approach: Cover all Samacheer Kalvi syllabus for board scoring while adding NCERT-specific topics. Special modules for Biotechnology Applications, detailed Ecology, and advanced Genetics ensure complete NEET preparation.' },
  { q: 'What is the success rate for Tamil Nadu students?', a: 'Our success rate for TN Board Biology students is 98% with an average score of 358/720 in NEET. We have 58+ TN Board toppers in the last two years across all Tamil Nadu districts.' },
  { q: 'How can I enroll or get more information?', a: 'You can contact us via WhatsApp at 918826444334, call us at +91-88264-44334, or visit our website to book a free demo class. Our counselors will discuss your goals and customize a learning plan for you.' },
]

export default function TamilNaduBiologyTuitionPage() {
  return (
    <>
      <LocalitySchema locality="Chennai" slug="tamil-nadu-biology-tuition" pageTitle="Best Tamil Nadu Biology Tuition Online" pageDescription="Expert online biology tuition for Tamil Nadu State Board (Samacheer Kalvi) students preparing for NEET with AIIMS faculty and 98% success rate." pageType="coaching" coordinates={{ lat: "13.0827", lng: "80.2707" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
