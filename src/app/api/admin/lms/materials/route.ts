/**
 * LMS Materials Management API
 *
 * GET /api/admin/lms/materials - List all materials
 * POST /api/admin/lms/materials - Update material (future)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * GET - Fetch all study materials
 * Supports filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const search = searchParams.get('search') || ''
    const materialType = searchParams.get('type')
    const isPublished = searchParams.get('published')
    const courseId = searchParams.get('courseId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build where clause
    const where: any = {}

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

    if (isPublished !== null && isPublished !== '') {
      where.isPublished = isPublished === 'true'
    }

    if (courseId) {
      where.courseId = courseId
    }

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
          createdAt: 'desc',
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
        fileSize: true,
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
        fileUrl: m.fileUrl,
        materialType: m.materialType,
        category: m.category,
        tags: m.tags ? JSON.parse(m.tags as string) : [],
        isPublished: m.isPublished,
        publishedAt: m.publishedAt,
        totalDownloads: m.totalDownloads,
        totalViews: m.totalViews,
        avgRating: m.avgRating,
        course: m.course,
        chapter: m.chapter,
        topic: m.topic,
        createdAt: m.createdAt,
        updatedAt: m.updatedAt,
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
        totalSize: stats._sum.fileSize || 0,
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
