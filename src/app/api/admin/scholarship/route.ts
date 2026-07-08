import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ensureDefaultScholarshipTest, parseBands } from '@/lib/scholarship/scholarshipTest'

export const dynamic = 'force-dynamic'

/**
 * GET /api/admin/scholarship — test config + registrations (score-desc) with
 * summary stats. PUT updates the config (name/duration/count/window/bands).
 */
export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const test = await ensureDefaultScholarshipTest()
    const where = {
      testId: test.id,
      ...(status && status !== 'all' ? { status } : {}),
    }
    const [registrations, total, completed] = await Promise.all([
      prisma.scholarship_registrations.findMany({
        where,
        orderBy: [{ completedAt: 'desc' }, { createdAt: 'desc' }],
        take: 500,
        select: {
          id: true,
          studentName: true,
          phone: true,
          email: true,
          classLevel: true,
          city: true,
          status: true,
          score: true,
          maxScore: true,
          percent: true,
          waiverPercent: true,
          leadId: true,
          createdAt: true,
          completedAt: true,
        },
      }),
      prisma.scholarship_registrations.count({ where: { testId: test.id } }),
      prisma.scholarship_registrations.count({
        where: { testId: test.id, status: 'COMPLETED' },
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        test: { ...test, waiverBands: parseBands(test.waiverBands) },
        registrations,
        stats: { total, completed, showRate: total ? Math.round((completed / total) * 100) : 0 },
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/scholarship] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load' }, { status: 500 })
  }
}

const putSchema = z.object({
  name: z.string().trim().min(3).max(120).optional(),
  isActive: z.boolean().optional(),
  questionCount: z.number().int().min(10).max(180).optional(),
  durationMin: z.number().int().min(10).max(240).optional(),
  windowStartAt: z.string().datetime().nullable().optional(),
  windowEndAt: z.string().datetime().nullable().optional(),
  waiverBands: z
    .array(
      z.object({
        minPercent: z.number().min(0).max(100),
        waiverPercent: z.number().min(0).max(100),
      })
    )
    .min(1)
    .max(8)
    .optional(),
})

export async function PUT(request: NextRequest) {
  try {
    await requireAdminAuth()
    const parsed = putSchema.safeParse(await request.json().catch(() => ({})))
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid config' }, { status: 400 })
    }
    const p = parsed.data
    const test = await ensureDefaultScholarshipTest()
    const updated = await prisma.scholarship_tests.update({
      where: { id: test.id },
      data: {
        ...(p.name !== undefined ? { name: p.name } : {}),
        ...(p.isActive !== undefined ? { isActive: p.isActive } : {}),
        ...(p.questionCount !== undefined ? { questionCount: p.questionCount } : {}),
        ...(p.durationMin !== undefined ? { durationMin: p.durationMin } : {}),
        ...(p.windowStartAt !== undefined
          ? { windowStartAt: p.windowStartAt ? new Date(p.windowStartAt) : null }
          : {}),
        ...(p.windowEndAt !== undefined
          ? { windowEndAt: p.windowEndAt ? new Date(p.windowEndAt) : null }
          : {}),
        ...(p.waiverBands !== undefined
          ? {
              waiverBands: [...p.waiverBands].sort(
                (a, b) => b.minPercent - a.minPercent
              ) as unknown as object,
            }
          : {}),
      },
    })
    return NextResponse.json({
      success: true,
      data: { ...updated, waiverBands: parseBands(updated.waiverBands) },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/scholarship] PUT failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to save' }, { status: 500 })
  }
}
