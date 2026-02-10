import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'Telangana Inter Biology Coaching',
  subtitle: 'Expert coaching with 94.2% success rate',
  locality: 'Hyderabad',
})

export const metadata: Metadata = {
  title: 'Best Telangana Inter Biology Coaching Online | 94.2% Success Rate | Cerebrum',
  description: 'Expert online biology coaching for Telangana Intermediate (TSBIE) students preparing for NEET. AIIMS faculty, 94.2% success rate, small batches (10-15). Join 1,600+ students across Hyderabad, Secunderabad, Warangal.',
  keywords: [
    'Telangana Inter biology coaching',
    'TSBIE biology classes online',
    'Telangana intermediate coaching',
    'NEET preparation Telangana',
    'biology tuition Hyderabad',
    'online biology coaching Telangana',
    'Inter board exam coaching',
    'NEET coaching for Inter students',
  ],
  openGraph: {
    title: 'Best Telangana Inter Biology Coaching Online | 94.2% Success Rate',
    description: 'Expert online biology coaching for Telangana Inter (TSBIE) students preparing for NEET. AIIMS faculty, small batches, NEET focus. Join 1,600+ students!',
    url: `${BASE_URL}/telangana-inter-biology-coaching`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: 'Telangana Inter Biology Coaching - Cerebrum Biology Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Telangana Inter Biology Coaching Online | 94.2% Success Rate',
    description: 'Expert online biology coaching for Telangana Inter students preparing for NEET. AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/telangana-inter-biology-coaching` },
}

const faqs = [
  { q: 'Is Telangana Inter Biology syllabus aligned with NEET?', a: 'Telangana Intermediate (TSBIE) Biology syllabus is approximately 75-80% aligned with NEET. Gaps exist in Biotechnology Applications, detailed Ecology, and some advanced Genetics topics. Our coaching bridges these gaps with NCERT integration.' },
  { q: 'Which cities in Telangana do you serve?', a: 'We serve students from all Telangana cities including Hyderabad, Secunderabad, Warangal, Nizamabad, Karimnagar, Khammam, Rangareddy, and more through our online live classes accessible from anywhere in Telangana.' },
  { q: 'What is the fee for Inter Biology + NEET coaching?', a: 'Our comprehensive Inter + NEET Biology coaching ranges from Rs 24,000 to Rs 68,000 per year. This includes board exam preparation, NEET coaching, study materials, and unlimited doubt sessions with EMI options available.' },
  { q: 'Which medical colleges can Telangana students target?', a: 'With strong NEET scores, Telangana students can target Osmania Medical College, Gandhi Medical College, Kakatiya Medical College Warangal, Nizam\'s Institute of Medical Sciences, plus AIIMS, JIPMER, and other all-India institutes.' },
  { q: 'Do you teach in Telugu medium?', a: 'We focus on English medium students whose syllabus aligns with CBSE/NCERT. Our teaching is in English to ensure NEET readiness. Students from English medium junior colleges or those comfortable with English benefit most.' },
  { q: 'How is your coaching different from Hyderabad coaching centers?', a: 'Unlike crowded coaching centers with 100+ students per batch, we limit to 10-15 students for personalized attention. Our online format saves 2-3 hours daily commute. Same AIIMS faculty, better attention, flexible timings.' },
  { q: 'What is the success rate for Telangana Inter students?', a: 'Our success rate for Telangana Inter Biology students is 94.2% with an average score of 358/720 in NEET. We have 62+ Inter toppers in the last two years across all Telangana districts.' },
  { q: 'Can I get a demo class before enrolling?', a: 'Yes! Contact us on WhatsApp at 918826444334 or call +91-88264-44334 to book your free demo class. Experience our AIIMS faculty teaching and methodology before committing.' },
]

export default function TelanganaInterBiologyCoachingPage() {
  return (
    <>
      <LocalitySchema locality="Hyderabad" slug="telangana-inter-biology-coaching" pageTitle="Best Telangana Inter Biology Coaching Online" pageDescription="Expert online biology coaching for Telangana Intermediate (TSBIE) students preparing for NEET with AIIMS faculty and 94.2% success rate." pageType="coaching" coordinates={{ lat: "17.3850", lng: "78.4867" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
