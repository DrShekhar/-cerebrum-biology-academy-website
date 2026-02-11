import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Jeddah'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Jeddah | 98% Success Rate | Cerebrum',
  description: 'Join #1 NEET coaching for Indian students in Jeddah. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Timezone-friendly online classes.',
  keywords: [
    'NEET coaching Jeddah',
    'biology tuition Jeddah',
    'NEET classes Jeddah',
    'best NEET tutor Jeddah',
    'Indian NEET coaching Saudi Arabia',
    'online NEET preparation Jeddah',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Jeddah | 98% Success Rate | Cerebrum',
    description: 'Join #1 NEET coaching for Indian students in Jeddah. Expert AIIMS faculty. Book free demo!',
    url: `${BASE_URL}/neet-coaching-jeddah-saudi-arabia`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?${ogImageParams.toString()}`, width: 1200, height: 630, alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Jeddah | 98% Success Rate',
    description: 'Join #1 NEET coaching for Indian students in Jeddah. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: { canonical: `${BASE_URL}/neet-coaching-jeddah-saudi-arabia` },
}

const faqs = [
  { q: 'Is online NEET coaching effective for Jeddah students?', a: 'Yes! Our online coaching is designed for Indian expat students in Jeddah. 98% success rate with Saudi timezone-friendly live AIIMS faculty sessions.' },
  { q: 'What are class timings for Jeddah students?', a: 'Classes scheduled for Saudi Arabia timezone (AST, UTC+3). Students attend live sessions at convenient times without school conflicts.' },
  { q: 'Do you provide WhatsApp support for Jeddah students?', a: 'Yes! 24/7 WhatsApp doubt clearing on 918826444334. Faculty responds within minutes. Video calls available for complex topics.' },
  { q: 'Which schools in Jeddah do you support?', a: 'International Indian School Jeddah, Jeddah Knowledge International, Al Waha International, Dar Al Fikr Schools, and all CBSE-affiliated schools.' },
  { q: 'How is Cerebrum better than local coaching in Jeddah?', a: 'AIIMS-qualified faculty, NEET-specific curriculum, 695/720 top score record, personalized study plans—unmatched by local Jeddah coaching.' },
  { q: 'What is the fee structure for Jeddah students?', a: 'World-class NEET coaching at \u20b924,000-\u20b948,000 per year. Much more affordable than Kota with zero relocation costs.' },
  { q: 'Do you cover Class 11 and 12 NEET syllabus?', a: 'Yes—Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NEET pattern.' },
  { q: 'How can I book a free demo class from Jeddah?', a: 'WhatsApp 918826444334 to book a free demo class. Experience our AIIMS faculty teaching methodology before enrolling.' },
]

export default function NEETCoachingJeddahPage() {
  return (
    <>
      <LocalitySchema locality="Jeddah" slug="neet-coaching-jeddah-saudi-arabia" pageTitle="Best NEET Coaching in Jeddah" pageDescription="Expert NEET coaching for Indian students in Jeddah with 98% success rate and timezone-friendly online classes." pageType="coaching" coordinates={{ lat: "21.4858", lng: "39.1925" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
