import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Preview lead scores. Counselors see only their own leads; ADMIN sees all.
export async function GET(req: NextRequest) {
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

    const formatted = leads.map((lead) => ({
      id: lead.id,
      studentName: lead.studentName,
      phone: lead.phone,
      stage: lead.stage,
      priority: lead.priority,
      currentScore: lead.score || 0,
      calculatedScore: lead.score || 0,
      breakdown: Array.isArray(lead.scoreBreakdown)
        ? lead.scoreBreakdown
        : typeof lead.scoreBreakdown === 'object' && lead.scoreBreakdown
          ? Object.entries(lead.scoreBreakdown).map(([rule, points]) => ({
              rule,
              points: Number(points),
            }))
          : [],
    }))

    return NextResponse.json({ data: formatted })
  } catch (error) {
    console.error('Error fetching score preview:', error)
    return NextResponse.json({ data: [] })
  }
}
