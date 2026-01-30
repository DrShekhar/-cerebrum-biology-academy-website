/**
 * Faridabad-Specific Schema Generators
 * Centralized schema generation for all Faridabad SEO pages
 */

import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { FaridabadAreaDetails } from '@/data/faridabad-areas'
import { FARIDABAD_CENTER_METRICS, CEREBRUM_METRICS } from '@/lib/constants/metrics'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

/**
 * Generate LocalBusiness schema for a specific Faridabad area
 */
export function generateFaridabadLocalBusinessSchema(
  area: FaridabadAreaDetails,
  slug: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/neet-coaching-faridabad/${slug}#localbusiness`,
    name: `Cerebrum Biology Academy - NEET Coaching ${area.name}`,
    alternateName: [
      `NEET Coaching ${area.name} Faridabad`,
      `Best NEET Coaching ${area.fullName}`,
      `Biology Coaching ${area.name}`,
    ],
    description: `Premier NEET Biology coaching serving ${area.name}, Faridabad. ${CEREBRUM_METRICS.successRate}% success rate, AIIMS faculty, small batches. Students from ${area.schools.slice(0, 2).join(', ')} trust us.`,
    url: `${BASE_URL}/neet-coaching-faridabad/${slug}`,
    telephone: CONTACT_INFO.phone.primary,
    email: CONTACT_INFO.email.info,
    image: [
      `${BASE_URL}/og-image.jpg`,
      `${BASE_URL}/images/faridabad-center.jpg`,
    ],
    logo: `${BASE_URL}/logo.png`,
    priceRange: '\u20B9\u20B9-\u20B9\u20B9\u20B9',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.centers.faridabad.streetAddress,
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: area.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: FARIDABAD_CENTER_METRICS.coordinates.latitude,
      longitude: FARIDABAD_CENTER_METRICS.coordinates.longitude,
    },
    hasMap: CONTACT_INFO.centers.faridabad.mapUrl,
    areaServed: {
      '@type': 'Place',
      name: area.fullName,
      containedIn: {
        '@type': 'City',
        name: 'Faridabad',
        containedIn: {
          '@type': 'State',
          name: 'Haryana',
        },
      },
    },
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1200',
      bestRating: '5',
      worstRating: '1',
    },
  }
}

/**
 * Generate FAQ schema for a specific Faridabad area
 */
export function generateFaridabadFAQSchema(
  area: FaridabadAreaDetails,
  slug: string
) {
  const baseFaqs = [
    {
      question: `What is the fee for NEET coaching in ${area.name}?`,
      answer: `Our NEET Biology coaching fees for ${area.name} students range from \u20B945,000 to \u20B91,56,000 per year depending on the program. Class 11: \u20B948,000-\u20B998,000, Class 12: \u20B970,000-\u20B91,56,000. All programs include AIIMS faculty and small batches of 15 students.`,
    },
    {
      question: `How far is ${area.name} from your Sector 17 center?`,
      answer: `${area.name} is ${area.distanceFromCenter} from our Sector 17, Faridabad center. ${area.nearbyMetro.length > 0 ? `Students can reach us via ${area.nearbyMetro[0]}.` : 'We also offer online live classes for convenience.'}`,
    },
    {
      question: `Which schools do you serve from ${area.name}?`,
      answer: `We have students from ${area.schools.join(', ')} and other schools in ${area.name}. Our batches are designed to accommodate school schedules with morning and evening slots.`,
    },
    {
      question: `Do you offer online classes for ${area.name} students?`,
      answer: `Yes! Students from ${area.name} can join our live online classes via Zoom. Same AIIMS faculty, same quality, recorded sessions available. Many students from ${area.societies.slice(0, 2).join(' and ')} prefer online coaching for convenience.`,
    },
    {
      question: `What are the batch timings for ${area.name} students?`,
      answer: `We offer multiple batch timings: Morning (7 AM-10 AM), Evening (6 PM-9 PM), and Weekend batches (Saturday-Sunday). ${area.name} students can choose based on their school schedule.`,
    },
  ]

  // Add type-specific FAQs
  if (area.type === 'premium' || area.type === 'greater-faridabad') {
    baseFaqs.push({
      question: `Do you offer pickup service for ${area.societies[0]} residents?`,
      answer: `While we don't offer pickup service, our center is easily accessible from ${area.societies[0]}. Many students from premium societies in ${area.name} also prefer our live online classes for added convenience.`,
    })
  }

  if (area.type === 'old-city') {
    baseFaqs.push({
      question: `Is there affordable NEET coaching for ${area.name} students?`,
      answer: `Yes! We offer merit-based scholarships up to 50% for deserving students from ${area.name}. EMI options (\u20B95,000-8,000/month) are also available. Quality NEET coaching shouldn't be limited by finances.`,
    })
  }

  if (area.nearbyMetro.length > 0) {
    baseFaqs.push({
      question: `How to reach from ${area.nearbyMetro[0]}?`,
      answer: `From ${area.nearbyMetro[0]}, our Sector 17 center is easily reachable. Take the Violet Line metro and get down at Bata Chowk station. Our center is just 5 minutes walk from there.`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: baseFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Breadcrumb schema for Faridabad area pages
 */
export function generateFaridabadBreadcrumbSchema(
  slug: string,
  areaName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching Faridabad',
        item: `${BASE_URL}/neet-coaching-faridabad`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `NEET Coaching ${areaName}`,
        item: `${BASE_URL}/neet-coaching-faridabad/${slug}`,
      },
    ],
  }
}

/**
 * Generate Event schema for free demo class in Faridabad area
 */
export function generateFaridabadEventSchema(
  area: FaridabadAreaDetails,
  slug: string
) {
  const nextSaturday = new Date()
  nextSaturday.setDate(nextSaturday.getDate() + ((6 - nextSaturday.getDay() + 7) % 7 || 7))
  const eventDate = nextSaturday.toISOString().split('T')[0]

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Free NEET Biology Demo Class for ${area.name} Students`,
    description: `Experience our teaching methodology with a FREE 2-hour demo class. Open to all NEET aspirants from ${area.name} and ${area.societies.slice(0, 2).join(', ')}.`,
    startDate: `${eventDate}T10:00:00+05:30`,
    endDate: `${eventDate}T12:00:00+05:30`,
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: [
      {
        '@type': 'Place',
        name: 'Cerebrum Biology Academy - Faridabad',
        address: {
          '@type': 'PostalAddress',
          streetAddress: CONTACT_INFO.centers.faridabad.streetAddress,
          addressLocality: 'Faridabad',
          addressRegion: 'Haryana',
          postalCode: '121002',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'VirtualLocation',
        url: `${BASE_URL}/demo-booking`,
      },
    ],
    image: `${BASE_URL}/og-image.jpg`,
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
      validFrom: new Date().toISOString(),
    },
    performer: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'AIIMS Faculty & Founder',
    },
  }
}

/**
 * Generate HowTo schema for enrollment process
 */
export function generateFaridabadHowToSchema(area: FaridabadAreaDetails) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Enroll for NEET Coaching in ${area.name}, Faridabad`,
    description: `Step-by-step guide for ${area.name} students to join Cerebrum Biology Academy's NEET coaching program.`,
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
        text: `Book a free 2-hour demo class online or call ${CONTACT_INFO.phone.display.primary}. Available on weekends at 10 AM, 2 PM, and 5 PM.`,
        url: `${BASE_URL}/demo-booking`,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Attend Demo Class',
        text: 'Experience our teaching methodology with AIIMS faculty. Ask questions, interact with students, see our study material.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Choose Your Batch',
        text: 'Select from morning (7 AM), evening (6 PM), or weekend batches based on your school schedule.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Complete Enrollment',
        text: 'Pay fees online or at center. EMI options available. Receive study material and class access immediately.',
        url: `${BASE_URL}/enrollment`,
      },
    ],
  }
}

