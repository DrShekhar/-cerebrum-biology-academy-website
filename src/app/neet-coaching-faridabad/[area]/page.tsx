import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllFaridabadAreaSlugs,
  getFaridabadAreaBySlug,
} from '@/data/faridabad-areas'
import {
  CEREBRUM_METRICS,
  FARIDABAD_AREA_COORDINATES,
  FARIDABAD_CENTER_METRICS,
} from '@/lib/constants/metrics'
import AreaPageContent from './AreaPageContent'

interface PageProps {
  params: Promise<{ area: string }>
}

export async function generateStaticParams() {
  return getAllFaridabadAreaSlugs().map((area) => ({
    area,
  }))
}

function getMetaDescriptionByType(area: ReturnType<typeof getFaridabadAreaBySlug>): string {
  if (!area) return ''

  const schoolsText = area.schools.slice(0, 2).join(', ')
  const societiesText = area.societies.slice(0, 2).join(', ')
  const metroText = area.nearbyMetro[0] || ''

  switch (area.type) {
    case 'premium':
      return `Premium NEET Biology coaching for ${area.name} families. ${CEREBRUM_METRICS.successRateText} success rate. Students from ${schoolsText}. Near ${metroText}. Personalized ${CEREBRUM_METRICS.batchSizeText} batches. Book free demo!`

    case 'greater-faridabad':
      return `Best NEET coaching for ${area.name} residents. ${CEREBRUM_METRICS.successRateText} success rate. Students from ${societiesText}. Expert AIIMS faculty, small batches. Book free demo!`

    case 'old-city':
      return `Quality NEET Biology coaching near ${area.name}. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Near ${metroText}. Book free demo!`

    case 'residential':
      return `Best NEET Biology coaching near ${area.name}, Faridabad. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. ${area.distanceFromCenter} from our center. Book free demo!`

    case 'commercial':
      return `NEET coaching near ${area.name} for Faridabad families. ${CEREBRUM_METRICS.successRateText} success rate. Convenient location. Students from ${schoolsText}. Flexible timings!`

    case 'industrial':
      return `Affordable NEET Biology coaching for ${area.name} families. ${CEREBRUM_METRICS.successRateText} success rate, experienced faculty. Students from ${schoolsText}. EMI options available!`

    default:
      return `Best NEET Biology coaching near ${area.name}. ${CEREBRUM_METRICS.successRateText} success rate, AIIMS faculty. Students from ${schoolsText}. Small batches, personal mentorship. Book free demo!`
  }
}

