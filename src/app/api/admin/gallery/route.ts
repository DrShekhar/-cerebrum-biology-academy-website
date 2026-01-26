/**
 * Admin Gallery API
 *
 * GET: Fetch all gallery items for admin management
 * POST: Create a new gallery item from URL
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import {
  getGalleryItems,
  createGalleryItemFromUrl,
  createVideoGalleryItem,
  getGalleryStats,
} from '@/lib/gallery'
import { GalleryCategory, GalleryItemType } from '@/generated/prisma'

const createGalleryItemSchema = z.object({
  type: z.enum(['PHOTO', 'VIDEO']).default('PHOTO'),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional(),
  category: z.enum(['TOPPERS', 'EVENTS', 'SEMINARS', 'FACULTY', 'CAMPUS', 'MEDIA', 'VIDEOS']),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  eventDate: z.string().optional(),
  // For URL upload
  imageUrl: z.string().url().optional(),
  // For video items
  cloudflareVideoId: z.string().optional(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
  durationSeconds: z.number().optional(),
})

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as GalleryCategory | null
    const type = searchParams.get('type') as GalleryItemType | null
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const includeStats = searchParams.get('includeStats') === 'true'

    const filters: {
      category?: GalleryCategory
      type?: GalleryItemType
      featured?: boolean
      search?: string
    } = {}

    if (category) filters.category = category
    if (type) filters.type = type
    if (featured === 'true') filters.featured = true
    if (featured === 'false') filters.featured = false
    if (search) filters.search = search

    const result = await getGalleryItems(filters, { page, limit })

    let stats = null
    if (includeStats) {
      stats = await getGalleryStats()
    }

    return NextResponse.json({
      success: true,
      ...result,
      ...(stats && { stats }),
    })
  } catch (error) {
    console.error('Admin gallery GET error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = createGalleryItemSchema.parse(body)

    // Handle video items
    if (validatedData.type === 'VIDEO') {
      if (!validatedData.cloudflareVideoId && !validatedData.videoUrl) {
        return NextResponse.json(
          { success: false, error: 'Video requires cloudflareVideoId or videoUrl' },
          { status: 400 }
        )
      }

      const result = await createVideoGalleryItem({
        type: 'VIDEO',
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category as GalleryCategory,
        tags: validatedData.tags,
        featured: validatedData.featured,
        eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : undefined,
        cloudflareVideoId: validatedData.cloudflareVideoId || '',
        url: validatedData.videoUrl,
        thumbnailUrl: validatedData.thumbnailUrl,
        durationSeconds: validatedData.durationSeconds,
        createdBy: session.user.id,
      })

      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 })
      }

      return NextResponse.json(
        { success: true, message: 'Video gallery item created', item: result.item },
        { status: 201 }
      )
    }

    // Handle photo items uploaded from URL
    if (!validatedData.imageUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'imageUrl is required for photo items. Use /upload endpoint for file uploads.',
        },
        { status: 400 }
      )
    }

    const result = await createGalleryItemFromUrl(validatedData.imageUrl, {
      type: 'PHOTO',
      title: validatedData.title,
      description: validatedData.description,
      category: validatedData.category as GalleryCategory,
      tags: validatedData.tags,
      featured: validatedData.featured,
      eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : undefined,
      createdBy: session.user.id,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json(
      { success: true, message: 'Gallery item created', item: result.item },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin gallery POST error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    )
  }
}
