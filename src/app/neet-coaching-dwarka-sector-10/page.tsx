import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Dwarka Sector 10'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: "Dwarka Sector 10's Trusted NEET Institute",
  locality: locality,
})

export const metadata: Metadata = {
  title: 'NEET Coaching Dwarka Sector 10 | Biology Classes | Cerebrum Academy',
  description: `Best NEET coaching for Dwarka Sector 10, Delhi students. 25-30 min from Rohini via Blue Line + interchange. Online classes available! AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate. WhatsApp 88264-44334!`,
  keywords: [
    'NEET coaching dwarka sector 10',
    'biology tuition dwarka delhi',
    'NEET coaching Dwarka Sector 10 Delhi',
    'biology classes Dwarka Sector 10',
    'best NEET biology coaching Dwarka',
    'NEET preparation Dwarka Delhi',
    'medical entrance coaching Dwarka',
    'biology teacher Dwarka Sector 10',
    'online NEET classes Dwarka',
    'NEET coaching near Dwarka metro',
    'biology tuition dwarka sector 10',
    'NEET classes Dwarka Delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Dwarka Sector 10 | Biology Classes | Cerebrum Academy',
    description: `Best NEET coaching for Dwarka Sector 10, Delhi. Online + Offline classes. AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate. WhatsApp 88264-44334!`,
    url: `${BASE_URL}/neet-coaching-dwarka-sector-10`,
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
    title: `NEET Coaching Dwarka Sector 10 | ${CEREBRUM_METRICS.successRateText} Success Rate`,
    description: `Best NEET Biology coaching for Dwarka Sector 10. Online classes available! AIIMS faculty. WhatsApp 88264-44334!`,
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-dwarka-sector-10`,
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
    question: 'Which is the best NEET coaching for Dwarka Sector 10 students?',
    answer: `Cerebrum Biology Academy is rated among the top NEET coaching institutes for Dwarka Sector 10 students with ${CEREBRUM_METRICS.successRateText} success rate. Our Rohini DC Chauk center is accessible via Blue Line Metro (Dwarka Sector 10 to Rajiv Chowk, then Yellow Line to Rohini West - total 25-30 minutes). We also offer online classes for students who prefer studying from home. AIIMS-trained faculty and proven track record with students from Dwarka.`,
  },
  {
    question: 'How do Dwarka Sector 10 students reach Cerebrum Biology Academy?',
    answer:
      'Dwarka Sector 10 is connected to our Rohini DC Chauk center via Delhi Metro. Take Blue Line from Dwarka Sector 10 to Rajiv Chowk (interchange), then Yellow Line to Rohini West (total 25-30 minutes). Alternatively, join our popular online classes with live interactive sessions - many Dwarka students prefer this option for convenience.',
  },
  {
    question: 'Is online NEET coaching available for Dwarka Sector 10 students?',
    answer:
      'Yes! We offer comprehensive online NEET coaching for Dwarka Sector 10 students. Live interactive classes with Dr. Shekhar Suman, recorded lectures for revision, daily doubt sessions, weekly tests, and complete study material - all accessible from home. Many Dwarka families prefer our hybrid mode combining weekend offline classes with weekday online sessions.',
  },
  {
    question: 'What is the fee for NEET coaching for Dwarka Sector 10 students?',
    answer: `Our comprehensive NEET biology course fee is Rs ${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 11-12 students. We offer EMI options and scholarships up to 50% for deserving students. Online and offline fees are the same. Contact us at 88264-44334 for detailed fee structure.`,
  },
  {
    question: 'Do you have students from Dwarka Sector 10 and nearby sectors?',
    answer:
      'Yes! We have 85+ students from Dwarka including Sector 10, Sector 6, Sector 7, Sector 11, Sector 12, and Sector 21. Many students from premium societies like DDA Flats, CGHS societies, and private apartments trust Cerebrum for their NEET preparation. Our hybrid mode is especially popular with Dwarka families.',
  },
  {
    question: 'What are the batch timings for Dwarka students?',
    answer: `We offer Morning (8 AM - 10 AM), Afternoon (2 PM - 4 PM), and Evening (6 PM - 8 PM) batches. Weekend-only batches (Saturday-Sunday) are popular among Dwarka students. Online live classes are available in all time slots with recorded backup for revision.`,
  },
  {
    question: 'Why should Dwarka students choose Cerebrum over local coaching?',
    answer: `Unlike generic coaching centers in Dwarka, Cerebrum offers specialized NEET Biology coaching with AIIMS-trained faculty, ${CEREBRUM_METRICS.successRateText} success rate, and top score of ${CEREBRUM_METRICS.topScoreText}. Our small batches of ${CEREBRUM_METRICS.batchSizeText} ensure personal attention. Plus, online classes mean no travel hassle for Dwarka students!`,
  },
  {
    question: 'How is the online class quality at Cerebrum?',
    answer:
      'Our online classes feature live interactive sessions (not just recorded videos), real-time doubt solving, digital whiteboard explanations, weekly online tests with detailed analysis, and 24/7 access to recorded lectures. Many students score 650+ in NEET through our online program alone.',
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
  '@id': `${BASE_URL}/neet-coaching-dwarka-sector-10#offers`,
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
  name: 'Free NEET Biology Demo Class - For Dwarka Sector 10 Students',
  description: `Experience Cerebrum Biology Academy's teaching methodology. Free demo class for NEET aspirants from Dwarka Sector 10. Meet Dr. Shekhar Suman. Available online or at Rohini center.`,
  startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  location: [
    {
      '@type': 'Place',
      name: 'Cerebrum Biology Academy - Rohini Center',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini',
        addressLocality: 'Delhi',
        addressRegion: 'Delhi',
        postalCode: '110085',
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
    name: 'Dr. Shekhar Suman',
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
  name: 'How to Enroll in NEET Coaching for Dwarka Sector 10 Students',
  description:
    'Step-by-step guide to enroll in Cerebrum Biology Academy for NEET preparation - Dwarka Sector 10 students via Metro or Online.',
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
      text: `Book a free demo class via WhatsApp at ${CEREBRUM_METRICS.phoneDisplay} or fill the online form. Mention you are from Dwarka Sector 10. Choose online or offline demo.`,
      url: `${BASE_URL}/demo-booking`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Attend Demo Session',
      text: 'Attend a 1-hour demo class online from home OR visit our Rohini center (Blue Line to Rajiv Chowk + Yellow Line to Rohini West).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose Your Mode & Batch',
      text: 'Select Online, Offline, or Hybrid mode. Choose batch timing - morning, afternoon, evening, or weekend batches.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Complete Enrollment',
      text: 'Submit documents and pay fees via UPI, bank transfer, or EMI. Scholarship up to 50% available for meritorious students.',
    },
  ],
}

// Speakable Schema for voice search
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/neet-coaching-dwarka-sector-10#webpage`,
  url: `${BASE_URL}/neet-coaching-dwarka-sector-10`,
  name: 'Best NEET Coaching in Dwarka Sector 10 | Cerebrum Biology Academy',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.hero-title', '.hero-description', '.quick-answers', '.speakable-intro', '.online-highlight'],
  },
}

