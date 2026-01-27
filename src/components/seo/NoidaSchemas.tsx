import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { DrShekharSinghSchema } from './StructuredData'

interface NoidaLocalBusinessSchemaProps {
  area?: string
  sector?: string
  society?: string
  coordinates?: { lat: string; lng: string }
}

export function NoidaLocalBusinessSchema({
  area = 'Noida',
  sector,
  society,
  coordinates = { lat: '28.5355', lng: '77.3910' },
}: NoidaLocalBusinessSchemaProps) {
  const locationName = society || (sector ? `Sector ${sector}` : area)
  const fullArea = society ? `${society}, ${area}` : sector ? `Sector ${sector}, ${area}` : area

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `https://cerebrumbiologyacademy.com/#noida-${locationName.toLowerCase().replace(/\s+/g, '-')}`,
    name: `Cerebrum Biology Academy - ${fullArea}`,
    alternateName: [
      `NEET Coaching ${fullArea}`,
      `Biology Tuition ${fullArea}`,
      `Best NEET Coaching ${locationName}`,
    ],
    description: `Premier NEET Biology coaching in ${fullArea} with AIIMS faculty. 98% success rate, small batches, online & offline classes. Serving students from ${locationName} and nearby areas.`,
    url: 'https://cerebrumbiologyacademy.com',
    telephone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    priceRange: '₹48,000 - ₹1,56,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Bank Transfer, EMI',
    address: {
      '@type': 'PostalAddress',
      streetAddress: sector ? `Sector ${sector}` : 'Gaur City',
      addressLocality: area.includes('Greater Noida') ? 'Greater Noida' : 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Noida',
        containedIn: { '@type': 'State', name: 'Uttar Pradesh' },
      },
      {
        '@type': 'City',
        name: 'Greater Noida',
        containedIn: { '@type': 'State', name: 'Uttar Pradesh' },
      },
      {
        '@type': 'City',
        name: 'Greater Noida West',
        alternateName: 'Noida Extension',
        containedIn: { '@type': 'State', name: 'Uttar Pradesh' },
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Priya Sharma' },
        datePublished: '2025-01-10',
        reviewBody: `Best NEET Biology coaching in ${fullArea}. Dr. Shekhar's teaching helped me score 680+ in NEET!`,
      },
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Rahul Verma' },
        datePublished: '2025-01-05',
        reviewBody: `Joined online classes from ${locationName}. Small batch size and personal attention made all the difference.`,
      },
    ],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://g.page/cerebrumbiologyacademy',
    ],
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Lead Faculty',
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'AIIMS New Delhi' },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `NEET Biology Courses - ${fullArea}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Pursuit - Class 11 NEET',
            description: '30-40 students batch, 6 hrs/week, AIIMS faculty',
          },
          price: '48000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Ascent - Class 11/12 NEET',
            description: '16-18 students batch, 8 hrs/week, weekly doubt sessions',
          },
          price: '76000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Pinnacle - Premium NEET',
            description: '10-12 students batch, 10-12 hrs/week, 1-on-1 mentorship',
          },
          price: '98000',
          priceCurrency: 'INR',
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CONTACT_INFO.phone.primary,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cerebrumbiologyacademy.com/demo-booking',
      },
      result: { '@type': 'Reservation', name: 'Book Free Demo Class' },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaFAQSchemaProps {
  area?: string
  sector?: string
  society?: string
  customFAQs?: Array<{ question: string; answer: string }>
}

export function NoidaFAQSchema({
  area = 'Noida',
  sector,
  society,
  customFAQs = [],
}: NoidaFAQSchemaProps) {
  const locationName = society || (sector ? `Sector ${sector}, ${area}` : area)

  const defaultFAQs = [
    {
      question: `What is the fee for NEET coaching in ${locationName}?`,
      answer: `NEET Biology coaching fees in ${locationName}: Pursuit batch (30-40 students) - Rs 48,000-70,000/year, Ascent batch (16-18 students) - Rs 76,000-90,000/year, Pinnacle batch (10-12 students) - Rs 98,000-1,56,000/year. All include AIIMS faculty, study material, and online access. EMI options available.`,
    },
    {
      question: `Is online NEET coaching available for students in ${locationName}?`,
      answer: `Yes! 70% of our ${locationName} students prefer online mode. We offer live Zoom classes, recorded lectures, WhatsApp doubt support, and AI-powered study tools - all at the same fee as offline classes. Perfect for students who want to save commute time.`,
    },
    {
      question: `Who is the faculty for NEET Biology coaching in ${locationName}?`,
      answer: `Our lead faculty Dr. Shekhar C Singh is an AIIMS New Delhi alumnus with 15+ years of teaching experience. He has mentored 2,000+ students with 500+ medical college selections. All faculty members are from premier medical institutions.`,
    },
    {
      question: `What is the success rate of Cerebrum Biology Academy in ${area}?`,
      answer: `Cerebrum Biology Academy has a 98% success rate in ${area}. Our students from ${locationName} have scored 650+ in NEET, with several selections in AIIMS, JIPMER, and top government medical colleges. We have 1,200+ students from Noida/Greater Noida.`,
    },
    {
      question: `Do you offer a free demo class for students in ${locationName}?`,
      answer: `Yes! We offer a FREE demo class for all students from ${locationName}. Experience our teaching methodology, meet the faculty, and see why we're the #1 choice for NEET Biology in ${area}. Book via WhatsApp at ${CONTACT_INFO.phone.display.primary} or through our website.`,
    },
    {
      question: `What study material is provided for NEET preparation?`,
      answer: `We provide comprehensive study material: NCERT-based notes, 10,000+ practice MCQs, chapter-wise tests, full-length mock tests, previous year papers with solutions, and AI-powered doubt solving. All materials are included in the course fee.`,
    },
  ]

  const allFAQs = [...defaultFAQs, ...customFAQs]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaBreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>
}

