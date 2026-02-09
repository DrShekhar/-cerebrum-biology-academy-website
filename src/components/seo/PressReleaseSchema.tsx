// Server Component - JSON-LD Schema for Press Releases / News Articles
// Optimized for Google News and press release indexing
import Script from 'next/script'

interface PressReleaseSchemaProps {
  headline: string
  description: string
  datePublished: string
  author: {
    name: string
    jobTitle: string
    url?: string
  }
  publisher?: {
    name: string
    url: string
    logo: string
  }
  keywords: string[]
  wordCount?: number
  url: string
  image?: string
}

/**
 * PressReleaseSchema - Generates NewsArticle structured data for press releases
 *
 * Enables Google News rich results and press release discovery
 * Includes speakable property for voice search optimization
 *
 * Usage:
 * <PressReleaseSchema
 *   headline="Cerebrum Biology Academy Launches Advanced NEET Biology Course"
 *   description="New comprehensive course designed for NEET aspirants with AIIMS-trained faculty"
 *   datePublished="2025-02-15"
 *   author={{
 *     name: "Dr. Shekhar C Singh",
 *     jobTitle: "Founder & Chief Academic Officer",
 *     url: "https://cerebrumbiologyacademy.com/about"
 *   }}
 *   keywords={["NEET Biology", "Medical Coaching", "Course Launch"]}
 *   wordCount={450}
 *   url="https://cerebrumbiologyacademy.com/press-release/advanced-neet-course"
 * />
 */
export function PressReleaseSchema({
  headline,
  description,
  datePublished,
  author,
  publisher,
  keywords,
  wordCount,
  url,
  image,
}: PressReleaseSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  // Default publisher if not provided
  const defaultPublisher = {
    name: 'Cerebrum Biology Academy',
    url: baseUrl,
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
  }

  const publisherData = publisher || defaultPublisher

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    alternativeHeadline: `${headline} - Cerebrum Biology Academy`,
    description,
    image: image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/og-image.jpg`,
    datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      url: author.url || `${baseUrl}/about`,
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: publisherData.name,
      logo: {
        '@type': 'ImageObject',
        url: publisherData.logo,
        width: 800,
        height: 800,
      },
      url: publisherData.url,
      sameAs: [
        'https://www.youtube.com/@CerebrumBiologyAcademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
        'https://www.facebook.com/cerebrumbiologyacademy',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    articleSection: 'News',
    keywords: keywords.join(', '),
    ...(wordCount && { wordCount }),
    isAccessibleForFree: true,
    inLanguage: 'en-IN',
    // Speakable for voice search optimization
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.lead-paragraph'],
    },
  }

  const schemaId = `press-release-${headline
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 40)}`

  return (
    <Script
      id={schemaId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
