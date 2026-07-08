import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/**
 * GET /api/scholarship/result/[token] — public scorecard by unguessable token
 * (powers the result page + the shareable scorecard).
 */
export async function GET(_request: NextRequest, context: { params: Promise<{ token: string }> }) {
  try {
    const { token } = await context.params
    const registration = await prisma.scholarship_registrations.findUnique({
      where: { token },
      include: { test: { select: { name: true } } },
    })
    if (!registration || registration.status !== 'COMPLETED') {
      return NextResponse.json({ success: false, error: 'Result not found.' }, { status: 404 })
    }
    return NextResponse.json({
      success: true,
      data: {
        studentName: registration.studentName,
        classLevel: registration.classLevel,
        testName: registration.test.name,
        score: registration.score,
        maxScore: registration.maxScore,
        percent: registration.percent,
        correct: registration.correctCount,
        incorrect: registration.incorrectCount,
        waiverPercent: registration.waiverPercent,
        completedAt: registration.completedAt,
      },
    })
  } catch (error) {
    console.error('[scholarship/result] failed:', error)
    return NextResponse.json({ success: false, error: 'Could not load result.' }, { status: 500 })
  }
}
