import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Thiruvananthapuram'
const slug = 'neet-coaching-thiruvananthapuram'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate`,
  description: `Top NEET Biology coaching in ${locality}, Kerala. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: [
    'NEET coaching Thiruvananthapuram',
    'online NEET classes Thiruvananthapuram',
    'biology tuition Thiruvananthapuram',
    'NEET preparation Thiruvananthapuram Kerala',
    'best biology coaching Thiruvananthapuram',
    'NEET tutor Thiruvananthapuram',
    'medical entrance coaching Thiruvananthapuram',
    'NEET online classes Kerala',
  ],
  openGraph: {
    title: `Best NEET Coaching in ${locality}`,
    description: `Top NEET Biology coaching in ${locality}. AIIMS faculty, 98% success rate.`,
    url: `${BASE_URL}/${slug}`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality}` }],
  },
  twitter: { card: 'summary_large_image', title: `Best NEET Coaching in ${locality}`, description: `Top NEET Biology coaching in ${locality}. AIIMS faculty, 98% success rate.`, images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`] },
  alternates: { canonical: `${BASE_URL}/${slug}` },
}

const faqs = [
  { q: 'Is Thiruvananthapuram good for NEET preparation?', a: 'Yes! With Cerebrum Biology Academy, Thiruvananthapuram students access AIIMS-trained faculty, small batches, and 98% success rate online.' },
  { q: 'Do you serve Kazhakkoottam and Technopark areas?', a: 'We serve all Thiruvananthapuram areas including Kazhakkoottam, Technopark, Vazhuthacaud, Kowdiar, Pattom, Kesavadasapuram through live online classes.' },
  { q: 'How does Kerala state board align with NEET?', a: 'Our NCERT-focused approach bridges any gaps between Kerala state board and NEET syllabus. Full alignment with NEET requirements.' },
  { q: 'What is the fee structure for Thiruvananthapuram students?', a: 'Plans start at Rs 24,000/year for Foundation, Rs 36,000 for Comprehensive, Rs 48,000 for Intensive. EMI options available.' },
  { q: 'Which medical colleges can Thiruvananthapuram students target?', a: 'Thiruvananthapuram Medical College, AIIMS, Govt. Medical College Kottayam, Amrita, plus all-India medical colleges.' },
  { q: 'Do you offer Malayalam medium support?', a: 'Our classes are in English with support materials. Malayalam medium students receive additional concept explanations and terminology bridges.' },
  { q: 'What schools do your Thiruvananthapuram students come from?', a: 'Students from Loyola School, Holy Angels ISC, Christ Nagar, Kendriya Vidyalaya, Chinmaya Vidyalaya, and other premier Thiruvananthapuram institutions.' },
  { q: 'Is there a free demo class available?', a: 'Yes, book a free demo via WhatsApp at 8826444334. Experience our AIIMS-trained faculty teaching methodology before enrolling.' },
]

export default function NEETCoachingThiruvananthapuramPage() {
  return (
    <>
      <LocalitySchema locality="Thiruvananthapuram" slug={slug} pageTitle="Best NEET Coaching in Thiruvananthapuram" pageDescription="Top NEET Biology coaching in Thiruvananthapuram, Kerala with AIIMS faculty and 98% success rate." pageType="coaching" coordinates={{ lat: "8.5241", lng: "76.9366" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
