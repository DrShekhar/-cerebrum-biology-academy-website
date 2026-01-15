/**
 * ContentFreshness Component
 * Implements dateModified schema for E-E-A-T signals
 * Search engines and AI use last modified dates to assess content freshness
 *
 * CRITICAL FOR E-E-A-T: Fresh, updated content ranks better in AI answers
 *
 * SECURITY NOTE: dangerouslySetInnerHTML is safe here - content is from trusted
 * props (not user input) for standard JSON-LD schema markup.
 */

import { Calendar, Clock, RefreshCw, User } from 'lucide-react'

interface ContentFreshnessProps {
  datePublished: string
  dateModified: string
  author?: {
    name: string
    url?: string
    jobTitle?: string
    image?: string
  }
  reviewedBy?: {
    name: string
    credentials?: string
    url?: string
  }
  showVisual?: boolean
  variant?: 'minimal' | 'standard' | 'detailed'
  className?: string
}

interface ArticleSchemaProps {
  title: string
  description: string
  datePublished: string
  dateModified: string
  author: {
    name: string
    url?: string
    jobTitle?: string
    image?: string
  }
  publisher?: {
    name: string
    logo?: string
    url?: string
  }
  image?: string
  url?: string
  wordCount?: number
  keywords?: string[]
  educationalLevel?: string
}

/**
 * Content freshness visual indicator + schema markup
 */
export function ContentFreshness({
  datePublished,
  dateModified,
  author,
  reviewedBy,
  showVisual = true,
  variant = 'standard',
  className = '',
}: ContentFreshnessProps) {
  const publishDate = new Date(datePublished)
  const modifyDate = new Date(dateModified)
  const now = new Date()

  const daysSinceUpdate = Math.floor((now.getTime() - modifyDate.getTime()) / (1000 * 60 * 60 * 24))

  const getFreshnessLabel = () => {
    if (daysSinceUpdate <= 7) return { text: 'Recently Updated', color: 'green' }
    if (daysSinceUpdate <= 30) return { text: 'Updated This Month', color: 'blue' }
    if (daysSinceUpdate <= 90) return { text: 'Updated Recently', color: 'slate' }
    return { text: 'Content Verified', color: 'slate' }
  }

  const freshness = getFreshnessLabel()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    datePublished: publishDate.toISOString(),
    dateModified: modifyDate.toISOString(),
    ...(author && {
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
        ...(author.jobTitle && { jobTitle: author.jobTitle }),
        ...(author.image && { image: author.image }),
      },
    }),
    ...(reviewedBy && {
      reviewedBy: {
        '@type': 'Person',
        name: reviewedBy.name,
        ...(reviewedBy.credentials && { hasCredential: reviewedBy.credentials }),
        ...(reviewedBy.url && { url: reviewedBy.url }),
      },
    }),
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
  }

  if (!showVisual) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    )
  }

  if (variant === 'minimal') {
    return (
      <>
        <div
          className={`content-freshness-minimal flex items-center gap-2 text-xs text-slate-500 ${className}`}
        >
          <Clock className="h-3 w-3" />
          <time dateTime={modifyDate.toISOString()}>
            Updated{' '}
            {modifyDate.toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </>
    )
  }

  if (variant === 'detailed') {
    return (
      <>
        <div
          className={`content-freshness-detailed rounded-lg border border-slate-200 bg-slate-50 p-4 ${className}`}
        >
          <div className="mb-3 flex items-center gap-2">
            <RefreshCw className={`h-4 w-4 text-${freshness.color}-600`} />
            <span className={`text-sm font-medium text-${freshness.color}-700`}>
              {freshness.text}
            </span>
          </div>

          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Originally Published</p>
                <time dateTime={publishDate.toISOString()} className="font-medium text-slate-700">
                  {publishDate.toLocaleDateString('en-IN', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500">Last Updated</p>
                <time dateTime={modifyDate.toISOString()} className="font-medium text-slate-700">
                  {modifyDate.toLocaleDateString('en-IN', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>

          {(author || reviewedBy) && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              {author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-slate-400" />
                  <div className="text-sm">
                    <span className="text-slate-500">Written by </span>
                    {author.url ? (
                      <a
                        href={author.url}
                        className="font-medium text-teal-600 hover:underline"
                        itemProp="author"
                      >
                        {author.name}
                      </a>
                    ) : (
                      <span className="font-medium text-slate-700" itemProp="author">
                        {author.name}
                      </span>
                    )}
                    {author.jobTitle && <span className="text-slate-500">, {author.jobTitle}</span>}
                  </div>
                </div>
              )}

              {reviewedBy && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-block h-4 w-4 rounded-full bg-green-100 text-center text-xs leading-4 text-green-600">
                    ✓
                  </span>
                  <div className="text-sm">
                    <span className="text-slate-500">Reviewed by </span>
                    <span className="font-medium text-slate-700">{reviewedBy.name}</span>
                    {reviewedBy.credentials && (
                      <span className="text-slate-500"> ({reviewedBy.credentials})</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </>
    )
  }

  return (
    <>
      <div
        className={`content-freshness-standard flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600 ${className}`}
      >
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-slate-400" />
          <time dateTime={publishDate.toISOString()}>
            Published{' '}
            {publishDate.toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>

        <div className="flex items-center gap-1.5">
          <RefreshCw className={`h-4 w-4 text-${freshness.color}-500`} />
          <time dateTime={modifyDate.toISOString()}>
            Updated{' '}
            {modifyDate.toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
        </div>

        {author && (
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-slate-400" />
            <span>By {author.name}</span>
          </div>
        )}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  )
}

/**
 * Article schema with full E-E-A-T signals
 */
export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  author,
  publisher = {
    name: 'Cerebrum Biology Academy',
    logo: 'https://cerebrumbiologyacademy.com/logo.png',
    url: 'https://cerebrumbiologyacademy.com',
  },
  image,
  url,
  wordCount,
  keywords = [],
  educationalLevel = 'NEET Aspirants, Class 11-12',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: new Date(datePublished).toISOString(),
    dateModified: new Date(dateModified).toISOString(),
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
      ...(author.jobTitle && { jobTitle: author.jobTitle }),
      ...(author.image && { image: author.image }),
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: publisher.name,
      url: publisher.url,
      logo: {
        '@type': 'ImageObject',
        url: publisher.logo,
      },
    },
    ...(image && { image: image }),
    ...(url && { url: url, mainEntityOfPage: url }),
    ...(wordCount && { wordCount: wordCount }),
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
    educationalUse: 'NEET Preparation',
    educationalLevel: educationalLevel,
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Learning Resource schema for educational content
 */
export function LearningResourceSchema({
  name,
  description,
  datePublished,
  dateModified,
  author,
  educationalLevel = 'Class 11-12, NEET',
  learningResourceType = 'Study Material',
  keywords = [],
  timeRequired,
}: {
  name: string
  description: string
  datePublished: string
  dateModified: string
  author: { name: string; url?: string }
  educationalLevel?: string
  learningResourceType?: string
  keywords?: string[]
  timeRequired?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: name,
    description: description,
    datePublished: new Date(datePublished).toISOString(),
    dateModified: new Date(dateModified).toISOString(),
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: educationalLevel,
    learningResourceType: learningResourceType,
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
    ...(timeRequired && { timeRequired: timeRequired }),
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    educationalUse: ['NEET Preparation', 'Biology Study', 'Exam Practice'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ContentFreshness
