import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'South Delhi'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: "South Delhi's #1 NEET Institute",
  locality: locality,
})

export const metadata: Metadata = {
  title: `Best NEET Coaching in South Delhi | ${CEREBRUM_METRICS.successRateText} Success Rate | Cerebrum Academy`,
  description: `Join South Delhi's #1 NEET Biology coaching. Hauz Khas, GK, Defence Colony, Vasant Vihar. Expert AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate, ${CEREBRUM_METRICS.topScoreText} top score. Book free demo!`,
  keywords: [
    'NEET coaching South Delhi',
    'best NEET biology coaching South Delhi',
    'NEET classes South Delhi',
    'medical entrance coaching South Delhi',
    'NEET preparation Hauz Khas',
    'NEET coaching Greater Kailash',
    'biology coaching South Delhi',
  ],
  openGraph: {
    title: `Best NEET Coaching in South Delhi | ${CEREBRUM_METRICS.successRateText} Success Rate | Cerebrum Academy`,
    description: `Join South Delhi's #1 NEET Biology coaching. Expert AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate. Hauz Khas, GK, Defence Colony, Vasant Vihar. Book free demo!`,
    url: `${BASE_URL}/neet-coaching-south-delhi`,
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
    title: `Best NEET Coaching in South Delhi | ${CEREBRUM_METRICS.successRateText} Success Rate`,
    description: `Join South Delhi's #1 NEET Biology coaching. Expert AIIMS faculty. Book free demo!`,
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-south-delhi`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const faqs = [
  {
    question: 'Which is the best NEET coaching in South Delhi?',
    answer: `Cerebrum Biology Academy is rated among the top NEET coaching institutes in South Delhi with ${CEREBRUM_METRICS.successRateText} success rate. We have expert AIIMS faculty, comprehensive study material, and proven track record with students from GK, Defence Colony, Vasant Vihar, and Hauz Khas.`,
  },
  {
    question: 'Is there NEET coaching near Hauz Khas Metro?',
    answer:
      'Yes! Our South Delhi center is easily accessible from Hauz Khas Metro. We provide online classes for students across South Delhi including Kalu Sarai, Green Park, and Malviya Nagar areas.',
  },
  {
    question: 'What is the fee for NEET coaching in South Delhi?',
    answer: `Our comprehensive NEET biology course fee is ₹${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 11-12. We offer EMI options and scholarship up to 50% for deserving students. Contact us for detailed fee structure.`,
  },
  {
    question: 'Do you provide coaching for students from DPS RK Puram?',
    answer:
      'Absolutely! We have many students from DPS RK Puram, DPS Vasant Vihar, Modern School, and Vasant Valley. Our timings are designed to complement school schedules.',
  },
  {
    question: 'Is online NEET coaching available for South Delhi students?',
    answer:
      'Yes! We offer both online and hybrid modes for South Delhi students. Live interactive classes, recorded lectures, and personal mentoring - all accessible from home.',
  },
  {
    question: 'How far is Cerebrum Biology Academy from Defence Colony?',
    answer:
      'Our South Extension center is approximately 3-4 km from Defence Colony, a 10-15 minute drive or 20-minute metro ride via Yellow Line (Lajpat Nagar Metro).',
  },
  {
    question: 'What is the batch size for NEET Biology coaching at Cerebrum?',
    answer: `We maintain small batches of maximum ${CEREBRUM_METRICS.batchSizeText} to ensure personalized attention. This personalized approach has resulted in our ${CEREBRUM_METRICS.successRateText} NEET success rate.`,
  },
  {
    question: 'Do you provide hybrid mode (online + offline) NEET coaching?',
    answer:
      'Yes! We offer flexible hybrid mode for South Delhi students. Attend classes offline at our South Extension center on weekends and join online live classes during weekdays.',
  },
  {
    question: 'What is the success rate at Cerebrum Biology Academy?',
    answer: `${CEREBRUM_METRICS.successRateText} of students who complete our full program and appear for NEET-UG qualify with All India Rank under 50,000. Our top score is ${CEREBRUM_METRICS.topScoreText} in NEET Biology.`,
  },
  {
    question: 'How does Cerebrum compare to other NEET coaching in Hauz Khas area?',
    answer: `Unlike large coaching institutes with 50-100 students per batch, Cerebrum has ${CEREBRUM_METRICS.batchSizeText} per batch. We achieve ${CEREBRUM_METRICS.successRateText} success rate vs 60-70% industry average, with AIIMS-trained faculty and personalized attention.`,
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function NEETCoachingSouthDelhiPage() {
  return (
    <>
      {/* FAQPage Schema for Featured Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LocalitySchema
        locality="South Delhi"
        slug="neet-coaching-south-delhi"
        pageTitle="Best NEET Coaching in South Delhi"
        pageDescription={`Join South Delhi's #1 NEET Biology coaching. Expert AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate, ${CEREBRUM_METRICS.topScoreText} top score. Hauz Khas, GK, Defence Colony, Vasant Vihar.`}
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
