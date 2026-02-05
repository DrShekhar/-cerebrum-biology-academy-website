// Server Component - Course Pricing Schema with Aggregate Offers
// Enables price comparison in Google Search results
import Script from 'next/script'

interface CourseTier {
  name: string
  description: string
  price: number
  originalPrice?: number
  features: string[]
  availability?: 'InStock' | 'LimitedAvailability' | 'PreOrder' | 'SoldOut'
  validUntil?: string
}

interface CourseOfferSchemaProps {
  courseName: string
  courseDescription: string
  courseUrl: string
  courseImage?: string
  tiers: CourseTier[]
  instructor: {
    name: string
    role: string
    image?: string
  }
  duration: string
  educationalLevel: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Dropper'
  teaches: string[]
  rating?: {
    value: number
    count: number
  }
}

export function CourseOfferSchema({
  courseName,
  courseDescription,
  courseUrl,
  courseImage,
  tiers,
  instructor,
  duration,
  educationalLevel,
  teaches,
  rating,
}: CourseOfferSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  const prices = tiers.map(t => t.price)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    description: courseDescription,
    url: courseUrl,
    image: courseImage ? `${baseUrl}${courseImage}` : `${baseUrl}/og-image.jpg`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201301',
        addressCountry: 'IN',
      },
    },
    instructor: {
      '@type': 'Person',
      name: instructor.name,
      jobTitle: instructor.role,
      image: instructor.image,
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
    },
    // Course duration in ISO 8601 format
    timeRequired: duration,
    hasCourseInstance: tiers.map(tier => ({
      '@type': 'CourseInstance',
      name: `${courseName} - ${tier.name}`,
      description: tier.description,
      courseMode: ['online', 'onsite'],
      courseWorkload: duration,
      offers: {
        '@type': 'Offer',
        name: tier.name,
        description: tier.description,
        price: tier.price,
        priceCurrency: 'INR',
        ...(tier.originalPrice && {
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: tier.price,
            priceCurrency: 'INR',
            valueAddedTaxIncluded: true,
            referenceQuantity: {
              '@type': 'QuantitativeValue',
              value: tier.originalPrice,
              unitText: 'Original Price',
            },
          },
        }),
        availability: `https://schema.org/${tier.availability || 'InStock'}`,
        validFrom: new Date().toISOString().split('T')[0],
        ...(tier.validUntil && { priceValidUntil: tier.validUntil }),
        seller: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
        },
        itemOffered: {
          '@type': 'Course',
          name: `${courseName} - ${tier.name}`,
        },
      },
    })),
    // Aggregate offer for price range display
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: tiers.length,
      offers: tiers.map(tier => ({
        '@type': 'Offer',
        name: tier.name,
        price: tier.price,
        priceCurrency: 'INR',
        availability: `https://schema.org/${tier.availability || 'InStock'}`,
        itemOffered: {
          '@type': 'Service',
          name: tier.name,
          description: tier.features.join(', '),
        },
      })),
    },
    // Educational properties
    educationalLevel: educationalLevel,
    teaches: teaches,
    inLanguage: ['en', 'hi'],
    isAccessibleForFree: false,
    // Rating if available
    ...(rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating.value,
        bestRating: 5,
        worstRating: 1,
        ratingCount: rating.count,
        reviewCount: Math.floor(rating.count * 0.7),
      },
    }),
    // Additional properties for rich results
    coursePrerequisites: 'Basic understanding of Biology from Class 10',
    educationalCredentialAwarded: 'Course Completion Certificate',
    numberOfCredits: {
      '@type': 'StructuredValue',
      value: '720',
      unitText: 'Hours',
    },
  }

  return (
    <Script
      id="course-offer-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Course comparison table schema for listing pages
interface CourseComparisonSchemaProps {
  courses: Array<{
    name: string
    url: string
    lowestPrice: number
    highestPrice: number
    rating: number
    reviewCount: number
  }>
}

export function CourseComparisonSchema({ courses }: CourseComparisonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'NEET Biology Courses Comparison',
    description: 'Compare NEET Biology coaching courses by price, features, and ratings',
    numberOfItems: courses.length,
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.name,
        url: course.url,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'INR',
          lowPrice: course.lowestPrice,
          highPrice: course.highestPrice,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: course.rating,
          reviewCount: course.reviewCount,
        },
      },
    })),
  }

  return (
    <Script
      id="course-comparison-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Feature comparison schema for tier pages
interface FeatureComparisonProps {
  courseName: string
  tiers: Array<{
    name: string
    price: number
    features: Array<{
      name: string
      value: string | boolean
    }>
  }>
}

export function FeatureComparisonSchema({ courseName, tiers }: FeatureComparisonProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: courseName,
    brand: {
      '@type': 'Brand',
      name: 'Cerebrum Biology Academy',
    },
    category: 'Educational Services > NEET Coaching',
    hasVariant: tiers.map(tier => ({
      '@type': 'ProductModel',
      name: `${courseName} - ${tier.name}`,
      offers: {
        '@type': 'Offer',
        price: tier.price,
        priceCurrency: 'INR',
      },
      additionalProperty: tier.features.map(feature => ({
        '@type': 'PropertyValue',
        name: feature.name,
        value: typeof feature.value === 'boolean'
          ? (feature.value ? 'Included' : 'Not Included')
          : feature.value,
      })),
    })),
  }

  return (
    <Script
      id="feature-comparison-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
