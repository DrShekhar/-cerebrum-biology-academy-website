import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'AED', 'SGD'] as const

/**
 * GET /api/admin/courses/[courseId]/pricing — every currency slot for the
 * course (existing row or empty), so the workspace Pricing tab renders a
 * complete grid. First UI ever over course_pricing (rows were seed-only).
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdminAuth()
    const { courseId } = await context.params

    const course = await prisma.courses.findUnique({
      where: { id: courseId },
      select: { id: true, totalFees: true, course_pricing: true },
    })
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    const rows = CURRENCIES.map((currency) => {
      const existing = course.course_pricing.find((p) => p.currency === currency)
      return {
        currency,
        // Smallest unit (paise/cents) — the UI converts for display.
        amount: existing?.amount ?? null,
        isActive: existing?.isActive ?? false,
      }
    })

    return NextResponse.json({
      success: true,
      data: { totalFees: course.totalFees, pricing: rows },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/courses/:id/pricing] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load pricing' }, { status: 500 })
  }
}

const putSchema = z.object({
  totalFees: z.number().min(1000).optional(), // rupees → stored as paise
  pricing: z
    .array(
      z.object({
        currency: z.enum(CURRENCIES),
        amount: z.number().min(0).nullable(), // smallest unit
        isActive: z.boolean(),
      })
    )
    .max(CURRENCIES.length),
})

/**
 * PUT /api/admin/courses/[courseId]/pricing — upsert per-currency rows.
 * amount null (or inactive with no prior row) ⇒ slot stays empty; geo pricing
 * falls back to totalFees exactly as /api/courses/pricing already does.
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdminAuth()
    const { courseId } = await context.params

    const parsed = putSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const course = await prisma.courses.findUnique({ where: { id: courseId } })
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    await prisma.$transaction(async (tx) => {
      if (parsed.data.totalFees !== undefined) {
        await tx.courses.update({
          where: { id: courseId },
          data: { totalFees: Math.round(parsed.data.totalFees * 100), updatedAt: new Date() },
        })
      }
      for (const row of parsed.data.pricing) {
        if (row.amount === null) {
          // Clearing a slot removes the row so the geo fallback applies.
          await tx.course_pricing.deleteMany({ where: { courseId, currency: row.currency } })
        } else {
          await tx.course_pricing.upsert({
            where: { courseId_currency: { courseId, currency: row.currency } },
            create: {
              courseId,
              currency: row.currency,
              amount: row.amount,
              isActive: row.isActive,
            },
            update: { amount: row.amount, isActive: row.isActive },
          })
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/courses/:id/pricing] PUT failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to save pricing' }, { status: 500 })
  }
}
