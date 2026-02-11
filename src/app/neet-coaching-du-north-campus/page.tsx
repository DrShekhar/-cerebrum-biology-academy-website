import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'DU North Campus'

const ogImageParams = new URLSearchParams({
  title: 'NEET Coaching for DU Students',
  subtitle: 'Biology Classes Near Delhi University',
  locality: locality,
})

export const metadata: Metadata = {
  title: `NEET Coaching Near DU North Campus | Biology Classes for DU Students | Cerebrum Academy`,
  description: `NEET coaching for BSc Biology students & repeaters near Delhi University North Campus. Evening & weekend batches for Hansraj, Hindu, Miranda House, Kirori Mal students. ${CEREBRUM_METRICS.successRateText} success rate. Book free demo!`,
  keywords: [
    'NEET coaching DU north campus',
    'biology tuition near Delhi University',
    'NEET for BSc students',
    'NEET coaching near Vishwavidyalaya metro',
    'NEET repeaters Delhi University',
    'biology classes DU students',
    'NEET coaching Hansraj College',
    'NEET coaching Hindu College',
    'NEET coaching Miranda House',
    'evening NEET classes Delhi University',
    'weekend NEET coaching north Delhi',
  ],
  openGraph: {
    title: `NEET Coaching Near DU North Campus | Biology Classes for DU Students`,
    description: `Join specialized NEET coaching for BSc Biology students near Delhi University. Evening & weekend batches. ${CEREBRUM_METRICS.successRateText} success rate. Hansraj, Hindu, Miranda House, Kirori Mal students welcome.`,
    url: `${BASE_URL}/neet-coaching-du-north-campus`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching near ${locality} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Coaching Near DU North Campus | For BSc Students & Repeaters`,
    description: `Specialized NEET coaching for Delhi University students. Evening & weekend batches. Book free demo!`,
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-du-north-campus`,
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
    question: 'Can BSc students prepare for NEET while studying at Delhi University?',
    answer: `Absolutely! Many BSc Biology students from DU colleges successfully prepare for NEET alongside their graduation. At Cerebrum Biology Academy, we offer specialized evening batches (6-8 PM) and weekend classes specifically designed for college students. Your BSc Biology curriculum actually strengthens your NEET foundation. With proper time management and our flexible batch timings, you can excel in both your degree and NEET preparation.`,
  },
  {
    question: 'Which is the best NEET coaching near DU North Campus?',
    answer: `Cerebrum Biology Academy is the top choice for NEET coaching near DU North Campus with ${CEREBRUM_METRICS.successRateText} success rate. We are easily accessible from Vishwavidyalaya Metro (10 min) and offer specialized batches for BSc students and NEET repeaters. Our AIIMS-trained faculty, small batch size of ${CEREBRUM_METRICS.batchSizeText}, and flexible timings make us ideal for DU students from Hansraj, Hindu, Miranda House, and Kirori Mal colleges.`,
  },
  {
    question: 'Do you offer evening batches for DU college students?',
    answer: `Yes! We have dedicated evening batches from 6-8 PM specifically designed for DU students. These batches start after college hours, allowing you to attend regular classes at Hansraj, Hindu, Miranda House, or other DU colleges and then join NEET coaching. We also offer weekend-only batches (Saturday-Sunday) for students with packed weekday schedules.`,
  },
  {
    question: 'Is NEET coaching available for NEET repeaters near Delhi University?',
    answer: `Yes, we have specialized dropper/repeater batches for students who are taking a gap year or preparing alongside their studies. Many students from DU who didn't clear NEET in their first attempt join our intensive repeater program. We offer full-day batches for droppers and evening batches for those pursuing BSc simultaneously. Our focused approach has helped numerous repeaters improve by 150+ marks.`,
  },
  {
    question: 'What is the fee for NEET coaching for DU students?',
    answer: `Our comprehensive NEET biology course fee is ₹${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for the regular batch. For dropper/repeater students, the fee is ₹${CEREBRUM_METRICS.feeDropper.toLocaleString()}/year. We offer special discounts for DU students and flexible EMI options. Scholarships up to 50% are available for meritorious students. Contact us for the detailed fee structure and current offers.`,
  },
  {
    question: 'How far is Cerebrum Biology Academy from Vishwavidyalaya Metro?',
    answer: `Our center is conveniently located just 10-12 minutes from Vishwavidyalaya Metro station. You can easily reach us via auto or a short bus ride. Most DU North Campus students find our location very accessible after their college hours. We are also well-connected from GTB Nagar Metro for students coming from other parts of Delhi.`,
  },
  {
    question: 'Can I join NEET coaching in the middle of the academic year?',
    answer: `Yes, we accept admissions throughout the year with special catch-up sessions for late joiners. Our modular course structure allows students to join at different points. We provide recorded lectures and extra doubt sessions to help new students catch up with the batch. Many BSc students join after their first semester once they decide to pursue NEET seriously.`,
  },
  {
    question: 'Do you provide study material specifically for BSc students preparing for NEET?',
    answer: `Yes! Our comprehensive study material is designed to complement BSc Biology curriculum while being NEET-focused. Since many BSc topics overlap with NEET syllabus (Botany, Zoology, Cell Biology, Genetics), our material helps you prepare for both exams efficiently. We provide NCERT-aligned notes, previous year papers, and topic-wise MCQ banks specifically curated for NEET.`,
  },
  {
    question: 'What are the batch timings for working professionals or irregular students?',
    answer: `We understand that DU students and repeaters have varied schedules. We offer: (1) Evening batches: 6-8 PM (Monday-Friday), (2) Weekend batches: Saturday-Sunday 10 AM-2 PM, (3) Hybrid mode: Online weekdays + Offline weekends. All classes are recorded and available for revision. You can switch between online and offline modes based on your schedule.`,
  },
  {
    question: 'How does Cerebrum help NEET repeaters improve their scores?',
    answer: `Our repeater program focuses on: (1) Identifying weak areas through diagnostic tests, (2) Targeted revision of high-weightage chapters, (3) Intensive MCQ practice with 10,000+ questions, (4) Full-length mock tests every week, (5) One-on-one doubt sessions with faculty. Average improvement is 150+ marks. Many repeaters have jumped from 400-450 to 600+ with our focused approach. We analyze previous attempt mistakes and create personalized improvement plans.`,
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
  '@id': `${BASE_URL}/neet-coaching-du-north-campus#offers`,
  priceCurrency: 'INR',
  lowPrice: CEREBRUM_METRICS.feeCrashCourse,
  highPrice: CEREBRUM_METRICS.feeClass11 + CEREBRUM_METRICS.feeClass12,
  offerCount: 4,
  offers: [
    {
      '@type': 'Offer',
      name: 'BSc Student Evening Batch',
      price: CEREBRUM_METRICS.feeClass12,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
    },
    {
      '@type': 'Offer',
      name: 'NEET Dropper/Repeater Batch',
      price: CEREBRUM_METRICS.feeDropper,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear() + 1}-03-31`,
    },
    {
      '@type': 'Offer',
      name: 'Weekend Only Batch',
      price: CEREBRUM_METRICS.feeClass12,
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
  name: 'Free NEET Biology Demo Class - DU North Campus Students',
  description: `Experience Cerebrum Biology Academy's teaching methodology. Free demo class for BSc Biology students and NEET repeaters near Delhi University. Meet Dr. Shekhar C Singh.`,
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
        addressLocality: 'North Delhi',
        addressRegion: 'Delhi',
        postalCode: '110007',
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
  name: 'How to Enroll in NEET Coaching for DU Students',
  description: 'Step-by-step guide to enroll in Cerebrum Biology Academy for NEET preparation near Delhi University North Campus.',
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
      text: `Book a free demo class via WhatsApp at ${CEREBRUM_METRICS.phoneDisplay} or fill the online form. Mention your college (Hansraj, Hindu, Miranda House, etc.).`,
      url: `${BASE_URL}/demo-booking`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Attend Demo Session',
      text: 'Attend a 1-hour demo class with Dr. Shekhar C Singh. Experience our teaching methodology designed for BSc students.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose Your Batch',
      text: 'Select batch timing - evening (6-8 PM) for college students, weekend batches, or full-day for droppers.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Complete Enrollment',
      text: 'Submit documents and pay fees via UPI, bank transfer, or EMI. Special discounts for DU students available.',
    },
  ],
}

