import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Preview lead scores. Counselors see only their own leads; ADMIN sees all.
export async function GET(_req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const isAdmin = session.user.role === 'ADMIN'
    const leads = await prisma.leads.findMany({
      where: {
        stage: { notIn: ['ENROLLED', 'LOST'] },
        ...(isAdmin ? {} : { assignedToId: session.user.id }),
      },
      orderBy: { score: 'desc' },
      take: 20,
      select: {
        id: true,
        studentName: true,
        phone: true,
        stage: true,
        priority: true,
        score: true,
        scoreBreakdown: true,
      },
    })

    // This is a read view of STORED scores (score + scoreBreakdown as last
    // written by the engine) — it does not simulate a recalculation.
    const formatted = leads.map((lead) => ({
      id: lead.id,
      studentName: lead.studentName,
      phone: lead.phone,
      stage: lead.stage,
      priority: lead.priority,
      score: lead.score || 0,
      breakdown: Array.isArray(lead.scoreBreakdown)
        ? // legacy rescore format: [{ rule, points }]
          lead.scoreBreakdown
        : typeof lead.scoreBreakdown === 'object' && lead.scoreBreakdown
          ? // engine format: { demographic, behavioral, engagement, timeline,
            // total, details } — surface the numeric dimensions only
            Object.entries(lead.scoreBreakdown)
              .filter(([key, value]) => typeof value === 'number' && key !== 'total')
              .map(([rule, points]) => ({ rule, points: Number(points) }))
          : [],
    }))

    return NextResponse.json({ data: formatted })
  } catch (error) {
    console.error('Error fetching score preview:', error)
    // A real error must not masquerade as "no leads to show"
    return NextResponse.json({ error: 'Failed to fetch score preview' }, { status: 500 })
  }
}
