import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export function OrganizationSchema() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    alternateName: ['Cerebrum Academy', 'Cerebrum Biology', 'CBA Gurugram'],
    legalName: 'Cerebrum Biology Academy Private Limited',
    description:
      'Premier NEET Biology coaching institute with AIIMS Trained faculty, offering comprehensive preparation for medical entrance exams with 98% success rate.',
    slogan: 'Where Biology Meets Excellence',
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    telephone: CONTACT_INFO.phone.primary,
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 14',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.4595',
      longitude: '77.0266',
    },
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrumbiologyacademy',
      'https://twitter.com/cerebrumbiology',
      'https://g.page/cerebrumbiologyacademy',
    ],
    foundingDate: '2014',
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Lead Faculty',
      sameAs: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 10,
      maxValue: 50,
    },
    knowsAbout: [
      'NEET Biology',
      'NEET-UG Preparation',
      'Medical Entrance Exams',
      'Human Physiology',
      'Genetics and Evolution',
      'Botany',
      'Zoology',
      'NCERT Biology',
      'AIIMS Preparation',
    ],
    award: [
      'Best Biology Teacher 2025 - Education Excellence Foundation',
      'Top 10 NEET Coaching 2026 - Career360',
      'Highest Success Rate 2025 - Gurugram Education Council',
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'India',
      },
      {
        '@type': 'Place',
        name: 'International',
      },
    ],
    serviceType: 'Educational Services',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET 2026 - Class 11th Biology',
            description: 'Comprehensive biology coaching for NEET 2026 aspirants in Class 11th',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
          },
          price: '75000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET 2026 - Class 12th Biology',
            description: 'Intensive biology preparation for NEET 2026 Class 12th students',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
          },
          price: '65000',
          priceCurrency: 'INR',
        },
      ],
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: 'Priya Sharma',
        },
        datePublished: '2024-08-15',
        reviewBody:
          'Excellent coaching institute with amazing faculty. Scored 350+ in NEET Biology!',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: 'Rahul Verma',
        },
        datePublished: '2024-07-20',
        reviewBody:
          'Best NEET Biology coaching in Delhi NCR. Dr. Shekhar Singh explains concepts brilliantly.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Person',
          name: 'Ananya Gupta',
        },
        datePublished: '2024-06-10',
        reviewBody:
          'Small batch size and personal attention helped me score 680+ in NEET. Highly recommended!',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '32',
      bestRating: '5',
    },
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cerebrumbiologyacademy.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const courseData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Coaching Program',
    description:
      'Comprehensive NEET Biology preparation course by AIIMS expert faculty with proven track record of 98% success rate',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: ['online', 'onsite'],
        duration: 'P1Y',
        inLanguage: 'en',
        instructor: [
          {
            '@type': 'Person',
            name: 'Biology Department Head',
            jobTitle: 'Senior Biology Faculty',
          },
        ],
      },
    ],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'NEET Aspirants',
    },
    coursePrerequisites: 'Class 10th completion',
    educationalCredentialAwarded: 'NEET Preparation Certificate',
    teaches: ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Ecology', 'Cell Biology'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
    />
  )
}

export function WebsiteSchema() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://cerebrumbiologyacademy.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData),
      }}
    />
  )
}

export function CourseSchema() {
  const courseData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Coaching Program',
    description:
      'Comprehensive NEET Biology preparation course by AIIMS Trained faculty with proven track record of 98% success rate',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    datePublished: '2014-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    // aggregateRating removed — OrganizationSchema already includes it globally
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: ['online', 'onsite'],
        duration: 'P1Y',
        inLanguage: 'en',
        instructor: [
          {
            '@type': 'Person',
            name: 'Dr. Shekhar Singh',
            jobTitle: 'AIIMS Trained Biology Faculty',
            description: '15+ years NEET coaching experience',
          },
        ],
      },
    ],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'NEET Aspirants',
    },
    coursePrerequisites: 'Class 10th completion',
    educationalCredentialAwarded: 'NEET Preparation Certificate',
    teaches: ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Ecology', 'Cell Biology'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(courseData),
      }}
    />
  )
}

