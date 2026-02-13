import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/mcq/ncert-chapters
 * Returns available NCERT chapters for filtering questions
 * Query params:
 *   - ncertClass: Filter by class (11 or 12)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ncertClass = searchParams.get('ncertClass')
      ? parseInt(searchParams.get('ncertClass')!)
      : undefined

    // Build where clause
    const where: Record<string, unknown> = {
      isNcertBased: true,
      isActive: true,
    }

    if (ncertClass) {
      where.ncertClass = ncertClass
    }

    // Get distinct chapters with counts
    const chaptersRaw = await prisma.questions.groupBy({
      by: ['ncertClass', 'ncertChapter', 'ncertChapterName'],
      where,
      _count: {
        id: true,
      },
      orderBy: [{ ncertClass: 'asc' }, { ncertChapter: 'asc' }],
    })

    // Get NEET weightage distribution
    const weightageStats = await prisma.questions.groupBy({
      by: ['neetWeightage'],
      where: {
        isNcertBased: true,
        isActive: true,
        neetWeightage: { not: null },
      },
      _count: {
        id: true,
      },
    })

    // Format the response
    const chapters = chaptersRaw
      .filter((ch) => ch.ncertClass !== null && ch.ncertChapter !== null)
      .map((ch) => ({
        ncertClass: ch.ncertClass!,
        ncertChapter: ch.ncertChapter!,
        ncertChapterName: ch.ncertChapterName || `Chapter ${ch.ncertChapter}`,
        questionCount: ch._count.id,
      }))

    // Group by class
    const class11Chapters = chapters.filter((ch) => ch.ncertClass === 11)
    const class12Chapters = chapters.filter((ch) => ch.ncertClass === 12)

    // Total NCERT questions
    const totalNcertQuestions = await prisma.questions.count({
      where: { isNcertBased: true, isActive: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        chapters: {
          class11: class11Chapters,
          class12: class12Chapters,
          all: chapters,
        },
        statistics: {
          totalNcertQuestions,
          class11Questions: class11Chapters.reduce((sum, ch) => sum + ch.questionCount, 0),
          class12Questions: class12Chapters.reduce((sum, ch) => sum + ch.questionCount, 0),
          byWeightage: Object.fromEntries(
            weightageStats.map((w) => [w.neetWeightage || 'UNKNOWN', w._count.id])
          ),
        },
        filters: {
          classes: [11, 12],
          weightages: ['HIGH', 'MEDIUM', 'LOW'],
        },
      },
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch (error) {
    console.error('Error fetching NCERT chapters:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch NCERT chapters',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
