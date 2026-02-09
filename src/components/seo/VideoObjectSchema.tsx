// Server Component - no client-side interactivity needed
import Script from 'next/script'

interface VideoObjectSchemaProps {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string // ISO 8601 format e.g. "PT10M30S"
  contentUrl?: string
  embedUrl: string
  interactionStatistic?: {
    watchCount?: number
    likeCount?: number
  }
}

/**
 * VideoObjectSchema - Generates comprehensive VideoObject structured data for YouTube embeds
 *
 * Enables Google Video rich results with enhanced engagement metrics
 *
 * Usage:
 * <VideoObjectSchema
 *   name="NEET Biology - Photosynthesis Explained"
 *   description="Complete breakdown of photosynthesis mechanism with animations"
 *   thumbnailUrl="https://img.youtube.com/vi/ABC123/maxresdefault.jpg"
 *   uploadDate="2025-02-15"
 *   duration="PT45M30S"
 *   embedUrl="https://www.youtube.com/embed/ABC123"
 *   interactionStatistic={{ watchCount: 25000, likeCount: 800 }}
 * />
 */
export function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  interactionStatistic,
}: VideoObjectSchemaProps) {
  // Ensure thumbnail is absolute URL
  const absoluteThumbnailUrl = thumbnailUrl.startsWith('http')
    ? thumbnailUrl
    : `https://cerebrumbiologyacademy.com${thumbnailUrl}`

  // Ensure embed URL is absolute
  const absoluteEmbedUrl = embedUrl.startsWith('http')
    ? embedUrl
    : `https://www.youtube.com/embed/${embedUrl}`

  const videoObjectSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: absoluteThumbnailUrl,
    uploadDate,
    duration,
    embedUrl: absoluteEmbedUrl,
    ...(contentUrl && {
      contentUrl: contentUrl.startsWith('http') ? contentUrl : `https://youtube.com/watch?v=${contentUrl}`,
    }),
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
        width: 800,
        height: 800,
      },
      url: 'https://cerebrumbiologyacademy.com',
      sameAs: [
        'https://www.facebook.com/cerebrumbiologyacademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
        'https://www.youtube.com/@cerebrumbiologyacademy',
        'https://www.youtube.com/@drshekharcsingh',
        'https://www.linkedin.com/company/cerebrum-biology-academy',
      ],
    },
    educationalLevel: 'High School',
    learningResourceType: 'Video Lecture',
    teaches: 'NEET Biology',
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalFramework',
      targetName: 'NEET Medical Entrance Exam',
      targetUrl: 'https://neet.nta.ac.in/',
    },
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      jobTitle: 'Founder & Chief Academic Officer',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
      alumniOf: 'AIIMS Delhi',
    },
    ...(interactionStatistic && {
      interactionStatistic: [
        ...(interactionStatistic.watchCount && [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/WatchAction',
            userInteractionCount: interactionStatistic.watchCount,
          },
        ]),
        ...(interactionStatistic.likeCount && [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/LikeAction',
            userInteractionCount: interactionStatistic.likeCount,
          },
        ]),
      ],
    }),
  }

  const schemaId = `video-object-${name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 40)}`

  return (
    <Script
      id={schemaId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
      strategy="afterInteractive"
    />
  )
}

interface VideoObjectWithClipsSchemaProps {
  mainVideo: VideoObjectSchemaProps
  clips?: Array<Omit<VideoObjectSchemaProps, 'embedUrl'> & { embedUrl: string }>
}

/**
 * VideoObjectWithClipsSchema - For videos with multiple clips/segments
 * Useful for course lectures split into chapters
 */
export function VideoObjectWithClipsSchema({
  mainVideo,
  clips = [],
}: VideoObjectWithClipsSchemaProps) {
  return (
    <>
      <VideoObjectSchema {...mainVideo} />
      {clips.map((clip, idx) => (
        <VideoObjectSchema key={`clip-${idx}`} {...clip} />
      ))}
    </>
  )
}