// Local Business Schema for Dwarka Sector 10 area
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE_URL}/neet-coaching-dwarka-sector-10#business`,
  name: 'Cerebrum Biology Academy - NEET Coaching for Dwarka Sector 10',
  description: `Best NEET Biology coaching for Dwarka Sector 10, Delhi students. Online + Offline classes available. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. 25-30 min from Rohini via Metro.`,
  url: `${BASE_URL}/neet-coaching-dwarka-sector-10`,
  telephone: CEREBRUM_METRICS.phone,
  email: CEREBRUM_METRICS.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9, Rohini',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    postalCode: '110085',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.7041,
    longitude: 77.1025,
  },
  areaServed: [
    {
      '@type': 'Place',
      name: 'Dwarka Sector 10',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dwarka',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'Place',
      name: 'Dwarka Sector 6',
    },
    {
      '@type': 'Place',
      name: 'Dwarka Sector 7',
    },
    {
      '@type': 'Place',
      name: 'Dwarka Sector 11',
    },
    {
      '@type': 'Place',
      name: 'Dwarka Sector 12',
    },
    {
      '@type': 'Place',
      name: 'Dwarka Sector 21',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: CEREBRUM_METRICS.reviewCount.toString(),
  },
  priceRange: 'Rs 25,000 - Rs 75,000',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '09:00',
      closes: '17:00',
    },
  ],
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in Dwarka Sector 10?', a: 'Yes! Our online NEET coaching is specifically designed for West Delhi students. With AIIMS faculty, 98% success rate, and personalized attention, students in Dwarka Sector 10 achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Dwarka Sector 10 students?', a: 'We offer flexible morning, afternoon, and evening batches so Dwarka Sector 10 students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Dwarka Sector 10 students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Dwarka Sector 10?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Dwarka Sector 10 students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Dwarka Sector 10 students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Delhi classroom coaching.' },
  { q: 'Which medical colleges can Dwarka Sector 10 students target?', a: 'With strong NEET scores, Dwarka Sector 10 students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingDwarkaSector10Page() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LocalitySchema
        locality="Dwarka Sector 10 Delhi"
        slug="neet-coaching-dwarka-sector-10"
        pageTitle="Best NEET Coaching in Dwarka Sector 10"
        pageDescription={`Join Dwarka Sector 10's most trusted NEET Biology coaching. Online + Offline classes. 25-30 min from Rohini via Metro. AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate, ${CEREBRUM_METRICS.topScoreText} top score.`}
        pageType="coaching"
      coordinates={{ lat: "28.5833", lng: "77.0529" }} faqs={faqs} />
      <PageContent faqs={faqs} />
    </>
  )
}
