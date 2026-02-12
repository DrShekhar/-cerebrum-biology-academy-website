import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'NEET Coaching in CR Park Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for CR Park (Chittaranjan Park), Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 67+ AIIMS selections. Join today.',
  keywords: [
    'neet coaching cr park',
    'neet coaching chittaranjan park delhi',
    'medical entrance coaching cr park',
    'neet biology tutor cr park',
    'neet preparation cr park delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in CR Park Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for CR Park (Chittaranjan Park), Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 67+ AIIMS selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-cr-park-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-cr-park-delhi',
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in CR Park?', a: 'Yes! Our online NEET coaching is specifically designed for South Delhi students. With AIIMS faculty, 98% success rate, and personalized attention, students in CR Park achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for CR Park students?', a: 'We offer flexible morning, afternoon, and evening batches so CR Park students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. CR Park students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in CR Park?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. CR Park students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for CR Park students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Delhi classroom coaching.' },
  { q: 'Which medical colleges can CR Park students target?', a: 'With strong NEET scores, CR Park students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingCRParkPage() {
  return (
    <>
      <LocalitySchema
        locality="CR Park"
        slug="neet-coaching-cr-park-delhi"
        pageTitle="NEET Coaching in CR Park Delhi"
        pageDescription="Best NEET coaching for CR Park (Chittaranjan Park), Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 67+ AIIMS selections."
        pageType="coaching"
      coordinates={{ lat: "28.5395", lng: "77.2474" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
