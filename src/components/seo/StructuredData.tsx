export function StructuredData() {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseData),
        }}
      />
    </>
  )
}
