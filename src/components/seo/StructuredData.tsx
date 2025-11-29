'use client'

export function OrganizationSchema() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    alternateName: 'Cerebrum Biology Academy',
    description:
      'Premier NEET Biology coaching institute with AIIMS expert faculty, offering comprehensive preparation for medical entrance exams with 98% success rate.',
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi',
      addressCountry: 'India',
    },
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrumbiologyacademy',
      'https://twitter.com/cerebrumbiology',
    ],
    foundingDate: '2015',
    numberOfEmployees: '50-100',
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
            name: 'NEET 2025 - Class 11th Biology',
            description: 'Comprehensive biology coaching for NEET 2025 aspirants in Class 11th',
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
            name: 'NEET 2025 - Class 12th Biology',
            description: 'Intensive biology preparation for NEET 2025 Class 12th students',
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
        },
        author: {
          '@type': 'Person',
          name: 'Priya Sharma',
        },
        reviewBody:
          'Excellent coaching institute with amazing faculty. Scored 350+ in NEET Biology!',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2500',
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
          text: 'Our NEET biology course is designed to be completed in 6-12 months, depending on your pace and starting level.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide study material for NEET biology?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide comprehensive study material including notes, practice questions, mock tests, and video lectures covering the entire NEET biology syllabus.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free trial available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer a 15-day free trial with access to all features including AI tutor, practice tests, and personalized learning paths.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the success rate of Cerebrum Biology Academy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cerebrum Biology Academy has a 98% success rate with 2000+ students mentored successfully for NEET examinations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are classes available online and offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer both online and offline classes to accommodate students from India and 50+ countries worldwide.',
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

export function AggregateRatingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

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
    name: 'Cerebrum Biology Academy - Delhi NCR',
    alternateName: 'Best NEET Coaching in Delhi NCR',
    description:
      'Premier NEET Biology coaching in Delhi NCR with AIIMS Trained Faculties. Serving Laxmi Nagar, Dwarka, Noida, Gurgaon with 98% success rate. Small batches, live classes.',
    url: 'https://cerebrumbiologyacademy.com',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Online + Delhi NCR Coverage',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi NCR',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6139,
      longitude: 77.209,
    },
    areaServed: [
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
        name: 'Gurgaon',
        containedIn: {
          '@type': 'State',
          name: 'Haryana',
        },
      },
      {
        '@type': 'City',
        name: 'Ghaziabad',
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
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Coaching Delhi NCR',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Biology Coaching Laxmi Nagar',
            description: 'Online NEET Biology coaching for Laxmi Nagar, East Delhi students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Biology Coaching Dwarka',
            description: 'Online NEET Biology coaching for Dwarka, West Delhi students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Biology Coaching Noida',
            description: 'Online NEET Biology coaching for Noida, Greater Noida students',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Biology Coaching Gurgaon',
            description: 'Online NEET Biology coaching for Gurgaon, Gurugram students',
          },
        },
      ],
    },
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
      servicePhone: '+91-88264-44334',
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
      ratingValue: '4.9',
      reviewCount: '2500',
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

export function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <CourseSchema />
      <LocalBusinessSchema />
      <NationalServiceSchema />
    </>
  )
}
