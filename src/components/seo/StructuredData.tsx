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
          text: 'Our faculty comprises AIIMS-trained experts with 10+ years of teaching experience. They have collectively mentored thousands of successful NEET candidates and specialize in making complex biology concepts easy to understand.',
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
          text: 'Yes, we offer a FREE demo class for all courses. You can book your free demo on our website or by calling +91-88264-44334. Experience our teaching methodology before enrolling.',
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
      servicePhone: '+91-88264-44334',
      availableLanguage: ['English', 'Hindi'],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1800',
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
