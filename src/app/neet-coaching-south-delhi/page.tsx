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

// AggregateOffer Schema for bundle pricing
const aggregateOfferSchema = {
  '@context': 'https://schema.org',
  '@type': 'AggregateOffer',
  '@id': `${BASE_URL}/neet-coaching-south-delhi#offers`,
  priceCurrency: 'INR',
  lowPrice: CEREBRUM_METRICS.feeCrashCourse,
  highPrice: CEREBRUM_METRICS.feeClass11 + CEREBRUM_METRICS.feeClass12,
  offerCount: 4,
  offers: [
    {
      '@type': 'Offer',
      name: 'Class 11+12 Two-Year Program',
      price: CEREBRUM_METRICS.feeClass11 + CEREBRUM_METRICS.feeClass12,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
    },
    {
      '@type': 'Offer',
      name: 'Class 12 One-Year Intensive',
      price: CEREBRUM_METRICS.feeClass12,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
    },
    {
      '@type': 'Offer',
      name: 'Dropper Batch',
      price: CEREBRUM_METRICS.feeDropper,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
    },
    {
      '@type': 'Offer',
      name: 'Crash Course',
      price: CEREBRUM_METRICS.feeCrashCourse,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
    },
  ],
}

// Event Schema for Demo Classes
const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Free NEET Biology Demo Class - South Delhi',
  description: `Experience Cerebrum Biology Academy's teaching methodology. Free demo class for NEET aspirants from South Delhi. Meet Dr. Shekhar C Singh.`,
  startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  location: [
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: CEREBRUM_METRICS.mainAddress,
        addressLocality: 'South Delhi',
        addressRegion: 'Delhi',
        postalCode: CEREBRUM_METRICS.pincode,
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'VirtualLocation',
      url: `${BASE_URL}/demo-booking`,
    },
  ],
  performer: {
    '@type': 'Person',
    name: 'Dr. Shekhar C Singh',
    jobTitle: 'Founder & Lead Faculty',
  },
  organizer: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    url: BASE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: `${BASE_URL}/demo-booking`,
    validFrom: new Date().toISOString().split('T')[0],
  },
  image: `${BASE_URL}/logo.png`,
}

// HowTo Schema for enrollment
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Enroll in NEET Coaching in South Delhi',
  description: 'Step-by-step guide to enroll in Cerebrum Biology Academy for NEET preparation in South Delhi.',
  totalTime: 'P3D',
  estimatedCost: {
    '@type': 'MonetaryAmount',
    currency: 'INR',
    value: CEREBRUM_METRICS.feeClass12,
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Book Free Demo Class',
      text: `Book a free demo class via WhatsApp at ${CEREBRUM_METRICS.phoneDisplay} or fill the online form.`,
      url: `${BASE_URL}/demo-booking`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Attend Demo Session',
      text: 'Attend a 1-hour demo class with Dr. Shekhar C Singh. Experience our teaching methodology.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose Your Batch',
      text: 'Select batch timing - morning (8-10 AM), afternoon (2-4 PM), or evening (6-8 PM).',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Complete Enrollment',
      text: 'Submit documents and pay fees via UPI, bank transfer, or EMI. Scholarship up to 50% available.',
    },
  ],
}

// Speakable Schema for voice search
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/neet-coaching-south-delhi#webpage`,
  url: `${BASE_URL}/neet-coaching-south-delhi`,
  name: 'Best NEET Coaching in South Delhi | Cerebrum Biology Academy',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.hero-title', '.hero-description', '.quick-answers'],
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in South Delhi?', a: 'Yes! Our online NEET coaching is specifically designed for South Delhi students. With AIIMS faculty, 98% success rate, and personalized attention, students in South Delhi achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for South Delhi students?', a: 'We offer flexible morning, afternoon, and evening batches so South Delhi students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. South Delhi students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in South Delhi?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. South Delhi students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for South Delhi students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Delhi classroom coaching.' },
  { q: 'Which medical colleges can South Delhi students target?', a: 'With strong NEET scores, South Delhi students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingSouthDelhiPage() {
  return (
    <>
      {/* FAQPage Schema for Featured Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateOfferSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <LocalitySchema
        locality="South Delhi"
        slug="neet-coaching-south-delhi"
        pageTitle="Best NEET Coaching in South Delhi"
        pageDescription={`Join South Delhi's #1 NEET Biology coaching. Expert AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate, ${CEREBRUM_METRICS.topScoreText} top score. Hauz Khas, GK, Defence Colony, Vasant Vihar.`}
        pageType="coaching"
      coordinates={{ lat: "28.5355", lng: "77.2290" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
