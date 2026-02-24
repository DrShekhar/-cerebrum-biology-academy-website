import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Nagpur'
const slug = 'neet-coaching-nagpur'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate`,
  description: `Top NEET Biology coaching in ${locality}, Maharashtra. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: [
    'NEET coaching Nagpur',
    'online NEET classes Nagpur',
    'biology tuition Nagpur',
    'NEET preparation Nagpur Maharashtra',
    'best biology coaching Nagpur',
    'NEET tutor Nagpur',
    'medical entrance coaching Nagpur',
    'NEET online classes Maharashtra',
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
  { q: 'Is Nagpur good for NEET preparation?', a: 'Yes! With Cerebrum Biology Academy, Nagpur students get AIIMS-trained faculty, personalized attention, and 98% success rate without leaving the city.' },
  { q: 'Do you have centers in Dharampeth/Sadar?', a: 'We offer online live classes accessible from Dharampeth, Sadar, Civil Lines, and all Nagpur areas. Same quality coaching, zero commute.' },
  { q: 'How is Maharashtra board integration done?', a: 'Our coaching bridges Maharashtra State Board and NEET syllabus gaps. NCERT-focused approach covers 100% of NEET requirements.' },
  { q: 'What is the mentoring approach?', a: 'Each student gets a dedicated mentor for weekly progress reviews, personalized study plans, and one-on-one doubt clearing sessions.' },
  { q: 'How many mock tests are conducted?', a: 'We conduct 50+ full-length NEET mock tests, 100+ chapter-wise tests, and daily practice quizzes with detailed performance analytics.' },
  { q: 'Which medical colleges can Nagpur students target?', a: 'GMC Nagpur, AIIMS Nagpur, Indira Gandhi GMC, MGIMS Wardha, plus top all-India medical colleges through strong NEET scores.' },
  { q: 'What schools do Nagpur NEET students come from?', a: "Our Nagpur students attend Centre Point School, Bhavan's B.P. Vidya Mandir, Somalwar Nikalas, Sandipani School, Delhi Public School Nagpur, and other premier institutions." },
  { q: 'Do you cover Maharashtra state board for NEET?', a: 'Yes, our NCERT-based curriculum fully aligns with NEET requirements. Maharashtra board students get additional bridging support for any syllabus differences.' },
]

export default function NEETCoachingNagpurPage() {
  return (
    <>
      <LocalitySchema locality="Nagpur" slug={slug} pageTitle="Best NEET Coaching in Nagpur" pageDescription="Top NEET Biology coaching in Nagpur, Maharashtra with AIIMS faculty and 98% success rate." pageType="coaching" coordinates={{ lat: "21.1458", lng: "79.0882" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
