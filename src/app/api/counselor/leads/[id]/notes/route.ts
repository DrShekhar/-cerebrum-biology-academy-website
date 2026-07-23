import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { mentionedUserIds, stripMentionMarkup } from '@/lib/staff/mentions'
import { notifyStaff } from '@/lib/staff/notify'

export const dynamic = 'force-dynamic'

// GET /api/counselor/leads/[id]/notes - Get all notes/comments for a lead
// (flat list, oldest first; parentId lets the client group one level of replies)
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (!['COUNSELOR', 'ADMIN'].includes((session.user.role || '').toUpperCase())) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    // Tenant isolation: counselor can only read notes for leads assigned to them.
    const isAdmin = (session.user.role || '').toUpperCase() === 'ADMIN'
    const owned = await prisma.leads.findFirst({
      where: { id: params.id, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: { id: true },
    })
    if (!owned) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    const notes = await prisma.notes.findMany({
      where: { leadId: params.id },
      orderBy: { createdAt: 'asc' },
      include: {
        users: {
          select: { id: true, name: true },
        },
      },
    })

    const formatted = notes.map((note) => ({
      id: note.id,
      content: note.content,
      parentId: note.parentId,
      mentionedUserIds: note.mentionedUserIds,
      createdAt: note.createdAt,
      createdBy: { id: note.users.id, name: note.users.name },
    }))

    return NextResponse.json({ success: true, data: formatted })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch notes' }, { status: 500 })
  }
}

// POST /api/counselor/leads/[id]/notes - Create a note, a reply (parentId),
// with optional @[Name](userId) mentions → staff notification fanout.
export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (!['COUNSELOR', 'ADMIN'].includes((session.user.role || '').toUpperCase())) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { content, type, mood, nextSteps, parentId } = body

    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, error: 'Content is required' }, { status: 400 })
    }

    // Tenant isolation: counselor can only add notes to leads assigned to them.
    const isAdmin = (session.user.role || '').toUpperCase() === 'ADMIN'
    const lead = await prisma.leads.findFirst({
      where: { id: params.id, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: { id: true, studentName: true },
    })

    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    // Replies attach to a ROOT note of the same lead (one level deep).
    let parentNote: { id: string; createdById: string } | null = null
    if (parentId) {
      parentNote = await prisma.notes.findFirst({
        where: { id: parentId, leadId: params.id, parentId: null },
        select: { id: true, createdById: true },
      })
      if (!parentNote) {
        return NextResponse.json(
          { success: false, error: 'Parent note not found' },
          { status: 400 }
        )
      }
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

    const mentions = mentionedUserIds(fullContent)

    const note = await prisma.notes.create({
      data: {
        id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        leadId: params.id,
        content: fullContent,
        parentId: parentNote?.id || null,
        mentionedUserIds: mentions,
        createdById: session.user.id,
        updatedAt: new Date(),
      },
      include: {
        users: {
          select: { id: true, name: true },
        },
      },
    })

    // Update lead's lastContactedAt
    await prisma.leads.update({
      where: { id: params.id },
      data: { lastContactedAt: new Date(), updatedAt: new Date() },
    })

    // Notification fanout — never fails the note write.
    const actorName = note.users.name || 'A teammate'
    const preview = stripMentionMarkup(fullContent).slice(0, 200)
    const leadHref = `/counselor/leads/${params.id}`
    if (mentions.length > 0) {
      void notifyStaff({
        userIds: mentions,
        type: 'MENTION_LEAD',
        title: `${actorName} mentioned you on ${lead.studentName}`,
        body: preview,
        href: leadHref,
        actorId: session.user.id,
        leadId: params.id,
      })
    }
    if (parentNote && parentNote.createdById !== session.user.id) {
      void notifyStaff({
        userIds: [parentNote.createdById].filter((id) => !mentions.includes(id)),
        type: 'LEAD_COMMENT_REPLY',
        title: `${actorName} replied to your note on ${lead.studentName}`,
        body: preview,
        href: leadHref,
        actorId: session.user.id,
        leadId: params.id,
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        id: note.id,
        content: note.content,
        parentId: note.parentId,
        mentionedUserIds: note.mentionedUserIds,
        createdAt: note.createdAt,
        createdBy: { id: note.users.id, name: note.users.name },
      },
    })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ success: false, error: 'Failed to create note' }, { status: 500 })
  }
}
