'use client'

import Script from 'next/script'

interface VideoSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration?: string // ISO 8601 format: PT1H30M (1 hour 30 minutes)
  contentUrl?: string
  embedUrl?: string
  instructor?: {
    name: string
    role?: string
  }
  chapter?: string
  subject?: string
  isAccessibleForFree?: boolean
}

/**
 * VideoSchema - Generates VideoObject structured data for rich video snippets
 *
 * Usage:
 * <VideoSchema
 *   name="NEET Biology - Cell Division Lecture"
 *   description="Complete explanation of mitosis and meiosis..."
 *   thumbnailUrl="/thumbnails/cell-division.jpg"
 *   uploadDate="2025-01-15"
 *   duration="PT45M"
 *   embedUrl="https://youtube.com/embed/..."
 * />
 */
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  instructor,
  chapter,
  subject = 'NEET Biology',
  isAccessibleForFree = false,
}: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: thumbnailUrl.startsWith('http')
      ? thumbnailUrl
      : `https://cerebrumbiologyacademy.com${thumbnailUrl}`,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
      url: 'https://cerebrumbiologyacademy.com',
    },
    ...(instructor && {
      author: {
        '@type': 'Person',
        name: instructor.name,
        jobTitle: instructor.role || 'Biology Faculty',
        worksFor: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
        },
      },
    }),
    educationalLevel: 'High School',
    learningResourceType: 'Video Lecture',
    teaches: subject,
    ...(chapter && { about: { '@type': 'Thing', name: chapter } }),
    isAccessibleForFree,
    inLanguage: 'en-IN',
  }

  // Note: dangerouslySetInnerHTML is safe here - we're only inserting
  // JSON.stringify output for schema.org structured data (standard Next.js pattern)
  return (
    <Script
      id={`video-schema-${name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface VideoListSchemaProps {
  videos: Array<{
    name: string
    description: string
    thumbnailUrl: string
    uploadDate: string
    duration?: string
    embedUrl?: string
    position?: number
  }>
  listName?: string
}

/**
 * VideoListSchema - Generates ItemList schema for video playlists/series
 *
 * Usage:
 * <VideoListSchema
 *   listName="NEET Biology Complete Course"
 *   videos={[
 *     { name: 'Cell Structure', ... },
 *     { name: 'Cell Division', ... },
 *   ]}
 * />
 */
export function VideoListSchema({
  videos,
  listName = 'NEET Biology Video Lectures',
}: VideoListSchemaProps) {
  if (!videos || videos.length === 0) {
    return null
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: videos.map((video, index) => ({
      '@type': 'ListItem',
      position: video.position || index + 1,
      item: {
        '@type': 'VideoObject',
        name: video.name,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl.startsWith('http')
          ? video.thumbnailUrl
          : `https://cerebrumbiologyacademy.com${video.thumbnailUrl}`,
        uploadDate: video.uploadDate,
        duration: video.duration,
        embedUrl: video.embedUrl,
        publisher: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
        },
      },
    })),
    numberOfItems: videos.length,
    itemListOrder: 'ItemListOrderAscending',
  }

  // Safe: JSON.stringify for schema.org structured data
  return (
    <Script
      id="video-list-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface VideoDisplayProps {
  embedUrl: string
  title: string
  description?: string
  className?: string
  aspectRatio?: '16:9' | '4:3'
}

/**
 * VideoDisplay - Renders responsive video embed with schema
 */
export function VideoDisplay({
  embedUrl,
  title,
  description,
  className = '',
  aspectRatio = '16:9',
}: VideoDisplayProps) {
  const paddingBottom = aspectRatio === '16:9' ? '56.25%' : '75%'

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full" style={{ paddingBottom }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {description && <p className="mt-2 text-gray-600 text-sm">{description}</p>}
      <VideoSchema
        name={title}
        description={description || title}
        thumbnailUrl="/og-image.jpg"
        uploadDate={new Date().toISOString().split('T')[0]}
        embedUrl={embedUrl}
      />
    </div>
  )
}
