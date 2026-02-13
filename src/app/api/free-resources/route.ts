import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const classCategory = searchParams.get('class')
    const search = searchParams.get('search')
    const includeArchived = searchParams.get('archived') === 'true'

    const where: any = {
      isPublished: true,
    }

    if (!includeArchived) {
      where.isArchived = false
    }

    if (type && type !== 'ALL') {
      where.type = type
    }

    if (classCategory && classCategory !== 'ALL') {
      where.OR = [{ classCategory }, { classCategory: 'ALL' }]
    }

    if (search) {
      where.AND = [
        {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        },
      ]
    }

    const resources = await prisma.free_resources.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        fileUrl: true,
        content: true,
        thumbnailUrl: true,
        classCategory: true,
        priority: true,
        isArchived: true,
        publishedAt: true,
        expiresAt: true,
        viewCount: true,
        createdAt: true,
      },
    })

    const announcements = resources.filter((r) => r.type === 'ANNOUNCEMENT' && r.priority > 0)
    const otherResources = resources.filter((r) => r.type !== 'ANNOUNCEMENT' || r.priority === 0)

    return NextResponse.json({
      success: true,
      announcements,
      resources: otherResources,
      total: resources.length,
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch (error) {
    console.error('Error fetching free resources:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch resources',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