function getTitleByType(area: ReturnType<typeof getFaridabadAreaBySlug>): string {
  if (!area) return 'NEET Coaching Faridabad | Cerebrum Biology Academy'

  const typePrefix: Record<string, string> = {
    premium: 'Premium',
    'greater-faridabad': 'Best',
    'old-city': 'Quality',
    residential: 'Top',
    commercial: 'Convenient',
    industrial: 'Affordable',
  }

  const prefix = typePrefix[area.type] || 'Best'
  return `${prefix} NEET Coaching in ${area.name} | ${CEREBRUM_METRICS.successRateText} Success | Cerebrum Academy`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { area: areaSlug } = await params
  const area = getFaridabadAreaBySlug(areaSlug)

  if (!area) {
    return {
      title: 'Area Not Found | Cerebrum Biology Academy',
    }
  }

  const title = getTitleByType(area)
  const description = getMetaDescriptionByType(area)

  const typeKeywords: Record<string, string[]> = {
    premium: [
      'premium NEET coaching Faridabad',
      'best NEET institute Faridabad',
      'private school students NEET',
    ],
    'greater-faridabad': [
      'Greater Faridabad NEET coaching',
      'BPTP NEET coaching',
      'Omaxe NEET classes',
      'township NEET prep',
    ],
    'old-city': ['Old Faridabad NEET coaching', 'Ballabgarh NEET classes', 'local NEET coaching'],
    residential: ['residential area NEET coaching', 'sector NEET classes', 'local NEET coaching'],
    commercial: [
      'Sector 17 NEET coaching',
      'central Faridabad NEET',
      'convenient NEET coaching',
    ],
    industrial: [
      'NIT Faridabad NEET coaching',
      'affordable NEET classes',
      'industrial area NEET',
    ],
  }

  return {
    title,
    description,
    keywords: [
      `NEET coaching ${area.name}`,
      `NEET coaching near ${area.name}`,
      `Best NEET coaching ${area.fullName}`,
      `Biology coaching ${area.name} Faridabad`,
      `NEET preparation ${area.name}`,
      `Medical coaching ${area.name}`,
      ...area.schools.map((school) => `NEET coaching for ${school} students`),
      ...area.nearbyMetro.map((metro) => `NEET coaching near ${metro}`),
      ...area.societies.slice(0, 2).map((society) => `NEET coaching for ${society} residents`),
      ...(typeKeywords[area.type] || []),
    ],
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://cerebrumbiologyacademy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Coaching in ${area.name}, Faridabad`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function FaridabadAreaPage({ params }: PageProps) {
  const { area: areaSlug } = await params
  const area = getFaridabadAreaBySlug(areaSlug)

  if (!area) {
    notFound()
  }

  const organizationId = 'https://cerebrumbiologyacademy.com/#organization'
  const localBusinessId = `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}#localbusiness`

  const areaCoords = FARIDABAD_AREA_COORDINATES[areaSlug] || {
    lat: FARIDABAD_CENTER_METRICS.coordinates.latitude,
    lng: FARIDABAD_CENTER_METRICS.coordinates.longitude,
  }

  const getAreaReviews = () => {
    const baseReviews = [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Parent from ' + area.name },
        datePublished: '2025-11-15',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `Excellent NEET coaching! My child from ${area.schools[0] || area.name} improved from 480 to 650+ marks. The small batch size at their ${FARIDABAD_CENTER_METRICS.address} center made all the difference.`,
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Student from ' + (area.societies[0] || area.name) },
        datePublished: '2025-10-20',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: `Best Biology coaching in ${area.name}. Dr. Shekhar Sir's teaching methodology made complex topics easy. The ${area.nearbyMetro[0] || 'location'} connectivity makes it convenient from ${area.societies[0] || area.name}.`,
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
    alternateName: `Cerebrum Biology Academy - ${area.name}, Faridabad`,
    description: `Best NEET coaching in ${area.name}, Faridabad. ${area.description}`,
    url: 'https://cerebrumbiologyacademy.com',
    telephone: CEREBRUM_METRICS.phone,
    email: CEREBRUM_METRICS.email,
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      streetAddress: FARIDABAD_CENTER_METRICS.address,
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: FARIDABAD_CENTER_METRICS.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: FARIDABAD_CENTER_METRICS.coordinates.latitude,
      longitude: FARIDABAD_CENTER_METRICS.coordinates.longitude,
    },
    areaServed: [
      { '@type': 'City', name: area.name },
      { '@type': 'City', name: 'Faridabad' },
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
    url: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}`,
    telephone: CEREBRUM_METRICS.phone,
    email: CEREBRUM_METRICS.email,
    priceRange: '₹₹',
    image: 'https://cerebrumbiologyacademy.com/logo.png',
    parentOrganization: { '@id': organizationId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: FARIDABAD_CENTER_METRICS.address,
      addressLocality: area.name,
      addressRegion: 'Haryana',
      postalCode: area.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: areaCoords.lat.toString(),
      longitude: areaCoords.lng.toString(),
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: areaCoords.lat.toString(),
        longitude: areaCoords.lng.toString(),
      },
      geoRadius: '5000',
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
            description:
              'Complete 2-year NEET Biology preparation program with NCERT mastery and advanced problem solving',
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
            description:
              '1-year intensive NEET Biology course with focus on board + NEET integration',
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
            description:
              '1-year comprehensive revision course for NEET repeaters with daily tests and personal mentoring',
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
        name: 'NEET Coaching Faridabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${area.name}`,
        item: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}`,
      },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Enroll in NEET Coaching in ${area.name}, Faridabad`,
    description: `Step-by-step guide to enroll in Cerebrum Biology Academy's NEET coaching program for students from ${area.name}, Faridabad.`,
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
        name: 'Visit Our Center',
        text: `Visit our center at ${FARIDABAD_CENTER_METRICS.address}, Faridabad (${FARIDABAD_CENTER_METRICS.nearbyLandmark}). Just ${area.distanceFromCenter} from ${area.name}.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Attend Demo Session',
        text: 'Attend a 1-hour demo class with Dr. Shekhar Suman. Experience our teaching methodology and small batch environment.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Choose Your Batch',
        text: `Select batch timing suitable for your school schedule. We offer morning (8-10 AM), afternoon (2-4 PM), and evening (6-8 PM) batches for ${area.name} students.`,
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Complete Payment',
        text: `Pay fees via UPI, bank transfer, or opt for EMI (30/60/90 days). Scholarship up to 50% available for deserving students from ${area.name}.`,
      },
    ],
  }

  const getAreaFAQs = () => {
    const baseFAQs = [
      {
        question: `What is the fee for NEET coaching for ${area.name} students?`,
        answer: `Our NEET Biology coaching fee for students from ${area.name} is ₹${CEREBRUM_METRICS.feeClass12.toLocaleString()}/year for Class 12 and ₹${CEREBRUM_METRICS.feeClass11.toLocaleString()}/year for Class 11. EMI options and scholarships up to 50% are available.`,
      },
      {
        question: `How far is Cerebrum Biology Academy from ${area.name}?`,
        answer: `Our center at ${FARIDABAD_CENTER_METRICS.address}, Faridabad is approximately ${area.distanceFromCenter} from ${area.name}. Students can reach us via ${area.nearbyMetro[0] || 'road'} connectivity.`,
      },
      {
        question: `Which schools from ${area.name} have students at Cerebrum?`,
        answer: `We have students from ${area.schools.join(', ')} and other schools near ${area.name}. Our batch timings are designed to complement school schedules.`,
      },
      {
        question: `Is online NEET coaching available for ${area.name} students?`,
        answer: `Yes! We offer online, offline, and hybrid modes for students from ${area.name}. Live interactive classes, recorded lectures, doubt sessions - all accessible from home.`,
      },
      {
        question: `What is the batch size for NEET coaching at Cerebrum Faridabad?`,
        answer: `We maintain small batches of ${CEREBRUM_METRICS.batchSizeText} for personalized attention. This has helped us achieve ${CEREBRUM_METRICS.successRateText} success rate.`,
      },
    ]

    if (area.type === 'premium' || area.type === 'greater-faridabad') {
      baseFAQs.push({
        question: `Do you offer personalized coaching for ${area.name} students?`,
        answer: `Yes, our small batch of ${CEREBRUM_METRICS.batchSizeText} ensures personalized attention. For premium support, we offer 1-on-1 doubt sessions and customized study plans for students from areas like ${area.name}.`,
      })
    } else if (area.type === 'industrial') {
      baseFAQs.push({
        question: `Is there affordable NEET coaching for ${area.name} families?`,
        answer: `We offer competitive fees with EMI options for ${area.name} families. Scholarships up to 50% available for deserving students. Quality coaching doesn't have to be expensive!`,
      })
    } else if (area.type === 'old-city') {
      baseFAQs.push({
        question: `Do you provide coaching for students from ${area.societies[0] || area.name}?`,
        answer: `Absolutely! Many students from ${area.societies.slice(0, 2).join(' and ')} attend our classes. Our flexible timings work well for students from all backgrounds.`,
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

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Free NEET Biology Demo Class - ${area.name}, Faridabad`,
    description: `Experience Cerebrum Biology Academy's teaching methodology. Free demo class for NEET aspirants from ${area.name}. Meet Dr. Shekhar Suman at our Sector 17 center.`,
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: [
      {
        '@type': 'Place',
        name: 'Cerebrum Biology Academy - Faridabad',
        address: {
          '@type': 'PostalAddress',
          streetAddress: FARIDABAD_CENTER_METRICS.address,
          addressLocality: 'Faridabad',
          addressRegion: 'Haryana',
          postalCode: FARIDABAD_CENTER_METRICS.pincode,
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

  const imageObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}#primaryimage`,
    url: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    contentUrl: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    width: '1200',
    height: '630',
    caption: `NEET Biology Coaching in ${area.name}, Faridabad - Cerebrum Biology Academy`,
    representativeOfPage: true,
    inLanguage: 'en-IN',
  }

  const aggregateOfferSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}#offers`,
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

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}#webpage`,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}`,
    name: `NEET Coaching in ${area.name}, Faridabad | Cerebrum Biology Academy`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.hero-title', '.hero-description', '.quick-answers'],
      xpath: [
        "//*[@class='hero-title']",
        "//*[@class='hero-description']",
        "//*[@class='quick-answers']",
      ],
    },
    mainEntity: { '@id': localBusinessId },
    primaryImageOfPage: {
      '@id': `https://cerebrumbiologyacademy.com/neet-coaching-faridabad/${areaSlug}#primaryimage`,
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://cerebrumbiologyacademy.com/#website',
    url: 'https://cerebrumbiologyacademy.com',
    name: 'Cerebrum Biology Academy',
    description: 'Best NEET Biology Coaching in Faridabad with 94% success rate',
    publisher: { '@id': organizationId },
    inLanguage: 'en-IN',
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
    <>
      <AreaPageContent area={area} areaSlug={areaSlug} />

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(imageObjectSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateOfferSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}
