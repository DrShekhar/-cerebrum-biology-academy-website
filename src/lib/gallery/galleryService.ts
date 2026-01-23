/**
 * Gallery Service
 *
 * Combines Cloudflare Images/Stream with database operations
 * for the Wall of Excellence gallery.
 */

import { prisma } from '@/lib/prisma'
import { GalleryCategory, GalleryItemType } from '@/generated/prisma'
import {
  uploadImage,
  uploadFromUrl,
  deleteImage as deleteCloudflareImage,
  getImageUrl,
  getResponsiveImageUrls,
  getBlurPlaceholderUrl,
  isCloudflareImagesConfigured,
} from './cloudflareImages'

export interface CreateGalleryItemInput {
  type: GalleryItemType
  title: string
  description?: string
  category: GalleryCategory
  tags?: string[]
  featured?: boolean
  eventDate?: Date
  cloudflareId?: string
  url?: string
  thumbnailUrl?: string
  width?: number
  height?: number
  durationSeconds?: number
  createdBy?: string
}

export interface GalleryItemWithUrls {
  id: string
  type: GalleryItemType
  title: string
  description: string | null
  category: GalleryCategory
  tags: string[]
  featured: boolean
  eventDate: Date | null
  cloudflareId: string | null
  url: string
  thumbnailUrl: string | null
  blurHash: string | null
  aspectRatio: string
  width: number | null
  height: number | null
  durationSeconds: number | null
  displayOrder: number
  createdAt: Date
  // Computed URLs
  srcSet?: string
  sizes?: string
  blurDataUrl?: string
}

export interface GalleryFilters {
  category?: GalleryCategory
  type?: GalleryItemType
  featured?: boolean
  search?: string
}

export interface PaginationOptions {
  page?: number
  limit?: number
}

/**
 * Create a gallery item from an uploaded file
 */
export async function createGalleryItemFromFile(
  file: File,
  data: Omit<CreateGalleryItemInput, 'cloudflareId' | 'url'>
): Promise<{ success: boolean; item?: GalleryItemWithUrls; error?: string }> {
  // Check if Cloudflare is configured
  if (!isCloudflareImagesConfigured()) {
    return { success: false, error: 'Cloudflare Images is not configured' }
  }

  // Upload to Cloudflare
  const uploadResult = await uploadImage(file, file.name, {
    title: data.title,
    category: data.category,
  })

  if (!uploadResult.success || !uploadResult.imageId) {
    return { success: false, error: uploadResult.error || 'Upload failed' }
  }

  // Get the primary URL
  const url = getImageUrl(uploadResult.imageId, 'large')
  const thumbnailUrl = getImageUrl(uploadResult.imageId, 'thumbnail')
  const blurHash = getBlurPlaceholderUrl(uploadResult.imageId)

  // Create database record
  try {
    const item = await prisma.gallery_items.create({
      data: {
        type: data.type,
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        eventDate: data.eventDate,
        cloudflareId: uploadResult.imageId,
        url,
        thumbnailUrl,
        blurHash,
        width: data.width,
        height: data.height,
        createdBy: data.createdBy,
      },
    })

    return {
      success: true,
      item: transformGalleryItem(item),
    }
  } catch (error) {
    // Cleanup Cloudflare image if database fails
    await deleteCloudflareImage(uploadResult.imageId)
    console.error('Failed to create gallery item:', error)
    return { success: false, error: 'Failed to save gallery item' }
  }
}

/**
 * Create a gallery item from a URL
 */
