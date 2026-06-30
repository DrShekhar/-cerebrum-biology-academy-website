import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Cache for 1 hour

export async function GET(request: NextRequest) {
  try {
    // Optional curriculum/board scope (e.g. 'Campbell' for AP/USABO/olympiad,
    // 'NCERT' for NEET) so tab badges can reflect an exam-specific question set.
    const curriculum = new URL(request.url).searchParams.get('curriculum') || undefined
    const base = { isActive: true, isVerified: true, ...(curriculum ? { curriculum } : {}) }

    const [allCount, ncertCount, pyqCount, olympiadCount] = await Promise.all([
      prisma.questions.count({
        where: { ...base },
      }),
      prisma.questions.count({
        where: { ...base, isNcertBased: true },
      }),
      prisma.questions.count({
        where: { ...base, examYear: { not: null } },
      }),
      prisma.questions.count({
        where: { ...base, isOlympiad: true },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: { all: allCount, ncert: ncertCount, pyq: pyqCount, olympiad: olympiadCount },
    })
  } catch (error) {
    console.error('Error fetching MCQ counts:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch counts' }, { status: 500 })
  }
}
