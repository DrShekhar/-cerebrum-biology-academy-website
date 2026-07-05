import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth/admin-auth'

export const dynamic = 'force-dynamic'

const blockSchema = z
  .object({
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    slotId: z.string().optional().nullable(),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional()
      .nullable(),
    reason: z.string().max(120).optional().nullable(),
    createdBy: z.string().optional().nullable(),
  })
  .refine((b) => b.endDate >= b.startDate, { message: 'endDate must be on or after startDate' })

/**
 * POST — block time so no one can book it. Owner/counselor use.
 * Whole day(s): pass startDate/endDate only. One slot or time: add slotId/startTime.
 * "Block everything next week" = a startDate→endDate range with no slot/time.
 */
export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    const data = blockSchema.parse(await request.json())
    const block = await prisma.demo_slot_blocks.create({
      data: {
        startDate: data.startDate,
        endDate: data.endDate,
        slotId: data.slotId || null,
        startTime: data.startTime || null,
        reason: data.reason || null,
        createdBy: data.createdBy || null,
      },
    })
    return NextResponse.json({ success: true, block })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues.map((e) => e.message).join(', ') },
        { status: 400 }
      )
    }
    throw error
  }
})

/** DELETE — remove a block (un-block). Query: ?id=... */
export const DELETE = requireAdminAuth(async (request: NextRequest) => {
  const id = new URL(request.url).searchParams.get('id')
  if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
  await prisma.demo_slot_blocks.delete({ where: { id } })
  return NextResponse.json({ success: true })
})
