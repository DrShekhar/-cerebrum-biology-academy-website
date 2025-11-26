'use client'

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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: featuredImage
      ? `https://cerebrumbiologyacademy.com${featuredImage}`
      : 'https://cerebrumbiologyacademy.com/og-image.jpg',
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      url: 'https://cerebrumbiologyacademy.com/about',
    },
    publisher: {
      '@type': 'EducationalOrganization',
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

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
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
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
