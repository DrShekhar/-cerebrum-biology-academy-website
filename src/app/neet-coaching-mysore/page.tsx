import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Mysore'
const slug = 'neet-coaching-mysore'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate | Cerebrum`,
  description: `Top NEET Biology coaching in ${locality}, Karnataka. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: ['NEET coaching Mysore', 'biology tuition Mysore', 'best NEET classes Mysore', 'NEET preparation Mysore Karnataka'],
  openGraph: {
    title: `Best NEET Coaching in ${locality} | Cerebrum`,
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
  { q: 'Is online NEET coaching effective for students in Mysore?', a: 'Yes! Our online NEET coaching is specifically designed for Mysore students. With AIIMS faculty, 98% success rate, and personalized attention, students in Mysore achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Mysore students?', a: 'We offer flexible morning, afternoon, and evening batches so Mysore students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Mysore students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Mysore?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Mysore students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Mysore students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Mysore classroom coaching.' },
  { q: 'Which medical colleges can Mysore students target?', a: 'With strong NEET scores, Mysore students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingMysorePage() {
  return (
    <>
      <LocalitySchema locality="Mysore" slug={slug} pageTitle="Best NEET Coaching in Mysore" pageDescription="Top NEET Biology coaching in Mysore, Karnataka with AIIMS faculty and 98% success rate." pageType="coaching" coordinates={{ lat: "12.2958", lng: "76.6394" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
