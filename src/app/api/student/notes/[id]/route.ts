import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import type { NoteType } from '@/types/prisma-enums'

export const dynamic = 'force-dynamic'

// ============================================
// TYPES
// ============================================

interface UpdateNoteData {
  title?: string
  noteType?: NoteType
  content?: object
  thumbnail?: string
  courseId?: string | null
  chapterId?: string | null
  topicId?: string | null
  tags?: string[]
  isFavorite?: boolean
  isArchived?: boolean
  metadata?: object
}

// ============================================
// GET - Fetch a single note by ID
// ============================================

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { id } = await params

    const note = await prisma.notes.findFirst({
      where: {
        id,
        studentId: session.user.id,
      },
    })

    if (!note) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: note,
    })
  } catch (error) {
    console.error('Error fetching note:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch note' }, { status: 500 })
  }
}

// ============================================
// PUT - Update a note
// ============================================

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body: UpdateNoteData = await request.json()

    // Check if note exists and belongs to user
    const existingNote = await prisma.notes.findFirst({
      where: {
        id,
        studentId: session.user.id,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 })
    }

    // Validate title length if provided
    if (body.title && body.title.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Title must be 200 characters or less' },
        { status: 400 }
      )
    }

    // Validate note type if provided
    const validNoteTypes: NoteType[] = ['TEXT', 'DRAWING', 'MIXED']
    if (body.noteType && !validNoteTypes.includes(body.noteType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid note type. Must be TEXT, DRAWING, or MIXED' },
        { status: 400 }
      )
    }

    // Normalize tags if provided
    const normalizedTags = body.tags?.map((t) => t.toLowerCase().trim())

    // Build update data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      lastEditedAt: new Date(),
    }

    if (body.title !== undefined) updateData.title = body.title
    if (body.noteType !== undefined) updateData.noteType = body.noteType
    if (body.content !== undefined) updateData.content = body.content
    if (body.thumbnail !== undefined) updateData.thumbnail = body.thumbnail
    if (body.courseId !== undefined) updateData.courseId = body.courseId
    if (body.chapterId !== undefined) updateData.chapterId = body.chapterId
    if (body.topicId !== undefined) updateData.topicId = body.topicId
    if (normalizedTags !== undefined) updateData.tags = normalizedTags
    if (body.isFavorite !== undefined) updateData.isFavorite = body.isFavorite
    if (body.isArchived !== undefined) updateData.isArchived = body.isArchived
    if (body.metadata !== undefined) updateData.metadata = body.metadata

    const note = await prisma.notes.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: note,
      message: 'Note updated successfully',
    })
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ success: false, error: 'Failed to update note' }, { status: 500 })
  }
}

// ============================================
// DELETE - Delete a note (or archive it)
// ============================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const permanent = searchParams.get('permanent') === 'true'

    // Check if note exists and belongs to user
    const existingNote = await prisma.notes.findFirst({
      where: {
        id,
        studentId: session.user.id,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 })
    }

    if (permanent) {
      // Permanently delete the note
      await prisma.notes.delete({
        where: { id },
      })

      return NextResponse.json({
        success: true,
        message: 'Note permanently deleted',
      })
    } else {
      // Soft delete (archive) the note
      await prisma.notes.update({
        where: { id },
        data: {
          isArchived: true,
          lastEditedAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Note archived successfully',
      })
    }
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete note' }, { status: 500 })
  }
}
