import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'
import type { NoteType } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

// ============================================
// TYPES
// ============================================

interface CreateNoteData {
  title: string
  noteType?: NoteType
  content: object
  thumbnail?: string
  courseId?: string
  chapterId?: string
  topicId?: string
  tags?: string[]
  isFavorite?: boolean
  metadata?: object
}

// ============================================
// GET - Fetch notes for current user
// ============================================

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const chapterId = searchParams.get('chapterId')
    const isFavorite = searchParams.get('isFavorite')
    const isArchived = searchParams.get('isArchived')
    const search = searchParams.get('search')
    const tags = searchParams.get('tags')
    const sortBy = searchParams.get('sortBy') || 'lastEditedAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      studentId: session.user.id,
      isArchived: isArchived === 'true',
    }

    if (courseId) {
      whereClause.courseId = courseId
    }

    if (chapterId) {
      whereClause.chapterId = chapterId
    }

    if (isFavorite === 'true') {
      whereClause.isFavorite = true
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { tags: { hasSome: [search.toLowerCase()] } },
      ]
    }

    if (tags) {
      const tagArray = tags.split(',').map((t) => t.trim().toLowerCase())
      whereClause.tags = { hasSome: tagArray }
    }

    // Build orderBy based on sortBy parameter
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const orderBy: any = {}
    if (sortBy === 'title') {
      orderBy.title = sortOrder
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder
    } else {
      orderBy.lastEditedAt = sortOrder
    }

    const [notes, total] = await Promise.all([
      prisma.student_notes.findMany({
        where: whereClause,
        orderBy,
        take: limit,
        skip: offset,
        select: {
          id: true,
          title: true,
          noteType: true,
          thumbnail: true,
          courseId: true,
          chapterId: true,
          topicId: true,
          tags: true,
          isFavorite: true,
          isArchived: true,
          lastEditedAt: true,
          createdAt: true,
        },
      }),
      prisma.student_notes.count({ where: whereClause }),
    ])

    // Get stats
    const stats = await prisma.student_notes.groupBy({
      by: ['isFavorite', 'isArchived'],
      where: { studentId: session.user.id },
      _count: true,
    })

    const totalNotes = stats.reduce((acc, s) => acc + s._count, 0)
    const favorites = stats.find((s) => s.isFavorite && !s.isArchived)?._count || 0
    const archived = stats.filter((s) => s.isArchived).reduce((acc, s) => acc + s._count, 0)
    const active = totalNotes - archived

    return NextResponse.json({
      success: true,
      data: {
        notes,
        stats: {
          total: totalNotes,
          active,
          favorites,
          archived,
        },
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + notes.length < total,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch notes' }, { status: 500 })
  }
}

// ============================================
// POST - Create a new note
// ============================================

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body: CreateNoteData = await request.json()

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Validate title length
    if (body.title.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Title must be 200 characters or less' },
        { status: 400 }
      )
    }

    // Validate note type
    const validNoteTypes: NoteType[] = ['TEXT', 'DRAWING', 'MIXED']
    if (body.noteType && !validNoteTypes.includes(body.noteType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid note type. Must be TEXT, DRAWING, or MIXED' },
        { status: 400 }
      )
    }

    // Normalize tags to lowercase
    const normalizedTags = body.tags?.map((t) => t.toLowerCase().trim()) || []

    const note = await prisma.student_notes.create({
      data: {
        studentId: session.user.id,
        title: body.title,
        noteType: body.noteType || 'TEXT',
        content: body.content,
        thumbnail: body.thumbnail,
        courseId: body.courseId,
        chapterId: body.chapterId,
        topicId: body.topicId,
        tags: normalizedTags,
        isFavorite: body.isFavorite || false,
        isArchived: false,
        metadata: body.metadata,
        lastEditedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: note,
      message: 'Note created successfully',
    })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ success: false, error: 'Failed to create note' }, { status: 500 })
  }
}
