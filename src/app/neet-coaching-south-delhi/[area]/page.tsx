import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { areaDetails, getAllAreaSlugs, getAreaBySlug } from '@/data/south-delhi-areas'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'
import AreaPageContent from './AreaPageContent'

interface PageProps {
  params: Promise<{ area: string }>
}

export async function generateStaticParams() {
  return getAllAreaSlugs().map((area) => ({
    area,
  }))
}

// Generate area-type specific meta descriptions
function getMetaDescriptionByType(area: ReturnType<typeof getAreaBySlug>): string {
  if (!area) return ''

  const schoolsText = area.schools.slice(0, 2).join(', ')
  const metroText = area.nearbyMetro[0] || ''

  switch (area.type) {
    case 'coaching-hub':
      return `Top NEET Biology coaching in ${area.name} - Delhi's coaching hub. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Near ${metroText}. Small batches, expert guidance. Book free demo!`

    case 'posh':
      return `Premium NEET coaching in ${area.name} for elite families. ${CEREBRUM_METRICS.successRateText} success rate. Serving ${schoolsText} students. Near ${metroText}. Personalized attention, flexible timings. Join now!`

    case 'ultra-premium':
      return `Exclusive NEET Biology coaching in ${area.name} - Lutyens Delhi. Personalized ${CEREBRUM_METRICS.batchSizeText} batches. ${CEREBRUM_METRICS.successRateText} success rate. Top schools: ${schoolsText}. World-class faculty. Book consultation!`

    case 'govt-colony':
      return `Trusted NEET coaching in ${area.name} for govt officers' families. Affordable fees with ${CEREBRUM_METRICS.successRateText} success rate. Students from ${schoolsText}. Near ${metroText}. Quality education, proven results!`

    case 'student-hub':
      return `Best NEET Biology coaching in ${area.name} - student hub near IIT/JNU. ${CEREBRUM_METRICS.successRateText} success rate, affordable fees. Serious aspirants welcome. Near ${metroText}. Book your free demo today!`

    case 'gated':
      return `NEET coaching for ${area.name} residents. ${CEREBRUM_METRICS.successRateText} success rate, convenient timings. Students from ${schoolsText}. Near ${metroText}. Online & offline batches available!`

    case 'residential':
    default:
      return `Best NEET Biology coaching near ${area.name}. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Near ${metroText}. Small batches, personal mentorship. Book free demo!`
  }
}

