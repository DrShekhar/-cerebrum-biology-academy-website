import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { NEET_TEMPLATE_SLUG } from '@/lib/cbt/paper'

/**
 * GET /api/cbt/attempts — the signed-in student's CBT attempts for the NEET
 * full-mock, newest first. Powers the CBT hub history + resume.
 */
export async function GET() {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId)
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })

    const template = await prisma.test_templates.findUnique({
      where: { slug: NEET_TEMPLATE_SLUG },
      select: { id: true, totalQuestions: true },
    })
    if (!template) {
      return NextResponse.json({ success: true, attempts: [], inProgressId: null })
    }

    const rows = await prisma.test_sessions.findMany({
      where: { userId, testTemplateId: template.id },
      orderBy: { createdAt: 'desc' },
      take: 25,
      select: {
        id: true,
        status: true,
        totalScore: true,
        percentage: true,
        rank: true,
        submittedAt: true,
        createdAt: true,
      },
    })

    const maxScore = (template.totalQuestions || 180) * 4
    const inProgress = rows.find((r) => r.status === 'IN_PROGRESS')

    return NextResponse.json({
      success: true,
      inProgressId: inProgress?.id ?? null,
      maxScore,
      attempts: rows.map((r) => ({
        id: r.id,
        status: r.status,
        score: r.totalScore,
        percentage: r.percentage,
        rank: r.rank,
        date: (r.submittedAt ?? r.createdAt).toISOString(),
      })),
    })
  } catch (error) {
    console.error('CBT attempts error:', error)
    return NextResponse.json({ success: false, error: 'Failed to load attempts' }, { status: 500 })
  }
}