export async function createGalleryItemFromUrl(
  imageUrl: string,
  data: Omit<CreateGalleryItemInput, 'cloudflareId' | 'url'>
): Promise<{ success: boolean; item?: GalleryItemWithUrls; error?: string }> {
  // Check if Cloudflare is configured
  if (!isCloudflareImagesConfigured()) {
    return { success: false, error: 'Cloudflare Images is not configured' }
  }

  // Upload to Cloudflare from URL
  const uploadResult = await uploadFromUrl(imageUrl, {
    title: data.title,
    category: data.category,
  })

  if (!uploadResult.success || !uploadResult.imageId) {
    return { success: false, error: uploadResult.error || 'Upload failed' }
  }

  // Get the primary URL
  const url = getImageUrl(uploadResult.imageId, 'large')
  const thumbnailUrl = getImageUrl(uploadResult.imageId, 'thumbnail')
  const blurHash = getBlurPlaceholderUrl(uploadResult.imageId)

  // Create database record
  try {
    const item = await prisma.gallery_items.create({
      data: {
        type: data.type,
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        eventDate: data.eventDate,
        cloudflareId: uploadResult.imageId,
        url,
        thumbnailUrl,
        blurHash,
        width: data.width,
        height: data.height,
        createdBy: data.createdBy,
      },
    })

    return {
      success: true,
      item: transformGalleryItem(item),
    }
  } catch (error) {
    // Cleanup Cloudflare image if database fails
    await deleteCloudflareImage(uploadResult.imageId)
    console.error('Failed to create gallery item:', error)
    return { success: false, error: 'Failed to save gallery item' }
  }
}

/**
 * Create a gallery item for a video (uses Cloudflare Stream)
 */
export async function createVideoGalleryItem(
  data: CreateGalleryItemInput & { cloudflareVideoId: string }
): Promise<{ success: boolean; item?: GalleryItemWithUrls; error?: string }> {
  try {
    const item = await prisma.gallery_items.create({
      data: {
        type: 'VIDEO',
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags || [],
        featured: data.featured || false,
        eventDate: data.eventDate,
        cloudflareId: data.cloudflareVideoId,
        url: data.url || '',
        thumbnailUrl: data.thumbnailUrl,
        durationSeconds: data.durationSeconds,
        createdBy: data.createdBy,
      },
    })

    return {
      success: true,
      item: transformGalleryItem(item),
    }
  } catch (error) {
    console.error('Failed to create video gallery item:', error)
    return { success: false, error: 'Failed to save video gallery item' }
  }
}

/**
 * Get gallery items with filters and pagination
 */
export async function getGalleryItems(
  filters: GalleryFilters = {},
  pagination: PaginationOptions = {}
): Promise<{
  items: GalleryItemWithUrls[]
  total: number
  page: number
  totalPages: number
}> {
  const page = pagination.page || 1
  const limit = pagination.limit || 12
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}

  if (filters.category) {
    where.category = filters.category
  }

  if (filters.type) {
    where.type = filters.type
  }

  if (filters.featured !== undefined) {
    where.featured = filters.featured
  }

  if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
      { tags: { has: filters.search.toLowerCase() } },
    ]
  }

  const [items, total] = await Promise.all([
    prisma.gallery_items.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { displayOrder: 'asc' },
        { eventDate: 'desc' },
        { createdAt: 'desc' },
      ],
      skip,
      take: limit,
    }),
    prisma.gallery_items.count({ where }),
  ])

  return {
    items: items.map(transformGalleryItem),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

/**
 * Get a single gallery item by ID
 */
export async function getGalleryItem(
  id: string
): Promise<GalleryItemWithUrls | null> {
  const item = await prisma.gallery_items.findUnique({
    where: { id },
  })

  if (!item) return null

  return transformGalleryItem(item)
}

/**
 * Get featured gallery items
 */
export async function getFeaturedGalleryItems(
  limit: number = 6
): Promise<GalleryItemWithUrls[]> {
  const items = await prisma.gallery_items.findMany({
    where: { featured: true },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    take: limit,
  })

  return items.map(transformGalleryItem)
}

/**
 * Update a gallery item
 */
export async function updateGalleryItem(
  id: string,
  data: Partial<CreateGalleryItemInput>
): Promise<{ success: boolean; item?: GalleryItemWithUrls; error?: string }> {
  try {
    const item = await prisma.gallery_items.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.category && { category: data.category }),
        ...(data.tags && { tags: data.tags }),
        ...(data.featured !== undefined && { featured: data.featured }),
        ...(data.eventDate !== undefined && { eventDate: data.eventDate }),
      },
    })

    return {
      success: true,
      item: transformGalleryItem(item),
    }
  } catch (error) {
    console.error('Failed to update gallery item:', error)
    return { success: false, error: 'Failed to update gallery item' }
  }
}

