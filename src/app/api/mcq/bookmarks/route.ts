import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET /api/mcq/bookmarks - Get user's bookmarked questions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!freeUserId) {
      return NextResponse.json({ success: false, error: 'freeUserId is required' }, { status: 400 })
    }

    // Fetch bookmarks with question data
    const bookmarks = await prisma.mcq_bookmarks.findMany({
      where: { freeUserId },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        questions: {
          select: {
            id: true,
            question: true,
            options: true,
            correctAnswer: true,
            explanation: true,
            topic: true,
            difficulty: true,
            examYear: true,
            isNcertBased: true,
            ncertClass: true,
            ncertChapter: true,
            ncertChapterName: true,
          },
        },
      },
    })

    const total = await prisma.mcq_bookmarks.count({
      where: { freeUserId },
    })

    return NextResponse.json({
      success: true,
      data: {
        bookmarks: bookmarks.map((b) => ({
          id: b.id,
          questionId: b.questionId,
          note: b.note,
          createdAt: b.createdAt,
          question: b.questions,
        })),
        total,
        hasMore: offset + bookmarks.length < total,
      },
    })
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookmarks' },
      { status: 500 }
    )
  }
}

// POST /api/mcq/bookmarks - Add a bookmark
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { freeUserId, questionId, note } = body

    if (!freeUserId || !questionId) {
      return NextResponse.json(
        { success: false, error: 'freeUserId and questionId are required' },
        { status: 400 }
      )
    }

    // Check if bookmark already exists
    const existing = await prisma.mcq_bookmarks.findUnique({
      where: {
        freeUserId_questionId: { freeUserId, questionId },
      },
    })

    if (existing) {
      // Update note if provided
      if (note !== undefined) {
        const updated = await prisma.mcq_bookmarks.update({
          where: { id: existing.id },
          data: { note },
        })
        return NextResponse.json({
          success: true,
          data: { bookmark: updated, action: 'updated' },
        })
      }
      return NextResponse.json({
        success: true,
        data: { bookmark: existing, action: 'exists' },
      })
    }

    // Create new bookmark
    const bookmark = await prisma.mcq_bookmarks.create({
      data: {
        freeUserId,
        questionId,
        note: note || null,
      },
    })

    return NextResponse.json({
      success: true,
      data: { bookmark, action: 'created' },
    })
  } catch (error) {
    console.error('Error creating bookmark:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create bookmark' },
      { status: 500 }
    )
  }
}

// DELETE /api/mcq/bookmarks - Remove a bookmark
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const freeUserId = searchParams.get('freeUserId')
    const questionId = searchParams.get('questionId')

    if (!freeUserId || !questionId) {
      return NextResponse.json(
        { success: false, error: 'freeUserId and questionId are required' },
        { status: 400 }
      )
    }

    // Delete bookmark
    const deleted = await prisma.mcq_bookmarks.deleteMany({
      where: {
        freeUserId,
        questionId,
      },
    })

    if (deleted.count === 0) {
      return NextResponse.json({ success: false, error: 'Bookmark not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: { deleted: true },
    })
  } catch (error) {
    console.error('Error deleting bookmark:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete bookmark' },
      { status: 500 }
    )
  }
}
