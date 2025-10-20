/**
 * Student Materials API
 *
 * GET /api/student/materials - List published materials accessible to student
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Force Node.js runtime for Prisma compatibility
export const runtime = 'nodejs'

/**
 * GET - Fetch published materials for student
 * Only returns published materials
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication check - student or higher
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const search = searchParams.get('search') || ''
    const materialType = searchParams.get('type')
    const courseId = searchParams.get('courseId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build where clause - ALWAYS filter for published only
    const where: any = {
      isPublished: true, // Critical: Only show published materials
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { fileName: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (materialType) {
      where.materialType = materialType
    }

    if (courseId) {
      where.courseId = courseId
    }

    // TODO: Add access control based on student's enrollment
    // For now, all students see all published materials
    // Future: Filter by MaterialAccess table

    // Fetch materials with pagination
    const [materials, total] = await Promise.all([
      prisma.studyMaterial.findMany({
        where,
        include: {
          course: {
            select: {
              id: true,
              name: true,
            },
          },
          chapter: {
            select: {
              id: true,
              title: true,
            },
          },
          topic: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          publishedAt: 'desc', // Most recent first
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.studyMaterial.count({ where }),
    ])

    // Get aggregate stats
    const stats = await prisma.studyMaterial.aggregate({
      where,
      _sum: {
        totalDownloads: true,
        totalViews: true,
      },
      _count: {
        id: true,
      },
    })

    return NextResponse.json({
      success: true,
      materials: materials.map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        fileName: m.fileName,
        fileSize: m.fileSize,
        fileUrl: m.fileUrl, // Students need URL to download
        materialType: m.materialType,
        category: m.category,
        tags: m.tags ? JSON.parse(m.tags as string) : [],
        totalDownloads: m.totalDownloads,
        totalViews: m.totalViews,
        avgRating: m.avgRating,
        course: m.course,
        chapter: m.chapter,
        topic: m.topic,
        publishedAt: m.publishedAt,
        createdAt: m.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalMaterials: stats._count.id,
        totalDownloads: stats._sum.totalDownloads || 0,
        totalViews: stats._sum.totalViews || 0,
      },
    })
  } catch (error) {
    console.error('Failed to fetch materials:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch materials',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
