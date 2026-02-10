import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Civil Lines Delhi'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: "Civil Lines' Premier NEET Institute",
  locality: locality,
})

export const metadata: Metadata = {
  title: 'NEET Coaching Civil Lines Delhi | Best Biology Classes | Cerebrum Academy',
  description: `Best NEET coaching in Civil Lines Delhi. Ultra-premium area, nearest to Rohini via Yellow Line Metro. AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate, ${CEREBRUM_METRICS.topScoreText} top score. WhatsApp 88264-44334!`,
  keywords: [
    'NEET coaching civil lines',
    'biology tuition civil lines delhi',
    'NEET coaching Civil Lines Delhi',
    'biology classes Civil Lines',
    'best NEET biology coaching Civil Lines',
    'NEET preparation Civil Lines Delhi',
    'medical entrance coaching Civil Lines',
    'biology teacher Civil Lines Delhi',
    'NEET classes near Oberoi Apartments',
    'NEET coaching near Mittal Rishi Apartments',
  ],
  openGraph: {
    title: 'NEET Coaching Civil Lines Delhi | Best Biology Classes | Cerebrum Academy',
    description: `Best NEET coaching in Civil Lines Delhi. Ultra-premium area, nearest to Rohini via Yellow Line Metro. AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate. WhatsApp 88264-44334!`,
    url: `${BASE_URL}/neet-coaching-civil-lines-delhi`,
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
    title: `NEET Coaching Civil Lines Delhi | ${CEREBRUM_METRICS.successRateText} Success Rate`,
    description: `Best NEET Biology coaching in Civil Lines. Ultra-premium area, nearest to Rohini. AIIMS faculty. WhatsApp 88264-44334!`,
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-civil-lines-delhi`,
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
    question: 'Which is the best NEET coaching in Civil Lines Delhi?',
    answer: `Cerebrum Biology Academy is rated among the top NEET coaching institutes for Civil Lines Delhi students with ${CEREBRUM_METRICS.successRateText} success rate. Our Rohini DC Chauk center is easily accessible via Yellow Line Metro (Civil Lines to Rohini West, just 8 stops). We have AIIMS-trained faculty and a proven track record with students from Oberoi Apartments, Mittal Rishi Apartments, and other premium societies in Civil Lines.`,
  },
  {
    question: 'How do Civil Lines students reach Cerebrum Biology Academy?',
    answer:
      'Civil Lines is excellently connected to our Rohini DC Chauk center via Yellow Line Metro. Take the metro from Civil Lines station to Rohini West (just 8 stops, 20 minutes), then a 2-minute walk to our center at 211 Vikas Surya Tower. The metro connectivity makes us the nearest premium NEET coaching for Civil Lines residents.',
  },
  {
    question: 'What is the fee for NEET coaching for Civil Lines students?',
    answer: `Our comprehensive NEET biology course fee is Rs ${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 11-12 students. We offer EMI options and scholarships up to 50% for deserving students. Contact us at 88264-44334 for detailed fee structure and current batch availability.`,
  },
  {
    question: 'Do you have students from Oberoi and Mittal Rishi Apartments?',
    answer:
      'Yes! We have several students from premium societies in Civil Lines including Oberoi Apartments, Mittal Rishi Apartments, and other elite residences. These families appreciate our small batch sizes (15-20 students), personalized attention, and the academic rigor expected in ultra-premium localities.',
  },
  {
    question: 'Is online NEET coaching available for Civil Lines students?',
    answer:
      'Absolutely! We offer both online and hybrid modes for Civil Lines students. Live interactive classes, recorded lectures, and personal mentoring - all accessible from home. Many Civil Lines families prefer our hybrid mode - attending weekend classes at Rohini center and weekday classes online.',
  },
  {
    question: 'What is the batch size for NEET Biology coaching at Cerebrum?',
    answer: `We maintain small batches of maximum ${CEREBRUM_METRICS.batchSizeText} to ensure personalized attention. Unlike large coaching institutes with 50-100 students per batch, our small batches allow faculty to track each student's progress individually. This personalized approach has resulted in our ${CEREBRUM_METRICS.successRateText} NEET success rate.`,
  },
  {
    question: 'Why is Cerebrum the best choice for Civil Lines students?',
    answer: `Civil Lines is an ultra-premium area with high academic expectations. Cerebrum meets these expectations with AIIMS-trained faculty, ${CEREBRUM_METRICS.successRateText} success rate, and top score of ${CEREBRUM_METRICS.topScoreText}. Our Rohini center is the nearest quality NEET coaching via direct Yellow Line Metro connectivity - no transfers needed, making it convenient for Civil Lines students.`,
  },
  {
    question: 'Do you offer weekend batches for Civil Lines students?',
    answer:
      'Yes! We have dedicated weekend batches (Saturday-Sunday) that are popular among Civil Lines students. Morning batches (9 AM-12 PM) and afternoon batches (2 PM-5 PM) are available. Many students combine weekend offline classes with weekday online sessions for maximum flexibility.',
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
  '@id': `${BASE_URL}/neet-coaching-civil-lines-delhi#offers`,
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
  name: 'Free NEET Biology Demo Class - For Civil Lines Delhi Students',
  description: `Experience Cerebrum Biology Academy's teaching methodology. Free demo class for NEET aspirants from Civil Lines Delhi. Meet Dr. Shekhar Suman. Accessible via Yellow Line Metro.`,
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
  name: 'How to Enroll in NEET Coaching for Civil Lines Delhi Students',
  description:
    'Step-by-step guide to enroll in Cerebrum Biology Academy for NEET preparation - Civil Lines students via Yellow Line Metro.',
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
      text: `Book a free demo class via WhatsApp at ${CEREBRUM_METRICS.phoneDisplay} or fill the online form. Mention you are from Civil Lines.`,
      url: `${BASE_URL}/demo-booking`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Attend Demo Session',
      text: 'Attend a 1-hour demo class at our Rohini center (Yellow Line Metro: Civil Lines to Rohini West) or join online.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose Your Batch',
      text: 'Select batch timing - morning (8-10 AM), afternoon (2-4 PM), evening (6-8 PM), or weekend batches.',
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
  '@id': `${BASE_URL}/neet-coaching-civil-lines-delhi#webpage`,
  url: `${BASE_URL}/neet-coaching-civil-lines-delhi`,
  name: 'Best NEET Coaching in Civil Lines Delhi | Cerebrum Biology Academy',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.hero-title', '.hero-description', '.quick-answers', '.speakable-intro'],
  },
}

// Local Business Schema for Civil Lines area
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${BASE_URL}/neet-coaching-civil-lines-delhi#business`,
  name: 'Cerebrum Biology Academy - NEET Coaching for Civil Lines',
  description: `Best NEET Biology coaching for Civil Lines Delhi students. Ultra-premium area with direct Yellow Line Metro access to our Rohini center. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty.`,
  url: `${BASE_URL}/neet-coaching-civil-lines-delhi`,
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
      name: 'Civil Lines',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Civil Lines',
        addressRegion: 'Delhi',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'Place',
      name: 'Oberoi Apartments Civil Lines',
    },
    {
      '@type': 'Place',
      name: 'Mittal Rishi Apartments Civil Lines',
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
  { q: 'Is online NEET coaching effective for students in Civil Lines?', a: 'Yes! Our online NEET coaching is specifically designed for North Delhi students. With AIIMS faculty, 98% success rate, and personalized attention, students in Civil Lines achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for Civil Lines students?', a: 'We offer flexible morning, afternoon, and evening batches so Civil Lines students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. Civil Lines students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in Civil Lines?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. Civil Lines students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for Civil Lines students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Delhi classroom coaching.' },
  { q: 'Which medical colleges can Civil Lines students target?', a: 'With strong NEET scores, Civil Lines students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingCivilLinesDelhiPage() {
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
        locality="Civil Lines Delhi"
        slug="neet-coaching-civil-lines-delhi"
        pageTitle="Best NEET Coaching in Civil Lines Delhi"
        pageDescription={`Join Civil Lines Delhi's most trusted NEET Biology coaching. Ultra-premium area, nearest to Rohini via Yellow Line Metro. AIIMS faculty, ${CEREBRUM_METRICS.successRateText} success rate, ${CEREBRUM_METRICS.topScoreText} top score.`}
        pageType="coaching"
      coordinates={{ lat: "28.6814", lng: "77.2255" }} faqs={faqs} />
      <PageContent faqs={faqs} />
    </>
  )
}
