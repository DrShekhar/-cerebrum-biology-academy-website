import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

export const metadata: Metadata = {
  title: 'NEET Coaching in Saket Delhi | Medical Entrance Biology',
  description:
    'Best NEET coaching for Saket, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections. Join comprehensive medical entrance preparation today.',
  keywords: [
    'neet coaching saket',
    'neet coaching saket delhi',
    'medical entrance coaching saket',
    'neet biology tutor saket',
    'neet preparation saket delhi',
    'best neet coaching south delhi',
    'online neet coaching delhi',
  ],
  openGraph: {
    title: 'NEET Coaching in Saket Delhi | Medical Entrance Biology',
    description:
      'Best NEET coaching for Saket, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-saket-delhi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-saket-delhi',
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Saket?', a: 'Yes! Our online NEET coaching is specifically designed for South Delhi students. With AIIMS faculty, 98% success rate, and personalized attention, students in Saket achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Saket students?', a: 'We offer flexible morning, afternoon, and evening batches so Saket students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Saket students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Saket?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Saket students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Saket students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Delhi classroom coaching.' },
  { q: 'Which medical colleges can Saket students target?', a: 'With strong NEET scores, Saket students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingSaketPage() {
  return (
    <>
      <LocalitySchema
        locality="Saket"
        slug="neet-coaching-saket-delhi"
        pageTitle="NEET Coaching in Saket Delhi"
        pageDescription="Best NEET coaching for Saket, Delhi students. AIIMS alumnus Dr. Shekhar C Singh offers online NEET biology coaching with 500+ selections."
        pageType="coaching"
      coordinates={{ lat: "28.5244", lng: "77.2066" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
