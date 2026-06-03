import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET /api/counselor/leads/[id]/notes - Get all notes for a lead
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Tenant isolation: counselor can only read notes for leads assigned to them.
    const isAdmin = session.user.role === 'ADMIN'
    const owned = await prisma.leads.findFirst({
      where: { id: params.id, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: { id: true },
    })
    if (!owned) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const notes = await prisma.notes.findMany({
      where: { leadId: params.id },
      orderBy: { createdAt: 'desc' },
      include: {
        users: {
          select: { name: true, email: true },
        },
      },
    })

    const formatted = notes.map((note) => ({
      id: note.id,
      content: note.content,
      createdAt: note.createdAt,
      createdBy: { name: note.users.name },
    }))

    return NextResponse.json({ data: formatted })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 })
  }
}

// POST /api/counselor/leads/[id]/notes - Create a new note
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { content, type, mood, nextSteps } = body

    if (!content || !content.trim()) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Tenant isolation: counselor can only add notes to leads assigned to them.
    const isAdmin = session.user.role === 'ADMIN'
    const lead = await prisma.leads.findFirst({
      where: { id: params.id, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
    })

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    // Build content with metadata
    let fullContent = content
    if (type && type !== 'GENERAL') {
      fullContent = `[${type}] ${content}`
    }
    if (mood) {
      fullContent += `\n\n---\nStudent mood: ${mood}`
    }
    if (nextSteps) {
      fullContent += `\n\nNext steps: ${nextSteps}`
    }

    const note = await prisma.notes.create({
      data: {
        id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        leadId: params.id,
        content: fullContent,
        createdById: session.user.id,
        updatedAt: new Date(),
      },
      include: {
        users: {
          select: { name: true, email: true },
        },
      },
    })

    // Update lead's lastContactedAt
    await prisma.leads.update({
      where: { id: params.id },
      data: { lastContactedAt: new Date(), updatedAt: new Date() },
    })

    return NextResponse.json({
      data: {
        id: note.id,
        content: note.content,
        createdAt: note.createdAt,
        createdBy: { name: note.users.name },
      },
    })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 })
  }
}
