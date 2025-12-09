'use server'

/**
 * Unsplash API Integration for Blog Images
 * Fetches high-quality stock photos based on keywords
 * Free tier: 50 requests/hour
 */

export interface UnsplashImage {
  id: string
  url: string
  thumbUrl: string
  downloadUrl: string
  width: number
  height: number
  alt: string
  photographer: string
  photographerUrl: string
  blurHash?: string
}

export interface UnsplashSearchOptions {
  query: string
  perPage?: number
  orientation?: 'landscape' | 'portrait' | 'squarish'
  color?: string
}

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const UNSPLASH_API_URL = 'https://api.unsplash.com'

// Biology/Science related search term enhancers
const BIOLOGY_KEYWORDS = [
  'biology',
  'science',
  'medical',
  'microscope',
  'laboratory',
  'cells',
  'nature',
  'anatomy',
  'research',
]

/**
 * Search for images on Unsplash
 */
export async function searchUnsplashImages(
  options: UnsplashSearchOptions
): Promise<UnsplashImage[]> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not configured')
    return []
  }

  const { query, perPage = 5, orientation = 'landscape', color } = options

  // Enhance query with biology context if not already present
  const enhancedQuery = BIOLOGY_KEYWORDS.some((kw) => query.toLowerCase().includes(kw))
    ? query
    : `${query} biology science`

  const params = new URLSearchParams({
    query: enhancedQuery,
    per_page: perPage.toString(),
    orientation,
    ...(color && { color }),
  })

  try {
    const response = await fetch(`${UNSPLASH_API_URL}/search/photos?${params}`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error('Unsplash API error:', response.status, response.statusText)
      return []
    }

    const data = await response.json()

    return data.results.map((photo: any) => ({
      id: photo.id,
      url: photo.urls.regular,
      thumbUrl: photo.urls.thumb,
      downloadUrl: photo.links.download,
      width: photo.width,
      height: photo.height,
      alt: photo.alt_description || photo.description || query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      blurHash: photo.blur_hash,
    }))
  } catch (error) {
    console.error('Unsplash search error:', error)
    return []
  }
}

/**
 * Get a random image for a topic
 */
export async function getRandomUnsplashImage(topic: string): Promise<UnsplashImage | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not configured')
    return null
  }

  // Enhance with biology context
  const enhancedTopic = `${topic} biology medical science`

  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(enhancedTopic)}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      console.error('Unsplash random image error:', response.status)
      return null
    }

    const photo = await response.json()

    return {
      id: photo.id,
      url: photo.urls.regular,
      thumbUrl: photo.urls.thumb,
      downloadUrl: photo.links.download,
      width: photo.width,
      height: photo.height,
      alt: photo.alt_description || photo.description || topic,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      blurHash: photo.blur_hash,
    }
  } catch (error) {
    console.error('Unsplash random image error:', error)
    return null
  }
}

/**
 * Get curated biology/science images
 */
export async function getBiologyImages(count: number = 10): Promise<UnsplashImage[]> {
  const topics = [
    'cell biology microscope',
    'DNA genetics research',
    'human anatomy medical',
    'plant botany nature',
    'laboratory science research',
    'medical education study',
    'biology student learning',
    'microscope laboratory',
    'nature wildlife biology',
    'medical science research',
  ]

  const randomTopic = topics[Math.floor(Math.random() * topics.length)]
  return searchUnsplashImages({ query: randomTopic, perPage: count })
}

/**
 * Download and trigger Unsplash download tracking
 * (Required by Unsplash API guidelines)
 */
export async function trackUnsplashDownload(downloadUrl: string): Promise<void> {
  if (!UNSPLASH_ACCESS_KEY) return

  try {
    await fetch(`${downloadUrl}?client_id=${UNSPLASH_ACCESS_KEY}`)
  } catch (error) {
    console.error('Unsplash download tracking error:', error)
  }
}

// Note: getResizedUnsplashUrl moved to imageUtils.ts (non-async utility)
