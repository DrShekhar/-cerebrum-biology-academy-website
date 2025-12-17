import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DiagramCategory, DiagramSource } from '@/generated/prisma'

interface DiagramImportData {
  name: string
  description?: string
  category: string
  subcategory?: string
  source: string
  sourceUrl?: string
  license: string
  attribution?: string
  fileUrl: string
  thumbnailUrl?: string
  ncertClass?: number
  ncertChapter?: number
  ncertFigureNo?: string
  ncertFigureTitle?: string
  tags?: string[]
  keywords?: string[]
  labeledParts?: Record<string, string>
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { diagrams, updateExisting = false } = body as {
      diagrams: DiagramImportData[]
      updateExisting?: boolean
    }

    if (!diagrams || !Array.isArray(diagrams)) {
      return NextResponse.json({ success: false, error: 'Invalid diagrams array' }, { status: 400 })
    }

    const results = {
      added: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[],
    }

    for (const diagram of diagrams) {
      try {
        // Validate required fields
        if (!diagram.name || !diagram.category || !diagram.source || !diagram.fileUrl) {
          results.errors.push(`Missing required fields for: ${diagram.name || 'unknown'}`)
          continue
        }

        // Check if exists
        const existing = await prisma.diagram_assets.findFirst({
          where: { name: diagram.name },
        })

        if (existing) {
          if (updateExisting) {
            await prisma.diagram_assets.update({
              where: { id: existing.id },
              data: {
                description: diagram.description,
                category: diagram.category as DiagramCategory,
                subcategory: diagram.subcategory,
                source: diagram.source as DiagramSource,
                sourceUrl: diagram.sourceUrl,
                license: diagram.license,
                attribution: diagram.attribution,
                fileUrl: diagram.fileUrl,
                thumbnailUrl: diagram.thumbnailUrl,
                ncertClass: diagram.ncertClass,
                ncertChapter: diagram.ncertChapter,
                ncertFigureNo: diagram.ncertFigureNo,
                ncertFigureTitle: diagram.ncertFigureTitle,
                tags: diagram.tags || [],
                keywords: diagram.keywords || [],
                labeledParts: diagram.labeledParts,
              },
            })
            results.updated++
          } else {
            results.skipped++
          }
          continue
        }

        // Create new diagram
        await prisma.diagram_assets.create({
          data: {
            name: diagram.name,
            description: diagram.description,
            category: diagram.category as DiagramCategory,
            subcategory: diagram.subcategory,
            source: diagram.source as DiagramSource,
            sourceUrl: diagram.sourceUrl,
            license: diagram.license,
            attribution: diagram.attribution,
            fileUrl: diagram.fileUrl,
            thumbnailUrl: diagram.thumbnailUrl,
            qualityScore: 4.0,
            ncertClass: diagram.ncertClass,
            ncertChapter: diagram.ncertChapter,
            ncertFigureNo: diagram.ncertFigureNo,
            ncertFigureTitle: diagram.ncertFigureTitle,
            tags: diagram.tags || [],
            keywords: diagram.keywords || [],
            labeledParts: diagram.labeledParts,
            isActive: true,
            isVerified: false,
          },
        })
        results.added++
      } catch (err) {
        results.errors.push(`Failed to import ${diagram.name}: ${err}`)
      }
    }

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error('Diagram import error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to import diagrams' },
      { status: 500 }
    )
  }
}

// Get import stats
export async function GET() {
  try {
    const stats = await prisma.diagram_assets.groupBy({
      by: ['source'],
      _count: { source: true },
    })

    const total = await prisma.diagram_assets.count()
    const verified = await prisma.diagram_assets.count({ where: { isVerified: true } })
    const active = await prisma.diagram_assets.count({ where: { isActive: true } })

    const byCategory = await prisma.diagram_assets.groupBy({
      by: ['category'],
      _count: { category: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        total,
        verified,
        active,
        bySource: stats.reduce((acc, s) => ({ ...acc, [s.source]: s._count.source }), {}),
        byCategory: byCategory.reduce(
          (acc, c) => ({ ...acc, [c.category]: c._count.category }),
          {}
        ),
      },
    })
  } catch (error) {
    console.error('Import stats error:', error)
    return NextResponse.json({ success: false, error: 'Failed to get stats' }, { status: 500 })
  }
}
