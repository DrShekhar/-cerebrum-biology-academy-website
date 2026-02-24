import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Navi Mumbai'
const city = 'Metro Area'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Navi Mumbai | 98% Success Rate',
  description:
    'Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty, 98% success rate. Kharghar, Vashi, Belapur, Palm Beach Road. Premium online coaching. Book free demo!',
  keywords: [
    'NEET coaching Navi Mumbai',
    'biology tuition Kharghar',
    'NEET classes Vashi',
    'best NEET tutor Belapur',
    'medical entrance Palm Beach Road',
    'NEET preparation Navi Mumbai',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Navi Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty, 98% success rate. Premium coaching for planned city. Book free demo!',
    url: `${BASE_URL}/neet-coaching-navi-mumbai`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Navi Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty. Premium planned city coaching. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-navi-mumbai`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Navi Mumbai?', a: 'Yes! Our online NEET coaching is specifically designed for Navi Mumbai students. With AIIMS faculty, 98% success rate, and personalized attention, students in Navi Mumbai achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for Navi Mumbai students?', a: 'We offer flexible morning, afternoon, and evening batches so Navi Mumbai students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. Navi Mumbai students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Navi Mumbai?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. Navi Mumbai students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Navi Mumbai students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Mumbai classroom coaching centers.' },
  { q: 'Which medical colleges can Navi Mumbai students target?', a: 'With strong NEET scores, Navi Mumbai students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why Navi Mumbai students choose Cerebrum.' },
]

export default function NEETCoachingNaviMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Navi Mumbai"
        slug="neet-coaching-navi-mumbai"
        pageTitle="Best NEET Coaching in Navi Mumbai"
        pageDescription="Join #1 NEET coaching in Navi Mumbai. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "19.0330", lng: "73.0297" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
