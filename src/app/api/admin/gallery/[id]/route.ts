/**
 * Admin Gallery Item API
 *
 * GET: Fetch a single gallery item
 * PATCH: Update a gallery item
 * DELETE: Delete a gallery item
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { getGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/lib/gallery'
import { GalleryCategory } from '@/generated/prisma'

const updateGalleryItemSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  category: z.enum(['TOPPERS', 'EVENTS', 'SEMINARS', 'FACULTY', 'CAMPUS', 'MEDIA', 'VIDEOS']).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  eventDate: z.string().optional().nullable(),
})

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminAuth()

    const { id } = await params

    const item = await getGalleryItem(id)

    if (!item) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error('Admin gallery GET error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery item' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminAuth()

    const { id } = await params

    const body = await request.json()
    const validatedData = updateGalleryItemSchema.parse(body)

    const result = await updateGalleryItem(id, {
      ...(validatedData.title && { title: validatedData.title }),
      ...(validatedData.description !== undefined && { description: validatedData.description || undefined }),
      ...(validatedData.category && { category: validatedData.category as GalleryCategory }),
      ...(validatedData.tags && { tags: validatedData.tags }),
      ...(validatedData.featured !== undefined && { featured: validatedData.featured }),
      ...(validatedData.eventDate !== undefined && {
        eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : undefined,
      }),
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item updated',
      item: result.item,
    })
  } catch (error) {
    console.error('Admin gallery PATCH error:', error)

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
      { success: false, error: 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await requireAdminAuth()

    const { id } = await params

    const result = await deleteGalleryItem(id)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted',
    })
  } catch (error) {
    console.error('Admin gallery DELETE error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}