/**
 * Delete a gallery item
 */
export async function deleteGalleryItem(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const item = await prisma.gallery_items.findUnique({
      where: { id },
    })

    if (!item) {
      return { success: false, error: 'Gallery item not found' }
    }

    // Delete from Cloudflare if it's an image with cloudflareId
    if (item.cloudflareId && item.type === 'PHOTO') {
      await deleteCloudflareImage(item.cloudflareId)
    }

    // Delete from database
    await prisma.gallery_items.delete({
      where: { id },
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to delete gallery item:', error)
    return { success: false, error: 'Failed to delete gallery item' }
  }
}

/**
 * Reorder gallery items
 */
export async function reorderGalleryItems(
  items: { id: string; displayOrder: number }[]
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.gallery_items.update({
          where: { id: item.id },
          data: { displayOrder: item.displayOrder },
        })
      )
    )

    return { success: true }
  } catch (error) {
    console.error('Failed to reorder gallery items:', error)
    return { success: false, error: 'Failed to reorder items' }
  }
}

/**
 * Get gallery statistics
 */
export async function getGalleryStats(): Promise<{
  total: number
  photos: number
  videos: number
  byCategory: Record<string, number>
}> {
  const [total, photos, videos, byCategory] = await Promise.all([
    prisma.gallery_items.count(),
    prisma.gallery_items.count({ where: { type: 'PHOTO' } }),
    prisma.gallery_items.count({ where: { type: 'VIDEO' } }),
    prisma.gallery_items.groupBy({
      by: ['category'],
      _count: { category: true },
    }),
  ])

  return {
    total,
    photos,
    videos,
    byCategory: byCategory.reduce(
      (acc, item) => ({
        ...acc,
        [item.category]: item._count.category,
      }),
      {} as Record<string, number>
    ),
  }
}

/**
 * Transform database item to include computed URLs
 */
function transformGalleryItem(
  item: {
    id: string
    type: GalleryItemType
    title: string
    description: string | null
    category: GalleryCategory
    tags: string[]
    featured: boolean
    eventDate: Date | null
    cloudflareId: string | null
    url: string
    thumbnailUrl: string | null
    blurHash: string | null
    aspectRatio: string
    width: number | null
    height: number | null
    durationSeconds: number | null
    displayOrder: number
    createdAt: Date
  }
): GalleryItemWithUrls {
  const result: GalleryItemWithUrls = {
    ...item,
  }

  // Add responsive URLs for photos with Cloudflare IDs
  if (item.type === 'PHOTO' && item.cloudflareId) {
    const responsive = getResponsiveImageUrls(item.cloudflareId)
    result.srcSet = responsive.srcSet
    result.sizes = responsive.sizes
    result.blurDataUrl = responsive.blurDataUrl
  }

  return result
}

/**
 * Get all categories with counts
 */
export async function getCategoriesWithCounts(): Promise<
  { category: GalleryCategory; count: number; label: string; icon: string }[]
> {
  const counts = await prisma.gallery_items.groupBy({
    by: ['category'],
    _count: { category: true },
  })

  const categoryLabels: Record<GalleryCategory, { label: string; icon: string }> = {
    TOPPERS: { label: 'Toppers', icon: '🏆' },
    EVENTS: { label: 'Events', icon: '📸' },
    SEMINARS: { label: 'Seminars', icon: '🎓' },
    FACULTY: { label: 'Faculty', icon: '👨‍🏫' },
    CAMPUS: { label: 'Campus', icon: '🏫' },
    MEDIA: { label: 'Media', icon: '📺' },
    VIDEOS: { label: 'Videos', icon: '🎬' },
  }

  return counts.map((item) => ({
    category: item.category,
    count: item._count.category,
    ...categoryLabels[item.category],
  }))
}
