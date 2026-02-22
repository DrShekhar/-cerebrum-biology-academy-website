/**
 * Dynamic Course Schema for individual course detail pages.
 * Generates rich Course + CourseInstance schema for Google Rich Results.
 *
 * Usage:
 *   <CourseDetailSchema
 *     courseName="NEET Biology Class 11 - Pinnacle"
 *     description="Comprehensive Class 11 NEET biology preparation..."
 *     duration="P1Y"
 *     price={85000}
 *     batchSize={12}
 *     targetClass="Class 11"
 *     slug="class-11-neet-comprehensive"
 *   />
 */

interface CourseDetailSchemaProps {
  courseName: string
  description: string
  duration: string // ISO 8601: P1Y, P6M, P2Y
  price: number
  batchSize?: number
  targetClass: string
  slug: string
  learningMode?: string[]
  teaches?: string[]
}

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export function CourseDetailSchema({
  courseName,
  description,
  duration,
  price,
  batchSize = 15,
  targetClass,
  slug,
  learningMode = ['online', 'onsite'],
  teaches = ['Botany', 'Zoology', 'Human Physiology', 'Genetics', 'Ecology', 'Cell Biology'],
}: CourseDetailSchemaProps) {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${BASE_URL}/courses/${slug}#course`,
    name: courseName,
    description,
    url: `${BASE_URL}/courses/${slug}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: BASE_URL,
      sameAs: [
        'https://www.facebook.com/cerebrumbiologyacademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
        'https://www.youtube.com/@cerebrumbiologyacademy',
        'https://www.youtube.com/@drshekharcsingh',
      ],
    },
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    inLanguage: 'en',
    isAccessibleForFree: false,
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: learningMode,
        duration,
        inLanguage: 'en',
        courseSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P1W',
          repeatCount: duration === 'P1Y' ? 52 : duration === 'P6M' ? 26 : duration === 'P2Y' ? 104 : 52,
        },
        instructor: [
          {
            '@type': 'Person',
            name: 'Dr. Shekhar C Singh',
            jobTitle: 'Founder & Senior Biology Faculty',
            description: 'AIIMS Delhi alumnus with 15+ years of NEET coaching experience',
            worksFor: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
            },
          },
        ],
        location: [
          {
            '@type': 'Place',
            name: 'Cerebrum Biology Academy - South Extension',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'D 35, South Extension Part 2',
              addressLocality: 'New Delhi',
              addressRegion: 'Delhi',
              postalCode: '110049',
              addressCountry: 'IN',
            },
          },
          {
            '@type': 'VirtualLocation',
            url: `${BASE_URL}/courses/${slug}`,
          },
        ],
      },
    ],
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: '2025-06-01',
      priceValidUntil: '2026-12-31',
      category: 'NEET Biology Coaching',
      url: `${BASE_URL}/pricing`,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: `${targetClass} NEET Aspirants`,
    },
    teaches,
    coursePrerequisites:
      targetClass.includes('9') || targetClass.includes('10')
        ? 'Interest in Biology and Medical Career'
        : targetClass.includes('Dropper') || targetClass.includes('dropper')
          ? 'Class 12 completion, previous NEET attempt'
          : 'Class 10th completion with Science',
    educationalLevel: targetClass,
    numberOfCredits: batchSize,
    maximumEnrollment: batchSize,
    occupationalCredentialAwarded: 'NEET Preparation Certificate',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(courseSchema),
      }}
    />
  )
}
