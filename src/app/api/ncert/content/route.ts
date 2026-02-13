import { NextRequest, NextResponse } from 'next/server'
import { ncertReader } from '@/lib/ncert/NCERTContentReader'

/**
 * API endpoint to get NCERT chapter content with extracted data
 *
 * GET /api/ncert/content?class=11&chapter=1 - Get parsed content for a chapter
 *
 * Returns:
 * - Chapter pages with content
 * - Extracted key terms
 * - Important statements (definitions, facts)
 * - Figure references
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const classParam = searchParams.get('class')
    const chapterParam = searchParams.get('chapter')

    if (!classParam || !chapterParam) {
      return NextResponse.json(
        { error: 'Both class and chapter parameters are required' },
        { status: 400 }
      )
    }

    const ncertClass = parseInt(classParam) as 11 | 12
    const chapterNum = parseInt(chapterParam)

    if (ncertClass !== 11 && ncertClass !== 12) {
      return NextResponse.json({ error: 'Invalid class. Must be 11 or 12.' }, { status: 400 })
    }

    // Get chapter metadata
    const chapter = await ncertReader.getChapter(ncertClass, chapterNum)
    if (!chapter) {
      return NextResponse.json(
        { error: `Chapter ${chapterNum} not found for Class ${ncertClass}` },
        { status: 404 }
      )
    }

    // Get parsed pages with extracted content
    const pages = await ncertReader.getChapterPages(ncertClass, chapterNum)

    // Aggregate key terms and important statements across all pages
    const allKeyTerms = new Set<string>()
    const allStatements: string[] = []
    const allFigures = new Set<string>()

    for (const page of pages) {
      page.keyTerms.forEach((term) => allKeyTerms.add(term))
      page.importantStatements.forEach((stmt) => {
        if (!allStatements.includes(stmt)) {
          allStatements.push(stmt)
        }
      })
      page.figures.forEach((fig) => allFigures.add(fig))
    }

    return NextResponse.json({
      success: true,
      chapter: {
        number: chapter.number,
        name: chapter.name,
        ncertClass: chapter.ncertClass,
        neetWeightage: chapter.neetWeightage,
        topicsCovered: chapter.topicsCovered,
        keyDiagrams: chapter.keyDiagrams,
        totalPages: chapter.totalPages,
      },
      content: {
        pages: pages.map((p) => ({
          pageNumber: p.pageNumber,
          contentPreview: p.content.substring(0, 500) + (p.content.length > 500 ? '...' : ''),
          keyTermsCount: p.keyTerms.length,
          statementsCount: p.importantStatements.length,
          figuresCount: p.figures.length,
        })),
        aggregated: {
          keyTerms: Array.from(allKeyTerms),
          importantStatements: allStatements.slice(0, 50), // Limit to 50
          figures: Array.from(allFigures),
        },
      },
      questionGenerationReady: pages.some((p) => p.content.length > 0),
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    })
  } catch (error) {
    console.error('[NCERT Content API] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to load NCERT content',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
