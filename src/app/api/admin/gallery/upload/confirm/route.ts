/**
 * Admin Gallery Upload Confirm API
 *
 * POST: Confirm a direct upload and create the database record
 * Called after client uploads directly to Cloudflare
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getImageUrl, getBlurPlaceholderUrl, getImageDetails } from '@/lib/gallery'
import { GalleryCategory } from '@/generated/prisma'

const confirmUploadSchema = z.object({
  imageId: z.string().min(1, 'Image ID is required'),
  title: z.string().min(1, 'Title is required').max(200),
  category: z.enum(['TOPPERS', 'EVENTS', 'SEMINARS', 'FACULTY', 'CAMPUS', 'MEDIA', 'VIDEOS']),
  description: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  eventDate: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = confirmUploadSchema.parse(body)

    // Verify the image exists in Cloudflare
    const imageDetails = await getImageDetails(validatedData.imageId)

    if (!imageDetails.success || !imageDetails.image) {
      return NextResponse.json(
        { success: false, error: 'Image not found in Cloudflare. Upload may have failed.' },
        { status: 400 }
      )
    }

    // Generate URLs
    const url = getImageUrl(validatedData.imageId, 'large')
    const thumbnailUrl = getImageUrl(validatedData.imageId, 'thumbnail')
    const blurHash = getBlurPlaceholderUrl(validatedData.imageId)

    // Create database record
    const item = await prisma.gallery_items.create({
      data: {
        type: 'PHOTO',
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category as GalleryCategory,
        tags: validatedData.tags || [],
        featured: validatedData.featured,
        eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : null,
        cloudflareId: validatedData.imageId,
        url,
        thumbnailUrl,
        blurHash,
        width: validatedData.width,
        height: validatedData.height,
        createdBy: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Gallery item created successfully',
      item: {
        id: item.id,
        type: item.type,
        title: item.title,
        description: item.description,
        category: item.category,
        tags: item.tags,
        featured: item.featured,
        eventDate: item.eventDate,
        cloudflareId: item.cloudflareId,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        blurHash: item.blurHash,
        width: item.width,
        height: item.height,
        createdAt: item.createdAt,
      },
    }, { status: 201 })
  } catch (error) {
    console.error('Admin gallery confirm error:', error)

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
      { success: false, error: 'Failed to confirm upload' },
      { status: 500 }
    )
  }
}
