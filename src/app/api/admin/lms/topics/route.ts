/**
 * Admin LMS — Topics API (create). Topics belong to a chapter.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role?.toUpperCase() !== 'ADMIN') return null
  return session
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const body = await request.json()
    const { chapterId, title, description } = body
    if (!chapterId || !title?.trim()) {
      return NextResponse.json(
        { success: false, error: 'chapterId and title are required' },
        { status: 400 }
      )
    }

    const last = await prisma.topics.findFirst({
      where: { chapterId },
      orderBy: { orderIndex: 'desc' },
      select: { orderIndex: true },
    })

    const topic = await prisma.topics.create({
      data: {
        id: `topic_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        chapterId,
        title: title.trim(),
        description: description?.trim() || null,
        orderIndex: (last?.orderIndex ?? -1) + 1,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, topic }, { status: 201 })
  } catch (error) {
    console.error('Error creating topic:', error)
    return NextResponse.json({ success: false, error: 'Failed to create topic' }, { status: 500 })
  }
}
