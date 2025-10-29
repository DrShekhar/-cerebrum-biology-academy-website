/**
 * LMS Material Management API - Individual Material Operations
 *
 * GET /api/admin/lms/materials/[id] - Get single material
 * PATCH /api/admin/lms/materials/[id] - Update material
 * DELETE /api/admin/lms/materials/[id] - Delete material
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { deletePDF } from '@/lib/lms/blobStorage'
import { auth } from '@/lib/auth'

/**
 * GET - Fetch single material by ID
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authentication check
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const { id } = await params
    const material = await prisma.studyMaterial.findUnique({
      where: { id },
      include: {
        course: true,
        chapter: true,
        topic: true,
      },
    })

    if (!material) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      material: {
        ...material,
        tags: material.tags ? JSON.parse(material.tags as string) : [],
      },
    })
  } catch (error) {
    console.error('Failed to fetch material:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch material',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * PATCH - Update material metadata
 */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Authentication check
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    // Validate material exists
    const existing = await prisma.studyMaterial.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}

    if (body.title !== undefined) updateData.title = body.title.trim()
    if (body.description !== undefined) updateData.description = body.description.trim() || null
    if (body.materialType !== undefined) updateData.materialType = body.materialType
    if (body.category !== undefined) updateData.category = body.category || null
    if (body.accessLevel !== undefined) updateData.accessLevel = body.accessLevel
    if (body.courseId !== undefined) updateData.courseId = body.courseId || null
    if (body.chapterId !== undefined) updateData.chapterId = body.chapterId || null
    if (body.topicId !== undefined) updateData.topicId = body.topicId || null

    // Handle tags
    if (body.tags !== undefined) {
      updateData.tags = body.tags && body.tags.length > 0 ? JSON.stringify(body.tags) : null
    }

    // Handle publish status
    if (body.isPublished !== undefined) {
      updateData.isPublished = body.isPublished
      if (body.isPublished && !existing.publishedAt) {
        updateData.publishedAt = new Date()
      } else if (!body.isPublished) {
        updateData.publishedAt = null
      }
    }

    // Update material
    const updated = await prisma.studyMaterial.update({
      where: { id },
      data: updateData,
      include: {
        course: true,
        chapter: true,
        topic: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Material updated successfully',
      material: {
        ...updated,
        tags: updated.tags ? JSON.parse(updated.tags as string) : [],
      },
    })
  } catch (error) {
    console.error('Failed to update material:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update material',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * DELETE - Delete material and associated file
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authentication check
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const { id } = await params

    // Fetch material to get file URL
    const material = await prisma.studyMaterial.findUnique({
      where: { id },
    })

    if (!material) {
      return NextResponse.json({ success: false, error: 'Material not found' }, { status: 404 })
    }

    // Delete from database first
    await prisma.studyMaterial.delete({
      where: { id },
    })

    // Then delete file from storage
    try {
      await deletePDF(material.fileUrl)
    } catch (fileError) {
      // Log error but don't fail the request
      console.error('Failed to delete file from storage:', fileError)
      // Database record is already deleted, so we consider this a partial success
    }

    return NextResponse.json({
      success: true,
      message: 'Material deleted successfully',
    })
  } catch (error) {
    console.error('Failed to delete material:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete material',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
