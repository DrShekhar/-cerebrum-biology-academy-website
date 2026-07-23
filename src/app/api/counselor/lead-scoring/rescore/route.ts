import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { calculateLeadScore, getLeadPriority } from '@/lib/leadScoring'
import type { Prisma } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

// POST - Rescore all leads. ADMIN-only — bulk operation touches every lead.
//
// Uses the SAME engine (src/lib/leadScoring.ts) that scores leads at capture
// time, so a bulk rescore and the live per-lead scoring always agree. This
// route previously carried its own inline algorithm with different weights,
// which meant "Rescore All" silently produced different numbers than the
// engine that scored the same lead the day it arrived.
export async function POST(_req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if ((session.user.role || '').toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 })
    }

    const leads = await prisma.leads.findMany({
      where: { stage: { notIn: ['ENROLLED', 'LOST'] } },
      select: { id: true },
    })

    let updated = 0
    let failed = 0

    for (const lead of leads) {
      try {
        const breakdown = await calculateLeadScore(lead.id)
        await prisma.leads.update({
          where: { id: lead.id },
          data: {
            score: breakdown.total,
            scoreBreakdown: breakdown as unknown as Prisma.InputJsonValue,
            scoreUpdatedAt: new Date(),
            priority: getLeadPriority(breakdown.total),
            updatedAt: new Date(),
          },
        })
        updated++
      } catch (error) {
        failed++
        console.error(`Rescore failed for lead ${lead.id}:`, error)
      }
    }

    return NextResponse.json({
      data: { updated, failed, total: leads.length },
      updated, // kept at top level — the UI toast reads data.updated ?? updated
    })
  } catch (error) {
    console.error('Error rescoring leads:', error)
    return NextResponse.json({ error: 'Failed to rescore leads' }, { status: 500 })
  }
}
