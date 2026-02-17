import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const [allCount, ncertCount, pyqCount, olympiadCount] = await Promise.all([
      prisma.questions.count({
        where: { isActive: true, isVerified: true },
      }),
      prisma.questions.count({
        where: { isActive: true, isVerified: true, isNcertBased: true },
      }),
      prisma.questions.count({
        where: { isActive: true, isVerified: true, examYear: { not: null } },
      }),
      prisma.questions.count({
        where: { isActive: true, isVerified: true, isOlympiad: true },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: { all: allCount, ncert: ncertCount, pyq: pyqCount, olympiad: olympiadCount },
    })
  } catch (error) {
    console.error('Error fetching MCQ counts:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch counts' },
      { status: 500 }
    )
  }
}
