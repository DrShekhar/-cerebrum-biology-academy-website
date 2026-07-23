import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

// Real drip-sequence CRUD (previously POST/PATCH/DELETE fabricated ids and
// persisted nothing — saved sequences vanished on reload). Definitions are
// stored in drip_sequences/drip_sequence_steps and SENT by
// src/lib/automation/dbDripProcessor.ts (hourly `nurturing` cron): sequences
// save inactive, and flipping the toggle to Active makes them live.

// triggerStage must be a real LeadStage value — dbDripProcessor silently
// skips sequences whose stage doesn't match the enum, so free text here
// would create a sequence that never sends.
const TRIGGER_STAGES = [
  'NEW_LEAD',
  'DEMO_SCHEDULED',
  'DEMO_COMPLETED',
  'OFFER_SENT',
  'NEGOTIATING',
  'PAYMENT_PLAN_CREATED',
  'ENROLLED',
  'ACTIVE_STUDENT',
  'LOST',
] as const

const stepSchema = z.object({
  order: z.number().int().min(0).max(50),
  delayHours: z
    .number()
    .int()
    .min(0)
    .max(24 * 60),
  channel: z.literal('WHATSAPP').default('WHATSAPP'),
  body: z.string().min(1).max(2000),
})

const createSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  triggerStage: z.enum(TRIGGER_STAGES),
  stopOnStageChange: z.boolean().default(true),
  steps: z.array(stepSchema).min(1).max(20),
})

function rand(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// GET - List sequences with REAL execution stats from the dbDripProcessor's
// `drip_step_sent` activity markers. (Previously stats came from the
// unrelated whatsapp_nurturing subsystem keyed by source==triggerStage, so
// the numbers had nothing to do with these sequences.)
export async function GET() {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error

  try {
    const [sequences, reachedRows, perStepRows] = await Promise.all([
      prisma.drip_sequences.findMany({
        include: { steps: { orderBy: { order: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.$queryRaw`
        SELECT metadata->>'sequenceId' AS "sequenceId",
          COUNT(DISTINCT "leadId")::int AS reached
        FROM activities
        WHERE action = 'drip_step_sent'
        GROUP BY 1
      ` as Promise<Array<{ sequenceId: string; reached: number }>>,
      prisma.$queryRaw`
        SELECT metadata->>'sequenceId' AS "sequenceId",
          (metadata->>'order')::int AS ord,
          COUNT(DISTINCT "leadId")::int AS leads
        FROM activities
        WHERE action = 'drip_step_sent'
        GROUP BY 1, 2
      ` as Promise<Array<{ sequenceId: string; ord: number; leads: number }>>,
    ])

    const reachedBySeq = new Map(reachedRows.map((r) => [r.sequenceId, r.reached]))

    return NextResponse.json({
      success: true,
      data: sequences.map((seq) => {
        const totalEnrolled = reachedBySeq.get(seq.id) || 0
        // Completed = leads that received the sequence's final step.
        const maxOrder = seq.steps.length > 0 ? seq.steps[seq.steps.length - 1].order : null
        const completed =
          maxOrder === null
            ? 0
            : perStepRows.find((r) => r.sequenceId === seq.id && r.ord === maxOrder)?.leads || 0
        return {
          ...seq,
          stats: {
            totalEnrolled,
            active: Math.max(0, totalEnrolled - completed),
            completed,
            stopped: 0, // per-lead stop tracking doesn't exist yet
          },
        }
      }),
    })
  } catch (error) {
    console.error('Error fetching sequences:', error)
    return NextResponse.json({ success: false, error: 'Failed to load sequences' }, { status: 500 })
  }
}

// POST - Create a sequence (saved INACTIVE; activation is the toggle below)
export async function POST(req: NextRequest) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error
  const { session } = authResult

  try {
    const parsed = createSchema.safeParse(await req.json())
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid sequence', details: parsed.error.issues },
        { status: 400 }
      )
    }

    const sequence = await prisma.drip_sequences.create({
      data: {
        id: rand('seq'),
        name: parsed.data.name,
        description: parsed.data.description || null,
        triggerStage: parsed.data.triggerStage,
        stopOnStageChange: parsed.data.stopOnStageChange,
        isActive: false,
        createdById: session.userId,
        steps: {
          create: parsed.data.steps.map((s, i) => ({
            id: rand('step'),
            order: s.order ?? i,
            delayHours: s.delayHours,
            channel: s.channel,
            body: s.body,
          })),
        },
      },
      include: { steps: { orderBy: { order: 'asc' } } },
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          ...sequence,
          stats: { totalEnrolled: 0, active: 0, completed: 0, stopped: 0 },
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating sequence:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create sequence' },
      { status: 500 }
    )
  }
}

// PATCH - Toggle active / edit metadata / replace steps
export async function PATCH(req: NextRequest) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error

  try {
    const body = await req.json()
    const { id, isActive, name, description, triggerStage, stopOnStageChange, steps } = body
    if (!id) {
      return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
    }

    let validatedSteps: z.infer<typeof stepSchema>[] | null = null
    if (steps !== undefined) {
      const parsed = z.array(stepSchema).min(1).max(20).safeParse(steps)
      if (!parsed.success) {
        return NextResponse.json(
          { success: false, error: 'Invalid steps', details: parsed.error.issues },
          { status: 400 }
        )
      }
      validatedSteps = parsed.data
    }

    const sequence = await prisma.$transaction(async (tx) => {
      await tx.drip_sequences.update({
        where: { id },
        data: {
          ...(typeof isActive === 'boolean' ? { isActive } : {}),
          ...(typeof name === 'string' && name.trim() ? { name: name.trim() } : {}),
          ...(typeof description === 'string' ? { description } : {}),
          ...(typeof triggerStage === 'string' && triggerStage.trim()
            ? { triggerStage: triggerStage.trim() }
            : {}),
          ...(typeof stopOnStageChange === 'boolean' ? { stopOnStageChange } : {}),
        },
      })
      if (validatedSteps) {
        await tx.drip_sequence_steps.deleteMany({ where: { sequenceId: id } })
        await tx.drip_sequence_steps.createMany({
          data: validatedSteps.map((s, i) => ({
            id: rand('step'),
            sequenceId: id,
            order: s.order ?? i,
            delayHours: s.delayHours,
            channel: s.channel,
            body: s.body,
          })),
        })
      }
      return tx.drip_sequences.findUniqueOrThrow({
        where: { id },
        include: { steps: { orderBy: { order: 'asc' } } },
      })
    })

    return NextResponse.json({ success: true, data: sequence })
  } catch (error) {
    console.error('Error updating sequence:', error)
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE - Remove a sequence (steps cascade)
export async function DELETE(req: NextRequest) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
    }

    await prisma.drip_sequences.delete({ where: { id } })

    return NextResponse.json({ success: true, data: { deleted: true, id } })
  } catch (error) {
    console.error('Error deleting sequence:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
