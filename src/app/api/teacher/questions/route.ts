/**
 * Teacher Questions API
 * GET /api/teacher/questions - Browse question bank with advanced filters
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const curriculum = searchParams.get('curriculum') || ''
    const grade = searchParams.get('grade') || ''
    const topic = searchParams.get('topic') || ''
    const type = searchParams.get('type') || ''
    const difficulty = searchParams.get('difficulty') || ''
    const category = searchParams.get('category') || ''
    const isVerified = searchParams.get('isVerified')

    const skip = (page - 1) * limit

    const where: any = {
      isActive: true,
    }

    if (search) {
      where.OR = [
        { question: { contains: search, mode: 'insensitive' } },
        { topic: { contains: search, mode: 'insensitive' } },
        { subtopic: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (curriculum) where.curriculum = curriculum
    if (grade) where.grade = grade
    if (topic) where.topic = topic
    if (type) where.type = type
    if (difficulty) where.difficulty = difficulty
    if (category) where.category = category
    if (isVerified !== null && isVerified !== undefined) {
      where.isVerified = isVerified === 'true'
    }

    const [questions, totalCount, statistics] = await Promise.all([
      prisma.questions.findMany({
        where,
        select: {
          id: true,
          topic: true,
          subtopic: true,
          curriculum: true,
          grade: true,
          type: true,
          question: true,
          options: true,
          correctAnswer: true,
          explanation: true,
          marks: true,
          difficulty: true,
          category: true,
          isVerified: true,
          totalAttempts: true,
          correctAttempts: true,
          averageTime: true,
          tags: true,
          createdAt: true,
        },
        orderBy: [{ createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.questions.count({ where }),
      prisma.questions.aggregate({
        where: { isActive: true },
        _count: {
          id: true,
        },
        _avg: {
          marks: true,
          correctAttempts: true,
        },
      }),
    ])

    const byDifficulty = await prisma.questions.groupBy({
      by: ['difficulty'],
      where: { isActive: true },
      _count: {
        id: true,
      },
    })

    const byType = await prisma.questions.groupBy({
      by: ['type'],
      where: { isActive: true },
      _count: {
        id: true,
      },
    })

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      success: true,
      questions,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
      },
      statistics: {
        totalQuestions: statistics._count.id,
        averageMarks: statistics._avg.marks || 0,
        verifiedQuestions: await prisma.questions.count({
          where: { isActive: true, isVerified: true },
        }),
        byDifficulty: byDifficulty.reduce(
          (acc, item) => {
            acc[item.difficulty] = item._count.id
            return acc
          },
          {} as Record<string, number>
        ),
        byType: byType.reduce(
          (acc, item) => {
            acc[item.type] = item._count.id
            return acc
          },
          {} as Record<string, number>
        ),
      },
    })
  } catch (error) {
    console.error('Failed to fetch questions:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch questions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
