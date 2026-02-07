import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    const targetUserId = userId || session.user.id

    if (targetUserId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const enrollments = await prisma.enrollments.findMany({
      where: {
        userId: targetUserId,
        status: 'ACTIVE',
      },
      include: {
        courses: {
          include: {
            chapters: {
              select: {
                id: true,
                title: true,
                sortOrder: true,
              },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
      orderBy: { enrollmentDate: 'desc' },
    })

    return NextResponse.json({
      success: true,
      enrollments: enrollments.map((e) => ({
        id: e.id,
        courseId: e.courseId,
        courseName: e.courses.name,
        courseDescription: e.courses.description,
        courseType: e.courses.type,
        status: e.status,
        enrollmentDate: e.enrollmentDate,
        startDate: e.startDate,
        endDate: e.endDate,
        currentProgress: e.currentProgress,
        lastAccessDate: e.lastAccessDate,
        totalFees: e.totalFees,
        paidAmount: e.paidAmount,
        chapters: e.courses.chapters,
        features: e.courses.features,
      })),
    })
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
