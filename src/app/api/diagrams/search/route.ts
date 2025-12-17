import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DiagramCategory, DiagramSource } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = searchParams.get('q') || ''
    const category = searchParams.get('category') as DiagramCategory | null
    const ncertClass = searchParams.get('class') ? parseInt(searchParams.get('class')!) : null
    const ncertChapter = searchParams.get('chapter') ? parseInt(searchParams.get('chapter')!) : null
    const source = searchParams.get('source') as DiagramSource | null
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      isActive: true,
    }

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query.toLowerCase() } },
        { keywords: { has: query.toLowerCase() } },
        { ncertFigureTitle: { contains: query, mode: 'insensitive' } },
        { ncertChapterName: { contains: query, mode: 'insensitive' } },
        { subcategory: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (category) where.category = category
    if (ncertClass) where.ncertClass = ncertClass
    if (ncertChapter) where.ncertChapter = ncertChapter
    if (source) where.source = source

    const [diagrams, total] = await Promise.all([
      prisma.diagram_assets.findMany({
        where,
        orderBy: [{ qualityScore: 'desc' }, { usageCount: 'desc' }],
        take: limit,
        skip: offset,
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          subcategory: true,
          source: true,
          license: true,
          thumbnailUrl: true,
          fileUrl: true,
          qualityScore: true,
          isVerified: true,
          ncertClass: true,
          ncertChapter: true,
          ncertChapterName: true,
          ncertFigureNo: true,
          ncertFigureTitle: true,
          tags: true,
          usageCount: true,
          labeledParts: true,
        },
      }),
      prisma.diagram_assets.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        diagrams,
        pagination: { total, limit, offset, hasMore: offset + limit < total },
      },
    })
  } catch (error) {
    console.error('Diagram search error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search diagrams' },
      { status: 500 }
    )
  }
}
