// Server Component - no client-side interactivity needed
import Script from 'next/script'

interface AIOptimizedSchemaProps {
  locality: string
  slug: string
  pageUrl: string
}

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export function AIOptimizedSchema({ locality, slug, pageUrl }: AIOptimizedSchemaProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    alternateName: ['Cerebrum Academy', 'Cerebrum NEET Coaching', 'Cerebrum Biology'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/og-image.jpg`,
    description: `Premier NEET Biology coaching institute in ${locality}, Delhi. Expert AIIMS faculty with 98% success rate and 695/720 top score.`,
    slogan: 'Where Biology Becomes Your Strength',
    foundingDate: '2015',
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      honorificPrefix: 'Dr.',
      jobTitle: 'Founder & Head Faculty',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'All India Institute of Medical Sciences (AIIMS)',
      },
      knowsAbout: [
        'NEET Biology',
        'Medical Entrance Examination',
        'Human Physiology',
        'Genetics',
        'Ecology',
        'Cell Biology',
      ],
    },
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.youtube.com/@drshekharcsingh',
      'https://maps.app.goo.gl/cerebrum-biology-academy',
    ],
    knowsAbout: [
      'NEET-UG Preparation',
      'NEET Biology Coaching',
      'Medical Entrance Coaching',
      'Class 11 Biology',
      'Class 12 Biology',
      'CBSE Biology',
      'Botany for NEET',
      'Zoology for NEET',
      'Human Physiology',
      'Genetics and Evolution',
      'Ecology and Environment',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: '98% Success Rate in NEET',
        description: '98% of students qualify NEET with coaching from Cerebrum Biology Academy',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Top Score 695/720',
        description: 'Highest score achieved by a Cerebrum student in NEET Biology section',
      },
    ],
    award: [
      'Best NEET Biology Coaching in South Delhi 2025',
      'Top 10 Medical Coaching Institute Delhi NCR',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Delhi',
      containsPlace: [
        { '@type': 'Place', name: locality },
        { '@type': 'Place', name: 'South Delhi' },
        { '@type': 'Place', name: 'Delhi NCR' },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-88264-44334',
      contactType: 'admissions',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '32',
      reviewCount: '32',
    },
  }

  const courseListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `NEET Biology Courses at ${locality}`,
    description: `Comprehensive NEET Biology coaching programs available at Cerebrum Biology Academy ${locality}`,
    numberOfItems: 4,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Course',
          name: 'NEET-UG Foundation Course (Class 11)',
          description:
            'Complete Class 11 Biology preparation for NEET-UG with NCERT-aligned curriculum',
          provider: { '@id': `${BASE_URL}/#organization` },
          courseCode: 'NEET-F11',
          educationalLevel: 'Class 11',
          teaches: ['Cell Biology', 'Plant Physiology', 'Structural Organization', 'Biomolecules'],
          timeRequired: 'P10M',
          offers: {
            '@type': 'Offer',
            price: '45000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-04-01',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Course',
          name: 'NEET-UG Advanced Course (Class 12)',
          description: 'Intensive Class 12 Biology preparation with mock tests and doubt sessions',
          provider: { '@id': `${BASE_URL}/#organization` },
          courseCode: 'NEET-A12',
          educationalLevel: 'Class 12',
          teaches: ['Human Physiology', 'Genetics', 'Evolution', 'Ecology', 'Biotechnology'],
          timeRequired: 'P10M',
          offers: {
            '@type': 'Offer',
            price: '55000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-04-01',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Course',
          name: 'NEET Dropper Batch',
          description: 'One-year intensive program for NEET repeaters with personalized attention',
          provider: { '@id': `${BASE_URL}/#organization` },
          courseCode: 'NEET-DROP',
          educationalLevel: 'Post-12th',
          teaches: ['Complete NEET Biology Syllabus', 'Previous Year Questions', 'Mock Tests'],
          timeRequired: 'P12M',
          offers: {
            '@type': 'Offer',
            price: '75000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-04-01',
          },
        },
      },
      {
        '@type': 'ListItem',
        position: 4,
        item: {
          '@type': 'Course',
          name: 'NEET Crash Course',
          description: '3-month intensive revision program before NEET examination',
          provider: { '@id': `${BASE_URL}/#organization` },
          courseCode: 'NEET-CRASH',
          educationalLevel: 'Class 12',
          teaches: ['Quick Revision', 'Important Topics', 'Test Series', 'Last Minute Tips'],
          timeRequired: 'P3M',
          offers: {
            '@type': 'Offer',
            price: '25000',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            validFrom: '2025-01-01',
          },
        },
      },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': pageUrl,
    name: `Best NEET Coaching in ${locality} | Cerebrum Biology Academy`,
    description: `Join the best NEET biology coaching in ${locality}, Delhi. 98% success rate, AIIMS faculty, personalized batches. Book free demo today.`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-intro', '.speakable-features', '.speakable-cta'],
      xpath: [
        "//*[@class='speakable-intro']",
        "//*[@class='speakable-features']",
        "//*[@class='speakable-cta']",
      ],
    },
    mainEntity: { '@id': `${BASE_URL}/#organization` },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Join NEET Coaching at Cerebrum Biology Academy ${locality}`,
    description: `Step-by-step guide to enroll in NEET biology coaching at ${locality}`,
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '0',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Book Free Demo',
        text: 'Contact us via WhatsApp (+91-88264-44334) or fill the form on our website to book a free demo class.',
        url: `${pageUrl}#contact`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Attend Demo Class',
        text: 'Experience our teaching methodology and interact with faculty during the demo session.',
        url: `${pageUrl}#demo`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Your Batch',
        text: 'Select from Foundation (Class 11), Advanced (Class 12), Dropper, or Crash Course batches based on your needs.',
        url: `${pageUrl}#courses`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Complete Enrollment',
        text: 'Submit required documents and complete fee payment to confirm your admission.',
        url: `${pageUrl}#enroll`,
      },
    ],
  }

  return (
    <>
      <Script
        id="ai-organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="ai-course-list-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <Script
        id="ai-speakable-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <Script
        id="ai-howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </>
  )
}

export function AIContentBlock({ locality }: { locality: string }) {
  return (
    <div className="sr-only" aria-hidden="false">
      <p className="speakable-intro">
        Cerebrum Biology Academy is the best NEET coaching institute in {locality}, South Delhi.
        With a 98% success rate and top score of 695 out of 720, we offer expert biology coaching
        for NEET-UG preparation. Our AIIMS-qualified faculty provides personalized attention in
        small batches.
      </p>
      <p className="speakable-features">
        Key features include: AIIMS-qualified expert faculty led by Dr. Shekhar C Singh, small batch
        sizes of maximum 25 students, comprehensive study material aligned with NCERT, regular mock
        tests and performance tracking, doubt clearing sessions, and flexible batch timings for
        school students.
      </p>
      <p className="speakable-cta">
        To join the best NEET biology coaching in {locality}, call us at 8826444334 or visit
        cerebrumbiologyacademy.com. Book your free demo class today and take the first step towards
        your medical career.
      </p>
    </div>
  )
}
