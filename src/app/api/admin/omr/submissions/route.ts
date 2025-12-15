import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paperId = searchParams.get('paperId')
    const studentClass = searchParams.get('studentClass')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const sortBy = searchParams.get('sortBy') || 'submittedAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const where: Record<string, unknown> = {}

    if (paperId) where.paperId = paperId
    if (studentClass) where.studentClass = studentClass
    if (search) {
      where.OR = [
        { studentName: { contains: search, mode: 'insensitive' } },
        { studentPhone: { contains: search } },
        { studentEmail: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [submissions, total] = await Promise.all([
      prisma.omr_submissions.findMany({
        where,
        include: {
          paper: {
            select: {
              paperCode: true,
              title: true,
              subjectType: true,
              totalQuestions: true,
              totalMarks: true,
            },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.omr_submissions.count({ where }),
    ])

    const stats = await prisma.omr_submissions.aggregate({
      where,
      _avg: { percentage: true, marksObtained: true },
      _max: { percentage: true, marksObtained: true },
      _min: { percentage: true, marksObtained: true },
      _count: true,
    })

    return NextResponse.json({
      success: true,
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalSubmissions: stats._count,
        avgPercentage: Math.round((stats._avg.percentage || 0) * 100) / 100,
        avgMarks: Math.round((stats._avg.marksObtained || 0) * 100) / 100,
        highestPercentage: stats._max.percentage,
        lowestPercentage: stats._min.percentage,
      },
    })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
