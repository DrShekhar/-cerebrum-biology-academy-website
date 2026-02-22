import { Metadata } from 'next'
import WazirpurNEETContent from './WazirpurNEETContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'NEET Coaching Wazirpur | Biology Classes Near Rohini | Cerebrum Academy',
  description:
    'Best NEET coaching for Wazirpur students. Just 10-15 min from Rohini center. AIIMS faculty, 98% success rate, small batches. Sadhna Sirin scored 695/720! WhatsApp 88264-44334',
  keywords: [
    'NEET coaching Wazirpur',
    'biology classes Wazirpur',
    'NEET tuition near Wazirpur',
    'biology coaching Wazirpur Industrial Area',
    'NEET preparation Wazirpur',
    'biology classes near Rohini',
    'NEET coaching near Ashok Vihar',
    'biology tuition Lawrence Road',
    'NEET classes NSP area',
    'Dr Shekhar Singh',
    'AIIMS trained faculty',
    'biology coaching Delhi',
    'medical entrance coaching Wazirpur',
    'NEET biology classes North Delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Wazirpur | Biology Classes Near Rohini | Cerebrum Academy',
    description:
      'Best NEET coaching for Wazirpur students. Just 10-15 min from Rohini center. AIIMS faculty, 98% success rate, small batches. WhatsApp 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-wazirpur',
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Wazirpur | Biology Classes Near Rohini',
    description:
      'Best NEET coaching for Wazirpur students. 10-15 min from Rohini. AIIMS faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-wazirpur',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// FAQs specific to Wazirpur
const faqs = [
  {
    question: 'Where is the nearest NEET coaching center from Wazirpur?',
    answer:
      'Our Rohini center at DC Chauk (211 Vikas Surya Tower) is just 10-15 minutes drive from Wazirpur. You can reach via Netaji Subhash Place Metro or by road through Ashok Vihar. Many students from Wazirpur Industrial Area attend our Rohini center. Call 88264-44334 for directions.',
  },
  {
    question: 'What is the fee for NEET biology coaching for Wazirpur students?',
    answer:
      'Biology coaching at our Rohini center ranges from Rs 57,000 to Rs 85,500 per year depending on the course. Online option is Rs 35,000 to Rs 60,000. Both include complete study material, test series, and doubt support. EMI options available.',
  },
  {
    question: 'Do you offer online classes for Wazirpur students?',
    answer:
      'Yes! We offer live interactive online classes for students who cannot commute. Same AIIMS faculty, same study material, same results. Many Wazirpur students prefer our hybrid mode - attend online when busy, offline when possible.',
  },
  {
    question: 'What are the batch timings available for students from Wazirpur area?',
    answer:
      'At our Rohini center, we have morning (8-10 AM), afternoon (2-4 PM), and evening (6-8 PM) batches. Weekend batches also available. Most Wazirpur students prefer evening batches due to convenient commute timing.',
  },
  {
    question: 'How is Cerebrum different from coaching centers in Ashok Vihar or NSP?',
    answer:
      "Unlike mass coaching centers, Cerebrum offers small batches of 15-20 students with AIIMS faculty. Our 98% success rate and personalized attention make the short commute worth it. Students from Wazirpur, Ashok Vihar, and surrounding areas travel to our Rohini center for quality coaching.",
  },
]

export default function WazirpurNEETCoachingPage() {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  // Local Business Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${baseUrl}/neet-coaching-wazirpur#organization`,
    name: 'Cerebrum Biology Academy - NEET Coaching Wazirpur',
    description:
      'Best NEET coaching for Wazirpur students. 10-15 min from Rohini center. AIIMS faculty, 98% success rate. Biology classes near Wazirpur Industrial Area.',
    url: `${baseUrl}/neet-coaching-wazirpur`,
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    logo: `${baseUrl}/logo.png`,
    priceRange: 'Rs Rs',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '211 Vikas Surya Tower, DC Chauk',
      addressLocality: 'Rohini',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6969',
      longitude: '77.1650',
    },
    areaServed: [
      'Wazirpur',
      'Wazirpur Industrial Area',
      'Lawrence Road',
      'Ashok Vihar',
      'Shalimar Bagh',
      'Rohini',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '38',
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      alumniOf: 'AIIMS Delhi',
    },
  }

  // FAQ Schema
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

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'North Delhi',
        item: `${baseUrl}/neet-coaching-north-delhi`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NEET Coaching Wazirpur',
        item: `${baseUrl}/neet-coaching-wazirpur`,
      },
    ],
  }

  // Course Schema
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Coaching for Wazirpur Students',
    description:
      'Comprehensive NEET Biology preparation course for students from Wazirpur, Lawrence Road, and nearby areas. AIIMS-trained faculty, small batches, 98% success rate.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      sameAs: baseUrl,
    },
    educationalLevel: 'Class 11-12, NEET Preparation',
    teaches: 'NEET Biology',
    inLanguage: 'en',
    coursePrerequisites: 'Class 10 completion',
    numberOfCredits: '1 Year',
    offers: {
      '@type': 'Offer',
      price: '72200',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2024-01-01',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <WazirpurNEETContent faqs={faqs} />
    </>
  )
}
