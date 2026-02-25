/**
 * Speakable Schema Component
 *
 * Helps voice assistants (Google Assistant, Alexa, Siri) identify content
 * that is suitable for text-to-speech reading. This is crucial for voice
 * search optimization, which is growing rapidly.
 *
 * @see https://schema.org/speakable
 * @see https://developers.google.com/search/docs/appearance/structured-data/speakable
 */

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

interface SpeakableSchemaProps {
  headline: string
  description: string
  cssSelectors?: string[]
  url: string
  datePublished?: string
  dateModified?: string
}

export function SpeakableSchema({
  headline,
  description,
  cssSelectors = ['[data-speakable="intro"]', '[data-speakable="key-info"]'],
  url,
  datePublished,
  dateModified,
}: SpeakableSchemaProps) {
  const speakableData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: headline,
    description: description,
    url: url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://www.cerebrumbiologyacademy.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableData) }}
    />
  )
}

interface VoiceSearchContentProps {
  intro: string
  keyInfo: string[]
  className?: string
}

/**
 * Component to wrap content that should be read by voice assistants.
 * Use this to mark up key information on your pages.
 */
export function VoiceSearchContent({ intro, keyInfo, className = '' }: VoiceSearchContentProps) {
  return (
    <div className={className}>
      <p data-speakable="intro" className="sr-only">{intro}</p>
      <div data-speakable="key-info" className="sr-only">
        {keyInfo.map((info, index) => (
          <p key={index}>{info}</p>
        ))}
      </div>
    </div>
  )
}

interface CourseSchemaWithSpeakableProps {
  courseName: string
  courseDescription: string
  instructor: string
  location: string
  price?: number
  url: string
}

/**
 * Course schema with speakable content for NEET Biology courses
 */
export function CourseSchemaWithSpeakable({
  courseName,
  courseDescription,
  instructor,
  location,
  price = 75000,
  url,
}: CourseSchemaWithSpeakableProps) {
  const courseData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: courseDescription,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://www.cerebrumbiologyacademy.com',
    },
    instructor: {
      '@type': 'Person',
      name: instructor,
      jobTitle: 'AIIMS Alumnus and NEET Biology Expert',
    },
    courseMode: ['online', 'offline'],
    educationalLevel: 'Intermediate',
    teaches: 'NEET Biology Preparation',
    numberOfCredits: 1,
    occupationalCredentialAwarded: 'NEET Biology Certification',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['online', 'offline'],
      courseWorkload: 'PT20H/Week',
      location: {
        '@type': 'Place',
        name: location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location,
          addressCountry: 'India',
        },
      },
    },
    offers: {
      '@type': 'Offer',
      price: price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="course-summary"]', '[data-speakable="course-highlights"]'],
    },
    url: url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(courseData) }}
    />
  )
}

interface LocalBusinessSpeakableProps {
  businessName: string
  areaServed: string[]
  description: string
  url: string
}

/**
 * LocalBusiness schema with speakable for location pages
 */
export function LocalBusinessSpeakable({
  businessName,
  areaServed,
  description,
  url,
}: LocalBusinessSpeakableProps) {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    name: businessName,
    description: description,
    url: url,
    telephone: CONTACT_INFO.phone.primary,
    priceRange: '₹45,000 - ₹1,80,000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'D 35, South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.5678,
      longitude: 77.2234,
    },
    areaServed: areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="business-intro"]', '[data-speakable="contact-info"]', '[data-speakable="areas-served"]'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  )
}

/**
 * Generate speakable text for voice search optimization
 */
export function generateSpeakableText(location: string): string {
  return `Cerebrum Biology Academy offers expert NEET Biology coaching in ${location}. Learn from Dr. Shekhar C Singh, AIIMS Alumnus with over 15 years of experience. We have helped more than 500 students clear NEET. Book your free demo class by calling ${CONTACT_INFO.phone.display.primary.replace(/\s/g, '')}.`
}

/**
 * Voice Search FAQ Schema with speakable
 */
export function VoiceSearchFAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const faqData = {
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
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable="faq-question"]', '[data-speakable="faq-answer"]'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}
