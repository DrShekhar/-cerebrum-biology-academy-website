'use server'

/**
 * Unified Blog Image Service
 * Intelligently selects between Unsplash (stock) and DALL-E (AI-generated)
 * based on content type and requirements
 */

import { searchUnsplashImages, getRandomUnsplashImage } from './unsplashService'
import { getResizedUnsplashUrl, BIOLOGY_PROMPT_TEMPLATES } from './imageUtils'
import {
  generateBlogFeaturedImage,
  generateFromTemplate,
  generateBiologyTopicImage,
  type DalleImage,
} from './dalleService'

export type ImageSource = 'unsplash' | 'dalle' | 'placeholder'

export interface BlogImage {
  url: string
  thumbnailUrl: string
  alt: string
  source: ImageSource
  attribution?: {
    name: string
    url: string
  }
  width: number
  height: number
}

export interface BlogImageRequest {
  title: string
  category: string
  keywords: string[]
  preferAI?: boolean
  topic?: string
}

const PLACEHOLDER_IMAGE = {
  url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop&auto=format',
  thumbnailUrl:
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=210&fit=crop&auto=format',
  alt: 'Biology and Science Education',
  source: 'placeholder' as ImageSource,
  width: 1200,
  height: 630,
}

const CATEGORY_TO_TEMPLATE: Record<string, keyof typeof BIOLOGY_PROMPT_TEMPLATES> = {
  'Cell Biology': 'cellBiology',
  'Molecular Biology': 'cellBiology',
  Genetics: 'genetics',
  'Human Anatomy': 'humanAnatomy',
  'Human Physiology': 'humanAnatomy',
  Botany: 'botany',
  'Plant Biology': 'botany',
  Ecology: 'ecology',
  'Environmental Biology': 'ecology',
  Evolution: 'evolution',
  Microbiology: 'microbiology',
  Biochemistry: 'biochemistry',
}

const AI_PREFERRED_CATEGORIES = [
  'Cell Biology',
  'Molecular Biology',
  'Genetics',
  'Biochemistry',
  'Human Physiology',
]

const STOCK_PREFERRED_CATEGORIES = [
  'Study Tips',
  'NEET Preparation',
  'Exam Strategy',
  'Career Guidance',
  'Student Success',
]

/**
 * Determines the best image source based on content
 */
function determineImageSource(request: BlogImageRequest): 'unsplash' | 'dalle' {
  if (request.preferAI) return 'dalle'

  if (
    STOCK_PREFERRED_CATEGORIES.some((cat) =>
      request.category.toLowerCase().includes(cat.toLowerCase())
    )
  ) {
    return 'unsplash'
  }

  if (
    AI_PREFERRED_CATEGORIES.some((cat) =>
      request.category.toLowerCase().includes(cat.toLowerCase())
    )
  ) {
    return 'dalle'
  }

  const technicalKeywords = [
    'cell',
    'dna',
    'rna',
    'gene',
    'protein',
    'enzyme',
    'metabol',
    'neural',
    'synapse',
  ]
  if (
    request.keywords.some((kw) => technicalKeywords.some((tk) => kw.toLowerCase().includes(tk)))
  ) {
    return 'dalle'
  }

  return 'unsplash'
}

/**
 * Fetch image from Unsplash
 */
async function fetchUnsplashImage(request: BlogImageRequest): Promise<BlogImage | null> {
  const searchQuery = `${request.category} ${request.keywords.slice(0, 2).join(' ')}`

  const images = await searchUnsplashImages({
    query: searchQuery,
    perPage: 3,
    orientation: 'landscape',
  })

  if (images.length === 0) {
    const randomImage = await getRandomUnsplashImage(request.category)
    if (!randomImage) return null

    return {
      url: getResizedUnsplashUrl(randomImage.url, 1200, 630),
      thumbnailUrl: getResizedUnsplashUrl(randomImage.url, 400, 210),
      alt: randomImage.alt,
      source: 'unsplash',
      attribution: {
        name: randomImage.photographer,
        url: randomImage.photographerUrl,
      },
      width: 1200,
      height: 630,
    }
  }

  const image = images[Math.floor(Math.random() * images.length)]

  return {
    url: getResizedUnsplashUrl(image.url, 1200, 630),
    thumbnailUrl: getResizedUnsplashUrl(image.url, 400, 210),
    alt: image.alt,
    source: 'unsplash',
    attribution: {
      name: image.photographer,
      url: image.photographerUrl,
    },
    width: 1200,
    height: 630,
  }
}