export function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the duration of the NEET biology course?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our NEET biology course is designed to be completed in 6-12 months, depending on your pace and starting level. We offer flexible batches for Class 11, Class 12, and dropper students.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of Cerebrum Biology Academy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy has a 98% success rate with 500+ students selected annually for medical colleges. Over 2000+ students have been mentored successfully for NEET examinations since 2015.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who are the faculty members at Cerebrum Biology Academy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our faculty comprises AIIMS-trained experts with 15+ years of teaching experience. They have collectively mentored thousands of successful NEET candidates and specialize in making complex biology concepts easy to understand.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you offer online NEET biology coaching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer both online and offline NEET biology coaching. Our online classes are live interactive sessions with the same quality as offline classes. Students from 50+ countries currently attend our online batches.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the fee for NEET biology coaching?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our NEET biology coaching fees range from Rs 24,000 to Rs 98,000 depending on the course type. Class 11 courses start at Rs 48,000, Class 12 at Rs 65,000, and comprehensive dropper courses at Rs 98,000. EMI options available.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free demo class available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, we offer a FREE demo class for all courses. You can book your free demo on our website or by calling ${CONTACT_INFO.phone.display.primary}. Experience our teaching methodology before enrolling.`,
        },
      },
      {
        '@type': 'Question',
        name: 'What study material is provided for NEET preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We provide comprehensive study material including detailed notes, NCERT-based content, 10,000+ practice questions, chapter-wise tests, full-length mock tests, previous year papers with solutions, and AI-powered doubt solving.',
        },
      },
      {
        '@type': 'Question',
        name: 'When does NEET 2026 preparation batch start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NEET 2026 preparation batches are now open for enrollment. Early batches start from April 2025 for Class 11 students and September 2025 for intensive batches. Book your seat early for best results.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// AggregateRatingSchema REMOVED - was causing duplicate entity issues
// The OrganizationSchema already includes aggregateRating
// Google Search Console showed 36 invalid Review snippets due to duplicate entities

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
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

export function LocalBusinessSchema() {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com/#localbusiness',
    name: 'Cerebrum Biology Academy',
    alternateName: [
      'Cerebrum Biology Academy Gurugram',
      'Best NEET Coaching Gurugram',
      'NEET Biology Coaching Gurgaon',
    ],
    description:
      'Premier NEET Biology coaching in Gurugram with AIIMS Trained Faculty. 90% success rate, small batches of 15 students, personalized attention. Serving Gurugram, Delhi NCR.',
    url: 'https://cerebrumbiologyacademy.com',
    telephone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    image: [
      'https://cerebrumbiologyacademy.com/og-image.jpg',
      'https://cerebrumbiologyacademy.com/images/classroom.jpg',
      'https://cerebrumbiologyacademy.com/images/faculty.jpg',
    ],
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    priceRange: '₹₹-₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.location.gurugram.streetAddress,
      addressLocality: CONTACT_INFO.location.gurugram.addressLocality,
      addressRegion: CONTACT_INFO.location.gurugram.addressRegion,
      postalCode: CONTACT_INFO.location.gurugram.postalCode,
      addressCountry: CONTACT_INFO.location.gurugram.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CONTACT_INFO.location.gurugram.geo.latitude,
      longitude: CONTACT_INFO.location.gurugram.geo.longitude,
    },
    hasMap: CONTACT_INFO.location.gurugram.mapUrl,
    areaServed: [
      {
        '@type': 'City',
        name: 'Gurugram',
        alternateName: 'Gurgaon',
        containedIn: {
          '@type': 'State',
          name: 'Haryana',
        },
      },
      {
        '@type': 'City',
        name: 'Delhi',
        containedIn: {
          '@type': 'State',
          name: 'Delhi',
        },
      },
      {
        '@type': 'City',
        name: 'Noida',
        containedIn: {
          '@type': 'State',
          name: 'Uttar Pradesh',
        },
      },
      {
        '@type': 'City',
        name: 'Faridabad',
        containedIn: {
          '@type': 'State',
          name: 'Haryana',
        },
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: CONTACT_INFO.hours.weekdays.days,
        opens: CONTACT_INFO.hours.weekdays.open,
        closes: CONTACT_INFO.hours.weekdays.close,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: CONTACT_INFO.hours.sunday.open,
        closes: CONTACT_INFO.hours.sunday.close,
      },
    ],
    // aggregateRating removed — OrganizationSchema already includes it globally
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Priya Sharma',
        },
        datePublished: '2024-11-15',
        reviewBody:
          'Best NEET Biology coaching in Gurugram. Dr. Shekhar Singh explains concepts so clearly. Scored 340/360 in Biology!',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Rahul Verma',
        },
        datePublished: '2024-10-20',
        reviewBody:
          'Small batch size made all the difference. Personal attention from faculty helped me clear NEET in first attempt.',
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'Ananya Gupta',
        },
        datePublished: '2024-09-10',
        reviewBody:
          'Joined as a repeater student. The specialized approach helped me improve from 420 to 650. Now at AIIMS Delhi!',
      },
    ],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrumbiologyacademy',
    ],
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar Singh',
      jobTitle: 'Founder & Lead Faculty',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'AIIMS New Delhi',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Coaching Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Biology Foundation (Class 11)',
            description: 'Complete NEET Biology preparation for Class 11 students',
          },
          price: '48000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Biology Intensive (Class 12)',
            description: 'Intensive NEET Biology preparation for Class 12 students',
          },
          price: '65000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'NEET Repeater/Dropper Program',
            description: 'Specialized program for NEET repeaters with personalized attention',
          },
          price: '75000',
          priceCurrency: 'INR',
        },
      ],
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone.primary,
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '07:00',
          closes: '21:00',
        },
      },
      {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phone.primary,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://cerebrumbiologyacademy.com/enrollment',
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'Reservation',
          name: 'Book Free Demo Class',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessData),
      }}
    />
  )
}

export function NationalServiceSchema() {
  const nationalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://cerebrumbiologyacademy.com/#nationalservice',
    name: 'Online NEET Biology Coaching India',
    alternateName: 'Best NEET Coaching India',
    description:
      'Premier online NEET Biology coaching across India with AIIMS Trained Faculties. Kota alternative coaching available pan-India. 98% success rate, small batches, live interactive classes.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    serviceType: 'Online NEET Coaching',
    category: 'Educational Services',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://cerebrumbiologyacademy.com',
      servicePhone: CONTACT_INFO.phone.primary,
      availableLanguage: ['English', 'Hindi'],
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '24000',
      highPrice: '98000',
      priceCurrency: 'INR',
      offerCount: '4',
      offers: [
        {
          '@type': 'Offer',
          name: 'NEET Foundation Course',
          price: '24000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          name: 'NEET Class 11 Biology',
          price: '48000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          name: 'NEET Class 12 Biology',
          price: '65000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          name: 'NEET Dropper Course',
          price: '98000',
          priceCurrency: 'INR',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '32',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pan-India NEET Coaching Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'North India NEET Coaching',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Rajasthan' },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Uttar Pradesh' },
            },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NEET Coaching Punjab' } },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Haryana' },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'South India NEET Coaching',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Karnataka' },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Tamil Nadu' },
            },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NEET Coaching Kerala' } },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Telangana' },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'West & East India NEET Coaching',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Maharashtra' },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching Gujarat' },
            },
            {
              '@type': 'Offer',
              itemOffered: { '@type': 'Service', name: 'NEET Coaching West Bengal' },
            },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NEET Coaching Bihar' } },
          ],
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(nationalServiceData),
      }}
    />
  )
}

export function GurugramServiceSchema() {
  const gurugramServiceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram#service',
    name: 'NEET Biology Coaching Gurugram',
    alternateName: ['NEET Coaching Gurgaon', 'Best NEET Coaching Gurugram'],
    description:
      'Premier NEET Biology coaching in Gurugram with AIIMS Trained Faculties. Serving DLF Phase 1-4, Golf Course Road, Sushant Lok, Sector 14, 43, 51, 56, 57, South City, New Gurugram. 98% success rate, no Delhi travel needed.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    serviceType: 'Online NEET Coaching',
    category: 'Educational Services',
    areaServed: {
      '@type': 'City',
      name: 'Gurugram',
      alternateName: 'Gurgaon',
      containedIn: {
        '@type': 'State',
        name: 'Haryana',
      },
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
      servicePhone: CONTACT_INFO.phone.primary,
      availableLanguage: ['English', 'Hindi'],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '32',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Gurugram NEET Coaching Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching DLF Phase 1 Gurugram',
            description: 'Online NEET Biology coaching for DLF Phase 1, Cyber City students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Golf Course Road Gurugram',
            description: 'Online NEET Biology coaching for Golf Course Road residents',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Sushant Lok Gurugram',
            description: 'Online NEET Biology coaching for Sushant Lok area students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Sector 56 Gurugram',
            description: 'Online NEET Biology coaching for Sector 56 students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Sector 14 Gurugram',
            description: 'Online NEET Biology coaching for Old Gurugram Sector 14 students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Sector 43 Gurugram',
            description: 'Online NEET Biology coaching for Sector 43 students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Sector 51 Gurugram',
            description: 'Online NEET Biology coaching for Sector 51 students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Sector 57 Gurugram',
            description: 'Online NEET Biology coaching for Sector 57, Sohna Road students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching South City Gurugram',
            description: 'Online NEET Biology coaching for South City 1 & 2 students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching New Gurugram',
            description: 'Online NEET Biology coaching for New Gurugram sector students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching DLF Phase 4 Gurugram',
            description: 'Online NEET Biology coaching for DLF Phase 4, Galleria Market students',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(gurugramServiceData),
      }}
    />
  )
}

/**
 * HowToSchema - For instructional/guide content
 * Helps content appear in Google's "How-to" rich snippets
 */
export interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

export interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
  totalTime?: string
  estimatedCost?: {
    currency: string
    value: string
  }
  image?: string
  supply?: string[]
  tool?: string[]
}

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
  image,
  supply,
  tool,
}: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    ...(image && { image }),
    ...(supply && {
      supply: supply.map((item) => ({
        '@type': 'HowToSupply',
        name: item,
      })),
    }),
    ...(tool && {
      tool: tool.map((item) => ({
        '@type': 'HowToTool',
        name: item,
      })),
    }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: step.image,
        },
      }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * PersonSchema - For faculty/author profiles
 * Important for E-E-A-T signals and author attribution
 */
export interface PersonSchemaProps {
  name: string
  jobTitle: string
  description?: string
  image?: string
  url?: string
  email?: string
  telephone?: string
  alumniOf?: Array<{
    name: string
    type?: 'CollegeOrUniversity' | 'EducationalOrganization'
  }>
  worksFor?: {
    name: string
    url?: string
  }
  knowsAbout?: string[]
  sameAs?: string[]
  awards?: string[]
  hasCredential?: Array<{
    name: string
    description?: string
  }>
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  url,
  email,
  telephone,
  alumniOf,
  worksFor,
  knowsAbout,
  sameAs,
  awards,
  hasCredential,
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    ...(description && { description }),
    ...(image && { image }),
    ...(url && { url }),
    ...(email && { email }),
    ...(telephone && { telephone }),
    ...(alumniOf && {
      alumniOf: alumniOf.map((org) => ({
        '@type': org.type || 'CollegeOrUniversity',
        name: org.name,
      })),
    }),
    ...(worksFor && {
      worksFor: {
        '@type': 'EducationalOrganization',
        name: worksFor.name,
        ...(worksFor.url && { url: worksFor.url }),
      },
    }),
    ...(knowsAbout && { knowsAbout }),
    ...(sameAs && { sameAs }),
    ...(awards && { award: awards }),
    ...(hasCredential && {
      hasCredential: hasCredential.map((cred) => ({
        '@type': 'EducationalOccupationalCredential',
        name: cred.name,
        ...(cred.description && { description: cred.description }),
      })),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Pre-configured PersonSchema for Dr. Shekhar C Singh
 * Use this on pages that need to establish author authority
 */
export function DrShekharSinghSchema() {
  return (
    <PersonSchema
      name="Dr. Shekhar C Singh"
      jobTitle="Founder & Lead NEET Biology Faculty"
      description="AIIMS New Delhi alumnus with 14+ years of experience in NEET Biology coaching. Former Narayana Academic Head. Has mentored 500+ students into AIIMS, JIPMER, and other top medical colleges."
      image="https://cerebrumbiologyacademy.com/faculty/dr-shekhar-singh.jpg"
      url="https://cerebrumbiologyacademy.com/faculty"
      email="drshekhar@cerebrumbiologyacademy.com"
      telephone={CONTACT_INFO.phone.primary}
      alumniOf={[
        {
          name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
          type: 'CollegeOrUniversity',
        },
      ]}
      worksFor={{
        name: 'Cerebrum Biology Academy',
        url: 'https://cerebrumbiologyacademy.com',
      }}
      knowsAbout={[
        'NEET Biology',
        'NEET-UG Preparation',
        'Human Physiology',
        'Genetics and Evolution',
        'Molecular Biology',
        'Biotechnology',
        'Medical Entrance Examination',
        'NCERT Biology',
        'Botany for NEET',
        'Zoology for NEET',
      ]}
      sameAs={[
        'https://www.linkedin.com/in/drshekharsingh',
        'https://www.youtube.com/@cerebrumbiologyacademy',
      ]}
      awards={[
        'Best Biology Teacher Award 2022 - Education Excellence Foundation',
        'NEET Educator of the Year 2023',
      ]}
      hasCredential={[
        {
          name: 'AIIMS New Delhi Alumnus',
          description: "Medical degree from India's premier medical institution",
        },
        {
          name: '500+ AIIMS/JIPMER Selections',
          description: 'Students mentored into top medical colleges',
        },
        {
          name: '98% NEET Success Rate',
          description: 'Consistent track record of student success in NEET examinations',
        },
      ]}
    />
  )
}

/**
 * VideoSchema - For pages with embedded videos
 * Important for video rich snippets in search
 */
export interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string
  contentUrl?: string
  embedUrl?: string
  interactionCount?: number
}

export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  interactionCount,
}: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    ...(interactionCount && {
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'WatchAction' },
        userInteractionCount: interactionCount,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * ReviewSchema - For individual reviews/testimonials
 * Important for social proof and rich snippets
 */
export interface ReviewSchemaProps {
  itemReviewed: {
    type: 'Course' | 'Organization' | 'LocalBusiness'
    name: string
  }
  author: {
    name: string
    image?: string
  }
  reviewRating: {
    ratingValue: number
    bestRating?: number
    worstRating?: number
  }
  reviewBody: string
  datePublished: string
}

export function ReviewSchema({
  itemReviewed,
  author,
  reviewRating,
  reviewBody,
  datePublished,
}: ReviewSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': itemReviewed.type,
      name: itemReviewed.name,
    },
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.image && { image: author.image }),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating.ratingValue,
      bestRating: reviewRating.bestRating || 5,
      worstRating: reviewRating.worstRating || 1,
    },
    reviewBody,
    datePublished,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * ReviewListSchema - For multiple testimonials on a page
 * Renders multiple individual Review schemas
 */
export interface ReviewListSchemaProps {
  reviews: Array<{
    author: string
    authorImage?: string
    rating: number
    review: string
    date: string
  }>
  itemReviewed?: {
    type: 'Course' | 'Organization' | 'LocalBusiness'
    name: string
  }
}

export function ReviewListSchema({
  reviews,
  itemReviewed = { type: 'Organization', name: 'Cerebrum Biology Academy' },
}: ReviewListSchemaProps) {
  return (
    <>
      {reviews.map((review, index) => (
        <ReviewSchema
          key={index}
          itemReviewed={itemReviewed}
          author={{
            name: review.author,
            image: review.authorImage,
          }}
          reviewRating={{
            ratingValue: review.rating,
          }}
          reviewBody={review.review}
          datePublished={review.date}
        />
      ))}
    </>
  )
}

/**
 * SpeakableSchema - For voice search optimization
 * Marks content that is especially suitable for text-to-speech
 */
export interface SpeakableSchemaProps {
  name: string
  description: string
  speakableSelectors: string[]
  url: string
}

export function SpeakableSchema({
  name,
  description,
  speakableSelectors,
  url,
}: SpeakableSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: speakableSelectors,
    },
    url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function StructuredData() {
  // Note: FAQSchema is NOT included globally to prevent duplicate FAQ errors in Google Search Console
  // Include FAQSchema only on specific pages that have FAQ content
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <CourseSchema />
      <LocalBusinessSchema />
    </>
  )
}
