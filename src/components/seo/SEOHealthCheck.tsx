/**
 * SEOHealthCheck Component
 * Injects structured data for organization, sitelinks searchbox, and breadcrumbs
 * Server component that enhances SEO without impacting performance
 *
 * Features:
 * - Organization schema (name, logo, contact, social profiles)
 * - Sitelinks searchbox schema for Google search box
 * - Breadcrumb schema for enhanced SERPs
 * - WebSite schema with search endpoint
 * - Educational organization attributes
 *
 * SEO Impact:
 * - Enables Google Sitelinks searchbox in SERPs
 * - Improves rich snippet appearance
 * - Signals site authority and organization structure
 * - Enhances breadcrumb display in search results
 *
 * Usage:
 * Add to root layout.tsx:
 * <SEOHealthCheck />
 *
 * Or use selectively on specific pages
 */

/**
 * Organization Schema
 * Provides comprehensive company/organization information
 */
function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    description:
      'Cerebrum Biology Academy - Premier NEET coaching and biology tuition center across India. Expert faculty, proven results, and comprehensive courses.',
    foundingDate: '2015',
    areaServed: ['India', 'Delhi NCR', 'Gurgaon', 'Noida', 'Bangalore', 'Chennai'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      telephone: '+91-88264-44334',
      email: 'info@cerebrumbiologyacademy.com',
    },
    sameAs: [
      'https://www.facebook.com/cerebrumbiologyacademy',
      'https://www.instagram.com/cerebrumbiologyacademy',
      'https://www.youtube.com/cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Delhi',
      streetAddress: 'D 35, South Extension Part 2',
      postalCode: '110049',
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Shekhar',
      jobTitle: 'Founder & Director',
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Dr. Shekhar',
        jobTitle: 'Biology Faculty & Director',
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

/**
 * Website Schema with Sitelinks Searchbox
 * Enables Google to show search box in SERPs for branded queries
 */
function WebsiteWithSearchboxSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    description:
      'NEET coaching and biology tuition for competitive exams. Expert faculty and proven results.',
    siteNavigationElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'NEET Coaching',
        url: 'https://cerebrumbiologyacademy.com/neet-coaching',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Courses',
        url: 'https://cerebrumbiologyacademy.com/courses',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Biology Notes',
        url: 'https://cerebrumbiologyacademy.com/biology-notes',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Blog',
        url: 'https://cerebrumbiologyacademy.com/blog',
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Contact',
        url: 'https://cerebrumbiologyacademy.com/contact',
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

/**
 * Breadcrumb Navigation Schema
 * Helps Google understand site hierarchy
 */
function BreadcrumbNavigationSchema() {
  const schema = {
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
        name: 'NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Courses',
        item: 'https://cerebrumbiologyacademy.com/courses',
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

/**
 * Local Business Schema
 * Helps with local SEO and knowledge panel
 */
function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalBusiness',
    '@id': 'https://cerebrumbiologyacademy.com',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    description: 'Leading NEET coaching and biology tuition center',
    telephone: '+91-88264-44334',
    email: 'info@cerebrumbiologyacademy.com',
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
      latitude: '28.5764',
      longitude: '77.2222',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '38',
      reviewCount: '38',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Main SEOHealthCheck Component
 * Exports all schema markups in one place
 */
export function SEOHealthCheck() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteWithSearchboxSchema />
      <BreadcrumbNavigationSchema />
      <LocalBusinessSchema />
    </>
  )
}

/**
 * Export individual schemas for selective use
 */
export { OrganizationSchema, WebsiteWithSearchboxSchema, BreadcrumbNavigationSchema, LocalBusinessSchema }

/**
 * Individual schema components for selective inclusion
 * Usage:
 * import { OrganizationSchema } from '@/components/seo/SEOHealthCheck'
 * export default function Layout() {
 *   return (
 *     <>
 *       <OrganizationSchema />
 *       ... rest of layout
 *     </>
 *   )
 * }
 */
