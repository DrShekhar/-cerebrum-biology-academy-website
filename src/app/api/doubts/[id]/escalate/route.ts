import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

/**
 * POST /api/doubts/[id]/escalate — hand an AI-answered doubt to a teacher.
 * Owner-scoped. Re-opens the ticket so it appears in the teacher doubt queue.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    const userId = (session?.user as { id?: string } | undefined)?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Sign in required' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json().catch(() => ({}))
    const note: string = (body.note || '').toString().trim()

    const ticket = await prisma.doubt_tickets.findUnique({
      where: { id },
      select: { id: true, studentId: true },
    })
    if (!ticket || ticket.studentId !== userId) {
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }

    await prisma.doubt_tickets.update({
      where: { id },
      data: {
        status: 'OPEN',
        priority: 'HIGH',
        instructorId: null,
        lastMessageAt: new Date(),
        updatedAt: new Date(),
      },
    })

    if (note) {
      await prisma.doubt_messages
        .create({
          data: {
            id: `dm_${id}_esc_${Date.now()}`,
            doubtId: id,
            senderId: userId,
            message: note,
            messageType: 'TEXT',
            metadata: { escalatedFromAI: true },
            updatedAt: new Date(),
          },
        })
        .catch(() => {})
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Doubt escalate error:', error)
    return NextResponse.json({ success: false, error: 'Failed to escalate' }, { status: 500 })
  }
}
