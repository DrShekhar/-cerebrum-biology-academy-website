import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ncertClass = searchParams.get('class') ? parseInt(searchParams.get('class')!) : null

    const where: any = {}
    if (ncertClass) where.class = ncertClass

    const chapters = await prisma.ncert_chapters.findMany({
      where,
      orderBy: [{ class: 'asc' }, { chapterNo: 'asc' }],
      select: {
        id: true,
        class: true,
        unitNo: true,
        unitName: true,
        chapterNo: true,
        chapterName: true,
        topics: true,
        neetWeightage: true,
        keyFigures: true,
      },
    })

    // Group by class
    const grouped = {
      class11: chapters.filter((c) => c.class === 11),
      class12: chapters.filter((c) => c.class === 12),
    }

    return NextResponse.json({
      success: true,
      data: { chapters, grouped, total: chapters.length },
    })
  } catch (error) {
    console.error('NCERT chapters error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch chapters' }, { status: 500 })
  }
}