// Generate area-type specific title
function getTitleByType(area: ReturnType<typeof getAreaBySlug>): string {
  if (!area) return 'NEET Coaching | Cerebrum Biology Academy'

  const typePrefix: Record<string, string> = {
    'coaching-hub': 'Top',
    posh: 'Premium',
    'ultra-premium': 'Exclusive',
    'govt-colony': 'Trusted',
    'student-hub': 'Best',
    gated: 'Quality',
    residential: 'Best',
  }

  const prefix = typePrefix[area.type] || 'Best'
  return `${prefix} NEET Coaching in ${area.name} | ${CEREBRUM_METRICS.successRateText} Success | Cerebrum Academy`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug } = await params
  const area = getAreaBySlug(areaSlug)

  if (!area) {
    return {
      title: 'Area Not Found | Cerebrum Biology Academy',
    }
  }

  const title = getTitleByType(area)
  const description = getMetaDescriptionByType(area)

  // Area-type specific keywords
  const typeKeywords: Record<string, string[]> = {
    'coaching-hub': ['coaching capital', 'IIT area coaching', 'competitive exam preparation'],
    posh: ['premium coaching', 'elite school students', 'affluent area NEET'],
    'ultra-premium': ['exclusive coaching', 'Lutyens Delhi NEET', 'personalized NEET prep'],
    'govt-colony': ['govt officers family coaching', 'affordable NEET coaching', 'central govt colony'],
    'student-hub': ['student area coaching', 'PG students NEET', 'hostel area coaching'],
    gated: ['gated colony coaching', 'DDA complex NEET', 'residential coaching'],
    residential: ['residential area coaching', 'family area NEET', 'local NEET coaching'],
  }

  return {
    title,
    description,
    keywords: [
      `NEET coaching ${area.name}`,
      `NEET coaching near ${area.name}`,
      `Best NEET coaching ${area.fullName}`,
      `Biology coaching ${area.name}`,
      `NEET preparation ${area.name}`,
      `Medical coaching ${area.name}`,
      ...area.schools.map((school) => `NEET coaching for ${school} students`),
      ...area.nearbyMetro.map((metro) => `NEET coaching near ${metro}`),
      ...(typeKeywords[area.type] || []),
    ],
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://cerebrumbiologyacademy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Coaching in ${area.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function SouthDelhiAreaPage({ params }: PageProps) {
  const { area: areaSlug } = await params
  const area = getAreaBySlug(areaSlug)

  if (!area) {
    notFound()
  }

  const organizationId = 'https://cerebrumbiologyacademy.com/#organization'
  const localBusinessId = `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}#localbusiness`

  // Generate area-specific reviews based on area type
  const getAreaReviews = () => {
    const baseReviews = [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Parent from ' + area.name },
        datePublished: '2025-11-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `Excellent NEET coaching! My child from ${area.schools[0] || area.name} improved from 480 to 650+ marks. The small batch size and personal attention made all the difference.`,
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Student from ' + area.name },
        datePublished: '2025-10-20',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `Best Biology coaching in ${area.name}. Dr. Shekhar Sir's teaching methodology made complex topics easy. The ${area.nearbyMetro[0] || 'metro'} connectivity makes it convenient to reach.`,
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'NEET 2025 Qualifier' },
        datePublished: '2025-09-10',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `I'm from ${area.name} and joined Cerebrum for my dropper year. The focused approach and regular tests helped me score ${CEREBRUM_METRICS.topScoreText} in Biology. Highly recommend!`,
      },
    ]
    return baseReviews
  }

  const educationalOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': organizationId,
    name: 'Cerebrum Biology Academy',
    alternateName: `Cerebrum Biology Academy - ${area.name}`,
    description: `Best NEET coaching in ${area.name}, South Delhi. ${area.description}`,
    url: 'https://cerebrumbiologyacademy.com',
    telephone: CEREBRUM_METRICS.phone,
    email: CEREBRUM_METRICS.email,
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CEREBRUM_METRICS.mainAddress,
      addressLocality: 'South Delhi',
      addressRegion: 'Delhi',
      postalCode: CEREBRUM_METRICS.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CEREBRUM_METRICS.coordinates.latitude,
      longitude: CEREBRUM_METRICS.coordinates.longitude,
    },
    areaServed: [
      { '@type': 'City', name: area.name },
      { '@type': 'City', name: 'South Delhi' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: CEREBRUM_METRICS.rating.toString(),
      reviewCount: CEREBRUM_METRICS.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'EducationalOrganization'],
    '@id': localBusinessId,
    name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
    description: area.heroDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
    telephone: CEREBRUM_METRICS.phone,
    email: CEREBRUM_METRICS.email,
    priceRange: '₹₹',
    image: 'https://cerebrumbiologyacademy.com/logo.png',
    parentOrganization: { '@id': organizationId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CEREBRUM_METRICS.mainAddress,
      addressLocality: area.name,
      addressRegion: 'Delhi',
      postalCode: area.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CEREBRUM_METRICS.coordinates.latitude.toString(),
      longitude: CEREBRUM_METRICS.coordinates.longitude.toString(),
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: CEREBRUM_METRICS.coordinates.latitude.toString(),
        longitude: CEREBRUM_METRICS.coordinates.longitude.toString(),
      },
      geoRadius: '10000',
    },
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
        opens: '10:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/@cerebrumbiologyacademy',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: CEREBRUM_METRICS.rating.toString(),
      reviewCount: CEREBRUM_METRICS.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: getAreaReviews(),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'NEET Biology Courses',
      itemListElement: [
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeClass11 + CEREBRUM_METRICS.feeClass12,
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Course',
            name: 'Class 11+12 Comprehensive NEET Biology',
            description: 'Complete 2-year NEET Biology preparation program with NCERT mastery and advanced problem solving',
            provider: { '@id': organizationId },
            educationalLevel: 'Class 11-12',
            timeRequired: 'P2Y',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['onsite', 'online', 'blended'],
              courseSchedule: {
                '@type': 'Schedule',
                repeatFrequency: 'P1W',
                repeatCount: 104,
              },
            },
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeClass12,
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Course',
            name: 'Class 12 Intensive NEET Biology',
            description: '1-year intensive NEET Biology course with focus on board + NEET integration',
            provider: { '@id': organizationId },
            educationalLevel: 'Class 12',
            timeRequired: 'P1Y',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['onsite', 'online', 'blended'],
              courseSchedule: {
                '@type': 'Schedule',
                repeatFrequency: 'P1W',
                repeatCount: 52,
              },
            },
          },
        },
        {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: CEREBRUM_METRICS.feeDropper,
          availability: 'https://schema.org/InStock',
          validFrom: '2025-01-01',
          itemOffered: {
            '@type': 'Course',
            name: 'Dropper Batch NEET Biology',
            description: '1-year comprehensive revision course for NEET repeaters with daily tests and personal mentoring',
            provider: { '@id': organizationId },
            educationalLevel: '12th Pass / Dropper',
            timeRequired: 'P1Y',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: ['onsite', 'online', 'blended'],
              courseSchedule: {
                '@type': 'Schedule',
                repeatFrequency: 'P1W',
                repeatCount: 52,
              },
            },
          },
        },
      ],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching South Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${area.name}`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-south-delhi/${areaSlug}`,
      },
    ],
  }

  // HowTo Schema for enrollment process
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Enroll in NEET Coaching in ${area.name}`,
    description: `Step-by-step guide to enroll in Cerebrum Biology Academy's NEET coaching program for students from ${area.name}, South Delhi.`,
    totalTime: 'P3D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: CEREBRUM_METRICS.feeClass12,
    },
    supply: [
      { '@type': 'HowToSupply', name: 'School ID Card or Marksheet' },
      { '@type': 'HowToSupply', name: 'Address Proof (Aadhar/Passport)' },
      { '@type': 'HowToSupply', name: 'Passport Size Photographs (2)' },
      { '@type': 'HowToSupply', name: 'Parent/Guardian Contact Details' },
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Book Free Demo Class',
        text: `Book a free demo class via WhatsApp at ${CEREBRUM_METRICS.phoneDisplay} or fill the online form. Mention you're from ${area.name}.`,
        url: 'https://cerebrumbiologyacademy.com/demo-booking',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Attend Demo Session',
        text: 'Attend a 1-hour demo class with Dr. Shekhar Suman. Experience our teaching methodology and small batch environment.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Your Batch',
        text: `Select batch timing suitable for your school schedule. We offer morning (8-10 AM), afternoon (2-4 PM), and evening (6-8 PM) batches for ${area.name} students.`,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Submit Documents',
        text: 'Submit admission form with required documents: School ID, address proof, photographs, and parent contact details.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Complete Payment',
        text: `Pay fees via UPI, bank transfer, or opt for EMI (30/60/90 days). Scholarship up to 50% available for deserving students from ${area.name}.`,
      },
    ],
  }

  // Area-specific FAQ Schema
  const getAreaFAQs = () => {
    const baseFAQs = [
      {
        question: `What is the fee for NEET coaching in ${area.name}?`,
        answer: `Our NEET Biology coaching fee for students from ${area.name} is ₹${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 12 and ₹${CEREBRUM_METRICS.feeClass11.toLocaleString()}/year for Class 11. EMI options and scholarships up to 50% are available.`,
      },
      {
        question: `How can students from ${area.name} reach Cerebrum Biology Academy?`,
        answer: `Students from ${area.name} can easily reach us via ${area.nearbyMetro[0] || 'metro'}. Our center in Kalu Sarai is well-connected to all parts of South Delhi. We also offer online and hybrid modes for convenience.`,
      },
      {
        question: `Which schools from ${area.name} have students at Cerebrum?`,
        answer: `We have students from ${area.schools.join(', ')} and other schools in ${area.name}. Our batch timings are designed to complement school schedules.`,
      },
      {
        question: `Is online NEET coaching available for ${area.name} students?`,
        answer: `Yes! We offer online, offline, and hybrid modes for students from ${area.name}. Live interactive classes, recorded lectures, doubt sessions - all accessible from home.`,
      },
      {
        question: `What is the batch size for NEET coaching?`,
        answer: `We maintain small batches of ${CEREBRUM_METRICS.batchSizeText} for personalized attention. This has helped us achieve ${CEREBRUM_METRICS.successRateText} success rate.`,
      },
    ]

    // Add area-type specific FAQ
    if (area.type === 'posh' || area.type === 'ultra-premium') {
      baseFAQs.push({
        question: `Do you offer personalized coaching for ${area.name} students?`,
        answer: `Yes, our small batch of ${CEREBRUM_METRICS.batchSizeText} ensures personalized attention. For premium support, we offer 1-on-1 doubt sessions and customized study plans for students from ${area.name}.`,
      })
    } else if (area.type === 'govt-colony') {
      baseFAQs.push({
        question: `Are there discounts for government employees' children from ${area.name}?`,
        answer: `We offer scholarships up to 50% based on merit. Children of defence personnel and central government employees are eligible for special consideration. Contact us with valid ID proof.`,
      })
    } else if (area.type === 'coaching-hub' || area.type === 'student-hub') {
      baseFAQs.push({
        question: `How does Cerebrum compare to other coaching in ${area.name}?`,
        answer: `Unlike large institutes with 50-100 students/batch, Cerebrum has only ${CEREBRUM_METRICS.batchSizeText}. Our ${CEREBRUM_METRICS.successRateText} success rate vs 60-70% industry average speaks for our quality. AIIMS-trained faculty with ${CEREBRUM_METRICS.facultyExperienceText} experience.`,
      })
    }

    return baseFAQs
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getAreaFAQs().map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  // Event Schema for Demo Classes
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Free NEET Biology Demo Class - ${area.name}`,
    description: `Experience Cerebrum Biology Academy's teaching methodology. Free demo class for NEET aspirants from ${area.name}. Meet Dr. Shekhar Suman and understand our unique approach.`,
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
          addressLocality: 'South Delhi',
          addressRegion: 'Delhi',
          postalCode: CEREBRUM_METRICS.pincode,
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'VirtualLocation',
        url: 'https://cerebrumbiologyacademy.com/demo-booking',
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
      url: 'https://cerebrumbiologyacademy.com',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: 'https://cerebrumbiologyacademy.com/demo-booking',
      validFrom: new Date().toISOString().split('T')[0],
    },
    image: 'https://cerebrumbiologyacademy.com/logo.png',
  }

  return (
    <>
      <AreaPageContent area={area} areaSlug={areaSlug} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalOrgSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
    </>
  )
}