/**
 * Generate image using DALL-E
 */
async function generateDalleImageForBlog(request: BlogImageRequest): Promise<BlogImage | null> {
  const template = CATEGORY_TO_TEMPLATE[request.category]

  let dalleImage: DalleImage | null = null

  if (template && request.topic) {
    dalleImage = await generateFromTemplate(template, request.topic)
  }

  if (!dalleImage) {
    dalleImage = await generateBlogFeaturedImage(request.title, request.category, request.keywords)
  }

  if (!dalleImage) {
    dalleImage = await generateBiologyTopicImage(request.category, request.title)
  }

  if (!dalleImage) return null

  return {
    url: dalleImage.url,
    thumbnailUrl: dalleImage.url,
    alt: `AI illustration: ${request.title}`,
    source: 'dalle',
    width: 1792,
    height: 1024,
  }
}

/**
 * Main function to get a blog featured image
 * Tries primary source first, falls back to secondary, then placeholder
 */
export async function getBlogFeaturedImage(request: BlogImageRequest): Promise<BlogImage> {
  const primarySource = determineImageSource(request)

  try {
    let image: BlogImage | null = null

    if (primarySource === 'dalle') {
      image = await generateDalleImageForBlog(request)
      if (!image) {
        console.log('DALL-E failed, falling back to Unsplash')
        image = await fetchUnsplashImage(request)
      }
    } else {
      image = await fetchUnsplashImage(request)
      if (!image) {
        console.log('Unsplash failed, falling back to DALL-E')
        image = await generateDalleImageForBlog(request)
      }
    }

    if (image) return image
  } catch (error) {
    console.error('Error fetching blog image:', error)
  }

  console.log('All sources failed, using placeholder')
  return PLACEHOLDER_IMAGE
}

/**
 * Get multiple images for a blog post (featured + inline)
 */
export async function getBlogImages(
  request: BlogImageRequest,
  count: number = 3
): Promise<BlogImage[]> {
  const images: BlogImage[] = []

  const featuredImage = await getBlogFeaturedImage(request)
  images.push(featuredImage)

  if (count > 1) {
    const additionalImages = await searchUnsplashImages({
      query: `${request.category} ${request.keywords[0] || 'biology'}`,
      perPage: count - 1,
      orientation: 'landscape',
    })

    for (const img of additionalImages) {
      images.push({
        url: getResizedUnsplashUrl(img.url, 800, 450),
        thumbnailUrl: getResizedUnsplashUrl(img.url, 300, 170),
        alt: img.alt,
        source: 'unsplash',
        attribution: {
          name: img.photographer,
          url: img.photographerUrl,
        },
        width: 800,
        height: 450,
      })
    }
  }

  return images
}

/**
 * Batch process images for multiple blog posts
 */
export async function getBlogImagesForPosts(
  posts: BlogImageRequest[]
): Promise<Map<string, BlogImage>> {
  const results = new Map<string, BlogImage>()

  const batchSize = 3
  for (let i = 0; i < posts.length; i += batchSize) {
    const batch = posts.slice(i, i + batchSize)

    const promises = batch.map(async (post) => {
      const image = await getBlogFeaturedImage(post)
      return { title: post.title, image }
    })

    const batchResults = await Promise.all(promises)

    for (const { title, image } of batchResults) {
      results.set(title, image)
    }

    if (i + batchSize < posts.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  return results
}