/**
 * Generate Course schema for Faridabad offerings
 */
export function generateFaridabadCourseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Coaching Program - Faridabad',
    description: 'Comprehensive NEET Biology preparation by AIIMS faculty in Faridabad. Small batches of 15 students, 94% success rate, both offline and online options.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy - Faridabad',
      sameAs: BASE_URL,
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        name: 'NEET 2026 Class 11 Biology',
        courseMode: ['online', 'onsite'],
        duration: 'P1Y',
        inLanguage: 'en',
        courseWorkload: 'PT15H per week',
        instructor: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
          jobTitle: 'AIIMS Faculty',
        },
      },
      {
        '@type': 'CourseInstance',
        name: 'NEET 2026 Class 12 Biology',
        courseMode: ['online', 'onsite'],
        duration: 'P1Y',
        inLanguage: 'en',
        courseWorkload: 'PT18H per week',
        instructor: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
          jobTitle: 'AIIMS Faculty',
        },
      },
    ],
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '45000',
      highPrice: '156000',
      priceCurrency: 'INR',
      offerCount: '4',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'NEET Aspirants from Faridabad',
    },
    coursePrerequisites: 'Class 10th completion',
    teaches: ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Ecology', 'Cell Biology'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1200',
      bestRating: '5',
    },
  }
}

/**
 * Generate Faridabad Service Area schema
 */
export function generateFaridabadServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BASE_URL}/neet-coaching-faridabad#service`,
    name: 'NEET Biology Coaching Faridabad',
    alternateName: ['NEET Coaching Faridabad', 'Best NEET Coaching Faridabad'],
    description: 'Premier NEET Biology coaching in Faridabad serving Greater Faridabad, NIT, Ballabgarh, Old Faridabad, and 30+ areas. 94% success rate, AIIMS faculty, small batches.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      sameAs: BASE_URL,
    },
    serviceType: 'NEET Coaching',
    category: 'Educational Services',
    areaServed: {
      '@type': 'City',
      name: 'Faridabad',
      containedIn: {
        '@type': 'State',
        name: 'Haryana',
      },
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${BASE_URL}/neet-coaching-faridabad`,
      servicePhone: CONTACT_INFO.phone.primary,
      availableLanguage: ['English', 'Hindi'],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1200',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Faridabad NEET Coaching Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Greater Faridabad',
            description: 'Serving BPTP Parklands, Omaxe Heights, RPS Palms, SRS Residency',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching NIT Faridabad',
            description: 'Serving NIT colony, Sector 17, educational hub',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Ballabgarh',
            description: 'Serving Ballabgarh, Asavari, industrial areas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NEET Coaching Old Faridabad',
            description: 'Serving Old Faridabad, Railway Road, heritage areas',
          },
        },
      ],
    },
  }
}
