/**
 * Admin Gallery Reorder API
 *
 * POST: Reorder gallery items (for drag-and-drop functionality)
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { reorderGalleryItems } from '@/lib/gallery'

const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      displayOrder: z.number().int().min(0),
    })
  ).min(1, 'At least one item is required'),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const validatedData = reorderSchema.parse(body)

    const result = await reorderGalleryItems(validatedData.items)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Successfully reordered ${validatedData.items.length} items`,
    })
  } catch (error) {
    console.error('Admin gallery reorder error:', error)

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
      { success: false, error: 'Failed to reorder gallery items' },
      { status: 500 }
    )
  }
}
