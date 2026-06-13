// Server Component - no client-side interactivity needed
import Script from 'next/script'

interface ArticleSchemaProps {
  title: string
  description: string
  author: {
    name: string
    role?: string
  }
  publishedAt: string
  updatedAt?: string
  featuredImage?: string
  url: string
  category?: string
  tags?: string[]
  readTime?: number
  wordCount?: number
}

export function ArticleSchema({
  title,
  description,
  author,
  publishedAt,
  updatedAt,
  featuredImage,
  url,
  category,
  tags = [],
  readTime,
}: ArticleSchemaProps) {
  const isDrShekhar = /^Dr\.?\s+Shekhar\s+C?\s*Singh/i.test(author.name)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: featuredImage
      ? `https://cerebrumbiologyacademy.com${featuredImage}`
      : 'https://cerebrumbiologyacademy.com/og-image.jpg',
    // When the author is Dr. Shekhar C Singh (canonical name), wire the
    // schema to the site-wide Person @id so Google merges the article
    // author with the master entity. Cerebrum-staffed articles inherit
    // the cross-vertical Person authority signals.
    author: isDrShekhar
      ? {
          '@type': 'Person',
          '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
          name: 'Dr. Shekhar C Singh',
          jobTitle: author.role,
          url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-biology-faculty-india',
        }
      : {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
          url: 'https://cerebrumbiologyacademy.com/about',
        },
    // creator mirrors the real author — only reference Dr. Shekhar's canonical
    // Person @id when he actually wrote the article (else use the real author).
    creator: isDrShekhar
      ? {
          '@id': 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty#person',
        }
      : {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
        },
    publisher: {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/#organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
      url: 'https://cerebrumbiologyacademy.com',
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url: url,
    articleSection: category,
    keywords: tags.join(', '),
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    isAccessibleForFree: true,
    educationalLevel: 'High School',
    teaches: 'NEET Biology Preparation',
    about: {
      '@type': 'Thing',
      name: 'NEET Biology',
      description: 'Medical entrance examination preparation for Biology',
    },
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
