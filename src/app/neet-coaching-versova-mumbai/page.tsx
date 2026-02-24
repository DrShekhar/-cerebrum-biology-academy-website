import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Versova'
const city = 'Mumbai'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: `${locality}, ${city}`,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Versova Mumbai | 98% Success Rate',
  description:
    'Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty, 98% success rate. Four Bungalows, Lokhandwala area. Book free demo!',
  keywords: [
    'NEET coaching Versova',
    'biology tuition Versova',
    'NEET classes Andheri West',
    'best NEET tutor Four Bungalows',
    'medical entrance Lokhandwala',
    'NEET preparation Versova',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Versova Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty, 98% success rate. Book free demo!',
    url: `${BASE_URL}/neet-coaching-versova-mumbai`,
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
    title: 'Best NEET Coaching in Versova Mumbai | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-versova-mumbai`,
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Versova?', a: 'Yes! Our online NEET coaching is specifically designed for Andheri West students. With AIIMS faculty, 98% success rate, and personalized attention, students in Versova achieve excellent results without needing to travel to coaching hubs.' },
  { q: 'What are the class timings for Versova students?', a: 'We offer flexible morning, afternoon, and evening batches so Versova students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support is available on +91-8826444334. Our AIIMS faculty responds within minutes. Versova students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Versova?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ in local classes), 695/720 top score, 98% success rate, and structured NCERT-focused approach. Versova students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Versova students?', a: 'Our plans: Foundation (Class 11) at Rs 24,000/year, Comprehensive (Class 12) at Rs 36,000/year, Intensive (Dropper) at Rs 48,000/year. EMI available. Much more affordable than Mumbai classroom coaching centers.' },
  { q: 'Which medical colleges can Versova students target?', a: 'With strong NEET scores, Versova students can target AIIMS Delhi, JIPMER Puducherry, LHMC Delhi, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology and see why Versova students choose Cerebrum.' },
]

export default function NEETCoachingVersovaMumbaiPage() {
  return (
    <>
      <LocalitySchema
        locality="Versova"
        slug="neet-coaching-versova-mumbai"
        pageTitle="Best NEET Coaching in Versova"
        pageDescription="Join #1 NEET coaching in Versova, Andheri West. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      coordinates={{ lat: "19.1310", lng: "72.8140" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
