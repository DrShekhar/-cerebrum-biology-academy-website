import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const courseId = params.courseId
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId') || session.user.id

    if (userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const enrollment = await prisma.enrollments.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        courses: {
          include: {
            chapters: {
              include: {
                topics: {
                  select: {
                    id: true,
                    title: true,
                    sortOrder: true,
                  },
                  orderBy: { sortOrder: 'asc' },
                },
              },
              orderBy: { sortOrder: 'asc' },
            },
            study_materials: {
              where: { isActive: true },
              select: {
                id: true,
                title: true,
                type: true,
                chapterId: true,
                topicId: true,
              },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    const modules = enrollment.courses.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      sortOrder: chapter.sortOrder,
      topics: chapter.topics,
      materials: enrollment.courses.study_materials.filter(
        (m) => m.chapterId === chapter.id
      ),
    }))

    return NextResponse.json({
      success: true,
      course: {
        id: enrollment.courses.id,
        name: enrollment.courses.name,
        description: enrollment.courses.description,
        type: enrollment.courses.type,
        enrollmentId: enrollment.id,
        status: enrollment.status,
        enrollmentDate: enrollment.enrollmentDate,
        currentProgress: enrollment.currentProgress,
        lastAccessDate: enrollment.lastAccessDate,
        modules,
        features: enrollment.courses.features,
      },
    })
  } catch (error) {
    console.error('Error fetching course details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course details', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
