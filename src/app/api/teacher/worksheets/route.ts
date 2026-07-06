/**
 * Teacher Worksheets API
 *
 * GET /api/teacher/worksheets - List worksheets with submission counts
 * (worksheets have no owner column, so any TEACHER/ADMIN sees all — same
 * visibility the admin builder uses)
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [worksheets, total] = await Promise.all([
      prisma.worksheets.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          maxMarks: true,
          difficulty: true,
          status: true,
          dueDate: true,
          publishedAt: true,
          submissions: {
            select: { status: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.worksheets.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      worksheets: worksheets.map((w) => {
        const submitted = w.submissions.filter((s) => s.status === 'SUBMITTED').length
        const graded = w.submissions.filter((s) => s.status === 'GRADED').length
        return {
          id: w.id,
          title: w.title,
          description: w.description,
          maxMarks: w.maxMarks,
          difficulty: w.difficulty,
          status: w.status,
          dueDate: w.dueDate,
          publishedAt: w.publishedAt,
          counts: {
            total: w.submissions.length,
            submitted,
            graded,
            awaitingGrade: submitted,
          },
        }
      }),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('Failed to fetch teacher worksheets:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch worksheets' },
      { status: 500 }
    )
  }
}
