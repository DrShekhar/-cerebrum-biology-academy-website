import { NextRequest, NextResponse } from 'next/server'
import { ncertReader } from '@/lib/ncert/NCERTContentReader'

/**
 * API endpoint to get NCERT chapter information
 *
 * GET /api/ncert/chapters - Get all chapters
 * GET /api/ncert/chapters?class=11 - Get chapters for a specific class
 * GET /api/ncert/chapters?class=11&chapter=1 - Get a specific chapter
 * GET /api/ncert/chapters?highWeightage=true - Get high NEET weightage chapters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const classParam = searchParams.get('class')
    const chapterParam = searchParams.get('chapter')
    const highWeightage = searchParams.get('highWeightage')
    const includeStats = searchParams.get('stats')

    // Get high weightage chapters
    if (highWeightage === 'true') {
      const chapters = await ncertReader.getHighWeightageChapters()
      return NextResponse.json({
        success: true,
        count: chapters.length,
        chapters,
      }, {
        headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
      })
    }

    // Get summary stats
    if (includeStats === 'true') {
      const stats = await ncertReader.getSummaryStats()
      return NextResponse.json({
        success: true,
        stats,
      }, {
        headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
      })
    }

    // Get specific chapter
    if (classParam && chapterParam) {
      const ncertClass = parseInt(classParam) as 11 | 12
      const chapterNum = parseInt(chapterParam)

      if (ncertClass !== 11 && ncertClass !== 12) {
        return NextResponse.json({ error: 'Invalid class. Must be 11 or 12.' }, { status: 400 })
      }

      const chapter = await ncertReader.getChapter(ncertClass, chapterNum)
      if (!chapter) {
        return NextResponse.json(
          { error: `Chapter ${chapterNum} not found for Class ${ncertClass}` },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        chapter,
      }, {
        headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
      })
    }

    // Get all chapters for a class
    if (classParam) {
      const ncertClass = parseInt(classParam) as 11 | 12

      if (ncertClass !== 11 && ncertClass !== 12) {
        return NextResponse.json({ error: 'Invalid class. Must be 11 or 12.' }, { status: 400 })
      }

      const chapters = await ncertReader.getChaptersForClass(ncertClass)
      return NextResponse.json({
        success: true,
        class: ncertClass,
        count: chapters.length,
        chapters,
      }, {
        headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
      })
    }

    // Get all chapters (both classes)
    const index = await ncertReader.loadIndex()
    return NextResponse.json({
      success: true,
      class11: {
        totalChapters: index.class11.totalChapters,
        chapters: index.class11.chapters,
      },
      class12: {
        totalChapters: index.class12.totalChapters,
        chapters: index.class12.chapters,
      },
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    })
  } catch (error) {
    console.error('[NCERT API] Error:', error)
    return NextResponse.json(
      {
        error: 'Failed to load NCERT data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
