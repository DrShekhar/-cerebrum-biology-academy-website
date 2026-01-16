import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// ============================================
// GET - Fetch wall of achievers (public)
// ============================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const period = searchParams.get('period')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const featured = searchParams.get('featured') === 'true'

    const now = new Date()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      isActive: true,
    }

    if (category) {
      whereClause.category = category
    }

    if (period) {
      whereClause.period = period
    }

    // Featured filter: only those currently in featured period
    if (featured) {
      whereClause.featuredFrom = { lte: now }
      whereClause.OR = [
        { featuredUntil: null },
        { featuredUntil: { gte: now } },
      ]
    }

    const [achievers, total] = await Promise.all([
      prisma.wall_of_achievers.findMany({
        where: whereClause,
        orderBy: [
          { featuredFrom: { sort: 'desc', nulls: 'last' } },
          { score: 'desc' },
          { rank: 'asc' },
          { createdAt: 'desc' },
        ],
        take: limit,
        skip: offset,
        select: {
          id: true,
          studentId: true,
          studentName: true,
          achievement: true,
          description: true,
          category: true,
          score: true,
          rank: true,
          badgeUrl: true,
          photoUrl: true,
          courseId: true,
          period: true,
          featuredFrom: true,
          featuredUntil: true,
          viewCount: true,
          createdAt: true,
          _count: {
            select: { nominations: true },
          },
        },
      }),
      prisma.wall_of_achievers.count({ where: whereClause }),
    ])

    // Get distinct categories for filtering
    const categories = await prisma.wall_of_achievers.findMany({
      where: { isActive: true },
      select: { category: true },
      distinct: ['category'],
    })

    // Get distinct periods for filtering
    const periods = await prisma.wall_of_achievers.findMany({
      where: { isActive: true, period: { not: null } },
      select: { period: true },
      distinct: ['period'],
    })

    // Transform achievers
    const transformedAchievers = achievers.map((a) => ({
      ...a,
      score: a.score ? Number(a.score) : null,
      nominationCount: a._count.nominations,
      isFeatured: a.featuredFrom && a.featuredFrom <= now && (!a.featuredUntil || a.featuredUntil >= now),
      _count: undefined,
    }))

    return NextResponse.json({
      success: true,
      data: {
        achievers: transformedAchievers,
        filters: {
          categories: categories.map((c) => c.category),
          periods: periods.map((p) => p.period).filter(Boolean),
        },
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + achievers.length < total,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching wall of achievers:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch achievers' }, { status: 500 })
  }
}
