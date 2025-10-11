/**
 * Student Material Download Tracking API
 *
 * POST /api/student/materials/[id]/download - Track material download
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * POST - Track material download and update progress
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authentication check
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const { id: materialId } = await params
    const userId = session.user.id

    // Verify material exists and is published
    const material = await prisma.studyMaterial.findUnique({
      where: { id: materialId },
      select: {
        id: true,
        isPublished: true,
        title: true,
      },
    })

    if (!material) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 })
    }

    if (!material.isPublished) {
      return NextResponse.json(
        { success: false, error: 'Material is not available for download' },
        { status: 403 }
      )
    }

    // Update material download count
    await prisma.studyMaterial.update({
      where: { id: materialId },
      data: {
        totalDownloads: { increment: 1 },
        totalViews: { increment: 1 }, // Also count as a view
      },
    })

    // Create or update student progress
    try {
      await prisma.materialProgress.upsert({
        where: {
          materialId_userId: {
            materialId,
            userId,
          },
        },
        update: {
          downloadedAt: new Date(),
          lastViewedAt: new Date(),
          status: 'DOWNLOADED',
        },
        create: {
          materialId,
          userId,
          status: 'DOWNLOADED',
          downloadedAt: new Date(),
          lastViewedAt: new Date(),
        },
      })
    } catch (progressError) {
      // If progress tracking fails, log but don't fail the request
      console.error('Progress tracking failed:', progressError)
    }

    return NextResponse.json({
      success: true,
      message: 'Download tracked successfully',
      material: {
        id: material.id,
        title: material.title,
      },
    })
  } catch (error) {
    console.error('Download tracking error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to track download',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
