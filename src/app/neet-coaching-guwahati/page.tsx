import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Guwahati'
const slug = 'neet-coaching-guwahati'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in ${locality} | 98% Success Rate`,
  description: `Top NEET Biology coaching in ${locality}, Assam. AIIMS faculty, 98% success rate, 695/720 top score. Online + offline batches.`,
  keywords: ['NEET coaching Guwahati', 'biology tuition Guwahati', 'best NEET classes Guwahati', 'NEET preparation Guwahati Assam'],
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
  { q: 'Is online NEET coaching effective for students in Guwahati?', a: 'Yes! Our online NEET coaching is specifically designed for Guwahati students. With AIIMS faculty, 98% success rate, and personalized attention, students in Guwahati achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Guwahati students?', a: 'We offer flexible morning, afternoon, and evening batches so Guwahati students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Guwahati students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Guwahati?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Guwahati students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Guwahati students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Guwahati classroom coaching.' },
  { q: 'Which medical colleges can Guwahati students target?', a: 'With strong NEET scores, Guwahati students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingGuwahatiPage() {
  return (
    <>
      <LocalitySchema locality="Guwahati" slug={slug} pageTitle="Best NEET Coaching in Guwahati" pageDescription="Top NEET Biology coaching in Guwahati, Assam with AIIMS faculty and 98% success rate." pageType="coaching" coordinates={{ lat: "26.1445", lng: "91.7362" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
