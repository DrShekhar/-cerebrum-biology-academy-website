// Server Component - Enhanced Article Schema for Blog Posts
// Supports TechArticle, NewsArticle, and EducationalArticle types
import Script from 'next/script'

export type ArticleType = 'TechArticle' | 'NewsArticle' | 'Article' | 'BlogPosting'

interface TechArticleSchemaProps {
  title: string
  description: string
  articleBody?: string
  author: {
    name: string
    role?: string
    url?: string
    image?: string
  }
  publishedAt: string
  updatedAt?: string
  featuredImage?: string
  url: string
  category?: string
  tags?: string[]
  readTime?: number
  wordCount?: number
  articleType?: ArticleType
  // Educational properties
  educationalLevel?: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'NEET Aspirant'
  teaches?: string[]
  learningResourceType?: 'Study Guide' | 'Practice Questions' | 'Revision Notes' | 'Video Lecture' | 'Blog Post'
  // Tech article specific
  dependencies?: string[]
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export function TechArticleSchema({
  title,
  description,
  articleBody,
  author,
  publishedAt,
  updatedAt,
  featuredImage,
  url,
  category,
  tags = [],
  readTime,
  wordCount,
  articleType = 'TechArticle',
  educationalLevel = 'Class 12',
  teaches = ['NEET Biology'],
  learningResourceType = 'Blog Post',
  dependencies,
  proficiencyLevel = 'Intermediate',
}: TechArticleSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': articleType,
    headline: title,
    alternativeHeadline: `${title} - NEET Biology Guide`,
    description: description,
    articleBody: articleBody,
    image: featuredImage
      ? `${baseUrl}${featuredImage}`
      : `${baseUrl}/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role || 'NEET Biology Expert',
      url: author.url || `${baseUrl}/about`,
      image: author.image,
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 200,
        height: 60,
      },
      url: baseUrl,
      sameAs: [
        'https://www.youtube.com/@CerebrumBiologyAcademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
      ],
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url: url,
    articleSection: category || 'NEET Preparation',
    keywords: tags.join(', '),
    wordCount: wordCount,
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    isAccessibleForFree: true,
    inLanguage: 'en-IN',
    // Educational properties
    educationalLevel: educationalLevel,
    teaches: teaches,
    learningResourceType: learningResourceType,
    // Tech article specific
    ...(articleType === 'TechArticle' && {
      dependencies: dependencies,
      proficiencyLevel: proficiencyLevel,
    }),
    // Speakable for voice search
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['article h1', 'article h2', '.article-summary'],
    },
    // About and mentions
    about: {
      '@type': 'Thing',
      name: 'NEET Biology Preparation',
      description: 'National Eligibility cum Entrance Test (NEET) Biology preparation for medical college admission in India',
    },
    // Citation tracking
    citation: {
      '@type': 'CreativeWork',
      name: 'NCERT Biology Textbook',
      author: 'NCERT',
    },
    // Aggregate rating if available
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '32',
    },
  }

  // Clean up undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <Script
      id={`${articleType.toLowerCase()}-schema`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  )
}

// Helper for blog list pages
interface BlogListSchemaProps {
  blogs: Array<{
    title: string
    url: string
    image?: string
    publishedAt: string
  }>
  listName: string
  listUrl: string
}

export function BlogListSchema({ blogs, listName, listUrl }: BlogListSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: listName,
    url: listUrl,
    description: `Collection of ${blogs.length} NEET Biology articles and study guides`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: blogs.length,
      itemListElement: blogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: blog.title,
          url: blog.url,
          image: blog.image ? `${baseUrl}${blog.image}` : undefined,
          datePublished: blog.publishedAt,
        },
      })),
    },
  }

  return (
    <Script
      id="blog-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
