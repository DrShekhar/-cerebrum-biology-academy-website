import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { randomUUID } from 'crypto'

// Counseling-session scheduling for the counselor calendar
// (src/app/counselor/schedule/page.tsx). Sessions are persisted as `tasks`
// rows — the same home the page's previous client-side fallback used — so the
// calendar (which reads /api/counselor/tasks) shows them without a new table.

const createSessionSchema = z.object({
  leadId: z.string().min(1),
  type: z.string().default('COUNSELING'), // COUNSELING | DEMO | FOLLOW_UP | PARENT_MEETING ...
  mode: z.string().default('PHONE'), // PHONE | VIDEO_CALL | IN_PERSON ...
  scheduledAt: z.string().min(1), // ISO datetime
  duration: z.number().int().min(5).max(480).default(30),
  notes: z.string().nullable().optional(),
})

// Session type → real Prisma TaskType enum
const SESSION_TASK_TYPE: Record<string, 'FOLLOW_UP_CALL' | 'DEMO_FOLLOWUP' | 'CUSTOM'> = {
  COUNSELING: 'FOLLOW_UP_CALL',
  FOLLOW_UP: 'FOLLOW_UP_CALL',
  DEMO: 'DEMO_FOLLOWUP',
  PARENT_MEETING: 'CUSTOM',
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const data = createSessionSchema.parse(await request.json())

    const lead = await prisma.leads.findUnique({
      where: { id: data.leadId },
      select: { id: true, studentName: true, assignedToId: true },
    })
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }
    if (lead.assignedToId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Access denied' }, { status: 403 })
    }

    const modeLabel = data.mode.replace(/_/g, ' ').toLowerCase()
    const task = await prisma.tasks.create({
      data: {
        id: randomUUID(),
        title: `${data.type.replace(/_/g, ' ')} session (${modeLabel}) — ${lead.studentName}`,
        description:
          data.notes ||
          `Scheduled ${data.type.toLowerCase()} session, ${data.duration} min, ${modeLabel}`,
        type: SESSION_TASK_TYPE[data.type] || 'CUSTOM',
        priority: 'HIGH',
        status: 'PENDING',
        dueDate: new Date(data.scheduledAt),
        leadId: lead.id,
        assignedToId: session.userId,
        updatedAt: new Date(),
      },
      select: { id: true, title: true, dueDate: true },
    })

    // Session booked = a real touchpoint on the lead's timeline
    prisma.activities
      .create({
        data: {
          id: randomUUID(),
          action: 'session_scheduled',
          description: `Session scheduled: ${data.type} (${modeLabel}, ${data.duration} min) at ${new Date(data.scheduledAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
          leadId: lead.id,
          userId: session.userId,
          createdAt: new Date(),
        },
      })
      .catch(() => {})

    return NextResponse.json({ success: true, data: task }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid session data' }, { status: 400 })
    }
    console.error('[counselor/sessions] POST failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to schedule session' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const sessions = await prisma.tasks.findMany({
      where: {
        assignedToId: session.userId,
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        type: { in: ['FOLLOW_UP_CALL', 'DEMO_FOLLOWUP', 'CUSTOM'] },
        dueDate: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
      orderBy: { dueDate: 'asc' },
      take: 100,
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        priority: true,
        status: true,
        dueDate: true,
        leadId: true,
      },
    })

    return NextResponse.json({ success: true, data: sessions })
  } catch (error) {
    console.error('[counselor/sessions] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load sessions' }, { status: 500 })
  }
}