// Speakable Schema for voice search
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE_URL}/neet-coaching-du-north-campus#webpage`,
  url: `${BASE_URL}/neet-coaching-du-north-campus`,
  name: 'NEET Coaching Near DU North Campus | Cerebrum Biology Academy',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.hero-title', '.hero-description', '.quick-answers'],
  },
}

const faqs = [
  { q: 'Is online NEET coaching effective for students in DU North Campus?', a: 'Yes! Our online NEET coaching is specifically designed for North Delhi students. With AIIMS faculty, 98% success rate, and personalized attention, students in DU North Campus achieve excellent results without traveling to coaching hubs.' },
  { q: 'What are the class timings for DU North Campus students?', a: 'We offer flexible morning, afternoon, and evening batches so DU North Campus students can attend after school or college hours. Weekend revision sessions are also available.' },
  { q: 'Do you provide WhatsApp support for doubt clearing?', a: 'Yes! Instant WhatsApp support available on +91-8826444334. Our AIIMS faculty responds within minutes. DU North Campus students get unlimited doubt clearing.' },
  { q: 'What makes Cerebrum different from local coaching in DU North Campus?', a: 'AIIMS-qualified faculty, 10-15 student batches (vs 100+ locally), 695/720 top score, 98% success rate, structured NCERT approach. DU North Campus students get premium coaching at affordable fees.' },
  { q: 'What is the NEET coaching fee for DU North Campus students?', a: 'Foundation (Class 11): Rs 24,000/year, Comprehensive (Class 12): Rs 36,000/year, Intensive (Dropper): Rs 48,000/year. EMI available. Much more affordable than Delhi classroom coaching.' },
  { q: 'Which medical colleges can DU North Campus students target?', a: 'With strong NEET scores, DU North Campus students can target AIIMS Delhi, JIPMER, LHMC, Maulana Azad Medical College, and top government medical colleges across India.' },
  { q: 'Do you cover Class 11 and Class 12 NEET syllabus?', a: 'Yes! Foundation (Class 11), Comprehensive (Class 12), and Intensive (dropper) courses. All aligned with latest NTA NEET pattern and 100% NCERT-based curriculum.' },
  { q: 'Can I attend a free demo class before enrolling?', a: 'Absolutely! WhatsApp us at +91-8826444334 to book your free demo class. Experience our AIIMS faculty teaching methodology.' },
]

export default function NEETCoachingDUNorthCampusPage() {
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
        locality="DU North Campus"
        slug="neet-coaching-du-north-campus"
        pageTitle="NEET Coaching Near DU North Campus | Biology Classes for DU Students"
        pageDescription={`Join specialized NEET coaching for BSc Biology students near Delhi University. Evening & weekend batches. ${CEREBRUM_METRICS.successRateText} success rate. Hansraj, Hindu, Miranda House, Kirori Mal students welcome.`}
        pageType="coaching"
      coordinates={{ lat: "28.6889", lng: "77.2101" }} faqs={faqs} />
      <PageContent />
    </>
  )
}
