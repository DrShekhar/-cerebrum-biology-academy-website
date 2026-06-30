/**
 * Admin/Teacher LMS — questions review list.
 * Defaults to AI-generated, unverified questions (the review queue), so
 * teacher-approved content can be promoted before it's trusted as canonical.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { parsePositiveInt } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source') ?? 'AI_GENERATED'
    const verifiedParam = searchParams.get('isVerified') // null → default false
    const search = (searchParams.get('search') || '').trim()
    const topic = searchParams.get('topic') || ''
    const limit = parsePositiveInt(searchParams.get('limit'), 50, { min: 1, max: 100 })

    const where: any = {}
    if (source && source !== 'all') where.source = source
    where.isVerified = verifiedParam === null ? false : verifiedParam === 'true'
    if (topic) where.topic = topic
    if (search) {
      where.OR = [
        { question: { contains: search, mode: 'insensitive' } },
        { topic: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [questions, pendingCount] = await Promise.all([
      prisma.questions.findMany({
        where,
        select: {
          id: true,
          question: true,
          options: true,
          correctAnswer: true,
          explanation: true,
          topic: true,
          type: true,
          grade: true,
          curriculum: true,
          source: true,
          isVerified: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      }),
      prisma.questions.count({ where: { source: 'AI_GENERATED', isVerified: false } }),
    ])

    return NextResponse.json({ success: true, questions, pendingCount })
  } catch (error) {
    console.error('Error fetching questions for review:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch questions' }, { status: 500 })
  }
}
