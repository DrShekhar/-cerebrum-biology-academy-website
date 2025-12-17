import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const topic = searchParams.get('topic') || ''
    const ncertClass = searchParams.get('class') ? parseInt(searchParams.get('class')!) : null
    const ncertChapter = searchParams.get('chapter') ? parseInt(searchParams.get('chapter')!) : null

    // Build search criteria
    const where: any = { isActive: true }

    if (ncertClass) where.ncertClass = ncertClass
    if (ncertChapter) where.ncertChapter = ncertChapter

    if (topic) {
      where.OR = [
        { name: { contains: topic, mode: 'insensitive' } },
        { tags: { has: topic.toLowerCase() } },
        { subcategory: { contains: topic, mode: 'insensitive' } },
        { ncertChapterName: { contains: topic, mode: 'insensitive' } },
      ]
    }

    // Get diagrams sorted by quality and relevance
    const diagrams = await prisma.diagram_assets.findMany({
      where,
      orderBy: [{ qualityScore: 'desc' }, { isVerified: 'desc' }, { usageCount: 'desc' }],
      take: 10,
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        source: true,
        thumbnailUrl: true,
        fileUrl: true,
        qualityScore: true,
        isVerified: true,
        ncertClass: true,
        ncertChapter: true,
        ncertFigureNo: true,
        ncertFigureTitle: true,
        labeledParts: true,
        license: true,
      },
    })

    // Categorize recommendations
    const recommendations = {
      best: diagrams.slice(0, 1)[0] || null, // Top recommendation
      alternatives: diagrams.slice(1, 5), // Other good options
      all: diagrams, // All matches
    }

    return NextResponse.json({
      success: true,
      data: {
        recommendations,
        query: { topic, ncertClass, ncertChapter },
        totalFound: diagrams.length,
      },
    })
  } catch (error) {
    console.error('Diagram recommend error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to get recommendations' },
      { status: 500 }
    )
  }
}
