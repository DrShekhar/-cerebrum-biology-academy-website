// src/lib/seo/ratingSchema.ts
// AggregateRating Schema - Enables Star Ratings in SERP

interface ReviewData {
  author: string
  reviewBody: string
  reviewRating: number
  datePublished: string
}

/**
 * Generate AggregateRating schema for the organization
 * Shows star ratings in Google Search results
 */
export function generateAggregateRatingSchema(reviews?: ReviewData[]) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    description:
      "Delhi NCR's leading NEET Biology coaching institute with 98% success rate. Specializing exclusively in Biology coaching for NEET and board exams.",
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/brain-logo.webp',
    image: 'https://cerebrumbiologyacademy.com/og-image.jpg',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'D 35, South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/channel/UCzTybzV6CmTuestvWo2bRQw@cerebrumbiologyacademy',
      'https://www.youtube.com/channel/UCzTybzV6CmTuestvWo2bRQw@drshekharcsingh',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
      'https://twitter.com/CerebrumBio',
      'https://www.facebook.com/cerebrumbiologyacademy',
    ],
  }

  // Add individual reviews if provided
  if (reviews && reviews.length > 0) {
    schema.review = reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.reviewRating,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: review.datePublished,
    }))
  }

  return schema
}

// Featured reviews removed 2026-06: self-serving schema-only review markup
// (fabricated/unverifiable authors + ratings) violates Google's review snippet
// policy. Real reviews must come from verified users on the Google Business
// Profile. Kept as an empty export so existing importers stay valid.
export const featuredReviews: ReviewData[] = []

/**
 * Generate Course rating schema for individual courses
 */
export function generateCourseRatingSchema(courseData: {
  name: string
  description: string
  provider: string
  url: string
  price: number
  priceCurrency?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseData.name,
    description: courseData.description,
    provider: {
      '@type': 'Organization',
      name: courseData.provider,
      url: 'https://cerebrumbiologyacademy.com',
    },
    url: courseData.url,
    offers: {
      '@type': 'Offer',
      price: courseData.price,
      priceCurrency: courseData.priceCurrency || 'INR',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
    },
  }
}

// Pre-configured course ratings
export const courseRatings = {
  crashCourse: {
    name: 'NEET 2027 Biology Crash Course',
    description:
      'Intensive 4-month NEET Biology preparation course with 200+ hours of live classes, complete study material, and 20 mock tests.',
    provider: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com/courses/neet-crash-course',
    price: 78000,
  },
  twoYear: {
    name: 'NEET 2027 Two-Year Program',
    description:
      'Comprehensive 2-year NEET Biology preparation for Class 11 students with integrated board exam preparation.',
    provider: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com/courses/neet-complete',
    price: 58000,
  },
  dropper: {
    name: 'NEET Dropper Course',
    description:
      'Dedicated 1-year program for NEET repeaters with focused preparation, psychological support, and daily tests.',
    provider: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
    price: 68000,
  },
  foundation: {
    name: 'Class 9-10 Biology Foundation',
    description:
      'Early foundation course to build strong Biology fundamentals for future NEET aspirants.',
    provider: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com/courses/foundation',
    price: 48000,
  },
}
