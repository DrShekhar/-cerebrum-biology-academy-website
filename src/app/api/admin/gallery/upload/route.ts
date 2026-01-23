/**
 * Admin Gallery Upload API
 *
 * POST: Create a direct upload URL for client-side uploads
 * This returns a one-time upload URL that the client can POST to directly
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { createDirectUpload, isCloudflareImagesConfigured } from '@/lib/gallery'

const uploadRequestSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  category: z.enum(['TOPPERS', 'EVENTS', 'SEMINARS', 'FACULTY', 'CAMPUS', 'MEDIA', 'VIDEOS']),
  description: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  eventDate: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    // Check if Cloudflare Images is configured
    if (!isCloudflareImagesConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cloudflare Images is not configured. Please set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_IMAGES_API_TOKEN.',
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const validatedData = uploadRequestSchema.parse(body)

    // Create metadata for the image
    const metadata = {
      title: validatedData.title,
      category: validatedData.category,
      description: validatedData.description || '',
      tags: (validatedData.tags || []).join(','),
      featured: String(validatedData.featured),
      eventDate: validatedData.eventDate || '',
      uploadedBy: session.user.id,
      uploadedAt: new Date().toISOString(),
    }

    // Create a direct upload URL
    const result = await createDirectUpload(metadata)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    // Return the upload URL and image ID
    // Client will POST directly to uploadUrl, then call /confirm with imageId
    return NextResponse.json({
      success: true,
      uploadUrl: result.uploadUrl,
      imageId: result.imageId,
      metadata: validatedData,
    })
  } catch (error) {
    console.error('Admin gallery upload error:', error)

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
      { success: false, error: 'Failed to create upload URL' },
      { status: 500 }
    )
  }
}