export function NoidaBreadcrumbSchema({ items }: NoidaBreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaSpeakableSchemaProps {
  pageName: string
  pageDescription: string
  pageUrl: string
}

export function NoidaSpeakableSchema({
  pageName,
  pageDescription,
  pageUrl,
}: NoidaSpeakableSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageName,
    description: pageDescription,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.speakable-content', '.faq-answer'],
    },
    url: pageUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface NoidaCourseSchemaProps {
  courseName: string
  courseDescription: string
  price: string
  duration?: string
  courseLevel?: string
}

export function NoidaCourseSchema({
  courseName,
  courseDescription,
  price,
  duration = 'P1Y',
  courseLevel = 'Intermediate',
}: NoidaCourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: courseDescription,
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-01-01',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['online', 'onsite'],
      duration: duration,
      inLanguage: ['en', 'hi'],
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar C Singh',
        jobTitle: 'AIIMS Trained Biology Faculty',
      },
    },
    educationalLevel: courseLevel,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'NEET Aspirants',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Comprehensive schema bundle for Noida pages
interface NoidaPageSchemasProps {
  area?: string
  sector?: string
  society?: string
  pageName: string
  pageDescription: string
  pageUrl: string
  breadcrumbs: Array<{ name: string; url: string }>
  customFAQs?: Array<{ question: string; answer: string }>
  coordinates?: { lat: string; lng: string }
  includePersonSchema?: boolean
}

export function NoidaPageSchemas({
  area = 'Noida',
  sector,
  society,
  pageName,
  pageDescription,
  pageUrl,
  breadcrumbs,
  customFAQs = [],
  coordinates,
  includePersonSchema = true,
}: NoidaPageSchemasProps) {
  return (
    <>
      <NoidaLocalBusinessSchema
        area={area}
        sector={sector}
        society={society}
        coordinates={coordinates}
      />
      <NoidaFAQSchema
        area={area}
        sector={sector}
        society={society}
        customFAQs={customFAQs}
      />
      <NoidaBreadcrumbSchema items={breadcrumbs} />
      <NoidaSpeakableSchema
        pageName={pageName}
        pageDescription={pageDescription}
        pageUrl={pageUrl}
      />
      {includePersonSchema && <DrShekharSinghSchema />}
    </>
  )
}
